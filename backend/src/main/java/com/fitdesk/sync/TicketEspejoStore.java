package com.fitdesk.sync;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeParseException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fitdesk.core.Cliente;
import com.fitdesk.core.Tarea;
import com.fitdesk.core.TicketEspejo;
import com.fitdesk.core.Usuario;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

/**
 * Upsert transaccional de encabezados de ticket del HelpDesk al espejo local
 * (`ticket_espejo`). Es el mapeo puro (ticket JSON → fila), separado de la
 * orquestación HTTP para poder verificarlo con un payload sin autenticación.
 * Idempotente por `helpdesk_ticket_id`. Guarda SOLO el encabezado liviano
 * (sin conversación ni adjuntos), como manda el modelo.
 */
@ApplicationScoped
public class TicketEspejoStore {

    /** @return [insertados, actualizados]. */
    @Transactional
    public int[] upsert(JsonNode items) {
        int ins = 0;
        int upd = 0;
        if (items != null && items.isArray()) {
            for (JsonNode t : items) {
                String num = text(t, "ticket_id");
                if (num == null) {
                    continue;
                }
                TicketEspejo e = TicketEspejo.findByHelpdeskTicketId(num);
                boolean nuevo = e == null;
                if (nuevo) {
                    e = new TicketEspejo();
                    e.helpdeskTicketId = num;
                    e.persist();
                }
                e.cliente = resolveCliente(text(t, "client_id"), text(t, "cliente"));
                e.asunto = trunc(text(t, "subject"), 500);
                e.estadoOrigen = text(t, "estado");
                e.prioridad = text(t, "priority");
                e.asignadoHd = upper(text(t, "assigned_user_id"));
                if (!nuevo) {
                    propagarAsignado(e);
                }
                e.fechaIngreso = ts(text(t, "entry_date"));
                e.fechaModificacion = ts(text(t, "modified_date"));
                e.lastSyncedAt = OffsetDateTime.now();
                if (nuevo) {
                    ins++;
                } else {
                    upd++;
                }
            }
        }
        return new int[] { ins, upd };
    }

    /**
     * Refresco puntual del asignado de UN ticket en el espejo (write-through de la
     * reasignación). Tras confirmar la escritura al HelpDesk, el board —que deriva el
     * dueño de la tarea del ticket— queda correcto YA, sin esperar el sync completo.
     * Upsert por helpdesk_ticket_id; si la fila no existe la crea mínima (el sync
     * completo rellenará el resto). hid vacío/nulo ⇒ ticket sin asignar.
     */
    @Transactional
    public void upsertAssignee(String ticketId, String hid) {
        if (ticketId == null || ticketId.isBlank()) {
            return;
        }
        String num = ticketId.trim();
        TicketEspejo e = TicketEspejo.findByHelpdeskTicketId(num);
        if (e == null) {
            e = new TicketEspejo();
            e.helpdeskTicketId = num;
            e.persist();
        }
        e.asignadoHd = upper(hid == null || hid.isBlank() ? null : hid.trim());
        e.lastSyncedAt = OffsetDateTime.now();
        propagarAsignado(e);
    }

    /**
     * El asignado de una tarea CON ticket es el del ticket: cada vez que cambia el del espejo, se copia a
     * sus tareas (`tarea.asignado_a`), venga el cambio de FitDesk o de una reasignación hecha directo en el
     * HelpDesk. Si el hid no es un usuario de FitDesk, la tarea queda sin usuario local (el asignado
     * efectivo sigue siendo el del espejo). Un espejo SIN asignado no toca la tarea. Devuelve cuántas cambió.
     */
    public int propagarAsignado(TicketEspejo e) {
        // "Sin asignado" NO se propaga: el HelpDesk vacía el asignado al cerrar/aprobar un ticket, y un
        // ticket aún no asignado (p. ej. transferencia aceptada antes del fix) dejaba la tarea sin dueño.
        if (e.asignadoHd == null || e.asignadoHd.isBlank()) {
            return 0;
        }
        Usuario u = Usuario.findByHelpdeskUserId(e.asignadoHd);
        if (u == null) {
            u = Usuario.find("upper(helpdeskUserId) = ?1", e.asignadoHd).firstResult();
        }
        int n = 0;
        for (Tarea t : Tarea.<Tarea>list("ticketEspejo = ?1", e)) {
            Long actual = t.asignadoA != null ? t.asignadoA.id : null;
            Long nuevo = u != null ? u.id : null;
            if (actual == null ? nuevo != null : !actual.equals(nuevo)) {
                t.asignadoA = u;
                t.actualizadoEn = OffsetDateTime.now();
                n++;
            }
        }
        return n;
    }

    /** Resuelve el cliente por helpdesk_client_id y, si no, por nombre. Null si no está (otra regional). */
    private Cliente resolveCliente(String clientId, String nombre) {
        if (clientId != null) {
            Cliente c = Cliente.find("helpdeskClientId", clientId).firstResult();
            if (c != null) {
                return c;
            }
        }
        if (nombre != null) {
            return Cliente.find("upper(nombre) = ?1", nombre.trim().toUpperCase()).firstResult();
        }
        return null;
    }

    // ── helpers ──
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

    private static String upper(String s) {
        return s == null ? null : s.toUpperCase();
    }

    private static String trunc(String s, int max) {
        return s == null ? null : (s.length() <= max ? s : s.substring(0, max));
    }

    /** Parse tolerante de fecha/hora del HelpDesk (ISO con zona, ISO local, o solo fecha). */
    private static OffsetDateTime ts(String s) {
        if (s == null || s.isBlank()) {
            return null;
        }
        String v = s.trim();
        try {
            return OffsetDateTime.parse(v);
        } catch (DateTimeParseException ignored) {
            // sigue
        }
        try {
            return LocalDateTime.parse(v.replace(' ', 'T')).atOffset(ZoneOffset.UTC);
        } catch (DateTimeParseException ignored) {
            // sigue
        }
        try {
            return LocalDate.parse(v).atStartOfDay().atOffset(ZoneOffset.UTC);
        } catch (DateTimeParseException ignored) {
            return null;
        }
    }
}
