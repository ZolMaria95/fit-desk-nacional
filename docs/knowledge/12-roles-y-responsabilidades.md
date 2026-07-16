# 12 — Roles y responsabilidades (referencia para análisis)

Consolidado de los **5 roles** del modelo nacional de FitDesk, para revisión/análisis.
Fuente: [01-modelo-conceptual.md](01-modelo-conceptual.md) §Roles y permisos + [decisiones.md](../decisiones.md).

> **Cambio 2026-07-06:** se eliminó el rol **Despachador** (operativamente ⊂ Responsable de
> Equipo). El **Especialista** se redefinió (ejecutor nacional acotado que escala por solicitud).
> El **Consultor** crea tareas solo para sí. Y los roles **se definen en la plataforma**
> (Asignaciones), NO por el rol que llega del HelpDesk.

---

## 0. Cómo funciona el permiso (leer primero)

El permiso NO es "el usuario tiene rol X". Es una **`Asignacion`** que combina tres cosas:

> **Rol** (qué puede hacer) × **Alcance** (sobre qué: Equipo | Cliente | Regional | Global) × **Vigencia** (desde / hasta)

- **Default deny:** sin una `Asignacion` vigente, el usuario entra pero **no ve nada**.
- **Composición:** una persona = **la suma de sus asignaciones**. Puede tener varias
  (p. ej. *Consultor de Cuenca* **y** *Especialista global*). La realidad matricial se **compone**.
- **Los roles se definen EN la plataforma**, no en el HelpDesk. El login/identidad viene del
  HelpDesk (federación), pero el rol/alcance/vigencia se gestionan en FitDesk (tab Asignaciones).
  El `role_description` del API NO determina permisos.

---

## 1. Consultor

**Esencia:** el ejecutor. Trabaja **sus propias** tareas.

**Responsabilidades / puede:**
- Autoasignarse (tomar) tareas y trabajarlas.
- **Crear tareas solo para sí mismo**; mover sus tarjetas en **su board**.

**No puede:** crear tareas para otros, reasignar, transferir, gestionar sprints/boards, administrar.

**Ve:** sus tareas / su board (plano **operativo**). Si trabaja algo de otro equipo (transferido),
le llega por su filtro personal **"Asignados a mí"** (cruza todos los boards).

---

## 2. Responsable de Equipo

**Esencia:** **lidera su equipo Y responde por sus clientes** (fusión de "líder" + "responsable de cuenta").

**Responsabilidades / puede:**
- **Lidera el equipo:** asignar/reasignar, transferir, y **gobernar los tableros y sprints** de su equipo.
- **Responde por sus clientes:** ve **todos los tickets de los clientes cuyo equipo responsable
  es el suyo**, los atienda quien los atienda — incluso **otra región** (visibilidad **cross-región**).
  Se deriva de `CLIENTE.equipo_responsable_id`.
- **Resuelve las solicitudes** de reasignación/transferencia que le envían los Especialistas.

**No puede:** administrar el sistema (regionales/usuarios/asignaciones — eso es solo ADMIN).

**Ve:** su equipo (táctico-equipo) **+** sus clientes a nivel nacional (táctico-cliente). ← rasgo distintivo.

**Ejemplo (cross-región):** ERCO es cliente de **Cuenca**. Reporta una falla que **resuelve Quito**;
la trabaja un consultor de Quito, pero **Juan (Responsable de Equipo de Cuenca) sigue viendo ese
ticket** porque ERCO es su cliente. **El trabajo cruza de región; la responsabilidad por el cliente, no.**

---

## 3. Especialista (redefinido)

**Esencia:** personas que trabajan a **nivel nacional**, pero **acotadas**: ejecutan lo suyo y
**escalan por solicitud**.

**Responsabilidades / puede:**
- Toma y mueve **solo sus propias** tarjetas; **crea tareas solo para sí mismo**.
- **Escala por SOLICITUD:** en vez de reasignar/transferir directamente, **envía una solicitud
  (con explicación) al Responsable de Equipo**, que decide y ejecuta. Mismo mecanismo para
  **transferir** a otro equipo.

**No puede:** reasignar/transferir directamente, crear tareas para otros, gestionar boards,
ver el equipo, administrar.

**Ve:** **sus tareas** (plano **operativo**) — trabaja a nivel nacional pero solo lo asignado a él.

**Ejemplo:** un experto de core financiero que apoya casos de cualquier regional; trabaja los
tickets que le asignan y, si algo debe reasignarse o pasar a otro equipo, **lo solicita** al
Responsable de Equipo correspondiente.

---

## 4. Gerencia / Visor

**Esencia:** la **mirada estratégica, de solo lectura**.

**Responsabilidades / puede:** ver **todo a nivel nacional**.

**No puede:** operar — no toma, no asigna, no transfiere, no gestiona, no administra.

**Ve:** **global read-only** (plano **estratégico**).

---

## 5. Administrador (ADMIN)

**Esencia:** **control total del sistema.**

**Responsabilidades / puede:**
- Todo lo operativo a nivel **global**.
- **Administración:** regionales, equipos, clientes, **usuarios y asignaciones**, tableros/sprints,
  estados del flujo, integración HelpDesk. Es el **único** con esta sección.

**El meta-poder:** el Admin **crea/edita las Asignaciones** → literalmente **define quién es qué**.
Opera *sobre* la matriz; los demás operan *dentro* de ella.

---

## Matriz de permisos (resumen)

| Acción | Consultor | Resp. Equipo | Especialista | Gerencia | Admin |
|---|:--:|:--:|:--:|:--:|:--:|
| Tomar tarea (autoasignarse) | ✔ | ✔ | ✔ (solo suyas) | — | ✔ |
| Reasignar a otro | — | su equipo | — (solo solicita) | — | global |
| Transferir a otro equipo | — | ✔ | — (solo solicita) | — | ✔ |
| Crear tarea | solo para sí | sus boards | solo para sí | — | ✔ |
| Gestionar sprint / board | — | sus boards | — | — | ✔ |
| **Ver (visibilidad)** | sus tareas | su equipo + sus clientes (nacional) | sus tareas | global (R) | global |
| Administración | — | — | — | — | ✔ |

---

## Los 4 planos de visibilidad

| Plano | Quién | Qué ve | Eje |
|---|---|---|---|
| Operativo | Consultor, Especialista | sus tareas | usuario |
| Táctico-equipo | Responsable de Equipo | su board / su equipo | Equipo |
| Táctico-cliente | Responsable de Equipo | los clientes de su equipo (cross-equipo, nacional) | Cliente |
| Estratégico | Gerencia, Admin | toda la operación | Global |

---

## Mecanismo de solicitud (Especialista → Responsable de Equipo)

Como el Especialista no reasigna/transfiere directamente, se define una **solicitud**:

> `Solicitud(tarea, solicitante, tipo: REASIGNACION | TRANSFERENCIA, motivo/explicación,
> estado: PENDIENTE → APROBADA | RECHAZADA, resuelta_por)`

El Responsable de Equipo la ve, y **aprueba (ejecuta) o rechaza**. La de transferencia se
apoya en la entidad `TRANSFERENCIA` (tabla en V1) volviéndola *request-based*.
**Estado:** **IMPLEMENTADO (2026-07-09)** — tabla `solicitud` (V5) + `SolicitudResource`
(`/api/solicitudes`), y `Transferencia` request-based (`TransferenciaResource` `/api/transferencias`,
con bandeja de aceptar/rechazar en el equipo destino). El Especialista escala desde la tarjeta
("Escalar"); el RE resuelve en la **Bandeja** (`/bandeja`). Al aprobar una solicitud de transferencia
se genera una `transferencia` PENDIENTE. Ver [decisiones.md](../decisiones.md) y
[aprendizajes.md](../aprendizajes.md) 2026-07-09.

---

## Cómo se aplican / gestionan hoy

- Los roles se asignan/editan/quitan desde **Administración → Usuarios y roles / Asignaciones**
  (Rol × Alcance × Vigencia). El ETL solo sembró un rol inicial; a partir de ahí se gestiona en la UI.
- Mapeo inicial del ETL (rol local → nacional): `Helpdesk → RESPONSABLE_EQUIPO`,
  `Supervisor → RESPONSABLE_EQUIPO`, `Consultor → CONSULTOR`.
- **Enforcement pendiente:** hoy la app todavía gatea con `esMSC001`/`esSupervisor` (derivados del
  API). El objetivo es derivar los permisos de las **Asignaciones de la plataforma** (próximo slice).
