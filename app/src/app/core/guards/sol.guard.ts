import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** "Mi Panel": solo Scrum Master o MSC001. Otros → /board. */
export const solGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.puedeVerMiPanel() ? true : router.createUrlTree(['/board']);
};
