/** Respuesta de `GET /api/reportes/estado-equipo` (ver docs/contrato-api.md). */
export interface FilaReporte {
  consultorHid: string | null;
  consultorNombre: string | null;
  tarea: string;
  titulo: string | null;
  ticket: string | null;
  cliente: string | null;
  clientId: string | null;
  estado: 'TODO' | 'IN_PROGRESS' | 'EN_CERTIFICACION' | string;
  prioridad: string | null;
  /** Orden del ticket en el HelpDesk (1 = más urgente). Llega del espejo; la vista lo refresca en vivo. */
  ordenTicket: string | null;
  inicio: string | null; // YYYY-MM-DD
  inicioAprox: boolean;
  dias?: number;
  fechaLimite: string | null;
  esperandoCliente: boolean;
  fechaEsperando: string | null;
  /** Nombre del equipo dueño del tablero si NO es el del reporte (tarea transferida). */
  tablero: string | null;
  /** Columna del board (TODO/IN_PROGRESS/EN_CERTIFICACION). */
  columna?: string;
  /** Avance de la tarea 0–100 (= progreso del Board). */
  progreso?: number;
  /** Días esperando al cliente (si la tarea lo está). */
  diasEsperandoCliente?: number | null;
  /** Nota de la tarea (V33), con autor y fecha. */
  nota?: string | null;
  notaPor?: string | null;
  notaFecha?: string | null;
  /** Bloqueo (V33): clave de BLOQUEOS o null. */
  bloqueo?: string | null;
  // ── En vivo del HelpDesk (si la tarea tiene ticket) ──
  tipo?: string;
  estadoTicket?: string;
  fechaCreacion?: string;
  /** Días desde la creación del ticket. */
  diasCreacion?: number | null;
  fechaAsignacion?: string;
  diasAsignacion?: number | null;
  /** Última modificación del ticket (ISO) y días desde entonces. */
  ultimaGestion?: string;
  diasSinMov?: number | null;
}

export interface FilaSeguimiento extends FilaReporte {
  /** 1 vencida · 2 vence hoy · 3 recordatorio · 4 esperando cliente · 5 en curso hace mucho. */
  peso: number;
  motivo: string;
}

export interface Persona {
  hid: string;
  nombre: string;
}

export interface ReporteEstadoEquipo {
  equipo: { codigo: string; nombre: string };
  generadoEn: string;
  consultores: Persona[];
  filas: FilaReporte[];
  sinTarea: Persona[];
  seguimiento: FilaSeguimiento[];
  umbrales: { diasEsperandoCliente: number; diasEnProceso: number };
  resumen?: { enProgreso: number; finalizadasMes: number; vencidas: number; consultoresActivos: number };
}

/** Bloqueos de una tarea (catálogo de la dueña). `nivel` da el color: ok verde · amarillo · naranja · rojo. */
export const BLOQUEOS: { clave: string; label: string; nivel: 'ok' | 'amarillo' | 'naranja' | 'rojo' }[] = [
  { clave: 'SIN_BLOQUEO', label: 'Sin bloqueo', nivel: 'ok' },
  { clave: 'ESPERANDO_CLIENTE', label: 'Esperando cliente', nivel: 'amarillo' },
  { clave: 'ESPERANDO_INFORMACION', label: 'Esperando información', nivel: 'amarillo' },
  { clave: 'ESPERANDO_CONSULTOR', label: 'Esperando otro consultor', nivel: 'naranja' },
  { clave: 'ESPERANDO_AMBIENTE', label: 'Esperando ambiente', nivel: 'naranja' },
  { clave: 'BLOQUEO_TECNICO', label: 'Bloqueo técnico', nivel: 'rojo' },
  { clave: 'BLOQUEO_EXTERNO', label: 'Bloqueo externo', nivel: 'rojo' },
];

export function bloqueoDe(clave: string | null | undefined) {
  return BLOQUEOS.find((b) => b.clave === clave) ?? null;
}

/** Días enteros entre una fecha (ISO o "AAAA-MM-DD…") y hoy; null si no se puede leer. */
export function diasDesde(iso: string | null | undefined, hoy = new Date()): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const a = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const b = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  return Math.max(0, Math.round((b - a) / 864e5));
}

/** "2026-10-03T15:42:00" → "03/10/2026 15:42" (`corto` → "03/10/26 15:42", para la tabla). */
export function fechaHora(iso: string | null | undefined, corto = false): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const p = (n: number) => String(n).padStart(2, '0');
  const anio = corto ? String(d.getFullYear()).slice(2) : d.getFullYear();
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${anio} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** "2026-10-03" → "03/10/26" (tabla compacta). */
export function fechaCortaYY(iso: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ''));
  return m ? `${m[3]}/${m[2]}/${m[1].slice(2)}` : '';
}

/** Grupo de la vista: un consultor (o "Sin asignar") con sus filas visibles. */
export interface GrupoConsultor {
  hid: string;
  nombre: string;
  filas: FilaReporte[];
}

export const ESTADO_LABEL: Record<string, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  EN_CERTIFICACION: 'En Certificación',
};

export const PRIORIDAD_LABEL: Record<string, string> = { alta: 'Alta', media: 'Media', baja: 'Baja' };

/** Orden del ticket como número para ordenar (sin orden → al final). */
export function ordenNum(v: string | null | undefined): number {
  const n = parseInt(String(v ?? ''), 10);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

const PESO_PRIORIDAD: Record<string, number> = { alta: 0, media: 1, baja: 2 };

/** Orden dentro de un consultor (como el backend): prioridad de la tarea → Orden del ticket → días (desc). */
export function compararFila(a: FilaReporte, b: FilaReporte): number {
  return (
    (PESO_PRIORIDAD[a.prioridad ?? ''] ?? 3) - (PESO_PRIORIDAD[b.prioridad ?? ''] ?? 3) ||
    ordenNum(a.ordenTicket) - ordenNum(b.ordenTicket) ||
    (b.dias ?? -1) - (a.dias ?? -1)
  );
}

/** Mismo criterio que el backend: motivo → Orden del ticket → prioridad de la tarea → días (desc). */
export function compararSeguimiento(a: FilaSeguimiento, b: FilaSeguimiento): number {
  return (
    a.peso - b.peso ||
    ordenNum(a.ordenTicket) - ordenNum(b.ordenTicket) ||
    (PESO_PRIORIDAD[a.prioridad ?? ''] ?? 3) - (PESO_PRIORIDAD[b.prioridad ?? ''] ?? 3) ||
    (b.dias ?? -1) - (a.dias ?? -1)
  );
}

/** "2026-09-28" → "28/09/2026" (sin pasar por Date: no se corre de día por la zona horaria). */
export function fechaCorta(iso: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ''));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}
