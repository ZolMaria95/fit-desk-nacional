-- =====================================================================
-- FitDesk · Backfill: el asignado de una tarea CON ticket es el del ticket.
-- tarea.asignado_a se quedaba con el anterior cuando el ticket se reasignaba
-- directo en el HelpDesk (en prod, 13 de 127 tareas activas con ticket al
-- 2026-09-28). Se copia el asignado del espejo cuando es un usuario de FitDesk.
-- Desde el código, TicketEspejoStore.propagarAsignado lo mantiene al día.
-- =====================================================================
UPDATE tarea t
   SET asignado_a = u.id,
       actualizado_en = now()
  FROM ticket_espejo e
  JOIN usuario u ON upper(u.helpdesk_user_id) = upper(e.asignado_hd)
 WHERE t.ticket_espejo_id = e.id
   AND e.asignado_hd IS NOT NULL
   AND t.asignado_a IS DISTINCT FROM u.id;

-- Ticket asignado a alguien que no es usuario de FitDesk: la tarea no debe quedar con el anterior
-- (el asignado efectivo sigue siendo el del espejo, que la UI resuelve por nombre).
UPDATE tarea t
   SET asignado_a = NULL,
       actualizado_en = now()
  FROM ticket_espejo e
 WHERE t.ticket_espejo_id = e.id
   AND e.asignado_hd IS NOT NULL
   AND t.asignado_a IS NOT NULL
   AND NOT EXISTS (SELECT 1 FROM usuario u WHERE upper(u.helpdesk_user_id) = upper(e.asignado_hd));
