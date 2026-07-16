import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface SemAssignData {
  range: string;
  team: { id: string; name?: string }[];
  assignee: string;
  notes: string;
  hasExisting: boolean;
}
export type SemAssignResult = { assignee: string; notes: string } | { clear: true };

/** Modal para asignar/editar el consultor de soporte de una semana. */
@Component({
  selector: 'app-semanal-assign-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>Asignar semana</h2>
    <mat-dialog-content class="sem-dlg">
      <div class="range-pill">{{ data.range }}</div>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Consultor</mat-label>
        <mat-select [(ngModel)]="assignee">
          <mat-option value="">Seleccionar…</mat-option>
          @for (m of data.team; track m.id) {
            <mat-option [value]="m.id">{{ m.name || m.id }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Notas</mat-label>
        <textarea matInput rows="3" [(ngModel)]="notes" placeholder="Observaciones, intercambios, etc."></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      @if (data.hasExisting) {
        <button mat-button class="danger" (click)="clear()">Quitar asignación</button>
        <span class="spacer"></span>
      }
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="!assignee">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .sem-dlg { min-width: 300px; }
    .full { width: 100%; }
    .range-pill {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      color: var(--brand, #048abf);
      background: #eaf4fb;
      border-radius: 16px;
      padding: 4px 12px;
      margin-bottom: 12px;
    }
    .spacer { flex: 1 1 auto; }
    .danger { color: var(--mat-sys-error); }
  `,
})
export class SemanalAssignDialog {
  private readonly ref = inject(MatDialogRef<SemanalAssignDialog>);
  readonly data = inject<SemAssignData>(MAT_DIALOG_DATA);

  assignee = this.data.assignee;
  notes = this.data.notes;

  save(): void {
    if (!this.assignee) return;
    this.ref.close({ assignee: this.assignee, notes: (this.notes || '').trim() });
  }
  clear(): void {
    this.ref.close({ clear: true });
  }
}
