package com.fitdesk.etl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Board;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Regional;
import com.fitdesk.core.Rol;
import com.fitdesk.core.Sprint;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Usuario;
import com.fitdesk.core.WorkflowEstado;
import com.fitdesk.overlay.Consulta;
import com.fitdesk.overlay.Progreso;
import com.fitdesk.overlay.RotacionSemanal;
import com.fitdesk.overlay.TicketAccion;
import com.fitdesk.overlay.TicketNota;
import com.fitdesk.overlay.TicketPendiente;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

/**
 * ETL Firebase → PostgreSQL (Fase 2). Lee el árbol del snapshot "tal cual"
 * y hace UPSERT por clave natural, de modo que se puede correr N veces sin
 * duplicar (idempotente y re-ejecutable para capturar deltas de Firebase).
 *
 * Toda la data del legacy es de Cuenca → se ancla a Regional=CUENCA y a un
 * único Equipo/Board de Cuenca. Reconcilia los dos espacios de id de persona
 * (local SC/JQ ↔ helpdesk MSC001/KVAZQUEZ) vía docs/knowledge/identidades.csv.
 * Nunca inventa: lo que no resuelve queda con FK nula y se reporta.
 */
@ApplicationScoped
public class FirebaseEtlService {

    private static final Logger LOG = Logger.getLogger(FirebaseEtlService.class);

    @ConfigProperty(name = "fitdesk.etl.identities-path", defaultValue = "../docs/knowledge/identidades.csv")
    String identitiesPath;

    // ── Reference data (espejo de la app legacy, alcance Cuenca) ─────────

    /** Rol local del legacy → codigo de Rol nacional (ver 01-modelo-conceptual.md). */
    private static final Map<String, String> ROL_LOCAL_A_NACIONAL = Map.of(
            "Helpdesk", "RESPONSABLE_EQUIPO",   // el despacho se absorbe en el Responsable de Equipo
            "Supervisor", "RESPONSABLE_EQUIPO",
            "Consultor", "CONSULTOR",
            "Scrum Master", "RESPONSABLE_EQUIPO");

    /** status legacy del board → codigo de workflow_estado (sembrado en V2). */
    private static final Map<String, String> STATUS_A_WORKFLOW = Map.of(
            "todo", "TODO",
            "in_progress", "IN_PROGRESS",
            "inprogress", "IN_PROGRESS",
            "review", "EN_CERTIFICACION",
            "done", "ENTREGADO");

    /** Nombre del cliente en el HelpDesk (UPPER) → slug local (CLIENT_MAP de la app). */
    private static final Map<String, String> NOMBRE_A_SLUG = new HashMap<>();

    /** slug → [nombre canónico, color]. Los 14 clientes de Cuenca. */
    private static final Map<String, String[]> CLIENTE_SEED = new LinkedHashMap<>();

    /** Fallback de identidades por si no está el CSV (mismos valores que identidades.csv). */
    private static final Map<String, String> IDENTIDAD_FALLBACK = new LinkedHashMap<>();

    static {
        NOMBRE_A_SLUG.put("COOPERATIVA DE AHORRO Y CREDITO ERCO", "erco");
        NOMBRE_A_SLUG.put("COAC CAPCPE GUALAQUIZA", "gualaquiza");
        NOMBRE_A_SLUG.put("COAC LA DOLOROSA DURAN", "dolorosa");
        NOMBRE_A_SLUG.put("PADRE JULIAN LORENTE", "julian");
        NOMBRE_A_SLUG.put("COAC CACEL", "cacel");
        NOMBRE_A_SLUG.put("COAC 4 RIOS", "4rios");
        NOMBRE_A_SLUG.put("LITARGMODE CIA LTDA", "litarg");
        NOMBRE_A_SLUG.put("COAC COPAC AUSTRO LTDA", "copac_austro");
        NOMBRE_A_SLUG.put("BANCO DEL AUSTRO", "austro");
        NOMBRE_A_SLUG.put("VAZCREDIT", "vazcredit");
        NOMBRE_A_SLUG.put("COAC SENOR DE GIRON", "giron");
        NOMBRE_A_SLUG.put("COAC SEÑOR DE GIRON", "giron");
        NOMBRE_A_SLUG.put("FININVEST OVERSEAS INC. LTD.", "fininvest");
        NOMBRE_A_SLUG.put("SEGURA COOP", "segura");
        NOMBRE_A_SLUG.put("PUNTOPRESTAMO", "puntoprestamo");

        CLIENTE_SEED.put("erco", new String[] { "COOPERATIVA DE AHORRO Y CREDITO ERCO", "#27AE60" });
        CLIENTE_SEED.put("gualaquiza", new String[] { "COAC CAPCPE GUALAQUIZA", "#2980B9" });
        CLIENTE_SEED.put("dolorosa", new String[] { "COAC LA DOLOROSA DURAN", "#04BAF0" });
        CLIENTE_SEED.put("julian", new String[] { "PADRE JULIAN LORENTE", "#1ABC9C" });
        CLIENTE_SEED.put("cacel", new String[] { "COAC CACEL", "#E74C3C" });
        CLIENTE_SEED.put("4rios", new String[] { "COAC 4 RIOS", "#0390BC" });
        CLIENTE_SEED.put("litarg", new String[] { "LITARGMODE CIA LTDA", "#F2811D" });
        CLIENTE_SEED.put("copac_austro", new String[] { "COAC COPAC AUSTRO LTDA", "#16A085" });
        CLIENTE_SEED.put("austro", new String[] { "BANCO DEL AUSTRO", "#9B59B6" });
        CLIENTE_SEED.put("vazcredit", new String[] { "VAZCREDIT", "#8E44AD" });
        CLIENTE_SEED.put("giron", new String[] { "COAC SEÑOR DE GIRON", "#F29E3B" });
        CLIENTE_SEED.put("fininvest", new String[] { "FININVEST OVERSEAS INC. LTD.", "#C0392B" });
        CLIENTE_SEED.put("segura", new String[] { "SEGURA COOP", "#D35400" });
        CLIENTE_SEED.put("puntoprestamo", new String[] { "PUNTOPRESTAMO", "#2C3E50" });

        IDENTIDAD_FALLBACK.put("SC", "MSC001");
        IDENTIDAD_FALLBACK.put("JH", "JPHP001");
        IDENTIDAD_FALLBACK.put("LO", "ORLR001");
        IDENTIDAD_FALLBACK.put("AB", "APBM001");
        IDENTIDAD_FALLBACK.put("DL", "KDLS001");
        IDENTIDAD_FALLBACK.put("GR", "JGRV001");
        IDENTIDAD_FALLBACK.put("DG", "DSGS001");
        IDENTIDAD_FALLBACK.put("KV", "KVAZQUEZ");
        IDENTIDAD_FALLBACK.put("KM", "KIMA001");
        IDENTIDAD_FALLBACK.put("AC", "KACG001");
        IDENTIDAD_FALLBACK.put("JQ", "JFQV001");
        IDENTIDAD_FALLBACK.put("VN", "VINC001");
    }

    // ── Estado de una corrida (mapas de resolución en memoria) ───────────
    private final Map<String, Usuario> usuarioPorLocal = new HashMap<>();
    private final Map<String, Usuario> usuarioPorHd = new HashMap<>();
    private final Map<String, Cliente> clientePorSlug = new HashMap<>();
    private final Map<String, Cliente> clientePorNumero = new HashMap<>();
    private final Map<String, Sprint> sprintPorCodigo = new HashMap<>();
    private final Map<String, Tarea> tareaPorCodigo = new HashMap<>();
    private final Map<String, TicketEspejo> espejoPorNumero = new HashMap<>();
    private final Map<String, WorkflowEstado> workflowPorCodigo = new HashMap<>();

    private void limpiarCaches() {
        usuarioPorLocal.clear();
        usuarioPorHd.clear();
        clientePorSlug.clear();
        clientePorNumero.clear();
        sprintPorCodigo.clear();
        tareaPorCodigo.clear();
        espejoPorNumero.clear();
        workflowPorCodigo.clear();
    }

    // ── Entry point ──────────────────────────────────────────────────────

    @Transactional
    public EtlReport importar(JsonNode root, String snapshotDescripcion) {
        limpiarCaches();
        EtlReport r = new EtlReport();
        r.snapshot = snapshotDescripcion;
        r.ejecutadoEn = OffsetDateTime.now().toString();

        for (WorkflowEstado w : WorkflowEstado.<WorkflowEstado>listAll()) {
            workflowPorCodigo.put(w.codigo, w);
        }

        Regional regional = ensureRegional("CUENCA", "Cuenca", r);
        Equipo equipo = ensureEquipo(regional, "CUENCA", "Equipo Cuenca", r);
        Board board = ensureBoard(equipo, "CUENCA", "Tablero Cuenca", r);

        Map<String, String> identidades = cargarIdentidades(r);
        importarUsuarios(root, equipo, identidades, r);
        importarClientes(root, equipo, r);
        importarSprints(root, board, r);
        importarStories(root, board, r);
        importarNotas(root, equipo, r);
        importarAcciones(root, r);
        importarPendientes(root, r);
        importarRotacion(root, equipo, r);
        importarProgreso(root, r);
        importarConsultas(root, r);

        LOG.infof("ETL terminado. Tablas afectadas: %s", r.tablas.keySet());
        return r;
    }

    // ── Organización base (Cuenca) ───────────────────────────────────────

    private Regional ensureRegional(String codigo, String nombre, EtlReport r) {
        // El legacy trae codigo "CUENCA", pero la estructura nacional puede tener otro
        // codigo (p.ej. "CUE") para el mismo regional. Si no matchea por codigo, se
        // reconcilia por NOMBRE para no duplicar la rama entera (regional→equipo→board).
        Regional reg = Regional.find("codigo", codigo).firstResult();
        if (reg == null) {
            reg = Regional.find("upper(nombre) = ?1", nombre.toUpperCase()).firstResult();
        }
        if (reg == null) {
            reg = new Regional();
            reg.codigo = codigo;
            reg.nombre = nombre;
            reg.persist();
            r.insertado("regional");
        } else {
            r.actualizado("regional");
        }
        return reg;
    }

    private Equipo ensureEquipo(Regional regional, String codigo, String nombre, EtlReport r) {
        Equipo eq = Equipo.find("regional = ?1 and codigo = ?2", regional, codigo).firstResult();
        if (eq == null) {
            eq = Equipo.find("regional = ?1 and upper(nombre) = ?2", regional, nombre.toUpperCase()).firstResult();
        }
        if (eq == null) {
            eq = new Equipo();
            eq.regional = regional;
            eq.codigo = codigo;
            eq.nombre = nombre;
            eq.persist();
            r.insertado("equipo");
        } else {
            r.actualizado("equipo");
        }
        return eq;
    }

    private Board ensureBoard(Equipo equipo, String codigo, String nombre, EtlReport r) {
        Board b = Board.find("equipo = ?1 and codigo = ?2", equipo, codigo).firstResult();
        if (b == null) {
            b = Board.find("equipo = ?1 and upper(nombre) = ?2", equipo, nombre.toUpperCase()).firstResult();
        }
        if (b == null) {
            b = new Board();
            b.equipo = equipo;
            b.codigo = codigo;
            b.nombre = nombre;
            b.persist();
            r.insertado("board");
        } else {
            r.actualizado("board");
        }
        return b;
    }

    // ── Usuarios + Asignaciones ──────────────────────────────────────────

    private void importarUsuarios(JsonNode root, Equipo equipo, Map<String, String> identidades, EtlReport r) {
        JsonNode users = root.path("users").path("users");
        if (!users.isArray()) {
            r.advertencia("No hay nodo users.users[] en el snapshot.");
            return;
        }
        for (JsonNode u : users) {
            String local = text(u, "id");
            if (local == null) {
                continue;
            }
            String hd = identidades.getOrDefault(local, IDENTIDAD_FALLBACK.get(local));
            String nombre = text(u, "name");
            String rolLocal = text(u, "role");

            Usuario usuario = Usuario.findByCodigoLocal(local);
            boolean nuevo = usuario == null;
            if (nuevo) {
                usuario = new Usuario();
                usuario.codigoLocal = local;
            }
            usuario.nombre = nombre != null ? nombre : local;
            usuario.helpdeskUserId = hd;
            usuario.color = text(u, "color");
            usuario.alias = rolLocal;
            usuario.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                usuario.persist();
                r.insertado("usuario");
            } else {
                r.actualizado("usuario");
            }

            usuarioPorLocal.put(local, usuario);
            if (hd != null) {
                usuarioPorHd.put(hd, usuario);
            }

            String rolCodigo = ROL_LOCAL_A_NACIONAL.getOrDefault(rolLocal, "CONSULTOR");
            ensureAsignacionEquipo(usuario, rolCodigo, equipo, r);
        }
    }

    /** Cada usuario migrado recibe una Asignacion (default deny → sin ella no ve nada). */
    private void ensureAsignacionEquipo(Usuario usuario, String rolCodigo, Equipo equipo, EtlReport r) {
        Rol rol = Rol.find("codigo", rolCodigo).firstResult();
        if (rol == null) {
            r.advertencia("Rol nacional inexistente: " + rolCodigo + " (usuario " + usuario.codigoLocal + ")");
            return;
        }
        Asignacion a = Asignacion.find(
                "usuario = ?1 and rol = ?2 and alcanceTipo = 'EQUIPO' and alcanceEquipo = ?3",
                usuario, rol, equipo).firstResult();
        if (a == null) {
            a = new Asignacion();
            a.usuario = usuario;
            a.rol = rol;
            a.alcanceTipo = "EQUIPO";
            a.alcanceEquipo = equipo;
            a.persist();
            r.insertado("asignacion");
        } else {
            r.actualizado("asignacion");
        }
    }

    // ── Clientes ─────────────────────────────────────────────────────────

    private void importarClientes(JsonNode root, Equipo equipo, EtlReport r) {
        // 1) Sembrar/actualizar los 14 clientes de Cuenca. Idempotente: primero por
        //    codigo=slug corto; si no aparece, se reconcilia por NOMBRE, porque en la
        //    base los clientes pueden tener el codigo = slug del nombre completo (p.ej.
        //    creados desde el admin) y su helpdesk_client_id ya asignado. Reconciliar por
        //    nombre evita duplicados y el choque de la unique cliente_helpdesk_client_id_key.
        for (Map.Entry<String, String[]> e : CLIENTE_SEED.entrySet()) {
            String slug = e.getKey();
            String nombre = e.getValue()[0];
            Cliente c = Cliente.findByCodigo(slug);
            if (c == null) {
                c = Cliente.find("upper(nombre) = ?1", nombre.toUpperCase()).firstResult();
            }
            boolean nuevo = c == null;
            if (nuevo) {
                c = new Cliente();
                c.codigo = slug;
            }
            c.nombre = nombre;
            c.color = e.getValue()[1];
            c.equipoResponsable = equipo;
            c.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                c.persist();
                r.insertado("cliente");
            } else {
                r.actualizado("cliente");
            }
            clientePorSlug.put(slug, c);
            clientePorSlug.put(c.codigo, c); // también por el codigo real (slug del nombre completo)
        }

        // 2) Derivar helpdesk_client_id (numérico) desde los pares client/clientName
        //    que traen las propias stories, y armar el índice numero→cliente.
        //    Un número solo puede pertenecer a UN cliente (columna unique): si el
        //    snapshot trae el mismo número para dos nombres distintos, se respeta la
        //    asignación ya existente / la primera, y se ignora la colisión — así no se
        //    viola cliente_helpdesk_client_id_key ni se aborta todo el import.
        JsonNode stories = root.path("stories").path("stories");
        if (stories.isObject()) {
            java.util.Set<String> numsUsados = new java.util.HashSet<>();
            for (Cliente cx : clientePorSlug.values()) {
                if (cx.helpdeskClientId != null) {
                    numsUsados.add(cx.helpdeskClientId);
                }
            }
            for (JsonNode s : stories) {
                String num = textAsString(s.get("client"));
                String clientName = text(s, "clientName");
                if (num == null || clientName == null || !num.matches("\\d+")) {
                    continue;
                }
                String slug = NOMBRE_A_SLUG.get(clientName.trim().toUpperCase());
                if (slug == null) {
                    continue;
                }
                Cliente c = clientePorSlug.get(slug);
                if (c == null) {
                    continue;
                }
                clientePorNumero.put(num, c);
                if (c.helpdeskClientId == null && !numsUsados.contains(num)) {
                    c.helpdeskClientId = num;
                    c.actualizadoEn = OffsetDateTime.now();
                    numsUsados.add(num);
                }
            }
        }
    }

    /** Resuelve el token client de una story (slug local, número HD, o nulo). */
    private Cliente resolverCliente(String token, String clientName, EtlReport r) {
        if (token != null && !token.isBlank()) {
            Cliente c = clientePorSlug.get(token);
            if (c != null) {
                return c;
            }
            if (token.matches("\\d+")) {
                c = clientePorNumero.get(token);
                if (c != null) {
                    return c;
                }
            }
        }
        if (clientName != null) {
            String slug = NOMBRE_A_SLUG.get(clientName.trim().toUpperCase());
            if (slug != null && clientePorSlug.containsKey(slug)) {
                return clientePorSlug.get(slug);
            }
        }
        if (token != null && !token.isBlank()) {
            String detalle = token + (clientName != null ? " (" + clientName + ")" : "");
            r.clientesNoResueltos.add(detalle);
        }
        return null;
    }

    // ── Sprints ──────────────────────────────────────────────────────────

    private void importarSprints(JsonNode root, Board board, EtlReport r) {
        JsonNode sprints = root.path("sprints").path("sprints");
        if (!sprints.isArray()) {
            return;
        }
        for (JsonNode s : sprints) {
            String codigo = text(s, "id");
            if (codigo == null) {
                continue;
            }
            Sprint sp = Sprint.find("board = ?1 and codigo = ?2", board, codigo).firstResult();
            boolean nuevo = sp == null;
            if (nuevo) {
                sp = new Sprint();
                sp.board = board;
                sp.codigo = codigo;
            }
            sp.nombre = coalesce(text(s, "name"), codigo);
            sp.estado = coalesce(text(s, "status"), "planned");
            sp.capacidad = s.path("capacity").asInt(0);
            sp.objetivo = text(s, "goal");
            sp.fechaInicio = fecha(text(s, "start"));
            sp.fechaFin = fecha(text(s, "end"));
            sp.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                sp.persist();
                r.insertado("sprint");
            } else {
                r.actualizado("sprint");
            }
            sprintPorCodigo.put(codigo, sp);
        }
    }

    // ── Stories → Tarea (+ TicketEspejo) ─────────────────────────────────

    private void importarStories(JsonNode root, Board board, EtlReport r) {
        JsonNode stories = root.path("stories").path("stories");
        if (!stories.isObject()) {
            r.advertencia("No hay nodo stories.stories{} en el snapshot.");
            return;
        }
        WorkflowEstado defecto = workflowPorCodigo.get("TODO");
        Iterator<Map.Entry<String, JsonNode>> it = stories.fields();
        while (it.hasNext()) {
            JsonNode s = it.next().getValue();
            String codigo = text(s, "id");
            if (codigo == null) {
                continue;
            }
            String assignee = text(s, "assignee");
            String clientTok = textAsString(s.get("client"));
            Usuario usuario = resolverUsuario(assignee);
            if (usuario == null && assignee != null && !assignee.isBlank()) {
                r.usuariosNoResueltos.add(assignee);
            }
            Cliente cliente = resolverCliente(clientTok, text(s, "clientName"), r);

            // TicketEspejo (solo si la story enlaza un ticket del HelpDesk).
            TicketEspejo espejo = null;
            String ticket = text(s, "ticket");
            if (ticket != null && !ticket.isBlank()) {
                espejo = ensureEspejo(ticket, cliente, s, usuario, r);
            }

            String statusLegacy = text(s, "status");
            WorkflowEstado we = workflowPorCodigo.getOrDefault(
                    STATUS_A_WORKFLOW.getOrDefault(statusLegacy, "TODO"), defecto);

            Tarea t = Tarea.findByCodigo(codigo);
            boolean nuevo = t == null;
            if (nuevo) {
                t = new Tarea();
                t.codigo = codigo;
            }
            t.board = board;
            t.sprint = sprintPorCodigo.get(text(s, "sprint"));
            t.workflowEstado = we;
            t.asignadoA = usuario;
            t.cliente = cliente;
            t.ticketEspejo = espejo;
            t.titulo = trunc(text(s, "title"), 500);
            t.descripcion = text(s, "description");
            t.prioridad = coalesce(text(s, "priority"), "media");
            t.puntos = s.path("points").asInt(1);
            t.progreso = clamp(s.path("progress").asInt(0), 0, 100);
            t.aprobado = s.path("approved").asBoolean(false);
            t.fechaAprobacion = fecha(text(s, "approvedDate"));
            t.esperandoCliente = s.path("waitingClient").asBoolean(false);
            t.fechaEsperando = fecha(text(s, "waitingDate"));
            t.fechaLimite = fecha(text(s, "dueDate"));
            t.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                t.persist();
                r.insertado("tarea");
            } else {
                r.actualizado("tarea");
            }
            tareaPorCodigo.put(codigo, t);
        }
    }

    private TicketEspejo ensureEspejo(String ticket, Cliente cliente, JsonNode s, Usuario usuario, EtlReport r) {
        TicketEspejo espejo = TicketEspejo.findByHelpdeskTicketId(ticket);
        boolean nuevo = espejo == null;
        if (nuevo) {
            espejo = new TicketEspejo();
            espejo.helpdeskTicketId = ticket;
        }
        espejo.cliente = cliente;
        espejo.asunto = trunc(text(s, "title"), 500);
        espejo.estadoOrigen = text(s, "hdEstatus");
        espejo.prioridad = text(s, "priority");
        espejo.asignadoHd = usuario != null && usuario.helpdeskUserId != null
                ? usuario.helpdeskUserId
                : text(s, "assignee");
        espejo.lastSyncedAt = OffsetDateTime.now();
        if (nuevo) {
            espejo.persist();
            r.insertado("ticket_espejo");
        } else {
            r.actualizado("ticket_espejo");
        }
        espejoPorNumero.put(ticket, espejo);
        return espejo;
    }

    private Usuario resolverUsuario(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        Usuario u = usuarioPorLocal.get(token);
        return u != null ? u : usuarioPorHd.get(token);
    }

    // ── Overlays del HelpDesk ────────────────────────────────────────────

    private void importarNotas(JsonNode root, Equipo equipo, EtlReport r) {
        JsonNode notas = root.path("hdNotes");
        if (!notas.isObject()) {
            return;
        }
        Iterator<Map.Entry<String, JsonNode>> it = notas.fields();
        while (it.hasNext()) {
            Map.Entry<String, JsonNode> e = it.next();
            String num = e.getKey();
            String texto = e.getValue().asText(null);
            if (texto == null || texto.isBlank()) {
                continue;
            }
            // Las notas legacy son del equipo dueño (Cuenca). Se guardan/actualizan por
            // (ticket, equipo) para que el read por equipo las muestre y no queden huérfanas.
            TicketNota n = TicketNota.findByTicketAndEquipo(num, equipo);
            boolean nuevo = n == null;
            if (nuevo) {
                n = new TicketNota();
                n.helpdeskTicketId = num;
            }
            n.equipo = equipo;
            n.texto = texto;
            n.ticketEspejo = espejoPorNumero.get(num);
            n.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                n.persist();
                r.insertado("ticket_nota");
            } else {
                r.actualizado("ticket_nota");
            }
        }
    }

    private void importarAcciones(JsonNode root, EtlReport r) {
        JsonNode acciones = root.path("hdActions");
        if (!acciones.isObject()) {
            return;
        }
        Iterator<Map.Entry<String, JsonNode>> it = acciones.fields();
        while (it.hasNext()) {
            Map.Entry<String, JsonNode> e = it.next();
            String num = e.getKey();
            TicketAccion a = TicketAccion.findByHelpdeskTicketId(num);
            boolean nuevo = a == null;
            if (nuevo) {
                a = new TicketAccion();
                a.helpdeskTicketId = num;
            }
            a.marcado = e.getValue().asBoolean(true);
            a.ticketEspejo = espejoPorNumero.get(num);
            a.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                a.persist();
                r.insertado("ticket_accion");
            } else {
                r.actualizado("ticket_accion");
            }
        }
    }

    private void importarPendientes(JsonNode root, EtlReport r) {
        JsonNode pendientes = root.path("hdPendientes");
        if (!pendientes.isObject()) {
            return;
        }
        Iterator<Map.Entry<String, JsonNode>> it = pendientes.fields();
        while (it.hasNext()) {
            Map.Entry<String, JsonNode> e = it.next();
            String num = e.getKey();
            JsonNode p = e.getValue();
            TicketPendiente tp = TicketPendiente.findByHelpdeskTicketId(num);
            boolean nuevo = tp == null;
            if (nuevo) {
                tp = new TicketPendiente();
                tp.helpdeskTicketId = num;
            }
            tp.asunto = trunc(text(p, "asunto"), 500);
            tp.clienteRaw = trunc(text(p, "clienteRaw"), 300);
            tp.dueDate = fecha(text(p, "dueDate"));
            tp.dueTime = text(p, "dueTime");
            tp.addedAt = instante(text(p, "addedAt"));
            tp.lastAlerted = fecha(text(p, "lastAlerted"));
            tp.ticketEspejo = espejoPorNumero.get(num);
            tp.cliente = resolverClientePorNombre(text(p, "clienteRaw"));
            tp.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                tp.persist();
                r.insertado("ticket_pendiente");
            } else {
                r.actualizado("ticket_pendiente");
            }
        }
    }

    private Cliente resolverClientePorNombre(String nombre) {
        if (nombre == null) {
            return null;
        }
        String slug = NOMBRE_A_SLUG.get(nombre.trim().toUpperCase());
        return slug != null ? clientePorSlug.get(slug) : null;
    }

    private void importarRotacion(JsonNode root, Equipo equipo, EtlReport r) {
        JsonNode weeks = root.path("weeklySupport").path("weeks");
        if (!weeks.isObject()) {
            return;
        }
        Iterator<Map.Entry<String, JsonNode>> it = weeks.fields();
        while (it.hasNext()) {
            Map.Entry<String, JsonNode> e = it.next();
            LocalDate semana = fecha(e.getKey());
            if (semana == null) {
                continue;
            }
            JsonNode w = e.getValue();
            RotacionSemanal rs = RotacionSemanal.findBySemanaAndEquipo(semana, equipo);
            boolean nuevo = rs == null;
            if (nuevo) {
                rs = new RotacionSemanal();
                rs.semanaInicio = semana;
                rs.equipo = equipo;
            }
            String assignee = text(w, "assignee");
            Usuario asig = assignee != null ? usuarioPorLocal.get(assignee) : null;
            rs.usuario = asig;
            // Guardar el helpdesk_user_id (código del API), no el local legacy (JQ), para
            // que el front lo coloree/nombre por el catálogo. Fallback al crudo si no resuelve.
            rs.assigneeLocal = (asig != null && asig.helpdeskUserId != null) ? asig.helpdeskUserId : assignee;
            rs.equipo = equipo;
            rs.notas = text(w, "notes");
            rs.actualizadoEn = OffsetDateTime.now();
            if (nuevo) {
                rs.persist();
                r.insertado("rotacion_semanal");
            } else {
                r.actualizado("rotacion_semanal");
            }
        }
    }

    private void importarProgreso(JsonNode root, EtlReport r) {
        JsonNode entries = root.path("progress").path("entries");
        if (!entries.isArray()) {
            return;
        }
        for (JsonNode e : entries) {
            String codigo = text(e, "id");
            if (codigo == null) {
                continue;
            }
            Progreso p = Progreso.findByCodigo(codigo);
            boolean nuevo = p == null;
            if (nuevo) {
                p = new Progreso();
                p.codigo = codigo;
            }
            p.tareaCodigo = text(e, "storyId");
            p.tarea = tareaPorCodigo.get(p.tareaCodigo);
            p.autorLocal = text(e, "author");
            p.autor = p.autorLocal != null ? usuarioPorLocal.get(p.autorLocal) : null;
            p.fecha = fecha(text(e, "date"));
            p.horas = e.path("hoursLogged").asInt(0);
            p.notas = text(e, "notes");
            if (nuevo) {
                p.persist();
                r.insertado("progreso");
            } else {
                r.actualizado("progreso");
            }
        }
    }

    private void importarConsultas(JsonNode root, EtlReport r) {
        JsonNode queries = root.path("queries").path("queries");
        if (!queries.isArray()) {
            return;
        }
        for (JsonNode q : queries) {
            String codigo = text(q, "id");
            if (codigo == null) {
                continue;
            }
            Consulta c = Consulta.findByCodigo(codigo);
            boolean nuevo = c == null;
            if (nuevo) {
                c = new Consulta();
                c.codigo = codigo;
            }
            c.tareaCodigo = text(q, "storyId");
            c.tarea = tareaPorCodigo.get(c.tareaCodigo);
            c.autorLocal = text(q, "author");
            c.autor = c.autorLocal != null ? usuarioPorLocal.get(c.autorLocal) : null;
            c.fecha = fecha(text(q, "date"));
            c.titulo = trunc(text(q, "title"), 300);
            c.descripcion = text(q, "description");
            c.prioridad = text(q, "priority");
            c.estado = text(q, "status");
            if (nuevo) {
                c.persist();
                r.insertado("consulta");
            } else {
                r.actualizado("consulta");
            }
        }
    }

    // ── Identidades (CSV) ────────────────────────────────────────────────

    private Map<String, String> cargarIdentidades(EtlReport r) {
        Map<String, String> map = new HashMap<>();
        Path path = Path.of(identitiesPath);
        if (!Files.exists(path)) {
            r.advertencia("No se encontró " + identitiesPath + "; se usa el mapa de identidades embebido.");
            return map;
        }
        try {
            boolean header = true;
            for (String line : Files.readAllLines(path)) {
                if (header) {
                    header = false;
                    continue;
                }
                if (line.isBlank()) {
                    continue;
                }
                String[] cols = line.split(",", -1);
                if (cols.length >= 4 && !cols[0].isBlank() && !cols[3].isBlank()) {
                    map.put(cols[0].trim(), cols[3].trim());
                }
            }
            LOG.infof("Identidades cargadas del CSV: %d", map.size());
        } catch (Exception ex) {
            r.advertencia("Error leyendo " + identitiesPath + ": " + ex.getMessage() + "; se usa el mapa embebido.");
        }
        return map;
    }

    // ── Helpers de parsing tolerantes ────────────────────────────────────

    private static String text(JsonNode n, String field) {
        if (n == null) {
            return null;
        }
        JsonNode v = n.get(field);
        if (v == null || v.isNull()) {
            return null;
        }
        String s = v.asText();
        return s == null || s.isBlank() ? null : s.trim();
    }

    /** El campo puede venir como número (client:42) o string (client:"erco"). */
    private static String textAsString(JsonNode v) {
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
        if (s == null) {
            return null;
        }
        return s.length() <= max ? s : s.substring(0, max);
    }

    private static int clamp(int v, int lo, int hi) {
        return Math.max(lo, Math.min(hi, v));
    }

    private static LocalDate fecha(String s) {
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
