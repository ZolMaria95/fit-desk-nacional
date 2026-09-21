# Entregable 9 — APIs REST

**Estilo:** REST sobre HTTPS, JSON, con roles y auditoría.

---

## ⏱️ En 30 segundos

- Endpoints agrupados por área: tickets, puntos, validación, notas/bonos, gamificación, IA, auditoría.
- Los **webhooks** (HelpDesk/Git) entran por endpoints propios.
- Cada acción sensible exige **rol** y deja **evento de auditoría**.

---

## 1. Convenciones

- Base: `/api/v1`
- Auth: token (SSO/OAuth). Roles: `colaborador`, `validador`, `auditor`.
- Respuestas con `id`, timestamps y, en acciones sensibles, `motivo`.

---

## 2. Endpoints principales

### Tickets y puntos
| Método | Ruta | Para qué | Rol |
|--------|------|----------|-----|
| GET | `/tickets` | Listar tickets (con filtros, disponibles, propios) | colaborador |
| POST | `/tickets/{id}/tomar` | Tomar un ticket (respeta WIP limit) | colaborador |
| GET | `/puntos/me` | Mi FitVault (puntos por estado) | colaborador |
| GET | `/puntos/{id}/historial` | Historial de transiciones de un punto | colaborador |

### Registro / reclamo de puntos
| Método | Ruta | Para qué | Rol |
|--------|------|----------|-----|
| POST | `/reclamos` | Reclamar causa raíz / mentoría / innovación | colaborador |
| GET | `/reclamos/pendientes` | Bandeja de validación | validador |
| POST | `/reclamos/{id}/aprobar` | Aprobar (con ajuste y motivo) | validador |
| POST | `/reclamos/{id}/rechazar` | Rechazar (con motivo) | validador |

### IA
| Método | Ruta | Para qué | Rol |
|--------|------|----------|-----|
| GET | `/ia/sugerencia/{ticketId}` | Sugerencia (complejidad/calidad/impacto/riesgo) + explicación | validador |
| POST | `/ia/recalibrar` | Disparar recalibración trimestral | validador |

### Notas y bonos
| Método | Ruta | Para qué | Rol |
|--------|------|----------|-----|
| GET | `/notas/me?periodo=` | Mi nota y detalle por dimensión | colaborador |
| GET | `/bonos/me` | Mi bono estimado/pagado (privado) | colaborador |
| POST | `/periodos/{id}/cerrar` | Cerrar mes/trimestre y congelar notas | validador |

### Gamificación
| Método | Ruta | Para qué | Rol |
|--------|------|----------|-----|
| GET | `/dashboard/me` | Resumen, nivel, racha, próximo nivel | colaborador |
| GET | `/logros/me` | Insignias y logros | colaborador |
| GET | `/ranking` | Ranking de progreso/insignias (sin montos) | colaborador |

### Impugnación y auditoría
| Método | Ruta | Para qué | Rol |
|--------|------|----------|-----|
| POST | `/impugnaciones` | Impugnar una decisión | colaborador |
| GET | `/auditoria?entidad=` | Consultar eventos | auditor/validador |

### Webhooks (entrada de datos)
| Método | Ruta | Origen |
|--------|------|--------|
| POST | `/webhooks/helpdesk` | Cambios de ticket, reaperturas, CSAT |
| POST | `/webhooks/git` | Push / PR / merge |

---

## 3. Ejemplo de respuesta (`GET /puntos/me`)

```json
{
  "colaborador_id": 12,
  "resumen": { "acreditados": 145, "potenciales": 20, "diferidos": 25, "revertidos": -40 },
  "por_estado": [
    { "estado": "acreditado", "puntos": 145 },
    { "estado": "esperando_produccion", "puntos": 40 },
    { "estado": "en_pruebas", "puntos": 30 }
  ]
}
```

---

## 4. Principios de la API

- **Idempotencia** en webhooks (no contar dos veces un mismo evento).
- **Acciones sensibles → evento de auditoría** automático.
- **Nada de borrar**: se anula con transición/estado, no con DELETE.
- **Paginación y filtros** en los GET de listas.

---

*Fin del Entregable 9.*
