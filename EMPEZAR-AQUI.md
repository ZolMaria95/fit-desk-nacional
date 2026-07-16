# 🚀 Empezar la migración de FitDesk

Guía para arrancar la migración en tu computador. No necesitas ser experta en arquitectura: el plan y un agente que lo ejecuta ya están listos en este directorio.

## ¿Qué es este directorio?

Es el **paquete de migración de FitDesk** (antes Fit-Daily / fitscrum). Contiene:
- `docs/` — el plan, el modelo y las decisiones (qué se va a hacer y por qué).
- `.claude/agents/fitscrum-migrator.md` — el **agente** que ejecuta la migración paso a paso.
- `app/` — **aquí va tu proyecto** (ver Paso 2).
- `docs/FitDesk - Plan de evolucion (...).docx` — el documento de evaluación (el que revisaste).

> Regla de oro: **nada de lo que funciona hoy se apaga.** Firebase se lee pero **nunca** se modifica, y el despliegue actual (GitHub Pages) sigue intacto hasta el final. La versión nueva se construye **al lado**.

---

## Paso 1 — Instalar lo necesario (una sola vez)

| Herramienta | Para qué | Cómo (macOS con Homebrew) |
|---|---|---|
| **Docker Desktop** | Levantar la base de datos PostgreSQL y los contenedores | Descargar de docker.com e instalar; **dejarlo abierto/corriendo** |
| **Java 21** | El nuevo backend (Quarkus) | `brew install --cask temurin@21` |
| **Node 20+** | El frontend Angular | `brew install node` (o ya lo tienes) |
| **Git** | Control de versiones | Suele venir con macOS |

Después de instalar Java 21, déjalo como predeterminado (en `~/.zshrc`):
```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
```

> En Windows es lo mismo pero con los instaladores de Docker Desktop, Temurin 21 y Node.

**No estás segura de si quedó bien instalado?** No pasa nada: en el Paso 3 el agente puede revisarlo por ti.

---

## Paso 2 — Pegar tu proyecto en `app/`

Copia tu proyecto **en su estado actual** dentro de la carpeta **`app/`** de este directorio (reemplazando lo que haya). Debe quedar así:

```
fitscrum/
├─ app/            ← tu proyecto (package.json, src/, etc.)
├─ docs/
├─ .claude/
└─ EMPEZAR-AQUI.md
```

---

## Paso 3 — Arrancar la migración con el agente

1. Abre **Claude Code** dentro de esta carpeta (`fitscrum/`).
2. Dale este mensaje para empezar:

> Lee `docs/` y el agente `.claude/agents/fitscrum-migrator.md`. Mi proyecto actual está en `app/`. Antes de nada, **verifica que tengo las herramientas** (Docker corriendo, Java 21, Node). Luego empecemos la migración por la **Fase 0** (export de Firebase, solo lectura) y la **Fase 1** (Postgres en Docker + esquema), siguiendo `docs/knowledge/04-estrategia-migracion.md` y **respetando las reglas de seguridad** (no tocar Firebase ni el despliegue actual).

3. El agente irá fase por fase, dejando cada una verificable, y te irá explicando.

---

## ¿Por dónde va la migración? (resumen de fases)

`Fase 0` Descubrimiento + export de Firebase → `Fase 1` Postgres + Quarkus en Docker → `Fase 2` Copiar datos (ETL) → `Fase 3` Conectar el Angular al nuevo backend → `Fase 4` Contenerizar → `Fase 5` Subir a AWS → `Fase 6` Cambio final y retiro de lo viejo.

Detalle en [docs/knowledge/04-estrategia-migracion.md](docs/knowledge/04-estrategia-migracion.md).

## Si tienes dudas

Todo está documentado en [docs/](docs/) y el agente está para ayudarte. Cualquier decisión importante, la conversas con Juan (el plan completo está en `docs/decisiones.md`).
