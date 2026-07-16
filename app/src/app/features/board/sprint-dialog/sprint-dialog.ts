import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService, Sprint } from '../../../core/services/data.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

export interface SprintDialogData {
  /** null → crear un sprint nuevo. */
  sprint: Sprint | null;
}

/** Modal para crear / editar / borrar un sprint. */
@Component({
  selector: 'app-sprint-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  templateUrl: './sprint-dialog.html',
  styleUrl: './sprint-dialog.scss',
})
export class SprintDialog {
  private readonly data = inject(DataService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  private readonly ref = inject(MatDialogRef<SprintDialog, boolean>);
  private readonly input = inject<SprintDialogData>(MAT_DIALOG_DATA);

  readonly sprint = this.input.sprint;
  readonly isNew = !this.sprint;
  readonly STATUSES = ['active', 'completed', 'planned'];
  readonly esUnico = this.data.getSprints().sprints.length <= 1;

  name = this.sprint?.name ?? '';
  goal = this.sprint?.goal ?? '';
  capacity = this.sprint?.capacity ?? 0;
  status = this.sprint?.status ?? 'active';
  startModel: Date | null = this.sprint?.start ? new Date(this.sprint.start + 'T00:00:00') : null;
  endModel: Date | null = this.sprint?.end ? new Date(this.sprint.end + 'T00:00:00') : null;

  private toIso(d: Date | null): string {
    if (!d) return '';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  save(): void {
    const name = this.name.trim();
    if (!name) {
      this.snack.open('El nombre del sprint no puede quedar vacío.', 'OK', { duration: 3000 });
      return;
    }
    const base = {
      name,
      goal: this.goal.trim(),
      start: this.toIso(this.startModel),
      end: this.toIso(this.endModel),
      capacity: Number(this.capacity) || 0,
    };
    if (this.isNew) {
      this.data.addSprint(base);
      this.snack.open('Sprint creado. El anterior se cerró y las tareas no aprobadas migraron.', 'OK', { duration: 4000 });
    } else {
      this.data.updateSprint(this.sprint!.id, { ...base, status: this.status });
    }
    this.ref.close(true);
  }

  async remove(): Promise<void> {
    if (!this.sprint || this.esUnico) return;
    const ok = await firstValueFrom(
      this.dialog
        .open(ConfirmDialog, {
          data: {
            title: 'Borrar sprint',
            message: `Vas a borrar "${this.sprint.name}".\n\nLas tareas del sprint NO se eliminan.`,
            confirmText: 'Borrar',
            danger: true,
          },
        })
        .afterClosed(),
    );
    if (ok) {
      this.data.deleteSprint(this.sprint.id);
      this.ref.close(true);
    }
  }
}
