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

  /**
   * Template de ORDEN de la vista activa. Va en un canal SEPARADO de los filtros a
   * propósito: ordenar no reduce el conjunto de resultados (filtrar sí), así que
   * mezclarlos confundía. El drawer lo pinta fuera del panel plegable de "Filtros".
   */
  readonly sort = signal<TemplateRef<unknown> | null>(null);

  /** Contenedor de scroll del shell (`.content` del Layout). Lo registra el Layout;
   *  las vistas lo usan para volver arriba (p. ej. al paginar). */
  private contentEl: HTMLElement | null = null;

  setFilters(tpl: TemplateRef<unknown> | null): void {
    this.filters.set(tpl);
  }

  /** La vista publica aquí su control de orden (queda fuera del panel de Filtros). */
  setSort(tpl: TemplateRef<unknown> | null): void {
    this.sort.set(tpl);
  }

  clear(): void {
    this.filters.set(null);
    this.sort.set(null);
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
