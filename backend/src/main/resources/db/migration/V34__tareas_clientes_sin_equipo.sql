-- =====================================================================
-- FitDesk · Tareas de clientes sin equipo — decisión de gerencia (2026-10-06).
-- Contexto: docs/knowledge/18-clientes-sin-equipo-plan-pendiente.md.
--  1. tarea.fuera_alcance: tareas que no se toman en cuenta (no salen en Board, Reportes ni Mi Panel) pero NO
--     se borran (regla: las tareas con ticket no se eliminan).
--  2. SOFT WAREHOUSE S.A. (la propia empresa): solo cuentan los tickets creados desde el 01-01-2026; las
--     tareas de tickets anteriores (o sin fecha conocida) quedan fuera de alcance.
--  3. Clientes ya registrados en un equipo (la mayoría se registró el 2026-10-06): sus tareas que aún tenían
--     el cliente sin ligar (cliente_codigo_raw = helpdesk_client_id) se ligan y pasan al tablero del equipo.
--  4. Las creadas automáticamente desde el 2026-10-04 cuyo cliente sigue sin registrar → tablero del equipo
--     del consultor asignado (miembro; si son varios, el de id menor; si ninguno, su equipo base).
-- Solo cambian marcas, cliente y tablero; no se borra nada.
-- =====================================================================
ALTER TABLE tarea ADD COLUMN IF NOT EXISTS fuera_alcance BOOLEAN NOT NULL DEFAULT false;

-- 2) SOFT WAREHOUSE anteriores a 2026 → fuera de alcance
UPDATE tarea t SET fuera_alcance = true, actualizado_en = now()
  FROM ticket_espejo te
 WHERE te.id = t.ticket_espejo_id
   AND t.cliente_id IS NULL
   AND (t.cliente_codigo_raw = '46' OR upper(coalesce(t.cliente_nombre, '')) LIKE 'SOFT WAREHOUSE%')
   AND (te.fecha_ingreso IS NULL OR te.fecha_ingreso < '2026-01-01');

-- 3) Ligar al cliente ya registrado y llevar al tablero de su equipo
UPDATE ticket_espejo te SET cliente_id = c.id
  FROM tarea t, cliente c
 WHERE te.id = t.ticket_espejo_id AND te.cliente_id IS NULL
   AND t.cliente_id IS NULL AND c.helpdesk_client_id = t.cliente_codigo_raw;

UPDATE tarea t SET
       cliente_id = c.id,
       cliente_codigo_raw = NULL,
       cliente_nombre = NULL,
       board_id = coalesce((SELECT b.id FROM board b WHERE b.equipo_id = c.equipo_responsable_id AND b.activo
                             ORDER BY b.id LIMIT 1), t.board_id),
       actualizado_en = now()
  FROM cliente c
 WHERE t.cliente_id IS NULL
   AND t.ticket_espejo_id IS NOT NULL
   AND c.helpdesk_client_id = t.cliente_codigo_raw
   AND c.equipo_responsable_id IS NOT NULL;

-- 4) Siguen sin cliente registrado → tablero del equipo del consultor asignado
WITH miembro AS (
    SELECT a.usuario_id, min(a.alcance_equipo_id) AS equipo_id
      FROM asignacion a
     WHERE a.alcance_tipo = 'EQUIPO' AND a.activo
       AND (a.vigente_hasta IS NULL OR a.vigente_hasta >= current_date)
     GROUP BY a.usuario_id
), destino AS (
    SELECT t.id AS tarea_id,
           (SELECT b.id FROM board b
             WHERE b.equipo_id = coalesce(m.equipo_id, u.equipo_base_id) AND b.activo
             ORDER BY b.id LIMIT 1) AS board_id
      FROM tarea t
      JOIN usuario u ON u.id = t.asignado_a
      LEFT JOIN miembro m ON m.usuario_id = u.id
     WHERE t.creado_en >= '2026-10-04'
       AND t.ticket_espejo_id IS NOT NULL
       AND t.cliente_id IS NULL
       AND NOT t.fuera_alcance
)
UPDATE tarea t SET board_id = d.board_id, actualizado_en = now()
  FROM destino d
 WHERE d.tarea_id = t.id AND d.board_id IS NOT NULL AND d.board_id <> t.board_id;
