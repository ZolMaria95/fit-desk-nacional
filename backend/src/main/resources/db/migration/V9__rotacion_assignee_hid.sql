-- =====================================================================
-- FitDesk · Rotación semanal — asignado en el espacio del HelpDesk
-- El picker de la rotación pasa a salir del catálogo de empleados del API
-- (helpdesk_user_id), filtrado por equipo. Se alinea el `assignee_local` de las
-- filas existentes (que traían el codigo local del legacy) al helpdesk_user_id
-- del mismo usuario, para que el id sea consistente con el resto de la app.
-- =====================================================================

UPDATE rotacion_semanal r
   SET assignee_local = u.helpdesk_user_id
  FROM usuario u
 WHERE u.id = r.usuario_id
   AND u.helpdesk_user_id IS NOT NULL;
