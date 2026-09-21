# Entregable 2 — Esquema de Puntuación por Perfil

**Versión:** 1.0 · **Fecha:** 27 de junio de 2026
**Relacionado con:** [Documento de Gerencia](01-Documento-Gerencia.md) · Precede al Entregable 3 (Algoritmo)

---

## 0. Principios de diseño del puntaje

Antes de las tablas, las reglas que las gobiernan (esto es lo que evita que el sistema se rompa):

1. **Puntaje relativo a un estándar fijo, no a los compañeros.** Como el bono es techo individual (no pool), se compara contra una meta objetiva, no contra el ranking. Así nadie sabotea a nadie.
2. **Normalización por complejidad.** Todo puntaje base se multiplica por la complejidad estimada (IA) y validada (comité). Un ticket difícil paga más → mata el cherry-picking.
3. **El valor se confirma, no se presume.** Cerrar un ticket da puntos *potenciales*; estabilidad en el tiempo los **acredita** (ver FitVault, Entregable 5).
4. **Penalidad proporcional, no pérdida total.** Lo que reabre, hace rollback o causa incidente aplica una **penalidad porcentual** (pequeña al inicio, mayor según gravedad) sobre los puntos del trabajo; al corregir y ser aceptado, se acredita el resto. Premia corregir rápido sin dejar a nadie en cero por un error menor.
5. **Pesos públicos y recalibrables.** Todo el equipo conoce la fórmula; se ajusta cada trimestre con datos.
6. **Cada perfil, su vara.** Tres esquemas distintos; nunca se comparan entre sí para el bono.
7. **Todos los frentes cuentan.** Correctivo, evolutivo, nuevos desarrollos e innovación se puntúan por igual según complejidad e impacto; lo que cambia es *cómo* se mide la calidad en cada uno (ver §0.2).
8. **Pago con curva no lineal (sin umbral que deje en cero).** Siempre se reconoce algo, pero el monto se concentra en el alto desempeño (ver §0.1).

### 0.1 Estructura común de la nota mensual
La nota mensual de cada persona es un valor **0–100** que se traduce a bono mediante una **curva no lineal**. Se compone de **dimensiones ponderadas** (que cambian por perfil), netas de **penalidades porcentuales**.

```
Nota = Σ (peso_dimensión × score_dimensión) − penalidades %  + bonificaciones diferidas
Bono = ROUNDUP( 0,0087 × Nota² + 0,1431 × Nota − 0,5991 )   [Nota 0–100]
```

Referencia: 10→USD 2 · 30→USD 12 · 50→USD 29 · 60→USD 40 · 80→USD 67 · 100→USD 100. Siempre paga algo (nadie "bota la toalla"), pero el dinero se concentra arriba.

> Detalle del cálculo, estados y caducidad: **Entregable 3 (Algoritmo)** y **Entregable 5 (FitVault)**. Aquí definimos **qué se mide y con qué peso por perfil**.

---

### 0.2 Frentes de trabajo y cómo se mide su calidad

| Frente | Calidad se mide por | Se "revierte" cuando… |
|--------|---------------------|------------------------|
| Correctivo | Cierre estable, sin reaperturas | El ticket reabre |
| Evolutivo | Cumple requisitos, sin bugs tras la entrega, con pruebas | Bug crítico post-entrega / rollback |
| Nuevo desarrollo | Alcance entregado, calidad de la base, adopción y CSAT | Bug crítico post-entrega / rechazo del cliente |
| Innovación / mejora técnica | Mejora real y medible, validada | Rompe algo existente |

> La complejidad, el impacto y el ciclo de vida del punto (potencial→acreditado) son **iguales para todos los frentes**. El equilibrio observado es ~50% desarrollo / 50% correctivo, y el esquema no privilegia a ninguno: paga por **dificultad e impacto reales**.

> **Origen de la curva:** definida por Gerencia (archivo `Formula para pago de incentivos.xlsx`) para evitar el efecto "acantilado" de un umbral duro: quien va atrasado igual recibe algo y no se relaja, pero el grueso del bono premia el alto desempeño.

---

## ESQUEMA 1 — Junior

**Foco:** ejecutar bien, aprender, no romper, empezar a colaborar.

### 1.1 Dimensiones y pesos

| Dimensión | Peso | Qué mide | Señal/origen (hoy disponible) |
|-----------|-----:|----------|-------------------------------|
| Productividad | 20% | Volumen **normalizado por complejidad** | Tickets cerrados × complejidad IA |
| Calidad | 30% | Cierre estable, sin reaperturas, buen código | Reaperturas, code review en Git, validaciones añadidas |
| Impacto | 20% | Alcance del cambio (módulos/usuarios) | Archivos/módulos tocados (Git) + criticidad del ticket |
| Colaboración | 20% | Ayuda a otros, documentación, code review dado | Comentarios PR, co-autoría, notas en ticket |
| Innovación | 10% | Mejora pequeña de proceso/herramienta | Propuesta validada por comité |
| **Total** | **100%** | | |

> **Por qué Productividad pesa solo 20% incluso en Junior:** queremos enseñar desde el inicio que cerrar rápido no es la meta. Pero no es 0%, porque un Junior **sí** debe demostrar que produce.

### 1.2 Penalizaciones (restan de la nota)
| Evento | Penalización |
|--------|-------------:|
| Ticket reabierto en ≤ 30 días | penalidad pequeña (% de los puntos del trabajo) |
| Rollback de su cambio | penalidad media (%) |
| Incidente en producción atribuible | penalidad mayor (%) |
| Gaming detectado (fragmentar tickets, descripciones infladas) | bono del mes = 0 + revisión |

> La penalidad **reduce** los puntos, no los anula: si corrige y el cliente acepta, conserva el resto. La gravedad define el %.

### 1.3 Niveles (gamificación, ver Entregable 4)
Junior I → Junior II → Junior III → "Listo para Senior" (señal a RRHH para promoción, **no** automática).

### 1.4 Cómo se calcula cada dimensión (objetivo y automático)

> **Principio anti-sesgo:** los scores **no son una opinión del validador**; se calculan **automáticamente** desde señales medibles (HelpDesk, FitDesk, Git). El único juicio humano en todo el sistema es **confirmar la complejidad** (la IA la sugiere) y **aprobar una innovación**, y ambos quedan **registrados, justificados e impugnables**.

| Dimensión | Score 0–100 (fórmula automática) | Señal / fuente | ¿Juicio? |
|-----------|----------------------------------|----------------|:--------:|
| Productividad | `mín(100, fitcoins_mes ÷ meta × 100)` | fitcoins (fórmula) | No |
| Calidad | `máx(0, 100 − 15·reaperturas − 20·rollbacks − 30·incidentes)` | estado de tickets | No |
| Impacto | `mín(100, Σ(severidad+clientes) ÷ meta × 100)` | HelpDesk (b,c) + módulos (Git) | No |
| Colaboración | `mín(100, acciones ÷ meta × 100)` (reviews, co‑autoría, docs) | Git / notas de tickets | No |
| Innovación | `mín(100, innovaciones_aprobadas ÷ meta × 100)` | propuesta marcada y **aprobada** | Sí (acotado) |

> Las **metas y penalizaciones son parámetros públicos y editables** (no se ajustan caso por caso). Ver `Formula para pago de incentivos 3.xlsx`, hoja *Nota Junior*, que implementa esta lógica de punta a punta (señales → score → nota → bono).
> El **HelpDesk** se calcula igual de objetivo: triage (% devueltos/reclasificados), FCR (% resueltos sin escalar), tiempo de 1ª respuesta y seguimiento (timestamps) y CSAT de atención (encuesta) → **100% automático**.

> **Esto es la especificación a implementar** en FitDesk (registro de señales) y FitVault (cálculo de score/nota/bono).

---

## ESQUEMA 2 — Senior

> 🚧 **En rediseño (fase posterior — no entra en el piloto).** Por definición de Gerencia, el esquema Senior incorporará la **generación de ingresos**: detectar oportunidades, proponerlas como **desarrollos vendibles**, venderlas al cliente y concretarlas en **facturación extra**, reconocida como un **% de esa facturación, sin el tope de USD 100**. Las dimensiones de abajo (causa raíz, mentoría, arquitectura) se mantienen y se les **suman** la difusión de soluciones a todos los clientes y la generación de ingresos. Se desarrollará cuando el piloto de Junior/HelpDesk esté estabilizado.

**Foco:** resolver lo difícil, prevenir, elevar al equipo y **generar ingresos**. La productividad bruta casi no cuenta; cuenta el apalancamiento.

### 2.1 Dimensiones y pesos

| Dimensión | Peso | Qué mide | Señal/origen |
|-----------|-----:|----------|--------------|
| Casos críticos | 25% | Resolución de tickets críticos/complejos | Criticidad IA + validación comité |
| Eliminación de causa raíz | 30% | Que el problema **no vuelva** | Caída de recurrencia del módulo en 30–60 días |
| Mentoría | 20% | Subir el nivel de otros | Acompañamiento a Juniors, reviews, sesiones |
| Arquitectura | 15% | Decisiones que mejoran el sistema | Refactors, deuda técnica pagada (Git) + validación |
| Innovación | 10% | Mejoras de proceso/herramienta | Propuesta validada |
| **Total** | **100%** | | |

> **Causa raíz es la dimensión de mayor peso (30%)** y es **diferida**: parte de sus puntos se acreditan el mes siguiente si el módulo deja de generar incidencias ("dividendo de estabilidad"). Así se premia la prevención real, no la promesa.

### 2.2 Penalizaciones
| Evento | Penalización |
|--------|-------------:|
| Reapertura de algo que marcó "causa raíz resuelta" | −15 nota (rompió su propia promesa) |
| Rollback de cambio arquitectónico | −15 nota |
| Incidente en producción atribuible | −20 nota |
| Mentoría "de papel" (registrada pero el Junior no progresa) | anula puntos de mentoría |

### 2.3 Anti-efecto-cobra (crítico para Senior)
Un Senior podría **dejar crecer** problemas para luego resolverlos como "casos críticos". Mitigación:
- Se penaliza la **recurrencia** de incidencias en módulos bajo su responsabilidad.
- El **dividendo de estabilidad** premia que NO pase nada, alineando el incentivo con la prevención.

---

## ESQUEMA 3 — HelpDesk

**Foco:** es la cara al cliente y la **calidad del dato de entrada** de todo el sistema. Su esquema mide servicio y triage, **no código ni la solución técnica de otros**.

> ### ⚠️ Corrección de diseño: problema de atribución del CSAT
> El CSAT general ("¿quedó satisfecho con la **solución**?") mide el trabajo del **dev** que resolvió, **no** del HelpDesk. Premiar al HelpDesk con ese CSAT sería pagarle por trabajo ajeno (y castigarlo por errores de devs que no controla).
> **Solución:** la encuesta al cierre se divide en **dos preguntas**:
> - *"¿Satisfacción con la **atención** (rapidez, trato, comunicación)?"* → atribuible al **HelpDesk** (alimenta este Esquema 3).
> - *"¿Satisfacción con la **solución**?"* → atribuible al **dev** (alimenta los Esquemas 1 y 2 como señal de satisfacción del cliente).
> Como el CSAT ya existe (implementado recientemente), solo hay que **añadir la segunda dimensión** a la encuesta.

### 3.1 Dimensiones y pesos

| Dimensión | Peso | Qué mide | Señal/origen |
|-----------|-----:|----------|--------------|
| Calidad del registro / triage | 30% | Tickets bien descritos, reproducibles, clasificados y priorizados | Auditoría de tickets; % devueltos por "falta de info"; % reclasificados |
| Resolución en 1er contacto (FCR) | 25% | Tickets que **resuelve él mismo** sin escalar a devs | Tickets cerrados por HelpDesk / total atendidos |
| Tiempo de 1ª respuesta (FRT) | 15% | Rapidez de la primera respuesta al cliente | Timestamps del ticket |
| Seguimiento | 15% | No dejar tickets colgados; informar al cliente | Tiempo sin actualización, tickets estancados |
| CSAT de atención | 15% | Satisfacción con **su trato**, no con la solución | Pregunta de "atención" de la encuesta |
| **Total** | **100%** | | |

> **Por qué el FCR pesa tanto (25%):** cada ticket simple que el HelpDesk resuelve solo (resets, dudas, configuración) es trabajo que **no** consume a un dev. Premia reducir la carga del equipo → coherente con la filosofía "reducir trabajo futuro".
> **Por qué "calidad del registro" es la mayor (30%):** un ticket mal descrito daña a todo el sistema y a la IA. El HelpDesk es el **guardián de la calidad del dato**.

### 3.2 Penalizaciones
| Evento | Penalización |
|--------|-------------:|
| Ticket devuelto por falta de información reproducible | −5 nota c/u |
| Mala clasificación/priorización que causó reasignación | −3 nota c/u |
| CSAT **de atención** bajo (< 3/5) | −10 nota |
| FCR mal usado (cerrar como "resuelto" algo que reabre) | revierte el crédito FCR + −5 nota |

> **Contramétrica del FCR:** premiar "resolver en primer contacto" podría tentar a cerrar tickets sin resolver de verdad. Por eso un ticket cerrado por HelpDesk que **reabre** anula su crédito FCR y penaliza.

### 3.3 Nota sobre comparación
El HelpDesk es **una sola persona**: su nota se compara contra su **propio estándar histórico** y metas fijas, nunca contra desarrolladores. Refuerza el principio de "techo individual".

---

## 4. Tabla comparativa de los tres esquemas

| Dimensión | Junior | Senior | HelpDesk |
|-----------|:-----------:|:------:|:--------:|
| Productividad | 20% | — | — |
| Calidad | 30% | (en causa raíz) | — |
| Impacto | 20% | (en críticos) | — |
| Colaboración | 20% | — | — |
| Innovación | 10% | 10% | — |
| Casos críticos | — | 25% | — |
| Causa raíz | (vía calidad) | 30% | — |
| Mentoría | — | 20% | — |
| Arquitectura | — | 15% | — |
| Calidad registro/triage | — | — | 30% |
| Resolución 1er contacto (FCR) | — | — | 25% |
| Tiempo 1ª respuesta (FRT) | — | — | 15% |
| Seguimiento | — | — | 15% |
| CSAT de atención | — | — | 15% |

> **CSAT de solución (segunda pregunta de la encuesta):** no aparece como fila propia porque es una **señal transversal de la dimensión Calidad** en Junior y Senior (mide la satisfacción del cliente con la solución del *dev*, no del HelpDesk).

**Lectura:** a mayor seniority, el peso se desplaza de *"cuánto produzco"* hacia *"cuánto apalanco al equipo y prevengo problemas"*. El HelpDesk se mide por **servicio y triage que controla**, nunca por la solución técnica de otros. Es el mensaje cultural central del programa.

---

## 5. Ejemplo numérico completo (Senior)

**Daniela, Senior, mes de junio:**

| Dimensión | Peso | Score (0–100) | Aporte |
|-----------|-----:|--------------:|-------:|
| Casos críticos | 25% | 80 | 20,0 |
| Causa raíz | 30% | 70 (parte diferida a julio) | 21,0 |
| Mentoría | 20% | 90 | 18,0 |
| Arquitectura | 15% | 60 | 9,0 |
| Innovación | 10% | 50 | 5,0 |
| **Subtotal** | | | **73,0** |
| Penalización: 1 rollback | | | −15,0 |
| **Nota final** | | | **58,0** |

**Bono junio = curva(58) ≈ USD 37.** *(Ejemplo ilustrativo; el esquema Senior definitivo —con generación de ingresos— se desarrolla en la fase posterior.)*
Si en julio el módulo que intervino no genera incidencias, recibe el **dividendo de estabilidad** diferido (los puntos de causa raíz retenidos se acreditan), elevando su nota de julio.

---

## 6. Preguntas abiertas para validar contigo

1. **Pesos:** ¿los porcentajes propuestos reflejan tu prioridad, o quieres, por ejemplo, subir aún más "causa raíz" en Senior?
2. **Seniors:** ✅ Definido por Gerencia — esquema propio orientado a **generación de ingresos** (% de facturación extra, sin tope), en fase posterior al piloto.
3. **Definición de "complejidad":** propongo una escala 1–5 estimada por IA y validada por comité. ¿La detallo en el Entregable 3?
4. **CSAT del HelpDesk:** ✅ Resuelto. El CSAT ya existe (implementado recientemente) pero mide la *solución* (trabajo del dev). Se corrigió el Esquema 3 separando "CSAT de atención" (HelpDesk) de "CSAT de solución" (dev), y se rediseñó el HelpDesk en torno a métricas que sí controla (triage, FCR, FRT, seguimiento). Pendiente operativo: **añadir la segunda pregunta** a la encuesta existente.

---

*Fin del Entregable 2. Siguiente: Entregable 3 — Algoritmo de puntuación (estados, nacimiento, acreditación, reversión, caducidad, cálculo del bono).*
