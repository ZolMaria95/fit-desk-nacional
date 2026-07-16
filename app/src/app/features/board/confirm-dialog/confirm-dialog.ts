import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface ConfirmData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  /** Si se define, exige escribir esta palabra (p. ej. "BORRAR") para confirmar. */
  requireWord?: string;
}

/** Diálogo de confirmación reutilizable. Reemplaza confirm()/prompt() del legacy. */
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p class="msg">{{ data.message }}</p>
      @if (data.requireWord) {
        <mat-form-field appearance="outline" class="full">
          <mat-label>Escribe {{ data.requireWord }} para confirmar</mat-label>
          <input matInput [ngModel]="word()" (ngModelChange)="word.set($event)" autocomplete="off" />
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="ref.close(false)">{{ data.cancelText || 'Cancelar' }}</button>
      <button mat-flat-button [color]="data.danger ? 'warn' : 'primary'" [disabled]="!canConfirm()" (click)="ref.close(true)">
        {{ data.confirmText || 'Confirmar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .msg { white-space: pre-line; margin: 0 0 8px; }
    .full { width: 100%; }
  `,
})
export class ConfirmDialog {
  readonly data = inject<ConfirmData>(MAT_DIALOG_DATA);
  readonly ref = inject(MatDialogRef<ConfirmDialog, boolean>);

  readonly word = signal('');
  readonly canConfirm = computed(() => !this.data.requireWord || this.word().trim() === this.data.requireWord);
}
