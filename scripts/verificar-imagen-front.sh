#!/usr/bin/env bash
# Guardia OBLIGATORIA antes de cargar/desplegar la imagen del frontend a AWS.
# Uso: scripts/verificar-imagen-front.sh [imagen]   (default: fitdesk-frontend:latest)
# Sale con código != 0 si la imagen romperia el login/API (incidente 2026-09-21: 405 en login).
set -u
IMG="${1:-fitdesk-frontend:latest}"
fail=0
ko() { echo "✗ $1"; fail=1; }
ok() { echo "✓ $1"; }

CONF=$(docker run --rm --entrypoint cat "$IMG" /etc/nginx/conf.d/default.conf 2>/dev/null) || { echo "✗ no pude leer la imagen $IMG"; exit 2; }
echo "$CONF" | grep -q "location /api/" && echo "$CONF" | grep -q "proxy_pass http://backend:8080" \
  && ok "nginx proxya /api/ -> backend:8080" || ko "nginx SIN proxy /api/ -> backend:8080 (el login daria 405)"

JS=$(docker run --rm --entrypoint sh "$IMG" -c 'cat /usr/share/nginx/html/*.js' 2>/dev/null)
echo "$JS" | grep -q "localhost:8080" && ko "el bundle contiene http://localhost:8080 (URLs no relativas)" || ok "bundle sin localhost:8080"
echo "$JS" | grep -q "fit-daily-ab113" >/dev/null 2>&1 || true

[ "$fail" -eq 0 ] && echo "IMAGEN OK para desplegar" || { echo "IMAGEN NO APTA — NO DESPLEGAR"; exit 1; }
