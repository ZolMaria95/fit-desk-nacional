package com.fitdesk.legacy;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fitdesk.api.Actor;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Sprint;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Usuario;
import com.fitdesk.core.WorkflowEstado;
import com.fitdesk.notificaciones.NotificacionService;
import com.fitdesk.overlay.Consulta;
import com.fitdesk.overlay.Progreso;
import com.fitdesk.overlay.RotacionSemanal;
import com.fitdesk.overlay.TurnoSenior;
import com.fitdesk.overlay.TicketAccion;
import com.fitdesk.overlay.TicketNota;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

/**
 * Escrituras legacy-compatibles (Fase 3, slice 2). Imita la semántica de los
 * nodos de Firebase RTDB que hoy escribe el DataService de Angular, pero
 * persistiendo en Postgres:
 *   - PATCH parcial de una tarjeta  → UPDATE de la fila `tarea`.
 *   - PATCH de la colección stories → UPSERT (crear tarjeta / deep-path id/campo).
 *   - PUT de un nodo completo (sprints, hdNotes, weeklySupport…) → RECONCILIA la
 *     tabla para que quede igual al nodo (upsert presentes, borra ausentes).
 * Reconcilia porque el front hace PUT del nodo entero (así, quitar una nota = borrarla).
 */
@ApplicationScoped
public class LegacyWriteService {

    @Inject
    ObjectMapper mapper;

    @Inject
    NotificacionService notificaciones;

    /** status legacy del board → codigo de workflow_estado (mismo mapeo que el ETL). */
    private static final Map<String, String> STATUS_A_WORKFLOW = Map.of(
            "todo", "TODO",
            "in_progress", "IN_PROGRESS",
            "inprogress", "IN_PROGRESS",
            "review", "EN_CERTIFICACION",
            "done", "ENTREGADO");

    // ── Stories (tareas) ─────────────────────────────────────────────────

    /** PATCH /stories/stories/{id}: actualiza SOLO los campos presentes. */
    @Transactional
    public boolean patchStory(String id, JsonNode fields) {
        Tarea t = Tarea.findByCodigo(id);
        if (t == null) {
            return false;
        }
        applyFields(t, fields, false);
        return true;
    }

    /**
     * PATCH /stories/stories: el body es un mapa cuyas claves son id de tarjeta
     * (valor = tarjeta completa → upsert) o deep-path "id/campo" (valor = escalar
     * → set de ese campo), tal como el PATCH de Firebase.
     */
    @Transactional
    public void patchStories(JsonNode body) {
        if (body == null || !body.isObject()) {
            return;
        }
        Iterator<Map.Entry<String, JsonNode>> it = body.fields();
        while (it.hasNext()) {
            Map.Entry<String, JsonNode> e = it.next();
            String key = e.getKey();
            if (key.contains("/")) {
                String[] parts = key.split("/", 2);
                Tarea t = Tarea.findByCodigo(parts[0]);
                if (t == null) {
                    continue;
                }
                ObjectNode single = mapper.createObjectNode();
                single.set(parts[1], e.getValue());
                applyFields(t, single, false);
            } else {
                // Distingue creación de actualización ANTES del upsert: el board-por-cliente
                // (abajo, en applyFields) solo debe aplicarse al crear, nunca a un PATCH sobre
                // una tarea que ya vivía en un tablero (aunque ese PATCH reenvíe 'client'/'ticket').
                boolean esNueva = Tarea.findByCodigo(key) == null;
                Tarea t = upsertTarea(key);
                applyFields(t, e.getValue(), esNueva);
            }
        }
    }

    /** Resultado de un intento de borrado de tarea (para que el resource devuelva 204/404/403/409). */
    public enum DeleteResult { OK, NOT_FOUND, FORBIDDEN, HAS_TICKET }

    /**
     * DELETE /stories/stories/{id}: borra la tarjeta (desliga progreso/consulta que la referencien).
     * Autorización SERVER-SIDE (no se confía en el cliente): SOLO ADMIN o el Responsable de Equipo del
     * board pueden borrar; NUNCA una tarea con ticket asociado (nace del HelpDesk). Cierra la fuga por la
     * que un bundle viejo en caché (PWA) podía borrar tareas sin ticket llamando este endpoint sin control
     * (ver docs/decisiones — incidentes TA-224 / TA-230). El actor llega en X-Actor-Hid.
     */
    @Transactional
    public DeleteResult deleteStory(String id, String actorHid) {
        Tarea t = Tarea.findByCodigo(id);
        if (t == null) {
            return DeleteResult.NOT_FOUND;
        }
        if (t.ticketEspejo != null) {
            return DeleteResult.HAS_TICKET;
        }
        Long equipoId = (t.board != null && t.board.equipo != null) ? t.board.equipo.id : null;
        if (!(Actor.esAdmin(actorHid) || Actor.gobierna(actorHid, equipoId))) {
            return DeleteResult.FORBIDDEN;
        }
        Progreso.update("tarea = null where tarea = ?1", t);
        Consulta.update("tarea = null where tarea = ?1", t);
        t.delete();
        return DeleteResult.OK;
    }

    private static boolean esEnProceso(WorkflowEstado we) {
        return we != null && "IN_PROGRESS".equals(we.codigo);
    }

    /** Siguiente codigo TA-NNN, derivado del MÁXIMO REAL de la BD (no del cliente). Atómico dentro de la tx. */
    private String nextTareaCodigo() {
        Number max = (Number) Tarea.getEntityManager()
                .createNativeQuery("SELECT COALESCE(MAX(CAST(SUBSTRING(codigo FROM 4) AS INTEGER)), 0) "
                        + "FROM tarea WHERE codigo ~ '^TA-[0-9]+$'")
                .getSingleResult();
        return "TA-" + String.format("%03d", max.intValue() + 1);
    }

    /**
     * POST /stories/stories: crea una tarea con id ASIGNADO POR EL SERVIDOR (atómico). Antes el id lo
     * calculaba el navegador (max+1 de SU vista); una vista DESACTUALIZADA podía chocar y PISAR la tarea de
     * otro (ver docs/decisiones). Ahora el backend lo deriva del máximo REAL de la tabla. Devuelve el codigo.
     */
    @Transactional
    public String createStory(JsonNode fields) {
        Tarea t = new Tarea();
        t.codigo = nextTareaCodigo();
        t.board = board();
        t.workflowEstado = workflowByStatus(null);
        // Fuerza el INSERT ya: si el codigo choca por creación concurrente, falla AQUÍ y el resource reintenta.
        t.persistAndFlush();
        applyFields(t, fields, true);
        return t.codigo;
    }

    private Tarea upsertTarea(String codigo) {
        Tarea t = Tarea.findByCodigo(codigo);
        if (t == null) {
            t = new Tarea();
            t.codigo = codigo;
            t.board = board(); // default; applyFields lo sobreescribe si la story trae 'board'
            t.workflowEstado = workflowByStatus(null);
            t.persist();
        }
        return t;
    }

    /** Aplica los campos presentes de una story (legacy) sobre la fila tarea.
     *  {@code creando}: true solo en el momento de CREAR la tarea (nunca en un PATCH posterior) —
     *  gobierna si el equipo responsable del cliente puede mandar sobre el tablero, ver abajo. */
    private void applyFields(Tarea t, JsonNode f, boolean creando) {
        if (f == null || !f.isObject()) {
            return;
        }
        // Estado ANTES de aplicar cambios, para el buzón de notificaciones (detecta TRANSICIONES,
        // no el valor final): "antes no tenía asignado, ahora sí" / "antes no estaba en Entregado sin
        // finalizar, ahora sí". En una tarea recién creada, t.asignadoA ya es null y su workflowEstado
        // es el default (no "final"), así que ambas comparaciones funcionan igual en creación y en PATCH.
        Usuario asignadoAntes = t.asignadoA;
        boolean sinFinalizarAntes = esTareaSinFinalizarPendiente(t);
        boolean aprobadoAntes = t.aprobado;
        if (f.has("status")) {
            boolean enProcesoAntes = esEnProceso(t.workflowEstado);
            t.workflowEstado = workflowByStatus(text(f, "status"));
            // "¿Desde cuándo está trabajando en eso?" (reporte Estado del equipo): se marca al ENTRAR a
            // In Progress; si ya estaba, no se toca; si sale, se conserva la última.
            if (!enProcesoAntes && esEnProceso(t.workflowEstado)) {
                t.enProcesoDesde = OffsetDateTime.now();
            }
        }
        // El cliente se resuelve ANTES que el board: al CREAR una tarea con ticket, el equipo
        // responsable del cliente (si está registrado) manda sobre el 'board' que mande el
        // frontend — que solo refleja el tablero que el actor tenía abierto en pantalla, no el
        // dueño real del cliente (mismo criterio que /stories/desde-ticket-asignado; ver
        // docs/decisiones.md). En un PATCH sobre una tarea YA EXISTENTE (creando=false) nunca se
        // reasigna de tablero solo por tocar estos campos.
        Cliente clienteResuelto = f.has("client") ? clienteBy(text(f, "client")) : null;
        Board boardPorCliente = null;
        if (creando && text(f, "ticket") != null && clienteResuelto != null && clienteResuelto.equipoResponsable != null) {
            boardPorCliente = Board.<Board>find("equipo.id = ?1 and activo = true order by id",
                    clienteResuelto.equipoResponsable.id).firstResult();
        }
        // El board debe resolverse ANTES que el sprint (el sprint es único por board).
        if (boardPorCliente != null) {
            t.board = boardPorCliente;
        } else if (f.has("board")) {
            Board b = boardByCodigo(text(f, "board"));
            if (b != null) {
                t.board = b;
            }
        }
        if (f.has("sprint")) {
            t.sprint = sprintByCodigo(text(f, "sprint"), t.board);
        }
        if (f.has("assignee")) {
            t.asignadoA = usuarioBy(text(f, "assignee"));
        }
        if (f.has("client")) {
            String raw = text(f, "client");
            t.cliente = clienteResuelto; // ya resuelto arriba (FK si el cliente está registrado; null si no)
            // Conserva el código crudo (p. ej. helpdesk_client_id del catálogo) para no perder
            // un cliente NO registrado (reunión con cualquier cliente del HelpDesk).
            t.clienteCodigoRaw = raw != null && !raw.isBlank() ? raw : null;
        }
        if (f.has("clientName")) {
            t.clienteNombre = trunc(text(f, "clientName"), 300);
        }
        if (f.has("ticket")) {
            t.ticketEspejo = espejoFor(text(f, "ticket"), t);
        }
        if (f.has("priority")) {
            t.prioridad = coalesce(text(f, "priority"), "media");
        }
        if (f.has("description")) {
            t.descripcion = text(f, "description");
        }
        if (f.has("title")) {
            t.titulo = trunc(text(f, "title"), 500);
        }
        if (f.has("dueDate")) {
            t.fechaLimite = date(text(f, "dueDate"));
        }
        if (f.has("points")) {
            t.puntos = f.get("points").asInt(1);
        }
        if (f.has("progress")) {
            t.progreso = clamp(f.get("progress").asInt(0), 0, 100);
        }
        if (f.has("approved")) {
            t.aprobado = f.get("approved").asBoolean(false);
        }
        if (f.has("approvedDate")) {
            t.fechaAprobacion = date(text(f, "approvedDate"));
        }
        if (f.has("waitingClient")) {
            t.esperandoCliente = f.get("waitingClient").asBoolean(false);
        }
        if (f.has("waitingDate")) {
            t.fechaEsperando = date(text(f, "waitingDate"));
        }
        // hdEstatus se guarda en el espejo (si la tarjeta tiene ticket enlazado).
        if (f.has("hdEstatus") && t.ticketEspejo != null) {
            t.ticketEspejo.estadoOrigen = text(f, "hdEstatus");
        }
        // Tipo de tarea + campos de reunión (V11).
        if (f.has("tipo")) {
            t.tipo = coalesce(text(f, "tipo"), "DESARROLLO_SOPORTE");
        }
        if (f.has("subtipo")) {
            t.subtipo = text(f, "subtipo");
        }
        if (f.has("tema")) {
            t.tema = text(f, "tema");
        }
        if (f.has("link")) {
            t.link = text(f, "link");
        }
        if (f.has("inicio")) {
            t.inicio = text(f, "inicio");
        }
        if (f.has("fin")) {
            t.fin = text(f, "fin");
        }
        if (f.has("recordatorioMin")) {
            // Minutos antes del inicio para la alerta de la reunión. null / <=0 / no numérico → sin recordatorio.
            JsonNode rm = f.get("recordatorioMin");
            t.recordatorioMin = (rm == null || rm.isNull() || !rm.canConvertToInt() || rm.asInt() <= 0) ? null : rm.asInt();
        }
        t.actualizadoEn = OffsetDateTime.now();

        // Buzón: solo en la TRANSICIÓN (evita renotificar en cada PATCH si el valor no cambió de
        // "no cumple" a "cumple"). Tareas CON ticket nunca generan estas dos (lo filtran los propios
        // métodos de NotificacionService).
        if (t.asignadoA != null && t.asignadoA != asignadoAntes) {
            notificaciones.tareaAsignada(t);
        }
        if (esTareaSinFinalizarPendiente(t) && !sinFinalizarAntes) {
            notificaciones.tareaSinFinalizar(t);
        }
        if (t.aprobado && !aprobadoAntes) {
            notificaciones.resolverTareaFinalizada(t);
        }
    }

    /** Tarea sin ticket, ya en la columna final (Entregado) y sin marcarse Finalizada. */
    private static boolean esTareaSinFinalizarPendiente(Tarea t) {
        return t.ticketEspejo == null && t.workflowEstado != null
                && "final".equals(t.workflowEstado.categoria) && !t.aprobado;
    }

    private TicketEspejo espejoFor(String ticket, Tarea t) {
        if (ticket == null || ticket.isBlank()) {
            return null;
        }
        TicketEspejo e = TicketEspejo.findByHelpdeskTicketId(ticket);
        if (e == null) {
            e = new TicketEspejo();
            e.helpdeskTicketId = ticket;
            e.cliente = t.cliente;
            e.asunto = t.titulo;
            // SEMILLA del asignado: al crear la tarea desde un ticket, el `assignee` que trae
            // la story ES el del ticket (el board lo precarga del HelpDesk) y ya se aplicó a
            // t.asignadoA antes de llegar aquí. Sin esta semilla la fila nacía con asignado_hd
            // NULL y, como el read model deriva el dueño de esa columna, la tarea quedaba sin
            // dueño hasta el siguiente sync completo. El sync la sobrescribe con el valor
            // autoritativo del HelpDesk.
            e.asignadoHd = hidDe(t.asignadoA);
            e.lastSyncedAt = OffsetDateTime.now();
            e.persist();
        } else if (e.asignadoHd == null || e.asignadoHd.isBlank()) {
            // Fila esqueleto creada antes sin asignado: se rellena el hueco (no se pisa un
            // valor existente del HelpDesk, solo se completa lo que estaba vacío).
            e.asignadoHd = hidDe(t.asignadoA);
        }
        return e;
    }

    /** helpdesk_user_id (mayúsculas) del usuario, o null. Mismo espacio de id que el espejo. */
    private static String hidDe(Usuario u) {
        if (u == null || u.helpdeskUserId == null || u.helpdeskUserId.isBlank()) {
            return null;
        }
        return u.helpdeskUserId.trim().toUpperCase();
    }

    // ── Sprints ──────────────────────────────────────────────────────────

    /** PUT /sprints?board=X: {active, sprints:[...]} → reconcilia la tabla sprint de ESE board. */
    @Transactional
    public void putSprints(JsonNode node, String boardCodigo) {
        Board b = boardByCodigoOrDefault(boardCodigo);
        Set<String> keep = new HashSet<>();
        JsonNode arr = node.path("sprints");
        if (arr.isArray()) {
            for (JsonNode s : arr) {
                String codigo = text(s, "id");
                if (codigo == null) {
                    continue;
                }
                keep.add(codigo);
                Sprint sp = Sprint.find("board = ?1 and codigo = ?2", b, codigo).firstResult();
                if (sp == null) {
                    sp = new Sprint();
                    sp.board = b;
                    sp.codigo = codigo;
                    sp.persist();
                }
                sp.nombre = coalesce(text(s, "name"), codigo);
                sp.estado = coalesce(text(s, "status"), "planned");
                sp.capacidad = s.path("capacity").asInt(0);
                sp.objetivo = text(s, "goal");
                sp.fechaInicio = date(text(s, "start"));
                sp.fechaFin = date(text(s, "end"));
                sp.actualizadoEn = OffsetDateTime.now();
            }
        }
        // Puntero `active`: el read deriva el activo de estado='active'. Reflejarlo.
        String active = text(node, "active");
        if (active != null) {
            for (Sprint sp : Sprint.<Sprint>list("board", b)) {
                if (sp.codigo.equals(active)) {
                    sp.estado = "active";
                } else if ("active".equals(sp.estado)) {
                    sp.estado = "completed";
                }
            }
        }
        // Borrar sprints ausentes del nodo (desligando las tareas que los referencien).
        for (Sprint sp : Sprint.<Sprint>list("board", b)) {
            if (!keep.contains(sp.codigo)) {
                Tarea.update("sprint = null where sprint = ?1", sp);
                sp.delete();
            }
        }
    }

    // ── Overlays (nodo completo → reconciliar tabla) ─────────────────────

    /**
     * PUT /hdNotes: { "<ticket>": "<texto>" } — las notas DEL EQUIPO del actor. La nota es del
     * equipo que la crea (equipo=equipo del actor) y la reconciliación borra solo las de ese
     * equipo ausentes (nunca las de otros equipos). Sin equipo no se escribe (default deny).
     */
    @Transactional
    public void putHdNotes(JsonNode node, String actorHid) {
        Equipo eq = equipoDelActor(actorHid);
        if (eq == null) {
            return;
        }
        Set<String> keep = new HashSet<>();
        if (node.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> it = node.fields();
            while (it.hasNext()) {
                Map.Entry<String, JsonNode> e = it.next();
                String texto = textVal(e.getValue());
                if (texto == null) {
                    continue;
                }
                String num = e.getKey();
                keep.add(num);
                TicketNota n = TicketNota.findByTicketAndEquipo(num, eq);
                boolean nueva = n == null;
                if (nueva) {
                    n = new TicketNota();
                    n.helpdeskTicketId = num;
                    n.equipo = eq;
                }
                // texto es NOT NULL y el id es IDENTITY (persist = INSERT inmediato): setear ANTES de persistir.
                n.texto = texto;
                n.ticketEspejo = TicketEspejo.findByHelpdeskTicketId(num);
                n.actualizadoEn = OffsetDateTime.now();
                if (nueva) {
                    n.persist();
                }
            }
        }
        // Reconciliar SOLO las notas del equipo del actor. Un set VACÍO NO borra nada:
        // un cliente con estado obsoleto/sin cargar enviaba {} y arrasaba TODAS las notas
        // del equipo (pérdida total real). Solo se borran las ausentes si el cliente
        // efectivamente mandó notas. (Borrar la última nota vía este endpoint deja de ser
        // posible, a cambio de eliminar el riesgo de wipe accidental.)
        if (!keep.isEmpty()) {
            TicketNota.delete("equipo = ?1 and helpdeskTicketId not in ?2", eq, keep);
        }
    }

    /** Equipo (primero de alcance EQUIPO) del actor por su helpdesk_user_id, o null. */
    private static Equipo equipoDelActor(String actorHid) {
        Usuario u = actorHid == null || actorHid.isBlank() ? null : Usuario.findByHelpdeskUserId(actorHid.trim());
        if (u == null) {
            return null;
        }
        Asignacion a = Asignacion.find("usuario = ?1 and alcanceTipo = 'EQUIPO' order by id", u).firstResult();
        return a != null ? a.alcanceEquipo : null;
    }

    /** PUT /hdActions: { "<ticket>": true }. */
    @Transactional
    public void putHdActions(JsonNode node) {
        Set<String> keep = new HashSet<>();
        if (node.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> it = node.fields();
            while (it.hasNext()) {
                Map.Entry<String, JsonNode> e = it.next();
                if (!e.getValue().asBoolean(false)) {
                    continue;
                }
                String num = e.getKey();
                keep.add(num);
                TicketAccion a = TicketAccion.findByHelpdeskTicketId(num);
                if (a == null) {
                    a = new TicketAccion();
                    a.helpdeskTicketId = num;
                    a.persist();
                }
                a.marcado = true;
                a.ticketEspejo = TicketEspejo.findByHelpdeskTicketId(num);
                a.actualizadoEn = OffsetDateTime.now();
            }
        }
        if (keep.isEmpty()) {
            TicketAccion.deleteAll();
        } else {
            TicketAccion.delete("helpdeskTicketId not in ?1", keep);
        }
    }

    /**
     * PUT /hdPendientes: { "<ticket>": {...} } — los pendientes DEL ACTOR. Cada pendiente tiene
     * dueño (usuario=actor) y la reconciliación borra solo los del actor ausentes (no los de otros).
     * Sin actor no se escribe (default deny).
     *
     * ⚠️ NO USADO por el frontend actual (ver `putHdPendiente`, singular, más abajo) — se conserva
     * solo por compatibilidad, pero un cliente con el mapa local incompleto que llame a este PUT
     * BORRARÍA todos los pendientes reales del actor ausentes del envío. Incidente 2026-09-17:
     * esto pasó tres veces (crear en ráfaga, eliminar uno, postergar uno) porque `setHdPendiente`/
     * `updateHdPendiente`/`removeHdPendiente` reenviaban aquí el mapa completo. Los tres ahora usan
     * el endpoint de abajo (un ticket, sin reconciliar). No agregar nuevos llamadores de este método.
     */
    @Transactional
    public void putHdPendientes(JsonNode node, String actorHid) {
        Usuario actor = actorHid == null || actorHid.isBlank() ? null : Usuario.findByHelpdeskUserId(actorHid.trim());
        if (actor == null) {
            return;
        }
        Set<String> keep = new HashSet<>();
        if (node.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> it = node.fields();
            while (it.hasNext()) {
                Map.Entry<String, JsonNode> e = it.next();
                keep.add(e.getKey());
                upsertPendiente(actor, e.getKey(), e.getValue());
            }
        }
        // Reconciliar SOLO los del actor (nunca toca los de otros usuarios).
        if (keep.isEmpty()) {
            TicketPendiente.delete("usuario = ?1", actor);
        } else {
            TicketPendiente.delete("usuario = ?1 and helpdeskTicketId not in ?2", actor, keep);
        }
    }

    /**
     * PUT /hdPendientes/{ticket}: crea o reemplaza UN SOLO pendiente del actor — sin reconciliar
     * (nunca borra otros). Es el que usa el frontend para crear/pausar/reanudar/postergar: manda
     * SIEMPRE el objeto completo resultante para ese ticket (no un patch parcial), igual que antes,
     * pero ya no puede arrastrar al resto si el mapa local del cliente estaba incompleto.
     */
    @Transactional
    public boolean putHdPendiente(String ticket, JsonNode p, String actorHid) {
        Usuario actor = actorHid == null || actorHid.isBlank() ? null : Usuario.findByHelpdeskUserId(actorHid.trim());
        if (actor == null) {
            return false;
        }
        upsertPendiente(actor, ticket, p);
        return true;
    }

    private void upsertPendiente(Usuario actor, String ticket, JsonNode p) {
        TicketPendiente tp = TicketPendiente.findByTicketAndUsuario(ticket, actor);
        if (tp == null) {
            tp = new TicketPendiente();
            tp.helpdeskTicketId = ticket;
            tp.usuario = actor;
            tp.persist();
        }
        tp.asunto = trunc(text(p, "asunto"), 500);
        tp.clienteRaw = trunc(text(p, "clienteRaw"), 300);
        tp.dueDate = date(text(p, "dueDate"));
        tp.dueTime = text(p, "dueTime");
        tp.addedAt = instante(text(p, "addedAt"));
        tp.lastAlerted = date(text(p, "lastAlerted"));
        tp.ticketEspejo = TicketEspejo.findByHelpdeskTicketId(ticket);
        tp.cliente = clienteByNombre(text(p, "clienteRaw"));
        tp.nota = trunc(text(p, "nota"), 300);
        tp.paused = p.path("paused").asBoolean(false);
        tp.actualizadoEn = OffsetDateTime.now();
    }

    /**
     * PUT /weeklySupport?equipo=CODIGO: { weeks: {...} } — la rotación DEL EQUIPO. Cada equipo su
     * rotación (equipo=board elegido, o el del actor); reconcilia solo las semanas de ese equipo.
     */
    @Transactional
    public void putWeekly(JsonNode node, String equipoCodigo, String actorHid) {
        Equipo eq = equipoSemanal(equipoCodigo, actorHid);
        if (eq == null) {
            return;
        }
        Set<LocalDate> keep = new HashSet<>();
        JsonNode weeks = node.path("weeks");
        if (weeks.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> it = weeks.fields();
            while (it.hasNext()) {
                Map.Entry<String, JsonNode> e = it.next();
                LocalDate semana = date(e.getKey());
                if (semana == null) {
                    continue;
                }
                keep.add(semana);
                JsonNode w = e.getValue();
                RotacionSemanal rs = RotacionSemanal.findBySemanaAndEquipo(semana, eq);
                if (rs == null) {
                    rs = new RotacionSemanal();
                    rs.semanaInicio = semana;
                    rs.equipo = eq;
                    rs.persist();
                }
                String assignee = text(w, "assignee");
                rs.assigneeLocal = assignee;
                rs.usuario = assignee != null ? usuarioBy(assignee) : null;
                rs.notas = text(w, "notes");
                rs.actualizadoEn = OffsetDateTime.now();
            }
        }
        // Reconciliar SOLO las semanas de ESE equipo.
        if (keep.isEmpty()) {
            RotacionSemanal.delete("equipo = ?1", eq);
        } else {
            RotacionSemanal.delete("equipo = ?1 and semanaInicio not in ?2", eq, keep);
        }
    }

    /**
     * PUT /turnoSenior?equipo=CODIGO: { weeks: { "<lunes>": { mesaAyuda, emergentes, notes } } } — el
     * Senior de Turno DEL EQUIPO (mismo equipo que weeklySupport). Reconcilia solo las semanas de ese
     * equipo; una semana sin ningún rol lleno se borra.
     */
    @Transactional
    public void putTurnoSenior(JsonNode node, String equipoCodigo, String actorHid) {
        Equipo eq = equipoSemanal(equipoCodigo, actorHid);
        if (eq == null) {
            return;
        }
        Set<LocalDate> keep = new HashSet<>();
        JsonNode weeks = node.path("weeks");
        if (weeks.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> it = weeks.fields();
            while (it.hasNext()) {
                Map.Entry<String, JsonNode> e = it.next();
                LocalDate semana = date(e.getKey());
                JsonNode w = e.getValue();
                String mesa = trunc(text(w, "mesaAyuda"), 40);
                String emerg = trunc(text(w, "emergentes"), 40);
                if (semana == null || (mesa == null && emerg == null)) {
                    continue;
                }
                keep.add(semana);
                TurnoSenior t = TurnoSenior.findBySemanaAndEquipo(semana, eq);
                if (t == null) {
                    t = new TurnoSenior();
                    t.semanaInicio = semana;
                    t.equipo = eq;
                    t.persist();
                }
                t.mesaAyuda = mesa;
                t.emergentes = emerg;
                t.notas = text(w, "notes");
                t.actualizadoEn = OffsetDateTime.now();
            }
        }
        if (keep.isEmpty()) {
            TurnoSenior.delete("equipo = ?1", eq);
        } else {
            TurnoSenior.delete("equipo = ?1 and semanaInicio not in ?2", eq, keep);
        }
    }

    /** Equipo por codigo de board/param (el front manda board codigo), o el del actor si no viene. */
    private static Equipo equipoSemanal(String codigo, String actorHid) {
        if (codigo != null && !codigo.isBlank()) {
            Board b = Board.find("codigo", codigo.trim()).firstResult();
            if (b != null) {
                return b.equipo;
            }
            return Equipo.find("codigo", codigo.trim()).firstResult();
        }
        Usuario u = actorHid == null || actorHid.isBlank() ? null : Usuario.findByHelpdeskUserId(actorHid.trim());
        if (u == null) {
            return null;
        }
        Asignacion a = Asignacion.find("usuario = ?1 and alcanceTipo = 'EQUIPO' order by id", u).firstResult();
        return a != null ? a.alcanceEquipo : null;
    }

    /** PUT /progress: { entries:[...] }. */
    @Transactional
    public void putProgress(JsonNode node) {
        Set<String> keep = new HashSet<>();
        JsonNode entries = node.path("entries");
        if (entries.isArray()) {
            for (JsonNode e : entries) {
                String codigo = text(e, "id");
                if (codigo == null) {
                    continue;
                }
                keep.add(codigo);
                Progreso p = Progreso.findByCodigo(codigo);
                if (p == null) {
                    p = new Progreso();
                    p.codigo = codigo;
                    p.persist();
                }
                p.tareaCodigo = text(e, "storyId");
                p.tarea = p.tareaCodigo != null ? Tarea.findByCodigo(p.tareaCodigo) : null;
                p.autorLocal = text(e, "author");
                p.autor = p.autorLocal != null ? Usuario.findByCodigoLocal(p.autorLocal) : null;
                p.fecha = date(text(e, "date"));
                p.horas = e.path("hoursLogged").asInt(0);
                p.notas = text(e, "notes");
            }
        }
        if (keep.isEmpty()) {
            Progreso.deleteAll();
        } else {
            Progreso.delete("codigo not in ?1", keep);
        }
    }

    /** PUT /queries: { queries:[...] }. */
    @Transactional
    public void putQueries(JsonNode node) {
        Set<String> keep = new HashSet<>();
        JsonNode queries = node.path("queries");
        if (queries.isArray()) {
            for (JsonNode q : queries) {
                String codigo = text(q, "id");
                if (codigo == null) {
                    continue;
                }
                keep.add(codigo);
                Consulta c = Consulta.findByCodigo(codigo);
                if (c == null) {
                    c = new Consulta();
                    c.codigo = codigo;
                    c.persist();
                }
                c.tareaCodigo = text(q, "storyId");
                c.tarea = c.tareaCodigo != null ? Tarea.findByCodigo(c.tareaCodigo) : null;
                c.autorLocal = text(q, "author");
                c.autor = c.autorLocal != null ? Usuario.findByCodigoLocal(c.autorLocal) : null;
                c.fecha = date(text(q, "date"));
                c.titulo = trunc(text(q, "title"), 300);
                c.descripcion = text(q, "description");
                c.prioridad = text(q, "priority");
                c.estado = text(q, "status");
            }
        }
        if (keep.isEmpty()) {
            Consulta.deleteAll();
        } else {
            Consulta.delete("codigo not in ?1", keep);
        }
    }

    // ── Resolvers ────────────────────────────────────────────────────────

    private Board board() {
        Board b = Board.find("codigo", "CUENCA").firstResult();
        return b != null ? b : Board.findAll().firstResult();
    }

    private Board boardByCodigo(String codigo) {
        return (codigo == null || codigo.isBlank()) ? null : Board.find("codigo", codigo.trim()).firstResult();
    }

    /** Board por codigo; si no viene o no existe, el default (Cuenca) — paridad legacy. */
    private Board boardByCodigoOrDefault(String codigo) {
        Board b = boardByCodigo(codigo);
        return b != null ? b : board();
    }

    private WorkflowEstado workflowByStatus(String status) {
        String code = STATUS_A_WORKFLOW.getOrDefault(status == null ? "" : status.toLowerCase(), "TODO");
        return WorkflowEstado.find("codigo", code).firstResult();
    }

    /** Sprint por codigo, resuelto DENTRO del board (unique board+codigo); global como respaldo. */
    private Sprint sprintByCodigo(String codigo, Board board) {
        if (codigo == null) {
            return null;
        }
        if (board != null) {
            return Sprint.find("board = ?1 and codigo = ?2", board, codigo).firstResult();
        }
        return Sprint.find("codigo", codigo).firstResult();
    }

    /** Resuelve un assignee: por codigo local (KM) y, como respaldo, por helpdesk_user_id. */
    private Usuario usuarioBy(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        Usuario u = Usuario.findByCodigoLocal(token);
        return u != null ? u : Usuario.findByHelpdeskUserId(token);
    }

    /** Resuelve un cliente: por codigo (slug) y, como respaldo, por helpdesk_client_id. */
    private Cliente clienteBy(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        Cliente c = Cliente.findByCodigo(token);
        return c != null ? c : Cliente.find("helpdeskClientId", token).firstResult();
    }

    private Cliente clienteByNombre(String nombre) {
        return nombre == null ? null
                : Cliente.find("upper(nombre) = ?1", nombre.trim().toUpperCase()).firstResult();
    }

    // ── Helpers de parsing ───────────────────────────────────────────────

    private static String text(JsonNode n, String field) {
        return n == null ? null : textVal(n.get(field));
    }

    private static String textVal(JsonNode v) {
        if (v == null || v.isNull()) {
            return null;
        }
        String s = v.asText();
        return s == null || s.isBlank() ? null : s.trim();
    }

    private static String coalesce(String a, String b) {
        return a != null ? a : b;
    }

    private static String trunc(String s, int max) {
        return s == null ? null : (s.length() <= max ? s : s.substring(0, max));
    }

    private static int clamp(int v, int lo, int hi) {
        return Math.max(lo, Math.min(hi, v));
    }

    private static LocalDate date(String s) {
        if (s == null || s.isBlank()) {
            return null;
        }
        try {
            return LocalDate.parse(s.trim());
        } catch (DateTimeParseException ex) {
            return null;
        }
    }

    private static OffsetDateTime instante(String s) {
        if (s == null || s.isBlank()) {
            return null;
        }
        try {
            return OffsetDateTime.parse(s.trim());
        } catch (DateTimeParseException ex) {
            return null;
        }
    }
}
