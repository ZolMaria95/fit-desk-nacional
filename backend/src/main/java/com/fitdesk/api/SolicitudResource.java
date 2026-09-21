package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Solicitud;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.Transferencia;
import com.fitdesk.core.Usuario;
import com.fitdesk.notificaciones.NotificacionService;

import jakarta.inject.Inject;
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
 * Solicitud del Especialista: como no reasigna/transfiere directamente, escala al
 * Responsable de Equipo del equipo dueño de la Tarea, que la APRUEBA (ejecuta) o RECHAZA.
 *  - REASIGNACION → al aprobar, reasigna la Tarea (asignado sugerido o el que confirme el RE).
 *  - TRANSFERENCIA → al aprobar, genera una {@link Transferencia} PENDIENTE al equipo destino.
 * La Tarea nunca cambia de board. Autorización derivada de las Asignaciones ({@link Actor}).
 */
@Path("/api/solicitudes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SolicitudResource {

    @Inject
    NotificacionService notificaciones;

    // ── Crear: el Especialista escala sobre una tarea SUYA ───────────────
    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (!Actor.tieneRol(actorHid, "ESPECIALISTA")) {
            return forbidden("solo un Especialista escala por solicitud");
        }
        String tareaCodigo = text(in, "tareaCodigo");
        String ticket = text(in, "ticket");
        String tipo = text(in, "tipo");
        if (tipo == null || (tareaCodigo == null && (ticket == null || ticket.isBlank()))) {
            return bad("(tareaCodigo o ticket) y tipo son obligatorios");
        }
        if (!"REASIGNACION".equals(tipo) && !"TRANSFERENCIA".equals(tipo)) {
            return bad("tipo inválido: " + tipo + " (REASIGNACION | TRANSFERENCIA)");
        }
        Usuario actor = Actor.usuario(actorHid);
        if (actor == null) {
            return forbidden("actor desconocido");
        }
        Tarea tarea;
        if (tareaCodigo != null) {
            // Camino clásico: la tarea ya existe y debe estar asignada al especialista.
            tarea = Tarea.findByCodigo(tareaCodigo);
            if (tarea == null) {
                return bad("tarea inexistente: " + tareaCodigo);
            }
            if (tarea.asignadoA == null || !tarea.asignadoA.id.equals(actor.id)) {
                return forbidden("solo puedes escalar una tarea asignada a ti");
            }
        } else {
            // Camino NUEVO: escalar un TICKET sin tarea previa → crear la tarea OCULTA en el
            // board del equipo del especialista, asignada a él; aparece al aprobar (ver /aprobar).
            Asignacion asig = Asignacion.<Asignacion>find(
                    "usuario = ?1 and alcanceTipo = 'EQUIPO' and activo = true", actor).firstResult();
            Equipo equipoActor = asig != null ? asig.alcanceEquipo : null;
            if (equipoActor == null) {
                return bad("no se pudo determinar tu equipo para crear la tarea");
            }
            Board board = Board.<Board>find("equipo.id = ?1 and activo = true order by id", equipoActor.id).firstResult();
            if (board == null) {
                board = Board.<Board>find("equipo.id = ?1 order by id", equipoActor.id).firstResult();
            }
            if (board == null) {
                return bad("tu equipo no tiene board para alojar la tarea");
            }
            tarea = TransferenciaResource.crearTareaOcultaDesdeTicket(ticket, board, text(in, "titulo"), text(in, "clienteCodigo"));
            tarea.asignadoA = actor; // es "su" trabajo (pasa el chequeo de propiedad)
        }
        // Resolver sugerencias (opcionales) ANTES de persistir.
        Equipo destino = null;
        if (asLong(in, "equipoDestinoId") != null) {
            destino = Equipo.findById(asLong(in, "equipoDestinoId"));
            if (destino == null) {
                return bad("equipo destino inexistente");
            }
        }
        Usuario sugerido = null;
        if (text(in, "asignadoSugeridoHid") != null) {
            sugerido = TransferenciaResource.usuarioBy(text(in, "asignadoSugeridoHid"));
            if (sugerido == null) {
                return bad("usuario sugerido inexistente");
            }
        }
        Solicitud s = new Solicitud();
        s.tarea = tarea;
        s.solicitante = actor;
        s.tipo = tipo;
        s.motivo = text(in, "motivo");
        s.estado = "PENDIENTE";
        s.equipoDestino = destino;
        s.asignadoSugerido = sugerido;
        s.persist();
        notificaciones.solicitudPendiente(s);
        return Response.status(Response.Status.CREATED).entity(describir(s)).build();
    }

    // ── Bandeja del RE: solicitudes PENDIENTES sobre tareas de mis equipos ──
    @GET
    @Path("/entrantes")
    public List<Map<String, Object>> entrantes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> mis = Actor.equiposGestionables(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (mis.isEmpty()) {
            return out;
        }
        for (Solicitud s : Solicitud.<Solicitud>list(
                "estado = ?1 and tarea.board.equipo.id in ?2 order by creadoEn desc", "PENDIENTE", mis)) {
            out.add(describir(s));
        }
        return out;
    }

    // ── Las mías (el solicitante ve el estado de lo que pidió) ───────────
    @GET
    @Path("/mias")
    public List<Map<String, Object>> mias(@HeaderParam("X-Actor-Hid") String actorHid) {
        Usuario actor = Actor.usuario(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (actor == null) {
            return out;
        }
        for (Solicitud s : Solicitud.<Solicitud>list("solicitante = ?1 order by creadoEn desc", actor)) {
            out.add(describir(s));
        }
        return out;
    }

    // ── Aprobar: el RE del equipo de la tarea ejecuta ────────────────────
    @POST
    @Path("/{id}/aprobar")
    @Transactional
    public Response aprobar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Solicitud s = Solicitud.findById(id);
        if (s == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!"PENDIENTE".equals(s.estado)) {
            return bad("la solicitud ya fue resuelta (" + s.estado + ")");
        }
        Equipo equipoTarea = (s.tarea != null && s.tarea.board != null) ? s.tarea.board.equipo : null;
        if (equipoTarea == null || !Actor.gobierna(actorHid, equipoTarea.id)) {
            return forbidden("solo el Responsable del equipo de la tarea (o un ADMIN) puede aprobar");
        }
        // Resolver y validar TODO en locales antes de mutar (evita updates parciales).
        if ("REASIGNACION".equals(s.tipo)) {
            // El RE puede confirmar/override el asignado con body {asignadoHid}; si no, el sugerido.
            Usuario destinatario = text(in, "asignadoHid") != null
                    ? TransferenciaResource.usuarioBy(text(in, "asignadoHid"))
                    : s.asignadoSugerido;
            if (destinatario == null) {
                return bad("falta el asignado (asignadoHid en el body o asignadoSugerido en la solicitud)");
            }
            s.tarea.asignadoA = destinatario;
            // Si la tarea nació de un ticket escalado (oculta), al aprobar la reasignación APARECE en el board.
            s.tarea.pendienteTransferencia = false;
            s.tarea.actualizadoEn = OffsetDateTime.now();
        } else { // TRANSFERENCIA (la tarea sigue oculta hasta que el equipo destino ACEPTE la transferencia)
            Equipo destino = asLong(in, "equipoDestinoId") != null
                    ? Equipo.findById(asLong(in, "equipoDestinoId"))
                    : s.equipoDestino;
            if (destino == null) {
                return bad("falta el equipo destino (equipoDestinoId en el body o equipoDestino en la solicitud)");
            }
            if (destino.id.equals(equipoTarea.id)) {
                return bad("el equipo destino es el mismo que el de la tarea");
            }
            Transferencia t = new Transferencia();
            t.tarea = s.tarea;
            t.equipoOrigen = equipoTarea;
            t.equipoDestino = destino;
            t.despachadorOrigen = Actor.usuario(actorHid);
            t.estado = "PENDIENTE";
            t.motivo = s.motivo;
            t.persist();
            notificaciones.transferenciaPendiente(t);
            s.transferencia = t;
        }
        s.resueltaPor = Actor.usuario(actorHid);
        s.estado = "APROBADA";
        s.resueltoEn = OffsetDateTime.now();
        return Response.ok(describir(s)).build();
    }

    // ── Rechazar ─────────────────────────────────────────────────────────
    @POST
    @Path("/{id}/rechazar")
    @Transactional
    public Response rechazar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Solicitud s = Solicitud.findById(id);
        if (s == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!"PENDIENTE".equals(s.estado)) {
            return bad("la solicitud ya fue resuelta (" + s.estado + ")");
        }
        Equipo equipoTarea = (s.tarea != null && s.tarea.board != null) ? s.tarea.board.equipo : null;
        if (equipoTarea == null || !Actor.gobierna(actorHid, equipoTarea.id)) {
            return forbidden("solo el Responsable del equipo de la tarea (o un ADMIN) puede rechazar");
        }
        // Si la tarea nació SOLO para esta solicitud (ticket sin tarea previa), se descarta entera.
        if (s.tarea != null && s.tarea.pendienteTransferencia) {
            Tarea oculta = s.tarea;
            s.delete();
            oculta.delete();
            return Response.ok(Map.of("ok", true, "descartada", true)).build();
        }
        s.resueltaPor = Actor.usuario(actorHid);
        s.estado = "RECHAZADA";
        if (in != null && text(in, "motivo") != null) {
            s.motivo = text(in, "motivo");
        }
        s.resueltoEn = OffsetDateTime.now();
        return Response.ok(describir(s)).build();
    }

    /**
     * Cancela una solicitud PROPIA mientras sigue PENDIENTE. La autoriza el propio
     * {@code solicitante} — a diferencia de aprobar/rechazar, una Solicitud es personal (sobre
     * la tarea que uno mismo tiene asignada), no algo que gobierne el Responsable del equipo.
     * Estado distinto de RECHAZADA a propósito: no es que el Responsable la haya rechazado.
     */
    @POST
    @Path("/{id}/cancelar")
    @Transactional
    public Response cancelar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Solicitud s = Solicitud.findById(id);
        if (s == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!"PENDIENTE".equals(s.estado)) {
            return bad("la solicitud ya fue resuelta (" + s.estado + ")");
        }
        Usuario actor = Actor.usuario(actorHid);
        if (actor == null || s.solicitante == null || !s.solicitante.id.equals(actor.id)) {
            return forbidden("solo quien la solicitó puede cancelarla");
        }
        // Misma regla que rechazar: la tarea que nació SOLO para esta solicitud (ticket sin
        // tarea previa) se descarta entera, sin dejar rastro.
        if (s.tarea != null && s.tarea.pendienteTransferencia) {
            Tarea oculta = s.tarea;
            s.delete();
            oculta.delete();
            return Response.ok(Map.of("ok", true, "descartada", true)).build();
        }
        s.estado = "CANCELADA";
        if (in != null && text(in, "motivo") != null) {
            s.motivo = text(in, "motivo");
        }
        s.resueltoEn = OffsetDateTime.now();
        return Response.ok(describir(s)).build();
    }

    // ── Serialización legible ────────────────────────────────────────────
    static Map<String, Object> describir(Solicitud s) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", s.id);
        m.put("tareaCodigo", s.tarea != null ? s.tarea.codigo : null);
        m.put("tareaTitulo", s.tarea != null ? s.tarea.titulo : null);
        // N° de ticket del HelpDesk (si la tarea nace de un ticket) → abrir la conversación desde la Bandeja.
        m.put("ticket", (s.tarea != null && s.tarea.ticketEspejo != null) ? s.tarea.ticketEspejo.helpdeskTicketId : null);
        m.put("equipoTarea", (s.tarea != null && s.tarea.board != null && s.tarea.board.equipo != null)
                ? s.tarea.board.equipo.nombre : null);
        m.put("solicitanteHid", s.solicitante != null ? s.solicitante.helpdeskUserId : null);
        m.put("solicitante", s.solicitante != null ? s.solicitante.nombre : null);
        m.put("tipo", s.tipo);
        m.put("motivo", s.motivo);
        m.put("estado", s.estado);
        m.put("equipoDestinoId", s.equipoDestino != null ? s.equipoDestino.id : null);
        m.put("equipoDestino", s.equipoDestino != null ? s.equipoDestino.nombre : null);
        m.put("asignadoSugeridoHid", s.asignadoSugerido != null ? s.asignadoSugerido.helpdeskUserId : null);
        m.put("asignadoSugerido", s.asignadoSugerido != null ? s.asignadoSugerido.nombre : null);
        m.put("resueltaPor", s.resueltaPor != null ? s.resueltaPor.nombre : null);
        m.put("transferenciaId", s.transferencia != null ? s.transferencia.id : null);
        m.put("creadoEn", s.creadoEn != null ? s.creadoEn.toString() : null);
        m.put("resueltoEn", s.resueltoEn != null ? s.resueltoEn.toString() : null);
        return m;
    }

    // ── helpers ──
    private static String text(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        if (v == null || v.isNull()) {
            return null;
        }
        String str = v.asText();
        return str == null || str.isBlank() ? null : str.trim();
    }

    private static Long asLong(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        return v == null || v.isNull() ? null : v.asLong();
    }

    private static Response bad(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", msg)).build();
    }

    private static Response forbidden(String msg) {
        return Response.status(Response.Status.FORBIDDEN).entity(Map.of("error", msg)).build();
    }
}
