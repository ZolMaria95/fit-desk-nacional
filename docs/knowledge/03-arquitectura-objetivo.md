# 03 — Arquitectura objetivo

Destino: app **nacional, matricial, contenerizada y desplegada en AWS**. Sin free tiers (se retira Firebase y GitHub Pages).

## Diagrama destino

```
┌─────────────────────────────────────────── AWS ───────────────────────────────────────────┐
│                                                                                             │
│   Route53 → CloudFront/ALB                                                                  │
│        │                                                                                    │
│        ├──► [ Contenedor Frontend ]  Angular build servido por Nginx        (ECS Fargate)   │
│        │                                                                                    │
│        └──► [ Contenedor Backend  ]  Quarkus (Java 21) API REST/JWT          (ECS Fargate)   │
│                    │                                                                         │
│                    ├──► [ RDS PostgreSQL ]  datos propios de la app                          │
│                    │                                                                         │
│                    └──► [ Sync Worker ] (Quarkus scheduler) ──► API HelpDesk externo         │
│                                                                                             │
│   ECR (imágenes)   ·   Secrets Manager (credenciales)   ·   CloudWatch (logs/métricas)      │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Componentes

### Frontend — Angular (evolución del actual)
- Se conserva el código Angular; se **reemplaza la capa de datos** (Firebase → cliente HTTP contra Quarkus).
- Se **parametriza el alcance** (lo que hoy está quemado a Cuenca pasa a venir del backend según las `Asignacion` del usuario).
- Build estático servido por **Nginx** dentro de un contenedor (en vez de GitHub Pages).

### Backend — Quarkus (Java 21) [nuevo]
- API REST + JWT. Autenticación **federada contra el HelpDesk**; autorización propia (Rol×Alcance×Vigencia).
- Hibernate ORM con Panache sobre PostgreSQL. Migraciones con **Flyway**.
- Módulos: `auth` (federación + emisión JWT propio), `core` (entidades del modelo conceptual), `tickets` (sync + espejo del HelpDesk), `board` (Scrum/Kanban), `admin` (ABM de equipos/clientes/regionales/asignaciones).
- Empaquetado: JVM (rápido de construir) o **native GraalVM** (arranque/footprint menor en Fargate). Empezar JVM, evaluar native después.

### Persistencia — PostgreSQL
- **Local:** contenedor Postgres vía `docker-compose` (desarrollo).
- **Producción:** **AWS RDS PostgreSQL** (Multi-AZ recomendado para producción nacional).
- Esquema derivado del [modelo conceptual](01-modelo-conceptual.md); versionado con Flyway.

### Sync con el HelpDesk
- **Quarkus absorbe el proxy del HelpDesk** (reemplaza al Cloudflare Worker actual) y resuelve CORS server-side. El frontend ya **no** habla directo con el HelpDesk ni con Firebase: habla **solo con Quarkus**.
- Worker programado (Quarkus scheduler) que mantiene un **espejo de encabezado liviano** de tickets por **delta incremental** (orden por `modified_date` ya existe en el API; webhook si lo ofrece — 🔍 confirmar). Solo metadatos (número, cliente, estado, prioridad, fechas, asunto, asignado); **sin conversación ni adjuntos**.
- **Conversación y adjuntos (imágenes, zips) SIEMPRE en vivo:** Quarkus los hace de proxy/streaming desde el HelpDesk bajo demanda (no se almacenan). Reproduce el comportamiento actual (`fetchMessages`, `attachmentUrl`).
- Federación de identidad: Quarkus delega el login al HelpDesk (`/auth/login` + refresh) y emite su propio JWT con el alcance del usuario.
- La app trabaja sobre el espejo; resiliente a caídas del HelpDesk. Nota: las escrituras del API HelpDesk son `x-www-form-urlencoded`.

## Infraestructura AWS (propuesta)

| Servicio | Uso | Justificación |
|---|---|---|
| **ECR** | Registro de imágenes Docker | Estándar para contenedores en AWS |
| **ECS Fargate** | Ejecutar contenedores front/back/worker | Sin gestionar servidores; más simple que EKS para este tamaño |
| **RDS PostgreSQL** | Base de datos gestionada | Backups, Multi-AZ, sin operar el motor |
| **ALB** | Balanceo + routing HTTP | Enruta a front/back, health checks |
| **Secrets Manager** | Credenciales (DB, HelpDesk, JWT) | No hardcodear secretos |
| **CloudWatch** | Logs y métricas | Observabilidad |
| **Route53 + ACM** | DNS + TLS | Dominio propio con HTTPS |

> Recomendación: **ECS Fargate**, no EKS. Kubernetes es sobre-ingeniería para el tamaño actual; Fargate da contenedores gestionados sin operar un clúster. Revisar si crece mucho.

## CI/CD (propuesta)
- Build de imágenes (front Nginx, back Quarkus) → push a ECR → deploy a ECS.
- Migraciones Flyway aplicadas en el arranque del backend o como tarea previa.
- Pipeline: GitHub Actions o AWS CodePipeline (🔍 definir según dónde viva el repo).

## Principios no negociables (heredados del modelo)
- Identidad federada al HelpDesk; autorización propia.
- Tickets cacheados (espejo), nunca consulta en vivo masiva.
- Configuración del alcance nacional en datos/runtime, **nunca** en código.
