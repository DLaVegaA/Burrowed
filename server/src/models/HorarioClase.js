const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HorarioClase = sequelize.define('HorarioClase', {
  id_horario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_grupo: { type: DataTypes.INTEGER, allowNull: false },
  dia_semana: { type: DataTypes.STRING, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: false },
  hora_fin: { type: DataTypes.TIME, allowNull: false }
}, { 
  tableName: 'Horario_Clase', 
  timestamps: false,
  indexes: [{ unique: true, fields: ['id_grupo', 'dia_semana', 'hora_inicio'] }]
});

module.exports = HorarioClase;