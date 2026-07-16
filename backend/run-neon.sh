#!/bin/bash
# =====================================================================
# FitDesk · Arranca Quarkus contra Neon (Postgres en la nube).
# La contraseña NO vive aquí: se lee de ~/.neon-url en tiempo de arranque
# y la JDBC URL (host/db) se deriva del mismo archivo. Para volver a la
# base local, simplemente arranca el jar sin este script.
# =====================================================================
set -euo pipefail

NEON_FILE="$HOME/.neon-url"
[ -f "$NEON_FILE" ] || { echo "✗ No existe $NEON_FILE (guárdalo con: pbpaste > ~/.neon-url)"; exit 1; }

RAW="$(cat "$NEON_FILE")"
NOPROTO="${RAW#postgresql://}"      # neondb_owner:PASS@HOST/DB?params
CREDS="${NOPROTO%%@*}"             # neondb_owner:PASS
HOSTPART="${NOPROTO#*@}"           # HOST/DB?params
USER="${CREDS%%:*}"
PASS="${CREDS#*:}"
HOSTONLY="${HOSTPART%%/*}"         # HOST
REST="${HOSTPART#*/}"             # DB?params
DB="${REST%%\?*}"                  # DB (sin query)

# Solo parámetros que entiende el driver JDBC de Postgres (se descartan los
# libpq-only tipo channel_binding). currentSchema=public por el gotcha del search_path.
export QUARKUS_DATASOURCE_DB_KIND=postgresql
export QUARKUS_DATASOURCE_USERNAME="$USER"
export QUARKUS_DATASOURCE_PASSWORD="$PASS"
export QUARKUS_DATASOURCE_JDBC_URL="jdbc:postgresql://${HOSTONLY}/${DB}?sslmode=require&currentSchema=public"

echo "→ Quarkus contra Neon:  ${USER}@${HOSTONLY}/${DB}  (schema=public)"
exec java -jar target/quarkus-app/quarkus-run.jar
