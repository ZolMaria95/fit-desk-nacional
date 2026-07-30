import { MatDialogRef } from '@angular/material/dialog';

/**
 * Hace que la tecla ESC respete la JERARQUÍA de ventanas en un `MatDialog`.
 *
 * Problema: por defecto, un `MatDialog` cierra con ESC. Cuando hay un popup abierto ENCIMA
 * del modal (autocomplete, mat-select, mat-menu, datepicker, un diálogo anidado…) y se pulsa
 * ESC, el evento acababa cerrando también el modal padre y se perdía lo escrito.
 *
 * Solución, apoyándose en el CDK: el `OverlayKeyboardDispatcher` entrega el keydown SOLO al
 * overlay superior de la pila. Marcando el diálogo con `disableClose = true` y escuchando
 * `keydownEvents()`:
 *  - Con un popup del CDK abierto → ese overlay es el superior, captura el ESC y se cierra él
 *    solo; el `keydownEvents()` del diálogo NO dispara → el modal queda abierto. (gratis)
 *  - Sin ningún popup del CDK → el diálogo es el overlay superior → su ESC dispara aquí → lo
 *    cerramos nosotros.
 *  - Para popups que NO son overlays del CDK (p. ej. un lightbox o un modo "lectura ampliada"
 *    dibujados como `div` dentro del propio modal) pásalos en `onEsc`: se cierran primero y,
 *    devolviendo `true`, "consumen" el ESC para que el modal no se cierre.
 *
 * Se conserva el cierre por clic en el backdrop (no cambia esa UX). `mat-dialog-close` y los
 * `ref.close()` programáticos siguen funcionando (no pasan por ESC).
 *
 * @param ref   el `MatDialogRef` del diálogo.
 * @param onEsc callback opcional: cierra un popup PROPIO (no-overlay) y devuelve `true` si lo
 *              consumió (entonces el modal no se cierra). Debe evaluar del más al frente al de atrás.
 */
export function wireDialogEsc(ref: MatDialogRef<unknown>, onEsc?: () => boolean): void {
  ref.disableClose = true;
  ref.keydownEvents().subscribe((e) => {
    if (e.key !== 'Escape') return;
    if (onEsc && onEsc()) return; // un popup propio consumió el ESC → no cerrar el modal
    ref.close();
  });
  ref.backdropClick().subscribe(() => ref.close());
}
