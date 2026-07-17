import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { DataService, Story } from '../../../core/services/data.service';
import { HelpdeskService } from '../../../core/services/helpdesk.service';
import { PerfilService } from '../../../core/services/perfil.service';

interface ReunionData {
  story: Story | null;
}

/** Modal de tareas de tipo Reunión (capacitación/presentación): tema, link opcional,
 *  fecha/hora inicio-fin (calendario), responsable y cliente opcional.
 *  Reglas: un CONSULTOR solo puede crear la reunión para sí mismo (sin picker de
 *  responsable); el picker de responsable solo se muestra a RESPONSABLE_EQUIPO/ADMIN. */
@Component({
  selector: 'app-reunion-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDatepickerModule,
  ],
  templateUrl: './reunion-dialog.html',
  styleUrl: './reunion-dialog.scss',
})
export class ReunionDialog {
  private readonly data = inject(DataService);
  private readonly hd = inject(HelpdeskService);
  private readonly perfil = inject(PerfilService);
  readonly auth = inject(AuthService);
  private readonly ref = inject(MatDialogRef<ReunionDialog>);
  private readonly snack = inject(MatSnackBar);
  private readonly dlg = inject<ReunionData>(MAT_DIALOG_DATA);

  readonly story = this.dlg.story;
  readonly isNew = !this.story;

  /** Solo RE/ADMIN pueden asignar la reunión a otra persona. */
  readonly puedeAsignarAOtros = computed(() => this.auth.esResponsableEquipo() || this.auth.esAdminPlataforma());

  readonly subtipo = signal<string>(this.story?.subtipo || 'CAPACITACION');
  readonly tema = signal<string>(this.story?.tema || this.story?.title || '');
  readonly link = signal<string>(this.story?.link || '');
  readonly assignee = signal<string>('');
  readonly clientId = signal<string>((this.story?.client as string) || '');

  // Fecha (Date, del calendario) + hora ("hh:mm", input time), por separado.
  readonly inicioFecha = signal<Date | null>(null);
  readonly inicioHora = signal<string>('09:00');
  readonly finFecha = signal<Date | null>(null);
  readonly finHora = signal<string>('10:00');

  // Buscadores dentro de los selects.
  readonly buscarResp = signal('');
  readonly buscarCli = signal('');
  readonly usuariosF = computed(() => {
    const t = this.buscarResp().trim().toLowerCase();
    const list = this.hd.hdUsers();
    return t ? list.filter((u) => u.name.toLowerCase().includes(t)) : list;
  });
  // Clientes del EQUIPO del creador (nombres del API), desde /perfil/me.
  readonly clientesF = computed(() => {
    const t = this.buscarCli().trim().toLowerCase();
    const list = this.perfil.misClientes();
    return t ? list.filter((c) => c.nombre.toLowerCase().includes(t)) : list;
  });

  constructor() {
    this.perfil.cargarMiPerfil(); // clientes del equipo del creador
    const pi = this.parseDT(this.story?.inicio);
    if (pi) { this.inicioFecha.set(pi.fecha); this.inicioHora.set(pi.hora); }
    const pf = this.parseDT(this.story?.fin);
    if (pf) { this.finFecha.set(pf.fecha); this.finHora.set(pf.hora); }
    // Responsable: al editar, el guardado; al crear, si es consultor → yo mismo.
    if (this.story) {
      this.assignee.set((this.story.assignee as string) || '');
    } else if (!this.puedeAsignarAOtros()) {
      this.assignee.set(this.auth.session()?.id || '');
    }
  }

  nombreYo(): string {
    return this.auth.session()?.name || 'Yo';
  }

  guardar(): void {
    const tema = this.tema().trim();
    if (!tema) {
      this.snack.open('El tema es obligatorio.', 'OK', { duration: 3000 });
      return;
    }
    const inicio = this.combinar(this.inicioFecha(), this.inicioHora());
    if (!inicio) {
      this.snack.open('La fecha y hora de inicio es obligatoria.', 'OK', { duration: 3000 });
      return;
    }
    const fin = this.combinar(this.finFecha(), this.finHora());
    if (fin && fin < inicio) {
      this.snack.open('El fin no puede ser anterior al inicio.', 'OK', { duration: 3500 });
      return;
    }
    // El consultor SIEMPRE queda como responsable (además de ocultar el picker).
    const assignee = this.puedeAsignarAOtros() ? this.assignee() || null : this.auth.session()?.id || null;
    // El cliente se guarda por código, pero la tarjeta muestra el NOMBRE del API:
    // lo resolvemos aquí para que se pinte de inmediato (igual que las tareas con ticket).
    const clientId = this.clientId();
    const cli = this.perfil.misClientes().find((c) => c.codigo === clientId);
    const patch: Partial<Story> = {
      title: tema,
      tipo: 'REUNION',
      subtipo: this.subtipo(),
      tema,
      link: this.link().trim(),
      inicio,
      fin,
      assignee,
      client: clientId || null,
      clientName: cli?.nombre || '',
    };
    if (this.isNew) {
      this.data.addStory({ ...patch, status: 'todo', priority: 'media' });
    } else {
      this.data.updateStoryReunion(this.story!.id, patch);
    }
    this.ref.close(true);
  }

  eliminar(): void {
    if (!this.story) return;
    this.data.deleteStory(this.story.id);
    this.ref.close(true);
  }

  cerrar(): void {
    this.ref.close();
  }

  /** "YYYY-MM-DDThh:mm" → { fecha: Date, hora: "hh:mm" }. */
  private parseDT(iso?: string): { fecha: Date; hora: string } | null {
    if (!iso) return null;
    const [f, h] = iso.split('T');
    const [y, m, d] = (f || '').split('-').map(Number);
    if (!y || !m || !d) return null;
    return { fecha: new Date(y, m - 1, d), hora: (h || '09:00').slice(0, 5) };
  }

  /** { Date, "hh:mm" } → "YYYY-MM-DDThh:mm" (vacío si no hay fecha). */
  private combinar(fecha: Date | null, hora: string): string {
    if (!fecha) return '';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${fecha.getFullYear()}-${p(fecha.getMonth() + 1)}-${p(fecha.getDate())}T${hora || '00:00'}`;
  }
}
