import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * Foto de perfil por usuario (persistida en el backend/Neon: usuario.foto).
 * Se mantiene un mapa helpdesk_user_id → dataUri para pintar el avatar en cualquier
 * parte (header, perfil, y a futuro tarjetas). El actor viaja en X-Actor-Hid.
 */
@Injectable({ providedIn: 'root' })
export class PerfilService {
  private readonly auth = inject(AuthService);
  private readonly base = environment.quarkusApiUrl;

  /** Mapa hid → foto (data URI). */
  readonly fotos = signal<Record<string, string>>({});

  /** Equipo(s) del usuario logueado (código + nombre), desde /perfil/me. */
  readonly misEquipos = signal<{ codigo: string; nombre: string }[]>([]);

  /** Clientes del equipo del usuario (código + nombre del API), desde /perfil/me. */
  readonly misClientes = signal<{ codigo: string; nombre: string }[]>([]);

  private usaQuarkus(): boolean {
    return environment.dataBackend === 'quarkus' && !!this.base;
  }

  /** Carga las fotos de todos los usuarios (una vez, tras iniciar sesión). */
  async cargarFotos(): Promise<void> {
    if (!this.usaQuarkus()) return;
    try {
      const r = await fetch(`${this.base}/api/legacy/perfil/fotos`);
      if (r.ok) this.fotos.set((await r.json()) || {});
    } catch {
      /* silencioso: sin fotos, el avatar cae al código */
    }
  }

  /** Foto de un usuario por su hid (o '' si no tiene). */
  fotoDe(hid: string | null | undefined): string {
    return hid ? this.fotos()[String(hid)] || '' : '';
  }

  /** Carga el equipo del usuario logueado (para el perfil). */
  async cargarMiPerfil(): Promise<void> {
    const hid = this.auth.session()?.id;
    if (!this.usaQuarkus() || !hid) return;
    try {
      const r = await fetch(`${this.base}/api/legacy/perfil/me`, { headers: { 'X-Actor-Hid': String(hid) } });
      if (r.ok) {
        const d = await r.json();
        this.misEquipos.set(d.equipos || []);
        this.misClientes.set(d.clientes || []);
      }
    } catch {
      /* silencioso */
    }
  }

  /** Sube (o reemplaza) la foto del usuario logueado. `dataUri` ya viene comprimido. */
  async subirFoto(dataUri: string): Promise<void> {
    const hid = this.auth.session()?.id;
    if (!this.usaQuarkus() || !hid) throw new Error('Sesión no válida');
    const r = await fetch(`${this.base}/api/legacy/perfil/foto`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': String(hid) },
      body: JSON.stringify({ foto: dataUri }),
    });
    if (!r.ok) throw new Error(`No se pudo guardar la foto (${r.status})`);
    this.fotos.update((m) => ({ ...m, [String(hid)]: dataUri }));
  }

  /** Quita la foto del usuario logueado (vuelve al avatar con código). */
  async quitarFoto(): Promise<void> {
    const hid = this.auth.session()?.id;
    if (!this.usaQuarkus() || !hid) return;
    await fetch(`${this.base}/api/legacy/perfil/foto`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': String(hid) },
      body: JSON.stringify({ foto: null }),
    });
    this.fotos.update((m) => {
      const c = { ...m };
      delete c[String(hid)];
      return c;
    });
  }
}
