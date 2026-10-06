package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Usuario;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Administración de Usuarios y sus roles. Las personas vienen del HelpDesk (federación);
 * su "rol" no es un campo suelto: se deriva de sus Asignaciones vigentes (Rol × Alcance).
 * Esta vista lista cada usuario con el resumen de sus roles/alcances.
 */
@Path("/api/admin/usuarios")
@Produces(MediaType.APPLICATION_JSON)
public class UsuarioResource {

    @GET
    public List<Map<String, Object>> listar() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (Usuario u : Usuario.<Usuario>list("order by nombre")) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.id);
            m.put("codigoLocal", u.codigoLocal);
            m.put("helpdeskUserId", u.helpdeskUserId);
            m.put("nombre", u.nombre);
            m.put("alias", u.alias);
            m.put("color", u.color);
            m.put("activo", u.activo);
            m.put("equipoBaseCodigo", u.equipoBase != null ? u.equipoBase.codigo : null);
            m.put("equipoBaseNombre", u.equipoBase != null ? u.equipoBase.nombre : null);
            List<Map<String, Object>> roles = new ArrayList<>();
            for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1 order by id", u)) {
                roles.add(AsignacionResource.describir(a));
            }
            m.put("roles", roles);
            out.add(m);
        }
        return out;
    }

    /**
     * GET /api/admin/usuarios/equipos-base → { usuarios: {usuarioId: {codigo, nombre}}, editables: [codigo] }:
     * el equipo base de cada persona que lo tiene y los equipos que el actor puede poner/quitar como base
     * (ADMIN = todos; RESPONSABLE_EQUIPO = los que gobierna).
     */
    @GET
    @Path("/equipos-base")
    public Map<String, Object> equiposBase(@HeaderParam("X-Actor-Hid") String actorHid) {
        Map<String, Object> usuarios = new LinkedHashMap<>();
        for (Usuario u : Usuario.<Usuario>list("equipoBase is not null")) {
            usuarios.put(String.valueOf(u.id), Map.of("codigo", u.equipoBase.codigo,
                    "nombre", u.equipoBase.nombre != null ? u.equipoBase.nombre : u.equipoBase.codigo));
        }
        List<String> editables = new ArrayList<>();
        if (actorHid != null && !actorHid.isBlank()) {
            for (Equipo e : Equipo.<Equipo>list("activo = true order by nombre")) {
                if (Actor.gobierna(actorHid, e.id)) {
                    editables.add(e.codigo);
                }
            }
        }
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("usuarios", usuarios);
        out.put("editables", editables);
        return out;
    }

    /**
     * PUT /api/admin/usuarios/{id}/equipo-base  body {equipo: codigo|null} → fija o quita el equipo base de la
     * persona. Quien lo cambia debe gobernar el equipo NUEVO y, si ya tenía uno, también el ACTUAL (un
     * responsable no puede "llevarse" a la gente de otro equipo). ADMIN puede todo.
     */
    @PUT
    @Path("/{id}/equipo-base")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response setEquipoBase(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (actorHid == null || actorHid.isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", "falta X-Actor-Hid")).build();
        }
        Usuario u = Usuario.findById(id);
        if (u == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "usuario no encontrado")).build();
        }
        String codigo = in != null && in.hasNonNull("equipo") ? in.get("equipo").asText().trim() : "";
        Equipo nuevo = null;
        if (!codigo.isEmpty()) {
            nuevo = Equipo.find("codigo", codigo).firstResult();
            if (nuevo == null) {
                return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "equipo no encontrado: " + codigo)).build();
            }
        }
        boolean puede = (nuevo == null || Actor.gobierna(actorHid, nuevo.id))
                && (u.equipoBase == null || Actor.gobierna(actorHid, u.equipoBase.id));
        if (!puede) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity(Map.of("error", "solo quien dirige el equipo puede cambiar el equipo base")).build();
        }
        u.equipoBase = nuevo;
        u.actualizadoEn = OffsetDateTime.now();
        Map<String, Object> ok = new LinkedHashMap<>();
        ok.put("ok", true);
        ok.put("equipoBaseCodigo", nuevo != null ? nuevo.codigo : null);
        ok.put("equipoBaseNombre", nuevo != null ? nuevo.nombre : null);
        return Response.ok(ok).build();
    }
}
