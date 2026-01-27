const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Material = sequelize.define('Material', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_laboratorio: { type: DataTypes.INTEGER, allowNull: false },
  nombre_material: { type: DataTypes.STRING, allowNull: false },
  modelo: { type: DataTypes.STRING },
  proveedor: { type: DataTypes.STRING },
  no_serie: { type: DataTypes.STRING, unique: true },
  estado_fisico: { type: DataTypes.STRING, defaultValue: 'Bueno' },
  estado_disponibilidad: { type: DataTypes.STRING, defaultValue: 'Disponible' },
  ubicacion_estante: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.TEXT },
  url_manual_pdf: { type: DataTypes.STRING },
  fecha_mantenimiento: { type: DataTypes.DATE }
}, { tableName: 'Material', timestamps: false });

module.exports = Material;