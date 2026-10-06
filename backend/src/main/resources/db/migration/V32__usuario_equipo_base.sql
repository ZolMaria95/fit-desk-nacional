-- =====================================================================
-- FitDesk · Equipo base de una persona (2026-10-05).
-- Ubicación geográfica de un consultor de alcance nacional (p. ej. Lina Ochoa, ESPECIALISTA GLOBAL, ubicada
-- en Cuenca). NO es un permiso ni una membresía: solo hace que el reporte "Estado del equipo" de ese
-- equipo la incluya con su carga real (sus tareas de cualquier tablero). NULL = sin equipo base.
-- =====================================================================
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS equipo_base_id BIGINT REFERENCES equipo(id);
CREATE INDEX IF NOT EXISTS idx_usuario_equipo_base ON usuario(equipo_base_id);
