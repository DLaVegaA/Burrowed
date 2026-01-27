const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importamos la conexión

const Profesor = sequelize.define('Profesor', {
  id_profesor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  no_empleado: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_pa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_ma: {
    type: DataTypes.STRING,
    allowNull: true
  },
  correo_institucional: {
    type: DataTypes.STRING,
    unique: true
  },
  contrasena: { // Usamos el nombre que definimos en el diseño
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Profesor', // Para forzar que la tabla se llame igual que en el diseño
  timestamps: false // Si no quieres created_at y updated_at (en nuestro diseño no los pusimos)
});

module.exports = Profesor;