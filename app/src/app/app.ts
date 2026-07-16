import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

// Claves de localStorage que NUNCA se borran al actualizar de versión:
// autenticación/sesión (token + refresh token) y datos del usuario.
const KEEP_KEYS = new Set<string>([
  'fit-daily_session', // access token + refresh token + sesión (CRÍTICA)
  'fit-daily_v1', // datos del board (fallback localStorage)
  'fit-daily_hd_actions',
  'fit-daily_hd_notes',
  'fit-daily_sol_notes',
]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  private readonly swUpdate = inject(SwUpdate);
  private pollId: ReturnType<typeof setInterval> | null = null;
  private readonly onVisible = () => {
    if (document.visibilityState === 'visible') this.checkForUpdate();
  };

  constructor() {
    // En dev el SW está deshabilitado (isEnabled=false) → no se arma nada.
    if (!this.swUpdate.isEnabled) return;

    // Hay una versión nueva ya descargada en caché → limpiar cachés NO críticas
    // (conservando sesión y datos del usuario) y recargar para activarla. Así el
    // usuario obtiene la versión nueva sin borrar caché y sin perder la sesión.
    this.swUpdate.versionUpdates
      .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
      .subscribe(() => {
        this.purgeNonCriticalStorage();
        window.location.reload();
      });

    this.checkForUpdate(); // al iniciar
    document.addEventListener('visibilitychange', this.onVisible); // al volver a la pestaña
    this.pollId = setInterval(() => this.checkForUpdate(), 60_000); // cada 60 s
  }

  ngOnDestroy(): void {
    if (this.pollId) clearInterval(this.pollId);
    document.removeEventListener('visibilitychange', this.onVisible);
  }

  private checkForUpdate(): void {
    // Si no hay red o el SW aún no está listo, simplemente se reintenta luego.
    this.swUpdate.checkForUpdate().catch(() => {});
  }

  /** Borra del localStorage solo lo desechable (cachés de catálogos, etc.);
   *  conserva SIEMPRE las claves de auth/sesión y los datos del usuario. */
  private purgeNonCriticalStorage(): void {
    try {
      for (const key of Object.keys(localStorage)) {
        if (!KEEP_KEYS.has(key)) localStorage.removeItem(key);
      }
    } catch {
      /* storage no disponible */
    }
  }
}
