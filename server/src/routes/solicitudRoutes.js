const express = require('express');
const router = express.Router();
// 1. Corregimos el nombre de la variable de importación
const solicitudController = require('../controllers/solicitudController');

// 2. Ruta POST (Esta es la que usaremos ahora para el formulario)
router.post('/', solicitudController.crearSolicitud);

// 3. Ruta GET (La dejo comentada porque aún no creamos esa función en el controlador)
// router.get('/', solicitudController.obtenerTodos);

module.exports = router;