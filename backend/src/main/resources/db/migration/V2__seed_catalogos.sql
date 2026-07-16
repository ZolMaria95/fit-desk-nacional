-- =====================================================================
-- FitDesk · Datos de catálogo (reference data corporativa, no es ETL)
-- Roles del modelo y columnas estándar del workflow. Idempotente.
-- Los datos de Cuenca (regional/equipo/clientes/usuarios) entran en el ETL (Fase 2).
-- =====================================================================

-- Los 6 roles del modelo conceptual (ver 01-modelo-conceptual.md).
INSERT INTO rol (codigo, nombre, descripcion) VALUES
  ('CONSULTOR',          'Consultor',           'Toma y trabaja sus tareas; ve su board.'),
  ('DESPACHADOR',        'Despachador (HelpDesk)', 'Reasigna/transfiere dentro y entre equipos; ve su equipo.'),
  ('RESPONSABLE_EQUIPO', 'Responsable de Equipo','Lidera el equipo y responde por sus clientes (visibilidad cross-equipo).'),
  ('ESPECIALISTA',       'Especialista',         'Opera sobre cualquier board; visibilidad global.'),
  ('GERENCIA',           'Gerencia / Visor',     'Visibilidad global de solo lectura.'),
  ('ADMIN',              'Administrador',        'Administración total del sistema.')
ON CONFLICT (codigo) DO NOTHING;

-- Columnas estándar del board (mapea las 4 columnas del legacy: To Do / In Progress / En Certificación / Done).
INSERT INTO workflow_estado (codigo, nombre, orden, categoria) VALUES
  ('TODO',             'To Do',           1, 'inicial'),
  ('IN_PROGRESS',      'In Progress',     2, 'proceso'),
  ('EN_CERTIFICACION', 'En Certificación',3, 'certificacion'),
  ('ENTREGADO',        'Entregado',       4, 'final')
ON CONFLICT (codigo) DO NOTHING;
