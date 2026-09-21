# CLAUDE.md — fit-desk (frontend)

Guía para cualquier sesión de Claude Code en el repo **`servicios/fit-desk`**.

## Qué es
Frontend de **FitDesk**: gestor Scrum/Kanban que orquesta trabajo sobre **tickets de un HelpDesk
externo** (no es dueño de los tickets, solo los consulta y opera). Clientes = COAC/cooperativas
financieras. **Angular 22** (standalone components, Signals, **zoneless**, Material 3), **PWA**.

Habla **solo** con el backend **`fit-desk-api`** (Quarkus), que a su vez proxea el HelpDesk y guarda
los datos propios en PostgreSQL. Ver el contrato en [`docs/contrato-api.md`](docs/contrato-api.md).

## Stack y convenciones clave
- Angular 22 **standalone** + **Signals** + `computed`/`effect`/`afterNextRender`; **zoneless** change
  detection; control flow `@if`/`@for`; Material 3; **hash routing** (`withHashLocation`) porque se
  publica en subcarpeta.
- Entornos en `src/environments/`: `environment.cloud.ts` (prod, apunta al backend en Render),
  `environment.quarkus.ts` (local contra Quarkus), `environment.ts` (dev con proxy). El frontend usa
  `helpdeskProxyUrl` (proxy HelpDesk `/api/v1`) y `quarkusApiUrl` (API nativa `/api`).

## Reglas del proyecto (NO negociables)
1. **🥇 Verificar en Chrome real con Playwright MCP** antes de dar por buenos los cambios de UI:
   resultado end-to-end + distribución + UX, **incluida pantalla pequeña** (es PWA/instalable; probar
   360×640 / 390×844, sin scroll horizontal del body ni cortes).
2. **Nunca mostrar códigos de empleado en la UI.** El `helpdesk_user_id` (p. ej. MSC001) es clave
   interna: mostrar el **nombre resuelto**; si no se resuelve → "Sin asignar"/"—", jamás el código. El
   código, a lo sumo, como **tooltip**. (Sí valen ids de tarea/sprint/ticket: TA-NNN, N°.)
3. **Escrituras al HelpDesk SÍNCRONAS:** todo guardado al API debe `await` + confirmar; nada de
   fire-and-forget ni optimista.
4. **Solo datos reales:** no inventar campos que el modelo no tiene.
5. **La barra de acciones (Enviar/Guardar) SIEMPRE visible:** inputs que crecen capan alto + scroll
   interno (`dvh`); nunca empujar el botón fuera de pantalla.
6. **Tareas con ticket asociado NO se eliminan** (nacen del HelpDesk).

## Trampas de Angular/Material ya aprendidas (evitarlas)
- **Zoneless:** no escribas una signal que el Layout lee durante su CD (bloquea la 1ª carga); hazlo en
  `afterNextRender`/async.
- `display:flex` en un `<td>` rompe la rejilla de la tabla → el flex va en un wrapper interno.
- `mat-button-toggle` colapsa a alto 0 en contenedores a medida → usar `<button role="radio">` propio.
- `mat-select` exige `mat-form-field`; para look propio usar un `<button>`+`mat-menu`. `matDatepicker` y
  los inputs SÍ funcionan fuera de `mat-form-field` (adaptador de fecha nativo global).
- **ESC jerárquico en modales:** usar `wireDialogEsc(ref, onEsc?)` (`core/dialog-esc.ts`) — ESC cierra
  primero el popup abierto y solo cierra el modal si no hay nada encima.
- **Descargas:** siempre por `core/descargar.ts` (`descargarUrl`/`descargarBlob`). Un `<a download>` suelto
  **no dispara nada en la PWA instalada** (hay que agregarlo al DOM), y revocar el blob URL justo después
  del `click()` baja el archivo **vacío**. Para el nombre, nunca dependas solo de `Content-Disposition`:
  hay cascada nombre → MIME → **firma binaria** (`extFromBytes`).

## Correr / construir / desplegar
- **Local (dev):** `npm ci` → `ng serve` (usa el proxy de `proxy.conf.json`), o `ng serve -c quarkus`
  contra el backend local.
- **Build:** `ng build` (config `cloud` para prod, `quarkus` para contenedor). Angular 17+ emite en
  `dist/app/browser`.
- **Contenedor:** el `Dockerfile` incluido construye el bundle (`ng build -c quarkus`) y lo sirve con
  **Nginx** (`nginx.conf`). Es la ruta de despliegue en contenedores (junto al backend).
- **Verificación contra el backend en la nube:** `ng serve -c cloud --port 4200` (el CORS del backend
  admite `localhost:4200`) y probar con Playwright MCP.

## Coordinación con el backend
Cambios que crucen la frontera (endpoints, DTOs, headers) van reflejados en
[`docs/contrato-api.md`](docs/contrato-api.md), que es **idéntico** en `fit-desk` y `fit-desk-api`.
**Regla:** quien cambie la API de un lado actualiza el contrato y ajusta/avisa al otro repo.

El agente especialista de este repo está en
[`.claude/agents/fit-desk-front.md`](.claude/agents/fit-desk-front.md).
