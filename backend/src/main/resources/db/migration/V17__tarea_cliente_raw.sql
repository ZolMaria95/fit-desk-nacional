-- Cliente "crudo" en la tarea: permite que una REUNIÓN referencie CUALQUIER cliente del catálogo
-- del HelpDesk (helpdesk_client_id), incluidos los que aún NO están registrados como Cliente en
-- FitDesk (equipoResponsable). Antes la tarea solo tenía el FK cliente_id → un cliente no registrado
-- se perdía al guardar. Estas columnas conservan el código (hd id) y el nombre tal como los eligió
-- el usuario; el board resuelve el nombre por helpdesk.clients() y el picker (catálogo) hace round-trip.
-- Aditivo y nullable: no afecta las tareas existentes ni el FK cliente_id.
ALTER TABLE tarea ADD COLUMN cliente_codigo_raw VARCHAR(64);
ALTER TABLE tarea ADD COLUMN cliente_nombre     VARCHAR(300);
