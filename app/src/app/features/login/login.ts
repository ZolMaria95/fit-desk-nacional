import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';

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
    if (this.auth.isAuthenticated()) this.router.navigate(['/board']);
  }

  async submit(): Promise<void> {
    if (this.loading()) return;
    this.error.set('');
    this.loading.set(true);
    try {
      await this.auth.login(this.usuario.trim(), this.password);
      this.router.navigate(['/board']);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/401|credenciales/i.test(msg)) this.error.set('Usuario o contraseña incorrectos.');
      else if (/409|active/i.test(msg)) this.error.set('Ya tienes una sesión activa. Espera unos segundos y vuelve a intentar.');
      else this.error.set('Error de conexión. Verifica tu red e intenta de nuevo.');
      this.password = '';
    } finally {
      this.loading.set(false);
    }
  }
}
