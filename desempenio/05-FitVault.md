# Entregable 5 — FitVault (registro de fitcoins)

---

## ⏱️ En 30 segundos

- **FitVault** es la app; dentro vive el monedero de **fitcoins** (los puntos) de cada persona, **clasificados por estado**.
- Un punto **no nace siendo dinero**: empieza como *potencial* y va madurando.
- Solo los puntos **Acreditados** se convierten en bono.
- Cada cambio de estado tiene un **motivo y queda registrado** (auditable).

---

## 1. Los estados del punto

```
        ┌─────────────┐
        │  POTENCIAL  │  ← nace al tomar el ticket
        └──────┬──────┘
               ▼
       ┌────────────────┐
       │ EN DESARROLLO  │
       └──────┬─────────┘
              ▼
        ┌────────────┐
        │ EN PRUEBAS │
        └─────┬──────┘
              ▼
   ┌────────────────────────┐
   │ ESPERANDO APROB. CLIENTE│
   └───────────┬─────────────┘
               ▼
     ┌────────────────────┐
     │ ESPERANDO PRODUCCIÓN│
     └─────────┬───────────┘
               ▼
        ┌──────────────┐         ┌───────────┐
        │  ACREDITADO  │ ──$──►  │   BONO    │
        └──────────────┘         └───────────┘

   Si algo falla (penalidad %) o no llega a producción:
        ▼                         ▼
   ┌───────────┐            ┌──────────┐
   │ PENALIZADO│            │ PERDIDO  │
   └───────────┘            └──────────┘
```

---

## 2. Qué significa cada estado (y por qué la transición)

| Estado | Significa | Entra aquí cuando… | Justificación |
|--------|-----------|--------------------|---------------|
| **Potencial** | Puntos prometidos, aún sin trabajo | Se toma el ticket | Da visibilidad de la recompensa, motiva |
| **En desarrollo** | Trabajo en curso | El ticket pasa a "en progreso" | Refleja avance real |
| **En pruebas** | Solución en QA | El ticket pasa a pruebas | El valor aún no está confirmado |
| **Esperando aprobación cliente** | Pendiente del visto bueno | QA ok, espera cliente | El cliente es juez final |
| **Esperando producción** | Aprobado, sin desplegar | Cliente aceptó | Riesgo aún no cero |
| **Acreditado** | Valor confirmado = dinero | Llega a prod **+ periodo de gracia** sin fallos | Solo aquí se paga |
| **Penalizado** | Se descuenta un **%** (no se anula) | Reapertura / rollback / incidente | Penalidad según gravedad; el resto se acredita al corregir |
| **Perdido** | Caducó sin llegar a prod | Ticket cancelado/cerrado sin valor | Evita pagar trabajo no entregado |

> **Acciones del cliente:** un **comentario** ("gracias", una duda) **no cambia el estado**; solo **Aprobar** avanza el fitcoin (→ inicia la gracia → Acreditado) y solo **Rechazar** lo devuelve (reapertura penalizable). Esto elimina el "rebote" actual del HelpDesk.

---

## 3. Periodo de gracia (clave anti-trampa)

Un punto pasa a **Acreditado** solo tras sobrevivir un **periodo de gracia** en producción (p. ej. 15 días) **sin** reapertura/rollback/incidente.

> Esto evita pagar por una solución que "se ve bien hoy" pero falla en una semana. Es lo que hace que el sistema premie **calidad real**, no apariencia.

---

## 4. Puntos diferidos (dividendo de estabilidad)

> Aplica al esquema **Senior** (fase posterior). Se incluye aquí para completar el ciclo de vida del punto.

Para Seniors, parte de los puntos de **causa raíz** quedan en un sub-estado **"diferido"** dentro del Vault:

```
Causa raíz resuelta → 50% acredita ya → 50% diferido
   └─► si el módulo NO reabre en 30–60 días → se acredita el 50% restante
   └─► si reabre → ese 50% se pierde
```

Premia que **el problema no vuelva**, no la promesa de que no volverá.

---

## 5. Vista del FitVault en la app (boceto)

```
┌──────────────── Mi FitVault ────────────────┐
│  Acreditados (=bono)        ▣▣▣▣▣  145 pts        │
│  En camino:                                       │
│    • Esperando producción   ◭◭     40 pts         │
│    • En pruebas             ◌◌◌    30 pts         │
│    • Potenciales            ◌      20 pts         │
│  Diferidos (causa raíz)     ⧗      25 pts         │
│  Penalizados este mes       ✗     −12 pts         │
│                                                   │
│  [ Ver historial de cada punto ]                  │
└───────────────────────────────────────────────────┘
```

---

## 6. Trazabilidad

Cada punto guarda: ticket origen, estado actual, **historial de transiciones** (fecha, motivo, quién/qué lo movió: sistema, IA o validador). Esto es lo que hace el sistema **auditable e impugnable**.

---

## 7. Cierre de mes y arrastre

- Al cerrar el mes, los fitcoins **Acreditados** de ese mes forman el bono y se pagan; el contador mensual vuelve a 0.
- Los fitcoins en estados intermedios (potencial, en desarrollo, en pruebas, esperando aprobación/producción) **no se pierden**: permanecen en el FitVault y se acreditan en el mes en que maduren (producción + periodo de gracia).
- El bono se devenga por la **fecha de acreditación**, no por la de toma del ticket.

> Detalle del algoritmo de cierre, arrastre y reversión: **Entregable 3, §10**.

---

*Fin del Entregable 5.*
