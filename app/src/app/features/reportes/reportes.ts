import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from '../../../environments/environment';
import { nombrePropio } from '../../core/colores';
import { descargarBlob } from '../../core/descargar';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { abrirTicketDialog } from '../../core/ticket-dialog';
import { ThemeService } from '../../core/services/theme.service';
import { prioBadgeClase } from '../board/board-utils';
import { mapTicket } from '../tickets/ticket-utils';
import { estadoStyle, tipoStyle } from '../tickets/tickets-card-utils';
import { generarExcelReporte } from './reporte-excel';
import {
  BLOQUEOS,
  bloqueoDe,
  diasDesde,
  fechaCortaYY,
  fechaHora,
  ESTADO_LABEL,
  FilaReporte,
  FilaSeguimiento,
  PRIORIDAD_LABEL,
  ReporteEstadoEquipo,
  compararFila,
  compararSeguimiento,
  fechaCorta,
} from './reporte-modelo';

/**
 * Reportes → "Estado del equipo": qué hace cada consultor, prioridad (de la tarea y Orden del
 * ticket), desde cuándo y cuántos días lleva, y qué requiere seguimiento hoy. Por equipo y,
 * opcionalmente, para consultores concretos. Solo responsables de equipo y ADMIN (guard + backend).
 * El Excel suma las columnas Próximo paso / ¿Bloqueado? / Motivo / Quién debe intervenir, vacías
 * para completar a mano.
 */
@Component({
  selector: 'app-reportes',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss',
})
export class Reportes {
  private readonly auth = inject(AuthService);
  private readonly data = inject(DataService);
  private readonly hd = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  private readonly theme = inject(ThemeService);
  private readonly base = environment.quarkusApiUrl;

  readonly equipos = signal<{ codigo: string; nombre: string }[]>([]);
  readonly equipoSel = signal('');
  readonly miembros = signal<{ id: string; name: string; global?: boolean }[]>([]);
  /** hid elegidos; vacío = todos los del equipo. */
  readonly consultoresSel = signal<Set<string>>(new Set());
  readonly buscarConsultor = signal('');
  /** Casillas independientes: In Progress se ve siempre; cada una suma su estado. */
  /** Sub-pestaña visible (la 1ª es "Requieren seguimiento hoy"). */
  readonly seccion = signal<'seguimiento' | 'consultores'>('seguimiento');
  readonly incluirTodo = signal(false);
  readonly incluirCert = signal(false);

  readonly cargando = signal(false);
  /** Excel ya generado para el reporte en pantalla. Se prepara ANTES del clic: en la PWA instalada,
   *  un `await` entre el clic y la descarga hace que el navegador la bloquee en silencio. */
  readonly excel = signal<{ blob: Blob; nombre: string } | null>(null);
  readonly exportando = signal(false);
  readonly error = signal('');
  readonly reporte = signal<ReporteEstadoEquipo | null>(null);

  readonly ESTADO_LABEL = ESTADO_LABEL;
  readonly PRIORIDAD_LABEL = PRIORIDAD_LABEL;
  readonly prioBadgeClase = prioBadgeClase;
  readonly fechaCorta = fechaCorta;
  readonly nombre = nombrePropio;
  readonly fechaHora = fechaHora;
  readonly fechaCortaYY = fechaCortaYY;
  readonly BLOQUEOS = BLOQUEOS;
  readonly bloqueoDe = bloqueoDe;
  readonly AVANCES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // ── Tabla "Gestión de trabajo por consultor": búsqueda, filtros, orden y paginación (todo en el cliente) ──
  readonly busqueda = signal('');
  readonly fConsultor = signal(''); // hid ('' = todos; '__SIN__' = sin asignar)
  readonly fCliente = signal('');
  readonly fEstado = signal('');
  readonly fPrioridad = signal('');
  readonly fBloqueo = signal(''); // clave ('' = todos; '__NINGUNO__' = sin dato)
  readonly orden = signal<{ col: string; dir: 1 | -1 } | null>(null);
  readonly pagina = signal(0);
  readonly porPagina = signal(10);
  readonly TAMANOS = [10, 25, 50];
  /** Código de la tarea que se está guardando (deshabilita su fila). */
  readonly guardandoFila = signal<string | null>(null);
  /** Borrador de la nota que se edita (popover). */
  readonly notaBorrador = signal('');

  /** Quien ve el reporte (responsables y ADMIN) edita avance, compromiso, nota y bloqueo; el backend lo re-exige. */
  readonly puedeEditarFila = computed(() => this.auth.puedeVerMiPanel());

  estadoColor(estado: string) {
    return estadoStyle(estado, this.theme.esOscuro());
  }
  tipoColor(tipo: string) {
    return tipoStyle(tipo, this.theme.esOscuro());
  }

  /** Filas del reporte según las casillas de columna (In Progress siempre; To Do y En Certificación opcionales). */
  private readonly filasBase = computed<FilaReporte[]>(() => {
    const rep = this.reporte();
    if (!rep) return [];
    const estados = new Set(['IN_PROGRESS']);
    if (this.incluirTodo()) estados.add('TODO');
    if (this.incluirCert()) estados.add('EN_CERTIFICACION');
    return rep.filas.filter((f) => estados.has(f.estado));
  });

  /** Estado que se muestra: el real del ticket; sin ticket, la columna del board. */
  estadoDe(f: FilaReporte): string {
    return f.estadoTicket || ESTADO_LABEL[f.estado] || f.estado;
  }

  readonly opcionesConsultor = computed(() => {
    const vistos = new Map<string, string>();
    for (const f of this.filasBase()) vistos.set(f.consultorHid ? f.consultorHid.toUpperCase() : '__SIN__', this.nombreConsultor(f));
    return [...vistos].map(([id, nombre]) => ({ id, nombre })).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  });
  readonly opcionesCliente = computed(() =>
    [...new Set(this.filasBase().map((f) => f.cliente || '').filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es')));
  readonly opcionesEstado = computed(() =>
    [...new Set(this.filasBase().map((f) => this.estadoDe(f)))].sort((a, b) => a.localeCompare(b, 'es')));

  nombreFiltroConsultor(): string {
    return this.opcionesConsultor().find((o) => o.id === this.fConsultor())?.nombre ?? 'Consultor';
  }

  readonly hayFiltros = computed(() =>
    !!(this.busqueda().trim() || this.fConsultor() || this.fCliente() || this.fEstado() || this.fPrioridad() || this.fBloqueo()));

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.fConsultor.set('');
    this.fCliente.set('');
    this.fEstado.set('');
    this.fPrioridad.set('');
    this.fBloqueo.set('');
    this.pagina.set(0);
  }

  /** Filtradas y ordenadas (sin paginar): la tabla y el Excel. */
  readonly filasTabla = computed<FilaReporte[]>(() => {
    const q = this.busqueda().trim().toLowerCase();
    const fc = this.fConsultor(), fcl = this.fCliente(), fe = this.fEstado(), fp = this.fPrioridad(), fb = this.fBloqueo();
    const out = this.filasBase().filter((f) => {
      if (fc && (f.consultorHid ? f.consultorHid.toUpperCase() : '__SIN__') !== fc) return false;
      if (fcl && (f.cliente || '') !== fcl) return false;
      if (fe && this.estadoDe(f) !== fe) return false;
      if (fp && (f.prioridad || '') !== fp) return false;
      if (fb && (fb === '__NINGUNO__' ? !!f.bloqueo : f.bloqueo !== fb)) return false;
      if (q) {
        const texto = [f.tarea, f.ticket, f.titulo, f.cliente, this.nombreConsultor(f), f.nota].join(' ').toLowerCase();
        if (!texto.includes(q)) return false;
      }
      return true;
    });
    const o = this.orden();
    const consultor = (f: FilaReporte) => (f.consultorHid ? this.nombreConsultor(f) : '\uffff');
    const base = (a: FilaReporte, b: FilaReporte) => consultor(a).localeCompare(consultor(b), 'es') || compararFila(a, b);
    if (!o) return out.sort(base);
    const val = (f: FilaReporte): string | number => {
      switch (o.col) {
        case 'consultor': return consultor(f);
        case 'tarea': return f.tarea;
        case 'tipo': return f.tipo || '';
        case 'cliente': return f.cliente || '';
        case 'estado': return this.estadoDe(f);
        case 'avance': return f.progreso ?? 0;
        case 'creacion': return f.diasCreacion ?? -1;
        case 'asignacion': return f.fechaAsignacion || '';
        case 'inicio': return f.inicio || '';
        case 'gestion': return f.ultimaGestion || '';
        case 'sinmov': return f.diasSinMov ?? -1;
        case 'espera': return f.diasEsperandoCliente ?? -1;
        case 'compromiso': return f.fechaLimite || '9999';
        case 'bloqueo': return bloqueoDe(f.bloqueo)?.label || '~';
        default: return '';
      }
    };
    return out.sort((a, b) => {
      const va = val(a), vb = val(b);
      const c = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb), 'es');
      return c * o.dir || base(a, b);
    });
  });

  readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.filasTabla().length / this.porPagina())));
  readonly filasPagina = computed(() => {
    const p = Math.min(this.pagina(), this.totalPaginas() - 1);
    return this.filasTabla().slice(p * this.porPagina(), (p + 1) * this.porPagina());
  });
  readonly paginasVisibles = computed(() => {
    const total = this.totalPaginas(), act = Math.min(this.pagina(), total - 1);
    const ini = Math.max(0, Math.min(act - 2, total - 5));
    return Array.from({ length: Math.min(5, total) }, (_, i) => ini + i);
  });
  irPagina(p: number): void {
    this.pagina.set(Math.max(0, Math.min(p, this.totalPaginas() - 1)));
  }

  ordenarPor(col: string): void {
    const o = this.orden();
    this.orden.set(!o || o.col !== col ? { col, dir: 1 } : o.dir === 1 ? { col, dir: -1 } : null);
    this.pagina.set(0);
  }
  flecha(col: string): string {
    const o = this.orden();
    return o && o.col === col ? (o.dir === 1 ? 'arrow_upward' : 'arrow_downward') : 'unfold_more';
  }

  // ── Tarjetas resumen ──
  readonly kpiSinMov = computed(() => this.filasBase().filter((f) => (f.diasSinMov ?? 0) > 3).length);
  readonly kpiVencidas = computed(() => this.filasBase().filter((f) => this.vencida(f)).length);
  readonly kpiActivos = computed(() => new Set(this.filasBase().map((f) => f.consultorHid).filter(Boolean)).size);
  readonly kpiEnProgreso = computed(() => this.filasBase().filter((f) => f.estado === 'IN_PROGRESS').length);
  /** Consultores del reporte sin ninguna fila visible. */
  readonly sinTareaVisible = computed(() => {
    const con = new Set(this.filasBase().map((f) => (f.consultorHid ?? '').toUpperCase()));
    return (this.reporte()?.consultores ?? []).filter((p) => !con.has(String(p.hid).toUpperCase())).map((p) => nombrePropio(p.nombre));
  });

  /** Color de un conteo de días: 0–2 verde · 3–5 amarillo · más de 5 rojo (criterio de la dueña). */
  nivelDias(d: number | null | undefined): 'verde' | 'ambar' | 'rojo' {
    const n = d ?? 0;
    return n > 5 ? 'rojo' : n >= 3 ? 'ambar' : 'verde';
  }

  vencida(f: FilaReporte): boolean {
    return !!f.fechaLimite && f.fechaLimite < new Date().toLocaleDateString('en-CA');
  }

  /**
   * Guarda desde la tabla avance / compromiso / nota / bloqueo (síncrono: se confirma antes de reflejarlo). Lo
   * guardado ES la tarea: el avance es su progreso y el compromiso su fecha límite, así el Board los ve igual.
   */
  async guardarFila(f: FilaReporte, cambios: { progreso?: number; fechaLimite?: string | null; nota?: string | null; bloqueo?: string | null }): Promise<boolean> {
    if (!this.puedeEditarFila() || this.guardandoFila()) return false;
    this.guardandoFila.set(f.tarea);
    try {
      const r = await fetch(`${this.base}/api/reportes/tareas/${encodeURIComponent(f.tarea)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': this.hid },
        body: JSON.stringify(cambios),
      });
      const b = await r.json().catch(() => null);
      if (!r.ok) {
        this.snack.open(b?.message || `No se pudo guardar (${r.status}).`, 'OK', { duration: 5000 });
        return false;
      }
      const nuevo: Partial<FilaReporte> = {
        progreso: b.progreso, fechaLimite: b.fechaLimite, bloqueo: b.bloqueo,
        nota: b.nota, notaPor: b.notaPor, notaFecha: b.notaFecha,
      };
      const upd = <T extends FilaReporte>(x: T): T => (x.tarea === f.tarea ? { ...x, ...nuevo } : x);
      this.reporte.update((rep) => (rep ? { ...rep, filas: rep.filas.map(upd), seguimiento: rep.seguimiento.map(upd) } : rep));
      // El Board (si ya tiene la tarea en memoria) la ve igual sin recargar.
      this.data.stories.update((list) => list.map((s) => (s.id === f.tarea
        ? { ...s, progress: b.progreso, dueDate: b.fechaLimite || '', nota: b.nota, notaPor: b.notaPor, notaFecha: b.notaFecha, bloqueo: b.bloqueo }
        : s)));
      this.snack.open(`${f.tarea} guardada.`, '', { duration: 1800 });
      return true;
    } catch {
      this.snack.open('No se pudo guardar.', 'OK', { duration: 5000 });
      return false;
    } finally {
      this.guardandoFila.set(null);
    }
  }

  cambiarCompromiso(f: FilaReporte, valor: string): void {
    const v = (valor || '').trim() || null;
    if (v === (f.fechaLimite || null)) return;
    void this.guardarFila(f, { fechaLimite: v });
  }

  abrirNota(f: FilaReporte): void {
    this.notaBorrador.set(f.nota || '');
  }
  async guardarNota(f: FilaReporte): Promise<void> {
    const n = this.notaBorrador().trim();
    if (n === (f.nota || '')) return;
    await this.guardarFila(f, { nota: n || null });
  }

  readonly equipoNombre = computed(() => this.equipos().find((e) => e.codigo === this.equipoSel())?.nombre ?? '');
  readonly miembrosF = computed(() => {
    const t = this.buscarConsultor().trim().toLowerCase();
    const list = this.miembros();
    return t ? list.filter((m) => m.name.toLowerCase().includes(t)) : list;
  });
  readonly consultoresLabel = computed(() => {
    const sel = this.consultoresSel();
    if (!sel.size) return 'Todos los del equipo';
    const nombres = this.miembros().filter((m) => sel.has(m.id)).map((m) => nombrePropio(m.name));
    return sel.size <= 2 ? nombres.join(', ') : `${sel.size} consultores`;
  });

  /** Cambiar la prioridad de la TAREA desde el reporte: rol HELPDESK o ADMIN (el backend lo re-exige). */
  readonly puedeEditarPrioridad = computed(() => this.auth.esHelpdesk() || this.auth.esAdminPlataforma());
  /** Código de la tarea cuya prioridad se está guardando (deshabilita su botón). */
  readonly guardandoPrioridad = signal<string | null>(null);
  readonly PRIORIDADES = ['alta', 'media', 'baja'] as const;

  /** Guarda la prioridad de la tarea (síncrono: se confirma antes de reflejarla) y la tabla se reordena sola. */
  async cambiarPrioridad(f: FilaReporte, prioridad: string): Promise<void> {
    if (!this.puedeEditarPrioridad() || f.prioridad === prioridad || this.guardandoPrioridad()) return;
    this.guardandoPrioridad.set(f.tarea);
    try {
      const r = await fetch(`${this.base}/api/reportes/tareas/${encodeURIComponent(f.tarea)}/prioridad`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': this.hid },
        body: JSON.stringify({ prioridad }),
      });
      if (!r.ok) {
        const b = await r.json().catch(() => null);
        this.snack.open(b?.message || `No se pudo cambiar la prioridad (${r.status}).`, 'OK', { duration: 5000 });
        return;
      }
      const upd = <T extends FilaReporte>(x: T): T => (x.tarea === f.tarea ? { ...x, prioridad } : x);
      this.reporte.update((rep) => (rep ? { ...rep, filas: rep.filas.map(upd), seguimiento: rep.seguimiento.map(upd) } : rep));
      // Si el Board ya tiene la tarea en memoria, que la vea igual sin recargar.
      this.data.stories.update((list) => list.map((s) => (s.id === f.tarea ? { ...s, priority: prioridad } : s)));
      this.snack.open(`${f.tarea}: prioridad ${PRIORIDAD_LABEL[prioridad]}.`, 'OK', { duration: 2500 });
    } catch {
      this.snack.open('No se pudo cambiar la prioridad.', 'OK', { duration: 5000 });
    } finally {
      this.guardandoPrioridad.set(null);
    }
  }

  readonly seguimiento = computed<FilaSeguimiento[]>(() => [...(this.reporte()?.seguimiento ?? [])].sort(compararSeguimiento));
  readonly generadoTxt = computed(() => {
    const r = this.reporte();
    if (!r) return '';
    const d = new Date(r.generadoEn);
    const quien = nombrePropio(String(this.auth.session()?.name ?? ''));
    return `Generado el ${d.toLocaleDateString('es-EC')} a las ${d.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}${quien ? ' por ' + quien : ''}`;
  });

  constructor() {
    void this.cargarEquipos();
    // Re-prepara el Excel cuando cambia lo que se ve (reporte nuevo o "incluir pendientes").
    effect(() => {
      const rep = this.reporte();
      const filas = this.filasTabla();
      const seg = this.seguimiento();
      untracked(() => void this.prepararExcel(rep, filas, seg));
    });
  }

  private get hid(): string {
    return String(this.auth.session()?.id ?? '').trim();
  }

  private async cargarEquipos(): Promise<void> {
    try {
      const r = await fetch(`${this.base}/api/reportes/equipos`, { headers: { 'X-Actor-Hid': this.hid } });
      if (!r.ok) {
        this.error.set(r.status === 403 ? 'No tienes equipos a cargo para generar reportes.' : 'No se pudieron cargar los equipos.');
        return;
      }
      const list: { codigo: string; nombre: string }[] = await r.json();
      this.equipos.set(list);
      if (list.length) await this.elegirEquipo(list[0].codigo);
    } catch {
      this.error.set('No se pudieron cargar los equipos.');
    }
  }

  async elegirEquipo(codigo: string): Promise<void> {
    if (codigo === this.equipoSel() && this.miembros().length) return;
    this.equipoSel.set(codigo);
    this.consultoresSel.set(new Set());
    this.reporte.set(null);
    const ms = await this.data.teamMembers(codigo);
    this.miembros.set(
      [...ms]
        .filter((m) => !!m.id)
        .map((m) => ({ ...m, id: String(m.id).toUpperCase() }))
        .sort((a, b) => nombrePropio(a.name).localeCompare(nombrePropio(b.name), 'es')),
    );
    await this.generar();
  }

  toggleConsultor(id: string): void {
    const s = new Set(this.consultoresSel());
    if (s.has(id)) s.delete(id);
    else s.add(id);
    this.consultoresSel.set(s);
  }
  todosConsultores(): void {
    this.consultoresSel.set(new Set());
  }

  async generar(): Promise<void> {
    const eq = this.equipoSel();
    if (!eq || this.cargando()) return;
    this.cargando.set(true);
    this.error.set('');
    try {
      const sel = [...this.consultoresSel()];
      const q = `equipo=${encodeURIComponent(eq)}${sel.length ? '&consultores=' + encodeURIComponent(sel.join(',')) : ''}`;
      const r = await fetch(`${this.base}/api/reportes/estado-equipo?${q}`, { headers: { 'X-Actor-Hid': this.hid } });
      if (!r.ok) {
        const body = await r.json().catch(() => null);
        this.error.set(body?.message || `No se pudo generar el reporte (${r.status}).`);
        this.reporte.set(null);
        return;
      }
      const rep: ReporteEstadoEquipo = await r.json();
      await this.datosEnVivo(rep);
      this.reporte.set(rep);
    } catch {
      this.error.set('No se pudo generar el reporte.');
    } finally {
      this.cargando.set(false);
    }
  }

  /** Orden y ASIGNADO del ticket, en vivo (como el Board): el espejo puede estar desactualizado y una
   *  reasignación hecha en el HelpDesk no toca la tarea. Si la lectura de un ticket falla, queda lo del
   *  backend. Una fila cuyo ticket ahora es de alguien fuera del reporte, sale del reporte. */
  private async datosEnVivo(rep: ReporteEstadoEquipo): Promise<void> {
    const tickets = [...new Set(rep.filas.map((f) => f.ticket).filter((t): t is string => !!t))];
    type Vivo = { orden: string | null; asignado: string | null; tipo: string; estado: string; creacion: string; asignacion: string; mod: string };
    const vivo = new Map<string, Vivo>();
    // Nombre del estado por su id (por si la lectura individual no trae la descripción).
    await this.hd.getTicketStatuses();
    const nombreEstado = new Map(this.hd.statusNames().map((n) => [this.hd.statusIdOf(n), n]));
    await Promise.all(
      tickets.map(async (t) => {
        const raw = await this.hd.fetchTicketRaw(t);
        if (!raw) return;
        const p = raw.priority;
        const tk = mapTicket(raw);
        vivo.set(t, {
          orden: p !== undefined && p !== null && String(p).trim() ? String(p).trim() : null,
          asignado: tk.usuarioAsignado || null,
          tipo: tk.tipo,
          estado: tk.estatus || nombreEstado.get(String(raw.ticket_status_id ?? '')) || '',
          creacion: tk.fechaIngreso,
          asignacion: tk.fechaAsignacion,
          mod: tk.fechaMod,
        });
      }),
    );
    // El asignado de la tarea es SIEMPRE el del ticket: si en vivo difiere, se corrige la tarea.
    this.hd.reconciliarAsignados([...vivo].map(([ticket, v]) => ({ ticket, asignado: v.asignado })));
    const enReporte = new Set(rep.consultores.map((p) => String(p.hid).toUpperCase()));
    const aplicar = (f: FilaReporte): boolean => {
      const v = f.ticket ? vivo.get(f.ticket) : undefined;
      if (!v) return true;
      if (v.orden) f.ordenTicket = v.orden;
      f.tipo = v.tipo || undefined;
      f.estadoTicket = v.estado ? v.estado.toUpperCase() : undefined;
      f.fechaCreacion = v.creacion || undefined;
      f.diasCreacion = diasDesde(v.creacion);
      f.fechaAsignacion = v.asignacion || undefined;
      f.diasAsignacion = diasDesde(v.asignacion);
      f.ultimaGestion = v.mod || undefined;
      f.diasSinMov = diasDesde(v.mod);
      if (v.asignado !== (f.consultorHid ? f.consultorHid.toUpperCase() : null)) {
        f.consultorHid = v.asignado;
        f.consultorNombre = null;
      }
      return !f.consultorHid || enReporte.has(f.consultorHid.toUpperCase());
    };
    rep.filas = rep.filas.filter(aplicar);
    rep.seguimiento = rep.seguimiento.filter(aplicar);
    const conTarea = new Set(rep.filas.map((f) => f.consultorHid?.toUpperCase()).filter(Boolean));
    rep.sinTarea = rep.consultores.filter((p) => !conTarea.has(String(p.hid).toUpperCase()));
  }

  /** Nombre del consultor de una fila (por su hid, contra los consultores del reporte). Regla #8: nunca el código. */
  nombreConsultor(f: FilaReporte): string {
    const hid = (f.consultorHid ?? '').toUpperCase();
    if (!hid) return 'Sin asignar';
    const p = this.reporte()?.consultores.find((x) => String(x.hid).toUpperCase() === hid);
    return nombrePropio(p?.nombre || f.consultorNombre || '') || '—';
  }

  verTicket(ticket: string | null): void {
    if (ticket) void abrirTicketDialog(this.dialog, { ticketId: ticket });
  }

  /** Abre el detalle de la TAREA (mismo modal que el Board), tenga o no ticket. La busca en las tareas ya
   *  cargadas (`DataService.stories`); import dinámico porque el modal es pesado. Al cerrarlo se
   *  regenera el reporte para reflejar lo que se haya cambiado (estado, asignado, prioridad…). */
  async verTarea(codigo: string): Promise<void> {
    await this.data.ensureInit();
    const story = this.data.stories().find((s) => s.id === codigo);
    if (!story) {
      this.snack.open(`No se pudo abrir ${codigo}: no está entre tus tableros.`, 'OK', { duration: 4000 });
      return;
    }
    const { CardDetailDialog } = await import('../board/card-detail-dialog/card-detail-dialog');
    this.dialog
      .open(CardDetailDialog, { data: { story }, width: '560px', maxWidth: '95vw' })
      .afterClosed()
      .subscribe(() => void this.generar());
  }

  private prepVersion = 0;
  private async prepararExcel(rep: ReporteEstadoEquipo | null, filas: FilaReporte[], seg: FilaSeguimiento[]): Promise<void> {
    const v = ++this.prepVersion;
    this.excel.set(null);
    if (!rep) return;
    this.exportando.set(true);
    try {
      const blob = await generarExcelReporte({
        equipo: rep.equipo.nombre,
        consultores: this.consultoresLabel(),
        generadoPor: nombrePropio(String(this.auth.session()?.name ?? '')) || '—',
        generadoEn: new Date(rep.generadoEn),
        filas: filas.map((f) => ({ ...f, consultorNombre: this.nombreConsultor(f), estadoTicket: this.estadoDe(f) })),
        sinTarea: this.sinTareaVisible(),
        seguimiento: seg.map((s) => ({ ...s, consultorNombre: s.consultorHid ? this.nombreConsultor(s) : null })),
      });
      if (v !== this.prepVersion) return; // llegó otro cambio mientras se generaba
      const hoy = rep.generadoEn.slice(0, 10);
      this.excel.set({ blob, nombre: `Reporte-${rep.equipo.codigo}-${hoy}.xlsx` });
    } catch {
      if (v === this.prepVersion) this.snack.open('No se pudo preparar el Excel.', 'OK', { duration: 4000 });
    } finally {
      if (v === this.prepVersion) this.exportando.set(false);
    }
  }

  /** Síncrono a propósito (ver `excel`). */
  descargarExcel(): void {
    const x = this.excel();
    if (x) descargarBlob(x.blob, x.nombre);
  }
}
