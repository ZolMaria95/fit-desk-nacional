import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HdUser, HelpdeskService } from '../../../core/services/helpdesk.service';
import { AdminApiService, Equipo } from '../../admin/admin-api.service';
import { TransferenciasService } from '../../../core/services/transferencias.service';
import { errorMsg } from './enviar-equipo-dialog';

export interface EscalarData {
  tareaCodigo: string;
  boardCodigo: string | null;
  titulo?: string | null;
}

/**
 * Escalar por SOLICITUD (Especialista → Responsable de Equipo). El Especialista no
 * reasigna/transfiere directo: pide, con un motivo, y el RE aprueba (ejecuta) o rechaza.
 */
@Component({
  selector: 'app-escalar-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>Escalar solicitud</h2>
    <mat-dialog-content>
      <p class="hint">
        Pides al Responsable de Equipo que actúe sobre <strong>{{ data.tareaCodigo }}</strong>. Él decide y ejecuta.
      </p>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Tipo de solicitud</mat-label>
        <mat-select [(ngModel)]="tipo">
          <mat-option value="REASIGNACION">Reasignar a otra persona</mat-option>
          <mat-option value="TRANSFERENCIA">Transferir a otro equipo</mat-option>
        </mat-select>
      </mat-form-field>

      @if (tipo === 'TRANSFERENCIA') {
        <mat-form-field appearance="outline" class="full">
          <mat-label>Equipo destino sugerido (opcional)</mat-label>
          <mat-select [(ngModel)]="equipoDestinoId">
            <mat-option [value]="null">— Que decida el responsable —</mat-option>
            @for (e of destinos(); track e.id) {
              <mat-option [value]="e.id">{{ e.nombre }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      } @else {
        <mat-form-field appearance="outline" class="full">
          <mat-label>Persona sugerida (opcional)</mat-label>
          <mat-select [(ngModel)]="asignadoHid">
            <mat-option [value]="null">— Que decida el responsable —</mat-option>
            @for (u of usuarios(); track u.id) {
              <mat-option [value]="u.id">{{ u.name }} · {{ u.id }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      }

      <mat-form-field appearance="outline" class="full">
        <mat-label>Motivo</mat-label>
        <textarea matInput rows="3" [(ngModel)]="motivo" placeholder="Explica por qué…"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" [disabled]="!motivo.trim() || busy()" (click)="enviar()">Enviar solicitud</button>
    </mat-dialog-actions>
  `,
  styles: [`.full{width:100%}.hint{margin:0 0 12px;color:var(--mat-sys-on-surface-variant,#666);font-size:.9rem}`],
})
export class EscalarDialog {
  private readonly svc = inject(TransferenciasService);
  private readonly adminApi = inject(AdminApiService);
  private readonly helpdesk = inject(HelpdeskService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<EscalarDialog, boolean>);
  readonly data = inject<EscalarData>(MAT_DIALOG_DATA);

  tipo: 'REASIGNACION' | 'TRANSFERENCIA' = 'REASIGNACION';
  equipoDestinoId: number | null = null;
  asignadoHid: string | null = null;
  motivo = '';
  readonly busy = signal(false);

  private readonly equipos = signal<Equipo[]>([]);
  readonly destinos = computed(() => this.equipos().filter((e) => e.activo && e.codigo !== this.data.boardCodigo));
  readonly usuarios = signal<HdUser[]>(this.helpdesk.hdUsers());

  constructor() {
    this.adminApi.equipos().then((es) => this.equipos.set(es)).catch(() => {});
    this.helpdesk.getHdUsers().then((us) => this.usuarios.set(us)).catch(() => {});
  }

  async enviar(): Promise<void> {
    if (!this.motivo.trim() || this.busy()) return;
    this.busy.set(true);
    try {
      await this.svc.crearSolicitud({
        tareaCodigo: this.data.tareaCodigo,
        tipo: this.tipo,
        motivo: this.motivo.trim(),
        equipoDestinoId: this.tipo === 'TRANSFERENCIA' ? this.equipoDestinoId ?? undefined : undefined,
        asignadoSugeridoHid: this.tipo === 'REASIGNACION' ? this.asignadoHid ?? undefined : undefined,
      });
      this.snack.open('Solicitud enviada al Responsable de Equipo.', 'OK', { duration: 4000 });
      this.ref.close(true);
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo enviar la solicitud.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(false);
    }
  }
}
