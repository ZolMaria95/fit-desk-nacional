import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { helpdeskAuthInterceptor } from './core/interceptors/helpdesk-auth.interceptor';

// touchGestures:'off' → en móvil MatTooltip NO entra al branch táctil, así que NO pone
// `touch-action: none` (inline) sobre el elemento del trigger. Ese estilo bloqueaba el
// scroll que arrancaba sobre un elemento con tooltip (barra inferior de las tarjetas de
// ticket: asignado, bandera, pausa, "Ver"). En escritorio el tooltip por hover no cambia.
const TOOLTIP_DEFAULTS: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 1500,
  touchGestures: 'off',
};

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
    // Tooltips: no bloquear el scroll táctil (ver TOOLTIP_DEFAULTS arriba).
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: TOOLTIP_DEFAULTS },
    // Service Worker (PWA): solo en producción. Registra ngsw-worker.js cuando la
    // app está estable (o a los 30s). La lógica de actualización vive en App.
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
