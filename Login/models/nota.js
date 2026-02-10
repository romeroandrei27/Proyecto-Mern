const mongoose = require('mongoose');

const esquemaNota = new mongoose.Schema({
  texto: { type: String, required: true, trim: true, minlength: 5 },
  estado: { type: Boolean, default: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Nota', esquemaNota);
