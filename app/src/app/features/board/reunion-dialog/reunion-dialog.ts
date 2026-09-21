import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { wireDialogEsc } from '../../../core/dialog-esc';
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
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
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
  // Recordatorio: minutos antes del inicio para la alerta (default 20; 0 = sin recordatorio).
  readonly recordatorioMin = signal<number>(this.story?.recordatorioMin ?? 20);
  readonly recordatorioPresets = [0, 10, 15, 20, 30, 60];
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
  // Clientes que puede elegir, SCOPEADOS por alcance: GLOBAL → catálogo COMPLETO del HelpDesk;
  // EQUIPO/REGIONAL → solo los de su alcance (`misClientes`, del backend). Fallback al catálogo si el
  // alcance no trae clientes (equipo sin registrar, o backend viejo sin `esGlobal`) → nunca queda vacío.
  private readonly clientesSource = computed(() => {
    const scoped = this.perfil.misClientes();
    return this.perfil.esGlobal() || scoped.length === 0
      ? this.hd.clients().map((c) => ({ codigo: c.id, nombre: c.name }))
      : scoped;
  });
  readonly clientesF = computed(() => {
    const t = this.buscarCli().trim().toLowerCase();
    const list = this.clientesSource();
    return t ? list.filter((c) => c.nombre.toLowerCase().includes(t)) : list;
  });

  // Etiqueta a mostrar en el disparador del menú (nombre del seleccionado, o vacío).
  readonly assigneeLabel = computed(() => {
    const id = this.assignee();
    return id ? this.hd.hdUsers().find((u) => u.id === id)?.name || id : '';
  });
  readonly clienteLabel = computed(() => {
    const cod = this.clientId();
    if (!cod) return '';
    // Nombre desde la fuente scopeada; si el código guardado no está (reunión vieja / otro alcance),
    // el nombre que ya traía la tarea; en último caso, el propio código.
    return this.clientesSource().find((c) => c.codigo === cod)?.nombre || this.story?.clientName || cod;
  });

  constructor() {
    wireDialogEsc(this.ref); // ESC cierra primero el datepicker/menú abierto, no el modal
    this.hd.getClients(); // catálogo del HelpDesk (para el alcance GLOBAL)
    this.perfil.cargarMiPerfil(); // esGlobal + clientes del alcance (EQUIPO/REGIONAL)
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

  async guardar(): Promise<void> {
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
    const cli = this.clientesSource().find((c) => c.codigo === clientId);
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
      clientName: cli?.nombre || this.story?.clientName || '',
      recordatorioMin: Math.max(0, Math.round(this.recordatorioMin() || 0)), // 0 = sin recordatorio
    };
    if (this.isNew) {
      // Guardado CONFIRMADO (no fire-and-forget): si falla, se avisa y el modal queda abierto.
      try {
        await this.data.addStory({ ...patch, status: 'todo', priority: 'media' });
      } catch {
        this.snack.open('No se pudo guardar la reunión. Revisa tu conexión e intenta de nuevo.', 'OK', { duration: 4000 });
        return;
      }
    } else {
      this.data.updateStoryReunion(this.story!.id, patch);
    }
    this.ref.close(true);
  }

  eliminar(): void {
    if (!this.story) return;
    // Defensa en profundidad: eliminar es potestad solo del Responsable de Equipo (o ADMIN).
    if (!this.auth.puedeEliminarTarea()) return;
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
