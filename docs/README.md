# Base de conocimiento — fitscrum nacional

Índice de la documentación de arquitectura y migración. Empezar por [../CLAUDE.md](../CLAUDE.md).

## Conocimiento (`knowledge/`)
1. [Modelo conceptual](knowledge/01-modelo-conceptual.md) — dominio, entidades, roles, permisos, visibilidad.
2. [Arquitectura actual](knowledge/02-arquitectura-actual.md) — estado actual + checklist de descubrimiento.
3. [Arquitectura objetivo](knowledge/03-arquitectura-objetivo.md) — destino contenerizado en AWS.
4. [Estrategia de migración](knowledge/04-estrategia-migracion.md) — plan por fases (Strangler Fig).
5. [Menú y panel de administración](knowledge/05-menu-y-administracion.md) — navegación y opciones de admin.

## Bitácoras (vivas, se actualizan cada sesión)
- [Decisiones](decisiones.md) — registro de decisiones con justificación.
- [Aprendizajes](aprendizajes.md) — hechos descubiertos sobre código real, HelpDesk, Firebase, negocio.

## Para la dueña del proyecto
- **[FitDesk - Plan de evolucion (para la duena del proyecto).docx](FitDesk%20-%20Plan%20de%20evolucion%20(para%20la%20duena%20del%20proyecto).docx)** — documento Word (entregable) con narrativa no técnica + los 3 esquemas.
- [documento-para-companera.md](documento-para-companera.md) — misma narrativa en Markdown (fuente).
- Diagramas (`diagrams/`): [arquitectura actual](diagrams/arquitectura-actual.png), [arquitectura nueva](diagrams/arquitectura-nueva.png), [modelo de tablas](diagrams/modelo-tablas.png), [menú de la app](diagrams/menu-app.png), bocetos [lista de asignaciones](diagrams/boceto-asignaciones-lista.png) y [formulario nueva asignación](diagrams/boceto-asignaciones-form.png).
- [build_word.py](build_word.py) — script que regenera el Word y los diagramas (`/usr/bin/python3 docs/build_word.py`).

## Agente
- [fitscrum-migrator](../.claude/agents/fitscrum-migrator.md) — agente que ejecuta la migración sobre el código real (`../app/`).
