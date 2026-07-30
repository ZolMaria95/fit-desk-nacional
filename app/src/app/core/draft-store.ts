/**
 * Borradores automáticos en `localStorage` con expiración (TTL).
 *
 * Protege el texto que el usuario está escribiendo en un modal ante cierres involuntarios
 * (ESC, clic fuera…). El borrador se conserva durante `TTL_MS` desde el último guardado y se
 * elimina automáticamente si (a) se supera esa ventana, o (b) el llamador confirma el envío
 * (`clearDraft`). Convención de clave del proyecto: prefijo `fit-daily_`.
 *
 * Patrón de ventana tomado de `data.service.ts` (GRACE_MS) y try/catch tolerante a
 * localStorage lleno/indisponible como en `layout.ts`.
 */

const PREFIX = 'fit-daily_draft_';
/** 1 min 30 s. */
const TTL_MS = 90_000;

interface DraftBlob {
  html: string;
  savedAt: number;
}

/** Guarda (o re-estampa) el borrador `key` con la marca de tiempo actual. */
export function saveDraft(key: string, html: string): void {
  try {
    const blob: DraftBlob = { html, savedAt: Date.now() };
    localStorage.setItem(PREFIX + key, JSON.stringify(blob));
  } catch {
    // localStorage lleno / no disponible: el borrador es best-effort, se ignora.
  }
}

/**
 * Devuelve el HTML del borrador `key` si sigue vigente (< 90 s desde el guardado). Si expiró o
 * está corrupto, lo BORRA y devuelve `null`.
 */
export function loadDraft(key: string): string | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const blob = JSON.parse(raw) as DraftBlob;
    if (!blob || typeof blob.html !== 'string' || typeof blob.savedAt !== 'number') {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    if (Date.now() - blob.savedAt >= TTL_MS) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return blob.html;
  } catch {
    return null;
  }
}

/** Elimina el borrador `key` (envío exitoso o descarte explícito). */
export function clearDraft(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // no-op
  }
}
