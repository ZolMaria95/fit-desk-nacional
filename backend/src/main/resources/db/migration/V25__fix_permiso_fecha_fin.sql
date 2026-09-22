-- Corrige fecha_fin de permisos "con cargo a vacación" (tipo=PERMISO) inflada por el factor 1.36
-- desde el diseño original (ver docs/decisiones.md). dias_laborables (ya correcto) es la fuente de
-- verdad de cuántos días abarca el permiso; dias_vacacion (el cargo ×1.36 para el saldo) no cambia.
UPDATE vacacion
SET fecha_fin = fecha_inicio + (dias_laborables - 1)
WHERE tipo = 'PERMISO' AND dias_laborables > 0;
