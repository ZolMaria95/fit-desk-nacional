#!/usr/bin/env bash
# =====================================================================
# FitDesk · Fase 2 — Extracción de Firebase RTDB (SOLO LECTURA)
# ---------------------------------------------------------------------
# Baja el árbol completo de Firebase "tal cual" a un snapshot JSON
# versionado en docs/exports/ y actualiza el puntero estable
# firebase-snapshot-latest.json (el que consume el import a Postgres).
#
# REGLA DE ORO: jamás escribe ni borra en Firebase. Es un GET público.
# Ver docs/knowledge/04-estrategia-migracion.md (Firebase = solo lectura).
# =====================================================================
set -euo pipefail

RTDB_URL="https://fit-daily-ab113-default-rtdb.firebaseio.com/fit-daily.json"

# Raíz del repo = carpeta padre de este script.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
EXPORTS_DIR="$REPO_ROOT/docs/exports"
mkdir -p "$EXPORTS_DIR"

TS="$(date +%Y%m%d-%H%M%S)"
SNAPSHOT="$EXPORTS_DIR/firebase-snapshot-$TS.json"
LATEST="$EXPORTS_DIR/firebase-snapshot-latest.json"

echo "→ GET (solo lectura) $RTDB_URL"
HTTP_CODE="$(curl -sS -w '%{http_code}' -o "$SNAPSHOT" "$RTDB_URL")"

if [ "$HTTP_CODE" != "200" ]; then
  echo "✗ Firebase respondió HTTP $HTTP_CODE — no se actualiza el snapshot." >&2
  rm -f "$SNAPSHOT"
  exit 1
fi

# Validación mínima: que sea JSON no vacío.
if ! python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$SNAPSHOT" 2>/dev/null; then
  echo "✗ El cuerpo descargado no es JSON válido — se descarta." >&2
  rm -f "$SNAPSHOT"
  exit 1
fi

cp "$SNAPSHOT" "$LATEST"
BYTES="$(wc -c < "$SNAPSHOT" | tr -d ' ')"
echo "✓ Snapshot guardado: docs/exports/$(basename "$SNAPSHOT") (${BYTES} bytes)"
echo "✓ Puntero actualizado: docs/exports/firebase-snapshot-latest.json"
echo ""
echo "Siguiente paso: importar a Postgres local con"
echo "  curl -X POST http://localhost:8080/api/admin/etl/import-firebase"
