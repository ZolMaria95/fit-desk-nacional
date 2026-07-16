# Fit-Daily (Angular) — Base de Conocimiento

**Proyecto:** Migración de Fit-Daily a Angular 22 + Material 3.
**Ubicación:** subcarpeta `app/` del repositorio Fit-Daily.
**Contexto:** reescritura por fases de la app legacy (HTML/CSS/JS vanilla en la raíz del repo).
El legacy sigue siendo la referencia funcional/modelo de datos — ver
[`../knowledge-base.md`](../knowledge-base.md).

> Este documento describe **solo la app Angular**.

---

## 1. Stack

- **Framework:** Angular 22 (standalone components, sin NgModules). **Zoneless** (sin
  `zone.js`): la detección de cambios es por Signals. ⚠️ Varios componentes de Material
  asumen zone.js → ver las notas de `inert`/sidenav más abajo.
- **UI:** Angular Material 22 (Material 3 / `mat.theme`) + CDK (drag & drop) + `mat-table`,
  `mat-datepicker` (date adapter nativo, locale `es-ES`, en [app.config.ts](src/app/app.config.ts)).
- **Reactividad:** Signals (`signal` / `computed` / `effect` / `afterRenderEffect`). RxJS solo
  para HttpClient (`firstValueFrom`) y eventos del router.
- **Routing:** **hash routing** (`withHashLocation()`), para servir en subcarpeta de GitHub Pages
  sin 404 al refrescar.
- **Lenguaje:** TypeScript 6 estricto.
- **Estilos:** SCSS (un `.scss` por componente + `styles.scss` global). Tipografía Roboto (pesos
  300–800, cargados en `index.html`).
- **Persistencia:** Firebase Realtime DB (REST) con fallback a `localStorage`.
- **API Helpdesk:** `helpdesk-api.fit-bank.com` vía proxy (`proxy.conf.json` del dev server en dev,
  Cloudflare Worker en prod).
- **PWA:** `@angular/service-worker` con auto-actualización de versión (ver §8).

---

## 2. Estructura

```
app/src/app/
├─ app.config.ts / app.routes.ts / layout/   # shell responsive (sidenav hamburguesa)
├─ core/
│  ├─ services/      # data, auth, helpdesk, shell (host de filtros del drawer)
│  ├─ interceptors/  # helpdesk-auth (Bearer + HD_SAFE)
│  ├─ guards/        # auth, sol, msc001
│  └─ models/        # session
└─ features/
   ├─ board/         # ✅ Kanban + sprints + dialogs
   ├─ tickets/       # ✅ grid de cards Helpdesk + conversación + asignación + estados
   │  ├─ ticket-card/   # card presentacional (header/cuerpo/pie + menú ⋮)
   │  ├─ ticket-messages-dialog/  # conversación + composer con formato
   │  └─ compose-dialog/  # editor de respuesta con formato en pop-up (B/I/U + pegado)
   └─ burndown, progreso, consultas, semanal, mi-panel, pendientes, login
```

---

## 3. Arranque / desarrollo

```bash
cd app && npm start                       # ng serve → http://localhost:4200
cd app && npm start -- --host 0.0.0.0     # accesible en la LAN → http://<IP>:4200
```

- **Solo Angular, sin `proxy.py`:** el dev server reenvía `/api` al Helpdesk vía el proxy integrado
  ([app/proxy.conf.json](proxy.conf.json) → `https://helpdesk-api.fit-bank.com`, configurado en
  `angular.json` serve `proxyConfig`). El API bloquea por CORS cualquier origen ≠ `helpdesk.fit-bank.com`,
  por eso el navegador **no** puede llamarlo directo; el reenvío server-side lo resuelve.
- **Las URLs del API son relativas** en dev (`helpdeskProxyUrl: ''` → base `/api/v1`); en prod es la
  URL del Cloudflare Worker.
- **Dev apunta a la Firebase real** (`fit-daily-ab113`) → el board (tareas/sprints/notas) se
  **comparte** entre todas las máquinas de la LAN. `DataService.init()` solo siembra nodos vacíos
  (no pisa datos). Backup de prod: `GET …/fit-daily.json` (solo lectura).
- **Login real** (necesario para el API): desde `login`, con credenciales del Helpdesk.

---

## 4. Capa core

### `DataService` ([data.service.ts](src/app/core/services/data.service.ts)) — port de `js/data.js`
Estado como **signals**: `sprints`, `stories`, `team`, `clients`.
- `ensureInit()` (la llama el `Layout`); CRUD de tareas (`addStory`, `updateStory*`, `approveStory`,
  `setWaitingClient`, `deleteStory`…); helpdesk locales (`hdNotes`/`hdActions`/`hdPendientes`).
- **Sprints:** `getActiveSprint`, `setActiveSprint`, `addSprint` (crea `SP-NN`, cierra el activo
  como `completed`, **migra** las tareas no-(done&approved) al nuevo), `updateSprint`, `deleteSprint`
  (no si es el único; no borra tareas).
- Sync en tiempo real (SSE Firebase + polling); persistencia Firebase REST / `localStorage`.

### `AuthService` ([auth.service.ts](src/app/core/services/auth.service.ts))
Sesión en `localStorage` (`fit-daily_session`) = `{ token (access), refreshToken, id, role, ... }`.
Login `POST /auth/login` → guarda `access_token` + `refresh_token` → `GET /users/me`.
Permisos: `esMSC001`, `esSupervisor`, `puedeVerMiPanel`, `puedeBorrarBoard`, `puedeGestionarTodo`.
- **`refreshSession()`**: `POST /auth/refresh` con el `refresh_token` → nuevo `access_token` (rota el
  refresh si el API manda uno). **Dedup**: varios 401 concurrentes comparten un solo refresh.
- **Refresh proactivo** (`scheduleProactiveRefresh`): programa el refresh **cada 20 min** (`REFRESH_EVERY_MS`),
  adelantándolo a ~30 s antes si el `exp` del JWT vence antes, y reprogramando tras cada refresh con el token
  rotado → la sesión **no se pierde mientras se usa la app** (p. ej. escribiendo un mensaje). Al volver el
  foco a la pestaña (`visibilitychange`) refresca si está por vencer (cubre el timer congelado en 2º plano).
  El 401 reactivo del interceptor queda como red de seguridad.
- `verifySession()`: valida contra `GET /users/me`; en 401 intenta `refreshSession()` antes de rendirse;
  si falla (o 403) limpia la sesión.

### `HelpdeskService` ([helpdesk.service.ts](src/app/core/services/helpdesk.service.ts))
Cliente del API del Helpdesk. **Regla clave: todas las ESCRITURAS del API son
`application/x-www-form-urlencoded` (NO JSON)** — con `HttpClient` se usa `HttpParams` como body.
Todas las llamadas usan el contexto **`HD_SAFE`** (no desloguea en 401/403).

**Catálogos (lectura, cache en `localStorage`):**
- `getHdUsers()` → **`GET /users/catalog`** (no `/users`, da 403). Filtra empleados por
  `role_description` (SOPORTE/ADMINISTRADOR/SUPERVISOR); NO por `client_id` (los internos de Soft
  Warehouse lo tienen lleno). Signal `hdUsers`.
- `getClients()` → **`GET /clients/catalog`**. Signal `clients`.
- `getTicketStatuses()` → **`GET /ticket-statuses/catalog`** → mapa `nombre → ticket_status_id`.
  Signal `statusNames`.

**Tickets — consulta SERVER-SIDE (rediseñado; el filtrado va EN la petición, no en el navegador):**
- **`loadFiltered(filtros, pageIndex, pageSize, sort)`** — consulta UNA página filtrada al API y deja
  `tickets` = esa página + `total` (signal) para paginar. Params:
  `limit`/`offset`, `modified_date_order|entry_date_order|priority_order = asc|desc` (orden),
  y los filtros: **`client_id` como LISTA separada por comas** (`client_id=4,5,6` — el API ignora el
  parámetro repetido, usa solo uno; ⚠️ **debe ir con comas**), `ticket_status_id`, `assigned_user_id`.
- **`loadAll()`** — set amplio (6×40 sin filtro) para dashboards: lo usan **Mi Panel** y la tab
  **Estadísticas** de Tickets. `statusIdOf(nombre)` traduce estado→código.
- Signals: `tickets` (página actual), `total`, `loading`, `status`, `hasMore`.
- `fetchMessages`, `searchTicketRemote`, `fetchTicketRaw`, `ticketAttachmentIds`,
  `attachmentUrl` (blob con auth, para `<img>`/descargas).
- ⚠️ El API solo acepta filtros server-side por **un** estado / **un** asignado, y `client_id` como
  lista por comas. "No finalizado" (excluir aprobados/cerrados) no se puede expresar → la tab
  Pendientes lo refina en el cliente (puede dejar páginas con <12).
- **Búsqueda por número (`searchTicketRemote`)**: SIEMPRE server-side, **lookup exacto**
  `GET /tickets/tickets/:id` (con el número completo; no substring ni filtrado en memoria). Mientras el
  filtro de número está activo, la vista muestra ese único ticket (o "no encontrado") y la paginación es
  **1 sola página** (`tabTotal` = 1/0, sin "más resultados").

**Escrituras (form-urlencoded):**
- `assignTicket(id, userId)` → `PUT /tickets/tickets/:id` con `assigned_user_id`.
- `setTicketStatus(id, nombre)` → `PUT /tickets/tickets/:id` con `ticket_status_id` (traduce el
  nombre a código vía el catálogo). El estado se escribe **por código, no por texto**. Nunca permite
  cambiar a **ABIERTO**.
- `sendMessage(id, detail, files)` → **un solo `POST /tickets/:id/messages`** (NO hay upload separado a
  `/attachments`): con adjuntos va **multipart** (`detail` + cada archivo en el campo **`attachments`**,
  igual que el Helpdesk original; el API responde con `attach_ids`); solo texto va **form-urlencoded** con
  **`FullEncodingCodec`** (percent-codifica TODO el valor — el codec por defecto de Angular deja crudos
  `;`/`=`, y esos del HTML/CSS pegado partían el `detail` upstream → el mensaje se publicaba vacío o a medias).

Modelo `Ticket` y funciones puras (`mapTicket`, `evaluarFechas`, `clasificar`, `applyMessages`,
`safeHtml`) en [features/tickets/ticket-utils.ts](src/app/features/tickets/ticket-utils.ts);
constantes (`CLIENTES_VALIDOS`, `CLASIF_*`, `PRIORITY_ACTIONS`, `EMPLEADOS`…) en
[helpdesk.constants.ts](src/app/features/tickets/helpdesk.constants.ts).

### Interceptor + Guards
`helpdeskAuthInterceptor`: añade el Bearer y, ante **401**, llama a `refreshSession()` (deduped) y
**reintenta** la request con el token nuevo (transparente); si el refresh falla, o ante **403**,
cierra sesión y redirige a `/login` (salvo requests `HD_SAFE`, que solo fallan). Sin bucles (el
reintento no re-entra al `catchError`; `/auth/*` excluido).
`authGuard` (sesión), `solGuard` (Mi Panel: Scrum Master/MSC001), `msc001Guard` (acciones de admin).

---

## 5. Rutas y features ([app.routes.ts](src/app/app.routes.ts))

Lazy-loaded bajo `Layout` (`authGuard`); `/` → `/board`. Migración **completa**: todas las vistas
portadas a Angular.

| Ruta | Estado |
|---|---|
| `login`, `board`, `tickets`, `semanal`, `mi-panel`, `pendientes` | **Hecho** |
| `burndown`, `progreso`, `consultas` | **Hecho** (ver §7e) |

### Shell responsive ([layout/](src/app/layout/)) — menú hamburguesa lateral

Diseño **mobile-first**. El `Layout` es un `mat-sidenav-container`:
- **Drawer** = (arriba) **host de filtros dinámicos** + (debajo) **submenús** de navegación
  (`mat-nav-list`: grupo Scrum y grupo Helpdesk) + pie con usuario/logout.
- **Responsive** con CDK `BreakpointObserver('(min-width: 900px)')` → `isDesktop`, más un flag por ruta
  `data.collapsibleNav`. `fixed = isDesktop && !collapsibleNav`: si es fijo → `mode="side"` siempre abierto,
  sin ☰; si no (móvil/tablet **o Board en escritorio**) → `mode="over"`, ☰ en topbar slim.
- `opened = computed(() => fixed() || drawerOpen())` (atómico con `mode`, deriva de `fixed`). `drawerOpen`
  es el estado manual del ☰ en overlay. Al navegar se cierra (NavigationEnd + `(click)` en la nav-list).
- **Board** lleva `data: { collapsibleNav: true }` → oculta el menú aun en escritorio (Kanban a ancho completo).
- ⚠️ **Bug de `inert` en zoneless (resuelto):** en `over`, Material pone `inert` en `.mat-drawer-content`
  (focus-trap) y al cerrar/cambiar a `side` **no lo quita** (la limpieza por CD no corre sin zone.js) →
  el contenido se ve pero no acepta clics/scroll hasta recargar. Fix en `Layout`: el contenido se considera
  inerte **solo** cuando hay overlay abierto (`over && opened`); en `side` o con drawer **cerrado** se quita
  `inert` vía `afterRenderEffect` (reacciona a fixed/opened) **+ `MutationObserver`** (lo quita apenas Material
  lo pone). Si reaparece un bloqueo, revisar este bloque.
- **`ShellService`** ([shell.service.ts](src/app/core/services/shell.service.ts)): `filters` (signal de
  `TemplateRef`), `setFilters`/`clear`. Cada vista publica su panel de filtros como `<ng-template>` y el drawer
  lo renderiza con `ngTemplateOutlet`. **Tickets** lo publica con `afterNextRender` (no `effect`, que en
  zoneless bloqueaba). Hoy solo Tickets lo usa (Board mantiene sus filtros internos).

---

## 6. Board ([features/board/](src/app/features/board/))

Kanban reactivo por signals (sin `refreshBoard`). Look de **muro de post-its**: fondo pizarra,
cards coloreadas por **cliente** (`clientStyle`/`cardTilt` en `board-utils.ts`), prioridad como
badge, avatar = **código de usuario** (igual que los filtros).

- **`card-detail-dialog/`** — crear/editar tarea: buscadores (`MatAutocomplete`) de **asignado** y
  **cliente** desde el API, fecha con **datepicker**, progreso, estado. Al escribir un **N° de
  ticket** consulta el ticket y autocompleta (título/cliente/asignado). **Al crear** con ticket + técnico,
  **siempre** se empuja la asignación al API (`assignTicket`, sin omitir por coincidir con el prefill); en
  edición se empuja al cambiar el asignado (y el board reconcilia al abrir). **El cliente solo es editable
  al crear o, en edición, para el **Helpdesk (MSC001)** en tareas **sin ticket** (`showClientEditor`);
  las tareas **con ticket** muestran el cliente del ticket (read-only) y lo fija el sync del board.
- **`sprint-dialog/`** — crear/editar/borrar sprint.
- **`confirm-dialog/`** — confirmación reutilizable (variante "escribí BORRAR").

**Funciona:** drag&drop (CDK) con permisos, filtros (prioridad/asignado/cliente/**N° ticket**), progreso,
certificar, esperando cliente, borrar card / Borrar Board. **Regla:** una tarea que salió de To Do
**no puede volver** (drag y modal). Las done-finalizadas **salen del board a los 2 días**.
**Permiso `puedeOperar(card)`** (mover la tarea por drag + marcar sus checks): el **asignado**, el
**Helpdesk (MSC001)** o un **Supervisor** (`puedeGestionarTodo`). Si alguien **sin permiso** intenta moverla
o marcar un check, sale una **advertencia** (`avisoSinPermiso`) y no se aplica (la card vuelve / el check se
desmarca). No se bloquea/deshabilita el control: se deja intentar para poder avisar.

**Todo cambio de columna pide confirmación** (`ConfirmDialog`): por **drag** (`To Do→In Progress` usa
`canStartWork`: solo permisos —técnico asignado / Helpdesk— + confirmación de inicio; el resto un confirm
"Mover tarea") y por el **check "Certificado"** (`onCert`, mueve a Finalizado; si se cancela, se desmarca el
checkbox con `ev.source.checked = false`). ⚠️ **Sin límite WIP:** un técnico puede tener N tareas en progreso
(el tope de 2 se quitó).

**Filtros "Asignado a" y "Cliente"** (mismo patrón): `mat-select` **multiple** poblado con los valores
**presentes en las tareas del board** —empleados por **nombre completo** (`assigneeChips`) y clientes por
nombre (`clientChips`)—, ordenados. Lo elegido se muestra en **globos `[… |x]`** en **color pastel**
(`pastel()` de board-utils; en asignados `shortName` = 1.ª+3.ª palabra, nombre completo en el tooltip; los de
cliente acotan con ellipsis). La "x" quita (`removeAssignee`/`removeClient`); el panel tiene un **encabezado
`.sel-head`** con **buscador** (`buscarAsignado`/`buscarCliente` → `assigneeOptions`/`clientOptions`) y
**"Seleccionar todos / Quitar todos"** (`toggleAllAssignees`/`toggleAllClients`). Sin selección = todos.
Estado: `activeAssignees`/`activeClients` (Set) y `selectedAssignees`/`selectedClients` (array para el select).

**Barra de sprint (encima del board):** selector + **✏ editar** + **＋ nuevo** + banner
(nombre/objetivo/fechas/capacidad/estado).

**Integración Helpdesk (para tareas con ticket):** 4 columnas (no hay Devuelto/Otros).
- **Al abrir** el board, `syncTicketStatuses()` consulta el estado del ticket de cada tarea y la
  **ubica según `statusFromTicketEstado`** (`board-utils.ts`):
  `EN PROCESO→In Progress`, `INFO PENDIENTE CLIENTE→In Progress`+esperando,
  `INSTALADO PARA CERTIFICACIÓN→En Certificación`, `ENTREGADO→Done`,
  `APROBADO`/`CERRADO POR EL CLIENTE→Done` con el **check marcado**, **cualquier otro → To Do**
  (sin tocar el ticket). El estado del ticket se guarda en `story.hdEstatus` y se muestra como
  **badge** en la card. También **fija el cliente** de la tarea con el `client_id` del ticket y
  **reconcilia la asignación**: si la tarea tiene asignado y el ticket no lo refleja, empuja la
  asignación al API (`assignTicket`) — cubre los asignados locales (auto-asignación al arrastrar, etc.).
- **Check "Finalizado"** (antes "Aprobado") en Done: **read-only para tareas CON ticket** (lo define el
  ticket: APROBADO/CERRADO lo marcan, el resto lo desmarcan). Para tareas **SIN ticket** es **editable**
  (`onFinalize` → `approveStory`/`unapproveStory`, con confirmación al marcar y desmarcado si se cancela).
- **Escritura del estado** (drag manual / botón esperando / modal): `in_progress→EN PROCESO`,
  `review→INSTALADO PARA CERTIFICACIÓN`, `done→ENTREGADO`, esperando`→INFO PENDIENTE CLIENTE`
  (`HD_ESTADO_POR_STATUS`/`HD_ESTADO_ESPERANDO`) — consistente con la lectura.
- **Asignación** del ticket al asignar en el modal.
- **"Ver conversación del ticket"** → abre el `TicketMessagesDialog` (ver §7).

---

## 7. Tickets ([features/tickets/](src/app/features/tickets/))

Port de `js/helpdesk-panel.js`, **rediseñado a consulta server-side** (decisión del cliente/jefe:
el filtro va EN la petición al API, no se trae todo para filtrar en el navegador). **Grid de cards
responsive** (no tabla), tabs (**Pendientes** / Asignados a mí / **Todos los clientes** / Estadísticas)
y filtros **Cliente** (multi-selección), **Estatus** y **Ordenar por**, + búsqueda por número (remota).
**Pendientes** es la tab por defecto.
> Se **quitaron** los filtros derivados que el API no soporta: Clasificación, Acción y la tab
> **Prioritarios** (la función `clasificar()` se conserva porque Mi Panel la usa). "Generales" se
> renombró a **"Todos los clientes"**.

- **Grid de cards** (`.ticket-grid`, [tickets.html](src/app/features/tickets/tickets.html)): **2 col
  <540px / 4 col 540–899px / 5 col ≥900px** con `minmax(0, 1fr)`, **sin scroll horizontal** en ningún
  contenedor. Estadísticas conserva su tabla-resumen. Las **tabs** quedan en el contenido (segmento
  scrollable); los **filtros** viven en el **drawer** del shell (ver §5, `ShellService` + `<ng-template #filtersTpl>`).
- **`TicketCard`** ([ticket-card/](src/app/features/tickets/ticket-card/)) presentacional (inputs + outputs,
  sin servicios):
  - **Cabecera** (coloreada por **cliente**, vía `clientStyle` de board-utils — cada cliente su tinte+acento):
    `#número` + botón **"Crear tarea"** (→ `CardDetailDialog` precargado; si el ticket **ya tiene tarea en
    el board** —`ticketsEnBoard`, de `data.stories()`— se reemplaza por la etiqueta **"en board"**) + nombre
    del **cliente**.
  - **Cuerpo**: asunto a **2 líneas** (`-webkit-line-clamp`), badges de **estado** (`estadoStyle`) y **tipo**,
    subsección de fechas (📅 ingreso "10 jun 2025" · 🔄 modificación "Hoy 9:42" / "13 jun 16:05") y **área de
    nota editable** (clic → textarea inline, no en el menú).
  - **Pie**: chip de asignado con **punto de color + "Nombre Apellido"** (`shortName` de board-utils =
    1.ª+3.ª palabra; tooltip con el nombre completo) + **toggles visibles ⚑ acción / ⏸ pendiente** +
    **"Ver conversación"** + **menú ⋮** (asignar / cambiar estado). Input opcional **`mostrarDias`** →
    badge "Nd" de días sin movimiento (lo activa **Mi Panel**, no Tickets). La card entera abre la
    conversación; Crear tarea, toggles, área de nota y ⋮ hacen `stopPropagation`.
  - Colores en [tickets-card-utils.ts](src/app/features/tickets/tickets-card-utils.ts): `estadoStyle`
    (**color por estado real** del catálogo, ≈7 tonos), `tipoStyle` (INCIDENCIA/REQUERIMIENTO/CONSULTA),
    `fmtIngreso`/`fmtMod`. **Solo modo claro** (la app es light-only por el bug de Safari/M3 en `styles.scss`).
- **Consulta server-side** (`HelpdeskService.loadFiltered`, ver §4): cada cambio de tab/filtro/orden/página
  hace **una** consulta con los params correspondientes y `tickets` = esa página + `total`. SIN mensajes
  (se piden al abrir la conversación). Hay **auto-consulta al entrar** (espera el catálogo de clientes y
  llama `refresh()`) y un **botón ↻**.
- **Filtros server-side** (`buildFilters()`):
  - **Cliente** = `client_id` (multi-selección; chips removibles arriba del select; se mandan como
    **lista por comas**). El dropdown se puebla del **catálogo** (`hd.clients()`), no de los tickets cargados.
  - **Estatus** = `ticket_status_id` (vía `statusIdOf`). **Asignados a mí** = `assigned_user_id`.
  - **Ordenar por**: modificación/ingreso/prioridad (`<campo>_order`). ⚠️ solo `modified_date_order` está
    confirmado en el API; ingreso/prioridad siguen la misma convención (verificar).
- **Tabs:** **Pendientes** manda además los `client_id` de `CLIENTES_VALIDOS` (los 14 válidos, mapeados por
  nombre→id) y refina **operativos** en cliente (excluye finalizados — el API no excluye estados); **Todos
  los clientes** sin filtro de cliente; **Asignados a mí** por `assigned_user_id`; **Estadísticas** hace
  `loadAll()` y agrega Por Cliente / Por Estatus (sin "Por Clasificación").
- **Paginación server-side** (`mat-paginator`, 12/pág): `paginatorLength = total` del API; indicador
  **"Página X de Y · hay más en la siguiente"**. Cambiar tab/filtro/orden resetea a la página 0 y reconsulta.
  Mensaje de estado: **"N cargados de TOTAL del sistema"**.

- **Diálogos desde la card:** **Asignar** → `AssignTicketDialog` (lista buscable; asigna en el API);
  **Cambiar estado** → `setTicketStatus` con la lista del catálogo (`statusOptions`, nunca ABIERTO);
  **Crear tarea** → `CardDetailDialog` precargado; **Nota/acción/pendiente** → `DataService` (local).
- **Conversación** (`ticket-messages-dialog/`): mensajes clasificados (empleado/cliente/sistema),
  adjuntos por mensaje, **imágenes embebidas hidratadas con auth** + **lightbox** (popup, no pestaña),
  adjunto a nivel ticket, y **composer con formato** para responder (+ adjuntos). Reutilizado por el board.
  Los mensajes se **paginan** (bloque de 15 más recientes + **"Ver mensajes anteriores"**): solo se
  procesa/hidrata el bloque visible, no todos de golpe. **Al abrir verifica la sesión** (`verifySession`):
  si expiró, muestra un estado **"Iniciar sesión"** (→ login) en vez de cargar vacío.
  - **Composer con formato (`contenteditable`):** escribir o dar formato con la toolbar
    **negrita/cursiva/subrayado** (`document.execCommand`) + botón **`</>`** (bloque de código,
    `insertCodeBlock`) viaja como **HTML**. **Pegado saneado** (`clipboardToHtml`/`sanitizePastedHtml` en
    `ticket-utils`, handler `(paste)`): conserva negrita/cursiva/subrayado, color/fondo/fuente, enlaces,
    encabezados (`h1-h6`→negrita), **viñetas** (`ul/ol/li`) y **código** (`pre/code`); descarta el ruido
    (`<style>`/`<meta>`/clases/scripts) que el backend tiraba (publicaba vacío). **Markdown en texto plano**:
    `**negrita**`, `*cursiva*`, `` `código` ``; si el texto plano trae markdown se usa la ruta de texto plano
    (respeta `\n\n` como párrafos y la sangría con `&nbsp;`), porque el `text/html` de esas fuentes mete los
    párrafos en bloques y los pega. **Arrastrar y soltar** archivos sobre el área de mensaje los adjunta
    (chips con ✕). El autor del mensaje se muestra con el **nombre completo** (`entry_user_name`, fallback al
    código `entry_user_id`). Botón **⤢ ampliar** → `compose-dialog/` (mismo editor con pegado/`</>` en pop-up).
  - **Layout del diálogo (flex column):** piso de altura `min(520px, 88vh)` (lectura cómoda con pocos
    mensajes) y techo 88vh; la conversación (`.conv-body`, **`min-height: 0`**) crece/encoge y scrollea; el
    **composer es flex y puede encoger** (tope 55vh): el área de texto scrollea dentro y la **fila de Enviar
    queda fija abajo, siempre visible** (antes un mensaje largo la empujaba fuera de pantalla y la cortaba).

---

## 7b. HelpDesk Semanal ([features/semanal/](src/app/features/semanal/))

Port de `js/semanal.js`. **Rotación de soporte por semana** (semanas **Vie→Jue**, relevo el viernes;
`getWeekFriday`). Reactivo por signals + un `rev` que se incrementa tras mutar (el soporte semanal en
`DataService` es objeto plano, no signal).

- **Calendario mensual** (`calendarCells`, grid 7×6): cada celda coloreada por consultor; el **viernes**
  ancla muestra el chip con el nombre corto. Navegación mes anterior/siguiente/Hoy. Clic en celda →
  selecciona la semana (tickets) y abre el modal de asignación.
- **Resumen lateral:** semana actual, **tickets resueltos** de la semana seleccionada (alta/baja con
  `addWeekTicket`/`removeWeekTicket`), **próximas 8 semanas** y **resumen de asignaciones** (conteo por consultor).
- **Color por consultor:** `PALETTE` de 12 (bg+fg), mapeado por orden de `data.team()` (`colorMap`).
- **Asignación** (`semanal-assign-dialog/`): consultor (de `data.team()`) + notas; "Quitar asignación".
  Persiste vía `DataService.setWeekAssignment`/`clearWeekAssignment` (datos en `weeklySupport`).

---

## 7c. Mi Panel ([features/mi-panel/](src/app/features/mi-panel/))

Port de `js/sol-panel.js`. Dashboard del **Scrum Master** (ruta con `solGuard`). 4 KPIs + 4 bloques:
1. **Acciones pendientes** — tickets marcados con Acción (`hdActions`).
2. **Esperando cliente** — tickets `clasificacion === 'CLIENTE PENDIENTE' && diasSinMovimiento >= 3`.
3. **Próximos a vencer** — stories no-Done con `dueDate` en ≤3 días (incl. vencidas); clic abre `CardDetailDialog`.
4. **Por asignar** — stories en To Do **sin asignado** (`!s.assignee`); botón **Asignar** abre `CardDetailDialog`.

- Los bloques 1 y 2 reutilizan **`app-ticket-card`** (mismo diseño que Tickets) con `[mostrarDias]="true"`
  (badge "Nd"); cablean los mismos handlers (conversación, crear tarea, asignar, estado, nota, ⚑/⏸).
- **Solo clientes válidos**: ambos bloques filtran por `CLIENTES_VALIDOS` (`ticketsValidos`) — Mi Panel no
  muestra pendientes de clientes ajenos.
- Lee `hd.tickets()`; al entrar **siempre** hace `hd.loadAll()` (carga amplia) + botón **↻**. Mapas planos
  (`hdActions`/`hdNotes`) en signals locales que se re-setean tras mutar.

---

## 7d. Pendientes ([features/pendientes/](src/app/features/pendientes/))

Tickets marcados como pendientes (⏸ desde Tickets) con **recordatorio fecha + hora**. Datos en
`hdPendientes` (`{ ticket, asunto, clienteRaw, addedAt, dueDate, dueTime, paused, lastAlerted }`).

- **Marcar pendiente** (en Tickets): abre `pendiente-date-dialog/` (datepicker + `input[type=time]`) y
  exige fecha/hora; cancelar → no se marca. `setHdPendiente(... dueDate, dueTime)`.
- **Panel:** tabla ordenada por recordatorio más próximo; badge de estado (Recordar/Pausado/Programado/
  Sin fecha) y fila resaltada si está **vencido**. Menú por fila: **Postergar** (reabre el diálogo),
  **Pausar/Reanudar**, **Quitar**. Clic en el `#ticket` abre la conversación. `updateHdPendiente(patch)`.
- **Alerta** (en [layout.ts](src/app/layout/layout.ts)): `checkReminders()` al iniciar + cada 5 min. Si un
  pendiente tiene `dueDate/dueTime` pasados, no está pausado y no se alertó hoy (`lastAlerted !== hoy`),
  muestra un **snackbar** ("N tickets pendientes…") con acción **"Ver pendientes"** (→ `/pendientes`) y
  marca `lastAlerted = hoy`. Así **vuelve a saltar cada día** hasta que se pause o se redefina la fecha
  (postergar/reanudar limpian `lastAlerted`).

---

## 7e. Burndown / Progreso / Consultas ([features/](src/app/features/))

Port de `js/burndown.js` / `progreso.js` / `consultas.js`. Standalone + signals; usan la capa de datos
existente (`getProgress`/`addProgressEntry`, `getQueries`/`addQuery`/`resolveQuery`, sprints/stories).

- **Progreso:** lista de avances (avatar, historia, autor, fecha, notas, horas) orden desc; filtros por
  **historia** (del sprint activo) y **miembro**; formulario inline de **nuevo registro**.
- **Consultas:** tarjetas (id, título, prioridad/estado, descripción, respuesta); pestañas **Todas /
  Abiertas / Resueltas** (abiertas primero); **nueva consulta** y **resolver** inline (respuesta + autor).
- **Burndown:** métricas del sprint (% completado, en progreso, pendientes, días restantes), **gráfico en
  `<canvas>`** (línea ideal punteada + línea real + punto "hoy"; dibujado en `afterRenderEffect`) y barras
  de **velocidad** (tareas finalizadas por sprint). ⚠️ la línea "real" es **aproximada** (no se guardan
  snapshots diarios del trabajo restante; se estima a partir de las finalizadas) — igual que el legacy.

---

## 8. Theming, datos y persistencia

- **Tema** ([styles.scss](src/styles.scss) + [_theme-colors.scss](src/_theme-colors.scss)): paleta
  de marca FitBank (primary `#048ABF`, secondary `#30BAD9`, tertiary `#F2811D`); vars `--brand`,
  `--accent`, `--bg` (`#F2F2F2`). Diálogos con `surface` sólido forzado en `styles.scss`. Datepicker
  con date adapter nativo (locale `es-ES`).
- **Seeds:** [public/data/](public/data/). **Claves `localStorage`:** `fit-daily_session` y caches HD
  (`fit-daily_hd_users`/`_roles`/`_clients`/`_statuses`); los **datos del board van a Firebase** (ya
  no a `fit-daily_v1`, salvo que se vuelva al placeholder).
- **Entornos:** dev → **Firebase real** + API por **proxy del dev server** (`proxy.conf.json`,
  URLs relativas); prod → Firebase + Cloudflare Worker (`fileReplacements`).
- **`proxy.py`** (raíz) quedó como alternativa; el flujo actual usa el proxy integrado de `ng serve`
  (no requiere Python). Soporta GET/POST/PUT/PATCH si se usa.

### PWA / actualización automática (`@angular/service-worker`)
- Activo **solo en producción** (`provideServiceWorker(..., enabled: !isDevMode())` en `app.config.ts`;
  `"serviceWorker": "ngsw-config.json"` en el build de prod de `angular.json`). En dev/`ng serve` no corre.
- Config: [ngsw-config.json](ngsw-config.json) (assetGroups: app / static-assets / assets + dataGroup de
  `/data/*.json`) + [public/manifest.webmanifest](public/manifest.webmanifest).
- Lógica en el **componente raíz** [app.ts](src/app/app.ts): ante `VERSION_READY` purga del `localStorage`
  solo lo desechable —**whitelist que CONSERVA** `fit-daily_session` (token + refresh), `fit-daily_v1` y
  `fit-daily_hd_actions`/`_notes`/`_sol_notes`— y `window.location.reload()`. `checkForUpdate()` al iniciar,
  en `visibilitychange` y cada 60 s. Así el equipo recibe la versión nueva **sin borrar caché y sin perder
  la sesión**.
- **GitHub Pages no permite headers**: igual funciona (el navegador revalida el script del SW y Angular
  cache-bustea `ngsw.json`); la detección puede tardar unos minutos. Build con `--base-href /fitScrum/angular/`
  (scope correcto del SW).

---

## 9. Convenciones

Standalone components; `inject()`; signals/`computed`; `templateUrl`/`styleUrl` por archivo;
comentarios y UI en **español**; se conservan nombres de métodos del legacy. Budget de estilos por
componente: 8 kB / 16 kB en `angular.json`.

---

## 10. Estado de la migración

| Área | Estado |
|---|---|
| Infra (core, auth, guards, interceptor, theming) | ✅ |
| Shell responsive (sidenav hamburguesa + host de filtros) | ✅ |
| Login | ✅ |
| Board (Kanban + sprints + integración Helpdesk) | ✅ |
| Tickets (grid de cards responsive + conversación + asignación + estados + mensajes) | ✅ |
| HelpDesk Semanal (rotación de soporte + calendario + tickets resueltos) | ✅ |
| Mi Panel (dashboard Scrum Master: KPIs + acciones/cliente-pendiente/vencer/asignar) | ✅ |
| Pendientes (tickets marcados ⏸ desde Tickets) | ✅ |
| Catálogos del API (usuarios, clientes, estados) | ✅ |
| Burndown (métricas + gráfico canvas + velocidad) | ✅ |
| Progreso (avances + filtros + alta) | ✅ |
| Consultas (tarjetas + filtros + alta + resolver) | ✅ |
| PWA / actualización automática (service worker) | ✅ |
| Tickets server-side (filtros/orden/paginación en la consulta) + refresh token | ✅ |
| TUsuariosPizza | ❌ se elimina |

**Migración a Angular: completa.** Quedan mejoras/dependencias externas (p. ej. que el API acepte
filtros por lista para paginación 100% exacta).

### Mapa legacy → Angular
| Legacy | Angular |
|---|---|
| `AppData` / `App` sesión / `HelpdeskAuth` | `DataService` / `AuthService` / `AuthService`+interceptor |
| `App.hdFetchSafe` | contexto `HD_SAFE` |
| `App.assignHdTicket` (sonda 12 campos JSON) | `HelpdeskService.assignTicket` (PUT `assigned_user_id` form) |
| `_pushHdEstado` (PATCH JSON) | `setTicketStatus` (PUT `ticket_status_id` form + catálogo) |
| `HelpdeskPanel` (tabla/mensajes/adjuntos) | `features/tickets/` + `HelpdeskService` |
| `Board` IIFE | `features/board/` |
| `App.refreshBoard()` | reactividad por signals |
| `alert/confirm/prompt` | `MatSnackBar` / `ConfirmDialog` |
