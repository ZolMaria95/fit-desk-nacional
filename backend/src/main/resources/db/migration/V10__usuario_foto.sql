-- =====================================================================
-- FitDesk · Foto de perfil por usuario
-- Cada usuario puede subir una foto (se guarda como data URI base64 ya
-- comprimida por el frontend, ~128px). Nullable: sin foto = avatar con código.
-- =====================================================================
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS foto TEXT;
