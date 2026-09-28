package com.fitdesk.api;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URLDecoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import com.fitdesk.http.HttpRetry;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

/**
 * Proxy transparente al API del HelpDesk (Fase 3). Quarkus se vuelve la ÚNICA
 * fuente del frontend: reenvía `/api/v1/**` a `helpdesk-api.fit-bank.com/api/v1/**`
 * preservando método, query, headers (incl. Authorization) y cuerpo crudo, y
 * relayando la respuesta tal cual (JSON, form, multipart, blobs de adjuntos).
 * Reemplaza el proxy del dev server de Angular y el Cloudflare Worker; el CORS lo
 * pone el filtro CORS de Quarkus (server-side). NO cachea (eso es el TicketEspejo,
 * slice siguiente); es un relay 1:1.
 */
@Path("/api/v1")
@Consumes(MediaType.WILDCARD)
public class HelpdeskProxyResource {

    private static final Logger LOG = Logger.getLogger(HelpdeskProxyResource.class);

    @ConfigProperty(name = "fitdesk.helpdesk.base-url", defaultValue = "https://helpdesk-api.fit-bank.com/api/v1")
    String target;

    /** Headers de request que NO se reenvían (hop-by-hop, o los rechaza el HttpClient del JDK). */
    private static final Set<String> SKIP_REQ = Set.of(
            "host", "content-length", "connection", "upgrade", "expect", "transfer-encoding",
            "keep-alive", "te", "trailer", "proxy-connection", "origin", "referer", "accept-encoding");

    /** Headers de response que NO se copian (los maneja Quarkus/JAX-RS o el filtro CORS). */
    private static final Set<String> SKIP_RESP = Set.of(
            "transfer-encoding", "content-length", "connection",
            "access-control-allow-origin", "access-control-allow-credentials",
            "access-control-allow-methods", "access-control-allow-headers");

    // HTTP/1.1 explícito: el HelpDesk sirve 1.1 igualmente; fijarlo evita el intento H2 por
    // ALPN en cada conexión nueva y da un comportamiento de pool/keep-alive predecible.
    private final HttpClient client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(15))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    @GET
    @Path("/{path:.*}")
    public Response get(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers) {
        return forward("GET", path, uriInfo, headers, new byte[0]);
    }

    @DELETE
    @Path("/{path:.*}")
    public Response delete(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers) {
        // Borrar un ticket NO pasa por el relay: se hace por DELETE /api/legacy/tickets/{id}, que
        // autoriza (rol HELPDESK/ADMIN en alcance) y además limpia la tarea espejo en la misma operación.
        if (TICKET_PATH.matcher(path == null ? "" : path).matches()) {
            return denegar("Para eliminar un ticket usa la acción Eliminar de FitDesk.");
        }
        return forward("DELETE", path, uriInfo, headers, new byte[0]);
    }

    @POST
    @Path("/{path:.*}")
    public Response post(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers,
            InputStream body) throws IOException {
        return forward("POST", path, uriInfo, headers, readAll(body));
    }

    @PUT
    @Path("/{path:.*}")
    public Response put(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers,
            InputStream body) throws IOException {
        byte[] bytes = readAll(body);
        Response denegado = guardaEdicionTicket(path, headers, bytes);
        if (denegado != null) {
            return denegado;
        }
        return forward("PUT", path, uriInfo, headers, bytes);
    }

    // ── Gating del rol HELPDESK sobre escrituras de tickets ─────────────────────────────
    // Cambiar SOLO el estado (`ticket_status_id`) sigue abierto a todos. Cualquier otro campo
    // (reasignar `assigned_user_id`, asunto, módulo, tipo, orden, incidencia, adjunto…) exige
    // HELPDESK (en su alcance) o ADMIN. Es server-side a propósito: ocultar botones en Angular no
    // alcanza (un bundle PWA viejo seguiría llamando — incidentes TA-224/TA-230). El actor llega en
    // X-Actor-Hid, misma postura que el resto del sistema (ver Actor).

    private static final Pattern TICKET_PATH = Pattern.compile("^tickets/tickets/(\\d+)/?$");

    private static final Set<String> CAMPOS_LIBRES = Set.of("ticket_status_id");

    @Inject
    TicketGestion gestion;

    private Response guardaEdicionTicket(String path, HttpHeaders headers, byte[] body) {
        Matcher m = TICKET_PATH.matcher(path == null ? "" : path);
        if (!m.matches()) {
            return null;
        }
        if (soloCamposLibres(headers.getMediaType(), body)) {
            return null;
        }
        String actor = headers.getHeaderString("X-Actor-Hid");
        String ticketId = m.group(1);
        try {
            TicketGestion.ClienteDelTicket c = gestion.clienteDelTicket(ticketId, headers.getHeaderString("Authorization"));
            if (c.status() < 200 || c.status() >= 300) {
                return null; // el ticket no se pudo leer (401/404…): que responda el propio HelpDesk al PUT
            }
            if (Actor.puedeGestionarTicket(actor, c.clientId())) {
                return null;
            }
        } catch (Exception ex) {
            LOG.warnf("Guarda de edición de ticket %s: no se pudo leer el ticket (%s)", ticketId, ex.toString());
            return Response.status(Response.Status.BAD_GATEWAY).type(MediaType.APPLICATION_JSON)
                    .entity("{\"error\":{\"message\":\"No se pudo verificar el ticket en el HelpDesk.\"}}").build();
        }
        return denegar("Solo el rol Helpdesk (en su alcance) o un administrador pueden editar o reasignar este ticket.");
    }

    /** ¿El body del PUT toca SOLO campos abiertos a todos (hoy: el estado)? Multipart = no (trae archivo). */
    private static boolean soloCamposLibres(MediaType type, byte[] body) {
        if (body == null || body.length == 0) {
            return true;
        }
        if (type == null || !MediaType.APPLICATION_FORM_URLENCODED_TYPE.isCompatible(type)) {
            return false;
        }
        String raw = new String(body, StandardCharsets.UTF_8);
        for (String par : raw.split("&")) {
            if (par.isBlank()) {
                continue;
            }
            int eq = par.indexOf('=');
            String key = URLDecoder.decode(eq >= 0 ? par.substring(0, eq) : par, StandardCharsets.UTF_8).trim();
            if (!CAMPOS_LIBRES.contains(key)) {
                return false;
            }
        }
        return true;
    }

    private static Response denegar(String msg) {
        String safe = msg.replace("\"", "'");
        return Response.status(Response.Status.FORBIDDEN).type(MediaType.APPLICATION_JSON)
                .entity("{\"error\":{\"message\":\"" + safe + "\"},\"message\":\"" + safe + "\"}").build();
    }

    @PATCH
    @Path("/{path:.*}")
    public Response patch(@PathParam("path") String path, @Context UriInfo uriInfo, @Context HttpHeaders headers,
            InputStream body) throws IOException {
        return forward("PATCH", path, uriInfo, headers, readAll(body));
    }

    private Response forward(String method, String path, UriInfo uriInfo, HttpHeaders headers, byte[] body) {
        String query = uriInfo.getRequestUri().getRawQuery();
        String url = target + (path == null || path.isBlank() ? "" : "/" + path) + (query != null ? "?" + query : "");

        HttpRequest.BodyPublisher publisher = (body == null || body.length == 0)
                ? HttpRequest.BodyPublishers.noBody()
                : HttpRequest.BodyPublishers.ofByteArray(body);

        HttpRequest.Builder rb = HttpRequest.newBuilder(URI.create(url))
                .timeout(Duration.ofSeconds(60))
                .method(method, publisher);

        for (Map.Entry<String, List<String>> e : headers.getRequestHeaders().entrySet()) {
            if (SKIP_REQ.contains(e.getKey().toLowerCase())) {
                continue;
            }
            for (String v : e.getValue()) {
                rb.header(e.getKey(), v);
            }
        }

        try {
            // Reintenta SOLO fallos de conexión transitorios y SOLO métodos idempotentes
            // (GET/DELETE/PUT/…); POST/PATCH nunca se reintentan. Ver HttpRetry.
            HttpResponse<byte[]> resp = HttpRetry.send(client, rb.build(), HttpResponse.BodyHandlers.ofByteArray());
            Response.ResponseBuilder out = Response.status(resp.statusCode());
            resp.headers().map().forEach((name, vals) -> {
                if (SKIP_RESP.contains(name.toLowerCase())) {
                    return;
                }
                for (String v : vals) {
                    out.header(name, v);
                }
            });
            byte[] payload = resp.body() != null ? resp.body() : new byte[0];
            return out.entity(payload).build();
        } catch (Exception ex) {
            LOG.warnf("Proxy HelpDesk %s %s falló: %s", method, path, ex.toString());
            return Response.status(Response.Status.BAD_GATEWAY)
                    .type(MediaType.APPLICATION_JSON)
                    .entity("{\"error\":\"proxy al HelpDesk falló: " + ex.getMessage() + "\"}")
                    .build();
        }
    }

    private static byte[] readAll(InputStream in) throws IOException {
        return in == null ? new byte[0] : in.readAllBytes();
    }
}
