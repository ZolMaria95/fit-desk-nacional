import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { nombrePropio } from '../../../core/colores';
import { HdUser } from '../../../core/services/helpdesk.service';

export interface STAssignData {
  range: string;
  /** Catálogo COMPLETO de empleados — la asignación es abierta a cualquiera, no solo al equipo. */
  empleados: HdUser[];
  mesaAyuda: string;
  emergentes: string;
  notes: string;
  hasExisting: boolean;
}
export type STAssignResult = { mesaAyuda: string; emergentes: string; notes: string } | { clear: true };

/** Modal para asignar/editar los 2 roles de la semana de Senior de Turno (Mesa de Ayuda +
 *  Emergentes). Clon de `SemanalAssignDialog`, pero el picker es el catálogo completo de
 *  empleados (sin restricción de equipo ni grupo "Soporte nacional": acá todo el mundo es
 *  asignable siempre) — con buscador dentro del `mat-select`, mismo patrón que
 *  `features/admin/crear-asignacion-dialog.ts` (`.opt-buscar`, `stopPropagation` para que el
 *  select no se cierre al escribir). Un buscador POR ROL: si compartieran uno solo, el texto
 *  tipeado para Mesa de Ayuda quedaría pisando el de Emergentes al abrir el otro select. */
@Component({
  selector: 'app-senior-turno-assign-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <h2 mat-dialog-title>Asignar semana</h2>
    <mat-dialog-content class="st-dlg">
      <div class="range-pill">{{ data.range }}</div>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Mesa de Ayuda</mat-label>
        <mat-select [(ngModel)]="mesaAyuda">
          <div class="opt-buscar-wrap" (click)="$event.stopPropagation()">
            <input class="opt-buscar" placeholder="Buscar empleado…" [ngModel]="buscarMesa()"
                   [ngModelOptions]="{ standalone: true }" (ngModelChange)="buscarMesa.set($event)"
                   (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()" />
          </div>
          <mat-option value="">Seleccionar…</mat-option>
          @for (u of filtradosMesa(); track u.id) {
            <mat-option [value]="u.id">{{ nombre(u) }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Emergentes</mat-label>
        <mat-select [(ngModel)]="emergentes">
          <div class="opt-buscar-wrap" (click)="$event.stopPropagation()">
            <input class="opt-buscar" placeholder="Buscar empleado…" [ngModel]="buscarEmergentes()"
                   [ngModelOptions]="{ standalone: true }" (ngModelChange)="buscarEmergentes.set($event)"
                   (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()" />
          </div>
          <mat-option value="">Seleccionar…</mat-option>
          @for (u of filtradosEmergentes(); track u.id) {
            <mat-option [value]="u.id">{{ nombre(u) }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Notas</mat-label>
        <textarea matInput rows="3" [(ngModel)]="notes" placeholder="Observaciones, intercambios, etc."></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      @if (data.hasExisting) {
        <button mat-button class="danger" (click)="clear()">Quitar asignación</button>
        <span class="spacer"></span>
      }
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="!mesaAyuda && !emergentes">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .st-dlg { min-width: 300px; }
    .full { width: 100%; }
    .range-pill {
      display: inline-block;
      font-size: 13px;
      font-weight: 600;
      color: var(--brand, #048abf);
      background: #eaf4fb;
      border-radius: 16px;
      padding: 4px 12px;
      margin-bottom: 12px;
    }
    .spacer { flex: 1 1 auto; }
    .danger { color: var(--mat-sys-error); }
    .opt-buscar-wrap {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--mat-sys-surface, #fff);
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      padding: 2px 12px;
    }
    .opt-buscar {
      width: 100%;
      box-sizing: border-box;
      border: none;
      outline: none;
      padding: 6px 4px;
      font: inherit;
      background: transparent;
      color: var(--mat-sys-on-surface);
    }
  `,
})
export class SeniorTurnoAssignDialog {
  private readonly ref = inject(MatDialogRef<SeniorTurnoAssignDialog>);
  readonly data = inject<STAssignData>(MAT_DIALOG_DATA);

  /** El HelpDesk guarda los nombres en MAYÚSCULAS; se presentan legibles. */
  nombre(u: { id: string; name?: string }): string { return nombrePropio(u.name || '') || u.id; }

  private filtrar(texto: string): HdUser[] {
    const t = texto.trim().toLowerCase();
    if (!t) return this.data.empleados;
    return this.data.empleados.filter((u) => this.nombre(u).toLowerCase().includes(t) || String(u.id).toLowerCase().includes(t));
  }

  readonly buscarMesa = signal('');
  readonly filtradosMesa = computed(() => this.filtrar(this.buscarMesa()));
  readonly buscarEmergentes = signal('');
  readonly filtradosEmergentes = computed(() => this.filtrar(this.buscarEmergentes()));

  mesaAyuda = this.data.mesaAyuda;
  emergentes = this.data.emergentes;
  notes = this.data.notes;

  save(): void {
    if (!this.mesaAyuda && !this.emergentes) return;
    this.ref.close({ mesaAyuda: this.mesaAyuda, emergentes: this.emergentes, notes: (this.notes || '').trim() });
  }
  clear(): void {
    this.ref.close({ clear: true });
  }
}
