import type { MatDialog } from '@angular/material/dialog';
import type { TicketMessagesData } from '../features/tickets/ticket-messages-dialog/ticket-messages-dialog';

/**
 * Abre la conversación de un ticket (el modal ÚNICO de la app para esto).
 *
 * Basta con `{ ticketId }`: el modal se autoabastece del encabezado y los mensajes. Si el llamador ya
 * tiene el `Ticket` completo, pasarlo evita una consulta.
 *
 * El import es DINÁMICO a propósito: así este helper también se puede usar desde código del bundle
 * principal (p. ej. la alerta de novedades) sin arrastrar el modal entero a la carga inicial.
 */
export async function abrirTicketDialog(dialog: MatDialog, data: TicketMessagesData): Promise<void> {
  const { TicketMessagesDialog } = await import(
    '../features/tickets/ticket-messages-dialog/ticket-messages-dialog'
  );
  dialog.open(TicketMessagesDialog, { data, width: '920px', maxWidth: '92vw' });
}
