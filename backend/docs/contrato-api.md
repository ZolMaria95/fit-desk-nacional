# Contrato de API — fit-desk ⇄ fit-desk-api

> **Este archivo es IDÉNTICO en los dos repos** (`servicios/fit-desk` y `servicios/fit-desk-api`).
> Es la frontera entre el frontend y el backend. **Regla:** quien cambie un endpoint/DTO/header de un
> lado, actualiza este documento en **ambos** repos y ajusta/avisa al otro lado. Mientras no exista
> OpenAPI publicado, este `.md` es la fuente de verdad (ver "Pendiente" al final).

## Topología
- **Frontend** `fit-desk` (Angular) → habla **solo** con **`fit-desk-api`** (Quarkus).
- **`fit-desk-api`** hace dos cosas:
  1. **Datos propios** en PostgreSQL/Neon → rutas nativas `/api/**`.
  2. **Proxy 1:1 del HelpDesk externo** (`helpdesk-api.fit-bank.com`) → rutas `/api/v1/**`.
- El frontend elige la base por entorno (`environment.*.ts`): `helpdeskProxyUrl` (`/api/v1`) y
  `quarkusApiUrl` (`/api`). En prod ambas apuntan al mismo backend desplegado.

## Autenticación y headers
- **Login** vía proxy: `POST /api/v1/auth/login` `{ username_or_email, password, force_logout }` →
  `{ access_token, refresh_token, ... }`. Perfil: `GET /api/v1/users/me` (Bearer). Refresh:
  `POST /api/v1/auth/refresh`. Identidad = HelpDesk; el backend NO crea usuarios.
- **`Authorization: Bearer <access_token>`** en las llamadas al proxy del HelpDesk.
- **`X-Actor-Hid: <helpdesk_user_id>`** en las rutas nativas que autorizan por actor (transferencias,
  solicitudes, mensajes, escrituras del board). El backend autoriza por **Rol × Alcance × Vigencia**
  (default deny); MSC001 es admin de arranque.
- **CORS:** el backend permite el origen del frontend y **expone `Content-Disposition`**
  (`quarkus.http.cors.exposed-headers`) para que las descargas de adjuntos conserven su nombre real.

## A) Proxy del HelpDesk — `/api/v1/**` (relay transparente)
`HelpdeskProxyResource` reenvía método, query, headers (incl. Authorization) y cuerpo tal cual a
`helpdesk-api.fit-bank.com/api/v1/**`, y devuelve la respuesta 1:1. Si **el proxy** falla → `502`;
un `4xx/5xx` que veas es del **HelpDesk**. Rutas que usa el frontend (no exhaustivo):
- `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /users/me`
- Catálogos: `GET /users/catalog`, `GET /clients/catalog`, `GET /ticket-statuses/catalog`
- Tickets: `GET /tickets/tickets` (paginado, filtros, `?..._order=`), `GET /tickets/tickets/search`,
  `GET /tickets/tickets/{id}`, `PUT /tickets/tickets/{id}` (asignar/estado, `x-www-form-urlencoded`)
- Conversación: `GET /tickets/{id}/messages`, `POST /tickets/{id}/messages` (multipart con adjuntos),
  `PATCH /tickets/{id}/messages/{msgId}`
- Adjuntos: `GET /attachments/{id}` (blob; nombre en `Content-Disposition`)

## B) API nativa de Quarkus — `/api/**` (datos en Postgres)
- **Board / legacy (lectura)** `GET /api/legacy/…`: `stories`, `sprints`, `boards`, `users`,
  `equipo-miembros`, `progress`, `queries`, `weeklySupport`, `hdNotes`, `hdActions`, `hdPendientes`,
  `hdPendientes-visibles`, `ticket-espejo`, `solNotes`.
- **Board / legacy (escritura)** `PATCH|PUT|DELETE /api/legacy/…`: `stories/stories[/{id}]`,
  `sprints`, `hdNotes`, `hdActions`, `hdPendientes`, `weeklySupport`, `progress`, `queries`,
  `solNotes`, `ticket-espejo/{id}/assignee`.
- **Perfil** `/api/legacy/perfil`: `GET /me`, `GET /fotos`, `GET /equipos-clientes`, `PUT /foto`.
- **Transferencias** `/api/transferencias`: `POST` (crear), `GET`, `GET /entrantes`, `GET /salientes`,
  `GET /aceptadas`, `POST /{id}/aceptar`, `POST /{id}/rechazar`, `GET /mi-equipo/miembros`,
  `GET /equipo/{equipoId}/miembros`.
- **Solicitudes** `/api/solicitudes`: `POST`, `GET`, `GET /entrantes`, `GET /mias`,
  `POST /{id}/aprobar`, `POST /{id}/rechazar`.
- **Mensajes entre equipos** `/api/mensajes`: `POST`, `GET /entrantes`, `POST /{id}/visto`.
- **Catálogos** `/api/catalogos`: `GET /roles`, `GET /workflow-estados`, `GET /health`.
- **Regionales** `/api/regionales`: CRUD (`GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`).
- **Administración** `/api/admin/…`: `clientes` (CRUD), `equipos` (GET/POST/PUT), `asignaciones`
  (CRUD), `usuarios` (GET), `mis-roles/{hid}` (roles de plataforma del actor),
  `sync/tickets` (+ `/import`).

## Modelo de dominio (resumen)
- **TicketEspejo** = encabezado **liviano** del ticket (número, cliente, estado, prioridad, fechas,
  asunto, asignado, `last_synced_at`). **NO** guarda conversación/mensajes/adjuntos: eso se consume en
  vivo del HelpDesk vía el proxy.
- **Tarea (Story)** del board: puede enlazar un TicketEspejo. El **asignado** de una tarea CON ticket
  se deriva del ticket (`COALESCE(espejo.asignado_hd, tarea.asignado)`), con write-through al reasignar.
- **Transferencia / Solicitud**: PENDIENTE/ACEPTADA/RECHAZADA/COMPLETADA. Al enviar/escalar un ticket
  sin tarea, se crea una **tarea oculta** (`pendiente_transferencia=true`) que aparece en el board del
  destino al **aceptar/aprobar**.
- **Roles de plataforma**: `Rol × Alcance × Vigencia` (Asignaciones), **no** el rol del HelpDesk.

## Pendiente (mejora de coordinación)
Habilitar **OpenAPI** en el backend (`quarkus-smallrye-openapi` → `/q/openapi`) para que este contrato
se genere/valide desde el código y el frontend regenere sus tipos. Hasta entonces, mantener este `.md`
sincronizado a mano en ambos repos.
