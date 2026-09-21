import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

/**
 * Foto de perfil por usuario (persistida en el backend/Neon: usuario.foto).
 * Se mantiene un mapa helpdesk_user_id → dataUri para pintar el avatar en cualquier
 * parte (header, perfil, y a futuro tarjetas). El actor viaja en X-Actor-Hid.
 */
/** Equipo que el usuario puede revisar. `esResponsable` = lo DIRIGE (no solo pertenece a él). */
export interface EquipoRevisable {
  codigo: string;
  nombre: string;
  /** true si el usuario es RESPONSABLE de este equipo; false si solo es miembro. */
  esResponsable?: boolean;
  clientes: { codigo: string; nombre: string }[];
}

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private readonly auth = inject(AuthService);
  private readonly base = environment.quarkusApiUrl;

  /** Mapa hid → foto (data URI). */
  readonly fotos = signal<Record<string, string>>({});

  /** Equipo(s) del usuario logueado (código + nombre), desde /perfil/me. */
  readonly misEquipos = signal<{ codigo: string; nombre: string }[]>([]);

  /** Clientes del ALCANCE del usuario (código + nombre del API), desde /perfil/me. EQUIPO = su equipo,
   *  REGIONAL = su regional, GLOBAL = todos los registrados. */
  readonly misClientes = signal<{ codigo: string; nombre: string }[]>([]);

  /** ¿El usuario es de alcance GLOBAL? Si sí, los selectores de cliente ofrecen el catálogo COMPLETO
   *  del HelpDesk (además de los registrados); si no, se limitan a `misClientes` (su alcance). */
  readonly esGlobal = signal(false);

  /** Preferencia de tema guardada en el backend para el usuario logueado ('light'|'dark'|null=sin elegir).
   *  La aplica el `ThemeService`. */
  readonly temaGuardado = signal<'light' | 'dark' | null>(null);

  /** Color identificativo que el usuario eligió en su perfil ('#RRGGBB' | null = no eligió).
   *  Solo es el del usuario LOGUEADO; el de los demás llega en el roster (`data.team`). */
  readonly colorGuardado = signal<string | null>(null);

  /** Equipos que el usuario puede REVISAR (miembro ∪ responsable) con sus clientes,
   *  desde /perfil/equipos-clientes. Un responsable regional trae todos los equipos
   *  de su regional → el selector de equipo de la pestaña "Equipo" se apoya en esto. */
  readonly equiposRevisar = signal<EquipoRevisable[]>([]);
  /** ¿El usuario puede revisar más de un equipo? (→ mostrar el selector). */
  readonly multiEquipo = signal(false);
  /**
   * Equipos que el usuario **DIRIGE** (subconjunto de `equiposRevisar` con `esResponsable`).
   * No es lo mismo que poder revisarlos: un ESPECIALISTA asignado a un equipo lo REVISA pero no lo
   * dirige, y las alertas de novedades del equipo le corresponden solo a quien lo dirige.
   */
  readonly equiposQueLidero = computed(() => this.equiposRevisar().filter((e) => e.esResponsable));

  /**
   * ¿El usuario DIRIGE el equipo dueño de este board? (board.codigo = equipo.codigo).
   *
   * Transferir una tarea lo autoriza el backend contra el equipo **ORIGEN** —el dueño del board
   * donde vive la tarea, que no tiene por qué ser el equipo del actor—, así que sin esto se ofrecía
   * la acción a quien no podía ejecutarla y el intento acababa en 403.
   *
   * PERMISIVO a propósito cuando aún no se sabe (ADMIN, board desconocido o lista sin cargar): el
   * backend sigue siendo la autoridad y ahora su 403 se muestra como error, sin cerrar sesión.
   */
  gobiernaBoard(boardCodigo: string | null | undefined): boolean {
    if (this.auth.esAdminPlataforma()) return true;
    const codigo = String(boardCodigo || '').trim();
    const lidero = this.equiposQueLidero();
    if (!codigo || lidero.length === 0) return true;
    return lidero.some((e) => String(e.codigo).trim() === codigo);
  }

  private usaQuarkus(): boolean {
    // `base` vacío es VÁLIDO on-prem (mismo-origen: URLs relativas /api/legacy/*). No exigir
    // `!!base` — si no, con `quarkusApiUrl: ''` se saltaban todas las cargas de perfil (equipos,
    // clientes del alcance, roles) y la pestaña Equipo no filtraba.
    return environment.dataBackend === 'quarkus';
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
        this.esGlobal.set(!!d.esGlobal);
        this.temaGuardado.set(d.tema === 'dark' ? 'dark' : d.tema === 'light' ? 'light' : null);
        this.colorGuardado.set(typeof d.color === 'string' && d.color ? d.color : null);
      }
    } catch {
      /* silencioso */
    }
  }

  /** Carga los equipos que el usuario puede revisar (con sus clientes) para la pestaña "Equipo". */
  private equiposRetries = 0;
  async cargarEquiposRevisar(): Promise<void> {
    const hid = this.auth.session()?.id;
    if (!this.usaQuarkus() || !hid) return;
    try {
      const r = await fetch(`${this.base}/api/legacy/perfil/equipos-clientes`, { headers: { 'X-Actor-Hid': String(hid) } });
      if (r.ok) {
        const d = await r.json();
        this.equiposRevisar.set(d.equipos || []);
        this.multiEquipo.set(!!d.multiEquipo);
        this.equiposRetries = 0;
        return;
      }
      this.reintentarEquipos(); // 5xx / no-ok → reintenta en background (no bloquea la 1ª carga)
    } catch {
      this.reintentarEquipos(); // fallo de red (p. ej. Render frío tras el login) → reintenta
    }
  }

  /** Reintento en background de los equipos-clientes ante un fallo transitorio (máx 3, ~3s). Al éxito,
   *  el `equiposRevisar` actualizado dispara el auto-requery de la vista Tickets. No reintenta si la
   *  respuesta fue OK aunque venga vacía (= el actor legítimamente no revisa equipos). */
  private reintentarEquipos(): void {
    if (this.equiposRetries >= 3) return;
    this.equiposRetries++;
    setTimeout(() => void this.cargarEquiposRevisar(), 3000);
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

  /** Guarda la preferencia de tema del usuario logueado en el backend (best-effort; el ThemeService
   *  ya aplicó y cacheó localmente). */
  async guardarTema(tema: 'light' | 'dark'): Promise<void> {
    const hid = this.auth.session()?.id;
    if (!this.usaQuarkus() || !hid) return;
    this.temaGuardado.set(tema);
    try {
      await fetch(`${this.base}/api/legacy/perfil/tema`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': String(hid) },
        body: JSON.stringify({ tema }),
      });
    } catch {
      /* best-effort: el cache local mantiene la preferencia hasta el próximo intento */
    }
  }

  /**
   * Guarda el color identificativo del usuario. `null` = quitarlo (vuelve al derivado; elegir no es
   * obligatorio). Espejo de `guardarTema`, pero **no es best-effort**: aquí el usuario ve el
   * resultado y espera que quede guardado, así que se propaga el error para poder avisarle.
   */
  async guardarColor(color: string | null): Promise<void> {
    const hid = this.auth.session()?.id;
    if (!this.usaQuarkus() || !hid) return;
    const r = await fetch(`${this.base}/api/legacy/perfil/color`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': String(hid) },
      body: JSON.stringify({ color }),
    });
    if (!r.ok) throw new Error(`No se pudo guardar el color (${r.status})`);
    this.colorGuardado.set(color);
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
