# 15 · Despliegue de FitDesk en el servidor de la empresa (Docker, on-prem)

> **Estado: DESPLEGADO Y VIVO** en `https://fitdesk.fit-bank.com` (dominio conectado por IT el 2026-09-01).
> FitDesk "nacional" corre en el servidor propio de la empresa con Docker, **autocontenido**. Es hoy el
> **destino de despliegue real**: GitHub Pages quedó reducido a una **página de redirect** hacia el dominio.
> Render/Neon siguen encendidos **como respaldo** (ya sin nadie escribiéndoles); el **corte de datos real**
> (apagar Render) está pendiente.

## Datos de acceso (vigentes)
- **SSH:** `ssh -i ~/Downloads/acceso-fitdesk/fitdesk_ed25519 -p 8814 fitdesk@172.17.1.9`
  ⚠️ El endpoint viejo `172.17.1.153:22` **ya no aplica** (no es alcanzable desde el Mac). Host `pocdocker`,
  Ubuntu 26.04, Docker 29.7.1 + Compose v5.4.0.
- **Web (usuarios):** `https://fitdesk.fit-bank.com` — **dominio interno**: requiere VPN/red corporativa.
- **Web (verificación de desarrollo):** el `:8080` del servidor **no** es alcanzable directo desde el Mac
  (el firewall solo abre SSH `:8814`) → se prueba por **túnel SSH**:
  `ssh -i <LLAVE> -p 8814 -L 18080:localhost:8080 fitdesk@172.17.1.9` y abrir `http://localhost:18080/`.
- **Ojo con la VPN (full-tunnel):** con VPN **ON** el Mac alcanza el servidor pero **no** Neon (falla el DNS);
  con VPN **OFF**, al revés. Por eso los dumps de Neon se hacen **desde el servidor** (ver abajo).

## Decisiones (confirmadas con la dueña)
- **Base de datos:** Postgres en el servidor (contenedor) **migrando los datos de Neon** (pg_dump/restore).
  Neon es **PostgreSQL 18.4** → usar `postgres:18` para dump y para el contenedor del servidor.
- **Imágenes:** el **servidor construye desde GitLab** (`git clone` + `docker compose up -d --build`).
  No se usa registry externo ni Docker Hub personal. Requiere que el server alcance GitLab + npm + Maven Central.
- **Fuente de verdad = GitLab de la empresa** (`gitlab.fit-bank.com`):
  - `servicios/fit-desk`     → **FRONTEND** (Angular, `app/` en la raíz).
  - `servicios/fit-desk-api` → **BACKEND**  (Quarkus, `backend/` en la raíz).
- **Despliegue en LOTE (2026-09-02):** no se despliega cambio por cambio, sino lotes acumulados, y **solo con
  luz verde explícita de la dueña**. Ver [../decisiones.md](../decisiones.md) [2026-09-02].

## Arquitectura (en el servidor)
Navegador → `https://fitdesk.fit-bank.com` → (reverse-proxy/TLS de IT) → **Nginx (frontend, `8080:80`)**
sirve el SPA **y proxya `/api/`** → **backend Quarkus :8080** → **Postgres (contenedor, volumen
`fitdesk_pgdata`)** + proxy al **HelpDesk** (`helpdesk-api.fit-bank.com`).
**Un solo origen** → sin CORS ni IP hardcodeada en el bundle.

## Preparación (2026-08-17)
- **GitLab front (`servicios/fit-desk`)** + ajuste **same-origin** (commit `befbbac`): `environment.onprem.ts`
  (URLs relativas `helpdeskProxyUrl=''`/`quarkusApiUrl=''`), config de build **`onprem`** en `angular.json`,
  `nginx.conf` con `location /api/ → proxy_pass http://backend:8080`, `Dockerfile` con
  `ng build -c onprem --base-href /`.
- **GitLab back (`servicios/fit-desk-api`)** actualizado (incluye V15…V18).
- **Carpeta de despliegue** `~/Downloads/fitdesk-deploy/`: `docker-compose.yml`, `.env.example`, dump y `RUNBOOK.md`.

⚠️ **Al sincronizar el FRONT a GitLab — nunca hacer mirror ciego** (dos trampas):
1. El `app/` local arrastra **huérfanos de Python/FastAPI** (`main.py`, `config.py`, `database.py`,
   `__init__.py`, `/models/ /routers/ /schemas/ /utils/`, `__pycache__`, `PEGA-TU-PROYECTO-AQUI.md`,
   `knowledge-base.md`) que **NO** van al repo → excluirlos, **anclados con `/`** porque `src/app/core/models`
   sí es Angular legítimo.
2. El **andamiaje on-prem vive SOLO en GitLab** (`angular.json` config onprem, `Dockerfile -c onprem`,
   `nginx.conf` proxy `/api`, `environment.onprem.ts`) y el `app/` local está **atrasado** en esos 4 →
   **preservarlos** (excluirlos del rsync) o se pierde el on-prem.
   Método: clonar → `rsync -a --delete` con esos excludes → `git add -A` + revisar `status` (solo debe salir
   la feature real, **0 deleciones**) → commit + push.

## Despliegue ejecutado — historial y estado
- **2026-08-31 — arranque:** los 3 contenedores arriba (`fitdesk-db` healthy, `fitdesk-backend`,
  `fitdesk-frontend`) en `~/fitdesk/` (compose + `.env` + dump + los 2 repos clonados). Restore **sin
  pérdida**: conteos servidor == Neon (tarea=306, ticket_espejo=5174, vacacion=7, feriado=1, usuario=19;
  23 tablas; Flyway V18 sin re-migrar). Web 200, `/api/legacy/boards` 200 con datos reales, `/api/v1` 401
  (el proxy al HelpDesk llega). Verificado E2E por túnel (login KIMA001, 5120 tickets reales del HelpDesk).
- **2026-09-01 — dominio + fix crítico:** IT conectó **`https://fitdesk.fit-bank.com`** (HTTPS). Se corrigió
  el bug de los guards `!!quarkusApiUrl` con URL vacía (perfil/roles/board caían a Firebase; MSC001 no veía
  Administración ni Bandeja) → GitLab `41f1b0d..36aa97b`, rebuild **solo del frontend**. Verificado por túnel
  con KIMA001. Detalle en [../aprendizajes.md](../aprendizajes.md) [2026-09-01].
- **2026-09-02 — refresco de datos:** on-prem re-cargado con lo más reciente de Neon (tarea=311,
  ticket_espejo=5178, vacacion=7, feriado=1, usuario=19; == Neon, sin pérdida).
- **2026-09-02 — Lote 1:** GitLab `36aa97b..e2bf028` + rebuild del frontend. Ver
  [../decisiones.md](../decisiones.md) [2026-09-02].
- **2026-09-02 — redirect de Pages:** la dueña pidió publicar el redirect ya. **Pages es ahora SOLO una página
  de redirect** a `https://fitdesk.fit-bank.com/` (gh-pages `fa4a7c1`, reemplazó la app `25601a4`;
  `index.html` + `404.html` → cualquier ruta redirige; meta-refresh 2 s + `location.replace` 1.2 s + botón
  manual + aviso "requiere VPN/red corporativa"). **Reversible:** `cd app && npx ng build -c cloud --base-href
  /fit-desk-nacional/` + `python3 scripts/deploy-gh-pages.py` (~2 min).

**Nota:** desde que quedó vivo solo se ha reconstruido el **frontend**. El primer redeploy de **backend**
pendiente es el del **tema oscuro (V19)** — al hacerlo, Flyway aplicará la migración sobre la BD del servidor.

## `docker-compose.yml` (el servidor construye desde los clones)
```yaml
services:
  db:        # postgres:18, restart unless-stopped, vol fitdesk_pgdata → /var/lib/postgresql (NO /data),
             # POSTGRES_PASSWORD=${DB_PASSWORD}, healthcheck
  backend:   # build ./fit-desk-api (dockerfile src/main/docker/Dockerfile.multistage);
             # env QUARKUS_DATASOURCE_JDBC_URL=jdbc:postgresql://db:5432/fitdesk?currentSchema=public,
             #     _USERNAME=fitdesk, _PASSWORD=${DB_PASSWORD},
             #     FITDESK_HELPDESK_BASE_URL=https://helpdesk-api.fit-bank.com/api/v1,
             #     QUARKUS_HTTP_CORS_ENABLED=false      # ⭐ same-origin: si no, el login da 403
             # NO publica :8080 (solo lo alcanza nginx por la red del compose)
  frontend:  # build ./fit-desk ; ports "8080:80"  (Docker ROOTLESS: no puede bindear el :80) ; depends_on backend
volumes: { fitdesk_pgdata: {} }
```
(El archivo real está en `~/Downloads/fitdesk-deploy/docker-compose.yml` y en `~/fitdesk/` del servidor.)

### ⭐ Los 3 gotchas del arranque (ya resueltos, no re-tropezar)
1. **`postgres:18` exige el volumen en `/var/lib/postgresql`** (no `/var/lib/postgresql/data`) o entra en
   crash-loop.
2. **Docker ROOTLESS** en el servidor: no puede bindear el `:80` privilegiado → el frontend se publica en
   **`8080:80`**.
3. **CORS 403 en el login** (habría roto el login también en el corte real): el backend traía el default de
   dev `quarkus.http.cors.origins=localhost:4200`; como on-prem es **same-origin**, el navegador manda
   `Origin: http://<host>` en el POST de login y Quarkus lo rechazaba con **403** (con `curl`, sin `Origin`,
   daba 409 normal → despista). Fix: `QUARKUS_HTTP_CORS_ENABLED=false`. **Imprescindible también con el
   dominio** `fitdesk.fit-bank.com` (su `Origin` daría 403 igual).

## Runbook de arranque (YA EJECUTADO; queda como referencia para rehacerlo desde cero)
```bash
# 1) desde el Mac: copiar
scp -i <LLAVE> -P 8814 ~/Downloads/fitdesk-deploy/docker-compose.yml ~/Downloads/fitdesk-deploy/fitdesk-neon.dump \
    fitdesk@172.17.1.9:~/fitdesk/
# 2) en el servidor: clonar los 2 repos
ssh -i <LLAVE> -p 8814 fitdesk@172.17.1.9 ; cd ~/fitdesk
GL='glpat-...'   # token GitLab (rotar después)
git clone https://oauth2:$GL@gitlab.fit-bank.com/servicios/fit-desk.git      fit-desk
git clone https://oauth2:$GL@gitlab.fit-bank.com/servicios/fit-desk-api.git  fit-desk-api
# 3) .env con clave fuerte
printf 'DB_PASSWORD=%s\n' 'CLAVE-FUERTE' > .env ; chmod 600 .env
# 4) BD y esperar healthy
docker compose up -d db ; docker compose ps
# 5) restaurar Neon
docker exec -i fitdesk-db pg_restore -U fitdesk -d fitdesk --no-owner --no-privileges --clean --if-exists < fitdesk-neon.dump
# 6) construir + levantar (Flyway VALIDA, no re-migra)
docker compose up -d --build ; docker compose logs -f backend
# 7) chequeos: curl -I http://localhost:8080/ ; login /api/v1 ; abrir por el túnel http://localhost:18080/
```

## Flujo para actualizar (el que se usa hoy, en LOTES)
> **Regla de la dueña (2026-09-02): se despliega en LOTE**, no cambio por cambio, y **solo con su luz verde
> explícita**. Los cambios listos-pero-sin-desplegar se acumulan; ver [../decisiones.md](../decisiones.md).

1. Hacer los cambios en el código (front y/o back) y verificarlos en local.
2. **Sincronizar a GitLab** con la whitelist/excludes de arriba: front → `servicios/fit-desk` (solo contenido
   Angular, preservando el andamiaje on-prem), back → `servicios/fit-desk-api`.
3. En el servidor:
   ```bash
   git -C ~/fitdesk/fit-desk pull https://oauth2:TOKEN@gitlab.fit-bank.com/servicios/fit-desk.git main
   cd ~/fitdesk && docker compose build frontend && docker compose up -d frontend
   ```
   (Si el lote toca el backend: igual con `fit-desk-api` + `build backend`; Flyway aplica las migraciones
   nuevas sobre la BD restaurada.)
4. Verificar por **túnel SSH** antes de avisar. Pages **no** se rebuildea (es solo el redirect).

## Refresco de datos desde Neon (mientras Render siga encendido)
El **dump se hace DESDE EL SERVIDOR** contra Neon (`docker run postgres:18 pg_dump`), porque la VPN es
full-tunnel (el Mac no alcanza ambos a la vez). La URL de Neon se pasa por **archivo temporal**
(`~/.neon-url-tmp`, se borra al final), nunca en la línea de comando. Restore:
`docker compose stop backend frontend` → `DROP SCHEMA public CASCADE; CREATE SCHEMA public` → `pg_restore` →
`docker compose start backend frontend`.

## Pendientes
- **Acceso sin VPN:** el dominio es **interno** → los usuarios fuera de la red corporativa **no entran**.
  Pendiente que IT (Raul Tenorio) lo exponga públicamente.
- **Corte de datos real:** apagar Render con un **dump final fresco en el mismo momento** (evita
  hueco/split-brain). Hasta entonces, Render/Neon quedan como respaldo.
- **Verificar E2E on-prem lo que quedó a medias:** las **notas de ticket** (`ticket_nota` sí está en el
  restore y va por el `useQuarkus` ya arreglado, pero falta confirmarlo en vivo). En general: la verificación
  inicial solo cubrió login+boards, y por eso se coló el bug de los guards → probar on-prem cada feature que
  se toque.
- **Seguridad:** `.env` (clave BD) fuera de git; **rotar el token de GitLab** (se usó en chat).

## Gotchas de fondo
- **Neon = PG 18** → dump y contenedor con `postgres:18` (no 16, para el restore).
- **Same-origin:** **nunca** uses `!!url` como feature-flag (con `quarkusApiUrl:''` da `false` y la app cae al
  Firebase legacy); chequea `dataBackend`.
- **Portapapeles:** `navigator.clipboard` solo va en contexto seguro; con el dominio **HTTPS** ya funciona
  nativo, y de todos modos hay fallback `execCommand` en `core/clipboard.ts` para el acceso por HTTP/IP.
- **Build en el servidor** necesita salida a npm + Maven Central; si el server perdiera internet a los
  registries, alternativa = construir imágenes fuera y cargarlas (`docker save`/`load`) o el registry de
  GitLab (CI).
