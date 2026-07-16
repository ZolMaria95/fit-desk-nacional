import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ReminderItem {
  ticket: string;
  clienteRaw?: string;
  asunto?: string;
  nota?: string;
}
export interface ReminderAlertData {
  items: ReminderItem[];
}

/**
 * Alerta visual de recordatorios de tickets pendientes cuya fecha/hora ya llegó.
 * Se abre desde el shell (Layout), así aparece sin importar la página activa, y
 * va acompañada de un sonido. Devuelve `'ver'` si el usuario va a Pendientes.
 */
@Component({
  selector: 'app-reminder-alert-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="ra-head" mat-dialog-title>
      <mat-icon class="ra-bell">notifications_active</mat-icon>
      <span>Recordatorio de tickets</span>
    </div>
    <mat-dialog-content class="ra-body">
      <p class="ra-sub">
        {{ data.items.length === 1 ? 'Llegó la hora de revisar este ticket:' : 'Llegó la hora de revisar estos tickets:' }}
      </p>
      <ul class="ra-list">
        @for (it of data.items; track it.ticket) {
          <li>
            <span class="ra-tk">#{{ it.ticket }}</span>
            @if (it.clienteRaw) { <span class="ra-cli">{{ it.clienteRaw }}</span> }
            @if (it.asunto) { <span class="ra-asunto">{{ it.asunto }}</span> }
            @if (it.nota) { <span class="ra-nota"><mat-icon>sticky_note_2</mat-icon>{{ it.nota }}</span> }
          </li>
        }
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
      <button mat-flat-button color="primary" (click)="ref.close('ver')">
        <mat-icon>list</mat-icon> Ver pendientes
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .ra-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
    }
    .ra-bell {
      color: #f29e3b;
      animation: ra-ring 1s ease-in-out infinite;
    }
    @keyframes ra-ring {
      0%, 100% { transform: rotate(0); }
      20% { transform: rotate(14deg); }
      40% { transform: rotate(-12deg); }
      60% { transform: rotate(8deg); }
      80% { transform: rotate(-4deg); }
    }
    .ra-sub { margin: 0 0 8px; font-size: 13px; color: var(--mat-sys-on-surface-variant); }
    .ra-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    .ra-list li {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6px 10px;
      padding: 8px 10px;
      border: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
      border-left: 3px solid #f29e3b;
      border-radius: 8px;
      background: var(--mat-sys-surface-container-low, #f7f9fc);
    }
    .ra-tk { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--mat-sys-primary, #048abf); }
    .ra-cli { font-size: 12px; font-weight: 600; }
    .ra-asunto { font-size: 12px; color: var(--mat-sys-on-surface-variant); width: 100%; }
    .ra-nota {
      display: flex;
      align-items: center;
      gap: 4px;
      width: 100%;
      font-size: 12px;
      color: var(--mat-sys-on-surface);
      mat-icon { font-size: 15px; width: 15px; height: 15px; color: #f29e3b; }
    }
  `,
})
export class ReminderAlertDialog {
  readonly data = inject<ReminderAlertData>(MAT_DIALOG_DATA);
  readonly ref = inject(MatDialogRef<ReminderAlertDialog, 'ver' | undefined>);
}
