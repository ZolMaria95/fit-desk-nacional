-- V13: transferir un ticket SIN tarea previa.
-- La tarea se crea al PEDIR la transferencia pero queda "pendiente" (invisible en los
-- boards) hasta que el equipo destino la acepta; si la rechaza, se descarta. Al aceptar,
-- pasa a FALSE y aparece en el board destino, asignada.
ALTER TABLE tarea
    ADD COLUMN pendiente_transferencia boolean NOT NULL DEFAULT false;

-- Índice parcial: /stories filtra por = false en cada carga del board.
CREATE INDEX idx_tarea_pendiente_transferencia
    ON tarea (pendiente_transferencia)
    WHERE pendiente_transferencia = true;
