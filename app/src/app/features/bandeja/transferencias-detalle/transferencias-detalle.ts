import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorMsg } from '../../board/transferir/enviar-equipo-dialog';
import {
  MiembroEquipo,
  Transferencia,
  TransferenciasService,
} from '../../../core/services/transferencias.service';

type TabKey = 'pendientes' | 'aceptadas' | 'rechazadas' | 'completadas';

/**
 * Página interior de "Transferencias entrantes" (drill-down desde la Bandeja).
 * Maestro-detalle: tabla a la izquierda + panel de detalle a la derecha.
 * Solo datos REALES: Pendientes (`entrantes`) y Completadas (`aceptadas`); las pestañas
 * Aceptadas/Rechazadas quedan vacías porque el backend aún no expone ese historial, y NO
 * hay columna de prioridad porque la transferencia no la guarda.
 */
@Component({
  selector: 'app-transferencias-detalle',
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './transferencias-detalle.html',
  styleUrl: './transferencias-detalle.scss',
})
export class TransferenciasDetalle {
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);

  readonly pendientes = signal<Transferencia[]>([]);
  readonly completadas = signal<Transferencia[]>([]);
  private readonly miembros = signal<Record<number, MiembroEquipo[]>>({});
  /** transferencia.id → helpdesk_user_id elegido para asignar al aceptar. */
  readonly asignadoSel: Record<number, string> = {};

  readonly loading = signal(true);
  readonly busy = signal<string | null>(null);

  readonly tab = signal<TabKey>('pendientes');
  readonly busqueda = signal('');
  readonly equipoFiltro = signal(''); // nombre de equipo origen, o '' = todos
  readonly orden = signal<'reciente' | 'antiguo'>('reciente');
  readonly seleccionadaId = signal<number | null>(null);

  readonly ordenLabel = computed(() => (this.orden() === 'reciente' ? 'Reciente' : 'Más antiguo'));

  /** Estas dos pestañas aún no tienen fuente en el backend. */
  readonly tabSinDatos = computed(() => this.tab() === 'aceptadas' || this.tab() === 'rechazadas');

  /** Lista base según la pestaña activa. */
  private readonly listaBase = computed<Transferencia[]>(() => {
    switch (this.tab()) {
      case 'pendientes': return this.pendientes();
      case 'completadas': return this.completadas();
      default: return []; // aceptadas / rechazadas: sin endpoint todavía
    }
  });

  /** Total de la pestaña activa (antes de filtrar), para "Mostrando X de Y". */
  readonly totalTab = computed(() => this.listaBase().length);

  /** Equipos de origen distintos de la pestaña activa (para el filtro). */
  readonly equiposOrigen = computed(() => {
    const set = new Set<string>();
    for (const t of this.listaBase()) if (t.equipoOrigen) set.add(t.equipoOrigen);
    return [...set].sort();
  });

  /** Filas visibles = base filtrada por búsqueda + equipo, ordenadas por fecha. */
  readonly filas = computed<Transferencia[]>(() => {
    const q = this.busqueda().trim().toLowerCase();
    const eq = this.equipoFiltro();
    const arr = this.listaBase().filter((t) => {
      if (eq && t.equipoOrigen !== eq) return false;
      if (!q) return true;
      return (
        (t.tareaCodigo || '').toLowerCase().includes(q) ||
        (t.tareaTitulo || '').toLowerCase().includes(q) ||
        (t.clienteTarea || '').toLowerCase().includes(q)
      );
    });
    const dir = this.orden() === 'reciente' ? -1 : 1;
    return [...arr].sort((a, b) => dir * (a.creadoEn || '').localeCompare(b.creadoEn || ''));
  });

  /** Transferencia seleccionada para el panel de detalle (o la primera de la lista). */
  readonly seleccionada = computed<Transferencia | null>(() => {
    const list = this.filas();
    const id = this.seleccionadaId();
    return list.find((t) => t.id === id) ?? list[0] ?? null;
  });

  readonly conteos = computed(() => ({
    pendientes: this.pendientes().length,
    completadas: this.completadas().length,
    aceptadas: 0,
    rechazadas: 0,
  }));

  constructor() {
    void this.cargar();
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    try {
      const [pend, comp] = await Promise.all([
        this.svc.transferenciasEntrantes(),
        this.svc.trabajoAceptado(),
      ]);
      this.pendientes.set(pend);
      this.completadas.set(comp);
      // Miembros de cada equipo destino (para el picker "Asignar a" al aceptar).
      const ids = [...new Set(pend.map((t) => t.equipoDestinoId).filter((x): x is number => x != null))];
      const map: Record<number, MiembroEquipo[]> = {};
      await Promise.all(ids.map(async (id) => { map[id] = await this.svc.miembrosEquipo(id); }));
      this.miembros.set(map);
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cargar.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  setTab(t: TabKey): void {
    this.tab.set(t);
    this.equipoFiltro.set('');
    this.seleccionadaId.set(null);
  }

  seleccionar(t: Transferencia): void {
    this.seleccionadaId.set(t.id);
  }

  miembrosDe(equipoDestinoId: number | null): MiembroEquipo[] {
    return equipoDestinoId != null ? (this.miembros()[equipoDestinoId] ?? []) : [];
  }

  estadoLabel(e: Transferencia['estado']): string {
    return { PENDIENTE: 'Pendiente', ACEPTADA: 'Aceptada', RECHAZADA: 'Rechazada', COMPLETADA: 'Completada' }[e] ?? e;
  }

  /** "20/05/2025 10:32" (o "—"). */
  fecha(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
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

  async rechazar(t: Transferencia): Promise<void> {
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
}
