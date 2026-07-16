import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * Marca una request como "safe" (escritura donde fallar es aceptable): si el refresh
 * del token falla NO cierra sesión ni redirige, solo deja fallar la request. Equivale
 * a App.hdFetchSafe del legacy.
 *   this.http.put(url, body, { context: new HttpContext().set(HD_SAFE, true) })
 */
export const HD_SAFE = new HttpContextToken<boolean>(() => false);

/**
 * Añade el Bearer a las requests del Helpdesk. Ante 401 (access_token vencido)
 * renueva el token con el refresh_token (AuthService.refreshSession, deduped) y
 * reintenta la request UNA vez; si el refresh falla, o ante 403, cierra sesión y
 * redirige a /login (salvo requests "safe", que solo fallan). Porta y amplía
 * HelpdeskAuth.fetchWithAuth.
 */
export const helpdeskAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isProxy = req.url.startsWith(environment.helpdeskProxyUrl);
  // /auth/* (login/refresh/logout) van por fetch en AuthService; este guard evita
  // además entrar en bucle de refresh sobre el propio refresh.
  const isAuthCall = req.url.includes('/auth/');
  const safe = req.context.get(HD_SAFE);

  const withAuth = (t: string | null) =>
    isProxy && t ? req.clone({ setHeaders: { Authorization: `Bearer ${t}` } }) : req;

  const logout = () => {
    if (!safe) {
      auth.clearSession();
      router.navigate(['/login']);
    }
  };

  return next(withAuth(auth.token)).pipe(
    catchError((err) => {
      if (!isProxy || isAuthCall || !auth.token) return throwError(() => err);
      // 401 = access_token vencido → renovar (una sola vez, deduped) y reintentar.
      if (err?.status === 401) {
        return from(auth.refreshSession()).pipe(
          switchMap((fresh) => {
            if (fresh) return next(withAuth(fresh));
            logout(); // el refresh_token también venció → sesión perdida
            return throwError(() => err);
          }),
        );
      }
      // 403 (sin permiso): el refresh no ayuda → cerrar sesión salvo "safe".
      if (err?.status === 403) logout();
      return throwError(() => err);
    }),
  );
};
