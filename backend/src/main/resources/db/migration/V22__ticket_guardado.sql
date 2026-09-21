-- Guardado personal de tickets: cada consultor puede guardar tickets para consultarlos
-- después, en una "ventana de guardados" propia — 100% personal, sin visibilidad de equipo/admin
-- (a diferencia de ticket_pendiente, que sí tiene esa capa). Mismo patrón de overlay que
-- ticket_pendiente/ticket_accion, minimalista: solo el vínculo ticket+usuario.
CREATE TABLE ticket_guardado (
    id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_ticket_id VARCHAR(40) NOT NULL,
    usuario_id         BIGINT      NOT NULL REFERENCES usuario(id),
    creado_en          TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (helpdesk_ticket_id, usuario_id)
);

CREATE INDEX idx_ticket_guardado_usuario ON ticket_guardado(usuario_id);
