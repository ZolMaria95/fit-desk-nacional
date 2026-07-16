# 04 — Estrategia de migración (Strangler Fig)

Objetivo: pasar de `Angular+Firebase+GitPages (Cuenca)` a `Angular+Quarkus+PostgreSQL en contenedores AWS (nacional)` **sin afectar lo que está en Firebase ni lo desplegado en GitHub Pages** hasta el corte final.

## Principio: construir en paralelo, cortar al final

Lo nuevo se levanta **al lado** de lo viejo. Firebase y GitPages siguen vivos y operando hasta que la versión nueva esté verificada. El "estrangulamiento" es progresivo; el cutover es la última fase y es reversible hasta que se decida retirar lo viejo.

```
[ Angular actual ] ──► Firebase  (PRODUCCIÓN, intacta durante toda la migración)
        │                  │
        │                  │ (solo LECTURA: export/snapshot)
        ▼                  ▼
[ Angular migrado ] ──► Quarkus ──► PostgreSQL   (NUEVO, en paralelo)
```

## Fases

### Fase 0 — Descubrimiento e inventario (no se escribe código de producción)
- Completar el checklist 🔍 de [02-arquitectura-actual.md](02-arquitectura-actual.md): tipo de Firebase, modelo de datos, auth, integración HelpDesk, deploy.
- **Snapshot de solo lectura de Firebase RTDB**: `GET https://fit-daily-ab113-default-rtdb.firebaseio.com/fit-daily.json` → un único árbol JSON con todos los nodos (`stories`, `sprints`, `team`, `hdNotes`, `hdPendientes`, `weeklySupport`, etc.). Nunca se escribe sobre Firebase.
- Registrar todo en [aprendizajes.md](../aprendizajes.md). (Buena parte del descubrimiento ya está hecho — ver [02-arquitectura-actual.md](02-arquitectura-actual.md).)
- **Entregable:** mapa de datos Firebase + mapa de endpoints HelpDesk (catálogos + tickets).

### Fase 1 — Backend y base de datos nuevos en local (Docker)
- `docker-compose.yml` con **PostgreSQL** local.
- Proyecto **Quarkus** (Java 21) nuevo. Esquema con **Flyway** derivado del [modelo conceptual](01-modelo-conceptual.md): Regional, Equipo, Cliente, Usuario, Rol, Asignacion, Board, Sprint, WorkflowEstado, TicketEspejo, Tarea, Transferencia.
- Endpoints CRUD básicos + auth federada al HelpDesk (emisión de JWT propio).
- **No se toca Firebase ni Angular todavía.**
- **Entregable:** backend levanta en local con `docker-compose up` y BD con esquema nacional.

### Fase 2 — ETL Firebase → PostgreSQL (idempotente y repetible)
- Script de migración que lee el **export de Firebase** (Fase 0) y carga Postgres mapeando el modelo viejo (Cuenca) al nacional:
  - Toda la data existente se asigna a `Regional = Cuenca` y al/los `Equipo(s)` de Cuenca.
  - Se infieren `Asignacion` a partir de los consultores y responsables actuales.
  - Se preservan IDs/relaciones de tareas, boards, sprints históricos.
- **Idempotente:** se puede correr N veces sin duplicar (upsert por clave natural). Permite re-sincronizar mientras Firebase sigue produciendo.
- **Entregable:** Postgres local con la data real migrada y verificable.
- ✅ **IMPLEMENTADO Y VERIFICADO (2026-07-01).** Dos pasos: `scripts/extract-firebase.sh` (extrae read-only) + `POST /api/admin/etl/import-firebase` (importa idempotente). 420 filas cargadas; 2ª corrida = 0 insertados. El export a VPS (`pg_dump`) queda para después. Detalle: [08-fase2-etl.md](08-fase2-etl.md).

### Fase 3 — Frontend apunta al nuevo backend (con bandera)
- Reemplazar la capa de datos de Angular (Firebase → HTTP a Quarkus) detrás de una **feature flag / environment**.
- Mantener la versión Firebase desplegada en GitPages **intacta** como producción.
- Verificación de **paridad**: misma data, mismas vistas, "Asignados a mí" funciona, board renderiza igual.
- **Entregable:** Angular migrado corriendo contra Quarkus en local/staging, sin tocar producción.
- 🚧 **SLICE 1 IMPLEMENTADO (2026-07-01):** paridad de **lectura** con bandera `dataBackend` (`ng serve -c quarkus`); backend `/api/legacy/*` sirve las formas legacy desde Postgres; escrituras a Quarkus = slice 2. Detalle: [09-fase3-frontend-quarkus.md](09-fase3-frontend-quarkus.md).

### Fase 4 — Contenerización
- `Dockerfile` frontend (build Angular + Nginx).
- `Dockerfile` backend (Quarkus JVM; evaluar native después).
- `docker-compose` completo (front + back + postgres) para correr todo local en contenedores.
- **Entregable:** stack completo levanta con un comando, todo en contenedores.
- ✅ **IMPLEMENTADO Y VERIFICADO (2026-07-02).** `docker-compose.yml` en la raíz (db + backend + frontend); backend `Dockerfile.multistage` (self-contained) y frontend `app/Dockerfile` (Nginx). Config por env vars. Las 3 imágenes construyen y corren. Detalle: [11-fase4-contenedores.md](11-fase4-contenedores.md).

### Fase 5 — Despliegue en AWS (contenedores)
- **ECR** (imágenes) → **ECS Fargate** (front, back, worker de sync) → **RDS PostgreSQL** → **ALB** → **Route53/ACM**.
- Secretos en **Secrets Manager**; logs en **CloudWatch**.
- Migrar la data (ETL Fase 2 apuntando a RDS) en una ventana controlada.
- CI/CD para build→push→deploy.
- **Entregable:** versión nacional corriendo en AWS, en paralelo a producción vieja.

### Fase 6 — Cutover y retiro
- Validación en AWS con usuarios piloto (Cuenca primero, luego incorporar otra regional como prueba de nacionalización).
- Cambio de DNS a la nueva versión.
- Periodo de observación con rollback disponible.
- **Retiro de Firebase y GitHub Pages** solo cuando la nueva versión esté estable.

## Reglas de seguridad de la migración
1. **Firebase = solo lectura** durante toda la migración. Jamás se escribe ni se borra.
2. **GitPages = producción intacta** hasta el cutover. La versión nueva se despliega en paralelo, nunca encima.
3. **ETL idempotente** → se puede repetir para capturar deltas que Firebase siga generando.
4. **Cada fase es verificable y reversible** antes de pasar a la siguiente.
5. **Nacionalización por datos:** incorporar una nueva regional/equipo/cliente NO debe requerir cambios de código ni redeploy.

## Orden recomendado de ejecución
`Fase 0 → 1 → 2 → 3 → 4 → 5 → 6`. No saltar la Fase 0: sin el modelo real de Firebase, el ETL (Fase 2) se diseña a ciegas.
