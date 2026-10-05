package com.fitdesk.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Usuario;
import com.fitdesk.core.WorkflowEstado;
import com.fitdesk.legacy.LegacyWriteService;
import com.fitdesk.overlay.TicketGuardado;
import com.fitdesk.overlay.TicketPendiente;
import com.fitdesk.sync.TicketEspejoStore;

import jakarta.inject.Inject;
import java.util.Map;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
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
 * Escrituras legacy-compatibles (Fase 3, slice 2). Reflejan los write paths que
 * el DataService de Angular usa contra Firebase, pero contra Postgres. En modo
 * Quarkus el front rutea aquí sus PUT/PATCH/DELETE; Firebase NO se toca.
 */
@Path("/api/legacy")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class LegacyWriteResource {

    @Inject
    LegacyWriteService write;

    @Inject
    TicketEspejoStore espejo;

    // ── Stories ──────────────────────────────────────────────────────────
    @PATCH
    @Path("/stories/stories/{id}")
    public Response patchStory(@PathParam("id") String id, JsonNode fields) {
        return write.patchStory(id, fields)
                ? Response.ok().build()
                : Response.status(Response.Status.NOT_FOUND).build();
    }

    @PATCH
    @Path("/stories/stories")
    public Response patchStories(JsonNode body) {
        write.patchStories(body);
        return Response.ok().build();
    }

    /**
     * POST /stories/stories: crea una tarea con **id asignado por el servidor** (atómico). Evita que dos
     * navegadores con vistas desactualizadas elijan el mismo TA-NNN y se pisen. Devuelve `{"id": "TA-NNN"}`.
     */
    @POST
    @Path("/stories/stories")
    public Response createStory(JsonNode fields) {
        // Reintenta ante choque de codigo por creación concurrente (la restricción UNIQUE es la red de seguridad).
        RuntimeException last = null;
        for (int intento = 0; intento < 4; intento++) {
            try {
                var r = write.createStory(fields);
                // Si el ticket ya tenía tarea, 200 con esa (`existente`): el front no crea otra.
                return r.existente()
                        ? Response.ok(Map.of("id", r.codigo(), "existente", true)).build()
                        : Response.status(Response.Status.CREATED).entity(Map.of("id", r.codigo())).build();
            } catch (RuntimeException ex) {
                last = ex;
            }
        }
        throw last;
    }

    @Inject
    TicketGestion gestionTickets;

    /**
     * DELETE /api/legacy/tickets/{id}: elimina un ticket del HelpDesk. SOLO rol HELPDESK (en el alcance
     * del cliente del ticket) o ADMIN. Orden: autoriza → DELETE al HelpDesk con el Authorization del
     * usuario → SOLO si el HelpDesk confirma (2xx) se borra la tarea espejo y los overlays del ticket
     * (única excepción a "tareas con ticket no se eliminan"). Si el HelpDesk falla, no se toca nada local
     * y se devuelve su respuesta tal cual. El proxy /api/v1 bloquea el DELETE directo de tickets.
     */
    @DELETE
    @Path("/tickets/{id}")
    public Response deleteTicket(@PathParam("id") String id, @HeaderParam("X-Actor-Hid") String actorHid,
            @HeaderParam("Authorization") String authorization) {
        if (id == null || !id.matches("\\d+")) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":{\"message\":\"Número de ticket inválido.\"}}").build();
        }
        try {
            TicketGestion.ClienteDelTicket c = gestionTickets.clienteDelTicket(id, authorization);
            if (c.status() < 200 || c.status() >= 300) {
                return Response.status(c.status())
                        .entity("{\"error\":{\"message\":\"No se pudo leer el ticket en el HelpDesk.\"}}").build();
            }
            if (!Actor.puedeGestionarTicket(actorHid, c.clientId())) {
                return Response.status(Response.Status.FORBIDDEN)
                        .entity("{\"error\":{\"message\":\"Solo el rol Helpdesk (en su alcance) o un administrador pueden eliminar este ticket.\"}}")
                        .build();
            }
            java.net.http.HttpResponse<byte[]> r = gestionTickets.borrarEnHelpdesk(id, authorization);
            if (r.statusCode() < 200 || r.statusCode() >= 300) {
                return Response.status(r.statusCode()).entity(r.body()).build();
            }
            java.util.List<String> tareas = gestionTickets.limpiarLocal(id);
            String msg = "Ticket eliminado correctamente.";
            try {
                com.fasterxml.jackson.databind.JsonNode n = new com.fasterxml.jackson.databind.ObjectMapper().readTree(r.body());
                if (n != null && n.hasNonNull("message")) {
                    msg = n.get("message").asText();
                }
            } catch (Exception ignored) {
                // el HelpDesk no devolvió JSON: se usa el mensaje por defecto
            }
            return Response.ok(Map.of("ok", true, "message", msg, "tareasEliminadas", tareas)).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.BAD_GATEWAY)
                    .entity("{\"error\":{\"message\":\"No se pudo contactar al HelpDesk.\"}}").build();
        }
    }

    @DELETE
    @Path("/stories/stories/{id}")
    public Response deleteStory(@PathParam("id") String id, @HeaderParam("X-Actor-Hid") String actorHid) {
        return switch (write.deleteStory(id, actorHid)) {
            case OK -> Response.noContent().build();
            case NOT_FOUND -> Response.status(Response.Status.NOT_FOUND).build();
            case HAS_TICKET -> Response.status(Response.Status.CONFLICT)
                    .entity("{\"error\":\"Las tareas con ticket asociado no se pueden eliminar.\"}").build();
            case FORBIDDEN -> Response.status(Response.Status.FORBIDDEN)
                    .entity("{\"error\":\"Solo el Responsable de Equipo o un administrador pueden eliminar tareas.\"}").build();
        };
    }

    // ── Sprints ──────────────────────────────────────────────────────────
    @PUT
    @Path("/sprints")
    public Response putSprints(JsonNode node, @QueryParam("board") String board) {
        write.putSprints(node, board);
        return Response.ok().build();
    }

    // ── Overlays ─────────────────────────────────────────────────────────
    @PUT
    @Path("/hdNotes")
    public Response putHdNotes(JsonNode node, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putHdNotes(node, actorHid);
        return Response.ok().build();
    }

    @PUT
    @Path("/hdActions")
    public Response putHdActions(JsonNode node) {
        write.putHdActions(node);
        return Response.ok().build();
    }

    @PUT
    @Path("/hdPendientes")
    public Response putHdPendientes(JsonNode node, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putHdPendientes(node, actorHid);
        return Response.ok().build();
    }

    // Crear/reemplazar UN pendiente, sin reconciliar el resto (ver comentario en putHdPendiente
    // del service). Usado por crear/pausar/reanudar/postergar del frontend.
    @PUT
    @Path("/hdPendientes/{ticket}")
    public Response putHdPendiente(@PathParam("ticket") String ticket, JsonNode p, @HeaderParam("X-Actor-Hid") String actorHid) {
        return write.putHdPendiente(ticket, p, actorHid)
                ? Response.ok().build()
                : Response.status(Response.Status.FORBIDDEN).build();
    }

    // Borrado DIRIGIDO de un solo pendiente (a diferencia del PUT de arriba, que reconcilia
    // el mapa completo del actor). Incidente 2026-09-17: eliminar un pendiente desde el front
    // pasaba por "borrar la clave localmente y reenviar TODO el mapa" — si el mapa local del
    // actor estaba incompleto en ese momento (front recién cargado, u otra pestaña vieja), el
    // PUT reconciliador borraba TODOS sus pendientes reales, no solo el que se quería quitar.
    // Mismo patrón ya usado por `toggleHdGuardado` (100% personal, nunca cruza de usuario).
    @DELETE
    @Path("/hdPendientes/{ticket}")
    @Transactional
    public Response deleteHdPendiente(@PathParam("ticket") String ticket, @HeaderParam("X-Actor-Hid") String actorHid) {
        Usuario actor = Usuario.findByHelpdeskUserId(actorHid == null ? "" : actorHid.trim());
        if (actor == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        TicketPendiente existente = TicketPendiente.findByTicketAndUsuario(ticket, actor);
        if (existente != null) {
            existente.delete();
        }
        return Response.noContent().build();
    }

    // Toggle idempotente (no reemplazo de mapa completo, a diferencia de hdActions/hdPendientes):
    // si ya estaba guardado lo quita, si no lo crea. 100% personal — nunca cruza de usuario.
    @PUT
    @Path("/hdGuardados/{ticket}")
    @Transactional
    public Response toggleHdGuardado(@PathParam("ticket") String ticket, @HeaderParam("X-Actor-Hid") String actorHid) {
        Usuario actor = Usuario.findByHelpdeskUserId(actorHid == null ? "" : actorHid.trim());
        if (actor == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        TicketGuardado existente = TicketGuardado.findByTicketAndUsuario(ticket, actor);
        boolean guardado;
        if (existente != null) {
            existente.delete();
            guardado = false;
        } else {
            TicketGuardado g = new TicketGuardado();
            g.helpdeskTicketId = ticket;
            g.usuario = actor;
            g.persist();
            guardado = true;
        }
        return Response.ok(Map.of("guardado", guardado)).build();
    }

    @PUT
    @Path("/weeklySupport")
    public Response putWeekly(JsonNode node, @QueryParam("equipo") String equipo, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putWeekly(node, equipo, actorHid);
        return Response.ok().build();
    }

    @PUT
    @Path("/turnoSenior")
    public Response putTurnoSenior(JsonNode node, @QueryParam("equipo") String equipo, @HeaderParam("X-Actor-Hid") String actorHid) {
        write.putTurnoSenior(node, equipo, actorHid);
        return Response.ok().build();
    }

    @PUT
    @Path("/progress")
    public Response putProgress(JsonNode node) {
        write.putProgress(node);
        return Response.ok().build();
    }

    @PUT
    @Path("/queries")
    public Response putQueries(JsonNode node) {
        write.putQueries(node);
        return Response.ok().build();
    }

    /** solNotes no tiene tabla en el modelo nacional; se acepta y se ignora (no-op). */
    @PUT
    @Path("/solNotes")
    public Response putSolNotes(JsonNode node) {
        return Response.ok().build();
    }

    // ── Ticket espejo ────────────────────────────────────────────────────
    /**
     * Refresco puntual del asignado de un ticket en el espejo (write-through de la
     * reasignación). El front lo llama TRAS confirmar la escritura al HelpDesk, para
     * que el board —que deriva el dueño de la tarea del ticket— quede correcto YA, sin
     * esperar el sync completo. Body: {"assigned_user_id":"MSC010"} (vacío ⇒ sin asignar).
     */
    @PUT
    @Path("/ticket-espejo/{id}/assignee")
    public Response putTicketEspejoAssignee(@PathParam("id") String id, JsonNode body) {
        JsonNode v = body != null ? body.get("assigned_user_id") : null;
        espejo.upsertAssignee(id, v != null && !v.isNull() ? v.asText() : null);
        return Response.ok().build();
    }

    /**
     * Crea la Tarea de un ticket que se acaba de asignar (desde FitDesk) y aún no la tenía.
     * Lo llama el frontend justo después de confirmar la asignación al HelpDesk (mismo momento
     * que {@code putTicketEspejoAssignee}), con los datos del ticket que ya tiene a mano.
     * Tablero destino: el equipo responsable del CLIENTE del ticket si está registrado
     * ({@link Cliente#equipoResponsable}); si no, el equipo del propio actor (quien asignó).
     * Idempotente: si el ticket ya tiene tarea, no crea otra.
     * Body: {"ticket","clienteCodigo","clienteNombre","titulo","asignadoHid","asignadoNombre","estado"}.
     * La tarea nace en la columna que corresponde al ESTADO del ticket ({@link com.fitdesk.core.EstadoTicket}),
     * no siempre en To Do: el estado llega en el body (o, si no, el último conocido del espejo).
     */
    @POST
    @Path("/stories/desde-ticket-asignado")
    public Response crearTareaDesdeTicketAsignado(JsonNode body, @HeaderParam("X-Actor-Hid") String actorHid) {
        // Cada intento en su PROPIA transacción y con reintento: el codigo TA-NNN sale del máximo actual, así
        // que dos creaciones simultáneas (varios tableros completando tareas a la vez) chocan en
        // `tarea_codigo_key`; y si chocan por el ticket (`uq_tarea_ticket_espejo`), el reintento ya encuentra la
        // tarea y responde `creada:false`. Mismo criterio que POST /stories/stories.
        RuntimeException last = null;
        for (int intento = 0; intento < 4; intento++) {
            try {
                return io.quarkus.narayana.jta.QuarkusTransaction.requiringNew()
                        .call(() -> crearTareaDesdeTicketAsignadoTx(body, actorHid));
            } catch (RuntimeException ex) {
                last = ex;
            }
        }
        throw last;
    }

    private Response crearTareaDesdeTicketAsignadoTx(JsonNode body, String actorHid) {
        String ticket = text(body, "ticket");
        if (ticket == null) {
            return bad("falta el número de ticket");
        }
        TicketEspejo esp = TicketEspejo.findByHelpdeskTicketId(ticket);
        if (esp == null) {
            esp = new TicketEspejo();
            esp.helpdeskTicketId = ticket;
            esp.persist();
        }
        // Idempotente: si el ticket ya tiene tarea (cualquier board), no se crea otra.
        Tarea existente = Tarea.find("ticketEspejo = ?1", esp).firstResult();
        if (existente != null) {
            return Response.ok(Map.of("creada", false, "tareaCodigo", existente.codigo)).build();
        }

        String titulo = text(body, "titulo");
        if (titulo != null) {
            esp.asunto = titulo;
        }
        String asignadoHid = text(body, "asignadoHid");
        if (asignadoHid != null) {
            esp.asignadoHd = asignadoHid.toUpperCase();
        }
        String estado = text(body, "estado");
        if (estado != null) {
            esp.estadoOrigen = estado;
        } else {
            estado = esp.estadoOrigen;
        }

        // El front manda el `client_id` del HelpDesk (el ticket no conoce el "código" interno de
        // FitDesk): probar por codigo (slug) y, como respaldo, por helpdesk_client_id — mismo
        // patrón que ya usa LegacyWriteService.clienteBy() al crear una tarea a mano.
        String clienteCodigo = text(body, "clienteCodigo");
        Cliente cliente = null;
        if (clienteCodigo != null) {
            cliente = Cliente.findByCodigo(clienteCodigo);
            if (cliente == null) {
                cliente = Cliente.find("helpdeskClientId", clienteCodigo).firstResult();
            }
        }
        Board board = null;
        if (cliente != null && cliente.equipoResponsable != null) {
            board = Board.<Board>find("equipo.id = ?1 and activo = true order by id", cliente.equipoResponsable.id).firstResult();
        }
        if (board == null) {
            // Sin cliente registrado (o sin equipo responsable): cae al equipo del actor —
            // primero como MIEMBRO (el caso normal); si no pertenece a ninguno, como RESPONSABLE.
            Long equipoId = Actor.equiposComoMiembro(actorHid).stream().min(Long::compareTo)
                    .orElseGet(() -> Actor.equiposComoResponsable(actorHid).stream().min(Long::compareTo).orElse(null));
            if (equipoId != null) {
                board = Board.<Board>find("equipo.id = ?1 and activo = true order by id", equipoId).firstResult();
            }
        }
        if (board == null) {
            // Ni el cliente ni el actor resuelven un equipo: no hay dónde crearla. La asignación
            // al HelpDesk ya ocurrió igual; la tarea se puede crear a mano como hasta ahora.
            return Response.ok(Map.of("creada", false, "motivo", "sin equipo")).build();
        }

        Tarea t = new Tarea();
        t.codigo = TransferenciaResource.nuevoCodigoTarea();
        t.board = board;
        String columna = com.fitdesk.core.EstadoTicket.columna(estado);
        t.workflowEstado = WorkflowEstado.<WorkflowEstado>find("codigo = ?1 and activo = true", columna).firstResult();
        if (t.workflowEstado == null) {
            t.workflowEstado = WorkflowEstado.<WorkflowEstado>find("activo = true order by orden").firstResult();
        }
        if (com.fitdesk.core.EstadoTicket.finalizado(estado)) {
            t.aprobado = true;
            t.fechaAprobacion = java.time.LocalDate.now();
        }
        if (com.fitdesk.core.EstadoTicket.esperandoCliente(estado)) {
            t.esperandoCliente = true;
            t.fechaEsperando = java.time.LocalDate.now();
        }
        t.ticketEspejo = esp;
        if (titulo != null) {
            t.titulo = titulo.length() > 500 ? titulo.substring(0, 500) : titulo;
        }
        if (cliente != null) {
            t.cliente = cliente;
        } else if (clienteCodigo != null) {
            t.clienteCodigoRaw = clienteCodigo;
            t.clienteNombre = text(body, "clienteNombre");
        }
        t.asignadoA = TransferenciaResource.usuarioBy(asignadoHid);
        t.persistAndFlush(); // falla aquí (dentro del intento) si el codigo o el ticket chocan
        return Response.ok(Map.of("creada", true, "tareaCodigo", t.codigo, "board", board.codigo,
                "columna", t.workflowEstado != null ? t.workflowEstado.codigo : "TODO",
                "aprobado", t.aprobado, "esperandoCliente", t.esperandoCliente)).build();
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
