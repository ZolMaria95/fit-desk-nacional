# Frontend FitDesk (Angular) — build + servir con Nginx, en 2 etapas.
#   docker build -t fitdesk-frontend .
# (En el docker-compose de la raíz se construye solo.)
# Usa la configuración `quarkus` (datos + HelpDesk vía el backend Quarkus, no Firebase)
# y base-href '/' (raíz, a diferencia del subpath de GitHub Pages).

# ── Etapa 1: build de Angular ────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build -c quarkus --base-href /

# ── Etapa 2: Nginx sirviendo el bundle ───────────────────────────────
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Angular 17+ (application builder) emite en dist/<proyecto>/browser.
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
EXPOSE 80
