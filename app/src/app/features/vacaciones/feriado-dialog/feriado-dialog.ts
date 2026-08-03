import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { wireDialogEsc } from '../../../core/dialog-esc';

export interface FeriadoDialogData {
  /** Fecha prefijada (día seleccionado en el calendario). */
  fecha: string;
}
export interface FeriadoDialogResult {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

/** Registrar un feriado de la empresa (un día o un rango). Solo lo abre un ADMIN. */
@Component({
  selector: 'app-feriado-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Registrar feriado</h2>
    <mat-dialog-content class="fd">
      <mat-form-field appearance="outline" class="full">
        <mat-label>Nombre del feriado</mat-label>
        <input matInput [ngModel]="nombre()" (ngModelChange)="nombre.set($event)" placeholder="Ej. Día del Trabajo" maxlength="80" />
      </mat-form-field>

      <div class="fd-grid">
        <label class="fd-field">
          <span class="fd-lbl">Desde</span>
          <input type="date" [ngModel]="fechaInicio()" (ngModelChange)="fechaInicio.set($event)" />
        </label>
        <label class="fd-field">
          <span class="fd-lbl">Hasta</span>
          <input type="date" [ngModel]="fechaFin()" (ngModelChange)="fechaFin.set($event)" [min]="fechaInicio()" />
        </label>
      </div>
      <p class="fd-note">Para un solo día, deja "Hasta" igual a "Desde". Para un puente, elige el rango.</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="guardar()" [disabled]="!valido()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .fd { min-width: 300px; display: flex; flex-direction: column; gap: 8px; }
    .full { width: 100%; }
    .fd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .fd-field { display: flex; flex-direction: column; gap: 4px; }
    .fd-lbl { font-size: 12px; color: var(--mat-sys-on-surface-variant); }
    .fd-field input { font: inherit; padding: 8px; border: 1px solid var(--mat-sys-outline, #bdbdbd); border-radius: 8px; outline: none; }
    .fd-field input:focus { border-color: var(--brand, #048abf); }
    .fd-note { margin: 4px 0 0; font-size: 11px; color: var(--mat-sys-on-surface-variant); }
  `,
})
export class FeriadoDialog {
  readonly ref = inject(MatDialogRef<FeriadoDialog>);
  private readonly data = inject<FeriadoDialogData>(MAT_DIALOG_DATA);

  readonly nombre = signal('');
  readonly fechaInicio = signal(this.data.fecha);
  readonly fechaFin = signal(this.data.fecha);

  readonly valido = computed(() =>
    !!this.nombre().trim() && !!this.fechaInicio() && !!this.fechaFin() && this.fechaFin() >= this.fechaInicio(),
  );

  constructor() {
    wireDialogEsc(this.ref);
  }

  guardar(): void {
    if (!this.valido()) return;
    const res: FeriadoDialogResult = {
      nombre: this.nombre().trim(),
      fechaInicio: this.fechaInicio(),
      fechaFin: this.fechaFin(),
    };
    this.ref.close(res);
  }
}
