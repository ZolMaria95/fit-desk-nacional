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
  `GET /tickets/tickets/{id}`, `PUT /tickets/tickets/{id}` (`x-www-form-urlencoded`)
- **Guardas del rol HELPDESK sobre el proxy (2026-09-27)** — el relay deja de ser 1:1 SOLO para
  `tickets/tickets/{id}` (el resto sigue intacto):
  - `PUT` con **solo** `ticket_status_id` → pasa (cambiar estado sigue abierto a todos).
  - `PUT` con cualquier otro campo (`assigned_user_id`, `subject`, `subsystem_id`, `ticket_type_id`,
    `priority`, `incidence`…) → exige rol **HELPDESK** en el alcance del cliente del ticket, o
    **ADMIN**; si no, **403** `{"error":{"message":"…"},"message":"…"}`. El actor llega en
    **`X-Actor-Hid`**, que el frontend ahora manda en toda escritura a `/api/v1` (sin header → 403).
    El `client_id` se lee del propio HelpDesk (`GET` con el `Authorization` del usuario).
  - `DELETE tickets/tickets/{id}` → **403 siempre**: el borrado va por `DELETE /api/legacy/tickets/{id}`.
  - `POST tickets/tickets` (crear ticket) → sin cambios por ahora (pendiente, "crear" se hará después).
  - Catálogos usados por "Editar ticket": `GET /subsystems/catalog` (módulos: `subsystem_id`,
    `description`) y `GET /ticket-types/catalog` (`ticket_type_id`, `description`).
  - **Ojo (verificado 2026-09-27):** el HelpDesk responde **200 con el ticket completo** pero **ignora
    en silencio** los campos que la cuenta no puede cambiar. Con una cuenta SUPERVISOR solo aplica
    `incidence` (y asignado/estado); `subject`, `subsystem_id`, `ticket_type_id` y `priority` vuelven
    sin cambios (probado con form-urlencoded, multipart y JSON). El front compara lo pedido con la
    respuesta y avisa qué no se aplicó.
- Conversación: `GET /tickets/{id}/messages`, `POST /tickets/{id}/messages` (multipart con adjuntos),
  `PATCH /tickets/{id}/messages/{msgId}`
- Adjuntos: `GET /attachments/{id}` (blob; nombre en `Content-Disposition`)

## B) API nativa de Quarkus — `/api/**` (datos en Postgres)
- **Board / legacy (lectura)** `GET /api/legacy/…`: `stories`, `boards`, `users`,
  `equipo-miembros`, `weeklySupport`, `hdNotes`, `hdActions`, `hdPendientes`,
  `hdPendientes-visibles`, `ticket-espejo`, `solNotes`. (El tablero es **continuo por equipo**, sin
  sprints — ver "Modelo de dominio". `sprints`, `progress` y `queries` siguen existiendo en el
  backend pero **el frontend ya no los consume**: vestigiales.)
- **Board / legacy (escritura)** `POST|PATCH|PUT|DELETE /api/legacy/…`: `stories/stories[/{id}]`,
  `hdNotes`, `hdActions`, `hdPendientes`, `weeklySupport`, `solNotes`,
  `ticket-espejo/{id}/assignee`. (`sprints`/`progress`/`queries` = vestigiales.)
- **⚠️ `turnoSenior` (PENDIENTE — el frontend ya lo consume, el backend `fit-desk-api` todavía NO lo
  implementa; hoy responde 404, manejado con try/catch en `DataService`, sin romper la UI)**:
  - `GET/PUT /api/legacy/turnoSenior?equipo=<codigo>` — mismo patrón que `weeklySupport?equipo=`
    (rotación semanal por equipo), pero con **2 roles** y semana **LUNES→VIERNES** (clave = fecha ISO del **lunes**; sáb/dom no pertenecen a ninguna semana de turno)
    en vez de 1 y **sin** el log de tickets que sí tiene `weeklySupport` (no aplica a esta pantalla):
    ```json
    { "weeks": { "<YYYY-MM-DD del lunes>": {
        "mesaAyuda": "<hid o ''>", "emergentes": "<hid o ''>",
        "notes": "", "updatedAt": "ISO"
    } } }
    ```
  - `GET /api/legacy/turnoSenior/hoy` (header `X-Actor-Hid`, igual que el resto de `/api/legacy/`) —
    agregado sobre TODOS los equipos: ¿el actor está de turno HOY, en cualquiera de los 2 roles, en
    cualquier equipo? (la asignación de "Senior de Turno" es abierta a cualquier empleado, así que
    puede tocarle un equipo al que ni pertenece — no alcanza con mirar solo un equipo). Usado para el
    punto rojo del menú lateral ("Senior de Turno"), visible sin importar la pantalla activa:
    ```json
    { "deTurno": true, "rol": "mesaAyuda", "equipo": "CACEL", "equipoNombre": "COAC CACEL" }
    ```
    (`deTurno: false` y el resto de campos ausentes si no está de turno en ningún equipo hoy).
  - A diferencia de `weeklySupport` (asignación limitada a miembros del equipo vía
    `equipo-miembros`), el picker de "Senior de Turno" en el frontend usa el catálogo COMPLETO de
    `users` (`HelpdeskService.hdUsers()`) — cualquier empleado de la empresa es asignable, sin
    restricción de equipo. Ver `docs/decisiones.md` para el contexto completo.
  - **Crear tarea:** `POST /stories/stories` (body = la tarjeta, **sin id**) → el **backend asigna el id**
    atómicamente y devuelve `{ "id": "TA-NNN" }` (201). Reemplaza el id client-side (max+1) que podía
    chocar entre vistas desactualizadas. El front hace **fallback** al PATCH si el POST no existe (backend viejo).
  - **Borrar tarea:** `DELETE /stories/stories/{id}` — **autorizado server-side** por `X-Actor-Hid`: solo
    **ADMIN** o el **RE del board**; nunca una tarea con ticket. Devuelve 204 / 404 / **403** / **409** (con ticket).
  - **Nota:** el PATCH de una tarea hace read-modify-write; el frontend **coalesce** varios campos de una
    misma tarea en UNA sola llamada (no dispares PATCH concurrentes a la misma fila → se pisan y dan 500).
  - **Cliente de una tarea:** el body acepta `client` (código) y `clientName`. El backend resuelve `client`
    al `Cliente` registrado (FK, por `codigo` o `helpdesk_client_id`); además guarda el código y nombre
    **crudos** (`cliente_codigo_raw`, `cliente_nombre`, V17) para no perder un cliente NO registrado. En
    `GET /stories`, una **REUNIÓN** con cliente del catálogo sirve el `client`/`clientName` **crudos** (el
    front resuelve el nombre por `helpdesk.clients()` y el selector del catálogo hace round-trip); el resto
    sirve el `Cliente` registrado (FK).
  - **Crear tarea automática al asignar:** `POST /stories/desde-ticket-asignado` — body
    `{ ticket, clienteCodigo, clienteNombre, titulo, asignadoHid, asignadoNombre }` + `X-Actor-Hid`. El
    frontend lo llama justo tras confirmar una asignación al HelpDesk (`HelpdeskService.assignTicket`) si el
    llamador tiene el `Ticket` completo. Si el ticket YA tiene tarea, no-op (`{ creada:false, tareaCodigo }`
    idempotente). Tablero destino: el equipo responsable del **cliente** del ticket
    (`Cliente.equipoResponsable`) si está registrado; si no, el equipo del **actor** (quien asignó), primero
    como miembro y si no como responsable. Si ninguno resuelve, no crea nada (`{ creada:false, motivo:"sin
    equipo" }`) — la asignación al HelpDesk ya ocurrió igual, queda la creación manual de siempre.
  - **`POST /stories/stories` y el upsert de `PATCH /stories/stories` (creación manual, botón "Crear
    tarea"):** desde 2026-09-24 aplican el MISMO criterio de tablero — si el body trae `ticket` (no
    vacío) y `client` resuelve un `Cliente` con `equipoResponsable` registrado, ESE equipo manda sobre
    el `board` que mande el frontend. Antes de este fix, el frontend siempre mandaba `currentBoard()`
    (el tablero que el actor tenía abierto), sin relación con el cliente del ticket — causa real de
    tareas de un cliente de un equipo apareciendo en el tablero de otro (p. ej. "PRUEBA"; ver
    `docs/aprendizajes.md` 2026-09-24). Si no hay `ticket` o el cliente no resuelve equipo, se respeta
    el `board` enviado (sin cambios, no rompe tareas locales/reuniones sin cliente registrado). **El
    frontend no necesita cambiar nada** — puede seguir mandando `currentBoard()` en `board`, el backend
    lo sobreescribe cuando corresponde. Un PATCH sobre una tarea YA EXISTENTE nunca reasigna el tablero
    por esta regla, aunque el body incluya `ticket`/`client`.
- **Perfil** `/api/legacy/perfil`: `GET /me`, `GET /fotos`, `GET /equipos-clientes`, `GET /tickets-gestionables`, `PUT /foto`.
  - `GET /tickets-gestionables` (+ `X-Actor-Hid`) → `{ global: bool, clientes: [..] }`: sobre qué tickets
    puede el actor editar/eliminar/reasignar (rol HELPDESK en su alcance; ADMIN = `global`). `clientes`
    trae el `client_id` del HelpDesk **y** el código (slug) FitDesk de cada cliente cubierto (los tickets
    usan el primero, las tareas el segundo). Solo para mostrar/ocultar acciones; autoriza el backend.
- **Eliminar ticket** `DELETE /api/legacy/tickets/{id}` (+ `X-Actor-Hid` + `Authorization` del usuario):
  rol HELPDESK en el alcance del cliente del ticket, o ADMIN (si no, 403). Borra en el HelpDesk
  (`DELETE /tickets/tickets/{id}`, sin body) y **solo si éste responde 2xx** borra la tarea espejo
  (con sus mensajes/transferencias/solicitudes), los overlays del ticket (notas, acciones,
  recordatorios, guardados) y el `TicketEspejo` — única excepción a "tareas con ticket no se
  eliminan". Respuesta `{ ok, message, tareasEliminadas: [TA-…] }`; si el HelpDesk falla, su status y
  cuerpo tal cual, sin tocar nada local.
  - `GET /me` → `{ roles, equipos, clientes, esGlobal }`. **`clientes`** = los del **ALCANCE** del actor
    (EQUIPO→su equipo, REGIONAL→su regional, GLOBAL→todos los registrados), independiente del rol
    (`Actor.equiposEnAlcance`). **`esGlobal`** (bool) = alcance GLOBAL (`Actor.esAlcanceGlobal`). El frontend:
    si `esGlobal` (o no hay clientes de alcance) → selector de cliente con el **catálogo completo del HelpDesk**;
    si no → limitado a `clientes` (su alcance). Cada cliente: `{ codigo (slug de Cliente), nombre }`.
- **Transferencias** `/api/transferencias`: `POST` (crear), `GET`, `GET /entrantes`, `GET /salientes`,
  `GET /aceptadas`, `POST /{id}/aceptar`, `POST /{id}/rechazar`, `POST /{id}/cancelar`,
  `GET /mi-equipo/miembros`, `GET /equipo/{equipoId}/miembros`.
  - `POST /{id}/cancelar`: retira un envío PROPIO mientras sigue `PENDIENTE`. Autoriza quien gobierna el
    equipo **ORIGEN** (no destino). Estado resultante `CANCELADA` (distinto de `RECHAZADA`: el destino no
    debe ver un rechazo suyo que en realidad fue el emisor arrepintiéndose). Si la tarea nació oculta solo
    para esa transferencia (ticket sin tarea previa), se descarta entera, igual que `rechazar`.
  - `GET /equipo/{equipoId}/miembros`: elegibles para "asignar a" al aceptar. Ya NO es solo quien tiene
    Asignación EQUIPO sobre ese equipo exacto: incluye también los equipos **hermanos** de su misma
    Regional, quien tenga Asignación **REGIONAL** sobre esa Regional, y **cualquier** Asignación GLOBAL
    (sin filtrar por rol) — así un responsable REGIONAL reparte entre toda su regional, no solo un equipo.
- **Solicitudes** `/api/solicitudes`: `POST`, `GET`, `GET /entrantes`, `GET /mias`,
  `POST /{id}/aprobar`, `POST /{id}/rechazar`, `POST /{id}/cancelar`.
  - El DTO incluye **`ticket`** (N° de ticket del HelpDesk de la tarea, o `null` si es tarea local),
    igual que el de Transferencia. Permite abrir la conversación del ticket desde la Bandeja.
  - `POST /{id}/cancelar`: retira una solicitud PROPIA mientras sigue `PENDIENTE`. Autoriza solo el propio
    `solicitante` (es personal, no algo que gobierne el Responsable del equipo). Estado `CANCELADA`. Misma
    regla de tarea oculta que `rechazar`.
  - `estado` de ambas entidades ahora acepta también `CANCELADA` (migración `V20`, aditiva).
- **Mensajes entre equipos** `/api/mensajes`: `POST`, `GET /entrantes`, `POST /{id}/visto`.
- **Catálogos** `/api/catalogos`: `GET /roles`, `GET /workflow-estados`, `GET /health`.
- **Regionales** `/api/regionales`: CRUD (`GET`, `GET /{id}`, `POST`, `PUT /{id}`, `DELETE /{id}`).
- **Administración** `/api/admin/…`: `clientes` (CRUD), `equipos` (GET/POST/PUT), `asignaciones`
  (CRUD), `usuarios` (GET), `mis-roles/{hid}` (roles de plataforma del actor),
  `sync/tickets` (+ `/import`).
- **Vacaciones** `/api/vacaciones` (sección Vacaciones, calendario por equipo y nacional):
  `GET` (sin filtro = nacional; `?equipo={id}` = un equipo) — **lectura abierta a cualquier actor**;
  `POST`, `PUT /{id}`, `DELETE /{id}` — escritura autorizada: **cada empleado las SUYAS**, el
  Responsable las de su equipo, el ADMIN cualquiera (si no → 403). DTO: `{ id, usuarioHid, empleado,
  equipoId, equipo, regional, fechaInicio, fechaFin, diasLaborables, diasVacacion, horas, tipo
  (VACACIONES|PERMISO|PERMISO_HORAS), estado, nota, registradoPor, creadoEn }`. El backend recalcula
  `diasVacacion` según `tipo`: `VACACIONES` = días de calendario del rango (`fechaFin-fechaInicio+1`);
  `PERMISO` = `round(diasLaborables × 1,36)` (el CARGO al saldo — campo separado del rango de
  fechas); `PERMISO_HORAS` = `0` (no descuenta, usa `horas` aparte, un solo día). El "saldo" NO se
  lleva aquí (va en el formato).
  - **`fechaFin` en `PERMISO` refleja `diasLaborables`** (los días realmente solicitados/ausentes),
    **NO** `diasVacacion` (el cargo ×1,36) — son dos cosas distintas: el rango que se pinta en el
    calendario vs. el monto que se descuenta del saldo. Antes del **2026-09-21** el frontend calculaba
    mal `fechaFin` a partir de `diasVacacion`, inflando el rango pintado (ver `docs/decisiones.md`);
    se corrigió ahí y con un backfill (`V25__fix_permiso_fecha_fin.sql`) para los registros previos.
- **Feriados** `/api/feriados` (días no laborables de la empresa, nacionales, para el calendario de
  Vacaciones): `GET` (lista, **lectura abierta**); `POST`, `DELETE /{id}` — **solo ADMIN** (si no → 403).
  DTO: `{ id, nombre, fechaInicio, fechaFin, registradoPor, creadoEn }`. Puede ser un día o un rango.

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
