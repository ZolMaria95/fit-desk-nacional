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

    /** APROBADO, CERRADO POR EL CLIENTE, CERRADO POR FALTA DE RESPUESTA, NO APLICA. */
    public static boolean finalizado(String estado) {
        String e = norm(estado);
        return e.contains("APROBADO") || e.contains("CERRADO POR EL CLIENTE")
                || e.contains("CERRADO POR FALTA DE RESPUESTA") || e.contains("NO APLICA");
    }

    /** Código de {@code workflow_estado}: TODO · IN_PROGRESS · EN_CERTIFICACION · ENTREGADO. */
    public static String columna(String estado) {
        String e = norm(estado);
        if (finalizado(e) || e.contains("ENTREGADO")) {
            return "ENTREGADO";
        }
        if (e.contains("INSTALADO") || e.contains("CERTIFICAC")) {
            return "EN_CERTIFICACION";
        }
        if (e.contains("INFO PENDIENTE") || e.contains("EN PROCESO")) {
            return "IN_PROGRESS";
        }
        return "TODO";
    }

    /** INFO PENDIENTE CLIENTE → la tarea queda "esperando cliente". */
    public static boolean esperandoCliente(String estado) {
        return norm(estado).contains("INFO PENDIENTE");
    }

    private static String norm(String estado) {
        return estado == null ? "" : estado.toUpperCase(Locale.ROOT);
    }
}
