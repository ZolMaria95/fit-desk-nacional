# Notificaciones push para las alertas de FitDesk

> ## ⚠️ SUPERSEDED (2026-09-15): no se implementó push real
> Lo que se construyó en su lugar es una **campanita con buzón persistente en Postgres** (tabla
> `notificacion`, migración V21) — sin Service Worker, sin VAPID, sin nada de la arquitectura de
> este documento. Solo avisa con la app abierta, igual que el popup ya existente. Ver la decisión
> ["Campanita: buzón de notificaciones persistente (sin push real)"](../decisiones.md) del
> 2026-09-15. Este documento queda como **referencia histórica** del diseño de push real: si algún
> día se retoma, sería una capa aparte encima del buzón actual, no un reemplazo. Nada de lo de abajo
> está implementado.

> ## ⛔ NADA SE DESPLIEGA SIN TU INDICACIÓN
> Se implementa y verifica en local. No se sube a GitLab ni se toca AWS hasta que lo digas.

## Contexto

Hoy las tres alertas (reunión, recordatorio, ticket nuevo/modificado) las calcula **el navegador**, con un
`setInterval` de 30 s en [layout.ts:165-170](app/src/app/layout/layout.ts#L165-L170). Consecuencia: **solo
saltan con FitDesk abierto**. Está reconocido como limitación tres veces en la propia documentación del
proyecto, p. ej. `docs/decisiones.md:831`: *"la alerta solo salta con FitDesk abierto… no hay
push/service-worker"*. Si cierras la app, te pierdes la reunión.

El objetivo es que el **servidor** detecte cuándo toca avisar y mande una notificación real al escritorio,
**aunque FitDesk esté cerrado**.

Dos cosas verificadas que hacen esto viable hoy:
- **El service worker ya está vivo en producción**: `https://fitdesk.fit-bank.com/ngsw-worker.js` responde
  200, `application/javascript`, 83 909 bytes. El de Angular **ya trae soporte de push nativo** → no hace
  falta escribir un service worker propio.
- **El servidor de AWS alcanza los servicios de push**: `fcm.googleapis.com` → 404 y
  `updates.push.services.mozilla.com` → 406 (respuestas reales, no bloqueo). Y **no pasan por el proxy de
  IT**, así que el problema conocido de caché de `/api/` no afecta al envío.

## Decisiones tomadas

| | |
|---|---|
| Alcance | **Push real desde el servidor** (llega con la app cerrada) |
| Alertas con push | **Reunión y recordatorio.** Tickets se queda como hoy (ver abajo) |
| Popup | **Se mantiene tal cual.** Notificación y popup son canales independientes |
| Reuniones | Solo **asignado + responsable de ESE equipo** (el popup no cambia) |
| Horario | Franja **configurable por persona**, por defecto 07:00–21:00 |

### Por qué tickets se queda fuera

El backend **no tiene credenciales propias del HelpDesk**: solo reenvía el `Authorization` del navegador
([HelpdeskProxyResource.java:35](backend/src/main/java/com/fitdesk/api/HelpdeskProxyResource.java#L35)), y
el propio código lo dice en
[TicketSyncService.java:26-29](backend/src/main/java/com/fitdesk/sync/TicketSyncService.java#L26-L29):
*"usa un Bearer del HelpDesk… hoy se pasa en el disparo (el token del usuario logueado)"*. **Con la app
cerrada no hay token**, así que el servidor no puede preguntar por novedades. Requeriría una cuenta de
servicio de IT/Mantis. Reunión y recordatorio salen 100 % de Postgres, por eso sí se pueden.

El diseño deja el hueco preparado: cuando llegue esa cuenta, la alerta de tickets se enchufa **sin tocar
nada de lo anterior** (§ "Lo que queda preparado").

### Sobre el horario configurable

Con tickets fuera, la franja pierde casi todo su propósito: quien avisa a deshora es el cliente escribiendo
en un ticket. Reuniones y recordatorios tienen **hora elegida por la persona**, y silenciarlos sería lo
contrario de lo que se pide. Así que se implementa como pediste —preferencia por persona— pero aplicada al
canal push **con las reuniones exentas**: un recordatorio que pusiste para las 22:00 fuera de tu franja no
te suena (lo ves igual en el popup al abrir), y una reunión siempre avisa. Cuando entren los tickets, la
franja los cubre automáticamente. Si prefieres otra combinación, es un `if`.

## Arquitectura

```
@Scheduled (Quarkus, cada 60 s)  ← hoy el backend NO tiene nada programado
  └─ AlertaScheduler
       ├─ recordatorios → AlarmaService (Postgres)   ← misma regla que /hdPendientes-visibles
       └─ reuniones     → tarea tipo REUNION (Postgres)
              ↓  ¿ya se le avisó? → push_alerta_enviada
         WebPushSender
              ├─ cifra   (ECDH P-256 + HKDF-SHA256 + AES-128-GCM · RFC 8291/8188)
              ├─ firma   (JWT ES256 · RFC 8292)
              └─ POST a fcm.googleapis.com / updates.push.services.mozilla.com
                     ↓  (canal propio del navegador: funciona con Chrome CERRADO)
              ngsw-worker.js  →  evento 'push'  →  showNotification(...)
                     ↓  clic
              abre/enfoca FitDesk en la pantalla correcta
```

El popup actual queda **intacto**: `checkReminders()`, `reunionesDue()` y `checkNuevosTickets()` no se
tocan, con su dedup en `localStorage`. El push lleva su propio dedup en Postgres. Nunca se consultan entre
sí → "los dos siempre", como pediste.

**Contrato del payload (obligatorio).** El service worker de Angular descarta en silencio cualquier push
que no tenga la forma `{"notification":{"title":…}}`. Ejemplo:

```json
{"notification":{
  "title":"Recordatorio: #33710",
  "body":"COAC LA DOLOROSA DURAN — Revisar cierre contable",
  "icon":"/icon-192.png",
  "tag":"fd-pend-33710",
  "data":{"tipo":"pendiente","tickets":"33710",
          "onActionClick":{"default":{"operation":"focusLastFocusedOrOpen",
                                      "url":"#/pendientes?resaltar=33710"}}}}}
```

`icon-192.png` **ya existe** en `app/public/`. No se añade ningún asset nuevo: el despliegue del front
sincroniza **solo `src/`**, así que todo lo nuevo del frontend cabe ahí a propósito.

## Backend

### Criptografía: a mano con el JDK 21, sin dependencias nuevas

La única librería Java madura (`nl.martijndwars:web-push`) arrastra **BouncyCastle (~8 MB)** + `jose4j` +
otro cliente HTTP. El backend corre con `-Xmx768m` y `mem_limit` 1200 MB **en la misma máquina que el
MantisBT del HelpDesk**: si FitDesk agota la RAM, tumba el HelpDesk. Y el backend **se compila en el
servidor** (CentOS 7), donde cada dependencia nueva es una descarga más que puede fallar.

El JDK 21 tiene todo: `KeyAgreement("ECDH")` + `secp256r1`, `Mac("HmacSHA256")` para HKDF,
`Cipher("AES/GCM/NoPadding")`, y sobre todo **`Signature.getInstance("SHA256withECDSAinP1363Format")`**,
que devuelve la firma ya en R‖S crudo (64 bytes) — **elimina la conversión DER→JOSE, que es donde falla la
mayoría de las implementaciones caseras de VAPID**.

Lo que hace el riesgo aceptable: **los RFC traen vectores de prueba completos** (RFC 8291 §5 y RFC 8188
§3.1, con claves, salt y cuerpo cifrado esperado byte a byte). Se verifica la criptografía entera con un
JUnit, sin red y sin navegador. *Válvula de escape: si el vector no cuadra tras un par de horas, se para y
se reevalúa la librería aceptando BouncyCastle.*

Archivos nuevos en `backend/src/main/java/com/fitdesk/push/`:
- `WebPushCrypto.java` — estático puro, `cifrar(p256dh, auth, texto) → byte[]`. Sin CDI ni estado.
- `VapidFirma.java` — `cabecera(endpoint) → "vapid t=<jwt>, k=<pub>"`.
- `WebPushSender.java` — `@ApplicationScoped`; copia el patrón de `HttpClient` de
  [HelpdeskProxyResource.java:63-66](backend/src/main/java/com/fitdesk/api/HelpdeskProxyResource.java#L63-L66)
  (HTTP/1.1 + `HttpRetry`, por la trampa ya conocida del keep-alive rancio).
- Tests: `WebPushCryptoTest` (los dos vectores RFC), `VapidFirmaTest`, `VapidKeygenTest` (`@Disabled`, para
  generar el par de claves una vez).

Única dependencia nueva en el `pom.xml`: **`io.quarkus:quarkus-scheduler`**. No toca
`quarkus.http.auth.proactive=false`, que está puesto a propósito.

### Migración V20 (la última es V19)

`backend/src/main/resources/db/migration/V20__push_notificaciones.sql`:

- **`push_suscripcion`** — `usuario_id`, `endpoint`, `p256dh`, `auth`, `user_agent`, `activa`, `fallos`,
  `ultimo_error`, `creada_en`, `ultima_ok_en`.
  ⭐ **Unicidad por `endpoint` SOLO**, nunca por `(usuario, endpoint)`: el endpoint *es* la identidad del
  navegador. Si otra persona inicia sesión en el mismo equipo y activa notificaciones, la fila se
  **reasigna**; con clave compuesta habría dos filas y ese dispositivo recibiría los avisos de ambos.
- **`push_alerta_enviada`** — `(usuario_id, clave)` único. Claves `pend|<ticket>|<hid>|<YYYY-MM-DD>` y
  `reunion|<tareaId>`, misma semántica que `fit-daily_alerted` del navegador.
  **No se reutiliza `ticket_pendiente.last_alerted`**: el PUT completo de `/hdPendientes` desde el navegador
  lo pisa ([LegacyWriteService.java:470](backend/src/main/java/com/fitdesk/legacy/LegacyWriteService.java#L470)),
  así que borraría lo que escriba el scheduler.
- **`usuario.push_desde` / `push_hasta`** — la franja horaria por persona (default 07:00–21:00).
- **`ticket_pendiente.paused`** y **`.nota`** — ver abajo.

### Dos bugs vivos que esto arregla de paso

1. **El botón "Pausar" de un recordatorio hoy no hace nada.**
   [pendientes.ts:120-122](app/src/app/features/pendientes/pendientes.ts#L120-L122) pausa en el mapa local y
   acto seguido relee `/hdPendientes-visibles`, un endpoint que **nunca devuelve `paused`** (no existe la
   columna). El estado se pisa al instante. Sin arreglarlo, el push notificaría recordatorios que la persona
   cree pausados.
2. **La nota del recordatorio se descarta.** El diálogo la captura (300 chars) y `putHdPendientes` la tira.
   El popup ya la pinta, y es justo lo que mejor funciona como cuerpo de la notificación.

Ambas requieren añadir la columna, devolverla en `pendienteBase()` y persistirla en `putHdPendientes()`.

### Scheduler y reglas

`backend/src/main/java/com/fitdesk/alertas/AlertaScheduler.java`, `@Scheduled(every="60s",
concurrentExecution=SKIP)` + una purga nocturna de `push_alerta_enviada` (>30 días).

- **Recordatorios** — la regla de a quién le alarma un pendiente **ya existe en el backend**:
  [LegacyReadResource.java:406-455](backend/src/main/java/com/fitdesk/api/LegacyReadResource.java#L406-L455).
  Se extrae tal cual a `AlarmaService` y la reutilizan el endpoint y el scheduler. Dispara si hay `dueDate`,
  `paused = false` y `dueDate+dueTime <= ahora`. Si a alguien le tocan 3 en el mismo tick → **una sola
  notificación** con los tres tickets, igual que hace el popup.
- **Reuniones** — `tarea` con `tipo='REUNION'` e `inicio`, ventana `inicio - (recordatorio_min ?? 20) <=
  ahora < inicio` (copia de [layout.ts:330-337](app/src/app/layout/layout.ts#L330-L337)). Destinatarios:
  `asignado_a` + responsables del equipo del board (regla estricta, la que elegiste). Si hay `link`, se añade
  la acción "Unirse", réplica del botón del diálogo actual.

> **⚠️ Zona horaria — el error silencioso más caro de este plan.** `tarea.inicio` es texto local desnudo
> (`"YYYY-MM-DDThh:mm"`) y `due_date`/`due_time` también son locales, pero **el contenedor corre en UTC**.
> Sin `ZoneId.of("America/Guayaquil")` explícito en todo el cálculo, **cada alerta se dispara 5 horas fuera
> de hora** y nadie sabría por qué. Nunca `LocalDate.now()` a secas.

### Endpoints nuevos — `/api/notificaciones/*`

Estilo de [FeriadoResource.java](backend/src/main/java/com/fitdesk/api/FeriadoResource.java): `@Transactional`
solo en escrituras, `JsonNode` crudo de entrada, `LinkedHashMap` de salida, helpers `bad()`/`forbidden()`.

| Ruta | Qué hace |
|---|---|
| `GET /clave-publica` | `{habilitado, clavePublica}` — sin actor |
| `POST /suscripciones` | Alta/upsert por `endpoint` (`X-Actor-Hid`) |
| `DELETE /suscripciones` | Baja por `endpoint` |
| `PUT /horario` | Franja de la persona |
| `POST /prueba` | Manda una notificación de prueba al actor |

**La clave pública VAPID viaja por el backend, no por `environment.*.ts`** — y esto no es un rodeo: el
archivo `environment.onprem.ts` y la config `onprem` de `angular.json` **viven solo en el repo de GitLab**,
no en este workspace, así que meterla ahí obligaría a editar algo que no está aquí. Además el flag
`habilitado` permite **ocultar el interruptor** donde no hay claves configuradas, en vez de reventar.

> **Regla dura: la clave VAPID se genera UNA vez y no se rota nunca.** Rotarla invalida todas las
> suscripciones existentes (el navegador la deja grabada; el push service devolvería 403).

Claves y franja por defecto van al **`.env` de AWS**, donde ya vive `DB_PASSWORD`. Nunca al repo.

### Suscripciones muertas

`410`/`404` (caducada) y `403` (clave no coincide) → `activa = false`, fila conservada para diagnóstico.
`429` → respetar `Retry-After`, **no** desactivar. `5xx`/timeout → contar fallos, desactivar solo a los 10
seguidos. `413` → log y truncar. Nunca borrar una fila desde el scheduler: si fue un problema de red, se
recupera sola.

## Frontend

Todo cabe en `app/src/`. **Cero dependencias nuevas** (`@angular/service-worker` ya está), cero assets
nuevos, cero cambios de `angular.json` que deban desplegarse.

| Archivo | Cambio |
|---|---|
| `app/src/app/core/services/push.service.ts` | **nuevo** — espejo de `theme.service.ts` |
| `app/src/app/features/perfil/perfil-dialog.html` / `.ts` | interruptor + franja horaria + "enviar una de prueba" |
| `app/src/app/layout/layout.ts` | `notificationClicks` + `reconciliar()`. **La lógica de alertas NO se toca** |
| `app/docs/contrato-api.md` + `backend/docs/contrato-api.md` | sección "Notificaciones" |

- **El interruptor va en el diálogo de perfil**, justo debajo de "Tema oscuro" y con el mismo markup
  (`.pf-row-toggle`). El `(change)` del toggle **es** un gesto del usuario, que es lo que Chrome exige para
  mostrar el prompt de permiso. Nunca pedirlo al arrancar: eso es justo lo que provoca que la gente lo
  bloquee, y en Chrome `denied` es pegajoso (el prompt no vuelve a salir).
- **Diferencia conceptual que la UI debe decir**: el tema es una preferencia **de la persona**; las
  notificaciones son **de este dispositivo** (una suscripción pertenece a una instalación del navegador).
  Activarlas en el portátil no las activa en el teléfono.
- **Botón "Enviar una de prueba"**: no es decorativo. Es la única forma de que alguien confirme por sí
  mismo que le llegan, y el único modo práctico de diagnosticar en producción sin su máquina delante.
- **Clic en la notificación, dos caminos**: si la app estaba **cerrada**, no hay nadie escuchando → la URL
  del payload tiene que bastar (`#/pendientes?resaltar=…`, que
  [pendientes.ts:51-58](app/src/app/features/pendientes/pendientes.ts#L51-L58) **ya sabe leer**). Si estaba
  **abierta**, `swPush.notificationClicks` reutiliza exactamente el camino del popup.
- **Auto-curación**: el navegador rota suscripciones, y si lo hace con la app cerrada el aviso
  `pushsubscriptionchange` **se pierde para siempre** y la persona deja de recibir notificaciones en
  silencio. Red de seguridad: al arrancar el Layout, `reconciliar()` relee la suscripción y la re-registra
  (idempotente por `endpoint`), enganchado donde ya se cargan las demás preferencias.

## Riesgos

| Riesgo | Qué se hace |
|---|---|
| **Ruido**: popup + notificación siempre (lo elegiste) | `tag` por entidad + `renotify:false` → las repeticiones **sustituyen** en vez de apilarse; agrupar por persona y tick; `requireInteraction:false`; apagado por defecto y per-dispositivo |
| **Zona horaria** UTC vs UTC−5 | `ZoneId` explícito por config + test con reloj fijo |
| **Regresión en `/hdPendientes-visibles`** al extraer `AlarmaService` — alimenta el popup actual | Diff del JSON antes/después contra la misma BD, para ADMIN, responsable y consultor. Solo deben aparecer `paused` y `nota` |
| **Permiso denegado** | Solo se pide desde el toggle; si es `denied`, toggle deshabilitado + instrucción del candado |
| **iOS/Safari** | Solo funciona con la app **añadida a la pantalla de inicio** (16.4+); el manifest ya cumple. Se detecta iOS-en-pestaña y se muestra el aviso en vez de un toggle que fallaría. ⚠️ La conectividad a `web.push.apple.com` **no está verificada** (solo FCM y Mozilla) |
| **Proxy de IT que cachea `/api/`** | El envío no pasa por ahí. La clave pública es estática (el caché ayuda, pero prohíbe rotarla). Ventaja neta: los destinatarios salen de Postgres directo, **sin roles cacheados** |
| **Más de una instancia del backend** duplicaría envíos | Hoy es un solo contenedor; `SKIP` cubre el solapamiento. Documentar que el scheduler **asume una sola instancia** |
| **`X-Actor-Hid` no es un límite criptográfico** | Coherente con la postura actual del proyecto y detrás de VPN. La unicidad por `endpoint` es lo que impide la fuga real (un dispositivo con avisos de dos personas) |

## Verificación en local

Tres obstáculos y su solución: Web Push exige contexto seguro — **`http://localhost` lo es**, no hace falta
HTTPS; la config `quarkus` de `angular.json` **no emite el service worker** y además `isDevMode()` lo
deshabilita, así que **con `ng serve` es imposible probar push**; y hay cross-origin entre bundle y backend.

Se añade una configuración de build **`pwa-local`** (environment `quarkus` + `serviceWorker` + sin
`optimization:false`) y `localhost:4300` al CORS de dev. **Nunca llega a producción**: el despliegue
sincroniza solo `src/` y construye con `-c onprem` desde GitLab.

```bash
cd backend && docker compose up -d db && ./mvnw quarkus:dev     # Flyway 19 → 20
cd app && npx ng build -c pwa-local && npx http-server dist/app/browser -p 4300 -c-1
```

1. **Criptografía** — `./mvnw test`: el vector de RFC 8291 §5 reproducido byte a byte. *Es el guardián: si
   pasa, el cifrado es correcto.* Sin red ni navegador.
2. **Esquema** — Flyway 19→20. Y la regresión del bug vivo: **pausar un recordatorio, recargar, sigue
   pausado** (hoy no).
3. **Suscripción** — Playwright: login real → Mi perfil → toggle. Asserts: hay `PushSubscription` en el
   navegador, hay fila en `push_suscripcion`, consola sin errores.
4. **Notificación real** — `POST /prueba` y **el banner aparece en el escritorio**. ⚠️ Playwright no puede
   aseverar un banner del sistema operativo: esa parte es visual, una vez. Lo automatizable es que el push
   service devolvió 201.
5. **⭐ App CERRADA (el requisito de verdad)** — sembrar una reunión a `ahora+8 min` con
   `recordatorio_min=10` y un recordatorio vencido hace 1 min. **Cerrar Chrome entero.** La notificación
   debe llegar igual.
6. **El popup sigue intacto** — reabrir: el popup vuelve a salir (dedup independiente) → confirma "los dos".
7. **Dedup** — 5 ticks seguidos, una sola notificación por alerta.
8. **Suscripción muerta** — corromper el endpoint → 404 → `activa=false`; recargar la app → `reconciliar()`
   la re-registra sola.
9. **Zona horaria** — backend con `TZ=UTC` (como AWS): la reunión de las 09:30 dispara a las 09:10 **hora de
   Ecuador**, no a las 04:10.
10. **Pantalla pequeña** — 360×640 y 390×844: la fila del toggle y la franja horaria no desbordan.

## Pasos

| # | Qué | Cómo se comprueba |
|---|---|---|
| 1 | Criptografía aislada (`WebPushCrypto`, `VapidFirma`, tests con vectores) | `./mvnw test` verde. **Es el paso de mayor riesgo y va primero**: si falla, se decide la librería antes de construir nada encima |
| 2 | V20 + entidades + `WebPushSender` + `NotificacionResource` + `paused`/`nota` | Flyway 19→20; `curl` da de alta/baja; **el botón Pausar por fin persiste** |
| 3 | Frontend: `push.service.ts` + interruptor + `pwa-local` | Verificación 3, 4 y 10. **La primera notificación real** |
| 4 | `AlarmaService` (extracción) + `AlertaScheduler` | Verificación 5, 6, 7, 9 + diff de regresión del endpoint |
| 5 | Clic en la notificación (payload + `notificationClicks`) | Los dos caminos: app abierta y app cerrada |
| 6 | Franja horaria por persona | Recordatorio fuera de franja: no llega push, sí sale el popup |
| 7 | Contrato en los dos repos + `docs/decisiones.md` + env vars en `docs/knowledge/16` | — |

## Lo que queda preparado (sin implementar)

**Alerta de tickets por push.** Cuando haya cuenta de servicio del HelpDesk, se añade sin tocar nada de lo
anterior: un `NovedadesTicketsService` que **invierte el bucle** —hoy cada navegador pregunta "¿qué hay para
mí?"; el servidor preguntaría **una vez** "¿qué cambió?" (`limit=100`, el tope del API) y repartiría en
memoria—. Coste: `1 + k` llamadas por ciclo, con `k` = tickets distintos con actividad, **independiente del
número de usuarios**. Hoy un solo navegador abierto hace ~120 llamadas/hora, y hay hasta 19 personas: el
scheduler sería **entre 10× y 100× más barato que el estado actual**.

Al pedir la cuenta hay que verificar dos cosas antes de escribir código: que sea **distinta de la de
cualquier persona** (el login usa `force_logout:'true'` y la expulsaría de su sesión) y que **vea los
tickets de todos los clientes**.

## Despliegue (NO ejecutar)

Cuando des luz verde: env vars al `.env` de AWS → **backend primero** (Flyway aplica la V20) → frontend
después, construido en el Mac con `--platform linux/amd64` + `docker save`/`load`, porque el kernel 3.10 del
servidor hace SIGSEGV con `node:22`.
