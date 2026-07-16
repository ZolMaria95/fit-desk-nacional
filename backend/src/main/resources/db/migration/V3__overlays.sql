-- =====================================================================
-- FitDesk · Fase 2 — Tablas overlay del HelpDesk y de proceso
-- Modelan las features del legacy que viven en Firebase FUERA del board:
--   hdNotes, hdActions, hdPendientes, weeklySupport, progress, queries.
-- Se cargan por el ETL (Fase 2). Claves naturales UNIQUE → upsert idempotente.
-- Ref: docs/knowledge/06-mapa-datos-fase0.md (columna "→ Destino PostgreSQL").
-- =====================================================================

-- El asunto real del ticket (title de la story) supera 300 chars en casos
-- reales (p.ej. TA-065). Se alinea con ticket_espejo.asunto (500).
ALTER TABLE tarea ALTER COLUMN titulo TYPE VARCHAR(500);

-- ── hdNotes → nota libre por número de ticket del HelpDesk ────────────
CREATE TABLE ticket_nota (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_ticket_id  VARCHAR(60) NOT NULL UNIQUE,       -- clave natural (nº ticket HD)
    ticket_espejo_id    BIGINT REFERENCES ticket_espejo(id), -- si existe espejo local
    texto               TEXT        NOT NULL,
    actualizado_en      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── hdActions → flag "requiere/tiene acción" por ticket ───────────────
CREATE TABLE ticket_accion (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_ticket_id  VARCHAR(60) NOT NULL UNIQUE,
    ticket_espejo_id    BIGINT REFERENCES ticket_espejo(id),
    marcado             BOOLEAN     NOT NULL DEFAULT TRUE,
    actualizado_en      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── hdPendientes → recordatorio con fecha/hora y alarma diaria ────────
CREATE TABLE ticket_pendiente (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_ticket_id  VARCHAR(60) NOT NULL UNIQUE,
    ticket_espejo_id    BIGINT REFERENCES ticket_espejo(id),
    cliente_id          BIGINT REFERENCES cliente(id),     -- resuelto desde cliente_raw si se puede
    asunto              VARCHAR(500),
    cliente_raw         VARCHAR(300),                      -- texto del HD tal cual ("COAC LA DOLOROSA DURAN")
    due_date            DATE,
    due_time            VARCHAR(5),                        -- 'HH:MM' (algunos vienen fuera de rango horario)
    added_at            TIMESTAMPTZ,
    last_alerted        DATE,
    actualizado_en      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── weeklySupport → rotación semanal de soporte (semana Vie→Jue) ──────
CREATE TABLE rotacion_semanal (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    semana_inicio       DATE        NOT NULL UNIQUE,       -- clave natural (YYYY-MM-DD del snapshot)
    usuario_id          BIGINT REFERENCES usuario(id),     -- resuelto por id local (KM, JQ...)
    assignee_local      VARCHAR(40),                       -- id local crudo, por si no resuelve
    notas               TEXT,
    actualizado_en      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── progress → avances (Burndown/Progreso) ───────────────────────────
CREATE TABLE progreso (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo         VARCHAR(40) NOT NULL UNIQUE,            -- 'PR-001' (id legacy)
    tarea_codigo   VARCHAR(40),                            -- 'TA-005' crudo
    tarea_id       BIGINT REFERENCES tarea(id),
    autor_local    VARCHAR(40),
    autor_id       BIGINT REFERENCES usuario(id),
    fecha          DATE,
    horas          INT         NOT NULL DEFAULT 0,
    notas          TEXT
);

-- ── queries → consultas/dudas ────────────────────────────────────────
CREATE TABLE consulta (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo         VARCHAR(40) NOT NULL UNIQUE,            -- 'QR-001' (id legacy)
    tarea_codigo   VARCHAR(40),
    tarea_id       BIGINT REFERENCES tarea(id),
    autor_local    VARCHAR(40),
    autor_id       BIGINT REFERENCES usuario(id),
    fecha          DATE,
    titulo         VARCHAR(300),
    descripcion    TEXT,
    prioridad      VARCHAR(40),
    estado         VARCHAR(40)
);

CREATE INDEX idx_ticket_nota_espejo       ON ticket_nota(ticket_espejo_id);
CREATE INDEX idx_ticket_accion_espejo     ON ticket_accion(ticket_espejo_id);
CREATE INDEX idx_ticket_pendiente_espejo  ON ticket_pendiente(ticket_espejo_id);
CREATE INDEX idx_ticket_pendiente_cliente ON ticket_pendiente(cliente_id);
CREATE INDEX idx_rotacion_usuario         ON rotacion_semanal(usuario_id);
CREATE INDEX idx_progreso_tarea           ON progreso(tarea_id);
CREATE INDEX idx_consulta_tarea           ON consulta(tarea_id);
