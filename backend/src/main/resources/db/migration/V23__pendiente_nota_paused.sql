-- Arregla dos bugs vivos de "Recordatorio" (documentados en docs/knowledge/17-notificaciones-push.md):
-- la nota que se escribe al postergar/crear un recordatorio nunca se guardaba (el PUT completo de
-- /hdPendientes la descartaba, columna inexistente), y "Pausar" tampoco persistía. Necesarias además
-- para el nuevo recordatorio SIN ticket (nota personalizada es el dato principal).
ALTER TABLE ticket_pendiente ADD COLUMN nota TEXT;
ALTER TABLE ticket_pendiente ADD COLUMN paused BOOLEAN NOT NULL DEFAULT false;
