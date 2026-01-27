const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Profesor } = require('../models/asociaciones'); // Importamos desde asociaciones

exports.loginProfesor = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // 1. Buscar al profesor por correo
    const profesor = await Profesor.findOne({ where: { correo_institucional: correo } });

    if (!profesor) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // 2. Verificar contraseña
    // NOTA: Como apenas vamos a crear usuarios, por ahora compararemos texto plano.
    // Cuando hagamos el registro real, usaremos bcrypt.compare()
    // Si la contraseña en BD es "12345", esto debe ser true:
    if (profesor.contrasena !== contrasena) { 
       return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 3. Generar Token (El gafete de entrada)
    const token = jwt.sign(
      { id: profesor.id_profesor, role: 'profesor' },
      'SECRETO_SUPER_SECRETO', // En producción esto va en .env
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        nombre: profesor.nombre,
        correo: profesor.correo_institucional
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};