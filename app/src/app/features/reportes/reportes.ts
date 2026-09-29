import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { environment } from '../../../environments/environment';
import { nombrePropio } from '../../core/colores';
import { descargarBlob } from '../../core/descargar';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { abrirTicketDialog } from '../../core/ticket-dialog';
import { prioBadgeClase } from '../board/board-utils';
import { generarExcelReporte } from './reporte-excel';
import {
  ESTADO_LABEL,
  FilaReporte,
  FilaSeguimiento,
  GrupoConsultor,
  PRIORIDAD_LABEL,
  ReporteEstadoEquipo,
  compararSeguimiento,
  fechaCorta,
} from './reporte-modelo';

const SIN_ASIGNAR = '__SIN_ASIGNAR__';

/**
 * Reportes → "Estado del equipo": qué hace cada consultor, prioridad (de la tarea y Orden del
 * ticket), desde cuándo y cuántos días lleva, y qué requiere seguimiento hoy. Por equipo y,
 * opcionalmente, para consultores concretos. Solo responsables de equipo y ADMIN (guard + backend).
 * El Excel suma las columnas Próximo paso / ¿Bloqueado? / Motivo / Quién debe intervenir, vacías
 * para completar a mano.
 */
@Component({
  selector: 'app-reportes',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss',
})
export class Reportes {
  private readonly auth = inject(AuthService);
  private readonly data = inject(DataService);
  private readonly hd = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  private readonly base = environment.quarkusApiUrl;

  readonly equipos = signal<{ codigo: string; nombre: string }[]>([]);
  readonly equipoSel = signal('');
  readonly miembros = signal<{ id: string; name: string; global?: boolean }[]>([]);
  /** hid elegidos; vacío = todos los del equipo. */
  readonly consultoresSel = signal<Set<string>>(new Set());
  readonly buscarConsultor = signal('');
  readonly incluirPendientes = signal(false);

  readonly cargando = signal(false);
  /** Excel ya generado para el reporte en pantalla. Se prepara ANTES del clic: en la PWA instalada,
   *  un `await` entre el clic y la descarga hace que el navegador la bloquee en silencio. */
  readonly excel = signal<{ blob: Blob; nombre: string } | null>(null);
  readonly exportando = signal(false);
  readonly error = signal('');
  readonly reporte = signal<ReporteEstadoEquipo | null>(null);

  readonly ESTADO_LABEL = ESTADO_LABEL;
  readonly PRIORIDAD_LABEL = PRIORIDAD_LABEL;
  readonly prioBadgeClase = prioBadgeClase;
  readonly fechaCorta = fechaCorta;
  readonly nombre = nombrePropio;

  readonly equipoNombre = computed(() => this.equipos().find((e) => e.codigo === this.equipoSel())?.nombre ?? '');
  readonly miembrosF = computed(() => {
    const t = this.buscarConsultor().trim().toLowerCase();
    const list = this.miembros();
    return t ? list.filter((m) => m.name.toLowerCase().includes(t)) : list;
  });
  readonly consultoresLabel = computed(() => {
    const sel = this.consultoresSel();
    if (!sel.size) return 'Todos los del equipo';
    const nombres = this.miembros().filter((m) => sel.has(m.id)).map((m) => nombrePropio(m.name));
    return sel.size <= 2 ? nombres.join(', ') : `${sel.size} consultores`;
  });

  /** Filas visibles por consultor (en el orden del backend). Sin tarea visible → "Sin tarea en curso". */
  readonly grupos = computed<GrupoConsultor[]>(() => {
    const rep = this.reporte();
    if (!rep) return [];
    const todas = this.incluirPendientes();
    const visibles = rep.filas.filter((f) => todas || f.estado === 'IN_PROGRESS');
    const out: GrupoConsultor[] = rep.consultores.map((p) => ({
      hid: p.hid,
      nombre: nombrePropio(p.nombre),
      filas: visibles.filter((f) => f.consultorHid === p.hid),
    }));
    const sinAsignar = visibles.filter((f) => !f.consultorHid);
    if (sinAsignar.length) out.push({ hid: SIN_ASIGNAR, nombre: 'Sin asignar', filas: sinAsignar });
    return out;
  });

  readonly seguimiento = computed<FilaSeguimiento[]>(() => [...(this.reporte()?.seguimiento ?? [])].sort(compararSeguimiento));
  readonly totalEnCurso = computed(() => this.reporte()?.filas.filter((f) => f.estado === 'IN_PROGRESS').length ?? 0);
  readonly sinTareaEnCurso = computed(() => this.grupos().filter((g) => g.hid !== SIN_ASIGNAR && !g.filas.length).length);
  readonly generadoTxt = computed(() => {
    const r = this.reporte();
    if (!r) return '';
    const d = new Date(r.generadoEn);
    const quien = nombrePropio(String(this.auth.session()?.name ?? ''));
    return `Generado el ${d.toLocaleDateString('es-EC')} a las ${d.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}${quien ? ' por ' + quien : ''}`;
  });

  constructor() {
    void this.cargarEquipos();
    // Re-prepara el Excel cuando cambia lo que se ve (reporte nuevo o "incluir pendientes").
    effect(() => {
      const rep = this.reporte();
      const grupos = this.grupos();
      const seg = this.seguimiento();
      untracked(() => void this.prepararExcel(rep, grupos, seg));
    });
  }

  private get hid(): string {
    return String(this.auth.session()?.id ?? '').trim();
  }

  private async cargarEquipos(): Promise<void> {
    try {
      const r = await fetch(`${this.base}/api/reportes/equipos`, { headers: { 'X-Actor-Hid': this.hid } });
      if (!r.ok) {
        this.error.set(r.status === 403 ? 'No tienes equipos a cargo para generar reportes.' : 'No se pudieron cargar los equipos.');
        return;
      }
      const list: { codigo: string; nombre: string }[] = await r.json();
      this.equipos.set(list);
      if (list.length) await this.elegirEquipo(list[0].codigo);
    } catch {
      this.error.set('No se pudieron cargar los equipos.');
    }
  }

  async elegirEquipo(codigo: string): Promise<void> {
    if (codigo === this.equipoSel() && this.miembros().length) return;
    this.equipoSel.set(codigo);
    this.consultoresSel.set(new Set());
    this.reporte.set(null);
    const ms = await this.data.teamMembers(codigo);
    this.miembros.set(
      [...ms]
        .filter((m) => !!m.id)
        .map((m) => ({ ...m, id: String(m.id).toUpperCase() }))
        .sort((a, b) => nombrePropio(a.name).localeCompare(nombrePropio(b.name), 'es')),
    );
    await this.generar();
  }

  toggleConsultor(id: string): void {
    const s = new Set(this.consultoresSel());
    if (s.has(id)) s.delete(id);
    else s.add(id);
    this.consultoresSel.set(s);
  }
  todosConsultores(): void {
    this.consultoresSel.set(new Set());
  }

  async generar(): Promise<void> {
    const eq = this.equipoSel();
    if (!eq || this.cargando()) return;
    this.cargando.set(true);
    this.error.set('');
    try {
      const sel = [...this.consultoresSel()];
      const q = `equipo=${encodeURIComponent(eq)}${sel.length ? '&consultores=' + encodeURIComponent(sel.join(',')) : ''}`;
      const r = await fetch(`${this.base}/api/reportes/estado-equipo?${q}`, { headers: { 'X-Actor-Hid': this.hid } });
      if (!r.ok) {
        const body = await r.json().catch(() => null);
        this.error.set(body?.message || `No se pudo generar el reporte (${r.status}).`);
        this.reporte.set(null);
        return;
      }
      const rep: ReporteEstadoEquipo = await r.json();
      await this.ordenEnVivo(rep);
      this.reporte.set(rep);
    } catch {
      this.error.set('No se pudo generar el reporte.');
    } finally {
      this.cargando.set(false);
    }
  }

  /** El Orden del ticket del espejo puede estar desactualizado: se lee en vivo (como el Board). Si la
   *  lectura de un ticket falla, queda el del espejo. */
  private async ordenEnVivo(rep: ReporteEstadoEquipo): Promise<void> {
    const tickets = [...new Set(rep.filas.map((f) => f.ticket).filter((t): t is string => !!t))];
    const vivo = new Map<string, string>();
    await Promise.all(
      tickets.map(async (t) => {
        const raw = await this.hd.fetchTicketRaw(t);
        const p = raw?.priority;
        if (p !== undefined && p !== null && String(p).trim()) vivo.set(t, String(p).trim());
      }),
    );
    const aplicar = (f: FilaReporte) => {
      if (f.ticket && vivo.has(f.ticket)) f.ordenTicket = vivo.get(f.ticket)!;
    };
    rep.filas.forEach(aplicar);
    rep.seguimiento.forEach(aplicar);
  }

  verTicket(ticket: string | null): void {
    if (ticket) void abrirTicketDialog(this.dialog, { ticketId: ticket });
  }

  private prepVersion = 0;
  private async prepararExcel(rep: ReporteEstadoEquipo | null, grupos: GrupoConsultor[], seg: FilaSeguimiento[]): Promise<void> {
    const v = ++this.prepVersion;
    this.excel.set(null);
    if (!rep) return;
    this.exportando.set(true);
    try {
      const blob = await generarExcelReporte({
        equipo: rep.equipo.nombre,
        consultores: this.consultoresLabel(),
        generadoPor: nombrePropio(String(this.auth.session()?.name ?? '')) || '—',
        generadoEn: new Date(rep.generadoEn),
        grupos,
        seguimiento: seg.map((s) => ({ ...s, consultorNombre: s.consultorNombre ? nombrePropio(s.consultorNombre) : null })),
      });
      if (v !== this.prepVersion) return; // llegó otro cambio mientras se generaba
      const hoy = rep.generadoEn.slice(0, 10);
      this.excel.set({ blob, nombre: `Reporte-${rep.equipo.codigo}-${hoy}.xlsx` });
    } catch {
      if (v === this.prepVersion) this.snack.open('No se pudo preparar el Excel.', 'OK', { duration: 4000 });
    } finally {
      if (v === this.prepVersion) this.exportando.set(false);
    }
  }

  /** Síncrono a propósito (ver `excel`). */
  descargarExcel(): void {
    const x = this.excel();
    if (x) descargarBlob(x.blob, x.nombre);
  }
}
