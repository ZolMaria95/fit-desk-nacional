import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../board/confirm-dialog/confirm-dialog';
import { abrirTicketDialog } from '../../../core/ticket-dialog';
import { errorMsg } from '../../board/transferir/enviar-equipo-dialog';
import { Solicitud, TransferenciasService } from '../../../core/services/transferencias.service';

type TabKey = 'pendientes' | 'enviadas' | 'aprobadas' | 'rechazadas';
type TipoFiltro = '' | 'REASIGNACION' | 'TRANSFERENCIA';

/**
 * Página interior de "Solicitudes de Especialistas" (drill-down desde la Bandeja).
 * Maestro-detalle en NARANJA (categoría de solicitudes). Datos REALES: Pendientes
 * (`solicitudesEntrantes`) y Enviadas (`misSolicitudes`, lo que YO pedí); Aprobadas/Rechazadas
 * quedan vacías (el backend no expone ese historial agregado). Los tipos reales son
 * Reasignación y Transferencia (no hay "Apoyo técnico"), y la solicitud no guarda prioridad
 * → sin esa columna.
 */
@Component({
  selector: 'app-solicitudes-detalle',
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './solicitudes-detalle.html',
  styleUrl: './solicitudes-detalle.scss',
})
export class SolicitudesDetalle {
  private readonly svc = inject(TransferenciasService);
  private readonly snack = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly pendientes = signal<Solicitud[]>([]);
  /** Solicitudes que YO envié (cualquier estado), para revisarlas y cancelar las que sigan pendientes. */
  readonly enviadas = signal<Solicitud[]>([]);
  readonly loading = signal(true);
  readonly busy = signal<number | null>(null);

  readonly tab = signal<TabKey>('pendientes');
  readonly busqueda = signal('');
  readonly tipoFiltro = signal<TipoFiltro>('');
  readonly orden = signal<'reciente' | 'antiguo'>('reciente');
  readonly seleccionadaId = signal<number | null>(null);

  readonly ordenLabel = computed(() => (this.orden() === 'reciente' ? 'Reciente' : 'Más antiguo'));
  readonly tipoFiltroLabel = computed(() =>
    this.tipoFiltro() === 'REASIGNACION' ? 'Reasignación' : this.tipoFiltro() === 'TRANSFERENCIA' ? 'Transferencia' : 'Todas',
  );
  /** Estas dos pestañas aún no tienen fuente en el backend. */
  readonly tabSinDatos = computed(() => this.tab() === 'aprobadas' || this.tab() === 'rechazadas');
  /** ¿Estoy viendo lo que YO envié? En ese caso no puedo aprobar/rechazar mi propia solicitud. */
  readonly esEnviadas = computed(() => this.tab() === 'enviadas');

  private readonly listaBase = computed<Solicitud[]>(() => {
    if (this.tab() === 'pendientes') return this.pendientes();
    if (this.tab() === 'enviadas') return this.enviadas();
    return [];
  });

  readonly filas = computed<Solicitud[]>(() => {
    const q = this.busqueda().trim().toLowerCase();
    const tipo = this.tipoFiltro();
    const arr = this.listaBase().filter((s) => {
      if (tipo && s.tipo !== tipo) return false;
      if (!q) return true;
      return (
        (s.tareaCodigo || '').toLowerCase().includes(q) ||
        (s.tareaTitulo || '').toLowerCase().includes(q) ||
        (s.solicitante || '').toLowerCase().includes(q)
      );
    });
    const dir = this.orden() === 'reciente' ? -1 : 1;
    return [...arr].sort((a, b) => dir * (a.creadoEn || '').localeCompare(b.creadoEn || ''));
  });

  readonly seleccionada = computed<Solicitud | null>(() => {
    const list = this.filas();
    const id = this.seleccionadaId();
    return list.find((s) => s.id === id) ?? list[0] ?? null;
  });

  readonly conteos = computed(() => ({
    pendientes: this.pendientes().length,
    enviadas: this.enviadas().length,
    aprobadas: 0,
    rechazadas: 0,
  }));
  readonly totalTab = computed(() => this.listaBase().length);

  constructor() {
    void this.cargar();
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    try {
      const [pend, env] = await Promise.all([this.svc.solicitudesEntrantes(), this.svc.misSolicitudes()]);
      this.pendientes.set(pend);
      this.enviadas.set(env);
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cargar.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  setTab(t: TabKey): void {
    this.tab.set(t);
    this.tipoFiltro.set('');
    this.seleccionadaId.set(null);
  }

  seleccionar(s: Solicitud): void {
    this.seleccionadaId.set(s.id);
  }

  /** Abre la conversación del ticket asociado SIN salir de la Bandeja. */
  abrirTicket(numero: string | null | undefined, ev?: Event): void {
    ev?.stopPropagation(); // la fila entera es clicable: no seleccionarla además
    if (!numero) return;
    void abrirTicketDialog(this.dialog, { ticketId: numero });
  }

  tipoLabel(t: Solicitud['tipo']): string {
    return t === 'TRANSFERENCIA' ? 'Transferencia' : 'Reasignación';
  }
  estadoLabel(e: Solicitud['estado']): string {
    return { PENDIENTE: 'Pendiente', APROBADA: 'Aprobada', RECHAZADA: 'Rechazada', CANCELADA: 'Cancelada' }[e] ?? e;
  }

  fecha(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  async aprobar(s: Solicitud): Promise<void> {
    this.busy.set(s.id);
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

  async rechazar(s: Solicitud): Promise<void> {
    this.busy.set(s.id);
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

  /** Retira una solicitud PROPIA mientras sigue pendiente de respuesta. */
  async cancelar(s: Solicitud): Promise<void> {
    const ok = await firstValueFrom(
      this.dialog
        .open(ConfirmDialog, {
          data: {
            title: 'Cancelar solicitud',
            message: `¿Cancelar la solicitud de "${s.tareaTitulo || s.tareaCodigo}"?`,
            confirmText: 'Cancelar solicitud',
          },
        })
        .afterClosed(),
    );
    if (!ok) return;
    this.busy.set(s.id);
    try {
      await this.svc.cancelarSolicitud(s.id);
      this.snack.open('Solicitud cancelada.', 'OK', { duration: 3000 });
      await this.cargar();
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo cancelar.'), 'OK', { duration: 5000 });
    } finally {
      this.busy.set(null);
    }
  }
}
