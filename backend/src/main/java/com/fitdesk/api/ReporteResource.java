package com.fitdesk.api;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.Usuario;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Reportes para quien dirige equipos. Acceso = {@link Actor#equiposGestionables}: ADMIN (todos) o
 * RESPONSABLE_EQUIPO en su alcance (EQUIPO / REGIONAL / GLOBAL). El resto → 403 (default deny).
 */
@Path("/api/reportes")
@Produces(MediaType.APPLICATION_JSON)
public class ReporteResource {

    private static final ZoneId ZONA = ZoneId.of("America/Guayaquil");
    /** "Seguimiento hoy": esperando al cliente desde hace al menos N días. */
    static final int DIAS_ESPERANDO_CLIENTE = 3;
    /** "Seguimiento hoy": en In Progress desde hace al menos N días. */
    static final int DIAS_EN_PROCESO = 5;
    private static final Set<String> ACTIVOS = Set.of("TODO", "IN_PROGRESS", "EN_CERTIFICACION");

    /** Equipos sobre los que el actor puede generar reportes: [{codigo, nombre}] por nombre. */
    @GET
    @Path("/equipos")
    public Response equipos(@HeaderParam("X-Actor-Hid") String actorHid) {
        Set<Long> ids = Actor.equiposGestionables(actorHid);
        if (ids.isEmpty()) {
            return denegar();
        }
        List<Map<String, Object>> out = new ArrayList<>();
        for (Equipo e : Equipo.<Equipo>list("id in ?1 order by nombre", ids)) {
            out.add(Map.of("codigo", e.codigo, "nombre", e.nombre != null ? e.nombre : e.codigo));
        }
        return Response.ok(out).build();
    }

    /**
     * Estado del equipo: qué hace cada consultor (tareas activas), desde cuándo y cuántos días lleva,
     * y qué requiere seguimiento hoy. {@code consultores} = helpdesk_user_id separados por comas
     * (vacío = los miembros del equipo, alcance EQUIPO). Las tareas se toman de CUALQUIER tablero
     * (una transferida sigue en el board de su dueño), más las sin asignar del propio equipo.
     */
    @GET
    @Path("/estado-equipo")
    public Response estadoEquipo(@QueryParam("equipo") String equipoCodigo,
            @QueryParam("consultores") String consultores,
            @HeaderParam("X-Actor-Hid") String actorHid) {
        Equipo eq = equipoCodigo == null ? null : Equipo.find("codigo", equipoCodigo.trim()).firstResult();
        if (eq == null) {
            return Response.status(404).entity(Map.of("message", "Equipo no encontrado.")).build();
        }
        if (!Actor.gobierna(actorHid, eq.id)) {
            return denegar();
        }
        LocalDate hoy = LocalDate.now(ZONA);

        // ── Consultores del reporte (orden por nombre) ──
        Set<String> pedidos = consultores == null || consultores.isBlank() ? Set.of()
                : Arrays.stream(consultores.split(",")).map(s -> s.trim().toUpperCase()).filter(s -> !s.isEmpty())
                        .collect(Collectors.toCollection(LinkedHashSet::new));
        Map<Long, Usuario> gente = new LinkedHashMap<>();
        if (pedidos.isEmpty()) {
            LocalDate hoyServidor = com.fitdesk.core.Asignacion.hoy();
            for (Asignacion a : Asignacion.<Asignacion>list(
                    "alcanceTipo = 'EQUIPO' and alcanceEquipo = ?1 and activo = true", eq)) {
                if (a.usuario != null && a.enFechas(hoyServidor)) {
                    gente.putIfAbsent(a.usuario.id, a.usuario);
                }
            }
            // Consultores de alcance nacional UBICADOS en este equipo (equipo base, V32): entran con su carga
            // real, es decir, sus tareas de cualquier tablero (las de otro equipo salen como "tablero X").
            for (Usuario u : Usuario.<Usuario>list("equipoBase = ?1 and activo = true", eq)) {
                gente.putIfAbsent(u.id, u);
            }
        } else {
            for (Usuario u : Usuario.<Usuario>list("upper(helpdeskUserId) in ?1", pedidos)) {
                gente.put(u.id, u);
            }
        }
        List<Usuario> ordenados = new ArrayList<>(gente.values());
        ordenados.sort(Comparator.comparing(u -> u.nombre == null ? "" : u.nombre.toLowerCase()));

        // ── Tareas activas de esa gente (cualquier tablero) + sin asignar del equipo (si es el equipo completo) ──
        // El asignado que manda es el EFECTIVO: el del ticket (espejo) y, si no hay, el de la tarea — igual que
        // el Board. Una reasignación hecha directamente en el HelpDesk no toca `tarea.asignado_a`.
        Set<String> hids = new java.util.HashSet<>();
        for (Usuario u : gente.values()) {
            if (u.helpdeskUserId != null) {
                hids.add(u.helpdeskUserId.trim().toUpperCase());
            }
        }
        Set<Long> ids = gente.isEmpty() ? Set.of(-1L) : gente.keySet();
        Set<String> hidsQ = hids.isEmpty() ? Set.of("__NINGUNO__") : hids;
        List<Tarea> tareas = new ArrayList<>();
        for (Tarea t : Tarea.<Tarea>list(
                "select t from Tarea t left join t.ticketEspejo e left join t.asignadoA u left join t.board b "
                        + "where t.pendienteTransferencia = false and t.fueraAlcance = false and t.tipo <> 'REUNION' "
                        + "and (u.id in ?1 or upper(e.asignadoHd) in ?2 or b.equipo = ?3)",
                ids, hidsQ, eq)) {
            if (t.workflowEstado == null || !ACTIVOS.contains(t.workflowEstado.codigo)) {
                continue;
            }
            String ef = asignadoEfectivo(t);
            boolean deLaGente = ef != null && hids.contains(ef);
            boolean sinAsignarDelEquipo = ef == null && pedidos.isEmpty()
                    && t.board != null && t.board.equipo != null && t.board.equipo.id.equals(eq.id);
            if (deLaGente || sinAsignarDelEquipo) {
                tareas.add(t);
            }
        }

        // Recordatorios vencidos/de hoy de esa gente, por ticket (para "seguimiento hoy").
        Map<String, TicketPendiente> recordatorios = new HashMap<>();
        if (!gente.isEmpty()) {
            for (TicketPendiente p : TicketPendiente.<TicketPendiente>list(
                    "usuario.id in ?1 and paused = false and dueDate <= ?2", gente.keySet(), hoy)) {
                if (p.helpdeskTicketId != null) {
                    recordatorios.putIfAbsent(p.helpdeskTicketId, p);
                }
            }
        }

        Map<String, Integer> posicion = new HashMap<>();
        Map<String, Usuario> porHid = new HashMap<>();
        for (int i = 0; i < ordenados.size(); i++) {
            Usuario u = ordenados.get(i);
            if (u.helpdeskUserId != null) {
                posicion.put(u.helpdeskUserId.trim().toUpperCase(), i);
                porHid.put(u.helpdeskUserId.trim().toUpperCase(), u);
            }
        }
        List<Map<String, Object>> filas = new ArrayList<>();
        List<Map<String, Object>> seguimiento = new ArrayList<>();
        Set<String> conTarea = new java.util.HashSet<>();
        for (Tarea t : tareas) {
            String ef = asignadoEfectivo(t);
            Map<String, Object> f = fila(t, eq, hoy, ef, ef != null ? porHid.get(ef) : null);
            // Posición del consultor (por nombre); sin asignar → al final.
            f.put("_pos", ef != null ? posicion.getOrDefault(ef, Integer.MAX_VALUE) : Integer.MAX_VALUE);
            filas.add(f);
            if (ef != null) {
                conTarea.add(ef);
            }
            Map<String, Object> s = motivoSeguimiento(t, f, hoy, recordatorios);
            if (s != null) {
                seguimiento.add(s);
            }
        }
        // Orden: consultor (por nombre; sin asignar al final) → In Progress primero → días desc.
        // Orden: consultor (por nombre; sin asignar al final) → prioridad de la tarea (alta, media, baja) →
        // Orden del ticket → días (desc). El front reordena igual tras refrescar el Orden en vivo.
        filas.sort(Comparator
                .comparing((Map<String, Object> f) -> (Integer) f.get("_pos"))
                .thenComparing(f -> ordenPrioridad((String) f.get("prioridad")))
                .thenComparing(f -> ordenNum(f.get("ordenTicket")))
                .thenComparing(f -> -((Number) f.getOrDefault("dias", -1)).intValue()));
        seguimiento.sort(Comparator
                .comparing((Map<String, Object> s) -> (Integer) s.get("peso"))
                .thenComparing(s -> ordenNum(s.get("ordenTicket")))
                .thenComparing(s -> ordenPrioridad((String) s.get("prioridad")))
                .thenComparing(s -> -((Number) s.getOrDefault("dias", -1)).intValue()));

        filas.forEach(f -> f.remove("_pos"));

        List<Map<String, Object>> sinTarea = new ArrayList<>();
        for (Usuario u : ordenados) {
            if (u.helpdeskUserId == null || !conTarea.contains(u.helpdeskUserId.trim().toUpperCase())) {
                sinTarea.add(persona(u));
            }
        }
        List<Map<String, Object>> personas = ordenados.stream().map(ReporteResource::persona).toList();

        Map<String, Object> out = new LinkedHashMap<>();
        out.put("equipo", Map.of("codigo", eq.codigo, "nombre", eq.nombre != null ? eq.nombre : eq.codigo));
        out.put("generadoEn", OffsetDateTime.now(ZONA).toString());
        out.put("consultores", personas);
        out.put("filas", filas);
        out.put("sinTarea", sinTarea);
        out.put("seguimiento", seguimiento);
        // Resumen (tarjetas): en progreso · finalizadas este mes · vencidas · consultores con tareas. "Sin
        // movimiento" lo calcula el front con la última gestión del ticket en vivo.
        long enProgreso = filas.stream().filter(f -> "IN_PROGRESS".equals(f.get("estado"))).count();
        long vencidas = filas.stream().filter(f -> f.get("fechaLimite") != null
                && LocalDate.parse((String) f.get("fechaLimite")).isBefore(hoy)).count();
        long finalizadasMes = 0;
        if (!gente.isEmpty()) {
            // Asignado efectivo (como en las filas): el del ticket si lo tiene; si no, el de la tarea.
            finalizadasMes = Tarea.<Tarea>list("select t from Tarea t left join t.ticketEspejo e left join t.asignadoA u "
                    + "where t.tipo <> 'REUNION' and t.fueraAlcance = false and t.aprobado = true and t.fechaAprobacion >= ?1 and t.fechaAprobacion <= ?2 "
                    + "and (upper(e.asignadoHd) in ?4 or ((e is null or e.asignadoHd is null or e.asignadoHd = '') and u.id in ?3))",
                    hoy.withDayOfMonth(1), hoy, gente.keySet(), hidsQ).size();
        }
        Map<String, Object> resumen = new LinkedHashMap<>();
        resumen.put("enProgreso", enProgreso);
        resumen.put("finalizadasMes", finalizadasMes);
        resumen.put("vencidas", vencidas);
        resumen.put("consultoresActivos", conTarea.size());
        out.put("resumen", resumen);
        out.put("umbrales", Map.of("diasEsperandoCliente", DIAS_ESPERANDO_CLIENTE, "diasEnProceso", DIAS_EN_PROCESO));
        return Response.ok(out).build();
    }

    /** Asignado efectivo (MAYÚSCULAS): el del ticket (espejo) si lo hay; si no, el de la tarea; null = sin asignar. */
    static String asignadoEfectivo(Tarea t) {
        String hd = t.ticketEspejo != null ? t.ticketEspejo.asignadoHd : null;
        if (hd != null && !hd.isBlank()) {
            return hd.trim().toUpperCase();
        }
        String local = t.asignadoA != null ? t.asignadoA.helpdeskUserId : null;
        return local != null && !local.isBlank() ? local.trim().toUpperCase() : null;
    }

    private static Map<String, Object> fila(Tarea t, Equipo eq, LocalDate hoy, String asignadoHid, Usuario asignado) {
        Map<String, Object> f = new LinkedHashMap<>();
        f.put("consultorHid", asignadoHid);
        f.put("consultorNombre", asignado != null ? asignado.nombre : null);
        f.put("tarea", t.codigo);
        f.put("titulo", t.titulo);
        String ticket = t.ticketEspejo != null ? t.ticketEspejo.helpdeskTicketId : null;
        f.put("ticket", ticket);
        f.put("cliente", t.clienteNombre != null ? t.clienteNombre
                : t.cliente != null ? t.cliente.nombre : null);
        f.put("clientId", t.ticketEspejo != null && t.ticketEspejo.cliente != null
                ? t.ticketEspejo.cliente.helpdeskClientId : null);
        String estado = t.workflowEstado.codigo;
        f.put("estado", estado);
        f.put("prioridad", t.prioridad);
        f.put("ordenTicket", t.ticketEspejo != null ? t.ticketEspejo.prioridad : null);
        // Inicio: cuándo entró a In Progress (V28). Sin ese dato y EN In Progress → creación de la tarea (aprox.).
        OffsetDateTime inicio = t.enProcesoDesde;
        boolean aprox = false;
        if (inicio == null && "IN_PROGRESS".equals(estado)) {
            inicio = t.creadoEn;
            aprox = true;
        }
        f.put("inicio", inicio != null ? inicio.atZoneSameInstant(ZONA).toLocalDate().toString() : null);
        f.put("inicioAprox", aprox);
        if (inicio != null) {
            f.put("dias", ChronoUnit.DAYS.between(inicio.atZoneSameInstant(ZONA).toLocalDate(), hoy));
        }
        f.put("fechaLimite", t.fechaLimite != null ? t.fechaLimite.toString() : null);
        f.put("esperandoCliente", t.esperandoCliente);
        f.put("fechaEsperando", t.fechaEsperando != null ? t.fechaEsperando.toString() : null);
        f.put("diasEsperandoCliente", t.esperandoCliente && t.fechaEsperando != null
                ? ChronoUnit.DAYS.between(t.fechaEsperando, hoy) : null);
        f.put("progreso", t.progreso);
        f.put("nota", t.nota);
        f.put("notaPor", t.notaPor != null ? t.notaPor.nombre : null);
        f.put("notaFecha", t.notaActualizadaEn != null ? t.notaActualizadaEn.atZoneSameInstant(ZONA).toOffsetDateTime().toString() : null);
        f.put("bloqueo", t.bloqueo);
        f.put("columna", estado);
        boolean otroTablero = t.board != null && t.board.equipo != null && !t.board.equipo.id.equals(eq.id);
        f.put("tablero", otroTablero ? (t.board.equipo.nombre != null ? t.board.equipo.nombre : t.board.codigo) : null);
        return f;
    }

    /** Motivo de mayor peso por el que la tarea requiere seguimiento hoy, o null. */
    private static Map<String, Object> motivoSeguimiento(Tarea t, Map<String, Object> f, LocalDate hoy,
            Map<String, TicketPendiente> recordatorios) {
        String ticket = (String) f.get("ticket");
        int peso;
        String motivo;
        if (t.fechaLimite != null && t.fechaLimite.isBefore(hoy)) {
            peso = 1;
            motivo = "Vencida (" + ChronoUnit.DAYS.between(t.fechaLimite, hoy) + " d)";
        } else if (t.fechaLimite != null && t.fechaLimite.isEqual(hoy)) {
            peso = 2;
            motivo = "Vence hoy";
        } else if (ticket != null && recordatorios.containsKey(ticket)) {
            peso = 3;
            TicketPendiente p = recordatorios.get(ticket);
            motivo = p.dueDate.isBefore(hoy) ? "Recordatorio atrasado" : "Recordatorio para hoy";
            if (p.nota != null && !p.nota.isBlank()) {
                motivo += ": " + p.nota.trim();
            }
        } else if (t.esperandoCliente && t.fechaEsperando != null
                && ChronoUnit.DAYS.between(t.fechaEsperando, hoy) >= DIAS_ESPERANDO_CLIENTE) {
            peso = 4;
            motivo = "Esperando al cliente hace " + ChronoUnit.DAYS.between(t.fechaEsperando, hoy) + " d";
        } else if ("IN_PROGRESS".equals(f.get("estado")) && f.get("dias") != null
                && ((Number) f.get("dias")).longValue() >= DIAS_EN_PROCESO) {
            peso = 5;
            motivo = "En curso hace " + f.get("dias") + " d";
        } else {
            return null;
        }
        Map<String, Object> s = new LinkedHashMap<>(f);
        s.remove("_pos");
        s.put("peso", peso);
        s.put("motivo", motivo);
        return s;
    }

    /**
     * Cambia la PRIORIDAD DE LA TAREA (alta | media | baja) desde el reporte — no el Orden del ticket del
     * HelpDesk. Solo ADMIN o rol HELPDESK vigente (se exige aquí: el PATCH general de /stories no autoriza).
     * Body: {"prioridad": "alta|media|baja"}.
     */
    @PUT
    @Path("/tareas/{codigo}/prioridad")
    @Transactional
    public Response cambiarPrioridad(@PathParam("codigo") String codigo, com.fasterxml.jackson.databind.JsonNode body,
            @HeaderParam("X-Actor-Hid") String actorHid) {
        if (!Actor.esAdmin(actorHid) && !Actor.tieneRol(actorHid, "HELPDESK")) {
            String msg = "Solo el rol Helpdesk o un administrador pueden cambiar la prioridad de la tarea.";
            return Response.status(403).entity(Map.of("error", msg, "message", msg)).build();
        }
        String p = body == null ? "" : body.path("prioridad").asText("").trim().toLowerCase();
        if (!Set.of("alta", "media", "baja").contains(p)) {
            String msg = "Prioridad inválida (alta, media o baja).";
            return Response.status(400).entity(Map.of("error", msg, "message", msg)).build();
        }
        Tarea t = codigo == null ? null : Tarea.findByCodigo(codigo.trim());
        if (t == null) {
            String msg = "Tarea no encontrada.";
            return Response.status(404).entity(Map.of("error", msg, "message", msg)).build();
        }
        t.prioridad = p;
        t.actualizadoEn = OffsetDateTime.now();
        return Response.ok(Map.of("codigo", t.codigo, "prioridad", t.prioridad)).build();
    }

    /**
     * Edita desde el reporte el avance (progreso de la tarea), la fecha compromiso (fecha límite), la nota y
     * el bloqueo. Body: {progreso?, fechaLimite?, nota?, bloqueo?} — solo se tocan los campos presentes.
     * Permiso: ADMIN, o RESPONSABLE_EQUIPO que gobierne el equipo del tablero de la tarea o un equipo del que
     * sea miembro su asignado (quien ve a esa persona en su reporte).
     */
    @PUT
    @Path("/tareas/{codigo}")
    @Transactional
    public Response editarTarea(@PathParam("codigo") String codigo, com.fasterxml.jackson.databind.JsonNode body,
            @HeaderParam("X-Actor-Hid") String actorHid) {
        Tarea t = codigo == null ? null : Tarea.findByCodigo(codigo.trim());
        if (t == null) {
            return error(404, "Tarea no encontrada.");
        }
        if (!puedeEditarDesdeReporte(actorHid, t)) {
            return error(403, "Solo el responsable del equipo o un administrador pueden editar esta tarea desde el reporte.");
        }
        if (body == null || !body.isObject()) {
            return error(400, "Cuerpo inválido.");
        }
        if (body.has("progreso")) {
            com.fasterxml.jackson.databind.JsonNode p = body.get("progreso");
            if (!p.isInt() || p.asInt() < 0 || p.asInt() > 100) {
                return error(400, "El avance debe ser un número de 0 a 100.");
            }
            t.progreso = p.asInt();
        }
        if (body.has("fechaLimite")) {
            String fl = body.get("fechaLimite").isNull() ? "" : body.get("fechaLimite").asText("").trim();
            try {
                t.fechaLimite = fl.isEmpty() ? null : LocalDate.parse(fl);
            } catch (java.time.format.DateTimeParseException e) {
                return error(400, "Fecha compromiso inválida (AAAA-MM-DD).");
            }
        }
        if (body.has("bloqueo")) {
            String b = body.get("bloqueo").isNull() ? "" : body.get("bloqueo").asText("").trim().toUpperCase();
            if (!b.isEmpty() && !Tarea.BLOQUEOS.contains(b)) {
                return error(400, "Bloqueo inválido.");
            }
            t.bloqueo = b.isEmpty() ? null : b;
        }
        if (body.has("nota")) {
            String n = body.get("nota").isNull() ? "" : body.get("nota").asText("").trim();
            if (n.length() > Tarea.MAX_NOTA) {
                return error(400, "La nota admite hasta " + Tarea.MAX_NOTA + " caracteres.");
            }
            t.nota = n.isEmpty() ? null : n;
            t.notaActualizadaEn = OffsetDateTime.now();
            t.notaPor = Actor.usuario(actorHid);
        }
        t.actualizadoEn = OffsetDateTime.now();
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("codigo", t.codigo);
        out.put("progreso", t.progreso);
        out.put("fechaLimite", t.fechaLimite != null ? t.fechaLimite.toString() : null);
        out.put("bloqueo", t.bloqueo);
        out.put("nota", t.nota);
        out.put("notaPor", t.notaPor != null ? t.notaPor.nombre : null);
        out.put("notaFecha", t.notaActualizadaEn != null ? t.notaActualizadaEn.atZoneSameInstant(ZONA).toOffsetDateTime().toString() : null);
        return Response.ok(out).build();
    }

    /** ADMIN, o RE que gobierna el equipo del tablero de la tarea o un equipo del que es miembro su asignado. */
    static boolean puedeEditarDesdeReporte(String actorHid, Tarea t) {
        if (actorHid == null || actorHid.isBlank()) {
            return false;
        }
        if (Actor.esAdmin(actorHid)) {
            return true;
        }
        Set<Long> gobernados = Actor.equiposGestionables(actorHid);
        if (gobernados.isEmpty()) {
            return false;
        }
        if (t.board != null && t.board.equipo != null && gobernados.contains(t.board.equipo.id)) {
            return true;
        }
        String ef = asignadoEfectivo(t);
        return ef != null && Actor.equiposComoMiembro(ef).stream().anyMatch(gobernados::contains);
    }

    private static Response error(int status, String msg) {
        return Response.status(status).entity(Map.of("error", msg, "message", msg)).build();
    }

    private static Map<String, Object> persona(Usuario u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("hid", u.helpdeskUserId);
        m.put("nombre", u.nombre);
        return m;
    }

    /** Orden del ticket del HelpDesk (1 = más urgente); sin orden → al final. */
    static int ordenNum(Object v) {
        try {
            return v == null ? Integer.MAX_VALUE : Integer.parseInt(String.valueOf(v).trim());
        } catch (NumberFormatException e) {
            return Integer.MAX_VALUE;
        }
    }

    private static int ordenPrioridad(String p) {
        return switch (p == null ? "" : p.toLowerCase()) {
            case "alta" -> 0;
            case "media" -> 1;
            case "baja" -> 2;
            default -> 3;
        };
    }

    private static Response denegar() {
        String msg = "Los reportes son para responsables de equipo y administradores.";
        return Response.status(403).entity(Map.of("error", Map.of("message", msg), "message", msg)).build();
    }
}
