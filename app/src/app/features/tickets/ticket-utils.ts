// Modelo de ticket + funciones puras (port de js/helpdesk-panel.js).
import { AUTO_PATTERN, EMPLEADOS, TIPO_NOMBRE } from './helpdesk.constants';

export interface Ticket {
  ticket: string;
  tipoId: string;
  tipo: string;
  clienteRaw: string;
  clientId: string; // client_id del API (para asociar al board)
  usuarioIngreso: string;
  nombreIngreso: string;
  usuarioAsignado: string;
  nombreAsignado: string;
  orden: number;
  estatus: string;
  asunto: string;
  modulo: string;
  fechaAsignacion: string;
  fechaIngreso: string;
  fechaMod: string;
  usuarioUltimaMod: string;
  adjuntosTicket: string[];
  ultimoMensaje: string;
  fechaUltimoMensaje: string;
  usuarioUltimoMsg: string;
  reciente: boolean;
  diasSinMovimiento: number;
  diasDesdeIngreso: number;
  sinAsignar: boolean;
  recienteMensaje: boolean;
  tieneMensaje: boolean;
  clasificacion: string;
  accion: string;
  // índice para sort dinámico por columna
  [k: string]: unknown;
}

export function stripHtml(str: string): string {
  const div = document.createElement('div');
  div.innerHTML = String(str || '');
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
}

/** Quita scripts, handlers on* y javascript: del HTML de un mensaje (port de _safeHtml). */
export function safeHtml(html: string): string {
  return String(html || '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    .replace(/href\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, 'href="#"');
}

/** Escapa caracteres HTML de un texto plano. */
function escapeText(s: string): string {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Conserva la sangría sobre texto YA escapado: tabs y secuencias de 2+ espacios
 * pasan a `&nbsp;` para que no se colapsen al mostrar el mensaje (`.conv-text`
 * usa white-space normal). Un espacio suelto se deja normal para no romper el wrap.
 */
function preserveSpaces(escaped: string): string {
  return escaped
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
    .replace(/ {2,}/g, (m) => '&nbsp;'.repeat(m.length));
}

/**
 * Markdown en línea sobre texto YA escapado: `` `código` ``, `**negrita**` y
 * `*cursiva*`. La cursiva exige que el `*` toque texto (no espacio) para no
 * confundir multiplicaciones (`3 * 4`).
 */
function inlineMarkdown(escaped: string): string {
  return escaped
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^\n*]+)\*\*/g, '<b>$1</b>')
    .replace(/(^|[\s(>])\*(?!\s)([^\n*]+?)(?<!\s)\*/g, '$1<i>$2</i>');
}

// Estilos inline que conservamos al pegar (formato visible, sin layout).
const STYLE_KEEP = ['color', 'background-color', 'font-size', 'font-family'];

// Etiquetas de ESTRUCTURA que se conservan tal cual (con su propia envoltura):
// listas, citas y tablas con sus celdas. Preserva el formato real de ChatGPT/web.
const STRUCT_TAGS = new Set(['ul', 'ol', 'blockquote', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th']);

/**
 * Envuelve la selección del editor en un bloque de código `<pre>` (monoespaciado;
 * conserva saltos y sangría). Sin selección, convierte la línea actual en bloque.
 * Pensado para pegar código del IDE/terminal como texto plano y marcarlo a mano.
 */
export function insertCodeBlock(el: HTMLElement): void {
  el.focus();
  const sel = window.getSelection();
  if (sel && sel.rangeCount && !sel.isCollapsed) {
    const pre = document.createElement('pre');
    pre.textContent = sel.toString(); // texto plano: respeta saltos y espacios
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(pre);
    range.setStartAfter(pre);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    document.execCommand('formatBlock', false, 'pre');
  }
}

/**
 * Serializa el contenido del editor de respuesta (contenteditable con
 * `white-space: pre-wrap`) a HTML listo para enviar/editar. El backend del
 * HelpDesk descarta los `\n` literales (en HTML son espacio y se colapsan) y
 * tira los bloques <div>/<p>, así que un mensaje de 2 líneas llegaba como una
 * sola. Aquí convertimos bloques Y saltos literales a `<br>` (que SÍ sobreviven),
 * sin tocar el `\n` dentro de <pre>/<code> (código verbatim). Función pura.
 */
export function editorToMessageHtml(el: HTMLElement): string {
  const clone = el.cloneNode(true) as HTMLElement;
  // 1) Aplana solo los <div> que crea el editor al presionar Enter (Chrome/Safari)
  //    a <br>. Los <p> se CONSERVAN (párrafos reales pegados de ChatGPT/web) para no
  //    perder la separación de párrafos. Bloque "vacío" = línea en blanco.
  const esBloqueVacio = (b: Element) => !b.textContent?.trim() && !b.querySelector('img');
  let bloque = clone.querySelector('div');
  while (bloque) {
    const padre = bloque.parentNode!;
    if (esBloqueVacio(bloque)) {
      padre.insertBefore(document.createElement('br'), bloque);
    } else {
      if (bloque.previousSibling) padre.insertBefore(document.createElement('br'), bloque);
      while (bloque.firstChild) padre.insertBefore(bloque.firstChild, bloque);
    }
    padre.removeChild(bloque);
    bloque = clone.querySelector('div');
  }
  // 2) Convierte los \n literales (Enter con white-space:pre-wrap) a <br>,
  //    salvo dentro de <pre>/<code> (código verbatim).
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT);
  const textos: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) textos.push(n as Text);
  for (const tn of textos) {
    if (!tn.nodeValue || !tn.nodeValue.includes('\n') || tn.parentElement?.closest('pre, code')) continue;
    const partes = tn.nodeValue.split('\n');
    const frag = document.createDocumentFragment();
    partes.forEach((parte, i) => {
      if (i > 0) frag.appendChild(document.createElement('br'));
      if (parte) frag.appendChild(document.createTextNode(parte));
    });
    tn.parentNode!.replaceChild(frag, tn);
  }
  return clone.innerHTML.replace(/(\s*<br\s*\/?>\s*)+$/i, '').trim(); // quita <br> finales
}

/**
 * Convierte el contenido del portapapeles en HTML limpio listo para enviar.
 * - Si hay `text/html` (ChatGPT, Word, páginas web) SIEMPRE se prefiere: es HTML
 *   semántico y `sanitizePastedHtml` conserva su estructura (títulos, párrafos,
 *   listas, tablas, citas, código) descartando solo el ruido inseguro. (Antes se
 *   descartaba el HTML si el plano "parecía markdown" y se perdía toda la estructura.)
 * - Si NO hay `text/html` (bloc de notas, terminal), el texto plano se interpreta
 *   como markdown de bloque + en línea con `markdownToHtml`.
 */
export function clipboardToHtml(html: string, plain: string): string {
  if (html && html.trim()) return sanitizePastedHtml(html);
  return markdownToHtml(plain);
}

/**
 * Texto plano (posible markdown) → HTML. Interpreta BLOQUES: código ```…```,
 * encabezados `#`, citas `>`, listas `-`/`1.`, y párrafos separados por línea en
 * blanco (saltos suaves internos con `<br>`), además del markdown en línea.
 */
function markdownToHtml(plain: string): string {
  const lines = String(plain || '').replace(/\r\n?/g, '\n').split('\n');
  const inline = (t: string) => inlineMarkdown(preserveSpaces(escapeText(t)));
  const esBloque = (l: string) =>
    /^\s*```|^\s{0,3}#{1,6}\s|^\s{0,3}>\s?|^\s{0,3}[-*+]\s+|^\s{0,3}\d+[.)]\s+/.test(l);
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {                       // bloque de código
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre>${escapeText(buf.join('\n'))}</pre>`);
      continue;
    }
    const h = /^\s{0,3}(#{1,6})\s+(.*)$/.exec(line);   // encabezado
    if (h) { out.push(`<h${h[1].length}>${inline(h[2].trim())}</h${h[1].length}>`); i++; continue; }
    if (/^\s{0,3}>\s?/.test(line)) {                   // cita
      const buf: string[] = [];
      while (i < lines.length && /^\s{0,3}>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^\s{0,3}>\s?/, ''));
      out.push(`<blockquote>${markdownToHtml(buf.join('\n'))}</blockquote>`);
      continue;
    }
    if (/^\s{0,3}[-*+]\s+/.test(line)) {               // lista con viñetas
      const it: string[] = [];
      while (i < lines.length && /^\s{0,3}[-*+]\s+/.test(lines[i])) it.push(inline(lines[i++].replace(/^\s{0,3}[-*+]\s+/, '')));
      out.push(`<ul>${it.map((x) => `<li>${x}</li>`).join('')}</ul>`);
      continue;
    }
    if (/^\s{0,3}\d+[.)]\s+/.test(line)) {             // lista numerada
      const it: string[] = [];
      while (i < lines.length && /^\s{0,3}\d+[.)]\s+/.test(lines[i])) it.push(inline(lines[i++].replace(/^\s{0,3}\d+[.)]\s+/, '')));
      out.push(`<ol>${it.map((x) => `<li>${x}</li>`).join('')}</ol>`);
      continue;
    }
    if (!line.trim()) { i++; continue; }               // línea en blanco
    const para: string[] = [];                         // párrafo (líneas contiguas)
    while (i < lines.length && lines[i].trim() && !esBloque(lines[i])) para.push(lines[i++]);
    out.push(`<p>${para.map(inline).join('<br>')}</p>`);
  }
  return out.join('');
}

/**
 * Reduce el HTML pegado a un subconjunto seguro conservando el formato visible
 * (negrita, cursiva, subrayado, color, fondo, fuente, enlaces, saltos, viñetas
 * `ul/ol/li` y código `pre/code`) pero descartando el "ruido" de Word/web
 * (clases, estilos de bloque, <style>, <meta>, comentarios y scripts). Ese ruido
 * es lo que el backend descartaba, publicando el mensaje vacío.
 */
export function sanitizePastedHtml(html: string): string {
  const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
  return serializePasted(doc.body).replace(/(<br>\s*)+$/, '').trim();
}

/**
 * @param preWs  el contenedor preserva los espacios (white-space: pre*); entonces
 *               los saltos pasan a `<br>` y la sangría a `&nbsp;`. Si no, el texto
 *               se colapsa como hace el navegador (y los bloques añaden el salto).
 * @param inCode dentro de `<code>`: texto verbatim, sin markdown ni saltos.
 */
function serializePasted(node: Node, preWs = false, inCode = false): string {
  let out = '';
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const raw = child.textContent || '';
      if (inCode) {
        out += escapeText(raw);
      } else if (preWs) {
        out += inlineMarkdown(preserveSpaces(escapeText(raw))).replace(/\r?\n/g, '<br>');
      } else {
        // Flujo normal: los saltos/espacios del fuente HTML se colapsan a uno.
        out += inlineMarkdown(escapeText(raw.replace(/\s+/g, ' ')));
      }
      return;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) return;
    const el = child as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === 'br') {
      out += '<br>';
      return;
    }
    if (tag === 'script' || tag === 'style' || tag === 'head') return;

    // Bloque de código: conserva el texto tal cual (saltos y sangría) sin formato.
    if (tag === 'pre') {
      out += `<pre>${escapeText(el.textContent || '')}</pre>`;
      return;
    }

    const style = (el.getAttribute('style') || '').toLowerCase();
    const childPreWs = preWs || /white-space:\s*pre/.test(style);
    let frag = serializePasted(el, childPreWs, inCode || tag === 'code');

    // ── ESTRUCTURA que se conserva con su propia etiqueta ──
    // Listas, citas y tablas (con thead/tbody/tr/td/th): se emiten tal cual.
    if (STRUCT_TAGS.has(tag)) {
      out += `<${tag}>${frag}</${tag}>`;
      return;
    }
    if (tag === 'li') {
      out += `<li>${frag.replace(/(<br>\s*)+$/, '')}</li>`;
      return;
    }
    if (tag === 'code') {
      out += `<code>${frag}</code>`;
      return;
    }
    // Encabezados: se conservan como <h1>–<h6> (título real, no negrita suelta).
    if (/^h[1-6]$/.test(tag)) {
      out += `<${tag}>${frag.replace(/(<br>\s*)+$/, '')}</${tag}>`;
      return;
    }

    // ── FORMATO EN LÍNEA (negrita/cursiva/subrayado/color/enlace) ──
    const peso = /font-weight:\s*(bold(?:er)?|\d+)/.exec(style)?.[1];
    const bold =
      tag === 'b' || tag === 'strong' ||
      peso === 'bold' || peso === 'bolder' || (!!peso && +peso >= 600);
    const italic = tag === 'i' || tag === 'em' || /font-style:\s*italic/.test(style);
    const underline = tag === 'u' || /text-decoration:[^;]*underline/.test(style);

    // Conserva color/fondo/fuente como estilo saneado (sin url(), comillas ni <>).
    const keep: string[] = [];
    STYLE_KEEP.forEach((prop) => {
      const m = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, 'i').exec(style);
      const val = m?.[1].trim().replace(/["'<>]/g, '');
      if (val && !/url\s*\(|expression/i.test(val)) keep.push(`${prop}: ${val}`);
    });
    if (frag && keep.length) frag = `<span style="${keep.join('; ')}">${frag}</span>`;

    if (tag === 'a') {
      const href = el.getAttribute('href') || '';
      if (/^https?:/i.test(href)) frag = `<a href="${href}">${frag}</a>`;
    }
    if (bold) frag = `<b>${frag}</b>`;
    if (italic) frag = `<i>${frag}</i>`;
    if (underline) frag = `<u>${frag}</u>`;
    // Párrafos y divisiones: párrafo real (con separación) o salto de bloque.
    if (tag === 'p') { out += `<p>${frag}</p>`; return; }
    if (tag === 'div') { out += `${frag}<br>`; return; }
    out += frag;
  });
  return out;
}

/** Escanea el ticket crudo en busca de ids de adjunto (campos attach/adjunto/archivo). */
export function ticketAttachIds(t: any): string[] {
  if (!t || typeof t !== 'object') return [];
  const ids: string[] = [];
  const push = (v: unknown) => {
    if (v !== null && v !== undefined && v !== '') ids.push(String(v));
  };
  Object.entries(t).forEach(([k, v]) => {
    if (!/attach|adjunt|archivo/i.test(k)) return;
    if (Array.isArray(v)) v.forEach(push);
    else if (typeof v === 'string' || typeof v === 'number') push(v);
  });
  return [...new Set(ids)].filter((id) => /^\d+$/.test(id));
}

export function mapTicket(t: any): Ticket {
  return {
    ticket: String(t.ticket_id || ''),
    tipoId: t.ticket_type_id || '',
    tipo: TIPO_NOMBRE[t.ticket_type_id] || t.ticket_type_id || '',
    clienteRaw: String(t.cliente || '').trim().toUpperCase(),
    clientId: String(t.client_id ?? '').trim(),
    usuarioIngreso: t.entry_user_id || '',
    nombreIngreso: t.entry_person || '',
    usuarioAsignado: String(t.assigned_user_id || '').trim().toUpperCase(),
    nombreAsignado: t.assigned_person || '',
    orden: parseInt(t.priority || 999, 10),
    estatus: t.estado || '',
    asunto: t.subject || '',
    modulo: t.modulo || '',
    fechaAsignacion: t.assigned_date || '',
    fechaIngreso: t.entry_date || '',
    fechaMod: t.modified_date || '',
    usuarioUltimaMod: t.assigned_user_id || '',
    adjuntosTicket: ticketAttachIds(t),
    ultimoMensaje: '',
    fechaUltimoMensaje: '',
    usuarioUltimoMsg: '',
    reciente: false,
    diasSinMovimiento: 0,
    diasDesdeIngreso: 0,
    sinAsignar: false,
    recienteMensaje: false,
    tieneMensaje: false,
    clasificacion: '',
    accion: '',
  };
}

/** Toma el último mensaje no-automático del ticket (port de _applyMessages). */
export function applyMessages(ticket: Ticket, mensajes: any[]): void {
  for (let j = mensajes.length - 1; j >= 0; j--) {
    const m = mensajes[j];
    if (m.system_message === false && m.detail && String(m.detail).trim() && !AUTO_PATTERN.test(m.detail)) {
      ticket.ultimoMensaje = stripHtml(m.detail);
      ticket.fechaUltimoMensaje = m.entry_date || '';
      ticket.usuarioUltimoMsg = m.entry_user_id || '';
      break;
    }
  }
}

export function evaluarFechas(t: Ticket): Ticket {
  const ahora = new Date();
  const fechaMod = new Date(t.fechaMod);
  const fechaIng = new Date(t.fechaIngreso);
  const fechaMsg = new Date(t.fechaUltimoMensaje);
  const diffMod = (ahora.getTime() - fechaMod.getTime()) / 864e5;
  const diffIng = (ahora.getTime() - fechaIng.getTime()) / 864e5;
  const diffMsg = (ahora.getTime() - fechaMsg.getTime()) / 864e5;

  t.reciente = !isNaN(fechaMod.getTime()) && diffMod <= 2;
  t.diasSinMovimiento = isNaN(diffMod) ? 0 : Math.floor(diffMod);
  t.diasDesdeIngreso = isNaN(diffIng) ? Math.floor(diffMod) : Math.floor(diffIng);
  t.sinAsignar = !t.usuarioAsignado || t.usuarioAsignado === 'SIN ASIGNAR';
  t.recienteMensaje = !isNaN(fechaMsg.getTime()) && diffMsg <= 2;
  t.tieneMensaje = !!t.ultimoMensaje.trim();
  return t;
}

/** Clasifica el ticket en categoría + acción (port de _clasificar). */
export function clasificar(t: Ticket): Ticket {
  const { orden, reciente, estatus, sinAsignar, diasDesdeIngreso, recienteMensaje, tieneMensaje } = t;
  const est = estatus.toUpperCase();

  const esCambioPrioridad = AUTO_PATTERN.test(t.ultimoMensaje);
  const esCambioEstatusAuto = /el usuario .+ cambi[oó] (el |la asignaci[oó]n)/i.test(t.ultimoMensaje);
  const esAutoMensaje = esCambioPrioridad || esCambioEstatusAuto;

  if (esCambioPrioridad) {
    t.clasificacion = 'SIN ACCION';
    t.accion = 'CAMBIO DE PRIORIDAD';
  } else if (esCambioEstatusAuto) {
    t.clasificacion = 'SIN ACCION';
    t.accion = 'CAMBIO DE ESTATUS';
  } else if (est.includes('ENTREGADO')) {
    t.clasificacion = 'CLIENTE PENDIENTE';
    t.accion = 'NO REQUIERE ATENCION';
  } else if (est.includes('INFO PENDIENTE CLIENTE')) {
    t.clasificacion = 'CLIENTE PENDIENTE';
    t.accion = 'ESPERANDO RESPUESTA DEL CLIENTE';
  } else if (sinAsignar && diasDesdeIngreso > 3) {
    t.clasificacion = 'VERIFICAR MOTIVO DE NO ASIGNACION';
    t.accion = 'SIN ASIGNAR MUCHOS DIAS - REVISAR CAUSA';
  } else if (sinAsignar && diasDesdeIngreso > 1) {
    t.clasificacion = 'SIN ASIGNAR';
    t.accion = 'REQUIERE REVISION';
  } else if (sinAsignar) {
    t.clasificacion = 'SIN ASIGNAR';
    t.accion = 'ASIGNAR TECNICO';
  } else if (orden === 1 && reciente) {
    t.clasificacion = 'URGENTE';
    t.accion = 'ATENDER INMEDIATAMENTE';
  } else if (orden <= 2 && reciente) {
    t.clasificacion = 'ALTA PRIORIDAD';
    t.accion = 'REVISAR HOY';
  } else if (reciente) {
    t.clasificacion = 'RECIENTE';
    t.accion = 'VALIDAR CAMBIOS';
  } else if (recienteMensaje && tieneMensaje) {
    t.clasificacion = 'REQUIERE REVISION';
    t.accion = 'MENSAJE RECIENTE PENDIENTE';
  } else if (orden === 1 && !reciente) {
    t.clasificacion = 'CRITICO SIN MOVIMIENTO';
    t.accion = 'ESCALAR INMEDIATAMENTE';
  } else if (est.includes('INFO PENDIENTE')) {
    t.clasificacion = 'CLIENTE PENDIENTE';
    t.accion = 'ESPERAR RESPUESTA CLIENTE';
  } else {
    t.clasificacion = 'SIN ACCION';
    t.accion = 'NO REQUIERE ATENCION';
  }

  // Si el último comentario fue de un empleado FitBank, sobreescribir acción.
  const ultimoUsuario = (t.usuarioUltimoMsg || t.usuarioUltimaMod || '').trim().toUpperCase();
  if (!esAutoMensaje && EMPLEADOS.has(ultimoUsuario) && !est.includes('EN PROCESO')) {
    t.accion = 'COMENTARIO ENVIADO POR FITBANK';
  }
  if (t.accion === 'COMENTARIO ENVIADO POR FITBANK' && t.clasificacion === 'SIN ASIGNAR') {
    t.accion = 'ASIGNAR TECNICO';
  }

  t.clasificacion = t.clasificacion.toUpperCase();
  t.accion = t.accion.toUpperCase();
  return t;
}
