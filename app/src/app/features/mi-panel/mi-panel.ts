import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { DataService, Story } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { CardDetailDialog } from '../board/card-detail-dialog/card-detail-dialog';
import { Ticket } from '../tickets/ticket-utils';
import { CLIENTES_VALIDOS } from '../tickets/helpdesk.constants';
import { TicketCard } from '../tickets/ticket-card/ticket-card';
import { TicketMessagesDialog } from '../tickets/ticket-messages-dialog/ticket-messages-dialog';
import { AssignTicketDialog } from '../tickets/assign-ticket-dialog/assign-ticket-dialog';
import { PendienteDateDialog, PendienteDateResult } from '../pendientes/pendiente-date-dialog/pendiente-date-dialog';

const STATUS_LABELS: Record<string, string> = {
  todo: 'To Do',
  in_progress: 'En progreso',
  review: 'En certificación',
  done: 'Entregado',
};

function today(): Date { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function diffDays(dueDate: string): number {
  return Math.ceil((new Date(dueDate + 'T00:00:00').getTime() - today().getTime()) / 864e5);
}

/** Mi Panel (Scrum Master): seguimiento diario. Port de js/sol-panel.js. */
@Component({
  selector: 'app-mi-panel',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule, TicketCard],
  templateUrl: './mi-panel.html',
  styleUrl: './mi-panel.scss',
})
export class MiPanel {
  private readonly data = inject(DataService);
  private readonly hd = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);

  readonly STATUS_LABELS = STATUS_LABELS;
  readonly loading = this.hd.loading;

  // Estado local reactivo de los mapas planos del DataService.
  private readonly actions = signal(this.data.getHdActions());
  private readonly notes = signal(this.data.getHdNotes());
  private readonly pendientes = signal(this.data.getHdPendientes());

  // Catálogo de estados para el menú de la card (sin ABIERTO), igual que en Tickets.
  readonly statusNames = this.hd.statusNames;
  readonly statusOptions = computed(() => this.statusNames().filter((s) => s.trim().toUpperCase() !== 'ABIERTO'));
  /** Tickets que ya tienen tarea en el board (ocultan "Crear tarea"). */
  readonly ticketsEnBoard = computed(() => new Set(this.data.stories().map((s) => String(s.ticket)).filter(Boolean)));

  constructor() {
    // El dashboard necesita el panorama completo. Carga amplia siempre: la vista
    // Tickets pudo dejar una página filtrada (server-side) en el servicio compartido.
    this.data.ensureInit();
    this.hd.getTicketStatuses();
    this.hd.loadAll();
  }

  refresh(): void {
    this.hd.loadAll();
  }

  // Solo tickets de los 14 clientes válidos (los que atiende el equipo): Mi Panel
  // no debe mostrar pendientes de clientes ajenos.
  private readonly ticketsValidos = computed<Ticket[]>(() =>
    this.hd.tickets().filter((t) => CLIENTES_VALIDOS.has(t.clienteRaw)),
  );

  // ── Bloque 1: Acciones pendientes (tickets marcados con Acción) ──
  readonly acciones = computed<Ticket[]>(() => {
    const flags = this.actions();
    return this.ticketsValidos().filter((t) => !!flags[String(t.ticket)]);
  });

  // ── Bloque 2: Esperando cliente (CLIENTE PENDIENTE 3+ días) ──
  readonly clientePendiente = computed<Ticket[]>(() =>
    this.ticketsValidos()
      .filter((t) => t.clasificacion === 'CLIENTE PENDIENTE' && t.diasSinMovimiento >= 3)
      .sort((a, b) => b.diasSinMovimiento - a.diasSinMovimiento),
  );

  /** "Esperando cliente" agrupado por cliente, para notificar el conjunto a cada uno. */
  readonly clientePendientePorCliente = computed(() => {
    const grupos = new Map<string, Ticket[]>();
    for (const t of this.clientePendiente()) {
      const key = t.clienteRaw || '—';
      const arr = grupos.get(key);
      if (arr) arr.push(t);
      else grupos.set(key, [t]);
    }
    return [...grupos.entries()]
      .map(([cliente, tickets]) => ({ cliente, tickets }))
      .sort((a, b) => a.cliente.localeCompare(b.cliente));
  });

  /** Cliente cuyo grupo se acaba de copiar (feedback "Copiado ✓"). */
  readonly copiadoGrupo = signal<string | null>(null);

  /** Copia los N° de ticket del grupo separados por coma (para notificar al cliente). */
  copiarTicketsGrupo(cliente: string, tickets: Ticket[]): void {
    const nums = tickets.map((t) => t.ticket).join(', ');
    navigator.clipboard
      ?.writeText(nums)
      .then(() => {
        this.copiadoGrupo.set(cliente);
        setTimeout(() => { if (this.copiadoGrupo() === cliente) this.copiadoGrupo.set(null); }, 2000);
      })
      .catch(() => this.snack.open('No se pudo copiar.', 'OK', { duration: 3000 }));
  }

  // ── Acciones de la card (mismas que la vista Tickets) ──
  isAction(t: Ticket): boolean { return !!this.actions()[t.ticket]; }
  isPending(t: Ticket): boolean { return !!this.pendientes()[t.ticket]; }
  noteOf(t: Ticket): string { return this.notes()[t.ticket] || ''; }

  openConversation(t: Ticket): void {
    this.dialog.open(TicketMessagesDialog, { data: { ticket: t }, width: '720px', maxWidth: '96vw' });
  }
  openTicketTask(t: Ticket): void {
    this.dialog.open(CardDetailDialog, {
      data: {
        story: null,
        prefill: {
          ticket: t.ticket,
          client: t.clientId,
          clientName: t.clienteRaw,
          title: t.asunto,
          assignee: t.usuarioAsignado,
          assigneeName: t.nombreAsignado,
          estatus: t.estatus,
        },
      },
      width: '560px',
      maxWidth: '95vw',
    });
  }
  openAssign(t: Ticket): void {
    this.dialog.open(AssignTicketDialog, { data: { ticket: t }, width: '440px', maxWidth: '95vw' });
  }
  async changeStatus(t: Ticket, estado: string): Promise<void> {
    if (estado === t.estatus) return;
    const ok = await this.hd.setTicketStatus(t.ticket, estado);
    this.snack.open(
      ok ? `Ticket #${t.ticket} → ${estado}` : `No se pudo cambiar el estado del ticket #${t.ticket}.`,
      ok ? '' : 'OK',
      { duration: ok ? 2500 : 4000 },
    );
  }
  toggleAction(t: Ticket): void {
    this.data.setHdAction(t.ticket, !this.isAction(t));
    this.actions.set({ ...this.data.getHdActions() });
  }
  async togglePending(t: Ticket): Promise<void> {
    if (this.isPending(t)) {
      this.data.removeHdPendiente(t.ticket);
      this.pendientes.set({ ...this.data.getHdPendientes() });
      return;
    }
    const res = (await firstValueFrom(
      this.dialog
        .open(PendienteDateDialog, { data: { title: 'Marcar pendiente', ticket: t.ticket }, width: '420px', maxWidth: '95vw' })
        .afterClosed(),
    )) as PendienteDateResult | undefined;
    if (!res) return;
    this.data.setHdPendiente(t.ticket, {
      ticket: t.ticket,
      asunto: t.asunto,
      clienteRaw: t.clienteRaw,
      dueDate: res.dueDate,
      dueTime: res.dueTime,
      nota: res.nota,
    });
    this.pendientes.set({ ...this.data.getHdPendientes() });
  }
  onGuardarNota(t: Ticket, texto: string): void {
    this.data.setHdNote(t.ticket, texto);
    this.notes.set({ ...this.data.getHdNotes() });
  }

  // ── Bloque 3: Próximos a vencer (tareas no Done, vencen en ≤3 días) ──
  readonly soon = computed<Story[]>(() =>
    this.data
      .stories()
      .filter((s) => s.status !== 'done' && !!s.dueDate && diffDays(s.dueDate) <= 3)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
  );

  // ── Bloque 4: Por asignar (tareas en To Do SIN asignado en el board) ──
  readonly porAsignar = computed<Story[]>(() => this.data.stories().filter((s) => s.status === 'todo' && !s.assignee));

  // ── Helpers de stories ──
  memberOf(id: string | null) { return id ? this.data.getMember(id) : undefined; }
  clientOf(id: string | null): { id: string; name: string; color?: string } | undefined {
    if (!id) return undefined;
    const c = this.data.getClient(id) as { id: string; name: string; color?: string } | undefined;
    return c ? { id: c.id, name: c.name, color: c.color } : undefined;
  }

  dueInfo(s: Story): { label: string; critical: boolean } {
    const d = diffDays(s.dueDate);
    if (d < 0) return { label: `${Math.abs(d)}d vencida`, critical: true };
    if (d === 0) return { label: 'Hoy', critical: true };
    if (d === 1) return { label: 'Mañana', critical: false };
    return { label: `${d}d`, critical: false };
  }

  openStory(s: Story): void {
    this.dialog.open(CardDetailDialog, { data: { story: s }, width: '560px', maxWidth: '95vw' });
  }
}
