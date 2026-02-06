const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Déjalo importado para el futuro
// Asumo que 'asociaciones.js' exporta todos tus modelos conectados
const Profesor = require('../models/Profesor');
const TecnicoDocente = require('../models/TecnicoDocente');
const ResponsableLab = require('../models/ResponsableLab');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    let usuario = null;
    let rol = '';

    // ------------------------------------------------------------------
    // PASO 1: BÚSQUEDA EN CASCADA (Busca en las 3 tablas una por una)
    // ------------------------------------------------------------------

    // 1. Intentar buscar en PROFESORES (usa 'correo_institucional')
    if (!usuario) {
      const profesor = await Profesor.findOne({ where: { correo_institucional: correo } });
      if (profesor) {
        usuario = profesor;
        rol = 'Profesor';
      }
    }

    // 2. Intentar buscar en TÉCNICOS (usa 'correo')
    if (!usuario) {
      const tecnico = await TecnicoDocente.findOne({ where: { correo: correo } });
      if (tecnico) {
        usuario = tecnico;
        rol = 'Tecnico'; // O 'Tecnico Docente'
      }
    }

    // 3. Intentar buscar en RESPONSABLES (usa 'correo')
    if (!usuario) {
      const responsable = await ResponsableLab.findOne({ where: { correo: correo } });
      if (responsable) {
        usuario = responsable;
        rol = 'Responsable';
      }
    }

    // Si después de todo no encontramos a nadie:
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // ------------------------------------------------------------------
    // PASO 2: VERIFICACIÓN DE CONTRASEÑA
    // ------------------------------------------------------------------
    
    // OPCIÓN A: MODO DESARROLLO (TEXTO PLANO)
    // Úsala mientras tus usuarios en la BD tengan pass tipo "12345"
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    /* // OPCIÓN B: MODO PRODUCCIÓN (BCRYPT)
    // Descomenta esto y comenta la Opción A cuando ya encríptes las contraseñas
    const passwordValido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    */

    // ------------------------------------------------------------------
    // PASO 3: GENERAR TOKEN Y RESPONDER
    // ------------------------------------------------------------------
    const token = jwt.sign(
      { 
        id: usuario.id_profesor || usuario.id_tecnico || usuario.id_responsable, 
        rol: rol 
      },
      process.env.JWT_SECRET || 'SECRETO_SUPER_SECRETO',
      { expiresIn: '8h' }
    );

    res.json({
      message: `Bienvenido ${rol}`,
      token,
      usuario: {
        nombre: usuario.nombre,
        rol: rol // ¡Importante! Esto es lo que lee tu Dashboard para mostrar los botones
      }
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};