# 07 — Tabla de equivalencia de identidades (PROPUESTA · por confirmar)

Resuelve el **bloqueante #2** del ETL (Fase 2): unir el id corto local (`SC`, `JH`…) con el
`helpdesk_user_id` (`XXXNNN`) para que **cada persona sea UNA fila `usuario`** y sus tareas,
asignaciones y permisos no se partan. Contexto en
[aprendizajes.md](../aprendizajes.md) (entradas del 2026-06-30).

> ⚠️ **Esto es una propuesta inferida por nombre/iniciales — NO es verdad confirmada.**
> Juan/Sol deben revisar la columna **Confirmar**. Las filas 🟡/🔴 son las dudosas.

## Cómo obtener la verdad de fondo (sin adivinar)
El HelpDesk ya tiene el nombre real de cada id: `GET /api/v1/users/catalog` devuelve
`{ user_id, person_name, role_description }`. El ETL de Fase 2 hará el match **automático**
`person_name` ↔ nombre de `data/users.json`; esta tabla solo sirve para **revisar las
excepciones** y para los casos que el catálogo no resuelva (p. ej. `KVAZQUEZ`, que en el
board aparece como *username*, no como `XXXNNN`).

## Propuesta

| id local | Nombre | Rol local | helpdesk_user_id propuesto | Confianza | Razonamiento | Confirmar |
|---|---|---|---|:--:|---|:--:|
| SC | Sol Contreras   | Helpdesk   | **MSC001**   | 🟢 alta  | El código marca `esMSC001 ≡ Helpdesk/despachador`, que es el rol de Sol. En el board aparece como `SC` y `MSC001`. | ☐ |
| JH | Juan Huiracocha | Supervisor | **JPHP001**  | 🟡 media | Iniciales J…H… | ☐ |
| LO | Lina Ochoa      | Supervisor | **ORLR001**  | 🟡 media | O(choa)…L(ina)… | ☐ |
| AB | Andres Bernal   | Supervisor | **APBM001**  | 🟡 media | A(ndres)…B(ernal)… | ☐ |
| DL | Domenica Lasso  | Consultor  | **KDLS001**  | 🟡 media | D(omenica) L(asso) S… | ☐ |
| GR | Gabriel Reyes   | Consultor  | **JGRV001**  | 🟡 media | G(abriel) R(eyes)… | ☐ |
| DG | David Gonzalez  | Consultor  | **DSGS001**  | 🟡 media | D(avid)…G(onzalez) S… | ☐ |
| KV | Karla Vazquez   | Consultor  | **KVAZQUEZ** | 🟢 confirmado (dueña) | Su `helpdesk_user_id` **es** `KVAZQUEZ` (id estilo *username*). El HelpDesk no usa `XXXNNN` para todos. | ☑ |
| KM | Kevin Molina    | Consultor  | **KIMA001**  | 🟡 media | K(evin)…M(olina)… | ☐ |
| AC | Andres Calderon | Consultor  | **KACG001**  | 🟢 confirmado (dueña) | Confirmado por la dueña. | ☑ |
| JQ | Joel Quintuna   | Consultor  | **JFQV001**  | 🟡 media | J(oel) Q(uintuna)…; en el board aparece como `JQ` y `JFQV001`. | ☐ |
| VN | Valeria Neira   | Consultor  | **VINC001**  | 🟡 media | V(aleria)…N(eira)… | ☐ |

### CSV editable (para el ETL — confirmar/corregir la última columna)
```csv
id_local,nombre,rol_local,helpdesk_user_id,confianza,confirmado
SC,Sol Contreras,Helpdesk,MSC001,alta,
JH,Juan Huiracocha,Supervisor,JPHP001,media,
LO,Lina Ochoa,Supervisor,ORLR001,media,
AB,Andres Bernal,Supervisor,APBM001,media,
DL,Domenica Lasso,Consultor,KDLS001,media,
GR,Gabriel Reyes,Consultor,JGRV001,media,
DG,David Gonzalez,Consultor,DSGS001,media,
KV,Karla Vazquez,Consultor,KVAZQUEZ,confirmado,si
KM,Kevin Molina,Consultor,KIMA001,media,
AC,Andres Calderon,Consultor,KACG001,confirmado,si
JQ,Joel Quintuna,Consultor,JFQV001,media,
VN,Valeria Neira,Consultor,VINC001,media,
```

## Notas y banderas
- **El espacio de ids del HelpDesk es heterogéneo (confirmado por la dueña):** la mayoría son
  `XXXNNN` (`MSC001`…), pero algunos son estilo *username* (`KVAZQUEZ` = Karla Vazquez). El ETL
  **no** debe asumir el patrón `XXXNNN`; `usuario.helpdesk_user_id` (VARCHAR) ya lo admite.
- **Mapeo 1:1 limpio:** los 11 ids `XXX001` del board + `KVAZQUEZ` cuadran con las 12 personas
  locales, y `SC`/`JQ` son la misma persona escrita en dos formatos (`SC≡MSC001`, `JQ≡JFQV001`).
- **El seed `EMPLEADOS` está incompleto/desactualizado:** varios ids del board
  (`APBM001, JGRV001, KACG001, KVAZQUEZ`) **no** están en él, y otros del seed
  (`FSGC001, BMHJ001, JCEO001, CUC001`) **no** aparecen en el board (¿gente de otra regional,
  bajas o altas nuevas?). → La fuente de verdad de empleados es `/users/catalog`, no el seed.
- **Clientes:** problema análogo pero **auto-resoluble** (no necesita esta tabla): cruzar
  `CLIENT_MAP` (nombre→slug) con `/clients/catalog` (número→nombre). El campo `stories.client`
  mezcla números del HelpDesk (`5,42,64…`) con slugs locales (`erco,cacel…`).

## Qué se necesita de Juan/Sol
- ✅ **KV Karla Vazquez → `KVAZQUEZ`** — confirmado por la dueña.
- ✅ **AC Andres Calderon → `KACG001`** — confirmado por la dueña.
- ⏳ Solo faltan las 🟡 medias por ratificar (idealmente contra `/users/catalog`). El ETL de Fase 2
  las resolverá automáticamente por nombre; esta tabla queda como respaldo/excepciones.
