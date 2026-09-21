/**
 * Copia texto al portapapeles de forma robusta.
 *
 * Usa la API moderna `navigator.clipboard.writeText` cuando está disponible (requiere
 * **contexto seguro**: HTTPS o localhost — p. ej. GitHub Pages). En el despliegue
 * **on-prem servido por HTTP sobre IP** esa API está bloqueada, así que cae a un
 * fallback clásico con un `<textarea>` temporal + `document.execCommand('copy')`.
 *
 * Devuelve `true` si el copiado se realizó; `false` si ningún método funcionó (el
 * llamador decide el feedback al usuario).
 */
export async function copyText(text: string): Promise<boolean> {
  const value = String(text ?? '');
  // 1) API moderna (contexto seguro).
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Cae al fallback (p. ej. permiso denegado o contexto no seguro).
  }
  // 2) Fallback: textarea fuera de pantalla + execCommand (contexto no seguro / navegadores viejos).
  try {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.left = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
