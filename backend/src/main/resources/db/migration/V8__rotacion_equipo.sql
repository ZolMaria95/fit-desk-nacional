-- =====================================================================
-- FitDesk · Rotación semanal de soporte (weeklySupport) POR EQUIPO
-- Antes: una rotación GLOBAL (UNIQUE en semana_inicio) — un asignado por semana
-- para toda la empresa. Ahora cada EQUIPO tiene su propia rotación: unicidad por
-- (semana_inicio, equipo). La rotación migrada (del único equipo legacy) se
-- conserva asignándola al equipo del tablero CUENCA.
-- =====================================================================

ALTER TABLE rotacion_semanal ADD COLUMN IF NOT EXISTS equipo_id BIGINT REFERENCES equipo(id);

-- Preservar la rotación existente para el equipo de Cuenca (el único del legacy).
UPDATE rotacion_semanal
   SET equipo_id = (SELECT equipo_id FROM board WHERE codigo = 'CUENCA' LIMIT 1)
 WHERE equipo_id IS NULL;

ALTER TABLE rotacion_semanal DROP CONSTRAINT IF EXISTS rotacion_semanal_semana_inicio_key;
ALTER TABLE rotacion_semanal
    ADD CONSTRAINT uq_rotacion_semana_equipo UNIQUE (semana_inicio, equipo_id);

CREATE INDEX IF NOT EXISTS idx_rotacion_equipo ON rotacion_semanal(equipo_id);
