package com.fitdesk.api;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fitdesk.core.Asignacion;
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

    public static Usuario usuario(String hid) {
        return (hid == null || hid.isBlank()) ? null : Usuario.findByHelpdeskUserId(hid.trim());
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
