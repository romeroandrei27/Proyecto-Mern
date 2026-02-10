const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = express.Router();

// Definición del modelo de usuario
const esquemaUsuario = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Evita error de re-compilación de modelo si usas nodemon
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', esquemaUsuario);

router.post('/registro', async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHasheado = await bcrypt.hash(password, 10);
        await Usuario.create({ email, password: passwordHasheado });
        res.status(201).json({ mensaje: 'Registrado correctamente' });
    } catch (e) { res.status(400).json({ mensaje: 'Error al registrar' }); }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (usuario && await bcrypt.compare(password, usuario.password)) {
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } else {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
});

module.exports = router;
