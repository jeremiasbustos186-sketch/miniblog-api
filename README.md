# MiniBlog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y posts de un blog.

## Tecnologías

- Node.js + Express
- PostgreSQL (pg)
- dotenv
- Jest + Supertest

## Requisitos previos

- Node.js >= 20
- PostgreSQL instalado y corriendo

## Instalación y ejecución local

1. Cloná el repositorio:
```bash
git clone https://github.com/jeremiasbustos186-sketch/miniblog-api.git
cd miniblog-api
```

2. Instalá las dependencias:
```bash
npm install
```

3. Creá el archivo `.env` basándote en `.env.example`:
```bash
cp .env.example .env
```
Editá el `.env` con tu contraseña de PostgreSQL.

4. Creá la base de datos en PostgreSQL:
```bash
psql -U postgres -c "CREATE DATABASE miniblog;"
```

5. Ejecutá el script de setup (tablas):
```bash
psql -U postgres -d miniblog -f db/setup.sql
```

6. Ejecutá el seed (datos de ejemplo):
```bash
psql -U postgres -d miniblog -f db/seed.sql
```

7. Levantá el servidor:
```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## Ejecutar tests

```bash
npm test
```

## Endpoints

### Authors

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /authors | Obtener todos los autores |
| GET | /authors/:id | Obtener un autor por id |
| POST | /authors | Crear un autor |
| PUT | /authors/:id | Actualizar un autor |
| DELETE | /authors/:id | Eliminar un autor |

### Posts

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /posts | Obtener todos los posts |
| GET | /posts/:id | Obtener un post por id |
| GET | /posts/author/:authorId | Obtener posts de un autor |
| POST | /posts | Crear un post |
| PUT | /posts/:id | Actualizar un post |
| DELETE | /posts/:id | Eliminar un post |

## Documentación OpenAPI

El archivo `openapi.yaml` en la raíz del proyecto contiene la documentación completa de la API.

Para visualizarla podés usar [Swagger Editor](https://editor.swagger.io/) y pegar el contenido del archivo.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3000 |
| DATABASE_URL | URL de conexión a PostgreSQL | postgresql://postgres:password@localhost:5432/miniblog |

## Deployment en Railway

La API está desplegada en Railway con una base de datos PostgreSQL en la nube.

**URL pública:** `https://miniblog-api-production-75f0.up.railway.app`

**URL interna (Railway):** `miniblog-api.railway.internal`

### Pasos para desplegar en Railway

1. Creá una cuenta en [railway.app](https://railway.app)
2. Conectá tu repositorio de GitHub
3. Agregá un servicio PostgreSQL desde el panel
4. En las variables del servicio de la API, agregá:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
5. Railway genera un dominio público automáticamente desde Settings → Networking → Generate Domain
6. Ejecutá las tablas desde el panel de Database en Railway usando el contenido de `db/setup.sql`

## Uso de IA

Ver archivo [AI_USAGE.md](./AI_USAGE.md)
