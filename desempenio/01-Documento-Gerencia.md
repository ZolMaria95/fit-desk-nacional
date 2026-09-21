# Propuesta: Sistema de Bono Variable por Desempeño (SIRD)

**Presentada por:** Líder Técnico
**Dirigida a:** Gerencia General
**Fecha:** 27 de junio de 2026

---

## 1. Qué propongo

Implementar un **bono variable adicional de hasta USD 100 al mes por persona**, calculado de forma **objetiva, transparente y auditable** sobre el trabajo del equipo, con apoyo de Inteligencia Artificial.

- Es un bono **adicional**: los bonos fijos actuales **no se tocan**.
- Es un **techo individual** (cada quien gana según sus méritos contra un estándar fijo). **No** es un monto repartido entre el equipo, así que nadie gana a costa de otro.
- El bono **crece de forma no lineal**: **aportar más valor rinde mucho más**; el monto se concentra en el desempeño de alto impacto (ver punto 8).
- La IA **sugiere** la valoración de cada trabajo; **la decisión final es humana**.
- Premia **calidad, impacto, desarrollo e innovación**, no el volumen de tickets cerrados.

**Costo máximo:** 12 personas × USD 100 = **USD 1.200/mes** (caso teórico de que todos lleguen al tope; el costo real esperado es menor).

---

## 2. Frentes de trabajo que cubre

El sistema **no es solo de soporte**. Valora **todos los frentes** del equipo, con su propia forma de medir calidad y valor. El peso lo da la **complejidad y el impacto reales**, no el tipo de trabajo (un desarrollo complejo y una incidencia compleja pueden valer lo mismo).

| Frente | Qué es | Cómo se mide su calidad | Qué penaliza |
|--------|--------|-------------------------|--------------|
| **Correctivo** | Incidencias, bugs, soporte | Cierre estable, sin reaperturas | Reapertura del ticket |
| **Evolutivo** | Nuevas funcionalidades sobre apps existentes | Cumple requisitos, sin fallos tras la entrega, con pruebas | Bug crítico post-entrega / rollback |
| **Nuevo desarrollo** | Crear aplicaciones o módulos desde cero | Alcance entregado, calidad de la base, adopción y satisfacción del cliente | Bug crítico post-entrega / rechazo del cliente |
| **Innovación / mejora técnica** | I+D, automatización, refactor, reducción de deuda técnica | Mejora real y medible, validada | Que rompa algo existente |

> En la práctica el trabajo está **equilibrado entre desarrollo y correctivo**, y el esquema los valora por igual según su dificultad e impacto.

---

## 3. Objetivo

Mejorar la **calidad de lo que construimos y mantenemos** y la **satisfacción del cliente**, reduciendo el retrabajo (reaperturas, bugs post-entrega, incidencias repetidas) y reconociendo el **desarrollo y la innovación**, con un incentivo que el equipo perciba como **justo** y que **elimine la sensación de favoritismo**.

| Indicador | Meta a 6 meses |
|-----------|----------------|
| Tickets reabiertos en 30 días | −30% |
| Bugs críticos tras una entrega de desarrollo | −30% |
| Incidencias repetidas por módulo | −25% |
| Trabajo resuelto a nivel de causa raíz | +40% |
| Satisfacción del cliente (CSAT) | ≥ 4,3 / 5 |
| Justicia percibida (encuesta interna) | ≥ 75% |
| Throughput (entregas y cierres/mes) | sin caída > 5% |

---

## 4. Qué premiamos

| Se premia | Por qué le conviene a la empresa |
|-----------|----------------------------------|
| Calidad | Menos retrabajo y menos costo de garantía |
| Impacto | Cambios que benefician a más usuarios/módulos |
| **Desarrollo de funcionalidades y nuevas apps** | Es lo que construye el producto que genera ingresos |
| Eliminación de causa raíz | El problema resuelto de raíz no vuelve a costar |
| Colaboración y mentoría | Sube el nivel de todo el equipo |
| Innovación y evolución técnica | Menos deuda técnica = más velocidad futura |
| Satisfacción del cliente | Es el resultado que paga las facturas |

**Principio rector:** *vale más el trabajo bien hecho que no genera retrabajo —sea un problema resuelto de raíz o una funcionalidad entregada sin fallos— que la velocidad sin calidad.*

---

## 5. Participantes

| Perfil | Cantidad | Participa |
|--------|:-------:|:---------:|
| Junior | 6 | **Sí — inicia el piloto** |
| HelpDesk | 1 | **Sí — inicia el piloto** |
| Senior | 5 | Sí, en **fase posterior** (esquema propio, ver abajo) |
| Líder Técnico (yo) | 1 | **No** (validador) |

**Sobre los Seniors:** entrarán en una **fase posterior** con un **esquema propio orientado a la generación de ingresos**. Además de resolver causa raíz, **difundir esas soluciones a todos los clientes** y mentorizar, se busca que **detecten oportunidades de mejora, las propongan como desarrollos vendibles y las concreten en facturación** (por ejemplo, una mejora que se le vende a un cliente y luego se oferta a todos). Ese componente se reconocería como un **porcentaje de la facturación extra generada, sin el tope de USD 100**. Se detallará cuando el piloto de Juniors y HelpDesk esté estabilizado.

**Sobre mi exclusión:** yo, como Líder Técnico, considero que no estaría bien que ingrese al esquema. Soy quien **valida las evaluaciones**, de modo que participar a la vez del bono generaría un **conflicto de intereses** y se percibiría como **injusto** —justo lo contrario de lo que busca este programa, que es eliminar el favoritismo—. A esto se suma que mi trabajo (arquitectura, motores transversales, validación de soluciones, cambios sobre múltiples módulos) no es equiparable a un trabajo individual. Por ambas razones me mantengo fuera del bono y asumo el rol de **validador del sistema** (ver punto 11).

---

## 6. Cómo se toma el trabajo

Cada colaborador **toma libremente** los tickets/tareas que desee (sean correctivos o de desarrollo). Para evitar que todos elijan lo fácil y quede huérfano lo difícil, el modelo incluye:

| Mecanismo | Efecto |
|-----------|--------|
| El puntaje es **proporcional a la complejidad** | Un trabajo difícil **paga más** → conviene tomarlo |
| **Multiplicador de antigüedad (con tope)** | Una tarea postergada sube algo de valor —con límite— para que se tome, sin que convenga "dejarla envejecer" a propósito |
| **Límite de trabajos simultáneos** | Evita el acaparamiento |
| **Asignación automática** (si nadie la toma) | Round-robin según skill y carga, respetando plazos |
| **Emergencias / incidencias críticas** | Se **asignan directamente** al técnico que pueda resolverlas en el menor tiempo posible; no esperan a que alguien las tome |

---

## 7. Esquema de puntuación (por perfil)

La nota mensual de cada persona es un valor **0–100** que se traduce a bono (ver punto 8). Las dimensiones aplican a **todos los frentes** de trabajo (lo que cambia es cómo se mide la calidad en cada uno, según el punto 2).

### Junior
| Dimensión | Peso |
|-----------|:---:|
| Calidad (entrega estable: sin reaperturas ni bugs post-entrega) | 30% |
| Productividad (normalizada por complejidad) | 20% |
| Impacto (módulos/usuarios afectados) | 20% |
| Colaboración (ayuda, documentación, reviews) | 20% |
| Innovación | 10% |

### Senior
| Dimensión | Peso |
|-----------|:---:|
| Eliminación de causa raíz / calidad de diseño que evita problemas futuros | 30% |
| Casos críticos y desarrollos complejos | 25% |
| Mentoría | 20% |
| Arquitectura / deuda técnica | 15% |
| Innovación | 10% |

> ⚠️ El esquema Senior se **rediseñará en la fase posterior** para incorporar la **generación de ingresos** (facturación extra, sin tope de USD 100). El piloto arranca solo con **Junior y HelpDesk**.

### HelpDesk
| Dimensión | Peso |
|-----------|:---:|
| Calidad del registro / triage | 30% |
| Resolución en primer contacto (sin escalar al equipo) | 25% |
| Tiempo de primera respuesta | 15% |
| Seguimiento | 15% |
| Satisfacción del cliente con la atención | 15% |

> El HelpDesk se mide por la **atención** que sí controla, no por la solución técnica (mérito del desarrollador). La encuesta al cliente se divide en dos: satisfacción con la *atención* (HelpDesk) y con la *solución* (desarrollador).

**Penalizaciones:** una reapertura, un bug crítico tras la entrega, un rollback o un incidente **no anulan todo el trabajo**: aplican una **penalidad porcentual** (pequeña al inicio, mayor según la gravedad) sobre los puntos. Estos se acreditan al llegar a producción y ser aceptados por el cliente, **ya netos de esa penalidad**. Así se premia corregir rápido y se evita que se envíe trabajo sin probar.

---

## 8. Cómo nace el punto y cómo se paga

1. Al **tomar** un trabajo nacen **fitcoins potenciales** = valor base × complejidad × antigüedad.
2. Los puntos **maduran** mientras el trabajo avanza (desarrollo → pruebas → aprobación → producción).
3. Se **acreditan** (se vuelven dinero) solo cuando llega a producción **y sobrevive un periodo de gracia** (p. ej. 15 días) sin reabrir ni presentar bugs críticos.
4. Si reabre, falla, hace rollback o causa un incidente → se aplica una **penalidad porcentual** (según gravedad); el resto del trabajo **sí se reconoce** una vez corregido y aceptado.

### Cálculo del bono (curva no lineal)

El bono **premia el valor entregado**: crece de forma no lineal, de modo que **aportar más rinde mucho más**. No deja a nadie en cero —un mes bajo reconoce solo algo simbólico—, pero el grueso del bono **se concentra en el alto desempeño**, que es lo que genera valor para la empresa.

`Bono = 0,0087 × Nota² + 0,1431 × Nota − 0,5991` (redondeado), con la Nota de 0 a 100.

| Nota | Bono | | Nota | Bono |
|:---:|:---:|---|:---:|:---:|
| 10 | USD 2 | | 60 | USD 40 |
| 20 | USD 6 | | 70 | USD 53 |
| 30 | USD 12 | | 80 | USD 67 |
| 40 | USD 20 | | 90 | USD 83 |
| 50 | USD 29 | | 100 | USD 100 |

> **Referencia de valor:** USD 100 equivale a ~20 horas extra al mes. Por eso el tope se reserva para un impacto que **supere** el trabajo esperado del día a día: causa raíz, trabajo futuro evitado, funcionalidad vendible o mejora significativa de proceso.

**Pago:** Junior y HelpDesk, **mensual**. (El esquema y la periodicidad de los Seniors se definen en su fase posterior.)

---

## 9. Ejemplo claro

**Ana (Junior) — mes de junio.** Su trabajo del mes combina frentes:

| Trabajo | Frente | Complejidad | Resultado |
|---------|--------|:----------:|-----------|
| Nueva pantalla de reportes | Evolutivo | 4 | Entregada; sin bugs en el periodo de gracia |
| Bug de cálculo de saldos | Correctivo | 2 | Resuelto de raíz; no reabrió |
| Automatizó un proceso manual | Innovación | 3 | Validado por el Líder Técnico |

Sus fitcoins acreditados dan una **nota de 78** → **bono ≈ USD 64** (según la curva).

**Beto (Junior) — mismo mes, contraste.** Cerró muchos correctivos rápido, pero **2 reabrieron** y tuvo **1 rollback**. La **penalidad porcentual** (no la pérdida total) reduce sus puntos y su **nota queda en 50** → **bono ≈ USD 29**.

> Lectura: **ambos cobran algo** (nadie "bota la toalla"), pero Ana gana **más del doble** que Beto por entregar valor real en varios frentes con calidad. Las penalidades de Beto le bajan el bono sin dejarlo en cero, lo que lo incentiva a corregir y mejorar el mes siguiente.

---

## 10. La aplicación de seguimiento (visibilidad para Gerencia)

Todo el programa se opera desde una **aplicación web llamada FitVault** (los puntos se llaman **fitcoins**), que da visibilidad en tiempo real a cada nivel:

- **El colaborador** ve sus **puntos ganados y en proceso**, su nota y su progreso → sabe exactamente qué hacer para mejorar su bono.
- **La Gerencia y Finanzas** ven, por persona y por periodo, los **fitcoins acreditados** y el **monto exacto del bono a pagar**, listo para procesar en la nómina —sin cálculos manuales ni planillas sueltas—.
- Yo, como Líder Técnico, **valido** desde ahí las sugerencias de la IA.

**En qué le ayuda al Gerente:**

| Necesidad del Gerente | Lo que entrega la app |
|-----------------------|------------------------|
| Saber cuánto pagar este mes/trimestre | Reporte automático del bono por persona |
| Confiar en que el cálculo es correcto | Cada monto es **trazable** hasta el trabajo que lo generó (auditable) |
| Controlar el presupuesto | Total a pagar visible en todo momento (techo USD 1.200/mes) |
| Tomar decisiones de equipo | Datos objetivos de desempeño y evolución |

> El detalle de la aplicación (pantallas, registro de fitcoins, niveles y logros) está en el anexo correspondiente.

---

## 11. Riesgos y cómo los controlo

| Riesgo | Control |
|--------|---------|
| Que "inflen" trabajos para sumar puntos | El puntaje se basa en el **código real (Git)**, no solo en la descripción |
| Que dejen crecer problemas para resolverlos "heroicamente" | Se **penaliza la recurrencia** por módulo |
| Que tomen solo lo fácil | Puntaje proporcional a la complejidad (punto 6) |
| Que baje la productividad por enfocarse solo en calidad | Métrica de control: el throughput no debe caer |
| Que la IA decida sola o se perciba opaca | La IA solo sugiere; yo valido cada caso, con justificación escrita y registro auditable; las reglas son públicas |

> Yo, como Líder Técnico, **valido** en el piloto las sugerencias de la IA (no califico subjetivamente: confirmo o ajusto lo que la IA propone, dejando constancia del motivo). Si el programa se extiende a nivel nacional, esa validación pasaría a un comité.

---

## 12. Plan piloto (3 meses)

**Alcance inicial:** el piloto arranca con los **Juniors (Cuenca) y el HelpDesk**. Los Seniors se incorporan en una **fase posterior** con su esquema propio (generación de ingresos).

| Fase | Duración | Qué pasa | Paga bono |
|------|----------|----------|:---------:|
| Línea base | Semanas 1–2 | Medir reaperturas, throughput, calidad de entregas y CSAT actuales | No |
| Sombra | Mes 1 | El sistema puntúa pero no se paga; se calibra la IA | No |
| Piloto pagado | Meses 2–3 | Bono real con techo reducido (USD 50) | Sí |
| Producción | Mes 4+ | Techo completo (USD 100) | Sí |

**Criterios para avanzar:** justicia percibida ≥ 70%, coincidencia IA–validación ≥ 80%, sin caída de throughput > 10%, reaperturas/bugs a la baja.

---

## 13. Qué solicito a Gerencia

1. Aprobar el **concepto** del bono variable por desempeño.
2. Aprobar el **plan piloto de 3 meses**.
3. Autorizar la construcción del **MVP** que soporta el piloto.

---

*Anexos disponibles: esquema de puntuación detallado, algoritmo, aplicación, modelo de datos, arquitectura y plan de MVP.*
