import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Vacacion, VacacionInput } from '../../../core/services/vacaciones.service';
import { wireDialogEsc } from '../../../core/dialog-esc';

export interface VacacionDialogData {
  /** Empleados a los que el actor puede registrar (para el selector). */
  empleados: { id: string; name: string }[];
  /** Si viene, el empleado queda FIJO (registro propio o edición); no se puede cambiar. */
  fijoHid: string | null;
  /** Fecha de inicio prefijada (día seleccionado). */
  fechaInicio: string;
  /** Registro a editar, o null para crear. */
  registro: Vacacion | null;
}
export type VacacionDialogResult = { input: VacacionInput } | { eliminar: true };

function parseISO(k: string): Date { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); }
function isoKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function addDays(k: string, n: number): string { const d = parseISO(k); d.setDate(d.getDate() + n); return isoKey(d); }
function fmt(k: string): string {
  const M = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const d = parseISO(k); return `${d.getDate()} ${M[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Registrar/editar un período de vacaciones o permiso. El usuario elige empleado (si puede),
 * fecha de inicio y **días laborables**; el diálogo calcula en vivo los **días de vacaciones**
 * (factor 1,36) y la **fecha fin** (días de vacaciones = días de calendario). Avisos suaves:
 * incluir un fin de semana (lineamiento 4) y períodos de 15 días (lineamiento 10).
 */
@Component({
  selector: 'app-vacacion-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>{{ data.registro ? 'Editar' : 'Registrar' }} {{ tipo() === 'PERMISO' ? 'permiso' : 'vacaciones' }}</h2>
    <mat-dialog-content class="vd">
      <!-- Empleado -->
      @if (data.fijoHid) {
        <div class="vd-fixed"><mat-icon>person</mat-icon><span>{{ nombreFijo() }}</span></div>
      } @else {
        <mat-form-field appearance="outline" class="full">
          <mat-label>Empleado</mat-label>
          <mat-select [ngModel]="empleadoHid()" (ngModelChange)="empleadoHid.set($event)" (closed)="buscarEmp.set('')" panelClass="vd-emp-panel">
            <div class="vd-sel-search" (click)="$event.stopPropagation()">
              <mat-icon>search</mat-icon>
              <input [ngModel]="buscarEmp()" (ngModelChange)="buscarEmp.set($event)" (keydown)="$event.stopPropagation()"
                     (keydown.space)="$event.stopPropagation()" placeholder="Buscar empleado…" autocomplete="off" aria-label="Buscar empleado" />
            </div>
            @for (e of empleadosFiltrados(); track e.id) { <mat-option [value]="e.id">{{ e.name }}</mat-option> }
            @empty { <mat-option [value]="empleadoHid()" disabled>Sin coincidencias</mat-option> }
          </mat-select>
        </mat-form-field>
      }

      <!-- Tipo -->
      <div class="vd-seg" role="radiogroup" aria-label="Tipo">
        <button type="button" role="radio" [attr.aria-checked]="tipo() === 'VACACIONES'" [class.on]="tipo() === 'VACACIONES'" (click)="tipo.set('VACACIONES')">Vacaciones</button>
        <button type="button" role="radio" [attr.aria-checked]="tipo() === 'PERMISO'" [class.on]="tipo() === 'PERMISO'" (click)="tipo.set('PERMISO')">Permiso c/cargo</button>
      </div>

      <div class="vd-grid">
        <label class="vd-field">
          <span class="vd-lbl">Fecha de inicio</span>
          <input type="date" [ngModel]="fechaInicio()" (ngModelChange)="fechaInicio.set($event)" />
        </label>
        @if (esPermiso()) {
          <label class="vd-field">
            <span class="vd-lbl">Días laborables</span>
            <input type="number" min="1" max="60" [ngModel]="diasLaborables()" (ngModelChange)="diasLaborables.set(+$event || 0)" />
          </label>
        } @else {
          <label class="vd-field">
            <span class="vd-lbl">Fecha de fin</span>
            <input type="date" [ngModel]="fechaFin()" (ngModelChange)="fechaFin.set($event)" [min]="fechaInicio()" />
          </label>
        }
      </div>

      <!-- Resultado: en PERMISO aplica el factor 1,36; en VACACIONES es el rango de calendario. -->
      <div class="vd-calc">
        <div><span class="k">Días de vacaciones</span><span class="v">{{ diasVac() }}</span></div>
        @if (esPermiso()) {
          <div><span class="k">Termina</span><span class="v">{{ fechaFinEfectiva() ? fmt(fechaFinEfectiva()) : '—' }}</span></div>
          <p class="vd-formula">{{ diasLaborables() }} laborables × 1,36 = {{ diasVac() }} días (permiso con cargo).</p>
        } @else {
          <p class="vd-formula">Rango de calendario: {{ diasVac() }} {{ diasVac() === 1 ? 'día' : 'días' }} (incluye laborables y no laborables).</p>
        }
      </div>

      @if (avisoFinde()) { <div class="vd-warn"><mat-icon>info</mat-icon> El período no incluye un fin de semana (lineamiento 4).</div> }
      @if (avisoQuince()) { <div class="vd-warn"><mat-icon>info</mat-icon> La regla general son períodos de 15 días; menos requiere acuerdo/necesidad operativa.</div> }

      <mat-form-field appearance="outline" class="full">
        <mat-label>Observaciones (opcional)</mat-label>
        <textarea matInput rows="2" [ngModel]="nota()" (ngModelChange)="nota.set($event)" placeholder="Detalle, acuerdo, etc."></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      @if (data.registro) {
        <button mat-button class="danger" (click)="ref.close({ eliminar: true })">Eliminar</button>
        <span class="spacer"></span>
      }
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="guardar()" [disabled]="!valido()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .vd { min-width: 320px; display: flex; flex-direction: column; gap: 10px; }
    .full { width: 100%; }
    .vd-fixed { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; background: #eaf4fb; color: var(--brand-dark, #0390bc); border-radius: 16px; padding: 5px 12px; align-self: flex-start; }
    .vd-fixed mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .vd-seg { display: flex; gap: 6px; }
    .vd-seg button { flex: 1; border: 1px solid var(--mat-sys-outline, #bdbdbd); background: #fff; border-radius: 8px; padding: 8px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--mat-sys-on-surface-variant); }
    .vd-seg button.on { border-color: var(--brand, #048abf); background: color-mix(in srgb, var(--brand,#048abf) 12%, #fff); color: var(--brand-dark, #0390bc); }
    .vd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .vd-field { display: flex; flex-direction: column; gap: 4px; }
    .vd-lbl { font-size: 12px; color: var(--mat-sys-on-surface-variant); }
    .vd-field input { font: inherit; padding: 8px; border: 1px solid var(--mat-sys-outline, #bdbdbd); border-radius: 8px; outline: none; }
    .vd-field input:focus { border-color: var(--brand, #048abf); }
    .vd-calc { background: var(--mat-sys-surface-container-low, #f0f4f9); border-radius: 10px; padding: 8px 12px; }
    .vd-calc > div { display: flex; justify-content: space-between; align-items: baseline; }
    .vd-calc .k { font-size: 12px; color: var(--mat-sys-on-surface-variant); }
    .vd-calc .v { font-size: 16px; font-weight: 700; color: var(--brand-dark, #0390bc); }
    .vd-formula { margin: 4px 0 0; font-size: 11px; color: var(--mat-sys-on-surface-variant); }
    .vd-warn { display: flex; align-items: flex-start; gap: 6px; font-size: 12px; color: #92400e; background: #fef3c7; border-radius: 8px; padding: 6px 10px; }
    .vd-warn mat-icon { font-size: 17px; width: 17px; height: 17px; }
    .spacer { flex: 1 1 auto; }
    .danger { color: var(--mat-sys-error); }
    .vd-sel-search { display: flex; align-items: center; gap: 6px; padding: 6px 10px; position: sticky; top: 0; background: #fff; border-bottom: 1px solid var(--mat-sys-outline-variant, #e0e0e0); z-index: 2; }
    .vd-sel-search mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--mat-sys-on-surface-variant); }
    .vd-sel-search input { flex: 1; min-width: 0; border: none; outline: none; font: inherit; font-size: 13px; background: transparent; color: inherit; }
  `,
})
export class VacacionDialog {
  readonly ref = inject(MatDialogRef<VacacionDialog>);
  readonly data = inject<VacacionDialogData>(MAT_DIALOG_DATA);

  readonly empleadoHid = signal(this.data.fijoHid ?? this.data.registro?.usuarioHid ?? '');
  readonly buscarEmp = signal('');
  /** Empleados filtrados por el buscador del selector (LOV con muchas personas). */
  readonly empleadosFiltrados = computed(() => {
    const q = this.buscarEmp().toLowerCase().trim();
    return q ? this.data.empleados.filter((e) => e.name.toLowerCase().includes(q)) : this.data.empleados;
  });
  readonly tipo = signal<'VACACIONES' | 'PERMISO'>(this.data.registro?.tipo ?? 'VACACIONES');
  readonly fechaInicio = signal(this.data.registro?.fechaInicio ?? this.data.fechaInicio);
  /** Fecha fin: la elige el usuario en VACACIONES; en PERMISO se calcula (ver fechaFinEfectiva). */
  readonly fechaFin = signal(this.data.registro?.fechaFin ?? this.data.registro?.fechaInicio ?? this.data.fechaInicio);
  /** Días laborables: solo se ingresan en PERMISO (base del factor 1,36). */
  readonly diasLaborables = signal(this.data.registro?.diasLaborables || 5);
  readonly nota = signal(this.data.registro?.nota ?? '');

  readonly fmt = fmt;

  constructor() {
    wireDialogEsc(this.ref);
    // Si el empleado es fijo, mantener el valor sincronizado.
    if (this.data.fijoHid) this.empleadoHid.set(this.data.fijoHid);
  }

  nombreFijo(): string {
    const hid = this.data.fijoHid;
    return this.data.empleados.find((e) => e.id === hid)?.name || this.data.registro?.empleado || hid || '—';
  }

  readonly esPermiso = computed(() => this.tipo() === 'PERMISO');

  /** Días de vacaciones: PERMISO = días laborables × 1,36; VACACIONES = días de calendario del rango. */
  readonly diasVac = computed(() => {
    if (this.esPermiso()) return Math.round(Math.max(0, this.diasLaborables() || 0) * 1.36);
    const ini = this.fechaInicio(); const fin = this.fechaFin();
    if (!ini || !fin || fin < ini) return 0;
    return Math.round((parseISO(fin).getTime() - parseISO(ini).getTime()) / 86400000) + 1;
  });
  /** Fecha fin efectiva: en VACACIONES es la elegida; en PERMISO se deriva de los días. */
  readonly fechaFinEfectiva = computed(() => {
    if (!this.esPermiso()) return this.fechaFin();
    const ini = this.fechaInicio(); const n = this.diasVac();
    return ini && n > 0 ? addDays(ini, n - 1) : '';
  });

  /** Aviso: el período no incluye sábado ni domingo (lineamiento 4). */
  readonly avisoFinde = computed(() => {
    const ini = this.fechaInicio(); const fin = this.fechaFinEfectiva();
    if (!ini || !fin) return false;
    let d = parseISO(ini); const end = parseISO(fin);
    while (d <= end) { const g = d.getDay(); if (g === 0 || g === 6) return false; d = new Date(d.getTime() + 86400000); }
    return true;
  });
  /** Aviso: menos de 15 días (regla general de período completo, solo vacaciones). */
  readonly avisoQuince = computed(() => !this.esPermiso() && this.diasVac() > 0 && this.diasVac() < 15);

  valido(): boolean {
    if (!this.empleadoHid() || !this.fechaInicio()) return false;
    if (this.esPermiso()) return this.diasLaborables() >= 1;
    const fin = this.fechaFin();
    return !!fin && fin >= this.fechaInicio(); // comparación ISO (aaaa-mm-dd) directa
  }

  guardar(): void {
    if (!this.valido()) return;
    const input: VacacionInput = {
      usuarioHid: this.empleadoHid(),
      fechaInicio: this.fechaInicio(),
      fechaFin: this.fechaFinEfectiva(),
      // Días laborables solo tiene sentido en PERMISO; en VACACIONES el backend cuenta los del rango.
      diasLaborables: this.esPermiso() ? this.diasLaborables() : 0,
      tipo: this.tipo(),
      nota: (this.nota() || '').trim() || undefined,
    };
    this.ref.close({ input });
  }
}
