# SIRD — Sistema Inteligente de Reconocimiento por Desempeño

Propuesta integral (consultoría + diseño de producto) para un esquema de **bono variable
adicional basado en desempeño**, evaluado con apoyo de IA, para un equipo de desarrollo de
software.

## Por dónde empezar

👉 **Lee primero [`00-CONTEXTO-Y-DECISIONES.md`](00-CONTEXTO-Y-DECISIONES.md)** — es la base de
conocimiento: contexto, decisiones tomadas, riesgos, estado y cómo retomar el trabajo.

## Índice de entregables

| # | Documento | Estado |
|---|-----------|--------|
| 0 | [Base de conocimiento y decisiones](00-CONTEXTO-Y-DECISIONES.md) | ✅ |
| 0b | [Conversación con Gerencia (feedback)](00b-Conversacion-Gerencia.md) | ✅ |
| 1 | [Documento para Gerencia](01-Documento-Gerencia.md) | ✅ |
| 2 | [Esquema de puntuación por perfil](02-Esquema-Puntuacion.md) | ✅ |
| 3 | [Algoritmo de puntuación](03-Algoritmo.md) | ✅ |
| 4 | [Aplicación web (+ app de registro de fitcoins)](04-Aplicacion-Web.md) | ✅ |
| 5 | [FitVault (registro de fitcoins)](05-FitVault.md) | ✅ |
| 6 | [Modelo de IA](06-IA.md) | ✅ |
| 7 | [Arquitectura técnica](07-Arquitectura.md) | ✅ |
| 8 | [Modelo de datos](08-Modelo-Datos.md) | ✅ |
| 9 | [APIs REST](09-APIs.md) | ✅ |
| 10 | [Plan de MVP](10-MVP.md) | ✅ |

## Decisiones clave (resumen)

- Bono **techo individual** hasta **USD 100/mes**, no suma cero. Los bonos fijos actuales se mantienen.
- Datos disponibles hoy: **tickets + Git** (sin CI/CD ni monitoreo de producción aún).
- Tickets en modo **pull** con salvaguardas anti-cherry-picking.
- **La IA sugiere; un comité de calibración valida.** Nunca decide la IA.
- Se premia **calidad, impacto y causa raíz**, no el volumen de tickets cerrados.
