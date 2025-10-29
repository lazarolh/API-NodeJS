/**
 * @file errors.js
 * @description Define clases personalizadas para manejar errores en GraphQL.
 */
//Cuando un registro no existe se manda el siguiente error.
class NotFoundError extends Error {
  constructor(message) { super(message); this.name = 'NotFoundError'; }
}
//Error que se lanza por una validación en los datos
class ValidationError extends Error {
  constructor(message) { super(message); this.name = 'ValidationError'; }
}
module.exports = { NotFoundError, ValidationError };
