# 13 — Correcciones y features (sesión jul-2026) + prompt portable

Consolidado de lo trabajado en la sesión del **2026-07-06/07**. El detalle de cada punto vive en
[decisiones.md](../decisiones.md) y [aprendizajes.md](../aprendizajes.md); esto es el índice + el
**prompt portable** para llevar las correcciones de lógica del frontend a la **versión original**
(Angular + Firebase, la desplegada en GitHub Pages).

## Índice de cambios de la sesión

### A) Panel de Administración (Quarkus-only — NO portable a la original)
- Editar equipos: (re)asignar **Responsable de equipo** desde el modal; columna **Responsable** (nombre del API); interruptor **Activo/Inactivo**.
- **Baja lógica** de equipo (`activo=false`): oculta el equipo de los selectores, no borra ni cascada; fila atenuada en la tabla.
- **Usuarios y roles:** buscador por nombre/código del API; **nombre completo desde el API**; luego se **eliminó la tab** y quedó solo **Asignaciones** (con buscador + columna **ID API**).
- **Auto board+sprint** al crear un equipo (nace operable).

### B) Roles de plataforma / permisos (Quarkus-only — NO portable)
- Gating del panel por **roles de plataforma** (Asignaciones), no por `esMSC001`: `GET /api/admin/mis-roles/{hid}`. Panel para **ADMIN y RESPONSABLE_EQUIPO**.
- **Solo ADMIN** puede definir/modificar/quitar una asignación de rol **ADMIN** (UI + backend 403), actor por header **`X-Actor-Hid`** (que hubo que sumar al **allowlist de CORS**).

### C) Board multi-equipo (Quarkus-only — NO portable)
- `/api/legacy/boards` (visibilidad por Asignaciones), `/sprints?board=`, `board` en cada story, escritura atada al board; **selector de Equipo/Tablero**; **Quito** operable (board + `SP-01` activo). `tarea.codigo` global, `sprint.codigo` por board.

### D) Corrección: carga del board SOLO LECTURA (**PORTABLE**)
- `board.ts syncTicketStatuses` reasignaba tickets reales en el HelpDesk (`assignTicket`) en **cada carga**. Se quitó → abrir el board no escribe en el HelpDesk. Ver [aprendizajes.md](../aprendizajes.md) 2026-07-07.

### E) Corrección: estados FINALIZADOS (**PORTABLE**)
- **"CERRADO POR FALTA DE RESPUESTA DEL CLIENTE"** ahora cuenta como finalizado (además de `APROBADO`, `CERRADO POR EL CLIENTE`). Se centralizó en `core/helpdesk-estados.ts → esEstadoFinalizado()` y se usa en los 3 lugares (board, tabs de Tickets, lista de estados no-finalizados server-side).

### F) Ajuste: board lee estado EN VIVO (Quarkus-only — NO portable)
- En Quarkus el board leía solo la caché `ticket_espejo` (sync manual, quedaba vieja). Ahora lee en vivo (read-only) por tarjeta, caché de respaldo. En la original NO aplica: ya lee en vivo (no hay caché). Fix definitivo pendiente: sync incremental en background.

---

## Prompt portable — aplicar D) y E) a la versión original (git)

> Copia/pega este prompt en un agente (Claude Code) abierto sobre el repositorio de la app original
> (Angular + Firebase de fitscrum / Fit-Daily). Solo D) y E) son de lógica de frontend compartida;
> el resto de la sesión depende del backend Quarkus y no aplica a la versión Firebase.

```
Contexto: app Angular de un tablero Scrum/Kanban que orquesta tickets de un HelpDesk externo
(los tickets viven en el HelpDesk; la app los consulta y opera). Aplicá EXACTAMENTE estas dos
correcciones de lógica del frontend y nada más. No toques Firebase ni el despliegue.

── Corrección 1: la carga del tablero debe ser SOLO LECTURA contra el HelpDesk ──
Problema: al abrir el tablero se REASIGNAN tickets reales en el HelpDesk sin acción del usuario
(y el HelpDesk suele auto-cambiar el estado al reasignar).
Qué hacer:
- Ubicá en el componente del board la función que, al cargar, sincroniza cada tarjeta con su ticket
  (recorre las tareas con `ticket` del sprint activo, lee el ticket y actualiza la tarjeta; suele
  llamarse algo como `syncTicketStatuses`).
- Dentro de ese recorrido hay una llamada que EMPUJA la asignación local al ticket real cuando
  difieren, del estilo:
      if (taskAssignee && taskAssignee !== ticketAssignee) this.helpdesk.assignTicket(ticket, taskAssignee);
  (assignTicket hace PUT /tickets/tickets/:id con assigned_user_id).
- ELIMINÁ esa llamada (y las variables que solo servían para ella). La carga debe LEER el estado del
  ticket para ubicar/mostrar la tarjeta, pero NUNCA escribir en el HelpDesk.
- La asignación al HelpDesk debe seguir ocurriendo solo por acción explícita del usuario (diálogo de
  asignar / detalle de tarjeta), y el cambio de estado del ticket solo al mover/arrastrar una tarjeta
  (con su confirmación). No toques esos caminos.

── Corrección 2: "CERRADO POR FALTA DE RESPUESTA DEL CLIENTE" también es FINALIZADO ──
Problema: el código reconoce como finalizados los estados cuyo nombre incluye APROBADO o
CERRADO POR EL CLIENTE, pero NO CERRADO POR FALTA DE RESPUESTA DEL CLIENTE (no contiene la subcadena
"CERRADO POR EL CLIENTE"), así que esos tickets no cuentan como finalizados.
Qué hacer:
- El criterio suele estar DUPLICADO en varios lugares: (a) el mapeo estado-de-ticket → columna del
  board + check "Finalizado" (p. ej. `statusFromTicketEstado`); (b) el filtro de tickets operativos /
  no-finalizados de la vista Tickets (p. ej. `esFinalizado`); (c) la lista de estados NO finalizados
  que se manda como filtro server-side (p. ej. ticket_status_id para "Pendientes").
- Centralizá el criterio en UNA función pura reutilizable, p. ej.:
      export function esEstadoFinalizado(estado: string | null | undefined): boolean {
        const e = (estado || '').toUpperCase();
        return e.includes('APROBADO')
          || e.includes('CERRADO POR EL CLIENTE')
          || e.includes('CERRADO POR FALTA DE RESPUESTA');
      }
- Reemplazá TODAS las comparaciones de esos strings por llamadas a esa función (en board, Tickets y
  la lista de no-finalizados), para que no se vuelvan a desincronizar.

Verificá que compile. No cambies comportamiento fuera de estas dos correcciones.
```

## Verificación esperada (en la original, tras aplicar)
- Abrir el tablero varias veces NO reasigna ni cambia el estado de ningún ticket en el HelpDesk.
- Un ticket "CERRADO POR FALTA DE RESPUESTA DEL CLIENTE" aparece **Finalizado** en el board (check marcado / columna Entregado) y **fuera** de las tabs operativas de Tickets (no se cuenta como pendiente).

---

## Checkpoint — aplicación en el repo original (2026-07-07, EN PAUSA)

**Repo original localizado:** `/Users/zolmaria/Documents/FitDesk-Nacional`
- Remoto: `https://github.com/ZolMaria95/Fit-Desk.git` · rama **`main`** · último commit *"init: baseline duplicado de Fit-Daily…"*.
- Untracked pre-existente: `GUIA.md` (no es mío, no tocar).
- Tiene **dos** versiones de la app: `app/` (Angular, la migrada) y `js/` (legacy JS).

**Estado: NADA aplicado todavía** (interrumpido en la fase de localización). Ubicaciones exactas ya encontradas:

**Corrección 1 — carga read-only (quitar reasignación de tickets):**
- `app/src/app/features/board/board.ts:115` → borrar `if (taskAssignee && taskAssignee !== ticketAssignee) this.helpdesk.assignTicket(s.ticket, taskAssignee);` y las 2 líneas que solo lo alimentan (`ticketAssignee`/`taskAssignee`, 113-114).
- `board.ts:104` ya lee **en vivo** (`fetchTicketRaw`, sin caché) → **la corrección F NO aplica** aquí.
- `card-detail-dialog.ts:355` mantiene `assignTicket` (acción explícita) → **no tocar**.

**Corrección 2 — "CERRADO POR FALTA DE RESPUESTA" = finalizado:**
- Crear `app/src/app/core/helpdesk-estados.ts` con `esEstadoFinalizado()` (ver el prompt de arriba).
- Usarlo en `app/src/app/features/board/board-utils.ts:31` y `app/src/app/features/tickets/tickets.ts:39`.
- ⚠️ Este `tickets.ts` es **más viejo**: **NO** tiene `pendingStatusIds` (la lista server-side de no-finalizados) → solo **2 puntos** en el Angular, no 3.
- `tickets-card-utils.ts:16` matchea `APROBADO` solo para el **color** de la card (cosmético) → no es criterio de finalizado, dejar.

**Versión legacy `js/` (si también está en producción — CONFIRMAR con la dueña):**
- `js/board.js:22-23` = array de estados FINAL (`APROBADO`, `CERRADO POR EL CLIENTE`) → sumar `CERRADO POR FALTA DE RESPUESTA DEL CLIENTE`.
- `js/helpdesk-panel.js:931` = filtro de no-finalizados → sumar la misma exclusión.
- Falta ubicar el equivalente de la reasignación-en-carga en `js/board.js` (no revisado aún).

**Preguntas para retomar:**
1. ¿Qué versión está desplegada: el `app/` Angular o el `js/` legacy? → define si hay que parchear también `js/`.
2. ¿Commiteo en una **rama** (no en `main`) y hago push? (el push es hacia GitHub → pedir OK antes).
