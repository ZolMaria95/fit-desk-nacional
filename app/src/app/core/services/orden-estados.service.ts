import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/** Un estado del HelpDesk (por `ticket_status_id`) en el orden personal: número ≥ 1 u oculto. */
export interface OrdenEstado {
  estado: string;
  orden: number | null;
  oculto: boolean;
}

/**
 * Orden PERSONAL de estados en Tickets (Administración → "Orden de estados"). Cada responsable define
 * en qué orden ve los tickets según su estado y qué estados oculta; dentro de cada estado, y para los
 * estados sin orden, manda la última modificación. Se guarda en el backend (`usuario.orden_estados`).
 */
@Injectable({ providedIn: 'root' })
export class OrdenEstadosService {
  private readonly auth = inject(AuthService);
  private readonly base = `${environment.quarkusApiUrl}/api/legacy/perfil/orden-estados`;

  private readonly _estados = signal<OrdenEstado[]>([]);
  readonly estados = this._estados.asReadonly();
  private readonly _puedeEditar = signal(false);
  readonly puedeEditar = this._puedeEditar.asReadonly();
  /** hid con el que se cargó (al cambiar de usuario se vuelve a pedir). */
  private cargadoPara: string | null = null;
  private carga: Promise<void> | null = null;

  private readonly porEstado = computed(() => new Map(this._estados().map((e) => [e.estado, e])));
  /** ¿Hay configuración? (algún estado con orden u oculto). Sin ella Tickets queda como siempre. */
  readonly activo = computed(() => this._estados().some((e) => e.oculto || e.orden != null));
  /** ticket_status_id ocultos. */
  readonly ocultos = computed(() => new Set(this._estados().filter((e) => e.oculto).map((e) => e.estado)));

  /** Estados con posición agrupados por número, en orden (1, 2, …): [['001'], ['014'], …]. */
  readonly grupos = computed<string[][]>(() => {
    const por = new Map<number, string[]>();
    for (const e of this._estados()) {
      if (e.oculto || e.orden == null) continue;
      por.set(e.orden, [...(por.get(e.orden) ?? []), e.estado]);
    }
    return [...por.entries()].sort((a, b) => a[0] - b[0]).map(([, ids]) => ids);
  });

  /** Posición del estado: su número, o +∞ si no tiene (van después, por modificación). */
  rango(estadoId: string | null | undefined): number {
    const e = estadoId ? this.porEstado().get(estadoId) : undefined;
    return e && !e.oculto && e.orden != null ? e.orden : Number.POSITIVE_INFINITY;
  }

  private get hid(): string {
    return String(this.auth.session()?.id ?? '').trim().toUpperCase();
  }

  /** Carga la configuración del usuario (una vez por sesión; `forzar` la vuelve a pedir). */
  cargar(forzar = false): Promise<void> {
    const hid = this.hid;
    if (!hid) return Promise.resolve();
    if (!forzar && this.cargadoPara === hid && this.carga) return this.carga;
    this.cargadoPara = hid;
    this.carga = (async () => {
      try {
        const r = await fetch(this.base, { headers: { 'X-Actor-Hid': hid } });
        const d = r.ok ? await r.json() : null;
        this._estados.set(normalizar(d?.estados));
        this._puedeEditar.set(!!d?.puedeEditar);
      } catch {
        // Sin backend: Tickets sigue con el orden de siempre. Se reintenta en la próxima carga.
        this._estados.set([]);
        this._puedeEditar.set(false);
        this.carga = null;
      }
    })();
    return this.carga;
  }

  /** Guarda (síncrono: lanza si el backend no confirma) y deja la configuración confirmada. */
  async guardar(estados: OrdenEstado[]): Promise<void> {
    const r = await fetch(this.base, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': this.hid },
      body: JSON.stringify({ estados }),
    });
    const d = await r.json().catch(() => null);
    if (!r.ok) throw new Error(d?.error || `No se pudo guardar (HTTP ${r.status})`);
    this._estados.set(normalizar(d?.estados));
  }
}

function normalizar(v: unknown): OrdenEstado[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((e: any) => ({
      estado: String(e?.estado ?? '').trim(),
      orden: Number.isInteger(e?.orden) && e.orden >= 1 ? Number(e.orden) : null,
      oculto: !!e?.oculto,
    }))
    .filter((e) => e.estado && (e.oculto || e.orden != null));
}
