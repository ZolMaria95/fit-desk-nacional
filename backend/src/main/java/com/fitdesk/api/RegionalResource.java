package com.fitdesk.api;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Regional;
import com.fitdesk.core.Solicitud;
import com.fitdesk.core.Sprint;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.Transferencia;
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
 * CRUD básico de Regional: primera rebanada vertical HTTP → Panache → Postgres.
 * Demuestra la nacionalización por DATOS (crear una regional no requiere redeploy).
 */
@Path("/api/regionales")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RegionalResource {

    @GET
    public List<Regional> listar() {
        return Regional.listAll();
    }

    @GET
    @Path("/{id}")
    public Response obtener(@PathParam("id") Long id) {
        Regional r = Regional.findById(id);
        return r == null ? Response.status(Response.Status.NOT_FOUND).build() : Response.ok(r).build();
    }

    @POST
    @Transactional
    public Response crear(Regional entrada) {
        if (entrada == null || entrada.codigo == null || entrada.nombre == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"codigo y nombre son obligatorios\"}").build();
        }
        Regional r = new Regional();
        r.codigo = entrada.codigo.trim();
        r.nombre = entrada.nombre.trim();
        r.activo = entrada.activo;
        r.persist();
        return Response.status(Response.Status.CREATED).entity(r).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response actualizar(@PathParam("id") Long id, Regional entrada) {
        Regional r = Regional.findById(id);
        if (r == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Código editable: la regional se referencia por FK (id), no por su código, así que
        // renombrarlo es seguro. Solo se valida la unicidad (VARCHAR NOT NULL UNIQUE en V1).
        if (entrada.codigo != null && !entrada.codigo.isBlank()) {
            String nuevo = entrada.codigo.trim().toUpperCase();
            if (!nuevo.equals(r.codigo)) {
                Regional dup = Regional.find("codigo", nuevo).firstResult();
                if (dup != null && !dup.id.equals(r.id)) {
                    return Response.status(Response.Status.BAD_REQUEST)
                            .entity("{\"error\":\"ya existe una regional con el código " + nuevo + "\"}").build();
                }
                r.codigo = nuevo;
            }
        }
        if (entrada.nombre != null) {
            r.nombre = entrada.nombre.trim();
        }
        r.activo = entrada.activo;
        return Response.ok(r).build();
    }

    /**
     * Elimina una regional en CASCADA controlada. Reglas (validadas con la dueña, 2026-07-10):
     *  1) Si algún equipo de la región tiene TAREAS → se BLOQUEA (no se pierde trabajo): primero
     *     hay que cerrarlas o transferirlas.
     *  2) Técnicos de la región: si un técnico pertenece SOLO a esta región → se BLOQUEA y se pide
     *     que su Responsable de Equipo lo reclasifique (a dónde asignarlo) antes de borrar. Si el
     *     técnico también está en otra región, se le quita solo esta y queda en las demás.
     *  3) Camino limpio (equipos vacíos, sin técnicos huérfanos): borra los equipos con su tablero
     *     y sprints, suelta las asignaciones de esta región, desliga clientes/solicitudes/transferencias
     *     que la referencian, y borra la región.
     * Validate-first: si algo bloquea, se devuelve 409 SIN mutar nada (todo en una transacción).
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response eliminar(@PathParam("id") Long id, @HeaderParam("X-Actor-Hid") String actorHid) {
        Regional r = Regional.findById(id);
        if (r == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Autorización: ADMIN puede cualquier región; el RESPONSABLE_EQUIPO solo la SUYA
        // (la región de su(s) equipo(s) o su alcance REGIONAL). Otros roles → 403.
        if (!Actor.gobiernaRegion(actorHid, r.id)) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity(Map.of("error", "Solo un Administrador, o el Responsable de Equipo de esta región, puede eliminarla."))
                    .build();
        }
        List<Equipo> equipos = Equipo.list("regional", r);
        Set<Long> equipoIds = equipos.stream().map(e -> e.id).collect(Collectors.toSet());

        // (1) Bloquear si algún equipo tiene tareas.
        for (Equipo eq : equipos) {
            long tareas = Tarea.count("board.equipo = ?1", eq);
            if (tareas > 0) {
                return conflict("El equipo \"" + eq.nombre + "\" tiene " + tareas
                        + " tarea(s). Ciérralas o transfiérelas antes de eliminar la región.");
            }
        }

        // (1b) Bloquear si algún equipo es RESPONSABLE de clientes (cliente.equipo_responsable_id
        //      es NOT NULL: no se puede desligar). Hay que reasignar/eliminar esos clientes primero.
        for (Equipo eq : equipos) {
            long clientes = Cliente.count("equipoResponsable = ?1", eq);
            if (clientes > 0) {
                Cliente ejemplo = Cliente.find("equipoResponsable = ?1", eq).firstResult();
                return conflict("El equipo \"" + eq.nombre + "\" es responsable de " + clientes
                        + " cliente(s)" + (ejemplo != null ? " (p. ej. " + ejemplo.nombre + ")" : "")
                        + ". Reasígnalos a otro equipo (o elimínalos) antes de borrar la región.");
            }
        }

        // (2) Técnicos que pertenecen SOLO a esta región → bloquear y pedir reclasificación al RE.
        Map<Long, Usuario> ligados = new LinkedHashMap<>();
        if (!equipoIds.isEmpty()) {
            for (Asignacion a : Asignacion.<Asignacion>list("alcanceEquipo.id in ?1", equipoIds)) {
                if (a.usuario != null) ligados.put(a.usuario.id, a.usuario);
            }
        }
        for (Asignacion a : Asignacion.<Asignacion>list("alcanceRegional = ?1", r)) {
            if (a.usuario != null) ligados.put(a.usuario.id, a.usuario);
        }
        List<String> huerfanos = new ArrayList<>();
        for (Usuario u : ligados.values()) {
            if (perteneceSoloA(u, r, equipoIds)) {
                String re = responsableDe(u, equipos);
                huerfanos.add(u.nombre + (re != null ? " (responsable: " + re + ")" : " (sin responsable asignado)"));
            }
        }
        if (!huerfanos.isEmpty()) {
            return conflict("Estos técnicos solo pertenecen a esta región y deben reclasificarse primero "
                    + "(su Responsable de Equipo debe reasignarlos a otra región): " + String.join("; ", huerfanos));
        }

        // (3) Camino limpio: borrar equipos vacíos + soltar referencias + borrar región.
        // (los equipos ya no tienen tareas ni clientes: se bloqueó antes).
        long asigBorradas = 0;
        for (Equipo eq : equipos) {
            // Subconsulta (no join implícito): HQL no admite navegar asociaciones en el WHERE de un UPDATE masivo.
            Solicitud.update("transferencia = null where transferencia.id in "
                    + "(select t.id from Transferencia t where t.equipoOrigen = ?1 or t.equipoDestino = ?1)", eq);
            Solicitud.update("equipoDestino = null where equipoDestino = ?1", eq);
            Transferencia.delete("equipoOrigen = ?1 or equipoDestino = ?1", eq);
            // Borrar asignaciones como ENTIDADES (no bulk): se cargaron en la validación, así la
            // sesión de Hibernate queda consistente y no falla el flush al borrar el equipo.
            for (Asignacion a : Asignacion.<Asignacion>list("alcanceEquipo = ?1", eq)) {
                a.delete();
                asigBorradas++;
            }
            for (Board b : Board.<Board>list("equipo", eq)) {
                Sprint.delete("board = ?1", b);
                b.delete();
            }
            eq.delete();
        }
        for (Asignacion a : Asignacion.<Asignacion>list("alcanceRegional = ?1", r)) {
            a.delete();
            asigBorradas++;
        }
        r.delete();
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("eliminado", r.codigo);
        out.put("equiposBorrados", equipos.size());
        out.put("asignacionesBorradas", asigBorradas);
        return Response.ok(out).build();
    }

    /** ¿Todas las asignaciones de región/equipo/global del usuario son de ESTA región? (técnico huérfano). */
    private static boolean perteneceSoloA(Usuario u, Regional r, Set<Long> equipoIds) {
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> {
                    return false; // pertenece a todo → no es exclusivo de esta región
                }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null && !a.alcanceRegional.id.equals(r.id)) return false;
                }
                case "EQUIPO" -> {
                    if (a.alcanceEquipo != null && !equipoIds.contains(a.alcanceEquipo.id)) return false;
                }
                default -> { /* CLIENTE u otros no cuentan como pertenencia a región */ }
            }
        }
        return true;
    }

    /** Nombre del Responsable de Equipo del equipo (de esta región) al que pertenece el técnico. */
    private static String responsableDe(Usuario u, List<Equipo> equipos) {
        for (Equipo eq : equipos) {
            Asignacion miembro = Asignacion.find("usuario = ?1 and alcanceEquipo = ?2", u, eq).firstResult();
            if (miembro != null) {
                Asignacion re = Asignacion.find("rol.codigo = 'RESPONSABLE_EQUIPO' and alcanceEquipo = ?1", eq).firstResult();
                if (re != null && re.usuario != null) {
                    return re.usuario.nombre;
                }
            }
        }
        return null;
    }

    private static Response conflict(String msg) {
        return Response.status(Response.Status.CONFLICT).entity(Map.of("error", msg)).build();
    }
}
