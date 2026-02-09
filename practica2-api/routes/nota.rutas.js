const express = require('express');
const Nota = require('../models/nota');

const router = express.Router();

// POST /api/notas
router.post('/', async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || texto.trim().length < 5) {
      return res.status(400).json({
        mensaje: 'El texto debe tener al menos 5 caracteres'
      });
    }

    const nuevaNota = await Nota.create({
      texto: texto.trim()
    });

    console.log('📝 Nota creada:', nuevaNota._id);

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al guardar la nota'
    });
  }
});

// GET /api/notas
router.get('/', async (req, res) => {
  try {
    const notas = await Nota.find().sort({ createdAt: -1 });

    console.log(`📋 Se enviaron ${notas.length} notas`);

    res.json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: 'Error al obtener las notas'
    });
  }
});

module.exports = router;
