/**
 * Color IDENTIFICATIVO de cada persona, y la aritmética para que se lea siempre.
 *
 * Antes de esto había CUATRO sistemas de color por persona conviviendo, cada uno con su paleta y
 * su criterio, así que la misma persona salía de un color distinto en cada pantalla:
 *   · avatar propio  → HSL por hash del id            (auth.service)
 *   · board/tickets  → paleta de 12 por hash del id   (board-utils)
 *   · semanal        → paleta por ÍNDICE en la lista  (cambia si cambia el orden del equipo)
 *   · vacaciones     → paleta por ORDEN DE APARICIÓN  (cambia al cambiar el filtro)
 * Este módulo los sustituye a los cuatro: el color sale SIEMPRE de la identidad (`helpdesk_user_id`).
 *
 * La otra mitad del problema es que ahora el color lo elige una persona, no nosotros. Un amarillo
 * claro sobre fondo blanco, o un azul marino sobre fondo oscuro, son ilegibles. En el repo no había
 * ni una función de contraste (se resolvía a mano, componente a componente, y ya ha costado varios
 * bugs), así que aquí va la aritmética: `tintaSobre` y `colorChip` son lo que hace seguro cualquier
 * color que alguien escoja.
 */

/**
 * Paleta identificativa: colores vivos y distinguibles ENTRE SÍ (no tonos del mismo color, que es
 * justo lo que impide reconocer a alguien de un vistazo).
 *
 * Parte de la del diálogo de cliente —que ya se usaba para lo mismo— sin los dos grises apagados, y
 * se amplía a 20. El tamaño no es estético: con 14 colores y 19 empleados el reparto automático
 * dejaba **5 personas con el color de otra**. Los seis añadidos son tonos que faltaban del todo
 * (rosa, marrón, azul grisáceo, lima, índigo, verde azulado profundo) en vez de un cuarto naranja.
 */
export const PALETA = [
  '#E74C3C', '#E67E22', '#F2811D', '#F1C40F', '#27AE60', '#16A085',
  '#1ABC9C', '#2980B9', '#04BAF0', '#3498DB', '#9B59B6', '#8E44AD',
  '#D35400', '#C0392B', '#E91E63', '#795548', '#607D8B', '#8BC34A',
  '#3F51B5', '#00897B',
];

/** Superficies sobre las que se pinta, por tema (las mismas del resto de la app). */
const FONDO_CLARO = '#ffffff';
const FONDO_OSCURO = '#1a222b';
/** Tintas de texto disponibles: se elige la que más contraste dé sobre el fondo que toque. */
const TINTA_OSCURA = '#0f151b';
const TINTA_CLARA = '#ffffff';

// ── Aritmética de color ───────────────────────────────────────────────────────

/** '#RRGGBB' | '#RGB' | 'rgb(r,g,b)' → [r,g,b]. Devuelve null si no se entiende. */
export function aRgb(color: string): [number, number, number] | null {
  const s = String(color || '').trim();
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s);
  if (m) {
    const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const r = /rgba?\(([^)]+)\)/i.exec(s);
  if (r) {
    const p = r[1].split(',').map((n) => Number(n.trim()));
    if (p.length >= 3 && p.slice(0, 3).every((n) => Number.isFinite(n))) return [p[0], p[1], p[2]];
  }
  return null;
}

const aHex = ([r, g, b]: [number, number, number]): string =>
  '#' + [r, g, b].map((n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0')).join('');

/** Luminancia relativa (WCAG 2.1). 0 = negro, 1 = blanco. */
export function luminancia(color: string): number {
  const rgb = aRgb(color);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map((v) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Relación de contraste WCAG entre dos colores (1 = idénticos, 21 = negro/blanco). */
export function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/** Mezcla lineal: `peso` = cuánto del primer color (0..1). */
export function mezclar(color: string, base: string, peso: number): string {
  const c = aRgb(color), b = aRgb(base);
  if (!c || !b) return color;
  return aHex([0, 1, 2].map((i) => c[i] * peso + b[i] * (1 - peso)) as [number, number, number]);
}

/** ¿Es un hexadecimal `#RRGGBB` válido? (lo que se acepta al escribirlo a mano). */
export function esHexValido(color: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(String(color || '').trim());
}

// ── Legibilidad ───────────────────────────────────────────────────────────────

/**
 * Tinta legible ENCIMA de un fondo sólido: la que más contraste dé, blanca o casi negra.
 * Es lo que evita que las iniciales de un avatar desaparezcan cuando alguien elige un color claro.
 */
export function tintaSobre(fondo: string): string {
  return contraste(TINTA_CLARA, fondo) >= contraste(TINTA_OSCURA, fondo) ? TINTA_CLARA : TINTA_OSCURA;
}

/**
 * Acerca o aleja un color de una superficie hasta que se lea encima (`min` de contraste), sin
 * cambiar su tono: se mezcla con la tinta contraria en pasos. Si aun así no llega —un gris medio
 * nunca contrasta bien contra nada—, devuelve la tinta legible y se acepta perder el tono.
 */
export function ajustarSobre(color: string, superficie: string, min = 4.5): string {
  if (!aRgb(color)) return tintaSobre(superficie);
  if (contraste(color, superficie) >= min) return color;
  const hacia = luminancia(superficie) > 0.4 ? TINTA_OSCURA : TINTA_CLARA;
  for (let p = 0.9; p >= 0.1; p -= 0.1) {
    const c = mezclar(color, hacia, p);
    if (contraste(c, superficie) >= min) return c;
  }
  return tintaSobre(superficie);
}

/**
 * Par `{bg, fg}` para un AVATAR: círculo del color de la persona con sus iniciales encima.
 *
 * Ojo con el detalle que obliga a esto: seis colores de la paleta caen en una franja de luminancia
 * media (~0.19) donde **ni el blanco ni el casi negro llegan a 4.5** encima (el peor daba 4.30). No
 * es cosa de elegir mejor la tinta: hay que mover el FONDO. Se oscurece o aclara el color lo justo,
 * conservando el tono, hasta que la tinta despegue.
 */
export function colorAvatar(color: string): { bg: string; fg: string } {
  if (!aRgb(color)) return { bg: SIN_ASIGNAR, fg: tintaSobre(SIN_ASIGNAR) };
  let bg = color;
  if (contraste(tintaSobre(bg), bg) < 4.5) {
    // Se empuja hacia el extremo que ya iba ganando: así el tono se reconoce igual.
    const hacia = tintaSobre(color) === TINTA_CLARA ? TINTA_OSCURA : TINTA_CLARA;
    for (let p = 0.95; p >= 0.5; p -= 0.05) {
      const c = mezclar(color, hacia, p);
      if (contraste(tintaSobre(c), c) >= 4.5) { bg = c; break; }
    }
  }
  return { bg, fg: tintaSobre(bg) };
}

/**
 * Par `{bg, fg}` para un chip de calendario a partir del color de la persona, por tema.
 * Reproduce la relación que ya tenían las paletas de Semanal y Vacaciones:
 *   · claro  → fondo suave (color diluido en blanco) + texto del color, oscurecido si hace falta
 *   · oscuro → fondo tintado oscuro + texto del color, aclarado si hace falta
 * La diferencia es que ahora sale del color ELEGIDO, no de una paleta fija por posición.
 */
export function colorChip(color: string, oscuro: boolean): { bg: string; fg: string } {
  const base = oscuro ? FONDO_OSCURO : FONDO_CLARO;
  const bg = mezclar(color, base, oscuro ? 0.22 : 0.16);
  return { bg, fg: ajustarSobre(color, bg) };
}

// ── El color de una persona ───────────────────────────────────────────────────

/** hash estable de un id → entero (mismo algoritmo que ya usaba el board). */
function hash(id: string): number {
  let h = 0;
  const s = String(id || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Color de quien no tiene asignado a nadie. */
export const SIN_ASIGNAR = '#9aa0a6';

/**
 * Nombre de persona presentable. Los usuarios que el backend crea al asignar un rol copian el
 * nombre **tal cual viene del HelpDesk**, que lo guarda TODO EN MAYÚSCULAS ("BUNAY RAMOS SEGUNDO
 * SEBASTIAN"), mientras que los cargados a mano tienen nombre curado ("Sol Contreras"). Mezclados
 * en una misma lista chirrían y parecen de otro sitio.
 *
 * Se normaliza al PINTAR, no en la base: así vale también para los que se creen mañana y no hay que
 * tocar datos de producción. Solo actúa si el texto viene todo en mayúsculas — un nombre ya bien
 * escrito se respeta tal cual, incluidas partículas como "de la".
 */
export function nombrePropio(nombre: string): string {
  const s = String(nombre || '').trim();
  if (!s || s !== s.toUpperCase()) return s; // ya viene con minúsculas: no se toca
  const MINUS = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'da', 'do', 'dos']);
  return s
    .toLocaleLowerCase('es')
    .split(/\s+/)
    .map((p, i) => (i > 0 && MINUS.has(p) ? p : p.charAt(0).toLocaleUpperCase('es') + p.slice(1)))
    .join(' ');
}

/**
 * Colores RESERVADOS a una persona concreta: nadie más puede elegirlos.
 *
 * Es una excepción **manual y deliberada** a la regla general, que avisa de los colores repetidos
 * pero los permite. Se comprueba aquí para avisar al instante, pero quien de verdad lo impide es el
 * backend (`PerfilResource.setColor`): el frontend no es un límite.
 *
 * Estos colores NO están en `PALETA`, así que el reparto automático nunca se los da a nadie.
 */
export const RESERVADOS: Record<string, string> = {
  '#DCBEFF': 'KDLS001', // Domenica Lasso
};

/** Si el color está reservado para OTRA persona, devuelve el hid de su dueño; si no, ''. */
export function reservadoPara(color: string, hid: string): string {
  const dueno = RESERVADOS[String(color || '').trim().toUpperCase()];
  if (!dueno) return '';
  return dueno.toUpperCase() === String(hid || '').trim().toUpperCase() ? '' : dueno;
}

/**
 * Reparte colores entre TODO el equipo de una vez. Se construye una sola vez (en `ColoresService`)
 * y las pantallas solo consultan el mapa resultante.
 *
 * Se hace sobre el equipo completo, y no persona a persona, porque repartir por hash individual
 * **choca**: con 14 colores y 12 personas salían 4 repetidos (uno de ellos tres veces), y dos
 * personas del mismo color es exactamente lo que esta función tiene que evitar.
 *
 * Reparto:
 *  1. Quien ELIGIÓ color se queda con el suyo, pase lo que pase.
 *  2. El resto, en orden alfabético de id (determinista, no depende de cómo llegue la lista): cada
 *     uno toma el hueco que le da su hash y, si está ocupado, avanza al siguiente libre.
 *
 * Así el color de alguien solo cambia si entra al equipo otra persona que choque justo con él, o si
 * alguien elige su color a mano. Entre recargas, filtros y pantallas es siempre el mismo.
 */
export function construirMapa(hids: string[], elegidos: Record<string, string> = {}): Record<string, string> {
  const norm = (s: string) => String(s || '').trim().toUpperCase();
  const mapa: Record<string, string> = {};
  const ocupados = new Set<string>();

  const elegidoDe = (id: string) => {
    const v = elegidos[id] ?? elegidos[norm(id)];
    return v && esHexValido(v) ? v : '';
  };

  const todos = [...new Set(hids.map(norm).filter(Boolean))];
  // 1) los que eligieron
  for (const id of todos) {
    const c = elegidoDe(id);
    if (c) { mapa[id] = c; ocupados.add(norm(c)); }
  }
  // 2) el resto, en orden fijo y saltando lo ocupado
  for (const id of todos.filter((i) => !mapa[i]).sort()) {
    const inicio = hash(id) % PALETA.length;
    let color = PALETA[inicio];
    for (let i = 0; i < PALETA.length; i++) {
      const c = PALETA[(inicio + i) % PALETA.length];
      if (!ocupados.has(norm(c))) { color = c; break; }
    }
    mapa[id] = color;
    ocupados.add(norm(color));
  }
  return mapa;
}

/**
 * Color de una persona a partir del mapa ya construido. Si no está en el equipo (p. ej. un asignado
 * del HelpDesk que no es usuario de FitDesk) cae a su color elegido, y si no, a uno por hash — con
 * el riesgo de repetirse que eso implica, pero es preferible a dejarlo sin color.
 */
export function colorDe(hid: string, mapa: Record<string, string> = {}): string {
  const id = String(hid || '').trim().toUpperCase();
  if (!id) return SIN_ASIGNAR;
  return mapa[id] || PALETA[hash(id) % PALETA.length];
}

/** ¿Quién más usa ya este color? Devuelve los hid (para avisar en el selector del perfil). */
export function quienUsa(color: string, elegidos: Record<string, string>, exceptoHid = ''): string[] {
  const c = String(color || '').trim().toUpperCase();
  if (!c) return [];
  return Object.entries(elegidos)
    .filter(([k, v]) => k.toUpperCase() !== exceptoHid.toUpperCase() && String(v || '').toUpperCase() === c)
    .map(([k]) => k);
}
