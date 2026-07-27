-- V14: mensajes entre equipos sobre una Tarea/ticket.
-- Un Responsable de Equipo le envía un mensaje al RE del equipo que desarrolla la tarea
-- (p. ej. recordar que sigue pendiente, pedir avance…). El destinatario se deriva por
-- gobierno del equipo de la tarea (no se guarda usuario destino) y lo ve en su Bandeja.
CREATE TABLE mensaje (
    id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tarea_id   BIGINT      NOT NULL REFERENCES tarea(id),
    de_id      BIGINT      NOT NULL REFERENCES usuario(id),
    texto      TEXT,
    visto      BOOLEAN     NOT NULL DEFAULT false,
    creado_en  TIMESTAMPTZ NOT NULL DEFAULT now(),
    visto_en   TIMESTAMPTZ
);

CREATE INDEX idx_mensaje_tarea ON mensaje(tarea_id);
-- La bandeja lista los NO vistos; índice parcial para esa consulta.
CREATE INDEX idx_mensaje_pendientes ON mensaje(visto) WHERE visto = false;
