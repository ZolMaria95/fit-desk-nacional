package com.fitdesk.api;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fitdesk.core.Asignacion;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Equipo;
import com.fitdesk.core.Usuario;

/**
 * Autorización derivada de las Asignaciones vigentes del actor (header X-Actor-Hid).
 * Default deny. Reúne los chequeos que necesitan Transferencia y Solicitud:
 * "¿es ADMIN?", "¿tiene tal rol?", "¿gobierna este equipo (como RESPONSABLE_EQUIPO)?".
 *
 * El header `X-Actor-Hid` NO es un límite criptográfico: es coherente con la postura
 * actual (todo el gating es del cliente) y sube a real cuando llegue la identidad por
 * token (JWT del HelpDesk validado en Quarkus).
 */
public final class Actor {

    private Actor() {
    }

    /** MSC001 es admin de arranque (bootstrap), igual que en el resto del gating. */
    public static boolean esAdmin(String hid) {
        if (hid != null && "MSC001".equalsIgnoreCase(hid.trim())) {
            return true;
        }
        return MisRolesResource.rolesVigentes(hid).contains("ADMIN");
    }

    public static boolean tieneRol(String hid, String rolCodigo) {
        return rolCodigo != null && MisRolesResource.rolesVigentes(hid).contains(rolCodigo);
    }

    /**
     * Clientes del HelpDesk (por {@code helpdesk_client_id}) sobre cuyos tickets el actor puede
     * EDITAR / ELIMINAR / REASIGNAR: rol de plataforma HELPDESK dentro del alcance de su Asignación
     * (GLOBAL = todos; CLIENTE = ese cliente; EQUIPO = clientes cuyo equipo responsable es ese;
     * REGIONAL = clientes de equipos de esa regional). ADMIN (incl. MSC001 bootstrap) = todos.
     * Un cliente NO registrado en FitDesk solo lo cubre {@code global} (HELPDESK GLOBAL o ADMIN).
     * Cambiar el ESTADO de un ticket NO pasa por aquí (sigue abierto a todos).
     */
    public record TicketsGestionables(boolean global, Set<String> clientes) {
    }

    public static TicketsGestionables ticketsGestionables(String hid) {
        if (esAdmin(hid)) {
            return new TicketsGestionables(true, Set.of());
        }
        Usuario u = usuario(hid);
        if (u == null) {
            return new TicketsGestionables(false, Set.of());
        }
        Set<String> clientes = new HashSet<>();
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if (a.rol == null || !"HELPDESK".equals(a.rol.codigo)) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> {
                    return new TicketsGestionables(true, Set.of());
                }
                case "CLIENTE" -> {
                    if (a.alcanceCliente != null) {
                        agregarHdId(clientes, a.alcanceCliente);
                    }
                }
                case "EQUIPO" -> {
                    if (a.alcanceEquipo != null) {
                        for (Cliente c : Cliente.<Cliente>list("equipoResponsable = ?1", a.alcanceEquipo)) {
                            agregarHdId(clientes, c);
                        }
                    }
                }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null) {
                        for (Cliente c : Cliente.<Cliente>list("equipoResponsable.regional = ?1", a.alcanceRegional)) {
                            agregarHdId(clientes, c);
                        }
                    }
                }
                default -> {
                    /* sin alcance reconocido: no otorga nada (default deny) */
                }
            }
        }
        return new TicketsGestionables(false, clientes);
    }

    /** ¿Puede el actor editar/eliminar/reasignar un ticket de este cliente (client_id del HelpDesk)? */
    public static boolean puedeGestionarTicket(String hid, String hdClientId) {
        TicketsGestionables g = ticketsGestionables(hid);
        if (g.global()) {
            return true;
        }
        return hdClientId != null && g.clientes().contains(hdClientId.trim());
    }

    /** Agrega el client_id del HelpDesk y, además, el código (slug) de FitDesk del cliente: las
     *  TAREAS del board guardan el código, los TICKETS el id del HelpDesk — así sirve para ambos. */
    /**
     * A quién puede asignar/reasignar tickets el actor como RESPONSABLE_EQUIPO (sin ser HELPDESK/ADMIN):
     * él mismo + miembros vigentes (alcance EQUIPO) de los equipos que dirige. hids en MAYÚSCULAS; vacío si
     * no dirige ningún equipo. Vale para tickets con o sin asignado.
     */
    public static Set<String> asignablesComoResponsable(String hid) {
        Set<String> destinos = new HashSet<>();
        Set<Long> equipos = equiposComoResponsable(hid);
        if (equipos.isEmpty()) {
            return destinos;
        }
        destinos.add(hid.trim().toUpperCase());
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list(
                "alcanceTipo = 'EQUIPO' and alcanceEquipo.id in ?1 and activo = true", equipos)) {
            if (a.usuario != null && a.usuario.helpdeskUserId != null
                    && (a.vigenteHasta == null || !a.vigenteHasta.isBefore(hoy))) {
                destinos.add(a.usuario.helpdeskUserId.trim().toUpperCase());
            }
        }
        return destinos;
    }

    /** ¿Puede el actor, como responsable, asignar o reasignar un ticket a {@code destinoHid}? */
    public static boolean puedeAsignarComoResponsable(String hid, String destinoHid) {
        if (hid == null || hid.isBlank() || destinoHid == null || destinoHid.isBlank()) {
            return false;
        }
        return asignablesComoResponsable(hid).contains(destinoHid.trim().toUpperCase());
    }

    private static void agregarHdId(Set<String> ids, Cliente c) {
        if (c.helpdeskClientId != null && !c.helpdeskClientId.isBlank()) {
            ids.add(c.helpdeskClientId.trim());
        }
        if (c.codigo != null && !c.codigo.isBlank()) {
            ids.add(c.codigo.trim());
        }
    }

    public static Usuario usuario(String hid) {
        return (hid == null || hid.isBlank()) ? null : Usuario.findByHelpdeskUserId(hid.trim());
    }

    /**
     * ¿El actor "ve todo" (alcance GLOBAL)? true si es ADMIN (incluye MSC001 bootstrap) o si tiene alguna
     * Asignación VIGENTE de alcance GLOBAL, INDEPENDIENTE del rol — así un CONSULTOR con alcance global
     * también aplica. Misma noción de "ve todo" que usa {@code LegacyReadResource.boardsVisibles}.
     */
    public static boolean esAlcanceGlobal(String hid) {
        if (esAdmin(hid)) {
            return true;
        }
        Usuario u = usuario(hid);
        if (u == null) {
            return false;
        }
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if ("GLOBAL".equals(a.alcanceTipo)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Equipos que caen en el ALCANCE del actor, **independiente del rol** (a diferencia de
     * {@code equiposGestionables}/{@code equiposComoResponsable}, que solo cuentan RESPONSABLE_EQUIPO):
     * GLOBAL/ADMIN = todos, EQUIPO = ese equipo, REGIONAL = todos los de esa regional. Sirve para
     * scopear por alcance lo que el actor puede VER (p. ej. sus clientes), no solo lo que gobierna.
     */
    public static Set<Long> equiposEnAlcance(String hid) {
        Set<Long> ids = new HashSet<>();
        if (esAdmin(hid)) {
            for (Equipo e : Equipo.<Equipo>listAll()) {
                ids.add(e.id);
            }
            return ids;
        }
        Usuario u = usuario(hid);
        if (u == null) {
            return ids;
        }
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> {
                    for (Equipo e : Equipo.<Equipo>listAll()) {
                        ids.add(e.id);
                    }
                }
                case "EQUIPO" -> {
                    if (a.alcanceEquipo != null) {
                        ids.add(a.alcanceEquipo.id);
                    }
                }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null) {
                        for (Equipo e : Equipo.<Equipo>list("regional = ?1", a.alcanceRegional)) {
                            ids.add(e.id);
                        }
                    }
                }
                default -> {
                    /* CLIENTE u otros no otorgan equipo */
                }
            }
        }
        return ids;
    }

    /**
     * Equipos que el actor GOBIERNA como Responsable de Equipo (asignar/transferir):
     * todos si es ADMIN; si es RESPONSABLE_EQUIPO, los de sus asignaciones de ese rol
     * (alcance GLOBAL = todos, EQUIPO = ese, REGIONAL = todos los de la regional).
     * Los demás roles no gobiernan equipos (default deny).
     */
    public static Set<Long> equiposGestionables(String hid) {
        Set<Long> ids = new HashSet<>();
        if (esAdmin(hid)) {
            for (Equipo e : Equipo.<Equipo>listAll()) {
                ids.add(e.id);
            }
            return ids;
        }
        Usuario u = usuario(hid);
        if (u == null) {
            return ids;
        }
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if (a.rol == null || !"RESPONSABLE_EQUIPO".equals(a.rol.codigo)) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> {
                    for (Equipo e : Equipo.<Equipo>listAll()) {
                        ids.add(e.id);
                    }
                }
                case "EQUIPO" -> {
                    if (a.alcanceEquipo != null) {
                        ids.add(a.alcanceEquipo.id);
                    }
                }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null) {
                        for (Equipo e : Equipo.<Equipo>list("regional = ?1", a.alcanceRegional)) {
                            ids.add(e.id);
                        }
                    }
                }
                default -> {
                    /* CLIENTE u otros no gobiernan equipos */
                }
            }
        }
        return ids;
    }

    /** ¿El actor gobierna (como RE, o es ADMIN) el equipo dado? */
    public static boolean gobierna(String hid, Long equipoId) {
        return equipoId != null && equiposGestionables(hid).contains(equipoId);
    }

    /** Equipos donde el actor es RESPONSABLE_EQUIPO (SIN el atajo admin=todos). */
    public static Set<Long> equiposComoResponsable(String hid) {
        Set<Long> ids = new HashSet<>();
        Usuario u = usuario(hid);
        if (u == null) {
            return ids;
        }
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if (a.rol == null || !"RESPONSABLE_EQUIPO".equals(a.rol.codigo)) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> { for (Equipo e : Equipo.<Equipo>listAll()) ids.add(e.id); }
                case "EQUIPO" -> { if (a.alcanceEquipo != null) ids.add(a.alcanceEquipo.id); }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null) {
                        for (Equipo e : Equipo.<Equipo>list("regional = ?1", a.alcanceRegional)) ids.add(e.id);
                    }
                }
                default -> { }
            }
        }
        return ids;
    }

    /** Equipos donde el actor es MIEMBRO (cualquier asignación de alcance EQUIPO). */
    public static Set<Long> equiposComoMiembro(String hid) {
        Set<Long> ids = new HashSet<>();
        Usuario u = usuario(hid);
        if (u == null) {
            return ids;
        }
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1 and alcanceTipo = 'EQUIPO'", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if (a.alcanceEquipo != null) ids.add(a.alcanceEquipo.id);
        }
        return ids;
    }

    /** Ids de usuarios con una asignación vigente del rol dado (p. ej. todos los RESPONSABLE_EQUIPO). */
    public static Set<Long> usuariosConRol(String rolCodigo) {
        Set<Long> ids = new HashSet<>();
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("rol.codigo = ?1", rolCodigo)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if (a.usuario != null) ids.add(a.usuario.id);
        }
        return ids;
    }

    /** Ids de usuarios que son miembros (asignación EQUIPO) de los equipos dados. */
    public static Set<Long> usuariosDeEquipos(Set<Long> equipoIds) {
        Set<Long> ids = new HashSet<>();
        if (equipoIds == null || equipoIds.isEmpty()) {
            return ids;
        }
        for (Asignacion a : Asignacion.<Asignacion>list("alcanceTipo = 'EQUIPO' and alcanceEquipo.id in ?1", equipoIds)) {
            if (a.usuario != null) ids.add(a.usuario.id);
        }
        return ids;
    }

    /**
     * ¿El actor gobierna esta REGIÓN? ADMIN (o RE con alcance GLOBAL) = cualquiera; un
     * RESPONSABLE_EQUIPO gobierna la región donde tiene un equipo a cargo (alcance EQUIPO) o
     * a la que apunta su alcance REGIONAL. Los demás roles no gobiernan regiones (default deny).
     */
    public static boolean gobiernaRegion(String hid, Long regionId) {
        if (regionId == null) {
            return false;
        }
        if (esAdmin(hid)) {
            return true;
        }
        Usuario u = usuario(hid);
        if (u == null) {
            return false;
        }
        LocalDate hoy = LocalDate.now();
        for (Asignacion a : Asignacion.<Asignacion>list("usuario = ?1", u)) {
            if (!a.activo || (a.vigenteHasta != null && a.vigenteHasta.isBefore(hoy))) {
                continue;
            }
            if (a.rol == null || !"RESPONSABLE_EQUIPO".equals(a.rol.codigo)) {
                continue;
            }
            switch (a.alcanceTipo == null ? "" : a.alcanceTipo) {
                case "GLOBAL" -> {
                    return true;
                }
                case "REGIONAL" -> {
                    if (a.alcanceRegional != null && a.alcanceRegional.id.equals(regionId)) return true;
                }
                case "EQUIPO" -> {
                    if (a.alcanceEquipo != null && a.alcanceEquipo.regional != null
                            && a.alcanceEquipo.regional.id.equals(regionId)) return true;
                }
                default -> { /* CLIENTE u otros no gobiernan regiones */ }
            }
        }
        return false;
    }
}
