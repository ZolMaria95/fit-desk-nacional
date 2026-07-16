# 05 — Menú de la app y panel de administración

Estructura de navegación de FitDesk en la versión nacional. Los grupos Trabajo y HelpDesk ya existen (se conservan); **Administración es nuevo** (hoy no existe) y es lo que habilita el alcance nacional.

## Árbol de menú

```
FitDesk
├─ Trabajo (Scrum)
│  ├─ Tablero (Board)
│  ├─ Mi Panel / Asignados a mí
│  ├─ Burndown
│  ├─ Progreso
│  └─ Consultas
├─ HelpDesk
│  ├─ Tickets
│  ├─ HelpDesk Semanal
│  └─ Pendientes
└─ Administración        (solo rol ADMIN)
   ├─ Regionales
   ├─ Equipos
   ├─ Clientes
   ├─ Usuarios y roles
   ├─ Asignaciones
   ├─ Tableros y sprints
   ├─ Estados del flujo
   └─ Integración HelpDesk
```

## Trabajo (Scrum) — existente

| Opción | Contenido |
|---|---|
| Tablero (Board) | Tareas en columnas (To Do / In Progress / En Certificación / Entregado), drag&drop, filtros (prioridad/asignado/cliente/N° ticket), sprint activo. |
| Mi Panel / Asignados a mí | Lo asignado a la persona cruzando todos los boards (aquí el ejecutor de otro equipo ve la tarea transferida). |
| Burndown | Avance del sprint (gráfico ideal vs. real, velocidad). |
| Progreso | Registro de avances por tarea (autor, fecha, horas, notas). |
| Consultas | Preguntas/respuestas del equipo (abiertas/resueltas). |

## HelpDesk — existente

| Opción | Contenido |
|---|---|
| Tickets | Lista de tickets (filtros cliente/estado), crear tarea, conversación en vivo, asignar. |
| HelpDesk Semanal | Rotación de soporte por semana (Vie→Jue) + tickets resueltos. |
| Pendientes | Tickets con recordatorio (fecha/hora) y alarma diaria hasta atender. |

## Estado de implementación (2026-07-02)

🚧 **IMPLEMENTADO:** sección **Administración** en el menú (para **ADMIN y RESPONSABLE_EQUIPO**,
por **roles de plataforma**; ver más abajo) y solo en modo Quarkus) con página `/admin` de 4 tabs:
**Regionales, Equipos, Clientes, Asignaciones**. Cada tab lista (con
**ordenamiento** por columna) y tiene un botón "Nuevo…" que abre un **modal** para parametrizar el alta.
- **Asignaciones** (única vista de personas/roles desde 2026-07-06; ver ADR): `(usuario · rol ·
  alcance · vigencia)` — aquí se define, p.ej., "Fulano · RESPONSABLE_EQUIPO · Equipo Cuenca".
  Una **fila por asignación** (una persona puede aparecer varias veces), con columnas Usuario,
  **ID API**, Rol, Alcance, Objetivo, Desde/Hasta. El **nombre del Usuario se toma del API**
  (catálogo del HelpDesk, cruzado por `helpdesk_user_id`); el nombre local (ETL) queda de respaldo
  solo si el catálogo aún no cargó o no tiene a esa persona. Alcance polimórfico (EQUIPO/CLIENTE/REGIONAL/GLOBAL);
  el backend valida coherencia (400) y el CHECK del esquema la refuerza. Se puede **crear, editar
  (rol/alcance/vigencia, incl. finalizar con fecha hasta) y quitar**. Tiene **buscador** (por
  **nombre, código del API, rol o alcance**). Para asignar a un empleado que aún no tiene ningún rol,
  **"Nueva asignación"** lo toma del catálogo del HelpDesk (con buscador) y lo materializa.
  > Se **eliminó la tab "Usuarios y roles"** (vista por persona): Asignaciones ya cubre crear/editar/
  > quitar y asignar en frío; lo único que se dejó de ver es el padrón de empleados **sin rol** todavía.
- **5 roles** (se eliminó `DESPACHADOR`, 2026-07-06). El selector de rol lee `/api/catalogos/roles`.
- **Usuarios/personas desde el HelpDesk:** los selectores de
  usuario (asignación) y de **responsable de equipo** (alta de equipo) salen del **catálogo de
  empleados del HelpDesk** (`/users/catalog`, con **buscador**), no de una lista fija. Al elegir a
  alguien, el backend **materializa** su fila `usuario` (por `helpdesk_user_id`) si no existía
  —igual que los Clientes— y crea la asignación. Crear un equipo con responsable genera además su
  `Asignacion(RESPONSABLE_EQUIPO, alcance=ese equipo)` en un paso. Los **equipos también se editan**
  (regional/nombre) y desde el mismo modal se puede **(re)asignar el responsable** — es único por
  equipo (reemplaza el anterior; no toca otras asignaciones de esa persona, p. ej. su ADMIN). La
  tabla de Equipos muestra una columna **Responsable** (nombre tomado del API por su `helpdesk_user_id`).
  El modal de edición también incluye un interruptor **Activo/Inactivo** (el backend ya aceptaba `activo` en el PUT).
  **Semántica de la baja lógica (2026-07-06):** desactivar un equipo (no hay DELETE de equipos, por FKs de
  historia) lo **oculta de los selectores** (equipo responsable al crear cliente; alcance EQUIPO al asignar),
  pero **no** borra ni cascada nada. En la tabla de Equipos el inactivo se muestra **atenuado** (`fila-inactiva`).
  Al **editar** una asignación que ya apunta a un equipo inactivo, ese equipo se incluye igual en el selector
  para no perder el valor. El filtro es del front (`equiposParaSelector`); el backend sigue devolviendo todos.
- Backend: `UsuarioResource`, `AsignacionResource` (`/api/admin/{usuarios,asignaciones}`; GET/POST/PUT/DELETE),
  roles vía `/api/catalogos/roles`. Con esto se crea la 2ª regional, su equipo y sus clientes (con
`helpdesk_client_id` y equipo responsable) **sin tocar código** — incluidos los 6 clientes
de otra regional pendientes.
- Backend: `RegionalResource` (GET/POST/PUT), `EquipoResource` y `ClienteResource`
  (`/api/admin/equipos`, `/api/admin/clientes`; GET/POST/PUT/DELETE, valida obligatorios y duplicados).
- **Clientes desde el API:** el alta toma el cliente del **catálogo del HelpDesk**
  (`/clients/catalog` vía proxy) — autocompleta nombre + `helpdesk_client_id` y sugiere el slug;
  oculta los ya dados de alta. También se puede **quitar** un cliente (`DELETE`): lo desliga de
  tarea/espejo/pendiente (cliente→NULL) y borra sus asignaciones de alcance CLIENTE.
- Frontend: `features/admin/` (`AdminApiService` + `Administracion`), `adminGuard`,
  `auth.puedeAdministrar`.
- **Gating por roles de plataforma (2026-07-06):** el acceso ya **no** es `esMSC001` sino los
  **roles de plataforma** del usuario (sus Asignaciones), vía `GET /api/admin/mis-roles/{hid}`.
  El panel está disponible para **ADMIN y RESPONSABLE_EQUIPO**; `adminGuard` es async y espera
  a que carguen los roles. **Solo un ADMIN puede definir/modificar/quitar una asignación de rol
  ADMIN**: en el front el rol ADMIN se oculta del selector y se bloquean editar/quitar sobre chips
  ADMIN a los no-admin; el backend lo refuerza con **403** (`AsignacionResource` POST/PUT/DELETE),
  identificando al actor por el header `X-Actor-Hid`. `MSC001` es admin de arranque (bootstrap).
  El header no es un límite criptográfico (coherente con el gating de cliente actual); sube a real
  con la identidad por token — ver [decisiones.md](../decisiones.md) 2026-07-06.
- **Pendiente:** Usuarios/Asignaciones/Boards-sprints/Estados/Integración (tabs restantes);
  y **enganchar las tareas huérfanas** (cliente nulo) a los clientes recién creados —
  requiere que el ETL consulte también los clientes de la BD por `helpdesk_client_id`.

## Administración (NUEVO) — solo ADMIN

| Opción | Qué gestiona | Acciones | Entidades |
|---|---|---|---|
| Regionales | Ciudades/regiones (Cuenca, Quito…). | Crear, editar, activar/desactivar. | `REGIONAL` |
| Equipos | Equipos y su regional. | Crear, editar, ver miembros. | `EQUIPO` |
| Clientes | COAC, su vínculo con el HelpDesk y su **equipo responsable** (de aquí sale "los clientes de mi equipo"). | Crear/vincular (`helpdesk_client_id`), asignar equipo responsable, activar/desactivar. | `CLIENTE` |
| Usuarios y roles | Personas (vienen del HelpDesk) y su rol. | Ver, asignar rol. | `USUARIO`, `ROL` |
| **Asignaciones** | **El corazón del permiso**: a quién, con qué rol, sobre qué alcance (equipo/cliente/regional/global) y hasta cuándo. | Crear, editar, finalizar (fecha `hasta`). | `ASIGNACION` |
| Tableros y sprints | Boards por equipo y sus sprints. | Crear, editar, cerrar sprint. | `BOARD`, `SPRINT` |
| Estados del flujo | Columnas del board (estándar corporativo). | Ver, ajustar orden. | `WORKFLOW_ESTADO` |
| Integración HelpDesk | Mapeos cliente/usuario y sincronización del espejo. | Configurar frecuencia, ver última sync. | `TICKET_ESPEJO` (sync) |

> La opción **Asignaciones** es la que arma toda la matriz nacional (`Rol × Alcance × Vigencia` — ver [01-modelo-conceptual.md](01-modelo-conceptual.md)). Reemplaza el alcance hardcodeado actual (`CLIENTES_VALIDOS`/`EMPLEADOS`).

## Roles y permisos
Resumen de roles y la matriz "quién puede mover/asignar qué" en [01-modelo-conceptual.md](01-modelo-conceptual.md) §Roles y permisos. Default deny: sin `Asignacion` vigente, no se ve nada.
