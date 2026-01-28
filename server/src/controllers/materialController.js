const Material = require('../models/Material');

// Obtener todos los materiales
exports.obtenerTodos = async (req, res) => {
  try {
    // Buscamos todo y ordenamos por ubicación para que se vea bonito
    const materiales = await Material.findAll({
      order: [['ubicacion_estante', 'ASC'], ['nombre_material', 'ASC']]
    });
    
    res.json(materiales); // Enviamos la lista en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener materiales' });
  }
};