-- =====================================================================
-- FitDesk · Ajuste del modelo de roles
-- - Elimina el rol DESPACHADOR (operativamente ⊂ Responsable de Equipo).
--   Verificado: 0 asignaciones lo referencian (no hay datos que migrar).
-- - Redefine descripciones: Especialista (ejecutor nacional acotado, escala por
--   solicitud), Responsable de Equipo (gobierna sus boards), Consultor (crea solo
--   para sí). Ver docs/knowledge/12-roles-y-responsabilidades.md.
-- =====================================================================

-- Quitar el rol Despachador del catálogo.
DELETE FROM rol WHERE codigo = 'DESPACHADOR';

-- Recrear el CHECK del set de roles válidos, ya sin DESPACHADOR.
ALTER TABLE rol DROP CONSTRAINT IF EXISTS rol_codigo_check;
ALTER TABLE rol ADD CONSTRAINT rol_codigo_check
    CHECK (codigo IN ('CONSULTOR','RESPONSABLE_EQUIPO','ESPECIALISTA','GERENCIA','ADMIN'));

-- Descripciones actualizadas (reglas nuevas de negocio).
UPDATE rol SET descripcion = 'Toma y trabaja sus tareas; crea tareas solo para sí; ve su board.'
 WHERE codigo = 'CONSULTOR';

UPDATE rol SET descripcion = 'Lidera el equipo (asigna, gobierna sus tableros y sprints) y responde por sus clientes (visibilidad cross-equipo).'
 WHERE codigo = 'RESPONSABLE_EQUIPO';

UPDATE rol SET descripcion = 'Ejecutor nacional acotado: solo trabaja/crea sus propias tareas; escala reasignaciones/transferencias por SOLICITUD al Responsable de Equipo. No gestiona boards ni ve el equipo.'
 WHERE codigo = 'ESPECIALISTA';
