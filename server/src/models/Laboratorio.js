const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Laboratorio = sequelize.define('Laboratorio', {
  id_laboratorio: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_laboratorio: { type: DataTypes.STRING, allowNull: false },
  ubicacion: { type: DataTypes.STRING },
  url_reglamento_pdf: { type: DataTypes.STRING },
  id_responsable: { type: DataTypes.INTEGER } // FK explicita
}, { tableName: 'Laboratorio', timestamps: false });

module.exports = Laboratorio;