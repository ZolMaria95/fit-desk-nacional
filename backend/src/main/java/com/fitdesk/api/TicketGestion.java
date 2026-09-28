package com.fitdesk.api;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitdesk.core.Mensaje;
import com.fitdesk.core.Solicitud;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Transferencia;
import com.fitdesk.http.HttpRetry;
import com.fitdesk.overlay.Consulta;
import com.fitdesk.overlay.Progreso;
import com.fitdesk.overlay.TicketAccion;
import com.fitdesk.overlay.TicketGuardado;
import com.fitdesk.overlay.TicketNota;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

/**
 * Gestión de tickets del HelpDesk con gating del rol de plataforma HELPDESK (ver
 * {@link Actor#puedeGestionarTicket}). Dos piezas que usan el proxy y el endpoint de borrado:
 * <ul>
 *   <li>averiguar el {@code client_id} de un ticket (el HelpDesk es la fuente: se consulta con el
 *   {@code Authorization} del propio usuario, igual que haría el proxy), para decidir el alcance;</li>
 *   <li>borrar el ticket en el HelpDesk y, SOLO si éste confirma, limpiar su huella local (tarea
 *   espejo y overlays) — única excepción a la regla "tareas con ticket no se eliminan".</li>
 * </ul>
 */
@ApplicationScoped
public class TicketGestion {

    @ConfigProperty(name = "fitdesk.helpdesk.base-url", defaultValue = "https://helpdesk-api.fit-bank.com/api/v1")
    String target;

    @Inject
    ObjectMapper mapper;

    private final HttpClient client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(15))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    /** Resultado de consultar el ticket en el HelpDesk: status HTTP + client_id (si vino). */
    public record ClienteDelTicket(int status, String clientId) {
    }

    /** GET /tickets/tickets/{id} al HelpDesk con el Authorization del usuario → su client_id. */
    public ClienteDelTicket clienteDelTicket(String ticketId, String authorization) throws Exception {
        HttpResponse<byte[]> r = send("GET", "tickets/tickets/" + ticketId, authorization);
        if (r.statusCode() < 200 || r.statusCode() >= 300) {
            return new ClienteDelTicket(r.statusCode(), null);
        }
        JsonNode n = mapper.readTree(r.body());
        JsonNode c = n != null ? n.get("client_id") : null;
        String id = (c == null || c.isNull()) ? null : c.asText().trim();
        return new ClienteDelTicket(r.statusCode(), id == null || id.isEmpty() ? null : id);
    }

    /** DELETE /tickets/tickets/{id} al HelpDesk (sin body), con el Authorization del usuario. */
    public HttpResponse<byte[]> borrarEnHelpdesk(String ticketId, String authorization) throws Exception {
        return send("DELETE", "tickets/tickets/" + ticketId, authorization);
    }

    /**
     * Tras un borrado CONFIRMADO por el HelpDesk: quita la tarea espejo y todo lo que la referencia
     * (mensajes entre equipos, transferencias, solicitudes; progreso/consulta quedan desligados), los
     * overlays del ticket (notas, acciones, recordatorios, guardados) y el propio TicketEspejo.
     * Devuelve los códigos de tarea eliminados.
     */
    @Transactional
    public java.util.List<String> limpiarLocal(String ticketId) {
        java.util.List<String> borradas = new java.util.ArrayList<>();
        TicketEspejo esp = TicketEspejo.findByHelpdeskTicketId(ticketId);
        if (esp != null) {
            for (Tarea t : Tarea.<Tarea>list("ticketEspejo = ?1", esp)) {
                Progreso.update("tarea = null where tarea = ?1", t);
                Consulta.update("tarea = null where tarea = ?1", t);
                Mensaje.delete("tarea = ?1", t);
                Transferencia.delete("tarea = ?1", t);
                Solicitud.delete("tarea = ?1", t);
                borradas.add(t.codigo);
                t.delete();
            }
        }
        TicketNota.delete("helpdeskTicketId = ?1", ticketId);
        TicketAccion.delete("helpdeskTicketId = ?1", ticketId);
        TicketPendiente.delete("helpdeskTicketId = ?1", ticketId);
        TicketGuardado.delete("helpdeskTicketId = ?1", ticketId);
        if (esp != null) {
            esp.delete();
        }
        return borradas;
    }

    private HttpResponse<byte[]> send(String method, String path, String authorization) throws Exception {
        HttpRequest.Builder rb = HttpRequest.newBuilder(URI.create(target + "/" + path))
                .timeout(Duration.ofSeconds(60))
                .method(method, HttpRequest.BodyPublishers.noBody())
                .header("Accept", "application/json");
        if (authorization != null && !authorization.isBlank()) {
            rb.header("Authorization", authorization);
        }
        return HttpRetry.send(client, rb.build(), HttpResponse.BodyHandlers.ofByteArray());
    }
}
