import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface TicketTitleData {
  asunto: string;
}

/** Popup de solo lectura: asunto completo del ticket, para cuando el título del modal de
 *  conversación queda truncado (el `matTooltip` no sirve en celular, sin hover). */
@Component({
  selector: 'app-ticket-title-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Asunto del ticket</h2>
    <mat-dialog-content>
      <p class="asunto">{{ data.asunto }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .asunto { white-space: pre-line; margin: 0; font-size: 15px; line-height: 1.5; }
  `,
})
export class TicketTitleDialog {
  readonly data = inject<TicketTitleData>(MAT_DIALOG_DATA);
}
