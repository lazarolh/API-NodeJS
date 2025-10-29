/**
 * @file db.js
 * @description Módulo encargado de conectar la aplicación a la base de datos MongoDB.
 * Utiliza Mongoose para gestionar la conexión y manejar eventos de error o éxito.
 */

const mongoose = require('mongoose');
//Conecta la aplicación a MongoDB usando la URI del archivo .env
async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1); //Termina si falla la conexión
  }
}
// Se exporta una función que debe ser llamada al iniciar el servidor.
module.exports = connectDB;
