const express = require('express');
const router = express.Router();
const Nota = require('../models/nota');
const jwt = require('jsonwebtoken');

// Middleware interno para proteger rutas
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'No hay token, acceso denegado' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (e) { res.status(403).json({ mensaje: 'Token no válido' }); }
};

// Obtener notas del usuario logueado
router.get('/', verificarToken, async (req, res) => {
  const notas = await Nota.find({ usuario: req.usuarioId }).sort({ createdAt: -1 });
  res.json(notas);
});

// Crear nota vinculada al usuario
router.post('/', verificarToken, async (req, res) => {
  try {
    const nuevaNota = await Nota.create({
      texto: req.body.texto,
      usuario: req.usuarioId
    });
    res.status(201).json(nuevaNota);
  } catch (e) { res.status(400).json({ mensaje: 'Error al crear nota' }); }
});

module.exports = router;
