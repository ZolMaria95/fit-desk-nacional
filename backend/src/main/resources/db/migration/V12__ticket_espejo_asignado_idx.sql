-- =====================================================================
-- FitDesk · Índice del asignado del ticket en el espejo
-- El asignado de una tarea CON ticket se DERIVA de ticket_espejo.asignado_hd
-- (SoT = el ticket manda; la tarea ya no guarda un dueño divergente). Este índice
-- acelera filtrar/derivar por asignado desde el espejo (board, "Asignados a mí").
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_ticket_espejo_asignado_hd ON ticket_espejo (asignado_hd);
