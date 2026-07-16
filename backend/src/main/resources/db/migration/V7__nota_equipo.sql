-- =====================================================================
-- FitDesk · Notas de ticket (hdNotes) por EQUIPO
-- Antes: una nota GLOBAL por ticket (UNIQUE en helpdesk_ticket_id), compartida
-- por todos. Ahora la nota pertenece al EQUIPO que la crea: unicidad por
-- (ticket, equipo) → cada equipo tiene su propia nota del mismo ticket, visible/
-- editable solo por su equipo (el admin las ve todas). Las notas migradas quedan
-- con equipo_id NULL (sin equipo → no las ve nadie en el modelo nuevo).
-- =====================================================================

ALTER TABLE ticket_nota ADD COLUMN IF NOT EXISTS equipo_id BIGINT REFERENCES equipo(id);

ALTER TABLE ticket_nota DROP CONSTRAINT IF EXISTS ticket_nota_helpdesk_ticket_id_key;
ALTER TABLE ticket_nota
    ADD CONSTRAINT uq_nota_ticket_equipo UNIQUE (helpdesk_ticket_id, equipo_id);

CREATE INDEX IF NOT EXISTS idx_nota_equipo ON ticket_nota(equipo_id);
