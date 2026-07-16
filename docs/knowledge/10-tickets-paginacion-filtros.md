# 10 — Tickets: paginación y filtros SIEMPRE server-side

Regla y caso resuelto sobre la vista **Tickets** (grid de cards del HelpDesk,
`features/tickets/`). Aplica a cualquier lista paginada contra un API.

## Principio (invariante del proyecto)

> **Los filtros van SIEMPRE como consulta directa al API, nunca en el front.**
> La lista que se muestra es **exactamente** la página que devuelve el API.
> Prohibido refinar/recortar/ordenar la página ya paginada en el navegador.

Ver la decisión en [decisiones.md](../decisiones.md) (2026-07-01).

## El bug (síntoma)

Tab **Pendientes** mostraba "**9 de 1277**": páginas semivacías (9 cards de 12) y
aparentemente infinitas páginas.

## Causa raíz

Se mezclaba **paginación server-side** con **filtrado client-side**:

1. El API paginaba 12 por página, filtrando server-side por `client_id` (clientes válidos).
2. Encima, el componente aplicaba un refinamiento **en memoria** (`operativos` =
   `CLIENTES_VALIDOS.has(clienteRaw) && !esFinalizado`).
3. Como los **finalizados** (APROBADO / CERRADO POR EL CLIENTE) **no** se excluían en la
   consulta, venían dentro de los 12 y el filtro client-side los quitaba → se veían 9.
4. El denominador (`total`) era el del API (incluía finalizados) → 1277 → "páginas infinitas".

Con paginación server-side, **filtrar en el front rompe el conteo y vacía las páginas**.

## El arreglo

Mover el "no finalizados" a la **consulta** y renderizar la página del API tal cual:

- **Excluir finalizados server-side:** se manda la **lista** `ticket_status_id=<ids no
  finalizados>` (misma forma de lista por comas que `client_id`). Los ids salen del
  catálogo de estados (`/ticket-statuses/catalog`) quitando los que contienen
  `APROBADO` o `CERRADO POR EL CLIENTE`.
- **La lista = la página del API:** `base()` devuelve `tickets()` directo; se eliminó el
  refinamiento `operativos` del camino de render (queda solo para la agregación de la
  tab Estadísticas, que es un resumen, no la lista paginada).
- **Catálogos antes de consultar:** `Promise.all([getClients(), getTicketStatuses()])`
  → `refresh()`, para que Pendientes filtre client+estatus server-side desde la 1ª carga.

### Archivos tocados
- `app/src/app/core/services/helpdesk.service.ts` — `TicketFilters.statusIds` +
  `loadFiltered` manda `ticket_status_id` (single o lista por comas).
- `app/src/app/features/tickets/tickets.ts` — `pendingStatusIds` computed;
  `buildFilters()` usa la lista para Pendientes; `base()` = `tickets()`; catálogos
  cargados antes de `refresh()`.

## Cómo filtra el API de tickets (referencia)

`GET /api/v1/tickets/tickets?limit&offset&<campo>_order=asc|desc` con:

| Parámetro | Forma | Notas |
|---|---|---|
| `client_id` | **lista por comas** (`4,5,6`) | confirmado; repetir el parámetro NO sirve |
| `ticket_status_id` | un estado, o **lista por comas** | ⚠️ la lista está **por confirmar** (ver abajo) |
| `assigned_user_id` | un usuario | tab "Asignados a mí" |
| `total` (en la respuesta) | universo de la consulta | denominador de "X de Y" y de la paginación |

## ⚠️ Pendiente de confirmar (verificación live)

Que el API acepte `ticket_status_id` como **lista por comas** (la doc solo confirmó
la lista para `client_id`). Verificación en DevTools → Network sobre `tickets/tickets`:
- ¿La query lleva `ticket_status_id=…,…,…` (varios)?
- ¿El `total` baja al nº real de pendientes (ya no ~1277)?
- ¿Desaparecen los finalizados y las páginas vienen llenas (12)?

**Si el API NO acepta la lista:** ajustar la vía server-side (p. ej. un parámetro de
"abiertos"/"open" si existe, o el criterio que use la herramienta web del HelpDesk),
**nunca** volviendo a filtrar en el front.
