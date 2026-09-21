# Conversación con Gerencia General — Feedback sobre la propuesta

> **Contexto:** transcripción y análisis de la conversación con **Iván Villavicencio (Gerente General)** tras enviarle los documentos. Interlocutor: **Juan Pablo (Líder Técnico, autor de la propuesta)**. Fechas: 27 y 29 de junio de 2026.
> **Estado:** feedback analizado. **Los entregables AÚN no se ajustan** (a la espera de luz verde para aplicar los cambios).

---

## 1. Transcripción (resumida y ordenada)

**27/06 — 21:50 a 23:16**
- **Iván:** De acuerdo con el enfoque. Plantea consideraciones.
- **Iván:** (1) Buscar algo especial para los Seniors, p. ej. un **porcentaje de la facturación adicional** generada por el Senior. Los Seniors deben ser mentores, pero **esencialmente generadores de ingresos**.
- **Juan Pablo:** Confirma el concepto: el esquema Senior reconocería un % de la facturación generada al cliente por los trabajos que realicen o en los que participen.
- **Iván:** La calificación al Senior se hace por: (1) solución de un **problema de raíz**, (2) **difusión** de esa solución a todos los clientes, (3) **mentoría**, (4) **generación de ingresos extra**. El monto sería un **% de la facturación extra, NO limitado a los USD 100**.
- **Iván:** Los Seniors, con su conocimiento del sistema y de las necesidades/deficiencias, pueden **proponer nueva funcionalidad vendible**. Ejemplo: **Lina Ochoa** propone casi todos los meses nuevas funcionalidades (parte administrativa) que se han vendido a varios clientes y ahora se ofertan en el paquete a todos.
- **Iván:** Para el bono de hasta USD 100, **comenzar el piloto con los Juniors de Cuenca** y luego ir implantándolo a toda la compañía.
- **Juan Pablo:** Propone orientar gradualmente a los Seniors a, además de estabilizar el sistema, **identificar oportunidades y nuevas funcionalidades** que generen valor e ingresos. Sugiere **separar el reconocimiento por generación de negocio**.
- **Iván:** "Exacto, tienen que ser generadores de ingresos."

**27/06 — 22:38 (2 observaciones menores al documento)**
- **Iván (Obs.1):** "Una tarea que nadie toma sube de valor hasta volverse atractiva" podría hacer que **intencionalmente nadie la tome** hasta que suba de valor. Debe haber forma de **asignar directo**; una **emergencia** debe asignarse directamente al técnico que la resuelva en el menor tiempo posible.
  - **Juan Pablo:** De acuerdo: las **incidencias críticas se asignan directamente** al recurso que puede resolverlas de forma inmediata.
- **Iván (Obs.2):** Si se reabre/falla/rollback/incidente → los puntos se revierten. ¿Cuándo lo corrige se le **devuelven con penalidad**?
  - **Juan Pablo:** Lo que se penaliza **no se devuelve**. Los puntos **se acreditan cuando esté en producción o entregado y aceptado por el cliente** (ya **neto del descuento por penalidad**). La **penalidad es un porcentaje inicialmente pequeño y según la gravedad**.
  - **Iván:** De acuerdo; si se devuelve por algo pequeño y se corrige enseguida, no sería justo que no gane nada.
  - **Juan Pablo:** Con ese esquema se evita que **envíen cosas sin probar**.
- **Iván (Obs.3):** Comenzar el **piloto con Juniors y HelpDesk**.
- **Iván:** ¿Quién es un **Semi Senior**? Ese título lo tenía **Gabriel**. Hay que **definir bien qué personas se consideran Seniors**, porque hasta ahora solo se ha usado **años de experiencia (5 años)**.
- **Iván:** "Tú (Juan Pablo) deberías tener un bono basado en la **mejora general del soporte** y, por supuesto, de las **nuevas funcionalidades que generes o dirijas**."

**29/06 — 00:31**
- **Iván:** Sugerencia: **pagar siempre algo, así sea un dólar**. Si solo se paga a partir de 60 pts, alguien que sabe que no los alcanzará "bota la toalla y se relaja". Pasa un **Excel con una fórmula que crece no linealmente**.

**29/06 — 06:41 a 09:44**
- **Juan Pablo:** Sol propone llamar a los puntos **"fitcoins"**; el esquema de puntos puede funcionar.
- **Iván:** Le acreditará "fitcoins" a **Sol por su App** y a **Karla por la documentación técnica**. Para la asignación de tareas hay que considerar que **USD 100 ≈ 20 horas extra al mes** (≈ 1 hora diaria adicional).
- **Juan Pablo:** El incentivo debe representar **valor adicional** para la empresa, no solo el trabajo esperado del día a día. Los USD 100 deben asociarse a un impacto que **supere** ese equivalente: causa raíz, trabajo futuro evitado, **funcionalidad comercializable**, mejora significativa de proceso o beneficio tangible.
- **Iván:** "Exacto, me entendiste perfectamente."

---

## 2. La fórmula del Excel (no lineal)

Archivo: `Formula para pago de incentivos.xlsx`.
Fórmula base: **`Valor = ROUNDUP(0.0087·P² + 0.1431·P − 0.5991)`** (P = puntos, 0–100). Crece de forma **convexa** (acelera con el puntaje).

| Puntos | USD aprox. | | Puntos | USD aprox. |
|:-----:|:---------:|---|:-----:|:---------:|
| 0 | 0 | | 60 | 40 |
| 10 | 2 | | 70 | 53 |
| 20 | 6 | | 80 | 67 |
| 30 | 12 | | 90 | 83 |
| 40 | 20 | | 100 | 100 |
| 50 | 29 | | | |

**Lectura:** sustituye el umbral duro de 60. Siempre se paga algo (evita "botar la toalla"), pero el dinero se concentra en el desempeño alto. A 60 pts paga ~USD 40; a 100, USD 100.

---

## 3. Cambios que implica (pendientes de aplicar)

| # | Cambio solicitado | Afecta | ¿Necesita decisión del usuario? |
|---|-------------------|--------|----------------------------------|
| C1 | **Curva no lineal en vez de umbral 60.** Siempre pagar algo; fórmula del Excel. **Reemplaza D11.** | 01, 02, 03, 00 | Confirmar adopción de la fórmula tal cual |
| C2 | **Esquema Senior por generación de ingresos**, % de facturación extra, **sin tope de USD 100**. Calificación: causa raíz + difusión a clientes + mentoría + ingresos. | 01, 02, 03, 08 | Sí: definir % y cómo se atribuye la facturación a un Senior |
| C3 | **Difusión de la solución a todos los clientes** como criterio puntuable del Senior. | 02 | No |
| C4 | **Piloto inicial = Juniors (Cuenca) + HelpDesk**; Seniors después. | 01, 10 | Confirmar alcance (¿solo Cuenca?) |
| C5 | **Asignación directa de emergencias/críticas** al técnico que resuelve en menor tiempo; **limitar el multiplicador de antigüedad** para que nadie "deje envejecer" tareas a propósito. | 01, 03 | No |
| C6 | **Penalidad porcentual en vez de reversión total.** Acreditación al llegar a producción/aceptación del cliente, **neta de penalidad** (pequeña y según gravedad). | 01, 02, 03, 05 | No (definir tabla de % por gravedad) |
| C7 | **Definir perfiles** (Junior / Semi Senior / Senior) por **competencias**, no solo años (5). | 02 + doc nuevo | Sí: criterios |
| C8 | **Bono para el Líder Técnico (Juan)** por mejora general del soporte + nuevas funcionalidades que genere/dirija. **Reabre su participación** (antes excluido). | 01, 02 | Sí: cómo evitar conflicto de interés (lo aprobaría Gerencia, no él) |
| C9 | Posible **nombre "fitcoins"** para los puntos (propuesto por Sol). | todos | Sí: ¿se adopta como nombre oficial? |
| C10 | **Filosofía del valor:** USD 100 ≈ 20 h extra/mes; el bono debe premiar impacto que **supere** el trabajo esperado. | 01 | No |

**Personas mencionadas:** Iván Villavicencio (Gerente General), Juan Pablo (Líder Técnico), Lina Ochoa (Senior, generadora de funcionalidades vendibles), Gabriel (tuvo el título de Semi Senior), Sol (hizo una App; propuso "fitcoins"), Karla (documentación técnica).

---

## 4. Puntos críticos a resolver antes de aplicar (mi lectura como consultor)

1. **C2 (generación de ingresos del Senior) es el cambio más profundo:** rompe el techo de USD 100 para Seniors y crea un esquema **dual** (puntos + comisión por facturación). Hay que definir: ¿qué es "facturación extra"?, ¿cómo se atribuye a un Senior una venta hecha a varios clientes?, ¿se paga una sola vez o recurrente mientras el módulo se siga vendiendo (regalías)? Caso Lina: una funcionalidad que ya se oferta a todos.
2. **C8 (bono del Líder Técnico) reintroduce el conflicto de interés** que justificaba su exclusión. Salida limpia: su bono lo **define y aprueba Gerencia** (no él), sobre métricas globales de soporte + funcionalidades; él sigue validando al resto.
3. **C1 vs C6:** la curva no lineal y la penalidad porcentual deben convivir; la penalidad se aplica **sobre los puntos** antes de pasar por la curva.
4. **C9 (fitcoins):** decisión de naming; si se adopta, "Points Vault" pasaría a ser el "monedero de fitcoins" o similar.

---

## 5. Decisiones del usuario sobre este feedback (29-jun)

- **C7 (perfiles):** ✅ **Sin Semi Senior** por ahora. Quedan Junior, Senior, HelpDesk. **Gabriel pasa directo a Senior** y debe generar valor a nivel senior. (El usuario tiene los nombres de juniors y seniors.)
- **C8 (bono del Líder Técnico):** ✅ **NO se incluye ni se menciona** en ningún documento. Fue una sugerencia de Iván; el usuario la declina expresamente: nunca le han interesado bonos ni aumentos, lo que tiene ha sido por méritos y trabajo duro desde el inicio. **No debe parecer algo que el usuario busque.**
- **C9 (naming):** ✅ La aplicación se llama **FitVault**; los puntos se llaman **fitcoins**. Aplicado en todos los entregables (reemplaza "Points Vault").
- **C2 (Senior = facturación extra):** aclarado — el Senior **busca oportunidades de desarrollo vendibles**: detecta una mejora, la plantea como desarrollo pagable, la vende al cliente, el cliente compra y se factura → esa es la "facturación extra". **No se desarrolla aún** (el piloto no incluye Seniors); se ajusta primero todo para Junior y HelpDesk.

---

## 6. Segundo feedback (Excel 2, 29-jun): puntos y tiempo por tarea — APLICADO

Iván aprobó la propuesta y pidió calcular **por tarea** los **puntos** y el **tiempo razonable**, con estos elementos (en `Formula para pago de incentivos 2.xlsx`):
- **a)** Complejidad 1–5 · **b)** Severidad SLA (Baja 1 … Emergencia 5) · **c)** Nº clientes (1/2/3) · **d)** Antigüedad (1/2/3) · **e)** Premio por entrega anticipada *sin fallas* (+10% / +20%).

**Fórmula aplicada:**
- `Puntos = 2 × a × (b + c) × Antigüedad(d: ×1,0/1,1/1,2) × Premio(e)`
- `Tiempo máx = HorasBase(complejidad) × Factor urgencia(severidad) × Factor(clientes)` — la urgencia **acorta** el tiempo (decisión del usuario).
- El premio (e) se confirma **solo tras el periodo de gracia** (sin fallas).

**Calculadora editable:** `Formula para pago de incentivos 3.xlsx` (hojas Parámetros / Tarea / Ejemplos / Curva).
Plasmado en Algoritmo (03 §1), campos de FitDesk (07 §5), presentación (slide 4) y decisión **D23**.
