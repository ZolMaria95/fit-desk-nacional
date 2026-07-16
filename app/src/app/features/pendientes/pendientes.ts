import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { TicketMessagesDialog } from '../tickets/ticket-messages-dialog/ticket-messages-dialog';
import { PendienteDateDialog, PendienteDateResult } from './pendiente-date-dialog/pendiente-date-dialog';

interface PendItem {
  ticket: string;
  clienteRaw?: string;
  asunto?: string;
  nota?: string; // motivo del pendiente (opcional)
  addedAt?: string;
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  paused?: boolean;
  lastAlerted?: string | null;
  // Anotaciones de visibilidad (de /hdPendientes-visibles):
  owner?: string;      // helpdesk_user_id del dueño
  ownerName?: string;  // nombre del dueño
  equipo?: string;     // equipo del dueño (para clasificar)
  mine?: boolean;      // ¿es mío? (solo los míos son editables)
  miEquipo?: boolean;  // ¿es de mi equipo? (alarma)
}

/** Convierte fecha+hora del recordatorio a Date (o null si no hay fecha). */
export function pendienteDueAt(p: { dueDate?: string; dueTime?: string }): Date | null {
  return p.dueDate ? new Date(`${p.dueDate}T${(p.dueTime || '09:00')}:00`) : null;
}

/** Tickets marcados como pendientes (⏸) con recordatorio fecha/hora. Port de js/pendientes.js. */
@Component({
  selector: 'app-pendientes',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './pendientes.html',
  styleUrl: './pendientes.scss',
})
export class Pendientes {
  private readonly data = inject(DataService);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  /** Pendientes VISIBLES según rol (admin=todos, RE=su equipo, resto=los suyos). */
  private readonly pend = signal<PendItem[]>([]);
  /** Tickets a resaltar al llegar desde la alerta (`?resaltar=#,#`). */
  readonly resaltados = signal<Set<string>>(new Set());

  constructor() {
    this.data.ensureInit().then(() => this.refresh());
    // Resalta (y baja a la vista) los tickets que acaban de sonar en la alerta.
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((q) => {
      const raw = q.get('resaltar');
      if (!raw) { this.resaltados.set(new Set()); return; }
      this.resaltados.set(new Set(raw.split(',').filter(Boolean)));
      setTimeout(() => document.querySelector('tr.resaltado')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
      setTimeout(() => this.resaltados.set(new Set()), 12000); // se desvanece solo
    });
  }

  esResaltado(ticket: string): boolean { return this.resaltados().has(ticket); }

  readonly items = computed<PendItem[]>(() =>
    this.pend().slice().sort((a, b) => {
      const da = pendienteDueAt(a)?.getTime() ?? Infinity;
      const db = pendienteDueAt(b)?.getTime() ?? Infinity;
      if (da !== db) return da - db; // recordatorio más próximo primero
      return (b.addedAt || '').localeCompare(a.addedAt || '');
    }),
  );

  /** Pendientes CLASIFICADOS por equipo (grupos alfabéticos; dentro, orden por recordatorio). */
  readonly itemsPorEquipo = computed(() => {
    const grupos = new Map<string, PendItem[]>();
    for (const it of this.items()) {
      const key = it.equipo || 'Sin equipo';
      const arr = grupos.get(key);
      if (arr) arr.push(it);
      else grupos.set(key, [it]);
    }
    return [...grupos.entries()]
      .map(([equipo, items]) => ({ equipo, items }))
      .sort((a, b) => a.equipo.localeCompare(b.equipo));
  });

  private refresh(): void {
    this.data.loadPendientesVisibles().then((l) => this.pend.set(l as PendItem[]));
  }

  // ── Estado del recordatorio ──
  isDue(it: PendItem): boolean {
    if (it.paused) return false;
    const at = pendienteDueAt(it);
    return !!at && at.getTime() <= Date.now();
  }
  estado(it: PendItem): 'pausado' | 'vencido' | 'programado' | 'sin-fecha' {
    if (!it.dueDate) return 'sin-fecha';
    if (it.paused) return 'pausado';
    return this.isDue(it) ? 'vencido' : 'programado';
  }

  // ── Formato ──
  fmtDateTime(it: PendItem): string {
    if (!it.dueDate) return '—';
    const at = pendienteDueAt(it)!;
    return at.toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  fmtAdded(iso?: string): string { return iso ? iso.split('T')[0] : ''; }
  trunc(s: string | undefined, n: number): string { return s && s.length > n ? s.slice(0, n) + '…' : s || '—'; }

  // ── Acciones ──
  openConversation(ticket: string): void {
    this.dialog.open(TicketMessagesDialog, { data: { ticketId: ticket }, width: '720px', maxWidth: '96vw' });
  }
  pausar(it: PendItem): void {
    this.data.updateHdPendiente(it.ticket, { paused: true });
    this.refresh();
  }
  reanudar(it: PendItem): void {
    // Reanudar limpia el "alertado hoy" para que pueda volver a saltar.
    this.data.updateHdPendiente(it.ticket, { paused: false, lastAlerted: null });
    this.refresh();
  }
  async postergar(it: PendItem): Promise<void> {
    const res = (await firstValueFrom(
      this.dialog
        .open(PendienteDateDialog, {
          data: { title: 'Postergar recordatorio', ticket: it.ticket, dueDate: it.dueDate, dueTime: it.dueTime, nota: it.nota },
          width: '420px',
          maxWidth: '95vw',
        })
        .afterClosed(),
    )) as PendienteDateResult | undefined;
    if (!res) return;
    this.data.updateHdPendiente(it.ticket, { dueDate: res.dueDate, dueTime: res.dueTime, nota: res.nota, paused: false, lastAlerted: null });
    this.refresh();
  }
  remove(ticket: string): void {
    this.data.removeHdPendiente(ticket);
    this.refresh();
  }
}
