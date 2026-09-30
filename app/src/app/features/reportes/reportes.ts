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
  compararFila,
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
  /** Casillas independientes: In Progress se ve siempre; cada una suma su estado. */
  /** Sub-pestaña visible (la 1ª es "Requieren seguimiento hoy"). */
  readonly seccion = signal<'seguimiento' | 'consultores'>('seguimiento');
  readonly incluirTodo = signal(false);
  readonly incluirCert = signal(false);

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
    const estados = new Set(['IN_PROGRESS']);
    if (this.incluirTodo()) estados.add('TODO');
    if (this.incluirCert()) estados.add('EN_CERTIFICACION');
    const visibles = rep.filas.filter((f) => estados.has(f.estado));
    const out: GrupoConsultor[] = rep.consultores.map((p) => ({
      hid: p.hid,
      nombre: nombrePropio(p.nombre),
      filas: visibles.filter((f) => (f.consultorHid ?? '').toUpperCase() === String(p.hid).toUpperCase()).sort(compararFila),
    }));
    const sinAsignar = visibles.filter((f) => !f.consultorHid).sort(compararFila);
    if (sinAsignar.length) out.push({ hid: SIN_ASIGNAR, nombre: 'Sin asignar', filas: sinAsignar });
    return out;
  });

  /** Cambiar la prioridad de la TAREA desde el reporte: rol HELPDESK o ADMIN (el backend lo re-exige). */
  readonly puedeEditarPrioridad = computed(() => this.auth.esHelpdesk() || this.auth.esAdminPlataforma());
  /** Código de la tarea cuya prioridad se está guardando (deshabilita su botón). */
  readonly guardandoPrioridad = signal<string | null>(null);
  readonly PRIORIDADES = ['alta', 'media', 'baja'] as const;

  /** Guarda la prioridad de la tarea (síncrono: se confirma antes de reflejarla) y la tabla se reordena sola. */
  async cambiarPrioridad(f: FilaReporte, prioridad: string): Promise<void> {
    if (!this.puedeEditarPrioridad() || f.prioridad === prioridad || this.guardandoPrioridad()) return;
    this.guardandoPrioridad.set(f.tarea);
    try {
      const r = await fetch(`${this.base}/api/reportes/tareas/${encodeURIComponent(f.tarea)}/prioridad`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Actor-Hid': this.hid },
        body: JSON.stringify({ prioridad }),
      });
      if (!r.ok) {
        const b = await r.json().catch(() => null);
        this.snack.open(b?.message || `No se pudo cambiar la prioridad (${r.status}).`, 'OK', { duration: 5000 });
        return;
      }
      const upd = <T extends FilaReporte>(x: T): T => (x.tarea === f.tarea ? { ...x, prioridad } : x);
      this.reporte.update((rep) => (rep ? { ...rep, filas: rep.filas.map(upd), seguimiento: rep.seguimiento.map(upd) } : rep));
      // Si el Board ya tiene la tarea en memoria, que la vea igual sin recargar.
      this.data.stories.update((list) => list.map((s) => (s.id === f.tarea ? { ...s, priority: prioridad } : s)));
      this.snack.open(`${f.tarea}: prioridad ${PRIORIDAD_LABEL[prioridad]}.`, 'OK', { duration: 2500 });
    } catch {
      this.snack.open('No se pudo cambiar la prioridad.', 'OK', { duration: 5000 });
    } finally {
      this.guardandoPrioridad.set(null);
    }
  }

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

  /** Orden y ASIGNADO del ticket, en vivo (como el Board): el espejo puede estar desactualizado y una
   *  reasignación hecha en el HelpDesk no toca la tarea. Si la lectura de un ticket falla, queda lo del
   *  backend. Una fila cuyo ticket ahora es de alguien fuera del reporte, sale del reporte. */
  private async ordenEnVivo(rep: ReporteEstadoEquipo): Promise<void> {
    const tickets = [...new Set(rep.filas.map((f) => f.ticket).filter((t): t is string => !!t))];
    const vivo = new Map<string, { orden: string | null; asignado: string | null }>();
    await Promise.all(
      tickets.map(async (t) => {
        const raw = await this.hd.fetchTicketRaw(t);
        if (!raw) return;
        const p = raw.priority;
        const a = String(raw.assigned_user_id ?? '').trim().toUpperCase();
        vivo.set(t, { orden: p !== undefined && p !== null && String(p).trim() ? String(p).trim() : null, asignado: a || null });
      }),
    );
    // El asignado de la tarea es SIEMPRE el del ticket: si en vivo difiere, se corrige la tarea.
    this.hd.reconciliarAsignados([...vivo].map(([ticket, v]) => ({ ticket, asignado: v.asignado })));
    const enReporte = new Set(rep.consultores.map((p) => String(p.hid).toUpperCase()));
    const aplicar = (f: FilaReporte): boolean => {
      const v = f.ticket ? vivo.get(f.ticket) : undefined;
      if (!v) return true;
      if (v.orden) f.ordenTicket = v.orden;
      if (v.asignado !== (f.consultorHid ? f.consultorHid.toUpperCase() : null)) {
        f.consultorHid = v.asignado;
        f.consultorNombre = null;
      }
      return !f.consultorHid || enReporte.has(f.consultorHid.toUpperCase());
    };
    rep.filas = rep.filas.filter(aplicar);
    rep.seguimiento = rep.seguimiento.filter(aplicar);
    const conTarea = new Set(rep.filas.map((f) => f.consultorHid?.toUpperCase()).filter(Boolean));
    rep.sinTarea = rep.consultores.filter((p) => !conTarea.has(String(p.hid).toUpperCase()));
  }

  /** Nombre del consultor de una fila (por su hid, contra los consultores del reporte). Regla #8: nunca el código. */
  nombreConsultor(f: FilaReporte): string {
    const hid = (f.consultorHid ?? '').toUpperCase();
    if (!hid) return 'Sin asignar';
    const p = this.reporte()?.consultores.find((x) => String(x.hid).toUpperCase() === hid);
    return nombrePropio(p?.nombre || f.consultorNombre || '') || '—';
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
        seguimiento: seg.map((s) => ({ ...s, consultorNombre: s.consultorHid ? this.nombreConsultor(s) : null })),
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
