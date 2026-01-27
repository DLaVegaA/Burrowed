const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Grupo = sequelize.define('Grupo', {
  id_grupo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo_grupo: { type: DataTypes.STRING, allowNull: false },
  semestre: { type: DataTypes.STRING, allowNull: false },
  id_materia: { type: DataTypes.INTEGER, allowNull: false }, // FK
  id_profesor: { type: DataTypes.INTEGER, allowNull: false } // FK
}, { 
  tableName: 'Grupo', 
  timestamps: false,
  indexes: [{ unique: true, fields: ['codigo_grupo', 'id_materia', 'semestre'] }]
});

module.exports = Grupo;