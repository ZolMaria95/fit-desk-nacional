import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * Administración: rol ADMIN o RESPONSABLE_EQUIPO (roles de PLATAFORMA, derivados de las
 * Asignaciones) y SOLO en modo Quarkus (gestiona el modelo relacional de Postgres; Firebase
 * no tiene estas entidades). Espera a que carguen los roles antes de decidir. Otros → /board.
 */
export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (environment.dataBackend !== 'quarkus') return router.createUrlTree(['/board']);
  await auth.ensureRolesPlataforma();
  // Configuración es para todos (su "Orden de estados"); las pestañas de administración se muestran solo a
  // ADMIN y RESPONSABLE_EQUIPO dentro de la página, y el backend vuelve a autorizar cada operación.
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
