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

  /** Abre la página interior (drill-down) de Solicitudes de Especialistas. */
  abrirSolicitudes(): void {
    void this.router.navigate(['/bandeja/solicitudes']);
  }

  readonly transferencias = signal<Transferencia[]>([]);
  readonly solicitudes = signal<Solicitud[]>([]);
  /** Trabajo YA aceptado: tareas de otros equipos que ahora lleva mi gente. */
  readonly aceptadas = signal<Transferencia[]>([]);
  readonly loading = signal(true);

  /** Panel "¿Cómo funciona?" desplegado. */
  readonly guiaAbierta = signal(false);

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
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cargar la bandeja.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }
}
