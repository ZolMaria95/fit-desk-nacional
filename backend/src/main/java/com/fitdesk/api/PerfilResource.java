package com.fitdesk.api;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
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
        // Clientes que el actor puede elegir, scopeados por su ALCANCE (EQUIPO = su equipo, REGIONAL = su
        // regional, GLOBAL = todos), INDEPENDIENTE del rol (un consultor regional también scopea bien). Son
        // los clientes REGISTRADOS de su alcance. Si el actor es GLOBAL, el frontend ofrece además el
        // catálogo completo del HelpDesk (`esGlobal`); si no, el selector se limita a estos.
        boolean esGlobal = Actor.esAlcanceGlobal(actorHid);
        Set<Long> alcanceIds = Actor.equiposEnAlcance(actorHid);
        List<Map<String, Object>> clientes = new ArrayList<>();
        if (!alcanceIds.isEmpty()) {
            for (Cliente c : Cliente.<Cliente>list("equipoResponsable.id in ?1 order by nombre", alcanceIds)) {
                if (c.codigo == null) {
                    continue;
                }
                clientes.add(Map.of("codigo", c.codigo, "nombre", c.nombre != null ? c.nombre : c.codigo));
            }
        }
        m.put("clientes", clientes);
        m.put("esGlobal", esGlobal);
        // Preferencia de tema del usuario (para aplicar dark/light al iniciar sesión). null/'light' = claro.
        Usuario actor = Usuario.findByHelpdeskUserId(actorHid);
        m.put("tema", actor != null ? actor.tema : null);
        // Color identificativo elegido por el usuario. null = no eligió → el frontend le deriva uno
        // estable a partir de su identidad (ver `core/colores.ts`).
        m.put("color", actor != null ? actor.color : null);
        return m;
    }

    /**
     * GET /api/legacy/perfil/equipos-clientes → equipos que el actor puede REVISAR
     * (donde es miembro ∪ donde es responsable) con sus clientes. Para un responsable
     * con alcance REGIONAL, `equiposComoResponsable` devuelve todos los equipos de su
     * regional (GLOBAL = todos), así el frontend puede ofrecer un selector de equipo.
     * Forma: { multiEquipo: bool, equipos: [{codigo, nombre, clientes:[{codigo,nombre}]}] }.
     */
    /**
     * GET /api/legacy/perfil/tickets-gestionables: sobre qué tickets puede el actor EDITAR / ELIMINAR /
     * REASIGNAR (rol HELPDESK en su alcance, o ADMIN). Forma: { global: bool, clientes: [client_id HD] }.
     * Solo para mostrar/ocultar acciones en el front; la autorización real la hace el backend.
     */
    @GET
    @Path("/tickets-gestionables")
    public Map<String, Object> ticketsGestionables(@HeaderParam("X-Actor-Hid") String actorHid) {
        Actor.TicketsGestionables g = Actor.ticketsGestionables(actorHid);
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("global", g.global());
        m.put("clientes", new ArrayList<>(g.clientes()));
        // Como RESPONSABLE_EQUIPO: a quién puede asignar/reasignar (él + su gente).
        m.put("asignables", new ArrayList<>(Actor.asignablesComoResponsable(actorHid)));
        return m;
    }

    @GET
    @Path("/equipos-clientes")
    public Map<String, Object> equiposClientes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Map<String, Object> m = new LinkedHashMap<>();
        if (actorHid == null || actorHid.isBlank()) {
            m.put("multiEquipo", false);
            m.put("equipos", List.of());
            return m;
        }
        // OJO: `ids` mezcla los equipos donde es MIEMBRO con aquellos donde es RESPONSABLE, y para
        // algunas cosas (la alerta de novedades) NO es lo mismo: a un especialista de un equipo no le
        // corresponden los avisos de ese equipo, solo al que lo dirige. Por eso cada equipo sale
        // marcado con `esResponsable` y el consumidor decide. Campo ADITIVO: quien ya usaba la lista
        // completa (la pestaña Equipo de Tickets) sigue igual.
        Set<Long> comoResponsable = Actor.equiposComoResponsable(actorHid);
        LinkedHashSet<Long> ids = new LinkedHashSet<>(Actor.equiposComoMiembro(actorHid));
        ids.addAll(comoResponsable);
        List<Map<String, Object>> equipos = new ArrayList<>();
        for (Long id : ids) {
            Equipo eq = Equipo.findById(id);
            if (eq == null) continue;
            List<Map<String, Object>> cls = new ArrayList<>();
            for (Cliente c : Cliente.<Cliente>list("equipoResponsable.id = ?1 order by nombre", id)) {
                cls.add(Map.of("codigo", c.codigo, "nombre", c.nombre != null ? c.nombre : c.codigo));
            }
            equipos.add(Map.of(
                "codigo", eq.codigo,
                "nombre", eq.nombre != null ? eq.nombre : eq.codigo,
                "esResponsable", comoResponsable.contains(id),
                "clientes", cls));
        }
        m.put("multiEquipo", equipos.size() > 1);
        m.put("equipos", equipos);
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

    /** PUT /api/legacy/perfil/tema  body {tema: 'light'|'dark'|null} → preferencia de tema del actor.
     *  Persiste 'dark' (o null/'light' = claro por defecto). Espejo de setFoto. */
    @PUT
    @Path("/tema")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response setTema(Map<String, String> body, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (actorHid == null || actorHid.isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", "falta X-Actor-Hid")).build();
        }
        Usuario u = Usuario.findByHelpdeskUserId(actorHid);
        if (u == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "usuario no encontrado: " + actorHid)).build();
        }
        String tema = body != null ? body.get("tema") : null;
        if (tema != null && !tema.equals("light") && !tema.equals("dark")) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", "tema debe ser 'light' o 'dark'")).build();
        }
        u.tema = "dark".equals(tema) ? "dark" : null; // solo persistimos 'dark'; null = claro (default)
        u.actualizadoEn = OffsetDateTime.now();
        return Response.ok(Map.of("ok", true, "hid", actorHid, "tema", u.tema != null ? u.tema : "light")).build();
    }

    /** Hexadecimal `#RRGGBB`. Se valida SIEMPRE: este valor acaba inyectado en un `style` del
     *  frontend, y el precedente del proyecto (el color de cliente) se guarda sin comprobar nada. */
    private static final java.util.regex.Pattern HEX = java.util.regex.Pattern.compile("^#[0-9a-fA-F]{6}$");

    /**
     * Colores RESERVADOS a una persona concreta: nadie más puede elegirlos. Excepción manual y
     * deliberada a la regla general (los repetidos se avisan pero se permiten). Aquí es donde de
     * verdad se impide; el frontend solo avisa antes de intentarlo.
     */
    private static final Map<String, String> RESERVADOS = Map.of("#DCBEFF", "KDLS001");

    /**
     * PUT /api/legacy/perfil/color  body {color: '#RRGGBB'|null} → color identificativo del actor.
     * Espejo de setTema. `null`/vacío = quitar el color elegido; el frontend vuelve entonces a
     * derivarle uno estable a partir de su identidad (no es obligatorio elegir).
     *
     * NO se comprueba que el color esté libre: dos personas pueden compartirlo si se empeñan (el
     * selector avisa de quién lo usa ya). Impedirlo agotaría la paleta y no aporta nada aquí.
     */
    @PUT
    @Path("/color")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response setColor(Map<String, String> body, @HeaderParam("X-Actor-Hid") String actorHid) {
        if (actorHid == null || actorHid.isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", "falta X-Actor-Hid")).build();
        }
        Usuario u = Usuario.findByHelpdeskUserId(actorHid);
        if (u == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(Map.of("error", "usuario no encontrado: " + actorHid)).build();
        }
        String color = body != null ? body.get("color") : null;
        if (color != null && !color.isBlank()) {
            String c = color.trim();
            if (!HEX.matcher(c).matches()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of("error", "el color debe ser un hexadecimal #RRGGBB")).build();
            }
            String dueno = RESERVADOS.get(c.toUpperCase());
            if (dueno != null && !dueno.equalsIgnoreCase(actorHid.trim())) {
                Usuario d = Usuario.findByHelpdeskUserId(dueno);
                return Response.status(Response.Status.CONFLICT)
                        .entity(Map.of("error", "ese color está reservado para "
                                + (d != null && d.nombre != null ? d.nombre : dueno))).build();
            }
            u.color = c.toUpperCase();
        } else {
            u.color = null; // vaciar = volver al color derivado
        }
        u.actualizadoEn = OffsetDateTime.now();
        Map<String, Object> ok = new LinkedHashMap<>();
        ok.put("ok", true);
        ok.put("hid", actorHid);
        ok.put("color", u.color);
        return Response.ok(ok).build();
    }
}
