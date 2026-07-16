import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
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
  imports: [MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.scss',
})
export class Administracion {
  private readonly api = inject(AdminApiService);
  private readonly hd = inject(HelpdeskService);
  private readonly auth = inject(AuthService);
  private readonly snack = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  /** Solo un ADMIN puede tocar asignaciones de rol ADMIN (para gatear chips/acciones). */
  readonly puedeAsignarAdmin = this.auth.puedeAsignarAdmin;

  readonly regionales = signal<Regional[]>([]);
  readonly equipos = signal<Equipo[]>([]);
  readonly clientes = signal<Cliente[]>([]);
  readonly roles = signal<Rol[]>([]);
  readonly asignaciones = signal<Asignacion[]>([]);
  readonly cargando = signal(false);

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

  /** Buscador de la tabla Asignaciones (por nombre, código del API, rol o alcance). */
  readonly asigBuscar = signal('');
  readonly asignacionesFiltradas = computed<Asignacion[]>(() => {
    const t = this.asigBuscar().trim().toLowerCase();
    const rows = this.asignacionesVista();
    if (!t) return rows;
    return rows.filter((a) =>
      (a.usuarioNombre ?? '').toLowerCase().includes(t) ||
      (a.helpdeskUserId ?? '').toLowerCase().includes(t) ||
      (a.rolNombre ?? '').toLowerCase().includes(t) ||
      (a.alcanceNombre ?? '').toLowerCase().includes(t),
    );
  });

  // ── Ordenamiento de las tablas (click en el encabezado) ──
  private readonly sortReg = signal<{ col: string; dir: 1 | -1 }>({ col: 'nombre', dir: 1 });
  private readonly sortEq = signal<{ col: string; dir: 1 | -1 }>({ col: 'nombre', dir: 1 });
  private readonly sortCli = signal<{ col: string; dir: 1 | -1 }>({ col: 'nombre', dir: 1 });
  private readonly sortAsig = signal<{ col: string; dir: 1 | -1 }>({ col: 'usuarioNombre', dir: 1 });
  private readonly sorts: Record<string, WritableSignal<{ col: string; dir: 1 | -1 }>> = {
    reg: this.sortReg, eq: this.sortEq, cli: this.sortCli, asig: this.sortAsig,
  };

  readonly regionalesOrd = this.ordenar(this.regionales, this.sortReg);
  readonly equiposOrd = this.ordenar(this.equiposVista, this.sortEq);
  readonly clientesOrd = this.ordenar(this.clientes, this.sortCli);
  readonly asignacionesOrd = this.ordenar(this.asignacionesFiltradas, this.sortAsig);

  constructor() {
    this.recargar();
    this.hd.getHdUsers(); // catálogo del HelpDesk (nombres completos del técnico)
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
      const [r, e, c, ro, a] = await Promise.all([
        this.api.regionales(), this.api.equipos(), this.api.clientes(),
        this.api.roles(), this.api.asignaciones(),
      ]);
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
   * Elimina una regional en cascada: borra sus equipos VACÍOS (con su tablero/sprints). Pide una
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
    if (creado) await this.recargar();
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
