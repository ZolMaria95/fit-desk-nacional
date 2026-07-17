-- =====================================================================
-- FitDesk · Tipos de tarea + Reuniones
-- Una tarea es de tipo DESARROLLO_SOPORTE (default; las que traen ticket son de
-- este tipo) o REUNION. Las reuniones tienen subtipo (CAPACITACION|PRESENTACION),
-- tema, link (opcional) y horario de inicio/fin (ISO local, texto).
-- =====================================================================
ALTER TABLE tarea
  ADD COLUMN IF NOT EXISTS tipo    VARCHAR(30) NOT NULL DEFAULT 'DESARROLLO_SOPORTE',
  ADD COLUMN IF NOT EXISTS subtipo VARCHAR(30),
  ADD COLUMN IF NOT EXISTS tema    TEXT,
  ADD COLUMN IF NOT EXISTS link    TEXT,
  ADD COLUMN IF NOT EXISTS inicio  TEXT,
  ADD COLUMN IF NOT EXISTS fin     TEXT;
