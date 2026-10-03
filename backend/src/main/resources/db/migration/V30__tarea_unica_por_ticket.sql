-- =====================================================================
-- FitDesk · Un ticket = UNA tarea (2026-10-02).
-- Había tareas duplicadas por ticket (28 tickets al 02/10): la creación manual y
-- la de transferencias no verificaban si el ticket ya tenía tarea, y el front
-- reintentaba por un camino de respaldo. El código ya no duplica (2026-10-01);
-- esta migración FUSIONA las existentes y pone el candado en la BD.
--
-- Regla aprobada por la dueña: por ticket se conserva la tarea MÁS AVANZADA
-- (Entregado ✓ > Entregado > Certificación > In Progress > To Do) y, a igualdad,
-- la de número más bajo. Solo se tocan tareas que COMPARTEN ticket; ninguna otra.
-- La conservada recibe de sus copias lo que le falte (descripción, título, fecha
-- límite, inicio en proceso) y la prioridad más alta del grupo; lo que referencie a
-- una copia (mensajes, transferencias, solicitudes, progreso, consultas) pasa a ella.
-- =====================================================================

CREATE TEMP TABLE dup_rank ON COMMIT DROP AS
SELECT t.id,
       t.ticket_espejo_id,
       row_number() OVER (
           PARTITION BY t.ticket_espejo_id
           ORDER BY coalesce(w.orden, 0) DESC, t.aprobado DESC, t.id ASC
       ) AS rn
  FROM tarea t
  LEFT JOIN workflow_estado w ON w.id = t.workflow_estado_id
 WHERE t.ticket_espejo_id IN (
       SELECT ticket_espejo_id FROM tarea
        WHERE ticket_espejo_id IS NOT NULL
        GROUP BY ticket_espejo_id HAVING count(*) > 1);

-- (copia → conservada)
CREATE TEMP TABLE dup_map ON COMMIT DROP AS
SELECT d.id AS drop_id, k.id AS keep_id
  FROM dup_rank d
  JOIN dup_rank k ON k.ticket_espejo_id = d.ticket_espejo_id AND k.rn = 1
 WHERE d.rn > 1;

-- La conservada hereda lo que le falta.
UPDATE tarea k SET
    descripcion = coalesce(nullif(k.descripcion, ''), (
        SELECT d.descripcion FROM tarea d JOIN dup_map m ON m.drop_id = d.id
         WHERE m.keep_id = k.id AND coalesce(d.descripcion, '') <> ''
         ORDER BY length(d.descripcion) DESC LIMIT 1)),
    titulo = coalesce(nullif(k.titulo, ''), (
        SELECT d.titulo FROM tarea d JOIN dup_map m ON m.drop_id = d.id
         WHERE m.keep_id = k.id AND coalesce(d.titulo, '') <> '' ORDER BY d.id LIMIT 1)),
    fecha_limite = coalesce(k.fecha_limite, (
        SELECT min(d.fecha_limite) FROM tarea d JOIN dup_map m ON m.drop_id = d.id WHERE m.keep_id = k.id)),
    en_proceso_desde = coalesce(k.en_proceso_desde, (
        SELECT min(d.en_proceso_desde) FROM tarea d JOIN dup_map m ON m.drop_id = d.id WHERE m.keep_id = k.id)),
    prioridad = (
        SELECT CASE min(CASE p WHEN 'alta' THEN 0 WHEN 'media' THEN 1 WHEN 'baja' THEN 2 ELSE 3 END)
                    WHEN 0 THEN 'alta' WHEN 1 THEN 'media' WHEN 2 THEN 'baja' ELSE k.prioridad END
          FROM (SELECT k.prioridad AS p
                UNION ALL
                SELECT d.prioridad FROM tarea d JOIN dup_map m ON m.drop_id = d.id WHERE m.keep_id = k.id) x),
    actualizado_en = now()
 WHERE k.id IN (SELECT keep_id FROM dup_map);

-- Lo que referencia a una copia pasa a la conservada.
UPDATE mensaje       x SET tarea_id = m.keep_id FROM dup_map m WHERE x.tarea_id = m.drop_id;
UPDATE transferencia x SET tarea_id = m.keep_id FROM dup_map m WHERE x.tarea_id = m.drop_id;
UPDATE solicitud     x SET tarea_id = m.keep_id FROM dup_map m WHERE x.tarea_id = m.drop_id;
UPDATE progreso      x SET tarea_id = m.keep_id FROM dup_map m WHERE x.tarea_id = m.drop_id;
UPDATE consulta      x SET tarea_id = m.keep_id FROM dup_map m WHERE x.tarea_id = m.drop_id;

DELETE FROM tarea WHERE id IN (SELECT drop_id FROM dup_map);

-- Candado: un ticket no puede tener más de una tarea.
CREATE UNIQUE INDEX IF NOT EXISTS uq_tarea_ticket_espejo
    ON tarea (ticket_espejo_id) WHERE ticket_espejo_id IS NOT NULL;
