# 02 — Arquitectura actual (confirmada del código real)

Estado **verificado leyendo el código** (`app/`) y el `knowledge-base.md` del proyecto. Ya no hay supuestos.

## Diagrama actual

```
[ Angular 22 PWA ]  (GitHub Pages, base-href /fitScrum/angular/)
   │   │
   │   ├──► Firebase Realtime DB  (fit-daily-ab113)  ── datos propios de la app
   │   │        stories, sprints, team, progress, queries, weeklySupport,
   │   │        hdNotes, hdActions, hdPendientes, solNotes   (+ fallback localStorage)
   │   │
   │   └──► API HelpDesk  (helpdesk-api.fit-bank.com)  ── identidad + tickets
   │            dev:  proxy de `ng serve`
   │            prod: Cloudflare Worker (fit-daily-proxy...workers.dev)
   │
   └─ Alcance quemado a Cuenca: CLIENTES_VALIDOS (14), EMPLEADOS, seeds public/data/
```

## Stack confirmado

- **Frontend:** Angular 22 standalone, **zoneless** (Signals, sin zone.js), Angular Material 3 + CDK (drag&drop). TypeScript 6. Hash routing. **PWA** con service worker (auto-update). Migración desde legacy JS vanilla: **COMPLETA**.
- **Persistencia propia:** **Firebase Realtime Database** (REST + SSE en tiempo real), fallback `localStorage`. Backup de solo lectura: `GET https://fit-daily-ab113-default-rtdb.firebaseio.com/fit-daily.json`.
- **Identidad + tickets:** **API del HelpDesk** (`helpdesk-api.fit-bank.com`). Login real contra el HelpDesk (`/auth/login`, refresh token, `/users/me`). Catálogos: `/users/catalog`, `/clients/catalog`, `/ticket-statuses/catalog`. **Escrituras del API en `x-www-form-urlencoded`** (no JSON).
- **Proxy al HelpDesk:** dev = `proxy.conf.json` de `ng serve`; prod = **Cloudflare Worker**. (El API bloquea CORS de orígenes ajenos.)
- **Hosting:** **GitHub Pages**.

## Modelo de datos actual (en Firebase, bajo `/fit-daily/`)

| Nodo | Contenido |
|---|---|
| `stories` | Tareas del board: `{id, sprint, status, priority, description, assignee, client, ticket, dueDate, points, progress, approved, waitingClient, hdEstatus...}` |
| `sprints` | `{active, sprints:[{id, name, status, capacity, goal, start, end}]}` |
| `team` | Miembros (de `data/users.json`) |
| `progress` | Avances (Burndown/Progreso) |
| `queries` | Consultas (id, título, prioridad, estado, respuesta, respondedBy) |
| `weeklySupport` | Rotación semanal de soporte (asignado + tickets por semana) |
| `hdNotes` | Notas de texto por ticket del HelpDesk |
| `hdActions` | Tickets marcados con "acción" |
| `hdPendientes` | Recordatorios por ticket: `{asunto, clienteRaw, dueDate, dueTime, paused, lastAlerted}` |
| `solNotes` | Notas de solución por ticket |

## Features reales (construidas por la dueña según necesidades; PRESERVAR TODAS)

- **Board Kanban** (4 columnas: To Do / In Progress / En Certificación / Done) con drag&drop, permisos por rol, filtros (prioridad/asignado/cliente/N° ticket), sprint bar.
- **Integración Helpdesk en las cards:** el estado del ticket ubica la tarea en la columna y se refleja como badge; asignación del ticket desde el board.
- **Tickets:** grid de cards, consulta server-side (filtros/orden/paginación en la petición), conversación con adjuntos e imágenes hidratadas con auth, composer con formato (negrita/cursiva/pegado).
- **Notas en tickets** (`hdNotes`), **marcado de acción** (`hdActions`).
- **Pendientes/Recordatorios** (`hdPendientes`): fecha + hora + **alarma diaria** (snackbar cada día hasta pausar). Caso real: "recordar pedir info al cliente por teléfono".
- **HelpDesk Semanal:** rotación de soporte por semana (Vie→Jue), calendario, tickets resueltos.
- **Mi Panel:** dashboard del Scrum Master (KPIs: acciones, esperando cliente, por vencer, por asignar).
- **Consultas, Progreso, Burndown.**

## Roles actuales (informales, en `AuthService`)
`esMSC001` (MSC001 = rol **Helpdesk/despachador**), `esSupervisor`, `puedeVerMiPanel` (Scrum Master), `puedeBorrarBoard`, `puedeGestionarTodo`. → En el destino se formalizan como `Rol × Alcance × Vigencia` (ver [01-modelo-conceptual.md](01-modelo-conceptual.md)).

## Backend FastAPI + MongoDB: HUÉRFANO
En `app/` hay un backend FastAPI + MongoDB (`main.py`, `routers/items.py`, `routers/auth.py`) con entidades **genéricas** (`items`, `users`) y JWT+bcrypt. **No está conectado** a la app Angular ni implementa el dominio. Se descarta como referencia (ver [decisiones.md](../decisiones.md)); el backend objetivo es Quarkus+PostgreSQL.

## Puntos de acoplamiento a romper para nacionalizar
1. `CLIENTES_VALIDOS` / `EMPLEADOS` / seeds → deben venir del backend según las `Asignacion` del usuario, no de constantes.
2. Frontend habla directo con Firebase y HelpDesk → debe hablar solo con Quarkus.
3. Roles hardcodeados → modelo `Rol × Alcance × Vigencia`.
4. Free tier (Firebase + GitHub Pages + Cloudflare Worker) → contenedores en AWS.
