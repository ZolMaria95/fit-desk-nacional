-- =====================================================================
-- FitDesk · Nota y bloqueo de la tarea (2026-10-05), para el reporte "Gestión de trabajo por consultor".
-- nota: texto libre visible para todo el que ve la tarea (antes "Próxima acción"), con autor y fecha.
-- bloqueo: SIN_BLOQUEO · ESPERANDO_CLIENTE · ESPERANDO_INFORMACION · ESPERANDO_CONSULTOR ·
--          ESPERANDO_AMBIENTE · BLOQUEO_TECNICO · BLOQUEO_EXTERNO; NULL = sin dato.
-- =====================================================================
ALTER TABLE tarea ADD COLUMN IF NOT EXISTS nota TEXT;
ALTER TABLE tarea ADD COLUMN IF NOT EXISTS nota_actualizada_en TIMESTAMPTZ;
ALTER TABLE tarea ADD COLUMN IF NOT EXISTS nota_por_id BIGINT REFERENCES usuario(id);
ALTER TABLE tarea ADD COLUMN IF NOT EXISTS bloqueo VARCHAR(30);
