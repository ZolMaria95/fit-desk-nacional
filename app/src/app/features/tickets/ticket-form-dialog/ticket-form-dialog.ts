import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { CatalogoItem, HelpdeskService } from '../../../core/services/helpdesk.service';
import { Ticket } from '../ticket-utils';

export interface TicketFormData {
  /** Por ahora solo 'editar'. 'crear' queda para después (la estructura ya lo contempla). */
  modo: 'editar';
  ticket: Ticket;
}

/** Nombre legible de cada campo del API (para avisar qué no se guardó). */
const NOMBRE_CAMPO: Record<string, string> = {
  subsystem_id: 'el módulo',
  ticket_type_id: 'el tipo',
  priority: 'el orden',
  incidence: 'el N° de incidencia',
  subject: 'el asunto',
};

/** Tope de tamaño por archivo: lo impone el API del HelpDesk (mismo que la conversación). */
const MAX_ADJUNTO = 5 * 1024 * 1024;

/**
 * Editar un ticket del HelpDesk desde FitDesk (rol HELPDESK en su alcance, o ADMIN — el backend lo
 * exige; aquí solo se abre para quien puede). Guarda de forma SÍNCRONA: cada escritura se confirma
 * antes de seguir, y si algo falla el modal queda abierto con el motivo y lo ya escrito.
 *  - Módulo, tipo, orden, N° de incidencia y asunto → un solo PUT (`updateTicketFields`).
 *  - Estado → `setTicketStatus` (sigue abierto a todos, igual que en la tarjeta).
 *  - Asignado → `assignTicket` (reasignar: solo HELPDESK/ADMIN).
 *  - Adjunto → se envía como mensaje del ticket con el archivo (el HelpDesk no expone un adjunto
 *    "del ticket" por separado; queda visible en la conversación).
 */
@Component({
  selector: 'app-ticket-form-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './ticket-form-dialog.html',
  styleUrl: './ticket-form-dialog.scss',
})
export class TicketFormDialog {
  private readonly hd = inject(HelpdeskService);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<TicketFormDialog, boolean>);
  private readonly data = inject<TicketFormData>(MAT_DIALOG_DATA);

  readonly ticket = this.data.ticket;

  // Catálogos
  readonly modulos = signal<CatalogoItem[]>([]);
  readonly tipos = signal<CatalogoItem[]>([]);
  readonly estados = computed(() => this.hd.statusNames().filter((s) => s !== 'ABIERTO'));
  readonly usuarios = this.hd.hdUsers;

  // Valores del formulario (se comparan contra `original` al guardar).
  private original = this.valoresDe(this.ticket);
  readonly moduloId = signal(this.original.moduloId);
  readonly tipoId = signal(this.original.tipoId);
  readonly estado = signal(this.original.estado);
  readonly orden = signal<number | null>(this.original.orden);
  readonly incidencia = signal(this.original.incidencia);
  readonly asunto = signal(this.original.asunto);
  readonly asignado = signal(this.original.asignado);
  readonly archivo = signal<File | null>(null);

  // Buscadores de los menús
  readonly buscarModulo = signal('');
  readonly buscarUsuario = signal('');
  readonly modulosF = computed(() => filtrar(this.modulos(), this.buscarModulo(), (m) => m.nombre));
  readonly usuariosF = computed(() => filtrar(this.usuarios(), this.buscarUsuario(), (u) => u.name));

  readonly guardando = signal(false);

  readonly moduloLabel = computed(
    () => this.modulos().find((m) => m.id === this.moduloId())?.nombre || this.ticket.modulo || '',
  );
  readonly tipoLabel = computed(
    () => this.tipos().find((t) => t.id === this.tipoId())?.nombre || this.ticket.tipo || '',
  );
  /** Nunca el código de empleado en la UI (regla del proyecto): nombre resuelto o "Sin asignar". */
  readonly asignadoLabel = computed(() => {
    const id = this.asignado();
    if (!id) return '';
    return this.usuarios().find((u) => u.id === id)?.name
      || (id === this.original.asignado ? this.ticket.nombreAsignado : '')
      || 'Usuario sin nombre';
  });

  constructor() {
    wireDialogEsc(this.ref);
    this.hd.getModulos().then((m) => this.modulos.set(m));
    this.hd.getTiposTicket().then((t) => this.tipos.set(t));
    void this.hd.getTicketStatuses();
    void this.hd.getHdUsers();
  }

  onArchivo(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0] ?? null;
    input.value = '';
    if (!f) return;
    if (f.size > MAX_ADJUNTO) {
      const mb = (f.size / (1024 * 1024)).toFixed(1);
      this.snack.open(`"${f.name}" pesa ${mb} MB. El máximo es 5 MB.`, 'OK', { duration: 4000 });
      return;
    }
    this.archivo.set(f);
  }

  async guardar(): Promise<void> {
    if (this.guardando()) return;
    const asunto = this.asunto().trim();
    if (!asunto) {
      this.snack.open('El asunto no puede quedar vacío.', 'OK', { duration: 3000 });
      return;
    }
    const orden = this.orden();
    if (orden == null || !Number.isInteger(orden) || orden < 1) {
      this.snack.open('El orden debe ser un número entero mayor a 0.', 'OK', { duration: 3000 });
      return;
    }

    const id = this.ticket.ticket;
    const o = this.original;
    const campos: Record<string, string> = {};
    const patch: Partial<Ticket> = {};
    if (this.moduloId() !== o.moduloId) {
      campos['subsystem_id'] = this.moduloId();
      patch.moduloId = this.moduloId();
      patch.modulo = this.moduloLabel();
    }
    if (this.tipoId() !== o.tipoId) {
      campos['ticket_type_id'] = this.tipoId();
      patch.tipoId = this.tipoId();
      patch.tipo = this.tipoLabel();
    }
    if (orden !== o.orden) {
      campos['priority'] = String(orden);
      patch.orden = orden;
    }
    if (this.incidencia().trim() !== o.incidencia) {
      campos['incidence'] = this.incidencia().trim();
      patch.incidencia = this.incidencia().trim();
    }
    if (asunto !== o.asunto) {
      campos['subject'] = asunto;
      patch.asunto = asunto;
    }
    const cambiaEstado = this.estado() !== o.estado && !!this.estado();
    const cambiaAsignado = this.asignado() !== o.asignado && !!this.asignado();
    const archivo = this.archivo();

    if (!Object.keys(campos).length && !cambiaEstado && !cambiaAsignado && !archivo) {
      this.ref.close(false);
      return;
    }

    this.guardando.set(true);
    const fallas: string[] = [];
    let sinPermisoHd = false;
    try {
      // 1) Campos del ticket (un PUT). Si falla, no se sigue: el motivo suele aplicar a todo (p. ej. permiso).
      if (Object.keys(campos).length) {
        const r = await this.hd.updateTicketFields(id, campos, patch);
        if (!r.ok) {
          this.snack.open(r.error || 'No se pudieron guardar los cambios.', 'OK', { duration: 6000 });
          return;
        }
        // Lo que el HelpDesk SÍ aplicó pasa a ser la nueva base; lo ignorado se informa abajo.
        const ign = new Set(r.ignorados ?? []);
        if (!ign.has('subsystem_id')) o.moduloId = this.moduloId();
        if (!ign.has('ticket_type_id')) o.tipoId = this.tipoId();
        if (!ign.has('priority')) o.orden = orden;
        if (!ign.has('incidence')) o.incidencia = this.incidencia().trim();
        if (!ign.has('subject')) o.asunto = asunto;
        for (const k of ign) fallas.push(NOMBRE_CAMPO[k] ?? k);
        if (ign.size) sinPermisoHd = true;
      }
      // 2) Estado.
      if (cambiaEstado) {
        if (await this.hd.setTicketStatus(id, this.estado())) o.estado = this.estado();
        else fallas.push('el estado');
      }
      // 3) Reasignación.
      if (cambiaAsignado) {
        if (await this.hd.assignTicket(id, this.asignado(), this.ticket)) o.asignado = this.asignado();
        else fallas.push('la asignación (reasignar requiere el rol Helpdesk en este cliente)');
      }
      // 4) Adjunto → mensaje del ticket con el archivo.
      if (archivo) {
        const ok = await this.hd.sendMessage(id, 'Adjunto agregado al ticket desde FitDesk.', [archivo]);
        if (ok) this.archivo.set(null);
        else fallas.push('el adjunto');
      }
    } finally {
      this.guardando.set(false);
    }

    if (fallas.length) {
      const motivo = sinPermisoHd ? ' El HelpDesk no aceptó el cambio con tu cuenta (puede requerir un usuario administrador del HelpDesk).' : '';
      this.snack.open(`No se guardó: ${fallas.join(', ')}.${motivo}`, 'OK', { duration: 9000 });
      return;
    }
    this.snack.open(`Ticket #${id} actualizado.`, 'OK', { duration: 3000 });
    this.ref.close(true);
  }

  cerrar(): void {
    this.ref.close(false);
  }

  private valoresDe(t: Ticket) {
    return {
      moduloId: t.moduloId || '',
      tipoId: t.tipoId || '',
      estado: (t.estatus || '').trim().toUpperCase(),
      orden: Number.isFinite(t.orden) && t.orden !== 999 ? t.orden : (null as number | null),
      incidencia: t.incidencia || '',
      asunto: t.asunto || '',
      asignado: (t.usuarioAsignado || '').trim().toUpperCase(),
    };
  }
}

function filtrar<T>(lista: T[], q: string, texto: (x: T) => string): T[] {
  const f = q.trim().toLowerCase();
  return f ? lista.filter((x) => texto(x).toLowerCase().includes(f)) : lista;
}
