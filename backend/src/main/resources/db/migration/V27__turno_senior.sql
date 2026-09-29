-- =====================================================================
-- FitDesk · Senior de Turno: rotación semanal POR EQUIPO con 2 roles
-- (Mesa de Ayuda + Emergentes). Semana LUNES→VIERNES: semana_inicio = el lunes.
-- La asignación es abierta a CUALQUIER empleado del HelpDesk (no solo usuarios de
-- FitDesk), por eso cada rol guarda el helpdesk_user_id como texto, sin FK.
-- =====================================================================
CREATE TABLE IF NOT EXISTS turno_senior (
    id             BIGSERIAL PRIMARY KEY,
    equipo_id      BIGINT NOT NULL REFERENCES equipo(id),
    semana_inicio  DATE NOT NULL,
    mesa_ayuda     VARCHAR(40),
    emergentes     VARCHAR(40),
    notas          TEXT,
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_turno_senior_semana_equipo UNIQUE (semana_inicio, equipo_id)
);

CREATE INDEX IF NOT EXISTS idx_turno_senior_semana ON turno_senior(semana_inicio);
