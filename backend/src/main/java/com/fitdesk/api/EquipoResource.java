package com.fitdesk.api;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Regional;
import com.fitdesk.core.Rol;
import com.fitdesk.core.Sprint;
import com.fitdesk.core.Usuario;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/** Administración de Equipos (nacionalización por datos). Un equipo pertenece a una Regional. */
@Path("/api/admin/equipos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EquipoResource {

    @GET
    public List<Map<String, Object>> listar() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (Equipo e : Equipo.<Equipo>list("order by id")) {
            out.add(salida(e));
        }
        return out;
    }

    @POST
    @Transactional
    public Response crear(JsonNode in) {
        Long regionalId = in.hasNonNull("regionalId") ? in.get("regionalId").asLong() : null;
        String codigo = text(in, "codigo");
        String nombre = text(in, "nombre");
        if (regionalId == null || codigo == null || nombre == null) {
            return bad("regionalId, codigo y nombre son obligatorios");
        }
        Regional r = Regional.findById(regionalId);
        if (r == null) {
            return bad("regional " + regionalId + " no existe");
        }
        Equipo e = new Equipo();
        e.regional = r;
        e.codigo = codigo;
        e.nombre = nombre;
        e.persist();
        crearBoardInicial(e); // nace con su tablero + un sprint activo, listo para trabajar

        String respHid = text(in, "responsableHelpdeskUserId");
        if (respHid != null) {
            aplicarResponsable(e, respHid, text(in, "responsableNombre"));
        }
        return Response.status(Response.Status.CREATED).entity(salida(e)).build();
    }

    /** Todo equipo nace operable: un Board (codigo = codigo del equipo) y un Sprint activo inicial. */
    private static void crearBoardInicial(Equipo e) {
        if (Board.find("equipo = ?1", e).firstResult() != null) {
            return;
        }
        Board b = new Board();
        b.equipo = e;
        b.codigo = e.codigo;
        b.nombre = "Tablero " + e.nombre;
        b.persist();
        Sprint sp = new Sprint();
        sp.board = b;
        sp.codigo = "SP-01";
        sp.nombre = "Sprint 1";
        sp.estado = "active";
        sp.persist();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response actualizar(@PathParam("id") Long id, JsonNode in) {
        Equipo e = Equipo.findById(id);
        if (e == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (text(in, "nombre") != null) {
            e.nombre = text(in, "nombre");
        }
        if (in.has("activo")) {
            e.activo = in.get("activo").asBoolean(true);
        }
        if (in.hasNonNull("regionalId")) {
            Regional r = Regional.findById(in.get("regionalId").asLong());
            if (r != null) {
                e.regional = r;
            }
        }
        String respHid = text(in, "responsableHelpdeskUserId");
        if (respHid != null) {
            aplicarResponsable(e, respHid, text(in, "responsableNombre"));
        }
        return Response.ok(salida(e)).build();
    }

    /**
     * Asigna (REEMPLAZANDO) el responsable de equipo: materializa el usuario desde el HelpDesk
     * y le crea la Asignacion RESPONSABLE_EQUIPO con alcance = este equipo, quitando antes las
     * asignaciones RESPONSABLE_EQUIPO previas del equipo (el responsable es único).
     */
    private static void aplicarResponsable(Equipo e, String respHid, String respNombre) {
        Rol re = Rol.find("codigo", "RESPONSABLE_EQUIPO").firstResult();
        if (re == null) {
            return;
        }
        Usuario u = Usuario.findByHelpdeskUserId(respHid);
        if (u == null) {
            u = new Usuario();
            u.helpdeskUserId = respHid;
            u.nombre = respNombre != null ? respNombre : respHid;
            u.persist();
        }
        Asignacion.delete("rol = ?1 and alcanceEquipo = ?2", re, e);
        Asignacion a = new Asignacion();
        a.usuario = u;
        a.rol = re;
        a.alcanceTipo = "EQUIPO";
        a.alcanceEquipo = e;
        a.persist();
    }

    private static Map<String, Object> salida(Equipo e) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", e.id);
        m.put("codigo", e.codigo);
        m.put("nombre", e.nombre);
        m.put("activo", e.activo);
        m.put("regionalId", e.regional != null ? e.regional.id : null);
        m.put("regionalNombre", e.regional != null ? e.regional.nombre : null);
        // Responsable actual (primera Asignacion RESPONSABLE_EQUIPO del equipo, si hay).
        Rol re = Rol.find("codigo", "RESPONSABLE_EQUIPO").firstResult();
        Asignacion resp = re != null ? Asignacion.find("rol = ?1 and alcanceEquipo = ?2", re, e).firstResult() : null;
        m.put("responsableHelpdeskUserId", resp != null && resp.usuario != null ? resp.usuario.helpdeskUserId : null);
        m.put("responsableNombre", resp != null && resp.usuario != null ? resp.usuario.nombre : null);
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
}
