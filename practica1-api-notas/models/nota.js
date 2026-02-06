const mongoose = require('mongoose');

const esquemaNota = new mongoose.Schema(
  {
    texto: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    estado: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Nota', esquemaNota);
