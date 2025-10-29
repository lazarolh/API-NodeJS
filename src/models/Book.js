const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: [true, 'El título es obligatorio'] },
  author: { type: String, required: [true, 'El autor es obligatorio'] }
}, { timestamps: true });

// Índice compuesto para que un mismo usuario no agregue dos veces el mismo libro (título+autor).
bookSchema.index({ user: 1, title: 1, author: 1 }, { unique: true });

module.exports = mongoose.model('Book', bookSchema);
