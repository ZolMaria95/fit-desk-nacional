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
 */
export function esEstadoFinalizado(estado: string | null | undefined): boolean {
  const e = (estado || '').toUpperCase();
  return e.includes('APROBADO')
    || e.includes('CERRADO POR EL CLIENTE')
    || e.includes('CERRADO POR FALTA DE RESPUESTA');
}
