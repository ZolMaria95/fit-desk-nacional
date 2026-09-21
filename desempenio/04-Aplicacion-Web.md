# Entregable 4 — FitVault: la aplicación (registro de fitcoins)

**Inspiración:** Jira + GitHub + Steam + apps de banca + Duolingo

> **Nombres:** la aplicación se llama **FitVault**; los puntos se llaman **fitcoins** (en el día a día el equipo hablará de "fitcoins").

> **Dónde encaja (ver Arquitectura, Entregable 7):** FitVault es una app **Flutter** (móvil/web) de **economía y motivación**; **no gestiona tickets**. El trabajo y su **peso/complejidad se registran en FitDesk** (el board); los fitcoins maduran solos al mover la tarjeta. FitVault muestra fitcoins, nota, bono, logros y la vista de Gerencia.

---

## ⏱️ En 30 segundos

- Una sola app web con **dos caras**: la del **colaborador** (motivacional, tipo Duolingo) y la del **validador/tú** (registro y aprobación de puntos).
- Los puntos **se registran casi solos** (el sistema los crea al avanzar el ticket); lo único manual es **reclamar** logros que requieren juicio (causa raíz, mentoría, innovación) → la IA los evalúa → **tú apruebas**.
- Todo es **transparente y auditable**: cada punto tiene su historia.

---

## 1. ¿Cómo funciona el "App de registro de fitcoins"? (tu pregunta)

La idea central: **los puntos NO se cargan a mano uno por uno.** Hay dos vías:

### Vía A — Automática (la mayoría de los puntos)
El sistema observa el ciclo del ticket y de Git y **registra puntos solo**:

```
Dev mueve el ticket  ─►  Sistema detecta el cambio de estado  ─►  Crea/actualiza puntos en la Wallet
   (o hace push)            (webhook de Git / HelpDesk)            (estado: potencial → … → acreditado)
```
Sin fricción: el dev solo trabaja normal; los puntos aparecen en su FitVault.

### Vía B — Reclamo + validación (lo que requiere criterio)
Algunas cosas no se miden solas. El dev las **reclama** con un clic:

```
Dev pulsa "Reclamar"  ─►  Elige tipo (Causa raíz / Mentoría / Innovación)  ─►
   IA analiza y sugiere puntaje  ─►  Entra a TU bandeja  ─►  Apruebas / Ajustas (con motivo)  ─►
   Puntos pasan a "Esperando aprobación" → "Acreditado"
```

**Pantalla de reclamo (boceto):**
```
┌──────────────────────────────────────────────┐
│  Reclamar reconocimiento — Ticket #482         │
│  Tipo:  ◉ Causa raíz  ○ Mentoría  ○ Innovación │
│  Descríbelo: [ "Corregí el origen en el motor  │
│               de validación, evita 12 tickets/ │
│               mes" ]                            │
│  📎 Evidencia (auto): 3 archivos, módulo Core   │
│  🤖 IA sugiere: complejidad 4 · +25 pts         │
│              [ Enviar a validación ]            │
└──────────────────────────────────────────────┘
```

**Tu bandeja de validación (boceto):**
```
┌──────── Pendientes de aprobar (4) ────────────┐
│ #482 Beto · Causa raíz · IA:+25 · [✓][✎][✗]   │
│ #475 Ana  · Mentoría   · IA:+15 · [✓][✎][✗]   │
│ ...                                            │
│ (cada acción exige motivo si cambias el valor) │
└────────────────────────────────────────────────┘
```

> Resultado: el registro es **rápido para el dev, controlado por ti, y 100% trazable**.

---

## 2. Secciones de la app (cara del colaborador)

| Sección | Qué muestra | Vibe |
|---------|-------------|------|
| **Dashboard** | Resumen del mes, puntos, próximo nivel, racha | Duolingo |
| **Mi desempeño** | Notas por dimensión, evolución vs mí mismo | Jira reports |
| **Mis tickets** | Tickets activos, WIP limit, tomar nuevos | Jira |
| **Mis fitcoins (FitVault)** | Puntos por estado (potencial → acreditado) | Banca |
| **Mis bonos** | Bono estimado del mes/trimestre (privado) | Banca |
| **Mi historial** | Línea de tiempo de cada punto | GitHub activity |
| **Ranking personal** | Mi progreso vs mi pasado + insignias | Steam |
| **Próximo nivel** | Qué me falta para subir | Duolingo |
| **Logros / Insignias** | Medallas desbloqueadas | Steam |
| **Estadísticas** | Reaperturas, causa raíz, etc. | Dashboards |

---

## 3. Pantalla principal de FitVault (Flutter, móvil)

```
┌──────────────── FitVault ─────────────────┐
│  Hola, Kevin           Nivel 6  🔥 12 días │
│                                            │
│   ╭──────────────────────────────────╮     │
│   │  BONO ESTIMADO DEL MES           │     │
│   │            $ 64                  │     │  ← curva(nota actual)
│   │   ▓▓▓▓▓▓▓░░   nota 78 / 100      │     │
│   ╰──────────────────────────────────╯     │
│                                            │
│  Mis fitcoins                              │
│   ● Acreditados (=bono)        145         │
│   ◐ En camino                   90         │
│      · Esperando producción   40           │
│      · En certificación       30           │
│      · En desarrollo          20           │
│   ✗ Penalizados este mes       −12         │
│                                            │
│  Logros del mes:  🛡️ Calidad   💡 ×2        │
│  Te falta 1 entrega sin bugs para 🛡️ ×2    │
│                                            │
│ [ Inicio ][ Fitcoins ][ Logros ][ Ranking ]│
└────────────────────────────────────────────┘
```

> Vista extra solo para **Gerencia/Finanzas**: bono a pagar por persona y total del mes (listo para nómina). El bono individual es **privado** para el resto del equipo.

---

## 4. Cómo motiva (sin volverse tóxico)

| Mecánica | Para qué | Riesgo evitado |
|----------|----------|----------------|
| Niveles + barra de progreso | Sensación de avance | — |
| Insignias por **conducta deseada** | Premiar calidad/causa raíz | Premiar solo volumen |
| Racha (días aportando valor) | Constancia | — |
| Ranking = **progreso personal**, no dinero | Motivar sin envidia | Favoritismo/toxicidad |
| Bono **privado** | Evitar comparación salarial | Conflicto |

---

## 5. Roles en la app

| Rol | Puede |
|-----|-------|
| Colaborador | Ver lo suyo, tomar tickets, reclamar reconocimientos, **impugnar** una decisión |
| Validador (tú) | Aprobar/ajustar reclamos, ver auditoría, cerrar mes/trimestre |
| Auditor (futuro) | Solo lectura de todo el historial |

---

*Fin del Entregable 4.*
