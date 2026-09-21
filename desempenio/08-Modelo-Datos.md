# Entregable 8 — Modelo de Datos

**Lee con:** [Algoritmo](03-Algoritmo.md) · [FitVault](05-FitVault.md)

---

## ⏱️ En 30 segundos

- ~12 tablas. El corazón son **`punto`** (con su estado e historial) y **`evento`** (auditoría inmutable).
- Todo lo que afecta dinero deja rastro.
- Diseñado para **recalcular el pasado** sin que cambie (versionado de reglas).

---

## 0. Dónde vive cada tabla (3 sistemas)

El modelo se reparte entre los sistemas existentes y FitVault:

| Sistema | Tablas propias |
|---------|----------------|
| **HelpDesk** | `ticket` (cliente, tipo, prioridad, módulo, estado), `csat` |
| **FitDesk** | `tarea`, `recurso`, `estado_board`, `complejidad/peso`, `frente` |
| **FitVault** (nuevo) | `fitcoin`, `transicion_fitcoin`, `sugerencia_ia`, `nota_mensual`, `detalle_nota`, `bono`, `periodo`, `logro`, `regla_version`, `evento` |

> FitVault **no duplica** tickets ni tareas: los referencia por id (`ticket_id` de HelpDesk, `tarea_id` de FitDesk) y guarda solo lo relativo a fitcoins/bono.
> **Nota de nomenclatura:** las tablas se nombran `fitcoin`/`transicion_fitcoin`; en el resto de este documento "punto" equivale a "fitcoin".

---

## 1. Diagrama de relaciones (simplificado)

```
 colaborador ──< ticket >── proyecto
     │            │
     │            └──< punto >── estado_punto
     │                  │
     │                  └──< transicion_punto   (historial)
     │
     ├──< nota_mensual >── periodo
     │            │
     │            └──< detalle_nota (por dimensión)
     │
     ├──< bono >── periodo
     │
     ├──< logro / insignia
     │
     └──< evento  (auditoría de TODO)

 ticket ──< sugerencia_ia
 regla_version  (pesos/fórmulas versionadas)
```

---

## 2. Tablas principales

| Tabla | Qué guarda | Campos clave |
|-------|------------|--------------|
| **colaborador** | Personas y su perfil | id, nombre, perfil (jr/semi/sr/helpdesk), activo |
| **ticket** | Trabajos del equipo (correctivo y desarrollo) | id, titulo, modulo, **tipo_trabajo** (correctivo/evolutivo/nuevo/innovacion), prioridad, estado, complejidad_final, fecha_toma, asignado_a |
| **punto** | Puntos generados por ticket | id, ticket_id, colaborador_id, cantidad, dimension, estado_actual, diferido(bool) |
| **estado_punto** | Catálogo de estados | id, nombre (potencial…acreditado/revertido/perdido) |
| **transicion_punto** | Historial de cada punto | id, punto_id, de_estado, a_estado, motivo, origen (sistema/ia/validador), fecha |
| **sugerencia_ia** | Lo que la IA propuso | id, ticket_id, complejidad, calidad, impacto, riesgo, explicacion, evidencia |
| **nota_mensual** | Nota 0–100 por persona/periodo | id, colaborador_id, periodo_id, nota, regla_version_id |
| **detalle_nota** | Aporte por dimensión | id, nota_id, dimension, peso, score, aporte |
| **bono** | Bono calculado y pagado | id, colaborador_id, periodo_id, monto, estado_pago |
| **periodo** | Mes o trimestre | id, tipo (mes/trim), inicio, fin, cerrado(bool) |
| **logro / insignia** | Gamificación | id, colaborador_id, tipo, fecha |
| **regla_version** | Pesos/fórmulas versionados | id, version, pesos(json), vigente_desde |
| **evento** | **Auditoría inmutable** | id, entidad, entidad_id, accion, actor, motivo, payload, fecha |

---

## 3. Decisiones de diseño importantes

| Decisión | Por qué |
|----------|---------|
| `transicion_punto` separada de `punto` | Permite ver **toda la historia** de un punto (auditable, impugnable) |
| `regla_version` referenciada en `nota_mensual` | Las notas viejas se recalculan **con sus reglas de entonces** |
| `evento` inmutable (solo insertar) | Auditoría confiable; nada se borra |
| `sugerencia_ia` separada de la nota | Se compara IA vs decisión humana (calibración) |
| `complejidad_final` en ticket ≠ sugerida por IA | Guarda lo que **tú** confirmaste, no solo lo que la IA propuso |

---

## 4. Históricos y métricas

- **Reaperturas:** se derivan del historial de estados del ticket.
- **Recurrencia por módulo:** consultas sobre `ticket.modulo` en el tiempo (para causa raíz / dividendo de estabilidad).
- **CSAT:** dos campos (atención / solución) en el ticket o tabla `encuesta`.
- **Dashboards:** se construyen sobre `nota_mensual`, `detalle_nota`, `punto`.

---

*Fin del Entregable 8.*
