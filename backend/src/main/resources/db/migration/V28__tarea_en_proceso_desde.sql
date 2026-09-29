-- =====================================================================
-- FitDesk · Fecha en que la tarea entró a IN_PROGRESS (reporte "Estado del equipo":
-- "¿desde cuándo está trabajando en eso?"). No había historial de estados.
-- Se llena desde ahora al pasar a In Progress; se renueva si vuelve a entrar y se
-- conserva si sale. Sin backfill: para las tareas previas el reporte usa creado_en
-- y lo marca como aproximado.
-- =====================================================================
ALTER TABLE tarea ADD COLUMN IF NOT EXISTS en_proceso_desde TIMESTAMPTZ;
