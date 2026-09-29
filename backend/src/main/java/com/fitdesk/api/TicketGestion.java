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
    /** {@code asignado} = assigned_user_id actual del ticket (null = sin asignar). */
    public record ClienteDelTicket(int status, String clientId, String asignado) {
    }

    /** GET /tickets/tickets/{id} al HelpDesk con el Authorization del usuario → su client_id. */
    public ClienteDelTicket clienteDelTicket(String ticketId, String authorization) throws Exception {
        HttpResponse<byte[]> r = send("GET", "tickets/tickets/" + ticketId, authorization);
        if (r.statusCode() < 200 || r.statusCode() >= 300) {
            return new ClienteDelTicket(r.statusCode(), null, null);
        }
        JsonNode n = mapper.readTree(r.body());
        return new ClienteDelTicket(r.statusCode(), texto(n, "client_id"), texto(n, "assigned_user_id"));
    }

    private static String texto(JsonNode n, String campo) {
        JsonNode v = n != null ? n.get(campo) : null;
        String s = (v == null || v.isNull()) ? null : v.asText().trim();
        return s == null || s.isEmpty() ? null : s;
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

    @Inject
    com.fitdesk.sync.TicketEspejoStore espejoStore;

    /**
     * Al ACEPTAR una transferencia o APROBAR una reasignación: si la tarea tiene ticket, se asigna también
     * en el HelpDesk (antes solo cambiaba la tarea y el ticket quedaba sin asignar) y, confirmado, se deja
     * el espejo + la tarea al día. Devuelve null si está todo bien (o la tarea no tiene ticket) y, si no,
     * la respuesta de error: quien llama NO debe mutar nada en ese caso (se aborta la operación).
     */
    public jakarta.ws.rs.core.Response asignarTicketDeTarea(Tarea tarea, com.fitdesk.core.Usuario destino,
            String authorization) {
        if (tarea == null || tarea.ticketEspejo == null || tarea.ticketEspejo.helpdeskTicketId == null) {
            return null;
        }
        String ticketId = tarea.ticketEspejo.helpdeskTicketId;
        String hid = destino != null ? destino.helpdeskUserId : null;
        if (hid == null || hid.isBlank()) {
            return error(400, "La persona elegida no tiene usuario en el HelpDesk: no se puede asignar el ticket #" + ticketId + ".");
        }
        if (authorization == null || authorization.isBlank()) {
            return error(409, "Recarga la página (FitDesk se actualizó) para completar: hace falta asignar el ticket #"
                    + ticketId + " en el HelpDesk.");
        }
        try {
            ResultadoAsignacion r = asignarEnHelpdesk(ticketId, hid, authorization);
            if (!r.ok()) {
                int st = r.status() >= 400 && r.status() < 500 ? r.status() : 502;
                return error(st, "No se pudo asignar el ticket #" + ticketId + " en el HelpDesk: " + r.mensaje());
            }
        } catch (Exception ex) {
            return error(502, "No se pudo asignar el ticket #" + ticketId + " en el HelpDesk (sin respuesta).");
        }
        espejoStore.upsertAssignee(ticketId, hid); // espejo + tarea(s) del ticket (propagarAsignado)
        return null;
    }

    private static jakarta.ws.rs.core.Response error(int status, String msg) {
        return jakarta.ws.rs.core.Response.status(status)
                .type(jakarta.ws.rs.core.MediaType.APPLICATION_JSON)
                .entity(java.util.Map.of("error", msg, "message", msg)) // misma forma que bad()/forbidden() de estos recursos
                .build();
    }

    /** Resultado de asignar un ticket en el HelpDesk: {@code ok} solo si confirmó el asignado pedido. */
    public record ResultadoAsignacion(boolean ok, int status, String mensaje) {
    }

    /**
     * Asigna el ticket en el HelpDesk (PUT form-urlencoded {@code assigned_user_id}) con el Authorization del
     * usuario, y lo CONFIRMA leyendo el asignado de la respuesta: el HelpDesk responde 200 aunque ignore un
     * campo. Síncrono (regla del proyecto): quien llama no debe dar la operación por hecha si {@code !ok}.
     */
    public ResultadoAsignacion asignarEnHelpdesk(String ticketId, String hid, String authorization) throws Exception {
        String body = "assigned_user_id=" + java.net.URLEncoder.encode(hid, java.nio.charset.StandardCharsets.UTF_8);
        HttpRequest.Builder rb = HttpRequest.newBuilder(URI.create(target + "/tickets/tickets/" + ticketId))
                .timeout(Duration.ofSeconds(60))
                .method("PUT", HttpRequest.BodyPublishers.ofString(body))
                .header("Accept", "application/json")
                .header("Content-Type", "application/x-www-form-urlencoded");
        if (authorization != null && !authorization.isBlank()) {
            rb.header("Authorization", authorization);
        }
        HttpResponse<byte[]> r = HttpRetry.send(client, rb.build(), HttpResponse.BodyHandlers.ofByteArray());
        JsonNode n = null;
        try {
            n = mapper.readTree(r.body());
        } catch (Exception ignored) {
            // cuerpo no JSON: se informa por status
        }
        if (r.statusCode() < 200 || r.statusCode() >= 300) {
            String msg = n == null ? null
                    : n.path("error").path("message").asText(n.path("message").asText(n.path("detail").asText("")));
            return new ResultadoAsignacion(false, r.statusCode(),
                    msg == null || msg.isBlank() ? "El HelpDesk no aceptó la asignación (" + r.statusCode() + ")." : msg);
        }
        String aplicado = n == null ? null : n.path("assigned_user_id").asText(null);
        if (aplicado == null || !aplicado.trim().equalsIgnoreCase(hid.trim())) {
            return new ResultadoAsignacion(false, r.statusCode(), "El HelpDesk no aplicó la asignación del ticket.");
        }
        return new ResultadoAsignacion(true, r.statusCode(), null);
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
