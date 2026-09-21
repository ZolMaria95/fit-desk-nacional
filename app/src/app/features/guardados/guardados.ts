import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { Ticket } from '../tickets/ticket-utils';
import { TicketCard } from '../tickets/ticket-card/ticket-card';
import { TicketMessagesDialog } from '../tickets/ticket-messages-dialog/ticket-messages-dialog';

/**
 * Ventana de guardados: tickets que CUALQUIERA guardó para consultar después — 100% personal, sin
 * scoping por equipo/cliente (puede ser de cualquiera). Misma pantalla que Recordatorio (ruta
 * propia bajo Seguimiento), pero con cards de ticket (`app-ticket-card`) en vez de tabla.
 */
@Component({
  selector: 'app-guardados',
  imports: [MatIconModule, TicketCard],
  templateUrl: './guardados.html',
  styleUrl: './guardados.scss',
})
export class Guardados {
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly hd = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);

  readonly loading = signal(true);
  readonly tickets = signal<Ticket[]>([]);
  readonly puedeMarcarAccion = this.auth.esResponsableEquipo;

  // Notas/acciones/pendientes son mapas globales o por-usuario ya compartidos con Tickets/Mi Panel.
  private readonly notes = signal(this.data.getHdNotes());
  private readonly actions = signal(this.data.getHdActions());
  private readonly pendientes = signal(this.data.getHdPendientes());

  constructor() {
    this.data.ensureInit().then(() => this.refresh());
  }

  async refresh(): Promise<void> {
    this.loading.set(true);
    await this.data.loadHdGuardados();
    const ids = Object.keys(this.data.getHdGuardados());
    const tickets = (await Promise.all(ids.map((id) => this.hd.searchTicketRemote(id)))).filter(
      (t): t is Ticket => !!t,
    );
    this.tickets.set(tickets);
    this.notes.set({ ...this.data.getHdNotes() });
    this.actions.set({ ...this.data.getHdActions() });
    this.pendientes.set({ ...this.data.getHdPendientes() });
    this.loading.set(false);
  }

  noteOf(t: Ticket): string { return this.notes()[t.ticket] || ''; }
  isAction(t: Ticket): boolean { return !!this.actions()[t.ticket]; }
  isPending(t: Ticket): boolean { return !!this.pendientes()[t.ticket]; }

  onGuardarNota(t: Ticket, nota: string): void {
    this.data.setHdNote(t.ticket, nota);
    this.notes.set({ ...this.data.getHdNotes() });
  }
  toggleAction(t: Ticket): void {
    this.data.setHdAction(t.ticket, !this.isAction(t));
    this.actions.set({ ...this.data.getHdActions() });
  }
  /** Quitar de guardados: a diferencia de Tickets/Mi Panel, acá también saca la card de la lista. */
  async quitar(t: Ticket): Promise<void> {
    await this.data.toggleGuardado(t.ticket);
    this.tickets.set(this.tickets().filter((x) => x.ticket !== t.ticket));
  }
  openConversation(t: Ticket): void {
    this.dialog.open(TicketMessagesDialog, { data: { ticketId: t.ticket }, width: '920px', maxWidth: '92vw' });
  }
}
