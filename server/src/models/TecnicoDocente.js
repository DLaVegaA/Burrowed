const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TecnicoDocente = sequelize.define('TecnicoDocente', {
  id_tecnico: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  no_empleado: { type: DataTypes.STRING, unique: true, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido_pa: { type: DataTypes.STRING, allowNull: false },
  apellido_ma: { type: DataTypes.STRING },
  correo: { type: DataTypes.STRING, unique: true, allowNull: false },
  turno: { type: DataTypes.STRING },
  contrasena: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'Tecnico_Docente', timestamps: false });

module.exports = TecnicoDocente;