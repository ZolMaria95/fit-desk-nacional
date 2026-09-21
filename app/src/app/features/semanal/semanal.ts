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
import { SemAssignResult, SemanalAssignDialog } from './semanal-assign-dialog/semanal-assign-dialog';

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DAYS_SHORT_ES = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MONTHS_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MONTHS_SHORT_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** Paleta de 12 colores (fondo suave + texto/borde oscuro) por consultor. */
const PALETTE = [
  { bg: '#DBEAFE', fg: '#1E40AF' }, { bg: '#D1FAE5', fg: '#065F46' }, { bg: '#EDE9FE', fg: '#5B21B6' },
  { bg: '#FEE0CC', fg: '#9A3412' }, { bg: '#FCE7F3', fg: '#9D174D' }, { bg: '#CCFBF1', fg: '#0F766E' },
  { bg: '#FEF3C7', fg: '#92400E' }, { bg: '#E0E7FF', fg: '#3730A3' }, { bg: '#CFFAFE', fg: '#155E75' },
  { bg: '#ECFCCB', fg: '#3F6212' }, { bg: '#FFE4E6', fg: '#9F1239' }, { bg: '#F3E8FF', fg: '#6B21A8' },
];
const NEUTRAL = { bg: '#F2F2F2', fg: '#4A4A6A' };

/** Paleta OSCURA: mismo tono, relación invertida (fondo tintado oscuro + texto vivo).
 *  Va aquí y no en el .scss porque estos colores viajan como estilo INLINE. */
const PALETTE_DARK = [
  { bg: '#17284a', fg: '#93b4f5' }, { bg: '#0f3a2c', fg: '#7fd9b0' }, { bg: '#2a2148', fg: '#c0aef5' },
  { bg: '#40230f', fg: '#f0a878' }, { bg: '#3d1a2c', fg: '#f0a0c0' }, { bg: '#0f3833', fg: '#7fd9cf' },
  { bg: '#3a2c0f', fg: '#f0c878' }, { bg: '#1f2145', fg: '#aeb6f5' }, { bg: '#0f2e3a', fg: '#8fcfe0' },
  { bg: '#22300f', fg: '#c0dd8a' }, { bg: '#3d1620', fg: '#f09aa8' }, { bg: '#2d1840', fg: '#cfa0f0' },
];
const NEUTRAL_DARK = { bg: '#252d36', fg: '#aab6c2' };

type Color = { bg: string; fg: string };
interface SemCell {
  dayNum: number;
  isOther: boolean;
  isToday: boolean;
  isFri: boolean;
  weekKey: string;
  isCurrentWeek: boolean;
  assigned: boolean;
  color: Color | null;
  assigneeShort: string;
  assigneeFull: string;
}

// ── Utilidades de fecha (semanas de soporte Vie → Jue, relevo el viernes) ──
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

/** HelpDesk Semanal: rotación de soporte por semana (Vie→Jue). Port de js/semanal.js. */
@Component({
  selector: 'app-semanal',
  imports: [FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule],
  templateUrl: './semanal.html',
  styleUrl: './semanal.scss',
})
export class Semanal {
  private readonly data = inject(DataService);
  private readonly auth = inject(AuthService);
  private readonly hd = inject(HelpdeskService);
  private readonly dialog = inject(MatDialog);
  private readonly theme = inject(ThemeService);
  private readonly colores = inject(ColoresService);

  // ── Multi-equipo: selector de equipo/tablero + miembros del equipo para el picker ──
  readonly boards = computed(() => this.data.boards());
  readonly semanalTeam = signal('');
  /** Miembros del equipo seleccionado (opciones del picker de la rotación). */
  readonly memberOptions = signal<{ id: string; name: string }[]>([]);
  readonly mostrarSelector = computed(() => this.data.usesQuarkus() && this.boards().length > 1);

  readonly DAY_LABELS = DAY_LABELS;

  readonly viewMonth = signal(new Date(today().getFullYear(), today().getMonth(), 1));
  readonly ticketsWeekKey = signal(isoKey(getWeekFriday(today())));
  /** Trigger de recálculo tras mutar el soporte semanal (no es signal en DataService). */
  private readonly rev = signal(0);

  ticketId = '';
  ticketDesc = '';

  constructor() {
    // Catálogo de empleados del HelpDesk (para resolver el nombre de cualquier asignado).
    this.hd.getHdUsers();
    // Carga los datos, entra al equipo del usuario y trae su rotación + miembros.
    this.data.ensureInit().then(() => this.initTeams());
  }

  /** Carga los tableros visibles (RE = su equipo; ADMIN = todos) y entra al primero. */
  private async initTeams(): Promise<void> {
    if (!this.data.usesQuarkus()) {
      this.memberOptions.set(this.data.team().map((m) => ({ id: m.id, name: m.name })));
      this.rev.update((v) => v + 1);
      return;
    }
    let list = this.data.boards();
    if (!list.length) list = await this.data.loadBoards(this.auth.session()?.id ?? null);
    await this.selectTeam(list[0]?.codigo ?? '');
  }

  /** Cambia el equipo de la rotación: carga SUS semanas y SUS miembros (picker). */
  async selectTeam(codigo: string): Promise<void> {
    this.semanalTeam.set(codigo);
    await this.data.loadWeekly(codigo);
    this.memberOptions.set(await this.data.teamMembers(codigo));
    this.rev.update((v) => v + 1);
  }


  /** Nombre del asignado: por los miembros del equipo cargados; si no, por el catálogo del HelpDesk.
   *  Regla #8: si no resuelve, NUNCA devolver el código; usar placeholder neutro. */
  private memberName(id: string): string {
    return this.memberOptions().find((m) => m.id === id)?.name
      || this.hd.hdUsers().find((u) => String(u.id) === String(id))?.name
      || '—';
  }
  private memberShort(id: string): string { return this.memberName(id).split(' ')[0]; }
  private memberFull(id: string): string { return this.memberName(id); }
  /**
   * Color de quien tiene la semana. Se resuelve POR PERSONA, no contra la lista del selector.
   *
   * Antes se buscaba en un mapa construido desde `memberOptions()` —los que se pueden ASIGNAR— y
   * eso dejaba sin color a cualquiera que tuviera una semana sin estar en esa lista: p. ej. alguien
   * con rol GERENCIA de alcance global, que no es miembro de equipo ni especialista y por tanto
   * `equipo-miembros` nunca devuelve. Su chip caía al gris neutro pese a tener color propio.
   * `ColoresService` conoce a TODO el mundo (viene de /api/legacy/users), así que resuelve siempre.
   */
  private colorOf(id: string): Color {
    const hid = String(id || '').trim();
    if (!hid) return this.theme.esOscuro() ? NEUTRAL_DARK : NEUTRAL;
    return this.colores.chip(hid);
  }

  readonly periodLabel = computed(() => `${MONTHS_ES[this.viewMonth().getMonth()]} ${this.viewMonth().getFullYear()}`);

  readonly calendarCells = computed<SemCell[]>(() => {
    this.rev();
    const vm = this.viewMonth();
    const first = new Date(vm.getFullYear(), vm.getMonth(), 1);
    const gridStart = addDays(first, -first.getDay());
    const t = today();
    const curKey = isoKey(getWeekFriday(t));
    const assigns = this.data.getWeeklySupport();
    const cells: SemCell[] = [];
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
        assigned: !!assign,
        color: assign ? this.colorOf(assign.assignee) : null,
        assigneeShort: assign ? this.memberShort(assign.assignee) : '',
        assigneeFull: assign ? this.memberFull(assign.assignee) : '',
      });
    }
    return cells;
  });

  readonly currentWeek = computed(() => {
    this.rev();
    const fri = getWeekFriday(today());
    const key = isoKey(fri);
    const assign = this.data.getWeekAssignment(key);
    return {
      key,
      range: formatRange(fri),
      name: assign ? this.memberFull(assign.assignee) : 'Sin asignar',
      color: assign ? this.colorOf(assign.assignee) : null,
    };
  });

  readonly nextWeeks = computed(() => {
    this.rev();
    const fri = getWeekFriday(today());
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const wkFri = addDays(fri, i * 7);
      const key = isoKey(wkFri);
      const assign = this.data.getWeekAssignment(key);
      arr.push({
        key,
        range: formatRange(wkFri),
        assigned: !!assign,
        short: assign ? this.memberShort(assign.assignee) : '',
        full: assign ? this.memberFull(assign.assignee) : '',
        color: assign ? this.colorOf(assign.assignee) : null,
      });
    }
    return arr;
  });
  readonly nextCount = computed(() => this.nextWeeks().filter((w) => w.assigned).length);

  readonly stats = computed(() => {
    this.rev();
    const assigns = this.data.getWeeklySupport();
    const m: Record<string, number> = {};
    Object.values(assigns).forEach((a: any) => { if (a?.assignee) m[a.assignee] = (m[a.assignee] || 0) + 1; });
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ id, name: this.memberFull(id), count, color: this.colorOf(id) }));
  });

  readonly selectedWeek = computed(() => {
    this.rev();
    const key = this.ticketsWeekKey();
    const assign = this.data.getWeekAssignment(key);
    return {
      key,
      range: formatRange(parseISO(key)),
      short: assign ? this.memberShort(assign.assignee) : '',
      color: assign ? this.colorOf(assign.assignee) : null,
    };
  });
  readonly weekTickets = computed(() => { this.rev(); return this.data.getWeekTickets(this.ticketsWeekKey()) as { id: string; desc: string }[]; });

  // ── Acciones ──
  prevMonth(): void { const v = this.viewMonth(); this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() - 1, 1)); }
  nextMonth(): void { const v = this.viewMonth(); this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() + 1, 1)); }
  goToday(): void { const t = today(); this.viewMonth.set(new Date(t.getFullYear(), t.getMonth(), 1)); }

  selectWeek(key: string): void { this.ticketsWeekKey.set(key); }

  onCellClick(cell: SemCell): void {
    this.ticketsWeekKey.set(cell.weekKey);
    this.openAssign(cell.weekKey);
  }

  async openAssign(key: string): Promise<void> {
    const existing = this.data.getWeekAssignment(key);
    const res = (await firstValueFrom(
      this.dialog
        .open(SemanalAssignDialog, {
          data: {
            range: formatRange(parseISO(key)),
            team: this.memberOptions(),
            assignee: existing?.assignee || '',
            notes: existing?.notes || '',
            hasExisting: !!existing,
          },
          width: '440px',
          maxWidth: '95vw',
        })
        .afterClosed(),
    )) as SemAssignResult | undefined;
    if (!res) return;
    if ('clear' in res) this.data.clearWeekAssignment(key);
    else this.data.setWeekAssignment(key, res.assignee, res.notes);
    this.rev.update((v) => v + 1);
  }

  addTicket(): void {
    const id = this.ticketId.trim();
    if (!id) return;
    this.data.addWeekTicket(this.ticketsWeekKey(), id, this.ticketDesc);
    this.ticketId = '';
    this.ticketDesc = '';
    this.rev.update((v) => v + 1);
  }

  removeTicket(idx: number): void {
    this.data.removeWeekTicket(this.ticketsWeekKey(), idx);
    this.rev.update((v) => v + 1);
  }
}
