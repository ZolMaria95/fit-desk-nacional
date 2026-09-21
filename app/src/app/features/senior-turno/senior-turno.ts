import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { ColoresService } from '../../core/services/colores.service';
import { ThemeService } from '../../core/services/theme.service';
import { HelpdeskService } from '../../core/services/helpdesk.service';
import { STAssignResult, SeniorTurnoAssignDialog } from './senior-turno-assign-dialog/senior-turno-assign-dialog';

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DAYS_SHORT_ES = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTHS_SHORT_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const NEUTRAL = { bg: '#F2F2F2', fg: '#4A4A6A' };
const NEUTRAL_DARK = { bg: '#252d36', fg: '#aab6c2' };

type Color = { bg: string; fg: string };
interface STCell {
  dayNum: number;
  isOther: boolean;
  isToday: boolean;
  isFri: boolean;
  weekKey: string;
  isCurrentWeek: boolean;
  assigned: boolean;
  mesaAyuda: { name: string; color: Color } | null;
  emergentes: { name: string; color: Color } | null;
}

// ── Utilidades de fecha (semanas de soporte Vie → Jue, relevo el viernes) — idénticas a Semanal ──
function today(): Date { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function addDays(date: Date, n: number): Date { const d = new Date(date); d.setDate(d.getDate() + n); return d; }
function isoKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function getWeekFriday(date: Date): Date { return addDays(date, -((date.getDay() - 5 + 7) % 7)); }
function parseISO(key: string): Date { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d); }
function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function formatShort(d: Date): string { return `${DAYS_SHORT_ES[d.getDay()]} ${d.getDate()} ${MONTHS_SHORT_ES[d.getMonth()]}`; }
function formatRange(fri: Date): string { return `${formatShort(fri)} → ${formatShort(addDays(fri, 7))}`; }

/**
 * Senior de Turno: rotación de 2 roles por semana (Mesa de Ayuda + Emergentes), por equipo,
 * abierta a CUALQUIER empleado de la empresa (no solo del equipo). Clon de `features/semanal/`
 * (mismo esquema de calendario/rotación) con esos 2 cambios de fondo.
 */
@Component({
  selector: 'app-senior-turno',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule],
  templateUrl: './senior-turno.html',
  styleUrl: './senior-turno.scss',
})
export class SeniorTurno {
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly hd = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);
  private readonly theme = inject(ThemeService);
  private readonly colores = inject(ColoresService);

  // ── Multi-equipo: selector de equipo/tablero (igual que Semanal) ──
  readonly boards = computed(() => this.data.boards());
  readonly turnoTeam = signal('');
  readonly mostrarSelector = computed(() => this.data.usesQuarkus() && this.boards().length > 1);

  readonly DAY_LABELS = DAY_LABELS;

  readonly viewMonth = signal(new Date(today().getFullYear(), today().getMonth(), 1));
  /** Trigger de recálculo tras mutar la rotación (no es signal en DataService). */
  private readonly rev = signal(0);

  constructor() {
    // Catálogo COMPLETO de empleados (para el picker abierto a cualquiera, y para resolver nombres).
    this.hd.getHdUsers();
    this.data.ensureInit().then(() => this.initTeams());
  }

  private async initTeams(): Promise<void> {
    if (!this.data.usesQuarkus()) return; // función nueva, sin equivalente en modo Firebase/legacy
    let list = this.data.boards();
    if (!list.length) list = await this.data.loadBoards(this.auth.session()?.id ?? null);
    await this.selectTeam(list[0]?.codigo ?? '');
  }

  /** Cambia el equipo de la rotación: carga SU calendario. El picker de personas NO depende del
   *  equipo (es el catálogo completo de la empresa), a diferencia de Semanal. */
  async selectTeam(codigo: string): Promise<void> {
    this.turnoTeam.set(codigo);
    await this.data.loadTurnoSenior(codigo);
    this.rev.update((v) => v + 1);
  }

  /** Nombre del empleado por hid, desde el catálogo completo del HelpDesk.
   *  Regla #8: si no resuelve, NUNCA devolver el código; usar placeholder neutro. */
  private memberName(id: string): string {
    return this.hd.hdUsers().find((u) => String(u.id) === String(id))?.name || '—';
  }
  private memberShort(id: string): string { return this.memberName(id).split(' ')[0]; }
  private colorOf(id: string): Color {
    const hid = String(id || '').trim();
    if (!hid) return this.theme.esOscuro() ? NEUTRAL_DARK : NEUTRAL;
    return this.colores.chip(hid);
  }
  private roleInfo(id: string): { name: string; color: Color } | null {
    if (!id) return null;
    return { name: this.memberShort(id), color: this.colorOf(id) };
  }

  readonly periodLabel = computed(() => `${MONTHS_ES[this.viewMonth().getMonth()]} ${this.viewMonth().getFullYear()}`);

  readonly calendarCells = computed<STCell[]>(() => {
    this.rev();
    const vm = this.viewMonth();
    const first = new Date(vm.getFullYear(), vm.getMonth(), 1);
    const gridStart = addDays(first, -first.getDay());
    const t = today();
    const curKey = isoKey(getWeekFriday(t));
    const assigns = this.data.getTurnoSenior();
    const cells: STCell[] = [];
    for (let i = 0; i < 42; i++) {
      const date = addDays(gridStart, i);
      const weekKey = isoKey(getWeekFriday(date));
      const assign = assigns[weekKey];
      cells.push({
        dayNum: date.getDate(),
        isOther: date.getMonth() !== vm.getMonth(),
        isToday: sameDay(date, t),
        isFri: date.getDay() === 5,
        weekKey,
        isCurrentWeek: weekKey === curKey,
        assigned: !!(assign && (assign.mesaAyuda || assign.emergentes)),
        mesaAyuda: assign ? this.roleInfo(assign.mesaAyuda) : null,
        emergentes: assign ? this.roleInfo(assign.emergentes) : null,
      });
    }
    return cells;
  });

  readonly currentWeek = computed(() => {
    this.rev();
    const fri = getWeekFriday(today());
    const key = isoKey(fri);
    const assign = this.data.getTurnoSeniorAssignment(key);
    return {
      key,
      range: formatRange(fri),
      mesaAyuda: assign ? this.roleInfo(assign.mesaAyuda) : null,
      emergentes: assign ? this.roleInfo(assign.emergentes) : null,
    };
  });

  readonly nextWeeks = computed(() => {
    this.rev();
    const fri = getWeekFriday(today());
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const wkFri = addDays(fri, i * 7);
      const key = isoKey(wkFri);
      const assign = this.data.getTurnoSeniorAssignment(key);
      arr.push({
        key,
        range: formatRange(wkFri),
        assigned: !!(assign && (assign.mesaAyuda || assign.emergentes)),
        mesaAyuda: assign ? this.roleInfo(assign.mesaAyuda) : null,
        emergentes: assign ? this.roleInfo(assign.emergentes) : null,
      });
    }
    return arr;
  });
  readonly nextCount = computed(() => this.nextWeeks().filter((w) => w.assigned).length);

  /** Resumen de asignaciones: cuenta ocurrencias por persona sumando AMBOS roles (alguien puede
   *  cubrir Mesa de Ayuda una semana y Emergentes otra). */
  readonly stats = computed(() => {
    this.rev();
    const assigns = this.data.getTurnoSenior();
    const m: Record<string, number> = {};
    Object.values(assigns).forEach((a: any) => {
      if (a?.mesaAyuda) m[a.mesaAyuda] = (m[a.mesaAyuda] || 0) + 1;
      if (a?.emergentes) m[a.emergentes] = (m[a.emergentes] || 0) + 1;
    });
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ id, name: this.memberName(id), count, color: this.colorOf(id) }));
  });

  // ── Acciones ──
  prevMonth(): void { const v = this.viewMonth(); this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() - 1, 1)); }
  nextMonth(): void { const v = this.viewMonth(); this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() + 1, 1)); }
  goToday(): void { const t = today(); this.viewMonth.set(new Date(t.getFullYear(), t.getMonth(), 1)); }

  onCellClick(cell: STCell): void {
    this.openAssign(cell.weekKey);
  }

  async openAssign(key: string): Promise<void> {
    const existing = this.data.getTurnoSeniorAssignment(key);
    const res = (await firstValueFrom(
      this.dialog
        .open(SeniorTurnoAssignDialog, {
          data: {
            range: formatRange(parseISO(key)),
            empleados: this.hd.hdUsers(),
            mesaAyuda: existing?.mesaAyuda || '',
            emergentes: existing?.emergentes || '',
            notes: existing?.notes || '',
            hasExisting: !!existing,
          },
          width: '460px',
          maxWidth: '95vw',
        })
        .afterClosed(),
    )) as STAssignResult | undefined;
    if (!res) return;
    if ('clear' in res) this.data.clearTurnoSeniorAssignment(key);
    else this.data.setTurnoSeniorAssignment(key, { mesaAyuda: res.mesaAyuda, emergentes: res.emergentes }, res.notes);
    this.rev.update((v) => v + 1);
  }
}
