-- =====================================================================
-- FitDesk · Esquema nacional inicial (Fase 1)
-- Derivado de docs/knowledge/01-modelo-conceptual.md
-- PostgreSQL 16. Nombres en español (convención del proyecto legacy).
-- Autorización = Rol × Alcance × Vigencia. Default deny (sin Asignacion → no ve nada).
-- =====================================================================

-- ── Geografía / organización ─────────────────────────────────────────
CREATE TABLE regional (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo          VARCHAR(40)  NOT NULL UNIQUE,        -- p.ej. 'CUENCA'
    nombre          VARCHAR(120) NOT NULL,
    activo          BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE equipo (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    regional_id     BIGINT       NOT NULL REFERENCES regional(id),
    codigo          VARCHAR(60)  NOT NULL,
    nombre          VARCHAR(120) NOT NULL,
    activo          BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    UNIQUE (regional_id, codigo)
);

-- ── Identidad (federada al HelpDesk) + autorización ──────────────────
-- Login vive en el HelpDesk; aquí solo rol/alcance/vigencia. Puente: helpdesk_user_id.
CREATE TABLE usuario (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_user_id VARCHAR(40)  UNIQUE,                -- puente federación (XXXNNN); nullable hasta reconciliar
    codigo_local     VARCHAR(40),                        -- id corto del legacy (SC, JH...) para el ETL
    nombre           VARCHAR(160) NOT NULL,
    email            VARCHAR(200),
    alias            VARCHAR(120),
    color            VARCHAR(20),
    activo           BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en        TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE rol (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo      VARCHAR(40)  NOT NULL UNIQUE
                CHECK (codigo IN ('CONSULTOR','DESPACHADOR','RESPONSABLE_EQUIPO',
                                  'ESPECIALISTA','GERENCIA','ADMIN')),
    nombre      VARCHAR(80)  NOT NULL,
    descripcion TEXT
);

-- Cliente = COAC. equipo_responsable_id deriva "los clientes de mi equipo".
CREATE TABLE cliente (
    id                     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_client_id     VARCHAR(60) UNIQUE,           -- puente al HelpDesk; nullable
    codigo                 VARCHAR(60)  NOT NULL UNIQUE,  -- id local (p.ej. 'erco')
    nombre                 VARCHAR(200) NOT NULL,
    equipo_responsable_id  BIGINT       NOT NULL REFERENCES equipo(id),
    color                  VARCHAR(20),
    activo                 BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en              TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en         TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Asignacion: entidad clave. Alcance polimórfico (Equipo|Cliente|Regional|Global) + vigencia.
CREATE TABLE asignacion (
    id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id           BIGINT      NOT NULL REFERENCES usuario(id),
    rol_id               BIGINT      NOT NULL REFERENCES rol(id),
    alcance_tipo         VARCHAR(20) NOT NULL
                         CHECK (alcance_tipo IN ('EQUIPO','CLIENTE','REGIONAL','GLOBAL')),
    alcance_equipo_id    BIGINT REFERENCES equipo(id),
    alcance_cliente_id   BIGINT REFERENCES cliente(id),
    alcance_regional_id  BIGINT REFERENCES regional(id),
    vigente_desde        DATE        NOT NULL DEFAULT CURRENT_DATE,
    vigente_hasta        DATE,                            -- NULL = sin fin
    activo               BOOLEAN     NOT NULL DEFAULT TRUE,
    creado_en            TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en       TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- El alcance debe traer EXACTAMENTE la referencia de su tipo (Global no trae ninguna).
    CONSTRAINT chk_alcance_coherente CHECK (
        (alcance_tipo = 'EQUIPO'   AND alcance_equipo_id   IS NOT NULL AND alcance_cliente_id IS NULL     AND alcance_regional_id IS NULL) OR
        (alcance_tipo = 'CLIENTE'  AND alcance_cliente_id  IS NOT NULL AND alcance_equipo_id  IS NULL     AND alcance_regional_id IS NULL) OR
        (alcance_tipo = 'REGIONAL' AND alcance_regional_id IS NOT NULL AND alcance_equipo_id  IS NULL     AND alcance_cliente_id  IS NULL) OR
        (alcance_tipo = 'GLOBAL'   AND alcance_equipo_id   IS NULL     AND alcance_cliente_id  IS NULL     AND alcance_regional_id IS NULL)
    ),
    CONSTRAINT chk_vigencia CHECK (vigente_hasta IS NULL OR vigente_hasta >= vigente_desde)
);

-- ── Scrum / Kanban ───────────────────────────────────────────────────
CREATE TABLE board (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    equipo_id       BIGINT       NOT NULL REFERENCES equipo(id),
    codigo          VARCHAR(60)  NOT NULL,
    nombre          VARCHAR(120) NOT NULL,
    activo          BOOLEAN      NOT NULL DEFAULT TRUE,
    creado_en       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    UNIQUE (equipo_id, codigo)
);

CREATE TABLE sprint (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    board_id        BIGINT       NOT NULL REFERENCES board(id),
    codigo          VARCHAR(40)  NOT NULL,                -- 'SP-04'
    nombre          VARCHAR(120) NOT NULL,
    estado          VARCHAR(20)  NOT NULL DEFAULT 'active'
                    CHECK (estado IN ('planned','active','completed')),
    capacidad       INT          NOT NULL DEFAULT 0,
    objetivo        TEXT,
    fecha_inicio    DATE,
    fecha_fin       DATE,
    creado_en       TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    UNIQUE (board_id, codigo)
);

-- Columnas del board (workflow corporativo estándar, extensible).
CREATE TABLE workflow_estado (
    id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo    VARCHAR(40) NOT NULL UNIQUE,                -- 'TODO','IN_PROGRESS',...
    nombre    VARCHAR(80) NOT NULL,
    orden     INT         NOT NULL,
    categoria VARCHAR(20),                                -- 'inicial'|'proceso'|'certificacion'|'final'
    activo    BOOLEAN     NOT NULL DEFAULT TRUE
);

-- ── Espejo del HelpDesk (encabezado liviano; SIN conversación ni adjuntos) ──
CREATE TABLE ticket_espejo (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helpdesk_ticket_id  VARCHAR(60)  NOT NULL UNIQUE,
    cliente_id          BIGINT REFERENCES cliente(id),
    asunto              VARCHAR(500),
    estado_origen       VARCHAR(120),
    prioridad           VARCHAR(60),
    asignado_hd         VARCHAR(40),                       -- helpdesk_user_id del asignado en el HD
    fecha_ingreso       TIMESTAMPTZ,
    fecha_modificacion  TIMESTAMPTZ,
    last_synced_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Tarea: entidad DUEÑA. Vive en UN board (el del equipo dueño del cliente).
-- asignado_a puede ser de otro equipo (trabaja vía "Asignados a mí").
CREATE TABLE tarea (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo              VARCHAR(40)  NOT NULL UNIQUE,      -- 'TA-001' (preserva id legacy)
    ticket_espejo_id    BIGINT REFERENCES ticket_espejo(id),
    board_id            BIGINT       NOT NULL REFERENCES board(id),
    sprint_id           BIGINT REFERENCES sprint(id),
    workflow_estado_id  BIGINT       NOT NULL REFERENCES workflow_estado(id),
    asignado_a          BIGINT REFERENCES usuario(id),     -- puede ser cross-team
    cliente_id          BIGINT REFERENCES cliente(id),
    titulo              VARCHAR(300),
    descripcion         TEXT,
    prioridad           VARCHAR(40)  NOT NULL DEFAULT 'media',
    puntos              INT          NOT NULL DEFAULT 1,
    progreso            INT          NOT NULL DEFAULT 0 CHECK (progreso BETWEEN 0 AND 100),
    aprobado            BOOLEAN      NOT NULL DEFAULT FALSE,
    fecha_aprobacion    DATE,
    esperando_cliente   BOOLEAN      NOT NULL DEFAULT FALSE,
    fecha_esperando     DATE,
    fecha_limite        DATE,
    creado_en           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Transferencia: handoff entre despachadores. Cambia asignado, NO el board.
CREATE TABLE transferencia (
    id                      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tarea_id                BIGINT      NOT NULL REFERENCES tarea(id),
    equipo_origen_id        BIGINT      NOT NULL REFERENCES equipo(id),
    equipo_destino_id       BIGINT      NOT NULL REFERENCES equipo(id),
    despachador_origen_id   BIGINT REFERENCES usuario(id),
    despachador_destino_id  BIGINT REFERENCES usuario(id),
    estado                  VARCHAR(20) NOT NULL DEFAULT 'PENDIENTE'
                            CHECK (estado IN ('PENDIENTE','ACEPTADA','RECHAZADA','COMPLETADA')),
    motivo                  TEXT,
    creado_en               TIMESTAMPTZ NOT NULL DEFAULT now(),
    resuelto_en             TIMESTAMPTZ
);

-- ── Índices de apoyo (visibilidad por alcance, board, asignación) ────
CREATE INDEX idx_equipo_regional          ON equipo(regional_id);
CREATE INDEX idx_cliente_equipo_resp      ON cliente(equipo_responsable_id);
CREATE INDEX idx_asignacion_usuario       ON asignacion(usuario_id);
CREATE INDEX idx_asignacion_alc_equipo    ON asignacion(alcance_equipo_id);
CREATE INDEX idx_asignacion_alc_cliente   ON asignacion(alcance_cliente_id);
CREATE INDEX idx_asignacion_alc_regional  ON asignacion(alcance_regional_id);
CREATE INDEX idx_board_equipo             ON board(equipo_id);
CREATE INDEX idx_sprint_board             ON sprint(board_id);
CREATE INDEX idx_ticket_cliente           ON ticket_espejo(cliente_id);
CREATE INDEX idx_tarea_board              ON tarea(board_id);
CREATE INDEX idx_tarea_sprint             ON tarea(sprint_id);
CREATE INDEX idx_tarea_asignado           ON tarea(asignado_a);
CREATE INDEX idx_tarea_cliente            ON tarea(cliente_id);
CREATE INDEX idx_tarea_estado             ON tarea(workflow_estado_id);
CREATE INDEX idx_transferencia_tarea      ON transferencia(tarea_id);
