import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HelpdeskProfile, Session } from '../models/session';

const SESSION_KEY = 'fit-daily_session';

interface TeamMember { id: string; name?: string; role?: string; color?: string; }

/**
 * Autenticación contra el API del Helpdesk (vía proxy) + sesión local.
 * Porta js/helpdesk-auth.js y la lógica de sesión/permisos de js/app.js.
 * La sesión vive en localStorage 'fit-daily_session' (misma clave que el legacy).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Dev: helpdeskProxyUrl vacío → base relativa `/api/v1` (la reenvía el proxy del
  // dev server). Prod: URL del Cloudflare Worker.
  private readonly base = `${environment.helpdeskProxyUrl}/api/v1`;

  private readonly _session = signal<Session | null>(this.readSession());
  readonly session = this._session.asReadonly();

  readonly isAuthenticated = computed(() => !!this._session());
  readonly esMSC001       = computed(() => (this._session()?.id || '').trim().toUpperCase() === 'MSC001');
  readonly esSupervisor   = computed(() => (this._session()?.apiRole || '').trim().toUpperCase().includes('SUPERVISOR'));
  readonly esScrumMaster  = computed(() => this._session()?.role === 'Scrum Master');
  // Mi Panel (Sol): Scrum Master o MSC001 (≡ isHelpdesk del legacy)
  readonly puedeVerMiPanel = computed(() => this.esScrumMaster() || this.esMSC001());
  // Borrar board completo: solo MSC001
  readonly puedeBorrarBoard = computed(() => this.esMSC001());
  // Borrar / mover cualquier card: MSC001 o Supervisor
  readonly puedeGestionarTodo = computed(() => this.esMSC001() || this.esSupervisor());

  // ── Roles de PLATAFORMA (derivados de las Asignaciones del backend, por helpdesk_user_id) ──
  // Realiza el principio "los roles se definen en la plataforma, no por el rol del HelpDesk".
  private readonly _rolesPlataforma = signal<string[]>([]);
  readonly rolesPlataforma = this._rolesPlataforma.asReadonly();
  // MSC001 es admin de arranque (bootstrap) aunque el backend aún no haya respondido.
  readonly esAdminPlataforma = computed(() => this.esMSC001() || this._rolesPlataforma().includes('ADMIN'));
  readonly esResponsableEquipo = computed(() => this._rolesPlataforma().includes('RESPONSABLE_EQUIPO'));
  // Especialista: ejecutor nacional acotado; escala reasignaciones/transferencias por SOLICITUD.
  readonly esEspecialista = computed(() => this._rolesPlataforma().includes('ESPECIALISTA'));
  // Administración: disponible para ADMIN y RESPONSABLE_EQUIPO.
  readonly puedeAdministrar = computed(() => this.esAdminPlataforma() || this.esResponsableEquipo());
  // Enviar a otro equipo (transferir): RE o ADMIN. Bandeja de transferencias/solicitudes: idem.
  readonly puedeTransferir = computed(() => this.esAdminPlataforma() || this.esResponsableEquipo());
  // Asignar/modificar el rol ADMIN: SOLO ADMIN.
  readonly puedeAsignarAdmin = computed(() => this.esAdminPlataforma());

  get token(): string | null { return this._session()?.token ?? null; }

  private refreshTimer: ReturnType<typeof setTimeout> | null = null;
  private rolesPromise: Promise<void> | null = null;

  constructor() {
    // Mantiene la sesión viva sola: programa el refresh antes de que venza el
    // access_token (no hace falta dispararlo en cada acción).
    if (this._session()) {
      this.scheduleProactiveRefresh();
      void this.ensureRolesPlataforma();
    }
    // Si el navegador suspendió el timer con la pestaña en 2º plano, al volver
    // al foco re-evaluamos (refresca ya si está por vencer).
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.ensureFreshSoon();
      });
    }
  }

  /** `exp` (epoch en segundos) del JWT, o null si no se puede leer. */
  private jwtExp(token: string): number | null {
    try {
      const part = token.split('.')[1];
      if (!part) return null;
      const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
      const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
      const payload = JSON.parse(atob(padded));
      return typeof payload.exp === 'number' ? payload.exp : null;
    } catch {
      return null;
    }
  }

  /** Cadencia del refresh proactivo: cada 20 min. */
  private static readonly REFRESH_EVERY_MS = 20 * 60 * 1000;

  /**
   * Programa el refresh cada 20 min. Si el access_token venciera antes de esos
   * 20 min, lo adelanta a ~30 s antes de vencer para no perder la sesión (si el
   * token dura ≥20 min, en la práctica es exactamente cada 20). Tras cada refresh
   * se reprograma con el token nuevo (rotado).
   */
  private scheduleProactiveRefresh(): void {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
    if (!this.token) return;
    const exp = this.jwtExp(this.token);
    const untilExp = exp ? exp * 1000 - Date.now() - 30_000 : Infinity;
    const ms = Math.max(Math.min(AuthService.REFRESH_EVERY_MS, untilExp), 5_000);
    this.refreshTimer = setTimeout(() => this.refreshSession(), ms);
  }

  /** Tras volver al foco: refresca ya si está por vencer; si no, reprograma los 20 min. */
  private ensureFreshSoon(): void {
    const exp = this.token ? this.jwtExp(this.token) : null;
    if (exp && exp * 1000 - Date.now() < 60_000) this.refreshSession();
    else this.scheduleProactiveRefresh();
  }

  private readSession(): Session | null {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  }

  /** Login: POST /auth/login → access_token; luego GET /users/me → perfil. */
  async login(usernameOrEmail: string, password: string): Promise<Session> {
    const r = await fetch(`${this.base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username_or_email: usernameOrEmail, password, force_logout: 'true' }),
    });
    if (!r.ok) throw new Error(`Login fallido (${r.status}): ${await r.text()}`);
    const { access_token, refresh_token } = await r.json();

    const me = await fetch(`${this.base}/users/me`, { headers: { Authorization: `Bearer ${access_token}` } });
    if (!me.ok) throw new Error(`No se pudo cargar el perfil (${me.status})`);
    const profile: HelpdeskProfile = await me.json();

    const local = await this.lookupTeam(profile.user_id);
    const session: Session = {
      id: profile.user_id,
      name: local?.name || profile.person_name || profile.person_alias || profile.user_id,
      role: local?.role || profile.role_description || 'Usuario',
      apiRole: profile.role_description || '',
      color: local?.color || this.colorFor(profile.user_id),
      email: profile.email || '',
      token: access_token,
      refreshToken: refresh_token || '',
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this._session.set(session);
    this.scheduleProactiveRefresh();
    this.rolesPromise = this.cargarRolesPlataforma(); // recargar roles del nuevo usuario
    return session;
  }

  /**
   * Carga (una vez) los roles de plataforma del usuario logueado desde el backend.
   * El guard de admin la espera antes de decidir. Solo aplica en modo Quarkus.
   */
  ensureRolesPlataforma(): Promise<void> {
    return (this.rolesPromise ??= this.cargarRolesPlataforma());
  }

  private async cargarRolesPlataforma(): Promise<void> {
    const hid = this._session()?.id;
    if (!hid || environment.dataBackend !== 'quarkus') { this._rolesPlataforma.set([]); return; }
    try {
      const r = await fetch(`${environment.quarkusApiUrl}/api/admin/mis-roles/${encodeURIComponent(hid)}`);
      this._rolesPlataforma.set(r.ok ? await r.json() : []);
    } catch {
      this._rolesPlataforma.set([]);
    }
  }

  /** Logout: notifica al server (best-effort) y limpia la sesión local. */
  async logout(): Promise<void> {
    const t = this.token;
    if (t) {
      try { await fetch(`${this.base}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${t}` } }); }
      catch { /* ignore */ }
    }
    this.clearSession();
  }

  /** Limpia la sesión (lo usa el interceptor en 401/403). */
  clearSession(): void {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    this.refreshTimer = null;
    localStorage.removeItem(SESSION_KEY);
    this._session.set(null);
    this._rolesPlataforma.set([]);
    this.rolesPromise = null;
  }

  private refreshPromise: Promise<string | null> | null = null;

  /**
   * Renueva el access_token con el refresh_token (POST /auth/refresh). Las llamadas
   * concurrentes comparten la misma petición (dedupe), así varios 401 simultáneos
   * disparan un solo refresh. Devuelve el nuevo access_token, o null si el
   * refresh_token venció/falta (→ hay que volver a iniciar sesión).
   */
  refreshSession(): Promise<string | null> {
    return (this.refreshPromise ??= this.doRefresh().finally(() => (this.refreshPromise = null)));
  }

  private async doRefresh(): Promise<string | null> {
    const rt = this._session()?.refreshToken;
    if (!rt) return null;
    try {
      const r = await fetch(`${this.base}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: rt }),
      });
      if (!r.ok) return null;
      const data = await r.json();
      const access: string | undefined = data?.access_token;
      const cur = this._session();
      if (!access || !cur) return null;
      // El API rota el refresh_token: si trae uno nuevo lo guardamos, si no, mantenemos el actual.
      const next: Session = { ...cur, token: access, refreshToken: data.refresh_token || rt };
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      this._session.set(next);
      this.scheduleProactiveRefresh(); // reprograma el siguiente refresh con el token nuevo
      return access;
    } catch {
      return null;
    }
  }

  /**
   * Verifica que la sesión siga válida contra el API (GET /users/me). Si el
   * access_token venció (401) intenta renovarlo con el refresh_token; solo si eso
   * falla (o es 403) limpia la sesión y devuelve false. Ante errores de red devuelve
   * true (no podemos afirmar que expiró). Útil antes de abrir vistas que dependen
   * del API (p. ej. la conversación de un ticket).
   */
  async verifySession(): Promise<boolean> {
    const t = this.token;
    if (!t) return false;
    try {
      const r = await fetch(`${this.base}/users/me`, { headers: { Authorization: `Bearer ${t}` } });
      if (r.status === 401 || r.status === 403) {
        // access_token vencido: intentar renovarlo con el refresh_token antes de rendirse.
        if (r.status === 401 && (await this.refreshSession())) return true;
        this.clearSession();
        return false;
      }
      return true;
    } catch {
      return true; // sin red: no forzar logout
    }
  }

  // Enriquecimiento con el equipo local (data/users.json) — color/rol del proyecto.
  private async lookupTeam(userId: string): Promise<TeamMember | null> {
    try {
      const r = await fetch('data/users.json');
      if (!r.ok) return null;
      const data = await r.json();
      return (data.users || []).find((u: TeamMember) => u.id === userId) || null;
    } catch { return null; }
  }

  // Color HSL estable a partir del user_id (mismo algoritmo que login.html).
  private colorFor(userId: string): string {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    return `hsl(${Math.abs(hash) % 360}, 55%, 45%)`;
  }
}
