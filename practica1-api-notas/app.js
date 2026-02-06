const express = require('express');
const cors = require('cors');
require('dotenv').config();

const rutasNotas = require('./routes/notas.rutas');
const conectarBaseDeDatos = require('./bd');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notas', rutasNotas);

app.get('/api/salud', (req, res) => {
  res.json({ ok: true });
});

const PUERTO = process.env.PUERTO || 3000;

conectarBaseDeDatos(process.env.URI_MONGO);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
