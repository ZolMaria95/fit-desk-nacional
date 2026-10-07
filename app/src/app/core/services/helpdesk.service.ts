import { esEstadoFinalizado } from '../helpdesk-estados';
import { HttpClient, HttpContext, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { HD_SAFE } from '../interceptors/helpdesk-auth.interceptor';
import { AuthService } from './auth.service';
import { DataService, Story } from './data.service';
import {
  Ticket,
  applyMessages,
  clasificar,
  evaluarFechas,
  mapTicket,
  ticketAttachIds,
} from '../../features/tickets/ticket-utils';

const HD_USERS_LS_KEY = 'fit-daily_hd_users';
const HD_ROLES_LS_KEY = 'fit-daily_hd_roles';

/**
 * Codec de form-urlencoded que percent-codifica TODO el valor. El codec por
 * defecto de Angular deja crudos `; = + : / , ? $ @`: si el `detail` del mensaje
 * lleva HTML/CSS (p. ej. `color: red; font-weight: bold;`), esos `;` y `=` el
 * API los lee como separadores de parámetros y parte el mensaje (se publicaba
 * vacío o solo la primera palabra). Con encodeURIComponent el valor viaja íntegro.
 */
class FullEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string { return encodeURIComponent(k); }
  encodeValue(v: string): string { return encodeURIComponent(v); }
  decodeKey(k: string): string { return decodeURIComponent(k); }
  decodeValue(v: string): string { return decodeURIComponent(v); }
}
const FORM_CODEC = new FullEncodingCodec();

/** Nombre real del archivo desde el header Content-Disposition (p. ej. `adjunto_27732_6.pdf`). */
function attachFilename(cd: string | null): string {
  if (!cd) return '';
  const star = /filename\*=(?:UTF-8'')?([^;]+)/i.exec(cd);
  if (star) { try { return decodeURIComponent(star[1].trim().replace(/^"|"$/g, '')); } catch { return star[1].trim(); } }
  const plain = /filename="?([^";]+)"?/i.exec(cd);
  return plain ? plain[1].trim() : '';
}

// Seed de empleados conocidos del Helpdesk. Solo es el fallback offline: la
// fuente real es la consulta al catálogo de usuarios del API (/users/catalog).
const EMPLEADOS = [
  'JPHP001', 'VINC001', 'MSC001', 'FSGC001', 'ORLR001',
  'KIMA001', 'KDLS001', 'BMHJ001', 'DSGS001', 'JCEO001', 'CUC001', 'JFQV001',
];

// Roles de empleado asignable. Se filtra SOLO por role_description: client_id /
// client_description NO sirven (los empleados internos de Soft Warehouse los
// tienen apuntando a su propia empresa y no son clientes).
const ROLES_EMPLEADO = ['SOPORTE', 'ADMINISTRADOR', 'SUPERVISOR'];

export interface HdUser {
  id: string;
  name: string;
  role: string;
}

export interface HdClient {
  id: string;
  name: string;
}

/** Ítem de un catálogo del HelpDesk (módulos = subsystems, tipos de ticket). */
export interface CatalogoItem {
  id: string;
  nombre: string;
}

/** Campo del API del HelpDesk → campos del `Ticket` en memoria que lo reflejan. */
const CAMPO_A_TICKET: Record<string, (keyof Ticket)[]> = {
  subsystem_id: ['moduloId', 'modulo'],
  ticket_type_id: ['tipoId', 'tipo'],
  priority: ['orden'],
  incidence: ['incidencia'],
  subject: ['asunto'],
};

/** Mensaje real de un error de escritura (HelpDesk o backend propio), con respaldo legible. */
function errorDelApi(e: any, porDefecto: string): string {
  const body = e?.error;
  const msg = body?.error?.message || body?.message || (typeof body === 'string' ? body : '');
  if (msg) return String(msg);
  const st = Number(e?.status ?? 0);
  if (!st) return 'No se pudo conectar con el servidor.';
  if (st === 401) return 'Tu sesión expiró. Vuelve a iniciar sesión.';
  if (st === 403) return 'No tienes permiso para esta acción.';
  return porDefecto;
}

/**
 * Mensaje de error a partir del ESTADO HTTP, no del texto. La regla anterior hacía
 * `/fetch|failed|network|0/.test(err.message)` y ese `0` casaba con CUALQUIER estado
 * que lo contuviera (401, 403, 500…): una sesión vencida se anunciaba como "No se
 * pudo conectar al API", que despistaba (parecía caída del servidor y no relogueo).
 * `status` 0/ausente = no hubo respuesta: red caída, CORS o servidor inalcanzable.
 */
function mensajeError(err: any): string {
  const st = Number(err?.status ?? 0);
  if (!st) return 'No se pudo conectar al API.';
  if (st === 401) return 'Tu sesión expiró. Vuelve a iniciar sesión.';
  if (st === 403) return 'No tienes permiso para ver estos tickets.';
  if (st >= 500) return `El servidor falló (HTTP ${st}). Vuelve a intentar.`;
  return `Error HTTP ${st}.`;
}

/** Filtros server-side de la consulta de tickets (los acepta el API). */
export interface TicketFilters {
  clientIds?: string[];
  statusId?: string;
  /** Lista de estados a incluir (p. ej. todos los NO finalizados). Va como
   *  `ticket_status_id=1,2,3` — misma forma de lista por comas que `client_id`. */
  statusIds?: string[];
  assignedUserId?: string;
  /** Tipo de ticket (`ticket_type_id`, p. ej. 001=INCIDENCIA). '' = todos. */
  typeId?: string;
}

const HD_CLIENTS_LS_KEY = 'fit-daily_hd_clients';
const HD_STATUS_LS_KEY = 'fit-daily_hd_statuses';

/**
 * Cliente del API del Helpdesk (vía proxy). El Bearer y el manejo de 401/403 lo
 * añade helpdeskAuthInterceptor. El port completo de js/helpdesk-panel.js (sync,
 * tickets, mensajes, adjuntos) llega en la Fase 2.
 */
@Injectable({ providedIn: 'root' })
export class HelpdeskService {
  private readonly http = inject(HttpClient);
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly snack = inject(MatSnackBar);
  // Dev: helpdeskProxyUrl vacío → base relativa `/api/v1` (la reenvía el proxy del
  // dev server). Prod: URL del Cloudflare Worker.
  readonly base = `${environment.helpdeskProxyUrl}/api/v1`;

  private roles: Record<string, string> = this.readRoles();

  /** Empleados del Helpdesk (signal). Arranca con cache/semilla y se enriquece
   *  con la consulta al API. Sirve para el dropdown de asignados y los avatares. */
  private readonly _users = signal<HdUser[]>(this.seedUsers());
  readonly hdUsers = this._users.asReadonly();

  private loadPromise: Promise<HdUser[]> | null = null;
  private usersLoaded = false; // ¿el catálogo se cargó del API con éxito?
  private usersRetries = 0; // reintentos automáticos en background tras un fallo

  /** Clientes del Helpdesk (signal). Arranca con el cache de localStorage y se
   *  llena con la consulta al API. Alimenta el campo Cliente del modal y resuelve
   *  el nombre/color de cliente en las cards del board. */
  private readonly _clients = signal<HdClient[]>(this.seedClients());
  readonly clients = this._clients.asReadonly();
  private clientsPromise: Promise<HdClient[]> | null = null;
  private clientsLoaded = false; // ¿el catálogo de clientes se cargó del API con éxito?
  private clientsRetries = 0;

  // ── Tickets ──
  // `loadFiltered` consulta UNA página filtrada server-side (client_id /
  // ticket_status_id / assigned_user_id) y deja `_tickets` = esa página + `_total`
  // (para paginar bien). `loadAll`/`loadMore` traen el panorama amplio sin filtro
  // (los usan Mi Panel y la tab Estadísticas). SIN mensajes (se piden al abrir la
  // conversación). Los refinamientos derivados (operativos) los hace el componente.
  private static readonly PAGE_SIZE = 12;
  private readonly _tickets = signal<Ticket[]>([]);
  readonly tickets = this._tickets.asReadonly();
  /** Pulso de la ÚLTIMA mutación CONFIRMADA de un ticket (estado o asignado). El Board lo
   *  observa para reconciliar esa tarjeta al instante (moverla de columna / cambiar el asignado)
   *  sin esperar el sync completo. Regla de oro: solo se emite tras confirmar la escritura al API. */
  private readonly _ticketMutado = signal<{
    ticket: string;
    estado?: string;
    asignadoId?: string;
    asignadoName?: string;
    /** El ticket se ELIMINÓ del HelpDesk (y su tarea espejo): las vistas lo quitan. */
    eliminado?: boolean;
    at: number;
  } | null>(null);
  readonly ticketMutado = this._ticketMutado.asReadonly();
  private readonly _total = signal(0);
  readonly total = this._total.asReadonly(); // total server-side de la consulta actual
  readonly loading = signal(false);
  readonly hasMore = signal(false);
  readonly status = signal<{ msg: string; type: 'idle' | 'loading' | 'ok' | 'error' }>({ msg: '', type: 'idle' });
  private offset = 0;

  /** Perfil del usuario en sesión. */
  me() {
    return this.http.get(`${this.base}/users/me`);
  }

  /**
   * Lista de empleados asignables del Helpdesk. Consulta INDEPENDIENTE al
   * endpoint de usuarios del API (no depende del sync de tickets) y cachea el
   * resultado en memoria + localStorage para próximas aperturas. Port de
   * _tryFetchAllHdUsers + getHdUsers de js/helpdesk-panel.js.
   */
  getHdUsers(): Promise<HdUser[]> {
    if (this.usersLoaded) return Promise.resolve(this._users());
    return (this.loadPromise ??= this.fetchAll().finally(() => {
      // Si el catálogo NO se cargó del API (timing del token / red), NO cacheamos
      // el fallo: liberamos la promesa para que el próximo init reintente, y
      // programamos un reintento en background (acotado). hdUsers es signal, así
      // que al cargar finalmente los nombres se actualizan solos.
      if (!this.usersLoaded) {
        this.loadPromise = null;
        if (this.usersRetries++ < 3) setTimeout(() => this.getHdUsers(), 4000);
      }
    }));
  }

  private async fetchAll(): Promise<HdUser[]> {
    // /users/catalog es el catálogo de usuarios asignables que usa el Helpdesk web
    // (la cuenta sí tiene permiso, a diferencia de /users que devuelve 403).
    const endpoints = ['/users/catalog', '/users', '/users/', '/users/list', '/users/all', '/employees'];
    for (const ep of endpoints) {
      try {
        const data = await firstValueFrom(
          this.http.get<any>(`${this.base}${ep}`, { context: new HttpContext().set(HD_SAFE, true) }),
        );
        const items: any[] = Array.isArray(data) ? data : data?.items || data?.data || data?.users || data?.results || [];
        if (!items.length) continue;

        // La lista la define el API: solo empleados con rol asignable.
        const map = new Map<string, string>();
        for (const u of items) {
          const id = String(u.user_id || u.id || u.username || '').trim().toUpperCase();
          if (!id || u.user_status === false) continue; // sin id o inactivo
          // Incluir por rol (SOPORTE / ADMINISTRADOR / SUPERVISOR), sin mirar client_*:
          // los empleados internos de Soft Warehouse tienen client_id/client_description llenos.
          const roleRaw = String(u.role_description || u.role || '').trim();
          if (!ROLES_EMPLEADO.some((r) => roleRaw.toUpperCase().includes(r))) continue;

          const name = String(
            u.person_name || u.full_name || u.name || u.display_name || u.person_alias || u.username || id,
          ).trim();
          this.roles[id] = roleRaw;
          const prev = map.get(id);
          if (name && (!prev || prev === id)) map.set(id, name);
          else if (!prev) map.set(id, id);
        }
        // Este endpoint no trajo empleados con rol → probar el siguiente.
        if (!map.size) continue;

        const users = [...map.entries()]
          .map(([id, name]) => ({ id, name, role: this.roles[id] || '' }))
          .sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id, 'es'));

        this.saveRoles();
        this._users.set(users);
        this.saveUsers(users);
        this.usersLoaded = true; // carga real del API → ya no reintenta
        return users;
      } catch {
        /* prueba el siguiente endpoint */
      }
    }
    // Ningún endpoint respondió (proxy caído / sin permiso): queda el cache/semilla.
    return this._users();
  }

  /**
   * Catálogo completo de clientes del Helpdesk. Consulta al API (por analogía con
   * /users/catalog) y cachea en memoria + localStorage. Es la fuente del campo
   * Cliente del modal; el legacy usaba un JSON local estático de 14 clientes.
   */
  getClients(): Promise<HdClient[]> {
    if (this.clientsLoaded) return Promise.resolve(this._clients());
    return (this.clientsPromise ??= this.fetchAllClients().finally(() => {
      // Igual que getHdUsers: no cachear el fallo; reintentar (init + background).
      if (!this.clientsLoaded) {
        this.clientsPromise = null;
        if (this.clientsRetries++ < 3) setTimeout(() => this.getClients(), 4000);
      }
    }));
  }

  private async fetchAllClients(): Promise<HdClient[]> {
    const endpoints = ['/clients/catalog', '/clients', '/clients/', '/clients/list', '/clients/all', '/companies'];
    for (const ep of endpoints) {
      try {
        const data = await firstValueFrom(
          this.http.get<any>(`${this.base}${ep}`, { context: new HttpContext().set(HD_SAFE, true) }),
        );
        const items: any[] = Array.isArray(data) ? data : data?.items || data?.data || data?.clients || data?.results || [];
        if (!items.length) continue;

        const map = new Map<string, string>();
        for (const c of items) {
          const id = String(c.client_id ?? c.id ?? c.code ?? '').trim();
          if (!id) continue;
          if (c.client_status === false || c.status === false) continue; // inactivo
          const name = String(
            c.client_description || c.description || c.name || c.razon_social || c.business_name || id,
          ).trim();
          if (!map.has(id)) map.set(id, name);
        }
        if (!map.size) continue;

        const clients = [...map.entries()]
          .map(([id, name]) => ({ id, name }))
          .sort((a, b) => a.name.localeCompare(b.name, 'es'));
        this._clients.set(clients);
        this.saveClients(clients);
        this.clientsLoaded = true; // carga real del API → ya no reintenta
        return clients;
      } catch {
        /* prueba el siguiente endpoint */
      }
    }
    return this._clients();
  }

  // ── Tickets: carga paginada, mensajes, adjuntos, envío ────────────────
  private setStatus(msg: string, type: 'idle' | 'loading' | 'ok' | 'error'): void {
    this.status.set({ msg, type });
  }

  private async fetchPage(offset: number, limit = 40): Promise<any[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<any>(`${this.base}/tickets/tickets?limit=${limit}&offset=${offset}&modified_date_order=desc`),
      );
      return data?.items || [];
    } catch {
      return [];
    }
  }

  /** (Re)inicia la carga: limpia el pool y trae la primera página (12). Botón
   *  "refrescar" y auto-consulta al entrar a Tickets. */
  async refresh(): Promise<void> {
    this._tickets.set([]);
    this.offset = 0;
    this.hasMore.set(false);
    await this.loadMore();
  }

  /** Trae la siguiente página (PAGE_SIZE tickets, SIN mensajes) y la agrega. */
  async loadMore(): Promise<void> {
    if (this.loading()) return;
    this.loading.set(true);
    const offset = this.offset;
    this.setStatus('Cargando tickets...', 'loading');
    try {
      const raw = await this.fetchPage(offset, HelpdeskService.PAGE_SIZE);
      // Sin mensajes: evaluarFechas/clasificar usan las señales no-mensaje.
      const nuevos = raw.map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set([...this._tickets(), ...nuevos]);
      this.offset = offset + HelpdeskService.PAGE_SIZE;
      this.hasMore.set(raw.length === HelpdeskService.PAGE_SIZE);
      const total = this._tickets().length;
      this.setStatus(this.hasMore() ? `${total} tickets cargados` : `✓ ${total} tickets`, 'ok');
    } catch (err: any) {
      this.setStatus(mensajeError(err), 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /** Carga un set amplio en paralelo (6 páginas de 40, SIN mensajes) en el pool.
   *  Para dashboards que necesitan el panorama completo (p. ej. Mi Panel). */
  async loadAll(): Promise<void> {
    if (this.loading()) return;
    this.loading.set(true);
    this.setStatus('Cargando tickets...', 'loading');
    try {
      const SIZE = 40;
      const offsets = [0, 40, 80, 120, 160, 200];
      const pages = await Promise.all(offsets.map((o) => this.fetchPage(o, SIZE)));
      const raw = pages.flat();
      const tickets = raw.map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set(tickets);
      this.offset = offsets.length * SIZE;
      this.hasMore.set(pages[pages.length - 1].length === SIZE);
      this.setStatus(`✓ ${tickets.length} tickets`, 'ok');
    } catch (err: any) {
      this.setStatus(mensajeError(err), 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Consulta UNA página de tickets filtrada server-side (client_id /
   * ticket_status_id / assigned_user_id) y la deja como resultado actual + `total`
   * (para paginar). Esta es la consulta de la vista Tickets: el filtro va EN la
   * petición al API, no se trae todo para filtrar en el navegador.
   */
  async loadFiltered(
    f: TicketFilters,
    pageIndex: number,
    pageSize: number,
    sort: { field: string; dir: 'asc' | 'desc' } = { field: 'modified_date', dir: 'desc' },
  ): Promise<void> {
    if (this.loading()) return;
    this.loading.set(true);
    this.setStatus('Cargando tickets...', 'loading');
    try {
      let params = new HttpParams()
        .set('limit', String(pageSize))
        .set('offset', String(pageIndex * pageSize))
        // El API ordena por `<campo>_order=asc|desc` (p. ej. modified_date_order).
        .set(`${sort.field}_order`, sort.dir);
      params = this.conFiltros(params, f);
      const data = await firstValueFrom(this.http.get<any>(`${this.base}/tickets/tickets`, { params }));
      const items: Ticket[] = (data?.items || []).map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set(items);
      this.reconciliarAsignados(items.map((t) => ({ ticket: t.ticket, asignado: t.usuarioAsignado })));
      this._total.set(Number(data?.total ?? items.length));
      this.hasMore.set((pageIndex + 1) * pageSize < this._total());
      // El total es el universo del API (paginado); items.length es lo realmente traído.
      this.setStatus(`✓ ${items.length} cargados de ${this._total()} del sistema`, 'ok');
    } catch (err: any) {
      this.setStatus(mensajeError(err), 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Una página de tickets ordenada por GRUPOS de estado (orden personal de estados): primero todos los del
   * grupo 1, luego los del 2… y dentro de cada grupo por modificación desc. Cada grupo es una consulta
   * server-side (`ticket_status_id` = sus estados ∩ los del filtro), así la paginación es exacta y sin
   * tope: 1) se pide el `total` de cada grupo (limit=1, en paralelo); 2) se traen solo los tramos de los
   * grupos que caen en la página. `f.statusIds` = estados permitidos (la pestaña o el filtro Estatus).
   */
  async loadPorGrupos(f: TicketFilters, grupos: string[][], pageIndex: number, pageSize: number): Promise<void> {
    if (this.loading()) return;
    this.loading.set(true);
    this.setStatus('Cargando tickets...', 'loading');
    try {
      const permitidos = f.statusIds?.length ? new Set(f.statusIds) : null;
      const gs = grupos
        .map((g) => (permitidos ? g.filter((id) => permitidos.has(id)) : g))
        .filter((g) => g.length);
      const fetchGrupo = (g: string[], limit: number, offset: number) => {
        const p = new HttpParams()
          .set('limit', String(limit))
          .set('offset', String(offset))
          .set('modified_date_order', 'desc');
        return firstValueFrom(
          this.http.get<any>(`${this.base}/tickets/tickets`, { params: this.conFiltros(p, { ...f, statusIds: g, statusId: undefined }) }),
        );
      };
      const totales = (await Promise.all(gs.map((g) => fetchGrupo(g, 1, 0)))).map((d) => Number(d?.total ?? 0));
      const total = totales.reduce((a, b) => a + b, 0);
      // Tramos de la página: offset global → (grupo, offset dentro del grupo, cuántos).
      let saltar = pageIndex * pageSize;
      let faltan = pageSize;
      const tramos: { g: string[]; offset: number; limit: number }[] = [];
      gs.forEach((g, i) => {
        if (faltan <= 0) return;
        if (saltar >= totales[i]) { saltar -= totales[i]; return; }
        const limit = Math.min(faltan, totales[i] - saltar);
        tramos.push({ g, offset: saltar, limit });
        faltan -= limit;
        saltar = 0;
      });
      const datos = await Promise.all(tramos.map((t) => fetchGrupo(t.g, t.limit, t.offset)));
      const items: Ticket[] = datos
        .flatMap((d) => d?.items || [])
        .map(mapTicket)
        .map(evaluarFechas)
        .map(clasificar);
      this._tickets.set(items);
      this.reconciliarAsignados(items.map((t) => ({ ticket: t.ticket, asignado: t.usuarioAsignado })));
      this._total.set(total);
      this.hasMore.set((pageIndex + 1) * pageSize < total);
      this.setStatus(`✓ ${items.length} cargados de ${total} del sistema`, 'ok');
    } catch (err: any) {
      this.setStatus(mensajeError(err), 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /** Filtros server-side comunes a `/tickets/tickets` y `/tickets/tickets/search` (el search acepta
   *  los mismos parámetros, verificado 2026-09-28). Multi-cliente y multi-estado van como LISTA
   *  separada por comas en un solo parámetro (repetirlo NO sirve: el API se queda con uno). */
  private conFiltros(p: HttpParams, f: TicketFilters): HttpParams {
    if (f.clientIds?.length) p = p.set('client_id', f.clientIds.join(','));
    if (f.statusId) p = p.set('ticket_status_id', f.statusId);
    else if (f.statusIds?.length) p = p.set('ticket_status_id', f.statusIds.join(','));
    if (f.assignedUserId) p = p.set('assigned_user_id', f.assignedUserId);
    if (f.typeId) p = p.set('ticket_type_id', f.typeId);
    return p;
  }

  /** Fetch SIN efectos de la 1ª página de tickets de un conjunto de clientes, ordenada por
   *  modificación desc. Para el poller de "nuevos tickets del equipo": NO toca `_tickets`/
   *  `_total` (no interfiere con la vista de Tickets). Best-effort: si falla, devuelve []. */
  async fetchEquipo(clientIds: string[], limit = 30): Promise<Ticket[]> {
    if (!clientIds.length) return [];
    return this.fetchPaginaSinEfectos(new HttpParams().set('client_id', clientIds.join(',')), limit);
  }

  /** Igual que `fetchEquipo` pero por ASIGNADO: la 1ª página de los tickets de una persona.
   *  La alerta de novedades avisa al consultor de SUS tickets, dirija o no algún equipo. */
  async fetchAsignados(hid: string, limit = 30): Promise<Ticket[]> {
    if (!hid?.trim()) return [];
    return this.fetchPaginaSinEfectos(new HttpParams().set('assigned_user_id', hid.trim()), limit);
  }

  /** Base común: 1 página ordenada por modificación desc, SIN tocar `_tickets`/`_total`. */
  private async fetchPaginaSinEfectos(filtro: HttpParams, limit: number): Promise<Ticket[]> {
    try {
      let params = filtro.set('limit', String(limit)).set('offset', '0').set('modified_date_order', 'desc');
      const data = await firstValueFrom(this.http.get<any>(`${this.base}/tickets/tickets`, { params }));
      return (data?.items || []).map(mapTicket).map(evaluarFechas).map(clasificar);
    } catch {
      return [];
    }
  }

  /**
   * Carga TODAS las páginas de un filtro server-side y las deja en `_tickets`. Se usa
   * cuando hay que refinar en el cliente algo que el API NO expresa (p. ej. "sin
   * asignar": el API solo filtra por UN asignado, no por "ninguno"). Trae la 1ª página
   * (para saber el `total`) y baja el resto EN PARALELO por lotes; así la vista puede
   * filtrar y paginar client-side con conteo correcto. `pageSize` del API tope = 100.
   */
  async loadAllFiltered(
    f: TicketFilters,
    sort: { field: string; dir: 'asc' | 'desc' } = { field: 'modified_date', dir: 'desc' },
  ): Promise<void> {
    if (this.loading()) return;
    this.loading.set(true);
    this.setStatus('Cargando tickets del equipo…', 'loading');
    try {
      const LIMIT = 100; // tope del API (200+ → 422)
      const build = (offset: number) => {
        const p = new HttpParams().set('limit', String(LIMIT)).set('offset', String(offset)).set(`${sort.field}_order`, sort.dir);
        return this.conFiltros(p, f);
      };
      const fetchPage = (offset: number) =>
        firstValueFrom(this.http.get<any>(`${this.base}/tickets/tickets`, { params: build(offset) }));

      const first = await fetchPage(0);
      const total = Number(first?.total ?? 0);
      const raw: any[] = [...(first?.items || [])];
      // Cap defensivo (no bajar cantidades absurdas si el filtro trajera demasiado).
      const pages = Math.min(Math.ceil(total / LIMIT), 40); // 40*100 = 4000 tope
      for (let start = 1; start < pages; start += 5) {
        const batch: Promise<any>[] = [];
        for (let pg = start; pg < Math.min(start + 5, pages); pg++) batch.push(fetchPage(pg * LIMIT));
        (await Promise.all(batch)).forEach((d) => raw.push(...(d?.items || [])));
      }
      const items: Ticket[] = raw.map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set(items);
      this.reconciliarAsignados(items.map((t) => ({ ticket: t.ticket, asignado: t.usuarioAsignado })));
      this._total.set(total);
      this.hasMore.set(false);
      this.setStatus(`✓ ${items.length} cargados de ${total} del equipo`, 'ok');
    } catch (err: any) {
      this.setStatus(mensajeError(err), 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Búsqueda por texto libre: consulta `/tickets/tickets/search?q=…` (el API busca la
   * palabra en el contenido del ticket) y deja la página como resultado actual +
   * `total`, EXACTAMENTE igual que `loadFiltered` → la vista y la paginación
   * server-side funcionan sin cambios. `f` acota la búsqueda (cliente, estatus, asignado, tipo) en
   * la MISMA consulta; sin filtros es global. El orden va como `<campo>_order` (mismo esquema que el listado).
   */
  async searchTickets(
    q: string,
    pageIndex: number,
    pageSize: number,
    sort: { field: string; dir: 'asc' | 'desc' } = { field: 'modified_date', dir: 'desc' },
    f: TicketFilters = {},
  ): Promise<void> {
    const term = q.trim();
    if (!term || this.loading()) return;
    this.loading.set(true);
    this.setStatus(`Buscando "${term}"...`, 'loading');
    try {
      const params = this.conFiltros(
        new HttpParams()
          .set('q', term)
          .set('limit', String(pageSize))
          .set('offset', String(pageIndex * pageSize))
          .set(`${sort.field}_order`, sort.dir),
        f,
      );
      const data = await firstValueFrom(this.http.get<any>(`${this.base}/tickets/tickets/search`, { params }));
      const items: Ticket[] = (data?.items || []).map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set(items);
      this.reconciliarAsignados(items.map((t) => ({ ticket: t.ticket, asignado: t.usuarioAsignado })));
      this._total.set(Number(data?.total ?? items.length));
      this.hasMore.set((pageIndex + 1) * pageSize < this._total());
      this.setStatus(`✓ ${items.length} de ${this._total()} coinciden con "${term}"`, 'ok');
    } catch (err: any) {
      this.setStatus(mensajeError(err), 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Números de ticket que coinciden con una búsqueda por texto. Para el board: filtrar las cards
   * cuyo ticket coincide con el HelpDesk (opcionalmente acotado a `clientIds`). NO toca las señales
   * de la lista (`_tickets`/`_total`).
   * Recorre TODAS las páginas (100 por consulta, tope del API; en paralelo por lotes) hasta `cap`:
   * antes se detenía en 300 y, con palabras comunes (p. ej. "credito" ≈ 1500 tickets), las tarjetas
   * del tablero cuyo ticket caía más allá de esas 300 no aparecían.
   */
  async searchTicketNumbers(q: string, cap = 3000, clientIds: string[] = []): Promise<Set<string>> {
    const term = q.trim();
    const numbers = new Set<string>();
    if (!term) return numbers;
    const LIMIT = 100;
    const fetchPage = (offset: number) =>
      firstValueFrom(
        this.http.get<any>(`${this.base}/tickets/tickets/search`, {
          params: this.conFiltros(
            new HttpParams().set('q', term).set('limit', String(LIMIT)).set('offset', String(offset)),
            { clientIds },
          ),
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
    const add = (data: any) => {
      for (const it of data?.items || []) {
        const id = String(it.ticket_id ?? '').trim();
        if (id) numbers.add(id);
      }
    };
    try {
      const first = await fetchPage(0);
      add(first);
      const total = Math.min(Number(first?.total ?? 0), cap);
      const offsets: number[] = [];
      for (let o = LIMIT; o < total; o += LIMIT) offsets.push(o);
      for (let k = 0; k < offsets.length; k += 5) {
        (await Promise.all(offsets.slice(k, k + 5).map(fetchPage))).forEach(add);
      }
    } catch {
      /* devuelve lo acumulado hasta el fallo */
    }
    return numbers;
  }

  /** Mensajes crudos de un ticket. */
  async fetchMessages(ticketId: string): Promise<any[]> {
    try {
      const data = await firstValueFrom(
        this.http.get<any>(`${this.base}/tickets/${ticketId}/messages?limit=50`, {
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
      return Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.messages)
            ? data.messages
            : Array.isArray(data?.data)
              ? data.data
              : [];
    } catch {
      return [];
    }
  }

  /** Ticket crudo completo (para adjuntos a nivel ticket que el listado no trae). */
  async fetchTicketRaw(ticketId: string): Promise<any> {
    try {
      const raw = await firstValueFrom(
        this.http.get<any>(`${this.base}/tickets/tickets/${ticketId}`, { context: new HttpContext().set(HD_SAFE, true) }),
      );
      return Array.isArray(raw) ? raw[0] : raw?.item || raw?.data || raw;
    } catch {
      return null;
    }
  }

  /** Busca un ticket por número directamente en el API (no estaba en memoria). */
  async searchTicketRemote(ticketId: string): Promise<Ticket | null> {
    try {
      const raw = await firstValueFrom(
        this.http.get<any>(`${this.base}/tickets/tickets/${ticketId}`, { context: new HttpContext().set(HD_SAFE, true) }),
      );
      const data = Array.isArray(raw) ? raw[0] : raw?.item || raw?.data || raw;
      if (!data || !data.ticket_id) return null;
      const t = clasificar(evaluarFechas(mapTicket(data)));
      this.reconciliarAsignados([{ ticket: t.ticket, asignado: t.usuarioAsignado }]);
      applyMessages(t, await this.fetchMessages(t.ticket));
      evaluarFechas(t);
      clasificar(t);
      return t;
    } catch {
      return null;
    }
  }

  /** URL blob (con auth) de un adjunto, para `<img>` embebidas. */
  async attachmentUrl(attachId: string): Promise<string | null> {
    try {
      const blob = await firstValueFrom(
        this.http.get(`${this.base}/attachments/${attachId}`, {
          responseType: 'blob',
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }

  /**
   * Blob URL + nombre real + tipo MIME de un adjunto, para descargarlo.
   * `filename` sale de `Content-Disposition`; en cross-origin (Pages→Render) ese header
   * puede no ser legible si el backend no lo expone, por eso también devolvemos `type`
   * (el Content-Type del blob, SÍ legible) para deducir la extensión como respaldo.
   */
  async fetchAttachment(attachId: string): Promise<{ url: string; filename: string; type: string } | null> {
    try {
      const resp = await firstValueFrom(
        this.http.get(`${this.base}/attachments/${attachId}`, {
          responseType: 'blob',
          observe: 'response',
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
      if (!resp.body) return null;
      return {
        url: URL.createObjectURL(resp.body),
        filename: attachFilename(resp.headers.get('Content-Disposition')),
        type: resp.body.type || resp.headers.get('Content-Type') || '',
      };
    } catch {
      return null;
    }
  }

  /**
   * Envía un mensaje al ticket. Devuelve true si ok.
   * - Con adjuntos: un único POST **multipart** (igual que el Helpdesk original):
   *   `detail` + cada archivo en el campo `attachments`. El backend almacena el
   *   adjunto y devuelve el mensaje con `attach_ids`. (NO hay upload por separado.)
   * - Solo texto: form-urlencoded con FORM_CODEC (escapa todo, ver arriba).
   */
  async sendMessage(ticketId: string, detail: string, files: File[] = []): Promise<boolean> {
    const url = `${this.base}/tickets/${ticketId}/messages`;
    const context = new HttpContext().set(HD_SAFE, true);
    try {
      if (files.length) {
        const fd = new FormData();
        fd.append('detail', detail);
        for (const f of files) fd.append('attachments', f);
        await firstValueFrom(this.http.post(url, fd, { context }));
      } else {
        const body = new HttpParams({ encoder: FORM_CODEC }).set('detail', detail);
        await firstValueFrom(this.http.post(url, body, { context }));
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Edita un mensaje ya enviado. La ventana de 10 min y "solo el autor" las valida
   * el SERVIDOR (el campo `can_edit` del GET ya resuelve ambas cosas según el token);
   * NO se recalcula en el cliente. El API lee `detail` de FORM-URLENCODED igual que
   * el envío (con JSON responde 400 "El detalle es obligatorio"), por eso se reusa el
   * mismo FORM_CODEC. Devuelve el error real del API para poder mostrarlo.
   */
  async editMessage(ticketId: string, messageId: string, detail: string): Promise<{ ok: boolean; error?: string }> {
    const url = `${this.base}/tickets/${ticketId}/messages/${messageId}`;
    try {
      const body = new HttpParams({ encoder: FORM_CODEC }).set('detail', detail);
      await firstValueFrom(this.http.patch(url, body, { context: new HttpContext().set(HD_SAFE, true) }));
      return { ok: true };
    } catch (e: any) {
      const error = e?.error?.error?.message || e?.error?.message || 'No se pudo editar el mensaje.';
      return { ok: false, error };
    }
  }

  /** Ids de adjunto a nivel ticket (cachea en el ticket si hay que pedir el raw). */
  async ticketAttachmentIds(t: Ticket): Promise<string[]> {
    if (Array.isArray(t.adjuntosTicket) && t.adjuntosTicket.length) return t.adjuntosTicket;
    const raw = await this.fetchTicketRaw(t.ticket);
    const ids = ticketAttachIds(raw);
    t.adjuntosTicket = ids;
    return ids;
  }

  /**
   * Asigna un ticket a un empleado en el API. Igual que el Helpdesk web:
   * PUT /tickets/tickets/:id con el form-urlencoded `assigned_user_id`. Devuelve
   * true si el PUT respondió OK.
   *
   * `ticket` (opcional): si el llamador ya tiene el Ticket completo (cliente, asunto), se usa
   * para crear la tarea AUTOMÁTICAMENTE en el board si el ticket todavía no tenía una — ver
   * `crearTareaSiHaceFalta()`. Sin `ticket` no se intenta (los call sites que solo tienen el
   * número siguen funcionando igual que antes, sin creación automática).
   */
  async assignTicket(ticketId: string, userId: string, ticket?: Ticket): Promise<boolean> {
    if (!ticketId || !userId) return false;
    const want = String(userId).trim().toUpperCase();
    try {
      const body = new HttpParams().set('assigned_user_id', want);
      await firstValueFrom(
        this.http.put(`${this.base}/tickets/tickets/${ticketId}`, body, {
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
      this.updateTicketAssignee(ticketId, want);
      // Write-through al espejo del backend: la escritura AUTORITATIVA (HelpDesk) ya se
      // confirmó (regla de oro). Refrescamos el asignado del ticket en Postgres para que el
      // board —que deriva el dueño de la tarea del ticket— lo refleje YA, sin esperar el sync
      // completo. Best-effort: si falla (o estamos en modo Firebase), el sync completo reconcilia.
      await this.refreshEspejoAssignee(ticketId, want);
      // Pulso: el Board muestra el nuevo asignado al instante (regla #8: nombre resuelto, no el código).
      const u = this._users().find((x) => x.id === want);
      this._ticketMutado.set({ ticket: ticketId, asignadoId: want, asignadoName: u?.name || want, at: Date.now() });
      if (ticket) void this.crearTareaSiHaceFalta(ticket, want, u?.name || want);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Si el ticket recién asignado NO tiene tarea en ningún board, la crea automáticamente
   * (equipo responsable del cliente; si no resuelve, el equipo de quien asigna — ver el backend).
   * Best-effort y silencioso ante error: la asignación al HelpDesk ya se confirmó, esto es un
   * plus. Idempotente en el backend, así que el chequeo local es solo una optimización.
   */
  /** hids ya revisados en esta sesión por `crearTareasFaltantes` (una vez por persona y sesión). */
  private readonly faltantesRevisados = new Set<string>();

  /**
   * Crea la tarea que falta para los tickets ABIERTOS (no finalizados) asignados a cada persona en el
   * HelpDesk. Lo asignado directo en el HelpDesk nunca recibía tarea y no aparecía en el Board (pedido de
   * la dueña, oct-2026). Reutiliza `crearTareaSiHaceFalta` (endpoint idempotente; el índice único
   * `uq_tarea_ticket_espejo` impide duplicar). Una vez por persona y sesión. Devuelve cuántas creó.
   */
  async crearTareasFaltantes(hids: string[]): Promise<number> {
    if (environment.dataBackend !== 'quarkus') return 0;
    const pendientes = [...new Set(hids.map((h) => String(h || '').trim().toUpperCase()).filter(Boolean))].filter(
      (h) => !this.faltantesRevisados.has(h),
    );
    if (!pendientes.length) return 0;
    pendientes.forEach((h) => this.faltantesRevisados.add(h));
    await this.getTicketStatuses();
    const abiertos = this.statusNames()
      .filter((n) => !esEstadoFinalizado(n))
      .map((n) => this.statusIdOf(n))
      .filter((id): id is string => !!id);
    if (!abiertos.length) return 0; // sin catálogo de estados no se arriesga a crear tareas de tickets cerrados
    const conTarea = new Set(this.data.stories().map((s) => String(s.ticket || '')).filter(Boolean));
    const porCrear: { t: Ticket; hid: string }[] = [];
    for (const hid of pendientes) {
      for (let offset = 0; offset < 300; offset += 100) {
        let items: Ticket[] = [];
        try {
          const params = new HttpParams()
            .set('limit', '100')
            .set('offset', String(offset))
            .set('assigned_user_id', hid)
            .set('ticket_status_id', abiertos.join(','));
          const data = await firstValueFrom(
            this.http.get<any>(`${this.base}/tickets/tickets`, { params, context: new HttpContext().set(HD_SAFE, true) }),
          );
          items = (data?.items || []).map(mapTicket);
        } catch {
          break; // best-effort: se reintenta en la próxima sesión
        }
        for (const t of items) {
          if (t.ticket && !conTarea.has(String(t.ticket)) && !esEstadoFinalizado(t.estatus || '')) {
            conTarea.add(String(t.ticket));
            porCrear.push({ t, hid });
          }
        }
        if (items.length < 100) break;
      }
    }
    // De UNA en una: el backend numera TA-NNN con el máximo actual y en paralelo chocaban (el backend
    // además reintenta, por si otro tablero crea a la vez).
    let creadas = 0;
    for (const { t, hid } of porCrear) {
      const nombre = this.hdUsers().find((u) => String(u.id).toUpperCase() === hid)?.name || t.nombreAsignado || hid;
      if (await this.crearTareaSiHaceFalta(t, hid, nombre, true)) creadas++;
    }
    return creadas;
  }

  private async crearTareaSiHaceFalta(ticket: Ticket, asignadoHid: string, asignadoName: string, silencioso = false): Promise<boolean> {
    // `quarkusApiUrl` vacío es VÁLIDO en onprem/AWS (mismo-origen, URLs relativas) — no exigir
    // `!!quarkusApiUrl`, que descartaba justo ese caso (ver el mismo fix ya hecho en
    // `PerfilService.usaQuarkus()`). Con el chequeo viejo, esto NUNCA se ejecutaba en producción.
    if (environment.dataBackend !== 'quarkus') return false;
    if (this.data.stories().some((s) => String(s.ticket) === String(ticket.ticket))) return false;
    try {
      const hid = String(this.auth.session()?.id || '');
      const r = await fetch(`${environment.quarkusApiUrl}/api/legacy/stories/desde-ticket-asignado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(hid ? { 'X-Actor-Hid': hid } : {}) },
        body: JSON.stringify({
          ticket: ticket.ticket,
          clienteCodigo: ticket.clientId || undefined,
          clienteNombre: ticket.clienteRaw || undefined,
          titulo: ticket.asunto || undefined,
          asignadoHid,
          asignadoNombre: asignadoName,
          estado: ticket.estatus || undefined, // la tarea nace en la columna de su estado (no siempre To Do)
          fechaIngreso: ticket.fechaIngreso || undefined, // SOFT WAREHOUSE: solo tickets desde 01-01-2026
        }),
      });
      if (!r.ok) return false;
      const d: {
        creada: boolean; tareaCodigo?: string; board?: string;
        columna?: string; aprobado?: boolean; esperandoCliente?: boolean;
      } = await r.json();
      if (!d.creada || !d.tareaCodigo || !d.board) return false;
      // Ya se sabe todo lo necesario (lo mandamos nosotros): se inserta en la caché local sin
      // recargar, igual que hace `DataService.addStory()` tras confirmar su propio POST.
      // Columna y flags tal como los dejó el backend según el estado del ticket.
      const COLUMNA: Record<string, Story['status']> = {
        TODO: 'todo', IN_PROGRESS: 'in_progress', EN_CERTIFICACION: 'review', ENTREGADO: 'done',
      };
      const hoy = new Date().toISOString().split('T')[0];
      const nueva: Story = {
        id: d.tareaCodigo, board: d.board, status: COLUMNA[d.columna ?? ''] ?? 'todo', priority: 'media', description: '',
        assignee: asignadoHid, client: ticket.clientId || null, clientName: ticket.clienteRaw || undefined,
        ticket: ticket.ticket, dueDate: '', points: 1, progress: 0,
        approved: !!d.aprobado, approvedDate: d.aprobado ? hoy : null,
        waitingClient: !!d.esperandoCliente, waitingDate: d.esperandoCliente ? hoy : null,
        title: ticket.asunto || undefined, hdEstatus: ticket.estatus || undefined,
      };
      this.data.stories.update((list) => [...list, nueva]);
      if (!silencioso) this.snack.open(`Se creó la tarea ${d.tareaCodigo} para el ticket #${ticket.ticket}.`, 'OK', { duration: 4000 });
      return true;
    } catch {
      // silencioso: la asignación ya quedó confirmada, esto es un plus best-effort
      return false;
    }
  }

  /** Tickets con una reconciliación de asignado en curso (evita repetirla mientras responde el backend). */
  private readonly reconciliando = new Set<string>();

  /**
   * El asignado de una tarea CON ticket es SIEMPRE el del ticket. Cuando una lectura en vivo del HelpDesk
   * (Tickets, Board, Reportes) muestra un asignado distinto al de la tarea —p. ej. se reasignó directo en el
   * HelpDesk—, se actualiza el espejo en el backend, que lo copia a la tarea
   * (`TicketEspejoStore.propagarAsignado`), y la tarea en memoria. Solo escribe en FitDesk, nunca en el
   * HelpDesk. Best-effort: si falla, se reintenta en la próxima lectura.
   */
  reconciliarAsignados(items: { ticket: string | number; asignado: string | null | undefined }[]): void {
    if (environment.dataBackend !== 'quarkus' || !items.length) return;
    const porTicket = new Map(this.data.stories().filter((s) => s.ticket).map((s) => [String(s.ticket), s]));
    for (const it of items) {
      const ticket = String(it.ticket ?? '').trim();
      const st = porTicket.get(ticket);
      if (!ticket || !st || this.reconciliando.has(ticket)) continue;
      const vivo = String(it.asignado ?? '').trim().toUpperCase();
      // "Sin asignado" no se reconcilia: el HelpDesk vacía el asignado al cerrar un ticket, y un ticket
      // aún sin asignar no debe dejar la tarea sin dueño (mismo criterio que `propagarAsignado`).
      if (!vivo || vivo === String(st.assignee ?? '').trim().toUpperCase()) continue;
      this.reconciliando.add(ticket);
      void this.refreshEspejoAssignee(ticket, vivo)
        .then(() => this.data.stories.update((list) => list.map((s) => (String(s.ticket) === ticket ? { ...s, assignee: vivo } : s))))
        .finally(() => this.reconciliando.delete(ticket));
    }
  }

  /** Refresca el asignado de un ticket en el espejo de Quarkus (write-through de la reasignación). */
  private async refreshEspejoAssignee(ticketId: string, hid: string): Promise<void> {
    // Mismo bug que en `crearTareaSiHaceFalta`: `quarkusApiUrl` vacío (onprem/AWS, mismo-origen)
    // es válido, no "sin backend". Con `!!quarkusApiUrl`, este write-through nunca corría en
    // producción — el board dependía por completo del sync completo para verse al día.
    if (environment.dataBackend !== 'quarkus') return;
    try {
      await firstValueFrom(
        this.http.put(`${environment.quarkusApiUrl}/api/legacy/ticket-espejo/${ticketId}/assignee`, {
          assigned_user_id: hid,
        }),
      );
    } catch {
      // No fatal: el HelpDesk (fuente de verdad) ya quedó confirmado; el sync completo reconcilia.
    }
  }

  // ── Catálogo de estados (nombre → ticket_status_id) ──
  private statusMap: Record<string, string> = this.readStatusCache();
  private statusesPromise: Promise<Record<string, string>> | null = null;
  /** Nombres de estado disponibles (para el menú de cambio de estado). */
  readonly statusNames = signal<string[]>(Object.keys(this.statusMap));

  /** Catálogo de estados del API: { 'EN PROCESO': '003', ... }. Consulta + cache. */
  getTicketStatuses(): Promise<Record<string, string>> {
    if (this.statusesPromise) return this.statusesPromise;
    const p = this.fetchAllStatuses().then((map) => {
      // NO memoizar un catálogo vacío: un fallo transitorio (cold start de Render,
      // 502, red) no debe dejar "Catálogo no disponible" toda la sesión. Al liberar
      // la promesa, la próxima llamada (botón ↻, re-navegar a Tickets) reconsulta.
      if (!map || !Object.keys(map).length) this.statusesPromise = null;
      return map;
    });
    this.statusesPromise = p;
    return p;
  }

  /** ticket_status_id de un estado por su nombre (para filtrar server-side). */
  statusIdOf(name: string): string | undefined {
    return this.statusMap[(name || '').trim().toUpperCase()];
  }

  private async fetchAllStatuses(): Promise<Record<string, string>> {
    const endpoints = ['/ticket-statuses/catalog', '/ticket-statuses'];
    // Hasta 2 rondas: el backend en Render (free tier) puede tardar o dar 502 en el
    // primer hit tras estar inactivo (cold start). Un reintento corto evita que un
    // blip transitorio deje el catálogo vacío ("Cambiar estado" → "no disponible").
    for (let attempt = 0; attempt < 2; attempt++) {
      for (const ep of endpoints) {
        try {
          const data = await firstValueFrom(
            this.http.get<any>(`${this.base}${ep}`, { context: new HttpContext().set(HD_SAFE, true) }),
          );
          const items: any[] = Array.isArray(data) ? data : data?.items || data?.data || data?.statuses || data?.results || [];
          if (!items.length) continue;
          const map: Record<string, string> = {};
          for (const c of items) {
            const id = String(c.ticket_status_id ?? c.id ?? c.status_id ?? c.code ?? '').trim();
            const name = String(c.description || c.status_description || c.name || c.estado || c.status || '').trim().toUpperCase();
            if (id && name) map[name] = id;
          }
          if (!Object.keys(map).length) continue;
          this.statusMap = map;
          this.statusNames.set(Object.keys(map));
          this.saveStatusCache(map);
          return map;
        } catch {
          /* prueba el siguiente endpoint / la próxima ronda */
        }
      }
      if (attempt === 0) await new Promise((r) => setTimeout(r, 800)); // respiro antes de reintentar
    }
    return this.statusMap;
  }

  private readStatusCache(): Record<string, string> {
    try {
      return JSON.parse(localStorage.getItem(HD_STATUS_LS_KEY) || '{}') || {};
    } catch {
      return {};
    }
  }
  private saveStatusCache(map: Record<string, string>): void {
    try {
      localStorage.setItem(HD_STATUS_LS_KEY, JSON.stringify(map));
    } catch {
      /* storage no disponible */
    }
  }

  /**
   * Cambia el estado del ticket en el API. El estado se escribe por código:
   * PUT /tickets/tickets/:id con `ticket_status_id` form-urlencoded. Traduce el
   * nombre del estado a su código vía el catálogo (getTicketStatuses). Best-effort.
   */
  async setTicketStatus(ticketId: string, estadoNombre: string): Promise<boolean> {
    if (!ticketId || !estadoNombre) return false;
    if (estadoNombre.trim().toUpperCase() === 'ABIERTO') return false; // nunca se permite ABIERTO
    const map = await this.getTicketStatuses();
    const id = map[estadoNombre.trim().toUpperCase()];
    if (!id) {
      console.warn('[HD status] sin código para', estadoNombre, '— catálogo:', map);
      return false;
    }
    try {
      const body = new HttpParams().set('ticket_status_id', id);
      await firstValueFrom(
        this.http.put(`${this.base}/tickets/tickets/${ticketId}`, body, {
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
      // Reflejar en el ticket en memoria (en ambas listas, si está cargado).
      this.patchTicket(ticketId, { estatus: estadoNombre });
      // Pulso: el Board reconcilia esta tarjeta al instante (nueva columna + badge de estatus).
      this._ticketMutado.set({ ticket: ticketId, estado: estadoNombre, at: Date.now() });
      return true;
    } catch {
      return false;
    }
  }

  /** Refleja la asignación en el ticket en memoria (nombre + re-clasificación). */
  private updateTicketAssignee(ticketId: string, userId: string): void {
    const u = this._users().find((x) => x.id === userId);
    this.patchTicket(ticketId, { usuarioAsignado: userId, nombreAsignado: u?.name || userId });
  }

  // ── Edición / eliminación de tickets (rol HELPDESK o ADMIN; el backend lo exige) ─────────

  private catalogos: { modulos?: Promise<CatalogoItem[]>; tipos?: Promise<CatalogoItem[]> } = {};

  /** Módulos del HelpDesk (`subsystem_id` → descripción), solo activos. Cacheado por sesión. */
  getModulos(): Promise<CatalogoItem[]> {
    return (this.catalogos.modulos ??= this.fetchCatalogo('subsystems/catalog', 'subsystem_id', 'subsystem_status'));
  }

  /** Tipos de ticket (`ticket_type_id` → descripción), solo activos. Cacheado por sesión. */
  getTiposTicket(): Promise<CatalogoItem[]> {
    return (this.catalogos.tipos ??= this.fetchCatalogo('ticket-types/catalog', 'ticket_type_id', 'ticket_type_status'));
  }

  private async fetchCatalogo(path: string, idKey: string, activoKey: string): Promise<CatalogoItem[]> {
    try {
      const data = await firstValueFrom(this.http.get<any[]>(`${this.base}/${path}`, {
        context: new HttpContext().set(HD_SAFE, true),
      }));
      return (Array.isArray(data) ? data : [])
        .filter((x) => x?.[activoKey] !== false)
        .map((x) => ({ id: String(x[idKey]), nombre: String(x.description ?? x[idKey]).trim() }));
    } catch {
      // Sin catálogo no se rompe el modal: se reintenta la próxima vez que se abra.
      if (path.startsWith('subsystems')) this.catalogos.modulos = undefined;
      else this.catalogos.tipos = undefined;
      return [];
    }
  }

  /**
   * Edita campos del ticket en el HelpDesk en UN solo PUT form-urlencoded (igual que el
   * "Guardar cambios" del HelpDesk original). Claves del API: `subsystem_id`, `ticket_type_id`,
   * `priority`, `incidence`, `subject`. El asignado y el estado NO van aquí: se reusan
   * `assignTicket` / `setTicketStatus`, que ya traen sus efectos (espejo, pulso, auto-tarea).
   * Síncrono: solo actualiza la memoria tras confirmar. Devuelve el motivo real si falla
   * (p. ej. el 403 del backend cuando el actor no tiene rol HELPDESK en ese cliente).
   */
  async updateTicketFields(
    ticketId: string,
    campos: Record<string, string>,
    patch: Partial<Ticket>,
  ): Promise<{ ok: boolean; error?: string; ignorados?: string[] }> {
    const keys = Object.keys(campos);
    if (!ticketId || !keys.length) return { ok: true };
    let body = new HttpParams({ encoder: FORM_CODEC });
    for (const k of keys) body = body.set(k, campos[k]);
    try {
      const resp = await firstValueFrom(this.http.put<any>(`${this.base}/tickets/tickets/${ticketId}`, body, {
        context: new HttpContext().set(HD_SAFE, true),
      }));
      // El HelpDesk responde 200 con el ticket COMPLETO aunque IGNORE campos que la cuenta no puede
      // cambiar (verificado 2026-09-27: con una cuenta SUPERVISOR solo aplica `incidence`; asunto,
      // módulo, tipo y orden vuelven sin cambios). Se compara lo pedido con lo devuelto para no
      // anunciar un guardado que no ocurrió, y solo se refleja en memoria lo que sí quedó.
      const ignorados = resp && typeof resp === 'object'
        ? keys.filter((k) => k in resp && String(resp[k] ?? '').trim() !== String(campos[k] ?? '').trim())
        : [];
      const aplicado: Partial<Ticket> = { ...patch };
      for (const k of ignorados) for (const f of CAMPO_A_TICKET[k] ?? []) delete aplicado[f];
      if (Object.keys(aplicado).length) {
        this.patchTicket(ticketId, aplicado);
        this._ticketMutado.set({ ticket: ticketId, at: Date.now() });
      }
      return { ok: true, ignorados };
    } catch (e: any) {
      return { ok: false, error: errorDelApi(e, 'No se pudieron guardar los cambios del ticket.') };
    }
  }

  /**
   * Elimina el ticket del HelpDesk. Va por el endpoint PROPIO `DELETE /api/legacy/tickets/{id}`
   * (el proxy bloquea el DELETE directo): autoriza (HELPDESK/ADMIN), borra en el HelpDesk y, solo
   * si éste confirma, quita la tarea espejo del board. Síncrono.
   */
  async deleteTicket(ticketId: string): Promise<{ ok: boolean; message?: string; error?: string }> {
    const hid = this.auth.session()?.id;
    try {
      const r = await firstValueFrom(this.http.delete<{ message?: string }>(
        `${environment.quarkusApiUrl}/api/legacy/tickets/${encodeURIComponent(ticketId)}`,
        { headers: hid ? { 'X-Actor-Hid': String(hid) } : {}, context: new HttpContext().set(HD_SAFE, true) },
      ));
      this._tickets.set(this._tickets().filter((t) => t.ticket !== ticketId));
      this._total.set(Math.max(0, this._total() - 1));
      // El backend ya borró la tarea espejo: se quita también del board en memoria (sin esperar sync).
      this.data.stories.set(this.data.stories().filter((s) => String(s.ticket) !== String(ticketId)));
      this._ticketMutado.set({ ticket: ticketId, eliminado: true, at: Date.now() });
      return { ok: true, message: r?.message };
    } catch (e: any) {
      return { ok: false, error: errorDelApi(e, 'No se pudo eliminar el ticket.') };
    }
  }

  /** Aplica un patch a un ticket (por nº) en el pool en memoria. */
  private patchTicket(ticketId: string, patch: Partial<Ticket>): void {
    const arr = this._tickets();
    const idx = arr.findIndex((t) => t.ticket === ticketId);
    if (idx < 0) return;
    const t: Ticket = { ...arr[idx], ...patch };
    evaluarFechas(t);
    clasificar(t);
    const next = [...arr];
    next[idx] = t;
    this._tickets.set(next);
  }

  // ── Cache (localStorage) ──────────────────────────────────────────────
  private seedUsers(): HdUser[] {
    try {
      const cached = JSON.parse(localStorage.getItem(HD_USERS_LS_KEY) || '[]');
      if (this.looksLikeHd(cached)) {
        return cached.map((u: any) => ({ id: u.id, name: u.name || u.id, role: this.roles[u.id] || u.role || '' }));
      }
    } catch {
      /* cache corrupto */
    }
    return EMPLEADOS.map((id) => ({ id, name: id, role: this.roles[id] || '' })).sort((a, b) => a.id.localeCompare(b.id));
  }

  private seedClients(): HdClient[] {
    try {
      const cached = JSON.parse(localStorage.getItem(HD_CLIENTS_LS_KEY) || '[]');
      if (Array.isArray(cached) && cached.length) {
        return cached.map((c: any) => ({ id: String(c.id), name: c.name || String(c.id) }));
      }
    } catch {
      /* cache corrupto */
    }
    return [];
  }

  private saveClients(clients: HdClient[]): void {
    try {
      localStorage.setItem(HD_CLIENTS_LS_KEY, JSON.stringify(clients));
    } catch {
      /* storage lleno / no disponible */
    }
  }

  /** Heurística: el cache debe tener IDs en formato Helpdesk (XXX001), no IDs locales. */
  private looksLikeHd(arr: any): boolean {
    if (!Array.isArray(arr) || !arr.length) return false;
    const hdRx = /^[A-Z]+\d+$/;
    const hits = arr.filter((u: any) => u && typeof u.id === 'string' && hdRx.test(u.id)).length;
    return hits >= Math.max(1, Math.floor(arr.length / 2));
  }

  private saveUsers(users: HdUser[]): void {
    try {
      localStorage.setItem(HD_USERS_LS_KEY, JSON.stringify(users.map((u) => ({ id: u.id, name: u.name }))));
    } catch {
      /* storage lleno / no disponible */
    }
  }

  private readRoles(): Record<string, string> {
    try {
      return JSON.parse(localStorage.getItem(HD_ROLES_LS_KEY) || '{}') || {};
    } catch {
      return {};
    }
  }

  private saveRoles(): void {
    try {
      localStorage.setItem(HD_ROLES_LS_KEY, JSON.stringify(this.roles));
    } catch {
      /* storage lleno / no disponible */
    }
  }
}
