-- =====================================================================
-- FitDesk · Pendientes (recordatorios) por USUARIO
-- Antes: un recordatorio GLOBAL por ticket (UNIQUE en helpdesk_ticket_id),
-- compartido por todos. Ahora cada pendiente tiene DUEÑO y la unicidad pasa a
-- (ticket, usuario): dos personas pueden tener su propio recordatorio del mismo
-- ticket, y la lectura se filtra por rol (personal / equipo / admin ve todo).
-- Los pendientes migrados quedan con usuario_id NULL (sin dueño → no los ve nadie
-- en el modelo nuevo; se re-crean con dueño al usarse).
-- =====================================================================

ALTER TABLE ticket_pendiente ADD COLUMN IF NOT EXISTS usuario_id BIGINT REFERENCES usuario(id);

-- Quitar la unicidad global por ticket y ponerla por (ticket, usuario).
ALTER TABLE ticket_pendiente DROP CONSTRAINT IF EXISTS ticket_pendiente_helpdesk_ticket_id_key;
ALTER TABLE ticket_pendiente
    ADD CONSTRAINT uq_pendiente_ticket_usuario UNIQUE (helpdesk_ticket_id, usuario_id);

CREATE INDEX IF NOT EXISTS idx_pendiente_usuario ON ticket_pendiente(usuario_id);
