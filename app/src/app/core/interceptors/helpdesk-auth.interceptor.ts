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
 * Ante **403** (sin permiso) del **HelpDesk** (`/api/v1/`) también cierra sesión y redirige,
 * salvo requests "safe" (que solo fallan). Un 403 del **API propio** NO cierra sesión: es una
 * regla de negocio y la pantalla debe poder mostrar el error.
 */
export const helpdeskAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  const isProxy = req.url.startsWith(environment.helpdeskProxyUrl);
  // El proxy 1:1 del HelpDesk vive SIEMPRE bajo `/api/v1/`. El API propio de FitDesk
  // (`/api/transferencias`, `/api/admin`, `/api/legacy`…) comparte ORIGEN con él en producción
  // —y con `quarkusApiUrl: ''` (mismo-origen) `startsWith` es cierto para todo—, así que la URL
  // base NO distingue: hay que mirar la ruta. Sin esto, un 403 de NUESTRA lógica de permisos
  // (p. ej. "solo el Responsable del equipo origen puede transferir") se confundía con una
  // sesión muerta del HelpDesk y expulsaba al usuario al login.
  const isHelpdeskProxy = req.url.includes('/api/v1/');
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
      // `isHelpdeskProxy` (por ruta, `/api/v1/`), no `isProxy` (por prefijo de URL): en
      // `environment.ts`/`.quarkus.ts`/`.cloud.ts`, `helpdeskProxyUrl` y `quarkusApiUrl` son
      // el MISMO origen, así que `isProxy` daba `true` para CUALQUIER llamada — incluido el API
      // propio de FitDesk (`/api/legacy/*`, `/api/notificaciones`…). Un 401 de una ruta nuestra
      // (poco común, pero posible) expulsaba a todo el mundo sin necesidad — "pierde sesión muy
      // rápido". Mismo motivo por el que el 403 de abajo ya usaba `isHelpdeskProxy`.
      if (!isHelpdeskProxy || isAuthCall) return throwError(() => err);
      // 401 = sesión inválida/vencida → SIN reintento ni refresh: cerrar popups y al login.
      // SIEMPRE redirige, incluso si `auth.token` ya no está: si el token expiró y se limpió
      // por otra vía, una petición en vuelo puede llegar sin él y devolver 401; el usuario
      // igual debe salir al login (antes el guard `!auth.token` lo dejaba atrapado).
      if (err?.status === 401) {
        goToLogin();
        return throwError(() => err);
      }
      // 403 (sin permiso) del HelpDesk: el refresh no ayuda → cerrar sesión salvo "safe". Requiere
      // token (un 403 sin sesión no debe forzar navegación). Un 403 del API PROPIO es una regla de
      // negocio ("no gobiernas ese equipo"), no una sesión inválida: se deja fallar para que la
      // pantalla muestre el mensaje, sin expulsar a nadie.
      if (err?.status === 403 && auth.token && !safe && isHelpdeskProxy) goToLogin();
      return throwError(() => err);
    }),
  );
};
