# 08 — Fase 2: ETL Firebase → PostgreSQL (implementado)

Migración idempotente de la data real del legacy (alcance Cuenca) al esquema
nacional. Se corre en **dos pasos** desacoplados; el segundo se puede repetir N
veces sin duplicar (upsert por clave natural).

## Flujo de dos pasos

```
[1] scripts/extract-firebase.sh   → GET read-only del RTDB → docs/exports/firebase-snapshot-<ts>.json
                                     y actualiza firebase-snapshot-latest.json
[2] POST /api/admin/etl/import-firebase → lee ese snapshot y hace UPSERT en Postgres local
```

- **Paso 1 (extraer):** `scripts/extract-firebase.sh`. Es un `GET` público a
  `…/fit-daily.json`; **jamás escribe Firebase**. Versiona el snapshot y mueve el
  puntero `firebase-snapshot-latest.json` (el que consume el import por defecto).
- **Paso 2 (importar):** endpoint admin en Quarkus. Idempotente: relee el snapshot
  y hace `find-or-create` por clave natural. Correrlo dos veces → 2ª corrida = todo
  `actualizados`, 0 `insertados`, conteos idénticos.
- **Export a VPS (pendiente, fuera de alcance ahora):** una vez cargado el Postgres
  local, se hará `pg_dump` → restore en el VPS. No definido en esta fase.

## Cómo correrlo y verificarlo

```bash
# Prerrequisito: Postgres local del docker-compose arriba (backend/docker-compose.yml)
cd backend
./mvnw -DskipTests package
java -jar target/quarkus-app/quarkus-run.jar        # aplica Flyway V1+V2+V3

# (opcional) refrescar snapshot desde Firebase:
../scripts/extract-firebase.sh

curl -X POST http://localhost:8080/api/admin/etl/import-firebase   # importa
curl http://localhost:8080/api/admin/etl/status                    # conteos por tabla
```

`import-firebase` acepta `?path=/ruta/otro-snapshot.json` para importar un snapshot
distinto al `latest`. Devuelve un **reporte JSON** con insertados/actualizados por
tabla, `clientesNoResueltos` y `usuariosNoResueltos` (para revisión humana).

## Resultado verificado (snapshot 2026-06-30)

420 filas cargadas: regional 1, equipo 1, board 1, usuario 12, asignacion 12,
cliente 14, sprint 4, **tarea 100**, ticket_espejo 80, ticket_nota 132,
ticket_accion 28, ticket_pendiente 15, rotacion_semanal 18, progreso 1, consulta 1.

## Mapeos y decisiones de traducción legacy → nacional

| Origen (Firebase/legacy) | Destino (nacional) | Regla |
|---|---|---|
| todo se ancla a | Regional `CUENCA` + Equipo/Board `CUENCA` | toda la data es de Cuenca |
| `users.users[]` (id local) | `usuario` (1 fila/persona) | reconciliación id local ↔ `helpdesk_user_id` vía `identidades.csv` (fallback embebido) |
| rol local `Helpdesk` | Rol `DESPACHADOR` | — |
| rol local `Supervisor` | Rol `RESPONSABLE_EQUIPO` | coherente con "Juan = Responsable de Equipo en Cuenca" |
| rol local `Consultor` | Rol `CONSULTOR` | — |
| cada usuario | 1 `asignacion` (EQUIPO Cuenca) | **default deny**: sin asignación no ve nada |
| `stories.status` `todo/in_progress/review/done` | `workflow_estado` `TODO/IN_PROGRESS/EN_CERTIFICACION/ENTREGADO` | `review`→certificación |
| `stories.{TA-*}` | `tarea` (clave `codigo`) | board Cuenca; sprint por `codigo` |
| `stories.ticket` (nº HD) | `ticket_espejo` (clave `helpdesk_ticket_id`) | solo encabezado liviano |
| `stories.assignee` (local/HD/username) | `tarea.asignado_a` | resuelto por local, luego por HD |
| `stories.client` (nº HD o slug) | `tarea.cliente_id` | slug directo; nº vía puente derivado; sino NULL + reporte |
| `hdNotes` / `hdActions` / `hdPendientes` | `ticket_nota` / `ticket_accion` / `ticket_pendiente` | clave `helpdesk_ticket_id` |
| `weeklySupport.weeks` | `rotacion_semanal` | clave `semana_inicio` |
| `progress.entries` / `queries.queries` | `progreso` / `consulta` | clave `codigo` (PR-/QR-) |
| `solNotes` (ausente) / `usuariosPizza` (ruido) | — | tolerado / ignorado |

## Puente `helpdesk_client_id` (numérico)

No se dispone del catálogo `/clients/catalog` offline, así que el número HD del
cliente se **deriva de los pares `client`/`clientName` de las propias stories**
(`5→ERCO`, `39→DOLOROSA`, `42→GUALAQUIZA`…). Se llenaron 11/14; `fininvest`,
`segura`, `puntoprestamo` quedan sin número (nunca aparecen en el board) → se
completarán con `/clients/catalog` cuando Quarkus haga de proxy del HelpDesk.

## Lo que NO se resuelve (por diseño; se reporta, no se inventa)

- **Clientes reales de OTRA regional (confirmado por la dueña):** `15`(VISANDES), `17`,
  `37`, `65`, `66`(MAGISTERIO) y `67` (real, id de cliente del HelpDesk; sus tareas son
  de "prueba" pero el cliente existe). Son ids de cliente reales del HelpDesk que NO están
  en el seed de Cuenca. **Decisión:** se dejan **pendientes** — sus tareas quedan con
  `cliente_id = NULL` y salen en `clientesNoResueltos`. Cuando se definan la(s) regional(es)
  y su equipo responsable, se registran esos clientes y se re-corre el ETL (idempotente)
  para enganchar sus tareas. Es la primera evidencia de nacionalización por datos.
- **Notas huérfanas:** 88/132 `ticket_nota` no enlazan `ticket_espejo` (son notas
  sobre tickets que no tienen tarjeta en el board). Es correcto: la nota se guarda
  igual, keyed por número de ticket.

## Artefactos de código

- Migración: `backend/src/main/resources/db/migration/V3__overlays.sql`.
- Entidades núcleo: `com.fitdesk.core.{Usuario,Cliente,Asignacion,Board,Sprint,TicketEspejo,Tarea}`.
- Entidades overlay: `com.fitdesk.overlay.{TicketNota,TicketAccion,TicketPendiente,RotacionSemanal,Progreso,Consulta}`.
- ETL: `com.fitdesk.etl.{FirebaseEtlService,EtlResource,EtlReport}`.
- Extractor read-only: `scripts/extract-firebase.sh`.
