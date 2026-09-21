import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../../core/services/data.service';

export interface ReminderItem {
  // default 'ticket' (compat). 'tarea-asignada'/'tarea-sin-finalizar' = tareas SIN ticket (no hay
  // conversación del HelpDesk que abrir: "Ver" lleva al detalle de la propia tarea).
  kind?: 'ticket' | 'reunion' | 'ticket-nuevo' | 'tarea-asignada' | 'tarea-sin-finalizar';
  // ── Ticket ──
  ticket?: string;
  clienteRaw?: string;
  asunto?: string;
  nota?: string;
  /** Para kind 'ticket-nuevo': recién creado ('nuevo') vs con actividad nueva —comentario/cambio— ('actividad'). */
  motivo?: 'nuevo' | 'actividad';
  // ── Reunión ──
  titulo?: string; // tema de la reunión
  hora?: string;   // "HH:mm" del inicio
  link?: string;   // enlace (opcional) para unirse
  // ── Tarea sin ticket (asignada / sin finalizar) ──
  tareaId?: string;    // código TA-NNN
  tareaTitulo?: string;
  tareaCliente?: string;
}
export interface ReminderAlertData {
  items: ReminderItem[];
  /** Checkbox "No avisar hoy" de una tarea sin ticket (asignada/sin finalizar) — se llama
   *  INMEDIATO al marcar (no al cerrar el diálogo), así no depende de por dónde se cierre
   *  (botón, backdrop o ESC). */
  onSilenciarHoy?: (tareaId: string) => void;
}

/**
 * Alerta visual de recordatorios de tickets pendientes cuya fecha/hora ya llegó.
 * Se abre desde el shell (Layout), así aparece sin importar la página activa, y
 * va acompañada de un sonido. Devuelve `'ver'` si el usuario va a Pendientes.
 */
@Component({
  selector: 'app-reminder-alert-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCheckboxModule],
  template: `
    <div class="ra-head" mat-dialog-title>
      <mat-icon class="ra-bell">{{ headIcon }}</mat-icon>
      <span>{{ titulo }}</span>
    </div>
    <mat-dialog-content class="ra-body">
      <p class="ra-sub">{{ subtitulo }}</p>
      <ul class="ra-list">
        @for (it of data.items; track $index) {
          <li [class.ra-reunion]="it.kind === 'reunion'" [class.ra-nuevo]="it.kind === 'ticket-nuevo'"
              [class.ra-tarea]="it.kind === 'tarea-asignada' || it.kind === 'tarea-sin-finalizar'">
            @if (it.kind === 'reunion') {
              <span class="ra-tk"><mat-icon class="ra-ic">groups</mat-icon>{{ it.hora }}</span>
              <span class="ra-cli">{{ it.titulo }}</span>
              @if (it.link) {
                <a class="ra-join" [href]="it.link" target="_blank" rel="noopener"><mat-icon>videocam</mat-icon> Unirse</a>
              }
            } @else if (it.kind === 'tarea-asignada' || it.kind === 'tarea-sin-finalizar') {
              <span class="ra-new ra-tarea-badge">{{ it.kind === 'tarea-asignada' ? 'ASIGNADA' : 'SIN FINALIZAR' }}</span>
              <button type="button" class="ra-tk ra-tk-btn" (click)="abrirTarea(it.tareaId)"
                      [attr.aria-label]="'Abrir tarea ' + it.tareaId">{{ it.tareaId }}</button>
              @if (it.tareaCliente) { <span class="ra-cli">{{ it.tareaCliente }}</span> }
              @if (it.tareaTitulo) { <span class="ra-asunto">{{ it.tareaTitulo }}</span> }
              <mat-checkbox class="ra-silenciar" [checked]="estaSilenciada(it.tareaId)"
                            (change)="toggleSilenciar(it.tareaId)">
                No avisar hoy
              </mat-checkbox>
            } @else {
              @if (it.kind === 'ticket-nuevo') {
                <span class="ra-new" [class.ra-act]="it.motivo === 'actividad'">{{ it.motivo === 'actividad' ? 'ACTUALIZADO' : 'NUEVO' }}</span>
              }
              @if (!esSinTicket(it.ticket)) {
                <button type="button" class="ra-tk ra-tk-btn" (click)="abrirTicket(it.ticket)"
                        [attr.aria-label]="'Abrir ticket ' + it.ticket">#{{ it.ticket }}</button>
              }
              <!-- Recordatorio SIN ticket (clave sintética REC-...): no es un código que el usuario
                   reconozca ni pueda usar para nada (no hay conversación del HelpDesk que abrir), así
                   que ni se muestra — directo al cliente/nota, que es lo que sí le sirve. -->
              @if (it.clienteRaw) { <span class="ra-cli">{{ it.clienteRaw }}</span> }
              @if (it.asunto) { <span class="ra-asunto">{{ it.asunto }}</span> }
              @if (it.nota) { <span class="ra-nota"><mat-icon>sticky_note_2</mat-icon>{{ it.nota }}</span> }
            }
          </li>
        }
      </ul>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
      @if (hasTickets && !esNovedades) {
        <button mat-flat-button color="primary" (click)="ref.close('ver')">
          <mat-icon>list</mat-icon> {{ verLabel }}
        </button>
      }
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
    /* El N° abre la conversación del ticket: se ve y se comporta como enlace, pero es un
       <button> (acción, no navegación). Va SIEMPRE azul y subrayado —no solo al pasar el mouse—
       porque si no, nada delata que se puede pulsar (y en táctil no hay hover que lo revele).
       El azul va EXPLÍCITO, no heredado de .ra-tk: misma especificidad (una clase) y esta regla va
       después, así que un color:inherit aquí le ganaba y el N° salía del gris del texto. Con
       --mat-sys-primary se adapta solo al tema oscuro (#048abf claro / #4fb8e0 oscuro). */
    .ra-tk-btn {
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: var(--mat-sys-primary, #048abf);
      cursor: pointer;
      border-radius: 4px;
      text-decoration: underline;
      text-underline-offset: 2px;
      &:hover { text-decoration-thickness: 2px; }
      &:focus-visible { outline: 2px solid var(--brand, #048abf); outline-offset: 2px; }
    }
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
    .ra-silenciar {
      font-size: 12px;
      width: 100%;
      margin-top: -2px;
      --mdc-checkbox-state-layer-size: 30px;
      ::ng-deep label { font-size: 12px; color: var(--mat-sys-on-surface-variant); }
    }
    .ra-list li.ra-reunion { border-left-color: #048abf; }
    .ra-list li.ra-nuevo { border-left-color: #2e9e5b; }
    .ra-list li.ra-tarea { border-left-color: #8e44ad; }
    .ra-new { font-size: 10px; font-weight: 800; letter-spacing: 0.04em; color: #fff; background: #2e9e5b; border-radius: 5px; padding: 1px 6px; }
    .ra-new.ra-act { background: var(--brand, #048abf); }
    .ra-tarea-badge { background: #8e44ad; }
    .ra-tk .ra-ic { font-size: 16px; width: 16px; height: 16px; vertical-align: -3px; margin-right: 3px; color: #048abf; }
    .ra-join {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 12px; font-weight: 700; text-decoration: none;
      color: #fff; background: var(--brand, #048abf); border-radius: 6px; padding: 3px 10px;
      mat-icon { font-size: 15px; width: 15px; height: 15px; }
      &:hover { background: var(--brand-dark, #0390bc); }
    }
  `,
})
export class ReminderAlertDialog {
  readonly data = inject<ReminderAlertData>(MAT_DIALOG_DATA);
  readonly ref = inject(MatDialogRef<ReminderAlertDialog, 'ver' | undefined>);
  private readonly dialog = inject(MatDialog);
  private readonly dataSvc = inject(DataService);
  private get items() { return this.data.items; }

  /**
   * Abre la conversación del ticket ENCIMA de la alerta (esta NO se cierra): si llegaron
   * varias novedades, se atiende una y las demás siguen a la vista al cerrar el ticket.
   * El ESC funciona solo: el CDK entrega el keydown al overlay superior, así que cierra
   * primero el ticket (que usa `wireDialogEsc`) y deja la alerta abierta.
   *
   * ⚠️ El import es DINÁMICO a propósito: este diálogo lo importa `layout.ts` (el shell),
   * o sea que vive en el bundle principal; un import estático arrastraría el modal de
   * conversación entero a la carga inicial de la app.
   */
  /** Recordatorio SIN ticket real (clave sintética `REC-<timestamp>`, creado a mano desde
   *  Recordatorio): no hay conversación del HelpDesk que abrir. Mismo prefijo que `pendientes.ts`. */
  esSinTicket(numero: string | undefined): boolean {
    return !!numero && numero.startsWith('REC-');
  }

  async abrirTicket(numero: string | undefined): Promise<void> {
    if (!numero || this.esSinTicket(numero)) return;
    const { TicketMessagesDialog } = await import('../../tickets/ticket-messages-dialog/ticket-messages-dialog');
    this.dialog.open(TicketMessagesDialog, {
      data: { ticketId: numero },
      width: '920px',
      maxWidth: '92vw',
    });
  }

  /**
   * Abre el detalle de una tarea SIN ticket (asignada / sin finalizar) ENCIMA de la alerta, con el
   * mismo criterio que `abrirTicket`: import DINÁMICO (este diálogo vive en el bundle principal, vía
   * `layout.ts`, y `CardDetailDialog` es pesado) y no cierra la alerta. Busca la `Story` en la caché ya
   * cargada (`DataService.stories()`): no hace falta ninguna consulta nueva.
   */
  async abrirTarea(tareaId: string | undefined): Promise<void> {
    if (!tareaId) return;
    const story = this.dataSvc.stories().find((s) => s.id === tareaId);
    if (!story) return;
    const { CardDetailDialog } = await import('../../board/card-detail-dialog/card-detail-dialog');
    this.dialog.open(CardDetailDialog, { data: { story }, width: '560px', maxWidth: '95vw' });
  }

  /** Tareas marcadas "No avisar hoy" EN ESTE diálogo (solo para pintar el checkbox — el silencio
   *  real ya quedó guardado por `onSilenciarHoy` al tildarlo, no depende de cómo se cierre esto). */
  private readonly silenciadas = signal<Set<string>>(new Set());
  estaSilenciada(tareaId: string | undefined): boolean {
    return !!tareaId && this.silenciadas().has(tareaId);
  }
  /** "No avisar hoy": aplica DE INMEDIATO (no al cerrar el diálogo), así funciona sin importar si
   *  el usuario cierra con el botón, el backdrop o ESC. Es SOLO por hoy — mañana, si la tarea sigue
   *  vigente, vuelve a alertar normalmente (ver `Layout.silenciarTareaHoy`). */
  toggleSilenciar(tareaId: string | undefined): void {
    if (!tareaId) return;
    this.silenciadas.update((s) => new Set(s).add(tareaId));
    this.data.onSilenciarHoy?.(tareaId);
  }

  /** Todos los ítems son novedades de tickets del equipo (nuevo/actividad) → icono, título y "Ver Tickets". */
  get esNovedades(): boolean {
    return this.items.length > 0 && this.items.every((i) => i.kind === 'ticket-nuevo');
  }
  /** ¿Hay algún ítem accionable con el "Ver" GENERAL del pie (ticket pendiente o novedad del
   *  equipo → lleva a Pendientes/Tickets)? Las tareas sin ticket NO cuentan: cada una ya tiene su
   *  propio botón inline (`abrirTarea`) que abre justo esa tarea; no hay una pantalla "todas mis
   *  tareas sin ticket" a la que llevar en bloque. */
  get hasTickets(): boolean {
    return this.items.some((i) => i.kind !== 'reunion' && i.kind !== 'tarea-asignada' && i.kind !== 'tarea-sin-finalizar');
  }
  get headIcon(): string {
    return this.esNovedades ? 'confirmation_number' : 'notifications_active';
  }
  get titulo(): string {
    if (this.esNovedades) {
      if (this.items.every((i) => i.motivo !== 'actividad')) {
        return this.items.length === 1 ? 'Nuevo ticket del equipo' : 'Nuevos tickets del equipo';
      }
      return 'Novedades en tickets del equipo';
    }
    return this.items.every((i) => i.kind === 'reunion') ? 'Recordatorio de reuniones' : 'Recordatorio';
  }
  get subtitulo(): string {
    if (this.esNovedades) return this.items.length === 1 ? 'Hay una novedad:' : 'Hay novedades en tus tickets:';
    return this.items.length === 1 ? 'Tienes un recordatorio:' : 'Tienes estos recordatorios:';
  }
  /** Solo se muestra para recordatorios (no novedades: ver el botón en el template). */
  get verLabel(): string {
    return 'Ver pendientes';
  }
}
