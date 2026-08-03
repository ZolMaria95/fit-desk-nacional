-- V15: períodos de vacaciones / permisos (con cargo a vacaciones) por empleado.
-- Alimentan el calendario de la sección Vacaciones (vistas por equipo y nacional). La
-- solicitud/aprobación FORMAL es por el formato descargable; aquí NO se lleva saldo:
-- dias_vacacion = round(dias_laborables * 1.36) según los lineamientos de la empresa.
CREATE TABLE vacacion (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id       BIGINT      NOT NULL REFERENCES usuario(id),
    fecha_inicio     DATE        NOT NULL,
    fecha_fin        DATE        NOT NULL,
    dias_laborables  INT         NOT NULL DEFAULT 0,
    dias_vacacion    INT         NOT NULL DEFAULT 0,
    tipo             TEXT        NOT NULL DEFAULT 'VACACIONES',
    estado           TEXT        NOT NULL DEFAULT 'PLANIFICADA',
    nota             TEXT,
    registrado_por   BIGINT      REFERENCES usuario(id),
    creado_en        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_vacacion_usuario ON vacacion(usuario_id);
-- El calendario consulta por rango de fechas visible.
CREATE INDEX idx_vacacion_fechas ON vacacion(fecha_inicio, fecha_fin);
