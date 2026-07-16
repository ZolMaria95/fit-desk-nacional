-- =====================================================================
-- FitDesk · Envío de tareas entre equipos (Transferencia + Solicitud)
-- - Transferencia (tabla ya creada en V1): se añade `asignado_destino_id`
--   para auditar a QUIÉN se asignó la tarea al aceptar (los despachador_* guardan
--   quién envió / quién resolvió). Estados: PENDIENTE→COMPLETADA/RECHAZADA.
-- - Solicitud (NUEVA): el Especialista escala una reasignación/transferencia al
--   Responsable de Equipo, que la aprueba (ejecuta) o rechaza. Diseño en
--   docs/knowledge/12-roles-y-responsabilidades.md (§Mecanismo de solicitud).
-- La Tarea NO cambia de board: transferir/aprobar solo cambia `asignado_a`.
-- =====================================================================

-- ── Transferencia: auditoría del asignado al aceptar + índices de bandeja ──
ALTER TABLE transferencia
    ADD COLUMN IF NOT EXISTS asignado_destino_id BIGINT REFERENCES usuario(id);

CREATE INDEX IF NOT EXISTS idx_transferencia_destino ON transferencia(equipo_destino_id);
CREATE INDEX IF NOT EXISTS idx_transferencia_estado  ON transferencia(estado);

-- ── Solicitud: escalado Especialista → Responsable de Equipo ──
CREATE TABLE solicitud (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tarea_id              BIGINT      NOT NULL REFERENCES tarea(id),
    solicitante_id        BIGINT      NOT NULL REFERENCES usuario(id),
    tipo                  VARCHAR(20) NOT NULL CHECK (tipo IN ('REASIGNACION','TRANSFERENCIA')),
    motivo                TEXT,
    estado                VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE'
                          CHECK (estado IN ('PENDIENTE','APROBADA','RECHAZADA')),
    equipo_destino_id     BIGINT REFERENCES equipo(id),   -- destino sugerido (tipo TRANSFERENCIA)
    asignado_sugerido_id  BIGINT REFERENCES usuario(id),  -- persona sugerida (tipo REASIGNACION)
    resuelta_por_id       BIGINT REFERENCES usuario(id),
    transferencia_id      BIGINT REFERENCES transferencia(id), -- si al aprobar generó una transferencia
    creado_en             TIMESTAMPTZ NOT NULL DEFAULT now(),
    resuelto_en           TIMESTAMPTZ
);

CREATE INDEX idx_solicitud_estado      ON solicitud(estado);
CREATE INDEX idx_solicitud_tarea       ON solicitud(tarea_id);
CREATE INDEX idx_solicitud_solicitante ON solicitud(solicitante_id);
