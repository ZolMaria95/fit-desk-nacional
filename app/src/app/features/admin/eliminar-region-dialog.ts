import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface EliminarRegionData { codigo: string; nombre: string; }

/**
 * Verificación de seguridad para eliminar una región: exige ESCRIBIR el código de la región
 * para habilitar el botón (evita borrados accidentales de una acción destructiva/irreversible).
 */
@Component({
  selector: 'app-eliminar-region-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title class="warn-title"><mat-icon>warning</mat-icon> Eliminar región</h2>
    <mat-dialog-content>
      <p>Vas a eliminar la región <strong>{{ data.nombre }}</strong> ({{ data.codigo }}).</p>
      <p class="muted">
        Se borrarán también sus <strong>equipos vacíos</strong> con su tablero y sprints. Se bloquea si algún
        equipo tiene tareas o técnicos exclusivos de esta región. <strong>Esta acción no se puede deshacer.</strong>
      </p>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Escribe {{ data.codigo }} para confirmar</mat-label>
        <input matInput [ngModel]="texto()" (ngModelChange)="texto.set($event)" name="verif"
               autocomplete="off" (keydown.enter)="confirmar()" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="ref.close(false)">Cancelar</button>
      <button mat-flat-button color="warn" [disabled]="!coincide()" (click)="confirmar()">
        <mat-icon>delete_outline</mat-icon> Eliminar región
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full { width: 100%; }
    .muted { color: var(--mat-sys-on-surface-variant, #666); font-size: .9rem; }
    .warn-title { display: flex; align-items: center; gap: 8px; }
    .warn-title mat-icon { color: #d32f2f; }
  `],
})
export class EliminarRegionDialog {
  readonly ref = inject(MatDialogRef<EliminarRegionDialog, boolean>);
  readonly data = inject<EliminarRegionData>(MAT_DIALOG_DATA);

  readonly texto = signal('');
  readonly coincide = computed(() => this.texto().trim().toUpperCase() === this.data.codigo.trim().toUpperCase());

  confirmar(): void {
    if (this.coincide()) this.ref.close(true);
  }
}
