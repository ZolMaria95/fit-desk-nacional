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

  /** Contenedor de scroll del shell (`.content` del Layout). Lo registra el Layout;
   *  las vistas lo usan para volver arriba (p. ej. al paginar). */
  private contentEl: HTMLElement | null = null;

  setFilters(tpl: TemplateRef<unknown> | null): void {
    this.filters.set(tpl);
  }

  clear(): void {
    this.filters.set(null);
  }

  /** El Layout registra aquí su contenedor de scroll (`.content`). */
  registerContent(el: HTMLElement | null): void {
    this.contentEl = el;
  }

  /** Lleva el contenido del shell al tope. Se usa tras paginar para no dejar al
   *  usuario a mitad de página en la nueva lista (tenía que subir a mano = bug). */
  scrollTop(): void {
    this.contentEl?.scrollTo({ top: 0 });
  }
}
