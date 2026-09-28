// Acciones de gestión de un ticket (rol HELPDESK o ADMIN) compartidas por las vistas que muestran
// `<app-ticket-card>` (Tickets, Mi Panel, Guardados). El backend re-exige el permiso: esto solo
// abre los diálogos y muestra el resultado.
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { ConfirmDialog, ConfirmData } from '../board/confirm-dialog/confirm-dialog';
import { TicketFormDialog, TicketFormData } from './ticket-form-dialog/ticket-form-dialog';
import { Ticket } from './ticket-utils';

/** Abre "Editar ticket". Devuelve true si se guardó algo. */
export async function abrirEditarTicket(dialog: MatDialog, t: Ticket): Promise<boolean> {
  const ref = dialog.open<TicketFormDialog, TicketFormData, boolean>(TicketFormDialog, {
    data: { modo: 'editar', ticket: t },
    width: '600px',
    maxWidth: '95vw',
    autoFocus: false,
  });
  return !!(await firstValueFrom(ref.afterClosed()));
}

/**
 * Elimina el ticket del HelpDesk tras una confirmación DOBLE: hay que escribir el N° del ticket.
 * Si el HelpDesk confirma, también se borra su tarea del board (lo hace el backend).
 */
export async function eliminarTicket(
  dialog: MatDialog,
  hd: HelpdeskService,
  snack: MatSnackBar,
  t: Ticket,
): Promise<boolean> {
  const ok = await firstValueFrom(
    dialog
      .open<ConfirmDialog, ConfirmData, boolean>(ConfirmDialog, {
        data: {
          title: `Eliminar ticket #${t.ticket}`,
          message:
            `Se eliminará el ticket del HelpDesk y, si tiene tarea en un tablero, también esa tarea.\n` +
            `Esta acción no se puede deshacer.\n\n${t.asunto || ''}`,
          confirmText: 'Eliminar',
          danger: true,
          requireWord: t.ticket,
        },
        width: '460px',
        maxWidth: '95vw',
      })
      .afterClosed(),
  );
  if (!ok) return false;
  const r = await hd.deleteTicket(t.ticket);
  if (r.ok) {
    snack.open(r.message || `Ticket #${t.ticket} eliminado.`, 'OK', { duration: 3500 });
    return true;
  }
  snack.open(r.error || 'No se pudo eliminar el ticket.', 'OK', { duration: 6000 });
  return false;
}
