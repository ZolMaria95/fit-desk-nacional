import { Notificacion } from '../core/services/notificaciones.service';

/**
 * Presentación pura de la campanita: a qué pestaña cae cada tipo, con qué ícono/color se pinta y
 * qué código (tarea/ticket) mostrar como botón-link. Sin estado — mismo rol que `board-utils.ts`/
 * `tickets-card-utils.ts`.
 */

/** Tipos que giran en torno a una Tarea (incluye Reunión, Transferencia y Solicitud: las tres
 *  navegan a "trabajo de tareas", no a la conversación de un ticket). El resto va a "Tickets". */
export const TIPOS_TAREAS = new Set<Notificacion['tipo']>([
  'TAREA_ASIGNADA',
  'TAREA_SIN_FINALIZAR',
  'REUNION',
  'TRANSFERENCIA_PENDIENTE',
  'SOLICITUD_PENDIENTE',
]);

export function notifTabDe(tipo: Notificacion['tipo']): 'tareas' | 'tickets' {
  return TIPOS_TAREAS.has(tipo) ? 'tareas' : 'tickets';
}

/** Ícono Material + color de fondo del círculo, uno por tipo. Reusa colores/íconos que el propio
 *  proyecto ya asigna a estos mismos conceptos en `reminder-alert-dialog` y `bandeja`. */
export const NOTIF_ESTILO: Record<Notificacion['tipo'], { icon: string; bg: string }> = {
  TAREA_ASIGNADA: { icon: 'assignment_ind', bg: '#8e44ad' },
  TAREA_SIN_FINALIZAR: { icon: 'assignment_late', bg: '#8e44ad' },
  REUNION: { icon: 'groups', bg: '#048abf' },
  TRANSFERENCIA_PENDIENTE: { icon: 'move_to_inbox', bg: '#27ae60' },
  SOLICITUD_PENDIENTE: { icon: 'support_agent', bg: '#6c5ce7' },
  RECORDATORIO: { icon: 'alarm', bg: '#f29e38' },
  TICKET_NOVEDAD: { icon: 'confirmation_number', bg: '#2e9e5b' },
};

/**
 * Etiqueta del botón-link (número de tarea/ticket, o destino). Extrae el código de `n.url` con el
 * MISMO parseo que ya usa `abrirNotificacion()` en `layout.ts`, para no duplicarlo en dos sitios.
 * `REUNION` también es una Tarea (código TA-NNN): usa el mismo `card=` que las otras dos de tarea.
 */
export function notifLinkLabel(n: Notificacion): string | null {
  const url = n.url || '';
  switch (n.tipo) {
    case 'TAREA_ASIGNADA':
    case 'TAREA_SIN_FINALIZAR':
    case 'REUNION': {
      // `&join=...` puede venir pegado al final (solo en REUNION) — se descarta acá también.
      const id = url.split('card=')[1]?.split('&')[0];
      return id || null;
    }
    case 'RECORDATORIO':
    case 'TICKET_NOVEDAD': {
      const id = url.split('resaltar=')[1];
      // Un recordatorio SIN ticket (clave sintética "REC-...") no tiene conversación del HelpDesk
      // que abrir — no se muestra como enlace (mismo criterio que en `ReminderAlertDialog`).
      if (!id || id.startsWith('REC-')) return null;
      return `#${id}`;
    }
    case 'TRANSFERENCIA_PENDIENTE':
    case 'SOLICITUD_PENDIENTE':
      return 'Ver en Bandeja';
    default:
      return null;
  }
}

/**
 * Link de videollamada de una `REUNION`, si tiene (viaje codificado dentro de `n.url` como
 * `&join=<link>`, junto al `card=<id>` — `Notificacion` no trae un campo propio para esto y no se
 * quiso tocar el backend por un solo campo opcional). `null` para el resto de tipos.
 */
export function notifJoinHref(n: Notificacion): string | null {
  if (n.tipo !== 'REUNION') return null;
  const raw = (n.url || '').split('join=')[1];
  return raw ? decodeURIComponent(raw) : null;
}
