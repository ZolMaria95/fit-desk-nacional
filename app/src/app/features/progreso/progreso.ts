import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../core/services/data.service';

interface ProgressEntry {
  id: string;
  storyId: string;
  author: string;
  date: string;
  hoursLogged: number;
  notes: string;
}

/** Progreso: registro de avances por historia. Port de js/progreso.js. */
@Component({
  selector: 'app-progreso',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './progreso.html',
  styleUrl: './progreso.scss',
})
export class Progreso {
  private readonly data = inject(DataService);

  readonly team = this.data.team;
  private readonly entries = signal<ProgressEntry[]>([]);

  // Historias del sprint activo (para filtros y formulario).
  readonly sprintStories = computed(() => {
    const active = this.data.getActiveSprint()?.id;
    return active ? this.data.getStoriesBySprint(active) : []; // acotado al tablero actual
  });

  // ── Filtros ──
  readonly filterStory = signal('');
  readonly filterAuthor = signal('');

  readonly rows = computed<ProgressEntry[]>(() => {
    const st = this.filterStory(), au = this.filterAuthor();
    return this.entries()
      .filter((e) => (!st || e.storyId === st) && (!au || e.author === au))
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  // ── Alta de registro ──
  readonly showForm = signal(false);
  form = { storyId: '', author: '', hoursLogged: 1, notes: '' };

  constructor() {
    this.data.ensureInit().then(() => this.reload());
  }

  private reload(): void {
    this.entries.set([...(this.data.getProgress() as ProgressEntry[])]);
  }

  memberOf(id: string) { return this.data.getMember(id); }
  storyOf(id: string) { return this.data.getAllStories().find((s) => s.id === id); }
  memberColor(id: string): string { return this.memberOf(id)?.color || '#8A8A9A'; }
  memberName(id: string): string { return this.memberOf(id)?.name || id; }

  fmtDate(str: string): string {
    return new Date(str + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  toggleForm(): void {
    this.showForm.update((v) => !v);
    if (this.showForm()) {
      this.form = { storyId: this.sprintStories()[0]?.id || '', author: this.team()[0]?.id || '', hoursLogged: 1, notes: '' };
    }
  }

  canSave(): boolean {
    return !!this.form.storyId && !!this.form.author && this.form.hoursLogged > 0 && !!this.form.notes.trim();
  }

  save(): void {
    if (!this.canSave()) return;
    this.data.addProgressEntry({
      storyId: this.form.storyId,
      author: this.form.author,
      hoursLogged: Number(this.form.hoursLogged),
      notes: this.form.notes.trim(),
    });
    this.reload();
    this.showForm.set(false);
  }
}
