package com.fitdesk.api;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Regional;
import com.fitdesk.core.Rol;
import com.fitdesk.core.Usuario;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Administración de Asignaciones: el CORAZÓN del permiso (Rol × Alcance × Vigencia).
 * Aquí se define, p.ej., "Fulano · DESPACHADOR · Equipo Cuenca". Default deny: sin
 * asignación vigente el usuario no ve nada. El alcance es polimórfico y el esquema
 * (CHECK chk_alcance_coherente) exige exactamente la FK de su tipo.
 */
@Path("/api/admin/asignaciones")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AsignacionResource {

    @GET
    public List<Map<String, Object>> listar() {
        List<Map<String, Object>> out = new ArrayList<>();
        for (Asignacion a : Asignacion.<Asignacion>list("order by id")) {
            out.add(describir(a));
        }
        return out;
    }

    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Long rolId = asLong(in, "rolId");
        String alcanceTipo = text(in, "alcanceTipo");
        if (rolId == null || alcanceTipo == null) {
            return bad("rolId y alcanceTipo son obligatorios");
        }
        Usuario u = resolverUsuario(in);
        if (u == null) {
            return bad("usuario inexistente (falta usuarioId o helpdeskUserId)");
        }
        Rol rol = Rol.findById(rolId);
        if (rol == null) {
            return bad("rol inexistente");
        }
        if (esRolAdmin(rol) && !actorEsAdmin(actorHid)) {
            return soloAdmin();
        }
        Asignacion a = new Asignacion();
        a.usuario = u;
        a.rol = rol;
        String err = aplicarAlcance(a, alcanceTipo, in);
        if (err != null) {
            return bad(err);
        }
        LocalDate desde = fecha(text(in, "vigenteDesde"));
        if (desde != null) {
            a.vigenteDesde = desde;
        }
        a.vigenteHasta = fecha(text(in, "vigenteHasta"));
        a.persist();
        return Response.status(Response.Status.CREATED).entity(describir(a)).build();
    }

    /** Edita una asignación: rol, alcance+objetivo y/o vigencia (incluye finalizar con vigente_hasta). */
    @PUT
    @Path("/{id}")
    @Transactional
    public Response actualizar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Asignacion a = Asignacion.findById(id);
        if (a == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Validar TODO en locales antes de mutar la entidad managed (evita updates parciales).
        Usuario u = null;
        if (in.hasNonNull("usuarioId")) {
            u = Usuario.findById(in.get("usuarioId").asLong());
            if (u == null) return bad("usuario inexistente");
        }
        Rol rol = null;
        if (in.hasNonNull("rolId")) {
            rol = Rol.findById(in.get("rolId").asLong());
            if (rol == null) return bad("rol inexistente");
        }
        // Solo un ADMIN puede tocar una asignación que ES o PASA A SER de rol ADMIN.
        if ((esRolAdmin(a.rol) || esRolAdmin(rol)) && !actorEsAdmin(actorHid)) {
            return soloAdmin();
        }
        String alcanceTipo = text(in, "alcanceTipo");
        if (alcanceTipo != null) {
            String err = aplicarAlcance(a, alcanceTipo, in); // valida antes de mutar
            if (err != null) return bad(err);
        }
        if (u != null) a.usuario = u;
        if (rol != null) a.rol = rol;
        if (in.has("vigenteDesde")) {
            LocalDate d = fecha(text(in, "vigenteDesde"));
            if (d != null) a.vigenteDesde = d;
        }
        if (in.has("vigenteHasta")) {
            a.vigenteHasta = fecha(text(in, "vigenteHasta")); // null = sin fin; una fecha = finaliza
        }
        a.actualizadoEn = OffsetDateTime.now();
        return Response.ok(describir(a)).build();
    }

    /**
     * Resuelve el usuario por id, o lo materializa desde el HelpDesk (helpdeskUserId + nombre).
     * Así se puede dar rol a cualquier empleado del catálogo del API sin pre-crearlo (federación
     * de identidad: la persona vive en el HelpDesk; la fila `usuario` es el puente local).
     */
    static Usuario resolverUsuario(JsonNode in) {
        Long usuarioId = asLong(in, "usuarioId");
        if (usuarioId != null) {
            return Usuario.findById(usuarioId);
        }
        String hid = text(in, "helpdeskUserId");
        if (hid == null) {
            return null;
        }
        Usuario u = Usuario.findByHelpdeskUserId(hid);
        if (u == null) {
            u = new Usuario();
            u.helpdeskUserId = hid;
            String nombre = text(in, "usuarioNombre");
            u.nombre = nombre != null ? nombre : hid;
            u.persist();
        }
        return u;
    }

    /**
     * Resuelve el objetivo del alcance, VALIDA, y solo si es válido muta la entidad
     * (alcance_tipo + la FK correcta, anulando las otras). Devuelve mensaje de error o null.
     * Validar-antes-de-mutar evita que una entidad managed quede sucia/incoherente y
     * dispare el CHECK de la BD (500) o un update parcial al fallar la validación.
     */
    private static String aplicarAlcance(Asignacion a, String tipo, JsonNode in) {
        Equipo eq = null;
        Cliente cli = null;
        Regional reg = null;
        switch (tipo) {
            case "EQUIPO" -> {
                Long eid = asLong(in, "alcanceEquipoId");
                eq = eid != null ? Equipo.findById(eid) : null;
                if (eq == null) return "alcanceEquipoId requerido para alcance EQUIPO";
            }
            case "CLIENTE" -> {
                Long cid = asLong(in, "alcanceClienteId");
                cli = cid != null ? Cliente.findById(cid) : null;
                if (cli == null) return "alcanceClienteId requerido para alcance CLIENTE";
            }
            case "REGIONAL" -> {
                Long rid = asLong(in, "alcanceRegionalId");
                reg = rid != null ? Regional.findById(rid) : null;
                if (reg == null) return "alcanceRegionalId requerido para alcance REGIONAL";
            }
            case "GLOBAL" -> { /* sin FK de alcance */ }
            default -> {
                return "alcanceTipo inválido: " + tipo;
            }
        }
        a.alcanceTipo = tipo;
        a.alcanceEquipo = eq;
        a.alcanceCliente = cli;
        a.alcanceRegional = reg;
        return null;
    }

    /** Finaliza/borra una asignación (default: borrado; la vigencia se maneja aparte). */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id, @HeaderParam("X-Actor-Hid") String actorHid) {
        Asignacion a = Asignacion.findById(id);
        if (a == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (esRolAdmin(a.rol) && !actorEsAdmin(actorHid)) {
            return soloAdmin();
        }
        a.delete();
        return Response.noContent().build();
    }

    private static boolean esRolAdmin(Rol rol) {
        return rol != null && "ADMIN".equals(rol.codigo);
    }

    /**
     * ¿El actor (por su helpdesk_user_id) tiene rol ADMIN de plataforma vigente?
     * MSC001 es admin de arranque (bootstrap, mismo criterio que el front) para no
     * quedar sin quién otorgue ADMIN si se borrara esa asignación. El header
     * `X-Actor-Hid` no es un límite criptográfico: es coherente con la postura actual
     * (todo el gating es del cliente) y sube a real cuando llegue la identidad por token.
     */
    private static boolean actorEsAdmin(String actorHid) {
        if (actorHid != null && "MSC001".equalsIgnoreCase(actorHid.trim())) {
            return true;
        }
        return MisRolesResource.rolesVigentes(actorHid).contains("ADMIN");
    }

    private static Response soloAdmin() {
        return Response.status(Response.Status.FORBIDDEN)
                .entity(Map.of("error", "Solo un ADMIN puede definir o modificar asignaciones de rol ADMIN"))
                .build();
    }

    /** Descripción legible de una asignación (usuario, rol, alcance, vigencia). */
    static Map<String, Object> describir(Asignacion a) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", a.id);
        m.put("usuarioId", a.usuario != null ? a.usuario.id : null);
        m.put("usuarioNombre", a.usuario != null ? a.usuario.nombre : null);
        m.put("helpdeskUserId", a.usuario != null ? a.usuario.helpdeskUserId : null);
        m.put("rolId", a.rol != null ? a.rol.id : null);
        m.put("rolCodigo", a.rol != null ? a.rol.codigo : null);
        m.put("rolNombre", a.rol != null ? a.rol.nombre : null);
        m.put("alcanceTipo", a.alcanceTipo);
        m.put("alcanceObjetivoId", alcanceObjetivoId(a));
        m.put("alcanceNombre", alcanceNombre(a));
        m.put("vigenteDesde", a.vigenteDesde != null ? a.vigenteDesde.toString() : null);
        m.put("vigenteHasta", a.vigenteHasta != null ? a.vigenteHasta.toString() : null);
        m.put("activo", a.activo);
        return m;
    }

    private static Long alcanceObjetivoId(Asignacion a) {
        return switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
            case "EQUIPO" -> a.alcanceEquipo != null ? a.alcanceEquipo.id : null;
            case "CLIENTE" -> a.alcanceCliente != null ? a.alcanceCliente.id : null;
            case "REGIONAL" -> a.alcanceRegional != null ? a.alcanceRegional.id : null;
            default -> null;
        };
    }

    private static String alcanceNombre(Asignacion a) {
        return switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
            case "EQUIPO" -> a.alcanceEquipo != null ? a.alcanceEquipo.nombre : null;
            case "CLIENTE" -> a.alcanceCliente != null ? a.alcanceCliente.nombre : null;
            case "REGIONAL" -> a.alcanceRegional != null ? a.alcanceRegional.nombre : null;
            case "GLOBAL" -> "Global";
            default -> null;
        };
    }

    // ── helpers ──
    private static String text(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        if (v == null || v.isNull()) return null;
        String s = v.asText();
        return s == null || s.isBlank() ? null : s.trim();
    }

    private static Long asLong(JsonNode n, String f) {
        JsonNode v = n == null ? null : n.get(f);
        return v == null || v.isNull() ? null : v.asLong();
    }

    private static LocalDate fecha(String s) {
        if (s == null || s.isBlank()) return null;
        try { return LocalDate.parse(s.trim()); } catch (Exception e) { return null; }
    }

    private static Response bad(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", msg)).build();
    }
}
