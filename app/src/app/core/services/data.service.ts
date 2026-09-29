import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

const LS_KEY = 'fit-daily_v1';
const GRACE_MS = 8000; // ventana de gracia por-ID tras una escritura local

export interface BoardInfo { codigo: string; nombre: string; equipo: string | null; regionalId: number | null; activo: boolean; }

export interface Story {
  id: string;
  board?: string; // codigo del board/tablero al que pertenece (multi-equipo)
  status: string;
  priority: string;
  description: string;
  assignee: string | null;
  client: string | null;
  ticket: string;
  dueDate: string;
  points: number;
  progress: number;
  approved: boolean;
  approvedDate: string | null;
  waitingClient: boolean;
  waitingDate: string | null;
  title?: string;
  hdEstatus?: string;
  clientName?: string; // nombre del cliente (de tareas con ticket) para no depender del catálogo
  // Tipo de tarea + reunión (V11).
  tipo?: string; // 'DESARROLLO_SOPORTE' (default) | 'REUNION'
  subtipo?: string; // 'CAPACITACION' | 'PRESENTACION' | 'TRABAJO' (solo reunión)
  tema?: string;
  link?: string;
  inicio?: string; // ISO local "YYYY-MM-DDThh:mm"
  fin?: string;
  recordatorioMin?: number; // reunión: minutos antes del inicio para la alerta (default 20 si no está)
  [k: string]: unknown;
}

export interface TeamMember { id: string; name: string; role?: string; color?: string; [k: string]: unknown; }
export interface Client { id: string; name: string; [k: string]: unknown; }

/**
 * Capa de datos: Firebase Realtime DB (REST) con fallback a localStorage.
 * Port de js/data.js. El estado principal se expone como signals para que las
 * vistas Angular reaccionen. Mantiene los nombres de métodos del legacy para que
 * portar cada vista sea mecánico.
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  // ── Estado reactivo ──
  readonly stories = signal<Story[]>([]);
  readonly team = signal<TeamMember[]>([]);
  readonly clients = signal<Client[]>([]);

  // ── Multi-equipo (Fase 3): tableros visibles + tablero actual de la vista ──
  readonly boards = signal<BoardInfo[]>([]);
  /** codigo del board activo en la vista; '' = sin scoping (modo Firebase/legacy). */
  readonly currentBoard = signal<string>('');

  // Estado interno (mutable, espejo del legacy)
  private _progress: { entries: any[] } = { entries: [] };
  private _queries: { queries: any[] } = { queries: [] };
  private _weekly: { weeks: Record<string, any> } = { weeks: {} };
  private _turnoSenior: { weeks: Record<string, any> } = { weeks: {} };
  private _hdActions: Record<string, boolean> = {};
  private _hdNotes: Record<string, string> = {};
  private _solNotes: Record<string, string> = {};
  private _hdPendientes: Record<string, any> = {};
  private _hdGuardados: Record<string, boolean> = {};

  private readonly recentWrites = new Map<string, number>();

  // ── Firebase helpers ──
  private fbReady(): boolean {
    return !!environment.firebaseDbUrl && !environment.firebaseDbUrl.includes('TU-PROYECTO');
  }
  /** Fase 3: la capa de datos apunta a Quarkus (endpoints /api/legacy/*) en vez de Firebase. */
  private useQuarkus(): boolean {
    // `quarkusApiUrl` vacío es VÁLIDO on-prem (mismo-origen: URLs relativas /api/legacy/*). Sin este
    // fix, con `quarkusApiUrl: ''` el board leía del Firebase viejo (legacy) en vez de Postgres → datos
    // desactualizados. Basta con que la fuente de datos sea Quarkus.
    return environment.dataBackend === 'quarkus';
  }
  private dbUrl(path: string): string {
    return `${environment.firebaseDbUrl}/fit-daily/${path}.json`;
  }
  private readonly auth = inject(AuthService);

  private apiUrl(node: string): string {
    return `${environment.quarkusApiUrl}/api/legacy/${node}`;
  }
  /** Identidad del actor para el backend (interino). Permite scoping por usuario (p. ej. pendientes). */
  private actorHeaders(): Record<string, string> {
    const id = this.auth.session()?.id;
    return this.useQuarkus() && id ? { 'X-Actor-Hid': id } : {};
  }
  private async fbGet(path: string): Promise<any> {
    // En modo Quarkus el mismo nodo (stories, sprints…) se pide al endpoint legacy.
    const url = this.useQuarkus() ? this.apiUrl(path) : this.dbUrl(path);
    const r = await fetch(url, { headers: this.actorHeaders() });
    if (!r.ok) throw new Error(`read error ${r.status} (${url})`);
    return r.json();
  }

  /** ¿El board se sirve desde Quarkus? (para que las vistas decidan sin conocer el env). */
  usesQuarkus(): boolean {
    return this.useQuarkus();
  }

  /** Tableros que el usuario puede ver (por sus Asignaciones). Solo en modo Quarkus. */
  async loadBoards(actorHid: string | null): Promise<BoardInfo[]> {
    if (!this.useQuarkus()) { this.boards.set([]); return []; }
    try {
      const r = await fetch(this.apiUrl('boards'), { headers: actorHid ? { 'X-Actor-Hid': actorHid } : {} });
      const list: BoardInfo[] = r.ok ? await r.json() : [];
      this.boards.set(list);
      return list;
    } catch {
      this.boards.set([]);
      return [];
    }
  }

  /** Cambia el tablero de la vista (fija `currentBoard`). El tablero es continuo (sin sprints). */
  switchBoard(codigo: string): void {
    if (!codigo) return;
    this.currentBoard.set(codigo);
  }

  /**
   * Caché de encabezados de tickets (`ticket_espejo`) keyed por nº de ticket, con la
   * misma forma que el board espera del ticket crudo del HelpDesk. Permite que el board
   * lea el estado de Postgres en UNA consulta en vez de pegarle al HelpDesk por tarjeta.
   */
  async getTicketEspejoCache(): Promise<Record<string, any>> {
    if (!this.useQuarkus()) return {};
    try {
      return (await this.fbGet('ticket-espejo')) || {};
    } catch {
      return {};
    }
  }
  // En modo Quarkus las escrituras van al backend (/api/legacy/*), NO a Firebase.
  private fbPut(path: string, data: unknown): void {
    this.markStoryWrite(path, data);
    const url = this.useQuarkus() ? this.apiUrl(path) : this.dbUrl(path);
    fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...this.actorHeaders() }, body: JSON.stringify(data) })
      .catch((err) => console.warn(`[write PUT] ${path}:`, err));
  }
  private fbPatch(path: string, data: unknown): void {
    this.markStoryWrite(path, data);
    const url = this.useQuarkus() ? this.apiUrl(path) : this.dbUrl(path);
    fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...this.actorHeaders() }, body: JSON.stringify(data) })
      .catch((err) => console.warn(`[write PATCH] ${path}:`, err));
  }
  private fbDelete(path: string): void {
    this.markStoryWrite(path);
    const url = this.useQuarkus() ? this.apiUrl(path) : this.dbUrl(path);
    fetch(url, { method: 'DELETE', headers: this.actorHeaders() }).catch((err) => console.warn(`[write DELETE] ${path}:`, err));
  }
  /**
   * PATCH que SÍ se ESPERA y CONFIRMA (a diferencia de `fbPatch`, fire-and-forget). Lo usa la
   * CREACIÓN de tareas: la tarjeta solo se da por guardada si el backend responde OK, así una
   * tarea recién creada no se pierde si la app se cierra justo después (regla de oro: await+confirmar).
   * Devuelve true si el backend aceptó el guardado.
   */
  private async fbPatchAwait(path: string, data: unknown): Promise<boolean> {
    this.markStoryWrite(path, data);
    const url = this.useQuarkus() ? this.apiUrl(path) : this.dbUrl(path);
    try {
      const r = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...this.actorHeaders() },
        body: JSON.stringify(data),
      });
      return r.ok;
    } catch (err) {
      console.warn(`[write PATCH await] ${path}:`, err);
      return false;
    }
  }

  // ── localStorage fallback ──
  // Devuelve `any` a propósito: el blob de localStorage es heterogéneo y se
  // accede por punto (saved.sprints, etc.).
  private lsGet(): any {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  }
  private lsPut(key: string, data: unknown): void {
    const s = this.lsGet();
    s[key] = data;
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  }
  private persist(key: string, data: unknown): void {
    // Modo Quarkus → PUT al backend; Firebase → PUT a Firebase; si no, localStorage.
    if (this.useQuarkus() || this.fbReady()) this.fbPut(key, data);
    else this.lsPut(key, data);
  }
  private async loadLocal(path: string): Promise<any> {
    const r = await fetch(path);
    if (!r.ok) throw new Error(`Cannot load ${path}`);
    return r.json();
  }

  private arrToMap(arr: Story[]): Record<string, Story> {
    return Object.fromEntries((arr || []).filter((s) => s && s.id).map((s) => [s.id, s]));
  }
  private normalizeStories(fbVal: any): Story[] {
    const raw = fbVal && fbVal.stories;
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (raw && typeof raw === 'object') return Object.values(raw).filter(Boolean) as Story[];
    return [];
  }

  // ── Init ──
  private initPromise: Promise<void> | null = null;
  /** Inicializa una sola vez aunque la llamen varias vistas. */
  ensureInit(): Promise<void> {
    return (this.initPromise ??= this.init());
  }

  async init(): Promise<void> {
    this.migrateLegacyKeys();
    this.clients.set((await this.loadLocal('data/clients.json')).clients || []);

    if (this.useQuarkus()) {
      await this.initFromQuarkus();
    } else if (this.fbReady()) {
      const [fbSt, fbPr, fbQu, fbWk, fbHdA, fbHdN, fbSolN, fbHdP] = await Promise.all([
        this.fbGet('stories'), this.fbGet('progress'), this.fbGet('queries'),
        this.fbGet('weeklySupport'), this.fbGet('hdActions'), this.fbGet('hdNotes'), this.fbGet('solNotes'),
        this.fbGet('hdPendientes'),
      ]);

      const seedOrLoad = async (fbVal: any, localPath: string, key: string) => {
        if (fbVal !== null) return fbVal;
        const seed = await this.loadLocal(localPath);
        this.fbPut(key, seed);
        return seed;
      };

      // Users: siempre del JSON local, y se sobreescriben en Firebase
      const localUsers = await this.loadLocal('data/users.json');
      this.team.set(localUsers.users || []);
      this.fbPut('users', localUsers);

      const [pr, qu] = await Promise.all([
        seedOrLoad(fbPr, 'data/progress.json', 'progress'),
        seedOrLoad(fbQu, 'data/queries.json', 'queries'),
      ]);
      this._progress = pr;
      this._queries = qu;

      let stArr: Story[];
      if (fbSt === null) {
        const seed = await this.loadLocal('data/stories.json');
        stArr = seed.stories || [];
        this.fbPut('stories/stories', this.arrToMap(stArr));
      } else {
        stArr = this.normalizeStories(fbSt);
        if (Array.isArray(fbSt.stories)) this.fbPut('stories/stories', this.arrToMap(stArr));
      }
      this.stories.set(stArr);

      this._weekly = fbWk || { weeks: {} };
      this._hdActions = fbHdA || JSON.parse(localStorage.getItem('fit-daily_hd_actions') || '{}');
      this._hdNotes = fbHdN || JSON.parse(localStorage.getItem('fit-daily_hd_notes') || '{}');
      this._solNotes = fbSolN || JSON.parse(localStorage.getItem('fit-daily_sol_notes') || '{}');
      this._hdPendientes = fbHdP || {};

      if (!fbHdA && Object.keys(this._hdActions).length) this.fbPut('hdActions', this._hdActions);
      if (!fbHdN && Object.keys(this._hdNotes).length) this.fbPut('hdNotes', this._hdNotes);
      if (!fbSolN && Object.keys(this._solNotes).length) this.fbPut('solNotes', this._solNotes);
      if (!fbHdP && Object.keys(this._hdPendientes).length) this.fbPut('hdPendientes', this._hdPendientes);
    } else {
      const saved = this.lsGet();
      const [st, pr, qu, tm] = await Promise.all([
        saved.stories ?? this.loadLocal('data/stories.json'),
        saved.progress ?? this.loadLocal('data/progress.json'),
        saved.queries ?? this.loadLocal('data/queries.json'),
        this.loadLocal('data/users.json'),
      ]);
      this.stories.set(st.stories || []);
      this._progress = pr;
      this._queries = qu;
      this.team.set(tm.users || []);
      this._weekly = saved.weeklySupport || { weeks: {} };
      this._hdActions = JSON.parse(localStorage.getItem('fit-daily_hd_actions') || '{}');
      this._hdNotes = JSON.parse(localStorage.getItem('fit-daily_hd_notes') || '{}');
      this._solNotes = JSON.parse(localStorage.getItem('fit-daily_sol_notes') || '{}');
      this._hdPendientes = saved.hdPendientes || {};
    }
  }

  /**
   * Fase 3 (slice 1): carga de SOLO LECTURA desde Quarkus (/api/legacy/*).
   * Mismas formas que los nodos de Firebase, así las vistas no cambian.
   * No escribe nada en Firebase (regla de oro del Strangler Fig).
   */
  private async initFromQuarkus(): Promise<void> {
    const [st, pr, qu, wk, hdA, hdN, solN, hdP, us] = await Promise.all([
      this.fbGet('stories'), this.fbGet('progress'), this.fbGet('queries'),
      this.fbGet('weeklySupport'), this.fbGet('hdActions'), this.fbGet('hdNotes'), this.fbGet('solNotes'),
      this.fbGet('hdPendientes'), this.fbGet('users'),
    ]);
    this.stories.set(this.normalizeStories(st));
    this._progress = pr || { entries: [] };
    this._queries = qu || { queries: [] };
    this.team.set((us && us.users) || []);
    this._weekly = wk || { weeks: {} };
    this._hdActions = hdA || {};
    this._hdNotes = hdN || {};
    this._solNotes = solN || {};
    this._hdPendientes = hdP || {};
  }

  private migrateLegacyKeys(): void {
    const pairs: [string, string][] = [
      ['fitscrum_v1', 'fit-daily_v1'],
      ['fitscrum_hd_actions', 'fit-daily_hd_actions'],
      ['fitscrum_hd_notes', 'fit-daily_hd_notes'],
      ['fitscrum_sol_notes', 'fit-daily_sol_notes'],
    ];
    for (const [oldKey, newKey] of pairs) {
      const oldVal = localStorage.getItem(oldKey);
      if (oldVal !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, oldVal);
        localStorage.removeItem(oldKey);
      }
    }
  }

  // ── Tasks (stories) ──
  getAllStories(): Story[] { return this.stories(); }
  /** Tareas del TABLERO ACTUAL (tablero continuo por equipo; ya no hay sprints). */
  getStoriesByBoard(): Story[] {
    const b = this.currentBoard();
    return this.stories().filter((s) => !b || (s.board || 'CUENCA') === b);
  }

  /**
   * Crea una tarea con GUARDADO CONFIRMADO e ID DEL SERVIDOR. Dos problemas que resuelve:
   *  1) Antes se agregaba optimista y se persistía en 2º plano (fire-and-forget): si la app se cerraba
   *     justo después, la tarjeta se perdía (nunca llegaba a la BD) — incidente TA-230.
   *  2) El id TA-NNN lo calculaba el navegador (max+1 de SU vista): una vista desactualizada podía
   *     chocar y PISAR la tarea de otro.
   * Ahora: en modo Quarkus se hace **POST** y el BACKEND asigna el id de forma atómica; la tarjeta se
   * agrega al tablero SOLO cuando el backend confirma. Si el backend aún no tiene el POST (no desplegado),
   * hace FALLBACK al PATCH con id local pero igualmente ESPERADO+confirmado. Si falla, LANZA (el modal avisa).
   */
  async addStory(data: Partial<Story>): Promise<Story> {
    const nextLocalId = () => {
      const nums = this.stories().map((s) => parseInt(s.id.replace('TA-', ''), 10)).filter((n) => !isNaN(n));
      return 'TA-' + String(Math.max(0, ...nums) + 1).padStart(3, '0');
    };
    const base: Story = {
      id: '', board: this.currentBoard() || 'CUENCA',
      status: 'todo', priority: 'media', description: '',
      assignee: null, client: null, ticket: '', dueDate: '', points: 1, progress: 0,
      approved: false, approvedDate: null, waitingClient: false, waitingDate: null, ...data,
    };
    let task: Story;
    if (this.useQuarkus()) {
      const serverId = await this.fbPostStory(base); // id atómico del backend (o null si no está el endpoint)
      if (serverId) {
        task = { ...base, id: serverId };
      } else {
        // Fallback (backend sin POST o error puntual): id local + PATCH ESPERADO (no fire-and-forget).
        task = { ...base, id: nextLocalId() };
        const ok = await this.fbPatchAwait('stories/stories', { [task.id]: task });
        if (!ok) throw new Error('No se pudo guardar la tarea. Revisa tu conexión e intenta de nuevo.');
      }
    } else if (this.fbReady()) {
      task = { ...base, id: nextLocalId() };
      const ok = await this.fbPatchAwait('stories/stories', { [task.id]: task });
      if (!ok) throw new Error('No se pudo guardar la tarea. Revisa tu conexión e intenta de nuevo.');
    } else {
      task = { ...base, id: nextLocalId() };
      this.lsPut('stories', { stories: [...this.stories(), task] });
    }
    // Solo tras confirmar el guardado se muestra en el tablero.
    this.stories.set([...this.stories(), task]);
    return task;
  }

  /**
   * POST de creación: el backend asigna el id de forma atómica y lo devuelve. Retorna el id, o `null`
   * si el endpoint no existe (backend viejo) o falla — el caller hace fallback al PATCH confirmado.
   */
  private async fbPostStory(task: Story): Promise<string | null> {
    this.markStoryWrite('stories/stories');
    try {
      const r = await fetch(this.apiUrl('stories/stories'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...this.actorHeaders() },
        body: JSON.stringify(task),
      });
      if (!r.ok) return null; // incl. 404/405 (backend sin el POST) → el caller hace fallback
      const created = await r.json().catch(() => null);
      return (created && created.id) || null;
    } catch (err) {
      console.warn('[create POST] stories:', err);
      return null;
    }
  }

  updateStoryStatus(id: string, status: string) { this.patchStoryField(id, { status }); }
  updateStoryProgress(id: string, progress: number) { this.patchStoryField(id, { progress }); }
  updateStoryDueDate(id: string, dueDate: string) { this.patchStoryField(id, { dueDate }); }
  updateStoryTitle(id: string, title: string) { this.patchStoryField(id, { title }); }
  updateStoryDescription(id: string, description: string) { this.patchStoryField(id, { description }); }
  updateStoryAssignee(id: string, assignee: string | null) { this.patchStoryField(id, { assignee }); }
  updateStoryClient(id: string, client: string | null) { this.patchStoryField(id, { client }); }
  updateStoryClientName(id: string, clientName: string) { this.patchStoryField(id, { clientName }); }
  updateStoryHdEstatus(id: string, hdEstatus: string) { this.patchStoryField(id, { hdEstatus }); }
  updateStoryPriority(id: string, priority: string) { this.patchStoryField(id, { priority }); }
  /** Actualiza campos de una reunión (tema/link/inicio/fin/subtipo + comunes) de una sola vez. */
  updateStoryReunion(id: string, patch: Partial<Story>) { this.patchStoryField(id, patch); }
  approveStory(id: string) { this.patchStoryField(id, { approved: true, approvedDate: new Date().toISOString().split('T')[0] }); }
  unapproveStory(id: string) { this.patchStoryField(id, { approved: false, approvedDate: null }); }
  setWaitingClient(id: string, waiting: boolean) {
    this.patchStoryField(id, { waitingClient: waiting, waitingDate: waiting ? new Date().toISOString().split('T')[0] : null });
  }
  /**
   * Escritura coalescida: aplica VARIOS campos de una tarea en UN SOLO PATCH.
   * Úsalo cuando una misma tarea cambia varios campos a la vez (p. ej. la sincronización
   * con el HelpDesk) para no disparar PATCH concurrentes a la misma fila (el backend hace
   * read-modify-write y dos PATCH simultáneos a la misma tarea se pisan → 500 + update perdido).
   */
  patchStory(id: string, fields: Partial<Story>): void { this.patchStoryField(id, fields); }

  deleteStory(id: string): void {
    this.stories.set(this.stories().filter((s) => s.id !== id));
    if (this.fbReady() || this.useQuarkus()) this.fbDelete('stories/stories/' + id);
    else this.lsPut('stories', { stories: this.stories() });
  }

  private patchStoryField(id: string, fields: Partial<Story>): void {
    const arr = this.stories();
    const idx = arr.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const updated = { ...arr[idx], ...fields };
    const next = [...arr]; next[idx] = updated;
    this.stories.set(next);
    if (this.fbReady() || this.useQuarkus()) this.fbPatch('stories/stories/' + id, fields);
    else this.lsPut('stories', { stories: next });
  }

  // ── Team / Clients ──
  getTeam() { return this.team(); }
  getMember(id: string) { return this.team().find((m) => m.id === id); }
  getClients() { return this.clients(); }
  getClient(id: string) { return this.clients().find((c) => c.id === id); }

  // ── Progress / Queries ──
  getProgress() { return this._progress.entries; }
  addProgressEntry(data: any) {
    const nums = this._progress.entries.map((e) => parseInt(e.id.replace('PR-', ''), 10));
    const entry = { id: 'PR-' + String(Math.max(0, ...nums) + 1).padStart(3, '0'), date: new Date().toISOString().split('T')[0], ...data };
    this._progress.entries.push(entry);
    this.persist('progress', this._progress);
    return entry;
  }
  getQueries() { return this._queries.queries; }
  addQuery(data: any) {
    const nums = this._queries.queries.map((q) => parseInt(q.id.replace('QR-', ''), 10));
    const query = { id: 'QR-' + String(Math.max(0, ...nums) + 1).padStart(3, '0'), date: new Date().toISOString().split('T')[0], status: 'open', response: null, respondedBy: null, ...data };
    this._queries.queries.push(query);
    this.persist('queries', this._queries);
    return query;
  }
  resolveQuery(id: string, response: string, respondedBy: string) {
    const q = this._queries.queries.find((x) => x.id === id);
    if (q) { q.status = 'resolved'; q.response = response; q.respondedBy = respondedBy; this.persist('queries', this._queries); }
  }
  deleteQuery(id: string) {
    this._queries.queries = this._queries.queries.filter((x) => x.id !== id);
    this.persist('queries', this._queries);
  }

  // ── Helpdesk acciones / notas / pendientes / sol ──
  getHdActions() { return this._hdActions; }
  setHdAction(ticketId: string, active: boolean) {
    if (active) this._hdActions[String(ticketId)] = true; else delete this._hdActions[String(ticketId)];
    this.persist('hdActions', this._hdActions);
  }
  getHdNotes() { return this._hdNotes; }
  setHdNote(ticketId: string, note: string) {
    if (note && note.trim()) this._hdNotes[String(ticketId)] = note.trim(); else delete this._hdNotes[String(ticketId)];
    this.persist('hdNotes', this._hdNotes);
  }
  getHdPendientes() { return this._hdPendientes; }
  /**
   * Pendientes VISIBLES según el rol (solo Quarkus): ADMIN ve todos; RESPONSABLE_EQUIPO los de su
   * equipo; el resto solo los suyos. Cada uno anotado con owner/ownerName/equipo/mine/miEquipo.
   * Se usa en la vista de Pendientes (clasificada por equipo). La escritura sigue siendo solo la propia.
   */
  async loadPendientesVisibles(): Promise<any[]> {
    if (!this.useQuarkus()) return Object.entries(this._hdPendientes).map(([ticket, v]) => ({ ...(v as object), ticket, mine: true, miEquipo: true }));
    try {
      const list = await this.fbGet('hdPendientes-visibles');
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }
  /**
   * PUT dirigido a UN solo pendiente (nunca reconcilia el resto del mapa). Incidente 2026-09-17:
   * `setHdPendiente`/`updateHdPendiente`/`removeHdPendiente` reenviaban TODO `_hdPendientes` por
   * el PUT reconciliador de `/hdPendientes` — si ese mapa local no reflejaba fielmente el estado
   * real del servidor en ese momento (sesión recién cargada, otra pestaña vieja, etc.), el backend
   * "reconciliaba" borrando TODOS los pendientes reales del actor ausentes del envío. Pasó tres
   * veces (crear en ráfaga, eliminar uno, postergar uno). Fire-and-forget a propósito, igual que el
   * resto de los overlays legacy — la actualización optimista de `_hdPendientes` y de la señal local
   * (en `pendientes.ts`) es la que se ve al instante.
   */
  private putHdPendiente(ticketId: string, data: unknown): void {
    const url = `${this.apiUrl('hdPendientes')}/${encodeURIComponent(ticketId)}`;
    fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...this.actorHeaders() }, body: JSON.stringify(data) })
      .catch((err) => console.warn(`[write PUT] hdPendientes/${ticketId}:`, err));
  }
  setHdPendiente(ticketId: string, data: any) {
    const value = { ...data, addedAt: new Date().toISOString() };
    this._hdPendientes[String(ticketId)] = value;
    this.putHdPendiente(ticketId, value);
  }
  /** Merge parcial sobre un pendiente (fecha/hora, pausa, lastAlerted). */
  updateHdPendiente(ticketId: string, patch: Record<string, any>) {
    const cur = this._hdPendientes[String(ticketId)];
    if (!cur) return;
    const value = { ...cur, ...patch };
    this._hdPendientes[String(ticketId)] = value;
    this.putHdPendiente(ticketId, value);
  }
  /** Borrado AWAITED de UN pendiente — mismo endpoint dedicado, mismo motivo (ver arriba). */
  async removeHdPendiente(ticketId: string): Promise<void> {
    const url = `${this.apiUrl('hdPendientes')}/${encodeURIComponent(ticketId)}`;
    try {
      await fetch(url, { method: 'DELETE', headers: this.actorHeaders() });
    } finally {
      delete this._hdPendientes[String(ticketId)];
    }
  }

  // ── Guardados personales de tickets (100% del dueño, sin visibilidad de equipo) ──
  getHdGuardados() { return this._hdGuardados; }
  async loadHdGuardados(): Promise<void> {
    if (!this.useQuarkus()) return;
    try {
      this._hdGuardados = (await this.fbGet('hdGuardados')) || {};
    } catch {
      /* silencioso: la ventana de Guardados igual funciona con lo que ya había en memoria */
    }
  }
  /** Toggle AWAITED (no fire-and-forget, a diferencia de hdActions/hdPendientes): es un endpoint
   *  propio de alternar, no un reemplazo del mapa completo. Devuelve el estado resultante. */
  async toggleGuardado(ticketId: string): Promise<boolean> {
    const url = `${this.apiUrl('hdGuardados')}/${encodeURIComponent(ticketId)}`;
    const r = await fetch(url, { method: 'PUT', headers: this.actorHeaders() });
    if (!r.ok) throw new Error(`toggle guardado error ${r.status}`);
    const { guardado } = await r.json();
    if (guardado) this._hdGuardados[String(ticketId)] = true; else delete this._hdGuardados[String(ticketId)];
    return guardado;
  }
  getSolNotes() { return this._solNotes; }
  setSolNote(ticketId: string, note: string) {
    if (note && note.trim()) this._solNotes[ticketId] = note.trim(); else delete this._solNotes[ticketId];
    this.persist('solNotes', this._solNotes);
  }

  // ── Weekly support ──
  // ── Rotación semanal POR EQUIPO (Fase multi-equipo) ──
  /** Codigo del equipo/board de la rotación en la vista (''=el del actor, default backend). */
  private _semanalTeam = '';
  getSemanalTeam() { return this._semanalTeam; }
  /** Carga la rotación de un equipo (codigo de board). En Quarkus va con ?equipo=; en Firebase, global. */
  async loadWeekly(equipoCodigo: string): Promise<void> {
    this._semanalTeam = equipoCodigo || '';
    if (!this.useQuarkus()) return; // Firebase: rotación única (ya en _weekly)
    try {
      const node = this._semanalTeam ? `weeklySupport?equipo=${encodeURIComponent(this._semanalTeam)}` : 'weeklySupport';
      this._weekly = (await this.fbGet(node)) || { weeks: {} };
    } catch {
      this._weekly = { weeks: {} };
    }
  }
  /** Miembros del equipo (para el picker de la rotación). id = codigo local (espacio del assignee). */
  async teamMembers(equipoCodigo: string): Promise<{ id: string; name: string }[]> {
    if (!this.useQuarkus()) return this.team().map((m) => ({ id: m.id, name: m.name }));
    try {
      const q = equipoCodigo ? `?equipo=${encodeURIComponent(equipoCodigo)}` : '';
      const r = await fetch(this.apiUrl('equipo-miembros' + q), { headers: this.actorHeaders() });
      return r.ok ? await r.json() : [];
    } catch {
      return [];
    }
  }
  private persistWeekly(): void {
    const node = this.useQuarkus() && this._semanalTeam
      ? `weeklySupport?equipo=${encodeURIComponent(this._semanalTeam)}` : 'weeklySupport';
    if (this.useQuarkus() || this.fbReady()) this.fbPut(node, this._weekly);
    else this.lsPut('weeklySupport', this._weekly);
  }

  getWeeklySupport() { return this._weekly.weeks || {}; }
  getWeekAssignment(key: string) { return this._weekly.weeks[key] || null; }
  setWeekAssignment(key: string, assigneeId: string, notes = '') {
    if (!assigneeId) return this.clearWeekAssignment(key);
    this._weekly.weeks[key] = { assignee: assigneeId, notes: notes || '', updatedAt: new Date().toISOString() };
    this.persistWeekly();
  }
  clearWeekAssignment(key: string) {
    const existing = this._weekly.weeks[key];
    if (existing && existing.tickets && existing.tickets.length) this._weekly.weeks[key] = { tickets: existing.tickets };
    else delete this._weekly.weeks[key];
    this.persistWeekly();
  }
  getWeekTickets(key: string) { return (this._weekly.weeks[key] && this._weekly.weeks[key].tickets) || []; }
  addWeekTicket(key: string, ticketId: string, desc: string) {
    if (!ticketId || !ticketId.trim()) return;
    if (!this._weekly.weeks[key]) this._weekly.weeks[key] = {};
    if (!this._weekly.weeks[key].tickets) this._weekly.weeks[key].tickets = [];
    this._weekly.weeks[key].tickets.push({ id: ticketId.trim(), desc: (desc || '').trim(), addedAt: new Date().toISOString() });
    this.persistWeekly();
  }
  removeWeekTicket(key: string, idx: number) {
    const tickets = this._weekly.weeks[key] && this._weekly.weeks[key].tickets;
    if (!tickets) return;
    tickets.splice(idx, 1);
    this.persistWeekly();
  }

  // ── Senior de Turno (2 roles por semana: Mesa de Ayuda + Emergentes) ──
  // Mismo patrón que "Weekly support" de arriba (rotación por equipo, `?equipo=`), pero con 2
  // roles en vez de 1 y asignación abierta a CUALQUIER empleado (no solo del equipo) — por eso no
  // hay `teamMembers()` propio acá: el picker de la UI usa `HelpdeskService.hdUsers()` (catálogo
  // completo). Solo Quarkus: es una función nueva, sin dato histórico en Firebase que migrar.
  //
  // Endpoints `turnoSenior?equipo=` y `turnoSenior/hoy` (backend V27, 2026-09-28). Contrato en
  // `docs/contrato-api.md`.
  private _turnoSeniorTeam = '';
  async loadTurnoSenior(equipoCodigo: string): Promise<void> {
    this._turnoSeniorTeam = equipoCodigo || '';
    if (!this.useQuarkus()) { this._turnoSenior = { weeks: {} }; return; }
    try {
      const node = this._turnoSeniorTeam ? `turnoSenior?equipo=${encodeURIComponent(this._turnoSeniorTeam)}` : 'turnoSenior';
      this._turnoSenior = (await this.fbGet(node)) || { weeks: {} };
    } catch {
      this._turnoSenior = { weeks: {} };
    }
  }
  private persistTurnoSenior(): void {
    if (!this.useQuarkus()) return;
    const node = this._turnoSeniorTeam ? `turnoSenior?equipo=${encodeURIComponent(this._turnoSeniorTeam)}` : 'turnoSenior';
    this.fbPut(node, this._turnoSenior);
  }

  getTurnoSenior() { return this._turnoSenior.weeks || {}; }
  getTurnoSeniorAssignment(key: string) { return this._turnoSenior.weeks[key] || null; }
  /** Guarda si al menos uno de los 2 roles viene lleno (se permite cubrir un solo rol primero). */
  setTurnoSeniorAssignment(key: string, roles: { mesaAyuda: string; emergentes: string }, notes = '') {
    const mesaAyuda = (roles.mesaAyuda || '').trim();
    const emergentes = (roles.emergentes || '').trim();
    if (!mesaAyuda && !emergentes) return this.clearTurnoSeniorAssignment(key);
    this._turnoSenior.weeks[key] = { mesaAyuda, emergentes, notes: notes || '', updatedAt: new Date().toISOString() };
    this.persistTurnoSenior();
  }
  clearTurnoSeniorAssignment(key: string) {
    delete this._turnoSenior.weeks[key];
    this.persistTurnoSenior();
  }

  /** Agregado sobre TODOS los equipos: ¿el actor logueado está de turno HOY? Para el punto rojo
   *  del menú — la asignación es abierta, así que puede tocarle un equipo al que ni pertenece, y
   *  el menú es visible sin importar qué pantalla se esté viendo (no alcanza con mirar solo el
   *  equipo seleccionado en la propia pantalla de Senior de Turno). */
  async checkTurnoSeniorHoy(): Promise<{ deTurno: boolean; rol?: 'mesaAyuda' | 'emergentes'; equipo?: string; equipoNombre?: string }> {
    if (!this.useQuarkus()) return { deTurno: false };
    try {
      return (await this.fbGet('turnoSenior/hoy')) || { deTurno: false };
    } catch {
      return { deTurno: false };
    }
  }

  // ── Real-time sync (SSE de Firebase + polling de respaldo) ──
  private es: EventSource | null = null;
  private streamDebounce: any = null;
  private safetyTimer: any = null;
  private pollTimer: any = null;

  private markStoryWrite(path: string, data?: any): void {
    if (typeof path !== 'string' || !path.startsWith('stories')) return;
    const now = Date.now();
    const single = path.match(/^stories\/stories\/(.+)$/);
    if (single) {
      this.recentWrites.set(decodeURIComponent(single[1]), now);
    } else if (data && typeof data === 'object') {
      const map = path === 'stories' ? (data.stories || {}) : data;
      Object.keys(map).forEach((id) => this.recentWrites.set(id, now));
    }
    if (this.recentWrites.size > 200) {
      for (const [id, ts] of this.recentWrites) if (now - ts >= GRACE_MS) this.recentWrites.delete(id);
    }
  }
  private writtenRecently(id: string): boolean {
    const ts = this.recentWrites.get(id);
    return ts != null && Date.now() - ts < GRACE_MS;
  }
  private applyRemoteStories(remoteArr: Story[]): boolean {
    if (!remoteArr || !remoteArr.length) return false;
    let changed = false;
    const arr = [...this.stories()];
    remoteArr.forEach((rs) => {
      if (!rs || !rs.id) return;
      if (this.writtenRecently(rs.id)) return;
      const local = arr.find((s) => s.id === rs.id);
      if (!local) { arr.push(rs); changed = true; }
      else if (JSON.stringify(local) !== JSON.stringify(rs)) { Object.assign(local, rs); changed = true; }
    });
    const remoteIds = new Set(remoteArr.filter((s) => s && s.id).map((s) => s.id));
    const before = arr.length;
    const filtered = arr.filter((s) => remoteIds.has(s.id) || this.writtenRecently(s.id));
    if (filtered.length !== before) changed = true;
    if (changed) this.stories.set(filtered);
    return changed;
  }
  private async syncStoriesOnce(): Promise<void> {
    try { this.applyRemoteStories(this.normalizeStories(await this.fbGet('stories'))); }
    catch { /* reintenta en el próximo evento/ciclo */ }
  }
  startStreaming(): void {
    // En modo Quarkus no hay SSE de Firebase; el board se sirve estático (slice 1).
    if (!this.fbReady() || this.useQuarkus() || this.es) return;
    if (typeof EventSource === 'undefined') { this.startPolling(5000); return; }
    const trigger = () => { clearTimeout(this.streamDebounce); this.streamDebounce = setTimeout(() => this.syncStoriesOnce(), 250); };
    try { this.es = new EventSource(this.dbUrl('stories')); }
    catch { this.startPolling(5000); return; }
    this.es.addEventListener('put', trigger);
    this.es.addEventListener('patch', trigger);
    this.safetyTimer = setInterval(() => this.syncStoriesOnce(), 60000);
  }
  stopStreaming(): void {
    if (this.es) { try { this.es.close(); } catch { /* */ } this.es = null; }
    clearTimeout(this.streamDebounce);
    if (this.safetyTimer) { clearInterval(this.safetyTimer); this.safetyTimer = null; }
  }
  startPolling(intervalMs = 30000): void {
    if (!this.fbReady() || this.useQuarkus() || this.pollTimer) return;
    this.pollTimer = setInterval(() => this.syncStoriesOnce(), intervalMs);
  }
  stopPolling(): void { if (this.pollTimer) { clearInterval(this.pollTimer); this.pollTimer = null; } }
}
