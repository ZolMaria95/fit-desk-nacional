import { Component, ElementRef, afterRenderEffect, computed, inject, viewChild } from '@angular/core';
import { DataService, Sprint, Story } from '../../core/services/data.service';

interface Metric { label: string; value: string; sub: string; cls: string; }
interface VelBar { name: string; count: number; current: boolean; }

const MS_DAY = 864e5;
const CW = 760; // ancho del buffer del canvas
const CH = 260; // alto

/** Burndown: métricas del sprint + gráfico + velocidad del equipo. Port de js/burndown.js. */
@Component({
  selector: 'app-burndown',
  imports: [],
  templateUrl: './burndown.html',
  styleUrl: './burndown.scss',
})
export class Burndown {
  private readonly data = inject(DataService);
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  readonly cw = CW;
  readonly ch = CH;

  readonly sprint = computed<Sprint | undefined>(() => this.data.getActiveSprint());
  readonly stories = computed<Story[]>(() => {
    const id = this.sprint()?.id;
    return id ? this.data.getStoriesBySprint(id) : []; // acotado al tablero actual
  });

  constructor() {
    this.data.ensureInit();
    // Redibuja el gráfico tras cada render y cuando cambian sprint/tareas.
    afterRenderEffect(() => {
      const sprint = this.sprint();
      const stories = this.stories();
      const canvas = this.canvasRef()?.nativeElement;
      if (canvas && sprint) this.draw(canvas, sprint, stories);
    });
  }

  // ── Métricas ──
  readonly metrics = computed<Metric[]>(() => {
    const sprint = this.sprint();
    const stories = this.stories();
    if (!sprint) return [];
    const total = stories.length;
    const done = stories.filter((s) => s.status === 'done').length;
    const inProgress = stories.filter((s) => s.status === 'in_progress').length;
    const pending = stories.filter((s) => s.status === 'todo').length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const start = new Date(sprint.start + 'T00:00:00').getTime();
    const end = new Date(sprint.end + 'T00:00:00').getTime();
    const now = Date.now();
    const totalDays = Math.ceil((end - start) / MS_DAY) + 1;
    const elapsedDays = Math.min(Math.ceil((now - start) / MS_DAY) + 1, totalDays);
    const daysLeft = Math.max(0, Math.ceil((end - now) / MS_DAY));
    const statusCls = pct >= 80 ? 'ok' : pct >= 50 ? 'warn' : 'error';

    return [
      { label: 'Completadas', value: `${pct}%`, sub: `${done} / ${total} tareas`, cls: statusCls },
      { label: 'En Progreso', value: String(inProgress), sub: `tarea${inProgress !== 1 ? 's' : ''} en curso`, cls: 'warn' },
      { label: 'Pendientes', value: String(pending), sub: `tarea${pending !== 1 ? 's' : ''} sin iniciar`, cls: '' },
      { label: 'Días restantes', value: String(daysLeft), sub: `Día ${elapsedDays} de ${totalDays}`, cls: daysLeft <= 2 ? 'warn' : '' },
    ];
  });

  // ── Velocidad del equipo (tareas finalizadas por sprint) ──
  readonly velocity = computed<VelBar[]>(() => {
    const all = this.data.sprints().sprints;
    const bars: VelBar[] = all
      .filter((s) => s.status === 'completed')
      .map((s) => ({ name: s.name, count: this.data.getStoriesBySprint(s.id).filter((t) => t.status === 'done').length, current: false }));
    const active = all.find((s) => s.status === 'active');
    if (active) bars.push({ name: active.name, count: this.data.getStoriesBySprint(active.id).filter((t) => t.status === 'done').length, current: true });
    return bars;
  });
  readonly velMax = computed(() => Math.max(...this.velocity().map((b) => b.count), 1));

  // ── Dibujo del gráfico (canvas 2D) ──
  private draw(canvas: HTMLCanvasElement, sprint: Sprint, stories: Story[]): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const total = stories.length;
    const start = new Date(sprint.start + 'T00:00:00');
    const end = new Date(sprint.end + 'T00:00:00');

    const days: Date[] = [];
    for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(new Date(d));
    if (days.length < 2 || total === 0) { ctx.clearRect(0, 0, CW, CH); return; }

    const n = days.length - 1;
    const ideal = days.map((_, i) => total - (total / n) * i);
    const elapsed = Math.min(Math.max(0, Math.ceil((Date.now() - start.getTime()) / MS_DAY)), n);
    const done = stories.filter((s) => s.status === 'done').length;
    // Curva real aproximada (no se guardan snapshots diarios): arranque lento + aceleración.
    const actual = days.map((_, i) => {
      if (i > elapsed) return null;
      const t = elapsed ? i / elapsed : 0;
      const burnt = done * (t < 0.3 ? t * 0.5 : 0.15 + (t - 0.3) * 1.21);
      return Math.max(0, Math.round(total - burnt));
    });

    const PL = 50, PR = 24, PT = 16, PB = 36;
    const cw = CW - PL - PR, ch = CH - PT - PB;
    const x = (i: number) => PL + (i / (days.length - 1)) * cw;
    const y = (v: number) => PT + ch - (v / total) * ch;

    ctx.clearRect(0, 0, CW, CH);

    // Grid + eje Y
    ctx.font = '11px Roboto, sans-serif';
    [0, 0.25, 0.5, 0.75, 1].forEach((t) => {
      const yy = PT + ch * t;
      ctx.strokeStyle = '#E8E8EE';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PL, yy); ctx.lineTo(PL + cw, yy); ctx.stroke();
      ctx.fillStyle = '#8A8A9A';
      ctx.textAlign = 'right';
      ctx.fillText(String(Math.round(total * (1 - t))), PL - 6, yy + 4);
    });

    // Eje X
    ctx.fillStyle = '#8A8A9A';
    ctx.textAlign = 'center';
    days.forEach((d, i) => {
      if (i % 2 === 0 || i === days.length - 1) ctx.fillText(`${d.getDate()}/${d.getMonth() + 1}`, x(i), CH - 8);
    });

    // Línea ideal (punteada)
    ctx.strokeStyle = '#D0D0DA';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ideal.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), y(v)) : ctx.lineTo(x(i), y(v))));
    ctx.stroke();
    ctx.setLineDash([]);

    // Línea real
    ctx.strokeStyle = '#04BAF0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    actual.forEach((v, i) => {
      if (v === null) return;
      if (!started) { ctx.moveTo(x(i), y(v)); started = true; } else ctx.lineTo(x(i), y(v));
    });
    ctx.stroke();

    // Punto "hoy"
    let li = -1;
    for (let i = actual.length - 1; i >= 0; i--) if (actual[i] !== null) { li = i; break; }
    if (li >= 0) {
      ctx.fillStyle = '#04BAF0';
      ctx.beginPath(); ctx.arc(x(li), y(actual[li]!), 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(x(li), y(actual[li]!), 2.5, 0, Math.PI * 2); ctx.fill();
    }
  }
}
