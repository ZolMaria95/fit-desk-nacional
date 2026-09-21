import { Component, computed, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PALETA, esHexValido, reservadoPara } from '../../core/colores';
import { ColoresService } from '../../core/services/colores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { PerfilService } from '../../core/services/perfil.service';
import { ThemeService } from '../../core/services/theme.service';

/** Perfil del usuario logueado: datos + foto personalizable (persistida en Neon). */
@Component({
  selector: 'app-perfil-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatSlideToggleModule, MatTooltipModule],
  templateUrl: './perfil-dialog.html',
  styleUrl: './perfil-dialog.scss',
})
export class PerfilDialog {
  private readonly auth = inject(AuthService);
  readonly perfil = inject(PerfilService);
  readonly theme = inject(ThemeService);
  private readonly ref = inject(MatDialogRef<PerfilDialog>);
  private readonly snack = inject(MatSnackBar);

  readonly session = this.auth.session;
  readonly subiendo = signal(false);

  // ── Color identificativo ──
  readonly paleta = PALETA;
  private readonly colores = inject(ColoresService);
  /** Hexadecimal del campo de texto; se sincroniza con el color efectivo mientras sea válido. */
  readonly hexEditado = signal('');
  readonly hexInvalido = signal(false);

  /** Color que se está mostrando: el elegido, o el derivado si no ha elegido. */
  readonly colorActual = computed(() => this.colores.color(String(this.auth.session()?.id || '')));

  /** Lo que se ve en el campo de texto: lo que el usuario esté escribiendo o, si no ha tocado
   *  nada, su color actual — para que pueda leerlo y copiarlo sin tener que adivinarlo. */
  readonly hexMostrado = computed(() => this.hexEditado() || this.colorActual().toUpperCase());

  /** Tinta de las iniciales sobre el avatar (el fondo es el color elegido). */
  readonly tintaAvatar = computed(() => this.colores.avatar(String(this.auth.session()?.id || '')).fg);

  esMiColor(c: string): boolean {
    return c.toUpperCase() === this.colorActual().toUpperCase();
  }

  /** Nombres de otras personas que ya usan ese color (el aviso de "ocupado"). */
  nombresQueUsan(c: string): string[] {
    return this.colores.nombresQueUsan(c, String(this.auth.session()?.id || ''));
  }

  /** Aviso bajo el selector cuando el color elegido lo comparte alguien más. */
  readonly avisoOcupado = computed(() => {
    const otros = this.colores.nombresQueUsan(this.colorActual(), String(this.auth.session()?.id || ''));
    return otros.length ? `Este color ya lo usa ${otros.join(', ')}. Puedes quedártelo igual.` : '';
  });

  async elegir(c: string): Promise<void> {
    const hex = String(c || '').trim();
    if (!esHexValido(hex)) return;
    this.hexEditado.set(hex.toUpperCase());
    this.hexInvalido.set(false);
    await this.guardarColor(hex.toUpperCase());
  }

  /** Escritura manual del hexadecimal: solo guarda cuando está completo y es válido. */
  onHex(v: string): void {
    const s = String(v || '').trim();
    this.hexEditado.set(s);
    if (!s) { this.hexInvalido.set(false); return; }
    const ok = esHexValido(s);
    this.hexInvalido.set(!ok);
    if (ok) void this.guardarColor(s.toUpperCase());
  }

  async quitarColor(): Promise<void> {
    this.hexEditado.set('');
    this.hexInvalido.set(false);
    await this.guardarColor(null);
  }

  private async guardarColor(c: string | null): Promise<void> {
    // Colores apartados para una persona concreta: se avisa antes de intentarlo, para que el
    // usuario entienda por qué no puede en vez de ver un error genérico. El backend lo rechaza igual.
    const dueno = c ? reservadoPara(c, String(this.auth.session()?.id || '')) : '';
    if (dueno) {
      const nombre = this.colores.nombreDe(dueno) || dueno;
      this.snack.open(`Ese color está reservado para ${nombre}.`, 'OK', { duration: 4000 });
      this.hexEditado.set('');
      return;
    }
    try {
      await this.perfil.guardarColor(c);
      this.snack.open(c ? 'Color actualizado' : 'Color quitado: vuelves al automático', 'OK', { duration: 2500 });
    } catch {
      this.snack.open('No se pudo guardar el color. Intenta de nuevo.', 'OK', { duration: 4000 });
    }
  }

  // ── PDF de conversaciones con nombres reales (solo responsables, solo esta sesión) ──
  readonly puedeVerNombresEnPdf = this.auth.puedeVerNombresEnPdf;
  readonly sinAnonimizar = this.auth.pdfSinAnonimizar;
  onSinAnonimizar(activo: boolean): void {
    this.auth.pdfSinAnonimizar.set(activo);
    if (activo) {
      this.snack.open('Las conversaciones que descargues llevarán los nombres reales hasta que cierres sesión.', 'OK', {
        duration: 5000,
      });
    }
  }
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
