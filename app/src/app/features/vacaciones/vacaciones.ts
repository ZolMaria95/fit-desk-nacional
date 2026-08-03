import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { TransferenciasService } from '../../core/services/transferencias.service';
import { Vacacion, VacacionesService } from '../../core/services/vacaciones.service';
import { errorMsg } from '../board/transferir/enviar-equipo-dialog';
import { VacacionDialog, VacacionDialogData, VacacionDialogResult } from './vacacion-dialog/vacacion-dialog';

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTHS_SHORT_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** Paleta estable por empleado (misma de HelpDesk Semanal). */
const PALETTE = [
  { bg: '#DBEAFE', fg: '#1E40AF' }, { bg: '#D1FAE5', fg: '#065F46' }, { bg: '#EDE9FE', fg: '#5B21B6' },
  { bg: '#FEE0CC', fg: '#9A3412' }, { bg: '#FCE7F3', fg: '#9D174D' }, { bg: '#CCFBF1', fg: '#0F766E' },
  { bg: '#FEF3C7', fg: '#92400E' }, { bg: '#E0E7FF', fg: '#3730A3' }, { bg: '#CFFAFE', fg: '#155E75' },
  { bg: '#ECFCCB', fg: '#3F6212' }, { bg: '#FFE4E6', fg: '#9F1239' }, { bg: '#F3E8FF', fg: '#6B21A8' },
];
const NEUTRAL = { bg: '#F2F2F2', fg: '#4A4A6A' };
type Color = { bg: string; fg: string };

function today(): Date { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function addDays(d: Date, n: number): Date { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function isoKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function parseISO(key: string): Date { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d); }
function sameDay(a: Date, b: Date): boolean { return isoKey(a) === isoKey(b); }
function shortName(full: string | null): string { return (full || '—').split(' ')[0]; }
function fmtDay(key: string): string { const d = parseISO(key); return `${d.getDate()} ${MONTHS_SHORT_ES[d.getMonth()]}`; }
function fmtRange(v: Vacacion): string { return `${fmtDay(v.fechaInicio)} → ${fmtDay(v.fechaFin)}`; }

interface DiaEmp { hid: string; short: string; full: string; color: Color; tipo: string; }
interface VacCell { dayNum: number; isOther: boolean; isToday: boolean; dateKey: string; items: DiaEmp[]; overflow: number; }

/**
 * Sección VACACIONES: calendario mensual (mismo esquema que HelpDesk Semanal) que muestra los
 * períodos de vacaciones/permiso por empleado, con vista **Por equipo** y **Nacional**. Todos ven
 * el calendario; registran/editan admin (a cualquiera), responsable (su equipo) y cada empleado
 * las SUYAS. Incluye calculadora del factor 1,36, lineamientos, descarga del formato y pasos.
 */
@Component({
  selector: 'app-vacaciones',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './vacaciones.html',
  styleUrl: './vacaciones.scss',
})
export class Vacaciones {
  private readonly svc = inject(VacacionesService);
  private readonly auth = inject(AuthService);
  private readonly hd = inject(HelpdeskService);
  private readonly transfer = inject(TransferenciasService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);

  readonly DAY_LABELS = DAY_LABELS;

  readonly vista = signal<'equipo' | 'nacional'>('nacional');
  readonly equipoSel = signal<number | null>(null);
  readonly viewMonth = signal(new Date(today().getFullYear(), today().getMonth(), 1));
  readonly selectedDay = signal<string>(isoKey(today()));
  readonly loading = signal(true);

  /** Todas las vacaciones (lectura abierta); el filtro por equipo es en cliente. */
  private readonly todas = signal<Vacacion[]>([]);
  /** Hids que el actor puede gestionar (además de las suyas). Vacío para un empleado normal. */
  private readonly gestionables = signal<Set<string>>(new Set());
  /** Empleados a los que el actor puede registrarles vacaciones (para el diálogo). */
  private readonly registrables = signal<{ id: string; name: string }[]>([]);

  readonly esAdmin = this.auth.esAdminPlataforma;
  private readonly miHid = computed(() => (this.auth.session()?.id || '').trim());

  // ── Calculadora del factor 1,36 ──
  calcDias = 5;
  readonly calcVac = computed(() => Math.round(Math.max(0, this.calcDias || 0) * 1.36));

  constructor() {
    this.hd.getHdUsers(); // catálogo para resolver nombres / picker de admin
    void this.cargarPermisos();
    void this.cargar();
  }

  /** Determina a quién puede registrar el actor: admin=todos; responsable=su equipo; resto=solo él. */
  private async cargarPermisos(): Promise<void> {
    const s = this.auth.session();
    const yo = s ? [{ id: s.id, name: s.name }] : [];
    const setg = new Set<string>(s ? [s.id] : []);
    if (this.esAdmin()) {
      this.registrables.set([]); // admin usa el catálogo completo (hdUsers) en el diálogo
    } else if (this.auth.puedeAdministrar()) {
      try {
        const miembros = await this.transfer.miEquipoMiembros();
        const list = miembros
          .filter((m) => m.helpdeskUserId)
          .map((m) => ({ id: m.helpdeskUserId as string, name: m.nombre }));
        list.forEach((e) => setg.add(e.id));
        // Incluye al propio actor por si no aparece en el roster.
        const dedup = new Map<string, { id: string; name: string }>();
        [...yo, ...list].forEach((e) => dedup.set(e.id, e));
        this.registrables.set([...dedup.values()]);
      } catch {
        this.registrables.set(yo);
      }
    } else {
      this.registrables.set(yo); // empleado normal: solo él mismo
    }
    this.gestionables.set(setg);
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    try {
      this.todas.set(await this.svc.listar());
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudieron cargar las vacaciones.'), 'OK', { duration: 5000 });
    } finally {
      this.loading.set(false);
    }
  }

  // ── Equipos presentes (para el selector de la vista "Por equipo") ──
  readonly equipos = computed(() => {
    const map = new Map<number, string>();
    for (const v of this.todas()) if (v.equipoId != null && v.equipo) map.set(v.equipoId, v.equipo);
    return [...map.entries()].map(([id, nombre]) => ({ id, nombre })).sort((a, b) => a.nombre.localeCompare(b.nombre));
  });

  /** Lista según la vista: Nacional = todas; Por equipo = solo el equipo elegido. */
  readonly lista = computed<Vacacion[]>(() => {
    if (this.vista() === 'nacional') return this.todas();
    const eq = this.equipoSel();
    return eq == null ? this.todas() : this.todas().filter((v) => v.equipoId === eq);
  });

  /** Color estable por empleado (por hid) dentro de la vista. */
  readonly colorMap = computed<Record<string, Color>>(() => {
    const map: Record<string, Color> = {};
    let i = 0;
    for (const v of this.lista()) {
      const k = v.usuarioHid || v.empleado || '';
      if (k && !(k in map)) map[k] = PALETTE[i++ % PALETTE.length];
    }
    return map;
  });
  private colorOf(v: Vacacion): Color { return this.colorMap()[v.usuarioHid || v.empleado || ''] || NEUTRAL; }

  readonly periodLabel = computed(() => `${MONTHS_ES[this.viewMonth().getMonth()]} ${this.viewMonth().getFullYear()}`);

  /** ¿La vacación v cubre la fecha date? (inclusive). */
  private cubre(v: Vacacion, date: Date): boolean {
    const ini = parseISO(v.fechaInicio); const fin = parseISO(v.fechaFin);
    return date >= ini && date <= fin;
  }

  readonly calendarCells = computed<VacCell[]>(() => {
    const vm = this.viewMonth();
    const first = new Date(vm.getFullYear(), vm.getMonth(), 1);
    const gridStart = addDays(first, -first.getDay());
    const t = today();
    const lista = this.lista();
    const cells: VacCell[] = [];
    for (let i = 0; i < 42; i++) {
      const date = addDays(gridStart, i);
      const activos = lista.filter((v) => this.cubre(v, date));
      const items: DiaEmp[] = activos.slice(0, 3).map((v) => ({
        hid: v.usuarioHid || '',
        short: shortName(v.empleado),
        full: `${v.empleado} · ${v.tipo === 'PERMISO' ? 'Permiso' : 'Vacaciones'}`,
        color: this.colorOf(v),
        tipo: v.tipo,
      }));
      cells.push({
        dayNum: date.getDate(),
        isOther: date.getMonth() !== vm.getMonth(),
        isToday: sameDay(date, t),
        dateKey: isoKey(date),
        items,
        overflow: Math.max(0, activos.length - 3),
      });
    }
    return cells;
  });

  /** Vacaciones activas en el día seleccionado (panel lateral). */
  readonly diaSeleccionado = computed(() => {
    const date = parseISO(this.selectedDay());
    return this.lista()
      .filter((v) => this.cubre(v, date))
      .map((v) => ({ v, color: this.colorOf(v), rango: fmtRange(v) }));
  });
  readonly selectedLabel = computed(() => {
    const d = parseISO(this.selectedDay());
    return `${DAY_LABELS[d.getDay()]} ${d.getDate()} de ${MONTHS_ES[d.getMonth()]}`;
  });

  /** Leyenda: empleados en la vista con su color y total de días de vacaciones. */
  readonly leyenda = computed(() => {
    const acc = new Map<string, { name: string; color: Color; dias: number }>();
    for (const v of this.lista()) {
      const k = v.usuarioHid || v.empleado || '';
      const e = acc.get(k) || { name: v.empleado || '—', color: this.colorOf(v), dias: 0 };
      e.dias += v.diasVacacion || 0;
      acc.set(k, e);
    }
    return [...acc.values()].sort((a, b) => a.name.localeCompare(b.name));
  });

  // ── Permisos de edición ──
  puedeEditar(v: Vacacion): boolean {
    if (this.esAdmin()) return true;
    const hid = v.usuarioHid || '';
    return hid === this.miHid() || this.gestionables().has(hid);
  }
  readonly puedeAgregar = computed(() => true); // todos registran al menos las suyas

  // ── Navegación ──
  prevMonth(): void { const v = this.viewMonth(); this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() - 1, 1)); }
  nextMonth(): void { const v = this.viewMonth(); this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() + 1, 1)); }
  goToday(): void { const t = today(); this.viewMonth.set(new Date(t.getFullYear(), t.getMonth(), 1)); this.selectedDay.set(isoKey(t)); }

  setVista(v: 'equipo' | 'nacional'): void {
    this.vista.set(v);
    if (v === 'equipo' && this.equipoSel() == null && this.equipos().length) this.equipoSel.set(this.equipos()[0].id);
  }
  onCellClick(c: VacCell): void { this.selectedDay.set(c.dateKey); }

  // ── Registrar / editar / eliminar ──
  private empleadosParaDialogo(): { id: string; name: string }[] {
    if (this.esAdmin()) {
      return this.hd.hdUsers().map((u) => ({ id: String(u.id), name: u.name })).sort((a, b) => a.name.localeCompare(b.name));
    }
    return this.registrables();
  }

  async abrirNuevo(fecha?: string): Promise<void> {
    const empleados = this.empleadosParaDialogo();
    const s = this.auth.session();
    const data: VacacionDialogData = {
      empleados,
      // Si solo puede registrarse a sí mismo, se bloquea el selector en su propio hid.
      fijoHid: empleados.length <= 1 && s ? s.id : null,
      fechaInicio: fecha || this.selectedDay(),
      registro: null,
    };
    await this.abrirDialogo(data);
  }

  async editar(v: Vacacion): Promise<void> {
    if (!this.puedeEditar(v)) return;
    const data: VacacionDialogData = {
      empleados: this.empleadosParaDialogo(),
      fijoHid: v.usuarioHid,
      fechaInicio: v.fechaInicio,
      registro: v,
    };
    await this.abrirDialogo(data);
  }

  private async abrirDialogo(data: VacacionDialogData): Promise<void> {
    const res = (await firstValueFrom(
      this.dialog.open(VacacionDialog, { data, width: '460px', maxWidth: '95vw' }).afterClosed(),
    )) as VacacionDialogResult | undefined;
    if (!res) return;
    try {
      if ('eliminar' in res && data.registro) {
        await this.svc.eliminar(data.registro.id);
        this.snack.open('Vacaciones eliminadas.', 'OK', { duration: 3000 });
      } else if ('input' in res && data.registro) {
        await this.svc.editar(data.registro.id, res.input);
        this.snack.open('Vacaciones actualizadas.', 'OK', { duration: 3000 });
      } else if ('input' in res) {
        await this.svc.crear(res.input);
        this.snack.open('Vacaciones registradas.', 'OK', { duration: 3000 });
      }
      await this.cargar();
    } catch (e: unknown) {
      this.snack.open(errorMsg(e, 'No se pudo guardar.'), 'OK', { duration: 5000 });
    }
  }

  /** Los 11 lineamientos de la empresa (texto tal cual, para la sección informativa). */
  readonly lineamientos: string[] = [
    'Las vacaciones (duración y fechas) se acuerdan entre el colaborador y la empresa.',
    'Sin acuerdo, prevalece la planificación de la empresa según el reglamento interno.',
    'Pueden disfrutarse en uno o varios períodos, con acuerdo entre las partes.',
    'Cada período debe incluir al menos un fin de semana (para el cálculo según la normativa).',
    'Los 15 días comprenden laborables y no laborables (≈ 11 laborables + 4 no laborables). Ej.: 5 laborables = 7 días; 3 laborables = 4 días.',
    'Permisos con cargo a vacaciones: días laborables × 1,36, descontado del saldo disponible.',
    'El derecho a vacaciones se adquiere tras cumplir un año de trabajo.',
    'La planificación y aprobación depende de las necesidades operativas de la empresa.',
    'En baja carga laboral, la empresa puede coordinar la programación con el colaborador.',
    'Regla general: períodos completos de 15 días; en más de un período solo con necesidad operativa o acuerdo previo.',
    'Planificar con anticipación para evitar acumular días pendientes.',
  ];
}
