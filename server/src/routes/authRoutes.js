const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos la ruta POST para login
router.post('/login', authController.login); // Antes decía .loginProfesor

module.exports = router;