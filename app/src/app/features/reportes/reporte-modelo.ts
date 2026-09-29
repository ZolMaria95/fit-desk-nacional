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
