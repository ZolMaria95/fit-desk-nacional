import { Component, OnDestroy, TemplateRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { Client, DataService, Story } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { TransferenciasService } from '../../core/services/transferencias.service';
import { ShellService } from '../../core/services/shell.service';
import { MatMenuModule } from '@angular/material/menu';
import { CardDetailDialog } from './card-detail-dialog/card-detail-dialog';
import { ReunionDialog } from './reunion-dialog/reunion-dialog';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';
import { SprintDialog } from './sprint-dialog/sprint-dialog';
import {
  HD_ESTADO_ESPERANDO,
  HD_ESTADO_POR_STATUS,
  PRIORITY_LABELS,
  Priority,
  STATUSES,
  STATUS_LABELS,
  Status,
  WorkDeps,
  canStartWork,
  cardTilt,
  clientStyle,
  colorFor,
  dueInfo,
  pastel,
  progColor,
  resolveMember,
  roundUp5,
  shortName,
  statusFromTicketEstado,
} from './board-utils';

type PriorityFilter = 'all' | Priority;

interface Column {
  status: Status;
  label: string;
  cards: Story[];
}

/**
 * Board Kanban (port de js/board.js). Render reactivo por signals de DataService,
 * drag & drop con CDK, filtros y modal de detalle (MatDialog). Las integraciones
 * con el Helpdesk (estado HD, conversación, auto-asignación) llegan en la Fase 2.
 */
@Component({
  selector: 'app-board',
  imports: [
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnDestroy {
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly helpdesk = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  private readonly transfer = inject(TransferenciasService);
  private readonly shell = inject(ShellService);

  /** Panel de filtros que se publica al drawer del shell (mismo patrón que Tickets). */
  readonly filtersTpl = viewChild<TemplateRef<unknown>>('filtersTpl');

  readonly syncing = signal(false);
  /** Prioridad viva del ticket (orden numérico del HelpDesk) por ticketId, poblada en el sync.
   *  Las tarjetas con ticket muestran ESTE valor en vez de la prioridad interna Alta/Media/Baja. */
  readonly ticketPrioMap = signal<Record<string, string>>({});

  /** Toggle "Mi equipo" (solo RE/ADMIN): incluye en el board las tareas foráneas de mi gente. */
  readonly teamOnly = signal(false);
  /** hids (mayúsculas) de los miembros de los equipos que gobierno. Vacío si no soy RE/ADMIN. */
  private readonly teamHids = signal<Set<string>>(new Set());
  /** ¿Mostrar el toggle "Mi equipo"? RE/ADMIN y en modo Quarkus. */
  readonly puedeVerEquipo = computed(() => this.data.usesQuarkus() && this.auth.puedeTransferir());

  constructor() {
    // Carga empleados y clientes del Helpdesk (consulta independiente + cache) para
    // resolver nombre/rol del asignado y nombre/color del cliente en las cards.
    this.helpdesk.getHdUsers();
    this.helpdesk.getClients();
    this.helpdesk.getTicketStatuses();
    // Al abrir: carga los tableros visibles, entra al del usuario y sincroniza (read-only).
    this.data.ensureInit().then(() => this.initBoards());
    // Roster de mi equipo (para el toggle "Mi equipo"), solo si puedo verlo.
    if (this.data.usesQuarkus() && this.auth.puedeTransferir()) {
      this.transfer.miEquipoMiembros()
        .then((ms) => this.teamHids.set(new Set(ms.map((m) => String(m.helpdeskUserId || '').trim().toUpperCase()).filter(Boolean))))
        .catch(() => {});
    }
    // Publica los filtros de esta vista en el drawer del shell (una vez, tras el primer
    // render), igual que Tickets. Se limpian al salir en ngOnDestroy.
    afterNextRender(() => this.shell.setFilters(this.filtersTpl() ?? null));
  }

  ngOnDestroy(): void {
    this.shell.clear();
  }

  toggleTeam(): void {
    this.teamOnly.update((v) => !v);
  }

  // ── Tableros (multi-equipo) ──
  readonly boards = computed(() => this.data.boards());
  readonly currentBoard = computed(() => this.data.currentBoard());

  /** Carga los tableros que el usuario puede ver y entra al primero (su equipo). */
  private async initBoards(): Promise<void> {
    if (this.data.usesQuarkus()) {
      const list = await this.data.loadBoards(this.auth.session()?.id ?? null);
      if (list.length) await this.data.switchBoard(list[0].codigo);
    }
    await this.syncTicketStatuses();
  }

  /** Selector de tablero: cambia de board y re-sincroniza los estados de ticket del nuevo. */
  async switchBoard(codigo: string): Promise<void> {
    if (!codigo || codigo === this.currentBoard()) return;
    await this.data.switchBoard(codigo);
    await this.syncTicketStatuses();
  }

  /** Consulta el estado del ticket de cada tarea con ticket y la ubica en su columna. */
  private async syncTicketStatuses(): Promise<void> {
    const active = this.data.sprints().active;
    const conTicket = this.data.getStoriesBySprint(active).filter((s) => s.ticket);
    if (!conTicket.length) return;
    this.syncing.set(true);
    // Estado FRESCO del ticket: se lee EN VIVO (GET read-only) por tarjeta, así el board refleja
    // los cierres/cambios recientes del HelpDesk. La caché ticket_espejo (que puede estar
    // desactualizada) queda solo como RESPALDO si la lectura viva falla (404/ticket viejo).
    // Solo tarjetas del sprint activo con ticket → volumen acotado. Sigue siendo read-only.
    const cache = this.data.usesQuarkus() ? await this.data.getTicketEspejoCache() : null;
    const prios: Record<string, string> = {};
    await Promise.all(
      conTicket.map(async (s) => {
        const raw = (await this.helpdesk.fetchTicketRaw(s.ticket)) ?? (cache ? cache[s.ticket] : null);
        if (!raw) return;
        // Prioridad/orden del ticket (la del HelpDesk), para mostrarla en la tarjeta.
        const prio = String(raw.priority ?? '').trim();
        if (prio) prios[s.ticket] = prio;
        // El cliente de una tarea con ticket lo define el ticket (id + nombre, para
        // mostrar el nombre aunque el cliente no esté en el catálogo).
        const clientId = String(raw.client_id ?? '').trim();
        if (clientId && s.client !== clientId) this.data.updateStoryClient(s.id, clientId);
        const clientName = String(raw.cliente ?? '').trim();
        if (clientName && s.clientName !== clientName) this.data.updateStoryClientName(s.id, clientName);
        // La carga del board es SOLO LECTURA contra el HelpDesk: NO se re-empuja la asignación.
        // Antes, si el asignado local difería del del ticket, se llamaba a assignTicket() aquí y
        // se REASIGNABA el ticket real en el HelpDesk en cada carga (sin acción del usuario, y podía
        // arrastrar un cambio de estado del lado del HelpDesk). La asignación al HelpDesk ahora ocurre
        // solo por acción explícita (diálogo de la tarjeta / asignar ticket).
        const estado = String(raw.estado || '');
        if (estado && s.hdEstatus !== estado) this.data.updateStoryHdEstatus(s.id, estado);
        const m = statusFromTicketEstado(estado);
        if (s.status !== m.status) this.data.updateStoryStatus(s.id, m.status);
        // El check "Finalizado" lo define siempre el ticket (marca o desmarca).
        if (m.approved !== undefined && !!s.approved !== m.approved) {
          m.approved ? this.data.approveStory(s.id) : this.data.unapproveStory(s.id);
        }
        if (m.waiting && !s.waitingClient) this.data.setWaitingClient(s.id, true);
      }),
    );
    this.ticketPrioMap.set(prios);
    this.syncing.set(false);
  }

  /** Prioridad/orden del ticket asociado a la tarjeta (vacío si no se ha sincronizado o no tiene). */
  ticketPrio(ticketId?: string): string {
    return ticketId ? this.ticketPrioMap()[ticketId] || '' : '';
  }

  /** Clase de color del badge según el orden del ticket (1 = más urgente … ≥3 = baja). */
  prioClase(orden: string): string {
    const n = parseInt(orden, 10);
    if (n <= 1) return 'prio-alta';
    if (n === 2) return 'prio-media';
    return 'prio-baja';
  }

  // ── Helpers expuestos al template ──
  readonly resolveMember = (id: string | null | undefined) =>
    resolveMember(id, this.data.team(), this.helpdesk.hdUsers());
  readonly dueInfo = dueInfo;
  readonly progColor = progColor;
  readonly clientStyle = clientStyle;
  readonly pastel = pastel;
  readonly cardTilt = cardTilt;
  readonly STATUS_LABELS = STATUS_LABELS;
  readonly PRIORITY_LABELS = PRIORITY_LABELS;
  readonly PRIORITY_FILTERS: PriorityFilter[] = ['all', 'alta', 'media', 'baja'];

  // ── Filtros (signals locales) ──
  readonly priorityFilter = signal<PriorityFilter>('all');
  readonly activeClients = signal<Set<string>>(new Set());
  readonly activeAssignees = signal<Set<string>>(new Set());
  readonly ticketSearch = signal('');
  // Búsqueda por palabra vía API: `matchedTickets` = números de ticket que coinciden
  // con el HelpDesk (null = sin búsqueda por texto). El board filtra las cards por
  // pertenencia a este set. `searchedTerm` = última palabra realmente buscada (para el
  // hint "pendiente"). La búsqueda por N° sigue siendo local e instantánea.
  readonly matchedTickets = signal<Set<string> | null>(null);
  readonly searchingTickets = signal(false);
  readonly searchedTerm = signal('');
  /** Término escrito (N° o palabra) pero aún NO buscado (para el hint "Presiona Enter"). */
  readonly searchPending = computed(() => {
    const v = this.ticketSearch().trim();
    return !!v && v !== this.searchedTerm();
  });
  /** Atajo "Asignados a mí": muestra solo las tareas del usuario en sesión. */
  readonly mineOnly = signal(false);

  // ── Permisos ──
  readonly puedeGestionarTodo = this.auth.puedeGestionarTodo;
  readonly puedeBorrarBoard = this.auth.puedeBorrarBoard;
  private get myId(): string {
    return String(this.auth.session()?.id || '').trim().toUpperCase();
  }

  // ── Sprints ──
  readonly sprints = computed(() => this.data.sprints().sprints);
  readonly activeSprintId = computed(() => this.data.sprints().active);
  readonly activeSprint = computed(() => this.data.getActiveSprint());

  setSprint(id: string): void {
    this.data.setActiveSprint(id);
  }
  openNewSprint(): void {
    this.dialog.open(SprintDialog, { data: { sprint: null }, width: '480px', maxWidth: '95vw' });
  }
  openEditSprint(): void {
    const s = this.activeSprint();
    if (s) this.dialog.open(SprintDialog, { data: { sprint: s }, width: '480px', maxWidth: '95vw' });
  }
  fmtSprintDate(iso?: string): string {
    if (!iso) return '';
    return new Date(iso + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  // ── Estado derivado ──
  readonly clients = computed(() => this.data.clients());

  /** Base visible: tareas del sprint activo, ocultando DONE aprobadas pasado 1 día. */
  readonly visibleStories = computed<Story[]>(() => {
    const active = this.data.sprints().active;
    const board = this.data.currentBoard();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 2); // done-finalizadas salen del board tras 2 días
    const cutoffStr = cutoff.toISOString().split('T')[0];
    return this.data
      .stories()
      // El sprint es único POR board → filtrar también por el tablero actual.
      .filter((s) => s.sprint === active && (!board || (s.board || 'CUENCA') === board))
      .filter((s) => !(s.status === 'done' && s.approved && (s.approvedDate || '') < cutoffStr));
  });

  /**
   * Fuente de tarjetas para las columnas: la base del tablero activo y, si "Asignados a mí"
   * está activo, TAMBIÉN mis tarjetas de OTROS tableros (p. ej. una transferida a mí que sigue
   * en el board de su equipo dueño). Así quien recibe una transferencia la ve y la trabaja sin
   * cambiar de tablero. Arrastrarla solo cambia su estado, no su board (ver `drop`).
   */
  readonly cardsSource = computed<Story[]>(() => {
    const base = this.visibleStories();
    const me = this.myId;
    const mine = this.mineOnly();
    const team = this.teamOnly();
    if ((!mine && !team) || !me) return base;
    const teamSet = this.teamHids();
    const board = this.data.currentBoard();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 2);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    const yaEsta = new Set(base.map((s) => s.id));
    const foraneas = this.data.stories().filter((s) => {
      if (yaEsta.has(s.id)) return false;
      if ((s.board || 'CUENCA') === (board || 'CUENCA')) return false; // solo tarjetas de OTRO tablero
      if (s.status === 'done' && s.approved && (s.approvedDate || '') < cutoffStr) return false;
      const a = String(s.assignee || '').trim().toUpperCase();
      if (!a) return false;
      if (mine && a === me) return true; // "Asignados a mí": mis tarjetas foráneas
      if (team && teamSet.has(a)) return true; // "Mi equipo": tarjetas foráneas de mi gente
      return false;
    });
    return foraneas.length ? [...base, ...foraneas] : base;
  });

  /** ¿La tarjeta pertenece a un tablero distinto del activo? (solo con board scoping = modo Quarkus). */
  esForanea(card: Story): boolean {
    const board = this.data.currentBoard();
    return !!board && (card.board || 'CUENCA') !== board;
  }

  /** Etiqueta legible del equipo/tablero dueño de una tarjeta (badge de card foránea). */
  boardLabel(codigo: string | null | undefined): string {
    if (!codigo) return '';
    const b = this.data.boards().find((x) => x.codigo === codigo);
    return b?.equipo || b?.nombre || codigo;
  }

  /** Empleados asignados en el board (para el multi-select), ordenados por nombre. */
  readonly assigneeChips = computed(() => {
    const ids = [...new Set(this.visibleStories().map((s) => s.assignee).filter(Boolean))] as string[];
    return ids
      .map((id) => this.resolveMember(id))
      .filter((m): m is NonNullable<typeof m> => !!m)
      .sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id, 'es'));
  });

  /** Clientes presentes en las tareas del board (para el multi-select), por nombre. */
  readonly clientChips = computed(() => {
    const ids = [...new Set(this.visibleStories().map((s) => s.client).filter(Boolean))] as string[];
    return ids
      .map((id) => {
        const c = this.clientOf(id);
        return { id, name: c?.name || id, color: c?.color || colorFor(id) };
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));
  });

  // Buscador dentro de cada multi-select de filtro.
  readonly buscarAsignado = signal('');
  readonly buscarCliente = signal('');
  private filtraOpc<T extends { id: string; name: string }>(list: T[], term: string): T[] {
    const t = term.trim().toLowerCase();
    return t ? list.filter((x) => x.name.toLowerCase().includes(t) || x.id.toLowerCase().includes(t)) : list;
  }
  readonly assigneeOptions = computed(() => this.filtraOpc(this.assigneeChips(), this.buscarAsignado()));
  readonly clientOptions = computed(() => this.filtraOpc(this.clientChips(), this.buscarCliente()));

  readonly columns = computed<Column[]>(() => {
    const prio = this.priorityFilter();
    const clients = this.activeClients();
    const assignees = this.activeAssignees();
    // Filtra por el término YA APLICADO (searchedTerm), no por lo que se está tecleando:
    // la búsqueda (N° o palabra) se aplica solo al pulsar buscar (submitTicketSearch).
    const term = this.searchedTerm().trim();
    const isNum = /^\d+$/.test(term); // N° → filtro local; palabra → coincidencia por API
    const matched = this.matchedTickets();
    const mine = this.mineOnly();
    const team = this.teamOnly();
    const me = this.myId;
    const filtered = this.cardsSource().filter((s) => {
      // "Asignados a mí" recorta a mis tareas; si además está "Mi equipo", no se recorta (gana equipo).
      if (mine && !team && String(s.assignee || '').trim().toUpperCase() !== me) return false;
      if (prio !== 'all' && s.priority !== prio) return false;
      if (clients.size > 0 && !(s.client && clients.has(s.client))) return false;
      if (assignees.size > 0 && !(!s.assignee || assignees.has(s.assignee))) return false;
      if (term) {
        if (isNum) {
          // Numérico: coincidencia local por número (admite parciales).
          if (!(s.ticket && String(s.ticket).includes(term))) return false;
        } else {
          // Palabra: solo cards cuyo ticket coincide con el HelpDesk (matchedTickets).
          // matched=null (aún buscando/sin resultados) → no muestra ninguna.
          if (!(s.ticket && matched?.has(String(s.ticket)))) return false;
        }
      }
      return true;
    });
    return STATUSES.map((status) => ({
      status,
      label: STATUS_LABELS[status],
      cards: filtered.filter((s) => s.status === status),
    }));
  });

  private get workDeps(): WorkDeps {
    return { data: this.data, auth: this.auth, dialog: this.dialog, snack: this.snack };
  }

  // ── Filtros ──
  setPriority(f: PriorityFilter): void {
    this.priorityFilter.set(f);
    this.activeAssignees.set(new Set()); // paridad con el legacy
  }
  /** Atajo: alterna el filtro "Asignados a mí" (solo mis tareas). Al activarlo limpia
   *  el multi-select de asignados para no mezclar criterios. */
  toggleMine(): void {
    const next = !this.mineOnly();
    this.mineOnly.set(next);
    if (next) this.activeAssignees.set(new Set());
  }

  /** ¿Hay algún filtro activo? (para mostrar el botón "Limpiar filtros"). */
  readonly hasFilters = computed(
    () =>
      this.priorityFilter() !== 'all' ||
      this.mineOnly() ||
      this.selectedAssignees().length > 0 ||
      this.selectedClients().length > 0 ||
      !!this.ticketSearch().trim(),
  );
  /** Limpia todos los filtros del board (prioridad, mis tareas, asignados, clientes, búsqueda). */
  clearFilters(): void {
    this.priorityFilter.set('all');
    this.mineOnly.set(false);
    this.activeAssignees.set(new Set());
    this.activeClients.set(new Set());
    this.ticketSearch.set('');
    this.matchedTickets.set(null);
    this.searchingTickets.set(false);
    this.searchedTerm.set('');
    this.buscarAsignado.set('');
    this.buscarCliente.set('');
  }

  /**
   * Cambio en la caja del board (cada tecla): SOLO guarda el texto; NO filtra (ni por N°
   * ni por palabra). La búsqueda se aplica con la orden explícita (`submitTicketSearch`,
   * con Enter o el ícono). Vaciar la caja sí quita el filtro de inmediato.
   */
  onTicketSearchInput(value: string): void {
    this.ticketSearch.set(value);
    if (!value.trim()) {
      // Vaciar → quita el filtro de búsqueda (no es una búsqueda).
      this.matchedTickets.set(null);
      this.searchingTickets.set(false);
      this.searchedTerm.set('');
    }
    // Con texto: no filtra; el usuario debe ejecutar submitTicketSearch().
  }

  /** Búsqueda EXPLÍCITA (Enter / ícono). N° → filtro local; palabra → API + filtra las cards. */
  async submitTicketSearch(): Promise<void> {
    const v = this.ticketSearch().trim();
    if (!v || /^\d+$/.test(v)) {
      // Vacío o numérico → filtro local (por `searchedTerm`); no consulta el API.
      this.matchedTickets.set(null);
      this.searchingTickets.set(false);
      this.searchedTerm.set(v);
      return;
    }
    // Palabra → búsqueda por contenido en el HelpDesk; el board filtra por coincidencia.
    this.searchingTickets.set(true);
    this.matchedTickets.set(null);
    this.searchedTerm.set(v);
    const set = await this.helpdesk.searchTicketNumbers(v);
    if (this.ticketSearch().trim() !== v) return; // el usuario cambió el término
    this.matchedTickets.set(set);
    this.searchingTickets.set(false);
  }

  // Copiar el número de ticket de una card (feedback breve con ✓).
  readonly ticketCopiado = signal<string | null>(null);
  copiarTicket(ticket: string, ev: Event): void {
    ev.stopPropagation();
    navigator.clipboard
      ?.writeText(String(ticket))
      .then(() => {
        this.ticketCopiado.set(ticket);
        setTimeout(() => this.ticketCopiado.set(null), 1500);
      })
      .catch(() => {});
  }
  /** Ids seleccionados como array (para el mat-select multiple y los globos). */
  readonly selectedAssignees = computed(() => [...this.activeAssignees()]);
  /** Reemplaza la selección desde el multi-select. */
  onAssigneeSelectChange(ids: string[]): void {
    this.activeAssignees.set(new Set(ids));
  }
  /** ¿Están todos los empleados del board seleccionados? */
  readonly allAssigneesSelected = computed(
    () => this.assigneeChips().length > 0 && this.selectedAssignees().length === this.assigneeChips().length,
  );
  /** Selecciona todos los empleados del board (o los quita si ya están todos). */
  toggleAllAssignees(): void {
    if (this.allAssigneesSelected()) this.activeAssignees.set(new Set());
    else this.activeAssignees.set(new Set(this.assigneeChips().map((m) => m.id)));
  }
  /** Nombre corto para los globos (criterio compartido en board-utils). */
  readonly shortName = shortName;
  /** Quita un asignado (la "x" del globo). */
  removeAssignee(id: string): void {
    const s = new Set(this.activeAssignees());
    s.delete(id);
    this.activeAssignees.set(s);
  }
  clearAssignees(): void {
    this.activeAssignees.set(new Set());
  }

  // ── Filtro de clientes (multi-select, mismo patrón que asignados) ──
  readonly selectedClients = computed(() => [...this.activeClients()]);
  onClientSelectChange(ids: string[]): void {
    this.activeClients.set(new Set(ids));
  }
  readonly allClientsSelected = computed(
    () => this.clientChips().length > 0 && this.selectedClients().length === this.clientChips().length,
  );
  toggleAllClients(): void {
    if (this.allClientsSelected()) this.activeClients.set(new Set());
    else this.activeClients.set(new Set(this.clientChips().map((c) => c.id)));
  }
  removeClient(id: string): void {
    const s = new Set(this.activeClients());
    s.delete(id);
    this.activeClients.set(s);
  }
  /** Nombre de cliente para el globo (resuelto desde las tareas). */
  clientNameOf(id: string): string {
    return this.clientChips().find((c) => c.id === id)?.name || id;
  }
  clientColorOf(id: string): string {
    return this.clientChips().find((c) => c.id === id)?.color || '#9aa0a6';
  }
  /** Resuelve el cliente: primero los locales (con color), luego el catálogo del API. */
  clientOf(id: string | null): { id: string; name: string; color?: string } | undefined {
    if (!id) return undefined;
    const local = this.data.getClient(id) as (Client & { color?: string }) | undefined;
    if (local) return { id: local.id, name: local.name, color: local.color };
    const api = this.helpdesk.clients().find((c) => c.id === id);
    return api ? { id: api.id, name: api.name } : { id, name: id };
  }

  // ── Drag & drop ──
  /** Mover la tarea y marcar sus checks: el asignado, el Helpdesk (MSC001) o un Supervisor. */
  puedeOperar(card: Story): boolean {
    if (this.puedeGestionarTodo()) return true; // MSC001 o Supervisor
    const owner = String(card.assignee || '').trim().toUpperCase();
    return !!owner && owner === this.myId;
  }
  canDrag(card: Story): boolean {
    return this.puedeOperar(card);
  }
  /** Aviso de advertencia cuando alguien sin permiso intenta modificar una tarea ajena. */
  private avisoSinPermiso(): void {
    this.snack.open(
      'No tienes permisos para modificar esta tarea. Solo el asignado, un supervisor o el Helpdesk pueden.',
      'OK',
      { duration: 4000 },
    );
  }

  async drop(event: CdkDragDrop<Story[]>, target: Status): Promise<void> {
    const task = event.item.data as Story;
    if (!task || task.status === target) return;
    // Permiso: solo el asignado, un supervisor o el Helpdesk pueden moverla.
    if (!this.puedeOperar(task)) {
      this.avisoSinPermiso();
      return;
    }
    // Regla: una tarea CON ticket que ya salió de To Do no puede volver (su estado
    // lo gobierna el ticket en el Helpdesk). Las tareas SIN ticket sí pueden volver.
    if (target === 'todo' && task.ticket) {
      this.snack.open('Una tarea con ticket no puede volver a To Do.', 'OK', { duration: 3000 });
      return;
    }
    if (task.status === 'todo' && target === 'in_progress') {
      const ok = await canStartWork(task, this.workDeps); // WIP + permisos + confirmación
      if (!ok) return; // bloqueado/cancelado: el signal recompone y la card vuelve a su columna
    } else {
      // Cualquier otro cambio de columna pide confirmación.
      const ok = await firstValueFrom(
        this.dialog
          .open(ConfirmDialog, {
            data: {
              title: 'Mover tarea',
              message: `¿Mover "${task.title}" a "${STATUS_LABELS[target]}"?`,
              confirmText: 'Mover',
            },
          })
          .afterClosed(),
      );
      if (!ok) return; // cancelado: el signal recompone y la card vuelve a su columna
    }
    this.data.updateStoryStatus(task.id, target);
    this.pushHdEstado(task, HD_ESTADO_POR_STATUS[target]);
  }

  /** Sincroniza el estado del ticket asociado en el Helpdesk (best-effort). */
  private pushHdEstado(card: Story, estado: string | undefined): void {
    if (!card.ticket || !estado) return;
    this.helpdesk.setTicketStatus(card.ticket, estado).then((ok) => {
      if (ok) this.data.updateStoryHdEstatus(card.id, estado);
      else this.snack.open(`No se pudo actualizar el estado del ticket #${card.ticket} en el Helpdesk.`, 'OK', { duration: 4000 });
    });
  }

  // ── Acciones de card ──
  openDetail(card: Story): void {
    // Las reuniones usan su propio modal (tema/link/horario); el resto, el modal normal.
    if (card.tipo === 'REUNION') {
      this.dialog.open(ReunionDialog, { data: { story: card }, width: '520px', maxWidth: '95vw' });
    } else {
      this.dialog.open(CardDetailDialog, { data: { story: card }, width: '560px', maxWidth: '95vw' });
    }
  }
  openNew(): void {
    this.dialog.open(CardDetailDialog, { data: { story: null }, width: '560px', maxWidth: '95vw' });
  }
  openNewReunion(): void {
    this.dialog.open(ReunionDialog, { data: { story: null }, width: '520px', maxWidth: '95vw' });
  }

  /** ¿la card es una reunión? */
  esReunion(card: Story): boolean {
    return card.tipo === 'REUNION';
  }

  /** Etiqueta legible del subtipo de reunión. */
  subtipoLabel(subtipo?: string): string {
    return subtipo === 'PRESENTACION' ? 'Presentación' : subtipo === 'CAPACITACION' ? 'Capacitación' : 'Reunión';
  }

  /** Formatea el horario de una reunión: "20 jul · 14:00–15:00" (o solo el inicio). */
  fmtReunion(inicio?: string, fin?: string): string {
    if (!inicio) return '';
    const d = new Date(inicio);
    if (isNaN(d.getTime())) return inicio;
    const fecha = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    const hora = (v?: string) => (v && !isNaN(new Date(v).getTime()) ? new Date(v).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '');
    const hi = hora(inicio);
    const hf = hora(fin);
    return `${fecha} · ${hi}${hf ? '–' + hf : ''}`;
  }

  onProgressChange(card: Story, value: string): void {
    this.data.updateStoryProgress(card.id, roundUp5(parseInt(value, 10) || 0));
  }

  waitingDays(card: Story): number | null {
    if (!card.waitingClient || !card.waitingDate) return null;
    return Math.floor((Date.now() - new Date(card.waitingDate + 'T00:00:00').getTime()) / 864e5);
  }
  toggleWaiting(card: Story): void {
    const willWait = !card.waitingClient;
    this.data.setWaitingClient(card.id, willWait);
    if (willWait) this.pushHdEstado(card, HD_ESTADO_ESPERANDO);
  }

  async onCert(card: Story, ev: MatCheckboxChange): Promise<void> {
    if (!ev.checked) return;
    if (!this.puedeOperar(card)) {
      ev.source.checked = false;
      this.avisoSinPermiso();
      return;
    }
    // Confirmación (igual que cualquier cambio de columna).
    const ok = await firstValueFrom(
      this.dialog
        .open(ConfirmDialog, {
          data: {
            title: 'Certificar tarea',
            message: `¿Marcar "${card.title}" como certificada y moverla a Finalizado?`,
            confirmText: 'Certificar',
          },
        })
        .afterClosed(),
    );
    if (!ok) {
      ev.source.checked = false; // cancelado → quita el check
      return;
    }
    this.data.updateStoryStatus(card.id, 'done');
    this.pushHdEstado(card, HD_ESTADO_POR_STATUS['done']);
  }

  /** Check "Finalizado" en Done. Tareas CON ticket: lo define el ticket (read-only).
   *  Tareas SIN ticket: el usuario lo marca/desmarca (con confirmación al marcar). */
  async onFinalize(card: Story, ev: MatCheckboxChange): Promise<void> {
    if (card.ticket) return; // las que tienen ticket lo definen por el ticket
    if (!this.puedeOperar(card)) {
      ev.source.checked = !!card.approved; // revierte al estado real
      this.avisoSinPermiso();
      return;
    }
    if (!ev.checked) {
      this.data.unapproveStory(card.id);
      return;
    }
    const ok = await firstValueFrom(
      this.dialog
        .open(ConfirmDialog, {
          data: {
            title: 'Finalizar tarea',
            message: `¿Marcar "${card.title}" como finalizada?`,
            confirmText: 'Finalizar',
          },
        })
        .afterClosed(),
    );
    if (!ok) {
      ev.source.checked = false; // cancelado → quita el check
      return;
    }
    this.data.approveStory(card.id);
  }

  async deleteCard(card: Story): Promise<void> {
    const ok = await firstValueFrom(
      this.dialog
        .open(ConfirmDialog, {
          data: {
            title: 'Eliminar tarea',
            message: `Vas a eliminar la tarea:\n\n"${card.title}"\n\nEsta acción NO se puede deshacer.`,
            confirmText: 'Eliminar',
            danger: true,
            requireWord: 'BORRAR',
          },
        })
        .afterClosed(),
    );
    if (ok) this.data.deleteStory(card.id);
  }

  async clearBoard(): Promise<void> {
    const active = this.data.sprints().active;
    const ids = this.data.getStoriesBySprint(active).map((s) => s.id);
    if (!ids.length) {
      this.snack.open('No hay tareas en el sprint.', 'OK', { duration: 3000 });
      return;
    }
    const ok = await firstValueFrom(
      this.dialog
        .open(ConfirmDialog, {
          data: {
            title: 'Borrar board',
            message: `Vas a eliminar ${ids.length} tarea(s) del sprint activo.\n\nEsta acción NO se puede deshacer.`,
            confirmText: 'Borrar todo',
            danger: true,
            requireWord: 'BORRAR',
          },
        })
        .afterClosed(),
    );
    if (ok) ids.forEach((id) => this.data.deleteStory(id));
  }
}
