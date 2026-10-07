import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { OrdenEstado, OrdenEstadosService } from '../../core/services/orden-estados.service';
import { AdminApiService, Asignacion, Cliente, Equipo, Regional, Rol } from './admin-api.service';
import { CrearAsignacionDialog } from './crear-asignacion-dialog';
import { CrearClienteDialog } from './crear-cliente-dialog';
import { CrearEquipoDialog } from './crear-equipo-dialog';
import { CrearRegionalDialog } from './crear-regional-dialog';
import { EliminarRegionDialog } from './eliminar-region-dialog';

/**
 * Administración (nacionalización por DATOS). Alta de Regionales, Equipos y Clientes
 * por modal: se crea la 2ª regional y sus clientes (equipo responsable + puente
 * helpdesk_client_id) sin tocar código. Solo ADMIN y solo en modo Quarkus.
 */
@Component({
  selector: 'app-administracion',
  imports: [MatTabsModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.scss',
})
export class Administracion {
  private readonly api = inject(AdminApiService);
  private readonly hd = inject(HelpdeskService);
  private readonly auth = inject(AuthService);
  private readonly snack = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly ordenEst = inject(OrdenEstadosService);

  /** Solo un ADMIN puede tocar asignaciones de rol ADMIN (para gatear chips/acciones). */
  readonly puedeAsignarAdmin = this.auth.puedeAsignarAdmin;

  readonly regionales = signal<Regional[]>([]);
  readonly equipos = signal<Equipo[]>([]);
  readonly clientes = signal<Cliente[]>([]);
  readonly roles = signal<Rol[]>([]);
  readonly asignaciones = signal<Asignacion[]>([]);
  readonly cargando = signal(false);

  // ── Equipo base (ubicación de los consultores de alcance nacional; solo informativo para Reportes) ──
  /** usuarioId → equipo base. */
  readonly equipoBase = signal<Record<string, { codigo: string; nombre: string }>>({});
  /** Códigos de equipo que el actor puede poner/quitar como base (ADMIN = todos; RE = los que dirige). */
  readonly equiposBaseEditables = signal<Set<string>>(new Set());
  readonly guardandoBase = signal(false);
  /** Equipos que se ofrecen en el selector (activos y editables por el actor). */
  readonly opcionesEquipoBase = computed(() =>
    this.equipos().filter((e) => e.activo && this.equiposBaseEditables().has(e.codigo))
      .sort((a, b) => (a.nombre || a.codigo).localeCompare(b.nombre || b.codigo, 'es')));
  baseDe(usuarioId: number): { codigo: string; nombre: string } | null {
    return this.equipoBase()[String(usuarioId)] ?? null;
  }
  /** ¿Puede cambiar el equipo base de esta persona? Debe dirigir el actual (si tiene) y algún equipo. */
  puedeEditarBase(usuarioId: number): boolean {
    const actual = this.baseDe(usuarioId);
    return this.equiposBaseEditables().size > 0 && (!actual || this.equiposBaseEditables().has(actual.codigo));
  }
  async cambiarEquipoBase(usuarioId: number, codigo: string | null): Promise<void> {
    if (this.guardandoBase() || (this.baseDe(usuarioId)?.codigo ?? null) === codigo) return;
    this.guardandoBase.set(true);
    try {
      const r = await this.api.setEquipoBase(usuarioId, codigo);
      this.equipoBase.update((m) => {
        const n = { ...m };
        if (r.equipoBaseCodigo) n[String(usuarioId)] = { codigo: r.equipoBaseCodigo, nombre: r.equipoBaseNombre || r.equipoBaseCodigo };
        else delete n[String(usuarioId)];
        return n;
      });
      this.snack.open(codigo ? 'Equipo base guardado. Aparecerá en el reporte de ese equipo.' : 'Equipo base quitado.', '', { duration: 2500 });
    } catch (e: any) {
      this.snack.open(e?.error?.error || 'No se pudo guardar el equipo base.', 'OK', { duration: 5000 });
    } finally {
      this.guardandoBase.set(false);
    }
  }

  /** Catálogo de empleados del HelpDesk (fuente del nombre COMPLETO del técnico). */
  readonly hdUsers = this.hd.hdUsers;
  /** Asignaciones con el `usuarioNombre` tomado del API (catálogo) por helpdesk_user_id;
   *  el nombre local (ETL) queda solo como respaldo si el catálogo no lo tiene. */
  readonly asignacionesVista = computed<Asignacion[]>(() => {
    const nombreApi = new Map(this.hdUsers().map((u) => [String(u.id), u.name]));
    return this.asignaciones().map((a) => {
      const hid = a.helpdeskUserId ? String(a.helpdeskUserId) : '';
      const api = hid ? nombreApi.get(hid) : undefined;
      // Usar el del API salvo que sea el fallback (name === id) → ahí conservar el local.
      return api && api !== hid ? { ...a, usuarioNombre: api } : a;
    });
  });

  /** Equipos con el nombre del responsable tomado del API (por su helpdesk_user_id). */
  readonly equiposVista = computed<Equipo[]>(() => {
    const nombreApi = new Map(this.hdUsers().map((u) => [String(u.id), u.name]));
    return this.equipos().map((e) => {
      const hid = e.responsableHelpdeskUserId ? String(e.responsableHelpdeskUserId) : '';
      const api = hid ? nombreApi.get(hid) : undefined;
      return api && api !== hid ? { ...e, responsableNombre: api } : e;
    });
  });

  // ── Orden de estados (personal): en qué orden ve el usuario los tickets por estado en Tickets ──
  /** Borrador editable: ticket_status_id → {orden, oculto}. Se compara con lo guardado (`ordenEst`). */
  readonly oeBorrador = signal<Record<string, { orden: number | null; oculto: boolean }>>({});
  readonly oeGuardando = signal(false);
  readonly oePuedeEditar = this.ordenEst.puedeEditar;
  /** Todos los estados del catálogo del HelpDesk, en orden alfabético, con su valor del borrador. */
  readonly oeFilas = computed(() => {
    const b = this.oeBorrador();
    return this.hd
      .statusNames()
      .map((nombre) => ({ nombre, id: this.hd.statusIdOf(nombre) ?? '' }))
      .filter((f) => !!f.id)
      .sort((a, z) => a.nombre.localeCompare(z.nombre, 'es'))
      .map((f) => ({ ...f, orden: b[f.id]?.orden ?? null, oculto: !!b[f.id]?.oculto }));
  });
  /** Lo que se mandaría al guardar (solo estados con orden u ocultos). */
  private readonly oeEnvio = computed<OrdenEstado[]>(() =>
    this.oeFilas()
      .filter((f) => f.oculto || f.orden != null)
      .map((f) => ({ estado: f.id, orden: f.oculto ? null : f.orden, oculto: f.oculto })),
  );
  /** ¿Hay cambios sin guardar? */
  readonly oeSucio = computed(() => {
    const clave = (l: OrdenEstado[]) =>
      l.map((e) => `${e.estado}:${e.oculto ? 'x' : e.orden}`).sort().join('|');
    return clave(this.oeEnvio()) !== clave(this.ordenEst.estados());
  });
  /** Vista previa: los estados con orden (por número, empates alfabéticos) y los ocultos. */
  readonly oeConOrden = computed(() =>
    this.oeFilas()
      .filter((f) => !f.oculto && f.orden != null)
      .sort((a, z) => a.orden! - z.orden! || a.nombre.localeCompare(z.nombre, 'es')),
  );
  readonly oeOcultos = computed(() => this.oeFilas().filter((f) => f.oculto));

  /** Copia lo guardado al borrador (al cargar y al descartar cambios). Los números quedan consecutivos
   *  (1, 2, 3…): si lo guardado tuviera repetidos o huecos, se renumera respetando el orden (empate → A-Z). */
  oeDescartar(): void {
    const b: Record<string, { orden: number | null; oculto: boolean }> = {};
    for (const e of this.ordenEst.estados()) b[e.estado] = { orden: e.orden, oculto: e.oculto };
    const nombre = (id: string) => this.hd.statusNames().find((n) => this.hd.statusIdOf(n) === id) ?? id;
    Object.keys(b)
      .filter((id) => !b[id].oculto && b[id].orden != null)
      .sort((x, y) => b[x].orden! - b[y].orden! || nombre(x).localeCompare(nombre(y), 'es'))
      .forEach((id, i) => (b[id] = { orden: i + 1, oculto: false }));
    this.oeBorrador.set(b);
  }

  /** Quita el número de un estado y baja uno a los que iban después (sin huecos). */
  private oeQuitarOrden(b: Record<string, { orden: number | null; oculto: boolean }>, id: string): void {
    const previo = b[id]?.orden;
    if (previo == null) return;
    for (const [k, v] of Object.entries(b)) {
      if (k !== id && v.orden != null && v.orden > previo) b[k] = { ...v, orden: v.orden - 1 };
    }
  }

  private oeAviso(msg: string): void {
    this.snack.open(msg, 'OK', { duration: 5000 });
  }

  /**
   * Número digitado para un estado (al confirmar: Enter o salir del campo). Los números van seguidos: solo
   * se acepta el que toca (el siguiente al último); uno ya usado o uno mayor se rechaza con aviso y el campo
   * vuelve a su valor. Vacío = quitar el número (los siguientes bajan uno).
   */
  oeSetOrden(id: string, input: HTMLInputElement): void {
    const b = { ...this.oeBorrador() };
    const actual = b[id]?.orden ?? null;
    const texto = String(input.value ?? '').trim();
    const restaurar = () => (input.value = actual != null ? String(actual) : '');
    if (!texto) {
      this.oeQuitarOrden(b, id);
      b[id] = { orden: null, oculto: false };
      this.oeBorrador.set(b);
      return;
    }
    if (!/^\d+$/.test(texto) || Number(texto) < 1) {
      restaurar();
      this.oeAviso('Escribe un número desde 1.');
      return;
    }
    const n = Number(texto);
    if (n === actual) {
      restaurar(); // p. ej. "02" → "2"
      return;
    }
    const usados = Object.entries(b).filter(([k, v]) => k !== id && !v.oculto && v.orden != null);
    const siguiente = usados.length + 1;
    const dueno = usados.find(([, v]) => v.orden === n);
    if (dueno) {
      restaurar();
      const nombre = this.hd.statusNames().find((x) => this.hd.statusIdOf(x) === dueno[0]) ?? dueno[0];
      this.oeAviso(actual != null
        ? `El ${n} lo usa el estado ${nombre}. Para reordenar, vacía primero el número.`
        : `El siguiente orden es el ${siguiente}; el ${n} lo usa el estado ${nombre}.`);
      return;
    }
    if (n !== siguiente) {
      restaurar();
      this.oeAviso(`El orden que toca es el ${siguiente}.`);
      return;
    }
    b[id] = { orden: n, oculto: false };
    this.oeBorrador.set(b);
  }

  oeSetOculto(id: string, oculto: boolean): void {
    const b = { ...this.oeBorrador() };
    if (oculto) this.oeQuitarOrden(b, id);
    b[id] = { orden: null, oculto };
    this.oeBorrador.set(b);
  }

  /** Deja todos los estados sin orden ni ocultos (hay que guardar para aplicarlo). */
  oeRestablecer(): void {
    this.oeBorrador.set({});
  }

  /** Guarda (síncrono: confirma el backend antes de dar por hecho). */
  async oeGuardar(): Promise<void> {
    if (this.oeGuardando()) return;
    this.oeGuardando.set(true);
    try {
      await this.ordenEst.guardar(this.oeEnvio());
      this.oeDescartar();
      this.snack.open('Orden de estados guardado. Se aplica en Tickets.', '', { duration: 2500 });
    } catch (e: any) {
      this.snack.open(e?.message || 'No se pudo guardar el orden de estados.', 'OK', { duration: 5000 });
    } finally {
      this.oeGuardando.set(false);
    }
  }

  // ── Búsqueda + filtro "activo" por tabla (Regionales/Equipos/Clientes) ──
  readonly regBuscar = signal(''); readonly regActivo = signal<'todos' | 'si' | 'no'>('todos');
  readonly eqBuscar = signal(''); readonly eqActivo = signal<'todos' | 'si' | 'no'>('todos');
  readonly cliBuscar = signal(''); readonly cliActivo = signal<'todos' | 'si' | 'no'>('todos');

  readonly regionalesFiltradas = computed(() =>
    this.filtrar(this.regionales(), this.regBuscar(), this.regActivo(), (r) => [r.codigo, r.nombre]));
  readonly equiposFiltrados = computed(() =>
    this.filtrar(this.equiposVista(), this.eqBuscar(), this.eqActivo(), (e) => [e.codigo, e.nombre, e.regionalNombre, e.responsableNombre]));
  readonly clientesFiltrados = computed(() =>
    this.filtrar(this.clientes(), this.cliBuscar(), this.cliActivo(), (c) => [c.codigo, c.nombre, c.helpdeskClientId, c.equipoResponsableNombre]));

  /** Filtro común: texto (varios campos) + estado activo. */
  private filtrar<T extends { activo: boolean }>(rows: T[], q: string, activo: 'todos' | 'si' | 'no', campos: (r: T) => (string | null | undefined)[]): T[] {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (activo === 'si' && !r.activo) return false;
      if (activo === 'no' && r.activo) return false;
      if (!t) return true;
      return campos(r).some((v) => (v ?? '').toString().toLowerCase().includes(t));
    });
  }

  readonly activoLabel = (v: 'todos' | 'si' | 'no') => (v === 'si' ? 'Activos' : v === 'no' ? 'Inactivos' : 'Todos');

  // ── Asignaciones: búsqueda + filtros (rol / alcance / estado) + selección + stats ──
  readonly asigBuscar = signal('');
  readonly asigRol = signal(''); // rolCodigo o ''
  readonly asigAlcance = signal(''); // alcanceTipo o ''
  readonly asigEstado = signal<'todos' | 'vigentes' | 'vencidas'>('todos');
  readonly asigSelId = signal<number | null>(null);

  /** ¿La asignación está vigente hoy? (activa y sin fecha fin o fin en el futuro). */
  esVigente(a: Asignacion): boolean {
    const hoy = new Date().toISOString().slice(0, 10);
    return a.activo && (!a.vigenteHasta || a.vigenteHasta >= hoy);
  }

  readonly asignacionesFiltradas = computed<Asignacion[]>(() => {
    const t = this.asigBuscar().trim().toLowerCase();
    const rol = this.asigRol(), alc = this.asigAlcance(), est = this.asigEstado();
    return this.asignacionesVista().filter((a) => {
      if (rol && a.rolCodigo !== rol) return false;
      if (alc && a.alcanceTipo !== alc) return false;
      if (est === 'vigentes' && !this.esVigente(a)) return false;
      if (est === 'vencidas' && this.esVigente(a)) return false;
      if (!t) return true;
      return (
        (a.usuarioNombre ?? '').toLowerCase().includes(t) ||
        (a.helpdeskUserId ?? '').toLowerCase().includes(t) ||
        (a.rolNombre ?? '').toLowerCase().includes(t) ||
        (a.alcanceNombre ?? '').toLowerCase().includes(t)
      );
    });
  });

  readonly hayFiltroAsig = computed(() => !!(this.asigBuscar().trim() || this.asigRol() || this.asigAlcance() || this.asigEstado() !== 'todos'));

  /** Tarjetas de resumen (todas derivadas del dato real). */
  readonly asigStats = computed(() => {
    const hoy = new Date().toISOString().slice(0, 10);
    const en7 = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
    const rows = this.asignacionesVista();
    return {
      activas: rows.filter((a) => this.esVigente(a)).length,
      temporales: rows.filter((a) => !!a.vigenteHasta).length,
      globales: rows.filter((a) => a.alcanceTipo === 'GLOBAL').length,
      porEquipos: rows.filter((a) => a.alcanceTipo === 'EQUIPO').length,
      porVencer: rows.filter((a) => a.vigenteHasta && a.vigenteHasta >= hoy && a.vigenteHasta <= en7).length,
    };
  });

  /** Roles y alcances presentes (para los menús de filtro). */
  readonly rolesPresentes = computed(() => [...new Map(this.asignacionesVista().map((a) => [a.rolCodigo, a.rolNombre])).entries()]);
  readonly alcancesPresentes = computed(() => [...new Set(this.asignacionesVista().map((a) => a.alcanceTipo))]);

  /** Asignación seleccionada para el panel de detalle (o la primera de la lista). */
  readonly asigSel = computed<Asignacion | null>(() => {
    const list = this.asignacionesOrd();
    return list.find((a) => a.id === this.asigSelId()) ?? list[0] ?? null;
  });
  seleccionarAsig(a: Asignacion): void { this.asigSelId.set(a.id); }
  limpiarFiltrosAsig(): void {
    this.asigBuscar.set(''); this.asigRol.set(''); this.asigAlcance.set(''); this.asigEstado.set('todos');
  }

  /** Iniciales para el avatar (2 letras). */
  iniciales(nombre: string | null | undefined): string {
    const p = (nombre ?? '').trim().split(/\s+/).filter(Boolean);
    return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase() || '—';
  }

  /** "2026-07-03" → "03 jul 2026" (o "—"). */
  fmtFecha(iso: string | null | undefined): string {
    if (!iso) return '—';
    const [y, m, d] = iso.slice(0, 10).split('-');
    const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][Number(m) - 1] ?? m;
    return d && mes && y ? `${d} ${mes} ${y}` : iso;
  }

  // ── Ordenamiento de las tablas (click en el encabezado) ──
  private readonly sortReg = signal<{ col: string; dir: 1 | -1 }>({ col: 'nombre', dir: 1 });
  private readonly sortEq = signal<{ col: string; dir: 1 | -1 }>({ col: 'nombre', dir: 1 });
  private readonly sortCli = signal<{ col: string; dir: 1 | -1 }>({ col: 'nombre', dir: 1 });
  private readonly sortAsig = signal<{ col: string; dir: 1 | -1 }>({ col: 'usuarioNombre', dir: 1 });
  private readonly sorts: Record<string, WritableSignal<{ col: string; dir: 1 | -1 }>> = {
    reg: this.sortReg, eq: this.sortEq, cli: this.sortCli, asig: this.sortAsig,
  };

  readonly regionalesOrd = this.ordenar(this.regionalesFiltradas, this.sortReg);
  readonly equiposOrd = this.ordenar(this.equiposFiltrados, this.sortEq);
  readonly clientesOrd = this.ordenar(this.clientesFiltrados, this.sortCli);
  readonly asignacionesOrd = this.ordenar(this.asignacionesFiltradas, this.sortAsig);

  constructor() {
    this.recargar();
    this.hd.getHdUsers(); // catálogo del HelpDesk (nombres completos del técnico)
    this.hd.getTicketStatuses(); // catálogo de estados (pestaña "Orden de estados")
    void this.ordenEst.cargar(true).then(() => this.oeDescartar());
  }

  /** Devuelve un signal derivado con las filas ordenadas según el estado de sort. */
  private ordenar<T>(rows: Signal<T[]>, sort: Signal<{ col: string; dir: 1 | -1 }>): Signal<T[]> {
    return computed(() => {
      const { col, dir } = sort();
      return [...rows()].sort((a, b) => this.cmp((a as Record<string, unknown>)[col], (b as Record<string, unknown>)[col]) * dir);
    });
  }

  private cmp(a: unknown, b: unknown): number {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    if (typeof a === 'boolean' && typeof b === 'boolean') return a === b ? 0 : a ? 1 : -1;
    return String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' });
  }

  /** Alterna el ordenamiento de una tabla por una columna (asc → desc). */
  ordenarPor(tabla: string, col: string): void {
    const sig = this.sorts[tabla];
    if (!sig) return;
    const cur = sig();
    sig.set({ col, dir: cur.col === col ? (cur.dir * -1 as 1 | -1) : 1 });
  }

  /** Flecha del encabezado: ▲/▼ si es la columna activa, si no vacío. */
  flecha(tabla: string, col: string): string {
    const s = this.sorts[tabla]?.();
    return s && s.col === col ? (s.dir === 1 ? ' ▲' : ' ▼') : '';
  }

  async recargar(): Promise<void> {
    this.cargando.set(true);
    try {
      const [r, e, c, ro, a, eb] = await Promise.all([
        this.api.regionales(), this.api.equipos(), this.api.clientes(),
        this.api.roles(), this.api.asignaciones(),
        this.api.equiposBase().catch(() => ({ usuarios: {}, editables: [] as string[] })),
      ]);
      this.equipoBase.set(eb.usuarios ?? {});
      this.equiposBaseEditables.set(new Set(eb.editables ?? []));
      this.regionales.set(r);
      this.equipos.set(e);
      this.clientes.set(c);
      this.roles.set(ro);
      this.asignaciones.set(a);
    } catch {
      this.snack.open('No se pudieron cargar los datos de administración.', 'OK', { duration: 4000 });
    } finally {
      this.cargando.set(false);
    }
  }

  // ── Altas por modal (recargan si el diálogo creó algo) ──
  async nuevaRegional(): Promise<void> {
    const creado = await firstValueFrom(
      this.dialog.open(CrearRegionalDialog, { width: '420px', maxWidth: '95vw' }).afterClosed(),
    );
    if (creado) await this.recargar();
  }

  async editarRegional(r: Regional): Promise<void> {
    const res = await firstValueFrom(
      this.dialog.open(CrearRegionalDialog, { data: { regional: r }, width: '420px', maxWidth: '95vw' }).afterClosed(),
    );
    if (res) await this.recargar();
  }

  /**
   * Elimina una regional en cascada: borra sus equipos VACÍOS (con su tablero). Pide una
   * VERIFICACIÓN (escribir el código) por seguridad. El backend BLOQUEA (y muestra el motivo) si
   * algún equipo tiene tareas, o si hay técnicos que solo pertenecen a esta región (su Responsable
   * debe reclasificarlos primero), o si el actor no es ADMIN/RE de la región.
   */
  async quitarRegional(r: Regional): Promise<void> {
    const ok = await firstValueFrom(
      this.dialog.open(EliminarRegionDialog, { data: { codigo: r.codigo, nombre: r.nombre }, width: '440px', maxWidth: '95vw' }).afterClosed(),
    );
    if (!ok) return;
    try {
      await this.api.eliminarRegional(r.id);
      this.snack.open('Regional eliminada', '', { duration: 2000 });
      await this.recargar();
    } catch (err) {
      const detalle = (err as { error?: { error?: string } })?.error?.error;
      this.snack.open(detalle ?? 'No se pudo eliminar la regional.', 'OK', { duration: 5000 });
    }
  }

  async nuevoEquipo(): Promise<void> {
    const creado = await firstValueFrom(
      this.dialog.open(CrearEquipoDialog, { data: { regionales: this.regionales() }, width: '460px', maxWidth: '95vw' }).afterClosed(),
    );
    if (creado) await this.recargar();
  }

  async editarEquipo(e: Equipo): Promise<void> {
    const res = await firstValueFrom(
      this.dialog.open(CrearEquipoDialog, { data: { regionales: this.regionales(), equipo: e }, width: '460px', maxWidth: '95vw' }).afterClosed(),
    );
    if (res) await this.recargar();
  }

  /** Equipos ACTIVOS para los selectores; incluye uno inactivo si ya está referenciado
   *  (así al editar una asignación sobre un equipo dado de baja no se pierde el valor). */
  private equiposParaSelector(incluirId?: number | null): Equipo[] {
    const activos = this.equipos().filter((e) => e.activo);
    if (incluirId != null && !activos.some((e) => e.id === incluirId)) {
      const extra = this.equipos().find((e) => e.id === incluirId);
      if (extra) return [...activos, extra];
    }
    return activos;
  }

  async nuevoCliente(): Promise<void> {
    const creado = await firstValueFrom(
      this.dialog.open(CrearClienteDialog, {
        data: { equipos: this.equiposParaSelector(), yaRegistrados: this.clientes().map((c) => String(c.helpdeskClientId)) },
        width: '560px',
        maxWidth: '95vw',
      }).afterClosed(),
    );
    if (creado) {
      // Sus tareas creadas cuando aún no estaba registrado se ligan y pasan al tablero del equipo (backend).
      const movidas = Number((creado as { tareasMovidas?: number }).tareasMovidas ?? 0);
      if (movidas > 0) this.snack.open(`Se ligaron ${movidas} tarea(s) existentes a este cliente y pasaron al tablero de su equipo.`, 'OK', { duration: 5000 });
      await this.recargar();
    }
  }

  /** Quita un cliente (lo desliga de su región/equipo y lo borra). Pide confirmación. */
  async quitarCliente(c: Cliente): Promise<void> {
    if (!confirm(`¿Quitar el cliente "${c.nombre}"? Se desliga de su equipo/región y se borra.`)) return;
    try {
      await this.api.eliminarCliente(c.id);
      this.snack.open('Cliente quitado', '', { duration: 2000 });
      await this.recargar();
    } catch {
      this.snack.open('No se pudo quitar el cliente.', 'OK', { duration: 4000 });
    }
  }

  // ── Asignaciones (Rol × Alcance × Vigencia) ──
  async nuevaAsignacion(usuarioPreHid?: string): Promise<void> {
    const creada = await firstValueFrom(
      this.dialog.open(CrearAsignacionDialog, {
        data: {
          roles: this.roles(), equipos: this.equiposParaSelector(),
          clientes: this.clientes(), regionales: this.regionales(), usuarioPreHid,
        },
        width: '560px',
        maxWidth: '95vw',
      }).afterClosed(),
    );
    if (creada) await this.recargar();
  }

  async editarAsignacion(a: Asignacion): Promise<void> {
    if (a.rolCodigo === 'ADMIN' && !this.puedeAsignarAdmin()) {
      this.snack.open('Solo un ADMIN puede modificar asignaciones de rol ADMIN.', 'OK', { duration: 4000 });
      return;
    }
    const res = await firstValueFrom(
      this.dialog.open(CrearAsignacionDialog, {
        data: {
          roles: this.roles(),
          equipos: this.equiposParaSelector(a.alcanceTipo === 'EQUIPO' ? a.alcanceObjetivoId : null),
          clientes: this.clientes(), regionales: this.regionales(), asignacion: a,
        },
        width: '560px',
        maxWidth: '95vw',
      }).afterClosed(),
    );
    if (res) await this.recargar();
  }

  async quitarAsignacion(a: Asignacion): Promise<void> {
    if (a.rolCodigo === 'ADMIN' && !this.puedeAsignarAdmin()) {
      this.snack.open('Solo un ADMIN puede quitar asignaciones de rol ADMIN.', 'OK', { duration: 4000 });
      return;
    }
    if (!confirm(`¿Quitar la asignación "${a.usuarioNombre} · ${a.rolCodigo} · ${a.alcanceNombre ?? ''}"?`)) return;
    try {
      await this.api.eliminarAsignacion(a.id);
      this.snack.open('Asignación quitada', '', { duration: 2000 });
      await this.recargar();
    } catch {
      this.snack.open('No se pudo quitar la asignación.', 'OK', { duration: 4000 });
    }
  }
}
