package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Mensaje;
import com.fitdesk.core.Tarea;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Mensajes ENTRE EQUIPOS sobre una Tarea/ticket. Los envía un RE (o ADMIN) desde la tarjeta
 * del board hacia el RE del equipo que desarrolla la tarea. Se ven en la Bandeja de quien
 * gobierna el equipo de la tarea (mismo criterio que transferencias/solicitudes entrantes).
 * Autorización derivada de las Asignaciones ({@link Actor}); actor en X-Actor-Hid.
 */
@Path("/api/mensajes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MensajeResource {

    // ── Enviar (un RE escribe sobre una tarea) ───────────────────────────
    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        // Es entre Responsables de Equipo: solo un RE (o ADMIN) envía mensajes.
        if (Actor.equiposGestionables(actorHid).isEmpty()) {
            return forbidden("solo un Responsable de Equipo (o un ADMIN) puede enviar mensajes");
        }
        String tareaCodigo = text(in, "tareaCodigo");
        if (tareaCodigo == null) {
            return bad("tareaCodigo es obligatorio");
        }
        Tarea tarea = Tarea.findByCodigo(tareaCodigo);
        if (tarea == null) {
            return bad("tarea inexistente: " + tareaCodigo);
        }
        if (tarea.board == null || tarea.board.equipo == null) {
            return bad("la tarea no tiene equipo (board sin equipo) al cual escribir");
        }
        Mensaje m = new Mensaje();
        m.tarea = tarea;
        m.de = Actor.usuario(actorHid);
        m.texto = text(in, "texto");
        m.persist();
        return Response.status(Response.Status.CREATED).entity(describir(m)).build();
    }

    // ── Bandeja: mensajes NO vistos sobre tareas de mis equipos ──────────
    @GET
    @Path("/entrantes")
    public List<Map<String, Object>> entrantes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> mis = Actor.equiposGestionables(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (mis.isEmpty()) {
            return out;
        }
        for (Mensaje m : Mensaje.<Mensaje>list(
                "visto = false and tarea.board.equipo.id in ?1 order by creadoEn desc", mis)) {
            out.add(describir(m));
        }
        return out;
    }

    // ── Marcar visto (lo descarta de la bandeja del RE del equipo de la tarea) ──
    @POST
    @Path("/{id}/visto")
    @Transactional
    public Response visto(@PathParam("id") Long id, @HeaderParam("X-Actor-Hid") String actorHid) {
        Mensaje m = Mensaje.findById(id);
        if (m == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Long equipoTarea = (m.tarea != null && m.tarea.board != null && m.tarea.board.equipo != null)
                ? m.tarea.board.equipo.id : null;
        if (equipoTarea == null || !Actor.gobierna(actorHid, equipoTarea)) {
            return forbidden("solo el Responsable del equipo de la tarea (o un ADMIN) puede marcarlo visto");
        }
        m.visto = true;
        m.vistoEn = OffsetDateTime.now();
        return Response.ok(describir(m)).build();
    }

    // ── Serialización ────────────────────────────────────────────────────
    static Map<String, Object> describir(Mensaje m) {
        Map<String, Object> o = new LinkedHashMap<>();
        o.put("id", m.id);
        o.put("tareaCodigo", m.tarea != null ? m.tarea.codigo : null);
        o.put("tareaTitulo", m.tarea != null ? m.tarea.titulo : null);
        o.put("ticket", (m.tarea != null && m.tarea.ticketEspejo != null) ? m.tarea.ticketEspejo.helpdeskTicketId : null);
        o.put("equipoTarea", (m.tarea != null && m.tarea.board != null && m.tarea.board.equipo != null)
                ? m.tarea.board.equipo.nombre : null);
        o.put("asignado", (m.tarea != null && m.tarea.asignadoA != null) ? m.tarea.asignadoA.nombre : null);
        o.put("deHid", m.de != null ? m.de.helpdeskUserId : null);
        o.put("de", m.de != null ? m.de.nombre : null);
        o.put("texto", m.texto);
        o.put("visto", m.visto);
        o.put("creadoEn", m.creadoEn != null ? m.creadoEn.toString() : null);
        return o;
    }

    // ── helpers ──
    private static String text(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        if (v == null || v.isNull()) {
            return null;
        }
        String s = v.asText();
        return s == null || s.isBlank() ? null : s.trim();
    }

    private static Response bad(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", msg)).build();
    }

    private static Response forbidden(String msg) {
        return Response.status(Response.Status.FORBIDDEN).entity(Map.of("error", msg)).build();
    }
}
