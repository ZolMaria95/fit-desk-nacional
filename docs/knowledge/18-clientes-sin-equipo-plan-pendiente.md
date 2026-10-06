# Tareas de clientes sin equipo — PLAN PENDIENTE (en espera de gerencia)

> **Estado (2026-10-05): en espera.** La dueña pidió no aplicar nada hasta que gerencia defina cómo tratar a
> los clientes que no pertenecen a ningún equipo. El código se revirtió; producción sigue como estaba.

## Problema
La creación automática de tareas para tickets asignados directo en el HelpDesk (`POST
/api/legacy/stories/desde-ticket-asignado`, desplegada el 2026-10-03), cuando el cliente del ticket **no está
registrado en FitDesk** (o no tiene equipo responsable), pone la tarea en el equipo de **quien abre el Board**.

Resultado en producción (2026-10-05): **725 tareas en el tablero CUENCA**, de las que solo 34 son de gente de
CUENCA. Ejemplo reportado: #22581 (SOFT WAREHOUSE S.A.), de María de los Ángeles Ruano (SIERRA NORTE).

| Equipo de la persona asignada | Tareas en CUENCA |
|---|---|
| SIERRA CENTRAL | 297 |
| DESARROLLOS EXTERNOS | 174 |
| SIERRA NORTE | 105 |
| QUITO y SIERRA NORTE (una persona en ambos) | 70 |
| APP MÓVILES | 37 |
| QUITO | 8 |
| CUENCA (correctas) | 34 |

**692 de las 725 son de SOFT WAREHOUSE S.A.** (la propia empresa: tickets internos). Las demás son de
INTERNATIONAL GLOBAL BANK (14), AUSTROBANK (9), SAIBANK (3), COAC ESCENCIA INDIGENA (2), COAC PILAHUIN TIO (2),
FINANCIERA UNION DEL SUR (2) y COAC CRECER WIÑARI (1).

## Clientes sin equipo (catálogo HelpDesk vs FitDesk, 2026-10-05)
45 clientes en el HelpDesk; 27 registrados en FitDesk; **18 sin equipo**: AUSTROBANK (53), COAC CRECER WIÑARI
(30), COAC JUVENTUD ECUATORIANA PROGRESISTA LTDA (16), COAC PILAHUIN TIO LTDA (10), CODECOM CIA LTDA (44),
COMMONWEALTH (32), COOPERATIVA DE AHORRO Y CRÉDITO CACPE LOJA LTDA (68), FINANCIERA UNION DEL SUR (62),
FININVEST OVERSEAS INC. LTD. (65), INTERNATIONAL GLOBAL BANK (63), MIGRACION (67), PANAFINSA (61), REPUBLIC
INTERNATIONAL BANK (47), RIALTO (25), SAIBANK (45), SEGUROS UNIDOS (49), SOFT WAREHOUSE S.A. (46), VEGACOOP (27).
COAC ESCENCIA INDIGENA LTDA (8) tiene tareas pero ya no está en el catálogo (inactivo).

## Opciones evaluadas (para decidir con gerencia)
1. **Tablero del equipo del consultor** (la última preferencia de la dueña; implementado y probado en local, luego
   revertido). Solo para clientes no registrados; si el cliente tiene equipo, manda el del cliente.
   - Regla: equipo del que es miembro; si son varios, el que dirige quien abre el Board o, si no, el de id menor;
     sin equipo, su **equipo base** (V32); si tampoco, el de quien abre el Board.
   - Migración de datos (simulada en prod, solo lectura): 297 → SIERRA CENTRAL, 174 → DESARROLLOS EXTERNOS,
     105 → SIERRA NORTE, 78 → QUITO, 37 → APP MÓVILES; 34 se quedan en CUENCA.
2. **Tablero "Clientes sin equipo"** (probado y descartado por la dueña): board propio visible para ADMIN y
   responsables; al registrar el cliente en un equipo, sus tareas pasaban solas a ese equipo.
3. **Registrar los 18 clientes en un equipo** (Administración → Clientes): con eso sus tareas nuevas ya van al
   equipo del cliente sin cambiar código. Falta decidir qué hacer con SOFT WAREHOUSE (tickets internos).

## Mientras tanto
- Las tareas siguen naciendo en el equipo de quien abre el Board (comportamiento actual).
- La creación automática SÍ pone la columna correcta según el estado del ticket (desplegado 2026-10-05).
- El reporte "Estado del equipo" cuenta las tareas por persona en cualquier tablero, así que la carga de cada
  consultor se ve bien aunque la tarea esté en el tablero CUENCA.
