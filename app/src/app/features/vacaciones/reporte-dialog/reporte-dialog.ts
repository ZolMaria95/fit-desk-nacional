import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { descargarBlob } from '../../../core/descargar';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { ColoresService } from '../../../core/services/colores.service';
import { Vacacion } from '../../../core/services/vacaciones.service';

export interface ReporteDialogData {
  vacaciones: Vacacion[];
  equipos: { id: number; nombre: string }[];
  /** Alcance inicial: null = Nacional; un id = ese equipo (según la vista abierta). */
  alcanceInicial: number | null;
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGO = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_MINI = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

/** Color por empleado: viene de `ColoresService` (el mismo que usa el resto de la app — Board,
 *  Tickets, Vacaciones, Semanal), NO de una paleta propia. `NEUTRAL` es el único fallback local,
 *  para el caso sin `usuarioHid`/`empleado` (casi idéntico al `SIN_ASIGNAR` del servicio). */
const NEUTRAL = { bg: '#F2F2F2', fg: '#4A4A6A' };
type Color = { bg: string; fg: string };

function parseISO(k: string): Date { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); }
function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function fmtDate(k: string): string {
  const d = parseISO(k);
  return `${String(d.getDate()).padStart(2, '0')}/${MESES[d.getMonth()]}/${d.getFullYear()}`;
}
function hexRgb(hex: string): [number, number, number] {
  const h = (hex || '#000000').replace('#', '');
  return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0];
}

interface Fila {
  empleado: string; equipo: string; tipo: string; tipoLabel: string;
  desde: string; hasta: string; diasLaborables: number; diasVacacion: number; horas: number | null; estado: string;
}

/** Etiqueta legible del tipo — 3 ramas (antes 2). Reusada en tabla, CSV y PDF. */
function tipoLabelDe(v: Vacacion): string {
  return v.tipo === 'PERMISO' ? 'Permiso' : v.tipo === 'PERMISO_HORAS' ? `Permiso (${v.horas}h)` : 'Vacaciones';
}
interface CalCell { day: number; other: boolean; today: boolean; dots: { color: Color; name: string }[]; more: number; has: boolean; }
interface MesCal { label: string; cells: CalCell[]; }

/**
 * Reporte de vacaciones/permisos. Dos hojas: **Tabla** (períodos en un rango de fechas, ordenados por
 * fecha de inicio DESC) + **Calendario** (del mes actual a fin de año, con las vacaciones pintadas).
 * Exporta **CSV** y **PDF** (jsPDF, cargado dinámicamente) en botones independientes; sin impresión.
 */
@Component({
  selector: 'app-reporte-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './reporte-dialog.html',
  styleUrl: './reporte-dialog.scss',
})
export class ReporteDialog {
  private readonly ref = inject(MatDialogRef<ReporteDialog>);
  private readonly colores = inject(ColoresService);
  readonly data = inject<ReporteDialogData>(MAT_DIALOG_DATA);
  readonly equipos = this.data.equipos;
  readonly DIAS_MINI = DIAS_MINI;

  readonly vista = signal<'tabla' | 'calendario'>('tabla');
  // Rango por defecto: el año en curso (para la hoja Tabla).
  readonly desde = signal(isoOf(new Date(new Date().getFullYear(), 0, 1)));
  readonly hasta = signal(isoOf(new Date(new Date().getFullYear(), 11, 31)));
  readonly alcance = signal<number | null>(this.data.alcanceInicial ?? null); // null = Nacional
  readonly tipo = signal<'todas' | 'VACACIONES' | 'PERMISO' | 'PERMISO_HORAS'>('todas');
  readonly rangoInvalido = computed(() => parseISO(this.hasta()) < parseISO(this.desde()));

  constructor() { wireDialogEsc(this.ref); }

  fmt(k: string): string { return fmtDate(k); }
  setVista(v: 'tabla' | 'calendario'): void { this.vista.set(v); }

  private overlap(v: Vacacion, ini: Date, fin: Date): boolean {
    return parseISO(v.fechaFin) >= ini && parseISO(v.fechaInicio) <= fin;
  }

  /** Filas de la TABLA: solape con el rango + alcance + tipo, ordenadas por fecha de inicio ASC. */
  readonly filas = computed<Fila[]>(() => {
    if (this.rangoInvalido()) return [];
    const ini = parseISO(this.desde()); const fin = parseISO(this.hasta());
    const eq = this.alcance(); const tf = this.tipo();
    return this.data.vacaciones
      .filter((v) => this.overlap(v, ini, fin))
      .filter((v) => eq == null || v.equipoId === eq)
      .filter((v) => tf === 'todas' || v.tipo === tf)
      .sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio) || (a.empleado || '').localeCompare(b.empleado || ''))
      .map((v) => ({
        empleado: v.empleado || '—',
        equipo: v.equipo || '—',
        tipo: v.tipo,
        tipoLabel: tipoLabelDe(v),
        desde: v.fechaInicio,
        hasta: v.fechaFin,
        diasLaborables: v.diasLaborables || 0,
        diasVacacion: v.diasVacacion || 0,
        horas: v.horas,
        estado: v.estado || '',
      }));
  });

  readonly resumen = computed(() => {
    const map = new Map<string, { empleado: string; equipo: string; periodos: number; diasVac: number; diasPerm: number; horasPerm: number }>();
    for (const f of this.filas()) {
      const e = map.get(f.empleado) || { empleado: f.empleado, equipo: f.equipo, periodos: 0, diasVac: 0, diasPerm: 0, horasPerm: 0 };
      e.periodos++;
      if (f.tipo === 'PERMISO_HORAS') e.horasPerm += f.horas || 0;
      else if (f.tipo === 'PERMISO') e.diasPerm += f.diasVacacion;
      else e.diasVac += f.diasVacacion;
      map.set(f.empleado, e);
    }
    return [...map.values()].sort((a, b) => a.empleado.localeCompare(b.empleado));
  });

  readonly totales = computed(() => {
    const filas = this.filas();
    return {
      periodos: filas.length,
      empleados: new Set(filas.map((f) => f.empleado)).size,
      diasVac: filas.filter((f) => f.tipo === 'VACACIONES').reduce((s, f) => s + f.diasVacacion, 0),
      diasPerm: filas.filter((f) => f.tipo === 'PERMISO').reduce((s, f) => s + f.diasVacacion, 0),
      horasPerm: filas.filter((f) => f.tipo === 'PERMISO_HORAS').reduce((s, f) => s + (f.horas || 0), 0),
    };
  });

  // ── Hoja CALENDARIO (mes actual → fin de año; alcance + tipo, sin el rango) ──
  private readonly vacsScope = computed<Vacacion[]>(() => {
    const eq = this.alcance(); const tf = this.tipo();
    return this.data.vacaciones
      .filter((v) => eq == null || v.equipoId === eq)
      .filter((v) => tf === 'todas' || v.tipo === tf);
  });

  /** Color de la persona vía `ColoresService` (resuelto POR PERSONA, no contra una lista
   *  precalculada) — mismo criterio que `vacaciones.ts:158-161`, así el color: (a) es el que la
   *  persona eligió en su perfil, no uno asignado por orden de aparición, y (b) no cambia si se
   *  cambia el filtro de equipo/tipo del reporte. */
  private colorOf(v: Vacacion): Color {
    const hid = v.usuarioHid || v.empleado || '';
    return hid ? this.colores.chip(hid) : NEUTRAL;
  }

  /** Empleados del alcance con su color, para la leyenda del calendario. */
  readonly leyendaCal = computed(() => {
    const seen = new Set<string>(); const out: { name: string; color: Color }[] = [];
    for (const v of this.vacsScope()) {
      const k = v.usuarioHid || v.empleado || '';
      if (k && !seen.has(k)) { seen.add(k); out.push({ name: v.empleado || '—', color: this.colorOf(v) }); }
    }
    return out.sort((a, b) => a.name.localeCompare(b.name));
  });

  readonly meses = computed<MesCal[]>(() => {
    const now = new Date(); const year = now.getFullYear();
    const t0 = new Date(); t0.setHours(0, 0, 0, 0);
    const vacs = this.vacsScope();
    const out: MesCal[] = [];
    for (let m = now.getMonth(); m <= 11; m++) {
      const first = new Date(year, m, 1);
      const gridStart = new Date(year, m, 1 - first.getDay());
      const cells: CalCell[] = [];
      for (let i = 0; i < 42; i++) {
        const date = new Date(gridStart); date.setDate(gridStart.getDate() + i);
        const activos = vacs.filter((v) => date >= parseISO(v.fechaInicio) && date <= parseISO(v.fechaFin));
        cells.push({
          day: date.getDate(),
          other: date.getMonth() !== m,
          today: date.getFullYear() === t0.getFullYear() && date.getMonth() === t0.getMonth() && date.getDate() === t0.getDate(),
          dots: activos.slice(0, 4).map((v) => ({
            color: this.colorOf(v),
            name: `${v.empleado} · ${tipoLabelDe(v)} (${fmtDate(v.fechaInicio)} → ${fmtDate(v.fechaFin)})`,
          })),
          more: Math.max(0, activos.length - 4),
          has: activos.length > 0,
        });
      }
      out.push({ label: `${MESES_LARGO[m]} ${year}`, cells });
    }
    return out;
  });

  private alcanceLabel(): string {
    const eq = this.alcance();
    return eq == null ? 'Nacional' : this.equipos.find((e) => e.id === eq)?.nombre || 'Equipo';
  }

  /** Descarga un CSV (con BOM para que Excel respete acentos). */
  descargarCsv(): void {
    const q = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
    const lines = [['Empleado', 'Equipo', 'Tipo', 'Desde', 'Hasta', 'Días laborables', 'Días', 'Horas', 'Estado'].map(q).join(',')];
    for (const f of this.filas()) {
      lines.push([f.empleado, f.equipo, f.tipoLabel, f.desde, f.hasta, f.diasLaborables, f.diasVacacion, f.horas ?? '', f.estado].map(q).join(','));
    }
    const t = this.totales();
    lines.push('');
    lines.push([q('TOTAL'), q(`${t.periodos} períodos`), q(`${t.empleados} empleados`), '', '', '', q(`Vac: ${t.diasVac}`), q(`Permiso: ${t.diasPerm}`), q(`Horas: ${t.horasPerm}`)].join(','));
    const csv = '﻿' + lines.join('\r\n');
    this.descargar(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `reporte-vacaciones_${this.desde()}_a_${this.hasta()}.csv`);
  }

  /** Genera y descarga un PDF (jsPDF + autotable, cargados dinámicamente). Sin diálogo de impresión. */
  async descargarPdf(): Promise<void> {
    const [{ jsPDF }, autoTableMod] = await Promise.all([import('jspdf'), import('jspdf-autotable')]);
    const autoTable = ((autoTableMod as any).default || (autoTableMod as any).autoTable) as (doc: unknown, opts: unknown) => void;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const brand: [number, number, number] = [10, 134, 184];

    doc.setFontSize(15); doc.setTextColor(20);
    doc.text('Reporte de vacaciones y permisos', 40, 42);
    doc.setFontSize(10); doc.setTextColor(90);
    doc.text(`Alcance: ${this.alcanceLabel()}   ·   Rango: ${fmtDate(this.desde())} — ${fmtDate(this.hasta())}   ·   Generado: ${fmtDate(isoOf(new Date()))}`, 40, 60);

    autoTable(doc, {
      startY: 74,
      head: [['Empleado', 'Equipo', 'Tipo', 'Desde', 'Hasta', 'Laborables', 'Días', 'Horas', 'Estado']],
      body: this.filas().map((f) => [f.empleado, f.equipo, f.tipoLabel, fmtDate(f.desde), fmtDate(f.hasta), f.diasLaborables, f.diasVacacion, f.horas ?? '—', f.estado]),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: brand, textColor: 255 },
      columnStyles: { 5: { halign: 'right' }, 6: { halign: 'right' }, 7: { halign: 'right' } },
    });

    const y = ((doc as any).lastAutoTable?.finalY ?? 80) + 22;
    doc.setFontSize(12); doc.setTextColor(20); doc.text('Resumen por empleado', 40, y);
    autoTable(doc, {
      startY: y + 8,
      head: [['Empleado', 'Equipo', 'Períodos', 'Días vacaciones', 'Días permiso', 'Horas permiso']],
      body: this.resumen().map((r) => [r.empleado, r.equipo, r.periodos, r.diasVac, r.diasPerm, r.horasPerm]),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: brand, textColor: 255 },
      columnStyles: { 2: { halign: 'right' }, 3: { halign: 'right' }, 4: { halign: 'right' }, 5: { halign: 'right' } },
    });

    const t = this.totales();
    const y2 = ((doc as any).lastAutoTable?.finalY ?? y) + 20;
    doc.setFontSize(10); doc.setTextColor(60);
    doc.text(`Totales: ${t.periodos} períodos · ${t.empleados} empleados · ${t.diasVac} días de vacaciones · ${t.diasPerm} días de permiso · ${t.horasPerm} horas de permiso.`, 40, y2);

    // Página con el CALENDARIO pintado (mes actual → fin de año).
    if (this.leyendaCal().length) this.dibujarCalendarioPdf(doc);

    doc.save(`reporte-vacaciones_${this.desde()}_a_${this.hasta()}.pdf`);
  }

  /** Dibuja, en una página nueva del PDF, los mini-calendarios (mes actual → fin de año) con las
   *  vacaciones pintadas: puntos de color por empleado en cada día (mismo dato que la hoja Calendario). */
  private dibujarCalendarioPdf(doc: any): void {
    doc.addPage();
    const pageW = doc.internal.pageSize.getWidth();
    const M = 40;
    doc.setFontSize(14); doc.setTextColor(20);
    doc.text('Calendario de vacaciones — del mes actual a fin de año', M, 40);

    // Leyenda (empleado + color), con wrap.
    doc.setFontSize(8);
    let lx = M, ly = 56;
    for (const p of this.leyendaCal()) {
      const [r, g, b] = hexRgb(p.color.fg);
      doc.setFillColor(r, g, b); doc.circle(lx + 3, ly - 2, 3, 'F');
      doc.setTextColor(40); doc.text(p.name, lx + 9, ly);
      lx += 9 + doc.getTextWidth(p.name) + 14;
      if (lx > pageW - 130) { lx = M; ly += 12; }
    }

    const cols = 3, gap = 14;
    const gridW = (pageW - 2 * M - (cols - 1) * gap) / cols;
    const cw = gridW / 7, ch = 14;
    const startY = ly + 16;
    const monthH = 18 /*label+dow*/ + 6 * ch + 12;
    const DOW = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

    this.meses().forEach((mes, k) => {
      const col = k % cols, row = Math.floor(k / cols);
      const ox = M + col * (gridW + gap);
      const oy = startY + row * monthH;
      doc.setFontSize(10); doc.setTextColor(20); doc.text(mes.label, ox, oy);
      doc.setFontSize(7); doc.setTextColor(120);
      DOW.forEach((d, i) => doc.text(d, ox + i * cw + cw / 2, oy + 12, { align: 'center' }));
      let cy = oy + 17;
      for (let w = 0; w < 6; w++) {
        for (let d = 0; d < 7; d++) {
          const c = mes.cells[w * 7 + d];
          const cx = ox + d * cw;
          doc.setDrawColor(224); doc.setLineWidth(0.4);
          if (c.has) { doc.setFillColor(233, 244, 249); doc.rect(cx, cy, cw - 1, ch - 1, 'FD'); }
          else { doc.rect(cx, cy, cw - 1, ch - 1, 'D'); }
          doc.setFontSize(6); doc.setTextColor(c.other ? 195 : 70);
          doc.text(String(c.day), cx + 2, cy + 5.5);
          if (c.dots.length) {
            let dx = cx + 3; const dy = cy + ch - 3.5;
            for (const dot of c.dots) {
              const [r, g, b] = hexRgb(dot.color.fg);
              doc.setFillColor(r, g, b); doc.circle(dx, dy, 1.3, 'F');
              dx += 3.4;
            }
          }
        }
        cy += ch;
      }
    });
  }

  private descargar(blob: Blob, nombre: string): void {
    descargarBlob(blob, nombre);
  }

  cerrar(): void { this.ref.close(); }
}
