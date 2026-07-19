import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type GlobalSearchKind = 'ticket' | 'palabra';
export interface GlobalSearch {
  kind: GlobalSearchKind;
  value: string;
}

/**
 * Búsqueda GLOBAL de ticket, disponible en TODAS las pantallas desde el shell (drawer).
 * El shell publica la búsqueda aquí y navega a Tickets, que es quien la ejecuta y muestra
 * el resultado. Dos caminos según si Tickets ya está vivo:
 *  - **Vivo** (ya estás en /tickets): reacciona por el Observable `submissions`.
 *  - **Aún no existe** (navegas desde otra vista): al crearse, Tickets toma el `pending`.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly _submit = new Subject<GlobalSearch>();
  /** Emite cada búsqueda global lanzada desde el shell (para Tickets ya montado). */
  readonly submissions: Observable<GlobalSearch> = this._submit.asObservable();

  /** Última búsqueda sin consumir (para cuando Tickets aún no estaba montado al navegar). */
  private pending: GlobalSearch | null = null;

  /** Lanza una búsqueda global (desde el shell). */
  buscar(kind: GlobalSearchKind, value: string): void {
    const v = value.trim();
    if (!v) return;
    this.pending = { kind, value: v };
    this._submit.next({ kind, value: v });
  }

  /** Tickets la llama al iniciar (y tras aplicar): devuelve y limpia la búsqueda pendiente. */
  takePending(): GlobalSearch | null {
    const p = this.pending;
    this.pending = null;
    return p;
  }
}
