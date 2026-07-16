package com.fitdesk.api;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Usuario;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

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
            List<Map<String, Object>> roles = new ArrayList<>();
            for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1 order by id", u)) {
                roles.add(AsignacionResource.describir(a));
            }
            m.put("roles", roles);
            out.add(m);
        }
        return out;
    }
}
