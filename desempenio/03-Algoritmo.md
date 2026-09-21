# Entregable 3 — Algoritmo de Puntuación

**Lee también:** [Esquema de puntuación](02-Esquema-Puntuacion.md) · [FitVault](05-FitVault.md)

---

## ⏱️ En 30 segundos

- Un ticket genera **fitcoins potenciales** al tomarse = `complejidad × valor base`.
- Esos puntos **no son dinero todavía**: maduran a medida que el ticket avanza y se **acreditan** solo cuando la solución demuestra ser estable.
- Si el ticket **reabre, falla o hace rollback** → se aplica una **penalidad porcentual** (no se pierde todo); al corregir y ser aceptado, se acredita el resto.
- La nota mensual (0–100) sale de esos puntos ponderados por perfil → se traduce a bono.
- **IA sugiere los números; tú los confirmas.** Todo queda registrado.

---

## 1. ¿Cuándo nacen los puntos? (puntos y tiempo de la tarea)

Al **tomar** un ticket, el sistema calcula sus **fitcoins potenciales** y su **tiempo razonable** a partir de 5 factores definidos por Gerencia:

```
Fitcoins = ValorBase(2) × Complejidad(a) × [Severidad(b) + Clientes(c)] × Antigüedad(d) × Premio(e)
```

| Factor | Escala | Quién |
|--------|--------|-------|
| **a — Complejidad** | 1 a 5 | IA sugiere → validador confirma |
| **b — Severidad (SLA)** | Baja 1 · Media 2 · Alta 3 · Legal 4 · Emergencia 5 | Del SLA / ticket |
| **c — Nº de clientes que reportan** | Uno 1 · Dos+ 2 · Todos 3 | Del HelpDesk |
| **d — Antigüedad** | 0–2 d → ×1,0 · 3–5 d → ×1,1 · +5 d → ×1,2 | Automático (con tope) |
| **e — Premio por entrega anticipada *sin fallas*** | a tiempo ×1,0 · 1 día antes ×1,10 · 2+ días ×1,20 | Se confirma tras la gracia |

> Ejemplo: complejidad 4, severidad Alta (3), 2 clientes, 4 días (d→×1,1) → 2×4×(3+2)×1,1 = **44**. Entregado 2 días antes y sin fallas → ×1,20 = **53**.

### Tiempo razonable de la tarea
`Tiempo máx = HorasBase(complejidad) × FactorUrgencia(severidad) × FactorClientes`
Parte del esfuerzo (complejidad) y **se acorta con la urgencia**: una emergencia exige resolver antes aunque sea compleja. Los parámetros se calibran con el histórico de FitDesk. El **premio (e)** compara la entrega real contra este tiempo y solo cuenta si no hubo fallas. *(Calculadora: `Formula para pago de incentivos 3.xlsx`.)*

> **Emergencias / incidencias críticas:** no esperan a que alguien las tome ni acumulan antigüedad; se **asignan directamente** al técnico que las resuelve en el menor tiempo posible.

---

## 2. Escala de complejidad (1–5)

La IA la estima leyendo el ticket/tarea **+ el diff de Git** (archivos, módulos, líneas, tablas/APIs tocadas). Aplica a **todos los frentes**: una incidencia, una funcionalidad nueva o una app desde cero se valoran con la misma escala de dificultad.

| Nivel | Nombre | Señal típica |
|:----:|--------|--------------|
| 1 | Trivial | 1 archivo, cambio cosmético |
| 2 | Simple | pocos archivos, 1 módulo |
| 3 | Media | varios archivos, lógica de negocio |
| 4 | Alta | múltiples módulos, BD/APIs, riesgo |
| 5 | Crítica | transversal, arquitectura, alto impacto |

**La IA sugiere → tú ajustas con un clic (y queda registrado el motivo si cambias).**

---

## 3. Ciclo de vida del punto (de potencial a dinero)

```
   TOMA          AVANCE DEL TICKET            CONFIRMACIÓN
    │                   │                          │
 Potencial ─► En desarrollo ─► En pruebas ─► Esperando aprobación ─► Esperando prod ─► ACREDITADO ($)
                                                   │
                            (penalidad / no llega)─┴──► PENALIZADO / PERDIDO
```

Detalle de cada estado en [FitVault](05-FitVault.md). Lo clave: **solo "Acreditado" se convierte en bono.**

---

## 4. ¿Cuándo se acreditan?

| Tipo de punto | Se acredita cuando… |
|---------------|---------------------|
| Puntos base del ticket | El trabajo llega a producción y es **aprobado por el cliente** **y** sobrevive el **periodo de gracia** (p. ej. 15 días); se acredita **neto de penalidades** si las hubo |
| Causa raíz (Senior) | El módulo intervenido **no reabre** durante 30–60 días → *dividendo de estabilidad* |
| Mentoría | El Junior acompañado **progresa** (no basta con registrarla) |
| Innovación | La mejora es **validada** por ti |

---

## 5. Penalidades (no se pierde todo)

Un fallo **no anula** el trabajo: aplica una **penalidad porcentual** sobre los puntos, según la gravedad. Los puntos se **acreditan al llegar a producción y ser aceptados por el cliente, ya netos de la penalidad**. Así se evita la injusticia de perder todo por un error menor que se corrige rápido, y a la vez se desincentiva enviar sin probar.

| Evento | Efecto sobre los puntos | Cómo se detecta hoy |
|--------|-------------------------|---------------------|
| **Reapertura** ≤ 30 días | Penalidad **pequeña** (% de los puntos) | Estado del ticket |
| **Bug crítico post-entrega** (desarrollo) | Penalidad **según gravedad** (%) | Ticket-bug vinculado / reapertura |
| **Rollback** | Penalidad **media** (%) | Marca en ticket / commit revert en Git |
| **Incidente en producción** | Penalidad **mayor** (%) | **Ticket-incidente vinculado** (no hay monitoreo prod aún) |
| **Gaming** (fragmentar, inflar) | Bono del mes = 0 + revisión | Detección IA + auditoría |

> Como **no hay monitoreo de producción**, un "incidente" se registra creando un ticket-incidente que **referencia** al ticket/commit causante. Es la salvaguarda acordada (riesgo R5).

> **Qué cuenta como reapertura (penalizable):** solo el **rechazo del cliente** o la **reaparición del problema**. Un **comentario** del cliente ("gracias", una duda) **no** es reapertura, y la **aprobación** tampoco. Se corrige en el HelpDesk separando *Comentar / Aprobar / Rechazar*.

---

## 6. ¿Cuándo caducan?

- Los **fitcoins potenciales** que nunca llegan a producción caducan al cerrarse/cancelarse el ticket.
- Los **fitcoins acreditados** no caducan: ya son bono.
- El **mes/trimestre** cierra la ventana de cálculo (ver §8).

---

## 7. De puntos a nota mensual (0–100)

Cada **dimensión** recibe un **score 0–100**; la nota es su promedio **ponderado por el perfil** (pesos del [Entregable 2](02-Esquema-Puntuacion.md)). Los **fitcoins acreditados** alimentan sobre todo **Productividad** (tus fitcoins del mes ÷ meta × 100, tope 100) e **Impacto**; **Calidad, Colaboración e Innovación** tienen sus propias señales (reaperturas, reviews, propuestas validadas):

```
Nota = Σ (peso_dimensión × score_dimensión) − penalidades %  + diferidos
Bono = ROUNDUP( 0,0087 × Nota² + 0,1431 × Nota − 0,5991 )    [curva no lineal, Nota 0–100]
       (10→$2 · 30→$12 · 50→$29 · 60→$40 · 80→$67 · 100→$100; siempre paga algo)
```

**Ejemplo (Junior):** Calidad 90·30% + Productividad 70·20% + Impacto 75·20% + Colaboración 80·20% + Innovación 60·10% = **78** → bono ≈ **USD 64**.

---

## 8. Cálculo del bono

| Perfil | Periodicidad | Cómo se paga |
|--------|--------------|--------------|
| Junior | **Mensual** | `curva(Nota_mes)` |
| HelpDesk | **Mensual** | `curva(Nota_mes)` |
| **Senior** | **Fase posterior** | Esquema propio con componente de **facturación extra** (% de lo facturado, sin tope USD 100) |

> El piloto arranca solo con **Junior y HelpDesk**. El esquema Senior (generación de ingresos) se desarrolla después.

---

## 9. Ejemplo de punta a punta

**Ticket #482 — complejidad 4, lo toma Beto (Junior):**
1. Nace: `10 × 4 × 1 = 40 pts potenciales`.
2. Avanza a producción → entra a periodo de gracia (15 días).
3. **Día 9 reabre** (bug menor) → penalidad pequeña, p. ej. −20% → corrige y el cliente acepta → se acreditan **32 pts** (no pierde los 40).
4. Si **no** hubiera reabierto → **40 pts** acreditados completos, suman a sus dimensiones del mes.

---

## 10. Cierre de mes, arrastre y reversión

**Regla de oro:** el bono se devenga por la **fecha en que el fitcoin se ACREDITA**, no por cuándo se tomó el ticket.

### 10.1 Qué se reinicia

| Elemento | ¿Reinicia cada mes? |
|----------|---------------------|
| Nota mensual (define el bono) | **Sí** — al cerrar y pagar, vuelve a 0 |
| Fitcoins acreditados y pagados | Cierran el mes (ya cobrados) |
| Fitcoins **pendientes** (potencial / en desarrollo / pruebas / esperando aprobación o producción) | **No** — viajan al mes en que se acrediten |

### 10.2 Esquema de cierre

```
 Durante el mes ─► los tickets generan fitcoins que maduran por estados
   ▼ FIN DE MES
 ┌───────────────────────────────────────────────────────────┐
 │ ACREDITADOS en el mes → nota → curva → BONO → pago → 0      │
 │ PENDIENTES (no instalados / en gracia) → permanecen        │
 └───────────────────────────────────────────────────────────┘
```

### 10.3 Algoritmo de cierre (pseudocódigo)

```
Al cerrar el mes M:
  acreditados_M = fitcoins que pasaron a ACREDITADO durante M
  nota_M  = Σ(peso × score de acreditados_M) − penalidades_M + diferidos
  bono_M  = curva(nota_M)            // ROUNDUP(0,0087·N²+0,1431·N−0,5991)
  pagar(bono_M);  marcar M como CERRADO
  pendientes  → siguen en el FitVault, sin tocar
```

### 10.4 Arrastre (carry-over)
Los fitcoins en estados intermedios **no caducan** por el cambio de mes; se acreditan cuando maduran (producción + periodo de gracia). **El periodo de gracia que cruza el fin de mes empuja la acreditación al mes siguiente.**

### 10.5 Reversión / penalidad según el momento

| Cuándo ocurre el fallo | Efecto |
|------------------------|--------|
| **Dentro de la gracia** (aún no acreditado) | No se pagó nada; penalidad % sobre el pendiente, se acredita el resto al corregir |
| **Después de acreditado y pagado** | No se reclama dinero ya entregado; la penalidad se aplica como **ajuste negativo en el mes en curso** |

### 10.6 Ejemplo
- Ticket tomado el **20-ene** (complejidad 4 → 40 fitcoins potenciales).
- Instalado en producción el **5-feb** → periodo de gracia (15 días).
- Sin fallos → **acredita ~20-feb** → cuenta para el **bono de FEBRERO**.
- En enero esos fitcoins estaban "en camino" (no sumaron al bono de enero).

---

*Fin del Entregable 3.*
