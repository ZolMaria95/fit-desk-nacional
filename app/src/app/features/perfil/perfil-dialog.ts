import { Component, computed, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { PerfilService } from '../../core/services/perfil.service';

/** Perfil del usuario logueado: datos + foto personalizable (persistida en Neon). */
@Component({
  selector: 'app-perfil-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './perfil-dialog.html',
  styleUrl: './perfil-dialog.scss',
})
export class PerfilDialog {
  private readonly auth = inject(AuthService);
  readonly perfil = inject(PerfilService);
  private readonly ref = inject(MatDialogRef<PerfilDialog>);
  private readonly snack = inject(MatSnackBar);

  readonly session = this.auth.session;
  readonly subiendo = signal(false);
  /** Lightbox: ver la foto completa al hacer clic. */
  readonly verFoto = signal(false);

  /** Equipo(s) del usuario (código + nombre). */
  readonly equipos = this.perfil.misEquipos;

  private static readonly ROL_LABEL: Record<string, string> = {
    ADMIN: 'Administrador',
    RESPONSABLE_EQUIPO: 'Responsable de equipo',
    ESPECIALISTA: 'Especialista',
    EQUIPO: 'Miembro de equipo',
    SCRUM_MASTER: 'Scrum Master',
  };

  /** Roles de plataforma FitDesk, en texto legible. */
  readonly rolesFitdesk = computed(() =>
    this.auth.rolesPlataforma().map((r) => PerfilDialog.ROL_LABEL[r] || this.prettify(r)),
  );

  /** Nombres de equipo(s) unidos por coma. */
  readonly equiposTexto = computed(() => this.equipos().map((e) => e.nombre).join(', '));

  constructor() {
    this.auth.ensureRolesPlataforma(); // roles FitDesk
    this.perfil.cargarMiPerfil(); // equipo(s)
  }

  private prettify(code: string): string {
    return code.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  foto(): string {
    return this.perfil.fotoDe(this.session()?.id);
  }

  abrirFoto(): void {
    if (this.foto()) this.verFoto.set(true);
  }

  iniciales(): string {
    const n = this.session()?.name || this.session()?.id || '';
    return (
      n.split(/\s+/).slice(0, 2).map((p) => p[0] || '').join('').toUpperCase() || '?'
    );
  }

  async onArchivo(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.snack.open('Selecciona un archivo de imagen', 'OK', { duration: 3000 });
      return;
    }
    this.subiendo.set(true);
    try {
      const dataUri = await this.comprimir(file, 320);
      await this.perfil.subirFoto(dataUri);
      this.snack.open('Foto actualizada', 'OK', { duration: 2500 });
    } catch (err: any) {
      this.snack.open(err?.message || 'No se pudo subir la foto', 'OK', { duration: 4000 });
    } finally {
      this.subiendo.set(false);
    }
  }

  async quitar(): Promise<void> {
    this.subiendo.set(true);
    try {
      await this.perfil.quitarFoto();
      this.snack.open('Foto quitada', 'OK', { duration: 2500 });
    } finally {
      this.subiendo.set(false);
    }
  }

  cerrar(): void {
    this.ref.close();
  }

  /** Recorta al cuadrado (centrado), redimensiona a `size`px y exporta JPEG liviano. */
  private comprimir(file: File, size: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo procesar la imagen'));
          return;
        }
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Imagen inválida'));
      };
      img.src = url;
    });
  }
}
