-- V16: feriados / días no laborables de la empresa (nacionales), para el calendario de Vacaciones.
-- Un feriado puede ser un solo día o un rango (puente). Lo registra/borra un ADMIN; lo ve cualquiera.
CREATE TABLE feriado (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre          TEXT        NOT NULL,
    fecha_inicio    DATE        NOT NULL,
    fecha_fin       DATE        NOT NULL,
    registrado_por  BIGINT      REFERENCES usuario(id),
    creado_en       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feriado_fechas ON feriado(fecha_inicio, fecha_fin);
