import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { abrirEditarTicket, eliminarTicket } from '../tickets/ticket-acciones';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { AssignTicketDialog } from '../tickets/assign-ticket-dialog/assign-ticket-dialog';
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
  private readonly snack = inject(MatSnackBar);

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
  /** Editar / eliminar: rol HELPDESK en el alcance del cliente, o ADMIN. */
  puedeGestionar(t: Ticket): boolean {
    return this.auth.puedeGestionarTicket(t.clientId);
  }
  /** Asignar/reasignar: HELPDESK/ADMIN a cualquiera; responsable a sí mismo o a su gente; cualquiera se
   *  toma un ticket sin asignado. */
  puedeAsignar(t: Ticket): boolean {
    return this.auth.puedeAsignarTicket(t);
  }
  /** Guardados tiene su propia lista (no el pool de Tickets): tras guardar se recarga ese ticket. */
  async editarTicket(t: Ticket): Promise<void> {
    if (!(await abrirEditarTicket(this.dialog, t))) return;
    const fresco = await this.hd.searchTicketRemote(t.ticket);
    if (fresco) this.tickets.set(this.tickets().map((x) => (x.ticket === t.ticket ? fresco : x)));
  }
  /** Asignar (o tomarlo, si no tiene asignado): Guardados tiene su propia lista → se refresca ese ticket. */
  async openAssign(t: Ticket): Promise<void> {
    const ref = this.dialog.open(AssignTicketDialog, { data: { ticket: t }, width: '440px', maxWidth: '95vw' });
    if (!(await firstValueFrom(ref.afterClosed()))) return;
    const fresco = await this.hd.searchTicketRemote(t.ticket);
    if (fresco) this.tickets.set(this.tickets().map((x) => (x.ticket === t.ticket ? fresco : x)));
  }
  async eliminarTicket(t: Ticket): Promise<void> {
    if (await eliminarTicket(this.dialog, this.hd, this.snack, t)) {
      this.tickets.set(this.tickets().filter((x) => x.ticket !== t.ticket));
    }
  }
}
