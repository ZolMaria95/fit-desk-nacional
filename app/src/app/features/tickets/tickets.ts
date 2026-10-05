import { Component, OnDestroy, TemplateRef, afterNextRender, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { HelpdeskService, TicketFilters } from '../../core/services/helpdesk.service';
import { ShellService } from '../../core/services/shell.service';
import { PerfilService } from '../../core/services/perfil.service';
import { SearchService, GlobalSearch } from '../../core/services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resolveMember } from '../board/board-utils';
import { CardDetailDialog } from '../board/card-detail-dialog/card-detail-dialog';
import { EnviarEquipoDialog } from '../board/transferir/enviar-equipo-dialog';
import { EscalarDialog } from '../board/transferir/escalar-dialog';
import { TicketMessagesDialog } from './ticket-messages-dialog/ticket-messages-dialog';
import { AssignTicketDialog } from './assign-ticket-dialog/assign-ticket-dialog';
import { abrirEditarTicket, eliminarTicket } from './ticket-acciones';
import { PendienteDateDialog, PendienteDateResult } from '../pendientes/pendiente-date-dialog/pendiente-date-dialog';
import { TicketCard } from './ticket-card/ticket-card';
import { TIPO_NOMBRE } from './helpdesk.constants';
import { Ticket, equipoClientIdsDe } from './ticket-utils';
import { NuevosTicketsService } from '../../core/services/nuevos-tickets.service';
import { esEstadoFinalizado } from '../../core/helpdesk-estados';
import { OrdenEstadosService } from '../../core/services/orden-estados.service';

// Orden de tabs: Equipo (default), Sin asignar, Asignados a mí, Todos los clientes.
type Tab = 'equipo' | 'sinasignar' | 'asignados' | 'generales';

/** Vista Tickets (grid de cards del Helpdesk). Port de js/helpdesk-panel.js. */
@Component({
  selector: 'app-tickets',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
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
  private readonly perfil = inject(PerfilService);
  /** Orden personal de estados (Administración → "Orden de estados"). */
  private readonly ordenEst = inject(OrdenEstadosService);
  private readonly router = inject(Router);
  private readonly search = inject(SearchService);
  private readonly nuevosTickets = inject(NuevosTicketsService);

  /** Panel de filtros que se publica al drawer del shell. */
  readonly filtersTpl = viewChild<TemplateRef<unknown>>('filtersTpl');
  /** Control de ORDEN: canal aparte del de filtros (no se pliega con ellos). */
  readonly sortTpl = viewChild<TemplateRef<unknown>>('sortTpl');

  // La consulta filtra server-side; `tickets` es la página actual del API.
  readonly tickets = this.hd.tickets;
  readonly loading = this.hd.loading;
  readonly status = this.hd.status;
  readonly statusNames = this.hd.statusNames;
  readonly clients = this.hd.clients;
  /** Estados elegibles en el menú: nunca se permite cambiar a ABIERTO. */
  readonly statusOptions = computed(() => this.statusNames().filter((s) => s.trim().toUpperCase() !== 'ABIERTO'));
  /** ¿Puede cambiar el estado de tickets cerrados? (Responsable de Equipo/Admin). */
  readonly puedeTransferir = this.auth.puedeTransferir;
  /** ¿Puede enviar tickets a otro equipo? (Responsable/Admin, solo en modo Quarkus). Es el permiso
   *  BASE; por ticket hace falta además dirigir el equipo de origen → `puedeTransferirEste()`. */
  readonly puedeTransferirTicket = computed(() => this.data.usesQuarkus() && this.auth.puedeTransferir());
  /** ¿Puede escalar un ticket al Responsable? (Especialista, solo en modo Quarkus). */
  readonly puedeEscalarTicket = computed(() => this.data.usesQuarkus() && this.auth.esEspecialista());

  // ── Estado de la vista ──
  readonly tab = signal<Tab>('equipo');
  /** Equipo elegido en la pestaña "Equipo" ('' = todos los que puedo revisar). Solo
   *  aplica cuando el usuario puede revisar más de un equipo (responsable regional). */
  readonly equipoSel = signal('');
  /** Firma (tab + clientes del equipo) de la ÚLTIMA consulta → el auto-requery no duplica. */
  private ultimoEquipoKey = '';
  /** ¿Ya se hizo la consulta inicial (catálogos + orden de estados cargados)? Antes, el auto-requery no
   *  consulta: su carga paginada ganaba la carrera y bloqueaba la carga completa de "mi orden". */
  private listo = false;
  readonly filterClientes = signal<string[]>([]); // client_ids (server-side, multi); [] = todos
  readonly filterEstatus = signal<string[]>([]); // nombres de estado (server-side, multi); [] = todos
  readonly filterAsignado = signal(''); // assigned_user_id (server-side); '' = todos
  readonly filterTipo = signal(''); // ticket_type_id (server-side); '' = todos
  // Dos búsquedas GLOBALES independientes (puntos 1 y 7): por N° de ticket y por palabra.
  readonly ticketInput = signal(''); // texto crudo del campo "Ticket" (N°)
  readonly palabraInput = signal(''); // texto crudo del campo "Palabra"
  readonly filterTicket = signal(''); // búsqueda por N° exacto (lookup) activa
  readonly filterTexto = signal(''); // búsqueda por palabra (contenido, /tickets/search) activa
  readonly remoteResult = signal<Ticket | null>(null);
  readonly searching = signal(false); // buscando un ticket por número en el API
  // Orden server-side: el API ordena por `<campo>_order=asc|desc`.
  readonly sortField = signal('modified_date');
  readonly sortDir = signal<'asc' | 'desc'>('desc');
  readonly sortValue = computed(() => `${this.sortField()}|${this.sortDir()}`);
  /** Opciones de orden (el `value` es `campo|dir`, como lo espera `onSortChange`). "Por estado (mi orden)"
   *  solo aparece si el usuario configuró su orden de estados; la aplica FitDesk, no el HelpDesk. */
  readonly sortOptions = computed<{ value: string; label: string }[]>(() => [
    ...(this.ordenEst.activo() ? [{ value: 'mi_orden|asc', label: 'Por estado (mi orden)' }] : []),
    { value: 'modified_date|desc', label: 'Modificación (recientes)' },
    { value: 'modified_date|asc', label: 'Modificación (antiguos)' },
    { value: 'entry_date|desc', label: 'Ingreso (recientes)' },
    { value: 'entry_date|asc', label: 'Ingreso (antiguos)' },
    { value: 'priority|asc', label: 'Prioridad (alta primero)' },
    { value: 'priority|desc', label: 'Prioridad (baja primero)' },
  ]);
  /** Etiqueta del orden activo (para mostrarla en el botón del menú). */
  /** ¿Ordenado por el orden personal de estados? (todo el conjunto se carga y se ordena/pagina aquí). */
  readonly porMiOrden = computed(() => this.sortField() === 'mi_orden' && this.ordenEst.activo());
  /** Orden que se pide al HelpDesk: con "mi orden" se pide por modificación (el sub-orden). */
  private apiSort(): { field: string; dir: 'asc' | 'desc' } {
    return this.porMiOrden() ? { field: 'modified_date', dir: 'desc' } : { field: this.sortField(), dir: this.sortDir() };
  }
  readonly sortLabel = computed(() => this.sortOptions().find((o) => o.value === this.sortValue())?.label ?? '');

  // Paginación server-side: cada página = una consulta con su offset; `total` del API.
  readonly pageIndex = signal(0);
  readonly pageSize = signal(15);

  // Notas / acciones / pendientes / guardados (se leen reactivamente del DataService).
  readonly notes = signal(this.data.getHdNotes());
  readonly actions = signal(this.data.getHdActions());
  readonly pendientes = signal(this.data.getHdPendientes());
  readonly guardados = signal(this.data.getHdGuardados());
  /** Bandera de acción: SOLO para RE (Responsable de Equipo) — "Guardar" lo ve cualquiera. */
  readonly puedeMarcarAccion = this.auth.esResponsableEquipo;

  constructor() {
    // Catálogo de estados (menú de cambio de estado de cada card) y de empleados (filtro por asignado).
    this.hd.getTicketStatuses();
    this.hd.getHdUsers();
    // Publica los filtros de esta vista en el drawer del shell UNA vez, después del
    // primer render y FUERA del ciclo de detección de cambios. (Hacerlo con un
    // `effect` escribía una señal que el Layout lee durante su CD: en zoneless eso
    // bloqueaba la pantalla en la primera carga hasta recargar. El template es
    // estático, así que no necesita reactividad.)
    afterNextRender(() => {
      this.shell.setFilters(this.filtersTpl() ?? null);
      this.shell.setSort(this.sortTpl() ?? null);
    });
    // La búsqueda por N° muestra un resultado APARTE (`remoteResult`), fuera del pool que parchea
    // HelpdeskService: cuando se confirma un cambio de ESE ticket (editar, estado, reasignar) se
    // vuelve a traer; si se eliminó, desaparece. `untracked` evita re-ejecuciones por lo que escribe.
    effect(() => {
      const m = this.hd.ticketMutado();
      if (!m) return;
      untracked(() => {
        const r = this.remoteResult();
        if (!r || r.ticket !== m.ticket) return;
        if (m.eliminado) { this.remoteResult.set(null); return; }
        void this.hd.searchTicketRemote(m.ticket).then((t) => {
          if (t && this.remoteResult()?.ticket === t.ticket) this.remoteResult.set(t);
        });
      });
    });
    // Espera los catálogos de clientes Y estados (para mapear válidos→client_id y
    // no-finalizados→ticket_status_id) y luego consulta fresca. Así Pendientes filtra
    // TODO server-side desde la primera carga. El botón ↻ vuelve a llamar a refresh().
    Promise.all([
      this.hd.getClients(),
      this.hd.getTicketStatuses(),
      this.perfil.cargarEquiposRevisar(),
      this.ordenEst.cargar(),
    ]).then(() => {
      // Con orden de estados configurado, la vista arranca ordenada por él.
      if (this.ordenEst.activo()) {
        this.sortField.set('mi_orden');
        this.sortDir.set('asc');
      }
      this.listo = true;
      this.refresh();
      // Búsqueda global lanzada desde el shell ANTES de montar esta vista (navegación).
      const pend = this.search.takePending();
      if (pend) this.aplicarBusquedaGlobal(pend);
    });
    // Búsqueda global lanzada con la vista YA montada (ya estás en /tickets).
    this.search.submissions.pipe(takeUntilDestroyed()).subscribe((s) => this.aplicarBusquedaGlobal(s));
    // Los overlays (notas/acciones/pendientes) se cargan en `data.ensureInit()` (lo
    // dispara el layout). La señal se inicializó vacía en el constructor; al resolver
    // la carga hay que RE-leerla, si no las notas nunca se pintan aunque existan.
    // Guardados NO se carga en `ensureInit()` (es un fetch propio, no un mapa legacy más) — se pide
    // aparte y se sincroniza junto con el resto.
    Promise.all([this.data.ensureInit(), this.data.loadHdGuardados()]).then(() => this.syncOverlays());
    // Auto-corrige la carrera de la 1ª carga: si el catálogo del HelpDesk (o los equipos) llega DESPUÉS
    // de la consulta inicial (backend frío tras el login), la pestaña Equipo/Sin asignar salió sin filtro
    // (todos los clientes). En cuanto `equipoClientIds` está disponible → re-consulta sola (sin refrescar).
    effect(() => {
      const ids = this.equipoClientIds();
      const tab = this.tab();
      untracked(() => this.autoRequeryEquipo(ids, tab));
    });
  }

  /** Re-consulta cuando los clientes del equipo llegan tarde (1ª carga con backend frío). No pisa un
   *  filtro explícito del usuario ni duplica una consulta ya hecha con ese mismo set (`ultimoEquipoKey`). */
  private autoRequeryEquipo(ids: string[], tab: Tab): void {
    if (!this.listo) return;                                       // la consulta inicial aún no salió
    if (tab !== 'equipo' && tab !== 'sinasignar') return;         // solo las tabs que usan el filtro de equipo
    if (this.filterClientes().length || this.filterTicket() || this.filterTexto()) return; // filtro explícito
    if (!ids.length) return;                                       // aún cargando (o equipo sin clientes)
    if (`${tab}:${ids.join(',')}` === this.ultimoEquipoKey) return; // ya se consultó con este set
    void this.query();
  }

  /** Re-sincroniza las señales de overlays con el estado ya cargado del DataService. */
  private syncOverlays(): void {
    this.notes.set({ ...this.data.getHdNotes() });
    this.actions.set({ ...this.data.getHdActions() });
    this.pendientes.set({ ...this.data.getHdPendientes() });
    this.guardados.set({ ...this.data.getHdGuardados() });
  }

  /** Aplica una búsqueda global lanzada desde el shell (reusa la búsqueda de la vista). */
  private aplicarBusquedaGlobal(s: GlobalSearch): void {
    if (s.kind === 'ticket') {
      this.ticketInput.set(s.value);
      this.submitTicket();
    } else {
      this.palabraInput.set(s.value);
      this.submitPalabra();
    }
    this.search.takePending(); // consumida
  }

  ngOnDestroy(): void {
    this.shell.clear();
  }

  private get myId(): string {
    return String(this.auth.session()?.id || '').trim().toUpperCase();
  }


  /** ticket_status_id de los estados NO finalizados (los finalizados los define
   *  `esEstadoFinalizado`). Permite que Pendientes excluya los finalizados EN la consulta,
   *  no en el front → páginas llenas y `total` real. */
  private readonly pendingStatusIds = computed(() =>
    this.statusNames()
      .filter((n) => !esEstadoFinalizado(n))
      .map((n) => this.hd.statusIdOf(n))
      .filter((id): id is string => !!id),
  );

  /** Responsable (o ADMIN) que ya guardó su orden de estados: en Equipo / Asignados a mí / Todos los clientes
   *  lo que ve depende SOLO de su tabla (todos los estados menos sus ocultos, finalizados incluidos). Sin tabla
   *  guardada, como siempre (sin finalizados). "Sin asignar" no cambia. */
  private readonly soloTabla = computed(() => this.ordenEst.puedeEditar() && this.ordenEst.activo());

  /** ticket_status_id de TODOS los estados del catálogo. */
  private readonly todosStatusIds = computed(() =>
    this.statusNames()
      .map((n) => this.hd.statusIdOf(n))
      .filter((id): id is string => !!id),
  );

  /** Estados elegibles en "Sin asignar": ni finalizados (Aprobado/Cerrado) NI ENTREGADO
   *  (un ticket entregado ya no necesita asignación). Va server-side en la consulta. */
  private readonly sinAsignarStatusIds = computed(() =>
    this.statusNames()
      .filter((n) => !esEstadoFinalizado(n) && !n.trim().toUpperCase().includes('ENTREGADO'))
      .map((n) => this.hd.statusIdOf(n))
      .filter((id): id is string => !!id),
  );

  // ── Pestaña "Equipo": tickets de los clientes del equipo (o del equipo elegido) ──
  /** Equipos que el usuario puede revisar y si hay más de uno (→ selector). */
  readonly equiposRevisar = this.perfil.equiposRevisar;
  readonly multiEquipo = this.perfil.multiEquipo;

  /** client_id (catálogo del API) de los clientes del/los equipo(s) a revisar → filtro server-side de
   *  "Equipo/Sin asignar". Cruza por NOMBRE con el catálogo HD (`equipoClientIdsDe`, reusado por el poller
   *  de novedades del equipo en el Layout). `equipoSel()` opcional filtra a un solo equipo. */
  private readonly equipoClientIds = computed(() =>
    equipoClientIdsDe(this.perfil.equiposRevisar(), this.clients(), this.equipoSel()),
  );

  /** Cambia el equipo elegido en la pestaña "Equipo" y recarga. */
  async onEquipoChange(codigo: string): Promise<void> {
    this.equipoSel.set(codigo);
    this.pageIndex.set(0);
    await this.query();
  }

  // ── Conjunto base según la tab / búsqueda ──
  // Cliente/Estatus/Asignado ya vienen filtrados del API. Aquí solo el refinamiento
  // derivado de Pendientes (operativos), que la API no expresa como parámetro.
  private readonly base = computed<Ticket[]>(() => {
    // Búsqueda por número: SIEMPRE server-side (lookup exacto). Mientras se busca
    // o si no se encontró, la lista va vacía; nunca se filtra en memoria.
    if (this.filterTicket()) return this.remoteResult() ? [this.remoteResult()!] : [];
    // La lista es EXACTAMENTE la página que devuelve el API. Los filtros (cliente,
    // estatus no-finalizado, asignado) van TODOS en la consulta, nunca en el front.
    const page = this.tickets();
    // "Sin asignar": el API no expresa "sin asignado" (assigned_user_id null) como
    // parámetro. Cargamos TODO el set del equipo (loadAllFiltered) y refinamos aquí a los
    // sin asignar; la paginación es EN CLIENTE, 12/página con conteo correcto.
    return this.tab() === 'sinasignar' ? page.filter((t) => !t.usuarioAsignado) : page;
  });

  /** ¿Paginado EN CLIENTE? Solo "Sin asignar" (todo el equipo cargado; se filtra aquí). */
  readonly esPaginaLocal = computed(() => this.tab() === 'sinasignar' && !this.filterTicket() && !this.filterTexto());

  /** Total (denominador de "X de Y"). Número → 1/0. Sin asignar (cliente) → nº de sin
   *  asignar. Resto → total server-side del API. */
  readonly tabTotal = computed(() => {
    if (this.filterTicket()) return this.remoteResult() ? 1 : 0;
    if (this.esPaginaLocal()) return this.rows().length;
    return this.hd.total();
  });
  /** ¿Hay datos cargados? (para el estado vacío). */
  readonly tabHasData = computed(() => this.tickets().length > 0);

  /** Nº de tickets que ya tienen una tarea creada en el board (ocultan "Crear tarea"). */
  readonly ticketsEnBoard = computed(() => new Set(this.data.stories().map((s) => String(s.ticket)).filter(Boolean)));
  /** N° de ticket → codigo del board donde vive su tarea (para saber de qué equipo es el origen). */
  private readonly boardPorTicket = computed(
    () => new Map(this.data.stories().filter((s) => s.ticket).map((s) => [String(s.ticket), String(s.board ?? '')])),
  );

  // Opciones de los filtros server-side, desde los CATÁLOGOS del API (no de la página
  // cargada): así se puede elegir cualquier cliente/estatus, no solo los visibles.
  readonly optClientes = computed(() => this.clients()); // {id, name}[]
  readonly optEstatus = computed(() => [...this.statusNames()].sort());
  /** Tipos de ticket (catálogo estático: 001=INCIDENCIA, 002=REQUERIMIENTO, 003=CONSULTA). */
  readonly optTipos = Object.entries(TIPO_NOMBRE).map(([id, name]) => ({ id, name }));

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
  /** Nombre del asignado seleccionado (para mostrar en el select). Regla #8: nunca el código. */
  asignadoName(id: string): string {
    return this.hd.hdUsers().find((u) => String(u.id) === String(id))?.name || '—';
  }

  // El orden lo aplica el API (sortField/sortDir) y la búsqueda por número va
  // server-side vía base(): aquí no se filtra nada en memoria.
  // Excepción: "Por estado (mi orden)" ordena por la posición del estado y, dentro de cada estado (y para los
  // estados sin posición, que van después), por última modificación (más reciente arriba). La página ya viene
  // en ese orden (`loadPorGrupos`); aquí se re-aplica para "Sin asignar" (todo cargado) y tras cambios en vivo.
  readonly rows = computed<Ticket[]>(() => {
    const base = this.base();
    if (!this.porMiOrden() || this.filterTicket() || this.filterTexto()) return base;
    this.statusNames(); // el id de cada estado sale del catálogo: re-ordenar si llega tarde
    const rango = (t: Ticket) => this.ordenEst.rango(this.hd.statusIdOf(t.estatus));
    const mod = (t: Ticket) => {
      const ms = Date.parse(t.fechaMod);
      return Number.isNaN(ms) ? 0 : ms;
    };
    return [...base].sort((a, b) => {
      const ra = rango(a), rb = rango(b);
      if (ra !== rb) return ra < rb ? -1 : 1;
      return mod(b) - mod(a);
    });
  });

  readonly hasFilters = computed(
    () =>
      !!(
        this.filterClientes().length ||
        this.filterEstatus().length ||
        this.filterAsignado() ||
        this.filterTipo() ||
        this.filterTicket() ||
        this.filterTexto() ||
        this.remoteResult()
      ),
  );

  /** Ámbito de la búsqueda por palabra ("en COAC X", "en 3 clientes · con filtros"); '' = global. */
  readonly ambitoBusqueda = computed(() => {
    if (!this.filterTexto()) return '';
    const cli = this.filterClientes();
    const partes: string[] = [];
    if (cli.length === 1) partes.push(`en ${this.clienteName(cli[0])}`);
    else if (cli.length > 1) partes.push(`en ${cli.length} clientes`);
    if (this.filterEstatus().length || this.filterAsignado() || this.filterTipo()) partes.push('con filtros');
    return partes.join(' · ');
  });

  /** Texto escrito pero aún NO buscado (hint "Presiona Enter"), por campo. */
  readonly ticketPending = computed(() => {
    const v = this.ticketInput().trim();
    return !!v && v !== this.filterTicket();
  });
  readonly palabraPending = computed(() => {
    const v = this.palabraInput().trim();
    return !!v && v !== this.filterTexto();
  });

  /**
   * Búsqueda GLOBAL de ticket: al buscar un N°, indica si ese ticket tiene tarea en
   * algún tablero y quién la lleva (barrido local sobre TODAS las stories). Si no está
   * en ningún board / sin asignar, la vista lo resalta. Sin llamadas extra al API.
   */
  readonly ticketEnBoard = computed(() => {
    const n = this.filterTicket().trim();
    if (!n) return null;
    const st = this.data.stories().find((s) => String(s.ticket) === n);
    // "lo lleva" = el asignado del TICKET en el API (nombreAsignado del resultado remoto),
    // NO el de la tarea del board (que puede diferir). Regla #8: es un nombre, no el código.
    const asignado = this.remoteResult()?.nombreAsignado || '';
    if (!st) return { enBoard: false, board: '', asignado };
    return { enBoard: true, board: st.board || '', asignado };
  });

  // ── Paginación server-side ──
  // La página ya viene paginada del API; no se recorta en el cliente. El paginador
  // usa el `total` del API; en Pendientes la página puede mostrar menos por el
  // refinamiento de operativos.
  readonly pagedRows = computed<Ticket[]>(() => {
    // Sin asignar: la página se recorta EN CLIENTE (todo el equipo ya está cargado).
    if (this.esPaginaLocal()) {
      const start = this.pageIndex() * this.pageSize();
      return this.rows().slice(start, start + this.pageSize());
    }
    return this.rows(); // resto: el API ya paginó
  });
  // Paginación basada en tabTotal: en búsqueda por número es 1 sola página.
  readonly paginatorLength = computed(() => this.tabTotal());
  /** Total de páginas (para "Página X de Y"). */
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.tabTotal() / this.pageSize())));
  /** ¿Hay más páginas después de la actual? En búsqueda por número nunca hay más. */
  readonly hayMasPaginas = computed(() => !this.filterTicket() && this.pageIndex() + 1 < this.totalPages());

  // ── Acciones ──
  /** Filtros server-side desde la tab + filtros activos. */
  private buildFilters(): TicketFilters {
    const f: TicketFilters = {};
    if (this.filterClientes().length) {
      f.clientIds = this.filterClientes(); // selección explícita del usuario
    } else if (this.tab() === 'equipo' || this.tab() === 'sinasignar') {
      f.clientIds = this.equipoClientIds(); // Equipo/Sin asignar: solo los clientes del equipo
    }
    // Estatus SIEMPRE server-side: filtro explícito → esos estados (lista por comas);
    // Pendientes sin filtro → lista de todos los estados NO finalizados (excluye
    // finalizados en la consulta, no en el front).
    if (this.filterEstatus().length) {
      const ids = this.filterEstatus()
        .map((n) => this.hd.statusIdOf(n))
        .filter((id): id is string => !!id);
      if (ids.length) f.statusIds = ids;
    } else if (this.tab() === 'equipo' || this.tab() === 'asignados' || this.tab() === 'generales') {
      // Sin filtro explícito de Estatus: el responsable con orden de estados guardado ve todo menos sus ocultos
      // (`soloTabla`); el resto, como siempre, sin los finalizados (APROBADO/CERRADO/NO APLICA).
      const ids = this.sinOcultos(this.soloTabla() ? this.todosStatusIds() : this.pendingStatusIds());
      if (ids.length) f.statusIds = ids;
    } else if (this.tab() === 'sinasignar') {
      // Sin asignar: además de excluir finalizados, excluye ENTREGADO.
      const ids = this.sinOcultos(this.sinAsignarStatusIds());
      if (ids.length) f.statusIds = ids;
    }
    // Filtro explícito por asignado (server-side) → ese usuario; si no, la tab "Asignados a mí" usa mi id.
    if (this.filterAsignado()) {
      f.assignedUserId = this.filterAsignado();
    } else if (this.tab() === 'asignados') {
      f.assignedUserId = this.myId;
    }
    // Tipo de ticket (server-side): combina con cliente/estatus/asignado en la misma consulta.
    if (this.filterTipo()) {
      f.typeId = this.filterTipo();
    }
    return f;
  }

  /** Quita los estados que el usuario ocultó en su orden de estados (solo en los filtros IMPLÍCITOS de la
   *  pestaña: si elige un estado oculto en el filtro Estatus, lo ve). Si los ocultara TODOS, la lista
   *  vacía equivaldría a "sin filtro" en el API → se manda un id imposible para que no traiga nada. */
  private sinOcultos(ids: string[]): string[] {
    const ocultos = this.ordenEst.ocultos();
    if (!ocultos.size) return ids;
    const out = ids.filter((id) => !ocultos.has(id));
    return out.length || !ids.length ? out : ['__ninguno__'];
  }

  /** Solo los filtros elegidos a mano (sin los implícitos de la tab) → acotan la búsqueda por palabra. */
  private buildFiltrosExplicitos(): TicketFilters {
    const f: TicketFilters = {};
    if (this.filterClientes().length) f.clientIds = this.filterClientes();
    const statusIds = this.filterEstatus()
      .map((n) => this.hd.statusIdOf(n))
      .filter((id): id is string => !!id);
    if (statusIds.length) f.statusIds = statusIds;
    if (this.filterAsignado()) f.assignedUserId = this.filterAsignado();
    if (this.filterTipo()) f.typeId = this.filterTipo();
    return f;
  }

  /** Consulta la página actual: búsqueda por palabra, filtrada server-side, o carga amplia. */
  private async query(): Promise<void> {
    // Firma del filtro de equipo que se está consultando → el effect de auto-requery no re-consulta
    // por este mismo set (evita duplicados en setTab/onEquipoChange/refresh).
    this.ultimoEquipoKey = this.tab() + ':' + this.equipoClientIds().join(',');
    // El responsable "vio" los tickets del equipo → limpia el badge de novedades y avanza la marca de agua.
    if (this.tab() === 'equipo' && this.auth.esResponsableEquipo()) this.nuevosTickets.marcarVistos();
    // Búsqueda por palabra: paginada server-side y acotada SOLO por los filtros que el usuario eligió
    // (cliente/estatus/asignado/tipo). Los implícitos de la tab no aplican: así se encuentra también el
    // historial (cerrados) de un cliente. Sin filtros elegidos es global.
    if (this.filterTexto()) {
      await this.hd.searchTickets(
        this.filterTexto(),
        this.pageIndex(),
        this.pageSize(),
        this.apiSort(),
        this.buildFiltrosExplicitos(),
      );
      return;
    }
    // "Sin asignar": el API no filtra por "sin asignado" → cargamos TODO el equipo (todas
    // las páginas) y la vista filtra/pagina en cliente (12/página con conteo correcto).
    if (this.tab() === 'sinasignar') {
      await this.hd.loadAllFiltered(this.buildFilters(), this.apiSort());
      return;
    }
    // "Por estado (mi orden)": una consulta por grupo de estados (1, 2, …, resto), paginada server-side.
    const f = this.buildFilters();
    if (this.porMiOrden() && f.statusIds?.length) {
      const conOrden = this.ordenEst.grupos();
      const enGrupo = new Set(conOrden.flat());
      const resto = f.statusIds.filter((id) => !enGrupo.has(id));
      await this.hd.loadPorGrupos(f, [...conOrden, resto], this.pageIndex(), this.pageSize());
      return;
    }
    await this.hd.loadFiltered(f, this.pageIndex(), this.pageSize(), this.apiSort());
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
    // Si el catálogo de estados quedó vacío (blip transitorio en la 1ª carga), el ↻
    // lo reconsulta: getTicketStatuses ya no memoiza el vacío, así se recupera sin
    // recargar la página ("Cambiar estado" volvía a mostrar "Catálogo no disponible").
    if (!this.statusNames().length) this.hd.getTicketStatuses();
    await this.query();
    this.syncOverlays(); // re-lee notas/acciones/pendientes ya cargados
  }

  async setTab(t: Tab): Promise<void> {
    if (t === this.tab()) return;
    this.tab.set(t);
    this.pageIndex.set(0);
    await this.query();
  }

  /** Navegación del paginador: trae la página del API, o recorta en cliente (sin asignar). */
  async onPage(e: PageEvent): Promise<void> {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
    // Al cambiar de página, volver al tope: el usuario no debe subir a mano (bug).
    this.shell.scrollTop();
    // Sin asignar: todo el equipo ya está cargado → la página se recorta en cliente
    // (pagedRows), sin re-consultar al API.
    if (this.esPaginaLocal()) return;
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

  /** Cambio del filtro por Tipo → reconsulta server-side desde la página 0. */
  async onTipoChange(id: string): Promise<void> {
    this.filterTipo.set(id || '');
    this.pageIndex.set(0);
    await this.query();
  }

  async clearFilters(): Promise<void> {
    this.filterClientes.set([]);
    this.filterEstatus.set([]);
    this.filterAsignado.set('');
    this.filterTipo.set('');
    this.ticketInput.set('');
    this.palabraInput.set('');
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

  // ── Campo "Ticket" (búsqueda GLOBAL por N° exacto) ──
  /** Tecla en el campo Ticket: solo guarda; vaciarlo restaura la lista. */
  onTicketInput(value: string): void {
    this.ticketInput.set(value);
    if (!value.trim()) {
      this.filterTicket.set('');
      this.remoteResult.set(null);
      this.searching.set(false);
      this.pageIndex.set(0);
      this.query();
    }
  }
  /** Búsqueda EXPLÍCITA por N° (Enter / 🔍). Lookup exacto server-side (global). */
  async submitTicket(): Promise<void> {
    const v = this.ticketInput().trim();
    this.pageIndex.set(0);
    // El N° y la palabra son mutuamente excluyentes: al buscar por N°, quita la palabra.
    this.palabraInput.set('');
    this.filterTexto.set('');
    if (!v) {
      this.filterTicket.set('');
      this.remoteResult.set(null);
      await this.query();
      return;
    }
    this.filterTicket.set(v);
    this.remoteResult.set(null);
    this.searching.set(true);
    const t = await this.hd.searchTicketRemote(v);
    if (this.ticketInput().trim() !== v) return; // el usuario cambió el término
    this.remoteResult.set(t);
    this.searching.set(false);
  }

  // ── Campo "Palabra" (búsqueda por contenido) ──
  /** Tecla en el campo Palabra: solo guarda; vaciarlo restaura la lista. */
  onPalabraInput(value: string): void {
    this.palabraInput.set(value);
    if (!value.trim()) {
      this.filterTexto.set('');
      this.pageIndex.set(0);
      this.query();
    }
  }
  /** Búsqueda EXPLÍCITA por palabra (Enter / 🔍). Contenido, paginada, acotada por los filtros elegidos. */
  async submitPalabra(): Promise<void> {
    const v = this.palabraInput().trim();
    this.pageIndex.set(0);
    // Mutuamente excluyente con el N°.
    this.ticketInput.set('');
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
    this.dialog.open(TicketMessagesDialog, { data: { ticket: t }, width: '920px', maxWidth: '92vw' });
  }

  /** Va a la tarea del board que corresponde a este ticket (si existe) y la resalta. */
  irAlBoard(t: Ticket): void {
    const st = this.data.stories().find((s) => String(s.ticket) === String(t.ticket));
    if (!st) return;
    this.router.navigate(['/board'], { queryParams: { board: st.board || '', card: st.id } });
  }

  /**
   * ¿Puede enviar ESTE ticket a otro equipo? Además del permiso base, si el ticket ya tiene tarea
   * en un board hay que **dirigir el equipo dueño de ese board**: el backend autoriza la
   * transferencia contra el equipo ORIGEN, que no tiene por qué ser el del actor (un Responsable
   * de Prueba veía la opción en una tarea del board de Cuenca y solo se enteraba con un 403).
   * Sin tarea previa no hay origen ajeno: se crea en el board del propio actor.
   */
  puedeTransferirEste(t: Ticket): boolean {
    if (!this.puedeTransferirTicket()) return false;
    const board = this.boardPorTicket().get(String(t.ticket));
    return board === undefined || this.perfil.gobiernaBoard(board);
  }

  /** Envía el ticket a otro equipo. Si ya tiene tarea en el board, transfiere esa tarea;
   *  si no, se crea una tarea OCULTA que aparece en el board destino al aceptarse. */
  transferirTicket(t: Ticket): void {
    const st = this.data.stories().find((s) => String(s.ticket) === String(t.ticket));
    this.dialog.open(EnviarEquipoDialog, {
      data: st
        ? { tareaCodigo: st.id, boardCodigo: st.board ?? null, titulo: st.title }
        : { ticket: t.ticket, clienteCodigo: t.clientId ?? null, boardCodigo: null, titulo: t.asunto },
      width: '460px',
      maxWidth: '95vw',
    });
  }

  /** Escala el ticket al Responsable (solicitud). Si ya tiene tarea en el board escala esa;
   *  si no, se crea una tarea OCULTA (asignada a ti) que aparece al aprobarse. */
  escalarTicket(t: Ticket): void {
    const st = this.data.stories().find((s) => String(s.ticket) === String(t.ticket));
    this.dialog.open(EscalarDialog, {
      data: st
        ? { tareaCodigo: st.id, boardCodigo: st.board ?? null, titulo: st.title }
        : { ticket: t.ticket, clienteCodigo: t.clientId ?? null, boardCodigo: null, titulo: t.asunto },
      width: '460px',
      maxWidth: '95vw',
    });
  }

  openAssign(t: Ticket): void {
    this.dialog.open(AssignTicketDialog, { data: { ticket: t }, width: '440px', maxWidth: '95vw' });
  }

  /** Editar / eliminar / reasignar: rol HELPDESK en el alcance del cliente, o ADMIN. */
  puedeGestionar(t: Ticket): boolean {
    return this.auth.puedeGestionarTicket(t.clientId);
  }
  /** Asignar/reasignar: HELPDESK/ADMIN a cualquiera; responsable a sí mismo o a su gente; cualquiera se
   *  toma un ticket sin asignado. */
  puedeAsignar(t: Ticket): boolean {
    return this.auth.puedeAsignarTicket(t);
  }
  editarTicket(t: Ticket): void {
    void abrirEditarTicket(this.dialog, t);
  }
  eliminarTicket(t: Ticket): void {
    void eliminarTicket(this.dialog, this.hd, this.snack, t);
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
  isGuardado(t: Ticket): boolean {
    return !!this.guardados()[t.ticket];
  }
  async toggleGuardado(t: Ticket): Promise<void> {
    await this.data.toggleGuardado(t.ticket);
    this.guardados.set({ ...this.data.getHdGuardados() });
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
        .open(PendienteDateDialog, { data: { title: 'Crear recordatorio', ticket: t.ticket }, width: '420px', maxWidth: '95vw' })
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
