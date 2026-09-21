# SIRD — Base de Conocimiento del Proyecto (LEER PRIMERO)

> **Propósito de este archivo:** permitir retomar la propuesta en cualquier momento (por cualquier persona o sesión) sin perder contexto. Es la "fuente de verdad" del estado del proyecto. Si algo cambia, **se actualiza aquí**.

**Proyecto:** Sistema Inteligente de Reconocimiento por Desempeño (SIRD)
**Objetivo final:** documento de nivel empresarial para Gerencia + base para un producto SaaS de evaluación de desempeño con IA.
**Última actualización:** 2026-06-29 (incorpora feedback de Gerencia — ver sección ⭐ al inicio)

---

## ⭐ Feedback de Gerencia (29-jun-2026) — APLICADO al piloto (Junior + HelpDesk)

El Gerente General (Iván Villavicencio) revisó la propuesta y dio su conformidad general, con cambios. Transcripción y análisis completos en **[`00b-Conversacion-Gerencia.md`](00b-Conversacion-Gerencia.md)**. Resumen de cambios pendientes de aplicar a los entregables:

- **C1 — Curva no lineal en vez del umbral 60** (reemplaza D11): siempre pagar algo; fórmula del Excel `0.0087·P²+0.1431·P−0.5991`.
- **C2 — Esquema Senior por generación de ingresos:** % de facturación extra, **sin tope de USD 100**; califica por causa raíz + difusión a clientes + mentoría + ingresos.
- **C4 — Piloto inicial = Juniors (Cuenca) + HelpDesk** (Seniors después).
- **C5 — Asignación directa de emergencias** y limitar el multiplicador de antigüedad.
- **C6 — Penalidad porcentual en vez de reversión total**; acreditación neta de penalidad al llegar a producción/aceptación.
- **C7 — Definir perfiles por competencias** (no solo 5 años).
- **C8 — Bono para el Líder Técnico** (mejora del soporte + nuevas funcionalidades) → reabre su participación; resolver conflicto de interés.
- **C9 — Posible nombre "fitcoins"** para los puntos.
- **C10 — Filosofía:** USD 100 ≈ 20 h extra/mes; premiar impacto que lo supere.

> **Estado (29-jun):** APLICADO a los entregables (piloto Junior+HelpDesk) → C1 (curva no lineal), C4 (piloto Cuenca+HelpDesk), C5 (emergencias directas + antigüedad acotada), C6 (penalidad %), C10 (filosofía del valor); C2 como fase posterior. **C7/C8/C9 también resueltos:** C7 → **sin Semi Senior**, Gabriel pasa a **Senior**; C8 → **NO se incluye ni se menciona** (decisión del usuario; fue idea de Iván, el usuario declina); C9 → app = **FitVault**, puntos = **fitcoins**.

---

## 1. Qué es esto en una frase

Sistema de **bono variable adicional (hasta USD 100/mes por persona)** para el equipo de desarrollo, calculado de forma **objetiva, auditable y difícil de manipular** sobre el trabajo en tickets, donde **la IA sugiere y un comité valida**, premiando **calidad, impacto y eliminación de causa raíz** por encima del volumen.

---

## 2. Contexto de la empresa (datos de partida)

- Empresa de desarrollo de software (dominio financiero, Soft Warehouse / fit-bank). **Tres sistemas:** **HelpDesk** (el cliente reporta tickets), **FitDesk** (Angular; el equipo gestiona el trabajo en un board scrum y registra el peso/complejidad) y **FitVault** (nuevo, Flutter; economía de fitcoins, bono y motivación). Los devs trabajan sobre **tickets/tareas**.
- Hoy algunos reciben un **bono fijo** → **se mantiene intacto**. El SIRD es **solo para el bono adicional**.
- Se quiere **eliminar la percepción de favoritismo**; por eso la IA participa y ningún líder califica subjetivamente.
- **Equipo:** ~6 Junior · ~5 Senior · 1 HelpDesk · 1 Líder Técnico.
- **Líder Técnico queda FUERA** del esquema de bonos (trabajo no comparable). Propuesta: que sea **validador técnico** del comité.

---

## 3. Decisiones YA TOMADAS por el usuario (no volver a preguntar)

| # | Decisión | Valor | Estado |
|---|----------|-------|--------|
| D1 | Estructura del presupuesto | **Techo individual absoluto** (hasta USD 100/persona). NO es pool, NO es suma cero. | ✅ Confirmado |
| D2 | Bonos fijos actuales | Se mantienen intactos; SIRD solo añade. | ✅ Confirmado |
| D3 | Fuentes de datos hoy | **HelpDesk/tickets + repositorio Git**. NO hay CI/CD ni monitoreo de producción todavía. | ✅ Confirmado |
| D4 | Modelo de toma de tickets | **"Pull"** (cada quien toma los que desea) + **fallback de asignación** para huérfanos. | ✅ Confirmado |
| D5 | Forma de entrega | **Por fases, en archivos .md** en este workspace. | ✅ Confirmado |
| D6 | Periodicidad del bono Senior | **Acumulación trimestral** (más motivador y material que mensual). Juniors/HelpDesk: a revisar (mensual por defecto). | ✅ Confirmado |
| D7 | Gobernanza en el piloto | **Validador único = el usuario** (no hay comité; esto es un piloto). Si funciona, escala a nivel nacional y ahí sí se introduce comité. | ✅ Confirmado |
| D8 | Salvaguarda de transparencia (deriva de D7) | La IA genera la sugerencia; el validador único **solo ajusta con justificación escrita registrada** (auditable); pesos y reglas **públicos** al equipo. Mitiga el riesgo de reintroducir favoritismo. | ✅ Confirmado |
| D9 | Atribución del CSAT | La encuesta se divide: **CSAT de atención** (→ HelpDesk) y **CSAT de solución** (→ dev que resolvió). El HelpDesk NO se evalúa por la solución técnica de otros. Esquema 3 rediseñado sobre triage/FCR/FRT/seguimiento/CSAT-atención. | ✅ Confirmado |
| D10 | Frentes de trabajo | El sistema puntúa **4 frentes**: correctivo, evolutivo, nuevos desarrollos e innovación. Balance ~50/50 dev–correctivo. Se valora por **complejidad e impacto**, no por tipo; cambia *cómo* se mide la calidad de cada frente. | ✅ Confirmado |
| D11 | Umbral mínimo de pago | ~~60 puntos~~ | ❌ Reemplazada por D13 (curva no lineal) |
| D12 | Visibilidad gerencial | La app muestra a Gerencia/Finanzas, por persona y periodo, los fitcoins acreditados y el **monto exacto del bono a pagar** (auditable), listo para nómina. | ✅ Confirmado |
| D13 | Pago por **curva no lineal** | `ROUNDUP(0,0087·N²+0,1431·N−0,5991)`. Siempre paga algo; el monto se concentra arriba (60→$40, 100→$100). Origen: `Formula para pago de incentivos.xlsx`. | ✅ Confirmado |
| D14 | **Penalidad porcentual** (no reversión total) | Reapertura/rollback/incidente descuentan un % según gravedad; los puntos se acreditan al llegar a producción/aceptación, netos de penalidad. | ✅ Confirmado |
| D15 | **Alcance del piloto** | Inicia con **Juniors (Cuenca) + HelpDesk**. Seniors en fase posterior. | ✅ Confirmado |
| D16 | **Esquema Senior = generación de ingresos** (fase posterior) | % de la facturación extra generada (detectar oportunidad → proponer mejora vendible → vender → facturar), **sin tope de USD 100**, sumado a causa raíz/difusión/mentoría. A desarrollar tras el piloto. | ✅ Confirmado |
| D17 | **Naming** | App = **FitVault**; puntos = **fitcoins** (reemplaza "Points Vault"). | ✅ Confirmado |
| D18 | **Perfiles** | **Sin Semi Senior** por ahora → Junior, Senior, HelpDesk. **Gabriel pasa a Senior** y debe generar valor a nivel senior. | ✅ Confirmado |
| D19 | **Bono del Líder Técnico** | **NO se incluye ni se menciona** en la propuesta (decisión del usuario; fue idea de Iván). | ✅ Confirmado |
| D20 | Cierre de mes / arrastre | Bono por **fecha de acreditación** del fitcoin; la nota reinicia a 0 al pagar; los pendientes se arrastran al mes que maduren. Reversión: dentro de gracia no se pagó; tras acreditar = ajuste en el mes en curso. (Algoritmo §10) | ✅ Confirmado |
| D21 | **FitVault en Flutter** | App personal/motivacional multiplataforma (iOS/Android/web) con notificaciones push. FitDesk se mantiene en Angular. | ✅ Confirmado |
| D22 | **Reparto de sistemas** | HelpDesk = origen del ticket; **FitDesk = gestión + registro del peso/complejidad** (su board mapea al ciclo del fitcoin); FitVault = fitcoins/nota/bono/gamificación. (Arquitectura §1–3) | ✅ Confirmado |
| D23 | **Puntos y tiempo por tarea** (Excel 2 de Iván) | Puntos = 2·a·(b+c)·antig(d)·premio(e). a=complejidad, b=severidad SLA, c=nº clientes, d=antigüedad, e=premio por entrega anticipada *sin fallas* (+10%/+20%). Tiempo máx = horas por complejidad **acortadas por la urgencia**. Calculadora: `Formula para pago de incentivos 3.xlsx`. (Algoritmo §1) | ✅ Confirmado |
| D24 | **Dimensiones objetivas/automáticas** | Los scores se calculan por fórmula desde señales medibles (HelpDesk/FitDesk/Git), no por opinión. Único juicio: confirmar complejidad (IA sugiere) y aprobar innovación → auditable e impugnable. Metas/penalizaciones = parámetros públicos. Es la **especificación a implementar** en FitDesk y FitVault. (Esquema §1.4; Excel hoja *Nota Junior*) | ✅ Confirmado |
| D25 | **Acciones del cliente / fin del "rebote"** | El HelpDesk debe **separar** Comentar (no mueve el ticket), Aprobar (→ inicia gracia → Acreditado) y Rechazar (= reapertura real, penaliza). Un agradecimiento ya NO devuelve el ticket. Acreditación = al **aprobar + periodo de gracia**. Se corrige **en el HelpDesk (origen)**. (Arquitectura §3,§5; Algoritmo §4,§5; FitVault §2) | ✅ Confirmado |

---

## 4. Decisiones de diseño propuestas por la consultoría (sujetas a validación)

| # | Tema | Propuesta | Justificación |
|---|------|-----------|---------------|
| P1 | Gobernanza (post-piloto) | **Comité de calibración** (Líder Técnico como validador técnico + RRHH + par rotativo). Aplica SOLO al escalar a nivel nacional; en el piloto rige D7 (validador único). | Evita favoritismo y da defensa legal; la IA nunca decide. |
| P2 | Anti-cherry-picking | Modelo **"pull inteligente"**: puntaje ∝ complejidad, multiplicador de antigüedad, WIP limit, round-robin ponderado, reserva crítica para Senior. | Hace que lo difícil pague mejor; nadie deja huérfanos los tickets duros. |
| P3 | Causa raíz | **Dividendo de estabilidad** diferido: parte de los puntos se acredita el mes siguiente si el módulo no reabre. | Premia prevención real, no la promesa. |
| P4 | Captura de "error en producción/rollback" sin CI/CD | Vía **ticket-incidente vinculado** + **reapertura**. | R5: sin monitoreo prod no hay señal automática. |
| P5 | Ranking | Público = **progreso personal + insignias**; el **monto del bono es privado**. | Un ranking de dinero reintroduce envidia/favoritismo. |
| P6 | Anti-efecto-cobra | Penalizar **recurrencia** por módulo, no solo premiar la cura. | Evita "dejar crecer problemas para resolverlos heroicamente". |

---

## 5. Riesgos clave a no olvidar

- **R1 Gaming** (inflar descripciones, fragmentar tickets) → basar puntaje en señales de Git, auditoría.
- **R2 Efecto cobra** → penalizar recurrencia.
- **R5 Datos insuficientes** (sin CI/CD ni prod monitoring) → **el más subestimado**; roadmap de integración.
- **R6 Sesgo/legalidad de IA ligada a salario** → IA solo sugiere, comité valida, derecho a impugnar, todo auditable.
- **R7 Crowding-out** → validar que USD 100 sea material; reforzar reconocimiento no monetario.

---

## 6. Mapa de entregables (10) y estado

| # | Entregable | Archivo | Estado |
|---|------------|---------|--------|
| 0 | Base de conocimiento (este archivo) | `00-CONTEXTO-Y-DECISIONES.md` | ✅ Hecho |
| 1 | Documento para Gerencia | `01-Documento-Gerencia.md` | ✅ Hecho |
| 2 | Esquema de puntuación por perfil | `02-Esquema-Puntuacion.md` | ✅ Hecho |
| 3 | Algoritmo de puntuación (estados, acreditación, reversión, caducidad, cálculo bono) | `03-Algoritmo.md` | ✅ Hecho |
| 4 | App web (Dashboard, Mi desempeño, **app de registro de fitcoins**, niveles, logros…) | `04-Aplicacion-Web.md` | ✅ Hecho |
| 5 | FitVault — registro de fitcoins (estados y transiciones) | `05-FitVault.md` | ✅ Hecho |
| 6 | Modelo de IA (qué analiza, qué sugiere) | `06-IA.md` | ✅ Hecho |
| 7 | Arquitectura técnica | `07-Arquitectura.md` | ✅ Hecho |
| 8 | Modelo de datos (tablas, relaciones, históricos) | `08-Modelo-Datos.md` | ✅ Hecho |
| 9 | APIs REST | `09-APIs.md` | ✅ Hecho |
| 10 | Plan de MVP (v1/v2/v3) | `10-MVP.md` | ✅ Hecho |

> **Estado global:** **Los 10 entregables (0–10) están completos.** Entregables 3–10 escritos en formato resumido/escaneable ("En 30 segundos" + tablas/diagramas). Pendientes solo afinaciones con el usuario (pesos finales, materialidad del bono) y tareas operativas (2ª pregunta del CSAT).

---

## 7. Glosario de conceptos propios del SIRD

- **FitVault:** nombre de la aplicación. **fitcoins:** los puntos (la unidad). Los fitcoins tienen estados (Potenciales → En desarrollo → … → Acreditados / Penalizados / Perdidos). Solo los **Acreditados** se convierten en dinero. (Detalle: Entregable 5.)
- **Dividendo de estabilidad:** fitcoins diferidos que se liberan si el módulo intervenido no genera incidencias el mes siguiente.
- **Pull inteligente:** modelo de toma libre de tickets con salvaguardas anti-cherry-picking.
- **Comité de calibración:** órgano humano que valida/ajusta las sugerencias de la IA; única autoridad sobre la nota final.
- **Contramétrica:** métrica de seguridad (p. ej. throughput) que vigila que un incentivo no produzca un efecto no deseado.
- **Nota mensual (0–100):** se traduce a bono solo si alcanza el umbral.
- **Frentes de trabajo:** correctivo, evolutivo, nuevos desarrollos, innovación. Todos puntúan; cambia cómo se mide la calidad de cada uno.
- **Curva de pago (no lineal):** `ROUNDUP(0,0087·N²+0,1431·N−0,5991)`; siempre paga algo, concentrado en el alto desempeño. Reemplaza el antiguo umbral de 60.

---

## 8. Fórmula base (referencia rápida)

```
Nota = Σ (peso_dimensión × score_dimensión) − Σ penalizaciones + bonificaciones diferidas
Bono = ROUNDUP( 0,0087 × Nota² + 0,1431 × Nota − 0,5991 )   [curva no lineal]
```
Pesos por perfil: ver `02-Esquema-Puntuacion.md`.

---

## 9. Preguntas abiertas / respondidas

**Respondidas (2026-06-27):**
- Periodicidad Senior → **trimestral** (D6). ✅
- Gobernanza → **validador único = usuario** en piloto, con registro auditable (D7, D8). ✅
- CSAT → **ya existe** (implementado recientemente), pero mide la *solución* (trabajo del dev), no al HelpDesk. **Decisión D9:** la encuesta se divide en dos preguntas — *CSAT de atención* (HelpDesk) y *CSAT de solución* (dev). El Esquema 3 (HelpDesk) se rediseñó en torno a métricas que sí controla. ✅

**Aún abiertas:**
1. ¿Los pesos por perfil reflejan su prioridad o ajustamos (p. ej. subir "causa raíz")? *(El usuario confirmó que la dirección — calidad/causa raíz sobre volumen — es correcta; números a afinar en piloto.)*
2. Escala de complejidad **1–5** estimada por IA y ajustada por el validador único: se detallará en el Entregable 3.
3. Pendiente operativo (no de diseño): **añadir la 2ª pregunta** ("¿satisfacción con la atención?") a la encuesta CSAT existente.

---

## 10. Cómo retomar el trabajo

1. Leer este archivo (`00`) → tienes todo el contexto y decisiones.
2. Revisar el último entregable marcado ✅ en §6.
3. Continuar con el primer ⏳ pendiente.
4. Al terminar un entregable: marcarlo ✅ en §6 y actualizar §9 si cambian las preguntas abiertas.
5. Mantener la coherencia con las decisiones D1–D5 (no contradecirlas sin aviso al usuario).
