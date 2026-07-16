import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { helpdeskAuthInterceptor } from './core/interceptors/helpdesk-auth.interceptor';

// Angular Material 22 usa animaciones basadas en CSS; no requiere
// provideAnimations()/@angular/animations (por eso `ng add` no lo añadió).
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Hash routing (#/ruta): GitHub Pages sirve el Angular en subcarpeta y, sin
    // fallback SPA, las rutas por path darían 404 al refrescar. El hash lo evita.
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([helpdeskAuthInterceptor])),
    // Datepicker de Material en es-ES (formato dd/mm/yyyy).
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    // Service Worker (PWA): solo en producción. Registra ngsw-worker.js cuando la
    // app está estable (o a los 30s). La lógica de actualización vive en App.
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
