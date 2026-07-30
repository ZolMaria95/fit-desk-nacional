import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferenciasService } from '../../../core/services/transferencias.service';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { errorMsg } from './enviar-equipo-dialog';

export interface MensajeData {
  tareaCodigo: string;
  titulo?: string | null;
}

/**
 * Enviar un MENSAJE al Responsable del equipo que desarrolla la tarea (mensajes entre equipos
 * sobre el ticket). El destinatario lo ve en su Bandeja ("Mensajes del origen").
 */
@Component({
  selector: 'app-mensaje-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Mensaje al equipo</h2>
    <mat-dialog-content>
      <p class="hint">
        Escribe al Responsable del equipo que desarrolla
        <strong>{{ data.tareaCodigo }}</strong>. Lo verá en su Bandeja.
      </p>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Mensaje</mat-label>
        <textarea matInput rows="3" [(ngModel)]="texto" maxlength="500"
                  placeholder="Ej. El cliente pregunta por el avance; sigue pendiente…"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" [disabled]="!texto.trim() || busy()" (click)="enviar()">Enviar mensaje</button>
    </mat-dialog-actions>
  `,
  styles: [`.full{width:100%}.hint{margin:0 0 12px;color:var(--mat-sys-on-surface-variant,#666);font-size:.9rem}`],
})
export class MensajeDialog {
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<MensajeDialog, boolean>);
  readonly data = inject<MensajeData>(MAT_DIALOG_DATA);

  texto = '';
  readonly busy = signal(false);

  constructor() {
    wireDialogEsc(this.ref); // ESC no debe cerrar el modal y perder el mensaje escrito
  }

  async enviar(): Promise<void> {
    if (!this.texto.trim() || this.busy()) return;
    this.busy.set(true);
    try {
      await this.svc.crearMensaje({ tareaCodigo: this.data.tareaCodigo, texto: this.texto.trim() });
      this.snack.open('Mensaje enviado al responsable del equipo.', 'OK', { duration: 4000 });
      this.ref.close(true);
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo enviar el mensaje.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(false);
    }
  }
}
