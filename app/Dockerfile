# Frontend FitDesk (Angular) — build + servir con Nginx, en 2 etapas.
#   docker build -t fitdesk-frontend .
# (En el docker-compose de la raíz se construye solo.)
# Usa la configuración `onprem` (datos + HelpDesk vía el backend Quarkus por MISMO ORIGEN:
# URLs relativas + Nginx que proxya /api → backend) y base-href '/'.

# ── Etapa 1: build de Angular ────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build -c onprem --base-href /

# ── Etapa 2: Nginx sirviendo el bundle ───────────────────────────────
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Angular 17+ (application builder) emite en dist/<proyecto>/browser.
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
EXPOSE 80
