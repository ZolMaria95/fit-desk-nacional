import { Injectable, computed, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { PerfilService } from './perfil.service';
import { ThemeService } from './theme.service';
import { SIN_ASIGNAR, colorAvatar, colorChip, colorDe, construirMapa, quienUsa } from '../colores';

/**
 * Reparte los colores identificativos del equipo y los sirve a todas las pantallas.
 *
 * Es la ÚNICA fuente: antes cada pantalla tenía su propia paleta y su propio criterio, así que la
 * misma persona salía de un color distinto en el Board, en Tickets, en Semanal y en Vacaciones (en
 * las dos últimas el color dependía del ORDEN de la lista, así que cambiaba al cambiar el filtro).
 *
 * El reparto se hace sobre el equipo COMPLETO de una vez (ver `construirMapa`), porque repartir
 * persona a persona por hash produce colisiones: con 12 personas salían 4 repetidos.
 */
@Injectable({ providedIn: 'root' })
export class ColoresService {
  private readonly auth = inject(AuthService);
  private readonly data = inject(DataService);
  private readonly perfil = inject(PerfilService);
  private readonly theme = inject(ThemeService);

  /**
   * Roster indexado por `helpdesk_user_id`. El endpoint `/api/legacy/users` devuelve `id` =
   * código LOCAL ("SC") pero las tareas y tickets se asignan por hid ("MSC001"), así que hay que
   * usar el campo `hid` (aditivo) — sin él, ninguna búsqueda casaba y el color guardado no se
   * pintaba nunca. Se cae a `id` para no romper si el backend aún no lo envía.
   */
  private readonly roster = computed(() =>
    this.data.getTeam().map((m) => ({
      hid: String((m as { hid?: string }).hid || m.id || '').trim().toUpperCase(),
      nombre: String(m.name || ''),
      color: String(m.color || ''),
    })).filter((m) => m.hid),
  );

  /** Colores ELEGIDOS (hid → hex), incluido el del usuario logueado recién guardado. */
  private readonly elegidos = computed<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const m of this.roster()) if (m.color) out[m.hid] = m.color;
    const yo = String(this.auth.session()?.id || '').trim().toUpperCase();
    const mio = this.perfil.colorGuardado();
    // El roster se recarga con el board; mientras tanto, lo que el usuario acaba de elegir manda.
    if (yo) { if (mio) out[yo] = mio; else delete out[yo]; }
    return out;
  });

  /** hid → color final (elegido o derivado, sin repetidos dentro del equipo). */
  readonly mapa = computed(() => construirMapa(this.roster().map((m) => m.hid), this.elegidos()));

  /** Color de una persona. '' → gris de "sin asignar". */
  color(hid: string): string {
    return hid ? colorDe(hid, this.mapa()) : SIN_ASIGNAR;
  }

  /** `{bg, fg}` de un avatar con iniciales (el fondo se ajusta si la tinta no se leería). */
  avatar(hid: string): { bg: string; fg: string } {
    return colorAvatar(this.color(hid));
  }

  /** `{bg, fg}` de un chip de calendario, ya resuelto para el tema activo. */
  chip(hid: string): { bg: string; fg: string } {
    return colorChip(this.color(hid), this.theme.esOscuro());
  }

  /** Nombre de una persona por su hid (para los avisos del selector). */
  nombreDe(hid: string): string {
    const k = String(hid || '').trim().toUpperCase();
    return this.roster().find((m) => m.hid === k)?.nombre || '';
  }

  /** Nombres de quienes YA usan ese color (para avisar en el selector del perfil). */
  nombresQueUsan(color: string, exceptoHid = ''): string[] {
    const porHid = new Map(this.roster().map((m) => [m.hid, m.nombre]));
    return quienUsa(color, this.elegidos(), exceptoHid).map((h) => porHid.get(h) || h);
  }
}
