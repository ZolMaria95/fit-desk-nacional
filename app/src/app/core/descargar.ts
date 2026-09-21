/**
 * Disparar descargas de archivos desde el navegador, de forma que funcionen también en la
 * **PWA instalada**. Dos trampas que este helper resuelve y que es fácil volver a pisar:
 *
 * 1. **El ancla debe estar en el DOM.** Un `<a download>` suelto (creado y pulsado sin
 *    agregarlo al documento) funciona en una pestaña normal de Chrome, pero en la ventana
 *    *standalone* de la PWA el clic no dispara nada: el usuario ve que "no pasa nada".
 * 2. **No revocar el blob URL inmediatamente.** `URL.revokeObjectURL` justo después de
 *    `click()` corre una carrera contra el navegador, que aún no terminó de leer el blob →
 *    el archivo baja **vacío (0 KB)** o la descarga falla. Se revoca con retraso.
 */

/** Segundos de gracia antes de liberar el blob URL (el navegador ya terminó de leerlo). */
const REVOKE_MS = 10000;

/** Dispara la descarga de una URL ya existente (blob: o http:) con el nombre dado. */
export function descargarUrl(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Crea un blob URL, dispara la descarga y lo libera cuando ya es seguro. */
export function descargarBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  descargarUrl(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), REVOKE_MS);
}
