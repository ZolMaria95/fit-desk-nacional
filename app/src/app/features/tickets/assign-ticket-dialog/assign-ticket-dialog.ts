import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HdUser, HelpdeskService } from '../../../core/services/helpdesk.service';
import { Ticket } from '../ticket-utils';
import { estadoStyle } from '../tickets-card-utils';

export interface AssignTicketData {
  ticket: Ticket;
}

/** Modal para asignar un ticket a un empleado (lista del API + asignación en el API). */
@Component({
  selector: 'app-assign-ticket-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './assign-ticket-dialog.html',
  styleUrl: './assign-ticket-dialog.scss',
})
export class AssignTicketDialog {
  private readonly hd = inject(HelpdeskService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<AssignTicketDialog, boolean>);
  private readonly data = inject<AssignTicketData>(MAT_DIALOG_DATA);

  readonly ticket = this.data.ticket;
  readonly estadoStyle = estadoStyle;
  readonly empleados = signal<HdUser[]>(this.hd.hdUsers());
  readonly filtro = signal('');
  readonly busy = signal<string | null>(null);

  readonly filtrados = computed<HdUser[]>(() => {
    const f = this.filtro().toLowerCase().trim();
    const list = this.empleados();
    if (!f) return list;
    return list.filter((e) => e.name.toLowerCase().includes(f) || e.id.toLowerCase().includes(f));
  });

  constructor() {
    this.hd.getHdUsers().then((users) => this.empleados.set(users));
  }

  async asignar(emp: HdUser): Promise<void> {
    if (this.busy()) return;
    this.busy.set(emp.id);
    const ok = await this.hd.assignTicket(this.ticket.ticket, emp.id);
    this.busy.set(null);
    if (ok) {
      this.snack.open(`Ticket #${this.ticket.ticket} asignado a ${emp.name}`, 'OK', { duration: 3000 });
      this.ref.close(true);
    } else {
      this.snack.open('No se pudo asignar el ticket en el Helpdesk.', 'OK', { duration: 4000 });
    }
  }
}
