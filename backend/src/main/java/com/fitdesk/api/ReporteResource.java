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

import jakarta.ws.rs.GET;
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
            LocalDate hoyServidor = LocalDate.now();
            for (Asignacion a : Asignacion.<Asignacion>list(
                    "alcanceTipo = 'EQUIPO' and alcanceEquipo = ?1 and activo = true", eq)) {
                if (a.usuario != null && (a.vigenteHasta == null || !a.vigenteHasta.isBefore(hoyServidor))) {
                    gente.putIfAbsent(a.usuario.id, a.usuario);
                }
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
                        + "where t.pendienteTransferencia = false and t.tipo <> 'REUNION' "
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
        filas.sort(Comparator
                .comparing((Map<String, Object> f) -> (Integer) f.get("_pos"))
                .thenComparing(f -> ordenEstado((String) f.get("estado")))
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

    private static Map<String, Object> persona(Usuario u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("hid", u.helpdeskUserId);
        m.put("nombre", u.nombre);
        return m;
    }

    private static int ordenEstado(String codigo) {
        return switch (codigo == null ? "" : codigo) {
            case "IN_PROGRESS" -> 0;
            case "EN_CERTIFICACION" -> 1;
            case "TODO" -> 2;
            default -> 3;
        };
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
