import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMsg } from '../../board/transferir/enviar-equipo-dialog';
import { SearchService } from '../../../core/services/search.service';
import { Transferencia, TransferenciasService } from '../../../core/services/transferencias.service';

/**
 * Página interior de "Trabajo de mi equipo (de otros tableros)" (drill-down desde la Bandeja).
 * SOLO LECTURA: transferencias COMPLETADAS dirigidas a mis equipos, es decir tareas que
 * VINIERON de otros tableros y ahora lleva alguien de mi equipo. Su acción principal es
 * **abrir el ticket** de la tarea en la vista Tickets (para dar seguimiento).
 */
@Component({
  selector: 'app-trabajo-equipo',
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './trabajo-equipo.html',
  styleUrl: './trabajo-equipo.scss',
})
export class TrabajoEquipo {
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);
  private readonly search = inject(SearchService);
  private readonly router = inject(Router);

  readonly items = signal<Transferencia[]>([]);
  readonly loading = signal(true);

  readonly busqueda = signal('');
  readonly equipoFiltro = signal(''); // equipoOrigen (tablero de origen), o '' = todos
  readonly orden = signal<'reciente' | 'antiguo'>('reciente');
  readonly seleccionadaId = signal<number | null>(null);

  readonly ordenLabel = computed(() => (this.orden() === 'reciente' ? 'Reciente' : 'Más antiguo'));

  /** Tableros/equipos de origen distintos (para el filtro). */
  readonly equiposOrigen = computed(() => {
    const set = new Set<string>();
    for (const t of this.items()) if (t.equipoOrigen) set.add(t.equipoOrigen);
    return [...set].sort();
  });

  readonly total = computed(() => this.items().length);

  /** Filas visibles = filtradas por búsqueda + equipo, ordenadas por fecha de aceptación. */
  readonly filas = computed<Transferencia[]>(() => {
    const q = this.busqueda().trim().toLowerCase();
    const eq = this.equipoFiltro();
    const arr = this.items().filter((t) => {
      if (eq && t.equipoOrigen !== eq) return false;
      if (!q) return true;
      return (
        (t.tareaCodigo || '').toLowerCase().includes(q) ||
        (t.tareaTitulo || '').toLowerCase().includes(q) ||
        (t.clienteTarea || '').toLowerCase().includes(q) ||
        (t.ticket || '').toLowerCase().includes(q)
      );
    });
    const clave = (t: Transferencia) => t.resueltoEn || t.creadoEn || '';
    const dir = this.orden() === 'reciente' ? -1 : 1;
    return [...arr].sort((a, b) => dir * clave(a).localeCompare(clave(b)));
  });

  readonly seleccionada = computed<Transferencia | null>(() => {
    const list = this.filas();
    const id = this.seleccionadaId();
    return list.find((t) => t.id === id) ?? list[0] ?? null;
  });

  constructor() {
    void this.cargar();
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    try {
      this.items.set(await this.svc.trabajoAceptado());
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cargar.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  seleccionar(t: Transferencia): void {
    this.seleccionadaId.set(t.id);
  }

  /** Abre el ticket asociado en la vista Tickets (búsqueda global por N°). */
  verTicket(t: Transferencia): void {
    if (!t.ticket) {
      this.snack.open('Esta tarea no tiene un ticket asociado.', 'OK', { duration: 3000 });
      return;
    }
    this.search.buscar('ticket', t.ticket);
    void this.router.navigate(['/tickets']);
  }

  /** "20/05/2025 10:32" (o "—"). */
  fecha(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }
}
