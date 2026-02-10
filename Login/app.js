const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarBaseDeDatos = require('./bd');

const app = express();

// Middlewares importantes
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
conectarBaseDeDatos(process.env.URI_MONGO);

// Rutas - ASEGÚRATE QUE LAS CARPETAS EXISTAN
app.use('/api/auth', require('./routes/auth.rutas'));
app.use('/api/notas', require('./routes/notas.rutas'));

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}`);
});
