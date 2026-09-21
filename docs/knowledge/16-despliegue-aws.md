# 16 · Despliegue de FitDesk en AWS (EC2 + Docker)

> **Estado: CORTE HECHO — AWS es PRODUCCIÓN (verificado 2026-09-08).** `fitdesk.fit-bank.com` ya resuelve a
> **`3.90.116.254`** (AWS) y sirve el bundle desplegado aquí; el `:8080` externo está **cerrado**, o sea que
> IT completó los pasos 3 y 4 de la Fase B. **El on-prem sigue ENCENDIDO pero ya nadie lo alcanza por el
> dominio** — falta pararlo (ver abajo).

## ⚠️ Lo primero que hay que saber: es la MISMA máquina del HelpDesk

`helpdesk-api.fit-bank.com` **resuelve a `3.90.116.254`**, la IP del servidor entregado. En sus puertos
80/443 corre el **MantisBT** del HelpDesk (cert `*.fit-bank.com`). La convivencia está **confirmada como
intencional** por la dueña, pero condiciona todo el diseño:
- **No se tocan 80/443** (Apache del HelpDesk). FitDesk publica en **8080**.
- El **Postgres del compose NO se publica**: el host ya tiene uno en 5432 (el del HelpDesk). Sin choque.
- **Límites de memoria obligatorios** en los tres servicios: si FitDesk agota la RAM, **se lleva por delante
  el HelpDesk**, que es el sistema del que depende toda la operación.

## Accesos

- **SSH:** `ssh -i ~/Downloads/fitdesk.pem fitdesk@3.90.116.254` (puerto 22). La llave debe estar en `400`.
- **App (pruebas):** `http://3.90.116.254:8080/` — puerto habilitado temporalmente por IT.
- **Docker sin sudo:** sí.

## La máquina

| | |
|---|---|
| SO | **CentOS 7** (sin soporte desde jun-2024) |
| Kernel | **3.10** ← *clave, ver abajo* |
| CPU / RAM | 4 vCPU / 15,7 GB (≈4,9 GB libres antes de FitDesk) |
| Disco | 320 GB, 117 GB libres |
| Docker | 26.1.4 + Compose v2.27.1 |
| Uptime | ~3 años sin reiniciar |

## ⭐ El frontend NO se puede construir en el servidor

`docker compose build frontend` **falla con SIGSEGV**. **No es falta de memoria**: el host tiene
**kernel 3.10** y el `Dockerfile` del front usa **`node:22`**, que hace *segfault* sobre kernels tan
antiguos. El backend sí compila ahí (es Maven/JVM, que tolera el kernel viejo).

**Procedimiento para el frontend — construir fuera y cargar:**
```bash
# En el Mac, sobre el clon de servicios/fit-desk (¡el servidor es x86_64!):
docker build --platform linux/amd64 -t fitdesk-frontend:latest .
docker save fitdesk-frontend:latest | gzip -1 > frontend.tar.gz
scp -i ~/Downloads/fitdesk.pem frontend.tar.gz fitdesk@3.90.116.254:~/fitdesk/
# En el servidor:
gunzip -c frontend.tar.gz | docker load && docker compose up -d frontend && rm -f frontend.tar.gz
```
Por eso el servicio `frontend` del compose usa `image:` y **no** `build:`. El **backend sí** se construye
en el servidor con `docker compose build backend`.

## Arquitectura (idéntica al on-prem)

Navegador → `:8080` → **Nginx (frontend)** sirve el SPA **y proxya `/api/`** → **backend Quarkus** →
**Postgres (contenedor, volumen `fitdesk_pgdata`)** + proxy al **HelpDesk**. Un solo origen → sin CORS.
Build del front con la config **`onprem`** (URLs relativas), que sirve igual aquí.

Se conservan los 3 gotchas ya conocidos: volumen de `postgres:18` en `/var/lib/postgresql`,
**`QUARKUS_HTTP_CORS_ENABLED=false`** (sin esto el **login da 403**) y `?currentSchema=public`.
Añadido nuevo: `JAVA_OPTS_APPEND=-Xmx768m`, por debajo del `mem_limit` del contenedor.

**Hairpin verificado:** el servidor alcanza `helpdesk-api.fit-bank.com` (su propia IP pública) en 0,14 s.

## Lo desplegado y verificado (2026-09-07)

- Front `e1413fb`, back **`4f1b18c`** (incluye la **V19** del tema oscuro, que el on-prem NO tiene).
- **Datos**: copia del on-prem por `pg_dump`/`pg_restore`. Conteos **idénticos**:
  `tarea=340`, `ticket_espejo=5198`, `usuario=19`, `vacacion=7`, `feriado=1`. Flyway: 18 migraciones
  restauradas + **V19 aplicada al arrancar** (columna `usuario.tema` creada).
- **Verificado E2E:** SPA 200; `/api/legacy/boards` 200; **0 llamadas a Firebase**; 12 tickets reales
  ("12 de 793") a través del proxy; **CORS del login OK** (401 del HelpDesk, no 403); **tema oscuro
  persistido en BD** (`MSC001 → tema=dark`, lo nuevo de la V19); **adjunto descargado íntegro**
  (196 369 bytes, CRC OK, idéntico al on-prem).
- **HelpDesk intacto** durante todo el proceso (Apache 302). Memoria libre: 4,9 GB → **4,5 GB**
  (FitDesk consume ~450 MB reales; techo configurado 2,3 GB).

## Fase B (corte) — hecha salvo el último paso

1. ~~Refrescar datos~~ — hecho; ver la comprobación de contención de abajo.
2. ~~Ventana sin escrituras~~ — no hizo falta: el on-prem dejó de recibir escrituras al moverse el DNS.
3. ~~IT apunta el dominio a AWS y cierra el 8080~~ — **hecho** (verificado 2026-09-08: `dig` → `3.90.116.254`,
   el dominio sirve el bundle de AWS, y `http://3.90.116.254:8080` desde fuera ya no responde).
4. **PENDIENTE: parar los contenedores del on-prem** — `docker compose stop` (parados, **no** borrados, con
   el volumen intacto → reversible con `docker compose start`). **Nunca `down -v`**: eso borraría la BD.

### Comprobación de contención antes de parar el on-prem (2026-09-08)

Comparadas las **22 tablas** de ambas bases (conteo + hash de contenido) y, en las que difieren, fila a fila:

| | Resultado |
|---|---|
| Filas que existen **solo** en on-prem | **ninguna** (AWS va por delante: `tarea` 343/341, `ticket_espejo` 5200/5199, `transferencia` 6/5) |
| Contenido editado más reciente en on-prem | **una sola cosa**: la **nota del ticket 33710** → on-prem *"notificado Heccer"* (7-sep 15:16) vs AWS *"heccer, facilito"* (3-sep) |
| Otras diferencias | solo marcas de tiempo (`tarea` 270) o AWS más al día (`asignacion` 118: `vigente_hasta` 2026-12-20 en AWS vs 2026-07-20 en on-prem) |

O sea: **parar el on-prem no pierde nada excepto esa nota**, que hay que rehacer en AWS (por la UI o por SQL).

**Cómo pararlo:**
```bash
ssh -i ~/Downloads/acceso-fitdesk/fitdesk_ed25519 -p 8814 fitdesk@172.17.1.9
cd ~/fitdesk && docker compose stop && docker compose ps
```
Los tres contenedores tienen `restart: unless-stopped`, así que **seguirán parados aunque el host reinicie**.

## Riesgos vivos

- **CentOS 7 sin soporte** y kernel 3.10: sin parches de seguridad, y limita qué imágenes corren.
- **Convivencia con el HelpDesk**: vigilar memoria. Los `mem_limit` están aplicados y verificados
  (1024/1200/128 MB), pero `docker stats` **no reporta bien** el uso por contenedor en cgroup v1.
- **Sin swap** en la máquina: un pico de memoria mata procesos en vez de degradar.
- **Rotar el token de GitLab** usado para clonar.
