import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMsg } from '../board/transferir/enviar-equipo-dialog';
import {
  MiembroEquipo,
  Solicitud,
  Transferencia,
  TransferenciasService,
} from '../../core/services/transferencias.service';

/**
 * Bandeja del Responsable de Equipo / ADMIN: transferencias entrantes (aceptar asignando a un
 * miembro, o rechazar) y solicitudes entrantes de los Especialistas (aprobar → ejecuta, o rechazar).
 * Solo en modo Quarkus.
 */
@Component({
  selector: 'app-bandeja',
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.scss',
})
export class Bandeja {
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);

  readonly transferencias = signal<Transferencia[]>([]);
  readonly solicitudes = signal<Solicitud[]>([]);
  /** Trabajo YA aceptado: tareas de otros equipos que ahora lleva mi gente. */
  readonly aceptadas = signal<Transferencia[]>([]);
  private readonly miembros = signal<Record<number, MiembroEquipo[]>>({});
  /** transferencia.id → helpdesk_user_id elegido para asignar al aceptar. */
  readonly asignadoSel: Record<number, string> = {};
  readonly loading = signal(true);
  readonly busy = signal<string | null>(null); // "t-<id>" | "s-<id>"

  constructor() {
    void this.cargar();
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    try {
      const [ts, ss, ac] = await Promise.all([
        this.svc.transferenciasEntrantes(),
        this.svc.solicitudesEntrantes(),
        this.svc.trabajoAceptado(),
      ]);
      this.transferencias.set(ts);
      this.solicitudes.set(ss);
      this.aceptadas.set(ac);
      // Miembros de cada equipo destino distinto (para el picker "asignar a").
      const ids = [...new Set(ts.map((t) => t.equipoDestinoId).filter((x): x is number => x != null))];
      const map: Record<number, MiembroEquipo[]> = {};
      await Promise.all(ids.map(async (id) => { map[id] = await this.svc.miembrosEquipo(id); }));
      this.miembros.set(map);
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cargar la bandeja.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  miembrosDe(equipoDestinoId: number | null): MiembroEquipo[] {
    return equipoDestinoId != null ? (this.miembros()[equipoDestinoId] ?? []) : [];
  }

  async aceptar(t: Transferencia): Promise<void> {
    const hid = this.asignadoSel[t.id];
    if (!hid) {
      this.snack.open('Elige a quién asignar la tarea.', 'OK', { duration: 3000 });
      return;
    }
    this.busy.set('t-' + t.id);
    try {
      await this.svc.aceptarTransferencia(t.id, hid);
      this.snack.open('Transferencia aceptada; la tarea quedó asignada.', 'OK', { duration: 4000 });
      await this.cargar();
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo aceptar.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(null);
    }
  }

  async rechazarTransferencia(t: Transferencia): Promise<void> {
    this.busy.set('t-' + t.id);
    try {
      await this.svc.rechazarTransferencia(t.id);
      this.snack.open('Transferencia rechazada.', 'OK', { duration: 3000 });
      await this.cargar();
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo rechazar.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(null);
    }
  }

  async aprobar(s: Solicitud): Promise<void> {
    this.busy.set('s-' + s.id);
    try {
      await this.svc.aprobarSolicitud(s.id);
      const msg = s.tipo === 'TRANSFERENCIA'
        ? 'Solicitud aprobada; se creó la transferencia al equipo destino.'
        : 'Solicitud aprobada; la tarea fue reasignada.';
      this.snack.open(msg, 'OK', { duration: 4000 });
      await this.cargar();
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo aprobar (¿falta destino o asignado sugerido?).'), 'OK', { duration: 6000 });
    } finally {
      this.busy.set(null);
    }
  }

  async rechazarSolicitud(s: Solicitud): Promise<void> {
    this.busy.set('s-' + s.id);
    try {
      await this.svc.rechazarSolicitud(s.id);
      this.snack.open('Solicitud rechazada.', 'OK', { duration: 3000 });
      await this.cargar();
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo rechazar.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(null);
    }
  }
}
