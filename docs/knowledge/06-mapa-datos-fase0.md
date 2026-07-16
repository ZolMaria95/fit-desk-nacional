# 06 — Mapa de datos y endpoints (Entregable Fase 0)

Resultado del **descubrimiento real** (no supuestos): export de Firebase (solo lectura) + lectura del código de integración. Es la base sobre la que se diseñan el esquema (Fase 1) y el ETL (Fase 2).

- **Snapshot Firebase:** [`../exports/firebase-snapshot-20260630-161640.json`](../exports/firebase-snapshot-20260630-161640.json) (HTTP 200, ~46 KB, **solo lectura**).
- **Fuente código:** `app/src/app/core/services/{data,helpdesk,auth}.service.ts`, `app/src/app/features/tickets/helpdesk.constants.ts`, `app/public/data/*.json`, `app/proxy.conf.json`.

---

## A. Árbol real de Firebase RTDB (`/fit-daily/…`)

| Nodo | Forma real | Conteo | → Destino PostgreSQL (Fase 2) |
|---|---|---|---|
| `stories.stories.{TA-NNN}` | **mapa por id** de tareas | objeto | `tarea` (+ `ticket_espejo` si trae `ticket`) |
| `sprints` | `{active:"SP-04", sprints:[…]}` | 4 sprints | `sprint` (+ `board` de Cuenca) |
| `users.users[]` | miembros del equipo (id corto local) | 12 | `usuario` (reconciliar con `helpdesk_user_id`) |
| `progress.entries[]` | avances (Burndown/Progreso) | 1 | tabla `progreso` / métrica derivada |
| `queries.queries[]` | consultas | 1 | `consulta` |
| `weeklySupport.weeks.{YYYY-MM-DD}` | `{assignee,notes,updatedAt}` (semana Vie→Jue) | — | `rotacion_semanal` |
| `hdNotes.{ticket}` | `string` (nota) | 132 | `ticket_nota` (keyed por nº ticket HD) |
| `hdActions.{ticket}` | `true` | 28 | `ticket_accion` (flag) |
| `hdPendientes.{ticket}` | `{addedAt,asunto,clienteRaw,dueDate,dueTime,lastAlerted,ticket}` | 15 | `ticket_pendiente` (recordatorio/alarma) |
| `solNotes` | **ausente en el snapshot** | 0 | `ticket_nota_solucion` (tolerar ausencia) |
| `usuariosPizza` | `array[2]` — **ruido, ajeno al dominio** | 2 | **IGNORAR** |

### Forma de una `story` (tarea del board)
`{ id:"TA-001", sprint:"SP-04", status, priority, description, assignee, client, clientName?, ticket, dueDate, points, progress, approved, approvedDate?, waitingClient?, waitingDate?, hdEstatus? }`

> `status` legacy = columna del board (`todo/inprogress/...`). `assignee`/`client` usan **ids cortos locales** (no del HelpDesk). `ticket` (string) enlaza con el HelpDesk → de ahí nace el `TicketEspejo`.

---

## B. Mapa de endpoints del HelpDesk (a replicar en Quarkus)

Base: `${helpdeskProxyUrl}/api/v1`. **Dev:** proxy de `ng serve` (`/api` → `https://helpdesk-api.fit-bank.com`). **Prod:** Cloudflare Worker. Quarkus absorberá este proxy (CORS server-side) y será la única fuente del frontend.

| Método | Endpoint | Cuerpo / Params | Uso |
|---|---|---|---|
| POST | `/auth/login` | JSON `{username_or_email,password,force_logout}` | login federado |
| POST | `/auth/refresh` | JSON `{refresh_token}` (rota el refresh) | renovar sesión |
| POST | `/auth/logout` | Bearer | cerrar sesión |
| GET | `/users/me` | Bearer | perfil (`user_id`, `role_description`, `person_name`…) |
| GET | `/users/catalog` | — | empleados asignables (rol SOPORTE/ADMINISTRADOR/SUPERVISOR) |
| GET | `/clients/catalog` | — | catálogo de clientes |
| GET | `/ticket-statuses/catalog` | — | estados → `ticket_status_id` |
| GET | `/tickets/tickets` | `limit,offset,<campo>_order`, filtros `client_id`(lista por comas), `ticket_status_id`, `assigned_user_id` | listado/paginación server-side |
| GET | `/tickets/tickets/:id` | — | ticket crudo |
| GET | `/tickets/:id/messages` | `limit=50` | **conversación EN VIVO** (no se cachea) |
| POST | `/tickets/:id/messages` | **multipart** (`detail`+`attachments`) ó **x-www-form-urlencoded** (`detail`) | responder ticket |
| PUT | `/tickets/tickets/:id` | form-urlencoded `assigned_user_id` / `ticket_status_id` | asignar / cambiar estado |
| GET | `/attachments/:id` | — (blob) | **adjuntos EN VIVO** (no se almacenan) |

> **Escrituras = `x-www-form-urlencoded`** (no JSON). El front usa un codec que percent-codifica todo el valor para no romper HTML del mensaje. Replicar en Quarkus.

---

## C. Alcance "Cuenca" quemado (a eliminar — nacionalización por datos)

| Constante / archivo | Contenido | Destino |
|---|---|---|
| `CLIENTES_VALIDOS` (`helpdesk.constants.ts`) | 14 clientes por **nombre** | tabla `cliente` (Regional Cuenca) |
| `CLIENT_MAP` | nombre HelpDesk → id local | `cliente.helpdesk_client_id` + `cliente.id` |
| `EMPLEADOS` (12 ids `XXX001`) | empleados del HelpDesk | `usuario.helpdesk_user_id` |
| `public/data/clients.json` | 14 clientes locales (id+color) | seed Cuenca |
| `public/data/users.json` | 12 miembros (id corto, rol, color) | `usuario` + `asignacion` |

**14 clientes (Cuenca):** ERCO, CAPCPE Gualaquiza, La Dolorosa Durán, Padre Julián Lorente, CACEL, 4 Ríos, Litargmode, COPAC Austro, Banco del Austro, VazCredit, Señor de Girón, Fininvest, Segura Coop, PuntoPréstamo.

**Roles locales actuales** (en `data/users.json` + `AuthService`): `Helpdesk` (despachador, ≡ MSC001), `Supervisor`, `Consultor`, `Scrum Master`. → Se formalizan como `Rol × Alcance × Vigencia` (ver [01-modelo-conceptual.md](01-modelo-conceptual.md)).

---

## D. Pendientes que pasan a Fase 1/2

1. **Reconciliar identidades:** ids cortos locales (`SC`,`JH`…) ↔ `helpdesk_user_id` (`XXX001`). Confirmar qué usa `stories.assignee`.
2. Mapear `status` legacy del board → `workflow_estado` corporativo.
3. `clienteRaw` de `hdPendientes` viene como **texto del HelpDesk** (ej. "COAC LA DOLOROSA DURAN") → resolver a `cliente` por nombre.
4. Confirmar si el HelpDesk ofrece **webhook** o solo polling por `modified_date` (para el Sync Worker).
