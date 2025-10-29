/**
 * @file index.js
 * @description Punto de entrada principal de la API GraphQL con Apollo Server.
 * Configura la conexión con MongoDB e inicializa el servidor Apollo.
 */
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
/**
 * Conexión a la base de datos MongoDB.
 * La URL se obtiene desde el archivo .env (MONGODB_URI).
 */
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  await connectDB(MONGODB_URI);
/**
 * Inicializa Apollo Server con los typeDefs y resolvers.
 */
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      // Limpiar errores para enviar mensajes legibles
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_ERROR'
      };
    },
    introspection: true
  });

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

start();
