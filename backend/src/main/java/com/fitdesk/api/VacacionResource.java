package com.fitdesk.api;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Usuario;
import com.fitdesk.core.Vacacion;

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
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Vacaciones / permisos por empleado. Alimentan el calendario de la sección Vacaciones.
 * LECTURA abierta a cualquier actor logueado (todos ven el calendario, por equipo y nacional).
 * ESCRITURA: ADMIN (a cualquiera) o Responsable de Equipo (solo empleados de sus equipos).
 * Autorización derivada de las Asignaciones ({@link Actor}); actor en X-Actor-Hid. Regla #8:
 * se expone el NOMBRE del empleado, nunca su helpdesk_user_id como texto visible.
 */
@Path("/api/vacaciones")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VacacionResource {

    // ── Listar: sin filtro = NACIONAL (todas); ?equipo={id} = solo ese equipo ──
    @GET
    public List<Map<String, Object>> listar(@QueryParam("equipo") Long equipoId) {
        List<Vacacion> lista;
        if (equipoId != null) {
            Set<Long> userIds = Actor.usuariosDeEquipos(Set.of(equipoId));
            lista = userIds.isEmpty()
                    ? List.of()
                    : Vacacion.list("usuario.id in ?1 order by fechaInicio", userIds);
        } else {
            lista = Vacacion.list("order by fechaInicio");
        }
        List<Map<String, Object>> out = new ArrayList<>();
        for (Vacacion v : lista) {
            out.add(describir(v));
        }
        return out;
    }

    @POST
    @Transactional
    public Response crear(JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        String hid = text(in, "usuarioHid");
        if (hid == null) {
            return bad("usuarioHid (empleado) es obligatorio");
        }
        Usuario empleado = Usuario.findByHelpdeskUserId(hid);
        if (empleado == null) {
            return bad("empleado inexistente: " + hid);
        }
        if (!puedeGestionar(actorHid, empleado)) {
            return forbidden("solo un ADMIN o el Responsable del equipo del empleado puede registrar vacaciones");
        }
        LocalDate inicio = fecha(in, "fechaInicio");
        LocalDate fin = fecha(in, "fechaFin");
        if (inicio == null || fin == null) {
            return bad("fechaInicio y fechaFin son obligatorias (formato aaaa-mm-dd)");
        }
        if (fin.isBefore(inicio)) {
            return bad("la fecha fin no puede ser anterior a la fecha inicio");
        }
        Vacacion v = new Vacacion();
        v.usuario = empleado;
        v.registradoPor = Actor.usuario(actorHid);
        aplicar(v, in, inicio, fin);
        v.persist();
        return Response.status(Response.Status.CREATED).entity(describir(v)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response editar(@PathParam("id") Long id, JsonNode in, @HeaderParam("X-Actor-Hid") String actorHid) {
        Vacacion v = Vacacion.findById(id);
        if (v == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!puedeGestionar(actorHid, v.usuario)) {
            return forbidden("no puedes editar las vacaciones de un empleado que no gestionas");
        }
        LocalDate inicio = fecha(in, "fechaInicio");
        LocalDate fin = fecha(in, "fechaFin");
        if (inicio == null || fin == null || fin.isBefore(inicio)) {
            return bad("fechas inválidas (aaaa-mm-dd; fin ≥ inicio)");
        }
        aplicar(v, in, inicio, fin);
        return Response.ok(describir(v)).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id, @HeaderParam("X-Actor-Hid") String actorHid) {
        Vacacion v = Vacacion.findById(id);
        if (v == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if (!puedeGestionar(actorHid, v.usuario)) {
            return forbidden("no puedes eliminar las vacaciones de un empleado que no gestionas");
        }
        v.delete();
        return Response.noContent().build();
    }

    // ── Aplica los campos editables + calcula días según el TIPO ──
    // VACACIONES: rango de calendario (inicio→fin), días = días de calendario, SIN factor.
    // PERMISO (con cargo a vacaciones): se ingresan días laborables y días = round(laborables×1,36).
    private static void aplicar(Vacacion v, JsonNode in, LocalDate inicio, LocalDate fin) {
        String tipo = text(in, "tipo");
        if (tipo != null) {
            v.tipo = "PERMISO".equalsIgnoreCase(tipo) ? "PERMISO" : "VACACIONES";
        }
        v.fechaInicio = inicio;
        v.fechaFin = fin;
        if ("PERMISO".equals(v.tipo)) {
            v.diasLaborables = in.has("diasLaborables") ? Math.max(0, in.get("diasLaborables").asInt(0)) : v.diasLaborables;
            v.diasVacacion = Vacacion.calcularDiasVacacion(v.diasLaborables); // × 1,36
        } else {
            v.diasVacacion = (int) (ChronoUnit.DAYS.between(inicio, fin) + 1); // días de calendario, inclusive
            v.diasLaborables = laborablesEnRango(inicio, fin); // informativo
        }
        v.nota = text(in, "nota"); // permite limpiarla
    }

    /** Cuenta los días laborables (lun–vie) en el rango, inclusive. */
    private static int laborablesEnRango(LocalDate inicio, LocalDate fin) {
        int n = 0;
        for (LocalDate d = inicio; !d.isAfter(fin); d = d.plusDays(1)) {
            DayOfWeek g = d.getDayOfWeek();
            if (g != DayOfWeek.SATURDAY && g != DayOfWeek.SUNDAY) {
                n++;
            }
        }
        return n;
    }

    // ── ¿El actor puede gestionar vacaciones de este empleado? ──
    // Cada empleado gestiona LAS SUYAS; el ADMIN, las de cualquiera; el Responsable de
    // Equipo, las de los empleados de sus equipos.
    private static boolean puedeGestionar(String actorHid, Usuario empleado) {
        if (empleado == null) {
            return false;
        }
        Usuario actor = Actor.usuario(actorHid);
        if (actor != null && actor.id.equals(empleado.id)) {
            return true; // sus propias vacaciones
        }
        if (Actor.esAdmin(actorHid)) {
            return true;
        }
        Set<Long> gober = Actor.equiposGestionables(actorHid);
        if (gober.isEmpty() || empleado == null) {
            return false;
        }
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1 and alcanceTipo = 'EQUIPO'", empleado)) {
            if (a.alcanceEquipo != null && gober.contains(a.alcanceEquipo.id)) {
                return true;
            }
        }
        return false;
    }

    /** Primer equipo (alcance EQUIPO) del empleado, para mostrar equipo/regional. */
    private static Equipo primerEquipo(Usuario u) {
        if (u == null) {
            return null;
        }
        Asignacion a = Asignacion.<Asignacion>find("usuario = ?1 and alcanceTipo = 'EQUIPO'", u).firstResult();
        return a != null ? a.alcanceEquipo : null;
    }

    // ── Serialización (nombre del empleado, no el código) ──
    static Map<String, Object> describir(Vacacion v) {
        Equipo eq = primerEquipo(v.usuario);
        Map<String, Object> o = new LinkedHashMap<>();
        o.put("id", v.id);
        o.put("usuarioHid", v.usuario != null ? v.usuario.helpdeskUserId : null);
        o.put("empleado", v.usuario != null ? v.usuario.nombre : null);
        o.put("equipoId", eq != null ? eq.id : null);
        o.put("equipo", eq != null ? eq.nombre : null);
        o.put("regional", (eq != null && eq.regional != null) ? eq.regional.nombre : null);
        o.put("fechaInicio", v.fechaInicio != null ? v.fechaInicio.toString() : null);
        o.put("fechaFin", v.fechaFin != null ? v.fechaFin.toString() : null);
        o.put("diasLaborables", v.diasLaborables);
        o.put("diasVacacion", v.diasVacacion);
        o.put("tipo", v.tipo);
        o.put("estado", v.estado);
        o.put("nota", v.nota);
        o.put("registradoPor", v.registradoPor != null ? v.registradoPor.nombre : null);
        o.put("creadoEn", v.creadoEn != null ? v.creadoEn.toString() : null);
        return o;
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

    private static LocalDate fecha(JsonNode n, String f) {
        String s = text(n, f);
        if (s == null) {
            return null;
        }
        try {
            return LocalDate.parse(s.length() > 10 ? s.substring(0, 10) : s);
        } catch (Exception e) {
            return null;
        }
    }

    private static Response bad(String msg) {
        return Response.status(Response.Status.BAD_REQUEST).entity(Map.of("error", msg)).build();
    }

    private static Response forbidden(String msg) {
        return Response.status(Response.Status.FORBIDDEN).entity(Map.of("error", msg)).build();
    }
}
