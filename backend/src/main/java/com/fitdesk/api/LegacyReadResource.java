package com.fitdesk.api;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Sprint;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Usuario;
import com.fitdesk.overlay.Consulta;
import com.fitdesk.overlay.Progreso;
import com.fitdesk.overlay.RotacionSemanal;
import com.fitdesk.overlay.TicketAccion;
import com.fitdesk.overlay.TicketNota;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

/**
 * API de LECTURA legacy-compatible (Fase 3, slice 1). Devuelve la data
 * migrada a Postgres con las MISMAS formas JSON que hoy leen las vistas
 * Angular desde los nodos de Firebase (`/fit-daily/<nodo>`), para que el
 * frontend pueda apuntar a Quarkus detrás de una bandera SIN tocar las vistas.
 *
 * Es una capa de traducción temporal del periodo Strangler Fig: reconstruye
 * las formas del legacy desde el modelo relacional normalizado. Los ids de
 * persona/cliente salen ya reconciliados (assignee=codigo local, client=slug),
 * por eso la paridad es funcional/visual, no byte-idéntica.
 */
@Path("/api/legacy")
@Produces(MediaType.APPLICATION_JSON)
public class LegacyReadResource {

    /** workflow_estado.codigo → status legacy del board (inverso del ETL). */
    private static final Map<String, String> WORKFLOW_A_STATUS = Map.of(
            "TODO", "todo",
            "IN_PROGRESS", "in_progress",
            "EN_CERTIFICACION", "review",
            "ENTREGADO", "done");

    /** Board por defecto (paridad legacy: hasta ahora todo colgaba del board de Cuenca). */
    private static final String BOARD_DEFAULT = "CUENCA";

    // ── /stories → { stories: { "TA-001": {...}, ... } } ─────────────────
    // Se emiten TODAS las stories (el front genera ids TA-NNN del set global —codigo único—
    // y "Mi Panel" cruza todos los boards); cada una lleva su `board` para que la VISTA
    // del tablero filtre por el board seleccionado.
    @GET
    @Path("/stories")
    public Map<String, Object> stories() {
        Map<String, Object> mapa = new LinkedHashMap<>();
        for (Tarea t : Tarea.<Tarea>list("order by codigo")) {
            Map<String, Object> s = new LinkedHashMap<>();
            s.put("id", t.codigo);
            s.put("board", t.board != null ? t.board.codigo : BOARD_DEFAULT);
            s.put("sprint", t.sprint != null ? t.sprint.codigo : "");
            s.put("status", t.workflowEstado != null
                    ? WORKFLOW_A_STATUS.getOrDefault(t.workflowEstado.codigo, "todo") : "todo");
            s.put("priority", t.prioridad);
            s.put("description", t.descripcion != null ? t.descripcion : "");
            // assignee = id del HelpDesk (no el local): session.id es el id del HelpDesk,
            // así "Asignados a mí" y el sync board→ticket comparan el mismo espacio de id.
            // El nombre lo resuelve el board vía hdUsers; la escritura acepta ambos.
            s.put("assignee", t.asignadoA != null
                    ? (t.asignadoA.helpdeskUserId != null ? t.asignadoA.helpdeskUserId : t.asignadoA.codigoLocal)
                    : null);
            s.put("client", t.cliente != null ? t.cliente.codigo : null);
            s.put("ticket", t.ticketEspejo != null ? t.ticketEspejo.helpdeskTicketId : "");
            s.put("dueDate", ds(t.fechaLimite));
            s.put("points", t.puntos);
            s.put("progress", t.progreso);
            s.put("approved", t.aprobado);
            s.put("approvedDate", t.fechaAprobacion != null ? t.fechaAprobacion.toString() : null);
            s.put("waitingClient", t.esperandoCliente);
            s.put("waitingDate", t.fechaEsperando != null ? t.fechaEsperando.toString() : null);
            if (t.titulo != null) {
                s.put("title", t.titulo);
            }
            if (t.ticketEspejo != null && t.ticketEspejo.estadoOrigen != null) {
                s.put("hdEstatus", t.ticketEspejo.estadoOrigen);
            }
            if (t.cliente != null) {
                s.put("clientName", t.cliente.nombre);
            }
            // Tipo de tarea + reunión (V11).
            s.put("tipo", t.tipo != null ? t.tipo : "DESARROLLO_SOPORTE");
            if (t.subtipo != null) s.put("subtipo", t.subtipo);
            if (t.tema != null) s.put("tema", t.tema);
            if (t.link != null) s.put("link", t.link);
            if (t.inicio != null) s.put("inicio", t.inicio);
            if (t.fin != null) s.put("fin", t.fin);
            mapa.put(t.codigo, s);
        }
        return Map.of("stories", mapa);
    }

    // ── /sprints?board=CODIGO → { active, sprints:[...] } del board pedido ─
    @GET
    @Path("/sprints")
    public Map<String, Object> sprints(@QueryParam("board") String boardCodigo) {
        String bc = (boardCodigo == null || boardCodigo.isBlank()) ? BOARD_DEFAULT : boardCodigo.trim();
        List<Map<String, Object>> lista = new ArrayList<>();
        String active = "";
        for (Sprint sp : Sprint.<Sprint>list("board.codigo = ?1 order by codigo", bc)) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", sp.codigo);
            m.put("name", sp.nombre);
            m.put("status", sp.estado);
            m.put("capacity", sp.capacidad);
            m.put("goal", sp.objetivo != null ? sp.objetivo : "");
            m.put("start", ds(sp.fechaInicio));
            m.put("end", ds(sp.fechaFin));
            lista.add(m);
            if ("active".equals(sp.estado)) {
                active = sp.codigo;
            }
        }
        if (active.isEmpty() && !lista.isEmpty()) {
            active = (String) lista.get(lista.size() - 1).get("id");
        }
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("active", active);
        out.put("sprints", lista);
        return out;
    }

    // ── /boards → [ {codigo, nombre, equipo, regionalId} ] visibles para el actor ──
    // Visibilidad por Asignaciones (roles de plataforma): GLOBAL (ADMIN/GERENCIA) ve todos;
    // EQUIPO/REGIONAL ven los boards de sus equipos. Sirve al selector de tablero del board.
    @GET
    @Path("/boards")
    public List<Map<String, Object>> boards(@HeaderParam("X-Actor-Hid") String actorHid) {
        List<Map<String, Object>> out = new ArrayList<>();
        for (Board b : boardsVisibles(actorHid)) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("codigo", b.codigo);
            m.put("nombre", b.nombre);
            m.put("equipo", b.equipo != null ? b.equipo.nombre : null);
            m.put("regionalId", b.equipo != null && b.equipo.regional != null ? b.equipo.regional.id : null);
            m.put("activo", b.activo);
            out.add(m);
        }
        return out;
    }

    /** Boards que el usuario (por helpdesk_user_id) puede ver, según sus Asignaciones vigentes. */
    static List<Board> boardsVisibles(String hid) {
        List<Board> all = Board.<Board>list("order by id");
        if (hid != null && "MSC001".equalsIgnoreCase(hid.trim())) {
            return all; // bootstrap admin
        }
        Usuario u = (hid == null || hid.isBlank()) ? null : Usuario.findByHelpdeskUserId(hid.trim());
        if (u == null) {
            return List.of();
        }
        LocalDate hoy = LocalDate.now();
        Set<Long> equipoIds = new HashSet<>();
        boolean global = false;
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> global = true;
                case "EQUIPO" -> { if (a.alcanceEquipo != null) equipoIds.add(a.alcanceEquipo.id); }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null) {
                        for (Equipo e : Equipo.<Equipo>list("regional = ?1", a.alcanceRegional)) {
                            equipoIds.add(e.id);
                        }
                    }
                }
                default -> { /* CLIENTE u otros no otorgan board por ahora */ }
            }
        }
        if (global) {
            return all;
        }
        List<Board> out = new ArrayList<>();
        for (Board b : all) {
            if (b.equipo != null && equipoIds.contains(b.equipo.id)) {
                out.add(b);
            }
        }
        return out;
    }

    // ── /users → { users:[...] } ─────────────────────────────────────────
    @GET
    @Path("/users")
    public Map<String, Object> users() {
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Usuario u : Usuario.<Usuario>list("order by codigoLocal")) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.codigoLocal);
            m.put("name", u.nombre);
            m.put("role", u.alias);
            m.put("color", u.color);
            lista.add(m);
        }
        return Map.of("users", lista);
    }

    // ── /progress → { entries:[...] } ────────────────────────────────────
    @GET
    @Path("/progress")
    public Map<String, Object> progress() {
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Progreso p : Progreso.<Progreso>list("order by codigo")) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", p.codigo);
            m.put("storyId", p.tareaCodigo);
            m.put("author", p.autorLocal);
            m.put("date", ds(p.fecha));
            m.put("hoursLogged", p.horas);
            m.put("notes", p.notas != null ? p.notas : "");
            lista.add(m);
        }
        return Map.of("entries", lista);
    }

    // ── /queries → { queries:[...] } ─────────────────────────────────────
    @GET
    @Path("/queries")
    public Map<String, Object> queries() {
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Consulta c : Consulta.<Consulta>list("order by codigo")) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.codigo);
            m.put("storyId", c.tareaCodigo);
            m.put("author", c.autorLocal);
            m.put("date", ds(c.fecha));
            m.put("title", c.titulo != null ? c.titulo : "");
            m.put("description", c.descripcion != null ? c.descripcion : "");
            m.put("priority", c.prioridad);
            m.put("status", c.estado);
            lista.add(m);
        }
        return Map.of("queries", lista);
    }

    // ── /weeklySupport → { weeks:{ "YYYY-MM-DD": {...} } } ────────────────
    @GET
    // ── /weeklySupport?equipo=CODIGO → rotación semanal DEL EQUIPO ──
    // Cada equipo su rotación; sin `equipo` cae al equipo del actor. El front (selector de equipo)
    // manda el board/equipo elegido (RE = su equipo; ADMIN = cualquiera).
    @Path("/weeklySupport")
    public Map<String, Object> weeklySupport(@QueryParam("equipo") String equipoCodigo, @HeaderParam("X-Actor-Hid") String actorHid) {
        Map<String, Object> weeks = new LinkedHashMap<>();
        Equipo eq = resolverEquipoSemanal(equipoCodigo, actorHid);
        if (eq == null) {
            return Map.of("weeks", weeks);
        }
        for (RotacionSemanal rs : RotacionSemanal.<RotacionSemanal>list("equipo = ?1 order by semanaInicio", eq)) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("assignee", rs.assigneeLocal);
            m.put("notes", rs.notas != null ? rs.notas : "");
            m.put("updatedAt", rs.actualizadoEn != null ? rs.actualizadoEn.toString() : null);
            weeks.put(rs.semanaInicio.toString(), m);
        }
        return Map.of("weeks", weeks);
    }

    // ── /equipo-miembros?equipo=CODIGO → miembros del equipo (para el picker de la rotación) ──
    @GET
    @Path("/equipo-miembros")
    public List<Map<String, Object>> equipoMiembros(@QueryParam("equipo") String equipoCodigo, @HeaderParam("X-Actor-Hid") String actorHid) {
        List<Map<String, Object>> out = new ArrayList<>();
        Equipo eq = resolverEquipoSemanal(equipoCodigo, actorHid);
        if (eq == null) {
            return out;
        }
        Set<Long> vistos = new HashSet<>();
        // Miembros del equipo (asignación EQUIPO) + ESPECIALISTAS globales (soporte nacional que
        // cubre cualquier equipo, p. ej. quien rota en la semana aunque no sea del equipo).
        List<Asignacion> candidatos = new ArrayList<>();
        candidatos.addAll(Asignacion.<Asignacion>list("alcanceTipo = 'EQUIPO' and alcanceEquipo = ?1 and activo = true", eq));
        candidatos.addAll(Asignacion.<Asignacion>list("alcanceTipo = 'GLOBAL' and rol.codigo = 'ESPECIALISTA' and activo = true"));
        for (Asignacion a : candidatos) {
            Usuario u = a.usuario;
            if (u == null || !vistos.add(u.id)) {
                continue;
            }
            Map<String, Object> m = new LinkedHashMap<>();
            // id del picker = helpdesk_user_id (empleado del API); fallback al codigo local.
            m.put("id", u.helpdeskUserId != null ? u.helpdeskUserId : u.codigoLocal);
            m.put("name", u.nombre);
            out.add(m);
        }
        return out;
    }

    /** Equipo por codigo de board/param (el front manda board codigo), o el del actor si no viene. */
    private static Equipo resolverEquipoSemanal(String codigo, String actorHid) {
        if (codigo != null && !codigo.isBlank()) {
            Board b = Board.find("codigo", codigo.trim()).firstResult();
            if (b != null) {
                return b.equipo;
            }
            return Equipo.find("codigo", codigo.trim()).firstResult();
        }
        return equipoDelActor(actorHid);
    }

    // ── /hdNotes → { "<ticket>": "<texto>" } — solo las del EQUIPO del actor ──
    // La nota es del equipo que la crea: cada equipo ve/edita la suya; otro equipo no.
    @GET
    @Path("/hdNotes")
    public Map<String, Object> hdNotes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Map<String, Object> m = new LinkedHashMap<>();
        Equipo eq = equipoDelActor(actorHid);
        if (eq == null) {
            return m;
        }
        for (TicketNota n : TicketNota.<TicketNota>list("equipo = ?1 order by helpdeskTicketId", eq)) {
            m.put(n.helpdeskTicketId, n.texto);
        }
        return m;
    }

    /** Equipo (primero de alcance EQUIPO) del actor por su helpdesk_user_id, o null. */
    static Equipo equipoDelActor(String hid) {
        Usuario u = Usuario.findByHelpdeskUserId(hid == null ? "" : hid.trim());
        if (u == null) {
            return null;
        }
        Asignacion a = Asignacion.find("usuario = ?1 and alcanceTipo = 'EQUIPO' order by id", u).firstResult();
        return a != null ? a.alcanceEquipo : null;
    }

    // ── /hdActions → { "<ticket>": true } ────────────────────────────────
    @GET
    @Path("/hdActions")
    public Map<String, Object> hdActions() {
        Map<String, Object> m = new LinkedHashMap<>();
        for (TicketAccion a : TicketAccion.<TicketAccion>list("order by helpdeskTicketId")) {
            m.put(a.helpdeskTicketId, a.marcado);
        }
        return m;
    }

    // ── /hdPendientes → { "<ticket>": {...} } — SOLO los del actor (dueño) ──
    // Es el nodo "propio": lo que el usuario crea/edita/borra y para el check "¿este ticket
    // está pendiente para mí?". La visibilidad ampliada (equipo/admin) va en /hdPendientes-visibles.
    @GET
    @Path("/hdPendientes")
    public Map<String, Object> hdPendientes(@HeaderParam("X-Actor-Hid") String actorHid) {
        Map<String, Object> out = new LinkedHashMap<>();
        Usuario actor = Usuario.findByHelpdeskUserId(actorHid == null ? "" : actorHid.trim());
        if (actor == null) {
            return out;
        }
        for (TicketPendiente p : TicketPendiente.<TicketPendiente>list("usuario = ?1 order by helpdeskTicketId", actor)) {
            out.put(p.helpdeskTicketId, pendienteBase(p));
        }
        return out;
    }

    // ── /hdPendientes-visibles → [ {..., owner, ownerName, equipo, mine, miEquipo} ] ──
    // Visibilidad por rol: ADMIN ve TODO; RESPONSABLE_EQUIPO ve los de SU equipo (+ los suyos);
    // el resto solo los suyos. `miEquipo` marca los del equipo del actor (para acotar la alarma).
    @GET
    @Path("/hdPendientes-visibles")
    public List<Map<String, Object>> hdPendientesVisibles(@HeaderParam("X-Actor-Hid") String actorHid) {
        List<Map<String, Object>> out = new ArrayList<>();
        Usuario actor = Usuario.findByHelpdeskUserId(actorHid == null ? "" : actorHid.trim());
        boolean admin = Actor.esAdmin(actorHid);
        Set<Long> responsables = Actor.usuariosConRol("RESPONSABLE_EQUIPO");
        // "Subordinados": yo + los miembros de mis equipos (como responsable) que NO son
        // responsables. Regla: entre responsables NO se ven los pendientes (privacidad de pares).
        Set<Long> subordinados = new HashSet<>();
        if (actor != null) {
            subordinados.add(actor.id);
        }
        for (Long m : Actor.usuariosDeEquipos(Actor.equiposComoResponsable(actorHid))) {
            if (!responsables.contains(m)) {
                subordinados.add(m);
            }
        }
        // Visibilidad: ADMIN ve TODO (null = sin filtro); el resto ve a sus subordinados (+ él mismo).
        Set<Long> visibles = admin ? null : subordinados;
        // Alarma: yo + mis subordinados (el responsable recibe la de su equipo, EXCEPTO otros
        // responsables; un consultor solo la suya). El admin ve todo pero solo se alarma por esto.
        Set<Long> alarmaOwners = subordinados;
        // Opción B: un pendiente sobre una tarea ASIGNADA a mí también me concierne y me alarma
        // (aunque lo haya puesto otro, p. ej. el responsable al asignarme el ticket).
        Set<String> misTickets = new HashSet<>();
        if (actor != null) {
            for (Tarea t : Tarea.<Tarea>list("asignadoA = ?1", actor)) {
                if (t.ticketEspejo != null && t.ticketEspejo.helpdeskTicketId != null) {
                    misTickets.add(t.ticketEspejo.helpdeskTicketId);
                }
            }
        }
        for (TicketPendiente p : TicketPendiente.<TicketPendiente>list("usuario is not null order by dueDate, helpdeskTicketId")) {
            Long ownerId = p.usuario.id;
            boolean asignadaAmi = misTickets.contains(p.helpdeskTicketId);
            if (visibles != null && !visibles.contains(ownerId) && !asignadaAmi) {
                continue;
            }
            Map<String, Object> m = pendienteBase(p);
            m.put("owner", p.usuario.helpdeskUserId);
            m.put("ownerName", p.usuario.nombre);
            m.put("equipo", equipoDeUsuario(p.usuario));
            m.put("mine", actor != null && ownerId.equals(actor.id));
            m.put("asignadaAmi", asignadaAmi);
            m.put("alarma", alarmaOwners.contains(ownerId) || asignadaAmi); // dueño/subordinado O asignado
            out.add(m);
        }
        return out;
    }

    /** Campos base de un pendiente (misma forma que consume el front). */
    private static Map<String, Object> pendienteBase(TicketPendiente p) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("ticket", p.helpdeskTicketId);
        m.put("asunto", p.asunto);
        m.put("clienteRaw", p.clienteRaw);
        m.put("dueDate", p.dueDate != null ? p.dueDate.toString() : "");
        m.put("dueTime", p.dueTime);
        m.put("addedAt", p.addedAt != null ? p.addedAt.toString() : null);
        if (p.lastAlerted != null) {
            m.put("lastAlerted", p.lastAlerted.toString());
        }
        return m;
    }

    /** Nombre del equipo del usuario (primera asignación de alcance EQUIPO), para clasificar. */
    private static String equipoDeUsuario(Usuario u) {
        if (u == null) {
            return null;
        }
        Asignacion a = Asignacion.find("usuario = ?1 and alcanceTipo = 'EQUIPO'", u).firstResult();
        return (a != null && a.alcanceEquipo != null) ? a.alcanceEquipo.nombre : null;
    }

    // ── /ticket-espejo → { "<nº>": {ticket_id, client_id, cliente, assigned_user_id, estado} } ──
    // Caché de encabezados (sync de TicketEspejo) en la MISMA forma que el board espera del
    // ticket crudo del HelpDesk, para que lea el estado de Postgres y no pegue por tarjeta.
    @GET
    @Path("/ticket-espejo")
    public Map<String, Object> ticketEspejo() {
        Map<String, Object> out = new LinkedHashMap<>();
        for (TicketEspejo e : TicketEspejo.<TicketEspejo>listAll()) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("ticket_id", e.helpdeskTicketId);
            m.put("client_id", e.cliente != null ? e.cliente.helpdeskClientId : null);
            m.put("cliente", e.cliente != null ? e.cliente.nombre : null);
            m.put("assigned_user_id", e.asignadoHd);
            m.put("estado", e.estadoOrigen);
            out.put(e.helpdeskTicketId, m);
        }
        return out;
    }

    // ── /solNotes → {} (no se materializó en el legacy; se tolera vacío) ──
    @GET
    @Path("/solNotes")
    public Map<String, Object> solNotes() {
        return new LinkedHashMap<>();
    }

    /** LocalDate → "YYYY-MM-DD" o "" (las vistas legacy esperan string, no null, en fechas de agenda). */
    private static String ds(LocalDate d) {
        return d != null ? d.toString() : "";
    }
}
