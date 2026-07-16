import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { DataService, Story, TeamMember } from '../../core/services/data.service';
import { esEstadoFinalizado } from '../../core/helpdesk-estados';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';

// ── Constantes de estado (port de js/board.js) ──────────────────────────
export const STATUSES = ['todo', 'in_progress', 'review', 'done'] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'En Certificación',
  done: 'Entregado',
};

/**
 * Mapea el estado del ticket del API a la columna del board (+ flags).
 * - Estados finalizados (APROBADO / CERRADO POR EL CLIENTE / CERRADO POR FALTA DE RESPUESTA
 *   DEL CLIENTE) → Done con el check "Finalizado" marcado. Ver `esEstadoFinalizado`.
 * - ENTREGADO → Done con el check desmarcado.
 * - INSTALADO PARA CERTIFICACIÓN → En Certificación.
 * - INFO PENDIENTE CLIENTE → In Progress + "esperando cliente".
 * - EN PROCESO → In Progress.
 * - cualquier otro estado → To Do (sin tocar el estado del ticket).
 * El check lo define SIEMPRE el ticket (approved true/false), no el usuario.
 */
export function statusFromTicketEstado(estado: string): { status: Status; waiting?: boolean; approved?: boolean } {
  const e = (estado || '').toUpperCase();
  if (esEstadoFinalizado(e)) return { status: 'done', approved: true };
  if (e.includes('ENTREGADO')) return { status: 'done', approved: false };
  if (e.includes('INSTALADO') || e.includes('CERTIFICAC')) return { status: 'review' };
  if (e.includes('INFO PENDIENTE')) return { status: 'in_progress', waiting: true };
  if (e.includes('EN PROCESO')) return { status: 'in_progress' };
  return { status: 'todo' };
}

export type Priority = 'alta' | 'media' | 'baja';
export const PRIORITY_LABELS: Record<Priority, string> = { alta: 'Alta', media: 'Media', baja: 'Baja' };

// Estado del ticket en el Helpdesk según el estado de la tarea en el board.
export const HD_ESTADO_POR_STATUS: Record<string, string> = {
  in_progress: 'EN PROCESO',
  review: 'INSTALADO PARA CERTIFICACIÓN',
  done: 'ENTREGADO',
};
/** Estado del ticket al marcar "esperando cliente". */
export const HD_ESTADO_ESPERANDO = 'INFO PENDIENTE CLIENTE';

// ── Resolución de asignado y avatares (sin dependencias del Helpdesk) ────
const AVATAR_PALETTE = [
  '#04BAF0', '#27AE60', '#F29E3B', '#9B59B6', '#E74C3C',
  '#1ABC9C', '#2980B9', '#F2811D', '#8E44AD', '#16A085', '#C0392B', '#D35400',
];

export function colorFor(id: string): string {
  let h = 0;
  const s = String(id || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

export function initialsFromName(name: string): string {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/** Nombre corto: 1.ª palabra (nombre) + 3.ª palabra (apellido) cuando hay 4 nombres;
 *  con 2 palabras devuelve ambas. Mismo criterio que los globos del board. */
export function shortName(name: string): string {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 2) return parts.join(' ');
  return `${parts[0]} ${parts[2]}`;
}

// ── Estética de post-it: color por cliente + micro-rotación ──────────────
const POSTIT_INK = '#2b2b3a'; // tinta oscura para legibilidad sobre pastel
const POSTIT_BASE = '#fffdf2'; // crema base del post-it
const NEUTRAL_ACCENT = '#9aa0a6'; // tareas sin cliente

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Mezcla `hex` con `base` (0..1 = peso del color). Sin depender de color-mix CSS. */
function blend(hex: string, base: string, weight: number): string {
  const [r1, g1, b1] = hexToRgb(hex);
  const [r2, g2, b2] = hexToRgb(base);
  const mix = (a: number, b: number) => Math.round(a * weight + b * (1 - weight));
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}

/** Versión pastel (clara) de un color, para fondos de chips/badges. */
export function pastel(hex: string): string {
  return blend(hex, '#ffffff', 0.3); // 30% color + 70% blanco
}

export interface ClientStyle {
  bg: string;
  accent: string;
  ink: string;
}

/**
 * Estilo del post-it derivado del cliente. Usa su `color` (clientes locales) o
 * uno estable generado por id (clientes del API que no traen color). Sin cliente
 * → crema neutro.
 */
export function clientStyle(client: { id?: string; color?: string } | undefined): ClientStyle {
  if (!client) return { bg: blend(NEUTRAL_ACCENT, POSTIT_BASE, 0.14), accent: NEUTRAL_ACCENT, ink: POSTIT_INK };
  const accent = client.color || colorFor(client.id || '');
  return { bg: blend(accent, POSTIT_BASE, 0.14), accent, ink: POSTIT_INK };
}

/** Rotación estable -2°..2° a partir del id (efecto post-it desordenado). */
export function cardTilt(id: string): string {
  let h = 0;
  const s = String(id || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `${((h % 9) - 4) * 0.5}deg`; // -2, -1.5, … 0 … 2
}

export interface ResolvedMember {
  id: string;
  name: string;
  color: string;
  label: string;
  role: string;
}

/** Resuelve el asignado: primero el equipo local (data/users.json), luego los
 *  empleados del Helpdesk (API). Port de _resolveMember de js/board.js. */
export function resolveMember(
  id: string | null | undefined,
  team: TeamMember[],
  hdUsers: { id: string; name: string; role?: string }[] = [],
): ResolvedMember | null {
  if (!id) return null;
  const t = team.find((m) => m.id === id);
  if (t) return { id: t.id, name: t.name || t.id, color: t.color || colorFor(t.id), label: t.id, role: t.role || '' };
  const u = hdUsers.find((x) => x.id === id);
  const name = u ? u.name : id;
  return { id, name, color: colorFor(id), label: initialsFromName(name), role: u?.role || '' };
}

// ── Progreso ─────────────────────────────────────────────────────────────
export function progColor(pct: number): string {
  if (pct === 0) return '#E0E0E0';
  if (pct <= 25) return '#F29E3B';
  if (pct <= 50) return '#F2811D';
  if (pct <= 75) return '#04BAF0';
  return '#27AE60';
}

/** Redondea al siguiente múltiplo de 5 (regla de negocio del progreso). */
export function roundUp5(n: number): number {
  const raw = Math.min(100, Math.max(0, Math.floor(n) || 0));
  return raw % 5 === 0 ? raw : Math.min(100, raw + (5 - (raw % 5)));
}

// ── Vencimiento ──────────────────────────────────────────────────────────
export interface DueInfo {
  str: string;
  overdue: boolean;
  soon: boolean;
  diffDays: number | null;
  badge: string;
}

export function dueInfo(dueDate: string | null | undefined, status: string): DueInfo {
  if (!dueDate) return { str: '', overdue: false, soon: false, diffDays: null, badge: '' };
  const d = new Date(dueDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((d.getTime() - today.getTime()) / 864e5);
  const active = status !== 'done';
  const overdue = active && d < today;
  const soon = active && !overdue && diffDays <= 3;
  const str = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  let badge = '';
  if (soon) badge = diffDays === 0 ? 'hoy' : diffDays === 1 ? 'mañana' : `${diffDays}d`;
  return { str, overdue, soon, diffDays, badge };
}

// ── canStartWork: límite WIP + permisos + confirmación (port board.js:68) ──
export interface WorkDeps {
  data: DataService;
  auth: AuthService;
  dialog: MatDialog;
  snack: MatSnackBar;
}

/**
 * Valida el paso todo → in_progress. Devuelve true si se permite (y asigna la
 * tarea cuando corresponde), false para abortar. Async porque la confirmación
 * pasa por un MatDialog.
 */
export async function canStartWork(task: Story, d: WorkDeps): Promise<boolean> {
  const session = d.auth.session();
  const myId = String(session?.id || '').trim().toUpperCase();
  const isHelpdesk = myId === 'MSC001';

  // Solo el técnico asignado o Helpdesk pueden iniciar una tarea desde To Do.
  if (!isHelpdesk && task.assignee && myId !== String(task.assignee).trim().toUpperCase()) {
    d.snack.open('Solo el técnico asignado puede iniciar esta tarea.', 'OK', { duration: 4000 });
    return false;
  }

  // Técnico efectivo que trabajará la tarea
  let assigneeId = task.assignee;
  if (!assigneeId) {
    if (isHelpdesk) {
      d.snack.open('Esta tarea no tiene técnico asignado. Asigna un técnico antes de iniciarla.', 'OK', { duration: 4000 });
      return false;
    }
    assigneeId = session?.id ?? null; // quien la mueve es el asignado
  }

  // Confirmación de inicio
  const ok = await firstValueFrom(
    d.dialog
      .open(ConfirmDialog, {
        data: { title: 'Iniciar tarea', message: `¿Deseas iniciar a trabajar en "${task.title}"?`, confirmText: 'Iniciar' },
      })
      .afterClosed(),
  );
  if (!ok) return false;

  // Si estaba sin asignar y la mueve un técnico → asignársela
  if (!task.assignee && assigneeId) d.data.updateStoryAssignee(task.id, assigneeId);
  return true;
}
