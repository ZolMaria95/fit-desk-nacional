package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.Transferencia;
import com.fitdesk.core.Usuario;

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

    // ── Crear (equipo origen → equipo destino) ───────────────────────────
    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        String tareaCodigo = text(in, "tareaCodigo");
        Long equipoDestinoId = asLong(in, "equipoDestinoId");
        if (tareaCodigo == null || equipoDestinoId == null) {
            return bad("tareaCodigo y equipoDestinoId son obligatorios");
        }
        Tarea tarea = Tarea.findByCodigo(tareaCodigo);
        if (tarea == null) {
            return bad("tarea inexistente: " + tareaCodigo);
        }
        Equipo origen = tarea.board != null ? tarea.board.equipo : null;
        if (origen == null) {
            return bad("la tarea no tiene equipo de origen (board sin equipo)");
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
        for (Transferencia t : Transferencia.<Transferencia>list(
                "estado = ?1 and equipoDestino.id in ?2 order by creadoEn desc", "PENDIENTE", mis)) {
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
    public Response aceptar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
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
        t.tarea.asignadoA = asignado;
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
        t.despachadorDestino = Actor.usuario(actorHid);
        t.estado = "RECHAZADA";
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

    // ── Miembros de un equipo (para el picker "asignar a" al aceptar) ────
    // Membresía = usuarios con Asignación vigente de alcance EQUIPO = ese equipo
    // (no hay FK usuario→equipo; se deriva de las Asignaciones).
    @GET
    @Path("/equipo/{equipoId}/miembros")
    public List<Map<String, Object>> miembros(@PathParam("equipoId") Long equipoId) {
        List<Map<String, Object>> out = new ArrayList<>();
        Set<Long> vistos = new java.util.HashSet<>();
        for (Asignacion a : Asignacion.<Asignacion>list(
                "alcanceTipo = 'EQUIPO' and alcanceEquipo.id = ?1 and activo = true", equipoId)) {
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
        return out;
    }

    // ── Serialización legible ────────────────────────────────────────────
    static Map<String, Object> describir(Transferencia t) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", t.id);
        m.put("tareaCodigo", t.tarea != null ? t.tarea.codigo : null);
        m.put("tareaTitulo", t.tarea != null ? t.tarea.titulo : null);
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
