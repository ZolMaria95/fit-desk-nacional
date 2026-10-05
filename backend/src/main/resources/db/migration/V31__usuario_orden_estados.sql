-- =====================================================================
-- FitDesk · Orden personal de estados en Tickets (2026-10-04).
-- Cada responsable define en qué orden ve los tickets según su estado del HelpDesk
-- y qué estados oculta. JSON: [{"estado":"001","orden":1,"oculto":false}, ...]
-- (estado = ticket_status_id del HelpDesk). NULL = sin configuración (orden de siempre).
-- =====================================================================
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS orden_estados TEXT;
