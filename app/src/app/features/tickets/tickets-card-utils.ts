// Estilos y formato para las cards de tickets (grid responsive).
// Solo modo claro (la app es light-only por decisión vigente).

export interface BadgeStyle {
  headerBg: string;
  badgeBg: string;
  badgeText: string;
}

/**
 * Estilo del header/badge según el estado REAL del catálogo del Helpdesk. Se
 * empareja por inclusión (igual que statusFromTicketEstado) para tolerar variantes.
 */
export function estadoStyle(estatus: string): BadgeStyle {
  const e = (estatus || '').toUpperCase();
  if (e.includes('APROBADO')) return { headerBg: '#DDEFD9', badgeBg: '#97C98A', badgeText: '#1B5E20' };
  if (e.includes('CERRADO')) return { headerBg: '#F1EFE8', badgeBg: '#D3D1C7', badgeText: '#444441' };
  if (e.includes('ENTREGADO')) return { headerBg: '#DDF3F1', badgeBg: '#9FE0D8', badgeText: '#0C5046' };
  if (e.includes('INSTALADO') || e.includes('CERTIFICAC')) return { headerBg: '#E3EFFB', badgeBg: '#B5D4F4', badgeText: '#0C447C' };
  if (e.includes('INFO PENDIENTE')) return { headerBg: '#FAEEDA', badgeBg: '#FAC775', badgeText: '#633806' };
  if (e.includes('EN PROCESO')) return { headerBg: '#EEEDFE', badgeBg: '#CECBF6', badgeText: '#3C3489' };
  if (e.includes('ABIERTO')) return { headerBg: '#EAF3DE', badgeBg: '#C0DD97', badgeText: '#27500A' };
  return { headerBg: '#ECEFF3', badgeBg: '#CFD6DE', badgeText: '#3A4350' };
}

/** Estilo del badge de tipo (INCIDENCIA / REQUERIMIENTO / CONSULTA). */
export function tipoStyle(tipo: string): { badgeBg: string; badgeText: string } {
  const t = (tipo || '').toUpperCase();
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

/** Última modificación: "Hoy 9:42" si es hoy, si no "13 jun 16:05". */
export function fmtMod(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const hh = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
  if (sameDay) return `Hoy ${hh}`;
  return `${d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} ${hh}`;
}
