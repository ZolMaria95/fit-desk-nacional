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
 */
export function esEstadoFinalizado(estado: string | null | undefined): boolean {
  const e = (estado || '').toUpperCase();
  return e.includes('APROBADO')
    || e.includes('CERRADO POR EL CLIENTE')
    || e.includes('CERRADO POR FALTA DE RESPUESTA')
    || e.includes('NO APLICA');
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
