import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { AdminApiService, Asignacion, Cliente, Equipo, NuevaAsignacion, Regional, Rol } from './admin-api.service';

interface DialogData {
  roles: Rol[]; equipos: Equipo[]; clientes: Cliente[]; regionales: Regional[];
  usuarioPreHid?: string | null; // empleado preseleccionado (desde la tab Usuarios y roles)
  asignacion?: Asignacion;       // si viene → modo EDICIÓN (pre-carga + PUT, usuario fijo)
}

type Tipo = 'EQUIPO' | 'CLIENTE' | 'REGIONAL' | 'GLOBAL';

/**
 * Modal de Asignación: Rol × Alcance × Vigencia. El usuario se elige del **catálogo de
 * empleados del HelpDesk** (federación); al guardar, el backend materializa su fila `usuario`
 * si no existía. En edición el usuario queda fijo (solo se cambia rol/alcance/vigencia).
 */
@Component({
  selector: 'app-crear-asignacion-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './crear-asignacion-dialog.html',
  styleUrl: './administracion.scss',
})
export class CrearAsignacionDialog {
  private readonly api = inject(AdminApiService);
  private readonly hd = inject(HelpdeskService);
  private readonly auth = inject(AuthService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<CrearAsignacionDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly roles = this.data.roles;
  readonly guardando = signal(false);
  readonly tipo = signal<Tipo>('EQUIPO');
  readonly editando = !!this.data.asignacion;

  // Solo un ADMIN puede ofrecer/otorgar el rol ADMIN. Para los demás se oculta del selector
  // (salvo que la asignación en edición ya sea ADMIN, para no romper el valor pre-cargado).
  readonly puedeAsignarAdmin = this.auth.puedeAsignarAdmin;
  readonly rolesVisibles = computed(() => {
    if (this.puedeAsignarAdmin() || this.data.asignacion?.rolCodigo === 'ADMIN') return this.roles;
    return this.roles.filter((r) => r.codigo !== 'ADMIN');
  });

  readonly tipos: Tipo[] = ['EQUIPO', 'CLIENTE', 'REGIONAL', 'GLOBAL'];

  // Catálogo de empleados del HelpDesk (con buscador).
  readonly hdUsers = this.hd.hdUsers;
  readonly hdBuscar = signal('');
  readonly hdFiltrados = computed(() => {
    const t = this.hdBuscar().trim().toLowerCase();
    const list = this.hdUsers();
    return t ? list.filter((u) => u.name.toLowerCase().includes(t) || String(u.id).toLowerCase().includes(t)) : list;
  });

  /** Opciones del objetivo del alcance según el tipo. */
  readonly objetivos = computed<{ id: number; label: string }[]>(() => {
    switch (this.tipo()) {
      case 'EQUIPO': return this.data.equipos.map((e) => ({ id: e.id, label: `${e.nombre} · ${e.regionalNombre}` }));
      case 'CLIENTE': return this.data.clientes.map((c) => ({ id: c.id, label: c.nombre }));
      case 'REGIONAL': return this.data.regionales.map((r) => ({ id: r.id, label: r.nombre }));
      default: return [];
    }
  });

  form = {
    usuarioHid: this.data.usuarioPreHid ?? (null as string | null),
    rolId: null as number | null,
    objetivoId: null as number | null,
    vigenteDesde: '',
    vigenteHasta: '',
  };

  constructor() {
    this.hd.getHdUsers();
    const a = this.data.asignacion;
    if (a) {
      this.tipo.set((a.alcanceTipo as Tipo) || 'EQUIPO');
      this.form = {
        usuarioHid: null, // en edición el usuario es fijo (a.usuarioNombre); no se cambia
        rolId: a.rolId,
        objetivoId: a.alcanceObjetivoId ?? null,
        vigenteDesde: a.vigenteDesde ?? '',
        vigenteHasta: a.vigenteHasta ?? '',
      };
    }
  }

  onTipoChange(t: Tipo): void {
    this.tipo.set(t);
    this.form.objetivoId = null;
  }

  async crear(): Promise<void> {
    const { usuarioHid, rolId, objetivoId, vigenteDesde, vigenteHasta } = this.form;
    const t = this.tipo();
    if ((!this.editando && !usuarioHid) || !rolId || (t !== 'GLOBAL' && !objetivoId)) {
      this.snack.open('Elegí usuario, rol y el alcance.', 'OK', { duration: 3500 });
      return;
    }
    if (this.roles.find((r) => r.id === rolId)?.codigo === 'ADMIN' && !this.puedeAsignarAdmin()) {
      this.snack.open('Solo un ADMIN puede asignar el rol ADMIN.', 'OK', { duration: 4000 });
      return;
    }
    const body: NuevaAsignacion = { rolId, alcanceTipo: t };
    if (t === 'EQUIPO') body.alcanceEquipoId = objetivoId!;
    if (t === 'CLIENTE') body.alcanceClienteId = objetivoId!;
    if (t === 'REGIONAL') body.alcanceRegionalId = objetivoId!;
    if (vigenteDesde) body.vigenteDesde = vigenteDesde;
    if (!this.editando) {
      body.helpdeskUserId = String(usuarioHid);
      body.usuarioNombre = this.hdUsers().find((u) => String(u.id) === String(usuarioHid))?.name;
    }

    this.guardando.set(true);
    try {
      const res = this.editando
        ? await this.api.actualizarAsignacion(this.data.asignacion!.id, { ...body, vigenteHasta: vigenteHasta || null })
        : await this.api.crearAsignacion(vigenteHasta ? { ...body, vigenteHasta } : body);
      this.ref.close(res);
    } catch (err) {
      const detalle = (err as { error?: { error?: string } })?.error?.error;
      const verbo = this.editando ? 'editar' : 'crear';
      this.snack.open(detalle ? `No se pudo ${verbo} la asignación. ${detalle}` : `No se pudo ${verbo} la asignación.`, 'OK', { duration: 4000 });
    } finally {
      this.guardando.set(false);
    }
  }

  cancelar(): void {
    this.ref.close();
  }
}
