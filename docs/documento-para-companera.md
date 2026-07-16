# Fit-Daily: hacia dónde vamos (y por qué tu trabajo es la base de todo)

> Documento para entender, sin tecnicismos, la siguiente etapa de Fit-Daily.

## En una frase

Fit-Daily funcionó tan bien que ahora lo queremos para **todo el país**, no solo para Cuenca. Para que aguante eso, vamos a **mudarlo a una infraestructura más sólida** — sin perder ni una sola de las cosas que ya construiste y sin que deje de funcionar mientras lo hacemos.

## Lo que ya lograste (y no se toca)

Lo que hiciste no es un borrador: es **la base**. A Gerencia y a los responsables de clientes les gustó porque resuelve el trabajo del día a día de verdad. Y lo resuelve porque lo armaste desde tu experiencia usando el HelpDesk. En concreto, estas cosas son tuyas y **se conservan completas**:

- El **tablero** (board) con los tickets convertidos en tareas, los sprints, las columnas y el arrastrar-y-soltar.
- Las **notas que se le ponen a un ticket**.
- Los **recordatorios con fecha y hora que vuelven a avisar cada día** (por ejemplo, "recordar pedir tal información al cliente por teléfono").
- La **rotación semanal de soporte**.
- **Mi Panel**, las **consultas**, el **progreso** y el **burndown**.
- La **conversación del ticket** con adjuntos e imágenes, y poder responder con formato.
- El pedirle al HelpDesk de otra ciudad que asigne a un técnico cuando el caso no es de tu equipo.

Nada de esto se elimina. Todo se **muda** a la versión nueva.

## Por qué hay que evolucionarlo

Hoy Fit-Daily se apoya en **servicios gratuitos y personales**: la base de datos está en Firebase, la app se publica en GitHub Pages y hay un pequeño "puente" en Cloudflare. Eso fue **perfecto para arrancar y para Cuenca**. Pero para usarlo a nivel nacional —muchos equipos, muchas regiones, muchos clientes, datos sensibles de cooperativas— necesitamos algo de la empresa, robusto y que crezca con nosotros.

> Es como un puesto de comida que se volvió famoso: las recetas son tuyas y son buenísimas. Lo que toca ahora es **llevarlas a una cocina de restaurante de verdad** — más grande, más segura, que pueda atender a todo el país. Las recetas no cambian; cambia la cocina.

## Qué cambia "por debajo" (y por qué casi no lo vas a notar)

Tres cosas, todas internas:

1. **Dónde viven los datos.** Hoy están en Firebase. Pasarán a una **base de datos de la empresa** (PostgreSQL), primero en una computadora de pruebas y luego en la nube de la empresa (AWS). Tus datos actuales **se copian**, no se pierden.
2. **Una "sala de máquinas" nueva.** Hoy la app habla directo con Firebase y con el HelpDesk. En la versión nueva habrá un **motor intermedio** (el backend) por el que pasa todo. Eso permite controlar quién ve qué a nivel nacional, ir más rápido y depender menos de servicios externos.
3. **Dónde se publica.** En vez de GitHub Pages, la app vivirá en **contenedores** dentro de los servidores de la empresa en AWS.

Para quien la usa, la app se ve y se siente **igual** — solo que más firme y lista para todo el país.

## Lo "nacional", en simple

Hoy la app tiene "grabados por dentro" los **clientes y consultores de Cuenca**. Si quisiéramos sumar Quito o Guayaquil, habría que tocar el programa. En la versión nueva, **cada región, equipo y cliente se podrá agregar sin tocar el código**: cada persona verá lo suyo según su rol, y los casos que cruzan equipos (como cuando un ticket de tu cliente lo resuelve otro equipo de otra ciudad) quedarán bien resueltos y a la vista.

## Cómo lo haremos sin romper nada

Esto es lo más importante para tu tranquilidad: **no se apaga lo que hoy funciona**. El plan es:

1. Construir la versión nueva **al lado** de la actual. La actual sigue viva y en uso todo el tiempo.
2. **Copiar** los datos de Firebase a la base nueva (sin borrar nada de Firebase).
3. **Probar** que todo lo tuyo funciona igual: tablero, notas, recordatorios, rotación semanal, todo.
4. Recién cuando esté comprobado, **cambiar** a la versión nueva — y aún así con posibilidad de volver atrás.

En ningún momento se pierde tu trabajo ni la información del equipo.

## Tu rol en esto

Tú sigues siendo **la dueña del producto y de las necesidades reales**. Quien mejor sabe cómo se usa esto en el día a día eres tú. Esta etapa:

- **Parte de tu trabajo**, no lo reemplaza.
- Te apoya con un **plan claro** y con un **agente** (asistente técnico) que ejecuta la mudanza siguiendo ese plan.
- Te necesita para **validar** que, fase por fase, tus funciones y tu forma real de trabajar se mantienen.

## Qué sigue

1. Revisar juntos este documento y ajustar lo que haga falta.
2. Empezar por preparar la versión nueva **en paralelo** (sin tocar la actual).
3. Copiar y probar los datos.
4. Ir validando contigo cada parte.

Cualquier duda, la conversamos. La idea es que esto se sienta como **dar el siguiente paso con lo que ya construiste**, no como empezar de cero.
