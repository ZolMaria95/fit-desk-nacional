package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Usuario;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Perfil de usuario: foto personalizable (data URI base64, ya comprimida por el
 * frontend a ~128px). Se guarda en usuario.foto (V10). El actor viaja en X-Actor-Hid.
 */
@Path("/api/legacy/perfil")
@Produces(MediaType.APPLICATION_JSON)
public class PerfilResource {

    /** Tope defensivo del data URI (base64). ~300 KB de imagen; el front comprime mucho menos. */
    private static final int MAX_FOTO = 400_000;

    /** GET /api/legacy/perfil/fotos → { helpdesk_user_id: dataUri } de todos los que tienen foto. */
    @GET
    @Path("/fotos")
    public Map<String, String> fotos() {
        Map<String, String> m = new LinkedHashMap<>();
        for (Usuario u : Usuario.<Usuario>listAll()) {
            if (u.helpdeskUserId != null && u.foto != null && !u.foto.isBlank()) {
                m.put(u.helpdeskUserId, u.foto);
            }
        }
        return m;
    }

    /** GET /api/legacy/perfil/me → { roles: [...], equipos: [{codigo,nombre}] } del actor.
     *  Roles FitDesk (vigentes) + equipo(s) al que pertenece (como miembro; si no, como responsable). */
    @GET
    @Path("/me")
    public Map<String, Object> me(@HeaderParam("X-Actor-Hid") String actorHid) {
        Map<String, Object> m = new LinkedHashMap<>();
        if (actorHid == null || actorHid.isBlank()) {
            m.put("roles", List.of());
            m.put("equipos", List.of());
            return m;
        }
        m.put("roles", MisRolesResource.rolesVigentes(actorHid));
        Set<Long> ids = Actor.equiposComoMiembro(actorHid);
        if (ids.isEmpty()) {
            ids = Actor.equiposComoResponsable(actorHid);
        }
        List<Map<String, Object>> equipos = new ArrayList<>();
        for (Long id : ids) {
            Equipo eq = Equipo.findById(id);
            if (eq != null) {
                equipos.add(Map.of("codigo", eq.codigo, "nombre", eq.nombre != null ? eq.nombre : eq.codigo));
            }
        }
        m.put("equipos", equipos);
        // Clientes del/los equipo(s) del actor (nombres del API = cliente.nombre).
        List<Map<String, Object>> clientes = new ArrayList<>();
        if (!ids.isEmpty()) {
            for (Cliente c : Cliente.<Cliente>list("equipoResponsable.id in ?1 order by nombre", ids)) {
                clientes.add(Map.of("codigo", c.codigo, "nombre", c.nombre != null ? c.nombre : c.codigo));
            }
        }
        m.put("clientes", clientes);
        return m;
    }

    /** PUT /api/legacy/perfil/foto  body {foto: dataUri|null} → set/borra la foto del actor. */
    @PUT
    @Path("/foto")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response setFoto(Map<String, String> body, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (actorHid == null || actorHid.isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", "falta X-Actor-Hid")).build();
        }
        Usuario u = Usuario.findByHelpdeskUserId(actorHid);
        if (u == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "usuario no encontrado: " + actorHid)).build();
        }
        String foto = body != null ? body.get("foto") : null;
        if (foto != null && !foto.isBlank()) {
            if (!foto.startsWith("data:image/")) {
                return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", "la foto debe ser un data URI de imagen")).build();
            }
            if (foto.length() > MAX_FOTO) {
                return Response.status(Response.Status.REQUEST_ENTITY_TOO_LARGE).entity(Map.of("error", "imagen demasiado grande")).build();
            }
            u.foto = foto;
        } else {
            u.foto = null; // vaciar = quitar la foto
        }
        u.actualizadoEn = OffsetDateTime.now();
        return Response.ok(Map.of("ok", true, "hid", actorHid, "tieneFoto", u.foto != null)).build();
    }
}
