-- Minutos ANTES del inicio en que una tarea tipo REUNIÓN dispara su recordatorio (alerta en la app).
-- Nullable: si es null, el frontend usa el default (20). Solo aplica a reuniones; otras tareas quedan null.
ALTER TABLE tarea ADD COLUMN recordatorio_min INTEGER;
