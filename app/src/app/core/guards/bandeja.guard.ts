import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * Bandeja de envíos entre equipos: rol RESPONSABLE_EQUIPO o ADMIN (roles de PLATAFORMA) y
 * SOLO en modo Quarkus (el modelo de Transferencia/Solicitud vive en Postgres). Espera a que
 * carguen los roles antes de decidir. Otros → /board.
 */
export const bandejaGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (environment.dataBackend !== 'quarkus') return router.createUrlTree(['/board']);
  await auth.ensureRolesPlataforma();
  return auth.puedeTransferir() ? true : router.createUrlTree(['/board']);
};
