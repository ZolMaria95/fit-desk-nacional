import { Injectable, TemplateRef, signal } from '@angular/core';

/**
 * Canal entre las vistas y el shell (Layout). Cada feature "publica" su panel de
 * filtros como un `TemplateRef`; el drawer del Layout lo renderiza en la parte
 * superior (filtros dinámicos según la pantalla activa). La vista lo limpia al
 * destruirse. Solo Tickets lo usa por ahora.
 */
@Injectable({ providedIn: 'root' })
export class ShellService {
  /** Template de filtros de la vista activa (o null si no publica filtros). */
  readonly filters = signal<TemplateRef<unknown> | null>(null);

  setFilters(tpl: TemplateRef<unknown> | null): void {
    this.filters.set(tpl);
  }

  clear(): void {
    this.filters.set(null);
  }
}
