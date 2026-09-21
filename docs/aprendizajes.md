# Bitácora de aprendizajes

Hechos descubiertos sobre el código real, el HelpDesk, Firebase y el negocio. **Agregar una entrada cada vez que se aprenda algo** (ver convención en [../CLAUDE.md](../CLAUDE.md)).

> Formato: `### [fecha] hecho` · **Fuente** · **Implicación**.

---

### [2026-09-17] La carrera de `persist()` fire-and-forget (ver aprendizaje de abajo) puede BORRAR
### datos reales, no solo mostrar uno viejo — y cómo se recuperaron con `pageinspect`/`pg_surgery`
**Fuente:** los recordatorios de Diana Fiallo (31 tickets en `ticket_pendiente`) desaparecieron de
producción. La causa más probable es la MISMA carrera documentada abajo (2026-09-15), pero con una
consecuencia más grave de la anticipada: `putHdPendientes()` no solo "muestra desactualizado" — hace
un `DELETE ... WHERE usuario = actor AND ticket NOT IN (keep)` cada vez que el actor guarda su lista.
Si una versión vieja/vacía del `_hdPendientes` local gana la carrera y se guarda DESPUÉS de la
versión real, el backend la toma como la nueva verdad y BORRA todo lo que no traía. Ver detalle
completo del incidente y la recuperación en `docs/decisiones.md` ([2026-09-17]).
**Implicación:** (1) el aprendizaje de abajo subestimaba el riesgo — no es solo un problema de UX
("no se ve hasta recargar"), es un vector de pérdida de datos real en CUALQUIER overlay con el mismo
patrón "reconciliar y borrar lo ausente" (`hdActions`, `hdNotes`, `hdPendientes`, y cualquiera que
use `TicketX.delete(... not in ...)` sobre el actor). Antes de tocar ese código conviene revisar los
otros `putHdX` por el mismo patrón. (2) **Técnica de recuperación reusable**: un `DELETE` en Postgres
no destruye la fila al instante — la tupla sigue en la página del heap hasta que el autovacuum la
recicla. Si se actúa ANTES de eso (`pg_stat_user_tables.last_autovacuum` / `n_dead_tup` dicen si
sigue ahí), se puede instalar `pageinspect` (inspecciona páginas crudas) para localizar con
`heap_page_items()` las tuplas con `lp_flags=1` (dato intacto) vs `lp_flags=3` (ya podado, dato
perdido), e instalar `pg_surgery` para revivirlas con `heap_force_freeze(tabla, ARRAY[ctids])` — sin
necesidad de decodificar los bytes a mano. Después hace falta `REINDEX TABLE` (la cirugía no toca los
índices) y `VACUUM ANALYZE`. Cuanto más tiempo pase (o más lecturas normales ocurran, que pueden
disparar poda oportunista/HOT), más chance de que el dato ya no esté — hay que actuar rápido y
primero DESACTIVAR `autovacuum_enabled` en la tabla afectada antes de investigar.

### [2026-09-15] `persist()` de los overlays legacy (`hdActions`/`hdNotes`/`hdPendientes`) es
### fire-and-forget — un `refresh()` inmediato después puede leer el dato viejo
**Fuente:** al agregar "Crear recordatorio" en Pendientes, el flujo `data.setHdPendiente(...)` +
`this.refresh()` (que hace un GET a `/hdPendientes-visibles`) no mostraba el recordatorio recién
creado hasta recargar la página — aunque el `PUT` sí había llegado bien al backend (confirmado por
curl un momento después). `DataService.persist()`/`fbPut()` no devuelven una promesa que se pueda
esperar: lanzan el `fetch` y siguen. Un `refresh()` disparado justo después corre en paralelo, no
después, y puede ganarle la carrera al propio guardado.
**Implicación:** cualquier acción nueva sobre `hdActions`/`hdNotes`/`hdPendientes`/`hdActions`-like
que necesite reflejarse en la MISMA pantalla al instante no puede confiar en "escribir y refrescar"
— hay que actualizar la señal local de forma optimista (como ya hace `crear()` en `pendientes.ts`)
o esperar explícitamente. Esto es preexistente en todo el patrón de overlays (no es un bug nuevo),
así que conviene revisarlo si aparece el mismo síntoma ("no se ve hasta recargar") en otra pantalla
que use `setHdAction`/`setHdNote`/`setHdPendiente` seguido de un refresh inmediato.

### [2026-09-15] `data.stories()` es GLOBAL (todos los boards), no del board actual
**Fuente:** al investigar por qué el hipervínculo de una tarea sin ticket en la campanita a veces no
abría el modal, se confirmó que `GET /api/legacy/stories` (`LegacyReadResource.stories()`) devuelve
**todas** las `Tarea` del sistema sin filtrar por board ni usuario (`Tarea.list("pendienteTransferencia = false order by codigo")`).
**Implicación:** buscar una tarea por código en `data.stories()` no depende de en qué board/pantalla
esté parado el usuario — el problema real de "no encuentra la tarea" casi siempre es de **timing**
(la lista aún no cargó, `ensureInit()` no resolvió) y no de alcance. La corrección correcta es
`await data.ensureInit()` antes de buscar (memoizado: gratis si ya cargó), no ampliar ningún filtro.

### [2026-09-15] Este workspace NO es el repo que despliega — el servidor clona de GitLab
**Fuente:** al preparar el deploy del 7º lote, `git remote -v` en este workspace mostró GitHub
(`fit-desk-nacional`), pero SSH al servidor AWS mostró que `~/fitdesk/fit-desk` y
`~/fitdesk/fit-desk-api` son clones de `gitlab.fit-bank.com/servicios/{fit-desk,fit-desk-api}` —
historiales de commits completamente distintos y no relacionados.
**Implicación:** para desplegar, el código de este workspace (`app/`, `backend/`) hay que llevarlo a
mano a un clon de esos repos de GitLab (copiar los archivos tocados, nunca un `rsync --delete` ciego
de la carpeta completa — ver el aprendizaje de abajo sobre contaminación), commitear ahí y pushear.
El historial de commits de este workspace (GitHub) es solo de trabajo/planeación, no representa lo
que corre en producción. El token de GitLab queda visible en texto plano en
`~/fitdesk/fit-desk-api/.git/config` y `~/fitdesk/fit-desk/.git/config` del servidor (por SSH,
`git remote -v` ahí). No commitear ese token en ningún repo.

### [2026-09-15] `app/` local tiene contaminación: resto de un backend FastAPI huérfano
**Fuente:** al copiar `app/` sobre un clon limpio del repo real `fit-desk` (GitLab) para preparar el
deploy, aparecieron archivos Python sueltos en la raíz (`main.py`, `database.py`, `config.py`,
`models/`, `routers/`, `schemas/`, `utils/`, `__pycache__/`) que NO existen en el repo real — y
faltaban `.gitignore` y `src/environments/environment.onprem.ts`, además de que `Dockerfile`/
`angular.json`/`nginx.conf` locales estaban desactualizados respecto al repo real.
**Implicación:** el `app/` de este workspace acumuló sobras del "backend FastAPI/Mongo huérfano" que
menciona el `CLAUDE.md` raíz del proyecto. **Nunca hacer `rsync --delete`/copiar `app/` completo
sobre el repo real** — se perdería `.gitignore` y archivos de entorno, y se ensuciaría el repo con
código Python que no pertenece ahí. Para desplegar, copiar únicamente los archivos `.ts`/`.html`/
`.scss` específicos que se sabe que se tocaron (cruzarlos contra `docs/decisiones.md` del día).

### [2026-09-15] `MatMenu` cierra el panel con CUALQUIER click interno, no solo en `mat-menu-item`
**Fuente:** al agregar pestañas (Todas/Tareas/Tickets) dentro del `mat-menu` de la campanita, cada
clic en una pestaña cerraba el panel entero — se asumía (siguiendo el precedente de `.notif-item`,
que sigue funcionando bien sin cerrar el menú) que un `<button type="button">` plano, sin la
directiva `mat-menu-item`, no dispara el auto-cierre. Verificado en Chrome real con Playwright: SÍ
lo dispara igual.
**Implicación:** cualquier control dentro de un `mat-menu` que deba cambiar estado local SIN cerrar
el panel (pestañas, toggles, "marcar todas leídas") necesita `(click)="$event.stopPropagation(); ..."`
explícito — no alcanza con evitar la directiva `mat-menu-item`. Los controles que SÍ deben cerrar el
panel (como `.notif-item-link`, que navega/abre un modal) no necesitan el `stopPropagation`.

### [2026-09-15] `:host-context()` + `::ng-deep` NO alcanza contenido portado a un overlay del CDK
**Fuente:** el CSS del panel de la campanita (`.notif-panel` dentro de un `mat-menu`) no se pudo
estilar para tema oscuro con `:host-context(html[data-theme='dark']) { ::ng-deep .notif-panel {...} }`
— compilaba pero nunca aplicaba, aunque el `data-theme="dark"` sí estaba puesto en `<html>`.
**Implicación:** Angular compila `:host-context(X) ::ng-deep .foo` exigiendo que `.foo` sea
**descendiente en el DOM** del elemento host del componente (`[_nghost-xxx]`) — pero `mat-menu`,
`mat-dialog` y cualquier overlay del CDK se **portan a `<body>`**, fuera del árbol del componente que
los abre, así que esa condición de ancestría nunca se cumple aunque `.foo` exista y sea visible en
pantalla. Un `::ng-deep .foo {}` SIN `:host-context` sí funciona (queda global, sin exigir ancestro),
por eso el estilo base (claro) funcionaba y solo fallaba la variante oscura anidada. **Fix:** escribir
el ancestro a mano dentro del propio `::ng-deep`: `::ng-deep html[data-theme='dark'] .foo { ... }`
(ver `layout.scss`). Aplica a cualquier estilo condicionado por tema/estado que deba llegar a un
`mat-menu`/`mat-dialog`/`mat-select` panel-class.

### [2026-09-10] `environment.quarkusApiUrl` vacío ('') es VÁLIDO en onprem/AWS — nunca `!!chequear`
**Fuente:** bug real en producción (ticket 10206 sin tarea), causado por `HelpdeskService` repitiendo
un patrón ya identificado y corregido antes en `PerfilService.usaQuarkus()`.
**Implicación:** en onprem/AWS, `environment.onprem.ts` fija `quarkusApiUrl: ''` A PROPÓSITO (mismo
origen, URLs relativas, sin CORS). Cualquier código que escriba `if (!environment.quarkusApiUrl)
return;` o similar está roto en ese entorno — un string vacío es *falsy* en JS, así que ese chequeo
confunde "mismo origen" con "sin backend". El chequeo correcto es solo
`environment.dataBackend === 'quarkus'`. Antes de escribir código nuevo que dependa de
`quarkusApiUrl`, grep `!environment.quarkusApiUrl` en el archivo — es un patrón fácil de copiar sin
darse cuenta del entorno donde realmente corre en producción.

### [2026-09-10] `layout.ts` cierra TODOS los diálogos cuando `auth.session()` se pierde
**Fuente:** `layout.ts:117-123` (`effect` que reacciona a `!auth.session()`), descubierto al depurar
por qué un `ConfirmDialog` se cerraba solo en pruebas locales sin backend HelpDesk real.
**Implicación:** cualquier diálogo abierto (incluidos los de confirmación) se cierra sin previo aviso
si la sesión desaparece entre medio — normal en producción (token vencido de verdad), pero en un
entorno de prueba SIN sesión real del HelpDesk la sesión puede ser inestable y cerrar diálogos que
parecen "fallar" sin ser un bug del componente. Al depurar un diálogo que se cierra solo, revisar
primero si `auth.session()` sigue viva antes de sospechar del propio componente.

### [2026-09-10] `Solicitud.transferencia`/`Transferencia.despachadorDestino` no sirven para "quién canceló"
**Fuente:** diseño de `TransferenciaResource.cancelar`/`SolicitudResource.cancelar`.
**Implicación:** ninguna de las dos entidades tenía un campo "quién resolvió desde origen" (solo
`despachadorDestino`, del lado receptor). Al cancelar no se intentó forzar ese campo: el estado
`CANCELADA` + `resueltoEn` ya bastan para diferenciar. Si en el futuro se necesita auditar
específicamente quién canceló, haría falta un campo nuevo (`Transferencia` no lo tiene hoy).

### [2026-09-10] El client_id del ticket no es el "código" interno de Cliente en FitDesk
**Fuente:** `LegacyWriteService.clienteBy()` (patrón ya existente) y `TicketEspejo.cliente`, al
diseñar la resolución de tablero de `desde-ticket-asignado`.
**Implicación:** el frontend solo conoce el `client_id` numérico del HelpDesk (`Ticket.clientId`), no
el `codigo` (slug) que usa `Cliente.findByCodigo`. Cualquier endpoint nuevo que reciba un "cliente"
desde el frontend a partir de un `Ticket` debe probar por `codigo` **y**, como respaldo, por
`helpdesk_client_id` — igual que ya hace `clienteBy()`. Ignorar esto deja el mapeo cliente→equipo
mudo para todo ticket cuyo cliente aún no tenga su código de FitDesk memorizado en el frontend.

### [2026-09-10] `Actor.equiposComoResponsable` con alcance GLOBAL devuelve TODOS los equipos
**Fuente:** `Actor.java:173-197`, al diseñar el fallback "equipo del actor" de la creación automática
de tarea.
**Implicación:** para un RESPONSABLE_EQUIPO de alcance GLOBAL (o análogo), "el primero por id" de ese
conjunto es prácticamente arbitrario — no es realmente "su equipo". Se usa solo como último recurso,
después de `equiposComoMiembro` (el caso normal y más significativo). Cualquier lógica que necesite
"el equipo natural de una persona" debe preferir `equiposComoMiembro` primero.

### [2026-09-09] El API propio y el proxy del HelpDesk comparten origen → la URL base no los distingue
**Fuente:** diagnóstico del cierre de sesión al transferir (reporte de la dueña) + `helpdesk-auth.interceptor.ts`,
`environment.cloud.ts` y el andamiaje on-prem (`quarkusApiUrl: ''`).
**Implicación:** `req.url.startsWith(environment.helpdeskProxyUrl)` es cierto **para todas** las peticiones en
producción (y con base vacía, literalmente para cualquier URL). Para saber si algo va al HelpDesk hay que mirar
la **ruta** `/api/v1/`, no la base. Cualquier lógica futura que dependa de "¿es del HelpDesk?" debe usar la ruta.

### [2026-09-09] La transferencia se autoriza contra el equipo del BOARD, no contra el del actor
**Fuente:** `TransferenciaResource.crear` (`origen = tarea.board.equipo`) + `Actor.equiposGestionables`.
**Implicación:** un Responsable puede ver una tarea (por alcance de lectura) y **no** poder transferirla. El
selector de destino, además, **excluye el equipo origen**, así que cuando el origen es un equipo ajeno el usuario
percibe que "falta un equipo en la lista". Cualquier acción sobre tareas de otros boards necesita el mismo
chequeo por board, no el permiso global de rol.

### [2026-09-09] MSC001 está cableado como ADMIN en el frontend Y en el backend
**Fuente:** `auth.service.ts:54,70` (`esMSC001`, bootstrap) y `Actor.esAdmin` (`"MSC001".equalsIgnoreCase(hid)`).
**Implicación:** **no se puede probar ninguna denegación de permisos con MSC001**: gobierna todos los equipos por
definición, en las dos capas. Para ejercitar un 403 hay que usar otro actor (p. ej. mandando `X-Actor-Hid` de otro
responsable) o un usuario real distinto.

### [2026-09-09] `Tarea.ticketEspejo` es `@ManyToOne` sin `fetch = LAZY` → EAGER
**Fuente:** `core/Tarea.java:33-36`, al valorar el coste de añadir `ticket` al DTO de Solicitud.
**Implicación:** exponer el N° de ticket en cualquier DTO que ya materialice la `Tarea` **no cuesta consultas
extra** ni necesita fetch join. Vale para Solicitud, Transferencia y Mensaje.

### [2026-09-09] Medir contraste: `color-mix` se computa como `color(srgb ...)`, con valores 0–1
**Fuente:** medición del chip del N° de ticket con Playwright.
**Implicación:** un parser que asuma `rgb(0-255)` da números **falsos** (medí 2,79 donde eran 3,16). Lo fiable es
resolver el color pintándolo en un `<canvas>` 1×1 sobre el fondo real y leer el píxel: así se manejan a la vez la
notación nueva y el alfa. Con eso: el azul `--brand-dark` sobre el tinte del chip da **3,16** (insuficiente) y el
`#01566f` que se dejó, **7,06**.

### [2026-07-18] Arquitectura de búsqueda/filtros de Tickets y Board (para futuros cambios)
**Fuente:** implementación del lote UX (tickets.ts, board.ts, shell.service.ts).
- Cada vista **publica su panel de filtros** al drawer del shell vía `ShellService.setFilters(templateRef)` (`afterNextRender`), y lo limpia en `ngOnDestroy`. El drawer del `Layout` los renderiza.
- **Tickets** filtra **todo server-side** (ADR 2026-07-01): `buildFilters()` arma `TicketFilters {clientIds, statusIds, assignedUserId}` según la tab + filtros; `base()` = la página del API tal cual. La búsqueda por N° (`filterTicket`) es lookup exacto server-side (`hd.searchTicketRemote`); por palabra (`filterTexto`) es `hd.searchTickets`. Los clientes se filtran por **client_id mapeado desde el NOMBRE** contra el catálogo (`clients()`), no por código.
- **Board** filtra en memoria dentro de `columns()` (sprint activo): la búsqueda por N° es coincidencia local parcial; por palabra usa `matchedTickets` (Set de N° del API). Es **section-scoped** (solo su tablero).
- **Regla #8 (no códigos):** `resolveMember` (board-utils) ahora devuelve `name:'—'` cuando el id no resuelve (antes devolvía el código); revisar cualquier `|| id`/`|| usuarioAsignado` nuevo. Ver [[no-codigos-empleado-ui]].

### [2026-07-18] `/api/legacy/perfil/*` y alcance por Asignaciones (Actor)
**Fuente:** `PerfilResource.java`, `Actor.java`.
- `GET /perfil/me` (X-Actor-Hid) → `{roles, equipos:[{codigo,nombre}], clientes:[{codigo,nombre}]}`. `equipos` = `equiposComoMiembro`; si vacío, `equiposComoResponsable`. `clientes` = `Cliente where equipoResponsable.id in (ids)` (nombre = **nombre del API**, sirve para mapear a client_id del HelpDesk).
- Nuevo `GET /perfil/equipos-clientes` → equipos revisables = **miembro ∪ responsable** con sus clientes; `multiEquipo` si hay >1. Lo usa la pestaña "Equipo".
- `Actor.equiposComoResponsable(hid)` expande el alcance: **EQUIPO** = ese equipo; **REGIONAL** = todos los equipos de la regional; **GLOBAL** = todos. Es la base del "selector de equipo" del responsable regional.
- **Limitación:** el frontend NO conoce el alcance (EQUIPO/REGIONAL/GLOBAL) directamente; se infiere de si `equipos-clientes` trae >1 equipo (`multiEquipo`). `mis-roles` solo devuelve códigos de rol.

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

### [2026-07-18] La tarea YA tiene código legible `TA-NNN` (`Tarea.codigo`), no un id aleatorio
**Fuente:** al implementar el deep-link "en board", el `story.id` resultó ser `TA-183`.
**Hecho:** `Tarea.codigo` (String, `@Column(unique=true)`) es el código de negocio; `LegacyReadResource.stories()` lo emite como `id` de la story (`s.put("id", t.codigo)`). Lo **genera el frontend** como correlativo **global** (no por tablero) al crear la tarea (`upsertTarea(codigo)` en `LegacyWriteService`). Por eso un "TA-01 por tablero" chocaría con la unicidad global. Para mostrar "el código" basta pintar `card.id` en tareas sin ticket.

### [2026-07-18] `position: sticky` no funciona dentro de `mat-sidenav-content`
**Causa:** Angular Material aplica `transform` a `.mat-drawer-content` (animaciones del drawer), y un ancestro con `transform` rompe `position: sticky` de los hijos. La barra superior "se escondía" al scrollear.
**Fix:** que el scroll viva en `.content` (`flex:1; min-height:0; overflow-y:auto`) y el `mat-sidenav-content` NO scrollee (`overflow:hidden`, selector con elemento para ganar especificidad al `overflow:auto` de Material); el `.topbar` queda `flex:0 0 auto`.

### [2026-07-19] Deep-link "en board": abrir el modal sin esperar el sync del HelpDesk
**Síntoma:** al hacer clic en "en board" (Tickets), el modal de la tarea tardaba >3.5 s en abrir.
**Causa:** `initBoards()` hacía `await syncTicketStatuses()` (sync de estados de ticket contra el HelpDesk, lento) ANTES de llamar a `focusCardFromRoute()` (que abre el modal). Pero el modal solo necesita las stories, que ya están tras `switchBoard()`.
**Fix:** mover `this.focusCardFromRoute()` a DENTRO de `initBoards`, justo tras `switchBoard` y ANTES del `await syncTicketStatuses()` (fire-and-forget: el sync sigue en paralelo). Se quitó el `.then(() => focusCardFromRoute())` del constructor para no abrirlo dos veces. Medido: ~1.4 s (antes >3.5 s).

### [2026-07-19] `100vh` traba el scroll en móvil; el manifest controla la orientación de la PWA
**Fuente:** correcciones de móvil en el board (layout `.shell`/`.content` + `manifest.webmanifest`).
**Hechos:**
- `height: 100vh` en el contenedor raíz del shell hace que, en navegadores móviles, el final del contenido quede detrás de la barra dinámica del navegador y el scroll interno "se trabe" sin llegar al fondo. Solución: `100dvh` (dynamic viewport height), con `100vh` como fallback para navegadores viejos.
- Un mat-sidenav-container con scroll interno propio (`.content` con `overflow-y:auto`) se beneficia de `overscroll-behavior: contain` para no encadenar el scroll al body (evita el "rebote y traba" en iOS).
- El campo `orientation` del `manifest.webmanifest` SÍ controla la orientación cuando la app corre como **PWA instalada** en `display: standalone`: `"any"` sigue la rotación física del teléfono; `"portrait"` la bloquea a vertical. En una pestaña normal del navegador el manifest no aplica (la rotación la decide el SO). Cambiar el manifest puede requerir reinstalar la PWA para que el dispositivo lo tome.

### [2026-07-20] MatTooltip bloquea el scroll táctil: pone `touch-action:none` inline en móvil
**Fuente:** investigación del bug "el scroll no arranca si el dedo empieza sobre la barra inferior de la tarjeta de ticket" (Android). Confirmado en el código instalado `node_modules/@angular/material/fesm2022/_tooltip-chunk.mjs`.
**Hecho:** en plataformas táctiles (iOS/Android, o `(any-hover:none)`), `MatTooltip._disableNativeGesturesIfNecessary()` fija **estilos inline** en el elemento con `matTooltip`: `touch-action:none` (línea 549), + `user-select:none`, `-webkit-user-drag:none`, `-webkit-tap-highlight-color:transparent`. `touch-action:none` hace que el navegador NO ejecute el pan/scroll que **comienza** sobre ese elemento. Se aplica siempre que `touchGestures !== 'off'` (default `'auto'`), aunque el tooltip nunca se muestre. Es **inline**, por eso no aparece en el SCSS del proyecto (en el CSS de Material solo slider=`pan-y` y tabs usan touch-action).
**Por qué se sentía en la barra inferior de la card (`.tc-foot`):** es una franja delgada y densa de targets con tooltip (asignado, bandera, pausa, "Ver") → casi toda su superficie queda "muerta" para iniciar scroll; el cuerpo tiene áreas sin tooltip (`[title]` en el asunto, fechas sin tooltip) donde el scroll sí arranca. De ahí lo intermitente y localizado.
**Fix:** provider global `{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { …, touchGestures: 'off' } }` en `app.config.ts`. Con `'off'`, el directivo hace early-return en el branch táctil (no registra touchstart ni llama a `_disableNativeGesturesIfNecessary`) → no hay `touch-action:none`. En escritorio el tooltip por hover (`mouseenter`) no cambia (no depende de `touchGestures`). Trade-off: se pierde el tooltip por long-press en móvil (los controles ya tienen ícono + aria-label). El token soporta el override: `MatTooltipDefaultOptions.touchGestures?` y el directivo lo lee (líneas 170-171 del chunk).

### [2026-07-20] "Cambiar estado → Catálogo no disponible": la memoización cacheaba el catálogo vacío
**Síntoma:** en la card de ticket, el submenú "Cambiar estado" mostraba "Catálogo no disponible" (statusOptions vacío).
**Causa:** `HelpdeskService.getTicketStatuses()` memoizaba la promesa (`this.statusesPromise ??= fetchAllStatuses()`) **incluso cuando volvía vacía**. Si la 1ª carga del catálogo fallaba por un blip transitorio —muy probable el **cold start de Render (free tier)**: el 1er request tras inactividad puede tardar/512/502 y `fetchAllStatuses` lo traga (try/catch, HD_SAFE)— quedaba cacheado el vacío **toda la sesión**. `refresh()` (↻) tampoco recargaba el catálogo (solo re-consulta tickets), así que solo se recuperaba recargando la página. Endpoints (`/api/v1/ticket-statuses/catalog` y `/ticket-statuses`) existen y piden auth (401 sin token); con el token síncrono de la sesión no es carrera de token → el fallo es transitorio de red/backend.
**Fix (100% frontend):** (1) `getTicketStatuses()` **no memoiza** un catálogo vacío → libera la promesa para que la próxima llamada reconsulte (re-navegar a Tickets crea un componente nuevo que vuelve a pedirlo). (2) `fetchAllStatuses()` reintenta hasta 2 rondas con 800 ms de respiro (cubre el cold start). (3) `refresh()` reconsulta el catálogo si `statusNames()` está vacío → el ↻ se vuelve botón de recuperación sin recargar. Verificado: `ng build` OK.

### [2026-07-20] "Sesión expiró" en el modal de conversación: el botón "Iniciar sesión" no llevaba al login
**Síntoma:** en el modal de conversación de un ticket aparecía "Tu sesión expiró…" y al pulsar "Iniciar sesión" NO navegaba al login (se quedaba en /tickets).
**Causa:** `AuthService.verifySession()` devolvía `false` por el camino `if (!t) return false` (token vencido/ausente) **sin limpiar la sesión**. Pero `isAuthenticated = computed(() => !!_session())` seguía en **true** (el objeto sesión persistía). El login rebota si hay sesión: `Login.constructor(){ if (isAuthenticated()) navigate(['/tickets']) }`, y el `authGuard` deja pasar /tickets porque la sesión sigue en memoria → nunca llega al login. `readSession()` solo hace `JSON.parse` sin validar y la clave localStorage es la MISMA del legacy (`fit-daily_session`), así que una sesión sin token válido es un estado alcanzable.
**Fix:** (1) `TicketMessagesDialog.goToLogin()` llama `auth.clearSession()` antes de `navigate(['/login'])`. (2) `verifySession()` limpia la sesión en el path `!t` (una sesión sin token es inutilizable, no debe contar como autenticada). Así `isAuthenticated()` pasa a false y el login ya no rebota. `ng build` OK.
**Nota:** aparte, conviene vigilar falsos "expiró" por cold start de Render (si /users/me da 502/timeout, `verifySession` cae al `catch → return true`, así que no marca expirado; solo un 401/403 real o token ausente lo marcan).

### [2026-07-20] Compositor de conversación: con texto largo se ocultaba "Enviar"
**Síntoma:** al escribir mucho texto en el compositor del modal de conversación, el área de texto crecía y empujaba la fila de acciones (Enviar/adjuntos) fuera de la pantalla.
**Causa:** `.composer-input` tenía `max-height: none` y confiaba en que el tope del `.composer` (55vh) + `flex-shrink` lo acotara; en la práctica el input crecía con el contenido y la fila de Enviar quedaba por debajo del área visible (y en móvil, agravado por usar `vh` en vez de `dvh`, que no descuenta la barra del navegador).
**Fix (SCSS):** techo propio al área de texto — `.composer-input { max-height: 30vh; max-height: 30dvh; overflow-y:auto }` → scrollea internamente y la fila de acciones (`flex:0 0 auto`) siempre queda visible dentro del `.composer`. Además `:host` y `.composer` usan `dvh` además de `vh` (móvil). `ng build` OK.

### 📌 REGLA (UI) — la barra de acciones (Enviar) SIEMPRE visible
**Origen:** el botón "Enviar" del compositor de tickets se ocultó dos veces al crecer el texto; la dueña lo pidió como regla (2026-07-20).
**Regla:** en cualquier diálogo/panel con un área de texto que crece (contenteditable/textarea) y una barra de acciones (Enviar, adjuntos, guardar…):
1. El área de texto DEBE tener techo de alto (`max-height` + `overflow-y: auto`) para scrollear internamente y NUNCA empujar los botones fuera de pantalla.
2. Los topes de alto usan `dvh` además de `vh` (móvil: descuenta la barra dinámica del navegador).
3. La fila de acciones va `flex: 0 0 auto` (nunca se encoge).
**Verificación:** con texto largo en móvil, "Enviar" debe quedar visible sin scrollear el diálogo entero.

### [2026-07-22] `Tarea` ya tiene FK directo a `TicketEspejo` → derivar el asignado no necesita JOIN manual
**Hecho del código:** `Tarea.ticketEspejo` es un `@ManyToOne` (`ticket_espejo_id`); el read model ya lo usaba para el nº de ticket (`t.ticketEspejo.helpdeskTicketId`) y el estado (`t.ticketEspejo.estadoOrigen`). Por eso "el dueño de la tarea = el asignado del ticket" se resuelve leyendo `t.ticketEspejo.asignadoHd` — Hibernate carga la relación; no hace falta JOIN ni consulta extra. Si `t.ticketEspejo == null`, la tarea no tiene ticket (reunión/local) y manda su `asignado_a`.
**Fuente:** `backend/.../core/Tarea.java:36`, `LegacyReadResource.stories()`.

### [2026-07-22] Tres entornos de build; el board "vivo" corre en cloud (Quarkus), NO en prod (Firebase)
**Hecho:** `angular.json` define 3 configs vía fileReplacements:
- `production` → `environment.prod.ts`: `dataBackend:'firebase'`, `quarkusApiUrl:''` → prod legacy en GitHub Pages, intacta (Strangler Fig).
- `quarkus` → `environment.quarkus.ts`: `localhost:8080` (dev local).
- `cloud` → `environment.cloud.ts`: `dataBackend:'quarkus'`, `quarkusApiUrl:'https://fit-desk.onrender.com'` → **este** es el que se publica en Pages y consume Quarkus (Render) + Neon (Postgres).
**Implicación:** los cambios al read model / write paths de `/api/legacy/*` afectan al despliegue **cloud** (build `ng build -c cloud`), no a la prod Firebase. Código que dependa del backend Quarkus debe guardarse con `environment.dataBackend === 'quarkus'` para ser no-op en modo Firebase.

### [2026-07-22] El sync completo del espejo de tickets es MANUAL — el front no lo dispara
**Hecho:** `POST /api/admin/sync/tickets` (pagina el HelpDesk → upsert a `ticket_espejo`) NO se llama desde ningún punto del frontend (grep `sync/tickets` en `app/src` = 0). El espejo se refresca solo por: (a) el write-through puntual al reasignar desde la app (`PUT /api/legacy/ticket-espejo/{id}/assignee`), o (b) correr el sync completo a mano (requiere Bearer del HelpDesk). No hay `@Scheduled` en `TicketSyncService`.
**Implicación:** como el board deriva estado/prioridad/asignado del espejo, su frescura para cambios hechos FUERA de la app (o antes del deploy del write-through) depende de correr el sync completo. Mitigación existente: el board hace fetch en vivo por-tarjeta del sprint activo (`effAssignee`/`syncTicketStatuses`), que sí muestra la verdad al segundo para esas tarjetas. Follow-up razonable: `@Scheduled` en background (ya previsto en el comentario de `TicketSyncService`) cuando exista cuenta de servicio/JWT propio.

### [2026-07-22] Conversación de ticket: modo "lectura ampliada" (ver más mensajes)
**Qué:** en el diálogo de conversación (`ticket-messages-dialog`) se agregó un botón `fullscreen` (en la barra del composer y en la barra de solo-lectura) que amplía el área de lectura de mensajes a TODO el modal; un botón `fullscreen_exit` en el encabezado (arriba a la derecha) vuelve al modal normal. Pedido por la dueña ("necesitamos ver más mensajes en el área").
**Cómo:** señal `readerExpanded` + `host: { '[class.reader-expanded]': 'readerExpanded()' }`. En `:host(.reader-expanded)` se ocultan `.conv-summary`, `.composer` y `.composer-readonly` con `display:none`; `.conv-body` (ya `flex:1 1 auto`, `max-height:none`) absorbe el espacio. **Clave:** se oculta el composer por CSS (no se quita del DOM con `@if`) para no perder el borrador/edición en curso ni romper `viewChild.required('composerInput')`.

### [2026-07-22] Tickets: filtro por Tipo (ticket_type_id) — catálogo estático
**Qué:** se agregó el filtro "Tipo" a la vista Tickets (faltaba; ya estaban Cliente/Estatus/Asignado). Va server-side como `ticket_type_id` y **combina** con los demás en la misma consulta (AND), igual que `client_id`/`assigned_user_id`.
**Catálogo:** los tipos NO se piden al API; salen del mapa estático `TIPO_NOMBRE` en `features/tickets/helpdesk.constants.ts` → `001=INCIDENCIA, 002=REQUERIMIENTO, 003=CONSULTA`. El `Ticket.tipoId` ya venía mapeado desde `ticket_type_id`.
**Dónde:** `TicketFilters.typeId` + `loadFiltered`/`loadAllFiltered` (helpdesk.service); `filterTipo`/`onTipoChange`/`buildFilters` (tickets.ts); select "Tipo" (tickets.html). Single-select con "Todos".

### [2026-07-22] REGRESIÓN: derivar el asignado del espejo "aunque esté vacío" borró dueños
**Síntoma:** tras desplegar la derivación del asignado, 19 de 159 tareas con ticket (11%) quedaron **sin dueño** en el board. Peor: como `puedeOperar`/`canDrag` usan el asignado efectivo, esas tarjetas quedaron sin nadie que pudiera moverlas.
**Causa:** el análisis pedía `COALESCE(ticket_espejo.asignado_hd, tarea.asignado_a)`, pero se implementó más duro: "si la tarea tiene ticket, manda el espejo **aunque venga null**". El HelpDesk **limpia `assigned_user_id` al cerrar/aprobar** un ticket (22 de 162 filas del espejo tienen el asignado vacío, casi todas en APROBADO/CERRADO/ENTREGADO) → derivar ese vacío borró el dueño guardado.
**Fix:** volver al COALESCE — si el espejo no trae asignado, se conserva `tarea.asignado_a`. Se sigue el ticket cuando el ticket SÍ tiene asignado (que es el caso de la reasignación, el objetivo original) y nunca se pierde el dueño.
**Lección:** al cambiar una lectura a "derivada", verificar la **cobertura real del dato de origen** en producción antes de desplegar (contar nulos), no solo que la derivación funcione.

### [2026-07-22] Móvil: las cards de Tickets se desbordaban por usar `1fr` en vez de `minmax(0, 1fr)`
**Síntoma (solo móvil):** en 390px de viewport la tarjeta de ticket medía **628px** — el asunto se cortaba y los botones "Ver"/"⋮" quedaban fuera de pantalla. En escritorio se veía bien.
**Causa:** `.ticket-grid { grid-template-columns: 1fr }` (regla base, móvil). **`1fr` equivale a `minmax(auto, 1fr)`**, y ese `auto` es el **min-content** del ítem: si la tarjeta trae una nota o un badge largo que no puede encogerse, la columna se estira por encima del contenedor. Los breakpoints ≥480px ya usaban `minmax(0, 1fr)` (por eso escritorio estaba sano); a la regla móvil le faltaba.
**Fix:** `grid-template-columns: minmax(0, 1fr)` en el grid móvil de Tickets. Mismo endurecimiento preventivo en `.kanban` del board (`max-width:1024px` y `max-width:600px`), que tenía el mismo patrón aunque hoy no se desbordaba.
**Regla general:** en CSS Grid, para columnas que deban ajustarse al contenedor usar SIEMPRE `minmax(0, 1fr)`; `1fr` a secas deja que el contenido mande. Diagnóstico: comparar `getComputedStyle(grid).gridTemplateColumns` contra el ancho del contenedor.
**Nota:** bug pre-existente (regla introducida en 366f424), latente y dependiente del contenido; salió a la luz al revisar la interfaz en móvil.

### [2026-07-22] Raíz del desfase: la fila de `ticket_espejo` nacía SIN asignado
**Hecho:** `LegacyWriteService.espejoFor()` creaba la fila del espejo al enlazar un ticket a una tarea guardando solo `helpdeskTicketId`, `cliente` y `asunto` — **`asignado_hd` quedaba NULL**. Como el read model deriva el dueño de esa columna, TODA tarea nueva nacía "sin dueño" hasta el siguiente sync completo. Eso (no que el HelpDesk limpiara el asignado, hipótesis que se verificó FALSA: los 19 tickets afectados sí tenían asignado en el HelpDesk) explicó las 19 tareas sin dueño, todas recientes (TA-160, TA-174…TA-196).
**Fix de raíz:** `espejoFor` siembra `asignadoHd` desde `t.asignadoA` (el `assignee` de la story ES el del ticket: el board lo precarga del HelpDesk, y `applyFields` lo aplica en la línea 145, ANTES de crear el espejo en la 151). Si la fila ya existe pero con el asignado vacío, se rellena el hueco (nunca se pisa un valor existente). El sync completo sigue siendo la fuente autoritativa y sobrescribe.
**Defensa en profundidad:** además el read model usa `COALESCE(espejo, tarea)`, así que aunque el espejo venga vacío nunca se pierde el dueño.

### [2026-07-22] Sesión perdida "estando dentro": el usuario quedaba atrapado sin login
**Síntoma:** al vencer el token estando ya en una vista, la app mostraba "No se pudo conectar al API.", **desaparecía el bloque de usuario** (con el botón "Cerrar sesión", que solo se pinta si hay sesión) y **no redirigía al login** → sin forma de salir salvo borrar el localStorage a mano.
**Causa 1 (atrapado):** `authGuard` es `CanActivateFn`, o sea que **solo se evalúa al navegar**. Si la sesión muere con la vista ya montada, nadie la reevalúa. Fix: un `effect` en `Layout` que, al quedar `auth.session()` en null, cierra diálogos y navega a `/login`.
**Causa 2 (mensaje engañoso):** `helpdesk.service` clasificaba el error con `/fetch|failed|network|0/i.test(err.message)`. Ese **`0` casa con cualquier estado que lo contenga** (401, 403, 500…), así que un 401 se anunciaba como fallo de red. Fix: `mensajeError(err)` decide por `err.status` (0/ausente = sin respuesta; 401 = sesión expirada; 403 = permiso; ≥500 = servidor).
**Regla:** clasificar errores HTTP por `status`, nunca por regex sobre el mensaje; y los guards de ruta no protegen contra la pérdida de sesión en caliente — hace falta reaccionar a la señal.

### [2026-07-22] Board: los chips de la tarjeta se salían (card-top sin flex-wrap)
**Síntoma:** en las tarjetas de reunión, el chip del equipo ("Equipo Oficina Cuenca") se salía por fuera de la tarjeta.
**Causa:** `.card-top` era `display:flex` **sin `flex-wrap`**, y los chips son `white-space: nowrap`. Medido en vivo: 259px de contenido en 170px útiles de columna (89px fuera); 23 tarjetas con desborde real.
**Fix:** `flex-wrap: wrap` + `row-gap: 4px` en `.card-top` (+ `max-width:100%` en `.team-badge`). Verificado A/B en producción: 23 tarjetas desbordadas → **0**; la fila crece de 44px a 76px al bajar de línea.

### [2026-07-24] `subscriptSizing="dynamic"`: ~20px por campo que nadie estaba usando
**Hecho:** por defecto, cada `mat-form-field` reserva alto fijo para el *subscript* (hint/error) **aunque no haya ninguno**. En el modal de tarea (7 campos) eso costaba ~130px de alto muerto: el contenido scrolleaba 128px (713px de contenido en 585px visibles).
**Fix:** `subscriptSizing="dynamic"` → el espacio solo se reserva cuando el hint realmente aparece. Medido después: **28px de scroll** (−78%) sin quitar ni un campo.
**Regla:** en formularios densos (modales, paneles de filtros del drawer) usar SIEMPRE `subscriptSizing="dynamic"`; el default solo tiene sentido cuando el campo valida y el mensaje aparece/desaparece, para que no salte el layout.
**De paso:** un pie de diálogo con 4 acciones no cabe en 560px si las etiquetas son largas ("Enviar a otro equipo"). Acortar la etiqueta y dejar la explicación en el tooltip devolvió el pie a UNA fila (113px → 65px) y evitó que la acción primaria quedara suelta abajo.

### [2026-07-24] Hueco: la regla "tareas con ticket no se borran" no cubría el modal
**Hecho:** el commit `bf66be4` (2026-07-18) protegió del borrado a las tareas con ticket en **tres** sitios: la × de la tarjeta del board (`@if (puedeGestionarTodo() && !card.ticket)`), `deleteCard` y `clearBoard`. Pero el botón **"Eliminar" del modal de detalle quedó fuera**: su única condición era `@if (!isNew)` y `remove()` no comprobaba el ticket → desde el modal SÍ se podía borrar una tarea con ticket, saltándose la regla.
**Por qué importa:** la tarea nace del HelpDesk; borrarla deja el ticket sin representación en el tablero (y el board la vuelve a necesitar).
**Fix:** `puedeEliminar = !isNew && !story.ticket` oculta el botón (mismo criterio que la tarjeta), **más** una guarda en `remove()` que rechaza y avisa aunque se invoque de otra forma (defensa en profundidad).
**Lección:** al establecer una regla de negocio, listar TODOS los puntos de entrada de esa acción. Aquí había cuatro (tarjeta, modal, deleteCard, clearBoard) y se cubrieron tres; el hueco salió a la luz meses después, al rediseñar el modal y dar más protagonismo al botón.

### [2026-07-24] El rol del HelpDesk se coló en una decisión de plataforma (y anuló el enfoque por rol)
**Síntoma:** con el enfoque por rol ya desplegado, JPHP001 (que debía abrir filtrado) veía el **tablero completo**: 99 tarjetas, incluidas las de otras personas.
**Causa:** `veTableroCompleto()` incluía `puedeGestionarTodo()`, que es `esMSC001() || esSupervisor()`, y **`esSupervisor()` mira `session.apiRole` — el `role_description` del HelpDesk**, no los roles de FitDesk. JPHP001 tiene `apiRole = "SUPERVISOR"` → daba `true` → sin filtro.
**Contradecía el modelo**, que dice literal en `12-roles-y-responsabilidades.md`: *"Los roles se definen EN la plataforma, no en el HelpDesk… El `role_description` del API NO determina permisos."*
**Fix:** `veTableroCompleto()` = SOLO roles de plataforma (ADMIN ∪ RESPONSABLE_EQUIPO ∪ GERENCIA). MSC001 sigue cubierto porque `esAdminPlataforma()` ya lo incluye como bootstrap.
**Regla:** al construir un permiso, verificar de qué FUENTE sale cada computed que se compone. En este código conviven dos familias que se parecen y NO son lo mismo: las derivadas del HelpDesk (`esSupervisor`, `puedeGestionarTodo`) y las de plataforma (`esAdminPlataforma`, `esResponsableEquipo`, `esEspecialista`, `esGerencia`). Mezclarlas rompe el modelo en silencio.
**Hallazgo de datos (aparte):** JPHP001 tiene `rolesPlataforma = []` — no tiene ninguna Asignación vigente en FitDesk, así que NO está registrado como ESPECIALISTA. Con "default deny" entra pero sin rol; hay que asignárselo en Administración → Asignaciones.

### [2026-07-24] Sesión ZOMBI: el refresh proactivo fallaba sin limpiar la sesión
**Síntoma:** el usuario ve "Tu sesión expiró. Vuelve a iniciar sesión." en Tickets pero **no lo redirige** al login; queda atrapado (mismo síntoma que el 2026-07-22, pero por otra causa).
**Causa (dos huecos que se combinan):**
1. `AuthService.doRefresh()` devolvía `null` cuando el refresh_token estaba vencido, **sin limpiar la sesión**. La sesión quedaba zombi: `isAuthenticated()` seguía `true`, el token vivo pero vencido. Como la sesión nunca pasaba a `null`, el `effect` del Layout (que redirige al perder sesión) NO disparaba.
2. El interceptor solo redirigía el 401 si `auth.token` existía (`!auth.token` en la guarda). Si el token ya se había limpiado/perdido, una petición en vuelo llegaba sin él, daba 401, y el interceptor la dejaba pasar sin sacar al usuario.
**Fix:**
1. `doRefresh`: si el refresh responde **401/403** (rechazo definitivo, no un 502/timeout de Render que cae al catch) → `clearSession()` → `isAuthenticated=false` → el effect del Layout redirige.
2. Interceptor: el 401 del proxy **siempre** redirige, aunque `auth.token` sea null. El 403 sigue requiriendo token (un 403 sin sesión no fuerza navegación).
**Regla:** "sesión inválida" tiene varias puertas de entrada (refresh proactivo, `verifySession`, 401 de una petición normal). TODAS deben converger en `clearSession()` para que el único redirect (el effect del Layout que observa la señal) dispare. No basta con arreglar una puerta.

### [2026-07-26] Probar el build `cloud` localmente contra Render: servir en el puerto 4200
**Contexto:** para verificar visualmente un cambio de UI con datos reales sin desplegar, se sirve el build cloud con `ng serve` y se apunta al backend de Render (`https://fit-desk.onrender.com`).
**Trampa (costó un rato):** al servir en un puerto cualquiera (probé 4300) el **login del navegador daba 504/403 mientras `curl` daba 200** al mismo endpoint. No era caída del backend ni cold start: era **CORS**. El navegador manda `Origin: http://localhost:4300` (incluso en POST del mismo origen), y el allowlist de CORS del backend en Render **solo admite `http://localhost:4200` y `https://zolmaria95.github.io`** (el origen de GitHub Pages). `curl` no manda `Origin`, por eso pasaba. Con `Origin` no permitido el backend responde 403 (el edge lo reporta como 504 en el navegador).
**Solución simple:** `npx ng serve -c cloud --port 4200`. En 4200 el `Origin` es el permitido → login directo contra Render, 200. (No hace falta proxy ni tocar `environment.cloud.ts`.)
**Alternativa (si algún día 4200 está ocupado):** URLs relativas + proxy `/api → Render`; pero el proxy reenvía el `Origin` del navegador, así que habría que reescribirlo a un origen permitido. Más frágil; preferir el puerto 4200.
**Datos de infra confirmados:** Pages real = `https://zolmaria95.github.io/fit-desk-nacional/`. Backend Render = `https://fit-desk.onrender.com` (free tier: primer request en frío tarda ~15-60s; conviene "despertarlo" con un login por `curl` antes de la prueba en navegador). El payload de login es `{ username_or_email, password, force_logout }`.
**Nota:** existe una config de `serve` `cloud` que se puede añadir a `angular.json` (`"cloud": { "buildTarget": "app:build:cloud" }`); no está versionada, se agrega temporal para la prueba.

### [2026-07-26] Trampas de Material al hacer formularios "a medida" (modal de reunión v2)
Al alejarse de los `mat-form-field` para lograr un look de tarjeta propio (label arriba + icono + borde redondeado), aparecieron tres trampas — todas resueltas:
1. **`mat-button-toggle` colapsa a altura 0** dentro del diálogo cuando se le fuerza `display:flex`/`flex:1` en un contenedor propio: el host del toggle quedó en `height:0` (theming MDC del button-toggle no aplicó su alto). **Fix:** no usar `mat-button-toggle` para segmentados a medida; hacer dos `<button role="radio">` propios con alto fijo. Da además control total del estado activo.
2. **`mat-select` exige `mat-form-field`** y arrastra su cromo (outline, notch, label flotante), que rompe la tarjeta. **Fix:** reemplazar por un disparador propio (`<button>` con icono + valor + caret) que abre un **`mat-menu`** con buscador. Dato clave: el **contenido proyectado de `mat-menu` conserva el `_ngcontent` del componente**, así que sus estilos (`.rf-menu-search`, `.rf-on`) se ponen en el `.scss` del componente aunque el panel viva en el overlay (igual que ya se hizo con el menú de "Ordenar" en Tickets). El buscador dentro del menú necesita `(click)` y `(keydown)` con `stopPropagation()` para que el menú no se cierre ni robe el teclado al escribir.
3. **`matDatepicker` funciona sobre un `<input>` pelado** (sin `mat-form-field`) porque `provideNativeDateAdapter()` está global (app.config). El input va `readonly` y se abre el calendario con `(click)="dp.open()"` en la tarjeta. El calendario emergente ya es Material (moderno); solo el disparador es propio.
**Regla:** para formularios con estética propia, quedarse con los inputs/`mat-menu`/`matDatepicker` (que toleran vivir fuera de `mat-form-field`) y evitar `mat-form-field`/`mat-select`/`mat-button-toggle`, que imponen su cromo o su theming.

### [2026-07-26] `display:flex` en un `<td>` rompe la rejilla de columnas de la tabla
Al maquetar una tabla (página interior de Transferencias) se puso `display:flex` **directamente en el `<td>`** (`.c-tarea`, `.c-origen`) para alinear icono+texto. Eso **anula el `display:table-cell`** del `<td>`: la celda deja de participar en la rejilla y las columnas se apilan/desalinean (se detectó porque `tarea` y `origen` quedaban a la misma `x`, sumando alturas = alto de fila). **Fix:** el flex va en un **wrapper interno** (`<div class="c-tarea-in">`), nunca en el `<td>`. Regla: para layout dentro de una celda, envuelve el contenido; deja el `<td>` como table-cell.

### [2026-07-26] Datos del modelo de Transferencias/Solicitudes (para la Bandeja)
- La transferencia se hace sobre una **`Tarea` existente** (`tareaCodigo`); el backend rechaza si no existe. No se puede transferir "un ticket suelto" sin cambio de backend.
- Estados: `PENDIENTE / ACEPTADA / RECHAZADA / COMPLETADA`. Endpoints con datos: `/entrantes` (PENDIENTE dirigidas a mis equipos) y `/aceptadas` (COMPLETADA dirigidas a mis equipos = trabajo foráneo que lleva mi gente). NO hay endpoint para historial de ACEPTADA ni RECHAZADA.
- La transferencia **no guarda prioridad**. La `Tarea` sí enlaza `ticketEspejo` (número real = `helpdeskTicketId`), ahora expuesto en el DTO como `ticket`.
- Roles: `puedeTransferir()` = ADMIN ∪ RESPONSABLE_EQUIPO (transfiere directo); `esEspecialista()` (escala por solicitud). Los diálogos viven en `features/board/transferir/` (`EnviarEquipoDialog`, `EscalarDialog`) y se abren hoy desde el modal de tarea del board.
- Para navegar a un ticket desde cualquier vista: `SearchService.buscar('ticket', n)` + `router.navigate(['/tickets'])` (Tickets consume la búsqueda pendiente al montarse).

### [2026-07-27] El emisor que gobierna origen Y destino veía su propio traslado como "pendiente a aceptar"
Cuando un actor (ADMIN, o RE de ambos equipos) **transfiere una tarea** y también **gobierna el equipo destino**, la transferencia que él mismo envió aparecía en `/transferencias/entrantes` como pendiente de aceptación — pero uno no debe aceptar su propio envío. **Fix backend:** `entrantes` ahora excluye lo despachado por el actor: `... and (despachadorOrigen is null or despachadorOrigen.id <> ?actorId)` (el `null` cubre transferencias legacy sin despachador). **Fix frontend:** nueva pestaña **"Enviadas"** en la página interior de Transferencias, alimentada por `/transferencias/salientes` (transferencias cuyo `equipoOrigen` gobierna el actor). En esa pestaña la columna "Origen" se rotula **"Enviada a"** y muestra el equipo **destino**; en el detalle NO se muestran Aceptar/Rechazar sino un **aviso de estado** ("Esperando que X acepte…" / "X aceptó…" / "X rechazó…"). Fuente: reporte de la dueña ("esta tarea la envié yo… me debería salir como enviada, no como pendiente", TA-206). Commit `a1a7050`.

### [2026-07-28] El control para deshacer una acción global debe vivir donde se ve su RESULTADO
La búsqueda global (buscador del drawer) filtra la vista de Tickets, pero el único botón "Limpiar filtros" estaba **dentro del panel Filtros del drawer**, que va **plegado por defecto** (`<details>`). Resultado: tras buscar un ticket, la dueña no encontraba cómo volver a "todos los tickets", y el botón ↻ **tampoco** la deshace (por diseño: `refresh()`→`query()` respeta la búsqueda/filtro activo). **Fix:** botón **"Limpiar"** en el encabezado de Tickets (junto al ↻), visible solo cuando `hasFilters()`; y una **"×"** en el banner azul de búsqueda por N°. Ambos llaman a `clearFilters()`. **Regla de UX:** el control que revierte un estado global (búsqueda/filtro) debe estar **en el área de contenido donde se ve el efecto**, no escondido en un panel plegado del shell. Commit `e7ba186`.

### [2026-07-30] ESC jerárquico en modales anidados + borrador automático (localStorage con TTL)
**Problema:** ningún `MatDialog` configuraba `disableClose` ni interceptaba `Escape`. Con un popup abierto encima de un modal, ESC burbujeaba y **cerraba también el modal padre**, perdiendo lo escrito. El caso crítico: el modal de conversación (`TicketMessagesDialog`), cuyos popups `lightbox` y `readerExpanded` son `div`s propios (NO overlays del CDK), así que nadie capturaba su ESC.

**Solución ESC — helper reutilizable `core/dialog-esc.ts` `wireDialogEsc(ref, onEsc?)`:**
- `ref.disableClose = true` + suscripción a `ref.keydownEvents()`. Clave del CDK: `keydownEvents()` de un overlay **solo dispara cuando ese overlay es el superior de la pila**. Por eso, con un popup del CDK abierto (autocomplete/select/menu/datepicker/diálogo anidado) el ESC lo consume ese popup y el `keydownEvents` del modal NO dispara → el modal queda abierto **gratis**. Sin popups, dispara y cerramos con `ref.close()`.
- Para popups que NO son overlays del CDK, se pasa `onEsc()` que los cierra primero y devuelve `true` (consume el ESC). En la conversación: `lightbox` → `readerExpanded` → si nada, cierra el modal.
- Se restaura `backdropClick()` → close (no cambia esa UX). `mat-dialog-close` y los `close()` programáticos siguen intactos.
- Aplicado a los 9 modales con texto (card-detail, reunion, compose, enviar-equipo/escalar/mensaje, assign-ticket, pendiente-date, ticket-messages). NO se tocó `app.config.ts` (los ~12 diálogos simples conservan su ESC por default).

**Borrador — `core/draft-store.ts` (`saveDraft/loadDraft/clearDraft`, prefijo `fit-daily_draft_`, TTL 90_000 ms):** patrón "timestamp + ventana" tipo `GRACE_MS` del DataService; `loadDraft` **borra y devuelve null** si expiró. En `TicketMessagesDialog`: autosave del composer `contenteditable` con `(input)` + debounce manual 500 ms; restaura en `afterNextRender` (guardando contra solo-lectura/sesión-expirada); `ngOnDestroy` re-estampa el borrador para que los 90 s cuenten **desde el cierre** (usa `lastComposerHtml` cacheado, no el DOM ya destruido); se descarta al **enviar** con éxito. Solo texto (los `File` adjuntos no se serializan). Clave por ticket `msg_<ticketId>`; no aplica a ediciones de mensajes.

**Trampa de verificación (Playwright headless):** `page.keyboard.press('Escape')` NO llega al listener de `keydownEvents()` del overlay (el listener vive en el host del overlay); hay que **despachar un `KeyboardEvent('keydown',{key:'Escape'})` sobre `.cdk-overlay-pane`** (o sobre el input enfocado para autocomplete). Con foco real de usuario dentro del diálogo sí funciona (mismo mecanismo que usa MatDialog). Verificado E2E: restaurar <90 s, expirar >90 s (borra clave), ESC-jerárquico en conversación y en el modal de tarea. Commit del front en Pages `b99e6f2`.

### [2026-08-02] El login de JPHP001 falla con 500 por un bug del API del HelpDesk (no de FitDesk)
`POST /api/v1/auth/login` con **JPHP001 + contraseña correcta** devuelve **HTTP 500 `INTERNAL_SERVER_ERROR` "Unexpected error"**, reproducible 5/5 y también **directo a `helpdesk-api.fit-bank.com`** (sin el proxy Quarkus) → es del propio HelpDesk. Control: **MSC001 con la misma clave `fit2` → 200 OK**, así que es específico de los datos de la cuenta JPHP001. La contraseña ES correcta: una incorrecta da **401** (`INVALID_CREDENTIALS`), no 500 → el 500 ocurre DESPUÉS de validar credenciales (creación de sesión/perfil/token). No depende de `force_logout` (probadas todas las variantes). **Acción:** reportar al equipo del API del HelpDesk (revisar log del handler de auth + registro de JPHP001 por datos faltantes/corruptos). Nuestro proxy `HelpdeskProxyResource` solo relaya (si fallara ÉL, sería 502, no 500).

**Fix en FitDesk (lo único nuestro):** la pantalla de login solo distinguía 401/409 y metía 400/422/500 en "Error de conexión, verifica tu red" (engañoso). Ahora `auth.service.login` lanza un `LoginError` con `status` + `serverMessage` (rescatados del cuerpo: `{error:{code,message}}` del HelpDesk o `{detail:[{msg}]}` de FastAPI), y `login.ts#mensajeLogin` muestra el motivo real por código (500 → "El HelpDesk tuvo un error…, repórtalo a soporte"; 400/422 → mensaje del servidor). Verificado E2E con Playwright. Commit `79ee6d4`, Pages `8d44875`.

### [2026-08-03] Adjuntos bajaban SIN extensión (.xls/.zip no abrían) — CORS no exponía Content-Disposition
En producción (Pages `zolmaria95.github.io` → Render, **cross-origin**) el navegador no podía leer el header **`Content-Disposition`**: no está en la *safelist* de CORS y el backend no lo exponía. `attachFilename(resp.headers.get('Content-Disposition'))` devolvía `null`→`''`, y `openAttachment` guardaba el archivo con el nombre de nuestra convención **sin extensión** (p. ej. `adjunto_29624-2`), así que Excel/Windows no abría el `.xls`/`.zip`. El proxy `HelpdeskProxyResource` SÍ reenvía el header (no está en `SKIP_RESP`) y el HelpDesk manda `filename*=UTF-8''adjunto_<ticket>_<N>.<ext>` — el problema era solo la exposición CORS. **Fixes:** (1) backend `quarkus.http.cors.exposed-headers=Content-Disposition` (raíz; cubre todos los tipos, incl. `application/octet-stream` que por MIME no se puede deducir; requiere redeploy Render). (2) frontend: `fetchAttachment` devuelve el `type` (Content-Type del blob, que SÍ es safelisted) y `openAttachment` deduce la extensión con `extFromMime()` (nuevo en `ticket-utils.ts`) cuando el nombre no la trae — alivio inmediato para tipos conocidos sin esperar al backend. Verificado E2E con Playwright (capturando `a.download`): `.zip` y `.png` ya con extensión; el octet-stream `-8` quedó sin extensión hasta el fix de backend. Commit `cd512c2`; front en Pages `5cf1957`; imagen backend subida (falta Manual Deploy en Render). **Dato reutilizable:** cualquier header de respuesta que el front necesite leer cross-origin debe ir en `exposed-headers`.

### [2026-08-21] Recordatorio de reuniones: reutilizar el poller de tickets + ventana auto-expirable
El poller global de recordatorios (`layout.ts#checkReminders`, cada 30 s en el shell, con sonido y **dedup
diario por-navegador** `ALERTED_KEY`) ya existía para tickets; se **extendió** a reuniones sin duplicar
infra. Nuevo helper `reunionesDue(now, todayStr)`: recorre `data.stories()`, filtra `tipo==='REUNION'` con
`inicio`, `lead = recordatorioMin ?? 20` (`lead<=0` → sin recordatorio), `dispararEn = inicio − lead*60000`,
y es **due** si `dispararEn <= now < inicio` (ventana ANTES del inicio → **auto-expira**, no re-alerta mañana;
contrasta con los tickets, que se alertan por fecha del día). Relevancia: `dueño===yo` o (`esResponsableEquipo()`
y `s.board ∈ boards()`). Dedup con clave propia `'reunion|'+id` (separada de la de tickets), ambos sets se
marcan a la vez; los ítems de reunión y ticket se **mezclan en la MISMA alerta**. `ReminderItem` se generalizó
con `kind?:'ticket'|'reunion'` (+ `titulo/hora/link`); "Ver pendientes" (→ /pendientes) solo si `hasTickets`.
**Backend:** campo `tarea.recordatorio_min` (Flyway `V18`, nullable) + `Tarea.recordatorioMin` +
`applyFields` (patrón V17: entero>0 o null) + `LegacyReadResource.stories()` lo emite. **Reutilizable:**
para probar el poller sin depender del reloj, crear la reunión con `inicio` unos minutos en el futuro y un
`recordatorioMin` grande (p. ej. `inicio=now+20`, `recordatorio=30` → `dispararEn=now−10`, ventana de 20 min);
`new Date(s.inicio)` se parsea en la **zona horaria del navegador** (Playwright = local del Mac), así que el
`inicio` debe ir en hora local. La ventana `now < inicio` la hace inmune a esperas largas del poll.

### [2026-08-24] El preview de adjunto-imagen del ticket ocultaba "Enviar" (regresión de la regla de oro)
Tras agregar el preview inline de adjuntos imagen, el **adjunto general del ticket** (`.ticket-attach`, dentro
del bloque `Adjunto del ticket:`) se renderiza en `.conv-summary`, que es **`flex: 0 0 auto` (FIJO, no
scrollea)**. El thumb grande (`.conv-thumb-img` 220×160) inflaba ese resumen fijo; con 1-2 imágenes + texto,
empujaba la fila `.composer-actions` (botón **Enviar**) fuera del `:host` (`overflow:hidden`, `max-height:88dvh`)
→ Enviar oculto. **Es un problema de adjunto, NO de texto** (el composer-input ya capaba a 30dvh con scroll).
**Fix (solo `ticket-messages-dialog.scss`):** el preview del adjunto del ticket se hace **COMPACTO**
(`.ticket-attach .conv-thumb-img` → max 40×64; descarga al lado con `position: static`) — **sigue visible, solo
más pequeño** (la dueña: "el adjunto general debe estar visible, podría cambiar el tamaño, pero no
desaparecer"); click → lightbox con la imagen completa. El preview grande se conserva para los **adjuntos de
mensaje** (viven en `.conv-body`, que SÍ scrollea). Defensa en profundidad: `.ticket-attach` con
`max-height:96px+overflow` (varias imágenes scrollean) y `.conv-summary` con `max-height:46dvh+overflow` PERO
**SIN `min-height:0`** (con él, flexbox lo encogía a 67px y ocultaba el N°/título; sin él nunca baja de su
contenido). **Verificado** (Playwright, ticket #33598 real vía proxy): 1280×800 y 390×844 → Enviar visible,
thumb del adjunto visible (40px), resumen completo (257px, sin scroll), sin overflow horizontal. Pages
`a498f8a`; GitLab front `251d8c9`.

### [2026-08-25] Copiar mensaje + descargar conversación (PDF) en el modal de ticket
Dos utilidades nuevas en `ticket-messages-dialog` (100% frontend): botón **copiar** por mensaje
(`.conv-copy` en `.conv-meta`) y botón **descargar conversación** (PDF) en `.conv-head`.
- **Gotcha reutilizable — portapapeles:** `navigator.clipboard.writeText` SOLO funciona en **contexto
  seguro** (HTTPS/localhost). El build **on-prem se sirve por HTTP sobre IP** → ahí la API moderna está
  bloqueada. Nuevo helper `core/clipboard.ts#copyText()` intenta la API moderna y cae a un fallback
  `document.execCommand('copy')` (textarea temporal). Devuelve bool → feedback por snackbar.
- **Texto con saltos:** `stripHtml` colapsa los `\n`; para copiar/PDF se agregó `htmlToText()` en
  `ticket-utils.ts` (br/cierres de bloque → `\n`). Se usa en ambos.
- **PDF (jsPDF, ya dependencia, import dinámico → lazy chunk ~9kB):** recorre **`sortedRaw` (TODOS los
  mensajes, no `messages()` que es solo el bloque paginado cargado)** → el PDF incluye los mensajes
  "anteriores" aún no renderizados. Encabezado (N°/asunto/cliente/estado/generado) + por mensaje
  `fecha · autor` (regla #8: NOMBRE, `entry_user_name||entry_user_id`, nunca solo el código) + cuerpo
  con `splitTextToSize` + `[Adjunto: nombre]` + paginación manual (`addPage` cuando `y` supera el alto).
- **Verificación (Playwright, ticket #33598 real):** copiar → texto exacto del mensaje + snackbar; PDF →
  se capturó el Blob (hook a `URL.createObjectURL`) y se inspeccionó inflando los streams FlateDecode con
  `zlib` (stdlib): **18 líneas de mensaje vs 15 cargadas en el DOM** (confirma que exporta los no
  cargados), 7 adjuntos, autores por nombre, 0 códigos filtrados. Móvil 390×844 sin desborde, Enviar
  visible, sin errores de consola nuevos. Build cloud OK. **NO desplegado** (regla de la dueña: esperar
  su luz verde) — ver [[regla-no-desplegar-sin-permiso]] equivalente en memoria.

### [2026-09-01] Bug on-prem: guards `dataBackend==='quarkus' && !!quarkusApiUrl` rompen con URL vacía (same-origin)
En `environment.onprem.ts` el `quarkusApiUrl` (y `helpdeskProxyUrl`) es **''** a propósito (mismo-origen →
URLs relativas `/api/...`, sin CORS). Pero dos feature-detection guards exigían `!!url`, y `!!'' === false`:
- `perfil.service.ts#usaQuarkus()` → **false** on-prem → se saltaban `cargarMiPerfil` / `cargarEquiposRevisar`
  / `cargarFotos` → `equiposRevisar` vacío → la pestaña **Tickets/Equipo NO filtraba** por los clientes del
  equipo (mandaba la consulta sin `client_id` → todos los clientes).
- `data.service.ts#useQuarkus()` (y su wrapper público `usesQuarkus()`) → **false** on-prem → la capa de
  datos caía al **Firebase legacy** (`environment.onprem` aún trae `firebaseDbUrl` real) en vez de Postgres →
  el **board mostraba datos desactualizados** (del Firebase viejo). Y como el layout gatea
  `mostrarAdmin = puedeAdministrar() && data.usesQuarkus()` y `mostrarBandeja = puedeTransferir() && usesQuarkus()`,
  **MSC001 (ADMIN+RESPONSABLE_EQUIPO) no veía Administración ni Bandeja**.
**Fix:** ambos guards → solo `environment.dataBackend === 'quarkus'` (base vacía = URLs relativas VÁLIDAS).
Seguro en todos los entornos: solo `onprem` tenía quarkus+URL-vacía; `prod`/dev son firebase; cloud/quarkus
tienen URL no vacía. **Verificado on-prem** (túnel, KIMA001): la consulta de tickets ahora lleva
`client_id=50,64,...` (11 clientes Cuenca); el board pega a `/api/legacy/stories` (Postgres), 0 llamadas a
firebaseio; roles MSC001 = `["ADMIN","RESPONSABLE_EQUIPO"]`. GitLab `servicios/fit-desk` `41f1b0d..36aa97b`;
server reconstruido (solo frontend). **Reutilizable:** en el build same-origin, NUNCA uses `!!url` como
feature-flag; chequea `dataBackend`/`dataBackend!=='firebase'`. La verificación local del on-prem solo cubrió
login+boards → estos features (perfil/roles/board-source) se colaron; conviene probar E2E el resto on-prem.

### [2026-09-02] Descargas de adjuntos: qué se comprobó en vivo y qué quedó SIN reproducir
Reporte de la dueña en el nacional: los adjuntos **no descargan** — en la **app instalada** no pasa nada, y
en el **navegador** baja "algo vacío o dañado"; al precisar, dijo **con peso pero SIN extensión**. Señaló el
**ticket 33565**. Investigado en vivo contra producción (con su sesión ya abierta en el perfil de Playwright).

**Medido en el nacional (ticket 33565, adjuntos 401251/401252):**
- `content-disposition: attachment; filename*=UTF-8''adjunto_33565_1.docx` → **la cabecera SÍ llega y SÍ
  trae la extensión**, y la leen igual `fetch` **y XHR** (que es lo que usa `HttpClient`). O sea que **no**
  es el caso de jul-2026 (CORS ocultando el header): el nombre se resuelve bien.
- `content-type: application/octet-stream` → `extFromMime` devuelve `''`. **La extensión depende hoy al
  100% de `Content-Disposition`**: correcto pero frágil, está a una cabecera de romperse.
- **En Chrome de escritorio la versión DESPLEGADA descarga bien:** al pulsar los adjuntos quedaron en disco
  `adjunto-33565-1.docx` y `adjunto-general-33565.docx`, ambos `Microsoft Word 2007+` íntegros. **El síntoma
  de la dueña NO se reprodujo en escritorio.**

**Conclusión honesta:** el fallo es **específico de su entorno** (todo apunta a la **PWA instalada** — su
primer síntoma: "no pasa nada"), no al camino de escritorio. La causa más probable es el **ancla suelta**: el
código desplegado hace `document.createElement('a')` + `click()` **sin agregarla al DOM**; eso funciona en
una pestaña normal pero es el patrón que falla en la ventana **standalone**. **Comprobado en vivo** que el
mecanismo del fix (ancla **en el DOM**) descarga el mismo adjunto real de forma limpia:
`PRUEBA-FIX-endom.docx`, 196369 bytes == los del servidor, CRC del zip OK. Lo que **no** se pudo probar es la
PWA instalada en sí → **lo confirma la dueña al desplegar**.

**Cambios hechos (defensivos; ninguno rompe el camino que ya funciona):**
1. **Ancla dentro del DOM** al disparar la descarga (agregar → `click()` → quitar).
2. **Red de seguridad para la extensión:** cascada `extDe()` = nombre real → MIME → **firma binaria**
   (`extFromBytes` en `ticket-utils.ts`), que no depende de ninguna cabecera. Lee los primeros 8 KB;
   reconoce PDF/PNG/JPG/GIF/WEBP/XML/RAR/7z/GZ, distingue los **ZIP de Office** (xlsx/docx/pptx por `xl/`,
   `word/`, `ppt/` en el índice; si no, `.zip`) y los **OLE2 legacy** (xls/doc/ppt por el nombre de entrada
   del directorio en **UTF-16LE**). Verificado: **12/12 formatos** con archivos reales.
3. **⭐ Bug REAL e independiente (0 KB):** en el reporte de Vacaciones (`reporte-dialog`) se llamaba
   `URL.revokeObjectURL(a.href)` **en la línea siguiente al `click()`** — carrera contra el navegador, que
   aún no terminó de leer el blob → archivo **vacío**. Fix: revocar con retraso (10 s).

**Regla reutilizable:** toda descarga va por `core/descargar.ts` (`descargarUrl`/`descargarBlob`). **Nunca**
crear anclas sueltas ni revocar el blob justo después del `click()`, y **nunca** depender solo de
`Content-Disposition` para el nombre.
**Gotcha de instrumentación:** una descarga real **tumba la conexión del MCP de Playwright** (la página queda
en `about:blank`); para depurar, guardar la evidencia en `sessionStorage` o mirar el disco después — y ojo:
que la conexión se caiga **no** significa que la descarga fallara (de hecho sí ocurrió).

### [2026-09-02] Tema oscuro: por qué no bastaba con `styles.scss` (dos trampas)
Al verificar el tema oscuro antes de desplegarlo se vio que **el asunto del ticket era invisible**:
tarjeta blanca + texto casi blanco → contraste **1.22** (mínimo legible AA = 4.5). Dos causas distintas,
las dos reutilizables:

1. **Estilos INLINE no los pisa ninguna hoja de estilos.** El tinte del encabezado y los badges de
   estado/tipo salen de `[style.background]` calculado en TS (`clientStyle`, `estadoStyle`, `tipoStyle`)
   con pasteles claros fijos. Ningún `html[data-theme='dark'] …` puede ganarles. **Fix:** esas funciones
   reciben ahora un flag `oscuro` y devuelven variante oscura (fondo tintado oscuro + texto vivo); la
   tarjeta las llama dentro de `computed()` leyendo la señal del `ThemeService` → **repinta sola** al
   conmutar, sin recargar. `clientStyle` (compartida con el Board) mezcla sobre base oscura y con **menos
   peso** (0.09 vs 0.14): sobre negro el acento satura antes.
2. **⭐ `html[data-theme='dark']` NO funciona dentro del `.scss` de un componente.** Con encapsulación
   emulada, Angular le pega el atributo del componente **también al `html`**:
   `html[data-theme=dark][_ngcontent-%COMP%] .ticket-card[_ngcontent-%COMP%]` → jamás casa (el `<html>`
   no lleva `_ngcontent`). **Hay que usar `:host-context(html[data-theme='dark'])`**, que compila a
   `html[data-theme=dark] [_nghost-%COMP%] …`. Esta trampa es silenciosa: compila y no avisa.

**Medido antes/después** (Tickets, 144 elementos de texto): asunto **1.22 → 14.34**; badges de estado/tipo
**7.06–7.71**; N° de ticket (`.tc-id`) 1.12 → legible; elementos bajo 4.5 pasaron de **35 a 18**. Lo que
queda por debajo es el badge de prioridad (blanco sobre naranja, **2.65**), que es **igual en modo claro**
— defecto preexistente de diseño, no regresión del oscuro.
**Alcance real:** esto cubre la tarjeta de Tickets. **Board, modales, Vacaciones y Administración siguen
sin su paso a oscuro** (mismo patrón: buscar colores RAW y estilos inline en cada componente).
**Método para auditar:** recorrer el DOM calculando el contraste real (color computado vs primer ancestro
con fondo no transparente) — mucho más fiable que mirar capturas, donde un pastel a escala engaña.

### [2026-09-02] Tema oscuro completo: las 8 secciones + pestañas de Administración
Tras el hallazgo de que el oscuro solo cubría la tarjeta de Tickets, se hizo el paso completo. **Tres
patrones** explican TODO lo que faltaba, y conviene buscarlos en ese orden al portar un componente:

1. **Superficie clara + texto que ya viró.** El caso más común (Admin, Bandeja, Mi Panel, Semanal,
   Vacaciones): el texto usa `--mat-sys-on-surface` (que vira solo) pero el contenedor seguía en `#fff`.
   Se arregla oscureciendo la SUPERFICIE, no el texto.
2. **Color heredado.** Elementos sin `color` propio (`.s-name`, `.s-count`, `.sem-assignee`) heredaban
   tinta oscura de un ancestro. Se fija el `color` en el contenedor y heredan bien.
3. **⭐ Estilos INLINE calculados en TS.** No los pisa ninguna hoja de estilos. Aparecieron **tres** veces:
   badges de estado/tipo (`tickets-card-utils`), tinte del post-it (`clientStyle`, compartido Board+Tickets)
   y la **paleta de 12 colores por consultor** de Semanal (`PALETTE` → se añadió `PALETTE_DARK`). El patrón
   de solución es siempre el mismo: la función recibe un flag `oscuro` y el componente la llama dentro de
   un `computed()` que lee la señal del `ThemeService` → **repinta solo al conmutar, sin recargar**.

**Método que funcionó (y ahorra mucho tiempo):** no adivinar selectores leyendo el `.scss`, sino
**preguntarle al DOM en caliente** qué ancestro pinta el fondo claro y qué color computa el texto. Así
aparecieron `.vac-ferrow` (sin guion, no `.vac-fer-row` como sugería el .scss) y el color inline de Semanal.
La auditoría debe **componer el alfa** subiendo por los ancestros: si no, un `rgba(255,255,255,0.035)` se
lee como blanco opaco y genera falsos positivos (me pasó: reporté 35 fallos que no existían).

**Resultado medido** (elementos de texto con contraste < 4.5 AA, y "ilegibles" = < 2.5):
Tickets 0/0 · Semanal 0/0 · Pendientes 0/0 · Vacaciones 1/0 · Bandeja 1/1 · Admin 1/0 (y sus 4 pestañas
internas —Regionales, Equipos, Clientes, Asignaciones— 1/0 cada una) · Mi Panel 5/0 · Board 139/24.
Los 24 del Board son **un solo tipo**: el label del checkbox "Finalizado" **deshabilitado**, que Material
baja al 38% (contraste 1.13). Es el estado deshabilitado, no una regresión — pero en oscuro desaparece del
todo; queda como pendiente menor a decidir si se sube su alfa.
**Pendiente:** el badge de prioridad (blanco sobre naranja, 2.65) está **igual en claro** — defecto de
diseño preexistente, no del oscuro.

### [2026-09-03] Alerta de novedades: abrir el ticket desde el popup + BUG que la dejaba muda
**Petición:** al saltar la alerta de tickets nuevos, hacer clic en el N° debe **abrir el modal del ticket**
(antes el número era un `<span>` inerte y el único botón llevaba a la lista sin filtrar).

**Implementado** en `reminder-alert-dialog.ts`: el N° pasa a `<button class="ra-tk ra-tk-btn">` que abre
`TicketMessagesDialog` **encima** de la alerta (la alerta NO se cierra → si llegaron varias novedades, se
atiende una y las demás siguen a la vista). Aplica a las dos alertas con `#N` (novedades y recordatorios);
las **reuniones no se tocan** (su `.ra-tk` muestra la hora, no un ticket).
- **⚠️ El import de `TicketMessagesDialog` es DINÁMICO a propósito.** `ReminderAlertDialog` lo importa
  `layout.ts` (el shell) → vive en el **bundle principal**; un import estático arrastraría el modal de
  conversación entero a la carga inicial. Verificado: `main` 478 734 → 478 709 bytes (no creció).
- **ESC jerárquico: no hizo falta tocar nada.** El `OverlayKeyboardDispatcher` del CDK entrega el keydown
  solo al overlay superior → el 1er ESC cierra el ticket (que usa `wireDialogEsc`) y deja la alerta; el 2º
  cierra la alerta. Comprobado.

**⭐ BUG ENCONTRADO (preexistente y YA EN PRODUCCIÓN desde el Lote 1, `e2bf028`):**
`perfil.cargarEquiposRevisar()` se llamaba **solo desde `tickets.ts`**, pero el poll de novedades vive en
el shell (`layout.ts#checkNuevosTickets`) y depende de `perfil.equiposRevisar()` para saber qué clientes
vigilar. Si el usuario **no abría la pestaña Tickets**, esa señal estaba vacía → `ids.length === 0` → el
poll salía por el `return` temprano **sin alertar nunca**. Justo el escenario que la función debía cubrir
("aparece en cualquier pantalla"): un responsable que entra al Board y se queda ahí no recibía nada.
**Fix:** cargar `cargarEquiposRevisar()` en el shell, junto a `cargarMiPerfil()`.
**Así se detectó:** al intentar provocar la alerta desde Vacaciones no saltaba en 160 s, y las **marcas de
agua no se movían** — señal de que `revisar()` ni siquiera llegaba a ejecutarse (su primer `setWm` va
después de consultar). Descartadas una a una las precondiciones (roles OK, 11 clientes del equipo OK,
consulta de tickets 200 con 30 resultados) quedó el eslabón que faltaba.

**Verificado E2E** (build `cloud` local + Playwright, sesión reutilizada sin login nuevo): la alerta salta
**a los 20 s desde Vacaciones** (antes, nunca); clic en `#33565` abre ese ticket exacto con la alerta
debajo (2 overlays); ESC jerárquico correcto; tema **oscuro** legible; **390×844** sin desborde
(modal 374 px); **0 errores de consola**.
**Truco para provocar la alerta en pruebas:** NO borrar las marcas de agua (la 1ª corrida haría *baseline*
y no alerta) sino **atrasarlas** (`Date.now() - 86400000`), y hacerlo **fuera de la pestaña Tickets**,
porque al ver "Equipo" corre `marcarVistos()` y las vuelve a poner al día. El dedup de popup es en memoria:
para repetir la prueba hay que **recargar**.

### [2026-09-07] El menú lateral se quedaba abierto al estrechar la ventana (realimentación de `opened`)
**Síntoma (dueña):** en la **PWA instalada en el Mac**, al cambiar el tamaño de la ventana el panel de
navegación quedaba abierto tapando el contenido. "Se arreglaba" al pulsar otra sección.

**Causa raíz — una realimentación entre plantilla y señal.** En `layout.html`:
`[opened]="opened()"` junto a `(openedChange)="drawerOpen.set($event)"`, y en `layout.ts`
`opened = fixed() || drawerOpen()`. En escritorio `fixed()` es true → Material abre el drawer → emite
`openedChange(true)` → **`drawerOpen` queda encendido**. Al estrechar, `fixed()` pasa a false pero
`opened()` sigue dando true por `drawerOpen` → el panel permanece abierto, ahora en modo `over` con
backdrop. Lo único que lo cerraba era `NavigationEnd` (de ahí que navegar lo "arreglara").
**Fix:** un `effect` que observa `fixed()` y pone `drawerOpen` en false al cruzar a móvil — la misma línea
que ya existía en la suscripción de navegación, aplicada también al cambio de breakpoint.

**Dato que evitó perseguir un fantasma:** en **carga limpia a 390 px NO se reproduce** (drawer cerrado, 0
desborde). El fallo es exclusivo del **redimensionado**, que es lo que hace quien usa la PWA en una ventana.
Al depurar responsive, distinguir siempre "cargar estrecho" de "estrechar cargado": son caminos distintos.
**Verificado** (build cloud + Playwright): 1440 abierto/side → 420 **cerrado**/over → ☰ abre → navegar cierra
→ 1440 otra vez abierto/side, sin `inert` pegado ni desborde.

**Descartado de paso:** abrir un modal **no** descuadra el layout (sin `cdk-global-scrollblock`, mismos
anchos antes y después) — el síntoma "al saltar las alertas se daña la visualización" no se reprodujo y la
dueña confirmó que ya no ocurre.

### [2026-09-07] ⭐ Adjuntos que "no hacen nada": un `await` entre el clic y la descarga la bloquea
**Síntoma (dueña, 3ª vez que lo reporta):** en la **PWA instalada (Chrome/Mac)**, pulsar un adjunto —o el
"descargar general"— **no hace absolutamente nada**. Su pestaña de Red lo dejó claro: **ninguna petición a
`/api/v1/attachments/…`**, solo el poll de fondo. Sin descarga, sin petición y sin error.

**Causa: la introduje yo al arreglar la extensión.** `descargar()` pasó a ser `async` y quedó así:
```ts
const ext = await this.extDe(info);   // ← espera
descargarUrl(info.url, …);            // ← ya fuera del gesto del usuario
```
Chrome **bloquea en silencio** las descargas que no salen de un gesto de usuario, y la ventana
**standalone de una PWA es mucho más estricta que una pestaña** — por eso en Chrome de escritorio yo la veía
funcionar y en su PWA no. Que no hubiera petición encaja perfecto: el blob ya estaba resuelto en
`attachInfo`, así que el camino no necesita red; lo único que faltaba era el clic, y estaba bloqueado.

**Fix:** `descargar()` vuelve a ser **síncrono** en el camino normal. La extensión se resuelve primero por
las dos vías que NO esperan (nombre de `Content-Disposition` → MIME) y se dispara la descarga en el acto;
solo si ambas fallan se cae al paso lento (leer la firma binaria), aceptando ahí la pérdida del gesto porque
es preferible a bajar el archivo sin extensión. Mismo criterio en `openAttachment`.

**Regla para no repetirlo:** entre el `(click)` y el `descargarUrl()` **no puede haber ningún `await`**.
Si hace falta algo asíncrono, resolverlo ANTES (al abrir el diálogo, como ya hace `resolverAdjunto`) o
asumir que esa rama puede no descargar en PWA.
**Verificado:** clic en el chip → `adjunto_33565-1.docx` y en el general → `adjunto-general_33565.docx`,
ambos **196 369 bytes, 13 entradas, `word/` presente y CRC OK** (idénticos al original).
**Falta confirmar en la PWA instalada de la dueña** — es el entorno donde falla y el único que no puedo probar.

### [2026-09-07] "Mi Panel" invisible para los responsables: rol del HelpDesk + usuario en duro
**Reporte (dueña):** la pantalla **Mi Panel** no se muestra a los perfiles de *Responsable de Equipo*,
y debería.

**Causa:** el permiso era herencia del legacy —
`puedeVerMiPanel = esScrumMaster() || esMSC001()` — o sea un **rol del HelpDesk** (`role === 'Scrum
Master'`) más el **usuario MSC001 escrito en duro**. Ningún responsable lo veía salvo la dueña. Es el mismo
error ya corregido en `puedeEliminarTarea` y `veTableroCompleto`, y advertido dos veces en este archivo:
**los permisos salen de los roles de PLATAFORMA, nunca del `role_description` del HelpDesk.**
**Fix:** `puedeVerMiPanel = esAdminPlataforma() || esResponsableEquipo()`, movido al bloque de roles de
plataforma. `esScrumMaster` queda **sin usar** en toda la app.

**⭐ El fallo de fondo era peor que el permiso.** Mi Panel filtraba sus tickets por **`CLIENTES_VALIDOS`**,
una lista de clientes **escrita a mano** (los de Cuenca). Abrir el menú sin tocar eso habría hecho que un
responsable de otra regional viera **los pendientes de Cuenca como si fueran suyos** — peor que no ver la
pantalla. Es el mismo resto de nacionalización que se corrigió en la pestaña Equipo de Tickets en jul-2026,
y que entonces se dejó anotado como pendiente en otras vistas.
**Fix:** el alcance sale ahora de `perfil.equiposRevisar()` cruzado con el catálogo del HelpDesk mediante
**`equipoClientIdsDe`** (el mismo helper que ya usan Tickets/Equipo y el poller de novedades del shell), y
se filtra por **`clientId`** en vez de por nombre. Se añadió **selector "Equipo a revisar"** para el
responsable regional (mismo texto y comportamiento que en Tickets). Si no hay ids (ADMIN sin equipo, o
catálogo aún cargando) **no se filtra**: mejor el panorama completo que una pantalla vacía.

**Lección:** al abrir una pantalla a más perfiles, revisar **qué datos filtra** antes que el permiso. El
permiso es una línea; el alcance es lo que decide si la pantalla dice la verdad.
**Verificado:** build limpio; el ítem aparece en el menú y la pantalla renderiza; y la cadena de filtrado
probada con 5 casos deterministas sobre el helper real (responsable de Cuenca ve solo Cuenca, el de Quito
solo Quito, el regional ve ambos, con el selector filtra a uno, y un admin sin equipos ve todo).
**Sin verificar en vivo:** que un responsable que NO sea MSC001 lo vea — hace falta iniciar sesión con uno.
**Pendiente relacionado:** `tickets.ts:212` (Estadísticas) **sigue usando `CLIENTES_VALIDOS`**.

### [2026-09-07] "Estadísticas" ya no existía: lo que quedaba era código muerto con la última lista de Cuenca
Al ir a corregir la sección de **Estadísticas** de Tickets —que según el ADR de jul-2026 "seguía usando
`CLIENTES_VALIDOS`"— resultó que **la pantalla ya no existe**: no hay markup en `tickets.html` ni computeds
de stats en `tickets.ts`. Se debió eliminar con la limpieza de agosto (Burndown/Progreso/Consultas).
*(Corrige lo que yo mismo había afirmado un rato antes: no había nada que arreglar ahí.)*

**Lo que sí quedaba, y sí valía la pena quitar:**
1. `tickets.ts` → `validClientIds`, un `computed` **sin un solo llamador** cuyo único cometido era cruzar
   `CLIENTES_VALIDOS` con el catálogo del API.
2. `helpdesk.constants.ts` → **`CLIENTES_VALIDOS`**, la lista de ~18 clientes de Cuenca **escrita a mano**.
   Con el punto 1 fuera, se quedaba sin usar: era **el último hardcode de Cuenca del frontend**.
3. `tickets.scss` → todo el bloque `.hd-stats-*` (cabecera, grid, tabla) de una sección inexistente…
   **incluida la regla de tema oscuro que yo mismo le había añadido** unos días antes, tematizando una
   tabla que nadie pinta.

**Por qué importa quitarlo y no solo dejarlo:** una lista de clientes de una regional, exportada y a mano,
es una invitación a que alguien la reutilice "porque ya está ahí" — que es justo el origen del bug de Mi
Panel del mismo día. Borrarla cierra esa puerta.

**Verificado:** build limpio y **0 referencias** a `CLIENTES_VALIDOS`, `validClientIds` o `hd-stats` en todo
el proyecto.
**Anotado (preexistente, no lo causó el tema oscuro):** varios `.scss` superan el presupuesto de 8 kB del
build (`ticket-messages-dialog` 14,17 kB, `transferencias-detalle` 13,13 kB, `vacaciones` 10,14 kB). Mis
bloques oscuros aportan ~8 líneas de 885 en el peor caso: el exceso venía de antes. Son avisos, no errores.

### [2026-09-07] Alertas de novedades: a quién le tocan, y no auto-avisarse
**Reporte:** el responsable del equipo PRUEBA recibía alertas de tickets de **Cuenca**. Salieron **dos
causas independientes**:

**1. El alcance estaba mal planteado.** La alerta usaba `/perfil/equipos-clientes`, que devuelve
**miembro ∪ responsable**. JPHP001 tiene una asignación **activa de ESPECIALISTA con alcance EQUIPO =
CUENCA**: pertenece a ese equipo aunque no lo dirija, así que Cuenca entraba en su alcance.
**Fix:** el endpoint marca cada equipo con **`esResponsable`** (aditivo, sin migración) y la alerta usa solo
`equiposQueLidero`. Además se añadió un segundo origen —**tickets asignados a mí**, vía `assigned_user_id`—
fusionado y deduplicado por número, y el poll dejó de estar restringido a responsables (los consultores
también reciben lo suyo). Quien no dirige ningún equipo sigue haciendo **1 petición por ciclo**.

**2. ⭐ El proxy de IT sirve respuestas del API CACHEADAS — incluidas las de permisos.** La asignación
`RESPONSABLE_EQUIPO → PRUEBA` de JPHP001 **venció el 2026-07-20** y el backend la filtra bien, pero:
`/api/admin/mis-roles/JPHP001` devuelve `["ESPECIALISTA"]` directo al backend y por el nginx del servidor,
y **`["ESPECIALISTA","RESPONSABLE_EQUIPO"]` por el dominio**. Ni un cache-buster en la query lo evita.
**Es infraestructura, fuera de nuestro código → reportado a IT.** Método de diagnóstico reutilizable:
comparar la misma respuesta por los tres caminos (backend directo / nginx / dominio) aísla al culpable.

**3. No auto-avisarse.** Nadie debe recibir alerta de su propia acción: si el asignado comenta, no se avisa
a sí mismo; si escribe el cliente, sí. Si el responsable cambia el estado o reasigna, avisa al asignado,
no a él.
- El listado de tickets **no dice quién modificó** (solo `modified_date`), y `ticket_espejo` tampoco.
- **`Ticket.usuarioUltimoMsg` NO sirve** aunque lo parezca: solo lo rellena `applyMessages`, llamada desde
  un único sitio (`searchTicketRemote`), así que llega vacío en el listado; y **descarta a propósito** las
  entradas automáticas, que son justo las de los cambios de estado/asignación.
- **Verificado contra el API real** (era el riesgo del diseño): la entrada automática trae al usuario REAL,
  no una cuenta de sistema → `system_message=true`, **`entry_user_id=DACM001`**, "El usuario DANIEL ARMANDO
  DEL CASTILLO MONTENEGRO cambió el estado".
- **Implementación:** el listado (1 petición) detecta candidatos por fecha; **solo para los de tipo
  'actividad'** se piden los mensajes y se miran **todas** las entradas posteriores a la marca —no solo la
  última, para que "comento yo y después el cliente" sí alerte—. Si todas son mías, silencio. Para los
  'nuevo' basta `usuarioIngreso` del propio ticket: **sin petición extra**. Si no hay rastro que atribuir,
  **se alerta igual**.

**Verificado con datos reales de producción:** #33444 (último evento: DACM001 cambió el estado) → silencio
para DACM001, alerta para los demás; #32976 (último: comentario de JPHP001) → silencio para JPHP001, alerta
para los demás. Y con los datos reales de JPHP001, su alcance pasa de {Banco del Austro, COAC 4 Ríos, COAC
Pruebas} a **solo {COAC Pruebas}**.

### [2026-09-08] Tema oscuro: los `color-mix(..., #fff)` dejaban filas casi blancas con texto claro
**Reporte:** en Administración, al pasar el ratón o seleccionar una fila, el texto blanco casi no se ve.

**Causa:** hover y fila seleccionada no usan un color fijo, sino una **mezcla anclada a blanco**:
`background: color-mix(in srgb, var(--brand) 4%, #fff)` → 96% blanco. Mi paso a oscuro cubrió las
**superficies** (`.admin-card`, `.grid thead th`…) pero no estas **mezclas**, así que la fila se volvía casi
blanca mientras el texto seguía claro. Medido: contraste **1.16** en hover y **1.09** en seleccionada.

**No era un caso aislado:** el patrón aparecía **44 veces en 8 archivos** (Administración, Bandeja y sus 3
subvistas, Vacaciones, y 2 diálogos). Además, `vacacion-dialog.ts` **no tenía bloque oscuro en absoluto** —
se saltó entero en el paso a oscuro porque sus estilos son *inline* en el `.ts`, no un `.scss`.

**Fix — parametrizar la base en vez de parchear regla por regla:** se sustituye el `#fff` del segundo
argumento por **`var(--mix-base, #fff)`**, y cada componente define `--mix-base: #fff` en `:host` y
`#1a222b` en su bloque `:host-context(...dark)`. Una variable por archivo arregla sus 6–9 reglas de golpe y
deja el modo claro **idéntico**.
**Resultado medido:** hover **1.16 → 12.6**, seleccionada **1.09 → 11.91**; en claro sigue en 9.32/8.75.

**Lección para el próximo paso a oscuro:** buscar no solo colores fijos, sino **mezclas ancladas a un color
claro** (`color-mix`, `lighten()`, `rgba(255,255,255,…)`) y **estilos inline en `.ts`**, que no aparecen al
recorrer los `.scss`.

### [2026-09-08] El N° de ticket de la alerta nunca fue azul: dos clases en el mismo elemento, gana la última

El botón del N° en el popup de novedades lleva **dos clases a la vez**: `class="ra-tk ra-tk-btn"`.
`.ra-tk` ponía el azul (`color: var(--mat-sys-primary)`) y `.ra-tk-btn` —definida **después** en la misma
hoja y con la **misma especificidad** (una clase)— ponía `color: inherit` para "no pisar el azul". El
resultado real es el contrario: **gana la última regla**, así que el N° heredaba el gris del texto de la
fila (`rgb(170,182,194)` en oscuro) y nunca se vio azul. El comentario del código afirmaba lo contrario.

**El orden del atributo `class` no decide nada**: entre reglas de igual especificidad manda el orden en el
que aparecen en la hoja de estilos. Un `color: inherit` no es neutral, es una declaración que compite.

**Fix:** poner el color **explícito** en `.ra-tk-btn` (`var(--mat-sys-primary, #048abf)`) en lugar de
`inherit`, y subrayarlo **siempre** —no solo en `:hover`— porque en táctil no hay hover que delate que se
puede pulsar. Medido: oscuro `#4fb8e0` sobre `#161d25` = **7.49**; claro `#00658d` sobre `#f0f4f9` = **5.86**.

**Trampa aparte, ya pisada dos veces en esta sesión:** los estilos de este componente van en un
**template literal** (`styles: \`...\``), así que un backtick dentro de un comentario CSS **corta la cadena**
y el build revienta con errores de TypeScript que no señalan el comentario. En estos `.ts`, comentarios sin
backticks.

### [2026-09-08] Tema oscuro: fondos `#fff` FIJOS en campos de escritura (letra blanca sobre blanco)

Reportado: en el modo oscuro, el área para responder una conversación de ticket era **blanca con la letra
también blanca** — no se veía lo que se escribía.

**Causa.** `.composer-input` tenía `background: #fff` **fijo**, mientras que `color` sí seguía al tema
(`var(--mat-sys-on-surface)`, que en oscuro es claro). El bloque oscuro del archivo **sí mencionaba**
`.composer-input`, pero solo para `border-color`: el fondo se quedó atrás. Contraste real: **1.0**.

**No era un caso aislado.** El mismo patrón estaba en el buscador de **Bandeja → Trabajo del equipo** y
**Bandeja → Solicitudes** (contraste **1.0** en los dos): `.td-search` es un contenedor con
`background: #fff` y el `input` dentro va `transparent`, heredando un color claro. `transferencias-detalle`
—hermano de esos dos— **sí tenía** la línea correcta (`.td-refresh, .td-search, .td-filter, .td-list-card
{ background: #131a21; }`); a los otros dos solo se les copió el `::placeholder`. Copia-pega a medias.

**Por qué el barrido anterior no lo cazó.** El de `--mix-base` buscaba `color-mix(..., #fff)`; esto es un
`#fff` a secas, otro patrón. Y un grep ingenuo de "¿el selector aparece en el bloque oscuro?" da **falso
negativo** cuando aparece pero para otra propiedad (justo el caso de `.composer-input`).

**Cómo detectarlo bien** (lo que funcionó): análisis estático que comprueba si el bloque oscuro redefine
**`background` para ese selector** —no si lo menciona— y, sobre todo, **medir contraste en el navegador en
oscuro** recorriendo `input, textarea, select, [contenteditable]`, **componiendo el alpha hacia arriba**
por los ancestros (si no, un `rgba` translúcido se lee como blanco opaco y salen falsos positivos, como ya
pasó una vez). Ojo: la mayoría de campos viven en **diálogos y subrutas**, así que hay que navegarlas — un
barrido de las pantallas principales dio "0 problemas" y sin embargo había tres bugs.

**Trampa de verificación:** tras reconstruir, el navegador seguía sirviendo los chunks viejos y el contraste
medía 1.0 igual. Antes de dar por malo un fix, confirmar que el bundle nuevo llegó (`grep` del color en
`dist/app/browser/*.js` — los estilos de componente lazy viajan **en los chunks JS**, no en `styles.css`).

**Medido tras el fix:** composer **1.0 → 13.13**; los dos buscadores de Bandeja **1.0 → 17.54**; modo claro
sin cambios (21). De paso, en el composer los recuadros de código pasan a velo blanco en oscuro
(`rgba(0,0,0,.05)` sobre fondo oscuro desaparecía).

### [2026-09-08] ⭐ Estilos de componente NO alcanzan al HTML puesto con `[innerHTML]` (hace falta `::ng-deep`)

Reportado: en oscuro **no se veía el texto de la conversación**. Medido: el contenedor `.conv-text` estaba
bien (contraste 7.95), pero dentro había 22 elementos con **`style="color: rgb(0,0,0)"` en línea** →
contraste **1.28**, texto negro sobre burbuja oscura.

**De dónde salen esos colores.** El HelpDesk guarda el HTML del mensaje tal cual se pegó (Word/Outlook), y
`serializePasted` (`ticket-utils.ts`) **los conserva a propósito** al pegar en el composer ("Conserva
color/fondo/fuente como estilo saneado"). O sea: entran por las dos puntas, leyendo y escribiendo.

**La trampa que costó un intento.** El primer arreglo —una regla normal en el bloque oscuro del `.scss`—
**compiló y no aplicó**. Causa: el cuerpo del mensaje se inserta con `[innerHTML]`, así que sus nodos **no
llevan el atributo `_ngcontent-*`** del componente y ninguna regla encapsulada les alcanza, por específica
que sea. Verificado en el DOM: el contenedor tenía `_ngcontent-ng-c4012762155` y el hijo insertado **solo
`style`**. La solución es `::ng-deep` (prefijado por `:host-context(...dark)` para no escaparse del
componente ni del tema).

**Cómo reconocerlo rápido:** si una regla está en el bundle (`grep` del selector en `dist/app/browser/*.js`)
pero `getComputedStyle` no la refleja, sospecha de encapsulación + contenido dinámico, no de caché.
*(Aunque el caché también engaña: en esta misma sesión el navegador sirvió chunks viejos dos veces y el
contraste medía igual de mal. Comprobar siempre que el bundle nuevo llegó ANTES de dar el fix por malo.)*

**Fix:** en oscuro se neutraliza el color en línea del cuerpo (`::ng-deep .conv-text *:not(a)` y lo mismo
para `.composer-input`) para que herede el del tema. Medido: **1.28 → 7.95**; en claro el negro original se
respeta (18.12). **Efecto secundario asumido:** en oscuro se pierde el color intencionado (un resalte en
rojo se ve del color del tema). Un mensaje ilegible es peor que un resalte perdido.

**Consecuencia latente:** las reglas que ya existían para `.conv-text :where(pre, code)` (fondo y borde de
los bloques de código) **tampoco aplicaban nunca**, por el mismo motivo. No se tocan aquí, pero conviene
saberlo si algún día se ven "sin estilo".
