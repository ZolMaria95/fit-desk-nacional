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
- Tickets: `GET /tickets/tickets` (paginado, filtros, `?..._order=`), `GET /tickets/tickets/search` (`q` + los mismos filtros del listado: `client_id` y `ticket_status_id` en lista por comas, `assigned_user_id`, `ticket_type_id`; verificado 2026-09-28),
  `GET /tickets/tickets/{id}`, `PUT /tickets/tickets/{id}` (`x-www-form-urlencoded`)
- **Guardas del rol HELPDESK sobre el proxy (2026-09-27)** — el relay deja de ser 1:1 SOLO para
  `tickets/tickets/{id}` (el resto sigue intacto):
  - `PUT` con **solo** `ticket_status_id` → pasa (cambiar estado sigue abierto a todos).
  - `PUT` con cualquier otro campo (`assigned_user_id`, `subject`, `subsystem_id`, `ticket_type_id`,
    `priority`, `incidence`…) → exige rol **HELPDESK** en el alcance del cliente del ticket, o
    **ADMIN**; si no, **403** `{"error":{"message":"…"},"message":"…"}`. El actor llega en
    **`X-Actor-Hid`**, que el frontend ahora manda en toda escritura a `/api/v1` (sin header → 403).
    El `client_id` se lee del propio HelpDesk (`GET` con el `Authorization` del usuario).
  - **Asignación (2026-09-28):** un `PUT` con solo `assigned_user_id` (+ a lo sumo `ticket_status_id`)
    también pasa si (a) es **autoasignación** (`assigned_user_id` = `X-Actor-Hid`) sobre un ticket **sin
    asignado** (leído en vivo), o (b) el actor es **RESPONSABLE_EQUIPO** y el destino es él o un miembro
    vigente de los equipos que dirige (con o sin asignado previo). `assigned_user_id=` vacío quita el
    asignado (solo HELPDESK/ADMIN); `null` literal → 404 del HelpDesk.
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
- **Board / legacy (lectura)** `GET /api/legacy/…`: `stories`, `sprints`, `boards`, `users`,
  `equipo-miembros`, `progress`, `queries`, `weeklySupport`, `hdNotes`, `hdActions`, `hdPendientes`,
  `hdPendientes-visibles`, `ticket-espejo`, `solNotes`.
- **Board / legacy (escritura)** `PATCH|PUT|DELETE /api/legacy/…`: `stories/stories[/{id}]`,
  `sprints`, `hdNotes`, `hdActions`, `hdPendientes`, `weeklySupport`, `progress`, `queries`,
  `solNotes`, `ticket-espejo/{id}/assignee` (desde 2026-09-28 también actualiza `tarea.asignado_a` de las tareas del ticket; el front lo llama además cuando una lectura en vivo muestra otro asignado).
- **Reportes** (2026-09-28; acceso = `Actor.equiposGestionables`: ADMIN o RESPONSABLE_EQUIPO en su
  alcance EQUIPO/REGIONAL/GLOBAL; el resto **403**; header `X-Actor-Hid`):
  - `GET /api/reportes/equipos` → `[{codigo, nombre}]` equipos sobre los que puede generar reportes.
  - `PUT /api/reportes/tareas/{codigo}/prioridad` (2026-09-30) — body `{"prioridad":"alta|media|baja"}` +
    `X-Actor-Hid`; solo ADMIN o rol HELPDESK vigente (403), 400 valor inválido, 404 tarea inexistente →
    `{codigo, prioridad}`. Cambia la prioridad de la TAREA (no el Orden del ticket).
  - `GET /api/reportes/estado-equipo?equipo=<codigo>[&consultores=HID,HID]` → 404 si el equipo no
    existe. Sin `consultores` = miembros del equipo (asignación EQUIPO vigente) + tareas sin asignar del
    equipo. Tareas activas (TODO / IN_PROGRESS / EN_CERTIFICACION, sin REUNION ni pendientes de
    transferencia) de esa gente en **cualquier** tablero:
    ```json
    { "equipo": {"codigo","nombre"}, "generadoEn": "ISO",
      "consultores": [{"hid","nombre"}], "sinTarea": [{"hid","nombre"}],
      "filas": [{ "consultorHid","consultorNombre","tarea","titulo","ticket","cliente","clientId",
                  "estado","prioridad","ordenTicket","inicio","inicioAprox","dias","fechaLimite",
                  "esperandoCliente","fechaEsperando","tablero" }],
      "seguimiento": [{ ...fila, "peso": 1-5, "motivo": "Vencida (3 d)" }],
      "umbrales": {"diasEsperandoCliente": 3, "diasEnProceso": 5} }
    ```
    `inicio` = `tarea.en_proceso_desde` (V28); si falta y la tarea está en IN_PROGRESS, `creado_en` con
    `inicioAprox: true`. `dias` = días corridos hasta hoy (hora de Ecuador). `ordenTicket` sale del
    espejo (respaldo): el front lo refresca en vivo del HelpDesk. `tablero` = nombre del equipo dueño si
    no es el del reporte. Seguimiento (un motivo por tarea, el de más peso): 1 vencida · 2 vence hoy ·
    3 recordatorio (`ticket_pendiente` no pausado con `due_date ≤ hoy`) · 4 esperando cliente ≥ 3 d ·
    5 en In Progress ≥ 5 d; orden: peso → Orden del ticket → prioridad → días.
- **`turnoSenior`** (implementado 2026-09-28, tabla `turno_senior` de la **V27**; por equipo, roles
  guardados como `helpdesk_user_id`; una semana sin ningún rol se borra; `hoy` usa la hora de Ecuador y
  en sábado/domingo siempre responde `deTurno:false`):
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
  - **Crear tarea con `ticket` (2026-10-01):** si el ticket ya tiene tarea, `POST /stories/stories` responde
    **200** `{id: <existente>, existente: true}` (no crea otra); el upsert del PATCH no crea y una transferencia
    por `ticket` usa la tarea existente.
  - `POST /stories/desde-ticket-asignado`: crea la tarea automáticamente al asignar un ticket que aún no
    la tenía (lo llama el frontend tras confirmar la asignación al HelpDesk). Body `{ ticket,
    clienteCodigo, clienteNombre, titulo, asignadoHid, asignadoNombre }` + `X-Actor-Hid`. Idempotente
    (si ya hay tarea, no-op). Tablero: `Cliente.equipoResponsable` del cliente del ticket; si no resuelve,
    el equipo del actor (miembro, o responsable); si ninguno resuelve, no crea nada.
  - **`POST /stories/stories` y el upsert de `PATCH /stories/stories` (creación manual, "Crear tarea"):**
    desde 2026-09-24 aplican el MISMO criterio — si el body trae `ticket` (no vacío) y `client` resuelve
    un `Cliente` con `equipoResponsable` registrado, ESE equipo manda sobre el `board` que mande el
    frontend (que hasta entonces solo reflejaba el tablero que el actor tenía abierto en pantalla —
    causa real de tareas de un cliente de un equipo apareciendo en el tablero de otro, p. ej. "PRUEBA").
    Si no hay `ticket` o el cliente no resuelve equipo, se respeta el `board` enviado (sin cambios, para
    no romper tareas locales/reuniones sin cliente registrado). **Un PATCH sobre una tarea YA EXISTENTE
    nunca reasigna el tablero** por esta regla, aunque el body incluya `ticket`/`client` — solo aplica en
    el momento de crear. Ver `docs/decisiones.md` (2026-09-24) y `LegacyWriteService.applyFields()`.
- **Perfil** `/api/legacy/perfil`: `GET /me`, `GET /fotos`, `GET /equipos-clientes`, `GET /tickets-gestionables`, `PUT /foto`, `GET/PUT /orden-estados` (orden personal de estados en Tickets: body `{estados:[{estado: ticket_status_id, orden: int≥1|null, oculto: bool}]}`; GET devuelve además `puedeEditar`; PUT solo ADMIN/RESPONSABLE_EQUIPO → 403; lista vacía = sin configuración).
  - `GET /tickets-gestionables` (+ `X-Actor-Hid`) → `{ global: bool, clientes: [..], asignables: [hid] }` (`asignables` = a quién asigna o reasigna como responsable de equipo: él + su gente; 2026-09-28): sobre qué tickets
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
- **Transferencias** `/api/transferencias`: `POST` (crear), `GET`, `GET /entrantes`, `GET /salientes`,
  - **Aceptar transferencia / aprobar reasignación (2026-09-29):** si la tarea tiene ticket, el backend lo
    asigna en el HelpDesk antes de completar; requiere `Authorization: Bearer <token del HelpDesk>` además de
    `X-Actor-Hid` (sin él → 409). Error del HelpDesk → mismo status (4xx) o 502 con `{error, message}` y la
    operación no se aplica.
  `GET /aceptadas`, `POST /{id}/aceptar`, `POST /{id}/rechazar`, `POST /{id}/cancelar`,
  `GET /mi-equipo/miembros`, `GET /equipo/{equipoId}/miembros`.
  - `POST /{id}/cancelar`: retira un envío PROPIO PENDIENTE (autoriza quien gobierna el equipo ORIGEN).
    Estado `CANCELADA`, distinto de `RECHAZADA`. Misma regla de tarea oculta que `rechazar`.
  - `GET /equipo/{equipoId}/miembros`: elegibles para "asignar a" al aceptar. Incluye Asignación EQUIPO
    sobre ese equipo o sus **hermanos** de la misma Regional, Asignación **REGIONAL** sobre esa Regional,
    y cualquier Asignación **GLOBAL** (sin filtrar por rol) — un responsable REGIONAL ya no depende de
    tener además una Asignación EQUIPO redundante para verse a sí mismo ni a su gente.
- **Solicitudes** `/api/solicitudes`: `POST`, `GET`, `GET /entrantes`, `GET /mias`,
  `POST /{id}/aprobar`, `POST /{id}/rechazar`, `POST /{id}/cancelar`.
  - El DTO incluye **`ticket`** (N° de ticket del HelpDesk de la tarea, o `null` si es tarea local),
    igual que el de Transferencia. Permite abrir la conversación del ticket desde la Bandeja.
  - `POST /{id}/cancelar`: retira una solicitud PROPIA PENDIENTE (autoriza solo el `solicitante`). Estado
    `CANCELADA`. `estado` de ambas entidades acepta ahora `CANCELADA` (migración `V20`, aditiva).
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
