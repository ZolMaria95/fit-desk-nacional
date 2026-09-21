-- =====================================================================
-- FitDesk · Cancelar un envío pendiente (Transferencia y Solicitud)
-- Quien envió puede retirar su propio envío mientras siga PENDIENTE, sin que
-- el destino lo vea como un rechazo suyo. Estado nuevo CANCELADA en las dos
-- tablas, aditivo: no toca filas existentes.
-- =====================================================================

ALTER TABLE transferencia DROP CONSTRAINT transferencia_estado_check;
ALTER TABLE transferencia ADD CONSTRAINT transferencia_estado_check
    CHECK (estado IN ('PENDIENTE','ACEPTADA','RECHAZADA','COMPLETADA','CANCELADA'));

ALTER TABLE solicitud DROP CONSTRAINT solicitud_estado_check;
ALTER TABLE solicitud ADD CONSTRAINT solicitud_estado_check
    CHECK (estado IN ('PENDIENTE','APROBADA','RECHAZADA','CANCELADA'));
