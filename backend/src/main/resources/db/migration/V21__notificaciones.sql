-- =====================================================================
-- FitDesk · Buzón de notificaciones (persistente, sin push)
-- Dos orígenes: el backend las genera SOLO para las que nacen de una escritura que él mismo ve
-- (tarea asignada/sin finalizar, transferencia/solicitud pendiente); para recordatorio/reunión/
-- ticket las reporta el frontend cuando su propio chequeo de 30s las detecta.
-- =====================================================================

CREATE TABLE notificacion (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id  BIGINT      NOT NULL REFERENCES usuario(id),
    tipo        VARCHAR(30) NOT NULL
                CHECK (tipo IN ('RECORDATORIO','REUNION','TAREA_ASIGNADA','TAREA_SIN_FINALIZAR','TICKET_NOVEDAD',
                                 'TRANSFERENCIA_PENDIENTE','SOLICITUD_PENDIENTE')),
    clave       VARCHAR(200) NOT NULL,
    titulo      VARCHAR(300) NOT NULL,
    cuerpo      TEXT,
    url         VARCHAR(300),
    leida       BOOLEAN     NOT NULL DEFAULT false,
    creado_en   TIMESTAMPTZ NOT NULL DEFAULT now(),
    leido_en    TIMESTAMPTZ
);

-- Dedup: una misma persona no recibe dos veces la misma clave (idempotente ante reintentos
-- del frontend, y ante un PATCH que reaplica el mismo valor).
CREATE UNIQUE INDEX idx_notificacion_usuario_clave ON notificacion(usuario_id, clave);
CREATE INDEX idx_notificacion_usuario_leida ON notificacion(usuario_id, leida);
