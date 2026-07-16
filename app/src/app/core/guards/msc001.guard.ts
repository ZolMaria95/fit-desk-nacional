import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Acciones exclusivas de MSC001 (p. ej. borrar board). Otros → /board. */
export const msc001Guard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.puedeBorrarBoard() ? true : router.createUrlTree(['/board']);
};
