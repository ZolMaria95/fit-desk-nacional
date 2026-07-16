# 11 — Fase 4: Contenerización (stack completo)

Todo el stack nuevo (front + back + Postgres) en contenedores, para levantarlo con
un comando y para publicarlo luego en un VPS / AWS. NO toca Firebase ni GitPages.

## Levantar todo

```bash
docker compose up --build
#  db       → PostgreSQL           (:5432, volumen fitdesk_pgdata)
#  backend  → Quarkus (JVM)        (:8080)
#  frontend → Angular + Nginx      (:8081)
# App en http://localhost:8081  (habla solo con el backend :8080)
```

> No corras a la vez `backend/docker-compose.yml` (solo la BD, para dev con el jar
> local): choca el puerto 5432 y el contenedor `fitdesk-db`. El de la raíz es el stack full.

## Artefactos

| Archivo | Qué es |
|---|---|
| [`docker-compose.yml`](../../docker-compose.yml) (raíz) | Stack completo: db + backend + frontend |
| [`backend/src/main/docker/Dockerfile.multistage`](../../backend/src/main/docker/Dockerfile.multistage) | Backend **self-contained**: compila con Maven dentro de la imagen (lo usa el compose) |
| `backend/src/main/docker/Dockerfile.jvm` | Backend rápido: usa el fast-jar ya construido (requiere `./mvnw package` antes) |
| [`app/Dockerfile`](../../app/Dockerfile) | Frontend: `npm ci` + `ng build -c quarkus --base-href /` → Nginx |
| [`app/nginx.conf`](../../app/nginx.conf) | Nginx para el SPA (gzip, try_files) |

## Configuración por variables de entorno

El backend NO hardcodea la BD para el contenedor: MicroProfile Config mapea env vars
a las propiedades Quarkus (override sin tocar `application.properties`):

- `QUARKUS_DATASOURCE_JDBC_URL` → `jdbc:postgresql://db:5432/fitdesk` (nombre del servicio)
- `QUARKUS_DATASOURCE_USERNAME` / `QUARKUS_DATASOURCE_PASSWORD`
- `QUARKUS_HTTP_CORS_ORIGINS` → `http://localhost:8081` (origen del frontend)

El frontend se construye con la config `quarkus` (datos + HelpDesk vía el backend, no
Firebase) y `--base-href /`. La URL del backend (`localhost:8080`) sirve para local;
para un VPS se parametriza (ver Pendiente).

## ⚠️ Datos: el Postgres del contenedor arranca VACÍO

El volumen `fitdesk_pgdata` del compose es nuevo → sin datos de negocio (solo Flyway
crea el esquema). Para poblarlo:
- **Local → VPS (tu flujo):** `pg_dump` de la BD local (la que ya migraste con el ETL)
  y restore en la BD del contenedor/VPS. Ej.:
  ```bash
  # exportar la BD local (con la data del ETL)
  docker exec fitdesk-db pg_dump -U fitdesk -d fitdesk -Fc > fitdesk.dump
  # restaurar en el destino
  docker exec -i <db-destino> pg_restore -U fitdesk -d fitdesk --clean < fitdesk.dump
  ```
- **O** correr el ETL contra la BD del contenedor (requiere montar `docs/` y el snapshot).

## Verificado (2026-07-02)

- Imagen backend **multistage** → build OK (Maven dentro) + corre contra Postgres real (health OK).
- Imagen backend **jvm** → build OK + corre + lee las 100+ tareas migradas.
- Imagen **frontend** → `npm ci` + `ng build` OK + Nginx sirve el SPA.
- `docker compose config` válido (db, backend, frontend). Config por env vars OK; CORS a `:8081` OK.

## Gotchas resueltos

- **`.dockerignore` del backend** venía del starter (solo dejaba pasar `target/*-runner`
  y `target/quarkus-app`) → el multistage no encontraba `src/`. Se reescribió para excluir
  solo lo transitorio y dejar `src/`, `pom.xml`, `target/quarkus-app` disponibles (sirve a ambos Dockerfiles).
- **`./mvnw` falla dentro de la imagen** ("Failed to validate Maven distribution SHA-256"):
  el wrapper intenta bajar su propia distribución. Se usa el **`mvn`** que ya trae la imagen `maven:3.9`.

## Pendiente

- **Parametrizar la URL del backend en el frontend** (dominio del VPS en vez de `localhost:8080`)
  — build-arg o config en runtime.
- **Imagen nativa** de Quarkus (`Dockerfile.native`) para arranque/memoria menores.
- **Fase 5 — AWS:** ECR/ECS Fargate/RDS/ALB/Secrets Manager (ver [04-estrategia-migracion.md](04-estrategia-migracion.md)).
