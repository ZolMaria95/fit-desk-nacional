# Bitácora de aprendizajes

Hechos descubiertos sobre el código real, el HelpDesk, Firebase y el negocio. **Agregar una entrada cada vez que se aprenda algo** (ver convención en [../CLAUDE.md](../CLAUDE.md)).

> Formato: `### [fecha] hecho` · **Fuente** · **Implicación**.

---

### [2026-07-09] Envío entre equipos implementado (Transferencia + Solicitud) — hechos del código
**Fuente:** implementación + verificación (curl end-to-end sobre Postgres local; `ng build -c quarkus`; CORS preflight). Ver decisión en [decisiones.md](decisiones.md) 2026-07-09.
**Hechos técnicos:**
- **Migración `V5__transferencias_solicitudes.sql`:** `ALTER TABLE transferencia ADD asignado_destino_id` (auditoría del asignado al aceptar) + `CREATE TABLE solicitud` (`tarea, solicitante, tipo[REASIGNACION|TRANSFERENCIA], motivo, estado[PENDIENTE|APROBADA|RECHAZADA], equipo_destino, asignado_sugerido, resuelta_por, transferencia_id`). La tabla `transferencia` ya existía desde V1 (estados PENDIENTE|ACEPTADA|RECHAZADA|COMPLETADA).
- **Entidades Panache nuevas:** `core/Transferencia.java`, `core/Solicitud.java` (patrón: campos public, `@ManyToOne @JsonProperty(WRITE_ONLY)`, se serializan por `describir()` en el recurso, nunca la entidad directa).
- **Autorización reutilizable:** `api/Actor.java` (`esAdmin`/`tieneRol`/`equiposGestionables`/`gobierna`). `equiposGestionables(hid)` = equipos donde el actor es **RESPONSABLE_EQUIPO** (alcance EQUIPO/REGIONAL/GLOBAL), o **todos** si es ADMIN (bootstrap MSC001). Es distinto de `LegacyReadResource.boardsVisibles` (visibilidad, cualquier rol) → se dejó `boardsVisibles` intacto y se añadió `Actor` aparte.
- **CORS ya cubría todo:** `application.properties` ya permite `GET,POST,PUT,PATCH,DELETE,OPTIONS` y headers `Content-Type,Authorization,X-Actor-Hid` → no hubo que tocar CORS (verificado por preflight OPTIONS desde `:4200`).
- **`board.codigo === equipo.codigo`** (en el seed y en `EquipoResource.crearBoardInicial`) → el diálogo "Enviar a otro equipo" filtra el equipo origen del picker comparando `equipo.codigo !== story.board`, **sin** endpoint extra ni exponer el equipo_id en la story.
- **Miembros de un equipo se derivan de Asignaciones** (no hay FK usuario→equipo): `GET /api/transferencias/equipo/{id}/miembros` = usuarios con Asignación vigente alcance EQUIPO = ese equipo. Cuenca tiene 9 miembros; Quito 0 (nació vacío) → el picker de "asignar a" puede quedar vacío para equipos nuevos (el aceptar igual resuelve `asignadoHid` por hid, no restringe a miembros).
- **Frontend:** servicio `core/services/transferencias.service.ts` (HttpClient + `firstValueFrom` + header `X-Actor-Hid` = `session.id`, calcado de `AdminApiService`); sub-diálogos `features/board/transferir/{enviar-equipo,escalar}-dialog.ts` (plantilla inline); vista `features/bandeja/*` (ruta `/bandeja`, `bandejaGuard`, menú si `puedeTransferir` + modo Quarkus); flags nuevos en `auth.service`: `esEspecialista`, `puedeTransferir`.
- **Semántica verificada en DB:** aceptar una transferencia deja la tarea con `asignado_a` cambiado y **`board_id` sin cambio** (sigue en su tablero). Aprobar una Solicitud tipo TRANSFERENCIA **crea** una fila `transferencia` PENDIENTE (origen = equipo de la tarea, destino = sugerido) y enlaza `solicitud.transferencia_id`.
- **Datos de prueba (local):** equipos Cuenca(id 1)/Quito(id 4); RE: MSC001→Cuenca (+admin bootstrap), DEFM001→Quito. Las filas de prueba se **limpiaron** tras verificar (BD queda como estaba).

### [2026-07-08] La producción VIVA es el repo `fitScrum` (legacy js/), NO `FitDesk-Nacional`
**Fuente:** investigación pedida por la dueña ("¿qué está desplegado?"). `gh api repos/ZolMaria95/fitScrum/pages` → `source:{branch:main, path:/}`, `status:built`, `html_url: https://zolmaria95.github.io/fitScrum/`. Ambas URLs responden 200: la raíz (`/fitScrum/`) y el subpath (`/fitScrum/angular/`). Remotos: `FitDesk-Nacional` → `github.com/ZolMaria95/Fit-Desk.git`; producción real → `github.com/ZolMaria95/fitScrum.git` (respaldo local en `~/Documents/respaldofitdaily/fitScrum`, de mayo).
**Hallazgo:** el repo `FitDesk-Nacional` (`Fit-Desk`, commit único 2026-06-30 "baseline duplicado") es un **duplicado baseline** para la migración nacional; **su `app/` Angular NO está desplegado**. Su `angular/` commiteado y su `deploy-pages.yml` tienen base-href `/fitScrum/` (copiados del repo `fitScrum`, con path equivocado para `Fit-Desk`). La **producción que ven los usuarios** se sirve del **root del repo `fitScrum`** = la **app legacy `js/`** (`index.html` + `js/`, sin redirección a `/angular/` en las copias locales). El build Angular existe en `fitScrum/angular/` (subpath) pero no es el default del Pages.
**Implicación:** para arreglar lo que ven los usuarios hoy, las correcciones deben ir al repo **`fitScrum`**, no a `FitDesk-Nacional`. Aplicabilidad de los 2 bugs al legacy vivo:
- **Bug #2 (CERRADO POR FALTA DE RESPUESTA ≠ finalizado): SÍ está en el legacy** → `js/board.js:22-23` (array FINAL) y `js/helpdesk-panel.js:931` (filtro no-finalizados), ambos omiten ese estado.
- **Bug #1 (reasignar en carga): NO está en el legacy.** El único auto-assign del legacy es `board.js _maybeAutoAssign` (Feature 6): asigna al usuario actual **solo si el ticket está SIN asignar** y en el flujo de **cambio de estado por drag**, no en la carga. Es intencional, no el bug. La reasignación-en-carga incondicional (`taskAssignee !== ticketAssignee → assignTicket`) es **exclusiva del Angular** (`board.ts syncTicketStatuses`). Correción 1 = solo Angular.
**Nota:** las correcciones aplicadas el 2026-07-08 quedaron en `FitDesk-Nacional/app/` (Angular, sin commit). Ver [decisiones.md](decisiones.md) sobre a qué repo/versión llevarlas finalmente (decisión de la dueña pendiente).

### [2026-07-07] El API tiene búsqueda por texto libre: `GET /tickets/tickets/search?q=…`
**Fuente:** la dueña indicó el endpoint real: `…/api/v1/tickets/tickets/search?q=credito&limit=10&offset=0&ticket_type_id=001` (busca la palabra en el contenido del ticket).
**Hallazgo:** es hermano de `/tickets/tickets` (mismo listado paginado `{items,total}` con la misma forma de ticket) pero con `q` (texto). Acepta `limit`/`offset` (paginación) y `ticket_type_id` (opcional; 001=Incidencia, 002=Requerimiento, 003=Consulta, ver `TIPO_NOMBRE`). Antes solo existía el lookup EXACTO por número (`GET /tickets/tickets/:id`, vía `searchTicketRemote`), que NO busca por contenido.
**Implicación:** se agregaron al `HelpdeskService`: `searchTickets(q, page, size, sort)` (para la vista Tickets: popula `_tickets`/`_total` igual que `loadFiltered` → paginación server-side sin cambios) y `searchTicketNumbers(q, cap=300)` (para el board: recorre páginas y devuelve un `Set` de números, sin tocar las señales de lista). **Por confirmar (live):** que el endpoint acepte el orden `<campo>_order` como el listado (se envía; si lo ignora, sale en orden por defecto — inofensivo).

### [2026-07-07] El HelpDesk descarta `\n` y bloques en el HTML del mensaje: solo `<br>` sobrevive
**Fuente:** bug real — un mensaje de 2 líneas enviado desde el composer (contenteditable con `white-space: pre-wrap`) llegaba como una sola (`"a\nb"` → `"ab"`). El pegado multilínea SÍ funcionaba porque ya viajaba con `<br>`.
**Hallazgo:** al pulsar Enter el navegador inserta o un `\n` literal en el texto, o un bloque `<div>`/`<p>`. El backend del HelpDesk trata el `\n` de HTML como espacio (se colapsa) y **tira los bloques** → se pierde el salto. Solo `<br>` sobrevive. El `send()` mandaba `el.innerHTML` crudo.
**Implicación:** se agregó `editorToMessageHtml(el)` (función pura en `ticket-utils.ts`, verificada con jsdom) que serializa el editor convirtiendo bloques Y `\n` literales a `<br>` **salvo dentro de `<pre>/<code>`** (código verbatim, conserva sangría). Se usa tanto al ENVIAR como al EDITAR. Regla: nunca mandar `innerHTML` crudo del contenteditable al HelpDesk; pasarlo siempre por `editorToMessageHtml`.

### [2026-07-07] El API del HelpDesk soporta edición nativa de mensajes (ventana de 10 min, server-side)
**Fuente:** contrato verificado contra el API real (edición de mensajes en la conversación del ticket).
**Hallazgo:** cada mensaje del `GET /tickets/:id/messages` trae `id` (ObjectId), `entry_user_id`, `can_edit` (bool), `can_edit_until`, `edited_at`, `edited_by_user_id`. La ventana de 10 min y "solo el autor" **las resuelve el SERVIDOR** en el flag `can_edit` según el token de sesión — **no se recalcula en el cliente** (evita bugs de zona horaria). Edición: `PATCH /tickets/{ticketId}/messages/{messageId}` con `detail` en **form-urlencoded** (con JSON responde 400 "El detalle es obligatorio", igual que el envío). Errores como `{success:false, error:{code, message}}`: 403 "Solo puedes editar tus propios mensajes", o error si la ventana venció.
**Implicación:** se agregó `HelpdeskService.editMessage(ticketId, messageId, detail)` (reusa `FORM_CODEC` + `HD_SAFE`, devuelve `{ok, error}` con el mensaje real del API) y UX en `ticket-messages-dialog` (botón ✎ solo si `can_edit && id`, banner "Editando tu mensaje", reusa el composer; "Enviar" → "Guardar cambios"; oculta adjuntar). El botón ✎ se decide al CARGAR y no se auto-oculta: si se guarda pasados los 10 min el API rechaza y se ve el motivo real. Quarkus (relay) ya reenvía el PATCH sin tocar el form-urlencoded.

### [2026-07-07] Estados de ticket que significan FINALIZADO (fuente única `esEstadoFinalizado`)
**Fuente:** la dueña indicó que **"CERRADO POR FALTA DE RESPUESTA DEL CLIENTE"** también es finalizado (además de `APROBADO` y `CERRADO POR EL CLIENTE`).
**Hallazgo:** el criterio de "finalizado por nombre de estado" estaba **duplicado en 3 lugares** del front (board `statusFromTicketEstado`; Tickets `esFinalizado`; y la lista de `ticket_status_id` no-finalizados que va server-side a Pendientes) y solo matcheaba `APROBADO`/`CERRADO POR EL CLIENTE`. El nuevo estado NO cae en `includes('CERRADO POR EL CLIENTE')`. El backend NO clasifica por nombre (usa el flag `aprobado` que le manda el front).
**Implicación:** se centralizó en `core/helpdesk-estados.ts → esEstadoFinalizado(estado)` (match por inclusión, mayúsculas) y lo usan los 3 sitios. Al agregar un estado finalizado nuevo, tocar **solo** ese helper. Estados finalizados hoy: `APROBADO`, `CERRADO POR EL CLIENTE`, `CERRADO POR FALTA DE RESPUESTA (DEL CLIENTE)`.

### [2026-07-07] El board REASIGNABA tickets reales del HelpDesk al cargar (corregido → carga read-only)
**Fuente:** la dueña notó que "al cargar el board parece que asigna los tickets y los cambia de estado".
**Hallazgo:** en `board.ts syncTicketStatuses()` (que corre en CADA carga del board) había, por cada tarjeta con ticket, un `if (taskAssignee !== ticketAssignee) helpdesk.assignTicket(...)` → **`PUT /tickets/tickets/:id` reasignando el ticket REAL en el HelpDesk** sin acción del usuario. En Quarkus la LECTURA del estado sale de la caché `ticket_espejo` (una consulta, no pega por tarjeta), pero **esa escritura de asignación iba al HelpDesk en vivo igual**. El "cambia de estado" que se veía = (a) las cards moviéndose localmente para reflejar el ticket (dirección lectura, es correcto) y/o (b) el HelpDesk auto-transicionando el estado como efecto de reasignar. Ya estaba anotado como "revisar" (nota de `syncTicketStatuses`, 2026).
**Implicación:** la carga del board es ahora **SOLO LECTURA** contra el HelpDesk (se quitó ese `assignTicket`). La asignación al HelpDesk ocurre solo por **acción explícita** (diálogo de la tarjeta / asignar ticket) y el cambio de estado solo al **arrastrar** una card (`pushHdEstado`, con confirmación). Regla: abrir una vista **nunca** debe escribir en un sistema externo.

### [2026-07-06] Todo header personalizado hacia Quarkus debe ir en el allowlist de CORS
**Fuente:** regresión real — al agregar el header `X-Actor-Hid` (identidad del actor para gatear el rol ADMIN), el navegador **bloqueaba en el preflight** POST/PUT/DELETE de asignaciones ("no me deja poner ni quitar rol"), aunque por `curl` funcionaba.
**Implicación:** `quarkus.http.cors.headers` es una **allowlist explícita** (`Content-Type,Authorization,X-Actor-Hid`): cualquier header custom nuevo que mande el front hay que sumarlo ahí o el preflight lo rechaza. Un DELETE con header custom deja de ser "simple request" y también dispara preflight. Verificar siempre por navegador, no solo por `curl` (curl no hace preflight).

### [2026-06-18] La app actual usa Firebase y se despliega en GitHub Pages
**Fuente:** usuario.
**Implicación:** la migración debe tratar Firebase como solo lectura y GitPages como producción intacta hasta el cutover.

### [2026-06-18] La app actual está limitada a Cuenca (clientes y consultores quemados)
**Fuente:** usuario + capturas.
**Implicación:** la nacionalización mueve ese alcance a datos/config en el backend, gobernado por `Asignacion`.

### [2026-06-18] El ticket del HelpDesk solo trae el mensaje libre del cliente
**Fuente:** usuario (ejemplos "problema en fitswitch", "problema en cuentas de ahorros").
**Implicación:** el enrutamiento a equipo es una decisión humana; **no se modela una entidad de aplicación/producto** (Aplicacion/EquipoAplicacion eliminadas — ver [decisiones.md](decisiones.md)). El cruce entre equipos se resuelve solo con la Transferencia.

### [2026-06-18] Existe rol "HelpDesk" (despachador) por regional que gestiona la transferencia entre equipos
**Fuente:** usuario (HelpDesk de Cuenca pide a HelpDesk de Quito que asigne a su consultor).
**Implicación:** el cross-team es handoff entre despachadores, no asignación directa.

### [2026-06-18] La app ya tiene el filtro "Asignados a mí"
**Fuente:** capturas (board y tickets).
**Implicación:** primitiva clave reutilizable para que un ejecutor de otro equipo trabaje una Tarea que vive en el board de otro.

### [2026-06-18] Código real disponible en `app/`; hallazgos confirmados
**Fuente:** lectura directa del código (`app/`).
**Implicación:** se reemplaza el checklist 🔍 por hechos. Detalle completo en [knowledge/02-arquitectura-actual.md](knowledge/02-arquitectura-actual.md). Resumen:

- **Frontend Angular 22** zoneless + Signals + Material 3. Migración desde legacy JS vanilla **COMPLETA**. PWA con service worker. Hash routing para GitHub Pages (`--base-href /fitScrum/angular/`).
- **Persistencia de datos propios = Firebase Realtime Database** (`fit-daily-ab113-default-rtdb.firebaseio.com`), REST + SSE en tiempo real, fallback localStorage. Backup completo de solo lectura: `GET .../fit-daily.json`. NO es Firestore. NO usa el FastAPI/Mongo.
- **Datos guardados en Firebase:** `stories` (tareas del board), `sprints`, `team`, `progress`, `queries`, `weeklySupport`, y mapas de Helpdesk: `hdNotes` (notas en tickets), `hdActions`, `hdPendientes` (recordatorios con fecha/hora/alarma), `solNotes`.
- **Identidad y tickets = API HelpDesk** `helpdesk-api.fit-bank.com`. **Login ya es contra el HelpDesk** (`/auth/login` + refresh token + `/users/me`) → confirma la decisión de identidad federada. Catálogos del API: `/users/catalog`, `/clients/catalog`, `/ticket-statuses/catalog`. Escrituras del API en `x-www-form-urlencoded` (no JSON).
- **Proxy al HelpDesk:** dev = proxy de `ng serve` (`proxy.conf.json`); prod = **Cloudflare Worker** (`fit-daily-proxy.contreras-sol-4to5.workers.dev`). El API del HelpDesk bloquea CORS de orígenes ajenos → por eso hay proxy server-side.
- **Alcance Cuenca quemado:** constante `CLIENTES_VALIDOS` (14 clientes válidos) + `EMPLEADOS` en `helpdesk.constants.ts` + JSON seed en `public/data/`.
- **Roles informales/hardcodeados** en `AuthService`: `esMSC001` (MSC001 = rol Helpdesk/despachador), `esSupervisor`, `puedeVerMiPanel` (Scrum Master), `puedeBorrarBoard`, `puedeGestionarTodo`.

### [2026-06-18] Fit-Daily NO tiene backend propio para sus datos
**Fuente:** verificación en código (`data.service.ts` hace `fetch()` directo a `firebaseio.com`; `package.json` solo tiene scripts de Angular; no hay express/fastify/worker en el repo).
**Implicación:** los datos propios (tareas/notas/recordatorios/sprints/rotación) van **directo del navegador a Firebase**, sin servidor intermedio. El único backend "Node" es el **HelpDesk externo** (`helpdesk-api.fit-bank.com`, no es nuestro, solo se consulta); en prod hay un **Cloudflare Worker** que solo hace de puente (relay) hacia ese HelpDesk para esquivar CORS. Por tanto, el **Quarkus objetivo será el PRIMER backend propio de Fit-Daily** y reemplaza de una vez a Firebase (datos) y al Cloudflare Worker (puente/caché de tickets).

### [2026-06-18] Existe un backend FastAPI + MongoDB huérfano (no conectado)
**Fuente:** `app/main.py`, `routers/`, `models/`, `database.py`.
**Implicación:** es un andamiaje genérico (entidades `items` con title/description/completed y `users` con email/password/role) con JWT+bcrypt sobre MongoDB (motor). **No está cableado a la app Angular** (el frontend habla directo con Firebase y el HelpDesk; el proxy no apunta a este backend). No implementa el dominio real (board/sprints/tickets). Decisión: tratarlo como referencia desechable; el backend objetivo es Quarkus+PostgreSQL (ver [decisiones.md](decisiones.md)).

### [2026-06-30] Fase 0 — Export real de Firebase hecho (solo lectura, HTTP 200, ~46 KB)
**Fuente:** `GET https://fit-daily-ab113-default-rtdb.firebaseio.com/fit-daily.json` → `docs/exports/firebase-snapshot-20260630-161640.json` (snapshot versionado, nunca se escribe Firebase).
**Implicación:** el árbol real difiere de lo documentado y es la base del ETL (Fase 2). Mapa completo en [knowledge/06-mapa-datos-fase0.md](knowledge/06-mapa-datos-fase0.md). Diferencias clave vs. `02-arquitectura-actual.md`:
- El nodo de equipo se llama **`users`** (no `team`): `users.users[]` (12 miembros con id corto local).
- **`stories` está anidado**: `stories.stories.{TA-001…}` es un **mapa por id** (no array). `sprints` = `{active:"SP-04", sprints:[4]}`. `weeklySupport` = `{weeks:{"YYYY-MM-DD":{assignee,notes,updatedAt}}}` (semanas Vie→Jue). `progress`=`{entries:[]}`, `queries`=`{queries:[]}`.
- **`solNotes` NO existe en el snapshot** (la app lo lee/escribe, pero aún no se materializó en Firebase). El ETL debe tolerar su ausencia.
- **`hdNotes`** (132) = `{ticket: string}`; **`hdActions`** (28) = `{ticket: true}`; **`hdPendientes`** (15) = `{ticket: {addedAt,asunto,clienteRaw,dueDate,dueTime,lastAlerted,ticket}}` — todos **keyed por número de ticket del HelpDesk** (string).
- Nodo **`usuariosPizza`** (array[2]) **no documentado** y ajeno al dominio; el ETL lo **ignora**.

### [2026-06-30] Dos espacios de identidad distintos (riesgo para el ETL)
**Fuente:** `data/users.json` (ids cortos `SC, JH, LO, AB, DL, GR, DG, KV, KM, AC, JQ, VN`) vs. HelpDesk (`/users/me.user_id` tipo `MSC001`, y `EMPLEADOS`=`JPHP001…JFQV001`).
**Implicación:** los datos propios (board, asignaciones de tareas) usan **ids cortos locales**; el HelpDesk usa **ids `XXXNNN`**. `AuthService.lookupTeam` cruza por `user_id` del HelpDesk contra `data/users.json` → **casi nunca casa**. El puente `helpdesk_user_id` del modelo objetivo debe **reconciliar ambos** en Fase 2 (por nombre/alias o tabla de equivalencia). **Pendiente:** confirmar qué id usa `stories.assignee` y cómo mapearlo a `helpdesk_user_id`.

### [2026-06-30] Confirmado: los campos `assignee`/`client` del board están MEZCLADOS entre espacios de id
**Fuente:** análisis del snapshot (`stories.assignee` / `stories.client` distintos).
**Implicación:** el problema de identidad es **intra-campo**, no solo entre tablas. `stories.assignee` contiene a la vez ids del HelpDesk (`MSC001, JPHP001, DSGS001, KIMA001, ORLR001, VINC001, APBM001, JGRV001, KACG001, JFQV001, KDLS001`), ids cortos locales (`SC, JQ`) y estilo username (`KVAZQUEZ`) — la misma persona escrita de varias formas según la época de la tarea. `stories.client` mezcla números del HelpDesk (`5,6,15,42,64…`) con slugs locales (`erco, cacel, giron, litarg, 4rios`). Para el ETL:
- **Clientes:** resoluble casi automático cruzando `CLIENT_MAP` (nombre→slug) con `/clients/catalog` (número→nombre).
- **Personas:** requiere **tabla de equivalencia `id_local ↔ helpdesk_user_id`** confirmada por humano (~12 personas); las iniciales son ambiguas (`JQ`/`JFQV001`, `KVAZQUEZ`/Karla Vazquez). Sin esto, la fusión de `usuario` y la autorización (default deny) quedan mal. **Es el bloqueante #2 a cerrar antes de la Fase 2.** Además, varios `XXX001` del board (`APBM001, JGRV001, KACG001`) **no están** en el seed `EMPLEADOS` → la fuente de verdad de empleados es `/users/catalog`, no el seed.

### [2026-06-30] Mapa de endpoints del HelpDesk (cerrado desde el código)
**Fuente:** `helpdesk.service.ts`, `auth.service.ts`, `proxy.conf.json`. Base = `${helpdeskProxyUrl}/api/v1` (dev: proxy `ng serve` `/api`→`https://helpdesk-api.fit-bank.com`; prod: Cloudflare Worker).
**Implicación:** Quarkus debe replicar exactamente estos endpoints como proxy/sync:
- **Auth (JSON):** `POST /auth/login` `{username_or_email,password,force_logout}`, `POST /auth/refresh` `{refresh_token}` (rota refresh), `POST /auth/logout` (Bearer), `GET /users/me`.
- **Catálogos (GET):** `/users/catalog` (empleados por rol SOPORTE/ADMINISTRADOR/SUPERVISOR), `/clients/catalog`, `/ticket-statuses/catalog`.
- **Tickets:** `GET /tickets/tickets?limit&offset&modified_date_order=desc` con filtros `client_id` (lista por comas), `ticket_status_id`, `assigned_user_id`, orden `<campo>_order=asc|desc`; `GET /tickets/tickets/:id`; `GET /tickets/:id/messages?limit=50`; `POST /tickets/:id/messages` (**multipart** si hay adjuntos `attachments`, si no **x-www-form-urlencoded** `detail`); `PUT /tickets/tickets/:id` (form-urlencoded `assigned_user_id`/`ticket_status_id`); `GET /attachments/:id` (blob, en vivo).
- **Escrituras = `x-www-form-urlencoded`** (no JSON); valores percent-encodeados completos.

### [2026-06-30] Fase 1 — Backend Quarkus arranca y Flyway aplica el esquema nacional
**Fuente:** verificación local. `backend/` con Quarkus **3.37.0** (JVM, Java 21) contra **PostgreSQL 16.14** (docker-compose). `./mvnw -DskipTests package` → BUILD SUCCESS; al arrancar, **Flyway aplicó V1+V2** a la BD `fitdesk` (12 tablas + `flyway_schema_history`), y los endpoints responden: `/api/catalogos/health` → `{roles:6, workflowEstados:4}`, `POST /api/regionales` crea y `GET` lista (rebanada HTTP→Panache→Postgres OK).
**Implicación:** el stack objetivo está probado de punta a punta en local. Detalle técnico: para mapear campos camelCase de las entidades a columnas snake_case del esquema en español se usa `quarkus.hibernate-orm.physical-naming-strategy=...CamelCaseToUnderscoresNamingStrategy`, con `database.generation=none` (Flyway es dueño del esquema). Primer build descarga dependencias de Maven (varios minutos); los siguientes son rápidos. La BD se dejó **sin datos de negocio** (solo catálogos sembrados) lista para el ETL de Fase 2.

### [2026-06-30] El `helpdesk_user_id` no siempre es `XXXNNN`: hay ids estilo username
**Fuente:** dueña del proyecto (corrigió `docs/knowledge/identidades.csv`): Karla Vazquez = `KVAZQUEZ`.
**Implicación:** el espacio de ids del HelpDesk es **heterogéneo** (la mayoría `XXXNNN` como `MSC001`, pero algunos *username* como `KVAZQUEZ`). El ETL y el login federado **no** deben asumir el patrón `XXXNNN` ni regex de validación; `usuario.helpdesk_user_id` (VARCHAR(40)) ya lo admite. Filas 🔴 ya confirmadas por la dueña en [knowledge/07-identidades-equivalencia.md](knowledge/07-identidades-equivalencia.md): `KV→KVAZQUEZ` y `AC→KACG001`. Restan solo las 🟡 medias (las resolverá el ETL por nombre contra `/users/catalog`).

### [2026-07-06] Editar una entidad *managed* antes de validar dispara el CHECK de la BD (500)
**Fuente:** el `PUT /api/admin/asignaciones/{id}` daba 500 (no 400) al enviar un alcance incoherente (EQUIPO sin equipo).
**Implicación:** en un método `@Transactional`, una entidad obtenida por `findById` está **managed**; si se muta (p. ej. `alcanceTipo='EQUIPO'` sin setear la FK) y luego se retorna un error sin persistir, Hibernate **igual hace flush** al commit → el `CHECK chk_alcance_coherente` falla → 500. Además puede dejar un **update parcial** si otras mutaciones ya se aplicaron. **Regla:** en updates, **validar y resolver todo en variables locales ANTES de mutar** la entidad managed (patrón validate-then-mutate). En `crear` no pasa porque la entidad nueva no se persiste hasta `persist()` al final. (El helper `aplicarAlcance` ahora resuelve en locales, valida, y solo entonces muta.)

### [2026-07-06] No había datos con rol DESPACHADOR al eliminarlo (la dueña ya los había reasignado)
**Fuente:** query a `asignacion`/`rol` antes de la migración V4.
**Implicación:** al decidir quitar el rol Despachador, **0 asignaciones lo referenciaban** (Sol ya era ADMIN, Lina Consultor — editados desde el panel). Por eso la migración es limpia (solo `DELETE FROM rol` + recrear el CHECK, sin migrar datos ni tocar FKs). Enseñanza: antes de eliminar un rol/entidad de catálogo, verificar en la BD que no haya referencias; aquí el uso real del panel ya había vaciado ese rol.

### [2026-07-02] Fase 4 — contenedores: dos gotchas del build
**Fuente:** build de las imágenes. Detalle en [knowledge/11-fase4-contenedores.md](knowledge/11-fase4-contenedores.md).
**Implicación:** el stack (db + backend + frontend) se contenedoriza y levanta con `docker compose up --build`. Aprendizajes técnicos:
- **`.dockerignore` del starter Quarkus** solo deja pasar `target/*-runner`/`target/quarkus-app` → un Dockerfile **multistage** (compila desde `src/`) falla con "/src not found". Se reescribió para excluir solo lo transitorio y dejar el código fuente + el fast-jar (sirve a ambos Dockerfiles).
- **`./mvnw` dentro de una imagen Docker** falla: "Failed to validate Maven distribution SHA-256" (el wrapper baja su propia distro). Solución: usar el **`mvn`** que ya trae `maven:3.9-eclipse-temurin-21`.
- **Config del contenedor por env vars:** `QUARKUS_DATASOURCE_JDBC_URL`, `QUARKUS_HTTP_CORS_ORIGINS`, etc. — MicroProfile Config las mapea a las propiedades sin tocar `application.properties` (mismo artefacto en local/VPS/AWS).
- **La BD del contenedor arranca vacía** (volumen nuevo) → la data se lleva con `pg_dump`/restore desde la BD local ya migrada (flujo VPS de la dueña), o corriendo el ETL contra ella.

### [2026-07-02] Fase 3 — sync de TicketEspejo: Quarkus cachea encabezados de tickets en Postgres
**Fuente:** implementación + verificación (import de payload). `TicketEspejoStore` (upsert) + `TicketSyncService` (fetch paginado) + `TicketSyncResource`. Detalle en [knowledge/09-fase3-frontend-quarkus.md](knowledge/09-fase3-frontend-quarkus.md).
**Implicación:** el board podrá leer el estado del ticket de la caché en vez de pegarle al HelpDesk por tarjeta (lo que causa los `GET /tickets/tickets/:id 404`). Hechos:
- **Mapeo del ticket del HelpDesk** (de `mapTicket`): `ticket_id, client_id, cliente, subject, estado, priority, assigned_user_id, entry_date, modified_date` → `ticket_espejo`. Upsert idempotente por `helpdesk_ticket_id`. Cliente por `client_id` (helpdesk_client_id) o nombre; **null si es de otra regional** (se cachea igual el encabezado).
- **Auth del sync:** hoy se pasa el **Bearer del usuario** en el disparo (`POST /api/admin/sync/tickets` con header Authorization; o desde la consola con el token de `localStorage`). El sync en **background con cuenta de servicio/JWT propio** es el slice siguiente.
- **Patrón dos-beans para @Transactional:** el upsert vive en un bean aparte (`TicketEspejoStore`) porque la auto-invocación dentro del mismo bean NO dispara el interceptor `@Transactional`; el servicio de orquestación (HTTP, sin tx) lo llama cross-bean, y así el fetch de red NO queda dentro de una transacción larga.
- **Endpoint de verificación sin auth:** `/import` acepta un lote `{items:[...]}` y ejerce el MISMO mapeo → permite verificar el transform sin token del HelpDesk.

### [2026-07-02] El `assignee` del board debe ser el id del HelpDesk, no el codigo local
**Fuente:** flood de `PUT /tickets/tickets/:id 404` al abrir el board en modo Quarkus + análisis. `board.ts syncTicketStatuses()` (línea ~115) y `auth.service` (`session.id = profile.user_id`).
**Implicación:** `session.id` **es el id del HelpDesk** (`MSC001`), y `syncTicketStatuses` compara/empuja el `assignee` del board contra el `assigned_user_id` del ticket (id del HelpDesk). Si el endpoint legacy emite `assignee` como codigo local (`KM`), (a) **"Asignados a mí"** (board y tickets) no casa nunca, y (b) el board intenta **reasignar cada ticket al id local** → el HelpDesk no lo conoce → **404 en bloque**. Fix: `LegacyReadResource` emite `assignee = usuario.helpdesk_user_id` (fallback codigo local). El nombre/avatar lo resuelve el board vía `hdUsers` (catálogo del HelpDesk), y la escritura ya acepta ambos espacios (`usuarioBy`). El `client` sí queda como slug (el board lo resuelve por catálogo local); solo el `assignee` va al espacio del HelpDesk. **Nota:** `syncTicketStatuses` reasigna tickets reales en el HelpDesk al abrir el board (comportamiento legacy) — con ids correctos ya no hace 404, pero conviene revisarlo cuando se migre la escritura de tickets a Quarkus.

### [2026-07-02] Fase 3 — Quarkus proxea el HelpDesk (relay transparente), reemplaza el Cloudflare Worker
**Fuente:** implementación + verificación contra el HelpDesk real (reachable desde la máquina: 401 sin token). `HelpdeskProxyResource` (`/api/v1/**` → `helpdesk-api.fit-bank.com`). Detalle en [knowledge/09-fase3-frontend-quarkus.md](knowledge/09-fase3-frontend-quarkus.md).
**Implicación:** el frontend ya puede hablar SOLO con Quarkus (board + HelpDesk). Hechos técnicos:
- **Relay con `java.net.http.HttpClient`** y cuerpo como `InputStream` (bytes crudos) → NO hay form-parsing de RESTEasy que rompa el `x-www-form-urlencoded`/multipart de las escrituras del HelpDesk. Verificado: `POST /auth/login` devuelve el MISMO cuerpo directo vs. vía proxy (relay 1:1 de request y response).
- **Headers restringidos del JDK HttpClient:** `host`, `content-length`, `connection`, `upgrade`, `expect` lanzan excepción si se setean → hay que filtrarlos (+ hop-by-hop y `origin`/`referer`/`accept-encoding`). Los `access-control-*` los pone el filtro CORS de Quarkus, no se copian del origen.
- **Interceptor de auth:** añade el Bearer cuando `req.url.startsWith(helpdeskProxyUrl)`; con `helpdeskProxyUrl=http://localhost:8080` sigue añadiéndolo (las del board usan `fetch`, no se interceptan). El proxy reenvía `Authorization`.
- **Aún es relay puro:** no cachea (el `TicketEspejo` sync y el JWT propio son el siguiente slice).
- **GOTCHA que rompía el login:** con `quarkus-smallrye-jwt` en el classpath y la **autenticación proactiva** (default `true`), Quarkus intenta validar CUALQUIER `Authorization: Bearer` como JWT propio y responde `401` (`www-authenticate: Bearer`, cuerpo vacío) ANTES de llegar al proxy. Síntoma: `POST /auth/login` (sin token) relaya OK, pero `GET /users/me` (con el Bearer del HelpDesk) daba 401 de Quarkus, no del HelpDesk → "no pude login". **Fix: `quarkus.http.auth.proactive=false`** (lazy: solo se autentica en endpoints que lo exijan; ninguno aún, así el Bearer pasa al HelpDesk). Verificado: con token falso el proxy ahora relaya el `Token inválido` real del HelpDesk (`server: uvicorn`).

### [2026-07-02] Fase 3 slice 2 — el board ESCRIBE en Postgres (imitando la semántica RTDB), Firebase intacto
**Fuente:** implementación + verificación por curl. `LegacyWriteResource`/`LegacyWriteService` + rewiring de `fbPut/fbPatch/fbDelete` en `data.service.ts`. Detalle en [knowledge/09-fase3-frontend-quarkus.md](knowledge/09-fase3-frontend-quarkus.md).
**Implicación:** en modo Quarkus el board ya persiste (mover tarjeta, asignar, crear/borrar, notas/pendientes/acciones, sprints, rotación, progreso, consultas). Hechos técnicos:
- **JAX-RS no trae `@PATCH`:** se define `com.fitdesk.api.PATCH` con `@HttpMethod("PATCH")`. Además hay que listar `PATCH` en `quarkus.http.cors.methods` (PUT/PATCH/DELETE disparan preflight CORS).
- **PUT = reemplazo de nodo entero:** el DataService hace `persist(nodo, TODO_el_nodo)`, así que el backend debe **reconciliar** (upsert los presentes, **borrar los ausentes**). Quitar una nota = PUT sin esa clave = DELETE de la fila. Aplica a sprints/hdNotes/hdActions/hdPendientes/weeklySupport/progress/queries.
- **Story writes son granulares:** PATCH parcial por id, PATCH de colección con `{id: task}` (crear) y claves deep-path `"TA-005/sprint"` (set de un campo) — se parsean por el `/`.
- **Resolución en escritura:** `assignee` (codigo local) → `usuario`, `client` (slug) → `cliente`, `status` legacy → `workflow_estado`; borrar tarea desliga antes progreso/consulta (FK).
- **Reuso máximo:** los mismos `fbPut/fbPatch/fbDelete` cambian solo la URL (Firebase vs `/api/legacy/*`), así el diff en el front es mínimo y las vistas no cambian.

### [2026-07-02] Vista Tickets — paginación rota por filtrar en el front; se movió todo al API
**Fuente:** bug reportado por la dueña ("9 de 1277", páginas semivacías con páginas infinitas) + fix. Detalle y regla en [knowledge/10-tickets-paginacion-filtros.md](knowledge/10-tickets-paginacion-filtros.md).
**Implicación:** con paginación server-side NO se puede refinar la página en el navegador (rompe conteo y llena a medias). Regla fijada por la dueña: **los filtros van siempre como consulta directa al API, nunca en el front**. Se movió el "no finalizados" de Pendientes a la consulta (lista `ticket_status_id`) y la lista pasó a ser la página del API tal cual (`base()=tickets()`). **Por confirmar (live):** que el API acepte `ticket_status_id` como lista por comas (la doc solo lo confirmó para `client_id`).

### [2026-07-01] Fase 3 slice 1 — el board se sirve desde Quarkus/Postgres (paridad de lectura), con bandera
**Fuente:** implementación + verificación local. `LegacyReadResource` (`/api/legacy/*`) + bandera `dataBackend` en Angular. Detalle en [knowledge/09-fase3-frontend-quarkus.md](knowledge/09-fase3-frontend-quarkus.md).
**Implicación:** el frontend puede leer del backend nuevo sin tocar las vistas ni Firebase. Hechos:
- **Todo el I/O de Firebase está centralizado en `DataService`** (`fbGet/fbPut/fbPatch/fbDelete` + `persist` + las cargas de `init`); las vistas solo consumen signals. Por eso bastó: un branch `initFromQuarkus()` de solo lectura, rutear `fbGet` a `/api/legacy/*`, y guardar las escrituras para que en modo Quarkus NO toquen Firebase.
- **La bandera** es `environment.quarkus.ts` + config `quarkus` en `angular.json` (file-replacement como prod). `ng serve -c quarkus` levanta el board contra Postgres; el default sigue en Firebase (prod intacto). `ng build -c quarkus` compila sin errores.
- **Paridad funcional, no byte:** los endpoints legacy reconstruyen las formas de Firebase pero con identidad reconciliada (`assignee` id local, `client` slug). Verificado story a story (`KIMA001→KM`, `MSC001→SC`, `42→gualaquiza`), resto idéntico.

### [2026-07-01] Bug latente desde Fase 1: en Quarkus 3.37 `quarkus.http.cors` (boolean) ya no existe
**Fuente:** el arranque loguea `WARN Unrecognized configuration key "quarkus.http.cors" ... it will be ignored`; con Origin `:4200` el backend NO devolvía `access-control-allow-origin`.
**Implicación:** CORS estuvo **desactivado silenciosamente** desde la Fase 1 (nunca se ejercitó: las pruebas de Fase 1 eran curl sin `Origin`). La clave correcta en Quarkus 3.37 es **`quarkus.http.cors.enabled=true`** (+ `origins`, `methods`, `headers`). Corregido y verificado: allow-origin a `:4200` en GET y preflight, y rechazo de orígenes no permitidos. Lección: validar CORS con un `Origin` real, no solo `curl` pelado. (Aparte, `quarkus.hibernate-orm.database.generation` también sale como deprecado pero sigue funcionando.)

### [2026-07-01] Confirmado: el board de Cuenca YA contiene clientes de OTRA regional
**Fuente:** dueña del proyecto. Los clientes fuera del seed Cuenca que el ETL marcó `clientesNoResueltos` (`15` VISANDES, `17`, `37`, `65`, `66` COAC MAGISTERIO) **son de otra regional**.
**Implicación:** es la **prueba real de la premisa matricial/nacional**: el equipo de Cuenca trabaja tareas de clientes cuya regional/equipo responsable es otro (caso canónico del modelo — cross-región). En el legacy todo cae en el único board de Cuenca; en el destino esos clientes deben colgar de su propia `Regional`/`Equipo` (`cliente.equipo_responsable_id`) y sus tareas resolverse vía "Asignados a mí". Refina el supuesto de la Fase 2 ("toda la data → Cuenca"): la **data** ya es multi-regional aunque el board sea uno solo. **Sobre `67`:** también es un **cliente REAL** (id del cliente en el API del HelpDesk); solo que sus tareas son de prueba (Sol/MSC001 las tituló "prueba"). Su regional está por confirmar (real pero fuera del seed Cuenca), igual que `17`, `37`, `65`. **Decisión (dueña):** por ahora se **dejan pendientes** — sus tareas quedan con `cliente_id` nulo y salen en el reporte; cuando se defina la(s) regional(es) y su equipo se enganchan con una re-corrida idempotente del ETL. Sin cambios de código; el comportamiento actual ya es el correcto.

### [2026-07-01] Fase 2 — ETL ejecutado y verificado: 420 filas, idempotente
**Fuente:** corrida real del ETL contra el snapshot `firebase-snapshot-20260630-161640.json` sobre Postgres 16 local. Endpoints `POST /api/admin/etl/import-firebase` y `GET /api/admin/etl/status`. Detalle en [knowledge/08-fase2-etl.md](knowledge/08-fase2-etl.md).
**Implicación:** el ETL de Fase 2 funciona de punta a punta y es idempotente (2ª corrida = 0 insertados). Hechos concretos descubiertos al cargar la data real:
- **Conteos cargados:** usuario 12, asignacion 12, cliente 14, sprint 4, **tarea 100**, ticket_espejo 80, ticket_nota 132, ticket_accion 28, ticket_pendiente 15, rotacion_semanal 18, progreso 1, consulta 1 (+ regional/equipo/board de Cuenca).
- **Bloqueante de identidad RESUELTO en la práctica:** con `identidades.csv` (+ fallback embebido) los 12 usuarios cuadran 1:1 y **`usuariosNoResueltos` quedó vacío** — todos los `assignee` del board (mezcla `MSC001`/`KVAZQUEZ`/`SC`/`JQ`) resolvieron a una sola fila `usuario`. Las 10 filas 🟡 "media" del CSV siguen **inferidas** (no ratificadas por humano), pero producen una fusión limpia sin colisiones.
- **`helpdesk_client_id` es derivable del propio snapshot:** los pares `client`(nº)/`clientName` de las stories dan el puente para **11 de 14** clientes (ej. `5→ERCO`, `39→DOLOROSA`, `42→GUALAQUIZA`). `fininvest`, `segura`, `puntoprestamo` **nunca aparecen en el board** → su nº HD se llenará con `/clients/catalog`.
- **Clientes fuera del seed Cuenca (a decidir):** `stories.client` referencia `15`(VISANDES), `17`, `37`, `65`, `66`(COAC MAGISTERIO), `67`(prueba) que **no** están en los 14 de Cuenca → 12 tareas quedan con `cliente_id` NULL (incluye stories sin campo `client`). Reportados, no inventados.
- **Notas > tickets del board:** 132 `hdNotes` vs 80 tickets con tarjeta → **88 notas quedan sin `ticket_espejo`** (son notas sobre tickets que no llegaron al board). Correcto: se guardan keyed por número de ticket.
- **Dato que rompía el esquema:** el `title` real de una tarea (TA-065) mide **359 chars** > `VARCHAR(300)` original → V3 ensanchó `tarea.titulo` a 500 y el ETL trunca defensivamente.
- **`solNotes` ausente y `usuariosPizza` ruido:** confirmado; el ETL tolera el primero e ignora el segundo sin fallar.

### [2026-06-18] Features reales construidas por la compañera (preservar TODAS)
**Fuente:** `knowledge-base.md` del proyecto + código.
**Implicación:** la migración NO debe perder ninguna: Board Kanban con drag&drop y permisos, sprints (cierre + migración de tareas), integración Helpdesk en las cards (estado del ticket ↔ columna), **notas en tickets** (`hdNotes`), **recordatorios con fecha/hora y alarma diaria** (`hdPendientes` → snackbar cada día hasta pausar), **rotación semanal de soporte** (`semanal`, semanas Vie→Jue), **Mi Panel** (dashboard Scrum Master), **Consultas**, **Progreso**, **Burndown**, asignación de tickets, conversación con adjuntos y composer con formato.

### [2026-07-14] Filtro de Estatus en Tickets → multi-check (varios estados a la vez)
**Fuente:** pedido de la dueña + `features/tickets/tickets.ts` / `tickets.html`.
**Implicación:** el filtro de Estatus pasó de selección única a **multi-select con chips** (igual que Cliente). `filterEstatus` es ahora `signal<string[]>`; `buildFilters` mapea los nombres elegidos a `ticket_status_id` y los manda como **lista por comas** (`f.statusIds`), forma que el API/`loadFiltered` ya soportaba desde el ADR 2026-07-01. Sin cambios de backend: fue solo frontend. Se quitó la opción "Todos" (con multi, vacío = todos).

### [2026-07-14] Migración de datos local → Neon (Postgres cloud) + gotchas
**Fuente:** sesión de migración; `pg_dump`/`psql` vía contenedor `fitdesk-db`.
**Implicación / hechos concretos:**
- Base local (Docker `fitdesk-db`, db `fitdesk`) migrada a **Neon**: db `neondb`, rol `neondb_owner`, host `ep-holy-art-atd5yc54.c-9.us-east-1.aws.neon.tech`, `sslmode=require`, región AWS us-east-1. Método: `pg_dump --no-owner --no-privileges` → `psql`. **20 tablas**; conteos verificados **idénticos** a local (tarea=102, cliente=11, usuario=19, asignacion=21, ticket_espejo=81, ticket_nota=132, ticket_pendiente=13, rotacion_semanal=18, board=2, sprint=5).
- **Gotcha `search_path`:** tras `DROP SCHEMA public CASCADE; CREATE SCHEMA public;` + restore, la conexión de Neon quedó **sin `public` en el `search_path`** → `\dt` decía "Did not find any relations" y `select ... from tarea` (sin prefijo) daba "relation does not exist", **pese a que la data SÍ estaba** (`public.tarea` → 102). Fix: `ALTER DATABASE neondb SET search_path TO public;` y/o `currentSchema=public` en la JDBC URL. Ese síntoma nos confundió varias vueltas: parecía base vacía y era solo el esquema por defecto.
- **Gotcha quoting:** la contraseña de Neon trae caracteres especiales que rompían zsh con comillas dobles (`parse error near ')'`). Solución robusta: guardar la connection string en `~/.neon-url` con `pbpaste` (sin que la shell la parsee) y usar `URL=$(cat ~/.neon-url); psql "$URL"` — `"$VAR"` pasa el valor **literal**, sin re-expandir `$`/`)`/`'`.
- **Gotcha zsh comments:** pegar líneas que empiezan con `#` en zsh interactivo (sin `interactive_comments`) da `parse error` porque no las trata como comentario. Al guiar por terminal: dar solo el comando, sin líneas `#`.

### [2026-07-15] Deploy de Quarkus en Render por imagen Docker — hechos y gotchas
**Fuente:** sesión de despliegue a Render.
**Implicación / hechos:**
- **Ruta sin GitHub:** Render permite *"Deploy an existing image"* desde un registro. Se subió a Docker Hub (`zolmaria/fitdesk-backend:latest`) y Render la baja. El repo de Docker Hub debe ser **público** para el plan free (si no, hay que dar credenciales de registro en Render).
- **`$PORT` obligatorio:** Render enruta al puerto de la env var `PORT` (default 10000). Quarkus no lo lee solo → se puso `quarkus.http.port=${PORT:8080}` (local sigue en 8080). En el contenedor de prueba se validó pasando `-e PORT=8082`.
- **Memoria del free tier (512 MB):** se acotó el heap con `-XX:MaxRAMPercentage=65.0` en el CMD del Dockerfile.multistage (el JVM 21 respeta el límite del cgroup).
- **Arquitectura:** el Mac de build es **x86_64** → la imagen sale `linux/amd64` nativa, que es lo que corre Render (no hizo falta emulación). En Apple Silicon habría que `docker build --platform linux/amd64`.
- **Neon desde Render:** las 3 env vars `QUARKUS_DATASOURCE_{JDBC_URL,USERNAME,PASSWORD}` en el panel de Render; la JDBC URL usa el host **-pooler** y `currentSchema=public`. La contraseña de Neon solo vive en Render (cifrada), no en imagen ni repo.
- **La imagen NO trae secretos reales:** el `application.properties` solo baja con el password local de dev (`fitdesk_local`, para el Postgres del docker-compose), que las env vars de Render sobrescriben.

### [2026-07-15] Carga de Firebase actual → Neon: divergencias ETL vs estructura nacional
**Fuente:** sesión de import a Neon (snapshot Firebase 75KB) + limpieza.
**Implicación / hechos y fixes:**
- **El ETL asumía un modelo Cuenca-only** (`ensureRegional("CUENCA")`, `CLIENTE_SEED` con slugs cortos tipo `erco`), pero la estructura **nacional** en Neon usa otros códigos (regional Cuenca = **`CUE`**, clientes con codigo = slug del nombre completo `cooperativa_de_ahorro_y_credito_erco`, creados por el admin). Al no matchear por código, el ETL **duplicaba** entidades y chocaba con uniques.
  - **Cliente:** chocaba `cliente_helpdesk_client_id_key` (hd=5). Fix: `importarClientes` reconcilia por **nombre** si el slug corto no aparece, e indexa también por el codigo real. Guard de `numsUsados` para no reasignar un hd ya tomado.
  - **Regional/Equipo/Board:** el ETL creó regional `CUENCA`(26)+equipo(18)+board(13) DUPLICADOS y colgó ahí las 169 tareas/14 clientes/12 asignaciones; el board original quedó vacío. Fix: `ensureRegional/ensureEquipo/ensureBoard` reconcilian por **nombre** (upper) si el codigo no matchea.
- **Timeout de transacción:** el import corre en UNA `@Transactional`; contra Neon (latencia de red) supera los 60s por defecto → `ARJUNA012108 ... aborting`. Se corre con `QUARKUS_TRANSACTION_MANAGER_DEFAULT_TRANSACTION_TIMEOUT=900` (env, sin recompilar).
- **Notas invisibles:** las 174 `ticket_nota` quedaron con `equipo_id` NULL (el ETL no asigna equipo a las notas) → el filtro por equipo del endpoint las escondía TODAS. Fix puntual: `UPDATE ticket_nota SET equipo_id=1 (Cuenca) WHERE equipo_id IS NULL`. Verificado: `/api/legacy/hdNotes` con un hid de Cuenca devuelve 174.
- **Consolidación (decisión de la dueña):** se consolidó todo sobre la jerarquía nacional **CUE** (equipo 1/board 1) y se borró el duplicado (26/18/13), en una transacción atómica con respaldo previo de asignaciones (`~/backup-asignaciones.tsv`). Resultado: equipos=2, boards=2, regionales=7, board Cuenca=169 tareas.
- **Pendiente:** 16 `ticket_pendiente` con `usuario_id` NULL (recordatorios per-usuario sin dueño) siguen sin mostrarse; requieren atribución por usuario (no resuelto). El jar local tiene el fix de cliente pero NO el de ensure* (editado después del último build) → **rebuild antes del próximo sync**.

### [2026-07-15] BUG de pérdida total de notas (reconcile-write con set vacío)
**Fuente:** incidente en la app desplegada (notas desaparecieron).
**Qué pasó:** `LegacyWriteService.putHdNotes(node, actorHid)` implementa reconcile por equipo: borra las notas del equipo que NO vengan en `node`. El frontend (`setHdNote` → `persist('hdNotes', _hdNotes)`) manda el set **completo** de `_hdNotes` en cada guardado. Si `_hdNotes` estaba **vacío** (cache viejo / notas aún no cargadas por el timing de la señal), el backend caía en `if (keep.isEmpty()) delete("equipo=?1")` y **borró las 174 notas del equipo Cuenca**. Data loss real (recuperable solo porque Firebase sigue intacto).
**Fixes:**
1. **Backend** (`putHdNotes`): un set VACÍO ya **no borra nada** (solo reconcilia si el cliente mandó notas). Elimina el wipe catastrófico.
2. **ETL** (`importarNotas`): ahora asigna `equipo` a cada nota (busca por `(ticket, equipo)`), para que al importar queden visibles y no huérfanas.
3. Recuperación: re-import del snapshot → 173 notas restauradas en equipo Cuenca (1). Imagen `zolmaria/fitdesk-backend:latest` reconstruida+push; requiere redeploy en Render.
**Riesgo residual (pendiente):** el reconcile sigue siendo frágil ante estado **parcial/stale** del cliente (si `_hdNotes` trae 5 de 173 y se guarda, borraría las otras 168). La señal `notes` en `tickets.ts` se inicializa una vez y no se refresca tras la carga → conviene: (a) recargar `notes` tras cargar datos, y (b) que guardar UNA nota no mande el set completo con semántica de borrado.

### [2026-07-15] Notas no se pintaban en Tickets — bug de timing de señal (RESUELTO)
**Fuente:** las notas existían en Neon y el endpoint devolvía 173, pero la vista Tickets mostraba "Agregar nota" en todas.
**Causa:** `tickets.ts` inicializaba `notes = signal(getHdNotes())` UNA vez en el constructor (con `_hdNotes` aún vacío, porque `data.ensureInit()` —disparado por el layout— resuelve después) y nunca la refrescaba.
**Fix:** en el constructor de Tickets, `this.data.ensureInit().then(() => this.syncOverlays())`; y `syncOverlays()` también se llama al final de `refresh()`. Re-lee notas/acciones/pendientes tras la carga. Rebuild `-c cloud` + redeploy a Pages (rama gh-pages). Verificado: las notas se pintan.
**Efecto colateral bueno:** al cargar ahora `_hdNotes` completo antes de cualquier edición, el riesgo residual del reconcile-write (borrar por estado parcial) queda muy mitigado — el cliente ya manda el set completo.

### [2026-07-16] HelpDesk Semanal: assignee debe ser el helpdesk_user_id, no el código legacy
**Fuente:** pedido de la dueña (JQ debe ser JFQV001, y cada asignado un color distinto).
**Causa:** `importarRotacion` guardaba `assignee_local = assignee` crudo del snapshot (código local legacy: JQ, KM, DG...). Pero el front (`semanal.ts`) colorea/nombra por `helpdesk_user_id` (colorMap y memberName usan las keys del catálogo del API). "JQ" no matcheaba ninguna key → color NEUTRAL y nombre sin resolver. Los re-imports de hoy revirtieron la alineación de V9.
**Fixes:**
1. **Datos:** `UPDATE rotacion_semanal SET assignee_local = usuario.helpdesk_user_id` (vía usuario enlazado) — inmediato, sin redeploy (el backend devuelve `assignee_local` tal cual).
2. **ETL** (`importarRotacion`): ahora guarda `helpdesk_user_id` del usuario resuelto (fallback al crudo), setea `equipo`, y busca por `findBySemanaAndEquipo`. Así no se revierte en futuros imports.
**Color:** el `colorMap` de `semanal.ts` ya asigna `PALETTE[i]` por cada miembro (distinto por persona); al resolver el assignee a un id del catálogo, cada consultor toma su color automáticamente. No hizo falta tocar el front.

### [2026-07-16] PWA habilitada (instalable) en GitHub Pages
**Fuente:** pedido del equipo (que la app sea PWA).
**Qué faltaba:** el build `cloud` no incluía `serviceWorker` (lo excluí en el primer deploy) y solo había `favicon.ico` (48px); Chrome exige íconos 192 y 512 para instalar.
**Hecho:**
- `angular.json` → config `cloud` con `serviceWorker: ngsw-config.json`. (El registro ya estaba: `provideServiceWorker('ngsw-worker.js', {enabled:!isDevMode()})` en `app.config.ts`; la app usa hash routing, ideal para Pages.)
- Íconos PWA nítidos generados con un encoder PNG en Node puro (sin sharp/ImageMagick): check blanco sobre #04baf0, centrado (seguro para maskable) → `public/icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180). Script: `scratchpad/gen-icons.js`.
- `manifest.webmanifest` con los 3 íconos (192/512 `purpose: any maskable`), `display: standalone`. `index.html` con `apple-touch-icon` + metas `mobile-web-app-capable`.
- **Gotcha subpath (OK):** Angular generó `ngsw.json` con rutas `/fit-desk-nacional/...` correctas (respetó `--base-href`). SW scope = `/fit-desk-nacional/`. Todos los artefactos sirven 200 en Pages.

### [2026-07-16] Pegado de ChatGPT: preservar formato (tablas, citas, encabezados, párrafos)
**Fuente:** reporte de la dueña (el formato de ChatGPT se perdía al pegar en el compositor del ticket).
**Diagnóstico (empírico, con jsdom):** dos causas en `features/tickets/ticket-utils.ts`:
1. `clipboardToHtml` tenía un heurístico `looksMarkdown` que, si el `text/plain` traía markdown (`**`, `` ` ``) —lo que ChatGPT casi siempre incluye— **descartaba el `text/html` bueno** y caía a la ruta de texto plano (solo inline + `<br>`) → se perdían títulos, listas, tablas, código, citas.
2. `serializePasted` (allow-list) no conservaba `<blockquote>`, `<table>/<thead>/<tbody>/<tr>/<td>/<th>`, degradaba `<h1>-<h6>`→`<b>` y `<p>`→`<br>`.
Además `editorToMessageHtml` (al ENVIAR) aplanaba `<div>` **y** `<p>` a `<br>` → re-perdía párrafos.
**Fixes:**
- `clipboardToHtml`: **siempre** prefiere `text/html` si existe; si no, `markdownToHtml` (parser de bloques: `#`, `-`/`1.`, `>`, ```` ``` ````, párrafos).
- `serializePasted`: allow-list ampliada con `STRUCT_TAGS` (ul/ol/blockquote/table/thead/tbody/tfoot/tr/td/th), `<h1>-<h6>` reales, `<p>` como párrafo. Anti-XSS intacto (script/style/on*/`javascript:`/`url()` fuera; solo se copian `href` http(s) y estilos whitelisted).
- `editorToMessageHtml`: aplana solo `<div>` (Enter del editor), **conserva `<p>`**.
- CSS de `.conv-text` y `.composer-input`: estilos para blockquote/encabezados/`<p>`/`<th>`.
**Verificación:** test jsdom con las funciones reales → ChatGPT (título+listas+código+cita+tabla) ahora **NINGUNA etiqueta perdida** (fuera de strong→b/em→i); XSS sigue limpio (`<img onerror>`, `<script>`, `onclick`, `javascript:` eliminados).

### [2026-07-16] Perfil de usuario + foto personalizable (persistida en Neon)
**Fuente:** pedido de la dueña (avatar clickeable → perfil; y una foto subible que reemplace el código MSC001).
**Backend:** migración **V10** (`usuario.foto TEXT`), campo `foto` en `Usuario`, y `PerfilResource` (`GET /api/legacy/perfil/fotos` → mapa hid→dataUri; `PUT /api/legacy/perfil/foto` con X-Actor-Hid → set/borra la foto del actor, tope 400 KB, valida `data:image/`). Requiere reconstruir imagen Docker + redeploy Render (Flyway aplica V10).
**Frontend:** `PerfilService` (mapa de fotos, `subirFoto`/`quitarFoto`), diálogo `features/perfil/perfil-dialog` (datos + subir foto), avatar del `layout` ahora es **button** clickeable que abre el perfil y pinta la foto (`.user-chip.has-foto` circular) o el código. La imagen se **comprime en el navegador** a 128×128 JPEG (canvas, recorte cuadrado) antes de subir, así pesa pocos KB.
**Nota:** las fotos se cargan una vez al iniciar (`layout` → `perfil.cargarFotos()`) y se muestran por `helpdesk_user_id`, así a futuro se pueden pintar también en tarjetas/asignados.

### [2026-07-16] Tipos de tarea + Reuniones en el board
**Fuente:** pedido de la dueña. Tareas de **Desarrollo/Soporte** (las que traen ticket son de este tipo) vs **Reunión** (subtipos Capacitación/Presentación).
**Backend:** V11 agrega a `tarea`: `tipo` (default DESARROLLO_SOPORTE), `subtipo`, `tema`, `link`, `inicio`, `fin` (texto ISO local). `applyFields` (write) y `stories()` (read) manejan los 6 campos. Requiere rebuild imagen + redeploy Render.
**Frontend:** modal propio `features/board/reunion-dialog` (subtipo, tema, link opcional, inicio/fin `datetime-local`, responsable, cliente opcional). Botón "+ Crear" con menú (Tarea / Reunión). `openDetail` enruta por `tipo` (reunión → su modal). La card de reunión muestra badge morado + subtipo + horario (`fmtReunion`) + link. Persisten por el mismo camino de stories (`addStory` escribe el objeto completo; `updateStoryReunion` edita).
**Decisiones (dueña):** crear con menú (no dos botones); reuniones viven en las columnas del Kanban (tarjeta arrastrable); responsable sí, cliente opcional.

### [2026-07-16] Card del board: nombre de cliente en reuniones + prioridad del ticket
**Fuente:** pedido de la dueña (screenshot). Dos ajustes en la tarjeta del board:
1. **Reuniones mostraban el CÓDIGO del cliente** (p.ej. `coac_capcpe_gualaquiza`) en vez del nombre. Causa: la reunión guarda `client = codigo`, pero la card resuelve el nombre con `clientOf(id)` (`data.getClient` busca por `helpdesk_client_id`, no por código) → no encontraba. Fix: en `reunion-dialog.guardar()` se resuelve el nombre desde `perfil.misClientes()` (`find(c => c.codigo === clientId)`) y se guarda en `clientName`; la card ya pinta `card.clientName || cl?.name`, así aparece de inmediato (igual que las tareas con ticket).
2. **Tareas con ticket mostraban la prioridad interna Alta/Media/Baja** en vez de la del ticket. Fix: en el sync del board (`syncTickets`) se lee `raw.priority` (el orden del HelpDesk) y se guarda en un signal local `ticketPrioMap` (ticketId→orden); la card, si `card.ticket && ticketPrio(...)`, muestra un badge `P{orden}` con color por severidad (`prioClase`: 1→alta, 2→media, ≥3→baja). No toca backend ni el modelo (es efímero, como `hdEstatus` del espejo). Solo-lectura.

### [2026-07-16] Deploy a GitHub Pages: el token de `gh` NO sirve para git-push HTTPS (usar la Git Data API)
**Fuente:** al redesplegar el front, todos los intentos de `git push` a `gh-pages` fallaron con *"Invalid username or token. Password authentication is not supported"* (401 en `git-receive-pack`), en TODAS las formas: header `Authorization: Basic`, token en la URL (curl: *"Malformed input to a URL function"*), `GIT_ASKPASS` con usuario `ZolMaria95` o `x-access-token`, con y sin credential helper.
**Diagnóstico:** el token de `gh auth token` (fine-grained PAT `github_pat_…`, 94 chars) es válido para **`api.github.com`** (Bearer: `GET /user`=200, `POST /git/refs` con SHA válido=**201**, `DELETE`=204, `permissions.push=true`) pero es **rechazado por `github.com` en operaciones git** (`git-receive-pack`=401 con Basic y con Bearer). El repo es **público**, por eso `ls-remote`/fetch "funcionan" sin auth y despistan (no prueban escritura).
**Solución que SÍ funciona → desplegar por la Git Data API** (script `scratchpad/deploy_api.py`, llamadas con **curl** porque el Python de Homebrew no trae CA certs → urllib da `CERTIFICATE_VERIFY_FAILED`):
1. `POST /git/blobs` (base64) por cada archivo de `app/dist/app/browser/` (+ `.nojekyll` y `404.html`=copia de `index.html`); excluir `.git`.
2. `POST /git/trees` con todo el árbol (sin `base_tree` → reemplaza la raíz).
3. `POST /git/commits` con `parents:[<sha gh-pages actual>]`.
4. `PATCH /git/refs/heads/gh-pages` con `{sha, force:true}`.
Build de deploy: `npx ng build -c cloud --base-href /fit-desk-nacional/` → sale en `dist/app/browser/` (application builder). Verificar: `raw.githubusercontent.com/.../gh-pages/index.html` debe referenciar el `main-*.js` recién compilado.
