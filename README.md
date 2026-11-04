# API REST - Proyecto Integrador 2

## Descripción

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones (posts).

El proyecto implementa operaciones CRUD, validaciones, manejo de errores y pruebas automatizadas.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- Jest
- Supertest

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Pablot97/api-rest-proyecto.git
```

2. Ingresar a la carpeta del proyecto:

```bash
cd api-rest-proyecto
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear una base de datos PostgreSQL llamada `api_rest`.

5. Configurar las variables de entorno utilizando `.env.example` como referencia. Crear un archivo `.env` con los datos de conexión a PostgreSQL.

## Variables de entorno

La aplicación utiliza las siguientes variables para conectarse a PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=api_rest
```

No subir el archivo `.env` a GitHub, ya que contiene información privada.

El repositorio incluye `.env.example` como plantilla de configuración.

## Configuración de la base de datos

Antes de iniciar la aplicación, es necesario tener PostgreSQL en funcionamiento y crear una base de datos llamada `api_rest`.

Ejecutar los scripts SQL desde la raíz del proyecto y en el siguiente orden:

1. `sql/setup.sql`: crea las tablas y relaciones necesarias.
2. `sql/seed.sql`: carga los datos iniciales.

La aplicación utiliza dos tablas principales:

- **Authors:** almacena autores con nombre, email, biografía y fecha de creación.
- **Posts:** almacena publicaciones relacionadas con un autor, con título, contenido, estado de publicación y fecha de creación.

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

El servidor funciona en:

http://localhost:3000

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

## Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm test
```

Las pruebas utilizan Jest y Supertest para verificar el funcionamiento de los endpoints, las validaciones y el manejo de errores.

Es necesario tener PostgreSQL en funcionamiento y la base de datos configurada antes de ejecutar los tests.

## Seguridad

- Las consultas SQL utilizan parámetros para evitar la inyección SQL.
- Las variables de entorno se utilizan para proteger los datos de conexión.
- El archivo `.env` está excluido del repositorio mediante `.gitignore`.

## Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizó ChatGPT como herramienta de apoyo para el aprendizaje, la resolución de problemas y la mejora del código.

La inteligencia artificial se utilizó como asistente, mientras que la implementación, ejecución y comprobación de los cambios se realizaron sobre el proyecto.

### Prompts utilizados


**1. Consultas a la base de datos**

Prompt:
"Explicame cómo utilizar consultas SQL parametrizadas con PostgreSQL en Node.js y cómo evitar concatenar datos directamente en las consultas."

Influencia en el proyecto:
Ayudó a implementar consultas parametrizadas, mejorando la seguridad y evitando posibles vulnerabilidades de inyección SQL.

**2. Validaciones y manejo de errores**

Prompt:
"¿Cómo puedo implementar validaciones de datos y un manejo centralizado de errores en una API desarrollada con Express?"

Influencia en el proyecto:
Contribuyó a incorporar validaciones de campos obligatorios, control de emails duplicados, respuestas HTTP adecuadas y un middleware para centralizar errores.


**3. Pruebas automatizadas**

Prompt:
"Explicame cómo utilizar Jest y Supertest para probar los endpoints de una API REST desarrollada con Express."

Influencia en el proyecto:
Ayudó a desarrollar pruebas automatizadas para verificar las respuestas de los endpoints, las validaciones y el manejo de errores.


### Reflexión final

La inteligencia artificial fue utilizada como una herramienta complementaria de aprendizaje y desarrollo. Permitió resolver dudas, comprender conceptos nuevos, detectar errores y mejorar la organización del código.

Su utilización no reemplazó la comprensión del proyecto ni las pruebas realizadas, sino que sirvió como apoyo durante el proceso de aprendizaje y desarrollo.

## Autor

Proyecto realizado como parte del Proyecto Integrador 2.