import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * "Reportes": responsables de equipo y ADMIN, solo en modo Quarkus (los datos viven en Postgres). Espera
 * a que carguen los roles (si no, al recargar la página directamente en /reportes los vería vacíos y
 * rebotaría). El backend vuelve a autorizar por equipo. Otros → /board.
 */
export const reportesGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (environment.dataBackend !== 'quarkus') return router.createUrlTree(['/board']);
  await auth.ensureRolesPlataforma();
  return auth.puedeVerMiPanel() ? true : router.createUrlTree(['/board']);
};
