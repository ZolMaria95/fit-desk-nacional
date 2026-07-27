import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMsg } from '../board/transferir/enviar-equipo-dialog';
import {
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
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.scss',
})
export class Bandeja {
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);
  private readonly router = inject(Router);

  /** Abre la página interior (drill-down) de Transferencias entrantes. */
  abrirTransferencias(): void {
    void this.router.navigate(['/bandeja/transferencias']);
  }

  /** Abre la página interior (drill-down) de Trabajo de mi equipo (de otros tableros). */
  abrirTrabajoEquipo(): void {
    void this.router.navigate(['/bandeja/trabajo-equipo']);
  }

  readonly transferencias = signal<Transferencia[]>([]);
  readonly solicitudes = signal<Solicitud[]>([]);
  /** Trabajo YA aceptado: tareas de otros equipos que ahora lleva mi gente. */
  readonly aceptadas = signal<Transferencia[]>([]);
  readonly loading = signal(true);
  readonly busy = signal<string | null>(null); // "t-<id>" | "s-<id>"

  /** Categorías expandidas (para ver las tarjetas de acción). Sin entrada = por defecto
   *  abierta si tiene ítems. La clave del usuario siempre gana al default. */
  readonly expandidas = signal<Record<string, boolean>>({});
  /** Panel "¿Cómo funciona?" desplegado. */
  readonly guiaAbierta = signal(false);

  constructor() {
    void this.cargar();
  }

  /** ¿La categoría está expandida? Default: abierta si tiene ítems. */
  estaExpandida(key: string, count: number): boolean {
    const e = this.expandidas();
    return key in e ? e[key] : count > 0;
  }

  /** Alterna una categoría (solo si tiene ítems que mostrar). */
  toggleCat(key: string, count: number): void {
    if (!count) return;
    const abierta = this.estaExpandida(key, count);
    this.expandidas.update((e) => ({ ...e, [key]: !abierta }));
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
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cargar la bandeja.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
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
