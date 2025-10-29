require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  await connectDB(MONGODB_URI);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      // Limpiar errores de Mongoose para enviar mensajes legibles
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_ERROR'
      };
    },
    introspection: true
  });

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

start();
