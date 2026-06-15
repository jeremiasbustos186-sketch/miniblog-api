# Uso de Inteligencia Artificial en el Proyecto

## Herramienta utilizada
Claude (Anthropic) como asistente de aprendizaje y consultas técnicas.

## ¿Cómo la usé?

Durante el desarrollo de este proyecto usé IA principalmente para entender conceptos que no tenía claros y para resolver dudas puntuales que surgían mientras codificaba.

### Conceptos que consulté

- **¿Qué es un pool de conexiones?** No entendía por qué no conectarse directo a la base de datos en cada request. La IA me explicó que es como tener varias líneas telefónicas abiertas en lugar de abrir y cerrar una cada vez.

- **¿Para qué sirve `module.exports`?** No entendía cómo un archivo podía "compartir" cosas con otro. La explicación que me ayudó fue pensar que cada archivo es una isla y `module.exports` es el puente.

- **¿Qué diferencia hay entre un router y el servidor principal?** Entendí que el `index.js` es como el encargado de la entrada de un restaurante que reparte clientes, y cada router es el mozo especializado en una sección.

- **¿Qué son los parámetros de ruta (`req.params`)?** Cuando vi `/:id` en las rutas no entendía de dónde salía ese valor. Consulté y entendí que Express lo extrae automáticamente de la URL.

- **¿Por qué usar variables de entorno?** No tenía claro por qué no poner la contraseña de la base de datos directo en el código. La IA me explicó el riesgo de seguridad de subir credenciales a GitHub.

### Errores que resolví con ayuda

- El PATH de PostgreSQL no estaba configurado en Windows, lo que hacía que `psql` no se reconociera como comando.
- Confusión entre `req.params` y `req.body` — params es lo que va en la URL, body es lo que va en el cuerpo del request.
- El `package-lock.json` desincronizado con `package.json` al hacer deploy en Railway.

### Lo que hice por mi cuenta

- Diseñé la estructura de las tablas (authors y posts) pensando en la relación entre ellas.
- Decidí qué validaciones poner en cada endpoint (campos obligatorios, email único, etc.).
- Probé manualmente cada endpoint con Thunder Client para verificar que respondía correctamente.
- Entendí los errores y busqué la causa antes de consultar.

## Reflexión

Usar IA como tutor me ayudó a avanzar sin quedarme bloqueado en conceptos que sola podrían haberme costado días. Lo importante fue que siempre traté de entender la explicación antes de aplicarla, no solo copiar y pegar código.
