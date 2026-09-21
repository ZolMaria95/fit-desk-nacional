import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { HdClient, HelpdeskService } from '../../../core/services/helpdesk.service';

export interface PendienteDateData {
  title: string;
  ticket: string;
  /** Recordatorio SIN ticket (creado a mano, prefijo "REC-") → no se muestra como si fuera un
   *  N° de ticket real, ni el texto asume que se trata de "analizar un ticket". Además, a
   *  diferencia de un ticket real (cliente fijo), el cliente SÍ se puede editar acá. */
  sinTicket?: boolean;
  clienteRaw?: string;
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  nota?: string; // motivo del pendiente (opcional)
}
export interface PendienteDateResult {
  dueDate: string;
  dueTime: string;
  nota: string; // '' si no se escribió
  /** Solo relevante/editado cuando `data.sinTicket` — para un ticket real el cliente es fijo. */
  clienteRaw: string;
}

/** Pide fecha + hora (y, si es un recordatorio SIN ticket, también cliente + nota editables) para
 *  el recordatorio de un pendiente. */
@Component({
  selector: 'app-pendiente-date-dialog',
  imports: [
    FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatAutocompleteModule, MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content class="pdd">
      @if (data.sinTicket) {
        <p class="pdd-hint">Editá el cliente y la fecha de esta nota personal.</p>
        <mat-form-field appearance="outline" subscriptSizing="dynamic" class="pdd-field">
          <mat-label>Cliente</mat-label>
          <input matInput [matAutocomplete]="autoClient" [ngModel]="clientModel()"
                 (ngModelChange)="onClientInput($event)" placeholder="Buscar cliente…" autocomplete="off" />
          <mat-icon matSuffix>search</mat-icon>
          <mat-autocomplete #autoClient="matAutocomplete" [displayWith]="displayClient" (optionSelected)="onClientPicked($event.option.value)">
            @for (c of filteredClients(); track c.id) {
              <mat-option [value]="c">{{ c.name }}</mat-option>
            } @empty {
              <mat-option [value]="null" disabled>Sin coincidencias</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      } @else {
        <div class="pdd-ticket">Ticket #{{ data.ticket }}</div>
        <p class="pdd-hint">¿Cuándo querés que te recuerde analizar este ticket?</p>
      }

      <div class="pdd-row">
        <mat-form-field appearance="outline" class="grow">
          <mat-label>Fecha</mat-label>
          <input matInput [matDatepicker]="dp" [(ngModel)]="date" [min]="minDate" />
          <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
          <mat-datepicker #dp></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline" class="time">
          <mat-label>Hora</mat-label>
          <input matInput type="time" [(ngModel)]="time" [min]="timeMin()" />
        </mat-form-field>
      </div>
      <mat-form-field appearance="outline" class="pdd-nota">
        <mat-label>Nota (opcional)</mat-label>
        <textarea matInput rows="2" maxlength="300" [(ngModel)]="nota"
                  placeholder="¿Por qué queda pendiente?"></textarea>
      </mat-form-field>

      @if (esPasado()) {
        <p class="pdd-error">La fecha y hora deben ser de ahora en adelante.</p>
      }
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="!date || !time || esPasado()">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .pdd { min-width: 320px; }
    .pdd-ticket { font-weight: 700; color: var(--brand, #048abf); margin-bottom: 4px; }
    .pdd-hint { font-size: 13px; color: var(--mat-sys-on-surface-variant); margin: 0 0 12px; }
    .pdd-field { width: 100%; margin-bottom: 8px; }
    .pdd-row { display: flex; gap: 10px; }
    .grow { flex: 1; }
    .time { width: 120px; }
    .pdd-nota { width: 100%; margin-top: 8px; }
    .pdd-error { color: var(--mat-sys-error, #d32f2f); font-size: 12px; margin: 10px 0 0; }
  `,
})
export class PendienteDateDialog {
  private readonly ref = inject(MatDialogRef<PendienteDateDialog>);
  readonly data = inject<PendienteDateData>(MAT_DIALOG_DATA);
  private readonly hd = inject(HelpdeskService);

  private readonly now = new Date();
  /** El calendario no permite días anteriores a hoy. */
  readonly minDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

  date: Date | null = this.data.dueDate ? new Date(this.data.dueDate + 'T00:00:00') : new Date();
  time = this.data.dueTime || this.fmtTime(this.now); // por defecto, la hora actual
  nota = this.data.nota || '';

  // Cliente editable, solo para `data.sinTicket` — mismo patrón que `CrearRecordatorioDialog`
  // (catálogo COMPLETO, sin scopear por equipo: es una nota personal, puede ser de cualquiera).
  private readonly clientFilter = signal('');
  readonly clientModel = signal<HdClient | string | null>(this.data.clienteRaw ?? null);
  readonly filteredClients = computed<HdClient[]>(() => {
    const f = this.clientFilter().toLowerCase().trim();
    const list = this.hd.clients();
    if (!f) return list;
    return list.filter((c) => c.name.toLowerCase().includes(f) || c.id.toLowerCase().includes(f));
  });
  displayClient = (c: HdClient | string | null): string => (!c ? '' : typeof c === 'string' ? c : c.name);
  onClientInput(val: HdClient | string | null): void {
    this.clientModel.set(val);
    this.clientFilter.set(typeof val === 'string' ? val : '');
  }
  onClientPicked(val: HdClient | null): void {
    this.clientModel.set(val);
    this.clientFilter.set('');
  }

  constructor() {
    wireDialogEsc(this.ref); // ESC cierra primero el datepicker abierto, no el modal
    if (this.data.sinTicket) this.hd.getClients();
  }

  private fmtTime(d: Date): string {
    const p = (n: number) => String(n).padStart(2, '0');
    return `${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  private esHoy(d: Date): boolean {
    return d.getFullYear() === this.now.getFullYear() && d.getMonth() === this.now.getMonth() && d.getDate() === this.now.getDate();
  }
  /** Hora mínima del input cuando la fecha elegida es hoy (impide horas pasadas). */
  timeMin(): string {
    return this.date && this.esHoy(this.date) ? this.fmtTime(this.now) : '';
  }
  private selectedAt(): Date | null {
    if (!this.date || !this.time) return null;
    const [h, m] = this.time.split(':').map(Number);
    const d = new Date(this.date);
    d.setHours(h || 0, m || 0, 0, 0);
    return d;
  }
  /** ¿El recordatorio quedaría en el pasado? (se evalúa contra el momento actual). */
  esPasado(): boolean {
    const at = this.selectedAt();
    return !!at && at.getTime() < Date.now();
  }

  save(): void {
    if (!this.date || !this.time || this.esPasado()) return;
    const d = this.date;
    const p = (n: number) => String(n).padStart(2, '0');
    const dueDate = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    let clienteRaw = this.data.clienteRaw || '';
    if (this.data.sinTicket) {
      const m = this.clientModel();
      clienteRaw = m && typeof m !== 'string' ? m.name : typeof m === 'string' ? m.trim() : '';
    }
    this.ref.close({ dueDate, dueTime: this.time, nota: this.nota.trim(), clienteRaw } as PendienteDateResult);
  }
}
