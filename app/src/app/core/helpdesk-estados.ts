/**
 * Fuente ÚNICA de verdad de "¿este estado de ticket del HelpDesk significa FINALIZADO?".
 * La usan el board (check "Finalizado" + columna Done) y la vista Tickets (tabs operativas
 * + lista de estados no-finalizados que va server-side a Pendientes). Se compara por
 * inclusión y en mayúsculas para tolerar variantes del texto del API.
 *
 * Estados finalizados conocidos:
 *  - APROBADO
 *  - CERRADO POR EL CLIENTE
 *  - CERRADO POR FALTA DE RESPUESTA DEL CLIENTE
 *  - NO APLICA (mismo trato que los cerrados: finalizado y solo lectura)
 *  - RECHAZADO y COTIZACION NO ACEPTADA (decisión de la dueña, 2026-10-05)
 * Espejo en el backend: `core/EstadoTicket.java` (si cambia uno, cambiar el otro).
 */
export function esEstadoFinalizado(estado: string | null | undefined): boolean {
  const e = normEstado(estado);
  return e.includes('APROBADO')
    || e.includes('CERRADO POR EL CLIENTE')
    || e.includes('CERRADO POR FALTA DE RESPUESTA')
    || e.includes('NO APLICA')
    || e.includes('RECHAZADO')
    || e.includes('NO ACEPTADA');
}

/** Mayúsculas y sin tildes (el catálogo mezcla "COTIZACIÓN" y "COTIZACION"). */
export function normEstado(estado: string | null | undefined): string {
  return (estado || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

/**
 * ¿El estado pertenece al grupo CERRADO? (CERRADO POR EL CLIENTE / POR FALTA DE
 * RESPUESTA / NO APLICA). Es el SUBCONJUNTO de los terminales que se pinta y se
 * sombrea en GRIS: la card se ve apagada. APROBADO NO entra (mantiene su verde).
 * Fuente única del criterio "cerrado" para color (`estadoStyle`) y sombreado (card).
 */
export function esEstadoCerrado(estado: string | null | undefined): boolean {
  const e = normEstado(estado);
  // COTIZACION NO ACEPTADA "se considera cerrado" (dueña, 2026-10-05).
  return e.includes('CERRADO') || e.includes('NO APLICA') || e.includes('NO ACEPTADA');
}

/**
 * ¿El ticket está en un estado TERMINAL de "solo lectura"? En estos estados no se
 * puede responder ni asignar; cambiar de estado queda reservado al Responsable de
 * Equipo/Admin (el permiso se decide en la vista, no aquí). Cubre los finalizados
 * (`esEstadoFinalizado`) + "Cotización rechazada" (= `COTIZACION NO ACEPTADA`, el
 * único estado con "NO ACEPTADA" → match sin acentos, robusto ante el catálogo).
 */
export function esSoloLectura(estado: string | null | undefined): boolean {
  if (esEstadoFinalizado(estado)) return true;
  return (estado || '').toUpperCase().includes('NO ACEPTADA');
}
