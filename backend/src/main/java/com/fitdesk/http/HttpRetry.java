package com.fitdesk.http;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpTimeoutException;
import java.util.Set;

import org.jboss.logging.Logger;

/**
 * Envío HTTP (JDK {@link HttpClient}) con reintentos acotados para fallos de conexión
 * TRANSITORIOS y SOLO en métodos idempotentes.
 *
 * <p>Motivo: el pool keep-alive del HttpClient del JDK puede reutilizar una conexión que
 * el servidor/LB del HelpDesk ya cerró por idle; al leer la respuesta encuentra EOF y
 * lanza {@code IOException: "HTTP/1.1 header parser received no bytes"} (o "connection
 * reset"). Como esa firma implica que el servidor NO respondió, reenviar es seguro para
 * métodos idempotentes (GET/HEAD/OPTIONS/DELETE/PUT), donde el 2º intento abre una
 * conexión nueva y suele tener éxito.
 *
 * <p>NUNCA reintenta POST ni PATCH (un "no bytes" no garantiza que el servidor no procesó
 * la escritura antes de cerrar → riesgo de doble ejecución), ni {@link HttpTimeoutException}
 * (timeout de respuesta tras enviar → no es un fallo de conexión y reintentar sólo añade
 * carga). Los 4xx/5xx reales son respuestas, no excepciones, y no pasan por aquí.
 */
public final class HttpRetry {

    private static final Logger LOG = Logger.getLogger(HttpRetry.class);
    private static final Set<String> IDEMPOTENTES = Set.of("GET", "HEAD", "OPTIONS", "DELETE", "PUT");
    private static final int MAX_INTENTOS = 3; // 1 original + 2 reintentos

    private HttpRetry() {
    }

    public static boolean esIdempotente(String metodo) {
        return metodo != null && IDEMPOTENTES.contains(metodo.trim().toUpperCase());
    }

    /** Envía la request reintentando fallos de conexión transitorios en métodos idempotentes. */
    public static <T> HttpResponse<T> send(HttpClient client, HttpRequest req, HttpResponse.BodyHandler<T> handler)
            throws IOException, InterruptedException {
        boolean idempotente = esIdempotente(req.method());
        IOException ultima = null;
        for (int intento = 1; intento <= MAX_INTENTOS; intento++) {
            try {
                return client.send(req, handler);
            } catch (IOException ex) {
                ultima = ex;
                // Solo se reintenta un fallo de CONEXIÓN (no un timeout de respuesta) y solo si el
                // método es idempotente. Cualquier otro caso se propaga tal cual.
                boolean transitorio = !(ex instanceof HttpTimeoutException);
                if (!idempotente || !transitorio || intento >= MAX_INTENTOS) {
                    throw ex;
                }
                LOG.warnf("HTTP %s %s: intento %d/%d falló (%s); reintentando",
                        req.method(), req.uri(), intento, MAX_INTENTOS, ex.toString());
                try {
                    Thread.sleep(100L * intento); // backoff 100 ms, 200 ms
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw ie;
                }
            }
        }
        throw ultima; // inalcanzable (el bucle sale por return o throw)
    }
}
