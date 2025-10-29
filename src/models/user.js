const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: [true, 'El nombre es obligatorio'] },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Email inválido']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
