# Bitácora de decisiones

Registro de decisiones de arquitectura, alcance y tecnología. Formato ADR-lite. **Agregar una entrada cada vez que se decida algo** (ver convención en [../CLAUDE.md](../CLAUDE.md)).

> Formato: `### [fecha] título` · **Decisión** · **Contexto** · **Justificación** · **Estado** (vigente/revisada/descartada).

---

### [2026-09-22] Fix: modal de ticket — el asunto se aplastaba y quedaba espacio muerto arriba

**Contexto:** la dueña reportó (con captura) que en el modal de conversación de ticket el asunto
quedaba escondido — solo se veía la burbuja del `matTooltip` flotando sobre los badges —, el label
"TICKET #NNNNN" se veía muy chico, y había espacio en blanco sin usar arriba del todo.

**Causa raíz** (encontrada reproduciendo el bug en Chrome real con Playwright, con
`getBoundingClientRect`/`getComputedStyle`, no a ojo):
1. `.conv-header` es `display:flex; flex-direction:column;` con `max-height: var(--header-cap)` y
   `overflow-y:auto`. Sus 3 hijos son `.conv-header-row1`, `<h2 class="conv-title">` y
   `.conv-header-panel`. Los dos primeros tenían `flex: none` (protegidos), pero **`.conv-title` no
   fijaba `flex`**, así que heredaba el default `flex-shrink:1`. Cuando el contenido superaba el
   presupuesto de alto, flexbox **aplastaba el título** (de 26px a ~7px) ANTES de que el scroll
   llegara a activarse — el texto seguía ahí (por eso el `matTooltip` funcionaba) pero visualmente
   solo se veía una astilla de 1-2px pegada contra los badges.
2. `.conv-header` conserva las clases de Angular Material `mat-mdc-dialog-title`, que le agregan un
   `::before` invisible (`content:""`, ~40-60px) para alinear a una baseline tipográfica — pensado
   para texto normal, no para un contenedor flex. En un flex container, ese `::before` se vuelve un
   **hijo flex real**, apareciendo como una fila en blanco antes de "TICKET #NNNNN" en TODO ticket
   (el "espacio en blanco arriba" reportado) y compitiendo por el presupuesto de `--header-cap`.
3. El label "TICKET #NNNNN" nunca cambió de tamaño (12.5px, intacto) — se veía chico solo por
   percepción, al lado del título aplastado y el hueco de arriba.

**Fix** (`ticket-messages-dialog.scss`):
- `.conv-title { flex: none; }` — ahora, si el contenido no entra en `--header-cap`, es el
  `overflow-y:auto` de `.conv-header` el que entra en juego (scroll real), no el aplastamiento.
- `.conv-header::before { display: none; }` — neutraliza el `::before` de Material (esa baseline no
  se usa para nada acá).
- **Presupuesto de alto REMEDIDO** con Playwright tras el fix (no reusado a ojo): `--header-cap`
  bajó de 248px a 224px en escritorio (contenido real bajó de 231px a 208px, consistente en varios
  tickets) y de 392px a 384px en celular con el panel expandido (contenido real 345-383px según el
  ticket). `.composer` recalcula solo porque usa la misma variable.
- Re-verificado el checklist completo: las 5 combinaciones obligatorias de `getBoundingClientRect`
  del botón "Enviar" con 25 líneas inyectadas (`fullyInside:true` en las 5) y la ruta de escape de
  "lectura ampliada" (Volver al modal) en escritorio y celular.

**Estado:** implementado y verificado en Chrome real. `tsc`/`ng build` limpios. **Pendiente de
desplegar** (regla del proyecto).

---

### [2026-09-21] Fix: Vacaciones pintaba en el calendario los días de CARGO (×1,36), no los solicitados

**Contexto:** en un permiso "con cargo a vacación" (`tipo=PERMISO`), la regla de la empresa es
descontar `round(díasLaborables × 1,36)` días del saldo — eso está bien y no cambia. El problema:
ese mismo número YA multiplicado se usaba también para calcular la fecha de fin del permiso, así que
el calendario (pantalla principal, reporte y PDF) pintaba más días de los que la persona
realmente iba a estar ausente. Ejemplo: pedir 2 días laborables carga 3 días al saldo (correcto),
pero el calendario resaltaba 3 días en vez de los 2 realmente solicitados. Reportado por la dueña.

**Causa raíz:** `vacacion-dialog.ts`, `fechaFinEfectiva()` (rama `PERMISO`) derivaba la fecha de fin
desde `diasVac()` (el cargo, ya ×1,36) en vez de desde `diasLaborables()` (el número que el usuario
tipeó). Ese valor se guarda tal cual en `fechaFin` — el backend no lo recalcula — así que el error
quedaba fijado en cada fila. Como el backend ya tenía `diasVacacion` (el cargo) como campo separado
del rango de fechas desde el diseño original (`V15__vacacion.sql`, 2026-08-03), no hizo falta tocar
el modelo de datos: fue un fix de una sola línea en el frontend.

**Fix:**
- `fechaFinEfectiva()` ahora usa `diasLaborables()` en vez de `diasVac()`. `diasVac()` (el cargo
  ×1,36) no cambia — sigue siendo lo que se muestra como "Días de vacaciones" y lo que descuenta del
  saldo. Arregla automáticamente los 3 lugares que solo leen `fechaInicio`/`fechaFin` para pintar
  (calendario principal, mini-calendario del reporte, PDF) sin tocarlos.
- **Backfill** (`backend/src/main/resources/db/migration/V25__fix_permiso_fecha_fin.sql`): como este
  comportamiento venía del diseño original, todo permiso con cargo ya guardado tenía el rango
  inflado. Se corrigió con `fecha_fin = fecha_inicio + (dias_laborables - 1)` para `tipo='PERMISO'`
  — `dias_laborables` y `dias_vacacion` (el cargo) no se tocan, solo el largo del rango. Decisión
  confirmada con la dueña (alternativa descartada: dejar el historial como estaba).
- `docs/contrato-api.md` (ambos repos) actualizado: aclara que `fechaFin` en `PERMISO` refleja
  `diasLaborables`, no `diasVacacion`, y de paso se puso al día con `PERMISO_HORAS`/`horas`
  (feature de 2026-09-16 que nunca se documentó ahí).

**Estado:** implementado, `tsc`/`ng build` limpios. **Pendiente de desplegar** (regla del proyecto)
— la migración V25 solo se aplica al arrancar el contenedor del backend.

### [2026-09-21] Nueva pantalla "Senior de Turno" + título colapsable en ticket + tickets/página

**Contexto:** tres pedidos puntuales de la dueña. (1) Una pantalla nueva "Senior de Turno",
estructuralmente igual a "HelpDesk Semanal" (`/semanal`), pero con **2 roles por semana** ("Mesa de
Ayuda" y "Emergentes") en vez de 1, con asignación **abierta a cualquier empleado** de la empresa
(no solo del equipo), organizada por equipos igual que Semanal; si el usuario logueado está de
turno hoy, el ítem de menú debe avisarlo visualmente. (2) En el modal de conversación de ticket, el
asunto truncado pasa de tener solo un `matTooltip` (no sirve en celular) a ser clickeable y abrir un
popup con el texto completo. (3) Tamaño de página de Tickets: 12 → 15.

**⚠️ Dependencia de backend — "Senior de Turno" no funciona en producción todavía:** este repo
(`fit-desk`) es solo el frontend; el backend (`fit-desk-api`, Quarkus) vive en otro repo, no
presente en este workspace. La pantalla necesita 2 endpoints nuevos que HOY NO EXISTEN:
`GET/PUT /api/legacy/turnoSenior?equipo=<codigo>` (mismo patrón que `weeklySupport?equipo=`, pero
con 2 roles por semana) y `GET /api/legacy/turnoSenior/hoy` (agregado sobre todos los equipos, para
el punto rojo del menú). Contrato documentado en `app/docs/contrato-api.md`. En local, contra el
backend actual, ambos devuelven 404 — manejado con `try/catch` en `DataService` (no rompe la UI: la
pantalla se ve y se puede "guardar" localmente, pero no persiste hasta que `fit-desk-api` implemente
esos 2 endpoints). **Falta avisar/coordinar con quien mantenga ese repo.**

**Decisiones de diseño confirmadas con la dueña:**
- El aviso de "de turno hoy" es un **punto rojo simple sobre el ícono del menú** (mismo lenguaje
  visual que ya usan "Tickets"/"Bandeja" para sus contadores) — no un banner de página completa ni
  la fila entera en rojo. Como esos badges existentes siempre llevan un número adentro, el CSS
  `.nav-badge` original quedaba como un óvalo ancho sin contenido; se agregó una variante
  `.nav-badge:empty` (10×10, círculo) específica para el caso sin texto.
- El aviso revisa **todos los equipos**, no solo el que se esté viendo en pantalla — la asignación
  es abierta, así que un consultor puede quedar de turno en un equipo al que ni pertenece, y el
  menú lateral es visible sin importar la pantalla activa. Por eso hace falta el endpoint agregado
  (`turnoSenior/hoy`) en vez de sumar N pedidos por equipo desde el layout.

**Implementación (frontend, ya hecha):**
- `DataService`: bloque `_turnoSenior` (mismo patrón que `_weekly`/`weeklySupport`) —
  `loadTurnoSenior`, `getTurnoSenior(Assignment)`, `setTurnoSeniorAssignment` (guarda con al menos
  1 rol lleno), `clearTurnoSeniorAssignment`, ticket-log (`get/add/removeTurnoSeniorTicket`), y
  `checkTurnoSeniorHoy()`. Todo detrás de `useQuarkus()` — función nueva, sin equivalente Firebase.
- `features/senior-turno/` (clon de `features/semanal/`): mismo calendario/rotación por equipo,
  pero el picker de personas usa `HelpdeskService.hdUsers()` (catálogo completo de la empresa) en
  vez de `teamMembers(equipo)` — ya no hace falta el grupo "Soporte nacional" de Semanal (acá todo
  el mundo es asignable siempre). Cada celda de viernes muestra 2 chips (uno por rol) en vez de 1;
  ya no hay tinte de fondo por celda (había un solo asignado, ahora hay 2 personas distintas).
- `senior-turno-assign-dialog.ts` (clon de `semanal-assign-dialog.ts`): 2 `mat-select` (Mesa de
  Ayuda / Emergentes) sobre el catálogo completo. **Actualizado el mismo día:** se agregó buscador
  dentro de cada `mat-select` (mismo patrón `.opt-buscar`/`stopPropagation` de
  `features/admin/crear-asignacion-dialog.ts`) — con ~34 empleados parecía innecesario, pero la
  dueña lo pidió igual; un buscador POR ROL (no uno compartido) para que el texto tipeado en Mesa
  de Ayuda no quede pisando el de Emergentes al abrir el otro select.
- **Actualizado el mismo día:** se sacó el bloque "Tickets resueltos" de la pantalla (pedido
  explícito de la dueña — no aplica a este flujo). Se eliminó también el código que quedaba muerto
  al sacarlo: `ticketsWeekKey`/`selectWeek`/`selectedWeek`/`weekTickets` en `senior-turno.ts`, y
  `getTurnoSeniorTickets`/`addTurnoSeniorTicket`/`removeTurnoSeniorTicket` + la rama de
  `clearTurnoSeniorAssignment` que preservaba tickets en `DataService` — el contrato documentado en
  `contrato-api.md` para `turnoSenior?equipo=` ya no incluye el campo `tickets`.
- Ruta `/senior-turno`, nav en "Seguimiento" (junto a "HelpDesk Semanal"), gateado por
  `usesQuarkus()`.
- Ticket: `<h2 class="conv-title">` ahora es clickeable (`role="button"`, `(click)`/`(keydown.enter)`)
  y abre `TicketTitleDialog` (mini-componente nuevo, un solo botón "Cerrar") con el asunto completo
  — mantiene el `matTooltip` para el hover en escritorio.
- `tickets.ts`: `pageSize` 12 → 15 (una sola línea; el `mat-paginator` ya usa `hidePageSize`).

**Verificado con Playwright:** pantalla `/senior-turno` renderiza calendario + resumen lateral con
2 roles; diálogo de asignación poblado con el catálogo completo (nombres legibles, no códigos);
guardar refleja los 2 chips coloreados en el calendario, la tarjeta de semana actual y "próximas
semanas"; tema oscuro revisado visualmente; los 2 endpoints nuevos dan 404 pero no rompen la UI
(capturado). Popup del asunto del ticket probado con un asunto largo real. Paginación de Tickets
confirmada en "15 de 1129". `npx tsc --noEmit` y `ng build -c quarkus` limpios (mismo warning
preexistente de `card-detail-dialog.html`, no relacionado).

**Semana (corrección posterior, pedido de la dueña):** la semana de Senior de Turno va de **lunes a viernes** (Semanal sigue Vie→Jue). Clave de semana = lunes; sáb/dom no pertenecen a ningún turno (celdas deshabilitadas); el chip de cada semana se pinta en el lunes; en fin de semana "Semana actual" muestra el próximo lunes. El backend (`turnoSenior`) debe indexar por lunes.

**Pendiente de desplegar** (regla del proyecto) — y "Senior de Turno" además pendiente de que
`fit-desk-api` implemente los 2 endpoints nuevos antes de tener datos reales en producción.

---

### [2026-09-21] Rediseño visual completo del modal de conversación de ticket

**Contexto:** la dueña pidió un rediseño visual completo de `TicketMessagesDialog` (spec detallada
con medidas/colores/layout exactos para escritorio y celular) porque el área de lectura ocupaba
menos de un tercio del modal — demasiado espacio muerto en el header/metadatos apilados en filas.

**Decisión:** implementado con 3 adaptaciones acordadas explícitamente con la dueña (no la spec
literal): (1) se mantiene `100dvh` borde a borde (pedido de esta misma semana, ya en prod) en vez
de volver a la tarjeta flotante de ~85vh de la spec; (2) la paleta se mapea a las variables de tema
ya existentes (`--mat-sys-*`, `--brand`) en vez de a los hex fijos de la spec, para no perder el
soporte de tema oscuro; (3) "Ampliar lectura"/"Abrir editor ampliado" se movieron a la fila de
formato colapsable "Aa" del compositor, mientras que "Volver al modal" (para SALIR de lectura
ampliada) se queda en los íconos del header — si viviera dentro del Aa quedaría inaccesible en
lectura ampliada (ahí se oculta todo el compositor).

**Cambios:**
- **Header**: 3 filas — label pequeño "TICKET #N" + íconos (fila 1, SIEMPRE visible, incluso en
  lectura ampliada), título grande (`h2`, 21px/700, 1 línea+tooltip en escritorio, hasta 2 líneas
  sin truncar en celular), y un panel con badges (cliente/tipo/estado/prioridad, prioridad
  CONSERVA su color por severidad) + franja de metadatos separada (fecha/actualización/creador/
  asignado/adjunto). En celular el panel arranca colapsado (toggle en la fila 1); en
  escritorio/tablet siempre se ve completo.
- **Mensajes**: avatar circular de iniciales antes del nombre — color real de
  `ColoresService.avatar(hid)` (mismo que Board/Vacaciones/Semanal) para empleados, gris neutro
  para cliente/Sistema. Requirió agregar `hid?: string` a `ConvMsg`, llenado en `procesar()` desde
  `entry_user_id`. Prosa a 15.5px/1.7, `max-width: 760px` para longitud de línea legible.
- **Compositor**: pasa de barra+input+botón apilados a una sola fila (adjuntar circular + pastilla
  de texto + "Aa" + enviar circular con ícono) con una fila de formato colapsable arriba
  (negrita/cursiva/subrayado/código/limpiar + Ampliar lectura/Abrir editor ampliado).
- **Diálogo**: ancho `720px/96vw` → `920px/92vw` en los 8 sitios que lo abren.
- **Presupuesto de alto recalculado con Playwright** (no reusado a ojo): el tope de `.conv-header`
  pasó a una custom property `--header-cap` (248px por defecto, medido: contenido real 231px en
  varios tickets con los 7 metadatos + adjunto) para que `.composer` —su hermano, no su
  descendiente— comparta el mismo número al calcular su propio tope
  (`calc(100dvh - var(--header-cap) - 40px)`). En celular con el panel expandido el contenido del
  header crece a ~391px (metadatos apilados, no en una franja) — ahí `--header-cap` sube a 392px
  vía `:host(.panel-open)` (host binding nuevo, refleja `resumenExpandido()`), y `.composer` se
  recalcula solo porque usa la misma variable.

**Verificado con Playwright:** `getBoundingClientRect` del botón de enviar con 25 líneas
inyectadas en las 5 combinaciones obligatorias (escritorio 1280×900, tablet 768×1024, celular
390×844 colapsado y expandido, 360×640) — `fullyInside: true` en las 5. Ruta de escape de lectura
ampliada re-verificada en escritorio y celular tras mover "Ampliar lectura" al Aa (sigue
funcionando: `.conv-header-row1` nunca se oculta). Tema oscuro revisado visualmente (pills/avatares/
franja heredan bien los tokens). Miniatura 26×26 de adjunto del ticket confirmada por regla CSS
compilada (`.ticket-attach .conv-thumb-img { width:26px; height:26px; object-fit:cover }`) — no se
encontró en los datos de prueba un ticket con adjunto-imagen a nivel de ticket para verlo en vivo,
pero la misma ruta de renderizado ya se usa (y se vio funcionando) en adjuntos de mensaje.

**Bug encontrado y corregido durante la verificación:** el título de celular usaba
`-webkit-line-clamp: 2` junto con `overflow: visible` — combinación inválida: sin `overflow:
hidden` el clamp no recorta de verdad, así que la 3ª línea de un asunto largo se seguía
dibujando, superpuesta sobre los badges de abajo. Corregido a `overflow: hidden`.

`npx tsc --noEmit` y `ng build -c quarkus` limpios (mismo warning preexistente de
`card-detail-dialog.html`, no relacionado). **Pendiente de desplegar** (regla del proyecto).

### [2026-09-20] Fix: "Ampliar lectura" dejaba sin salida en celular

**Contexto:** el rediseño de header de esta misma semana (que unificó `.conv-head` + `.conv-summary`
en un solo `.conv-header`) tuvo un efecto secundario no previsto: la regla de "lectura ampliada"
(`:host(.reader-expanded) { .conv-header { display: none; } }`) pasó a ocultar TODO `.conv-header`,
incluida `.conv-header-icons` — ahí vive "Volver al modal". En celular, sin ESC físico, el usuario
quedaba atrapado en lectura ampliada sin forma de salir.

**Decisión:** en vez de ocultar `.conv-header` completo, se ocultan solo `.conv-header-titles` y
`.conv-header-meta` (los bloques de contenido), dejando `.conv-header-icons` (Volver/Descargar/
Cerrar) siempre visible. Se agregó `margin-left: auto` a `.conv-header-icons` porque dejaba de
tener a su lado el hermano `flex:1 1 auto` que antes lo empujaba a la derecha.

**Verificado con Playwright** en mobile (390×844) y escritorio (1280×900): "Ampliar lectura" oculta
título/metadatos y compositor, pero el botón "Volver al modal" queda visible y funcional en los
dos; clicarlo restaura la vista normal. Re-confirmado que "Enviar" sigue con `fullyInside: true` en
modo normal con 25 líneas inyectadas. `ng build -c quarkus` limpio.

**Nota:** este fix quedó absorbido por el rediseño completo del header del [2026-09-21] de arriba
(las clases `.conv-header-titles`/`.conv-header-meta` ya no existen; el mismo principio —la fila de
íconos nunca se oculta— se preservó como `.conv-header-row1` en el rediseño nuevo).

### [2026-09-21] Lote de 9 mejoras reportadas por el equipo (8 implementadas, 1 diferida)

**Contexto:** el equipo reportó 9 problemas puntuales en el uso diario. Se investigó cada uno en el
código antes de tocar nada; 8 quedaron implementados y verificados en local, 1 queda fuera de
alcance por una limitación externa. Todo **pendiente de desplegar** (regla del proyecto).

1. **Alerta "Falta finalizar" sigue viva tras finalizar** — `NotificacionService.resolverTareaFinalizada()`
   (nuevo) marca `leida=true` sobre `tarea-done|<codigo>` cuando `tarea.aprobado` pasa a `true`
   (`LegacyWriteService`, transición detectada igual que las otras dos ya existentes). Verificado con
   `curl` contra Postgres local: 4 notificaciones (una por RE) pasaron de `leida=f` a `leida=t` al
   finalizar la tarea de prueba.
2. **Diana Fiallo no podía finalizar su propia tarea** — cambio de política confirmado con la dueña:
   `onFinalize()` en `board.ts`/`card-detail-dialog.ts` ahora usa `puedeOperar()`/`puedeMover()` (el
   mismo criterio "dueño O RE/Supervisor/admin" que ya usa mover/arrastrar) en vez de exigir
   `puedeGestionarTodo()` a secas. No se pudo re-probar en vivo como un consultor real (solo hay
   sesión de MSC001/admin a mano), pero reusa helpers ya probados para el caso de mover.
3. **Modal de lectura sin espacio muerto** — `:host` de `ticket-messages-dialog.scss` sube de `88dvh`
   a `100dvh`/`100vh` (borde a borde); recalculada la fórmula de `.composer`
   (`calc(100dvh - 252px)`, antes `88dvh - 252px`). Verificado con `getBoundingClientRect`: el
   diálogo mide exactamente el 100% del viewport en escritorio/tablet/celular, y "Enviar" sigue
   `fullyInside: true` con 25 líneas de texto en las 5 combinaciones de siempre (incluido 360×640).
4. **Reunión desde notificación no dejaba editar la hora** — `layout.ts:abrirNotificacion()` ahora
   revisa `story.tipo === 'REUNION'` y abre `ReunionDialog` (con hora editable), igual que ya hacía
   `board.ts`; antes abría siempre `CardDetailDialog` (sin campo de hora). Verificado inyectando una
   story de prueba vía la API de Angular (`ng.getComponent`): con `tipo: 'REUNION'` abre
   "Editar reunión" con 2 `<input type="time">` habilitados; con una tarea normal sigue abriendo el
   detalle de siempre, sin regresión.
5. **Pierde sesión muy rápido** — `helpdesk-auth.interceptor.ts` usaba `isProxy` (por prefijo de URL)
   para decidir si un 401 fuerza logout; en `environment.ts`/`.quarkus.ts`/`.cloud.ts`,
   `helpdeskProxyUrl` y `quarkusApiUrl` son el mismo origen, así que `isProxy` daba `true` para
   CUALQUIER llamada (incluido el API propio de FitDesk) — el mismo defecto ya corregido para 403
   (`isHelpdeskProxy`, por ruta `/api/v1/`) seguía vivo para 401. Ahora ambos casos usan
   `isHelpdeskProxy`. No verificable 100% en local (depende de condiciones de producción); a
   confirmar tras desplegar.
6. **Buscador sin indicador visible de búsqueda activa** — el chip "Buscando: X" que ya existía vivía
   solo dentro del panel "Filtros" del drawer, plegado por defecto. Ahora se muestra SIEMPRE en la
   cabecera de Tickets (`tickets.html`/`.scss`) cuando hay un filtro de búsqueda activo, sin depender
   de que el panel esté abierto. No se tocó el comportamiento de vaciar la caja al buscar (es
   intencional, documentado en el propio código).
   **Bug encontrado al verificar el responsive:** en celular (360×390px) el chip nuevo desbordaba la
   fila `.hd-header` (scroll horizontal) — el título, "N de M", el chip, "Limpiar" y ↻ no caben en una
   sola línea, y los ítems flex no encogen por debajo de su contenido sin `min-width: 0`. Corregido
   con `flex-wrap: wrap` en `.hd-header` + `min-width: 0` en el chip + una regla `<480px` que le da al
   chip su propia línea completa. Reverificado en 360×640, 390×844, 768×1024 y 1280×900 (con y sin
   búsqueda activa): sin overflow horizontal en ninguno.
7. **[FUERA DE ALCANCE] Borrar adjuntos al editar un comentario** — el contrato del API del HelpDesk
   no tiene ningún endpoint para quitar un adjunto de un mensaje ya enviado (solo se suben al
   CREAR el mensaje). Queda pendiente de confirmar con IT/HelpDesk si existe una vía no documentada;
   no se implementó nada.
8. **Tema oscuro: colores pegados ilegibles** — nueva sanitización en `ticket-utils.ts`
   (`colorLuminance`/`sanearColorPegado`) aplicada al pegar, independiente del tema activo (la
   referencia siempre es "debe verse en fondo claro", porque el HelpDesk del cliente solo tiene tema
   claro): un `background-color` casi negro se reemplaza por amarillo tipo resaltador + texto oscuro
   forzado; un `color` casi blanco sin fondo oscuro que lo justifique se descarta. Verificado
   simulando un `paste` real: los dos casos extremos se corrigen (fondo amarillo/texto oscuro, texto
   sin color forzado), y un pegado normal (negro, rojo, verde suave) pasa intacto — el saneo es
   quirúrgico.
9. **Alerta de tareas sin ticket repetida + checkbox "no avisar hoy"** — causa raíz encontrada: el
   dedup permanente de estas alertas (`layout.ts`, `ALERTED_TASKS_KEY`) se sincroniza en cada tick de
   `checkReminders()`, y si el primer tick corre antes de que `perfil.cargarMiPerfil()` termine,
   `equiposQueLidero()` sale vacío → las tareas "vigentes" salen vacías → se purga TODO el dedup →
   en el siguiente tick todo vuelve a verse "nuevo". Fix: nueva bandera `perfilListo`, no se
   sincroniza el dedup hasta que el perfil esté listo. Además, nuevo checkbox "No avisar hoy" en
   `ReminderAlertDialog` (reusa el dedup DIARIO ya existente de los recordatorios de ticket).
   Verificado con `ng.getComponent` + Postgres local: el popup aparece con el checkbox; al marcarlo
   y forzar otro tick con el dedup permanente vaciado a propósito (simulando el bug), la tarea
   silenciada NO vuelve a aparecer.

**Estado:** desplegado a AWS 2026-09-21. Backend `3dfbb5b`, frontend `dc85e63`. Arranque limpio
verificado (Flyway sin cambios pendientes, `/api/legacy/*` responde). Punto 5 (sesión) y punto 6
(indicador de búsqueda en producción real) quedan sujetos a confirmación del equipo en el día a día.

### [2026-09-17] Incidente: recordatorios de Diana Fiallo borrados en `ticket_pendiente` — recuperados

**Contexto:** la dueña reportó que los recordatorios de Diana Fiallo (menú "Recordatorio"/Pendientes)
habían desaparecido. Se confirmó en producción (AWS): `ticket_pendiente` tenía 0 filas con dueño
real (`usuario_id`), pese a que el buzón de notificaciones de Diana mostraba decenas de alertas
"RECORDATORIO: #ticket" generadas por su propia sesión el mismo día. Se descartó que fuera por
alguno de los despliegues de esta semana (ninguno toca esta tabla) y que fuera un job programado
(no existe ningún `@Scheduled` en el backend que la toque).

**Causa raíz (hipótesis fundada, no 100% confirmada):** `LegacyWriteService.putHdPendientes()`
implementa un patrón "reconciliar" — cada vez que el actor guarda su lista de pendientes, el
backend BORRA todas sus filas existentes que no vengan en el envío (`TicketPendiente.delete("usuario
= ?1 and helpdeskTicketId not in ?2", actor, keep)`, o el borrado TOTAL si `keep` viene vacío). Esto
es seguro entre usuarios distintos (nunca toca los de otro), pero es peligroso si el propio cliente
manda una versión incompleta/vacía de SU PROPIA lista. Ya existe un aprendizaje del 2026-09-15
([[aprendizajes.md]]) que documenta que `persist()`/`fbPut()` de estos overlays es **fire-and-forget**
(no se puede esperar) — un `refresh()` disparado justo después puede ganarle la carrera al propio
guardado. Con Diana agregando ~31 recordatorios en ráfaga (14 sept, 19:42–21:14), es muy probable que
una de esas carreras haya mandado al final una versión vieja/vacía de la lista, que el backend tomó
como la nueva "verdad" y borró el resto.

**Recuperación realizada:** Postgres no sobreescribe una fila borrada al instante — la tupla sigue
físicamente en la página del heap hasta que el autovacuum la recicla. Se verificó que
`last_autovacuum` de `ticket_pendiente` era de 3 días antes del borrado (no había corrido desde
entonces) y `pg_stat_user_tables` marcaba 38 tuplas muertas. Se instalaron las extensiones estándar de
Postgres `pageinspect` (inspección de páginas crudas) y `pg_surgery` (cirugía de tuplas dañadas); con
`heap_page_items()` se identificaron 31 de esas 38 tuplas con datos aún intactos (mismo par
`t_xmin`/`t_xmax` en todas — un único INSERT y un único DELETE), y `heap_force_freeze()` las revivió
sin necesidad de decodificar los bytes a mano. Se respaldó la tabla antes de tocar nada
(`ticket_pendiente_backup_20260917`, borrada al confirmar éxito), se reconstruyeron los índices
(`REINDEX TABLE`, porque `heap_force_freeze` solo repara el heap, no los índices) y se corrió `VACUUM
ANALYZE` al final. Verificado de punta a punta con `curl` al endpoint real
(`/api/legacy/hdPendientes-visibles` con `X-Actor-Hid: DEFM001`): las 31 filas vuelven a aparecer,
con `mine: true`. Las 7 tuplas restantes (de las 38) ya habían sido podadas (HOT pruning) antes de la
intervención y sus datos NO eran recuperables — no se pudo determinar cuáles recordatorios
específicos representaban.

**Estado:** resuelto — recuperado el 100% de lo recuperable. **Pendiente:** decidir con la dueña si
se blinda `putHdPendientes` (y el resto de overlays con el mismo patrón reconciliar-y-borrar) contra
este tipo de carrera — no se tocó ese código todavía, es un cambio de riesgo que merece su propio plan.
No hay backups automáticos de la base en el servidor — de no haber sido recuperable por este método,
la información se habría perdido para siempre.

**Actualización (mismo día, segunda recurrencia):** volvió a pasar — Diana eliminó UN recordatorio
desde la pantalla de Pendientes y los 31 desaparecieron de nuevo. Se repitió exactamente la misma
recuperación (`pageinspect` + `pg_surgery`, mismas 31 tuplas, mismo `t_xmax` en todas → un solo
`DELETE`), confirmando que el disparador es la acción de **eliminar**, no una carrera aleatoria de
"agregar muchos de golpe". Causa confirmada: `Pendientes.remove()` → `DataService.removeHdPendiente()`
borraba la clave del mapa **local** (`_hdPendientes`) y reenviaba **todo el mapa** por el mismo `PUT`
reconciliador de `putHdPendientes()` — si ese mapa local no reflejaba fielmente las 31 filas reales
del servidor en ese momento (por lo que sea: la sesión no lo cargó completo, quedó desactualizado,
etc.), el `PUT` "reconciliaba" borrando todo lo que faltaba en el envío. El propio código YA tenía la
solución correcta para un caso hermano: `toggleHdGuardado`/`toggleGuardado` (borrado de UN solo
"Guardado" personal) usa un endpoint dedicado por ticket, sin tocar el resto — con un comentario
explícito avisando que esto es más seguro que "reemplazar el mapa completo, a diferencia de
hdActions/hdPendientes".

**Fix aplicado** (mismo patrón que `hdGuardados`) — **desplegado a AWS 2026-09-17**:
- Backend: nuevo `DELETE /api/legacy/hdPendientes/{ticket}` (`LegacyWriteResource.deleteHdPendiente`)
  que borra SOLO esa fila (`TicketPendiente.findByTicketAndUsuario` + `.delete()`), sin reconciliar
  nada del resto. El `PUT` de todo el mapa sigue existiendo por compatibilidad, pero **el frontend ya
  no lo llama para nada** (ver siguiente entrada).
- Frontend: `DataService.removeHdPendiente()` ahora llama a ese DELETE directo (awaited, igual que
  `toggleGuardado`) en vez de mutar `_hdPendientes` y hacer `persist()` del mapa completo;
  `Pendientes.remove()` espera la confirmación antes de refrescar.
- Verificado con `curl` contra Quarkus local Y en producción tras el despliegue: agregar 2
  recordatorios, borrar 1 por el nuevo endpoint → el otro sigue intacto. `./mvnw compile` y
  `npx tsc --noEmit`/`ng build` limpios. Commits: backend `e4128f5`, frontend `f4ee277`.

**Tercera recurrencia (mismo día, antes de terminar de verificar el fix de arriba):** un consultor
usó "postergar" sobre UN recordatorio y los 31 volvieron a desaparecer — mismo mecanismo,
disparador distinto (`setHdPendiente`/`updateHdPendiente`, usados por crear/pausar/reanudar/
postergar, seguían reenviando el mapa completo). Se recuperó con el mismo método
`pageinspect`/`pg_surgery`, y esta vez apareció una complicación nueva: una de las 31 tuplas
reconstruidas resultó ser una versión **vieja** (superada por un `UPDATE` posterior) del mismo
recordatorio que se estaba postergando — revivirla rompió la cadena HOT de Postgres (`REINDEX`
falló con "failed to find parent tuple for heap-only tuple"). Se resolvió con `pg_surgery`'s
`heap_force_kill` sobre la tupla problemática seguido de un `INSERT` normal con los mismos datos
(extraídos antes de tocar nada) — deja una fila nueva, limpia, sin arrastrar el problema de cadena.
**Aprendizaje para la próxima**: antes de revivir un lote de tuplas muertas, comparar sus `t_xmax`
contra los `t_xmin` de las filas YA VIVAS del mismo `id`/ticket — si coinciden, esa tupla muerta es
una versión vieja superada (parte de un `UPDATE`), no una fila realmente perdida, y no debe
revivirse.

**Fix ampliado** (mismo patrón, ahora también para crear/pausar/reanudar/postergar) — **desplegado
a AWS 2026-09-17**: nuevo `PUT /api/legacy/hdPendientes/{ticket}` (crea o reemplaza un solo
pendiente del actor, sin reconciliar) — `setHdPendiente`/`updateHdPendiente` del frontend ahora
llaman a este endpoint en vez de `persist('hdPendientes', ...)`. Verificado en producción: postergar
uno no toca al otro; los 31 recordatorios reales de Diana siguen intactos tras el despliegue.
Commits: backend `71d6131`, frontend `dae6783`.

**Pendiente:** revisar si `hdActions`/`hdNotes` (mismo patrón reconciliar-y-borrar) tienen el mismo
riesgo en sus flujos de escritura — no se tocaron todavía, fuera de alcance de este fix puntual.

---

### [2026-09-16] Cabecera compacta del modal de conversación de ticket (TicketMessagesDialog)

**Contexto:** la dueña pidió comprimir la cabecera del modal de detalle/conversación de un ticket
(el mismo `TicketMessagesDialog` ajustado varias veces esta semana), adjuntando una captura de
referencia. Antes la cabecera eran dos bloques verticales — `.conv-head` (barra fina con la
palabra "TICKET" + íconos) y `.conv-summary` (N° de ticket a 30–34px, título hasta 3 líneas,
cliente como chip, y luego 3 filas separadas: chips de tipo/estado/prioridad, fecha/creador,
asignado, y adjuntos con su propia etiqueta) — pudiendo llegar hasta `46dvh` de alto, quitándole
espacio real al área de lectura.

**Cambio:** se unificaron ambos bloques en un solo `.conv-header` con 2 filas:
- Fila 1: N° de ticket compacto (`#{{ ticketId }}`, 16px en vez de 30–34px) + título a **una sola
  línea** con ellipsis (antes hasta 3 líneas, con `matTooltip` para el texto completo) + cliente
  como **texto plano gris** (ya no chip) — a la derecha, los mismos íconos de siempre (volver del
  modo lectura ampliada, descargar PDF, cerrar).
- Fila 2: **todos** los metadatos que antes iban en 3 filas separadas (chips de tipo/estado/
  prioridad, fecha, actualización, creador, asignado, adjuntos) ahora en un solo contenedor
  `flex-wrap` — caben en una sola línea horizontal en escritorio y envuelven solo en celular. El
  bloque de adjuntos cambió su etiqueta de texto "Adjunto del ticket:" por un ícono de clip
  compacto, integrado en la misma fila (ya no tiene fila propia reservada).
- El colapsable de celular agregado ayer (`resumenExpandido`, botón "ver más") se mantiene igual
  en lógica — solo se reubicó el botón junto al cliente (que dejó de ser un chip) porque su
  anterior anfitrión (`.conv-summary-head`) ya no existe.

**Recalculado el presupuesto de `.composer`** (la regla de oro "Enviar nunca oculto" depende de
esta fórmula, no es opcional): el tope de la cabecera pasó de "56px fijos + 46dvh variable" a un
**único valor fijo en px** (`.conv-header { max-height: 220px; overflow-y: auto; }` como red de
seguridad — el contenido ahora es predecible, título a 1 línea, así que en el uso normal nunca
llega a necesitar ese scroll interno). La fórmula de `.composer` pasó de `calc(42dvh - 88px)` a
`calc(88dvh - 252px)` (= `88dvh − 220px(tope de .conv-header) − 32px(piso de .conv-body)`) — al
desaparecer el término `dvh` de la resta de la cabecera, el presupuesto que le queda al
compositor/área de lectura es MAYOR que antes, no menor.

**Verificado en Chrome (Playwright), midiendo `getBoundingClientRect` con 25 líneas de texto
inyectadas** (el mismo método de los fixes anteriores de este diálogo) — `fullyInside: true` para
"Enviar" en las 5 combinaciones obligatorias: escritorio 1280×900, tablet 768×1024, celular
390×844 colapsado, 390×844 expandido, y 360×640. Se probó también con el ticket exacto de la
captura de referencia (#33124) y con un ticket "pesado" (7 metadatos + adjunto + nombres muy
largos) — este último SÍ dispara el scroll interno de emergencia de `.conv-header` en celular
expandido (220px de tope vs. 351px de contenido real), comportamiento esperado y aceptado: es un
caso raro (nombres inusualmente largos + los 7 campos a la vez + celular + expandir a propósito),
no el camino normal. Sin overflow horizontal en 360px. Tema oscuro revisado visualmente, sin
regresiones. Menú de cambiar estado, diálogo de reasignar y descarga de adjuntos siguen
funcionando igual.

**Estado:** desplegado a AWS 2026-09-16. Frontend `d3a53e9`, imagen reconstruida y cargada en
`fitdesk-frontend` (sin cambios de backend en este punto).

### [2026-09-16] Fix: color del reporte de Vacaciones + modal de lectura con más espacio

Dos puntos de un plan de 3 (el tercero, "permisos por horas", va en una entrada aparte por ser más
grande):

**1. `reporte-dialog.ts` no respetaba el color personalizado por consultor.** Tenía su propia paleta
de 12 tonos pastel asignados por ORDEN DE APARICIÓN (`PALETTE`/`colorMap`), en vez de usar
`ColoresService` (el mismo servicio que ya usa Board/Tickets/Vacaciones/Semanal). Se eliminó la
paleta propia; `colorOf()` ahora es `const hid = v.usuarioHid || v.empleado || ''; return hid ?
this.colores.chip(hid) : NEUTRAL;` — mismo patrón ya verificado en `vacaciones.ts:158-161`. El color
de una persona en el reporte ahora es EXACTAMENTE el mismo que en el resto de la app, y ya no cambia
al cambiar el filtro de equipo/tipo del reporte (antes sí, por depender del orden de aparición).

**2. El modal de lectura de conversación (`TicketMessagesDialog`) no aprovechaba el espacio.** Dos
cambios, en el mismo archivo que se ajustó ayer para "Enviar" (composer/`conv-body` sin tocar):
- **`:host` pasa a tener `height: 88dvh` fija (no solo `max-height`)**, en TODOS los dispositivos
  (sin breakpoint — pedido explícito: "es importante que el área de lectura sea grande y visible en
  todos los dispositivos"). Antes el diálogo se dimensionaba según su contenido; con una conversación
  corta quedaba chico, con mucho fondo oscuro alrededor. Como `.conv-body` es `flex: 1 1 0`, el
  espacio extra se lo lleva solo el área de lectura.
- **En celular, `.conv-summary` arranca colapsado**: se separó el chip de cliente (siempre visible,
  junto a N° de ticket y asunto) del resto (chips de tipo/estado/prioridad, fecha/creador, asignado,
  adjuntos — ahora en `.conv-summary-extra`), con un botón toggle (`resumenExpandido` signal) que solo
  se muestra bajo `max-width: 599px`. En escritorio/tablet el resumen se ve siempre completo, sin el
  botón — comportamiento idéntico a antes ahí.

**Bug encontrado y corregido en el propio desarrollo:** el botón toggle no aparecía en celular pese al
media query — conflicto de especificidad CSS: la regla base `.conv-summary-head .summary-toggle {
display: none }` (especificidad 0,2,0) le ganaba a la del media query `.summary-toggle { display:
inline-flex }` (0,1,0) aunque esta viniera después en el archivo. Se igualó la especificidad de la
regla del media query.

**Verificado en Chrome (Playwright), midiendo `getBoundingClientRect`:**
- Escritorio (1280×900) y tablet (768×1024): el diálogo mide exactamente 88% del alto del viewport
  (792px y 901px respectivamente); sin el botón toggle.
- Celular (390×844): resumen colapsado por defecto (solo N°+asunto+cliente); el toggle despliega
  correctamente el resto. "Enviar" se confirmó SIEMPRE dentro del diálogo (`actionsFullyInside: true`)
  con 25 líneas de texto, tanto colapsado como expandido — el fix de ayer sigue intacto.

**Estado:** desplegado a AWS 2026-09-16 (junto con "permisos por horas", ver entrada siguiente). Front
`932035f`, imagen reconstruida y cargada en `fitdesk-frontend`.

### [2026-09-16] Feature: permisos por horas en Vacaciones (tercer punto del mismo plan)

**Contexto:** todo en Vacaciones funcionaba por DÍAS completos. El único "permiso" existente
(`tipo = PERMISO`) tiene cargo a vacaciones (días laborables × 1,36). Se necesitaba un tercer tipo,
corto e independiente, para ausencias de pocas horas (trámite, cita médica) — **sin cargo a
vacaciones** (no descuenta nada, igual que ningún registro de Vacaciones descuenta hoy un saldo real
dentro de la app — el saldo real lo lleva la unidad administrativa en el Excel externo). Se registra
directo, sin flujo de aprobación, y se ve en el mismo calendario mensual con un indicador visual
distinto (chip con borde punteado + ícono de reloj, no un chip idéntico a una ausencia de día
completo).

**Backend:** migración aditiva `V24__vacacion_horas.sql` (`ALTER TABLE vacacion ADD COLUMN horas
NUMERIC(4,1)`, nullable). `Vacacion.horas` nuevo; `VacacionResource.aplicar()` reconoce
`tipo = 'PERMISO_HORAS'` con `diasLaborables = 0` y `diasVacacion = 0` (no descuenta nada);
`describir()` expone `horas`.

**Frontend:** tercer botón segmentado "Permiso x horas" en `vacacion-dialog` (campo Horas,
`step 0.5`, sin fecha de fin — es un permiso de un solo día); `vacaciones.ts`/`.html` muestran el chip
punteado + ícono `schedule` en el calendario, tercera entrada en la mini-leyenda, y
`metaLinea()`/`etiquetaTipo()` muestran "Permiso (Nh)" en vez de días en el panel lateral;
`reporte-dialog` reconoce el tercer tipo en el filtro, tabla, CSV y PDF con una columna "Horas" y un
chip morado de total.

**Verificado en Chrome (Playwright) contra Quarkus/Postgres local:** registrar 3h y 2.5h (decimales
soportados) para un empleado — el calendario muestra el chip punteado + reloj; el panel lateral
muestra "Permiso (2.5h) · 15 sep"; editar y eliminar funcionan igual que los otros tipos; el Reporte
(Tabla + Calendario + CSV + PDF) reconoce el tipo sin errores, con el total de horas correcto en cada
salida; la leyenda de "días" del empleado no se ve afectada (queda en 0, confirmando que no descuenta
nada); responsive 360×640 sin overflow horizontal.

**Estado:** desplegado a AWS 2026-09-16 (junto con los otros dos puntos del mismo plan — color del
reporte y modal de lectura). Backend `b72d34e` (migración V24 aplicada en producción, confirmada en
logs de arranque); frontend `932035f`.

### [2026-09-15] Fix (recurrente): "Enviar" oculto en el compositor con mucho texto — causa raíz real

Reportado de nuevo ("otra vez se está ocultando el botón enviar..."): en `TicketMessagesDialog`,
con una respuesta larga (y, más específico de lo que se pensaba, un ticket con resumen alto —
título, chips, adjuntos) en una ventana no muy alta, el botón "Enviar" quedaba recortado contra el
borde del diálogo. Ya existía un fix previo para esto (topes en `dvh` en `.conv-summary` y
`.composer`), pero el mecanismo real por el que fallaba nunca quedó del todo resuelto — este fix
identifica la causa raíz con precisión, verificada empíricamente paso a paso.

**Investigación (varios intentos descartados, documentados en el propio código para no repetirlos):**
1. Se probó hacer `.conv-summary` encogible (`flex: 0 1 auto` + `min-height`) para que cediera
   espacio antes que el compositor. Descartado: un elemento con `overflow-y: auto` que además puede
   encoger usa automáticamente mínimo 0 (regla del spec de flexbox para "scroll containers"), y
   `.conv-title` (`-webkit-line-clamp` + `display:-webkit-box`) colapsaba a 0px de alto en cuanto
   `.conv-summary` participaba del reparto de encogimiento — **incluso sin presión real de espacio**
   (bug conocido de esa combinación CSS dentro de un flex que puede encoger).
2. Se probó `flex-basis: 0` en `.conv-body` (en vez de `auto`) para aislar el reparto. No alcanzó
   por sí solo: **`.conv-body` y `.composer` NO tienen `box-sizing: border-box`**, así que su
   `padding` se suma POR FUERA de cualquier alto calculado por flex — un elemento con
   `min-height: 0` y `overflow-y: auto` puede encoger su CONTENIDO a 0, pero nunca su padding.
   `.conv-body` tiene un piso real de ~32px (su padding) que ninguna combinación de `min-height`/
   `flex-basis` puede bajar.
3. Reducir los topes de `.composer`/`.composer-input` (probado con valores a ojo) mejoraba pero no
   garantizaba nada, porque el reparto proporcional del encogimiento entre dos hermanos flex con
   `flex-basis` distintos (`.conv-body` y `.composer`, ambos con `flex-shrink` > 0) no dio un
   resultado predecible — a veces el compositor no cedía nada aunque `.conv-body` ya estuviera en su
   piso.

**Fix real:** en vez de perseguir un reparto "automático" entre hermanos flex (impredecible en la
práctica), `.composer` pasa a ser **rígido** (`flex: 0 0 auto`, ya no encoge) con un
**`max-height` calculado a mano** en función de las demás piezas fijas del diálogo:
```
max-height: calc(88dvh − 46dvh − 56px − 32px) = calc(42dvh − 88px)
```
(88dvh = tope de `:host`; 46dvh = tope de `.conv-summary`, rígido, no cede; 56px = alto de
`.conv-head`; 32px = piso real de `.conv-body`, su padding). `.conv-body` queda como el ÚNICO
elemento que de verdad encoge/scrollea (`flex: 1 1 0; min-height: 0`), sin competir con nadie más —
comportamiento simple y predecible. Ambos, `.composer` y `.conv-body`, ganaron `box-sizing:
border-box` (antes solo aplicaba a hijos puntuales) para que su `padding` no se sume por fuera del
`max-height`. Dentro de `.composer`, `.composer-input` es el único hijo encogible (sin competencia),
así que absorbe la diferencia de forma predecible hasta su piso (`min-height`, bajado de 44px a
36px para ganar un poco más de margen en el caso más extremo).

**Verificado en Chrome (Playwright), midiendo posiciones exactas (`getBoundingClientRect`), no solo
visualmente:**
- Caso normal (ventana alta, sin texto): título del ticket visible (22px), sin cambios de
  comportamiento.
- Caso normal con 8 líneas de respuesta: el área de texto crece cómodo (135px), sin recortes.
- Caso extremo (1024×560, 25 líneas de texto, el ticket con el resumen más alto que se encontró):
  "Enviar" queda completo dentro del diálogo, con margen (antes se recortaba por 81px).
- Mismo caso extremo en móvil (390×600): también correcto.

**Desplegado a AWS:** commit `7f73076` (`fit-desk`, solo frontend). Bundle `main-3KWE3L64.js`
confirmado sirviendo en `:8080`; HelpDesk (`:443`) en 302; memoria 3.7 GB disponibles.

**Estado:** vigente, en producción.

### [2026-09-15] Fix: el TÍTULO de la notificación de recordatorio también mostraba el código sintético

Reportado con captura (panel de la campanita, no el popup): un recordatorio sin ticket se leía
"Recordatorio: #REC-1789457344..." — el código sintético estaba incrustado directo en el `titulo` de
la notificación, arma­do con un template string fijo en `checkReminders()`
(`titulo: \`Recordatorio: #${x.ticket}\``), sin distinguir si `x.ticket` era un N° real o una clave
`REC-...`. Ya se había corregido el hipervínculo (ronda anterior) y el código en el CUERPO del popup
(ronda de hoy), pero el título de la notificación persistente quedó afuera de esas dos correcciones —
un tercer lugar con el mismo defecto de fondo.

**Fix:** título condicional — `'Recordatorio'` a secas si `x.ticket` empieza con `REC-`, o
`` `Recordatorio: #${x.ticket}` `` igual que siempre para un ticket real. El cuerpo no cambia (ya
mostraba cliente/nota, nunca el código).

**Verificado en Chrome:** insertado un recordatorio de prueba directo en Postgres (vencido), invocado
`checkReminders()` manualmente — el popup mostró "Tienes un recordatorio: COAC TEST TITULO / prueba
titulo sin codigo" (sin código, ya confirmado en la ronda anterior) y la campanita mostró el título
como **"Recordatorio"** a secas, mientras un recordatorio real de ticket ("#40021") conserva su código
al lado. Datos de prueba borrados de la base local al terminar. Nota: notificaciones YA EXISTENTES en
producción con el formato viejo (creadas antes de este fix) conservan el título viejo hasta que se
marquen leídas — es solo texto histórico, sin impacto funcional, no se tocó la base de producción.

**Desplegado a AWS:** commit `58d769d` (`fit-desk`, solo frontend). Bundle `main-I4P35SDC.js`
confirmado sirviendo en `:8080`; HelpDesk (`:443`) en 302; memoria 3.8 GB disponibles.

**Estado:** vigente, en producción.

### [2026-09-15] Tareas acabadas sin alertar, popup sin código sintético y buscador visible en móvil

Cuatro pedidos cortos de la dueña, uno de ellos ("los N° de ticket son de 1 a 5 dígitos, no 5
exclusivos") era solo una corrección de redacción — el regex del buscador (`/^\d{1,5}$/`, entrada
anterior) YA admitía 1 a 5 dígitos; se corrigió el comentario que decía "son de 5 dígitos" (podía
leerse como "exactamente 5").

**1. Tareas ya acabadas no deben generar alertas.** `tareasAsignadasVigentes()` (la que dispara
"Nueva tarea asignada") no miraba el `status` de la tarea — una tarea sin ticket que llegaba directo a
"Entregado" (o que ya estaba ahí antes de que este chequeo corriera la primera vez) igual alertaba una
vez, sin sentido para algo que ya no requiere acción. Se agregó `s.status === 'done'` a la condición de
descarte. No afecta a `tareasSinFinalizarVigentes()` (alerta aparte, "sin finalizar", dirigida a quien
dirige el equipo — esa SÍ debe seguir disparando para tareas en Entregado sin el check "Finalizado").

**2. El popup de recordatorio sin ticket no debe mostrar su código.** Ya no era un hipervínculo (fix
de la ronda anterior), pero seguía mostrando la clave sintética `#REC-...` como texto — un código que
el usuario no reconoce ni puede usar para nada. Se quitó del todo para ese caso en
`ReminderAlertDialog`; sigue mostrando cliente y nota, que es lo que sí sirve.

**3. Buscador no visible en móvil.** Antes vivía solo dentro del drawer colapsable — había que abrir
el menú ☰ para encontrarlo, a diferencia de escritorio donde ahora está siempre a la vista (barra
superior, ronda anterior). Agregado un ícono de lupa en la barra superior móvil que, al tocarlo,
despliega el campo a ancho completo (reemplaza temporalmente ☰+marca+campanita+perfil, con autofoco vía
`afterRenderEffect`); un botón "←" lo cierra. Mismo signal `gBuscar`/método `buscarGlobal()` que
escritorio — `buscarGlobal()` ahora también cierra el buscador móvil al ejecutar la búsqueda.

**Nota de investigación (Playwright, no de producto):** al probar el ☰ y la lupa en móvil, el CLIC
simulado de Playwright no disparaba el handler (`drawerOpen`/`mobileSearchOpen` no cambiaban), pero un
`button.click()` nativo vía `evaluate()` sí — con `elementFromPoint` confirmando que no hay nada
tapando el botón. Se trata como una rareza puntual del entorno de pruebas (ya documentada antes en esta
sesión con otro síntoma), no un bug de la app: se verificó el flujo completo forzando el estado por
signal y confirmando visualmente cada paso.

**Verificado en Chrome (Playwright, 390×844) contra Quarkus/Postgres local:** el ícono de lupa
despliega el campo con foco automático; buscar "33624" filtra a 1 resultado y cierra el buscador solo,
igual que en escritorio.

**Desplegado a AWS:** commit `0d5f149` (`fit-desk`, solo frontend). Bundle `main-4BDGJYOB.js`
confirmado sirviendo en `:8080`; HelpDesk (`:443`) en 302; memoria 3.9 GB disponibles.

**Estado:** vigente, en producción.

### [2026-09-15] Recordatorios sin ticket: edición completa, equipo del creador y sin hipervínculo falso

Tres pedidos relacionados sobre el recordatorio SIN ticket (nota personal `REC-<timestamp>`, ver
entrada de "Crear recordatorio" anterior):

**1. Editar cliente y nota, no solo fecha/hora.** `PendienteDateDialog` ("Postergar / fecha") solo
dejaba tocar fecha/hora/nota; el cliente se mostraba como texto fijo y ni siquiera viajaba en
`PendienteDateResult`. Se agregó el mismo autocomplete de cliente que ya usa `CrearRecordatorioDialog`
(duplicado a propósito — mismo criterio ya usado entre esos dos diálogos para la lógica de
fecha/hora: cada uno autocontenido), condicionado a `data.sinTicket`; `PendienteDateResult` ahora
incluye `clienteRaw`. `pendientes.ts` → `postergar()` lo manda en el patch y también lo aplica
localmente de inmediato (mismo patrón optimista que `crear()`: `updateHdPendiente` es un PUT
fire-and-forget, un `refresh()` inmediato podía ganarle la carrera). Backend sin cambios: `putHdPendientes`
ya persistía `clienteRaw` en cada PUT.

**2. El equipo debe ser el del usuario que lo creó.** Investigado a fondo: **ya estaba bien** en el
backend — `equipoDeUsuario(p.usuario)` (`LegacyReadResource.java`) siempre deriva el equipo del DUEÑO
del `TicketPendiente`, nunca del ticket/cliente, así que un `REC-xxx` ya agrupaba correctamente bajo
el equipo real del creador (confirmado con SQL directo + `curl` al endpoint). El bug real estaba en el
FRONTEND: el ítem optimista que agrega `crear()` a la lista local (para no depender de ganarle la
carrera al `refresh()`) no incluía el campo `equipo`, así que aparecía un instante bajo "Sin equipo"
antes de que el próximo refresh lo reconciliara. Corregido copiando `perfil.misEquipos()[0]?.nombre`
(ya cargado para el perfil del usuario) al ítem optimista.

**3. Sin hipervínculo ni modal.** Reportado con captura: en el popup de alerta (`ReminderAlertDialog`)
un recordatorio sin ticket se mostraba con el mismo botón-link azul subrayado que un ticket real, pero
al clickearlo intentaba abrir `TicketMessagesDialog` para una conversación que no existe (clave
sintética `REC-...`, no hay ticket real en el HelpDesk). Se agregó `esSinTicket()` — si el código
empieza con `REC-`, se muestra como texto plano (`<span>`) en vez de `<button class="ra-tk-btn">`, y
`abrirTicket()` se guarda por las dudas aunque el botón ya no exista. **Mismo defecto encontrado
también en el panel persistente de la campanita** (`notifLinkLabel()` en `notif-utils.ts`): una
notificación `RECORDATORIO` de un `REC-xxx` también se mostraba como enlace y `abrirNotificacion()`
(`layout.ts`) intentaba abrir la misma conversación inexistente — corregido con el mismo criterio
(`id.startsWith('REC-')` → sin link, sin acción).

**Verificado en Chrome (Playwright) contra Quarkus/Postgres local:** crear un recordatorio sin ticket,
editar su cliente vía "Postergar / fecha" y confirmar el cambio persistido (`curl` al endpoint);
crear uno nuevo y confirmar que aparece de inmediato agrupado bajo el equipo real (sin pasar por "Sin
equipo"); crear uno con vencimiento a 1 minuto y confirmar en la campanita que la notificación
generada ("Recordatorio: #REC-...") no tiene hipervínculo, a diferencia de una de ticket real
("#40021") que sí lo tiene al lado. Datos de prueba borrados de la base local al terminar.

**Desplegado a AWS:** commit `e6cfb13` (`fit-desk`, solo frontend). Mismo procedimiento: clon
actualizado en el Mac, `docker buildx --platform linux/amd64`, `docker save`/`scp`/`docker load`,
recreado solo `fitdesk-frontend`. Bundle `main-6Z3Y52LB.js` confirmado sirviendo en `:8080`; HelpDesk
(`:443`) sigue en 302; memoria 3.9 GB disponibles tras el deploy.

**Estado:** vigente, en producción.

### [2026-09-15] Desplegado a AWS: barra superior en escritorio + 3 fixes (campanita, buscador, tema oscuro)

**Frontend** `3f781cc` (`fit-desk`, sin cambios de backend). Mismo procedimiento que lotes anteriores:
clon fresco de GitLab en el Mac, copiar los archivos tocados, compilar, commitear y pushear, `docker
buildx --platform linux/amd64` para cross-compilar, `docker save`/`scp`/`docker load` al servidor y
recrear solo el contenedor `fitdesk-frontend`.

**Contenido:** la barra superior de escritorio (logo/buscador/campanita/perfil), el fix de scroll
lateral de la campanita, el fix del control "Ordenar" invisible en tema oscuro y el fix del buscador
para números de 6+ dígitos — las cuatro entradas de hoy.

**Verificado en producción:** bundle nuevo `main-WRQOF6P2.js` confirmado sirviendo en `:8080`;
HelpDesk (`:443`) sigue en 302 sin tocar; memoria 3.9 GB disponibles tras el deploy.

**Estado:** vigente, en producción.

### [2026-09-15] Buscador global: un número de 6+ dígitos ya no se busca como N° de ticket

Los N° de ticket del HelpDesk son siempre de **5 dígitos**; el buscador único del shell
(`layout.ts` → `buscarGlobal()`) decidía "N° de ticket" con `/^\d+$/` (cualquier cantidad de dígitos),
así que un número más largo (p. ej. pegado por error, o un dato de 6+ dígitos que casualmente es solo
numérico) se buscaba como ticket exacto en vez de como texto — y nunca podía dar resultado real.
Cambiado a `/^\d{1,5}$/`: de 6 dígitos en adelante cae a búsqueda por texto/contenido, igual que
cualquier otra cadena no numérica. Es la única detección de este tipo en el código (confirmado con
`grep`, no había lógica duplicada en otro componente).

**Verificado en Chrome:** `336249` → "Buscando por texto... No se encontraron tickets que contengan
'336249'" (antes hubiera intentado como N° exacto); `33624` (5 dígitos) sigue funcionando como N° de
ticket exacto, sin cambios.

**Estado:** vigente, en producción.

### [2026-09-15] Fix: "Ordenar" invisible en tema oscuro (Tickets)

El control "Ordenar por" del sidebar se veía blanco en tema oscuro, con el texto invisible (blanco
sobre blanco) — reportado con captura. **Causa:** su plantilla (`tickets.html`) se define dentro de
`TicketsComponent` pero se **proyecta al drawer del shell** vía `*ngTemplateOutlet` (mecanismo de
`ShellService.sort()`) — en el DOM real queda fuera del subárbol de `<app-tickets>`, así que el
override `:host-context(html[data-theme='dark']) { .tool-sort {...} }` en `tickets.scss` nunca
encontraba su host y no se aplicaba nunca (el fondo se quedaba en el `#fff` por defecto). Mismo tipo de
bug que ya se había dado con el panel de la campanita (`layout.scss`, portal del CDK a `<body>`): la
plantilla vive en otro punto del DOM del que asume `:host-context`. El texto/ícono sí cambiaban de
color porque las variables CSS de Material (`--mat-sys-on-surface-variant`) heredan por el DOM real, no
por el árbol de encapsulación de Angular — de ahí que solo el FONDO se quedara mal.

**Fix:** en `tickets.scss`, la regla de `.tool-sort` se reescribió como `::ng-deep html[data-theme='dark']
.tool-sort { background: #1a222b; }` (selector global escrito a mano, no depende de que el host de
Tickets sea ancestro real). Las demás reglas del mismo bloque (`.hd-status`, `.hd-tab-count.alert`) SÍ
viven dentro del propio árbol de Tickets y no se tocaron.

**Verificado en Chrome (Playwright):** escritorio (1280×800, drawer fijo) y móvil (360×640, drawer
overlay) — el control ya se ve oscuro con `#1a222b` de fondo y el texto "Modificación (recientes)"
legible en ambos.

**Estado:** vigente, en producción.

### [2026-09-15] Barra superior en escritorio (logo, buscador, campanita, perfil) + fix de scroll lateral en la campanita

**Fix previo (campanita):** el ancho de 680px en escritorio (lote anterior) quedaba embutido en el
`.mat-mdc-menu-panel` real de Material, que trae por defecto `max-width: 280px` — nunca se había
sobreescrito, así que Material agregaba scroll LATERAL para "alcanzar" el ancho real en vez de
mostrarlo completo. Se anuló ese `max-width` (`::ng-deep .notif-menu.mat-mdc-menu-panel { max-width:
none; overflow-x: hidden; }`). Además `.notif-item` tenía `width: 100%` + `padding: 10px 14px` SIN
`box-sizing: border-box` (no hay reset global de `box-sizing` en el proyecto) — sumaba 28px extra por
fuera del panel en cada fila. Con las dos correcciones, medido con Playwright: `scrollWidth ===
clientWidth` en el panel y en cada fila, cero scroll horizontal.

**Decisión (layout):** en escritorio (`fixed()`, `min-width: 900px`), el logo, el buscador único,
la campanita y el perfil (+ toggle de tema + cerrar sesión) se mudan de la esquina del sidebar fijo a
una barra superior (`.topbar`) — pedido con mockup, patrón tipo Jira/Linear: el sidebar queda solo
para navegación + Filtros/Ordenar (herramientas de cada vista, no chrome global). Acotado
explícitamente a escritorio ("en computador"): el comportamiento móvil/tablet (topbar reducido con
☰, todo colapsable dentro del drawer overlay) no se tocó.

**Implementación:** `layout.html` — el `<mat-toolbar class="topbar">` (antes solo `@if (!fixed())`)
ahora se renderiza siempre, con una rama `@else` para escritorio que repite el mismo buscador/campanita
/perfil que antes vivían en `.drawer-brand`/`.tool-search`/`.drawer-user`, ahora gateados a
`@if (!fixed())` en el sidebar. Mismo `<mat-menu #notifMenu>` sirve como disparador desde el nuevo
botón (patrón ya usado entre el topbar móvil y el drawer: un `mat-menu` admite varios triggers). Color
de la barra: sólida `color="primary"`, igual que el topbar móvil ya existente (sin patrón visual
nuevo). `layout.ts` no se tocó — es 100% reubicación de markup, mismos signals/métodos
(`gBuscar`/`buscarGlobal()`/`mostrarNotificaciones()`/`abrirPerfil()`/`theme.toggle()`/`logout()`).

**Verificado en Chrome (Playwright) contra Quarkus/Postgres local:** 1280×800, 1024×768 y 900px (límite
exacto del breakpoint) muestran la barra completa sin recortes ni scroll horizontal; buscar un N°
desde el buscador de arriba filtra igual que antes; campanita y perfil abren sus diálogos igual que
antes. A 899px y 360×640 el comportamiento móvil queda intacto (☰, drawer overlay, buscador dentro del
drawer) — no hubo regresión.

**Desplegado a AWS:** commit `f2ce4c3` (`fit-desk`, solo frontend — sin cambios de backend), imagen
`fitdesk-frontend:latest` cross-compilada en el Mac (`docker buildx --platform linux/amd64`),
transferida por `docker save`/`scp`/`docker load` y recreado solo el contenedor `fitdesk-frontend`
(mismo procedimiento que lotes anteriores). Bundle nuevo `main-57WFMF5E.js` confirmado sirviendo en
`:8080`; HelpDesk (`:443`) sigue en 302 sin tocar; memoria 4.0 GB disponibles tras el deploy.

**Estado:** vigente, en producción.

### [2026-09-15] Desplegado a AWS (8º lote): guardados, recordatorio sin ticket, ajustes varios

**Backend** `fb0dd18` (`fit-desk-api`, aplica V22+V23), **frontend** `8e0cbb9` (`fit-desk`), bundle
**`main-6PR3SZKB.js`**. Mismo procedimiento que el 7º lote (workspace local no es el repo real →
copiar a mano los archivos tocados sobre clones frescos de GitLab, compilar en el contexto real,
recién ahí commitear y pushear).

**Contenido:** los nueve puntos de la entrada "Ronda de ajustes" de hoy — campanita 680px en
escritorio, subtipo "Reunión de trabajo", ocultar APROBADO/CERRADO por defecto en
Asignados-a-mí/Todos-los-clientes, fix de sync en Mi Panel, guardado personal de tickets (tabla
nueva + pantalla `/guardados`), quitar "Ver en Tickets" del popup de novedades, "Crear
recordatorio" sin ticket (+ fix de nota/pausar que nunca persistían), fix de carrera al crear un
recordatorio, fix del hipervínculo de tareas sin ticket en la campanita, checkbox "Finalizado" en
el modal restringido a RE/Supervisor.

**Verificado en producción:** Flyway 21→23 sin errores; `GET /api/legacy/hdGuardados` → 200;
HelpDesk intacto (302) antes y después; memoria 4088 MB disponibles tras ambos despliegues (dentro
de lo normal). No se hizo recorrido visual con usuario real en producción (ya se verificó
exhaustivamente en local, en Chrome real, contra Postgres del docker-compose).

**Estado:** vigente, en producción.

### [2026-09-15] Ronda de ajustes: campanita ancha, reunión de trabajo, filtros, guardados personales

**Contexto:** feedback de la dueña usando la app en escritorio, siete pedidos independientes en la
misma sesión (algunos ampliados/corregidos sobre la marcha tras probarlos en vivo).

**1. Campanita más ancha en escritorio.** `.notif-panel` pasó de `min(340px,92vw)` fijo a
`680px` en `min-width:900px` (primero se probó 420px, la dueña pidió "el doble" tras verlo).

**2. Nuevo subtipo de reunión "Reunión de trabajo".** Aditivo: `subtipo` ya era un string libre
(`Tarea.subtipo`, sin enum en BD); se agregó un tercer botón `'TRABAJO'` en `reunion-dialog.html` y
un tercer caso en `board.ts` `subtipoLabel()`. Sin migración.

**3. "Asignados a mí"/"Todos los clientes" ocultan APROBADO/CERRADO/NO APLICA por defecto.** La
pestaña Equipo ya lo hacía desde jul-2026 (`pendingStatusIds()` en `tickets.ts`); se extendió la
misma condición a esas dos pestañas. Una línea, mismo mecanismo, sin inventar nada nuevo.

**4. Bug corregido: bandera de acción no aparecía de inmediato en Mi Panel.** Causa raíz:
`mi-panel.ts` nunca releía `actions`/`notes`/`pendientes` del `DataService` tras cargar (sí lo hace
`tickets.ts`, con su propio `syncOverlays()`). Se agregó el mismo método y se llama tras
`ensureInit()` y en cada `refresh()`.

**5. "Marcar acción" (bandera) queda solo para RE; "Guardar" (nuevo, personal) para todos.**
- Backend: migración V22, tabla `ticket_guardado` (usuario+ticket, único), entidad
  `TicketGuardado`, `GET/PUT /api/legacy/hdGuardados/{ticket}` (toggle **awaited**, no
  fire-and-forget como `hdActions`).
- `TicketCard` gana `puedeMarcarAccion`/`esGuardado`/`toggleGuardado`; el botón de bandera queda
  tras `@if (puedeMarcarAccion())` (lo pasa el contenedor con `auth.esResponsableEquipo()`); el de
  Guardar se muestra siempre. RE ve los dos.
- Pantalla nueva **Guardados** (`/guardados`, nav bajo Seguimiento): mismo patrón de página que
  Recordatorio, pero con `app-ticket-card` (pedido explícito: cards, no tabla) — trae el `Ticket`
  completo por id vía `hd.searchTicketRemote()` (ya existía, usado por la búsqueda de tickets).

**6. Quitado el botón "Ver en Tickets" del popup de novedades** (`esNovedades`); "Ver pendientes"
(recordatorio de tickets) queda intacto, son casos distintos. Se limpió en cascada todo el mecanismo
que solo servía a ese botón: `NuevosTicketsService.pedirVer/tomarPendienteVer/verNovedades` y
`Tickets.verNovedadesEquipo()` — quedaban 100% muertos sin él, no se dejó código sin uso.

**7. Nuevo: "Crear recordatorio" en Recordatorio, SIN ticket.** Confirmado con la dueña: es una
nota personal ligada a un cliente (cliente + fecha + hora + nota), no un ticket real — mismo
espíritu que una tarea sin ticket del Board. Clave sintética `REC-<timestamp>` en el mismo
`helpdesk_ticket_id` de `ticket_pendiente` (igual que `TA-NNN` para tareas). De paso se corrigieron
dos bugs vivos documentados en `knowledge/17` que nunca se habían arreglado: la **nota** de un
recordatorio se descartaba (`putHdPendientes` no la leía/guardaba) y **"Pausar" no persistía**
(faltaba la columna) — migración V23 agrega `nota`/`paused` a `ticket_pendiente`.

**Bug propio encontrado y corregido en el camino:** el botón "Crear" armaba el recordatorio con
`data.setHdPendiente()` (persiste con PUT fire-and-forget) y llamaba `refresh()` de inmediato — la
lectura le ganaba la carrera a la propia escritura y el recordatorio recién creado no aparecía hasta
recargar. Se cambió a agregarlo **optimista** a la señal local (`pend.update(...)`), sin esperar al
servidor.

**8. El hipervínculo de tareas sin ticket en la campanita a veces no abría el modal.** Causa:
`abrirNotificacion()` buscaba la tarea en `data.stories()` sin esperar a que `ensureInit()`
terminara de poblarla — si el clic llegaba antes (o desde una pestaña sin el Board montado), la
búsqueda fallaba y caía al fallback (`/board` sin más). `stories()` es GLOBAL (`GET /stories` sin
filtro de board), así que el problema era pura carrera, no de alcance: se agregó
`await this.data.ensureInit()` (memoizado, gratis si ya cargó) antes de buscar.

**9. Checkbox "Finalizado" también en el modal de detalle, para tareas sin ticket en Entregado**
(pedido explícito, "mismas condiciones del check de la card"). Se agregó a `card-detail-dialog.ts`/
`.html`, reusando `ConfirmDialog`/`data.approveStory`/`unapproveStory` igual que `board.ts`. **Al
revisarlo con la dueña, se ajustó la condición**: finalizar (a diferencia de mover/arrastrar, que sí
deja al propio asignado) queda **solo para RE/Supervisor** — se cambió en los DOS lugares
(`board.ts` `onFinalize` y `card-detail-dialog.ts` `onFinalize`) para que seguirlas idénticas,
usando `puedeGestionarTodo()` en vez de `puedeOperar()`/`puedeMover()`. Mensaje de aviso propio
("Solo un Responsable de Equipo o el Helpdesk pueden finalizar esta tarea"), separado del genérico
de mover, para no decir que el asignado puede cuando ya no puede.

**Archivos:** ver los `git diff` de esta sesión — toca `layout.scss`, `reunion-dialog.html`,
`board.ts`/`.html`, `tickets.ts`, `mi-panel.ts`/`.html`, `ticket-card.ts`/`.html`/`.scss`,
`data.service.ts`, `card-detail-dialog.ts`/`.html`, `pendientes.ts`/`.html`/`.scss`,
`crear-recordatorio-dialog.ts` (nuevo), `pendiente-date-dialog.ts`, `guardados.{ts,html,scss}`
(nuevo), `app.routes.ts`, `nuevos-tickets.service.ts`; backend: `TicketGuardado.java` (nuevo),
`LegacyReadResource.java`, `LegacyWriteResource.java`, `TicketPendiente.java`,
`LegacyWriteService.java`, migraciones V22/V23.

**Verificado en local** (Postgres Docker + Quarkus dev + `ng serve` + Chrome real vía Playwright,
sesión MSC001, que es RE): campanita ancha en 1280×800; filtro por defecto en Asignados a
mí/Todos los clientes (5 tickets, ninguno APROBADO/CERRADO); RE ve bandera+Guardar; Guardar
persiste (`GET /api/legacy/hdGuardados` confirmado) y aparece como card real en `/guardados`;
quitar desde ahí lo saca de la lista; Crear recordatorio guarda cliente+fecha+hora+nota reales
(confirmado en Postgres) y aparece de inmediato tras el fix de la carrera; clic en un hipervínculo
de tarea sin ticket en la campanita abre `CardDetailDialog` (no cae a `/board`) incluso estando en
Tickets; el checkbox Finalizado aparece en el modal de una tarea real sin ticket en Entregado y
dispara el mismo diálogo de confirmación que la card. **No verificado en vivo:** la vista de un
usuario NO-RE (no hay credenciales reales de otra persona en este entorno) — confirmado por lectura
de código, mismo patrón que otros permisos ya probados en la app.

**Estado:** vigente, sin desplegar (regla de no desplegar sin permiso).


### [2026-09-15] Desplegado a AWS (7º lote): buzón de notificaciones + campanita rediseñada

**Backend** `ff51ba4` (`fit-desk-api`), **frontend** `659cc5f` (`fit-desk`), bundle
**`main-XENTPJET.js`**. Backend primero (aplica la migración V21).

**Contexto sobre cómo se hizo el push:** el workspace local (`/Users/zolmaria/Documents/fitdesk`) NO
es un clon de los repos reales — apunta a GitHub (`fit-desk-nacional`), mientras que el servidor
clona de **GitLab** (`gitlab.fit-bank.com/servicios/{fit-desk,fit-desk-api}`). Al comparar, el backend
real de GitLab ya tenía aplicado TODO el trabajo de lotes anteriores (coincidía exacto con el 6º
lote); el frontend real, en cambio, reveló que la copia local de `app/` tenía **contaminación**:
archivos sueltos de un backend FastAPI huérfano (`main.py`, `models/`, etc., mencionados en el
`CLAUDE.md` raíz) y le faltaban `.gitignore`/`environment.onprem.ts` respecto al repo real — un
`rsync --delete` ciego los habría borrado del repo real. Se optó por copiar a mano únicamente los 8
archivos que tocó esta sesión (backend: 7 archivos; frontend: 8 archivos) sobre clones frescos de
GitLab, se compiló cada uno en su contexto real (`mvn compile` y `ng build -c onprem`, ambos limpios)
y recién ahí se commiteó y pusheó — evita mezclar cualquier cosa no verificada de este lote.

**Verificado en producción:**
- Flyway: `Current version of schema "public": 20` → `Migrating... to version "21 - notificaciones"` →
  aplicada sin errores.
- `GET /api/notificaciones` (con `X-Actor-Hid`) → 200.
- App en `:8080` → 200, bundle `main-XENTPJET.js` (nuevo, distinto a lotes anteriores).
- **HelpDesk intacto** (Apache 302) antes, entre backend y frontend, y después.
- Memoria: 4092 MB disponibles tras el backend, 4057 MB tras el frontend (dentro de lo normal, sin
  presión).
- Los 3 contenedores (`fitdesk-backend`, `fitdesk-frontend`, `fitdesk-db`) arriba y sanos.

**No verificado:** recorrido visual en Chrome con un usuario real de producción (hubiera requerido
credenciales reales del HelpDesk contra el sistema en vivo; se decidió no hacerlo). La funcionalidad
ya se verificó exhaustivamente en local en las entradas anteriores de hoy.

**Estado:** vigente, en producción.

### [2026-09-15] Rediseño del panel de la campanita: pestañas, grupos e hipervínculo directo

**Decisión:** el panel dropdown de notificaciones (lista plana de la entrada anterior) se rediseñó
con: (1) pestañas **Todas/Tareas/Tickets** con conteo, agrupando los 7 tipos según a qué pantalla
navega cada uno (mismo criterio que ya tenía `abrirNotificacion()`); (2) secciones **Nuevas/
Anteriores** según `leida`; (3) ícono en círculo de color por tipo, reusando paleta/íconos que el
propio proyecto ya asigna a estos conceptos en `reminder-alert-dialog.ts` y `bandeja.html` (no
colores inventados); (4) cada ítem deja de ser un solo `<button>` gigante — el número de tarea/ticket
es un botón-link independiente (azul, subrayado permanente, copiado literal de `.ra-tk-btn` del
popup de recordatorio), y clicar el resto de la fila no hace nada, igual que en el popup.

**Contexto:** la dueña compartió una captura de otra app como referencia visual y pidió "diseñar algo
así", con el recordatorio de que la app siempre debe ser responsive. Se descartó del mockup lo que no
tiene equivalente real en FitDesk (pestaña "Menciones", chip de prioridad, tipo "tarea completada",
página de historial completo, engranaje de preferencias) tras confirmarlo con ella. Luego, en revisión,
pidió explícitamente que el hipervínculo al modal SÍ estuviera (como el popup) — la primera versión de
este plan lo había descartado por un problema real de HTML (no se puede anidar un elemento clicable
dentro de un `<button>`), resuelto copiando la solución que el propio popup ya usa: la fila no es un
botón, solo el código lo es.

**Reunión: código de tarea + botón "Unirse".** Al revisar, se notó que `REUNION` también es una Tarea
(tiene código TA-NNN) y puede tener link de videollamada, así que se le agregó el mismo botón-link de
código (antes no tenía ninguna acción) y, si tiene `link`, un botón "Unirse" separado (píldora rellena,
copiada de `.ra-join` del popup). Como `Notificacion` no tiene un campo propio para el link de reunión
y no se quiso tocar el backend por un solo campo opcional, se codificó como `&join=<url>` pegado al
mismo `url` que ya llevaba `card=<id>`, junto a un `notifJoinHref()` que lo extrae — igual patrón que ya
existe para separar `card=` de otros parámetros.

**"Ver en Bandeja" para Transferencia/Solicitud:** no hay un modal de tarea/ticket al que saltar (van a
`/bandeja/transferencias` o `/bandeja/solicitudes`), así que muestran el mismo estilo de botón-link con
esa etiqueta genérica, para mantener consistencia visual y seguir siendo marcables como leídas con un
clic.

**Bug de implementación encontrado y corregido en el camino:** `MatMenu` cierra el panel con
CUALQUIER clic interno, no solo en elementos `mat-menu-item` — las pestañas nuevas cerraban el menú
al clickearlas. Se corrigió con `$event.stopPropagation()` en pestañas y "Marcar todas leídas" (ver
[aprendizajes.md](aprendizajes.md)).

**Archivos:** `app/src/app/layout/notif-utils.ts` (nuevo, presentación pura: ícono/color por tipo,
`notifTabDe`, `notifLinkLabel`, `notifJoinHref`), `layout.ts`, `layout.html`, `layout.scss`
(reestructura completa de `.notif-item`), `features/tickets/tickets-card-utils.ts` (`fmtMod` ganó la
rama "Ayer HH:mm", reusada aquí y beneficia también a Tickets). Sin cambios de backend.

**Verificado en local** (Chrome real vía Playwright, sesión MSC001, con notificaciones de prueba de
los 7 tipos sembradas directamente en Postgres): pestañas filtran sin cerrar el panel ni disparar
navegación y con conteos correctos; grupos Nuevas/Anteriores aparecen solo cuando corresponde; cada
tipo con su ícono/color; clic en el código marca leída y abre el modal correcto (o cae a `/board` si
la tarea no está en memoria) o navega a Bandeja; "Unirse" abre el link en pestaña nueva y marca leída
sin cerrar el modal de tarea (no aplica, no lo abre); "Marcar todas leídas" deja el panel abierto y
limpia el badge; 360×640 y 390×844 sin desborde horizontal; tema claro y oscuro correctos. No se probó
con credenciales reales de una segunda persona (mismo límite que la entrada anterior).

**Estado:** vigente, sin desplegar (regla de no desplegar sin permiso).

### [2026-09-15] Campanita: buzón de notificaciones persistente (sin push real)

**Decisión:** por encima de las alertas 100% client-side ya existentes (recordatorio, reunión,
tarea sin ticket, novedad de ticket), se agrega una **campanita** en el topbar con un buzón
persistente en Postgres (`notificacion`, migración V21) — historial con badge de no-leídas, marcar
leída/todas, y clic que navega/abre lo mismo que el popup correspondiente. **No es push real**: no
hay service worker ni VAPID, así que solo avisa con la app abierta, igual que el popup. El diseño de
push real con Service Worker/VAPID de [17-notificaciones-push.md](knowledge/17-notificaciones-push.md)
queda **superseded/parqueado**: no se implementó nada de esa arquitectura (sin `WebPushCrypto`, sin
`push_suscripcion`); si se retoma push de verdad más adelante, es una capa aparte sobre este mismo
buzón, no un reemplazo.

**Tipos y origen de cada uno** (`tipo` en `notificacion`, CHECK constraint):
| Tipo | Quién lo genera | Cuándo |
|---|---|---|
| `TAREA_ASIGNADA` | Backend (`NotificacionService` desde `LegacyWriteService`) | al asignar una tarea SIN ticket (transición, no en cada PATCH repetido) |
| `TAREA_SIN_FINALIZAR` | Backend | tarea SIN ticket llega a la columna final sin `aprobado=true` |
| `TRANSFERENCIA_PENDIENTE` | Backend (`TransferenciaResource`/`SolicitudResource`) | al crear una Transferencia directa, Y al aprobar una Solicitud tipo TRANSFERENCIA (la que crea internamente) |
| `SOLICITUD_PENDIENTE` | Backend (`SolicitudResource`) | al escalar una Solicitud (REASIGNACION o TRANSFERENCIA) |
| `RECORDATORIO` / `REUNION` / `TICKET_NOVEDAD` | Frontend (`POST /api/notificaciones`, reportable) | cuando el poll de 30 s de `layout.ts` detecta la misma condición que ya dispara el popup |

Dedup por `(usuario_id, clave)` único en los dos casos (backend con `crear()` idempotente vía
`findByUsuarioYClave`; frontend con la misma clave que usa para el dedup del popup).

**Alcance de "para RE" (Responsable de Equipo):** `TRANSFERENCIA_PENDIENTE` avisa a quien dirige el
**equipo DESTINO** (destinatario de la transferencia); `SOLICITUD_PENDIENTE` avisa a quien dirige el
**equipo dueño de la tarea** (quien aprueba/rechaza). Ambos reutilizan la resolución de
`responsablesDe(equipo)`: Asignación `RESPONSABLE_EQUIPO` con alcance `EQUIPO` exacto **y** `REGIONAL`
de su regional (mismo criterio que el picker "Asignar a" al aceptar una transferencia), sin duplicar
si alguien califica por las dos. No cubre alcance `GLOBAL` ni `ADMIN` bootstrap — mismo límite ya
aceptado en `tareaSinFinalizar` desde el lote anterior; si hace falta ampliarlo, es el mismo cambio en
un solo lugar (`responsablesDe`).

**Bug encontrado y corregido en esta misma sesión:** el HTML de la campanita (`layout.html`) ya
existía de un intento anterior, pero **nunca se le escribió CSS** (`layout.scss` no tenía ni una
regla `.notif-*`) — título y cuerpo, al ser dos `<span>` sin `display:block`, se pegaban en una sola
línea ("Nueva tarea asignada: TA-777COAC Prueba Móvil…", sin espacio ni salto). Se agregó el CSS
completo del panel (cabecera, ítems, punto azul de no-leída, negrita, line-clamp de 2 líneas para el
cuerpo, estado vacío) — ver aprendizaje sobre `::ng-deep`+`:host-context` en
[aprendizajes.md](aprendizajes.md).

**Verificado en local** (Postgres Docker + `ng serve -c quarkus` + Playwright, sesión MSC001):
Flyway 1→21 limpio (se recreó el volumen local porque se editó V21 antes de desplegarla en
ningún lado — aún no tiene checksum comprometido en ningún ambiente real); vía `curl` contra el
backend: alta/lectura/marcar-leída/marcar-todas/filtro `leidas=false`, 403 al intentar marcar leída
la notificación de otra persona, dedup por clave (POST repetido no duplica), 400 al intentar reportar
por POST un tipo que solo genera el backend; Transferencia directa → notifica al RE destino; Solicitud
→ notifica al RE de la tarea; Solicitud TRANSFERENCIA aprobada → notifica al RE del destino de la
Transferencia derivada. En Chrome real (Playwright): panel abre desde el drawer y desde el topbar
móvil, clic navega a `/board` (con `CardDetailDialog` si la tarea sigue en memoria), a
`/bandeja/transferencias` o `/bandeja/solicitudes` según el tipo, "Marcar todas leídas" limpia el
badge; 360×640 sin desborde horizontal; tema oscuro correcto (columnas de fondo/texto propias, no
heredadas del popup). **No probado:** push real (no aplica, no existe en este diseño) ni el escenario
end-to-end completo con credenciales reales de una segunda persona (se usó inserción directa en la
tabla `notificacion` para verificar el render de tipos que en local no tenían un segundo equipo real
disponible; la lógica de generación SÍ se probó completa vía API con un equipo y roles temporales).

**Estado:** vigente, sin desplegar (regla de no desplegar sin permiso). Pendiente: correr en local con
Flyway sobre Neon/AWS antes del corte de este lote, y decidir si `docs/knowledge/17-notificaciones-push.md`
se reescribe o se deja como archivo histórico con una nota al inicio.

### [2026-09-15] Dos alertas nuevas para tareas SIN ticket
**Decisión:** mismo mecanismo 100% client-side que ya usan Recordatorio de reuniones y Novedades de
tickets (polling cada 30 s en `layout.ts` + `ReminderAlertDialog` + sonido), sin tocar backend ni crear
tabla de notificaciones. Dos alertas nuevas:
1. **Tarea sin ticket asignada** → avisa al consultor asignado, tanto al crearla ya asignada como al
   asignarla después (no hay ventana de tiempo como en una reunión: avisa la primera vez que se detecta
   la combinación tarea+asignado, igual que "Novedades de tickets").
2. **Tarea sin ticket en "Entregado" sin marcar "Finalizado"** → avisa a quien DIRIGE el equipo de esa
   tarea, usando `PerfilService.equiposQueLidero()` — que YA cubre alcance EQUIPO y REGIONAL sin
   escribir ninguna resolución de roles nueva.

**Contexto:** confirmado en el código que este es el único hueco que el cutoff de limpieza de la
columna Done no cubre (solo aplica a `approved === true`) — una tarea sin ticket puede quedarse
"Entregada" sin finalizar indefinidamente sin que nadie lo note. Y una tarea sin ticket asignada no
tenía ningún aviso hasta ahora.

**Dedup:** el existente (`alertedToday`) es diario A PROPÓSITO (una reunión vuelve a ser relevante
mañana). Estas dos no: nuevo set PERMANENTE en `localStorage` (`fit-daily_alerted_tareas`), con
housekeeping — cuando una combinación deja de cumplirse (se reasigna / se finaliza), su clave se purga,
así que si la misma situación vuelve a darse (se reabre la tarea, se reasigna otra vez a la misma
persona tras pasar por otra), vuelve a alertar.

**Presentación:** `ReminderItem.kind` gana `'tarea-asignada'`/`'tarea-sin-finalizar'`. El botón de cada
fila NO abre una conversación del HelpDesk (no hay ticket): abre el mismo `CardDetailDialog` del Board,
resolviendo la `Story` desde `DataService.stories()` ya en memoria — encima de la alerta, sin cerrarla,
mismo criterio que ya usa `abrirTicket`.

**Estado:** vigente. `layout.ts` (`tareasAsignadasVigentes`, `tareasSinFinalizarVigentes`,
`alertedEver`/`syncAlertedEver`), `reminder-alert-dialog.ts`. Verificado en local: alerta al asignado,
alerta al RE de equipo exacto Y al RE solo-regional (simulando el caso de Diana/Quito), reasignación
(el anterior deja de verla), dedup permanente sobrevive a recarga, ciclo completo
finalizar→deja de sonar→reabrir→vuelve a sonar, botón "Ver" abre el `CardDetailDialog` real encima de
la alerta, 360 px sin desbordes.

### [2026-09-15] Crear tarea SIN ticket: catálogo de clientes completo, sin importar alcance
**Decisión:** en `CardDetailDialog`, al crear una tarea nueva que todavía **no tiene un ticket**
(prefijado o tecleado), el selector de Cliente muestra el catálogo COMPLETO del HelpDesk, sin importar
el alcance del usuario. En cuanto hay un ticket, o al editar una tarea existente, el comportamiento
sigue igual que antes (GLOBAL → catálogo completo; EQUIPO/REGIONAL → solo `perfil.misClientes`).

**Contexto:** reportado por la dueña con el caso de María de los Ángeles Ruano Lara (MARL001,
CONSULTOR de alcance EQUIPO sobre "Sierra Norte", no GLOBAL): no podía elegir un cliente fuera del
alcance de su equipo al crear una tarea manual en el board. Una tarea sin ticket no tiene por qué ser
de un cliente del propio equipo — un consultor puede cubrir puntualmente algo de otro cliente.

**Justificación de NO extenderlo también a tareas CON ticket:** el cliente de una tarea que nace de un
ticket lo define el ticket real del HelpDesk; el backend no valida que el `client` del body coincida
con el del ticket (`LegacyWriteService.applyFields` persiste lo que llegue sin comparar), así que
ampliar el catálogo ahí abriría la puerta a que alguien deje una tarea con un cliente distinto al de
su propio ticket — riesgo real, no solo teórico. Acotarlo a "sin ticket" evita ese riesgo por completo.

**Detalle técnico:** `clientes()`/`filteredClients()` pasaron de `computed()` a métodos planos — `ticket`
es una property normal (`[(ngModel)]`, no signal), así que un `computed` no se habría recalculado al
escribir en el campo; el CD local que dispara el propio `ngModelChange` sí lo hace con un método.

**Estado:** vigente. `card-detail-dialog.ts`. Verificado en Chrome real simulando el alcance de
MARL001 (esGlobal=false, 1 solo cliente): tarea nueva sin ticket → 46 opciones en el autocomplete real
(catálogo completo); en cuanto se carga un N° de ticket → vuelve a 1 (el del alcance).

### [2026-09-10] Fix: `quarkusApiUrl` vacío se trataba como "backend ausente" — write-through roto en AWS
**Decisión:** `HelpdeskService.refreshEspejoAssignee()` y `crearTareaSiHaceFalta()` ya no exigen
`!!environment.quarkusApiUrl`; solo `environment.dataBackend === 'quarkus'`.

**Contexto:** reportado por la dueña — asignó el ticket 10206 desde el menú de "3 puntitos" de
Tickets y la tarea no se creó. Al investigar, **no existía ningún `ticket_espejo` para ese ticket en
absoluto** en producción, lo que reveló un bug **preexistente** (no introducido en el lote de ayer):
`environment.quarkusApiUrl` es `''` a propósito en onprem/AWS (mismo origen, URLs relativas — ver
`environment.onprem.ts`), pero el chequeo `!environment.quarkusApiUrl` trata ese string vacío como
"sin backend" y retorna de inmediato. Es el MISMO bug que ya se había corregido hace tiempo en
`PerfilService.usaQuarkus()` (con el comentario explícito: *"`base` vacío es VÁLIDO on-prem... no
exigir `!!base`"*), pero nunca se replicó el fix en `HelpdeskService`.

**Alcance real del bug:** `refreshEspejoAssignee()` (el write-through del asignado al `ticket_espejo`
tras confirmar en el HelpDesk) **nunca se ha ejecutado en AWS/onprem** desde que se escribió — el board
dependía por completo del sync completo (manual, huérfano) para reflejar reasignaciones hechas desde
FitDesk. `assignTicket()` seguía devolviendo éxito igual (el PUT autoritativo al HelpDesk corre ANTES
de este chequeo y si tiene éxito el método retorna `true`), así que el bug era **silencioso**: el
usuario veía la asignación "funcionar" pero la BD nunca se enteraba hasta el próximo sync completo.

**Justificación:** la lógica de negocio de ambos métodos era correcta; el chequeo de precondición
estaba mal. Corregido igual que su precedente en `PerfilService`.

**Estado:** vigente. Desplegado solo frontend (`2ce791b`, bundle `main-3VVQZ6DZ.js`), sin migración.
**Pendiente:** el ticket 10206 sigue sin tarea — como el PUT al HelpDesk sí tuvo éxito la primera vez
(el asignado real no cambia), basta con que alguien lo vuelva a asignar desde la UI (al mismo o a quien
corresponda) para que esta vez sí dispare el write-through y la creación automática; no hizo falta
tocar el HelpDesk desde el servidor para forzarlo.

### [2026-09-10] Desplegado a AWS (6º lote): cancelar envío, tarea automática, picker regional
**Backend** `103e339` (V20 aplicada), **frontend** `b74ec90`, bundle **`main-YU644FU4.js`**. Backend
primero (por la migración), sin sorpresas.

**Verificado en producción** (`fitdesk.fit-bank.com`, Chrome real, con datos reales):
- `GET /api/transferencias/equipo/4/miembros` (Quito) devuelve **21 personas** — Diana, los tres
  equipos de la regional (Equipo Quito, App Móviles, Desarrollos Externos) y los especialistas
  globales — contra las 4 de antes. Consultado con `fetch` desde la propia sesión del navegador.
- Bandeja → Transferencias → "Enviadas": TA-350 (real, PENDIENTE) muestra el botón **"Cancelar
  envío"**; TA-358 (ya ACEPTADA) no lo muestra. No se ejecutó la cancelación (dato real de
  producción, sin necesidad de tocarlo para confirmar que el botón aparece bien).
- Bandeja → Solicitudes: la pestaña **"Enviadas"** ya existe y carga (0 para MSC001, esperado).
- HelpDesk intacto, memoria libre 4300 MB, sin errores en el log del backend.

### [2026-09-10] "Asignar a" al aceptar una transferencia: alcance REGIONAL completo, sin filtrar rol
**Decisión:** el picker "Asignar a" del equipo destino ya no muestra solo a quien tiene Asignación
`EQUIPO` exacta sobre ese equipo. Ahora incluye también los equipos **hermanos** de la misma Regional,
cualquiera con Asignación `REGIONAL` sobre esa Regional, y cualquier Asignación `GLOBAL` — **sin
filtrar por rol** (pedido explícito de la dueña: "todos los consultores de la región sin importar su
rol o alcance").

**Contexto:** reportado por la dueña con captura — Diana (responsable REGIONAL de Quito) solo veía 4
personas al aceptar una transferencia hacia Quito. La consulta original solo miraba Asignación
`EQUIPO` sobre ese equipo exacto; Diana solo aparecía porque, además de su Asignación `REGIONAL`, tenía
una `EQUIPO` redundante sobre Quito — un responsable regional SIN esa redundancia ni se habría visto a
sí mismo en su propio picker.

**Justificación:** un responsable regional gobierna TODA su regional, no un equipo aislado; debe poder
repartir una tarea transferida entre cualquier consultor de los equipos que la componen. El endpoint
hermano `/equipo-miembros` (usado por "Asignar semana") ya sumaba especialistas GLOBAL pero tampoco
resolvía alcance REGIONAL ni equipos hermanos — no era un patrón completo, se diseñó de cero para este
caso en vez de copiarlo tal cual.

**Estado:** vigente. `TransferenciaResource.miembros()`. Sin cambios de autorización en `aceptar()`
(nunca validó que el asignado perteneciera al equipo). Verificado en local: equipo exacto, equipo
hermano de la regional, alcance regional, alcance global sin filtrar rol (incluye CONSULTOR y GERENCIA,
no solo ESPECIALISTA), y asignación vencida correctamente excluida — 12 personas para Quito en el
escenario de prueba, contra las 4 de antes.

### [2026-09-10] Cancelar un envío pendiente (Transferencia y Solicitud) con estado propio
**Decisión:** quien envía una Transferencia o una Solicitud puede **retirarla** mientras siga
`PENDIENTE`, con un nuevo endpoint `POST .../cancelar` en cada recurso. Estado resultante
**`CANCELADA`** (migración `V20`, aditiva), distinto de `RECHAZADA`.

**Contexto:** la pestaña "Enviadas" de Transferencias ya existía pero era puramente informativa; la
de Solicitudes ni existía pese a que el backend ya exponía `GET /api/solicitudes/mias` sin que nadie
lo llamara. La dueña quiere poder revisar lo enviado sin respuesta y retirarlo.

**Justificación:** un estado nuevo evita que el equipo/Responsable destino vea "rechazaste tú" cuando
en realidad el emisor se arrepintió. Autorización distinta en cada caso: Transferencia la cancela
quien **gobierna el equipo ORIGEN** (mismo chequeo que exige `crear`); Solicitud la cancela **solo el
propio solicitante** (es personal, no algo que gobierne el Responsable del equipo de la tarea). Ambas
reutilizan la regla ya existente de `rechazar`: si la tarea nació oculta solo para ese envío (ticket
sin tarea previa), se descarta entera, sin dejar rastro.

**Estado:** vigente. `TransferenciaResource.cancelar`, `SolicitudResource.cancelar`,
`V20__transferencia_solicitud_cancelada.sql`. Verificado en local con Playwright: botón → diálogo →
confirmar → backend → estado `CANCELADA`, en las dos pantallas.

### [2026-09-10] La tarea se crea sola al asignar un ticket que aún no la tenía
**Decisión:** al asignar un ticket desde FitDesk (botón Asignar, conversación del ticket, Mi Panel),
si ese ticket **no tiene tarea en ningún board**, se crea automáticamente. Nuevo
`POST /api/legacy/stories/desde-ticket-asignado`, llamado desde `HelpdeskService.assignTicket()`
justo después de confirmar la asignación al HelpDesk.

**Contexto:** pedido de la dueña. Hoy asignar y crear tarea eran dos acciones independientes; el
ticket quedaba asignado en el HelpDesk pero sin tarea hasta que alguien pulsaba "Crear tarea" a mano.

**Justificación del alcance (decidido con la dueña):** solo asignaciones hechas **desde FitDesk** —no
se añadió ningún poller nuevo para detectar asignaciones hechas directo en el HelpDesk externo; hoy no
existe ninguno (`TicketSyncResource` es manual y huérfano) y sería una pieza de infraestructura aparte.

**Tablero destino:** el equipo responsable del **cliente** del ticket (`Cliente.equipoResponsable`,
el mismo mapeo que ya usan Transferencias/Solicitudes) si el cliente está registrado; si no, **el
equipo de quien asigna** (primero como miembro, si no como responsable) — resuelto en el **backend**
por el actor (`X-Actor-Hid`), no por el `currentBoard()` del frontend, que es un signal de UI frágil
(depende de qué pestaña se visitó antes). Si ninguno resuelve, no crea nada — la asignación al
HelpDesk ya ocurrió igual, queda la creación manual de siempre.

**Idempotente:** si el ticket ya tiene tarea, no-op. No vuelve a pushear la asignación al HelpDesk (ya
se confirmó en el paso previo).

**Estado:** vigente. `LegacyWriteResource.crearTareaDesdeTicketAsignado`, `HelpdeskService.
crearTareaSiHaceFalta`. Verificado en local (backend con 5 casos por curl: cliente resuelve, cliente
no registrado con dos actores de equipos distintos, actor sin equipo, idempotencia; y en Chrome real
con `assignTicket()` completo, incluida la inserción en la caché de `DataService.stories` sin
recargar y el snackbar de aviso).

### [2026-09-09] Desplegado a AWS (5º lote): Bandeja + check de certificado + los tres arreglos del 403
**Backend** `288ce36` (construido en el servidor), **frontend** `103a431`, bundle **`main-7RAZMZJN.js`**.
**Backend primero**, como estaba previsto; **sin migración** (Flyway se queda en 19).

**Verificado en producción** (`fitdesk.fit-bank.com`, Chrome real):
- `/api/transferencias/entrantes` de DEFM001 devuelve **TA-358 con `ticket: "33710"`** — la transferencia
  de la captura de la dueña.
- Bandeja → Transferencias, pestaña "Enviadas" (7 filas): chips `#33710`, `#33735`, `#33733`… todos
  `<button>`, icono `confirmation_number`. Al pulsar el de una fila **no seleccionada** abre la
  conversación real (ticket 33733, "MENSAJE DE ALERTA PARA DEPOSITOS DE PLAZO FIJO", COAC COPAC AUSTRO,
  con sus dos adjuntos) y **la selección del panel no cambia**. La URL no se mueve.
- Board: **En Certificación con 34 tarjetas y 0 checks**; "Certificado" no aparece en toda la página y
  `.check-text` ya no existe. **Entregado conserva sus 39 checks "Finalizado"**.
- HelpDesk intacto y memoria libre **4236 MB** (empezó en 4151). Sin errores en el log del backend.

**Gotcha de verificación:** el **Service Worker** sirve su caché, así que el navegador seguía cargando
`main-5WCIUUKG.js` aunque `curl` ya recibía el bundle nuevo. Para comprobar de verdad hay que
desregistrar el SW y borrar `caches` en el navegador de prueba (los usuarios lo toman en la siguiente
visita). Y la **primera** apertura del modal tarda: baja el chunk dinámico; 2,5 s no bastaron, 4 s sí.

**Sin ejercitar en producción:** el chip en **Solicitudes** (no hay solicitudes pendientes ahora mismo;
el camino es el mismo que Transferencias y quedó verificado en local con el backend nuevo).

### [2026-09-09] Un 403 del API propio ya NO cierra sesión (solo los del proxy del HelpDesk)
**Decisión:** el interceptor solo expulsa al login ante un **403 del proxy del HelpDesk** (`/api/v1/`). Un 403
del **API propio** (transferencias, admin, vacaciones…) se deja fallar para que la pantalla muestre el mensaje.

**Contexto:** un Responsable del equipo PRUEBA intentó transferir una tarea, el backend respondió
403 *"solo el Responsable del equipo origen (o un ADMIN) puede transferir"* y la app **lo sacó de la sesión**.
El interceptor consideraba "del HelpDesk" toda petición que empezara por `helpdeskProxyUrl`; como en producción
el API propio y el proxy **comparten origen** (y on-prem `quarkusApiUrl` es `''`, con lo que `startsWith` es
cierto para todo), cualquier denegación de permiso propia se confundía con una sesión muerta.

**Justificación:** un 403 de negocio es una respuesta legítima y esperable, no una sesión inválida; refrescar el
token no ayuda. Afectaba a **toda** la app, no solo a transferir. El discriminador `/api/v1/` es fiable: el proxy
es 1:1 y siempre cuelga de ahí (regla 5 del CLAUDE.md del backend).

**Estado:** vigente. `app/src/app/core/interceptors/helpdesk-auth.interceptor.ts`. El 401 no se toca.

### [2026-09-09] Transferir se ofrece solo si gobiernas el equipo ORIGEN de la tarea
**Decisión:** la acción "Enviar a otro equipo" se muestra solo si el actor **dirige el equipo dueño del board
donde vive la tarea** (`PerfilService.gobiernaBoard`), y el diálogo dice **de qué equipo sale** la tarea.

**Contexto:** el backend autoriza contra `tarea.board.equipo` (el ORIGEN), que no tiene por qué ser el equipo del
actor; el frontend solo preguntaba `puedeTransferir()` = "¿eres responsable de algún equipo?". Un Responsable de
PRUEBA veía la opción sobre una tarea del board de CUENCA y solo se enteraba con un 403. Además, el selector de
destino **oculta el equipo origen** (no se envía a sí mismo), así que al ser CUENCA el origen "faltaba Cuenca en
la lista" y sí aparecía PRUEBA — lo que llevó a intentar la transferencia hacia su propio equipo.

**Justificación:** no ofrecer lo que no se puede hacer, y explicar la ausencia en vez de que parezca un bug.
`gobiernaBoard` es **permisivo** si no lo sabe (ADMIN, board desconocido o lista sin cargar): la autoridad sigue
siendo el backend, y ahora su 403 se ve como error en pantalla.

**Estado:** vigente. `perfil.service.ts`, `card-detail-dialog.ts`, `tickets.ts` (`puedeTransferirEste`),
`transferir/enviar-equipo-dialog.ts`.

### [2026-09-09] El ticket se abre desde la Bandeja (las tres pantallas) sin salir de ella
**Decisión:** en Transferencias, Solicitudes y Trabajo de equipo, el **N° de ticket** se muestra junto al código
de tarea (en la fila y en el detalle) y al pulsarlo abre el modal de conversación **encima**. Nuevo helper
`core/ticket-dialog.ts` (import dinámico) que unifica la apertura.

**Contexto:** quien acepta o rechaza una transferencia no podía leer el ticket del que nace la tarea: en
Transferencias ni siquiera se mostraba, y "Trabajo de equipo" sacaba al usuario a `/tickets` con una búsqueda,
perdiendo la lista. Solicitudes exigió añadir `ticket` al DTO en `SolicitudResource.describir` (aditivo, sin
migración: `Tarea.ticketEspejo` es `@ManyToOne` EAGER, no hay consulta extra).

**Justificación:** decidir a ciegas era el problema real. El campo `ticket` es **opcional** en la interfaz TS
(`ticket?`), así que frontend y backend se pueden desplegar en cualquier orden.

**Estado:** vigente. Verificado en Chrome: el chip no roba la selección de la fila (stopPropagation en click y
keydown), Espacio/Enter lo activan sin mover la fila, y a 360 px no hay scroll horizontal del body.

### [2026-09-09] Retirado el check "Certificado" del Board
**Decisión:** las tarjetas de la columna **En Certificación** ya no llevan el check "Certificado" que las movía a
Finalizado. La tarjeta se mueve como cualquier otra: arrastrándola o con "Mover a otra columna".

**Contexto:** pedido de la dueña. Se comprobó antes que no deja tareas atrapadas: `cdkDrag` y el menú de mover
siguen ahí y respetan los permisos.

**Justificación:** la columna queda con el mismo comportamiento que las demás, sin un atajo propio que
cambiaba estado (y lo empujaba al HelpDesk) desde un solo clic en la tarjeta.

**Estado:** vigente. `board.html` (`@case ('review')` eliminado), `board.ts` (`onCert` eliminado), `board.scss`
(`.check-text`). El check "Finalizado" de la columna Entregado **no se toca**.

### [2026-07-18] Pestaña "Equipo" (reemplaza "Pendientes") + selector de equipo para responsable regional
**Decisión:** en Tickets, la pestaña **"Pendientes" se renombra a "Equipo"** (clave interna `tab='equipo'`, default) y pasa a mostrar **solo los tickets de los clientes del equipo del usuario** (antes: `CLIENTES_VALIDOS` de Cuenca hardcodeados). Si el usuario puede revisar **más de un equipo** (responsable con alcance **REGIONAL** → todos los equipos de su regional; GLOBAL → todos), aparece un **selector "Equipo a revisar"** (opción "Todos mis equipos" + cada equipo). Se conserva el filtro de estados **no finalizados** (vista operativa) y el principio "los filtros van server-side" (ADR 2026-07-01): los clientes del equipo se mapean a `client_id` del catálogo y se pasan en la consulta.
- **Backend:** nuevo `GET /api/legacy/perfil/equipos-clientes` (`PerfilResource`) → `{ multiEquipo, equipos:[{codigo,nombre,clientes:[{codigo,nombre}]}] }`, con los equipos que el actor puede revisar = `Actor.equiposComoMiembro ∪ equiposComoResponsable` (X-Actor-Hid). Requiere **rebuild de imagen + redeploy** (Render) para vivir en Neon.
- **Frontend:** `PerfilService.cargarEquiposRevisar()` + señales `equiposRevisar`/`multiEquipo`; en `Tickets`, `equipoSel` + `equipoClientIds` (clientes del equipo/equipo elegido → client_id por nombre, igual que el viejo `validClientIds`) alimentan `buildFilters` cuando `tab==='equipo'`.
**Contexto:** la dueña pidió que "Pendientes" se llame "Equipo" y muestre los tickets de los clientes del equipo del usuario; y que un responsable de alcance regional pueda elegir qué equipo revisar. Realiza la nacionalización por datos (deja de depender de `CLIENTES_VALIDOS`).
**Justificación:** el foco pasa de "estado (pendiente)" a "pertenencia (equipo)", coherente con el modelo multi-equipo; el selector da al responsable regional visibilidad de cualquier equipo de su región sin exponer datos de otras regiones. Reusa el enforcement por Asignaciones (`Actor`).
**Estado:** implementado; **frontend build OK** y **backend `mvn compile` OK**. **Pendiente:** redeploy backend (Render) + frontend (Pages) y verificación visual en Chrome/Playwright MCP. **Nota:** las **Estadísticas** siguen usando `CLIENTES_VALIDOS` (fuera de alcance de este cambio).

### [2026-07-18] MCP de Playwright configurado (`.mcp.json`) para la verificación de la regla de oro
**Decisión:** se agregó `.mcp.json` en la raíz con el servidor **Playwright MCP** (`npx -y @playwright/mcp@latest`), para poder cumplir la **regla de oro** del agente (verificar UI en Chrome real vía MCP, con énfasis en pantallas pequeñas). No había `claude` CLI ni config previa.
**Contexto:** todo el lote de UX/UI se verificó solo por build; faltaba el MCP para la verificación visual.
**Estado:** archivo creado. **Pendiente:** el usuario debe **aprobar el servidor y reiniciar la sesión** de Claude Code para que las herramientas `playwright` carguen (los MCP de `.mcp.json` se cargan al iniciar sesión).

### [2026-07-18] Lote UX/UI móvil + funcional (Tickets, Board, sesión)
**Decisión:** se implementó un lote de mejoras en el frontend Angular (`app/`), verificadas por `ng build -c quarkus`:
- **401 → login sin reintento** (`helpdesk-auth.interceptor.ts`): ante 401 del HelpDesk se cierran todos los popups (`MatDialog.closeAll()`), se limpia la sesión y se redirige a `/login`, **sin** renovar ni reintentar. Se **conserva** el refresh proactivo en 2º plano. El 403 sigue igual (cierra sesión salvo `HD_SAFE`).
- **Primera pantalla tras login = Tickets** (`login.ts` ×2, `app.routes.ts` default `redirectTo: 'tickets'`).
- **Prioridad del ticket como `#N`** (antes `P#`) en Board y en la tarjeta de la lista, con helper compartido `prioBadgeClase` en `board-utils.ts` (color por severidad 1/2/≥3).
- **Diálogo de conversación del ticket rediseñado (móvil-first)**: encabezado tipo issue (N° grande sin truncar → título 2–3 líneas → chips Banco/Tipo/Estado/Prioridad → fecha+creador con iconos → adjunto), spacing 8/12/16, `@media (min-width:600px)` para escritorio. Solo muestra datos ya disponibles del `Ticket` (sin API nueva).
- **Cambiar estado desde el popup del ticket** (item nuevo): el chip de estado es un botón con menú que reusa `hd.setTicketStatus` (mismo camino que la lista); actualiza el chip sin cerrar el diálogo. "Abrir no escribe" se respeta (acción explícita).
- **Lista de Tickets en móvil**: la grilla pasa de 2 columnas apretadas a **1 columna** (≤479px) con más separación; tiers 2/3/4/5 en pantallas mayores.
- **Board en pantallas pequeñas (≤768px)**: se **desactiva el arrastre** (`cdkDragDisabled` con señal `isHandset` vía `BreakpointObserver`) y cada card tiene un botón **"Mover"** con menú de columnas destino que llama a `moveCard` (lógica extraída de `drop`). En escritorio, drag & drop como siempre.
- **Filtros en dos grupos (drawer)**: "Búsqueda global" (dos campos **Ticket** y **Palabra**, antes una sola caja) y "Filtros de la sección". La búsqueda por N° en Tickets muestra un **banner**: si el ticket tiene tarea en algún tablero (y quién la lleva) o **si no está en ningún tablero / sin asignar** (barrido local sobre `data.stories()`, sin API extra). En el Board la búsqueda queda rotulada como "en este tablero" (section-scoped).
**Contexto:** backlog de la dueña centrado en usabilidad móvil (360–430px), claridad de filtros y flujo de trabajo del ticket. Decisiones de enfoque confirmadas: filtros agrupados en el drawer, board móvil solo-menú, prioridad `#N`.
**Estado:** implementado; **build OK**. **Pendiente de verificación visual en Chrome vía Playwright MCP** (regla de oro) — el MCP aún no está configurado en el entorno. El punto de **exportar/copiar conversación a PDF (pdfmake)** quedó **solo en el plan, sin implementar** (decisión de la dueña).

### [2026-07-18] Regla general: NUNCA mostrar códigos de empleado en la UI (mostrar el nombre)
**Decisión:** el `helpdesk_user_id` (MSC001, JFQV001, …) es una **clave interna** y **no se muestra** en ninguna sección. La UI siempre presenta el **nombre resuelto** (`resolveMember`/`shortName` + catálogo del HelpDesk / miembros del equipo). Si no hay nombre → "Sin asignar"/"—", nunca el código. En pantallas pequeñas se **acorta** el nombre (`shortName`). El código solo puede quedar como **tooltip** para desambiguar homónimos (p. ej. selector de "Asignar"), nunca como texto visible. **No aplica** a ids de tarea/sprint/consulta/ticket (TA-NNN, N° de ticket…), que sí son referencias útiles. Se agregó como **regla no negociable #8** del agente `fitscrum-migrator`.
**Contexto:** la dueña pidió que no se usen códigos de empleado "en ninguna sección" por ser un riesgo de seguridad y poco informativos; auditar todo el proyecto y reemplazarlos por nombres cuidando el UX/UI (especialmente móvil). En el selector de Asignar eligió conservar el código como tooltip.
**Justificación:** exponer identificadores internos filtra información del sistema y no ayuda al usuario; el nombre es lo legible. El tooltip preserva la desambiguación sin exponer el código como contenido principal.
**Estado:** vigente. Regla registrada; el barrido de reemplazo en `app/` (punto B del backlog) se ejecuta a continuación.

### [2026-07-10] HelpDesk Semanal por EQUIPO: rotación y picker acotados al equipo
**Decisión:** la rotación semanal de soporte (`weeklySupport`) deja de ser global y pasa a ser **por equipo**: cada equipo tiene su propia rotación, y el picker de "consultores que se pueden asignar" muestra **solo los miembros del equipo** (el del responsable logeado; el ADMIN elige con un selector de equipo). V8 agrega `equipo_id` a `rotacion_semanal` y cambia el UNIQUE de `(semana)` a `(semana, equipo)`. La rotación migrada (del único equipo legacy) se **conserva** asignándola al equipo del tablero CUENCA.
- **Backend:** `/api/legacy/weeklySupport?equipo=CODIGO` (rotación del equipo; sin `equipo` cae al del actor) y `PUT ...?equipo=` que reconcilia solo las semanas de ese equipo. Nuevo `/api/legacy/equipo-miembros?equipo=CODIGO` → miembros (id = codigo local, el espacio del `assignee` de la rotación). `equipo` se resuelve del **board codigo** (el front manda el board elegido).
- **Frontend:** la vista Semanal reusa `data.boards()` (RE = su equipo; ADMIN = todos) con un **selector de equipo**; `data.loadWeekly(codigo)`/`persistWeekly()` cargan/guardan la rotación del equipo (`?equipo=`); el diálogo de asignar usa `data.teamMembers(codigo)` en vez del `team()` global.
**Contexto:** la dueña pidió que la sección "trabaje también en equipos" y que "los consultores que se pueden asignar sean solo los del equipo del responsable logeado". Eligió: **selector de equipo para el admin** y **todos los miembros del equipo** en el picker.
**Justificación:** una rotación global no escala a nacional (dos responsables se pisarían el asignado de la misma semana). Por-equipo + selector reusa el modelo multi-tablero del board (board codigo = equipo codigo) y acota el picker a la realidad de cada equipo.
**Estado:** vigente. Backend verificado por curl (Cuenca conserva 18 semanas; Quito arranca vacío; PUT de Quito no toca Cuenca).
**Actualización 2026-07-14 (dueña):** el picker de la rotación sale del **catálogo de empleados del API (HelpDesk)**, **filtrado por equipo** (los usuarios asignados al equipo en Administración → Asignaciones alcance EQUIPO) **+ los ESPECIALISTAS globales** (soporte nacional que cubre cualquier equipo — p. ej. Gabriel Reyes/JGRV001, que rotaba en Cuenca sin ser miembro). El nombre del asignado resuelve por los miembros del equipo y, como respaldo, por el catálogo del HelpDesk (para que nunca aparezca un id crudo). El `assignee` pasa al espacio **helpdesk_user_id** (como el resto de la app). `/equipo-miembros?equipo=` devuelve `id = helpdesk_user_id`; V9 alinea el `assignee_local` de las filas existentes al `helpdesk_user_id` del mismo usuario. En el front, el nombre/color del asignado se resuelven contra los **miembros del equipo cargados** (`memberOptions`, mismo espacio de id) — válido porque la rotación es por-equipo (todos sus asignados son de ese equipo). Verificado por curl (asignados existentes ahora KIMA001/JFQV001…; miembros de Cuenca con hid+nombre). Front compila.
### [2026-07-10] Notas de ticket (hdNotes) por EQUIPO — la nota es del equipo que la crea
**Decisión:** las notas dejan de ser globales (una compartida por ticket) y pasan a ser **del EQUIPO**: cada equipo tiene su propia nota por ticket, que **todos sus miembros ven/editan**, y **otro equipo no la ve**. V7 agrega `equipo_id` a `ticket_nota` y cambia el UNIQUE de `(ticket)` a `(ticket, equipo)` (dos equipos pueden tener su nota del mismo ticket). Lectura `/api/legacy/hdNotes` filtra al equipo del actor (`equipoDelActor` = primera asignación de alcance EQUIPO); escritura `putHdNotes(node, X-Actor-Hid)` fija `equipo=equipo del actor` y **reconcilia solo las notas de ese equipo**. **Sin cambios de frontend** (el `DataService` ya manda `X-Actor-Hid`; la tarjeta muestra/edita la nota del equipo). Los ~132 notas migradas quedan con `equipo_id` NULL → no las ve nadie (se re-crean con equipo al usarse).
**Contexto:** la dueña pidió que "las notas se muestren solo al equipo que las crea" y eligió el modelo **una nota compartida por equipo** (no personal). Mismo problema de raíz que los pendientes (overlays globales sin dueño).
**Justificación:** la nota es una anotación de trabajo del equipo sobre el ticket; compartirla dentro del equipo y aislarla entre equipos evita cruces y ruido, reusando el mismo mecanismo de scoping por `X-Actor-Hid`.
**Gotcha:** `ticket_nota.texto` es NOT NULL y el id es `IDENTITY` (persist = INSERT inmediato) → hay que setear `texto` ANTES de `persist()` (a diferencia de los pendientes, cuyos campos son nullable).
**Estado:** vigente. Verificado por curl (mismo ticket con nota de Cuenca y de Quito separadas; un compañero de Cuenca comparte la de su equipo; el PUT de Cuenca no toca la de Quito). **Pendiente:** "el admin ve las de TODOS los equipos" — no implementado aún: la tarjeta muestra una sola nota (la del equipo del actor); mostrar varias (por equipo) al admin requiere un display apilado/multi-nota (siguiente incremento, análogo a `hdPendientes-visibles`).
### [2026-07-10] Pendientes (recordatorios) por USUARIO con visibilidad por rol y alarma por equipo
**Decisión:** los pendientes (`hdPendientes`) dejan de ser globales y pasan a tener **dueño**:
- **Ver:** el **ADMIN ve TODOS** (clasificados por equipo). El **RESPONSABLE_EQUIPO** ve los de sus **subordinados** (consultores/especialistas de su equipo) + los suyos, pero **NO los de otro responsable** (privacidad entre pares: "entre responsables no se ven"). El resto, **solo los suyos**. (Regla 2026-07-10: se excluye a los `usuariosConRol(RESPONSABLE_EQUIPO)` del set visible/alarma de un no-admin; el admin no se filtra.)
- **Alarma diaria:** el **RESPONSABLE_EQUIPO recibe la alarma de su equipo** (propios + de sus **subordinados**, NO de otros responsables); un consultor solo la de los **suyos**; el admin, la de su(s) equipo(s) que dirige (no de todos). Se computa server-side con el flag `alarma` (= dueño ∈ propios ∪ miembros de equipos donde soy RESPONSABLE). Como el responsable no puede escribir el pendiente ajeno, el **dedup diario "ya alerté hoy" es POR-NAVEGADOR en localStorage** (`fit-daily_alerted`, clave `ticket|owner`), no en el campo `lastAlerted` compartido.
- **Editar/borrar:** solo el **dueño**; a los demás se les muestran **read-only** con el nombre del dueño.
- **El asignado también recibe (Opción B, 2026-07-10):** un pendiente sobre una tarea **ASIGNADA a mí** me concierne (lo **veo** y me **alarma**), aunque lo haya puesto otro — típicamente el responsable que me asigna el ticket con un recordatorio. Backend: `misTickets` = tickets de mis tareas (`Tarea.asignadoA = actor`); un pendiente es visible/alarmante si `owner ∈ subordinados` **OR** `ticket ∈ misTickets`. Flag `asignadaAmi` en el JSON. (Caso validado: Sol→Diana→Héccer; el recordatorio de Diana para la próxima semana le salta a Diana **y** a Héccer, no a Sol.)
- **Backend:** V6 agrega `usuario_id` a `ticket_pendiente` y cambia el UNIQUE de `(ticket)` a `(ticket, usuario)` (dos personas pueden tener su propio recordatorio del mismo ticket). Lectura: `/api/legacy/hdPendientes` (solo los del actor, para editar/checks) y `/api/legacy/hdPendientes-visibles` (lista por rol, anotada con `owner/ownerName/equipo/mine/miEquipo`). Escritura `putHdPendientes(node, X-Actor-Hid)` fija `usuario=actor` y **reconcilia solo las filas del actor** (nunca toca las de otros). Helpers `Actor.equiposComoResponsable/equiposComoMiembro/usuariosDeEquipos`.
- **Frontend:** `DataService` ahora envía `X-Actor-Hid` en TODAS las llamadas legacy (`fbGet/fbPut/fbPatch/fbDelete`) → habilita el scoping por usuario; la vista de Pendientes consume `/hdPendientes-visibles` y **agrupa por equipo** mostrando el dueño; acciones solo en los propios.
- **Migrados:** los ~15 pendientes legacy quedaron con `usuario_id` NULL → **no los ve nadie** en el modelo nuevo (se re-crean con dueño al usarse). Decisión: no adivinar dueño.
**Contexto:** la dueña (Sol, admin) notó que veía los pendientes de Diana; el modelo era 100% global (un recordatorio por ticket, compartido). Precisó: admin ve todo pero **clasificado** y la **alarma solo de su equipo**; RE ve su equipo; los demás lo suyo.
**Justificación:** un recordatorio es personal; el admin necesita supervisión (ve todo, agrupado) sin ser spameado por la alarma de otros equipos. Reconciliar solo lo del actor evita que un PUT borre lo de otros (el modelo viejo de nodo global lo hacía). Coherente con el enforcement por Asignaciones (`Actor`).
**Estado:** vigente. Backend verificado por curl (Sol/admin ve ambos con `mine/miEquipo`; Diana/RE Quito **no** ve el de Sol/Cuenca; `/hdPendientes` solo los propios; PUT de Sol borra solo lo suyo; **alarma**: Diana/RE recibe `alarma=true` de un pendiente de su compañero de Quito, un consultor solo del suyo). Front compila (`ng build -c quarkus`), CORS de los GET con `X-Actor-Hid` OK. **Notas:** `X-Actor-Hid` en todos los GET los vuelve preflighted (inofensivo); `paused`/`nota` no se persisten en el modelo Quarkus del pendiente (limitación preexistente del port legacy, ajena a este cambio).
### [2026-07-10] Regionales editables (incl. código) + borrado en cascada controlada
**Decisión:** el panel de Administración permite **editar** (nombre, **código**, activo) y **eliminar** regionales.
- **Editar código:** habilitado — la regional se referencia por FK (id), no por texto, así que renombrar el código es seguro. Se guarda en MAYÚSCULAS con guardia de unicidad (400 si choca). *(El código de EQUIPO sigue read-only: está acoplado a `board.codigo`.)*
- **Autorización (backend, header `X-Actor-Hid`):** **ADMIN** puede eliminar **cualquier** región; un **RESPONSABLE_EQUIPO** solo **la SUYA** (la región de su(s) equipo(s) o su alcance REGIONAL; GLOBAL = todas); otros roles → **403**. Helper `Actor.gobiernaRegion(hid, regionId)`. El panel ya estaba gated (adminGuard = ADMIN/RE). *(Crear/editar regional aún sin candado en el backend — pendiente si se quiere igual.)*
- **Verificación de seguridad (frontend):** eliminar abre un diálogo que **exige escribir el código** de la región para habilitar el botón (patrón type-to-confirm para acción destructiva/irreversible), en vez del `confirm()` del navegador.
- **Eliminar (cascada controlada, `DELETE /api/regionales/{id}`, validate-first):**
  1. Si **algún equipo tiene tareas** → **409** (no se pierde trabajo; cerrar/transferir primero).
  2. **Técnicos** de la región (derivados de sus Asignaciones EQUIPO/REGIONAL): si un técnico pertenece **solo** a esta región → **409** que lo nombra junto a su **Responsable de Equipo** (debe reclasificarlo antes). Si el técnico también está en **otra** región → se le quita solo esta asignación y **queda en las otras**.
  3. Camino limpio (equipos vacíos, sin huérfanos): borra los equipos con su **tablero y sprints**, desliga clientes (`equipo_responsable=null`), borra transferencias del equipo y las asignaciones de la región, y borra la regional.
**Contexto:** la dueña pidió poder editar y **eliminar** regiones, y detalló el manejo de técnicos al borrar (bloquear si el equipo tiene tareas; reclasificar vía el Responsable si el técnico es exclusivo; dejarlo en las otras si es multi-región). Decisiones confirmadas 2026-07-10.
**Justificación:** el borrado destructivo se hace **seguro por diseño** (bloqueo antes de mutar, en una sola transacción): nunca se pierde trabajo (tareas) ni se orfanan técnicos en silencio. La reclasificación se delega al Responsable (autoridad correcta) mostrándolo en el mensaje. Realiza la nacionalización por datos (gestionar la matriz geográfica sin redeploy).
**Gotchas técnicos (Panache/Hibernate):** (a) un UPDATE masivo HQL **no** admite navegar asociaciones en el WHERE → se usó subconsulta para `solicitud.transferencia`; (b) **no** mezclar `delete()` masivo con entidades ya cargadas en la sesión (la validación cargó las Asignaciones) → las asignaciones se borran **como entidades** para no romper el flush (`TransientPropertyValueException`).
**Estado:** vigente. Verificado por curl end-to-end (sin equipos→200; equipo vacío→cascada 200; equipo con 102 tareas→409; técnico exclusivo→409 con responsable; técnico multi-región→200 y conserva su otra región). Front compila. **Pendiente/posible mejora:** flujo asíncrono real "solicitud de reclasificación" en la Bandeja del Responsable (hoy es bloqueo+aviso; el Responsable reasigna en Asignaciones).
### [2026-07-09] El Responsable de Equipo ve el trabajo foráneo de su equipo (Bandeja "aceptadas" + toggle "Mi equipo")
**Decisión:** tras aceptar una transferencia, el RE del equipo destino puede **rastrear** qué tareas de otros equipos lleva su gente, por dos vías:
- **Bandeja → "Trabajo de mi equipo (de otros tableros)":** lista las transferencias **COMPLETADAS** dirigidas a mis equipos (tarea, cliente, equipo origen y **quién de mi equipo la lleva**). Backend: `GET /api/transferencias/aceptadas` (estado COMPLETADA, `equipoDestino ∈ equiposGestionables`) + `clienteTarea` en `describir`.
- **Board → toggle "Mi equipo" (solo RE/ADMIN):** incluye en el tablero las **tareas foráneas** (de otro board) asignadas a **cualquier miembro de mi equipo**, con el badge del equipo dueño. Backend: `GET /api/transferencias/mi-equipo/miembros` (roster = hids de los miembros de mis equipos gobernados). Front: señal `teamOnly` + `teamHids`; `cardsSource` incluye foráneas de mi gente cuando `teamOnly`; el filtro "mine" de `columns` se relaja si además está "Mi equipo" (gana equipo). Arrastrar una foránea solo cambia su estado, no su board.
**Contexto:** la dueña preguntó "¿cómo sabe el otro responsable, después de aceptar, que alguien de su equipo tiene tareas de un cliente de otro equipo?". La tarea transferida vive en el board del equipo **origen**, así que no aparecía en el tablero del RE destino ni había vista persistente de ese trabajo. Eligió **ambas** vías.
**Justificación:** realiza la visibilidad "táctico-equipo" del modelo (el RE ve el trabajo de su equipo, no solo su board): la Bandeja da la lista de seguimiento; el toggle lo integra al flujo visual del tablero. Reusa `equiposGestionables`/`Actor` y los registros de `transferencia` (sin tablas nuevas). Admin = ve todos los equipos (oversight).
**Estado:** vigente (backend verificado por curl: `/aceptadas` y `/mi-equipo/miembros` — Quito 1 miembro, admin 11; front compila `ng build -c quarkus`). Complementa la ADR de la misma fecha sobre Transferencia/Solicitud y la de "Asignados a mí cross-board + badge". **Pendiente:** recorrido visual.
### [2026-07-09] "Asignados a mí" cruza tableros + badge de equipo en tarjetas foráneas
**Decisión:** en el board, al activar **"Asignados a mí"** ahora se muestran **mis tarjetas de CUALQUIER tablero** (no solo del board activo), y cada tarjeta cuyo board ≠ board activo lleva un **badge del equipo/tablero dueño** (chip "groups + nombre"). Implementado en el front (`board.ts`): nuevo `cardsSource` (base del board activo + mis tarjetas foráneas no-finalizadas cuando `mineOnly`), `columns` itera sobre él, y helpers `esForanea`/`boardLabel`; badge en `board.html` (`card-top`). **No hubo cambios de backend**: `/api/legacy/stories` ya emite TODAS las tareas con su `board` y `assignee` (=helpdesk_user_id). Arrastrar una card foránea **solo cambia su estado** (`drop`→`updateStoryStatus`), nunca su board.
**Contexto:** al construir la Transferencia (misma fecha), la dueña notó que faltaba un indicador del equipo de la card "cuando no es del board activo". Al investigar apareció el hueco real: la tarjeta transferida **sigue en el board de su equipo dueño**, pero el board mostraba solo el tablero activo y el receptor (de otro equipo) **no podía verla** (ni cambiar a ese tablero, por visibilidad). El badge solo no bastaba: requería que las cards foráneas pudieran aparecer. La dueña eligió "‘Asignados a mí’ cross-board + badge".
**Justificación:** realiza el mecanismo del modelo ("el ejecutor de otro equipo trabaja la Tarea vía ‘Asignados a mí’") sin duplicar ni mover la tarjeta; el badge evita confundir una card foránea con una propia del tablero. Reusa la data ya disponible (todas las stories con board), así que es un cambio acotado al front. Los chips de asignado/cliente siguen derivando del board activo (`visibleStories`) para no ensuciar los filtros.
**Estado:** vigente (front compila `ng build -c quarkus`; validado a nivel de datos que una card transferida se emite con board=origen y assignee=receptor → el receptor la ve como foránea con badge). **Pendiente:** recorrido visual en navegador.

### [2026-07-09] Envío de tareas entre equipos: Transferencia (request-based) + Solicitud del Especialista
**Decisión:** se implementa el "envío de tareas entre equipos" en dos flujos, **sin que la Tarea cambie de board** (solo cambia `asignado_a`; la tarjeta sigue en el tablero del equipo dueño del cliente — modelo validado):
- **Transferencia (equipo→equipo, con bandeja/aprobación):** la inicia el **RESPONSABLE_EQUIPO** (o **ADMIN**) del equipo **origen** (endpoint `POST /api/transferencias` con `{tareaCodigo, equipoDestinoId, motivo}`; el origen se deriva de `tarea.board.equipo`). Nace **PENDIENTE**; el RE del equipo **destino** la **acepta** (`/{id}/aceptar` con `asignadoHid` → setea `tarea.asignado_a`, estado **COMPLETADA**) o la **rechaza** (`/{id}/rechazar` → **RECHAZADA**) desde su **Bandeja**. Reusa la tabla `transferencia` (V1) + columna nueva `asignado_destino_id` (V5).
- **Solicitud (Especialista→RE):** el **ESPECIALISTA** (que no reasigna/transfiere directo) **escala** una solicitud sobre **una tarea suya** (`POST /api/solicitudes` `{tipo: REASIGNACION|TRANSFERENCIA, motivo, ...}`) al RE del equipo dueño, que la **aprueba** (`/{id}/aprobar`: REASIGNACION reasigna; TRANSFERENCIA **genera una Transferencia PENDIENTE** enlazada) o **rechaza**. Tabla `solicitud` nueva (V5). La ve en la misma **Bandeja**.
- **Autorización:** derivada de las **Asignaciones** (helper `com.fitdesk.api.Actor`: `esAdmin`, `tieneRol`, `equiposGestionables` = equipos donde el actor es RESPONSABLE_EQUIPO, todos si ADMIN). Actor por header **`X-Actor-Hid`** (interino, no criptográfico, igual que Administración). Enforcement en UI **y** backend (403). Front solo en **modo Quarkus**; menú **Bandeja** para RE/ADMIN (`puedeTransferir`), botón **"Enviar a otro equipo"** (RE/ADMIN) y **"Escalar"** (Especialista) en la tarjeta.
**Contexto:** la dueña pidió "trabajar el envío de tareas entre equipos". Hasta ahora la tabla `transferencia` estaba vacía (sin entidad/endpoint), la reasignación cross-team solo era posible de facto (el picker de asignado lista todo el catálogo del HelpDesk, sin rastro), y la Solicitud del Especialista estaba diseñada pero diferida. Decisiones de producto confirmadas con la dueña (2026-07-09): tarjeta **sigue en su board**, flujo **con aprobación**, alcance **ambos flujos**.
**Justificación:** el flujo request-based da control a los dos equipos y deja rastro auditable (estados de la tabla); la Solicitud realiza el rol del Especialista (escala, no ejecuta) sin darle poder de reasignación directa; reusar `tarea.board`/`asignado_a` respeta el invariante "una Tarea = un board". Es la **primera aplicación de escritura del enforcement por Asignaciones** (más allá de la visibilidad de boards) — sube a límite real cuando llegue el JWT propio.
**Estado:** vigente. Backend verificado por curl end-to-end (crear/aceptar/rechazar/entrantes/salientes/miembros; solicitud crear/aprobar[REASIGNACION y TRANSFERENCIA]/rechazar; negativos 403/400; Flyway V5 aplicada; **verificado que la Tarea NO cambia de board**). Frontend compila (`ng build -c quarkus`) y CORS preflight OK. **Pendiente:** recorrido visual en navegador (requiere login al HelpDesk) y notificaciones (hoy la Bandeja es pull). Ver [aprendizajes.md](aprendizajes.md) 2026-07-09.

### [2026-07-08] Las 2 correcciones portables van al Angular de `FitDesk-Nacional`; NO se parchea el legacy `js/` ni `fitScrum`
**Decisión:** las correcciones D) carga read-only y E) estados finalizados se aplican **solo al Angular** (`FitDesk-Nacional/app/`), que es el **destino nacional real**. **No** se parchea el legacy `js/` ni el repo de producción `fitScrum` porque **ninguna versión está aún en producción con usuarios** (decisión/dato de la dueña, 2026-07-08). Quedan **sin commit** en el working tree hasta nuevo aviso (la dueña eligió "no commitear todavía").
**Contexto:** al retomar la tarea (memory `aplicar-correcciones-repo-original`), la investigación reveló que `FitDesk-Nacional` (`Fit-Desk`) es un **duplicado baseline** y que el Pages vivo es el repo **`fitScrum`** sirviendo el **legacy `js/`** desde el root — pero la dueña confirmó que aún nadie lo usa en producción. Ver [aprendizajes.md](aprendizajes.md) 2026-07-08.
**Justificación:** sin usuarios reales, el legacy `js/` (donde SÍ vive el bug #2, no el #1) y el repo `fitScrum` no requieren arreglo; concentrar el esfuerzo en la versión Angular que sí se llevará a producción evita mantener dos bases y tocar un repo que se va a retirar. Si en algún momento el legacy `js/` volviera a exponerse a usuarios antes del cutover, habría que portar el bug #2 a `js/board.js:22-23` y `js/helpdesk-panel.js:931`.
**Estado:** vigente. Correcciones aplicadas y verificadas por inspección (grep); build Angular (`ng build`) no ejecutado localmente por falta de `node_modules` — se ejercitará al construir. Commit/push: pendientes de OK de la dueña.

### [2026-07-07] Búsqueda por palabra (contenido) en Tickets y Board, vía `/tickets/search`
**Decisión:** una sola caja de búsqueda (en Tickets y en el Board) que **rutea por el contenido escrito**: si es **solo dígitos** → comportamiento existente (Tickets: lookup exacto por número; Board: filtro local por número, admite parciales); si es **palabra** → búsqueda por **contenido** vía `GET /tickets/tickets/search?q=…` (ver [aprendizajes.md](aprendizajes.md) 2026-07-07). Diferencias por vista:
- **Tickets:** lista los tickets del API que coinciden, **paginada server-side** (reusa `_tickets`/`_total`); es **global** (ignora los filtros de tab cliente/estatus mientras hay búsqueda por palabra).
- **Board (decisión de la dueña: "filtrar cards vía API"):** la palabra consulta el HelpDesk (`searchTicketNumbers` → `Set` de números) y el board muestra **solo las cards cuyo ticket coincide**. **Limitación aceptada:** solo afecta a las cards del sprint actual (la intersección puede dar pocas/ninguna); se recorre hasta `cap=300` resultados.
- **Sin selector de tipo** (decisión de la dueña): la búsqueda usa solo `q` + paginación; `ticket_type_id` queda para después si se necesita.
- **La búsqueda NO se dispara al tipear — ni por palabra ni por N°** (decisión de la dueña 2026-07-07): se ejecuta solo con la **orden explícita** (Enter o el ícono 🔍) vía `submitSearch()`/`submitTicketSearch()`. Tipear solo guarda el término (`searchTerm`/`ticketSearch`) y muestra el hint "Presiona Enter o 🔍 para buscar"; **vaciar** la caja sí restaura la lista/quita el filtro de inmediato (no es una búsqueda). En Tickets, el N° hace lookup exacto server-side al pulsar buscar; en el Board, el filtro se aplica por `searchedTerm` (el término ya buscado), no por lo que se teclea. Motivo: la dueña pidió que también el N° espere la orden; y así se evita una llamada al API por cada tecla (en el board, hasta varias páginas).
**Contexto:** la dueña pidió "buscar todos los tickets que contengan una palabra (ej. credito)" e indicó el endpoint real; y que se implemente en **Tickets y Board**.
**Justificación:** una caja única (N° o palabra) es lo más intuitivo y reusa la paginación/render existentes; en el board, filtrar por coincidencia del API mantiene el modelo (el board filtra cards) sin traer tickets ajenos al tablero. Ambas búsquedas son server-side (coherente con la regla "los filtros van al API, nunca en el front", ADR 2026-07-01).
**Estado:** vigente (front compila; verificación live del endpoint pendiente).

### [2026-07-07] Board multi-equipo: selector de tablero + scoping por board; Quito operable
**Decisión:** el board deja de ser único/global y pasa a ser **por equipo/tablero**. Cambios:
- **Backend lectura:** `/api/legacy/stories` emite el `board` de cada story; `/api/legacy/sprints?board=CODIGO` filtra por tablero; nuevo `/api/legacy/boards` devuelve los tableros **visibles según las Asignaciones** del actor (`X-Actor-Hid`): GLOBAL (ADMIN/GERENCIA) ve todos, EQUIPO/REGIONAL ven los suyos.
- **Backend escritura:** `applyFields` resuelve `board` **antes** que `sprint` y `sprintByCodigo` se busca **dentro del board** (sprint es único por `(board, codigo)`); `putSprints?board=X` reconcilia el tablero pedido.
- **Ids:** `tarea.codigo` es **único global** → el front genera TA-NNN del set global (carga todas las stories; el board filtra la VISTA por tablero, igual que "Mi Panel" cruza todos). `sprint.codigo` es **por board** (cada equipo su cadencia).
- **Frontend:** `DataService` con `boards`/`currentBoard`, `loadBoards`/`switchBoard`, sprints por board y stories filtradas por board (también Progreso/Consultas/Burndown vía `getStoriesBySprint`). El board tiene un **selector de Equipo/Tablero** (aparece si hay >1 visible), default = primer tablero visible del usuario.
- **Operabilidad:** al **crear un equipo** se crea su Board + un Sprint activo inicial (`EquipoResource`); a **Quito** se le creó su tablero + `SP-01` activo → queda **vacío y listo para trabajar**.
**Contexto:** la dueña pidió "implementarlo todo para que Quito tenga listo todo para empezar a trabajar". El esquema ya vinculaba `Board→Equipo` y `Tarea→Board`, pero el board ignoraba el board (paridad legacy de Cuenca).
**Justificación:** habilita el alcance nacional real (cada equipo su tablero) reutilizando la capa legacy; la visibilidad por Asignaciones es la primera aplicación concreta del enforcement de plataforma en el board. Cuenca queda intacto (101 tareas, SP-04 activo).
**Estado:** vigente (verificado por curl + DB: Cuenca intacto, Quito vacío/operable, visibilidad por rol; front compila). **Limitación conocida:** la visibilidad del board por header no es límite criptográfico (sube con identidad por token); si un usuario no tuviera tableros visibles, la vista cae al modo global (no peor que hoy).

### [2026-07-07] La carga del board es SOLO LECTURA contra el HelpDesk (no reasigna tickets)
**Decisión:** abrir el board **no** escribe en el HelpDesk. Se quitó de `syncTicketStatuses()` el `assignTicket()` que, en cada carga, reasignaba en el HelpDesk real los tickets cuyo asignado local difería (y podía arrastrar un cambio de estado del lado del HelpDesk). La asignación al HelpDesk ocurre solo por **acción explícita** (diálogo de la tarjeta / asignar ticket); el cambio de estado, solo al **arrastrar** una card (`pushHdEstado`, con confirmación). La lectura del estado sigue saliendo de la caché `ticket_espejo` (una consulta).
**Contexto:** la dueña notó que "al cargar el board parece que asigna los tickets y los cambia de estado". Ver [aprendizajes.md](aprendizajes.md) 2026-07-07.
**Justificación:** abrir una vista nunca debe escribir en un sistema externo (regla de oro de la migración); evita reasignaciones/transiciones no pedidas en el HelpDesk de producción.
**Estado:** vigente (verificado: 0 llamadas reales a `assignTicket` en la carga; front compila).

### [2026-07-06] `activo` de un equipo = baja lógica (oculta de selectores, no borra)
**Decisión:** desactivar un equipo (`activo=false`, editable desde el modal de edición) es una **baja lógica**: lo **oculta de los selectores** (equipo responsable al crear cliente; alcance EQUIPO al asignar) y lo muestra **atenuado** en la tabla, pero **no** borra ni cascada nada (asignaciones/clientes/tableros/tareas siguen intactos). Al **editar** una asignación que ya apunta a un equipo inactivo, ese equipo se incluye igual en el selector para no perder el valor. El filtro es del **front** (`equiposParaSelector`); el backend sigue devolviendo todos los equipos.
**Contexto:** la dueña preguntó qué hacía desactivar un equipo; hasta entonces `activo` solo se guardaba/mostraba (sin efecto). `EquipoResource` no tiene DELETE (un equipo está referenciado por historia vía FKs), así que la baja lógica es la forma prevista de "retirar" un equipo (reorganización/fusión, cierre de oficina, piloto o alta por error) conservando su historial.
**Justificación:** dar semántica real al flag sin arriesgar integridad referencial; el borrado duro rompería FKs. Mantener el filtro en el front es lo mínimo; si a futuro se quiere reforzar, el backend podría excluir inactivos en los `list` o el board respetarlos.
**Estado:** vigente (front compila; verificado que el backend expone `activo` por equipo y el toggle round-trip funciona por curl).

### [2026-07-06] Se elimina la tab "Usuarios y roles"; queda solo "Asignaciones"
**Decisión:** el panel de Administración pasa de 5 a **4 tabs** (Regionales, Equipos, Clientes, **Asignaciones**). Se quita la vista **por persona** ("Usuarios y roles") y toda la gestión de roles vive en **Asignaciones** (una fila por asignación). Para no perder capacidades: (a) el **buscador** por nombre/código del API se **porta a Asignaciones** (y también filtra por rol/alcance); (b) se agrega columna **ID API** (`helpdesk_user_id`, ahora incluido en el JSON de `AsignacionResource.describir`); (c) asignar a un empleado **sin rol** sigue disponible vía "Nueva asignación" (elige del catálogo del HelpDesk con buscador y materializa la fila `usuario`). Se limpió el código muerto (`usuariosVista`/`usrBuscar`/`hdUsers` en `Administracion`).
**Contexto:** la dueña preguntó si era factible dejar únicamente la tab Asignaciones y eligió "quitarla y portar el buscador". Las dos tabs operaban sobre la misma entidad `Asignacion`, solo cambiaba el lente (persona vs. otorgamiento).
**Justificación:** una sola vista evita duplicar UI y confusión; Asignaciones es la más completa (muestra alcance y vigencias). **Tradeoff aceptado:** se deja de ver de un vistazo el padrón de empleados que **aún no tienen ningún rol** (antes visible como "sin rol"); ahora se asigna a demanda desde el modal.
**Estado:** vigente (front compila; backend expone `helpdeskUserId` en asignaciones; verificado por curl).

### [2026-07-06] Gating del panel por roles de PLATAFORMA; panel para RESPONSABLE_EQUIPO; solo ADMIN asigna ADMIN
**Decisión:** el acceso a Administración se deriva de los **roles de plataforma** del usuario (sus Asignaciones), no de `esMSC001`. Nuevo endpoint read-only `GET /api/admin/mis-roles/{helpdesk_user_id}` → códigos de rol vigentes; el front lo consulta al iniciar sesión y expone `esAdminPlataforma`/`esResponsableEquipo`. **El panel queda disponible para ADMIN y RESPONSABLE_EQUIPO** (`puedeAdministrar`); `adminGuard` es async y espera a que carguen los roles. **Solo un ADMIN puede definir/modificar/quitar una asignación de rol ADMIN** (`puedeAsignarAdmin`): en el front el rol ADMIN se oculta del selector y se bloquean editar/quitar de chips ADMIN a los no-admin; en el backend `AsignacionResource` (POST/PUT/DELETE) rechaza con **403** si el actor no es ADMIN. El actor viaja en el header **`X-Actor-Hid`** (helpdesk_user_id del logueado). `MSC001` es admin de arranque (bootstrap) en front y backend.
**Contexto:** la dueña pidió "el panel disponible para todos los responsables de equipo, pero solo el admin puede definir un rol admin para otro usuario". Realiza el principio ya adoptado (2026-07-06 "roles en la plataforma, no del API"); antes el gating era 100% `esMSC001`.
**Justificación:** deriva el permiso del modelo real (Asignaciones) en vez de un id hardcodeado, y protege la escalada de privilegios (que un RE se auto-otorgue ADMIN) tanto en UI como en servidor. El header `X-Actor-Hid` **no es un límite criptográfico** (es coherente con la postura actual, donde todo el gating es del cliente); sube a real cuando llegue la identidad por token (JWT del HelpDesk validado en Quarkus) — próximo paso del enforcement.
**Estado:** vigente (verificado por curl: RE→ADMIN 403, RE→CONSULTOR 201, ADMIN→ADMIN 201, RE borra ADMIN 403; front compila).

### [2026-06-18] Estructura de menú y panel de administración
**Decisión:** el menú se organiza en **Trabajo (Scrum)** [Tablero, Mi Panel, Burndown, Progreso, Consultas], **HelpDesk** [Tickets, Semanal, Pendientes] y **Administración** (nuevo, solo ADMIN) [Regionales, Equipos, Clientes, Usuarios y roles, Asignaciones, Tableros y sprints, Estados del flujo, Integración HelpDesk]. Detalle en [knowledge/05-menu-y-administracion.md](knowledge/05-menu-y-administracion.md).
**Contexto:** la app actual no tiene panel de administración; el alcance Cuenca está hardcodeado.
**Justificación:** la sección Administración (sobre todo "Asignaciones") es la que habilita el alcance nacional por datos (Rol × Alcance × Vigencia) sin tocar código.
**Estado:** vigente (sujeto a evaluación de la dueña del proyecto).

### [2026-06-18] Nombre del aplicativo: FitDesk
**Decisión:** el aplicativo se llamará **FitDesk** (antes mezcla de "Fit-Daily" de marca y "fitscrum" interno).
**Contexto:** se necesitaba un nombre único; la app gestiona el trabajo de soporte (tickets del HelpDesk) en tableros Scrum/Kanban a nivel nacional.
**Justificación:** mantiene el prefijo "Fit" del ecosistema FitBank; "Desk" comunica que es la herramienta para operar la mesa de ayuda; no se casa con "scrum"/"daily", que quedaban estrechos para el alcance nacional.
**Estado:** vigente.

### [2026-06-18] Identidad federada al HelpDesk; autorización propia
**Decisión:** login/credenciales contra el HelpDesk; rol/permiso/alcance/vigencia en fitscrum (puente `helpdesk_user_id`).
**Contexto:** el HelpDesk ya tiene a los consultores; gestionar usuarios aparte no escala a nivel nacional.
**Justificación:** no gestionar contraseñas, pero no quedar preso de lo que el HelpDesk pueda representar. Default deny si no hay `Asignacion`.
**Estado:** vigente.

### [2026-06-18] Se fusionan Líder y Responsable de Cuenta en un solo rol "Responsable de Equipo"
**Decisión:** quedan **6 roles** (Consultor, Despachador, Responsable de Equipo, Especialista, Gerencia/Visor, Administrador). El **Responsable de Equipo** lidera su equipo (asignar, tableros, sprints) Y responde por los clientes de su equipo, viendo sus tickets aunque los atienda otro equipo. Para eso, `CLIENTE` gana **`equipo_responsable_id`**; "los clientes de mi equipo" se derivan de ahí.
**Contexto:** el usuario (Juan) aclaró que en su realidad el responsable de los clientes y el líder del equipo son la misma persona ("Responsable de Equipo en Cuenca"); la visibilidad cross-team de sus clientes (caso fitswitch) se conserva.
**Justificación:** modelo más simple y fiel a la organización; la esencia de "responsable de cuenta" (responder por clientes) queda integrada en el rol unificado, no se pierde.
**Estado:** vigente. (Supersede el ejemplo previo de "dos asignaciones" Líder + Responsable de Cuenta.)

### [2026-06-18] Autorización = Rol × Alcance × Vigencia
**Decisión:** modelar permisos con entidad `Asignacion(usuario, rol, alcance, vigencia)`, alcance polimórfico (Equipo|Cliente|Regional|Global).
**Contexto:** organización matricial; una persona tiene múltiples responsabilidades cruzadas.
**Justificación:** separar "qué hago" de "sobre qué" permite componer la realidad (ej. el rol habitual de una persona + una colaboración temporal en otro equipo = 2 asignaciones) sin excepciones de código.
**Estado:** vigente.

### [2026-06-18] Board por equipo; una Tarea = un board; transferencia cambia asignado, no board
**Decisión:** cada equipo tiene board y cadencia de sprints propios; la Tarea vive en el board del equipo dueño del cliente; el cross-team se resuelve con Transferencia (handoff entre despachadores) que cambia el asignado.
**Contexto:** ejemplo fitswitch — ticket de cliente de Cuenca que resuelve Quito, pero se sigue viendo en el board de Cuenca.
**Justificación:** el ejecutor de otro equipo trabaja vía "Asignados a mí" (ya existe); no se duplica ni migra la tarjeta.
**Estado:** vigente.

### [2026-06-18] No se modela "aplicación/producto"; se eliminan Aplicacion y EquipoAplicacion
**Decisión:** se **eliminan** `Aplicacion` y `EquipoAplicacion` del modelo. El trabajo NO se clasifica por aplicación/producto.
**Contexto:** la aplicación (fitswitch, homebanking) surgió de un ejemplo puntual; no es un dato que se capture (el ticket solo trae texto libre) ni una clasificación que el equipo use en la práctica.
**Justificación:** no modelar estructura especulativa. El cruce a otro equipo se resuelve con la **Transferencia** (handoff humano entre despachadores), sin necesidad de un directorio de competencias. El esquema queda adaptado a lo que realmente se hace.
**Estado:** vigente. (Supersede la versión previa que trataba la aplicación como reference data opcional.)

### [2026-06-18] Tickets cacheados por sync incremental (espejo)
**Decisión:** mantener un `TicketEspejo` local sincronizado por delta; la app trabaja sobre el espejo.
**Contexto:** dependencia de API externa que no se controla; 1206+ tickets, escala nacional.
**Justificación:** resiliencia ante caídas del HelpDesk y rendimiento; la Tarea es la entidad dueña.
**Estado:** vigente.

### [2026-06-18] El espejo de tickets guarda solo encabezado liviano; conversación y adjuntos en vivo
**Decisión:** `TICKET_ESPEJO` almacena únicamente metadatos livianos (número, cliente, estado, prioridad, fechas, asunto, asignado, `last_synced_at`). La **conversación, mensajes y adjuntos** (imágenes, zips) **NO se almacenan**: se consumen en vivo del HelpDesk vía proxy/streaming de Quarkus, bajo demanda.
**Contexto:** los tickets traen adjuntos pesados (zips, imágenes); la app actual ya pide los mensajes bajo demanda y no los guarda.
**Justificación:** evita almacenar/duplicar archivos pesados y problemas de almacenamiento/sincronización; el encabezado liviano basta para pintar el board y filtrar por alcance nacional sin pegarle al HelpDesk por cada tarjeta.
**Estado:** vigente.

### [2026-06-18] Migración Strangler Fig; Firebase y GitPages intactos hasta el cutover
**Decisión:** construir la versión nueva (Quarkus+Postgres+contenedores) en paralelo; Firebase solo lectura; GitPages producción intacta; ETL idempotente; cutover reversible al final.
**Contexto:** hay producción viva que no se puede afectar.
**Justificación:** minimiza riesgo; cada fase verificable y reversible.
**Estado:** vigente.

### [2026-06-18] El backend FastAPI+MongoDB existente se descarta como referencia
**Decisión:** no continuar el andamiaje FastAPI+Mongo encontrado en el código; el backend objetivo es **Quarkus + PostgreSQL**.
**Contexto:** el FastAPI/Mongo es genérico (`items`/`users`), no implementa el dominio real y no está conectado a la app Angular (que habla directo con Firebase y el HelpDesk).
**Justificación:** alinearse al stack corporativo (Quarkus/Postgres); evitar arrastrar una tercera tecnología (Mongo) y un código que no resuelve el dominio. Se puede mirar como referencia de auth JWT, pero se reescribe.
**Estado:** vigente (confirmar con la dueña del proyecto por si había intención de usarlo).

### [2026-06-18] Quarkus absorbe el proxy del HelpDesk y se vuelve la única fuente del frontend
**Decisión:** en el destino, el frontend Angular deja de hablar directo con Firebase y con el HelpDesk; habla **solo con Quarkus**. Quarkus: (a) guarda los datos propios en PostgreSQL, (b) hace de **proxy + caché/sync** hacia el API del HelpDesk (reemplaza al Cloudflare Worker), (c) federa la identidad contra el HelpDesk y emite el JWT propio.
**Contexto:** hoy hay tres dependencias externas (Firebase, HelpDesk directo, Cloudflare Worker). El HelpDesk bloquea CORS, por eso ya existe un proxy.
**Justificación:** centralizar autorización, caché (TicketEspejo) y CORS en el backend; eliminar el free tier (Cloudflare Worker) y simplificar el frontend; habilitar el modelo de visibilidad nacional server-side.
**Estado:** vigente.

### [2026-06-30] Fase 1 — Backend nuevo en `backend/`, Quarkus + Flyway, esquema en español
**Decisión:** el backend Quarkus vive en **`backend/`** (hermano de `app/` y `docs/`), separado del código actual. Esquema gestionado por **Flyway** (`V1__init.sql`, `V2__seed_catalogos.sql`), Hibernate con `database.generation=none`. Tablas/columnas en **español** y **snake_case** (estrategia `CamelCaseToUnderscoresNamingStrategy`), preservando el idioma del legacy. Alcance polimórfico de `Asignacion` modelado con `alcance_tipo` + FKs nullables a equipo/cliente/regional + `CHECK chk_alcance_coherente`; vigencia con `CHECK chk_vigencia`.
**Contexto:** Strangler Fig — lo nuevo se construye al lado sin tocar `app/`. Sin Maven/Quarkus CLI globales en la máquina; se generó el starter desde code.quarkus.io (incluye `mvnw`).
**Justificación:** separación física limpia; Flyway versiona el esquema (no Hibernate) para control y repetibilidad del ETL; los CHECK hacen cumplir el modelo (Rol×Alcance×Vigencia, default deny) a nivel de BD, no solo de código. Validado contra Postgres 16 real (12 tablas, 6 roles, 4 estados; los CHECK rechazan asignaciones incoherentes).
**Estado:** vigente.

### [2026-07-01] Los filtros van SIEMPRE como consulta directa al API, nunca en el front
**Decisión:** cualquier filtro de una lista (cliente, estatus, asignado, no-finalizados…) se resuelve **server-side en la petición**, y la lista que se muestra es **exactamente** la página que devuelve el API. Prohibido refinar/recortar la página en el navegador. Aplicado a la vista Tickets: se quitó el refinamiento client-side `operativos` del camino de render; "Pendientes" excluye los finalizados pasando la **lista `ticket_status_id`** de estados no-finalizados (misma forma de lista por comas que `client_id`), y `base()` = `tickets()` (la página del API tal cual).
**Contexto:** la tab Pendientes mezclaba paginación server-side con un filtro client-side (`!esFinalizado`) → páginas semivacías (mostraba 9 de 12) y `total` inflado (contaba finalizados) → "páginas infinitas". La dueña fijó el principio: los filtros siempre al API.
**Justificación:** con paginación server-side, filtrar en el front rompe el conteo y llena a medias las páginas. Filtrar en la consulta da páginas llenas, `total` real y paginación correcta; además es coherente con que el backend (hoy el HelpDesk; mañana Quarkus como proxy) sea la única fuente de verdad de la consulta.
**Pendiente de confirmar (live):** que el API del HelpDesk acepte `ticket_status_id` como **lista por comas** (la doc solo confirmó lista para `client_id`). Si no la acepta, se ajusta la estrategia server-side (p. ej. parámetro de "abiertos" o varias consultas), nunca volviendo a filtrar en el front.
**Estado:** vigente (implementado; verificación live en curso).

### [2026-07-01] Fase 3 — Frontend a Quarkus vía API legacy-compatible detrás de bandera; escrituras después
**Decisión:** el frontend Angular apunta su capa de datos a Quarkus detrás de una **bandera de environment** (`dataBackend: 'firebase' | 'quarkus'`, default `firebase`). El backend expone endpoints **`/api/legacy/*`** que devuelven las **mismas formas JSON** que hoy leen las vistas desde los nodos de Firebase, así **las vistas no se tocan**. El primer incremento (slice 1) es **solo lectura**: en modo Quarkus las escrituras NO tocan Firebase (regla de oro) y el SSE se apaga; persistir escrituras en Quarkus es el slice 2. Activación: `ng serve -c quarkus` (config nueva en `angular.json` + `environment.quarkus.ts`). Detalle en [knowledge/09-fase3-frontend-quarkus.md](knowledge/09-fase3-frontend-quarkus.md).
**Contexto:** todo el I/O de Firebase está centralizado en `DataService`; las vistas solo usan su API pública (signals). Eso permite desviar la fuente con un cambio quirúrgico.
**Justificación:** una **API legacy-shape temporal** da paridad con Angular casi sin diff y es reversible (la bandera vuelve a Firebase al instante); la traducción vive en el backend, no en las vistas. La API limpia (no legacy) + adaptador Angular se hará después, cuando el board ya no dependa de las formas de Firebase. Paridad **funcional/visual** (no byte): la data sale con identidad ya reconciliada (`assignee` = **id del HelpDesk** —porque `session.id` es el id del HelpDesk—, `client` = slug) — más limpio que el legacy. Verificado: build Angular OK con `-c quarkus`; 100 tareas/4 sprints/12 usuarios servidos desde Postgres; CORS a `:4200` OK.
**Slice 2 (escrituras, 2026-07-02):** los `fbPut/fbPatch/fbDelete` del DataService rutean en modo Quarkus a `PUT/PATCH/DELETE /api/legacy/*` (Postgres), NUNCA a Firebase. Backend imita la semántica RTDB: PATCH parcial de `tarea`, upsert/deep-path de la colección stories, y PUT de nodo completo que **reconcilia** la tabla (upsert presentes, borra ausentes). Se define `@PATCH` (JAX-RS no lo trae) y se agrega PATCH a CORS. Verificado por curl (crear/editar/borrar tarjeta, deep-path, reconcile de overlays; vuelve a 100 tareas).
**Estado:** vigente (slice 1 y 2 implementados y verificados; falta API limpia y HelpDesk vía Quarkus).

### [2026-07-06] Ajuste del modelo de roles: 5 roles, Especialista redefinido, roles en la plataforma
**Decisión:** (a) **eliminar el rol `DESPACHADOR`** — operativamente es un subconjunto del Responsable de Equipo (ambos reasignan/transfieren) y ya no había datos con ese rol; migración `V4__roles.sql` (DELETE + recrear el CHECK sin él); ETL `Helpdesk → RESPONSABLE_EQUIPO`. (b) **Especialista redefinido**: de "opera cualquier board, global" a **ejecutor nacional acotado** — solo trabaja/crea sus propias tareas; para reasignar/transferir **envía una solicitud** (con explicación) al Responsable de Equipo, que decide/ejecuta; no gestiona boards ni ve el equipo. (c) **Consultor crea tareas solo para sí**. (d) **Los roles/permisos se definen EN la plataforma** (Asignaciones = Rol×Alcance×Vigencia), **desacoplados del `role_description` del HelpDesk**. Detalle: [knowledge/12-roles-y-responsabilidades.md](knowledge/12-roles-y-responsabilidades.md).
**Contexto:** al usar el sistema, la dueña ajustó las reglas de negocio de los roles. El modelo de 5 roles es el nuevo estándar; los permisos aún son *descriptivos* (no se hacen cumplir en código todavía).
**Justificación:** modelo más fiel y simple; el Especialista con escalado por solicitud da control al líder sin darle poder de reasignación directa al ejecutor nacional; roles en la plataforma = gobernables por datos sin depender de lo que represente el HelpDesk.
**También:** el panel de **Asignaciones** ahora permite **crear, editar (rol/alcance/vigencia) y quitar** (backend `PUT`/`DELETE` + UI en las tabs Asignaciones y Usuarios y roles). **Pendiente (fuera de alcance):** enforcement de permisos por Asignaciones (reemplazar `esMSC001`/`esSupervisor`) y el flujo de solicitudes (entidad + endpoints + UI).
**Estado:** vigente (modelo + gestión de asignaciones implementados y verificados 2026-07-06).

### [2026-07-02] Administración (slice 1) — Regionales/Equipos/Clientes por UI; ADMIN=MSC001 y solo Quarkus
**Decisión:** se implementa la sección **Administración** (menú + página `/admin`) con las 3 primeras entidades de la nacionalización por datos: **Regionales, Equipos, Clientes** (listar + crear). Backend: `RegionalResource`(+PUT), `EquipoResource`, `ClienteResource` bajo `/api/admin/*`. Frontend: `features/admin/*`, `adminGuard`, `auth.puedeAdministrar`. **Gating:** solo rol ADMIN —hoy `esMSC001` (Sol), hasta que exista la `Asignacion` con rol ADMIN— y **solo en modo Quarkus** (Firebase no tiene este modelo). Detalle en [knowledge/05-menu-y-administracion.md](knowledge/05-menu-y-administracion.md).
**Contexto:** es donde se define la 2ª regional y se dan de alta los 6 clientes de otra regional pendientes, sin tocar código (ADR 2026-07-01 "regionales desde Administración").
**Justificación:** entrega ya el valor central (crear la matriz geográfica por datos) con una rebanada acotada y verificable; las demás tabs (Usuarios/Asignaciones/Boards/Estados/Integración) y el enganche de tareas huérfanas a los clientes nuevos vienen después.
**Estado:** vigente (slice 1 implementado; backend verificado por curl, frontend compila).

### [2026-07-02] Fase 4 — Stack completo en contenedores (compose: db + backend + frontend)
**Decisión:** el stack nuevo se contenedoriza completo y levanta con **un comando** (`docker compose up --build`): Postgres, backend Quarkus (JVM, `Dockerfile.multistage` self-contained con Maven) y frontend Angular servido por Nginx (`app/Dockerfile`, build `-c quarkus --base-href /`). La config del contenedor (URL/credenciales de BD, CORS) entra por **variables de entorno** (MicroProfile mapea `QUARKUS_*` a las propiedades), no hardcodeada. El `docker-compose.yml` vive en la **raíz**; `backend/docker-compose.yml` queda como "solo BD" para dev con el jar. Detalle en [knowledge/11-fase4-contenedores.md](knowledge/11-fase4-contenedores.md).
**Contexto:** Fase 3 dejó la app funcional contra Quarkus; toca empaquetar para desplegar (VPS ahora, AWS después). El Postgres del contenedor arranca vacío → la data se lleva con `pg_dump`/restore desde la BD local ya migrada (el flujo que pidió la dueña).
**Justificación:** un stack reproducible en contenedores es el paso previo a cualquier despliegue (VPS/AWS) y no depende de la máquina; el build self-contained del backend evita pasos previos; la config por env vars permite el mismo artefacto en local/VPS/AWS cambiando solo variables (en AWS saldrán de Secrets Manager). Verificado: las 3 imágenes construyen y corren; backend contra Postgres real; CORS OK.
**Estado:** vigente (Fase 4 implementada y verificada por imágenes/servicios; falta parametrizar la URL del backend para el VPS, imagen nativa, y Fase 5 AWS).

### [2026-07-01] Las regionales (y el alta de clientes/equipos) se definen desde la página de Administración, no por seed
**Decisión:** crear una nueva `Regional` (y colgar de ella `Equipo`s y `Cliente`s) es una operación de **datos vía la UI de Administración** (sección ADMIN ya prevista), **no** un seed en el código del ETL ni una migración. El ETL solo carga la data histórica de Cuenca; los clientes de otra regional detectados (`15,17,37,65,66,67`) quedan pendientes hasta que se creen esas regionales/equipos desde Administración, y luego se re-corre el ETL (idempotente) para engancharlos.
**Contexto:** al migrar la data real aparecieron clientes reales de otra regional en el board de Cuenca (ver [aprendizajes.md](aprendizajes.md), 2026-07-01). La dueña aclaró que la definición de regiones debe hacerse desde una página de administración.
**Justificación:** es la esencia de la **nacionalización por datos** (ADR 2026-06-18 "Rol×Alcance×Vigencia" y menú Administración): incorporar una regional/equipo/cliente NO debe requerir cambios de código ni redeploy. Hardcodear la 2ª regional en el ETL contradiría ese principio.
**Estado:** vigente.

### [2026-07-01] Fase 2 — ETL en dos pasos (extraer read-only + importar idempotente en Quarkus)
**Decisión:** el ETL se parte en **(1) extraer** — `scripts/extract-firebase.sh` hace un `GET` público a `…/fit-daily.json` y versiona el snapshot (nunca escribe Firebase) — y **(2) importar** — endpoint admin `POST /api/admin/etl/import-firebase` que relee el snapshot y hace **upsert por clave natural** en el Postgres local. El export a un VPS (vía `pg_dump`) queda para después y **no se define ahora**. Alcance del incremento: **completo** (núcleo del tablero + overlays), con migración **V3** que agrega 6 tablas (`ticket_nota`, `ticket_accion`, `ticket_pendiente`, `rotacion_semanal`, `progreso`, `consulta`) y ensancha `tarea.titulo` a 500. Detalle en [knowledge/08-fase2-etl.md](knowledge/08-fase2-etl.md).
**Contexto:** la dueña pidió "extraer la data de Firebase tal cual e importarla al Postgres local; luego yo exporto y publico en un VPS". La estrategia (Fase 2) exige idempotencia para re-sincronizar deltas mientras Firebase sigue vivo.
**Justificación:** separar extracción de carga permite re-importar sin volver a pegarle a Firebase; el upsert (find-or-create por `codigo`/`helpdesk_ticket_id`/`semana_inicio`/…) hace la carga repetible (verificado: 2ª corrida = 0 insertados, todo actualizados, 420 filas idénticas). Reusa las entidades Panache ya escritas; el Postgres queda autocontenido y `pg_dump`-eable para el VPS.
**Sub-decisiones de traducción:** rol local `Helpdesk→DESPACHADOR`, `Supervisor→RESPONSABLE_EQUIPO`, `Consultor→CONSULTOR`; **cada usuario recibe 1 `Asignacion` (alcance Equipo Cuenca)** por *default deny*; `status` legacy `review→EN_CERTIFICACION`; `helpdesk_client_id` numérico **derivado de los pares `client`/`clientName` de las stories**; lo que no resuelve (clientes fuera del seed Cuenca) queda con FK nula y se **reporta**, no se inventa.
**Estado:** vigente. Implementado y verificado en local (2026-07-01).

### [2026-06-18] Destino AWS con ECS Fargate (no EKS)
**Decisión:** desplegar contenedores en ECS Fargate + ECR + RDS PostgreSQL + ALB + Secrets Manager + CloudWatch.
**Contexto:** se abandona free tier (Firebase/GitPages) por contenedores en AWS.
**Justificación:** Fargate da contenedores gestionados sin operar clúster; Kubernetes/EKS es sobre-ingeniería para el tamaño actual.
**Estado:** vigente (revisar si el crecimiento lo amerita).

## [2026-07-14] Neon (Postgres serverless) como base en la nube para dev/staging
**Contexto:** se necesitaba una Postgres accesible fuera del Docker local para avanzar hacia el despliegue en contenedores/AWS sin montar todavía RDS.
**Decisión:** adoptar **Neon** (Postgres 18.4 serverless, AWS us-east-1) como base en la nube intermedia. Se migró la data local (20 tablas, 102 tareas, etc.) con `pg_dump`/`psql`; conteos verificados idénticos. Quarkus se conecta vía el script `backend/run-neon.sh`, que **deriva usuario/host/db/JDBC-URL de `~/.neon-url`** y NO guarda la contraseña en ningún archivo del repo. La JDBC URL fuerza `currentSchema=public` (por el gotcha del search_path, ver aprendizajes 2026-07-14).
**Estado:** verificado end-to-end — Quarkus arranca contra Neon, Flyway valida las 9 migraciones sin re-aplicar, y sirve los 2 boards (Tablero Cuenca) desde la nube. La base local (Docker `fitdesk-db`) sigue siendo el default de `application.properties`; Neon es opt-in por script.
**Pendiente:** decidir si Neon pasa a ser el default o queda como staging; a futuro, RDS en AWS como producción.

## [2026-07-15] Backend desplegado en Render (free web service) vía imagen Docker
**Contexto:** publicar el backend Quarkus en la nube sin montar aún AWS, y (por decisión de la dueña) sin subir el código a GitHub.
**Decisión:** deploy en **Render** como *web service* gratis, con **imagen Docker pre-construida** (no build-from-Git). Imagen `docker.io/zolmaria/fitdesk-backend:latest` (pública, para que el plan free la baje sin credenciales), construida con `backend/src/main/docker/Dockerfile.multistage` (Maven→JRE, linux/amd64). Credenciales de Neon inyectadas como **env vars en Render** (`QUARKUS_DATASOURCE_*`), nunca en la imagen ni el repo. URL pública: **https://fit-desk.onrender.com**.
**Estado:** verificado end-to-end — `GET /api/legacy/boards` responde `HTTP 200` y sirve los 2 boards (Cuenca, Quito) desde Neon. Cadena completa nube: navegador → Render (Quarkus) → Neon (Postgres 18.4).
**Notas / pendientes:** plan free duerme tras ~15 min (cold start ~30-50 s) y 512 MB RAM (heap acotado con `-XX:MaxRAMPercentage=65`). El puerto lo da Render por `$PORT` (`quarkus.http.port=${PORT:8080}`). Para que el **frontend desplegado** consuma este backend: (a) apuntar la base URL del Angular a `https://fit-desk.onrender.com`, y (b) agregar el origin del frontend a `QUARKUS_HTTP_CORS_ORIGINS` en Render (hoy solo permite `localhost:4200`).

## [2026-07-18] Lote 2 UX/UI (Tickets + Board + shell) — 100% frontend, sin backend
**Contexto:** usando el lote 1 desplegado, la dueña pidió ~11 mejoras más (casi todas en Tickets y Board).
**Decisiones:**
- **Solo-lectura en estados terminales** (Aprobado, Cerrado por el cliente, Cerrado por falta de respuesta, Cotización rechazada = `COTIZACION NO ACEPTADA`): nuevo predicado `esSoloLectura` en `core/helpdesk-estados.ts` (reusa `esEstadoFinalizado` + `includes('NO ACEPTADA')`). Aplica en el diálogo de conversación Y en la tarjeta de la lista. **Responder bloqueado para todos**; **cambiar de estado solo Responsable de Equipo/Admin** (`auth.puedeTransferir`); **asignar bloqueado**.
- **Búsqueda global de ticket en TODAS las pantallas**: se promueve al shell (drawer) vía `core/services/search.service.ts` (Subject para Tickets vivo + `pending` para navegar-luego-crear). El shell la muestra **salvo en Tickets** (esa vista ya trae la suya con "limpiar"). Al enviar → navega a `/tickets` y la ejecuta.
- **"en board" navega a la tarea**: el indicador pasa a botón; Tickets calcula `{board, sprint, storyId}` (barrido de stories) y navega a `/board?board&sprint&card`; el Board recibe el deep-link (`ActivatedRoute`), hace `switchBoard`+`setSprint` y **resalta** la tarjeta (`#card-{id}` + animación).
- **Board Mover en todas las pantallas**: el botón Mover se ve también en escritorio; **arrastre y botón respetan el mismo permiso** (`canDrag` = dueño/asignado o Responsable/Admin) — antes el drag de escritorio no gateaba por permiso.
- **Tab "Sin asignar"** en Tickets: refino en cliente sobre la página del equipo (`!usuarioAsignado`), mismo tradeoff aceptado (el API no expresa "sin asignar"). Se **quita** la tab "Estadísticas".
- **Código de tarea sin ticket**: se muestra el **código `TA-NNN` ya existente** (`Tarea.codigo`, global único, generado por el front) — NO un correlativo por tablero (chocaría con la restricción `unique`; sería cambio de esquema + backend + redeploy por una mejora cosmética). 1 línea en `board.html`.
- **Bug barra fija**: `.topbar` con `position:sticky` se rompía por el `transform` que Material aplica a `.mat-drawer-content`. Fix: `mat-sidenav-content.shell-content { overflow:hidden }` + `.content { overflow-y:auto; min-height:0 }` + `.topbar { flex:0 0 auto }`.
- **Menú**: se quitan Burndown/Progreso/Consultas del nav (rutas intactas).
**Estado:** implementado y **verificado con Playwright** (1280 + móvil): todas las mejoras OK, 0 errores de consola, build de producción OK. **Sin cambios de backend → deploy solo a Pages** (no toca Render/Neon).

## [2026-07-18] Follow-ups del lote 2 (buscador del board + borrado de tareas)
- **Buscador del tablero en dos campos:** (1) **Ticket o código** — local e instantáneo, matchea `s.ticket` (N°) **o** `s.id` (código `TA-NNN`, parcial); (2) **Palabra** — coincide en el texto local de la card (título/descr/cliente) **y** en el contenido del ticket vía HelpDesk (`matchedTickets`), así también encuentra tareas sin ticket. (Antes: un solo campo; N°→local, palabra→solo API, sin código.)
- **Tareas con ticket asociado NO se pueden borrar:** la × de la card se oculta si `card.ticket` (solo tareas propias sin ticket son eliminables); `deleteCard` y `clearBoard` (Borrar Board) lo refuerzan (guard + solo borran las sin ticket, avisando cuántas con ticket se conservan). Razón: las tareas con ticket nacen del HelpDesk (espejo), no son datos propios del board.
**Estado:** implementado y verificado con Playwright (2 campos filtran; 0 tarjetas con ticket muestran ×).

## [2026-07-19] "Sin asignar": paginación EN CLIENTE (el API no filtra "sin asignado")
**Problema:** la tab "Sin asignar" refinaba en cliente sobre CADA página server (12), dejando páginas de 1-2 y un paginador con total equivocado (1110). Se probó el API: `assigned_user_id=0/-1/null`→0 resultados, vacío→todos; **no hay filtro server-side de "sin asignado"** (los sin asignar traen `assigned_user_id: null`).
**Solución:** `HelpdeskService.loadAllFiltered(filtros)` carga TODAS las páginas del equipo (1ª página → `total`; el resto EN PARALELO por lotes de 5; tope API 100/página; cap 40 págs). En Tickets, la tab "Sin asignar" (`esSinAsignarLocal`) filtra `!usuarioAsignado` y **pagina en cliente** (12/página; `tabTotal`=nº sin asignar; `pagedRows` recorta; `onPage` no re-consulta). Verificado: "12 de 728", 61 páginas, todas sin asignar, carga ~2 s, navegación de página instantánea.

## [2026-07-19] "Sin asignar": excluir también ENTREGADO (además de Aprobado/Cerrado)
**Pedido:** en "Sin asignar" los tickets deben estar en estado distinto a Entregado, Aprobado o Cerrado (un ticket entregado/aprobado/cerrado no necesita asignación).
**Solución:** `sinAsignarStatusIds` (server-side) = estados NO finalizados (`esEstadoFinalizado`) Y que no incluyan "ENTREGADO". La tab "Sin asignar" lo usa en `buildFilters` (la tab "Equipo" sigue con `pendingStatusIds`, que sí incluye Entregado). Verificado: "12 de 213" (bajó de 728), 18 páginas, 0 tickets Entregado/Aprobado/Cerrado; además carga menos (343 del equipo vs 1110) → más rápido.

## [2026-07-19] Fix conectividad HelpDesk: 502 intermitente por stale keep-alive del HttpClient del JDK
**Problema:** el proxy Quarkus (`HelpdeskProxyResource`, `java.net.http.HttpClient` del JDK) fallaba intermitentemente con `HTTP/1.1 header parser received no bytes` → 502. Causa raíz (ver informe completo en el plan): el pool keep-alive del cliente (idle default ~1200 s) reutiliza conexiones HTTP/1.1 que el servidor/LB del HelpDesk ya cerró por idle (mucho menor) → al leer la respuesta encuentra 0 bytes. Intermitente porque solo pasa tras un bache de tráfico.
**Fix (sin migrar de cliente — el JDK HttpClient es adecuado para un proxy byte-a-byte):**
1. **`HttpRetry`** (`com.fitdesk.http`): reintenta 2× (backoff 100/200 ms) **solo** fallos de conexión transitorios y **solo** métodos idempotentes (GET/HEAD/OPTIONS/DELETE/PUT); **nunca** POST/PATCH (riesgo de doble ejecución) ni `HttpTimeoutException`. Usado por `HelpdeskProxyResource.forward` y `TicketSyncService.fetchPage`.
2. **`jdk.httpclient.keepalive.timeout=20`** (JVM arg en `run-neon.sh` y `Dockerfile.multistage`): el pool descarta conexiones ociosas >20 s → no reusa las que el HelpDesk ya cerró (protege también POST/PATCH). Valor conservador; afinable midiendo el idle real del HelpDesk.
3. **`.version(HTTP_1_1)`** explícito en ambos clientes: evita el intento H2 por ALPN y da pool/keep-alive predecible.
**Verificado local:** compila; backend arranca con la property activa; el proxy relaya sin auth (401 real, no 502) y autenticado (tickets cargan). El efecto en producción (desaparición de los 502 intermitentes) se confirma con el tiempo por ser intermitente. Requiere rebuild imagen + redeploy Render.

## [2026-07-19] Tickets/Board: "en board" abre modal, Mover en el modal, banner con asignado del API
- **"en board" → abre el modal de la tarea:** el deep-link del board (`focusCardFromRoute`) ahora, además de hacer scroll/resaltar, busca la story por id y llama `openDetail(story)` → abre CardDetailDialog (o ReunionDialog). Antes solo resaltaba.
- **Opción "Mover" en el modal de la tarea:** el campo "Estado" de CardDetailDialog pasó de solo-lectura a `mat-select` de columnas (gateado por `puedeMover` = dueño/asignado o MSC001/Supervisor, mismo criterio que el board). El `save()` ya tenía la lógica de mover (regla no-volver-a-ToDo, `canStartWork`, y sync del estado del ticket en el HelpDesk) — estaba latente porque el campo era read-only. Verificado con movimiento reversible net-zero (TA-035).
- **Banner de búsqueda muestra el asignado del API:** `ticketEnBoard` usaba el asignado de la tarea del board (`st.assignee`), que puede diferir del del ticket. Ahora usa `remoteResult().nombreAsignado` (el asignado del ticket en el API). Verificado: #33281 mostraba "MARIA SOL CONTRERAS" (board) y ahora "JUAN PABLO HUIRACOCHA PIEDRA" (API). Se omitió agregar el "responsable de equipo" (no hay dato único/limpio en el frontend: 3 Supervisor en el roster; el autoritativo requeriría endpoint de Asignaciones).

## [2026-07-19] Auto-guardado de conocimiento por hook (Stop)
- Se automatiza la convención "persistir conocimiento antes de cerrar el turno" con un hook **Stop** (`.claude/hooks/knowledge-reminder.py` + `.claude/settings.json`): si hay cambios de código sin registrar en las bitácoras, bloquea una vez y recuerda documentar. python3 (no hay jq), anti-loop por `stop_hook_active`, salida rápida para cambios triviales. Config de proyecto (commiteada) para que la convención sea durable y visible.

## [2026-07-19] Móvil: PWA bloqueada a vertical + scroll con `dvh` (fix "se traba el scroll" y "se rota sola")
**Síntomas reportados (móvil, board):** (1) al hacer scroll a veces "se traba" y no deja seguir bajando; (2) la pantalla "se rota a horizontal sola".
**Causa (1):** `.shell` (mat-sidenav-container) tenía `height: 100vh`. En móvil `100vh` NO descuenta la barra dinámica del navegador → el contenedor de scroll interno (`.content`) se extiende detrás de esa barra y el final del contenido queda inalcanzable (sensación de scroll trabado al fondo).
**Causa (2):** `manifest.webmanifest` con `"orientation": "any"` → la app instalada (PWA `standalone`) sigue la rotación física del teléfono; al inclinarlo se va a horizontal.
**Decisión / fix (100% frontend):**
1. `.shell`: `height: 100dvh` (con `100vh` de fallback) → el alto sigue la barra dinámica del navegador; el scroll llega al fondo.
2. `.content`: `overscroll-behavior: contain` + `-webkit-overflow-scrolling: touch` → sin "rebote y traba" al límite en iOS.
3. `manifest.webmanifest`: `"orientation": "portrait"` → la PWA instalada ya no rota a horizontal en ningún dispositivo. **Trade-off aceptado por la dueña:** en tablet el board queda en 1-2 columnas (no 4). Alcance: solo afecta a la PWA instalada en modo standalone (en pestaña de navegador la rotación depende del SO).
**Pendiente de despliegue:** requiere rebuild del front + redeploy a Pages. El cambio de `orientation` del manifest puede tardar en aplicarse en un dispositivo que ya tenía la PWA instalada (a veces hay que reinstalar/actualizar).

## [2026-07-19] UX (pedido de Juan Pablo): paginar vuelve al tope + ☰ persistente con el drawer abierto
**Pedidos del jefe:**
1. "La paginación debe dejarte al top de la página" — al paginar tocaba subir a mano (bug).
2. "El menú hamburguesa debe seguir disponible con el sidebar abierto para poder ocultarlo" — no debe desaparecer.
**Fix (100% frontend):**
1. **Scroll-to-top al paginar:** `ShellService` gana `registerContent(el)` + `scrollTop()`. El `Layout` registra su contenedor de scroll (`.content`, único scroll del shell) vía `viewChild('#contentEl')` en `afterNextRender`. `Tickets.onPage()` llama `shell.scrollTop()` (funciona igual para páginas del API y para "Sin asignar" recortado en cliente). Único paginador de la app = Tickets.
2. **☰ persistente:** en `over` mode el drawer abierto tapaba el ☰ de la topbar. Se agrega un botón ☰ DENTRO del drawer (`.drawer-brand`, solo cuando `!fixed()`) que hace `drawerOpen.set(false)` → cierra el sidebar. En escritorio (`side`, panel fijo) no aparece porque no aplica.
**Verificado:** `ng build` OK. Pendiente rebuild+redeploy a Pages.

## [2026-07-20] Tooltips: desactivar gestos táctiles (touchGestures:'off') para no bloquear el scroll en móvil
**Problema:** en móvil, el scroll no arrancaba cuando el dedo empezaba sobre la barra inferior de las tarjetas de ticket (asignado/bandera/pausa/"Ver"). Causa raíz confirmada: `MatTooltip` pone `touch-action:none` (inline) en el elemento del trigger en plataformas táctiles (ver docs/aprendizajes.md 2026-07-20).
**Decisión:** provider global en `app.config.ts` → `{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay:0, hideDelay:0, touchendHideDelay:1500, touchGestures:'off' } }`. Arregla Tickets y Board de una vez (mismo bug latente). Se descartó el parche CSS (`touch-action:auto !important`) y el por-elemento (`matTooltipTouchGestures="off"`) por ser más frágiles/verbosos.
**Alcance:** en móvil ya no hay tooltip por long-press (aceptado: íconos con aria-label). Escritorio (hover) sin cambios. Verificado: `ng build` OK; la comprobación end-to-end del gesto es en teléfono (comportamiento solo táctil). Pendiente rebuild+redeploy a Pages.

## [2026-07-20] Catálogo de estados: no cachear el vacío + reintento (fix "Catálogo no disponible")
**Problema:** "Cambiar estado" mostraba "Catálogo no disponible" de forma persistente porque `getTicketStatuses()` memoizaba un catálogo vacío tras un fallo transitorio (probable cold start de Render). Ver docs/aprendizajes.md 2026-07-20.
**Decisión:** en `HelpdeskService`, no memoizar resultados vacíos (liberar `statusesPromise` si el mapa vuelve vacío), reintentar la carga hasta 2 rondas (respiro 800 ms) y hacer que `Tickets.refresh()` reconsulte el catálogo si quedó vacío. Alternativas descartadas: semilla hardcodeada de estados (los IDs son necesarios para `statusIdOf`/cambio real y podrían quedar desfasados). Pendiente rebuild+redeploy a Pages.

## [2026-07-20] Compositor de mensajes: preview del adjunto imagen al clic (verificar antes de enviar)
**Pedido:** al cargar un adjunto tipo imagen en el compositor del ticket, hacer clic en el chip debía abrir un popup para verificar que es el archivo correcto.
**Solución (100% frontend, reusa infra existente):** el chip del compositor ya arma una miniatura (`previewUrl(f)`, object URL cacheado por File). Se envolvió miniatura+nombre (solo imágenes) en un `<button class="file-open">` que llama `openFilePreview(f)` → setea el `lightbox` (signal ya existente, usado para las imágenes de la conversación) con esa misma object URL. El ✕ de quitar queda separado. Cursor `zoom-in` + outline en hover como cue. Adjuntos no-imagen: sin cambios (no hay preview). `ng build` OK.

## [2026-07-20] Board: el asignado lo manda el TICKET (solo lectura), no el guardado en la tarea
**Pedido (TA-183):** una tarea del board con ticket mostraba un asignado (MSC001) distinto al del ticket en el HelpDesk (JPHP001). Regla de la dueña: "el board no debe guardar asignados, solo consulta el asignado del ticket asociado" → el TICKET es la fuente de verdad; el board solo lee.
**Solución (100% frontend, solo lectura — no persiste ni re-empuja):**
- `syncTicketStatuses()` captura el asignado vivo del ticket (`raw.assigned_user_id` = hid, `raw.assigned_person` = nombre) en `ticketAssigneeMap` (signal, como `ticketPrioMap`). Se registra siempre (aunque venga vacío) para poder mostrar "Sin asignar".
- `effAssignee(card)`: para tareas CON ticket ya sincronizado devuelve el asignado del ticket; si no, el guardado en la tarea (`card.assignee`). No escribe nada.
- Se usa `effAssignee` en: **display** (`assigneeView` → card, con fallback al nombre del ticket si el hid no está en el roster), **chips/opciones** del filtro de consultor, **filtros** "Asignados a mí"/"Mi equipo"/por-consultor (incluye las foráneas de `cardsSource`), y **permisos** `puedeOperar`/`canDrag` (el asignado efectivo es quien puede mover/certificar; MSC001/Supervisor siguen con override).
**Alcance decidido:** la dueña aprobó "mostrar Y filtrar"; se extendió también a permisos por coherencia (evita "se ve mío pero no puedo moverlo" y viceversa). El diálogo de detalle (asignación EXPLÍCITA que sí puede empujar al HelpDesk) queda igual. `ng build` OK; verificación end-to-end pendiente (requiere sesión).

## [2026-07-20] ⭐ REGLA DE ORO: toda ESCRITURA al API del HelpDesk es síncrona (await + confirmar)
**Regla (pedida por la dueña):** ninguna comunicación con el API del HelpDesk puede ser "asíncrona" en el sentido de *fire-and-forget*. Todo lo que se GUARDE hacia el API (asignar, reasignar, cambiar estado, enviar mensaje/adjunto, etc.) debe **esperar la respuesta y CONFIRMAR el éxito** antes de considerar la acción hecha o reflejarla en la UI.
**Qué implica (interpretación de ingeniería; NO es XHR bloqueante literal):**
- Siempre `await` la escritura y comprobar el resultado (ok/estado). Si falla, avisar al usuario y NO dejar la UI como si hubiera guardado.
- Prohibido el patrón optimista: actualizar el estado local / cerrar el diálogo ASUMIENDO éxito antes de que el API responda.
- Prohibido disparar la escritura sin `await` (p. ej. `this.hd.setTicketStatus(...)` suelto, o `.then()` sin manejar el fallo) cuando el resultado afecta lo que ve el usuario.
- Las LECTURAS pueden seguir siendo asíncronas normales; la regla es sobre GUARDAR (escrituras).
- El board sigue siendo SOLO LECTURA contra el HelpDesk salvo acción explícita; cuando esa acción explícita escribe, debe ser síncrona/confirmada.
**Pendiente:** auditar el código para detectar escrituras al HelpDesk que hoy sean fire-and-forget/optimistas y volverlas síncronas/confirmadas.

## [2026-07-22] El asignado de una tarea CON ticket se DERIVA del ticket (SoT = ticket_espejo), no se guarda en la tarea
**Contexto:** una tarea del board ligada a un ticket tenía DOS dueños posibles que divergían: `TAREA.asignado_a` (guardado, se quedaba viejo) y el asignado real del ticket (HelpDesk). Si el ticket se reasignaba en la vista Tickets (o afuera), el board mostraba/filtraba por el dueño viejo. La dueña pidió: *"si reasigno un ticket y la tarea ya está en el board, la tarea debe cambiar de dueño."*
**Decisión (opción B del análisis SoT):** la fuente de verdad del asignado es el TICKET. Su proyección local consultable es `ticket_espejo.asignado_hd` (ya sincronizada, igual que estado/prioridad/cliente). El read model deriva el dueño en vez de guardar una segunda copia.
- **Read model** (`LegacyReadResource.stories`): `assignee` = `t.ticketEspejo.asignadoHd` si la tarea tiene ticket (vía el FK `tarea→ticketEspejo`); si NO tiene ticket (reunión/local) = el `asignado_a` guardado. Si el ticket no tiene asignado, la tarea queda "sin asignar" (NO hereda el dueño viejo).
- **Write-through al reasignar** (regla de oro): `HelpdeskService.assignTicket` primero confirma la escritura al HelpDesk (await) y LUEGO refresca el asignado de ese ticket en el espejo (`PUT /api/legacy/ticket-espejo/{id}/assignee` → `TicketEspejoStore.upsertAssignee`) → el board queda correcto YA, sin esperar el sync completo. Ese segundo write (a NUESTRO backend, no al HelpDesk) es best-effort: si falla, el sync completo reconcilia.
- **Índice** (`V12__ticket_espejo_asignado_idx.sql`): `idx_ticket_espejo_asignado_hd` para filtrar/derivar por asignado.
**Alcance:** aplica al despliegue **cloud** (Pages→Render/Quarkus, `dataBackend:'quarkus'`). En modo Firebase (prod legacy) el write-through es no-op por la guarda; la prod legacy queda intacta. `TAREA.asignado_a` sigue siendo dueño SOLO de tareas sin ticket.
**Estado:** implementado; backend `mvn compile` OK y `ng build -c quarkus` OK. Verificación end-to-end pendiente de desplegar (Render + Pages) porque requiere el stack Quarkus+Neon corriendo. El fetch por-tarjeta del front (`effAssignee`/`ticketAssigneeMap`) se mantiene como capa extra de frescura; su eliminación (recomendada en el análisis) queda como optimización futura. Ver [[regla-oro-escrituras-helpdesk-sincronas]].

### Deploy + verificación (2026-07-22)
Desplegado: backend `zolmaria/fitdesk-backend:latest` (digest `sha256:ed036e17…`) a Render (V12 aplicada al arrancar); frontend `-c cloud` a Pages (gh-pages `7bcb42d`). Commit fuente `bc76df7`. **Verificado contra la API de prod:** las 158 tareas con ticket tienen `story.assignee` == `ticket_espejo.asignado_hd` (0 divergencias) → derivación viva; `PUT /api/legacy/ticket-espejo/{id}/assignee` responde 200 (prueba idempotente). **Pendiente de frescura:** el sync completo del espejo (`POST /api/admin/sync/tickets`) es MANUAL — el front NO lo dispara. Reasignaciones pasadas que no estén en el espejo se reflejan en tarjetas fuera del sprint activo solo tras correr ese sync (las del sprint activo ya se corrigen por el fetch en vivo del board).

## [2026-07-22] El estado "NO APLICA" entra al grupo TERMINAL (finalizado + solo lectura)
**Decisión (pedida por la dueña):** el estado `NO APLICA` del HelpDesk se trata igual que los cerrados: cuenta como **finalizado** y deja el ticket en **solo lectura** (no se puede responder ni asignar).
**Implementación:** una sola línea en la fuente única de verdad `core/helpdesk-estados.ts` → `esEstadoFinalizado()` ahora incluye `NO APLICA`. Como `esSoloLectura()` delega en ella, ambas condiciones salen del mismo cambio. Efectos automáticos, sin tocar nada más:
- Board: `statusFromTicketEstado` → columna **Done** con el check "Finalizado" marcado.
- Tickets: queda excluido de las listas de estados NO finalizados que van server-side (pestaña Equipo, Sin asignar, Pendientes).
- Conversación y card: `soloLectura` → sin responder ni asignar; cambiar de estado solo Responsable de Equipo/Admin.
- Badge: se agrupa con los CERRADO (mismo color) en `tickets-card-utils.estadoStyle`.
**Nota:** el match es por inclusión y en mayúsculas, así que tolera variantes del texto del catálogo.

## [2026-07-22] La prioridad del board se nombra y filtra por el ORDEN del HelpDesk (1 · 2-10 · >10)
**Decisión (pedida por la dueña):** el filtro de prioridad del board deja de decir "Alta/Media/Baja" y pasa a nombrar las bandas por su rango numérico real del ticket: **1** (máxima), **2-10** (media), **>10** (baja). Y el filtrado usa ese número, no el `alta/media/baja` guardado en la tarea.
**Implementación:**
- `prioBanda(orden)` en board-utils: 1 → alta, 2-10 → media, >10 → baja. Fuente única del corte.
- `PRIORITY_LABELS` = `{alta:'1', media:'2-10', baja:'>10'}`.
- `prioBadgeClase` ahora delega en `prioBanda`. **Corrige una incoherencia previa:** solo el `2` exacto se pintaba de "media", así que un orden 3-10 salía de color "baja" aunque cayera en la banda media.
- `board.prioBandaDe(card)`: banda efectiva = la del ORDEN del ticket si está sincronizado (el mismo número que se ve en la tarjeta); si no hay ticket (reunión/local) o no se ha sincronizado, la prioridad guardada de la tarea. El filtro compara contra esa banda.
**Alcance (corregido el mismo día a pedido de la dueña):** los números son SOLO el lenguaje del filtro. Las tarjetas de tareas **sin ticket** (reuniones/locales) siguen diciendo **Alta/Media/Baja** —no hay un orden numérico real detrás— igual que el selector del diálogo de detalle. Se separaron las etiquetas: `PRIORITY_LABELS` (cualitativa) y `PRIORITY_FILTER_LABELS` (1 · 2-10 · >10). El filtrado no cambia: comparten la misma clave `Priority`, así que una tarea 'Alta' sin ticket cae en la banda 1, 'Media' en 2-10 y 'Baja' en >10.

## [2026-07-24] Agente `ux-ui`: el criterio de diseño se codifica, no se repite cada sesión
**Decisión (pedida por la dueña):** el criterio UX/UI deja de vivir en prompts sueltos y pasa a un agente propio, `.claude/agents/ux-ui.md`, versionado con el repo (viaja con él, también a GitLab).
**Qué encapsula:** rol (SaaS/HelpDesk tipo Jira·Linear·ClickUp), la **identidad visual real** con los tokens del proyecto (`--brand #048abf` turquesa primario; naranja `--accent #f29e38` SOLO para alertas; light-only), los 10 principios de diseño (jerarquía, agrupación en secciones, informativo≠editable, terminología única, densidad, estados como chips, un mecanismo por dato, microcopy, acciones fijas al pie, accesibilidad con áreas ≥44px), las **decisiones ya tomadas** que no debe reabrir (menú con navegación primero, buscador único que deduce el tipo, filtros plegados con Ordenar fuera, bandas 1·2-10·>10, "Recordatorio", terminales en gris, nunca códigos de empleado), las **reglas no negociables** de la dueña (barra de acciones siempre visible; escrituras al HelpDesk síncronas) y las **trampas técnicas** ya pagadas (`minmax(0,1fr)` vs `1fr`, `flex-wrap` en filas de chips, estilos inline que ganan a las clases, `filter` como containing block, señales en zoneless).
**Por qué:** cada rediseño estaba re-explicando paleta, accesibilidad y trampas; y dos veces se repitió un bug ya resuelto. Codificarlo evita la regresión y hace el criterio auditable.
**Además:** el agente hereda la regla de oro del proyecto (verificar en Chrome con Playwright, móvil incluido) y añade "medir, no opinar" (A/B con `getBoundingClientRect`/`scrollWidth`) y el procedimiento para saltarse la caché de la PWA + el CDN de Pages.

### Encargo PENDIENTE para el agente `ux-ui`: rediseño del modal de tarea
`features/board/card-detail-dialog/`. Objetivos pedidos: jerarquía visual clara; agrupar en **Información general · Gestión · Trabajo realizado · Acciones**; separar lo informativo (N° de ticket, estado del HelpDesk) de lo editable; **unificar terminología** (hoy conviven "Estado del ticket" y "Estado (mover)", que confunden); reducir alto para minimizar scroll; prioridad como **chip con color e icono** (hoy es un `mat-select` de texto); **un único control de progreso** (hoy hay barra + campo numérico a la vez); microcopy y placeholders; y acciones fijas al pie con jerarquía consistente (Guardar/Crear · Cancelar · Eliminar destructiva y separada).

## [2026-07-24] Rediseño del modal de tarea: secciones, terminología y un solo control por dato
**Implementado** (encargo registrado el mismo día). Cambios y su porqué:
- **Encabezado informativo:** código de la tarea + chip `#ticket` + chip del **estado del HelpDesk** con su color, y el botón "Ver conversación". Antes esos datos se pintaban ENTRE los campos del formulario, como si fueran editables.
- **Terminología (la clave):** "Estado del ticket" y "Estado (mover)" NO eran duplicados, eran dos cosas distintas mal nombradas. El primero es el estado en el HelpDesk (informativo → ahora chip en el encabezado); el segundo es la **columna del board** (editable → ahora se llama **"Columna del board"**, que es lo que sus valores realmente son: To Do / En progreso / En certificación / Entregado).
- **Secciones:** *Información general* (título, cliente, N° ticket, descripción) · *Gestión* (asignado, prioridad, columna, fecha) · *Trabajo realizado* (progreso). Rejilla de 2 columnas donde cabe (`minmax(0,1fr)`), 1 en móvil → menos scroll.
- **Prioridad como chips** con icono + color, `role="radiogroup"` y flechas ←/→. El icono acompaña al color para no depender solo de éste. El naranja se usa en "media" y el rojo en "alta", coherente con reservar el naranja/rojo a lo urgente.
- **Progreso con UN mecanismo:** antes convivían `mat-progress-bar` **y** un `input[type=number]` para el mismo dato. Ahora un `<input type="range">` (step 5) teñido con `progBarColor()` y el % como lectura.
- **Pie fijo** (`position: sticky; bottom:0`) → cumple la regla de oro "la barra de acciones SIEMPRE visible". Jerarquía: Eliminar (texto, rojo, izquierda) · Enviar a otro equipo / Escalar (contorno) · Cancelar (texto) · **Guardar/Crear tarea** (relleno turquesa).
- **Microcopy:** placeholders con ejemplos reales del dominio y ayudas donde había duda (por qué "To Do" aparece deshabilitado → `salioDeTodo`; por qué el selector está bloqueado → `puedeMover`).
**No se tocó** la lógica de guardado, permisos (`puedeMover`, `editable`, `salioDeTodo`) ni los autocompletes. Se eliminaron `MatProgressBarModule` y `MatChipsModule`, ya sin uso.

## [2026-07-24] Board: enfoque por rol (Consultor/Especialista abren filtrado, NO restringido)
**Contexto:** la matriz de `12-roles-y-responsabilidades.md` ya dice que Consultor y Especialista ven **"sus tareas"** (plano operativo) y que el Especialista "no ve el equipo". El código no lo aplicaba: el toggle "Asignados a mí" existía pero arrancaba apagado, así que todos abrían el tablero completo.
**La dueña eligió ENFOQUE, no confidencialidad.** Diferencia deliberada:
- **Enfoque (lo implementado):** el board **abre filtrado** a "Asignados a mí" para Consultor/Especialista, para que no arranquen con el ruido del equipo. **Pueden quitar el filtro** y mirar el tablero completo. Se preserva el sentido Scrum del tablero (daily, bloqueos, WIP del sprint).
- **Confidencialidad (descartada):** habría que no entregarles siquiera los datos de otros. Se descartó porque rompe el board como artefacto de equipo.
**Implementación:** `auth.veTableroCompleto()` = ADMIN ∪ RESPONSABLE_EQUIPO ∪ GERENCIA ∪ (MSC001/Supervisor). El board, tras cargar los roles, hace `mineOnly.set(true)` si el usuario NO está en ese conjunto y **no ha tocado el filtro** (`mineTocado`) — la decisión manual del usuario siempre gana al default.
**Gerencia** se añadió explícitamente (`esGerencia`): su plano es global de solo lectura; dejarla fuera le habría quitado su razón de ser.
**Ver el completo ya es de hecho solo lectura:** `puedeOperar`/`canDrag` impiden mover/certificar tarjetas ajenas, así que quitar el filtro no otorga poder, solo visión.
**Límite honesto:** esto es una regla de **producto** (la UI hace cumplir el modelo), NO una barrera de seguridad: el backend sigue confiando en el header `X-Actor-Hid` y entrega todas las tareas. Sube a regla de seguridad cuando llegue la identidad por token.

## [2026-07-26] El sistema de diseño del modal de tarea se extiende al modal de reunión
**Contexto:** `features/board/reunion-dialog/` (crear/editar reuniones de capacitación/presentación) seguía con el patrón viejo: 8 campos apilados sin jerarquía, encabezado con icono genérico y pie de acciones sin fijar. Tras rediseñar el modal de tarea, la dueña pidió "aplica UX/UI aquí también".
**Decisión:** reutilizar el MISMO lenguaje visual del modal de tarea (card-detail) en vez de inventar otro, para que ambos modales se lean igual. Aplicado por Claude siguiendo el manual del agente `.claude/agents/ux-ui.md` (no se lanzó el subagente: el criterio ya está codificado y el contexto estaba cargado).
**Cambios (solo estructura/estilo; NO se tocó lógica de guardado, validaciones, permisos `puedeAsignarAOtros`, datepickers ni los buscadores de los selects):**
- **Encabezado** con icono de marca (`groups`) + título, informativo.
- **3 secciones** con título en mayúsculas pequeñas: *Detalle* (tipo + tema + link) · *Programación* (fecha/hora inicio-fin) · *Asignación* (responsable + cliente).
- **Tipo de reunión** (Capacitación/Presentación) como **segmentado de ancho completo** (dos mitades iguales), primero en "Detalle".
- **Pie fijo** (`position: sticky; bottom:0`, borde superior) → regla de oro. Jerarquía: Eliminar (rojo, izquierda) · spacer · Cancelar · **Crear/Guardar** (relleno turquesa). En móvil, Eliminar queda solo con icono (tooltip conserva el significado) y todo pasa a 1 columna.
- **Microcopy:** botón "Crear" al ser nueva y "Guardar" al editar; placeholders con ejemplos del dominio.
**Aprendizaje reutilizable:** el modal de tarea dejó de ser un caso puntual y es ahora la **plantilla** de los modales del board (encabezado + `.**-sec`/`.**-sec-title` + pie fijo). Los estilos se replican por-componente (encapsulación de Angular), pero el `.sel-search` del buscador interno de los selects es global (`src/styles.scss`).

## [2026-07-26] Modal de reunión v2: campos "tarjeta" según mockup de la dueña (reemplaza la v1 del mismo día)
**Contexto:** la dueña compartió un mockup detallado y pidió "básate en esto". La v1 (secciones DETALLE/PROGRAMACIÓN/ASIGNACIÓN con `mat-form-field` crudos) quedó **descartada** el mismo día a favor de un diseño más elaborado y legible.
**Decisión (diseño final):**
- **Campos tipo tarjeta** (`.rf-field`): borde redondeado (12px), label ARRIBA (con `*` de requerido) e icono guía a la izquierda en cuadro suave de marca. Se abandonan los `mat-form-field` con etiqueta flotante para Tema/Link/fechas/horas → inputs propios, control total del look.
- **Encabezado** con icono de marca + título + **subtítulo** ("Crea y agenda una capacitación o presentación.") + botón **X** de cierre.
- **Caja de Consejo** al pie del cuerpo (fondo azul suave, icono info) — microcopy de verificación previa a guardar.
- Botón primario **"Guardar reunión"** (con icono `event`), "Guardar cambios" al editar.
- Ya **no hay títulos de sección** (el mockup no los tiene; el agrupamiento lo da el espaciado entre tarjetas).
**Decisiones técnicas (trampas pagadas, ver aprendizajes):**
- **Segmentado propio** (dos `<button role="radio">`) en vez de `mat-button-toggle`: éste **colapsaba a altura 0** dentro del modal (theming MDC frágil). El propio da alto fijo + pastilla activa clara con texto de marca.
- **Responsable/Cliente como `mat-menu` con buscador** (disparador `.rf-trigger` = icono + valor + caret): reemplaza el `mat-select`, que exige `mat-form-field` y rompía la estética de tarjeta. El contenido proyectado del `mat-menu` conserva la encapsulación del componente, así que `.rf-menu-search` y `.rf-on` se estilizan desde el `.scss` del componente. Se agregaron los computed `assigneeLabel`/`clienteLabel` (nombre del seleccionado).
- **`matDatepicker` sobre input propio** (sin `mat-form-field`): funciona porque `provideNativeDateAdapter()` es global; el input es `readonly` y abre el calendario al click en la tarjeta.
- Se quitaron de los imports `MatFormFieldModule`, `MatInputModule`, `MatSelectModule`, `MatButtonToggleModule`; entraron `MatMenuModule` y `MatTooltipModule`.
**Verificado en Chrome (Playwright, MSC001) con datos reales:** escritorio 1200×920 y móvil 390×844 (1 columna). Funcional: el segmentado cambia; el menú de Responsable filtra ("cleira" → 2 resultados, menú NO se cierra al teclear) y al elegir refleja el nombre; el datepicker abre y liga la fecha ("15/7/2026"). Sin scroll horizontal visible (`overflow-x: hidden` en el cuerpo tapa un fantasma de ~8px).
**Estado:** vigente. Pendiente commit + deploy a Pages (frontend puro).

## [2026-07-26] Rediseño de la Bandeja: overview + páginas interiores (drill-down) por categoría
**Contexto:** la dueña dio mockups para la Bandeja de equipo. Se rediseñó siguiendo el sistema del agente `ux-ui`.
**Overview (`features/bandeja/bandeja`):** hero "Centro de gestión entre equipos" + 3 categorías (Transferencias entrantes azul · Solicitudes de Especialistas naranja · Trabajo de mi equipo verde) con estados vacíos e ilustración persona→persona, y caja de ayuda "¿Cómo funciona?". Transferencias y Trabajo de mi equipo dejan de expandir inline y **navegan** a su página interior; Solicitudes sigue expandiendo inline (aún sin mockup propio).
**Página interior de Transferencias (`transferencias-detalle`, ruta `/bandeja/transferencias`):** maestro-detalle (tabla + panel de detalle + actividad). Decisión clave **"solo datos reales"** (elegida por la dueña): pestañas Pendientes (`entrantes`) y Completadas (`aceptadas`) con datos y acciones; **Aceptadas/Rechazadas quedan vacías** ("historial aún no disponible") porque el backend no expone ese historial; **sin columna Prioridad** porque la transferencia no la guarda. Nada inventado. La actividad se arma con `creadoEn`/`resueltoEn` reales.
**Página interior de Trabajo de mi equipo (`trabajo-equipo`, ruta `/bandeja/trabajo-equipo`):** solo lectura, acento verde. Acción principal **"Ver ticket en Tickets"** → `SearchService.buscar('ticket', n)` + navega a `/tickets`. Para ello se añadió el **N° de ticket al DTO de transferencia** (backend `TransferenciaResource.describir`: `t.tarea.ticketEspejo.helpdeskTicketId`) y a la interfaz `Transferencia` del front. **Requiere redeploy del backend a Render** para que los enlaces traigan el ticket con datos reales.
**Corrección semántica importante:** el endpoint `/aceptadas` = "trabajo foráneo que lleva mi gente" (tareas que VINIERON de otros tableros y ahora lleva mi equipo), NO "mis tareas enviadas a otros". El copy del mockup ("Tareas de tu equipo que han sido transferidas a otros tableros") decía la dirección contraria; se usó copy preciso ("Tareas transferidas desde otros tableros que ahora lleva tu equipo") para no engañar.

### PENDIENTE (decisión de la dueña): solicitar transferencia de un ticket DESDE la vista Tickets
**Pedido:** que responsables de equipo y especialistas puedan pedir transferencia de un ticket desde Tickets; **el ticket NO necesita estar en el board** — la tarea se coloca en el board **al aceptarse** la transferencia.
**Bloqueo:** hoy `crearTransferencia`/`crearSolicitud` exigen una `Tarea` existente (`Tarea.findByCodigo` → "tarea inexistente"). Transferir un ticket sin tarea **requiere cambio de backend**: crear la Tarea desde el ticket en estado "pendiente/fuera del board" al crear la transferencia, y materializarla en el board destino al aceptar. No hay camino solo-frontend. Queda para una sesión enfocada (diseño de backend + estado de la tarea + UI en el menú ⋮ del ticket-card, gateado por rol).

### [2026-07-26] Página interior de Solicitudes de Especialistas (`/bandeja/solicitudes`)
Gemela de Transferencias, acento **naranja**, según mockup de la dueña. Maestro-detalle: pestañas **Pendientes** (con datos, `solicitudesEntrantes`) + **Aprobadas/Rechazadas** ("historial no disponible", sin endpoint); tabla SOLICITUD·SOLICITANTE·TIPO·FECHA·ESTADO (**sin Prioridad** — la solicitud no la guarda); panel de detalle con Rechazar/Aprobar; caja de ayuda al pie con los **dos tipos reales**. Corrección vs mockup: los tipos reales son **Reasignación** y **Transferencia** (no existe "Apoyo técnico"); no hay estado "Completada" para solicitudes (solo PENDIENTE/APROBADA/RECHAZADA). El overview ya NO expande ninguna categoría inline: las tres (Transferencias, Solicitudes, Trabajo de mi equipo) **navegan** a su página interior.

## [2026-07-26] Transferir un TICKET desde Tickets (tarea pendiente fuera del board) — IMPLEMENTADO (camino responsable)
**Decisión de la dueña:** un responsable de equipo puede enviar un ticket a otro equipo desde la vista Tickets **aunque el ticket no esté en el board**; la tarea se crea al PEDIR pero **nace oculta en el board del REMITENTE** (ej.: Quito envía a Cuenca → la tarea se crea en el board de Quito) y **aparece al aceptarse**; si se rechaza, se descarta.
**Backend (verificado E2E en local con Postgres):**
- **V13** (`tarea.pendiente_transferencia boolean default false` + índice parcial). Flyway la aplicó OK.
- `TransferenciaResource.crear`: si viene `ticket` (sin `tareaCodigo`), crea la `Tarea` OCULTA (`pendienteTransferencia=true`) en el board del equipo del actor (`equipoOrigenId` o el primero que gobierna), con código `TA-<max+1>`, enlazando/creando el `TicketEspejo`, título y cliente del ticket; luego la `Transferencia` PENDIENTE. Helpers `crearTareaOcultaDesdeTicket` + `nuevoCodigoTarea`.
- `LegacyReadResource.stories()`: excluye `pendienteTransferencia = false` → las ocultas no salen en ningún board.
- `aceptar`: además de asignar, pone `pendienteTransferencia=false` → la tarea aparece en el board.
- `rechazar`: si la tarea era pendiente (nació solo para esta transferencia), borra tarea + transferencia (`{ok:true,descartada:true}`); si no, comportamiento clásico (marca RECHAZADA).
- Smoke test local: Quito→Cuenca crea TA oculta en board de Quito (board_id 2), NO sale en /stories; aceptar la hace visible asignada; rechazar la descarta (0 tareas ocultas, 0 transferencia).
**Frontend (compila; falta verificación visual en deploy):**
- `crearTransferencia` del servicio acepta `{ticket, titulo, clienteCodigo, equipoOrigenId}` además de `tareaCodigo`.
- `EnviarEquipoDialog` soporta ambos caminos (hint distinto para ticket).
- `ticket-card`: ítem "Enviar a otro equipo" en el menú ⋮, gateado por `puedeTransferirTicket` (Quarkus + `puedeTransferir`).
- `tickets.transferirTicket(t)`: si el ticket ya tiene tarea en el board transfiere esa (camino clásico); si no, abre el diálogo con el ticket (camino nuevo).
**PENDIENTE:**
- **Camino ESPECIALISTA** (escalar/solicitud desde un ticket sin tarea): requiere el mismo tratamiento en `crearSolicitud` + aprobar. No implementado aún.
- **Deploy del backend a Render** para que funcione en prod (Docker no corría en la sesión).
- **NUEVO pedido de la dueña (no empezado):** botón en las tarjetas del BOARD para **enviar un recordatorio al responsable del equipo que desarrolla la tarea** (recordar que está pendiente de resolución).

### [2026-07-26] Camino ESPECIALISTA de la transferencia-desde-ticket — IMPLEMENTADO
Completa el pedido "también para especialistas". El especialista escala un ticket sin tarea desde Tickets (menú ⋮ "Escalar al Responsable"): se crea la tarea OCULTA en el board de SU equipo (resuelto por su Asignación de alcance EQUIPO), asignada a él, y una `Solicitud` PENDIENTE (REASIGNACION o TRANSFERENCIA). Al **aprobar**: REASIGNACION → asigna + `pendienteTransferencia=false` (aparece en el board); TRANSFERENCIA → crea la `Transferencia` PENDIENTE (la tarea sigue oculta hasta que el destino acepte). Al **rechazar** una solicitud nacida de ticket → descarta tarea + solicitud (`{ok:true,descartada:true}`).
- Backend: `SolicitudResource.crear/aprobar/rechazar` extendidos; reutiliza `TransferenciaResource.crearTareaOcultaDesdeTicket` (ahora `static`). Verificado E2E en local: escalar→oculta (no en /stories)→aprobar REASIGNACION→aparece asignada a la sugerida; rechazar→descartada.
- Frontend: `crearSolicitud` acepta `{ticket,titulo,clienteCodigo}`; `EscalarDialog` soporta el camino ticket; `ticket-card` añade "Escalar al Responsable" (menú ⋮, gateado por `esEspecialista`); `tickets.escalarTicket` elige tarea-existente vs ticket.
**Ambos caminos (responsable + especialista) quedan implementados y verificados E2E en local. Pendiente: deploy backend a Render; botón "recordatorio" en el board.**

## [2026-07-27] Mensajes entre equipos sobre tickets (Bandeja "Mensajes del origen") — IMPLEMENTADO
**Pedido de la dueña:** poder enviar mensajes ENTRE equipos sobre los tickets (empezó como "recordatorio" pero se renombró a **mensaje**: es comunicación, no un aviso unidireccional). Un Responsable de Equipo escribe al RE del equipo que desarrolla la tarea (p. ej. "el cliente pregunta por el avance, sigue pendiente"); el destinatario lo ve en su Bandeja bajo **"Mensajes del origen"**.
**Backend (V14 + verificado E2E en local):**
- Entidad `Mensaje` (tabla `mensaje`): tarea, de (Usuario RE), texto, visto, fechas. Destinatario NO se guarda: se deriva por gobierno del equipo de la tarea (como transferencias/solicitudes entrantes).
- `MensajeResource` (`/api/mensajes`): POST crear (gateado a RE/ADMIN), GET `/entrantes` (no vistos, de tareas de mis equipos), POST `/{id}/visto`.
- Verificado: RE Quito escribe sobre tarea de Cuenca → RE Cuenca lo ve → marca visto (desaparece); un consultor recibe 403.
**Frontend:**
- Servicio `crearMensaje/mensajesEntrantes/marcarMensajeVisto`.
- `MensajeDialog` (mensaje obligatorio) abierto desde el modal de tarea (menú ⋮ "Mensaje al equipo", `puedeMensaje` = Quarkus + RE/admin).
- Bandeja: sección **"Mensajes del origen"** (solo si hay) con tarjetas {tarea/#ticket, de, mensaje} + botón "Visto".
**Nota:** MVP unidireccional (origen → equipo que desarrolla). Un hilo bidireccional (respuestas) quedaría para después.

## [2026-07-27] Deploy en producción de todo el lote (transferir/escalar ticket + mensajes)
Desplegado y verificado en prod:
- **Frontend** → GitHub Pages (deploy commit `ec0f8bf`).
- **Backend** → imagen `zolmaria/fitdesk-backend:latest` (digest `53ee45f`) construida `linux/amd64` y subida a Docker Hub; Render **Manual Deploy** por la dueña → live. Flyway aplicó **V13 + V14** a Neon al arrancar (aditivas, sin downtime de datos).
- Verificación en prod: `/api/mensajes/entrantes` → 200; `/api/transferencias` con validación nueva; y ciclo E2E del mensaje (enviar→entrantes→visto) OK contra la base real.
Código en `main` hasta `5eccf80` (+ esta nota). Pendiente futuro: hilo bidireccional de mensajes (respuestas); verificación visual con Playwright de los menús de Tickets.

## [2026-07-27] Rediseño UX/UI de Administración (según mockups de la dueña)
Las 4 pestañas con el sistema de diseño de la app: header con icono de marca + subtítulo + "Recargar" pastilla; pestañas con icono; layout de 2 columnas (tabla-en-tarjeta + panel lateral).
- **Regionales/Equipos/Clientes:** buscador con anillo de foco + filtro Activos/Inactivos/Todos, tabla en tarjeta (cabeceras en mayúsculas, badge Sí/No, iconos editar/eliminar), contador "Mostrando N de M", y **panel de ayuda** a la derecha (Sobre X + ítems + "Importante").
- **Asignaciones:** fila de **stats** derivadas del dato real (vigentes/temporales/globales/por equipos/próximas a vencer), buscador + filtros Rol/Alcance/Estado + Limpiar, tabla con avatar + badge de rol a color + alcance + vigencia + estado, y **maestro-detalle**: panel lateral con el detalle de la fila seleccionada (Rol/Alcance/Objetivo/Desde/Hasta) + Editar/Quitar.
- **Solo datos reales** (decisión de la dueña): se OMITIERON los campos del mockup que no existen en el modelo (`Asignada por`, `Descripción`, `Historial de cambios`, `Equipos involucrados`) y el email (se usa avatar de iniciales). "Finalizar asignación" se mapeó a Editar/Quitar (las acciones reales). Sin paginación por ahora (listas chicas); solo contador.
- Verificado en Chrome (Playwright): Regionales ≈ mockup 1, Asignaciones ≈ mockup 2, tabla de asignaciones sin scroll horizontal (se quitó la columna chevron redundante y se compactó).

- **[2026-07-27]** El badge de la Bandeja pasó a **círculo rojo en la esquina del icono** (estilo campana de notificaciones), con "9+" si supera 9. Antes era una pastilla naranja al final de la fila.

- **[2026-07-27]** Fix: el badge de la Bandeja se recortaba porque su contenedor (`.nav-ic-wrap`, un `<span>`) heredaba `overflow: hidden` de la regla `.nav-item span` (el ellipsis del texto). Se le puso `overflow: visible`.

## [2026-08-03] Publicación en GitLab corporativo: 2 repos + un agente por repo (sin orquestador)
Se subió el código al GitLab de fit-bank en **dos repos** de `servicios`: **`fit-desk`** (frontend Angular, contenido de `app/` limpiado del FastAPI huérfano) y **`fit-desk-api`** (backend Quarkus, `backend/`). **Importación limpia** (un commit inicial; no se trasladó el historial mezclado del monorepo). Autenticación por **Personal Access Token** de `mscontreras` (rol Maintainer, requerido para crear la rama por defecto). El monorepo local y GitHub Pages quedan intactos (solo se *agregó* a GitLab).
- **Decisión de la dueña (Fase 2):** cada repo lleva **su propio agente especialista** (`.claude/agents/fit-desk-front.md` y `fit-desk-api.md`) + `CLAUDE.md`, **sin** un tercer repo "orquestador". La coordinación front⇄back es un **contrato de API** (`docs/contrato-api.md`) **idéntico en ambos repos**; regla: quien cambie la API actualiza el contrato en los dos y ajusta el otro lado. Estos agentes NO son un servicio 24/7: los ejecuta una persona con Claude Code en cada repo.
- **Pendiente futuro:** habilitar OpenAPI en el backend (`quarkus-smallrye-openapi` → `/q/openapi`) para generar/validar el contrato desde el código. GitLab en `servicios/fit-desk` (`9ab4367`) y `servicios/fit-desk-api` (`df302f3`); paridad en el monorepo (`f9a5758`).

## [2026-08-03] Nueva sección "Vacaciones" (calendario por equipo + nacional)
Sección para planificar/ver vacaciones y permisos, con el mismo esquema de calendario mensual que HelpDesk Semanal, pero **multi-empleado** (cada día puede tener varios; rangos de fechas por persona, chips de color por empleado). Vistas **Por equipo** y **Nacional**; **todos** ven ambas (decisión de la dueña). **Registran/editan:** cada empleado LAS SUYAS, el Responsable de Equipo las de su(s) equipo(s), el ADMIN cualquiera (autorización backend por `X-Actor-Hid`/`Actor`; el frontend limita el selector de empleado por rol y trae **buscador** en el LOV).
- **Backend:** entidad `Vacacion` + `VacacionResource` (`/api/vacaciones` GET/POST/PUT/DELETE) + migración **V15**. Lectura abierta a cualquier actor logueado; escritura gateada. `diasVacacion = round(diasLaborables × 1,36)` (factor de la empresa). Fecha fin = inicio + (diasVacacion−1) días de calendario (ej. 5 laborables → 7 días → lun–dom).
- **Sin "saldo" en la app:** no se guarda fecha de ingreso ni acumulado; el saldo lo lleva la unidad administrativa en el **formato** descargable (`formato-solicitud-vacaciones.xlsx` en `public/`, 2 hojas: Vacaciones y Permiso). La app solo aplica el factor 1,36 (calculadora) y muestra los 11 **lineamientos** + pasos (placeholder hasta que la dueña pase el texto oficial).
- **Verificado** E2E con Playwright (backend local + Neon vía V15): registrar/editar/eliminar, cálculo, buscador de empleado, Por equipo/Nacional, descarga (200), móvil sin desborde; autorización 403 para ajeno. Front en Pages `6baabd5`, imagen backend subida (falta Manual Deploy en Render para aplicar V15 a prod). Contrato de API actualizado en ambos `docs/`. Commit `0a0706b`.
- **Nota de proceso:** durante la verificación local con `ng serve -c quarkus`, el submit del formulario de login no disparaba la petición en el dev-serve (backend/endpoints OK por curl); se inyectó una sesión válida en localStorage para probar la feature. No afecta prod (login funciona en `-c cloud`). Revisar si reaparece.

## [2026-08-04] Eliminar SPRINTS: un tablero continuo (Kanban) por equipo
**Decisión de la dueña:** el equipo **no usa sprints** (no manejan objetivos ni etapas), así que la capa de sprint solo añadía complejidad. Se pasa a un **tablero continuo tipo Kanban, uno por equipo**, donde las tareas viven directo en las columnas (que son el **estado/WorkflowEstado** de la tarea: To Do / En progreso / En certificación / Entregado), sin agruparse en sprints.
- **Cambio 100% FRONTEND, sin migración ni redeploy de Render.** Es seguro porque los dos ejes eran ortogonales: `board` (tablero por equipo, que usan transferencias/Bandeja/vistas) se **conserva**; `sprint` (agrupación temporal encima) se **elimina**. En backend `tarea.sprint_id` ya era NULLABLE, `/api/legacy/stories` no filtra por sprint y su DTO tolera sprint null. Las tareas existentes conservan su `sprint` en Neon (ignorado); las nuevas nacen sin sprint.
- **Frontend:** en `DataService` se borró la interfaz/`signal` `Sprint`, los métodos de sprint y `getStoriesBySprint` → nuevo **`getStoriesByBoard()`** (filtra solo por `currentBoard`); `addStory` ya no setea `sprint`. En `board.ts/.html/.scss` se quitó la **barra de sprint** (selector "Sprint", botones editar/nuevo, `.sprint-banner`) y `visibleStories` filtra **solo por tablero**; se **conserva** el selector **Equipo/Tablero** (clase renombrada `sprint-*`→`board-*`). `focusCardFromRoute`/deep-link de Tickets ya no llevan `sprint`.
- **`syncTicketStatuses` (fix de carrera 500):** antes escribía **un PATCH por campo** a la misma tarea de forma concurrente (cliente, nombre, estado, status…); el backend hace read-modify-write y dos PATCH simultáneos a la misma fila se pisaban → **500 + update perdido** (visto en vivo: `{client}`→500, `{clientName}`→200 para TA-127). Ahora **coalesce todos los cambios de una tarea en UN solo PATCH** (`DataService.patchStory`). Era latente con el sprint activo; con el tablero continuo se sincronizan TODAS las tareas del equipo, así que era clave. (Alineado con la regla de oro de escrituras.)
- **Se eliminaron 3 features huérfanas** (ceremonias Scrum ya sin ítem de nav, solo alcanzables por URL): **Burndown**, **Progreso** y **Consultas** (rutas + carpetas). Progreso/Consultas se habían quitado del nav antes; la dueña lo confirmó en esta sesión ("el tema de progreso lo habíamos quitado").
- **Vestigial (limpieza opcional futura):** `Sprint.java`, `tarea.sprint_id`, endpoints `/api/legacy/sprints`, el `SP-01` de `crearBoardInicial` — quedan sin uso. Una V17 podría hacer `DROP` de la columna/tabla DESPUÉS de quitar la entidad Java.
- **Verificado** con Playwright (`-c cloud` contra Render, puerto 4200): el Board ya no muestra selector/banner de Sprint; tareas directo en las 4 columnas (To Do 18 · En progreso 27 · En certificación 27 · Entregado 29); selector Equipo/Tablero intacto; `/burndown` redirige; móvil 390×844 sin desborde horizontal; consola sin errores tras el fix de coalescing. Build `ng build -c cloud` limpio. Desplegado a Pages (gh-pages `93ae9d5`).

## [2026-08-04] Fix duplicados en el Board: una tarjeta por ticket (blindaje frontend)
Tras eliminar sprints, un ticket aparecía **dos veces** en el tablero (reportado: kvazquez movió una tarea de #29309 y "se duplicó"). **Diagnóstico (datos reales de Neon):** NO lo causa el mover — hay **4 tickets con DOS tareas-espejo cada uno** en la BD (clones): `29309`→TA-002+TA-196, `33125`→TA-111+TA-115, `33296`→TA-187+TA-190, `33433`→TA-219+TA-221. Son clones casi idénticos (mismo título/asignado/cliente/estado) y **sin datos enlazados** (0 refs en hdNotes/hdActions/progress/queries/solNotes). Origen: re-materialización del ticket **por sprint** (importaba una tarea nueva por sprint si no encontraba la del sprint activo) — causa **ya extinta** sin sprints. 3 de los 4 pares tenían ambas en SP-04 → ya salían dobles antes; quitar sprints solo **expuso** el par de 29309 (una copia sin sprint estaba oculta). (El #33450 que mencionó la dueña en realidad tiene UNA sola tarea, TA-227, board PRUEBA.)
- **Fix (frontend, no destructivo):** `board.ts` `visibleStories` **colapsa a UNA tarjeta por ticket** (conserva la de id más bajo = la original; las tareas SIN ticket no se colapsan). Resuelve los 4 pares y cualquier duplicado futuro. Verificado: 29309/33125/33433 → 1 tarjeta; 33296 → 0 (done+aprobado fuera del cutoff de 2 días). Build limpio, consola sin errores. Desplegado a Pages (gh-pages `0f7541d`, `main-KQIUQTB5.js` live).
- **Pendiente (opcional, decisión de la dueña):** limpiar en la BD los 4 registros clon (TA-196/TA-115/TA-190/TA-221) para dejar el dato consistente. **La dueña decidió NO borrar** (se quedan; el blindaje los oculta).

## [2026-08-04] Borrar tareas: SOLO Responsable de Equipo (cerrar fuga de permiso)
**Incidente:** una tarea SIN ticket (cliente Girón, asignada a kvazquez, creada esa mañana = **TA-224**) desapareció. **Diagnóstico:** TA-224 fue **borrada en duro** (hueco en la secuencia de ids; 0 rastro en stories/hdNotes/hdActions/progress/queries/solNotes/transferencias — irrecuperable salvo Point-in-Time de Neon). El **mover no la borró**: el drag&drop solo hace `updateStoryStatus` (un PATCH); no hay `effect`, `deleteStory`, `addStory` ni upsert en esa ruta. Lo que la dueña vio como "se duplicó y se borró al mover" son **dos cosas distintas**: (1) el duplicado de #29309 = dato preexistente expuesto al quitar sprints (ya resuelto por el blindaje anterior); (2) el borrado de TA-224 = acción real de borrado.
- **Causa raíz del borrado:** el botón **Eliminar del modal de detalle** (`card-detail-dialog`) tenía `puedeEliminar = !isNew && !ticket` **sin ningún control de rol**. Así, cualquiera que abriera su propia tarea sin ticket (p. ej. kvazquez, cuyo rol de plataforma real es **CONSULTOR** / soporte en HD) veía "Eliminar" y podía borrarla (escribiendo "BORRAR"). La × de la tarjeta sí estaba gateada, pero por `puedeGestionarTodo` (= MSC001 o **SUPERVISOR del HelpDesk**), que **no** es el rol de plataforma correcto.
- **Fix:** nuevo `AuthService.puedeEliminarTarea = esAdminPlataforma() || esResponsableEquipo()` (**rol de PLATAFORMA**, no el del HelpDesk). Se gatearon **todas** las vías de borrado de tareas: la × de la tarjeta (`board.html`, antes `puedeGestionarTodo`), el modal de detalle (`card-detail-dialog.puedeEliminar` + guarda en `remove()`), y el modal de reunión (`reunion-dialog`, que no tenía guarda ni confirmación). La confirmación con palabra "BORRAR" se conserva. `deleteCard`/`clearBoard` (× board / Borrar Board) también con guarda en profundidad.
- **Verificado** con Playwright (`-c cloud`, datos reales): **MSC001 (admin)** conserva borrar (25 botones ×; modal con "Eliminar"). **KVAZQUEZ** (rol plataforma = CONSULTOR) → **0 botones de borrar** en el tablero y el modal de su tarea sin ticket (TA-035) **sin** "Eliminar". Build limpio. Desplegado a Pages (gh-pages `2df19de`, `main-IEKXYXAF.js` live).
- **Nota:** TA-224 no se puede recuperar por la app (borrado en duro, sin papelera). Única vía: branch Point-in-Time en Neon anterior al borrado.

## [2026-08-04] Diseño del sistema de medición de productividad por complejidad (PARQUEADO)
Se **diseñó** (no se implementó) un sistema para medir la **productividad del consultor por complejidad**
de ticket, **no por volumen**. **Estado: parqueado, pendiente de análisis con el equipo.** Diseño completo
en [knowledge/14-medicion-productividad.md](knowledge/14-medicion-productividad.md); versión imprimible
(privada): https://claude.ai/code/artifact/fbbd25a5-7ad0-4503-8095-c7dc9e0a9c37
- **Modelo (decidido con la dueña):** unidad puntuable = la **tarea**; **rúbrica por factores** (impacto,
  riesgo técnico, esfuerzo, alcance) que **propone el consultor y aprueba el RE** (versionada = "el puntaje
  puede variar"); **métrica central = puntaje de calidad ponderado** (complejidad cerrada, penalizada por
  devoluciones, ajustada por tiempo de ciclo); **volumen = secundario**.
- **Estados:** la **entrega no cierra**; consolida **APROBADO** (= instalado en producción) o **CERRADO
  POR EL CLIENTE**; **NO APLICA** anula; cada **devolución resta** `C×p_dev` de lo acumulado (persiste).
- **Subtareas:** un ticket se divide en subtareas independientes; board = tarjeta principal + una por
  subtarea; mover una subtarea **no** afecta el estado del ticket; la **devolución penaliza solo al dueño**;
  subtareas y tareas sin ticket **cierran al marcarlas "finalizado", solo el RE**. El **"apoyo" se modela
  como subtarea** (sin entidad aparte).
- **Cimiento técnico requerido (fase futura):** **no hay historial de estados** hoy → una **bitácora de
  eventos** (capturada desde el sync + board) es la columna vertebral para fechas, devoluciones y cierre.
  El blindaje anti-duplicados del board deberá **eximir subtareas**. Reporte mensual + rango; export CSV +
  imprimible. Hoja de ruta por fases (datos → subtareas → rúbrica → reporte) en el doc 14. **Parámetros
  abiertos** por confirmar con el equipo (pesos, `p_dev`, ciclo como modificador vs KPI, estado de
  devolución, "cerrado por falta de respuesta").

## [2026-08-04] Borrado de tareas: ENFORCEMENT en el BACKEND (el fix de frontend no bastaba)
**Reincidencia:** kvazquez volvió a perder una tarea sin ticket que había puesto en certificación
(**TA-230**, hueco nuevo en la secuencia = creada y borrada en duro; irrecuperable salvo Point-in-Time
de Neon, como TA-224). **Causa raíz:** el fix del 4-ago fue **solo de frontend** (ocultar el botón), pero
el endpoint `DELETE /api/legacy/stories/stories/{id}` (`LegacyWriteResource`) **no validaba NADA** —ni
actor, ni rol, ni ticket—: `write.deleteStory(id)` borraba lo que le pidieran. Un **bundle viejo en la
caché PWA** de kvazquez (con el modal de borrado aún sin gate) seguía llamando ese endpoint y borrando.
- **Fix (backend, la capa correcta):** `LegacyWriteService.deleteStory(id, actorHid)` ahora autoriza
  **server-side** con el header `X-Actor-Hid` que el front YA envía (`data.service.actorHeaders`): solo
  **ADMIN** (`Actor.esAdmin`) o el **Responsable de Equipo del board** (`Actor.gobierna(hid, board.equipo.id)`)
  pueden borrar; y **nunca** una tarea con ticket (`ticketEspejo != null`). Devuelve enum→HTTP:
  204 OK · 404 no existe · **403** sin permiso · **409** tiene ticket (`LegacyWriteResource.deleteStory`).
  Así **ningún cliente viejo/cacheado puede borrar** (envía `X-Actor-Hid: KVAZQUEZ` = CONSULTOR → 403).
- **Compila** (`./mvnw compile` = BUILD SUCCESS). **Pendiente de deploy:** rebuild de la imagen
  `zolmaria/fitdesk-backend:latest` (linux/amd64) + push + **Manual Deploy en Render** por la dueña.
  (No hubo migración; solo código.)
- **Aprendizaje:** las reglas destructivas deben imponerse en el **backend**, no solo en la UI — el gate
  de frontend es UX, no seguridad; una PWA cacheada conserva el bundle viejo. Efecto colateral benigno en
  bundles viejos: el borrado optimista local hace "desaparecer" la tarjeta hasta recargar, pero el backend
  la conserva (403). Recomendado además: kvazquez hace hard-refresh para tomar el bundle con la UI corregida.

## [2026-08-04] Crear tarea con GUARDADO CONFIRMADO (no fire-and-forget) — fix del "TA-230 fantasma"
**Segundo incidente (distinto del borrado):** kvazquez creó una tarea sin ticket **justo antes de salir**
y al día siguiente no estaba (hueco TA-230). **No la borró nadie** (la dueña confirmó) y **no hay proceso
automático** que borre tareas (verificado: sin `@Scheduled`/cron; el único borrado del server es el endpoint
manual). **Causa raíz:** `DataService.addStory` agregaba la tarjeta al tablero de forma **optimista** y
persistía en **2º plano (`fbPatch`, fire-and-forget, sin await)**; si la app/laptop se cerraba enseguida, ese
guardado se cortaba y la tarea **nunca llegaba a la BD** (violaba la regla de oro "await+confirmar"). El id
`TA-NNN` lo calcula el cliente (max+1), lo que explica el hueco.
- **Fix (frontend, desplegado):** `addStory` es **async** y usa `fbPatchAwait` (PATCH esperado): la tarjeta
  se agrega al tablero **solo si el backend confirma** el guardado; si falla, **lanza** y el modal
  (`card-detail-dialog` / `reunion-dialog`) **avisa y queda abierto** sin perder lo escrito. Verificado E2E
  con Playwright (`-c cloud`): crear → el modal cierra **solo tras confirmar** → la tarea existe en la BD
  (TA-233, luego borrada en limpieza). Desplegado a Pages (gh-pages `6216391`, `main-GRCNH5YS.js` live).
- **ID asignado por el BACKEND (implementado):** el id `TA-NNN` lo calculaba el navegador (max+1 de SU
  vista); una vista **desactualizada** podía elegir un id que ya existía y **pisar** la tarea de otro. Se
  agregó **`POST /api/legacy/stories/stories`** (`LegacyWriteService.createStory` + `nextTareaCodigo` = max
  REAL de la BD, `persistAndFlush` + reintento ante choque UNIQUE por concurrencia). El front hace **POST**
  y usa el id devuelto; con **fallback** al PATCH-confirmado si el backend aún no tiene el endpoint (405)
  → deploy desacoplado. Verificado el fallback contra prod (POST=405 → PATCH → tarea persiste, TA-233,
  limpiada). Contrato actualizado. **Frontend desplegado** a Pages (`main-3M4DRHRH.js`, `c7b6dfa`);
  **backend pendiente de deploy** (Docker + Manual Deploy Render) — al desplegar, la creación pasa a id-servidor.
- **Aprendizaje:** la regla de oro "escrituras await+confirmar, nada de fire-and-forget" **también aplica a
  la creación de tareas** (guardado propio), no solo al HelpDesk. Optimista + fire-and-forget = tarjeta
  fantasma que se pierde al cerrar la app. Y el **id lo debe asignar el servidor**, no el cliente.

## [2026-08-07] Vacaciones: reporte por rango de fechas (CSV + imprimible)
Nueva función en la sección **Vacaciones**: botón **"Reporte"** que abre un diálogo
(`vacaciones/reporte-dialog/`) para generar un reporte de vacaciones/permisos en un **rango de fechas**.
- **100% frontend** (sin backend): los datos ya vienen de `VacacionesService.listar()`; el diálogo
  filtra por **solape con el rango** + **alcance** (Nacional / equipo, arranca con la vista actual) +
  **tipo** (Todas / Vacaciones / Permisos). Muestra tabla de períodos (empleado, equipo, tipo, desde,
  hasta, días laborables, días, estado) + **resumen** (períodos, empleados, días de vacaciones, días de
  permiso). Exporta **CSV** (con BOM para Excel) e **Imprimir/PDF** (ventana nueva con HTML propio →
  `window.print`). Disponible para todos (lectura). Pie de acciones fijo (regla de oro).
- Verificado con Playwright contra prod: Nacional = 6 períodos/101 días, filtro por equipo = 3/42, tabla
  con datos reales y formato dd/mmm/aaaa. Ajuste de UI: se agregó **padding al diálogo** (el contenedor
  MDC no trae padding propio y el contenido quedaba pegado al borde). Desplegado a Pages (`main-4ZTCKKOH.js`, `59c2907`).
- **Mejoras (mismo día, pedido de la dueña) — `main-JQQMIQ2W.js` / `a5b79c8`:** (1) la **tabla ordena por
  fecha de inicio DESC**; (2) nueva **hoja "Calendario"** (segmentado Tabla/Calendario) que pinta las
  vacaciones del **mes actual a fin de año** (mini-calendarios por mes, puntos de color por empleado,
  leyenda, respeta alcance+tipo); (3) **se quitó Imprimir**: ahora **CSV** y **PDF** son botones
  independientes y el **PDF se genera como archivo** (jsPDF + jspdf-autotable, cargados por **import
  dinámico** para no engordar el bundle; el warning de `html2canvas` no-ESM es inofensivo). Verificado con
  Playwright: orden desc, calendario 5 meses/50 días pintados, PDF descargado válido (23 KB, `%PDF-`).
- **Correcciones (mismo día) — `main-B46PJ5QN.js` / `effcf3a`:** el orden de la tabla vuelve a
  **ASCENDENTE** por fecha de inicio (la dueña se había equivocado al pedir desc); y el **PDF ahora
  incluye una página con el CALENDARIO pintado** (mini-calendarios mes actual→fin de año dibujados con
  `jsPDF` —rects + círculos de color por empleado— reusando `meses()`/`leyendaCal()`). Verificado:
  orden asc (27/jul→16/nov), PDF de 5 páginas/130 KB con "Calendario de vacaciones" + meses.

## [2026-08-11] Vacaciones: editar más visible (fila del día clickeable)
El editar/eliminar de una vacación **ya existía** (lápiz en el panel del día, gateado por `puedeEditar` =
admin ∪ dueño ∪ responsable), pero era **poco descubrible** (había que clicar el día exacto y hallar un
lápiz pequeño). Cambio de UX: en el panel "Día seleccionado", **toda la fila es ahora un botón** que abre
el diálogo de editar/eliminar (`vac-dayrow-edit`, con hover/foco; el lápiz queda como pista al final). Las
filas no editables (sin permiso) siguen como texto. Verificado con Playwright (MSC001): clic en día →
clic en la fila → "Editar vacaciones" con Guardar/Eliminar. Desplegado a Pages (`main-JPVJHK6U.js`, `ed255b1`).

## [2026-08-13] Refresco inmediato del Board al cambiar estado/asignación (pulso → reconciliación viva)
**Problema (dueña):** cambiar el **estado** o la **asignación/reasignación** de un ticket desde el modal de
conversación (`ticket-messages-dialog`), el card-detail o Tickets *"se escribe perfecto en el API pero el
Board no se refresca al instante"* — la card no salta de columna ni muestra el nuevo asignado hasta salir y
volver al tablero.

**Causa raíz:** todas las escrituras pasan por `HelpdeskService.setTicketStatus()` / `assignTicket()`, que
ya parchan `hd.tickets` (por eso **Tickets sí** se auto-refresca) y el espejo, **pero no notificaban al
Board**. El Board deriva sus tarjetas de `data.stories()` (columna/estatus) + su señal privada
`ticketAssigneeMap` (asignado efectivo), y eso solo se reconciliaba en `syncTicketStatuses()` (al
entrar/cambiar de tablero), nunca tras una mutación.

**Solución (patrón pulso → reconciliación viva, optimista-tras-confirmar):**
1. `HelpdeskService` expone `ticketMutado` (señal). Tras cada escritura **confirmada** (regla de oro),
   emite `{ ticket, estado? | asignadoId?+asignadoName?, at }`.
2. El Board tiene un `effect` que observa `helpdesk.ticketMutado` y, con `untracked`, llama a
   `reconcileTicketLive(m)`: si cambió el estado, `patchStory` con `storyPatchFromEstado(story, estado)`
   (mueve la card + badge + flags); si cambió el asignado, actualiza `ticketAssigneeMap[ticket]`. Guard:
   ignora tickets que no están en el tablero visible. **Sin GET extra** → refresco inmediato desde
   cualquier origen (conversación, card-detail, Tickets). `syncTicketStatuses` sigue siendo la verdad viva
   al entrar/cambiar de tablero.
3. Refactor DRY: el mapeo estado→patch de la story se extrajo a **`storyPatchFromEstado`** en `board-utils.ts`,
   usado por `syncTicketStatuses` **y** `reconcileTicketLive` (antes estaba inline en el sync).
- Sin ciclo de DI: el Board ya inyecta `HelpdeskService` y observa su señal; `HelpdeskService` no importa
  `DataService`. Archivos: `core/services/helpdesk.service.ts`, `features/board/board.ts`,
  `features/board/board-utils.ts`. Build cloud OK. Desplegado a Pages (`main-IGCS5HIE.js`, `39f854a`).
  **Verificación en vivo la hace la dueña** en su flujo real (una prueba mía habría escrito a un ticket
  real de cliente en el HelpDesk).

## [2026-08-13] Board: vista CONSOLIDADA para no-responsables (todas mis tareas, con equipo en la card)
**Petición (dueña):** los consultores/especialistas llevan tareas en varios tableros y les incomoda ir
tablero por tablero. Piden **todas sus tareas en un solo tablero**, con **el equipo indicado en cada card**.
Los **responsables/admin/gerencia** mantienen la vista **por equipo**.

**Decisiones:** (1) audiencia del modo consolidado = **`!auth.veTableroCompleto()`** (todo el que NO es
RESPONSABLE_EQUIPO/ADMIN/GERENCIA → consultores **y** especialistas); (2) consultores/especialistas: **solo
consolidada** (sin selector de tablero); (3) responsables/admin/gerencia: por equipo + **toggle opcional**
"Mis tareas (todos los equipos)".

**Implementación — 100% frontend** (`/api/legacy/stories` ya devuelve TODAS las stories con su `board`, y
`/boards` da el nombre de equipo; `data.stories()` ya tiene todo, `switchBoard` solo filtra):
- `board.ts`: `consolidadoManual` (signal), `esConsolidado` (computed = usesQuarkus ∧ (¬veTableroCompleto ∨
  consolidadoManual)), `misTareas` (todas mis stories por `effAssignee==yo`, sin scoping de board, con
  `dedupYcutoff` extraído y compartido con `visibleStories`), `feed` (consolidado→misTareas | por equipo→
  cardsSource), `columns` usa `feed()` y **no** aplica mine/team/assignee en consolidado, `syncTicketStatuses`
  sincroniza `misTareas` cross-board en consolidado, `mostrarEquipo(card)` (badge de equipo siempre en
  consolidado). Regla #8: `boardLabel` muestra el NOMBRE del equipo.
- `board.html`: selector `@if (boards>1 && !esConsolidado)`; título estático para no-responsables o toggle
  para responsables; badge en toda card (`mostrarEquipo`); ocultos en consolidado "Asignados a mí"/"Mi
  equipo"/"Asignado a:".
- Sin backend, sin contrato. **Verificado con Playwright (MSC001/Admin, mismo render que el consultor):**
  toggle ON → selector oculto, solo mis 3 tareas, badge "Equipo Oficina Cuenca" por card; OFF → vuelve el
  board por equipo (108) con selector; móvil 390×844 sin desborde. La ruta FORZADA del consultor
  (`!veTableroCompleto`, título en vez de toggle) comparte el mismo computed; validación final con un login
  de consultor real queda para la dueña. Desplegado a Pages (`main-YPMU4XJ4.js`, `5e12b9d`).

## [2026-08-14] Reunión: selector de cliente = catálogo completo del HelpDesk (persistir clientes no registrados)
**Problema (dueña):** KDLS001 (consultor **alcance GLOBAL**, sin equipo) al crear una tarea tipo **reunión**
no veía **ningún** cliente. Debía ver **todos** — y la dueña aclaró que "todos" = el **catálogo completo del
HelpDesk** (igual que al crear una tarea de desarrollo/soporte), no solo los ~12 clientes registrados en FitDesk.

**Hallazgo de persistencia:** el modal usaba `perfil.misClientes()` (clientes del EQUIPO, vía `/perfil/me`),
vacío para un global sin equipo. Y `Tarea` **solo** tenía FK `cliente_id` → un cliente NO registrado (de los
~288 del HelpDesk que no son `Cliente` en FitDesk) se **perdía** al guardar (`createStory` descartaba el
`clientName`). Namespace: `misClientes.codigo` = slug de `Cliente`; `hd.clients().id` = `helpdesk_client_id`.

**Decisión (confirmada con la dueña):** catálogo completo **+ recordar el cliente**. Se descartó el enfoque
previo (backend `/perfil/me` devolviendo los 12 registrados para global) — **revertido**.

**Implementación (backend + frontend):**
- **Backend:** migración **V17** (`tarea.cliente_codigo_raw`, `tarea.cliente_nombre`, aditivas/nullable).
  `applyFields` (crear **y** editar) guarda el código crudo (hd id) + `clientName` además de resolver el FK
  `Cliente` cuando el cliente está registrado. `GET /stories`: para una **REUNIÓN** con `cliente_codigo_raw`
  sirve el código/nombre **crudos** (así el board resuelve el nombre por `helpdesk.clients()` y el picker del
  catálogo hace round-trip en edición); el resto sirve el `Cliente` FK como antes (sin regresión).
- **Frontend `reunion-dialog`:** el selector usa `hd.clients()` (catálogo completo) en vez de `misClientes`;
  `clienteLabel`/`guardar` resuelven por hd id, con fallback a `story.clientName`. Se quitó `PerfilService`.
- **Verificado:** round-trip en Postgres local (reunión con cliente NO registrado `999999` → persiste
  `client:'999999'` + `clientName`; V17 aplica 16→17 limpio) y picker en 4200 (muestra 46 clientes de varias
  regiones —AUSTROBANK, AMBATO, ATUNTAQUI, FAE…— no solo los 11 de Cuenca). Frontend desplegado a Pages
  (`9961e6e`); **backend requiere Manual Deploy en Render** (aplica V17 a Neon). Regla #8 intacta;
  migraciones Flyway solo-agregar.
- **Extensión (mismo día) — tarea de desarrollo/soporte:** V17 ya cubría el CASO CLAVE de esa tarea también
  (el `else`-branch del serving devuelve el crudo cuando NO hay FK, y `applyFields` guarda `cliente_codigo_raw`
  para cualquier tarea) → **verificado en prod**: una tarea `DESARROLLO_SOPORTE` con cliente NO registrado
  (`999999`) persiste `client:'999999'`. Único faltante = el `card-detail` no mandaba `clientName`; se agregó
  (`clientNameResolved()` desde `hd.clients()`, enviado al crear y al editar tareas sin ticket) para persistir
  el nombre y poder buscar por él. **Solo frontend**, desplegado a Pages (`7fa256e`). El backend V17 ya lo soporta.
- **Refinamiento (mismo día) — selector de cliente por ALCANCE:** la dueña aclaró que NO todos deben ver el
  catálogo completo: **EQUIPO → su equipo, REGIONAL → su regional, GLOBAL → catálogo completo del HelpDesk**.
  - **Backend:** `Actor.esAlcanceGlobal` (re-agregado) + nuevo `Actor.equiposEnAlcance` (equipos por alcance,
    **independiente del rol** — un consultor regional también scopea bien, a diferencia de `equiposGestionables`
    que solo cuenta RESPONSABLE_EQUIPO). `GET /perfil/me` ahora devuelve `clientes` scopeados por
    `equiposEnAlcance` + flag **`esGlobal`**.
  - **Frontend:** `PerfilService.esGlobal` (señal). Los selectores de `reunion-dialog` **y** `card-detail`
    usan `esGlobal || sinClientesDeAlcance ? hd.clients() (catálogo) : misClientes (su alcance)`. El fallback
    (sin clientes de alcance → catálogo) evita picker vacío si el backend aún no trae `esGlobal` o el equipo
    no tiene clientes registrados. En `card-detail`, `clientes` pasó de señal a **computed** scope-aware.
  - **Verificado (backend local):** `esGlobal` = true para KDLS001/MSC001 (global) y false para KVAZQUEZ
    (equipo Cuenca); `clientes` scopeados. Frontend a Pages (`e6840b5`); **backend requiere Manual Deploy en
    Render** (esta vez sin migración nueva — V17 ya está).

## [2026-08-17] Publicación en servidor propio (Docker on-prem) + repos GitLab de la empresa — EN CURSO
- **GitLab de la empresa como fuente de verdad:** `servicios/fit-desk` (front) y `servicios/fit-desk-api`
  (back) actualizados a la versión actual. Front sincroniza **solo contenido Angular** (el `app/` local trae
  huérfanos de Python/FastAPI que NO van al front). Push por PAT (rotar).
- **Despliegue on-prem** en `172.17.1.153` (Docker): **el servidor construye desde GitLab**; Postgres en el
  servidor (`postgres:18`) **migrando datos de Neon** (Neon = PG 18.4); frontend **same-origin** (URLs
  relativas + Nginx que proxya `/api` → backend) para funcionar por IP/dominio sin CORS.
- **Estado:** preparado y **verificado en local** (login + board vía proxy). Dump + compose + runbook en
  `~/Downloads/fitdesk-deploy/`. **FALTA correr el runbook en el servidor** (no desplegado aún). Pendiente:
  confirmar con IT el acceso HTTP al `:80` (el Mac no lo alcanza), y HTTPS/dominio. Detalle completo en
  [docs/knowledge/15-despliegue-servidor.md](knowledge/15-despliegue-servidor.md).

## [2026-08-20] Conversación del ticket: previews inline de adjuntos IMAGEN
Pedido de la dueña: en el modal de conversación (`TicketMessagesDialog`), los adjuntos tipo **imagen** deben
verse **inline como preview** (la imagen) y poder **descargarse**, en vez del chip genérico "adjunto_N".
**Solo frontend.** El endpoint `/attachments/{id}` solo da el blob (sin MIME sin bajarlo), así que se resuelve
cada adjunto con `hd.fetchAttachment` de forma **progresiva** (no bloquea; mismo patrón que la hidratación de
imágenes embebidas) y se clasifica por MIME (`image/*`). El blob URL se **reutiliza** para thumbnail + lightbox
+ descarga (una sola bajada por adjunto). Nuevos: `attachInfo` (signal), `resolverAdjunto`, `abrirImagenAdjunto`,
`descargar`, `revokeAttachBlobs` (libera blobs al cerrar/recargar). Imágenes → `<figure.conv-thumb>` (thumbnail
acotado 220×160 + botón de descarga superpuesto, click → lightbox existente); no-imagen → chip. Aplica a
adjuntos de mensaje **y** de ticket. **Verificado** (Playwright, ticket #33584): 2 imágenes como thumbnail + 1
no-imagen como chip, lightbox OK, descarga OK, móvil 390 sin desborde. Build cloud OK. **Desplegado a Pages**
(`df08491`) tras re-autenticar `gh` (el token había expirado). (Al retomar on-prem, sincronizar a `servicios/fit-desk`.)

## [2026-08-21] Fix: Tickets/Equipo listaba TODOS los clientes en la 1ª carga (carrera de init)
Tras el login, Tickets abre en Equipo pero listaba **todos los clientes** (filtro vacío); había que refrescar.
**Causa:** `hd.loadFiltered` omite `client_id` si `clientIds` está vacío → todos. El filtro del equipo
(`equipoClientIds`) = `clients()` (catálogo HD) ∩ `equiposRevisar()`. En login con **Render frío**,
`getClients()` puede resolver con el catálogo **vacío** (falla el 1er fetch, reintenta en background ~4s) → la
consulta inicial sale sin `client_id`; cuando el reintento puebla `clients()`, nada re-consultaba.
**Fix (solo frontend):** en `tickets.ts` un `effect` que observa `equipoClientIds()`+`tab()` y **re-consulta
sola** cuando el filtro del equipo llega tarde (tabs equipo/sinasignar, sin filtro explícito, ids no vacíos),
deduplicado con `ultimoEquipoKey` (grabado en `query()`) + el guard `if(loading())` de loadFiltered → sin
consultas dobles. Secundario: `perfil.cargarEquiposRevisar()` ahora **reintenta en background** ante fallo de
red (máx 3, ~3s). **Verificado** (KIMA001/Cuenca): la pestaña Equipo filtra por los 11 clientes de Cuenca
(`client_id` en la consulta) sin refrescar; el effect no duplica. Desplegado a Pages (`44373af`). (La carrera
exacta —backend frío— no se reproduce con backend caliente; el fix la cubre por construcción.)

## [2026-08-21] Recordatorio para tareas tipo REUNIÓN (N min antes, por reunión)
La dueña pidió que una tarea **tipo reunión** dispare un **recordatorio** (alerta visible + sonido) **20 min
antes** por defecto, con **tiempo personalizable por reunión**, y que la alerta salte al **dueño** (assignee)
**y** al **responsable del equipo**. Como salta a dos personas, el tiempo se guarda **por reunión en el
backend** (le calza igual a ambos), no como preferencia de usuario.
**Decisiones:** (1) Nuevo campo `tarea.recordatorio_min` (nullable; solo aplica a reuniones, null en el resto;
`0`/null = sin recordatorio). (2) Se **reutiliza** el poller global existente de recordatorios de ticket
(`layout.ts#checkReminders`, cada 30 s, en el shell → aparece en cualquier pantalla, con sonido y **dedup diario
por-navegador**). (3) **Ventana auto-expirable** `[inicio − lead, inicio)`: la alerta solo salta antes del
inicio y **no re-alerta al día siguiente** (a diferencia de los recordatorios de ticket, que son por fecha del
día). (4) **Relevancia:** `dueño === yo` **o** (`soy responsable de equipo` **y** `reunion.board ∈ mis boards`).
(5) `ReminderAlertDialog` se generalizó (`kind: 'ticket'|'reunion'`): la reunión muestra 📅 tema + hora + botón
**"Unirse"** (si hay link); "Ver pendientes" solo si hay algún item de ticket.
**Limitación (comunicada):** la alerta solo salta **con FitDesk abierto** (igual que los recordatorios de
ticket; no hay push/service-worker). **Verificado E2E** (Playwright, backend local con V18, KIMA001): la alerta
salta al dueño con el estilo de reunión + "Unirse", **no** re-salta tras cerrar (dedup), el modal refleja el
valor guardado (chip 30 activo), round-trip `recordatorioMin` OK por `applyFields`/`/stories`, 0 errores de
consola. Backend compila + `V18` aplica 17→18. **Pendiente de desplegar:** backend (imagen + Render Manual
Deploy → `V18` aplica a Neon) **antes** que el front (Pages), y sincronizar a `servicios/fit-desk`
(+ `fit-desk-api`) en GitLab.

## [2026-09-02] Los cambios de frontend se despliegan en LOTE (no uno por uno) — Lote 1 al on-prem
**Decisión de la dueña:** dejar de desplegar cada cambio por separado; **acumular** los cambios verificados
en local y **desplegarlos juntos** cuando ella dé la luz verde (sigue vigente la regla "no desplegar sin
permiso explícito"). El destino de estos lotes ya **NO** es Pages/Render sino el **servidor on-prem**
(Pages quedó como redirect). Procedimiento del lote: push a GitLab `servicios/fit-desk` → en el servidor
`git pull` + `docker compose build frontend && up -d frontend` → verificar por túnel SSH.

**Lote 1 (desplegado 2026-09-02, `servicios/fit-desk` `36aa97b..e2bf028`, rebuild solo del frontend).**
Dos ítems, **100% frontend**:

1. **Badge de la Bandeja auto-refrescado (≤30 s).** El contador de pendientes de la Bandeja solo se
   actualizaba **al abrir la Bandeja** → el responsable no se enteraba de nada nuevo. Fix: se agregó
   `transferencias.refrescarPendientesBandeja()` al **mismo `setInterval` de 30 s** que ya corre
   `checkReminders` en el shell ([layout.ts:150-154](../app/src/app/layout/layout.ts#L150-L154)), gateado por
   `mostrarBandeja()`. Sin timer nuevo ni costo extra para quien no ve la Bandeja.

2. **Alerta de NOVEDADES en tickets del equipo (solo RESPONSABLES).** Cuando entra un ticket **nuevo** o un
   ticket del equipo recibe **actividad** (comentario/cambio) → **popup + sonido** y **badge** en el ítem
   "Tickets" del menú (mismo estilo que el de la Bandeja).
   - **Servicio nuevo** [`core/services/nuevos-tickets.service.ts`](../app/src/app/core/services/nuevos-tickets.service.ts):
     dos señales de tiempo, `entry_date` (creación → motivo `'nuevo'`) y `modified_date` (→ motivo
     `'actividad'`), comparadas contra **dos marcas de agua persistidas por usuario** en localStorage
     (`fit-daily_nt_entry_<uid>` / `fit-daily_nt_mod_<uid>`). **La 1ª corrida hace BASELINE** (no alerta por
     el histórico) y las marcas evitan re-alertar entre recargas/sesiones. Dedup del popup por
     `ticket:motivo:señalMs` → una actividad **nueva** sobre el mismo ticket sí vuelve a alertar.
     `marcarVistos()` (al abrir la pestaña **Equipo**, [tickets.ts:424](../app/src/app/features/tickets/tickets.ts#L424))
     avanza ambas marcas y limpia el badge.
   - **Consulta:** `helpdesk.fetchEquipo(clientIds, 30)` — 1ª página ordenada por `modified_date desc`,
     **sin efectos sobre la vista** (no toca las señales de la lista de Tickets), con `catch → []`
     (best-effort: si el HelpDesk falla, no rompe el shell). El scope de clientes sale del helper extraído
     `equipoClientIdsDe(equiposRevisar, clients)` en `ticket-utils.ts` (reusa la lógica ya existente de la
     pestaña Equipo, ahora compartida con el Layout).
   - **Poll:** en el tick de 30 s del shell pero **throttled a ~60 s** (`ultimoNt`, guard de 55 s) y solo si
     `auth.esResponsableEquipo()` → ~1 consulta/min para responsables, **0** para el resto.
   - **UI:** `ReminderAlertDialog` se generalizó otra vez con `kind:'ticket-nuevo'` (+ `motivo`): chip
     **NUEVO**/**ACTUALIZADO** y botón "Ver en Tickets". El badge del menú usa `9+` como el de la Bandeja.
**Verificado:** typecheck `cloud` OK y, tras desplegar, por túnel con **KIMA001 (consultor)**: el filtro de
la pestaña Equipo sigue mandando `client_id` (el refactor de `equipoClientIdsDe` no lo rompió), el badge de
Tickets **no** aparece para un no-responsable, 0 errores de consola. **El camino del RESPONSABLE (badge +
popup) lo valida la dueña en vivo** (MSC001 es responsable) — probarlo yo habría implicado tocar tickets
reales de clientes.

## [2026-09-02] GitHub Pages pasa a ser SOLO un redirect al nacional (corte parcial)
**Decisión de la dueña:** publicar **ya** el redirect de Pages hacia `https://fitdesk.fit-bank.com`, **a
sabiendas** de que el dominio es interno y hoy **requiere VPN/red corporativa**. Pages deja de servir la app:
`index.html` + `404.html` (para que **cualquier** ruta redirija) con meta-refresh 2 s + `location.replace`
1.2 s + botón manual + aviso de VPN. gh-pages `fa4a7c1` (reemplazó la app `25601a4`); verificado live.
**Consecuencia asumida:** los usuarios **sin VPN quedan sin acceso** hasta que IT exponga el dominio.
**Reversible en ~2 min:** `cd app && npx ng build -c cloud --base-href /fit-desk-nacional/` +
`python3 scripts/deploy-gh-pages.py`.
**No es el corte definitivo:** **Render + Neon siguen encendidos como respaldo** (ya sin nadie escribiéndoles).
El corte de datos real = dump fresco + apagar Render **en el mismo momento**, para no abrir un hueco de
split-brain. Ver [knowledge/15-despliegue-servidor.md](knowledge/15-despliegue-servidor.md).

## [2026-09-02] Tema oscuro por usuario (preferencia persistida en el backend) — SIN DESPLEGAR
Modo oscuro conmutable desde el **Perfil**, recordado **por usuario** (no por navegador).
- **Backend:** migración **V19** (`usuario.tema VARCHAR(10)`, aditiva/nullable). `GET /perfil/me` devuelve
  `tema`; nuevo `PUT /api/legacy/perfil/tema` `{tema:'light'|'dark'}` (valida el valor → 400 si otro; actor
  por `X-Actor-Hid`). Se **persiste solo `'dark'`**; `NULL` = claro, así el default no ocupa fila de datos y
  los usuarios existentes quedan en claro sin backfill.
- **Frontend:** [`core/services/theme.service.ts`](../app/src/app/core/services/theme.service.ts) pone
  `data-theme="dark"` en `<html>` (de ahí cuelgan 13 bloques de estilos en `styles.scss`, incluidos los
  overlays de Material —diálogos, menús, selects, autocomplete— que viven fuera del árbol del componente).
  **Fuente de verdad = backend**, con **cache en localStorage por usuario** para aplicar el tema al instante
  y evitar el *flash* de claro al entrar; el Layout llama `theme.sincronizar()` cuando resuelve
  `perfil.cargarMiPerfil()`. Toggle en `perfil-dialog`.
**Estado: implementado, NO desplegado.** A diferencia del Lote 1, este **requiere desplegar el backend**
(imagen de `fit-desk-api` + `V19`) **antes** que el frontend — sería el primer redeploy de backend del
servidor on-prem desde que quedó vivo. Sin verificación E2E ni visual todavía.

## [2026-09-03] Lote 2 desplegado al nacional: descargas + tema oscuro + alerta accionable
Desplegado a `https://fitdesk.fit-bank.com` (GitLab `servicios/fit-desk` `d5c3d41..c58eab5`; en el servidor
`git pull` + `docker compose build frontend && up -d frontend`). **100% frontend**, sin backend ni migraciones.
1. **Fix de descargas**: ancla dentro del DOM (una suelta no dispara nada en la PWA instalada), extensión por
   **firma binaria** como red de seguridad, y blob sin revocar antes de tiempo (bajaba 0 KB en el reporte de
   Vacaciones). Todo encapsulado en `core/descargar.ts`.
2. **Tema oscuro completo**: las 8 secciones + las 4 pestañas de Administración. Ver
   [aprendizajes.md](aprendizajes.md) [2026-09-02] para los tres patrones (superficie clara, color heredado
   y **estilos inline calculados en TS**) y la trampa de `:host-context()`.
3. **Alerta de novedades accionable**: el N° de ticket abre la conversación **encima** de la alerta (que no se
   cierra, para poder atender varias). Import **dinámico** porque el diálogo vive en el bundle principal.
**Verificado en producción**: bundle `main-HODXRBVE.js` servido, toggle claro↔oscuro OK, 0 errores.

**⚠️ Queda SIN desplegar el BACKEND del tema (V19).** Hoy la preferencia se guarda solo en localStorage por
navegador: `PUT /perfil/tema` da 404 y `/perfil/me` no trae `tema`. Funciona, pero **no sigue al usuario entre
navegadores**. Completarlo exige el primer redeploy de backend del on-prem (Flyway aplicaría `V19` —columna
`usuario.tema`, aditiva y nullable— sobre la BD de producción): **pendiente de decisión de la dueña**.

**Bug de producción corregido de paso:** `perfil.cargarEquiposRevisar()` se llamaba solo desde `tickets.ts`,
pero el poll de novedades vive en el shell → sin abrir la pestaña Tickets, **la alerta del Lote 1 no saltaba
nunca**. Ahora se carga en `layout.ts`.

## [2026-09-07] Lote 3 desplegado: descarga de adjuntos (gesto de usuario) + menú lateral
Desplegado a `https://fitdesk.fit-bank.com` (GitLab `c58eab5..e1413fb`; en el servidor `git pull` +
rebuild del frontend). **100% frontend.** Bundle en producción `main-55PV7S65.js`.
1. **Adjuntos que no descargaban en la PWA instalada.** Causa raíz: un `await` entre el clic y
   `descargarUrl()` — introducido al añadir la cascada de extensión. Chrome **bloquea en silencio** las
   descargas sin gesto de usuario, y la ventana *standalone* de una PWA es mucho más estricta que una
   pestaña (por eso funcionaba en escritorio y no en la PWA). `descargar()` vuelve a ser **síncrono**.
   **Regla nueva:** entre el `(click)` y `descargarUrl()` no puede haber ningún `await`.
2. **Menú lateral pegado abierto** al estrechar la ventana: `openedChange` dejaba `drawerOpen` en true y
   `opened = fixed() || drawerOpen()` seguía dando true. Nuevo `effect` sobre `fixed()`.
**Verificado en producción**: el `.docx` baja con extensión (196 369 bytes, CRC OK) y al estrechar a 420 px
el menú se cierra, sin backdrop ni contenido bloqueado.
**Pendiente de confirmación de la dueña:** los adjuntos **en su PWA instalada**, el único entorno donde el
fallo se manifestaba y que no se puede probar desde aquí.

## [2026-09-07] Migración a AWS — Fase A: FitDesk corriendo en paralelo en `3.90.116.254:8080`
IT entregó un servidor AWS con Docker. **Hallazgo clave: es la MISMA máquina del HelpDesk**
(`helpdesk-api.fit-bank.com` resuelve a esa IP; Apache/MantisBT en 80/443). Convivencia **confirmada como
intencional** por la dueña → el diseño lo asume: FitDesk en **8080**, Postgres del compose **sin publicar**
(el host ya tiene uno en 5432) y **límites de memoria** en los tres servicios para que FitDesk no pueda
dejar sin RAM al HelpDesk.
- **⭐ El frontend NO se puede construir en el servidor:** kernel **3.10** (CentOS 7) + `node:22` = SIGSEGV.
  No es memoria (el backend, JVM, sí compila ahí). Se construye en el Mac (`--platform linux/amd64`) y se
  carga con `docker save`/`docker load`; el compose usa `image:` en vez de `build:` para el front.
- **Se aprovechó para desplegar la V19** del tema oscuro (el on-prem sigue sin ella): Flyway la aplicó sobre
  los datos restaurados y se verificó **de punta a punta** (toggle en la UI → `usuario.tema='dark'` en la BD).
- **Datos**: copia del on-prem, conteos idénticos (tarea=340, ticket_espejo=5198, usuario=19…).
- **Verificado**: SPA, board desde Postgres, 0 llamadas a Firebase, 12 tickets reales por el proxy, CORS del
  login OK (401, no 403), adjunto íntegro (196 369 bytes, CRC OK). **HelpDesk sano** todo el rato; memoria
  libre 4,9 → 4,5 GB.
**Decisión de la dueña:** el on-prem **sigue siendo la fuente de verdad** y operativo; AWS es solo
validación. La copia de datos en AWS **quedará vieja a propósito** y se refrescará con un dump nuevo cuando
ella decida el corte. Detalle: [knowledge/16-despliegue-aws.md](knowledge/16-despliegue-aws.md).

## [2026-09-08] Desplegado a AWS: alertas con destinatario correcto, Mi Panel y limpieza
Desplegado **solo a AWS** (`3.90.116.254`, entorno paralelo). GitLab: front `e1413fb..8d5a103`, back
`4f1b18c..8ba83b4`. El **on-prem sigue siendo la fuente de verdad** y no se tocó.
1. **Alertas de novedades**: el alcance por clientes pasa de "equipos que reviso" a **equipos que DIRIJO**
   (nuevo flag `esResponsable` en `/perfil/equipos-clientes`, aditivo) y se suma un 2º origen, los
   **tickets asignados** al usuario. El poll corre para todos; quien no dirige equipos hace 1 petición/ciclo.
2. **Nadie recibe alerta de su propia acción**. Verificado contra el API real que la entrada automática del
   HelpDesk trae al usuario REAL (`system_message=true`, `entry_user_id=DACM001`).
3. **Mi Panel** visible para responsables (antes: rol del HelpDesk + usuario en duro) y con alcance por
   equipo + selector para regionales.
4. **Limpieza**: eliminada `CLIENTES_VALIDOS`, el último hardcode de Cuenca del frontend.
**Verificado en AWS**: el flag responde correctamente por usuario — JPHP001 sale `CUENCA esResponsable=false`
(solo miembro → ya no recibe sus alertas) y `PRUEBA esResponsable=true`; MSC001 `CUENCA esResponsable=true`.
Bundle `main-HUMSJLGK.js` con el código nuevo en sus chunks y **0 rastros** de la lista fija. HelpDesk sano
(Apache 302), memoria libre 4,5 GB.
**Nota:** IT ya **cerró el :8080** desde fuera, así que AWS solo se verifica por túnel SSH hasta que el
dominio apunte allí. Y la copia de datos de AWS **ya diverge** del on-prem (se vio en una fecha de
asignación): se refrescará en el corte, como estaba previsto.

## [2026-09-08] "Ver en Tickets" de la alerta aterriza en la pestaña Equipo, sin filtros y re-consultando

**Contexto.** El botón del popup de novedades solo hacía `router.navigate(['/tickets'])`: te dejaba en la
pantalla, pero en la pestaña y con los filtros que tuvieras de antes. Si venías filtrando por estado o
cliente, la novedad quedaba escondida y el botón no cumplía lo que promete.

**Decisión.** El botón deja la pantalla **mostrando la novedad**: pestaña **Equipo**, selector de equipo en
"todos mis equipos" (la novedad puede ser de cualquiera de los que lidero), **filtros limpios** y
**re-consulta**. Como el orden por defecto es `modified_date desc`, lo nuevo y lo recién modificado sale
arriba. Limpiar los filtros es deliberado: es la única forma de garantizar que se vea lo que se anunció.

**Cómo.** Se replica el patrón que ya usa la búsqueda global (`SearchService`): el Layout **publica la
orden** y navega; **Tickets la ejecuta**, que es quien sabe consultar. La orden vive en
`NuevosTicketsService` (donde ya vive el resto del flujo de novedades) con los dos caminos de siempre —
`verNovedades` (Observable) si Tickets **ya está montado**, y `tomarPendienteVer()` si **aún no existe**
porque vienes de otra pantalla—. En el arranque, si hay orden pendiente **manda ella** en vez de `refresh()`,
para no lanzar dos consultas iguales.

**Alcance.** 100% frontend, sin cambios de API ni de esquema.

**Verificado en local contra AWS** (túnel SSH + build servido same-origin, sesión MSC001), los dos caminos:
desde Board (Tickets sin montar) y desde la propia pantalla estando en "Asignados a mí" → en ambos aterriza
en **Equipo** con la lista encabezada por los tickets del aviso. El N° sigue abriendo el modal del ticket.

**No desplegado**: queda en el lote pendiente, a la espera de luz verde de la dueña.

## [2026-09-08] Desplegado a AWS (producción): "Ver en Tickets" + N° como enlace + contraste en oscuro

**Commit** `daa1482` en GitLab `servicios/fit-desk` (sobre `8d5a103`). **Solo frontend**, sin tocar backend
ni esquema. Imagen construida en el Mac (`--platform linux/amd64`) y cargada en el servidor con
`docker load` + `docker compose up -d frontend`, porque su **kernel 3.10 no puede construir con `node:22`**.
Bundle en producción: **`main-5WCIUUKG.js`**.

**Verificado E2E contra AWS** (túnel SSH, sesión MSC001):
- **Contraste en oscuro**: con el puntero sobre una fila de Administración, fondo real oscuro y texto claro
  → **16.27** (antes 1.16, texto blanco sobre fondo casi blanco). `--mix-base: #1a222b` presente.
- **N° de ticket de la alerta**: `#4fb8e0`, subrayado, contraste **7.49**, claramente distinto del gris de al
  lado; sigue abriendo el modal del ticket.
- **"Ver en Tickets"**: desde Administración aterriza en `/tickets`, pestaña **Equipo**, con los tickets del
  aviso encabezando la lista y el badge de novedades limpio.
- **HelpDesk intacto** (Apache 302) y memoria sana: **4,4 GB disponibles**. *(Ojo: `free` muestra ~320 MB
  "free" porque 5,5 GB son caché, y `docker stats` sigue reportando mal por cgroup v1 — mirar `available`.)*

**Nota de proceso.** El `Dockerfile` del workspace (`app/`) construye con `-c quarkus` (URLs absolutas a
`localhost:8080`) y **no sirve para desplegar**: el andamiaje bueno (`environment.onprem.ts`, la config
`onprem` de `angular.json` y el `Dockerfile` con `-c onprem`) vive **solo en GitLab**. El despliegue va
siempre por: clonar el repo → `rsync` de **solo `src/`** excluyendo `environment.onprem.ts` → revisar que el
`git status` no traiga deleciones → commit/push → build de la imagen.

## [2026-09-08] Corte completado: AWS es la única producción y el on-prem queda parado

**Descubrimiento.** Al ir a parar el on-prem se comprobó que **IT ya había hecho el corte**:
`fitdesk.fit-bank.com` resuelve a **`3.90.116.254`** (AWS) y sirve el bundle desplegado hoy
(`main-5WCIUUKG.js`); el `:8080` externo está cerrado. O sea que los pasos 3–4 de la Fase B estaban hechos
sin que constara aquí, y el on-prem llevaba tiempo encendido pero **inalcanzable por el dominio**.

**Comprobación de contención antes de parar.** Se compararon las **22 tablas** de ambas bases (conteo +
hash del contenido) y, en las 6 que diferían, fila a fila. Resultado: **ninguna fila existe solo en
on-prem** (AWS va por delante en `tarea` 343/341, `ticket_espejo` 5200/5199, `transferencia` 6/5) y la única
edición más reciente en on-prem era **la nota del ticket 33710**. El resto eran marcas de tiempo
(`tarea` 270, contenido idéntico) o AWS más al día (`asignacion` 118).

**Acciones ejecutadas (autorizadas por la dueña).**
1. **Nota del 33710 traída a AWS** por SQL: `ticket_nota` id 450, `'heccer, facilito'` →
   `'notificado Heccer'`, **conservando la fecha real** en que se escribió (`2026-09-07 20:16:01+00`) en vez
   de sellarla con la de la migración. `UPDATE 1`, verificada además por el API de producción
   (`/api/legacy/hdNotes` con `X-Actor-Hid` → `33710: "notificado Heccer"`).
2. **On-prem parado** con `docker compose stop`: los 3 contenedores en `exited`, **volumen
   `fitdesk_fitdesk_pgdata` intacto**. Con `restart: unless-stopped` seguirán parados aunque el host
   reinicie. Reversible con `docker compose start`.
3. **Producción verificada después**: SPA 200, API 200, bundle correcto; el `:8080` del on-prem ya no responde.

**Nota de operación:** `/api/legacy/hdNotes` **filtra por actor** — sin la cabecera `X-Actor-Hid` devuelve
`{}` (0 notas), lo que parece un fallo y no lo es.

## [2026-09-08] Retirado el botón "Borrar Board": no se muestra a nadie

**Decisión.** El botón **Borrar Board** de la cabecera del tablero deja de mostrarse a **cualquier
usuario**. Era exclusivo de MSC001 (`puedeBorrarBoard = esMSC001()`), pero es una acción **masiva e
irreversible** —borra de golpe todas las tareas sin ticket del tablero— y no tiene por qué estar a un clic
de distancia mientras se trabaja.

**Implementación.** Una línea en
[auth.service.ts](../app/src/app/core/services/auth.service.ts): `puedeBorrarBoard` pasa de
`computed(() => this.esMSC001())` a `computed(() => false)`.

Se hace así, y **no** borrando el botón de `board.html` ni el método `clearBoard()`, porque:
- es **un solo punto de verdad** y revivirlo es volver a poner `this.esMSC001()`;
- `clearBoard()` conserva su lógica cuidadosa (respeta las tareas CON ticket, que nacen del HelpDesk y no
  se borran nunca) — si algún día vuelve, vuelve con esa protección intacta.

**Sin efectos colaterales.** `puedeBorrarBoard` también lo usa
[msc001.guard.ts](../app/src/app/core/guards/msc001.guard.ts), pero ese guard **no está aplicado a ninguna
ruta** (código muerto, verificado): no hay ninguna pantalla que se vuelva inaccesible.

**Verificado en Chrome** con el build nuevo y sesión real de MSC001 —la única que lo veía— en `#/board`:
el botón no está en el DOM (ni el texto, ni la clase `.danger`, ni el icono `delete_sweep`), y el resto de
la cabecera ("Crear", filtros) renderiza igual. **No desplegado.**

## [2026-09-08] Privacidad en el PDF, globito solo para responsables, pegar imágenes y tope de 5 MB

Cuatro cambios de frontend, sin backend ni migraciones.

### 1) El PDF de la conversación oculta a los EMPLEADOS como "Soporte"

**Por qué.** Ese PDF puede acabar en manos del cliente e identifica al consultor por su nombre.

**El nombre se filtraba por dos sitios, no uno.** Además de la etiqueta del autor, los mensajes automáticos
llevan el nombre **dentro del texto** ("El usuario ‹NOMBRE› cambió el estado"). Anonimizar solo el autor no
habría servido de nada: el nombre se seguía leyendo dos líneas más abajo.

**Cómo se distingue empleado de cliente** (⭐ **el nombre del cliente SIEMPRE se ve**): `esEmpleado(m)` para
el autor, y para los nombres sueltos dentro del texto el catálogo `getHdUsers()`, que **solo trae empleados**
(filtra por rol SOPORTE/ADMINISTRADOR/SUPERVISOR) → el cliente no está ahí y no se toca por construcción.
El reemplazo es tolerante a tildes y mayúsculas, y cubre también las parejas de palabras del nombre
("MARIA SOL", "SOL CONTRERAS") porque en el cuerpo casi nadie escribe el nombre completo.

**Limitación declarada:** no se bajan a nombres de pila sueltos ("Saludos, Juan") — destrozaría el texto del
cliente. El PDF reduce mucho la exposición, no la elimina; conviene decirlo en la capacitación.

**En pantalla NO se anonimiza**: dentro de FitDesk el equipo tiene que seguir viendo quién dijo qué.

**Excepción para responsables** (`auth.pdfSinAnonimizar`): casilla en el perfil que descarga con los nombres
reales. **No se persiste en ningún sitio a propósito** —es una excepción a una medida de privacidad, así que
tiene que caducar sola— y la apaga `clearSession()`, que cubre tanto el cierre de sesión como la expiración
del token. El PDF **re-verifica el rol** al generarse; no confía solo en la casilla.

### 2) El globito de novedades, solo para quien dirige

El contador sobre "Tickets" es seguimiento de equipo, no trabajo propio. Ahora exige
`esAdminPlataforma() || esResponsableEquipo()`. **El popup no cambia**: sigue saltándole al responsable y al
consultor asignado, que es donde está el aviso accionable.

### 3) Pegar una imagen del portapapeles la adjunta

`onPaste` mira `clipboardData.files` **antes** de pegar el HTML: al copiar desde una web el portapapeles trae
la imagen *y* un `<img>` en el `text/html`, y si se pegaran ambos la imagen viajaría duplicada. Se renombra a
`captura_<ticket>_<hh-mm-ss>.<ext>` porque llega como `image.png` y así la recibiría el cliente. Reutiliza la
tira de adjuntos, la miniatura y el multipart de `sendMessage` que ya existían.

### 4) Tope de 5 MB por adjunto (lo impone el API del Helpdesk)

No había **ningún** control: el archivo grande se aceptaba y reventaba al ENVIAR con un "Error al enviar."
que no decía cuál era ni por qué, perdiendo el mensaje escrito. Un helper `aceptarArchivos()` común a las
**tres** vías (selector, arrastrar, pegar) rechaza al adjuntar nombrando archivo y peso. Se aplica **por
archivo**; si el API limitara además el total de la petición, haría falta una segunda comprobación.

### Verificado en Chrome contra AWS

- **PDF**: ticket 32976 (37 mensajes, 17 de empleado, 8 automáticos). De los **48 empleados del catálogo,
  0 aparecen** en el PDF; 18 "Soporte". Los automáticos distinguen bien: "El usuario **Soporte** cambió el
  estado" vs "El usuario **MAYRA MOROCHO**" (la clienta, intacta).
- **Casilla**: marcada → 0 "Soporte" y nombres reales. **Cerrar sesión y volver a entrar sin recargar la
  página** → aparece desmarcada (el reset en memoria funciona, no es un efecto de la recarga).
- **Globito**: MSC001 lo ve (9+); con sesión de consultor (KIMA001, rol CONSULTOR) **no**, y el popup **sí**
  le salta con sus 3 tickets.
- **Adjuntos**: pegar imagen → 1 chip con miniatura y nombre `captura_33745_20-36-42.png`, sin incrustarla en
  el texto. 8 MB rechazado por las tres vías con el aviso correcto; 1–2 MB aceptados; el texto escrito se
  conserva siempre. Pegar texto sigue igual (con negrita).
- **390×844**: sin desborde y el botón Enviar visible (781 de 844).

**No probado**: el envío real de un mensaje con imagen pegada al HelpDesk, porque escribiría en un ticket de
un cliente en producción. El camino multipart es el mismo que ya usa arrastrar-y-soltar; lo nuevo es solo
cómo entra el File a la lista, que sí está verificado.

## [2026-09-08] Desplegado a AWS: privacidad del PDF, adjuntos y arreglos de tema oscuro

**Commit** `75f8203` en GitLab `servicios/fit-desk` (sobre `daa1482`). **Solo frontend**: 9 archivos, sin
backend ni migraciones. Bundle en producción: **`main-U4QDPMIX.js`**, verificado por el dominio.

Contenido del lote (detalle en las entradas de arriba del mismo día):
1. **PDF de conversación**: los empleados salen como "Soporte" (autor **y** cuerpo); el cliente se ve.
2. **Casilla en el perfil** para responsables: descargar con nombres reales, sin persistir, muere con la sesión.
3. **Globito de novedades** solo para quien dirige equipo (el popup no cambia).
4. **Pegar imágenes** del portapapeles como adjunto, con miniatura.
5. **Tope de 5 MB** por adjunto en las tres vías (antes no había ninguno).
6. **Tema oscuro**: área de respuesta y buscadores de Bandeja (fondo blanco con letra clara, contraste 1.0).
7. **Botón "Borrar Board"** retirado para todos.

**Verificado tras el despliegue**: SPA 200, API 200, bundle correcto por `https://fitdesk.fit-bank.com`.
**HelpDesk intacto** (Apache 302) y memoria estable: **4393 → 4379 MB disponibles**.

**Nota:** el botón "Borrar Board" sigue existiendo en la plantilla compilada (se retiró apagando el flag, no
borrando el marcado) — no se renderiza para nadie, y revivirlo es volver `puedeBorrarBoard` a `esMSC001()`.

## [2026-09-08] Color identificativo por empleado, unificado en toda la app

**Petición.** Que cada empleado elija un color que lo identifique: el mismo en su tarea, su ticket, el
calendario de vacaciones y el HelpDesk semanal. Selector en el perfil, visual + hexadecimal, no obligatorio.

**Lo que había en realidad.** No era "añadir un selector": **el color de una persona no era suyo y cambiaba
según la pantalla.** Cuatro sistemas independientes — avatar propio (HSL por hash), board/tickets (otra
paleta por hash), semanal (paleta **por índice en la lista**) y vacaciones (**por orden de aparición**, sin
paleta oscura). En las dos últimas bastaba cambiar el filtro para que a alguien le tocara otro color.

Y el remate: `usuario.color` **ya existía** con hex real para 12 usuarios, y **no se usaba nunca**, porque
`GET /api/legacy/users` devuelve `id` = código local ("SC") mientras las tareas y tickets se asignan por
`helpdesk_user_id` ("MSC001"): `getMember('MSC001')` no encontraba a nadie y todo caía al hash.

### Decisiones

Punto/avatar en su color con el **nombre siempre legible** (pintar texto con un color libre era el mayor
riesgo de legibilidad); si no elige, color **derivado y estable**; colores repetidos **se avisan pero se
permiten**.

### Lo nuevo: aritmética de contraste (`app/src/app/core/colores.ts`)

En todo el repo **no había ni una función de luminancia**: la legibilidad se resolvía a mano, componente a
componente. Con colores fijos elegidos por nosotros se aguantaba; con colores libres de 19 personas, no.

Dos cosas salieron al medir, y ambas cambiaron el diseño:
- **Repartir por hash persona a persona CHOCA**: con 12 empleados salían **4 colores repetidos** (uno tres
  veces). El reparto se hace ahora sobre el equipo **completo** (`construirMapa`): 0 repetidos, y el
  resultado no depende del orden en que llegue la lista (probado al derecho, al revés y barajado).
- **La paleta de 14 no daba para 19 empleados** (5 repetidos inevitables) → ampliada a **20**, con tonos que
  faltaban (rosa, marrón, azul grisáceo, lima, índigo) en vez de un cuarto naranja.
- **Seis colores caen en una franja de luminancia (~0.19) donde ni el blanco ni el negro llegan a 4.5**
  encima (el peor daba 4.30). No se arregla eligiendo mejor la tinta: `colorAvatar()` mueve el **fondo** lo
  justo, conservando el tono (`#2980B9` → `#287bb1`).

**Medido, los 20 colores:** peor caso **4.61** en avatar, **4.58** en chip claro, **4.54** en chip oscuro.
Y los extremos que alguien puede escribir a mano (blanco puro, negro, amarillo, gris medio) también pasan.

### Cambios

- **Backend, sin migración** (la columna ya existía): `PUT /api/legacy/perfil/color` con **validación de
  hexadecimal** —el precedente del proyecto, el color de cliente, se guarda sin validar nada y acaba en un
  `style`—, `color` en `/me`, y **`hid` en `/api/legacy/users`** (aditivo), que es lo que arregla el
  desajuste de clave.
- **Frontend**: `ColoresService` como fuente única; Board, tarjeta de Ticket, Semanal, Vacaciones, Mi Panel
  y el avatar del menú pasan a consultarlo. Se retiran las cuatro paletas. `.achip` deja de usar `pastel()`
  (mezclaba siempre hacia blanco, dejando en oscuro texto casi blanco sobre fondo casi blanco) y Mi Panel
  deja de fijar `color:#fff` sobre el color crudo.
- **Perfil**: paleta de 20, selector libre, campo hexadecimal validado en vivo, marca de "ya lo usa X" y
  "Sin color" para volver al automático.

### Verificado

- **En Chrome, con backend y base locales**: eligiendo morado para MSC001, ese morado aparece en el **Board**
  y en la **tarjeta de Ticket** —las dos pantallas que antes mostraban colores distintos— y en el avatar del
  menú (contraste 5.87). El selector marca 10 colores como ocupados con nombre real y avisa al elegir uno.
- **Numéricamente**: contraste de los 20 colores y reparto sin colisiones (ver arriba).
- **NO ejercitado con datos**: Mi Panel, Semanal y Vacaciones. La base local no tiene tareas asignadas ni
  rotación semanal, y las vacaciones sembradas a mano no llegaron a pintarse en el calendario. El código
  está unificado y compila, pero **esas tres pantallas hay que mirarlas con datos reales antes de dar el
  cambio por bueno**.

**No desplegado.** Va al lote junto al arreglo del texto de la conversación en oscuro (`::ng-deep`).

## [2026-09-08] Color reservado: `#DCBEFF` para Domenica Lasso (KDLS001)

**Decisión.** La regla general **no cambia** —los colores repetidos se avisan pero se permiten—; este color
concreto queda **apartado** para ella: nadie más puede elegirlo.

**Implementación.** Un mapa `RESERVADOS` en dos sitios, a propósito:
- **Backend** ([PerfilResource.java](../backend/src/main/java/com/fitdesk/api/PerfilResource.java)) — es
  donde de verdad se impide: `409` con el nombre del dueño. El frontend no es un límite.
- **Frontend** ([core/colores.ts](../app/src/app/core/colores.ts)) — solo para avisar **antes** de intentarlo,
  y que la persona entienda por qué no puede en vez de ver un error genérico.

`#DCBEFF` **no está en `PALETA`**, así que el reparto automático nunca se lo da a nadie por accidente.

**Un detalle que obligó a un arreglo extra.** Es un lavanda muy claro (luminancia 0.593): como **punto**
sobre fondo blanco daba **contraste 1.63** — prácticamente invisible, justo lo contrario de identificar a
alguien. Se añadió un aro finísimo (`box-shadow` con `currentColor` al 35 %) a los puntos de asignado del
board y de la tarjeta de ticket. No altera el color y hace que **cualquier** color claro que alguien elija
se distinga, en los dos temas. Como avatar y como chip ya iba bien (11.24 / 4.63 / 5.77) gracias al cálculo
de tinta.

**Verificado** contra el backend local: MSC001 y JPHP001 reciben **409** ("ese color está reservado para
Domenica Lasso"), KDLS001 lo guarda con 200, y cualquier otro color se sigue permitiendo con normalidad.

**Aplicado en producción** (AWS): `usuario.color` de KDLS001 pasó de `#16A085` a `#DCBEFF`. Sin efecto
visible hasta que se despliegue el lote — hoy ese campo existe pero la app aún no lo usa.

## [2026-09-08] Desplegado a AWS: color identificativo + arreglo del texto de la conversación en oscuro

**Backend** `21d3f09` (`fit-desk-api`) y **frontend** `d847309` (`fit-desk`), bundle **`main-PAMM3QE2.js`**.
**Backend primero**, a propósito: si hubiera ido el front antes, el guardado de color habría dado 404 y
`/users` no traería `hid`. **Sin migración** — Flyway confirmó "Current version: 19, no migration necessary".

### Verificado EN PRODUCCIÓN, con datos reales

Esto es lo que en local no se pudo ejercitar por falta de datos:

| Pantalla | Resultado |
|---|---|
| **Vacaciones** | **47 chips** coloreados, uno por persona; peor contraste **5.0**. Y en **tema oscuro**, que esa pantalla no tenía paleta oscura |
| **Semanal** | 57 elementos, peor contraste **6.67** |
| **Board** | 134 puntos, **16 colores distintos**, todos con el aro; el lavanda de Domenica aparece |
| **Tickets** | 12 puntos, 8 colores, todos con aro |
| **Mi Panel** | ⚠️ **No ejercitado**: los 10 avatares son "Sin asignar". Los dos bloques que muestran avatar son "Por asignar" (vacío por definición) y "Próximos a vencer" (sin asignado ahora mismo). No es un fallo, es que no hay dato que pintar |

Endpoints: `/users` devuelve **34 usuarios, los 34 con `hid`**; `/me` devuelve el color; el color reservado
da **409** ("reservado para Domenica Lasso") y un hex inválido **400**.

**HelpDesk intacto** (Apache 302); memoria **4544 MB** disponibles.

**Pendiente de mirar cuando haya datos:** los avatares de Mi Panel.

## [2026-09-08] Desplegado: color por persona en el semanal, grupo de soporte nacional y nombres formateados

**Backend** `f92a482`, **frontend** `10ac7bf`, bundle **`main-LWFZE67N.js`**. Sin migración.

**El bug de fondo (lo destapó una semana asignada a KDLS001).** El color de quien tiene la semana se
buscaba en un mapa construido desde `memberOptions()` —la lista de **quién se puede asignar**—, así que
cualquiera con semana asignada que no estuviera en esa lista caía al gris pese a tener color propio. Pasa
con quien no es miembro de equipo ni especialista global: `equipo-miembros` **nunca** lo devuelve. Ahora se
resuelve con `ColoresService`, que conoce a todo el mundo. Mismo arreglo en Vacaciones, donde el mapa
dependía de la lista filtrada del momento. Los dos `colorMap` quedaron muertos y se retiraron.

**Selector de asignar semana:** los ESPECIALISTAS de alcance GLOBAL van agrupados bajo **"Soporte
nacional"**, al final (aparecen en el selector de todos los equipos porque pueden cubrir cualquier semana, y
mezclados se confundían con la gente propia). El backend los marca con un campo `global` aditivo.

**Nombres:** los usuarios que el backend crea al asignar un rol copian el nombre del HelpDesk, que los
guarda **TODO EN MAYÚSCULAS**; junto a los curados chirriaban. Se normalizan **al pintar**, no en la base,
así vale también para los que se creen después y no se tocan datos de producción.

**Verificado en producción:** el selector muestra 10 del equipo y luego el grupo "Soporte nacional" con
Lina Ochoa, **Bunay Ramos Segundo Sebastian**, **Cleira Ulloa Cárdenas** y Valeria Neira ya bien escritos.
En el calendario, **Domenica sale con su lavanda** (`#766A8D` sobre el chip, contraste 4.98) — antes gris.
50 chips en pantalla, **peor contraste 4.98**. HelpDesk intacto, memoria 4567 MB.

## [2026-09-08] Borrada la tarea de prueba TA-206 (y la transferencia que la bloqueaba)

La dueña no podía eliminarla. **Causa:** la transferencia **#9** (ya RECHAZADA, "prueba traspaso"
CUENCA→PRUEBA) la referenciaba, y `transferencia_tarea_id_fkey` **no tiene `ON DELETE`** con `tarea_id`
NOT NULL → Postgres rechazaba el borrado y la UI mostraba un error genérico sin explicar la causa.

TA-206 era una tarea de prueba **sin ticket asociado** ("esta es una tarea de prueba de traspaso",
27-jul-2026), así que no chocaba con la regla de no borrar tareas nacidas del HelpDesk. Se borraron ambas
filas en una transacción, con copia previa de las dos por si hubiera que revertir.

**Para tener presente:** cualquier tarea con transferencias/solicitudes asociadas dará el mismo error
opaco. Si se repite, conviene que la UI diga *por qué* no se puede borrar en vez de fallar en seco.
