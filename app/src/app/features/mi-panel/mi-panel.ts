import { ColoresService } from '../../core/services/colores.service';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { DataService, Story } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { PerfilService } from '../../core/services/perfil.service';
import { CardDetailDialog } from '../board/card-detail-dialog/card-detail-dialog';
import { Ticket, equipoClientIdsDe } from '../tickets/ticket-utils';
import { TicketCard } from '../tickets/ticket-card/ticket-card';
import { TicketMessagesDialog } from '../tickets/ticket-messages-dialog/ticket-messages-dialog';
import { AssignTicketDialog } from '../tickets/assign-ticket-dialog/assign-ticket-dialog';
import { abrirEditarTicket, eliminarTicket } from '../tickets/ticket-acciones';
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
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, TicketCard],
  templateUrl: './mi-panel.html',
  styleUrl: './mi-panel.scss',
})
export class MiPanel {
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly colores = inject(ColoresService);
  private readonly hd = inject(HelpdeskService);
  private readonly perfil = inject(PerfilService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);

  readonly STATUS_LABELS = STATUS_LABELS;
  readonly loading = this.hd.loading;

  // Estado local reactivo de los mapas planos del DataService.
  private readonly actions = signal(this.data.getHdActions());
  private readonly notes = signal(this.data.getHdNotes());
  private readonly pendientes = signal(this.data.getHdPendientes());
  private readonly guardados = signal(this.data.getHdGuardados());
  /** Bandera de acción: SOLO para RE (Responsable de Equipo) — "Guardar" lo ve cualquiera. */
  readonly puedeMarcarAccion = this.auth.esResponsableEquipo;

  // Catálogo de estados para el menú de la card (sin ABIERTO), igual que en Tickets.
  readonly statusNames = this.hd.statusNames;
  readonly statusOptions = computed(() => this.statusNames().filter((s) => s.trim().toUpperCase() !== 'ABIERTO'));
  /** Tickets que ya tienen tarea en el board (ocultan "Crear tarea"). */
  readonly ticketsEnBoard = computed(() => new Set(this.data.stories().map((s) => String(s.ticket)).filter(Boolean)));

  constructor() {
    // El dashboard necesita el panorama completo. Carga amplia siempre: la vista
    // Tickets pudo dejar una página filtrada (server-side) en el servicio compartido.
    // Los overlays (notas/acciones/pendientes) se cargan en `data.ensureInit()`; la señal local
    // se inicializó vacía/vieja en el campo de arriba — hay que RE-leerla al resolver, si no un
    // flag marcado en Tickets nunca aparece aquí (mismo criterio que `tickets.ts`).
    Promise.all([this.data.ensureInit(), this.data.loadHdGuardados()]).then(() => this.syncOverlays());
    this.hd.getTicketStatuses();
    this.hd.loadAll();
  }

  async refresh(): Promise<void> {
    await this.hd.loadAll();
    this.syncOverlays(); // re-lee notas/acciones/pendientes/guardados ya cargados (puede haber cambiado en Tickets)
  }

  /** Re-sincroniza las señales de overlays con el estado ya cargado del DataService. */
  private syncOverlays(): void {
    this.notes.set({ ...this.data.getHdNotes() });
    this.actions.set({ ...this.data.getHdActions() });
    this.pendientes.set({ ...this.data.getHdPendientes() });
    this.guardados.set({ ...this.data.getHdGuardados() });
  }

  // ── Alcance: los clientes del EQUIPO del usuario ──
  /** Equipos que el usuario puede revisar (miembro ∪ responsable). El responsable REGIONAL trae
   *  todos los de su región → por eso hay selector. */
  readonly equiposRevisar = this.perfil.equiposRevisar;
  /** ¿Puede revisar más de un equipo? → se muestra el selector. */
  readonly multiEquipo = this.perfil.multiEquipo;
  /** Equipo elegido en el selector; '' = todos los que puede revisar. */
  readonly equipoSel = signal('');
  onEquipoChange(codigo: string): void { this.equipoSel.set(codigo); }

  /** client_id de los clientes del equipo (cruce por NOMBRE con el catálogo del HelpDesk).
   *  Mismo helper que usan la pestaña Equipo de Tickets y el poller de novedades del shell. */
  private readonly equipoClientIds = computed(
    () => new Set(equipoClientIdsDe(this.perfil.equiposRevisar(), this.hd.clients(), this.equipoSel())),
  );

  /**
   * Tickets del alcance del usuario. Antes se filtraba por `CLIENTES_VALIDOS`, una lista de
   * clientes **escrita a mano** (los de Cuenca): un responsable de otra regional habría visto
   * los pendientes de Cuenca en vez de los suyos. Ahora sale de sus equipos.
   * Si no hay ids (p. ej. un ADMIN sin equipo asignado, o el catálogo aún cargando) no se filtra:
   * mejor el panorama completo que una pantalla vacía.
   */
  private readonly ticketsValidos = computed<Ticket[]>(() => {
    const ids = this.equipoClientIds();
    const tickets = this.hd.tickets();
    return ids.size ? tickets.filter((t) => ids.has(t.clientId)) : tickets;
  });

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
    this.dialog.open(TicketMessagesDialog, { data: { ticket: t }, width: '920px', maxWidth: '92vw' });
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
  /** Editar / eliminar / reasignar: rol HELPDESK en el alcance del cliente, o ADMIN. */
  puedeGestionar(t: Ticket): boolean {
    return this.auth.puedeGestionarTicket(t.clientId);
  }
  /** Asignar/reasignar: HELPDESK/ADMIN a cualquiera; responsable a sí mismo o a su gente; cualquiera se
   *  toma un ticket sin asignado. */
  puedeAsignar(t: Ticket): boolean {
    return this.auth.puedeAsignarTicket(t);
  }
  editarTicket(t: Ticket): void {
    void abrirEditarTicket(this.dialog, t);
  }
  eliminarTicket(t: Ticket): void {
    void eliminarTicket(this.dialog, this.hd, this.snack, t);
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
  isGuardado(t: Ticket): boolean { return !!this.guardados()[t.ticket]; }
  async toggleGuardado(t: Ticket): Promise<void> {
    await this.data.toggleGuardado(t.ticket);
    this.guardados.set({ ...this.data.getHdGuardados() });
  }
  async togglePending(t: Ticket): Promise<void> {
    if (this.isPending(t)) {
      this.data.removeHdPendiente(t.ticket);
      this.pendientes.set({ ...this.data.getHdPendientes() });
      return;
    }
    const res = (await firstValueFrom(
      this.dialog
        .open(PendienteDateDialog, { data: { title: 'Crear recordatorio', ticket: t.ticket }, width: '420px', maxWidth: '95vw' })
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

  /** Avatar de una persona: fondo con SU color y tinta calculada. El .scss fijaba `color:#fff`
   *  sobre el color crudo, así que con un color claro las iniciales desaparecían. */
  avatarDe(id: string | null | undefined) { return this.colores.avatar(String(id || '')); }

  /** Iniciales del nombre (avatar sin foto). El código del API ya no se muestra. */
  iniciales(nombre: string | null | undefined): string {
    const n = (nombre || '').trim();
    if (!n) return '?';
    return n.split(/\s+/).slice(0, 2).map((p) => p[0] || '').join('').toUpperCase() || '?';
  }
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
