Book-User API – NodeJS + GraphQL + MongoDB
Descripción General

Book-User API es una aplicación backend desarrollada con Node.js, Apollo Server (GraphQL) y MongoDB, diseñada para gestionar usuarios y sus libros asociados.

El sistema permite crear, actualizar, eliminar y listar usuarios y libros, con validaciones, relaciones uno-a-muchos y consultas avanzadas (búsqueda por filtros).
| Categoría                  | Herramienta             |
| -------------------------- | ----------------------- |
| **Lenguaje**               | Node.js                 |
| **Framework API**          | Apollo Server (GraphQL) |
| **Base de datos**          | MongoDB con Mongoose    |
| **Control de versiones**   | Git + GitHub            |
| **Documentación**          | JSDoc                   |


Instalación y Configuración
1. Descargar el repositorio y abrirlo con un editor de código como VS code

2. Instalar dependencias
npm install

Asegúrate de tener MongoDB corriendo localmente o usa una conexión remota de MongoDB Atlas.

3. Ejecutar el servidor
npm run dev

Si todo está bien, deberías ver algo como:

 Conectado a MongoDB
 Servidor corriendo en http://localhost:4000/graphql
4. Acceder a http://localhost:4000/graphql en un navegador
 Queries
Listar todos los usuarios: 

query {
  users {
    _id
    name
    email
    books {
      title
      author
    }
  }
}

Obtener un usuario por ID:

query {
  user(id: "USER_ID") {
    name
    email
  }
}

 Listar libros por usuario:
query {
  booksByUser(userId: "USER_ID") {
    title
    author
  }
}

 Buscar libros con filtros y orden:
query {
  books(search: "historia", genre: "Historia", sortByYear: "asc", limit: 5) {
    title
    author
    genre
    year
    user {
      name
    }
  }
}

 Estadísticas de libros por género: 
query {
  bookStatsByGenre {
    _id
    total
    latestYear
  }
}

Mutations:
Crear usuario:
mutation {
  createUser(input: {
    name: "Juan Pérez"
    email: "juan@perez.com"
  }) {
    _id
    name
    email
  }
}

Actualizar usuario:
mutation {
  updateUser(id: "USER_ID", input: {
    name: "Juan P. Actualizado"
    email: "juanp@example.com"
  }) {
    name
    email
  }
}

 Eliminar usuario:
mutation {
  deleteUser(id: "USER_ID")
}

 Crear libro asociado a usuario:
mutation {
  createBook(userId: "USER_ID", input: {
    title: "Cien Años de Soledad"
    author: "Gabriel García Márquez"
    genre: "Fantasía"
    year: 1967
  }) {
    title
    author
    genre
    year
  }
}

 Actualizar libro:
mutation {
  updateBook(id: "BOOK_ID", input: {
    title: "Cien Años de Soledad (Edición 50 aniversario)"
    year: 2017
  }) {
    title
    year
  }
}

 Eliminar libro:
mutation {
  deleteBook(id: "BOOK_ID")
}

 Ejemplo de flujo completo

1. Crear un usuario
2.  Crear un libro para ese usuario
3. Consultar todos los usuarios con sus libros
4.  Obtener estadísticas de libros por género

Este flujo permite probar todas las funcionalidades principales de la API.

 Validaciones Importantes

* Un usuario no puede tener dos libros con el mismo título
* Se validan correos únicos
* Se manejan errores personalizados:

NOT_FOUND → Recurso no encontrado

BAD_USER_INPUT → Error de validación o duplicado

Manejo de Errores

Ejemplo de error cuando se intenta registrar un correo duplicado:

{
  "errors": [
    {
      "message": "Email ya registrado",
      "code": "BAD_USER_INPUT"
    }
  ]
}
