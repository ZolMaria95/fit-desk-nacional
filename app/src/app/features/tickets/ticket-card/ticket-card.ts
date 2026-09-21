import { Component, computed, inject, input, output, signal } from '@angular/core';
import { SIN_ASIGNAR } from '../../../core/colores';
import { ColoresService } from '../../../core/services/colores.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { clientStyle, colorFor, prioBadgeClase, shortName } from '../../board/board-utils';
import { Ticket } from '../ticket-utils';
import { estadoStyle, fmtIngreso, fmtMod, tipoStyle } from '../tickets-card-utils';
import { esEstadoCerrado, esSoloLectura } from '../../../core/helpdesk-estados';
import { ThemeService } from '../../../core/services/theme.service';

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
  /** Bandera de acción: solo la ve/usa un RE (Responsable de Equipo) — lo decide el contenedor. */
  readonly puedeMarcarAccion = input(false);
  readonly esPendiente = input(false);
  /** Guardado personal (ventana de Guardados): lo ve cualquiera, incluido el RE. */
  readonly esGuardado = input(false);
  /** El ticket ya tiene tarea en el board → se oculta "Crear tarea". */
  readonly yaEnBoard = input(false);
  /** Muestra el badge de "días sin movimiento" (lo usa Mi Panel). */
  readonly mostrarDias = input(false);
  /** ¿El usuario puede cambiar el estado de un ticket cerrado? (Responsable/Admin).
   *  El card es presentacional: el contenedor pasa el permiso (auth.puedeTransferir). */
  readonly puedeCambiarEstadoCerrado = input(false);
  /** ¿El usuario puede enviar el ticket a otro equipo? (Responsable/Admin, modo Quarkus).
   *  Funciona esté o no en el board: si no tiene tarea, se crea al aceptar la transferencia. */
  readonly puedeTransferirTicket = input(false);
  /** ¿El usuario puede ESCALAR el ticket al Responsable? (Especialista, modo Quarkus). */
  readonly puedeEscalarTicket = input(false);

  readonly verConversacion = output<void>();
  readonly crearTarea = output<void>();
  readonly asignar = output<void>();
  readonly cambiarEstado = output<string>();
  readonly guardarNota = output<string>();
  readonly toggleAccion = output<void>();
  readonly togglePendiente = output<void>();
  readonly toggleGuardado = output<void>();
  /** "en board" → ir a la tarea del board (lo resuelve el contenedor). */
  readonly irAlBoard = output<void>();
  /** Enviar el ticket a otro equipo (transferencia); lo resuelve el contenedor. */
  readonly transferir = output<void>();
  /** Escalar el ticket al Responsable de Equipo (solicitud); lo resuelve el contenedor. */
  readonly escalar = output<void>();

  /** Ticket en estado terminal (cerrado/aprobado/cotización rechazada) → solo lectura. */
  readonly soloLectura = computed(() => esSoloLectura(this.ticket().estatus));
  /** Grupo CERRADO (cerrado / NO APLICA) → la card se sombrea en gris (apagada). */
  readonly esCerrado = computed(() => esEstadoCerrado(this.ticket().estatus));

  private readonly theme = inject(ThemeService);
  private readonly colores = inject(ColoresService);
  /** Estos 3 estilos viajan como estilo INLINE, que ninguna hoja de estilos puede pisar →
   *  el tema se resuelve aquí. Al ser `computed` sobre la señal del tema, la tarjeta se
   *  repinta sola al conmutar claro/oscuro, sin recargar. */
  readonly estado = computed(() => estadoStyle(this.ticket().estatus, this.theme.esOscuro()));
  readonly tipo = computed(() => tipoStyle(this.ticket().tipo, this.theme.esOscuro()));
  // Prioridad del ticket: orden del HelpDesk (1=urgente…). 999 = sin prioridad → no se muestra.
  readonly tienePrioridad = computed(() => { const o = this.ticket().orden; return !!o && o !== 999; });
  readonly prioClase = computed(() => prioBadgeClase(this.ticket().orden));
  // Color por cliente (mismo criterio que el board: tinte claro + acento).
  readonly cliente = computed(() => clientStyle({ id: this.ticket().clientId || this.ticket().clienteRaw }, this.theme.esOscuro()));
  readonly fIngreso = computed(() => fmtIngreso(this.ticket().fechaIngreso));
  readonly fMod = computed(() => fmtMod(this.ticket().fechaMod));
  readonly avatar = computed(() => {
    const t = this.ticket();
    const asignado = !!(t.usuarioAsignado || t.nombreAsignado);
    // Regla #8: solo el NOMBRE, nunca el código. Si está asignado pero no hay nombre → '—'.
    const nombre = t.nombreAsignado ? shortName(t.nombreAsignado) : asignado ? '—' : 'Sin asignar';
    // El color sale de ColoresService: la MISMA persona tiene que verse igual aquí que en el
    // board, en vacaciones y en el semanal. Antes se derivaba de un hash local y no coincidía.
    const ref = t.usuarioAsignado || t.nombreAsignado || '';
    return { nombre, color: asignado ? this.colores.color(ref) : SIN_ASIGNAR, asignado };
  });
  readonly asignadoLabel = computed(() => {
    const t = this.ticket();
    return t.nombreAsignado || (t.usuarioAsignado ? '—' : 'Sin asignar');
  });

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
