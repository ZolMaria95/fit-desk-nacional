import { Injectable, effect, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { PerfilService } from './perfil.service';

export type Tema = 'light' | 'dark';

/**
 * Aplica y persiste la preferencia de tema (claro/oscuro) por usuario. Fuente de verdad = backend
 * (`usuario.tema`, vía `perfil/me`), con cache en localStorage por usuario para aplicar al instante
 * (sin *flash*) al entrar. Pone un atributo `data-theme` en `<html>` del que cuelgan los estilos oscuros.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly auth = inject(AuthService);
  private readonly perfil = inject(PerfilService);

  /** Tema aplicado actualmente. Arranca del cache del usuario (sin flash). */
  readonly tema = signal<Tema>(this.leerCache());
  esOscuro(): boolean {
    return this.tema() === 'dark';
  }

  constructor() {
    // Aplica el atributo al <html> ante cualquier cambio de `tema` (los estilos oscuros cuelgan de él).
    effect(() => document.documentElement.setAttribute('data-theme', this.tema()));
  }

  /** Cambia el tema: aplica al instante + cachea + persiste en el backend. */
  set(t: Tema): void {
    this.tema.set(t);
    this.cache(t);
    void this.perfil.guardarTema(t);
  }
  toggle(): void {
    this.set(this.tema() === 'dark' ? 'light' : 'dark');
  }

  /** Reconcilia con el backend (fuente de verdad) una vez cargado `perfil/me`. Lo llama el Layout. */
  sincronizar(): void {
    const b = this.perfil.temaGuardado();
    if (b === 'light' || b === 'dark') {
      this.tema.set(b);
      this.cache(b);
    }
  }

  private cacheKey(): string {
    const uid = String(this.auth.session()?.id || '').trim().toUpperCase();
    return `fit-daily_tema_${uid || 'anon'}`;
  }
  private leerCache(): Tema {
    try {
      return localStorage.getItem(this.cacheKey()) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }
  private cache(t: Tema): void {
    try { localStorage.setItem(this.cacheKey(), t); } catch { /* localStorage no disponible */ }
  }
}
