-- Permiso por horas: tipo nuevo, corto e independiente (sin cargo a vacaciones).
-- Nullable: solo se llena cuando vacacion.tipo = 'PERMISO_HORAS'.
ALTER TABLE vacacion ADD COLUMN horas NUMERIC(4,1);
