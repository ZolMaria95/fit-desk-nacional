-- Preferencia de tema de la UI por usuario (para el modo oscuro).
-- NULL / 'light' = claro (default); 'dark' = oscuro.
ALTER TABLE usuario ADD COLUMN tema VARCHAR(10);
