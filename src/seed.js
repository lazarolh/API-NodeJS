require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/Book');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book_user_api';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado para seed');

    // Limpiar DB
    await User.deleteMany({});
    await Book.deleteMany({});

    console.log('Colecciones  borradas');

    // Crear usuarios de ejemplo
    const users = await User.insertMany([
      { name: 'Lázaro López', email: 'lazaro@lopez.com' },
      { name: 'María Pérez', email: 'juan@perez.com' }
    ]);

    console.log('Usuarios creados:', users.map(u => u.name));

    // Crear libros asociados
    const books = await Book.insertMany([
      { user: users[0]._id, title: 'Clean Code', author: 'Robert C. Martin' },
      { user: users[0]._id, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
      { user: users[1]._id, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford' }
    ]);

    console.log('Libros creados:', books.map(b => b.title));

    console.log('Seed completado ✅');
    process.exit(0);

  } catch (err) {
    console.error('Error en seed:', err);
    process.exit(1);
  }
}

seed();
