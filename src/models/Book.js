const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true,
  },
  genre: {
    type: String,
    enum: ['Ficción', 'No Ficción', 'Ciencia', 'Fantasía', 'Historia', 'Otro'],
    default: 'Otro',
  },
  year: {
    type: Number,
    min: [0, 'El año no puede ser negativo'],
    max: [new Date().getFullYear(), 'El año no puede ser en el futuro'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Evita libros duplicados por usuario y también título
bookSchema.index({ user: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);
