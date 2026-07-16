# 09 — Fase 3: el frontend apunta a Quarkus (slice 1: paridad de lectura)

Desvío de la capa de datos del board de **Firebase → Quarkus**, detrás de una
**bandera de environment**, sin tocar las vistas ni la producción de GitPages
(Strangler Fig). Este primer incremento es **solo lectura**.

> **Actualización 2026-07-07 — Board multi-equipo.** El board dejó de ser único/global:
> ahora es **por tablero/equipo** con **selector de Equipo/Tablero** y visibilidad por
> Asignaciones (`/api/legacy/boards`, `/sprints?board=`, `board` en cada story). Al crear un
> equipo nace su Board + sprint activo; **Quito** quedó operable (vacío, `SP-01` activo) y
> Cuenca intacto. Además, la **carga del board es SOLO LECTURA** contra el HelpDesk (se quitó
> la reasignación automática de tickets en `syncTicketStatuses`). Ver [decisiones.md](../decisiones.md) 2026-07-07.

## Cómo probarlo (local)

```bash
# 1) Postgres arriba + datos cargados (Fase 2). Si ya corriste el ETL, la data persiste.
cd backend && docker compose up -d
java -jar target/quarkus-app/quarkus-run.jar        # Quarkus en :8080

# 2) Angular apuntando a Quarkus (config nueva 'quarkus'):
cd app && ng serve -c quarkus                        # dev server en :4200
#    → el board se pinta con la data de Postgres, NO de Firebase.

# Producción / uso normal siguen en Firebase (sin cambios):
ng serve            # o el build de prod → dataBackend='firebase'
```

## Cómo funciona la bandera

- `src/environments/environment.ts` gana dos campos: `dataBackend: 'firebase' | 'quarkus'`
  (default **firebase**) y `quarkusApiUrl` (`http://localhost:8080`).
- `environment.prod.ts` mantiene `dataBackend: 'firebase'` → **GitPages/prod intactos**.
- `environment.quarkus.ts` (nuevo) pone `dataBackend: 'quarkus'`. La config
  `quarkus` de `angular.json` (build + serve) lo activa con file-replacement, igual
  que `production`. Se usa con `-c quarkus`.
- `DataService.useQuarkus()` decide el ruteo. En modo Quarkus:
  - **Lecturas** (`fbGet`, `initFromQuarkus`) → `GET {quarkusApiUrl}/api/legacy/<nodo>`.
  - **Escrituras (slice 2)** → `PUT/PATCH/DELETE {quarkusApiUrl}/api/legacy/<path>` (Postgres);
    **NUNCA** a Firebase (regla de oro). Los mismos `fbPut/fbPatch/fbDelete` del DataService
    rutean al backend en vez de a Firebase.
  - **SSE/polling de Firebase** → apagados; el board refleja las escrituras en memoria y
    persiste en Postgres (se ven al recargar vía `initFromQuarkus`).

## Endpoints legacy-compatibles (backend)

`com.fitdesk.api.LegacyReadResource` reconstruye las formas de los nodos de Firebase
desde el modelo relacional. GET bajo `/api/legacy/`:

| Nodo | Forma devuelta |
|---|---|
| `stories` | `{ stories: { "TA-001": {…} } }` |
| `sprints` | `{ active, sprints:[…] }` |
| `users` | `{ users:[{id,name,role,color}] }` |
| `progress` | `{ entries:[…] }` |
| `queries` | `{ queries:[…] }` |
| `weeklySupport` | `{ weeks:{ "YYYY-MM-DD": {…} } }` |
| `hdNotes` / `hdActions` / `hdPendientes` | mapas keyed por nº de ticket |
| `solNotes` | `{}` (no se materializó en el legacy) |

## Paridad: funcional, no byte-idéntica (a propósito)

La data sale **normalizada** (el ETL reconcilió identidad), así que el board pinta
lo mismo pero con ids limpios:

| Campo | Firebase (legacy) | Quarkus (/api/legacy) |
|---|---|---|
| `assignee` | mezcla `KIMA001` / `MSC001` / `KVAZQUEZ` / `SC` | **id del HelpDesk** unificado: `KIMA001` / `MSC001` / `KVAZQUEZ` |
| `client` | mezcla `42` / `6` / `erco` | slug: `gualaquiza` / `copac_austro` / `erco` |
| resto (status, ticket, priority, sprint, approved, fechas…) | — | **idéntico** |

`assignee` sale como **id del HelpDesk** (no el codigo local): `session.id` ES el id del
HelpDesk, así "Asignados a mí" y el sync `board→ticket` (`syncTicketStatuses`) comparan el
mismo espacio de id. El board muestra el nombre vía `hdUsers`; la escritura acepta ambos
(`usuarioBy`: codigo local o helpdesk id). Emitirlo como id local rompía "Asignados a mí" y
generaba un flood de `PUT /tickets/tickets/:id 404` (reasignaba al id local, que el HelpDesk
no conoce). Verificado: 100 tareas, 4 sprints (SP-04 activo), 12 usuarios, 132 notas, 28
acciones, 15 pendientes, 18 semanas.

## Reglas respetadas

- **Firebase = solo lectura**: en modo Quarkus ninguna escritura llega a Firebase.
- **GitPages/prod intactos**: default `firebase` en dev y prod; Quarkus solo con `-c quarkus`.
- **Vistas sin cambios**: toda la traducción vive en el backend + el ruteo de `DataService`.

## Slice 2 (implementado): escrituras a Postgres

Los write paths del DataService ahora persisten en Postgres imitando la semántica de
los nodos de Firebase RTDB. Backend en `com.fitdesk.api.LegacyWriteResource` +
`com.fitdesk.legacy.LegacyWriteService`:

| Frontend (fb*) | Endpoint | Efecto en Postgres |
|---|---|---|
| `fbPatch('stories/stories/{id}', campos)` | `PATCH /api/legacy/stories/stories/{id}` | UPDATE parcial de la fila `tarea` |
| `fbPatch('stories/stories', {id: task})` | `PATCH /api/legacy/stories/stories` | UPSERT (crear tarjeta) / deep-path `id/campo` |
| `fbDelete('stories/stories/{id}')` | `DELETE /api/legacy/stories/stories/{id}` | borra `tarea` (desliga progreso/consulta) |
| `persist('sprints', nodo)` | `PUT /api/legacy/sprints` | reconcilia sprints + puntero `active` |
| `persist('hdNotes'|'hdActions'|'hdPendientes', nodo)` | `PUT /api/legacy/…` | reconcilia la tabla al nodo |
| `persist('weeklySupport'|'progress'|'queries', nodo)` | `PUT /api/legacy/…` | reconcilia la tabla al nodo |
| `persist('solNotes', nodo)` | `PUT /api/legacy/solNotes` | no-op (sin tabla en el modelo) |

Notas de diseño:
- **PATCH** no existe en JAX-RS → se define `com.fitdesk.api.PATCH` (`@HttpMethod("PATCH")`).
  Requiere `quarkus.http.cors.methods` con `PATCH` (los PUT/PATCH/DELETE disparan preflight).
- **PUT = reemplazo del nodo entero** (el front hace PUT del nodo completo): el backend
  **reconcilia** (upsert presentes, borra ausentes) → quitar una nota = borrarla.
- Identidad/cliente se resuelven en escritura igual que en lectura: `assignee`=codigo
  local→`usuario`, `client`=slug→`cliente` (con respaldo por helpdesk id).
- Verificado por curl: PATCH campo, crear/borrar tarjeta, deep-path, reconcile de overlays;
  la data vuelve a 100 tareas tras revertir.

## HelpDesk vía Quarkus (implementado: proxy transparente)

Quarkus pasa a ser la **única fuente del frontend** también para el HelpDesk:
`com.fitdesk.api.HelpdeskProxyResource` reenvía `/api/v1/**` a
`helpdesk-api.fit-bank.com/api/v1/**` (config `fitdesk.helpdesk.base-url`).
Reemplaza el proxy del dev server de Angular y el Cloudflare Worker.

- **Relay 1:1** con `java.net.http.HttpClient`: preserva método, query, headers
  (incl. `Authorization`) y **cuerpo crudo** (`InputStream` → bytes, sin form-parsing),
  y devuelve status/headers/cuerpo tal cual (JSON, form-urlencoded, multipart, blobs).
- Se descartan headers hop-by-hop / restringidos por el JDK (`host`, `content-length`,
  `connection`, `accept-encoding`, `origin`…) y los `access-control-*` (los pone el
  filtro CORS de Quarkus, server-side).
- **Frontend:** en `environment.quarkus.ts`, `helpdeskProxyUrl` apunta a Quarkus
  (`http://localhost:8080`) → el `HelpdeskService`/`AuthService` llaman
  `http://localhost:8080/api/v1/...`. El interceptor añade el Bearer porque la URL
  empieza con `helpdeskProxyUrl`. Las llamadas del board usan `fetch` (no interceptadas).
- **Verificado** contra el HelpDesk real: `GET /users/me` y `POST /auth/login` dan el
  MISMO status/cuerpo directo vs. vía proxy; query params reenviados; CORS a `:4200` OK.
  (Los flujos autenticados y las escrituras multipart/form se verifican en vivo.)
- **Requiere `quarkus.http.auth.proactive=false`:** con `quarkus-smallrye-jwt` en el
  classpath, la auth proactiva (default) valida cualquier `Bearer` como JWT propio y
  rechaza (401) el token del HelpDesk antes del proxy → rompía el login. En lazy mode
  el Bearer pasa al HelpDesk. (Ver [aprendizajes.md](../aprendizajes.md), 2026-07-02.)

## Sync de TicketEspejo (implementado: caché de encabezados)

Quarkus cachea los encabezados de tickets del HelpDesk en `ticket_espejo` (Postgres),
paginando en bloque en vez del "martilleo" del board (un GET por tarjeta).

- `com.fitdesk.sync.TicketEspejoStore` — **upsert** puro (ticket JSON → fila), idempotente
  por `helpdesk_ticket_id`, resuelve `cliente` por `client_id`/nombre (null si es de otra
  regional). Mapeo: `ticket_id, client_id/cliente, subject, estado, priority,
  assigned_user_id, entry_date, modified_date`.
- `com.fitdesk.sync.TicketSyncService` — pagina `GET /tickets/tickets?limit=100&offset=…`
  con un **Bearer del HelpDesk** y llama al store por página. Devuelve reporte
  (traídos/insertados/actualizados/páginas/total).
- Endpoints: `POST /api/admin/sync/tickets` (live, header `Authorization`) y
  `POST /api/admin/sync/tickets/import` (lote por payload, sin auth — verifica el mapeo).
- **Verificado:** import de un lote (nuevo + existente) → insert/update correctos, cliente
  resuelto (5→erco, 42→gualaquiza), fechas parseadas; live con token inválido → error limpio.

> **Ajuste 2026-07-07 — la caché podía quedar vieja.** El `sync` es **manual** (no hay job
> automático aún), así que `ticket_espejo` reflejaba el estado del último sync (p. ej. un ticket
> cerrado en el HelpDesk seguía saliendo "ENTREGADO" en el board). Fix: `board.ts syncTicketStatuses`
> ahora lee el estado **EN VIVO** (GET read-only por tarjeta del sprint activo) y usa la caché
> **solo como respaldo** si la lectura viva falla (404/ticket viejo). Sigue siendo read-only y el
> volumen es acotado (tarjetas del sprint activo). El **fix definitivo** sigue siendo el **sync
> incremental en background** (cuenta de servicio) — ver Pendiente.
- **Disparo live (con la sesión del usuario), desde la consola del navegador logueado:**
  ```js
  fetch('http://localhost:8080/api/admin/sync/tickets?pages=20', { method:'POST',
    headers:{ Authorization:'Bearer '+JSON.parse(localStorage['fit-daily_session']).token } })
    .then(r=>r.json()).then(console.log)
  ```

### El board consume la caché (implementado)

`GET /api/legacy/ticket-espejo` devuelve los encabezados cacheados keyed por nº de ticket,
en la MISMA forma que el ticket crudo del HelpDesk (`ticket_id, client_id, cliente,
assigned_user_id, estado`). En modo Quarkus, `board.ts syncTicketStatuses()` hace **UNA**
consulta a la caché y reconcilia cada tarjeta en memoria, en vez de un `GET
/tickets/tickets/:id` por tarjeta → **se acaban los `404`**. Además, como el `assignee` del
board y el `assigned_user_id` cacheado vienen del mismo origen, coinciden → **no dispara el
push de reasignación**. En modo Firebase el board sigue leyendo el ticket en vivo (sin cambios).

## Pendiente (siguientes slices)

1. **Sync incremental** (por `modified_date` desde el último) + **background con cuenta de
   servicio / JWT propio** (hoy el disparo del sync usa el token del usuario logueado).
2. **API limpia** (no legacy-shape) + adaptador Angular.
3. **Páginas de Administración** (regionales/equipos/clientes/usuarios/asignaciones)
   — ahí se define la 2ª regional (ver [decisiones.md](../decisiones.md), 2026-07-01).
2. **API limpia** (no legacy-shape) + adaptador Angular, para retirar la capa de
   traducción temporal cuando el board ya no dependa de las formas de Firebase.
3. **Páginas de Administración** (regionales/equipos/clientes/usuarios/asignaciones)
   — ahí se define la 2ª regional (ver [decisiones.md](../decisiones.md), 2026-07-01).

## Nota técnica: CORS

Quarkus 3.37 **ya no reconoce** la clave booleana `quarkus.http.cors` (quedaba
ignorada silenciosamente desde la Fase 1). Se corrigió a
`quarkus.http.cors.enabled=true` + `origins=http://localhost:4200`. Sin esto, el
navegador en `:4200` no podría leer de `:8080`.
