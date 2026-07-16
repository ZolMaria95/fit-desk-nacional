# FitDesk — Backend (Quarkus + PostgreSQL)

Primer backend propio de FitDesk (Fase 1 de la migración). Reemplazará a Firebase
(datos) y al Cloudflare Worker (proxy del HelpDesk). Stack: **Quarkus (Java 21) +
Hibernate ORM Panache + Flyway + PostgreSQL**. El esquema deriva del
[modelo conceptual](../docs/knowledge/01-modelo-conceptual.md).

> Regla de oro: esto se construye **al lado** de lo actual. **No** toca Firebase ni
> el despliegue en GitHub Pages.

## Requisitos
- Docker (corriendo) · Java 21 (Temurin) · (Maven NO hace falta: se usa `./mvnw`).

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

## 1) Levantar PostgreSQL (local, en Docker)
```bash
docker compose up -d            # Postgres 16 en localhost:5432 (db/user/pass: fitdesk)
docker compose ps               # debe verse "healthy"
docker compose down             # apagar (los datos persisten en el volumen)
docker compose down -v          # apagar y BORRAR datos (empezar limpio)
```

## 2) Arrancar el backend
```bash
./mvnw quarkus:dev              # modo dev (hot reload). Flyway aplica V1/V2 al arrancar.
# o build + run:
./mvnw -DskipTests package
java -jar target/quarkus-app/quarkus-run.jar
```

## 3) Probar
```bash
curl localhost:8080/api/catalogos/health           # {"status":"ok","roles":6,"workflowEstados":4}
curl localhost:8080/api/catalogos/roles
curl localhost:8080/api/catalogos/workflow-estados
curl localhost:8080/api/regionales
curl -X POST localhost:8080/api/regionales \
     -H 'Content-Type: application/json' \
     -d '{"codigo":"CUENCA","nombre":"Cuenca"}'     # nacionalización por datos (sin redeploy)
```

## Esquema (Flyway)
`src/main/resources/db/migration/`
- `V1__init.sql` — 12 tablas del modelo: regional, equipo, usuario, rol, cliente,
  asignacion, board, sprint, workflow_estado, ticket_espejo, tarea, transferencia.
  La autorización (`Rol × Alcance × Vigencia`) se hace cumplir con CHECKs en `asignacion`.
- `V2__seed_catalogos.sql` — catálogos de referencia (6 roles, 4 columnas de workflow).

Los datos de Cuenca (regional/equipo/clientes/usuarios reales) entran en el **ETL de
Fase 2** (lee el export de Firebase de `docs/exports/`), no en las migraciones.

## Pendiente (próximas fases)
- Federación de login al HelpDesk + emisión de JWT propio (`smallrye-jwt` ya incluido).
- Proxy/sync del HelpDesk (`rest-client` ya incluido) → `ticket_espejo` (encabezado
  liviano; conversación y adjuntos **en vivo**, no se almacenan).
- Entidades/endpoints del resto del dominio (board, sprint, tarea, asignacion…).
