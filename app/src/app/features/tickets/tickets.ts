import { Component, OnDestroy, TemplateRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { HelpdeskService, TicketFilters } from '../../core/services/helpdesk.service';
import { ShellService } from '../../core/services/shell.service';
import { CardDetailDialog } from '../board/card-detail-dialog/card-detail-dialog';
import { TicketMessagesDialog } from './ticket-messages-dialog/ticket-messages-dialog';
import { AssignTicketDialog } from './assign-ticket-dialog/assign-ticket-dialog';
import { PendienteDateDialog, PendienteDateResult } from '../pendientes/pendiente-date-dialog/pendiente-date-dialog';
import { TicketCard } from './ticket-card/ticket-card';
import { CLIENTES_VALIDOS } from './helpdesk.constants';
import { Ticket } from './ticket-utils';
import { esEstadoFinalizado } from '../../core/helpdesk-estados';

// Orden de tabs: Pendientes (default) primero, Estadísticas al final.
type Tab = 'pendientes' | 'asignados' | 'generales' | 'estadisticas';

interface StatRow {
  key: string;
  count: number;
  pct: string;
  color: string;
}

/** Ticket finalizado (aprobado/cerrado) → fuera de las tabs operativas. */
function esFinalizado(t: Ticket): boolean {
  return esEstadoFinalizado(t.estatus);
}

/** Vista Tickets (grid de cards del Helpdesk). Port de js/helpdesk-panel.js. */
@Component({
  selector: 'app-tickets',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule,
    TicketCard,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class Tickets implements OnDestroy {
  private readonly hd = inject(HelpdeskService);
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  private readonly shell = inject(ShellService);

  /** Panel de filtros que se publica al drawer del shell. */
  readonly filtersTpl = viewChild<TemplateRef<unknown>>('filtersTpl');

  // La consulta filtra server-side; `tickets` es la página actual del API.
  readonly tickets = this.hd.tickets;
  readonly loading = this.hd.loading;
  readonly status = this.hd.status;
  readonly statusNames = this.hd.statusNames;
  readonly clients = this.hd.clients;
  /** Estados elegibles en el menú: nunca se permite cambiar a ABIERTO. */
  readonly statusOptions = computed(() => this.statusNames().filter((s) => s.trim().toUpperCase() !== 'ABIERTO'));

  // ── Estado de la vista ──
  readonly tab = signal<Tab>('pendientes');
  readonly filterClientes = signal<string[]>([]); // client_ids (server-side, multi); [] = todos
  readonly filterEstatus = signal<string[]>([]); // nombres de estado (server-side, multi); [] = todos
  readonly filterAsignado = signal(''); // assigned_user_id (server-side); '' = todos
  readonly searchTerm = signal(''); // texto crudo de la caja de búsqueda (N° o palabra)
  readonly filterTicket = signal(''); // búsqueda por N° exacto (lookup) activa
  readonly filterTexto = signal(''); // búsqueda por palabra (contenido, /tickets/search) activa
  readonly remoteResult = signal<Ticket | null>(null);
  readonly searching = signal(false); // buscando un ticket por número en el API
  // Orden server-side: el API ordena por `<campo>_order=asc|desc`.
  readonly sortField = signal('modified_date');
  readonly sortDir = signal<'asc' | 'desc'>('desc');
  readonly sortValue = computed(() => `${this.sortField()}|${this.sortDir()}`);

  // Paginación server-side: cada página = una consulta con su offset; `total` del API.
  readonly pageIndex = signal(0);
  readonly pageSize = signal(12);

  // Notas / acciones / pendientes (se leen reactivamente del DataService).
  readonly notes = signal(this.data.getHdNotes());
  readonly actions = signal(this.data.getHdActions());
  readonly pendientes = signal(this.data.getHdPendientes());

  constructor() {
    // Catálogo de estados (menú de cambio de estado de cada card) y de empleados (filtro por asignado).
    this.hd.getTicketStatuses();
    this.hd.getHdUsers();
    // Publica los filtros de esta vista en el drawer del shell UNA vez, después del
    // primer render y FUERA del ciclo de detección de cambios. (Hacerlo con un
    // `effect` escribía una señal que el Layout lee durante su CD: en zoneless eso
    // bloqueaba la pantalla en la primera carga hasta recargar. El template es
    // estático, así que no necesita reactividad.)
    afterNextRender(() => this.shell.setFilters(this.filtersTpl() ?? null));
    // Espera los catálogos de clientes Y estados (para mapear válidos→client_id y
    // no-finalizados→ticket_status_id) y luego consulta fresca. Así Pendientes filtra
    // TODO server-side desde la primera carga. El botón ↻ vuelve a llamar a refresh().
    Promise.all([this.hd.getClients(), this.hd.getTicketStatuses()]).then(() => this.refresh());
    // Los overlays (notas/acciones/pendientes) se cargan en `data.ensureInit()` (lo
    // dispara el layout). La señal se inicializó vacía en el constructor; al resolver
    // la carga hay que RE-leerla, si no las notas nunca se pintan aunque existan.
    this.data.ensureInit().then(() => this.syncOverlays());
  }

  /** Re-sincroniza las señales de overlays con el estado ya cargado del DataService. */
  private syncOverlays(): void {
    this.notes.set({ ...this.data.getHdNotes() });
    this.actions.set({ ...this.data.getHdActions() });
    this.pendientes.set({ ...this.data.getHdPendientes() });
  }

  ngOnDestroy(): void {
    this.shell.clear();
  }

  private get myId(): string {
    return String(this.auth.session()?.id || '').trim().toUpperCase();
  }

  /** Tickets operativos: clientes válidos y no finalizados (refinamiento de Pendientes). */
  private readonly operativos = computed(() =>
    this.tickets().filter((t) => CLIENTES_VALIDOS.has(t.clienteRaw) && !esFinalizado(t)),
  );

  /** client_id de los clientes válidos (CLIENTES_VALIDOS → id vía catálogo del API).
   *  Permite filtrar Pendientes por esos clientes EN la consulta (páginas llenas). */
  private readonly validClientIds = computed(() =>
    this.clients().filter((c) => CLIENTES_VALIDOS.has(c.name.trim().toUpperCase())).map((c) => c.id),
  );

  /** ticket_status_id de los estados NO finalizados (los finalizados los define
   *  `esEstadoFinalizado`). Permite que Pendientes excluya los finalizados EN la consulta,
   *  no en el front → páginas llenas y `total` real. */
  private readonly pendingStatusIds = computed(() =>
    this.statusNames()
      .filter((n) => !esEstadoFinalizado(n))
      .map((n) => this.hd.statusIdOf(n))
      .filter((id): id is string => !!id),
  );

  // ── Conjunto base según la tab / búsqueda ──
  // Cliente/Estatus/Asignado ya vienen filtrados del API. Aquí solo el refinamiento
  // derivado de Pendientes (operativos), que la API no expresa como parámetro.
  private readonly base = computed<Ticket[]>(() => {
    // Búsqueda por número: SIEMPRE server-side (lookup exacto). Mientras se busca
    // o si no se encontró, la lista va vacía; nunca se filtra en memoria.
    if (this.filterTicket()) return this.remoteResult() ? [this.remoteResult()!] : [];
    // La lista es EXACTAMENTE la página que devuelve el API. Los filtros (cliente,
    // estatus no-finalizado, asignado) van TODOS en la consulta, nunca en el front.
    return this.tickets();
  });

  /** Total server-side de la consulta actual (denominador de "X de Y"). En búsqueda
   *  por número el universo es ese único resultado (1 si se encontró, 0 si no), no el
   *  total del listado: así la paginación es 1 sola página y no marca "más resultados". */
  readonly tabTotal = computed(() =>
    this.filterTicket() ? (this.remoteResult() ? 1 : 0) : this.hd.total(),
  );
  /** ¿Hay datos cargados? (para el estado vacío). */
  readonly tabHasData = computed(() => this.tickets().length > 0);

  /** Nº de tickets que ya tienen una tarea creada en el board (ocultan "Crear tarea"). */
  readonly ticketsEnBoard = computed(() => new Set(this.data.stories().map((s) => String(s.ticket)).filter(Boolean)));

  // Opciones de los filtros server-side, desde los CATÁLOGOS del API (no de la página
  // cargada): así se puede elegir cualquier cliente/estatus, no solo los visibles.
  readonly optClientes = computed(() => this.clients()); // {id, name}[]
  readonly optEstatus = computed(() => [...this.statusNames()].sort());

  // Búsqueda dentro de cada filtro (selects con muchas opciones).
  readonly buscarCliente = signal('');
  readonly buscarEstatus = signal('');
  private fOpt(list: string[], term: string): string[] {
    const t = term.trim().toLowerCase();
    return t ? list.filter((x) => x.toLowerCase().includes(t)) : list;
  }
  readonly optClientesF = computed(() => {
    const t = this.buscarCliente().trim().toLowerCase();
    const list = this.optClientes();
    return t ? list.filter((c) => c.name.toLowerCase().includes(t)) : list;
  });
  readonly optEstatusF = computed(() => this.fOpt(this.optEstatus(), this.buscarEstatus()));

  // Opciones del filtro por ASIGNADO: catálogo de empleados del HelpDesk (id = helpdesk_user_id).
  readonly buscarAsignado = signal('');
  readonly optAsignadosF = computed(() => {
    const t = this.buscarAsignado().trim().toLowerCase();
    const list = this.hd.hdUsers();
    return t ? list.filter((u) => u.name.toLowerCase().includes(t) || String(u.id).toLowerCase().includes(t)) : list;
  });
  /** Nombre del asignado seleccionado (para mostrar en el select). */
  asignadoName(id: string): string {
    return this.hd.hdUsers().find((u) => String(u.id) === String(id))?.name || id;
  }

  // El orden lo aplica el API (sortField/sortDir) y la búsqueda por número va
  // server-side vía base(): aquí no se filtra nada en memoria.
  readonly rows = computed<Ticket[]>(() => this.base());

  readonly hasFilters = computed(
    () =>
      !!(
        this.filterClientes().length ||
        this.filterEstatus().length ||
        this.filterAsignado() ||
        this.filterTicket() ||
        this.filterTexto() ||
        this.remoteResult()
      ),
  );

  /** Término escrito (N° o palabra) pero aún NO buscado (para el hint "Presiona Enter"). */
  readonly searchPending = computed(() => {
    const v = this.searchTerm().trim();
    return !!v && v !== this.filterTicket() && v !== this.filterTexto();
  });

  // ── Paginación server-side ──
  // La página ya viene paginada del API; no se recorta en el cliente. El paginador
  // usa el `total` del API; en Pendientes la página puede mostrar menos por el
  // refinamiento de operativos.
  readonly pagedRows = computed<Ticket[]>(() => this.rows());
  // Paginación basada en tabTotal: en búsqueda por número es 1 sola página.
  readonly paginatorLength = computed(() => this.tabTotal());
  /** Total de páginas (para "Página X de Y"). */
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.tabTotal() / this.pageSize())));
  /** ¿Hay más páginas después de la actual? En búsqueda por número nunca hay más. */
  readonly hayMasPaginas = computed(() => !this.filterTicket() && this.pageIndex() + 1 < this.totalPages());

  readonly stats = computed(() => {
    const all = this.operativos();
    const total = all.length;
    const acc = (sel: (t: Ticket) => string) => {
      const m = new Map<string, number>();
      all.forEach((t) => m.set(sel(t), (m.get(sel(t)) || 0) + 1));
      return m;
    };
    const toRows = (m: Map<string, number>): StatRow[] =>
      [...m.entries()]
        .filter(([, v]) => v > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([key, count]) => ({
          key,
          count,
          pct: total ? ((count / total) * 100).toFixed(1) + '%' : '0%',
          color: 'inherit',
        }));
    return {
      total,
      porCliente: toRows(acc((t) => t.clienteRaw)),
      porEstatus: toRows(acc((t) => t.estatus)),
    };
  });


  // ── Acciones ──
  /** Filtros server-side desde la tab + filtros activos. */
  private buildFilters(): TicketFilters {
    const f: TicketFilters = {};
    if (this.filterClientes().length) {
      f.clientIds = this.filterClientes(); // selección explícita del usuario
    } else if (this.tab() === 'pendientes') {
      f.clientIds = this.validClientIds(); // Pendientes: solo clientes que atiende el equipo
    }
    // Estatus SIEMPRE server-side: filtro explícito → esos estados (lista por comas);
    // Pendientes sin filtro → lista de todos los estados NO finalizados (excluye
    // finalizados en la consulta, no en el front).
    if (this.filterEstatus().length) {
      const ids = this.filterEstatus()
        .map((n) => this.hd.statusIdOf(n))
        .filter((id): id is string => !!id);
      if (ids.length) f.statusIds = ids;
    } else if (this.tab() === 'pendientes') {
      const ids = this.pendingStatusIds();
      if (ids.length) f.statusIds = ids;
    }
    // Filtro explícito por asignado (server-side) → ese usuario; si no, la tab "Asignados a mí" usa mi id.
    if (this.filterAsignado()) {
      f.assignedUserId = this.filterAsignado();
    } else if (this.tab() === 'asignados') {
      f.assignedUserId = this.myId;
    }
    return f;
  }

  /** Consulta la página actual: búsqueda por palabra, filtrada server-side, o carga amplia. */
  private async query(): Promise<void> {
    if (this.tab() === 'estadisticas') {
      await this.hd.loadAll();
      return;
    }
    // Búsqueda por palabra: global (ignora los filtros de tab), paginada server-side.
    if (this.filterTexto()) {
      await this.hd.searchTickets(this.filterTexto(), this.pageIndex(), this.pageSize(), {
        field: this.sortField(),
        dir: this.sortDir(),
      });
      return;
    }
    await this.hd.loadFiltered(this.buildFilters(), this.pageIndex(), this.pageSize(), {
      field: this.sortField(),
      dir: this.sortDir(),
    });
  }

  /** Cambio de orden (campo|dir desde el dropdown) → reconsulta desde la página 0. */
  async onSortChange(value: string): Promise<void> {
    const [field, dir] = value.split('|');
    this.sortField.set(field);
    this.sortDir.set(dir === 'asc' ? 'asc' : 'desc');
    this.pageIndex.set(0);
    await this.query();
  }

  /** Recarga desde la primera página (botón refrescar / auto-consulta al entrar). */
  async refresh(): Promise<void> {
    this.pageIndex.set(0);
    await this.query();
    this.syncOverlays(); // re-lee notas/acciones/pendientes ya cargados
  }

  async setTab(t: Tab): Promise<void> {
    if (t === this.tab()) return;
    this.tab.set(t);
    this.pageIndex.set(0);
    await this.query();
  }

  /** Navegación del paginador: trae la página pedida del API (una consulta). */
  async onPage(e: PageEvent): Promise<void> {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
    await this.query();
  }

  /** Nombre de cliente por su id (para los chips de selección). */
  clienteName(id: string): string {
    return this.clients().find((c) => c.id === id)?.name || id;
  }

  /** Cambio del multi-select de Cliente (client_ids) → reconsulta desde la página 0. */
  async onClientesChange(ids: string[]): Promise<void> {
    this.filterClientes.set(ids ?? []);
    this.pageIndex.set(0);
    await this.query();
  }

  /** Quita un cliente del filtro (la "x" del chip) → reconsulta. */
  async removeCliente(id: string): Promise<void> {
    this.filterClientes.set(this.filterClientes().filter((x) => x !== id));
    this.pageIndex.set(0);
    await this.query();
  }

  /** Cambio del filtro de Estatus (multi) → reconsulta desde la página 0. */
  async onEstatusChange(estatus: string[]): Promise<void> {
    this.filterEstatus.set(estatus ?? []);
    this.pageIndex.set(0);
    await this.query();
  }

  /** Quita un estatus del filtro (chip). */
  async removeEstatus(name: string): Promise<void> {
    this.filterEstatus.set(this.filterEstatus().filter((x) => x !== name));
    this.pageIndex.set(0);
    await this.query();
  }

  /** Cambio del filtro por Asignado → reconsulta server-side desde la página 0. */
  async onAsignadoChange(id: string): Promise<void> {
    this.filterAsignado.set(id || '');
    this.pageIndex.set(0);
    await this.query();
  }

  async clearFilters(): Promise<void> {
    this.filterClientes.set([]);
    this.filterEstatus.set([]);
    this.filterAsignado.set('');
    this.searchTerm.set('');
    this.clearSearchState();
    this.buscarCliente.set('');
    this.buscarEstatus.set('');
    this.buscarAsignado.set('');
    this.pageIndex.set(0);
    await this.query();
  }

  /** Limpia el estado de búsqueda (N° exacto y palabra), sin tocar el texto de la caja. */
  private clearSearchState(): void {
    this.filterTicket.set('');
    this.filterTexto.set('');
    this.remoteResult.set(null);
    this.searching.set(false);
  }

  /**
   * Cambio en la caja (cada tecla): SOLO guarda el término; NO busca (ni por N° ni por
   * palabra). La búsqueda se dispara con la orden explícita (`submitSearch`, con Enter
   * o el ícono 🔍). Vaciar la caja sí restaura la lista de la tab de inmediato.
   */
  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    if (!value.trim()) {
      this.clearSearchState();
      this.pageIndex.set(0);
      this.query(); // caja vacía → restaura la lista normal de la tab
    }
    // Con texto (N° o palabra): no dispara nada; el usuario debe ejecutar submitSearch().
  }

  /** Búsqueda EXPLÍCITA (Enter / ícono). Rutea N° exacto vs. palabra (contenido). */
  async submitSearch(): Promise<void> {
    const v = this.searchTerm().trim();
    this.pageIndex.set(0);
    if (!v) {
      this.clearSearchState();
      await this.query();
      return;
    }
    if (/^\d+$/.test(v)) {
      // Numérico → lookup EXACTO por número (server-side).
      this.filterTexto.set('');
      this.remoteResult.set(null);
      this.filterTicket.set(v);
      this.searching.set(true);
      const t = await this.hd.searchTicketRemote(v);
      if (this.searchTerm().trim() !== v) return; // el usuario cambió el término
      this.remoteResult.set(t);
      this.searching.set(false);
      return;
    }
    // Palabra → búsqueda por contenido (API), paginada y global.
    this.filterTicket.set('');
    this.remoteResult.set(null);
    this.searching.set(false);
    this.filterTexto.set(v);
    await this.query();
  }

  // ── Crear tarea desde el ticket (mismo modal del board) ──
  openTicketTask(t: Ticket): void {
    this.dialog.open(CardDetailDialog, {
      data: {
        story: null,
        prefill: {
          ticket: t.ticket,
          client: t.clientId,
          clientName: t.clienteRaw,
          title: t.asunto,
          assignee: t.usuarioAsignado,
          assigneeName: t.nombreAsignado,
          estatus: t.estatus,
        },
      },
      width: '560px',
      maxWidth: '95vw',
    });
  }

  openConversation(t: Ticket): void {
    this.dialog.open(TicketMessagesDialog, { data: { ticket: t }, width: '720px', maxWidth: '96vw' });
  }

  openAssign(t: Ticket): void {
    this.dialog.open(AssignTicketDialog, { data: { ticket: t }, width: '440px', maxWidth: '95vw' });
  }

  async changeStatus(t: Ticket, estado: string): Promise<void> {
    if (estado === t.estatus) return;
    const ok = await this.hd.setTicketStatus(t.ticket, estado);
    this.snack.open(
      ok ? `Ticket #${t.ticket} → ${estado}` : `No se pudo cambiar el estado del ticket #${t.ticket}.`,
      ok ? '' : 'OK',
      { duration: ok ? 2500 : 4000 },
    );
  }

  // ── Interacciones inline ──
  isAction(t: Ticket): boolean {
    return !!this.actions()[t.ticket];
  }
  isPending(t: Ticket): boolean {
    return !!this.pendientes()[t.ticket];
  }
  toggleAction(t: Ticket): void {
    this.data.setHdAction(t.ticket, !this.isAction(t));
    this.actions.set({ ...this.data.getHdActions() });
  }
  async togglePending(t: Ticket): Promise<void> {
    if (this.isPending(t)) {
      this.data.removeHdPendiente(t.ticket);
      this.pendientes.set({ ...this.data.getHdPendientes() });
      return;
    }
    // Al marcar pendiente: pedir fecha + hora del recordatorio.
    const res = (await firstValueFrom(
      this.dialog
        .open(PendienteDateDialog, { data: { title: 'Marcar pendiente', ticket: t.ticket }, width: '420px', maxWidth: '95vw' })
        .afterClosed(),
    )) as PendienteDateResult | undefined;
    if (!res) return; // cancelado → no se marca
    this.data.setHdPendiente(t.ticket, {
      ticket: t.ticket,
      asunto: t.asunto,
      clienteRaw: t.clienteRaw,
      dueDate: res.dueDate,
      dueTime: res.dueTime,
      nota: res.nota,
    });
    this.pendientes.set({ ...this.data.getHdPendientes() });
  }
  noteOf(t: Ticket): string {
    return this.notes()[t.ticket] || '';
  }
  onGuardarNota(t: Ticket, texto: string): void {
    this.data.setHdNote(t.ticket, texto);
    this.notes.set({ ...this.data.getHdNotes() });
  }
}
