# CLAUDE.md — fit-desk-api (backend)

Guía para cualquier sesión de Claude Code en el repo **`servicios/fit-desk-api`**.

## Qué es
Backend de **FitDesk**: **Quarkus 3.37 / Java 21**. Es la **única** fuente del frontend `fit-desk`.
Hace dos cosas:
1. **Datos propios** (board, sprints, transferencias, solicitudes, mensajes, admin, TicketEspejo) en
   **PostgreSQL** (Docker local → **Neon** en la nube) con **Panache** + **Flyway**.
2. **Proxy 1:1 del HelpDesk** externo (`helpdesk-api.fit-bank.com`) en `/api/v1/**` (identidad,
   tickets, mensajes, adjuntos, catálogos). El TicketEspejo es solo el encabezado liviano; la
   conversación/adjuntos se consumen en vivo del HelpDesk vía el proxy.

Contrato con el frontend: [`docs/contrato-api.md`](docs/contrato-api.md).

## Stack
- Quarkus 3.37, Java 21, JAX-RS (RESTEasy), **Hibernate ORM con Panache**, **Flyway** (esquema en
  `src/main/resources/db/migration/V*.sql`), Postgres. Autorización propia por **Rol × Alcance ×
  Vigencia** (default deny); identidad **federada al HelpDesk** (JWT del HelpDesk, no se crean usuarios).

## Reglas NO negociables
1. **⭐ Escrituras al HelpDesk SÍNCRONAS:** todo guardado al API del HelpDesk debe `await` + confirmar
   el resultado; nada de fire-and-forget ni "optimista". Si el HelpDesk falla, se refleja el error.
2. **Migraciones Flyway inmutables:** nunca edites una migración ya aplicada; agrega una nueva `V{n}__…`.
   El esquema lo crea Flyway (`hibernate-orm.database.generation=none`).
3. **Secretos fuera del repo:** credenciales de prod por **variables de entorno** (Neon/Render). En el
   repo solo credenciales **locales** de dev (`application.properties` → Postgres del docker-compose).
   `run-neon.sh` lee la URL de `~/.neon-url` en tiempo de arranque; nunca la hardcodees.
4. **CORS:** el frontend lee ciertos headers de respuesta cross-origin → **exponer los necesarios**
   (`quarkus.http.cors.exposed-headers=Content-Disposition` para que los adjuntos bajen con su nombre).
5. **El proxy es relay 1:1:** no transforma cuerpos; si el proxy falla devuelve **502**; un 4xx/5xx del
   `/api/v1/**` es del **HelpDesk**, no nuestro.

## Modelo de dominio (resumen)
Regional, Equipo, Cliente, Usuario, Rol, Asignacion, Board, Sprint, WorkflowEstado, **TicketEspejo**
(encabezado liviano, **sin** mensajes/adjuntos), **Tarea** (Story; asignado de tarea CON ticket =
`COALESCE(espejo.asignado_hd, tarea.asignado)` con write-through), **Transferencia**/**Solicitud**
(PENDIENTE/ACEPTADA/RECHAZADA/COMPLETADA; tarea oculta `pendiente_transferencia` que aparece al aceptar).

## Correr / construir / desplegar
- **Local:** `docker compose up -d` (Postgres) → `./mvnw quarkus:dev` (puerto por defecto 8080; para
  otro: `-Dquarkus.http.port=8099`). Contra **Neon**: `./run-neon.sh` (necesita `~/.neon-url`).
- **Build:** `./mvnw -DskipTests clean package` → `target/quarkus-app/quarkus-run.jar`.
- **Contenedor (prod):** `docker build --platform linux/amd64 -f src/main/docker/Dockerfile.multistage
  -t <img> .` → `docker push`. Hoy corre en **Render** (redeploy = *Manual Deploy* en el panel; no hay
  deploy hook). Objetivo a futuro: contenedores AWS (ECS Fargate + ECR + RDS + Secrets Manager).
- **Migraciones:** se aplican al arrancar (`quarkus.flyway.migrate-at-start=true`).

## Trampas ya aprendidas
- **HttpClient del JDK con keep-alive rancio** (proxy al HelpDesk): reusaba conexiones ya cerradas →
  *"header parser received no bytes"* (502 intermitente). Fix: `HttpRetry` idempotente + keepalive
  acotado (`-Djdk.httpclient.keepalive.timeout=20`) + HTTP/1.1 explícito. **POST/PATCH no se reintentan.**
- **CORS + descargas:** ver regla 4. Sin `exposed-headers`, el navegador no lee `Content-Disposition`
  y los adjuntos (.xls/.zip) bajan sin extensión.

## Cómo trabajas
- Cambios pequeños y verificables (compila + arranca + endpoint responde). Confirma con el usuario antes
  de algo irreversible o que toque producción/datos.
- Si cambias un endpoint/DTO que consume el frontend, **actualiza `docs/contrato-api.md`** (idéntico en
  ambos repos) y avisa/ajusta el repo `fit-desk`.

El agente especialista está en [`.claude/agents/fit-desk-api.md`](.claude/agents/fit-desk-api.md).
