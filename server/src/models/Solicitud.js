const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Solicitud = sequelize.define('Solicitud', {
  id_solicitud: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_profesor: { type: DataTypes.INTEGER },
  id_grupo: { type: DataTypes.INTEGER },
  id_tecnico_docente: { type: DataTypes.INTEGER },
  fecha_solicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fecha_uso_programada: { type: DataTypes.DATE, allowNull: false },
  estado_solicitud: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
  asistencia_docente: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'Solicitud', timestamps: false });

module.exports = Solicitud;