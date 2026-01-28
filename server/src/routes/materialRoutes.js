const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Definir la ruta GET (para pedir datos)
router.get('/', materialController.obtenerTodos);

module.exports = router;