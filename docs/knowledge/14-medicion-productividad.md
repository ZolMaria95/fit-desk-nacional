# 14 — Medición de productividad por complejidad de ticket (DISEÑO)

> **Estado: DISEÑO / esquema — pendiente de análisis y aprobación con el equipo (4 ago 2026).**
> **NO implementado.** No hay código, entidades ni migración. Se retoma tras revisarlo con el equipo.
> - Versión imprimible (privada): https://claude.ai/code/artifact/fbbd25a5-7ad0-4503-8095-c7dc9e0a9c37
> - Al aprobar: registrar decisión firme en [decisiones.md](../decisiones.md), enlazar desde
>   [01-modelo-conceptual.md](01-modelo-conceptual.md) y construir por fases (ver §J).

## Por qué
Medir la **productividad real del consultor** por la **complejidad** de lo que resuelve y **cómo** lo
resuelve (calidad + tiempo), **no por volumen**. Reglas del negocio que lo originan: puntuar cada
unidad de trabajo por complejidad (ajustable en el camino); los **estados son vitales** (la entrega no
cierra, la aprobación/cierre sí; una devolución resta); considerar **fechas de asignación y entrega**;
el **apoyo** de un no asignado también cuenta; y **generar un reporte**.

## Decisiones tomadas con la dueña (4 ago 2026)
1. **Entregable de este paso = solo el diseño.** Sin código todavía.
2. **Gobierno del puntaje:** el **consultor propone**, el **Responsable de Equipo (RE) aprueba/ajusta**.
3. **Apoyo = subtarea:** ayudar en un ticket ajeno se **formaliza como una subtarea** propia (con su
   ponderación y asignado). **No hay entidad "apoyo" separada.**
4. **Métrica central:** **puntaje de calidad ponderado** (complejidad cerrada, penalizada por
   devoluciones, ajustada por tiempo de ciclo). Volumen = secundario.
5. **Escala:** **rúbrica por factores**.
6. **Cierre/devolución (tarea con ticket):** cierra **APROBADO** (= instalado en producción) o
   **CERRADO POR EL CLIENTE**; **NO APLICA** anula; la **entrega no cierra**; una **devolución resta**
   de lo acumulado antes de ella (la resta persiste aunque se reentregue).
7. **Subtareas:** un ticket se divide en subtareas independientes; en el board se ven la **tarjeta
   principal + una por subtarea**; la devolución del ticket penaliza **solo al dueño** (tarea
   principal); el puntaje de la principal es **independiente** del de las subtareas.
8. **Cierre de subtareas y tareas sin ticket:** al marcarlas **"finalizado"**, y **solo el RE** puede.
9. **Reporte:** **mensual + rango configurable**.

---

## A. Hallazgos del código que condicionan el diseño
- **No existe historial de estados.** `TicketEspejo` guarda solo el estado *actual* (`estadoOrigen`,
  `fechaIngreso`, `fechaModificacion`, `lastSyncedAt`). `Tarea` tiene `puntos` (vestigio Scrum),
  `aprobado`+`fechaAprobacion` (= la marca **"Finalizado"** actual), `creadoEn`/`actualizadoEn`, pero
  **no** fecha de asignación ni bitácora de transiciones → **hay que capturar EVENTOS hacia adelante**;
  no hay backfill histórico.
- **No existe subtarea/parent ni checklist** (`Tarea` no tiene padre). Hay que agregarlo — y sobre ese
  mismo mecanismo se modela el **apoyo** (una subtarea más). El **blindaje anti-duplicados** actual del
  board (`board.ts` `visibleStories`) colapsa toda tarea que comparta ticket → deberá **eximir subtareas**.
- **No hay librería de export** (CSV/imprimir son baratos; xlsx/PDF nativo pide más).
- Estados HD (código, `helpdesk-estados.ts` / `board-utils.ts`): `EN PROCESO`→in_progress,
  `INSTALADO/CERTIFICAC`→review, `ENTREGADO`→done, `APROBADO/CERRADO POR EL CLIENTE/…/NO APLICA`→
  finalizado. **Devolución** = regresión del flujo (de Certificación/Entregado hacia atrás) o un estado
  HD explícito si existe (a confirmar).

## B. La unidad que se puntúa es la TAREA
| Clase de tarea | ¿Gobierna el estado del ticket? | ¿Cuándo cierra (consolida)? |
|---|---|---|
| **Tarea con ticket** (principal/única) | Sí — mover empuja el estado al HelpDesk | APROBADO (producción) o CERRADO POR EL CLIENTE |
| **Subtarea** | No — mover cambia solo su columna | Cuando el **RE la marca "finalizado"** |
| **Tarea sin ticket** (local) | No aplica | Cuando el **RE la marca "finalizado"** |

## C. Modelo de datos (conceptual)
Cambios sobre `Tarea` + 2 piezas nuevas; el puntaje del consultor es **derivado** (no se almacena).
- **`Tarea` (+campos):** `parent_tarea_id` (si está → es **subtarea**) y `gobierna_ticket` (bool; true
  solo en la principal con ticket). Reusar `aprobado`+`fechaAprobacion` como marca **"Finalizado"** de
  subtareas/tareas sin ticket.
- **`complejidad` (rúbrica + versión), por TAREA:** factores (ver D), `puntaje`, `estado`
  (PROPUESTA|APROBADA), `propuesto_por` (consultor), `aprobado_por` (RE), `motivo_ajuste`, `version`,
  `vigente`. Cada reajuste = nueva versión (rastro del "puede variar").
- **`evento_ticket` (bitácora de ciclo de vida):** `ticket`, `tipo` (ASIGNADO|EN_PROCESO|ENTREGADO|
  DEVUELTO|APROBADO|CERRADO_CLIENTE|NO_APLICA|ESPERA_CLIENTE), `estado_desde`, `estado_hacia`, `actor`,
  `en`. Origen: **sync de tickets** (comparar estado previo/nuevo) + movimientos de la **tarea
  principal** + cambios de asignado. De aquí: fechas de asignación/entrega, aprobación/cierre,
  devoluciones y tiempo de ciclo.
- *(No hay entidad `apoyo`: el apoyo es una **subtarea** con su `parent_tarea_id` y su `complejidad`.)*

## D. Rúbrica de complejidad (por factores) — por tarea
El consultor propone niveles, el RE aprueba. Pesos iniciales (tunables):
| Factor | Qué mide | Niveles | Peso |
|---|---|---|---|
| Impacto | Afectación negocio/cliente | 1–5 | 0.30 |
| Riesgo técnico | Dificultad/incertidumbre | 1–5 | 0.30 |
| Esfuerzo | Trabajo estimado | 1–5 | 0.25 |
| Alcance | Módulos/áreas afectadas | 1–5 | 0.15 |

**Complejidad `C` = Σ(nivel × peso)** → rango 1–5 (escalable a 1–100 para el reporte). Defendible y ajustable.

## E. Reglas de puntaje
Sea `C` la complejidad aprobada vigente de la **tarea**.
- **Tarea con ticket (gobierna estado):**
  1. **ENTREGAR** (Certificación) = aporta `C` **provisional** (no cierra).
  2. **DEVOLUCIÓN:** cada evento DEVUELTO resta **`C × p_dev`** de lo acumulado (default `p_dev=0.25`,
     acumulativa; **persiste** aunque reentregue). **Penaliza SOLO a esta tarea principal**.
  3. **CIERRE:** solo **APROBADO** (prod) o **CERRADO POR EL CLIENTE** consolida =
     `max(0, C − Σ penalizaciones)`. **NO APLICA** → anula (fuera del cómputo).
- **Subtarea / tarea sin ticket:** consolida `C` cuando el **RE marca "Finalizado"**. Independiente del
  ticket y de la tarea principal.
- **Ajuste por ciclo (modificador ACOTADO):** `factor_ciclo = clamp(esperado/real, 0.8, 1.2)`,
  `real` = cierre − asignación (o "finalizado" − creación). Capado: **nunca domina**. (Alternativa: ciclo
  como KPI, sin multiplicar.)
- **Puntaje de la tarea:** `S = consolidado × factor_ciclo`. **Todo `S` es del asignado** (no hay reparto:
  el apoyo es su propia subtarea con su propio `S`).

## F. Métrica central y KPIs (por consultor, por período)
- **Puntaje de calidad ponderado** (headline) = **Σ de `S`** de **todas sus tareas y subtareas CERRADAS
  en el período** (con ticket: por APROBADO/CERRADO CLIENTE; subtareas/sin ticket: por "Finalizado" del
  RE). Los **NO APLICA** quedan fuera.
- **KPIs de contexto:** complejidad cerrada · % de devoluciones · tiempo medio de ciclo · nº de subtareas
  de apoyo · cerradas vs. entregadas. **Volumen** solo como contexto.

## G. Subtareas en el tablero
- **Display:** tarjeta principal del ticket (dueño; gobierna estado) **+ una tarjeta por subtarea** (cada
  asignado mueve la suya). Mover una subtarea cambia **solo su columna**, sin empujar el estado del ticket.
- **Blindaje anti-duplicados:** **eximir subtareas** (colapsar solo clones: mismo ticket, sin parent).
- **Modales:** el de una **subtarea** abre la **conversación del ticket principal** (comparten ticket) +
  indica a qué padre pertenece; el del **ticket principal** lista sus **subtareas** (asignado, estado,
  ponderación, finalizado) + botón crear subtarea.
- **Quién crea subtareas:** el dueño del ticket y el RE. Cada subtarea se asigna a un consultor con su rúbrica.
- **"Finalizado":** solo el **RE** (nueva regla de permiso, hermana de `puedeEliminarTarea`, por rol de
  plataforma: `puedeFinalizarTarea = esAdminPlataforma() || esResponsableEquipo()`).
- **Apoyo = subtarea:** un no asignado que ayuda recibe una subtarea propia (puntuable, cierre por RE).

## H. Integración con FitDesk
- **Roles/permisos:** reutiliza `AuthService.esResponsableEquipo/esAdminPlataforma` (front) y `Actor`
  (X-Actor-Hid, backend). Consultor propone; RE aprueba/valida/finaliza (mismo patrón que
  transferencias/solicitudes y que el permiso de borrado agregado el 4 ago 2026).
- **Eventos:** enganchar en el **sync de tickets** + `moveCard`/reasignación de la **tarea principal**.
- **UI (fase build):** panel de rúbrica en el detalle; en el modal del ticket, lista de subtareas + crear;
  sección **"Productividad"** (reporte) por rol.

## I. Reporte
- **Cadencia:** mensual + selector de rango. **Vistas:** por consultor y consolidado por equipo.
- **Audiencia:** RE su(s) equipo(s); Admin/Gerencia nacional (Gerencia solo lectura); consultor el suyo.
- **Export:** CSV + vista imprimible. (xlsx/PDF nativo = opcional futuro.)

## J. Hoja de ruta de construcción (FUTURA, tras aprobación)
1. **Datos:** `V17` con `parent_tarea_id`/`gobierna_ticket` en `tarea`, `complejidad`, `evento_ticket`;
   captura de eventos; permiso "solo RE finaliza". (Empieza a acumular historia.)
2. **Subtareas en el board:** crear/listar, tarjetas separadas, modales enlazados, eximir del blindaje,
   no empujar estado del ticket.
3. **Rúbrica:** proponer/aprobar complejidad por tarea (versiones).
4. **Reporte:** sección Productividad (mensual+rango, consultor/equipo, CSV+imprimir).

## K. Parámetros abiertos (a confirmar en la revisión)
- Pesos de la rúbrica (0.30/0.30/0.25/0.15); `p_dev` (0.25) — ¿lineal o creciente por rebote?
- Ciclo como **modificador acotado (0.8–1.2)** vs. solo **KPI**; días-meta por banda de `C`.
- Estado(s) HD que cuentan como **DEVOLUCIÓN** (explícito vs. regresión).
- **CERRADO POR FALTA DE RESPUESTA DEL CLIENTE:** ¿consolida lo acumulado (default), anula como NO
  APLICA, o cierra sin ajuste de ciclo?
- ¿La complejidad de la **tarea principal** la propone el dueño + aprueba el RE, igual que las subtareas?

## Ejemplos (para validar que los números son sensatos)
- **Sin subtareas:** ticket `C=4`, 1 devolución (−1), reentregado y **aprobado** → consolidado `3`;
  `factor_ciclo=1.1` → `S=3.3` (todo del asignado).
- **Con subtareas (ticket 32600):** dueño JPHP001 (principal `C=2`), subtarea A→KVAZQUEZ (`C=3`),
  subtarea B→MSC001 (`C=5`). KVAZQUEZ mueve la suya a Certificación (no afecta el ticket) y el **RE la
  marca Finalizado** → KVAZQUEZ consolida `3`. Si el ticket se **devuelve**, penaliza **solo** la tarea
  principal de JPHP001; A y B conservan su puntaje.
