# API REST - Proyecto Integrador 2

## Descripción

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones (posts).

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- Jest
- Supertest

## Instalación

1. Clonar el repositorio.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear una base de datos PostgreSQL llamada `api_rest`.
4. Configurar las variables de entorno necesarias para la conexión a la base de datos.
5. Ejecutar los archivos SQL para crear las tablas y cargar los datos iniciales.

## Ejecución

Para iniciar el servidor:

```bash
node app.js
```

El servidor funciona en:

`http://localhost:3000`

## Endpoints

### Autores

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/authors` | Listar autores |
| GET | `/authors/:id` | Obtener un autor |
| POST | `/authors` | Crear un autor |
| PUT | `/authors/:id` | Actualizar un autor |
| DELETE | `/authors/:id` | Eliminar un autor |

### Publicaciones

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/posts` | Listar publicaciones |
| GET | `/posts/:id` | Obtener una publicación |
| GET | `/posts/author/:authorId` | Obtener las publicaciones de un autor |
| POST | `/posts` | Crear una publicación |
| PUT | `/posts/:id` | Actualizar una publicación |
| DELETE | `/posts/:id` | Eliminar una publicación |

## Pruebas

Para ejecutar las pruebas automatizadas:

```bash
npm test
```

Las pruebas utilizan Jest y Supertest.

## Base de datos

La aplicación utiliza PostgreSQL y administra dos entidades:

- **Authors:** autores con nombre, email, biografía y fecha de creación.
- **Posts:** publicaciones relacionadas con un autor, con título, contenido, estado de publicación y fecha de creación.

## Autor

Proyecto realizado como parte del Proyecto Integrador 2.
