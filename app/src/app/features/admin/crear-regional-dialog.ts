import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminApiService, Regional } from './admin-api.service';

interface DialogData { regional?: Regional; }

/**
 * Modal para crear/editar una Regional (ciudad/región: Cuenca, Quito…). En edición se
 * cambia el nombre y el estado activo (baja lógica); el código es la clave y no se edita.
 */
@Component({
  selector: 'app-crear-regional-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule],
  templateUrl: './crear-regional-dialog.html',
  styleUrl: './administracion.scss',
})
export class CrearRegionalDialog {
  private readonly api = inject(AdminApiService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<CrearRegionalDialog>);
  readonly data = inject<DialogData | null>(MAT_DIALOG_DATA) ?? {};
  readonly editando = !!this.data.regional;

  readonly guardando = signal(false);
  form = { codigo: '', nombre: '', activo: true };

  constructor() {
    const r = this.data.regional;
    if (r) {
      this.form = { codigo: r.codigo, nombre: r.nombre, activo: r.activo };
    }
  }

  async crear(): Promise<void> {
    const codigo = this.form.codigo.trim();
    const nombre = this.form.nombre.trim();
    if (!codigo || !nombre) {
      this.snack.open('Completá código y nombre.', 'OK', { duration: 3500 });
      return;
    }
    this.guardando.set(true);
    try {
      const res = this.editando
        ? await this.api.actualizarRegional(this.data.regional!.id, { codigo: codigo.toUpperCase(), nombre, activo: this.form.activo })
        : await this.api.crearRegional({ codigo: codigo.toUpperCase(), nombre });
      this.ref.close(res);
    } catch (err) {
      const detalle = (err as { error?: { error?: string } })?.error?.error;
      const verbo = this.editando ? 'editar' : 'crear';
      this.snack.open(detalle ? `No se pudo ${verbo} la regional. ${detalle}` : `No se pudo ${verbo} la regional.`, 'OK', { duration: 4000 });
    } finally {
      this.guardando.set(false);
    }
  }

  cancelar(): void {
    this.ref.close();
  }
}
