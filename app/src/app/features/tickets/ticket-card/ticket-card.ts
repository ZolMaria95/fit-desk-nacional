import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { clientStyle, colorFor, shortName } from '../../board/board-utils';
import { Ticket } from '../ticket-utils';
import { estadoStyle, fmtIngreso, fmtMod, tipoStyle } from '../tickets-card-utils';

/**
 * Card presentacional de un ticket (grid responsive). No inyecta servicios:
 * recibe el ticket por input y emite eventos que resuelve el contenedor (Tickets).
 */
@Component({
  selector: 'app-ticket-card',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {
  readonly ticket = input.required<Ticket>();
  readonly statusOptions = input<string[]>([]);
  readonly nota = input('');
  readonly esAccion = input(false);
  readonly esPendiente = input(false);
  /** El ticket ya tiene tarea en el board → se oculta "Crear tarea". */
  readonly yaEnBoard = input(false);
  /** Muestra el badge de "días sin movimiento" (lo usa Mi Panel). */
  readonly mostrarDias = input(false);

  readonly verConversacion = output<void>();
  readonly crearTarea = output<void>();
  readonly asignar = output<void>();
  readonly cambiarEstado = output<string>();
  readonly guardarNota = output<string>();
  readonly toggleAccion = output<void>();
  readonly togglePendiente = output<void>();

  readonly estado = computed(() => estadoStyle(this.ticket().estatus));
  readonly tipo = computed(() => tipoStyle(this.ticket().tipo));
  // Color por cliente (mismo criterio que el board: tinte claro + acento).
  readonly cliente = computed(() => clientStyle({ id: this.ticket().clientId || this.ticket().clienteRaw }));
  readonly fIngreso = computed(() => fmtIngreso(this.ticket().fechaIngreso));
  readonly fMod = computed(() => fmtMod(this.ticket().fechaMod));
  readonly avatar = computed(() => {
    const t = this.ticket();
    const ref = t.usuarioAsignado || t.nombreAsignado || '';
    // Nombre + apellido (criterio compartido con el board); sin asignar → guion.
    const nombre = shortName(t.nombreAsignado || t.usuarioAsignado);
    return { nombre: ref ? nombre : 'Sin asignar', color: ref ? colorFor(ref) : '#9aa0a6', asignado: !!ref };
  });
  readonly asignadoLabel = computed(() => this.ticket().nombreAsignado || this.ticket().usuarioAsignado || 'Sin asignar');

  // Edición de nota inline (estado de UI local).
  readonly editingNota = signal(false);
  draft = '';

  startNota(): void {
    this.draft = this.nota();
    this.editingNota.set(true);
  }
  saveNota(): void {
    this.guardarNota.emit(this.draft);
    this.editingNota.set(false);
  }
  cancelNota(): void {
    this.editingNota.set(false);
  }

  // Copiar el número de ticket al portapapeles (feedback breve con ✓).
  readonly copiado = signal(false);
  copiarTicket(): void {
    navigator.clipboard
      ?.writeText(this.ticket().ticket)
      .then(() => {
        this.copiado.set(true);
        setTimeout(() => this.copiado.set(false), 1500);
      })
      .catch(() => {});
  }
}
