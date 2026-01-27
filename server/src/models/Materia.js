const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Materia = sequelize.define('Materia', {
  id_materia: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_materia: { type: DataTypes.STRING, allowNull: false },
  plan_estudios: { type: DataTypes.STRING },
  id_laboratorio: { type: DataTypes.INTEGER, allowNull: false } // FK explicita
}, { tableName: 'Materia', timestamps: false });

module.exports = Materia;