package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Notificacion;
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
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Buzón de notificaciones del actor. TAREA_ASIGNADA/TAREA_SIN_FINALIZAR las genera SOLO el backend
 * (en {@link com.fitdesk.legacy.LegacyWriteService}, en el momento exacto de la escritura); el resto
 * (RECORDATORIO/REUNION/TICKET_NOVEDAD) las reporta el frontend cuando su propio chequeo periódico
 * las detecta — {@code POST} rechaza los dos primeros tipos a propósito.
 */
@Path("/api/notificaciones")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class NotificacionResource {

    /** Tipos que el FRONTEND puede reportar. Las de tarea las genera el backend solo. */
    private static final Set<String> TIPOS_REPORTABLES = Set.of("RECORDATORIO", "REUNION", "TICKET_NOVEDAD");

    @Inject
    NotificacionService notificaciones;

    @GET
    public List<Map<String, Object>> listar(@HeaderParam("X-Actor-Hid") String actorHid,
                                             @QueryParam("leidas") Boolean leidas) {
        List<Map<String, Object>> out = new ArrayList<>();
        Usuario actor = Actor.usuario(actorHid);
        if (actor == null) {
            return out;
        }
        String query = "usuario = ?1" + (leidas != null ? " and leida = ?2" : "") + " order by creadoEn desc";
        List<Notificacion> lista = leidas != null
                ? Notificacion.<Notificacion>list(query, actor, leidas)
                : Notificacion.<Notificacion>list(query, actor);
        for (Notificacion n : lista) {
            out.add(describir(n));
        }
        return out;
    }

    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Usuario actor = Actor.usuario(actorHid);
        if (actor == null) {
            return forbidden("actor no reconocido");
        }
        String tipo = text(in, "tipo");
        String clave = text(in, "clave");
        String titulo = text(in, "titulo");
        if (tipo == null || !TIPOS_REPORTABLES.contains(tipo)) {
            return bad("tipo inválido o no reportable (usa RECORDATORIO, REUNION o TICKET_NOVEDAD)");
        }
        if (clave == null || titulo == null) {
            return bad("clave y titulo son obligatorios");
        }
        notificaciones.crear(actor, tipo, clave, titulo, text(in, "cuerpo"), text(in, "url"));
        return Response.ok().build();
    }

    @POST
    @Path("/{id}/leida")
    @Transactional
    public Response marcarLeida(@PathParam("id") Long id, @HeaderParam("X-Actor-Hid") String actorHid) {
        Usuario actor = Actor.usuario(actorHid);
        Notificacion n = Notificacion.findById(id);
        if (n == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (actor == null || n.usuario == null || !n.usuario.id.equals(actor.id)) {
            return forbidden("solo el destinatario puede marcarla leída");
        }
        if (!n.leida) {
            n.leida = true;
            n.leidoEn = OffsetDateTime.now();
        }
        return Response.ok(describir(n)).build();
    }

    @POST
    @Path("/leidas")
    @Transactional
    public Response marcarTodasLeidas(@HeaderParam("X-Actor-Hid") String actorHid) {
        Usuario actor = Actor.usuario(actorHid);
        if (actor == null) {
            return forbidden("actor no reconocido");
        }
        int n = Notificacion.update("leida = true, leidoEn = ?1 where usuario = ?2 and leida = false",
                OffsetDateTime.now(), actor);
        return Response.ok(Map.of("marcadas", n)).build();
    }

    static Map<String, Object> describir(Notificacion n) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", n.id);
        m.put("tipo", n.tipo);
        m.put("titulo", n.titulo);
        m.put("cuerpo", n.cuerpo);
        m.put("url", n.url);
        m.put("leida", n.leida);
        m.put("creadoEn", n.creadoEn != null ? n.creadoEn.toString() : null);
        m.put("leidoEn", n.leidoEn != null ? n.leidoEn.toString() : null);
        return m;
    }

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
