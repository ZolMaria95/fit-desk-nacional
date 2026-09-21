// Estilos y formato para las cards de tickets (grid responsive).
// Cada estilo tiene variante CLARA y OSCURA: estos colores viajan como estilo INLINE
// (`[style.background]`), y un estilo inline no lo puede pisar una hoja de estilos —
// por eso el tema oscuro se resuelve aquí, en origen, y no en el .scss.

import { esEstadoCerrado } from '../../core/helpdesk-estados';

export interface BadgeStyle {
  headerBg: string;
  badgeBg: string;
  badgeText: string;
}

/**
 * Estilo del header/badge según el estado REAL del catálogo del Helpdesk. Se
 * empareja por inclusión (igual que statusFromTicketEstado) para tolerar variantes.
 */
export function estadoStyle(estatus: string, oscuro = false): BadgeStyle {
  const e = (estatus || '').toUpperCase();
  if (oscuro) {
    // En oscuro se invierte la relación: fondo TINTADO oscuro + texto vivo del mismo tono.
    if (e.includes('APROBADO')) return { headerBg: '#16241a', badgeBg: '#1e3a22', badgeText: '#8fd98f' };
    if (esEstadoCerrado(e)) return { headerBg: '#1c1c1c', badgeBg: '#2a2a2a', badgeText: '#b0b0b0' };
    if (e.includes('ENTREGADO')) return { headerBg: '#12262a', badgeBg: '#123a36', badgeText: '#8fd9cf' };
    if (e.includes('INSTALADO') || e.includes('CERTIFICAC')) return { headerBg: '#111f2e', badgeBg: '#12304f', badgeText: '#8fc4f5' };
    if (e.includes('INFO PENDIENTE')) return { headerBg: '#2a2012', badgeBg: '#3d2e12', badgeText: '#f0c070' };
    if (e.includes('EN PROCESO')) return { headerBg: '#1a182e', badgeBg: '#26224a', badgeText: '#c0bcf0' };
    if (e.includes('ABIERTO')) return { headerBg: '#16241a', badgeBg: '#1e3a22', badgeText: '#9fd98a' };
    return { headerBg: '#1a1f26', badgeBg: '#252d36', badgeText: '#aab6c2' };
  }
  if (e.includes('APROBADO')) return { headerBg: '#DDEFD9', badgeBg: '#97C98A', badgeText: '#1B5E20' };
  // Grupo CERRADO (incluye NO APLICA): gris NEUTRO, sin tinte cálido.
  if (esEstadoCerrado(e)) return { headerBg: '#F0F0F0', badgeBg: '#D0D0D0', badgeText: '#444444' };
  if (e.includes('ENTREGADO')) return { headerBg: '#DDF3F1', badgeBg: '#9FE0D8', badgeText: '#0C5046' };
  if (e.includes('INSTALADO') || e.includes('CERTIFICAC')) return { headerBg: '#E3EFFB', badgeBg: '#B5D4F4', badgeText: '#0C447C' };
  if (e.includes('INFO PENDIENTE')) return { headerBg: '#FAEEDA', badgeBg: '#FAC775', badgeText: '#633806' };
  if (e.includes('EN PROCESO')) return { headerBg: '#EEEDFE', badgeBg: '#CECBF6', badgeText: '#3C3489' };
  if (e.includes('ABIERTO')) return { headerBg: '#EAF3DE', badgeBg: '#C0DD97', badgeText: '#27500A' };
  return { headerBg: '#ECEFF3', badgeBg: '#CFD6DE', badgeText: '#3A4350' };
}

/** Estilo del badge de tipo (INCIDENCIA / REQUERIMIENTO / CONSULTA). */
export function tipoStyle(tipo: string, oscuro = false): { badgeBg: string; badgeText: string } {
  const t = (tipo || '').toUpperCase();
  if (oscuro) {
    if (t.includes('INCIDENCIA')) return { badgeBg: '#3a1e20', badgeText: '#f09a9a' };
    if (t.includes('REQUERIMIENTO')) return { badgeBg: '#1e3a22', badgeText: '#9fd98a' };
    if (t.includes('CONSULTA')) return { badgeBg: '#2a2545', badgeText: '#bdb6f5' };
    return { badgeBg: '#252d36', badgeText: '#aab6c2' };
  }
  if (t.includes('INCIDENCIA')) return { badgeBg: '#F7C1C1', badgeText: '#791F1F' };
  if (t.includes('REQUERIMIENTO')) return { badgeBg: '#C0DD97', badgeText: '#27500A' };
  if (t.includes('CONSULTA')) return { badgeBg: '#CECBF6', badgeText: '#3C3489' };
  return { badgeBg: '#D7DBE0', badgeText: '#3A4350' };
}

/** Fecha de ingreso: "10 jun 2025". */
export function fmtIngreso(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Última modificación: "Hoy 9:42" si es hoy, "Ayer 17:20" si fue ayer, si no "13 jun 16:05". */
export function fmtMod(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const hh = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  const today = new Date();
  const mismoDia = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (mismoDia(d, today)) return `Hoy ${hh}`;
  const ayer = new Date(today);
  ayer.setDate(ayer.getDate() - 1);
  if (mismoDia(d, ayer)) return `Ayer ${hh}`;
  return `${d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} ${hh}`;
}
