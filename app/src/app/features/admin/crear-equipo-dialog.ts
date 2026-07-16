import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { AdminApiService, Equipo, Regional } from './admin-api.service';

interface DialogData { regionales: Regional[]; equipo?: Equipo; }

/**
 * Modal para crear/editar un Equipo. En alta se puede elegir un responsable (del
 * HelpDesk) que genera su Asignacion RESPONSABLE_EQUIPO. En edición se cambian
 * regional/nombre (el código es la clave, no se edita; el responsable se gestiona
 * desde Asignaciones).
 */
@Component({
  selector: 'app-crear-equipo-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule],
  templateUrl: './crear-equipo-dialog.html',
  styleUrl: './administracion.scss',
})
export class CrearEquipoDialog {
  private readonly api = inject(AdminApiService);
  private readonly hd = inject(HelpdeskService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<CrearEquipoDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly regionales = this.data.regionales;
  readonly guardando = signal(false);
  readonly editando = !!this.data.equipo;

  // Catálogo de empleados del HelpDesk para elegir el responsable (solo en alta).
  readonly hdUsers = this.hd.hdUsers;
  readonly hdBuscar = signal('');
  readonly hdFiltrados = computed(() => {
    const t = this.hdBuscar().trim().toLowerCase();
    const list = this.hdUsers();
    return t ? list.filter((u) => u.name.toLowerCase().includes(t) || String(u.id).toLowerCase().includes(t)) : list;
  });

  form = { regionalId: null as number | null, codigo: '', nombre: '', responsableHid: null as string | null, activo: true };

  constructor() {
    this.hd.getHdUsers();
    const e = this.data.equipo;
    if (e) {
      this.form = { regionalId: e.regionalId, codigo: e.codigo, nombre: e.nombre, responsableHid: e.responsableHelpdeskUserId ?? null, activo: e.activo };
    }
  }

  async crear(): Promise<void> {
    const { regionalId, codigo, nombre, responsableHid, activo } = this.form;
    if (!regionalId || !codigo.trim() || !nombre.trim()) {
      this.snack.open('Completá regional, código y nombre.', 'OK', { duration: 3500 });
      return;
    }
    this.guardando.set(true);
    try {
      const resp: { responsableHelpdeskUserId?: string; responsableNombre?: string } = {};
      if (responsableHid) {
        resp.responsableHelpdeskUserId = String(responsableHid);
        resp.responsableNombre = this.hdUsers().find((u) => String(u.id) === String(responsableHid))?.name;
      }
      let res: Equipo;
      if (this.editando) {
        res = await this.api.actualizarEquipo(this.data.equipo!.id, { regionalId, nombre: nombre.trim(), activo, ...resp });
      } else {
        res = await this.api.crearEquipo({ regionalId, codigo: codigo.trim().toUpperCase(), nombre: nombre.trim(), ...resp });
      }
      this.ref.close(res);
    } catch (err) {
      const detalle = (err as { error?: { error?: string } })?.error?.error;
      const verbo = this.editando ? 'editar' : 'crear';
      this.snack.open(detalle ? `No se pudo ${verbo} el equipo. ${detalle}` : `No se pudo ${verbo} el equipo.`, 'OK', { duration: 4000 });
    } finally {
      this.guardando.set(false);
    }
  }

  cancelar(): void {
    this.ref.close();
  }
}
