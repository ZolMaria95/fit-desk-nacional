import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService, LoginError } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  usuario = '';
  password = '';
  readonly loading = signal(false);
  readonly error = signal('');

  constructor() {
    if (this.auth.isAuthenticated()) this.router.navigate(['/tickets']);
  }

  async submit(): Promise<void> {
    if (this.loading()) return;
    this.error.set('');
    this.loading.set(true);
    try {
      await this.auth.login(this.usuario.trim(), this.password);
      this.router.navigate(['/tickets']);
    } catch (e: unknown) {
      this.error.set(this.mensajeLogin(e));
      this.password = '';
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Traduce el fallo de login a un mensaje HONESTO según el código HTTP y el motivo real
   * del HelpDesk. Antes, cualquier cosa que no fuera 401/409 caía en "revisa tu red",
   * ocultando p. ej. un 500 del HelpDesk (bug de su servidor, no de la red ni la clave).
   */
  private mensajeLogin(e: unknown): string {
    const err = e as Partial<LoginError> & { message?: string };
    let status = typeof err?.status === 'number' ? err.status : 0;
    // Fallback: rescatar el código de mensajes tipo "… (500)" (p. ej. el fallo de /users/me).
    if (!status && err?.message) {
      const m = /\((\d{3})\)/.exec(err.message);
      if (m) status = Number(m[1]);
    }
    const motivo = (err?.serverMessage || '').trim();
    if (status === 401) return 'Usuario o contraseña incorrectos.';
    if (status === 409) return 'Ya tienes una sesión activa. Espera unos segundos y vuelve a intentar.';
    if (status === 400 || status === 422) {
      return `El HelpDesk rechazó el acceso (${status})${motivo ? ': ' + motivo : ''}.`;
    }
    if (status >= 500) {
      return `El HelpDesk tuvo un error al iniciar tu sesión (${status}). No es tu red ni tu contraseña; por favor repórtalo a soporte del HelpDesk.`;
    }
    if (status === 0) return 'No se pudo conectar con el servidor. Verifica tu red e intenta de nuevo.';
    return `No se pudo iniciar sesión (${status})${motivo ? ': ' + motivo : ''}.`;
  }
}
