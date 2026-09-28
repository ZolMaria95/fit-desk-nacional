-- =====================================================================
-- FitDesk · Nuevo rol de plataforma HELPDESK
-- Crea, edita, elimina y reasigna tickets del HelpDesk externo desde FitDesk,
-- dentro del ALCANCE de su Asignación (EQUIPO / REGIONAL / CLIENTE / GLOBAL).
-- ADMIN siempre puede. Cambiar el ESTADO de un ticket sigue abierto a todos.
-- El gating real vive en el backend (HelpdeskProxyResource + Actor.puedeGestionarTicket).
-- OJO: es un rol de PLATAFORMA (Asignación en FitDesk); no se deriva del
-- role_description del HelpDesk aunque se llamen parecido.
-- Ver docs/decisiones.md (2026-09-27).
-- =====================================================================

ALTER TABLE rol DROP CONSTRAINT IF EXISTS rol_codigo_check;
ALTER TABLE rol ADD CONSTRAINT rol_codigo_check
    CHECK (codigo IN ('CONSULTOR','RESPONSABLE_EQUIPO','ESPECIALISTA','GERENCIA','ADMIN','HELPDESK'));

INSERT INTO rol (codigo, nombre, descripcion)
VALUES ('HELPDESK', 'Helpdesk',
        'Edita, elimina y reasigna tickets del HelpDesk dentro de su alcance (EQUIPO/REGIONAL/CLIENTE/GLOBAL).')
ON CONFLICT (codigo) DO NOTHING;
