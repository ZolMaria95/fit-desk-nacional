# CLAUDE.md — Proyecto fitscrum / Fit-Daily (nacionalización)

Guía para cualquier sesión de Claude Code que trabaje en este workspace.

## Qué es este workspace

Es el **workspace de arquitectura y planeación** para migrar la app **fitscrum** (alias *Fit-Daily*) de su versión actual (regional, Cuenca) a una versión **nacional, matricial y desplegable en contenedores**.

El **código real** del proyecto va en la carpeta [`app/`](app/) (Angular 22 + Firebase RTDB + API HelpDesk + backend FastAPI/Mongo huérfano). La dueña del proyecto pega/actualiza ahí su proyecto en su estado actual. Aquí viven además: el modelo conceptual validado, la estrategia de migración, el agente ejecutor, las bitácoras y el documento para la dueña del proyecto. **Empezar por [`EMPEZAR-AQUI.md`](EMPEZAR-AQUI.md).**

## La app en una frase

Gestor Scrum/Kanban que orquesta trabajo sobre tickets de un **HelpDesk externo** (no es dueña de los tickets, solo los consulta). Clientes = COAC/cooperativas financieras. Hoy hardcodeada a Cuenca; se quiere llevar a nivel nacional.

## Arquitectura: de dónde a dónde

| | ACTUAL | OBJETIVO |
|---|---|---|
| Frontend | Angular (limitado a Cuenca) | Angular (multi-regional, configurable) |
| Datos | **Firebase** | **PostgreSQL** (Docker local → AWS RDS) |
| Backend | — (Angular contra Firebase) | **Quarkus** (Java 21) |
| Deploy | **GitHub Pages** + Firebase (free tier) | **Contenedores en AWS** (ECS Fargate + ECR) |

Regla de oro de la migración: **NO afectar lo que está en Firebase ni lo desplegado en GitHub Pages** mientras se construye lo nuevo en paralelo (patrón Strangler Fig). El corte (cutover) es la última fase.

## Base de conocimiento (leer antes de trabajar)

| Documento | Contenido |
|---|---|
| [docs/knowledge/01-modelo-conceptual.md](docs/knowledge/01-modelo-conceptual.md) | Modelo de dominio validado (entidades, roles, permisos, visibilidad) |
| [docs/knowledge/02-arquitectura-actual.md](docs/knowledge/02-arquitectura-actual.md) | Estado actual + checklist de descubrimiento del código real |
| [docs/knowledge/03-arquitectura-objetivo.md](docs/knowledge/03-arquitectura-objetivo.md) | Arquitectura destino (Quarkus + Postgres + Docker + AWS) |
| [docs/knowledge/04-estrategia-migracion.md](docs/knowledge/04-estrategia-migracion.md) | Plan de migración por fases |
| [docs/decisiones.md](docs/decisiones.md) | Bitácora de decisiones (ADR-lite) |
| [docs/aprendizajes.md](docs/aprendizajes.md) | Bitácora de aprendizajes |

El agente ejecutor está en [.claude/agents/fitscrum-migrator.md](.claude/agents/fitscrum-migrator.md).

## ⚠️ Convención de auto-guardado de conocimiento (OBLIGATORIA)

Cada vez que en una sesión se **aprenda, decida o descubra** algo nuevo sobre el proyecto, se debe persistir en el workspace ANTES de cerrar el turno:

1. **Una decisión** (de arquitectura, alcance, tecnología) → agregar una entrada en [docs/decisiones.md](docs/decisiones.md) con fecha, contexto y justificación.
2. **Un aprendizaje** (un hecho del código real, una restricción del HelpDesk/Firebase, un dato del negocio) → agregar una entrada en [docs/aprendizajes.md](docs/aprendizajes.md) con fecha y fuente.
3. **Un cambio en el modelo o la estrategia** → actualizar el `.md` de `docs/knowledge/` correspondiente.

No esperar a que el usuario lo pida. El objetivo es que el conocimiento del proyecto viva en estos archivos y sobreviva entre sesiones y entre equipos.
