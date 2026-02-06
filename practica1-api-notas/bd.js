const mongoose = require('mongoose');

async function conectarBaseDeDatos(uriMongo) {
  try {
    await mongoose.connect(uriMongo);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
  }
}

module.exports = conectarBaseDeDatos;
