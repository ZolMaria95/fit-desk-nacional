package com.fitdesk.core;

import java.util.Locale;

/**
 * Estado de un ticket del HelpDesk → columna de su tarea en el Board. Espejo EXACTO de
 * {@code statusFromTicketEstado} / {@code esEstadoFinalizado} del frontend (board-utils.ts,
 * helpdesk-estados.ts): si cambia uno, cambiar el otro. Se compara por inclusión y en mayúsculas.
 */
public final class EstadoTicket {

    private EstadoTicket() {
    }

    /** APROBADO, CERRADO POR EL CLIENTE, CERRADO POR FALTA DE RESPUESTA, NO APLICA, RECHAZADO y
     *  COTIZACION NO ACEPTADA (estos dos, decisión de la dueña 2026-10-05). */
    public static boolean finalizado(String estado) {
        String e = norm(estado);
        return e.contains("APROBADO") || e.contains("CERRADO POR EL CLIENTE")
                || e.contains("CERRADO POR FALTA DE RESPUESTA") || e.contains("NO APLICA")
                || e.contains("RECHAZADO") || e.contains("NO ACEPTADA");
    }

    /** Código de {@code workflow_estado}: TODO · IN_PROGRESS · EN_CERTIFICACION · ENTREGADO. */
    public static String columna(String estado) {
        String e = norm(estado);
        if (finalizado(e) || e.contains("ENTREGADO") || e.contains("NO SE PUEDE REPLICAR")
                || e.contains("SOLUCION ALTERNATIVA")) {
            return "ENTREGADO";
        }
        if (e.contains("INSTALADO") || e.contains("CERTIFICAC")) {
            return "EN_CERTIFICACION";
        }
        if (esperandoCliente(e) || e.contains("EN PROCESO")) {
            return "IN_PROGRESS";
        }
        return "TODO";
    }

    /** INFO PENDIENTE CLIENTE y COTIZACIÓN ENVIADA → la tarea queda "esperando cliente". */
    public static boolean esperandoCliente(String estado) {
        String e = norm(estado);
        return e.contains("INFO PENDIENTE") || (e.contains("COTIZACION") && e.contains("ENVIADA"));
    }

    /** Mayúsculas y sin tildes (el catálogo mezcla "COTIZACIÓN" y "COTIZACION"). */
    private static String norm(String estado) {
        if (estado == null) {
            return "";
        }
        return java.text.Normalizer.normalize(estado, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "").toUpperCase(Locale.ROOT);
    }
}
