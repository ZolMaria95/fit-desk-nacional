import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * Marca una request como "safe" (escritura donde fallar es aceptable): ante 403
 * NO cierra sesión ni redirige, solo deja fallar la request. Equivale a
 * App.hdFetchSafe del legacy. (El 401 SÍ redirige aunque sea "safe": una sesión
 * inválida obliga a re-autenticarse.)
 *   this.http.put(url, body, { context: new HttpContext().set(HD_SAFE, true) })
 */
export const HD_SAFE = new HttpContextToken<boolean>(() => false);

/**
 * Añade el Bearer a las requests del Helpdesk. Ante **401** (sesión inválida o
 * vencida) NO renueva el token ni reintenta: **cierra todos los popups abiertos**,
 * limpia la sesión y **redirige a /login** para volver a autenticarse. No dispara
 * ninguna petición adicional. La renovación *proactiva* del token vive aparte
 * (AuthService, timer en 2º plano), así que en uso normal el 401 es raro.
 * Ante **403** (sin permiso) también cierra sesión y redirige, salvo requests
 * "safe" (que solo fallan).
 */
export const helpdeskAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  const isProxy = req.url.startsWith(environment.helpdeskProxyUrl);
  // /auth/* (login/refresh/logout) van por fetch en AuthService; este guard evita
  // además redirigir por el propio flujo de auth.
  const isAuthCall = req.url.includes('/auth/');
  const safe = req.context.get(HD_SAFE);

  const withAuth = (t: string | null) =>
    isProxy && t ? req.clone({ setHeaders: { Authorization: `Bearer ${t}` } }) : req;

  // Cierra todos los popups y manda al login. Idempotente ante 401 concurrentes
  // (el guard de `router.url` evita re-navegar; tras clearSession, las requests
  // siguientes no llevan token y salen por el early-return de abajo).
  const goToLogin = () => {
    dialog.closeAll();
    auth.clearSession();
    if (!router.url.startsWith('/login')) router.navigate(['/login']);
  };

  return next(withAuth(auth.token)).pipe(
    catchError((err) => {
      if (!isProxy || isAuthCall || !auth.token) return throwError(() => err);
      // 401 = sesión inválida/vencida → SIN reintento ni refresh: cerrar popups y al login.
      if (err?.status === 401) {
        goToLogin();
        return throwError(() => err);
      }
      // 403 (sin permiso): el refresh no ayuda → cerrar sesión salvo "safe".
      if (err?.status === 403 && !safe) goToLogin();
      return throwError(() => err);
    }),
  );
};
