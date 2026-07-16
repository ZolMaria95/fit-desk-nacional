package com.fitdesk.api;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Usuario;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

/**
 * Roles de PLATAFORMA del usuario logueado (derivados de sus Asignaciones vigentes),
 * por `helpdesk_user_id`. Es la realización del principio "los roles se definen en la
 * plataforma, no por el rol del HelpDesk": el front consulta aquí para saber si puede
 * administrar (ADMIN o RESPONSABLE_EQUIPO) y si puede asignar el rol ADMIN (solo ADMIN).
 * Read-only; default deny (sin asignación vigente devuelve lista vacía).
 */
@Path("/api/admin/mis-roles")
@Produces(MediaType.APPLICATION_JSON)
public class MisRolesResource {

    @GET
    @Path("/{hid}")
    public List<String> rolesDe(@PathParam("hid") String hid) {
        return rolesVigentes(hid);
    }

    /** Códigos de rol vigentes (activo y sin vencer) del usuario, sin repetir. */
    static List<String> rolesVigentes(String hid) {
        if (hid == null || hid.isBlank()) {
            return List.of();
        }
        Usuario u = Usuario.findByHelpdeskUserId(hid.trim());
        if (u == null) {
            return List.of();
        }
        LocalDate hoy = LocalDate.now();
        return Asignacion.<Asignacion>list("usuario = ?1", u).stream()
                .filter(a -> a.activo)
                .filter(a -> a.vigenteHasta == null || !a.vigenteHasta.isBefore(hoy))
                .map(a -> a.rol != null ? a.rol.codigo : null)
                .filter(Objects::nonNull)
                .distinct()
                .toList();
    }
}
