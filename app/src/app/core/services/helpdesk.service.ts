import { HttpClient, HttpContext, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HD_SAFE } from '../interceptors/helpdesk-auth.interceptor';
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

/** Filtros server-side de la consulta de tickets (los acepta el API). */
export interface TicketFilters {
  clientIds?: string[];
  statusId?: string;
  /** Lista de estados a incluir (p. ej. todos los NO finalizados). Va como
   *  `ticket_status_id=1,2,3` — misma forma de lista por comas que `client_id`. */
  statusIds?: string[];
  assignedUserId?: string;
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
      const msg = err?.message || '';
      const esRed = /fetch|failed|load failed|network|0/i.test(msg);
      this.setStatus(esRed ? 'No se pudo conectar al API.' : `Error: ${msg}`, 'error');
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
      const msg = err?.message || '';
      const esRed = /fetch|failed|load failed|network|0/i.test(msg);
      this.setStatus(esRed ? 'No se pudo conectar al API.' : `Error: ${msg}`, 'error');
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
      // Multi-cliente: el API espera una LISTA separada por comas en un solo
      // parámetro (client_id=4,5,6), igual que la herramienta del Helpdesk.
      // (Repetir el parámetro NO sirve: el API se queda con uno solo.)
      if (f.clientIds?.length) params = params.set('client_id', f.clientIds.join(','));
      // Estatus server-side: un estado explícito, o una LISTA (p. ej. no finalizados).
      if (f.statusId) params = params.set('ticket_status_id', f.statusId);
      else if (f.statusIds?.length) params = params.set('ticket_status_id', f.statusIds.join(','));
      if (f.assignedUserId) params = params.set('assigned_user_id', f.assignedUserId);
      const data = await firstValueFrom(this.http.get<any>(`${this.base}/tickets/tickets`, { params }));
      const items: Ticket[] = (data?.items || []).map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set(items);
      this._total.set(Number(data?.total ?? items.length));
      this.hasMore.set((pageIndex + 1) * pageSize < this._total());
      // El total es el universo del API (paginado); items.length es lo realmente traído.
      this.setStatus(`✓ ${items.length} cargados de ${this._total()} del sistema`, 'ok');
    } catch (err: any) {
      const msg = err?.message || '';
      const esRed = /fetch|failed|load failed|network|0/i.test(msg);
      this.setStatus(esRed ? 'No se pudo conectar al API.' : `Error: ${msg}`, 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Búsqueda por texto libre: consulta `/tickets/tickets/search?q=…` (el API busca la
   * palabra en el contenido del ticket) y deja la página como resultado actual +
   * `total`, EXACTAMENTE igual que `loadFiltered` → la vista y la paginación
   * server-side funcionan sin cambios. La búsqueda es global (no aplica los filtros
   * de tab). El orden va como `<campo>_order` (mismo esquema que el listado).
   */
  async searchTickets(
    q: string,
    pageIndex: number,
    pageSize: number,
    sort: { field: string; dir: 'asc' | 'desc' } = { field: 'modified_date', dir: 'desc' },
  ): Promise<void> {
    const term = q.trim();
    if (!term || this.loading()) return;
    this.loading.set(true);
    this.setStatus(`Buscando "${term}"...`, 'loading');
    try {
      const params = new HttpParams()
        .set('q', term)
        .set('limit', String(pageSize))
        .set('offset', String(pageIndex * pageSize))
        .set(`${sort.field}_order`, sort.dir);
      const data = await firstValueFrom(this.http.get<any>(`${this.base}/tickets/tickets/search`, { params }));
      const items: Ticket[] = (data?.items || []).map(mapTicket).map(evaluarFechas).map(clasificar);
      this._tickets.set(items);
      this._total.set(Number(data?.total ?? items.length));
      this.hasMore.set((pageIndex + 1) * pageSize < this._total());
      this.setStatus(`✓ ${items.length} de ${this._total()} coinciden con "${term}"`, 'ok');
    } catch (err: any) {
      const msg = err?.message || '';
      const esRed = /fetch|failed|load failed|network|0/i.test(msg);
      this.setStatus(esRed ? 'No se pudo conectar al API.' : `Error: ${msg}`, 'error');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Números de ticket que coinciden con una búsqueda por texto. Para el board:
   * filtrar las cards cuyo ticket coincide con el HelpDesk. Recorre las páginas del
   * endpoint de búsqueda hasta agotarlas o alcanzar `cap` (cota de seguridad) y NO
   * toca las señales de la lista (`_tickets`/`_total`). Devuelve un Set de números.
   */
  async searchTicketNumbers(q: string, cap = 300): Promise<Set<string>> {
    const term = q.trim();
    const numbers = new Set<string>();
    if (!term) return numbers;
    const LIMIT = 50;
    try {
      for (let offset = 0; offset < cap; offset += LIMIT) {
        const params = new HttpParams().set('q', term).set('limit', String(LIMIT)).set('offset', String(offset));
        const data = await firstValueFrom(
          this.http.get<any>(`${this.base}/tickets/tickets/search`, {
            params,
            context: new HttpContext().set(HD_SAFE, true),
          }),
        );
        const items: any[] = data?.items || [];
        for (const it of items) {
          const id = String(it.ticket_id ?? '').trim();
          if (id) numbers.add(id);
        }
        if (items.length < LIMIT) break; // última página
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

  /** Blob URL + nombre real (de Content-Disposition) de un adjunto, para descargarlo. */
  async fetchAttachment(attachId: string): Promise<{ url: string; filename: string } | null> {
    try {
      const resp = await firstValueFrom(
        this.http.get(`${this.base}/attachments/${attachId}`, {
          responseType: 'blob',
          observe: 'response',
          context: new HttpContext().set(HD_SAFE, true),
        }),
      );
      if (!resp.body) return null;
      return { url: URL.createObjectURL(resp.body), filename: attachFilename(resp.headers.get('Content-Disposition')) };
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
   */
  async assignTicket(ticketId: string, userId: string): Promise<boolean> {
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
      return true;
    } catch {
      return false;
    }
  }

  // ── Catálogo de estados (nombre → ticket_status_id) ──
  private statusMap: Record<string, string> = this.readStatusCache();
  private statusesPromise: Promise<Record<string, string>> | null = null;
  /** Nombres de estado disponibles (para el menú de cambio de estado). */
  readonly statusNames = signal<string[]>(Object.keys(this.statusMap));

  /** Catálogo de estados del API: { 'EN PROCESO': '003', ... }. Consulta + cache. */
  getTicketStatuses(): Promise<Record<string, string>> {
    return (this.statusesPromise ??= this.fetchAllStatuses());
  }

  /** ticket_status_id de un estado por su nombre (para filtrar server-side). */
  statusIdOf(name: string): string | undefined {
    return this.statusMap[(name || '').trim().toUpperCase()];
  }

  private async fetchAllStatuses(): Promise<Record<string, string>> {
    const endpoints = ['/ticket-statuses/catalog', '/ticket-statuses'];
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
        /* prueba el siguiente endpoint */
      }
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
