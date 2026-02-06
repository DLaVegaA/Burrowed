const { Solicitud, Material, Grupo } = require('../models/asociaciones');

exports.crearSolicitud = async (req, res) => {
  try {
    const { id_profesor, id_grupo, fecha_uso, materiales } = req.body; 
    // materiales es un array de IDs: [1, 5, 20]

    // 1. Crear la cabecera de la solicitud
    const nuevaSolicitud = await Solicitud.create({
      id_profesor,
      id_grupo,
      fecha_uso_programada: fecha_uso,
      estado_solicitud: 'Pendiente'
    });

    // 2. Asociar los materiales (Llenar tabla Detalle_Solicitud)
    // Sequelize permite hacer esto fácil con setMaterials o addMaterials
    if (materiales && materiales.length > 0) {
      await nuevaSolicitud.addMaterials(materiales);
    }

    res.status(201).json({ 
      message: 'Solicitud creada con éxito', 
      solicitud: nuevaSolicitud 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear solicitud' });
  }
};