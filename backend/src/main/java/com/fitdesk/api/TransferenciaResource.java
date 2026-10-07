package com.fitdesk.api;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Transferencia;
import com.fitdesk.core.Usuario;
import com.fitdesk.core.WorkflowEstado;
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
 * Transferencia de una Tarea entre equipos (request-based). La inicia el Responsable de
 * Equipo (o ADMIN) del equipo origen; el equipo destino la ACEPTA (asignando a un miembro)
 * o la RECHAZA desde su bandeja. La Tarea NO cambia de board: solo cambia `asignado_a`.
 * Autorización derivada de las Asignaciones (ver {@link Actor}); actor en `X-Actor-Hid`.
 */
@Path("/api/transferencias")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TransferenciaResource {

    @jakarta.inject.Inject
    TicketGestion gestion;


    @Inject
    NotificacionService notificaciones;

    // ── Crear (equipo origen → equipo destino) ───────────────────────────
    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        String tareaCodigo = text(in, "tareaCodigo");
        String ticket = text(in, "ticket");
        Long equipoDestinoId = asLong(in, "equipoDestinoId");
        if (equipoDestinoId == null || (tareaCodigo == null && (ticket == null || ticket.isBlank()))) {
            return bad("equipoDestinoId y (tareaCodigo o ticket) son obligatorios");
        }

        Tarea tarea;
        Equipo origen;
        if (tareaCodigo != null) {
            // Camino clásico: la tarea YA existe en un board.
            tarea = Tarea.findByCodigo(tareaCodigo);
            if (tarea == null) {
                return bad("tarea inexistente: " + tareaCodigo);
            }
            origen = tarea.board != null ? tarea.board.equipo : null;
            if (origen == null) {
                return bad("la tarea no tiene equipo de origen (board sin equipo)");
            }
        } else if (com.fitdesk.legacy.LegacyWriteService.tareaDeTicket(ticket) != null) {
            // El ticket YA tiene tarea (quizá en otro tablero): se transfiere esa, no se crea otra.
            tarea = com.fitdesk.legacy.LegacyWriteService.tareaDeTicket(ticket);
            origen = tarea.board != null ? tarea.board.equipo : null;
            if (origen == null) {
                return bad("la tarea del ticket no tiene equipo de origen (board sin equipo)");
            }
        } else {
            // Camino NUEVO: transferir un TICKET sin tarea previa. Se crea la tarea OCULTA en
            // el board del equipo del actor (el remitente); aparece al aceptarse (ver /aceptar).
            Long origenId = asLong(in, "equipoOrigenId");
            java.util.Set<Long> mis = Actor.equiposGestionables(actorHid);
            if (origenId == null) {
                origenId = mis.stream().findFirst().orElse(null);
            }
            if (origenId == null || !mis.contains(origenId)) {
                return forbidden("el actor no gobierna un equipo origen válido");
            }
            origen = Equipo.findById(origenId);
            Board board = Board.<Board>find("equipo.id = ?1 and activo = true order by id", origenId).firstResult();
            if (board == null) {
                board = Board.<Board>find("equipo.id = ?1 order by id", origenId).firstResult();
            }
            if (board == null) {
                return bad("el equipo origen no tiene board para alojar la tarea");
            }
            tarea = crearTareaOcultaDesdeTicket(ticket, board, text(in, "titulo"), text(in, "clienteCodigo"));
        }

        Equipo destino = Equipo.findById(equipoDestinoId);
        if (destino == null) {
            return bad("equipo destino inexistente");
        }
        if (destino.id.equals(origen.id)) {
            return bad("el equipo destino es el mismo que el origen");
        }
        // Solo el RE (o ADMIN) del equipo ORIGEN puede enviar.
        if (!Actor.gobierna(actorHid, origen.id)) {
            return forbidden("solo el Responsable del equipo origen (o un ADMIN) puede transferir");
        }
        Transferencia t = new Transferencia();
        t.tarea = tarea;
        t.equipoOrigen = origen;
        t.equipoDestino = destino;
        t.despachadorOrigen = Actor.usuario(actorHid);
        t.estado = "PENDIENTE";
        t.motivo = text(in, "motivo");
        t.persist();
        notificaciones.transferenciaPendiente(t);
        return Response.status(Response.Status.CREATED).entity(describir(t)).build();
    }

    // ── Bandeja del equipo receptor: PENDIENTES dirigidas a mis equipos ──
    @GET
    @Path("/entrantes")
    public List<Map<String, Object>> entrantes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> mis = Actor.equiposGestionables(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (mis.isEmpty()) {
            return out;
        }
        // EXCLUYE lo que despaché YO: si gobierno también el equipo destino (p. ej. ADMIN),
        // un traslado que YO envié aparecía como "pendiente a aceptar" — pero no debo aceptar
        // mi propio envío. Esas van a /salientes ("Enviadas"). despachadorOrigen null = legacy.
        Usuario actor = Actor.usuario(actorHid);
        long actorId = actor != null ? actor.id : -1L;
        for (Transferencia t : Transferencia.<Transferencia>list(
                "estado = ?1 and equipoDestino.id in ?2 and (despachadorOrigen is null or despachadorOrigen.id <> ?3) order by creadoEn desc",
                "PENDIENTE", mis, actorId)) {
            out.add(describir(t));
        }
        return out;
    }

    // ── Seguimiento de lo enviado por mis equipos ────────────────────────
    @GET
    @Path("/salientes")
    public List<Map<String, Object>> salientes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> mis = Actor.equiposGestionables(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (mis.isEmpty()) {
            return out;
        }
        for (Transferencia t : Transferencia.<Transferencia>list(
                "equipoOrigen.id in ?1 order by creadoEn desc", mis)) {
            out.add(describir(t));
        }
        return out;
    }

    // ── Aceptar: asignar a un miembro del equipo destino (Tarea NO cambia de board) ──
    @POST
    @Path("/{id}/aceptar")
    @Transactional
    public Response aceptar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid,
            @HeaderParam("Authorization") String authorization) {
        Transferencia t = Transferencia.findById(id);
        if (t == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!"PENDIENTE".equals(t.estado)) {
            return bad("la transferencia ya fue resuelta (" + t.estado + ")");
        }
        if (t.equipoDestino == null || !Actor.gobierna(actorHid, t.equipoDestino.id)) {
            return forbidden("solo el Responsable del equipo destino (o un ADMIN) puede aceptar");
        }
        // Validar el asignado ANTES de mutar la transferencia/tarea (managed).
        String asignadoHid = text(in, "asignadoHid");
        if (asignadoHid == null) {
            return bad("asignadoHid es obligatorio para aceptar (a quién se asigna la tarea)");
        }
        Usuario asignado = usuarioBy(asignadoHid);
        if (asignado == null) {
            return bad("usuario asignado inexistente: " + asignadoHid);
        }
        // Tarea con ticket: se asigna también el TICKET en el HelpDesk (síncrono). Si el HelpDesk no lo
        // confirma, la transferencia sigue PENDIENTE (antes se completaba y el ticket quedaba sin asignar).
        Response errHd = gestion.asignarTicketDeTarea(t.tarea, asignado, authorization);
        if (errHd != null) {
            return errHd;
        }
        t.tarea.asignadoA = asignado;
        // Si la tarea nació de un ticket transferido (oculta), al aceptar APARECE en el board.
        t.tarea.pendienteTransferencia = false;
        t.tarea.actualizadoEn = OffsetDateTime.now();
        t.asignadoDestino = asignado;
        t.despachadorDestino = Actor.usuario(actorHid);
        t.estado = "COMPLETADA";
        t.resueltoEn = OffsetDateTime.now();
        return Response.ok(describir(t)).build();
    }

    // ── Rechazar ─────────────────────────────────────────────────────────
    @POST
    @Path("/{id}/rechazar")
    @Transactional
    public Response rechazar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Transferencia t = Transferencia.findById(id);
        if (t == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!"PENDIENTE".equals(t.estado)) {
            return bad("la transferencia ya fue resuelta (" + t.estado + ")");
        }
        if (t.equipoDestino == null || !Actor.gobierna(actorHid, t.equipoDestino.id)) {
            return forbidden("solo el Responsable del equipo destino (o un ADMIN) puede rechazar");
        }
        // Si la tarea nació SOLO para esta transferencia (ticket sin tarea previa), se descarta
        // entera: nunca se materializó en ningún board, no deja rastro que gestionar.
        if (t.tarea != null && t.tarea.pendienteTransferencia) {
            Tarea oculta = t.tarea;
            t.delete();
            oculta.delete();
            return Response.ok(Map.of("ok", true, "descartada", true)).build();
        }
        t.despachadorDestino = Actor.usuario(actorHid);
        t.estado = "RECHAZADA";
        if (in != null && text(in, "motivo") != null) {
            t.motivo = text(in, "motivo");
        }
        t.resueltoEn = OffsetDateTime.now();
        return Response.ok(describir(t)).build();
    }

    /**
     * Cancela un envío PROPIO mientras sigue PENDIENTE. La autoriza quien gobierna el equipo
     * ORIGEN (el mismo chequeo que exige {@code crear} para poder enviarla) — no el destino, que
     * sigue teniendo su propio camino en {@code rechazar}. Estado distinto de RECHAZADA a
     * propósito: el destino no debe ver "rechazaste tú" cuando en realidad el emisor se arrepintió.
     */
    @POST
    @Path("/{id}/cancelar")
    @Transactional
    public Response cancelar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Transferencia t = Transferencia.findById(id);
        if (t == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!"PENDIENTE".equals(t.estado)) {
            return bad("la transferencia ya fue resuelta (" + t.estado + ")");
        }
        if (t.equipoOrigen == null || !Actor.gobierna(actorHid, t.equipoOrigen.id)) {
            return forbidden("solo el Responsable del equipo origen (o un ADMIN) puede cancelar su envío");
        }
        // Misma regla que rechazar: la tarea que nació SOLO para esta transferencia (ticket sin
        // tarea previa) se descarta entera, sin dejar rastro.
        if (t.tarea != null && t.tarea.pendienteTransferencia) {
            Tarea oculta = t.tarea;
            t.delete();
            oculta.delete();
            return Response.ok(Map.of("ok", true, "descartada", true)).build();
        }
        t.estado = "CANCELADA";
        if (in != null && text(in, "motivo") != null) {
            t.motivo = text(in, "motivo");
        }
        t.resueltoEn = OffsetDateTime.now();
        return Response.ok(describir(t)).build();
    }

    // ── Trabajo entrante YA aceptado de mis equipos (para que el RE lo rastree) ──
    // Transferencias COMPLETADAS dirigidas a mis equipos: qué tarea (de otro equipo) lleva
    // ahora alguien de mi equipo. Responde "¿qué trabajo foráneo tiene mi gente?".
    @GET
    @Path("/aceptadas")
    public List<Map<String, Object>> aceptadas(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> mis = Actor.equiposGestionables(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (mis.isEmpty()) {
            return out;
        }
        for (Transferencia t : Transferencia.<Transferencia>list(
                "estado = ?1 and equipoDestino.id in ?2 order by resueltoEn desc", "COMPLETADA", mis)) {
            out.add(describir(t));
        }
        return out;
    }

    // ── Roster de mis equipos: hids de los miembros de los equipos que gobierno ──
    // Lo usa el board para el toggle "Mi equipo" (incluir tareas foráneas de mi gente).
    @GET
    @Path("/mi-equipo/miembros")
    public List<Map<String, Object>> miEquipoMiembros(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> mis = Actor.equiposGestionables(actorHid);
        List<Map<String, Object>> out = new ArrayList<>();
        if (mis.isEmpty()) {
            return out;
        }
        Set<Long> vistos = new java.util.HashSet<>();
        for (Asignacion a : Asignacion.<Asignacion>list(
                "alcanceTipo = 'EQUIPO' and alcanceEquipo.id in ?1 and activo = true", mis)) {
            Usuario u = a.usuario;
            if (u == null || !vistos.add(u.id)) {
                continue;
            }
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("helpdeskUserId", u.helpdeskUserId);
            m.put("nombre", u.nombre);
            out.add(m);
        }
        return out;
    }

    /**
     * Miembros elegibles para el picker "asignar a" al aceptar una transferencia hacia este
     * equipo. Quien acepta (RE de equipo o REGIONAL) puede repartir la tarea entre CUALQUIER
     * consultor de su alcance, sin importar rol: no solo quien tiene Asignación EQUIPO sobre
     * este equipo exacto, sino también los de los equipos HERMANOS de la misma Regional, quien
     * tenga Asignación REGIONAL sobre esa Regional (cubre toda ella, cualquier equipo), y
     * cualquiera de alcance GLOBAL (cubre cualquier equipo/regional). Antes solo miraba
     * EQUIPO=este equipo, y un responsable REGIONAL sin la Asignación EQUIPO redundante ni
     * siquiera se veía a sí mismo en su propio picker.
     */
    @GET
    @Path("/equipo/{equipoId}/miembros")
    public List<Map<String, Object>> miembros(@PathParam("equipoId") Long equipoId) {
        List<Map<String, Object>> out = new ArrayList<>();
        Equipo eq = Equipo.findById(equipoId);
        if (eq == null) {
            return out;
        }
        LocalDate hoy = com.fitdesk.core.Asignacion.hoy();
        List<Asignacion> candidatos = new ArrayList<>();
        if (eq.regional != null) {
            Set<Long> equiposDeLaRegional = new java.util.HashSet<>();
            for (Equipo e : Equipo.<Equipo>list("regional = ?1", eq.regional)) {
                equiposDeLaRegional.add(e.id);
            }
            candidatos.addAll(Asignacion.<Asignacion>list(
                    "alcanceTipo = 'EQUIPO' and alcanceEquipo.id in ?1 and activo = true", equiposDeLaRegional));
            candidatos.addAll(Asignacion.<Asignacion>list(
                    "alcanceTipo = 'REGIONAL' and alcanceRegional = ?1 and activo = true", eq.regional));
        } else {
            // Equipo sin regional asignada (dato legacy/incompleto): al menos su propio alcance EQUIPO.
            candidatos.addAll(Asignacion.<Asignacion>list(
                    "alcanceTipo = 'EQUIPO' and alcanceEquipo.id = ?1 and activo = true", equipoId));
        }
        candidatos.addAll(Asignacion.<Asignacion>list("alcanceTipo = 'GLOBAL' and activo = true"));

        Set<Long> vistos = new java.util.HashSet<>();
        for (Asignacion a : candidatos) {
            if (!a.enFechas(hoy)) {
                continue;
            }
            Usuario u = a.usuario;
            if (u == null || !vistos.add(u.id)) {
                continue;
            }
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("helpdeskUserId", u.helpdeskUserId);
            m.put("codigoLocal", u.codigoLocal);
            m.put("nombre", u.nombre);
            out.add(m);
        }
        out.sort(java.util.Comparator.comparing(m -> String.valueOf(m.get("nombre"))));
        return out;
    }

    // ── Serialización legible ────────────────────────────────────────────
    static Map<String, Object> describir(Transferencia t) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", t.id);
        m.put("tareaCodigo", t.tarea != null ? t.tarea.codigo : null);
        m.put("tareaTitulo", t.tarea != null ? t.tarea.titulo : null);
        // N° de ticket del HelpDesk (si la tarea nace de un ticket) → permite abrir el ticket en la vista Tickets.
        m.put("ticket", (t.tarea != null && t.tarea.ticketEspejo != null) ? t.tarea.ticketEspejo.helpdeskTicketId : null);
        m.put("clienteTarea", (t.tarea != null && t.tarea.cliente != null) ? t.tarea.cliente.nombre : null);
        m.put("equipoOrigenId", t.equipoOrigen != null ? t.equipoOrigen.id : null);
        m.put("equipoOrigen", t.equipoOrigen != null ? t.equipoOrigen.nombre : null);
        m.put("equipoDestinoId", t.equipoDestino != null ? t.equipoDestino.id : null);
        m.put("equipoDestino", t.equipoDestino != null ? t.equipoDestino.nombre : null);
        m.put("despachadorOrigen", t.despachadorOrigen != null ? t.despachadorOrigen.nombre : null);
        m.put("despachadorDestino", t.despachadorDestino != null ? t.despachadorDestino.nombre : null);
        m.put("asignadoDestinoHid", t.asignadoDestino != null ? t.asignadoDestino.helpdeskUserId : null);
        m.put("asignadoDestino", t.asignadoDestino != null ? t.asignadoDestino.nombre : null);
        m.put("estado", t.estado);
        m.put("motivo", t.motivo);
        m.put("creadoEn", t.creadoEn != null ? t.creadoEn.toString() : null);
        m.put("resueltoEn", t.resueltoEn != null ? t.resueltoEn.toString() : null);
        return m;
    }

    /** Crea la Tarea OCULTA (pendiente de transferencia) desde un ticket sin tarea previa.
     *  Nace en el board indicado, sin asignar; aparece en el board al aceptarse/aprobarse.
     *  static + package-private para reutilizar desde {@link SolicitudResource}. */
    static Tarea crearTareaOcultaDesdeTicket(String ticket, Board board, String titulo, String clienteCodigo) {
        Tarea t = new Tarea();
        t.codigo = nuevoCodigoTarea();
        t.board = board;
        t.workflowEstado = WorkflowEstado.<WorkflowEstado>find("activo = true order by orden").firstResult();
        t.pendienteTransferencia = true;
        t.tipo = "DESARROLLO_SOPORTE";
        // Enlace al ticket del HelpDesk (crea el espejo si no existía).
        TicketEspejo esp = TicketEspejo.findByHelpdeskTicketId(ticket);
        if (esp == null) {
            esp = new TicketEspejo();
            esp.helpdeskTicketId = ticket;
            if (titulo != null && !titulo.isBlank()) {
                esp.asunto = titulo;
            }
            esp.persist();
        }
        t.ticketEspejo = esp;
        if (titulo != null && !titulo.isBlank()) {
            t.titulo = titulo;
        }
        if (clienteCodigo != null && !clienteCodigo.isBlank()) {
            t.cliente = Cliente.findByCodigo(clienteCodigo);
        }
        t.persist();
        return t;
    }

    /** Código único "TA-<n>" (n = máximo numérico existente + 1). El board muestra t.codigo. */
    static String nuevoCodigoTarea() {
        int max = 0;
        for (Tarea t : Tarea.<Tarea>listAll()) {
            String c = t.codigo;
            if (c != null && c.startsWith("TA-")) {
                try {
                    max = Math.max(max, Integer.parseInt(c.substring(3).trim()));
                } catch (NumberFormatException ignore) {
                    // códigos con otro formato: se ignoran para el cálculo del máximo
                }
            }
        }
        return "TA-" + (max + 1);
    }

    /** Resuelve un usuario por helpdesk_user_id y, como respaldo, por codigo local. */
    static Usuario usuarioBy(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        Usuario u = Usuario.findByHelpdeskUserId(token.trim());
        return u != null ? u : Usuario.findByCodigoLocal(token.trim());
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
