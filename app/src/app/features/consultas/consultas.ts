import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../core/services/data.service';

interface Query {
  id: string;
  title: string;
  description: string;
  storyId: string | null;
  priority: 'alta' | 'media' | 'baja';
  author: string;
  date: string;
  status: 'open' | 'resolved';
  response: string | null;
  respondedBy: string | null;
}

type QFilter = 'all' | 'open' | 'resolved';

/** Consultas y bloqueos del equipo. Port de js/consultas.js. */
@Component({
  selector: 'app-consultas',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatTooltipModule],
  templateUrl: './consultas.html',
  styleUrl: './consultas.scss',
})
export class Consultas {
  private readonly data = inject(DataService);
  private readonly snack = inject(MatSnackBar);

  readonly team = this.data.team;
  private readonly queries = signal<Query[]>([]);

  readonly sprintStories = computed(() => {
    const active = this.data.getActiveSprint()?.id;
    return active ? this.data.getStoriesBySprint(active) : []; // acotado al tablero actual
  });

  readonly filter = signal<QFilter>('all');
  readonly counts = computed(() => {
    const q = this.queries();
    return { all: q.length, open: q.filter((x) => x.status === 'open').length, resolved: q.filter((x) => x.status === 'resolved').length };
  });

  readonly rows = computed<Query[]>(() => {
    const f = this.filter();
    return this.queries()
      .filter((q) => f === 'all' || q.status === f)
      .sort((a, b) => {
        if (a.status === 'open' && b.status !== 'open') return -1;
        if (a.status !== 'open' && b.status === 'open') return 1;
        return b.date.localeCompare(a.date);
      });
  });

  // ── Alta de consulta ──
  readonly showForm = signal(false);
  form = { title: '', description: '', storyId: '', priority: 'media' as Query['priority'], author: '' };

  // ── Resolver (inline por card) ──
  readonly resolvingId = signal<string | null>(null);
  resolveDraft = { response: '', respondedBy: '' };

  constructor() {
    this.data.ensureInit().then(() => this.reload());
  }

  private reload(): void {
    this.queries.set([...(this.data.getQueries() as Query[])]);
  }

  memberName(id: string | null): string { return (id && this.data.getMember(id)?.name) || id || ''; }
  storyOf(id: string | null) { return id ? this.data.getAllStories().find((s) => s.id === id) : undefined; }
  fmtDate(str: string): string {
    return new Date(str + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  toggleForm(): void {
    this.showForm.update((v) => !v);
    if (this.showForm()) this.form = { title: '', description: '', storyId: '', priority: 'media', author: this.team()[0]?.id || '' };
  }
  canSave(): boolean { return !!this.form.title.trim() && !!this.form.description.trim() && !!this.form.author; }
  save(): void {
    if (!this.canSave()) return;
    this.data.addQuery({
      title: this.form.title.trim(),
      description: this.form.description.trim(),
      storyId: this.form.storyId || null,
      priority: this.form.priority,
      author: this.form.author,
    });
    this.reload();
    this.showForm.set(false);
  }

  startResolve(q: Query): void {
    this.resolvingId.set(q.id);
    this.resolveDraft = { response: '', respondedBy: this.team()[0]?.id || '' };
  }
  cancelResolve(): void { this.resolvingId.set(null); }
  confirmResolve(q: Query): void {
    // Antes regresaba en silencio si faltaba la respuesta → parecía que "no hacía nada".
    if (!this.resolveDraft.response.trim()) {
      this.snack.open('Escribe una respuesta antes de marcar la consulta como resuelta.', 'OK', { duration: 4000 });
      return;
    }
    if (!this.resolveDraft.respondedBy) {
      this.snack.open('Indica quién resolvió la consulta.', 'OK', { duration: 4000 });
      return;
    }
    this.data.resolveQuery(q.id, this.resolveDraft.response.trim(), this.resolveDraft.respondedBy);
    this.reload();
    this.resolvingId.set(null);
    this.snack.open('Consulta marcada como resuelta.', '', { duration: 2500 });
  }

  /** Elimina una consulta (pide confirmación). */
  remove(q: Query): void {
    if (!confirm(`¿Eliminar la consulta "${q.title}"? Esta acción no se puede deshacer.`)) return;
    this.data.deleteQuery(q.id);
    this.reload();
    this.snack.open('Consulta eliminada.', '', { duration: 2500 });
  }
}
