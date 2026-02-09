const mongoose = require('mongoose');

const esquemaNota = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: [true, 'El texto es obligatorio'],
      trim: true,
      minlength: [5, 'Debe tener al menos 5 caracteres']
    },
    estado: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Nota', esquemaNota);
