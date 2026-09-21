# Entregable 10 — Plan de MVP (v1 / v2 / v3)

**Filosofía:** lanzar lo mínimo que ya sea **justo y motivador**, e iterar con datos.

---

## ⏱️ En 30 segundos

- **v1 (MVP):** lo imprescindible para correr el **piloto de 3 meses** (Juniors de Cuenca + HelpDesk) con dinero real acotado.
- **v2:** automatización profunda (IA fina, integraciones, gamificación completa).
- **v3:** producto **SaaS** vendible a terceros.

---

## 1. Qué construir primero (v1 — MVP del piloto)

**Objetivo:** que el sistema ya sea **objetivo, transparente y auditable**, aunque algo sea manual.

| Incluir en v1 | Por qué es imprescindible |
|---------------|---------------------------|
| Integración con **HelpDesk** (estados, reaperturas, CSAT) | Es la fuente principal del puntaje |
| Integración básica con **Git** (archivos/módulos del PR) | Mide complejidad/calidad real, evita gaming |
| **FitVault** con estados y periodo de gracia | Corazón del modelo |
| Motor de puntos + **nota mensual** + **curva de pago no lineal** | Para calcular el bono (Juniors/HelpDesk) |
| **Bandeja de validación** (tú apruebas/ajustas) | Gobernanza del piloto (D7) |
| **Sugerencia de IA** (complejidad/calidad/impacto) | Aunque sea simple; tú validas |
| Dashboard "Mi desempeño" + "Mis fitcoins" | Motivación y transparencia |
| **Auditoría** (tabla evento) + versionado de reglas | Confianza y defensa legal |

**Se puede simular/manual en v1:**
- Detección de "incidente en producción" → vía ticket-incidente manual.
- Insignias/logros → set reducido.
- Recalibración → análisis manual al cierre de mes.

---

## 2. Qué dejar para v2

| Funcionalidad | Por qué espera |
|---------------|----------------|
| IA afinada con histórico propio | Necesita datos del piloto primero |
| Gamificación completa (niveles, rachas, vitrina de logros) | Motiva, pero no es crítico para pagar bien |
| Integración **CI/CD** (rollbacks, tests) | Cierra el riesgo R5, pero requiere montar CI/CD |
| Impugnaciones formales en la app | En el piloto puede ser conversado |
| Reportes avanzados para gerencia | Tras estabilizar el cálculo |

---

## 3. Qué dejar para v3 (producto SaaS)

| Funcionalidad | Por qué al final |
|---------------|------------------|
| **Multi-empresa (multi-tenant)** | Para vender a terceros |
| Configurador de esquemas/pesos por cliente | Cada empresa querrá los suyos |
| Microservicios + escalado | Solo cuando haya muchos clientes |
| Monitoreo de producción integrado | Señal premium de calidad |
| Marketplace de recompensas | Evolución del incentivo |

---

## 4. Hoja de ruta vs. el piloto

```
 Alcance ── Juniors (Cuenca) + HelpDesk; Seniors en fase posterior
 Mes 0   ── construir v1 (MVP)
 Sem 1-2 ── línea base (medir sin pagar)
 Mes 1   ── "shadow": puntúa sin pagar (calibrar IA vs tú)
 Mes 2-3 ── piloto pagado (techo reducido USD 50)
 Mes 4+  ── producción (techo USD 100) + empezar v2
```

---

## 5. Criterios para pasar de fase (go/no-go)

| De → A | Condición |
|--------|-----------|
| Shadow → Pagado | IA y tus decisiones coinciden ≥ 80%; reglas estables |
| Pagado → Producción | Justicia percibida ≥ 70%; sin caída de throughput > 10% |
| v1 → v2 | Cálculo confiable 2 meses seguidos |
| v2 → v3 | Decisión de negocio de comercializar |

---

## 6. Resumen para decidir hoy

> El MVP **no necesita ser perfecto ni totalmente automático**. Necesita ser **justo, transparente y auditable** desde el día 1. Lo manual de v1 (incidentes, recalibración) se automatiza en v2 cuando ya hay datos y confianza.

---

*Fin del Entregable 10. Propuesta completa (Entregables 0–10).*
