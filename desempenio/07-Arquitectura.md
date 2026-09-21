# Entregable 7 — Arquitectura Técnica

**Objetivo:** auditable, escalable y seguro, **integrando lo que ya existe** (HelpDesk y FitDesk) y sumando FitVault.

---

## ⏱️ En 30 segundos

- **Tres sistemas, tres responsabilidades:** **HelpDesk** (origen del ticket), **FitDesk** (gestión del trabajo y su peso), **FitVault** (economía de fitcoins, bono y motivación).
- HelpDesk y FitDesk **ya existen**; **FitVault es nuevo** (Flutter + backend).
- Los fitcoins **se derivan casi solos** del movimiento del board de FitDesk → cero fricción para el dev.

---

## 1. Los tres sistemas y quién manda en qué

| Sistema | Qué es | Fuente de verdad de | Estado |
|---------|--------|---------------------|--------|
| **HelpDesk** (web, `fit-bank`) | El cliente reporta tickets | Ticket, tipo (incidencia/requerimiento/consulta), prioridad, módulo, estado del ticket, **CSAT** | Existe |
| **FitDesk** (Angular) | El equipo gestiona el trabajo (scrum) | Tarea, recurso asignado, **board/estado del trabajo**, **complejidad/peso**, frente de trabajo | Existe (se amplía) |
| **FitVault** (Flutter + backend) | Economía de fitcoins y motivación | **Fitcoins y sus estados, nota, bono, logros, auditoría del bono** | Nuevo |

> **Regla de oro:** HelpDesk = *qué pidió el cliente* · FitDesk = *cómo se trabaja y cuánto vale* · FitVault = *cuántos fitcoins valió y cuánto bono genera*.

---

## 2. Qué se registra dónde

| Dato | Sistema |
|------|---------|
| Ticket, tipo, prioridad, módulo, reapertura, CSAT | **HelpDesk** |
| Tarea, recurso, estado del board, **complejidad/peso (fitcoins potenciales)**, frente | **FitDesk** |
| Fitcoins por estado, nota mensual, bono, niveles/logros, validación del reconocimiento, vista Gerencia | **FitVault** |

---

## 3. El board de FitDesk ya es el ciclo de vida del fitcoin

El movimiento de la tarjeta en el board **dispara** las transiciones del fitcoin (sin trabajo extra):

| Columna en FitDesk | Estado del fitcoin |
|--------------------|--------------------|
| TO DO (asignado, en análisis) | Potencial |
| IN PROGRESS | En desarrollo |
| EN CERTIFICACIÓN | En pruebas → Esperando aprobación cliente |
| ENTREGADO | Esperando aprobación del cliente → (Aprobar) → + periodo de gracia → **Acreditado** |

> **Acciones del cliente (no son columnas del board):** *Comentar* no mueve nada; *Aprobar* confirma la entrega e **inicia el periodo de gracia** → Acreditado; *Rechazar* es una **reapertura real** → vuelve a IN PROGRESS y penaliza.

---

## 4. Flujo de datos

```
   ┌────────────┐  ticket, tipo, prioridad,   ┌────────────┐
   │  HelpDesk  │  reapertura, CSAT  ───────►  │   FitDesk  │
   │ (clientes) │                              │  (scrum)   │
   └────────────┘                              └─────┬──────┘
                       tarea, recurso, peso/complejidad,│
                       frente, estado del board         ▼
                                              ┌────────────────────┐
                                              │  FitVault (backend) │
                                              │  motor de fitcoins: │
                                              │  curva, cierre,     │
                                              │  arrastre, penalidad│
                                              └─────────┬───────────┘
                                  fitcoins, nota, bono   │
                         ┌──────────────────────────────┼───────────────┐
                         ▼                               ▼               ▼
                 App Flutter (colaborador)      Vista Gerencia      Auditoría
```

---

## 5. Cambios por sistema

**HelpDesk — cambios acotados.**
1. Exponer por **API/webhook**: ticket creado/reabierto/cerrado, prioridad, tipo, módulo y las **dos preguntas de CSAT** (atención/solución).
2. **Separar las acciones del cliente** para eliminar el "rebote": **Comentar** (no cambia el estado), **Aprobar** y **Rechazar/Reabrir**. Hoy *cualquier* comentario (incluso "gracias") devuelve el ticket a TODO; eso debe corregirse **en el origen** para no contar agradecimientos como reaperturas.

No registra fitcoins.

**FitDesk — aquí se registra el peso.** Campos a añadir por **tarea** (los demás ya existen: ticket_helpdesk_id, cliente, asunto, tipo, prioridad, recurso_asignado, estado_board, fecha_modificacion):

| Campo | Tipo / valores | Quién | Para qué |
|-------|----------------|-------|----------|
| `frente_trabajo` | enum: correctivo · evolutivo · nuevo_desarrollo · innovacion | IA → validador | Cómo se mide la calidad |
| `complejidad_ia` | 1–5 | IA | Sugerencia (calibración) |
| `complejidad` | 1–5 | **Validador confirma** | Base del cálculo de fitcoins |
| `complejidad_motivo` | texto (opc.) | Validador | Por qué ajustó (auditable) |
| `severidad_sla` | 1–5 (Baja…Emergencia) | Del SLA/ticket | Factor de puntos y urgencia del tiempo |
| `num_clientes` | 1–3 | Del HelpDesk | Factor de puntos |
| `tiempo_max` | horas/días (calculado) | Sistema | Plazo razonable; base del premio |
| `fecha_objetivo` | fecha | Sistema | Deadline para el premio por anticipación |
| `es_emergencia` | booleano | Sistema/validador | Asignación directa; sin antigüedad |
| `fecha_entrega_produccion` | fecha | Sistema (al ENTREGADO) | Dispara el periodo de gracia |
| `fecha_aceptacion_cliente` | fecha | Sistema/HelpDesk | Confirma aceptación |
| `reconocimiento` | enum opc.: causa_raiz · mentoria · innovacion | Dev reclama | Reconocimientos con juicio |
| `reconocimiento_estado` | enum: reclamado · aprobado · rechazado | Validador | Aprobación |
| `penalidad_pct` | decimal 0–100 | Sistema/validador | Reabrir/rollback reduce fitcoins |
| `penalidad_motivo` | texto | Validador | Justificación |
| `validado_por` + `fecha_validacion` | usuario + fecha | Sistema | Auditoría |

- `fitcoins_potenciales` **no se guarda** aquí: lo calcula FitVault (= valor_base × `complejidad` × antigüedad); el board puede mostrarlo como referencia.
- El `estado_board` (ya existente) es lo que **dispara las transiciones** del fitcoin en FitVault (ver §3).

**FitVault — nuevo (no gestiona tickets).** Lee de HelpDesk y FitDesk y:
- Calcula fitcoins, nota y bono (curva, cierre mensual, arrastre, penalidad).
- Muestra el monedero, niveles, logros, ranking y notificaciones (app Flutter).
- Expone la **vista de Gerencia/Finanzas** (bono a pagar por persona y total).

---

## 6. Por qué FitVault en Flutter

| Motivo | Detalle |
|--------|---------|
| App **personal y motivacional** | Estilo Duolingo/wallet: el colaborador la abre a diario para ver su progreso |
| **Multiplataforma** | iOS + Android + web con **un solo código** |
| **Notificaciones push** | "¡Se te acreditaron 40 fitcoins!", subiste de nivel, etc. |
| Separación de herramientas | FitDesk (Angular) sigue siendo la herramienta de **trabajo** de escritorio; FitVault es la de **motivación/consulta** |

---

## 7. Backend, seguridad y auditoría (FitVault)

| Capa | Función | Sugerencia |
|------|---------|------------|
| **Backend FitVault** | Motor de fitcoins (curva, cierre, arrastre, penalidad), API | Node/NestJS o Python/FastAPI |
| **Base de datos** | Fitcoins, transiciones, nota, bono, auditoría | PostgreSQL |
| **Integración** | Lee HelpDesk y FitDesk (API/webhooks, idempotente) | colas cuando crezca |
| **Frontend** | App Flutter (colaborador) + vista Gerencia | Flutter (móvil/web) |
| **Auth/roles** | colaborador / validador / Gerencia-Finanzas | SSO de la empresa |
| **Auditoría** | Tabla `evento` inmutable + versionado de reglas | cada fitcoin/nota/bono trazable |

> **No microservicios al inicio:** para el piloto (Juniors + HelpDesk) basta un **backend modular**. Se parte en servicios solo si el SaaS escala a múltiples clientes.

---

*Fin del Entregable 7.*
