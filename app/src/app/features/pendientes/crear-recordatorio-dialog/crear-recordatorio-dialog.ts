import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { wireDialogEsc } from '../../../core/dialog-esc';
import { HdClient, HelpdeskService } from '../../../core/services/helpdesk.service';

export interface CrearRecordatorioResult {
  clienteRaw: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
  nota: string;
}

/**
 * Recordatorio SIN ticket: una nota personal ligada a un cliente, con fecha/hora — no hay
 * conversación del HelpDesk que abrir (a diferencia del recordatorio que nace de un ticket, ver
 * `PendienteDateDialog`). Catálogo de clientes COMPLETO (es personal, puede ser de cualquiera).
 */
@Component({
  selector: 'app-crear-recordatorio-dialog',
  imports: [
    FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatAutocompleteModule, MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title>Nuevo recordatorio</h2>
    <mat-dialog-content class="crd">
      <p class="crd-hint">Una nota personal para vos, ligada a un cliente — no requiere un ticket.</p>

      <mat-form-field appearance="outline" subscriptSizing="dynamic" class="crd-field">
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

      <div class="crd-row">
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

      <mat-form-field appearance="outline" class="crd-field">
        <mat-label>Nota</mat-label>
        <textarea matInput rows="3" maxlength="300" [(ngModel)]="nota"
                  placeholder="¿Qué querés recordar?"></textarea>
      </mat-form-field>

      @if (esPasado()) {
        <p class="crd-error">La fecha y hora deben ser de ahora en adelante.</p>
      }
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="save()"
              [disabled]="!date || !time || !nota.trim() || esPasado()">Crear</button>
    </mat-dialog-actions>
  `,
  styles: `
    .crd { min-width: 320px; max-width: 420px; }
    .crd-hint { font-size: 13px; color: var(--mat-sys-on-surface-variant); margin: 0 0 12px; }
    .crd-field { width: 100%; margin-bottom: 4px; }
    .crd-row { display: flex; gap: 10px; }
    .grow { flex: 1; }
    .time { width: 120px; }
    .crd-error { color: var(--mat-sys-error, #d32f2f); font-size: 12px; margin: 4px 0 0; }
  `,
})
export class CrearRecordatorioDialog {
  private readonly ref = inject(MatDialogRef<CrearRecordatorioDialog>);
  private readonly hd = inject(HelpdeskService);

  private readonly now = new Date();
  readonly minDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

  date: Date | null = null;
  time = '';
  nota = '';

  // Cliente: catálogo COMPLETO (recordatorio personal, no scopeado por equipo/alcance).
  private readonly clientFilter = signal('');
  readonly clientModel = signal<HdClient | string | null>(null);
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
    wireDialogEsc(this.ref);
    this.hd.getClients();
    const p = (n: number) => String(n).padStart(2, '0');
    this.time = `${p(this.now.getHours())}:${p(this.now.getMinutes())}`;
  }

  private esHoy(d: Date): boolean {
    return d.getFullYear() === this.now.getFullYear() && d.getMonth() === this.now.getMonth() && d.getDate() === this.now.getDate();
  }
  timeMin(): string {
    return this.date && this.esHoy(this.date) ? `${this.now.getHours()}:${this.now.getMinutes()}` : '';
  }
  private selectedAt(): Date | null {
    if (!this.date || !this.time) return null;
    const [h, m] = this.time.split(':').map(Number);
    const d = new Date(this.date);
    d.setHours(h || 0, m || 0, 0, 0);
    return d;
  }
  esPasado(): boolean {
    const at = this.selectedAt();
    return !!at && at.getTime() < Date.now();
  }

  save(): void {
    if (!this.date || !this.time || !this.nota.trim() || this.esPasado()) return;
    const d = this.date;
    const p = (n: number) => String(n).padStart(2, '0');
    const dueDate = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    const m = this.clientModel();
    const clienteRaw = m && typeof m !== 'string' ? m.name : typeof m === 'string' ? m.trim() : '';
    this.ref.close({ clienteRaw, dueDate, dueTime: this.time, nota: this.nota.trim() } as CrearRecordatorioResult);
  }
}
