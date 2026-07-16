import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminApiService, Equipo } from '../../admin/admin-api.service';
import { TransferenciasService } from '../../../core/services/transferencias.service';

export interface EnviarEquipoData {
  tareaCodigo: string;
  /** Codigo del board de la tarea (= codigo del equipo origen) para excluirlo del destino. */
  boardCodigo: string | null;
  titulo?: string | null;
}

/**
 * Enviar (transferir) una Tarea a otro equipo. La Tarea NO cambia de board: crea una
 * transferencia PENDIENTE que el equipo destino acepta (asignando a un miembro) o rechaza.
 */
@Component({
  selector: 'app-enviar-equipo-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>Enviar a otro equipo</h2>
    <mat-dialog-content>
      <p class="hint">
        La tarea <strong>{{ data.tareaCodigo }}</strong> sigue en su tablero; el equipo destino la
        recibe en su bandeja y decide a quién asignarla.
      </p>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Equipo destino</mat-label>
        <mat-select [(ngModel)]="destinoId">
          @for (e of destinos(); track e.id) {
            <mat-option [value]="e.id">{{ e.nombre }}</mat-option>
          } @empty {
            <mat-option [value]="null" disabled>No hay otros equipos</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Motivo (opcional)</mat-label>
        <textarea matInput rows="3" [(ngModel)]="motivo" placeholder="Por qué se transfiere…"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" [disabled]="!destinoId || busy()" (click)="enviar()">Enviar</button>
    </mat-dialog-actions>
  `,
  styles: [`.full{width:100%}.hint{margin:0 0 12px;color:var(--mat-sys-on-surface-variant,#666);font-size:.9rem}`],
})
export class EnviarEquipoDialog {
  private readonly adminApi = inject(AdminApiService);
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<EnviarEquipoDialog, boolean>);
  readonly data = inject<EnviarEquipoData>(MAT_DIALOG_DATA);

  private readonly equipos = signal<Equipo[]>([]);
  /** Todos los equipos activos EXCEPTO el de origen (board codigo = equipo codigo). */
  readonly destinos = computed(() => this.equipos().filter((e) => e.activo && e.codigo !== this.data.boardCodigo));
  destinoId: number | null = null;
  motivo = '';
  readonly busy = signal(false);

  constructor() {
    this.adminApi.equipos().then((es) => this.equipos.set(es)).catch(() => {});
  }

  async enviar(): Promise<void> {
    if (!this.destinoId || this.busy()) return;
    this.busy.set(true);
    try {
      await this.svc.crearTransferencia({
        tareaCodigo: this.data.tareaCodigo,
        equipoDestinoId: this.destinoId,
        motivo: this.motivo.trim() || undefined,
      });
      this.snack.open('Transferencia enviada. El equipo destino la verá en su bandeja.', 'OK', { duration: 4000 });
      this.ref.close(true);
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo enviar la transferencia.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(false);
    }
  }
}

/** Mensaje de error del backend ({error} en el cuerpo) o un fallback. */
export function errorMsg(e: unknown, fallback: string): string {
  const err = e as { error?: { error?: string } };
  return err?.error?.error || fallback;
}
