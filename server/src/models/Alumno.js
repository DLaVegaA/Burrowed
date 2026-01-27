const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alumno = sequelize.define('Alumno', {
  id_alumno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  boleta: { type: DataTypes.STRING, unique: true, allowNull: false },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido_pa: { type: DataTypes.STRING, allowNull: false },
  apellido_ma: { type: DataTypes.STRING },
  correo_institucional: { type: DataTypes.STRING },
  correo_personal: { type: DataTypes.STRING },
  validado_por_profesor: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'Alumno', timestamps: false });

module.exports = Alumno;