-- =====================================================================
-- FitDesk · El senior de "Mesa de ayuda" es RESPONSABLE de su equipo durante su semana (2026-10-06).
-- Al asignar el Senior de Turno, quien queda en "Mesa de ayuda" recibe automáticamente el rol
-- RESPONSABLE_EQUIPO con alcance EQUIPO (el del turno), vigente de lunes a viernes de esa semana. El rol sigue
-- al turno: si cambia la persona o se borra la semana, se quita (ON DELETE CASCADE + sincronización en
-- LegacyWriteService.putTurnoSenior). asignacion.turno_senior_id marca las asignaciones automáticas; las hechas a
-- mano en Administración (NULL) no se tocan.
-- =====================================================================
ALTER TABLE asignacion ADD COLUMN IF NOT EXISTS turno_senior_id BIGINT REFERENCES turno_senior(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_asignacion_turno_senior ON asignacion(turno_senior_id);

-- Turnos actuales y futuros ya cargados: crear su rol automático.
INSERT INTO asignacion (usuario_id, rol_id, alcance_tipo, alcance_equipo_id, vigente_desde, vigente_hasta, turno_senior_id)
SELECT u.id, r.id, 'EQUIPO', ts.equipo_id, ts.semana_inicio, ts.semana_inicio + 4, ts.id
  FROM turno_senior ts
  JOIN usuario u ON upper(u.helpdesk_user_id) = upper(trim(ts.mesa_ayuda))
  JOIN rol r ON r.codigo = 'RESPONSABLE_EQUIPO'
 WHERE ts.mesa_ayuda IS NOT NULL AND trim(ts.mesa_ayuda) <> ''
   AND ts.equipo_id IS NOT NULL
   AND ts.semana_inicio + 4 >= current_date
   AND NOT EXISTS (SELECT 1 FROM asignacion a WHERE a.turno_senior_id = ts.id);
