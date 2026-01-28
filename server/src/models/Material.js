const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Material = sequelize.define('Material', {
  id_material: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_laboratorio: { type: DataTypes.INTEGER, allowNull: false },
  nombre_material: { type: DataTypes.STRING, allowNull: false },
  sicpat: { type: DataTypes.STRING, unique: true }, // Identificador IPN (Único)
  no_serie: { type: DataTypes.STRING },             // Serie del Fabricante (Puede repetirse en distintos modelos)
  codigo_barras: { type: DataTypes.STRING },        // Para lector láser
  id_inventario_interno: { type: DataTypes.STRING }, // El "IN0001" o "FBA-LAB..."
  descripcion_tecnica: { type: DataTypes.TEXT },
  modelo: { type: DataTypes.STRING },
  proveedor: { type: DataTypes.STRING },
  estado_fisico: { type: DataTypes.STRING, defaultValue: 'Bueno' },
  estado_disponibilidad: { type: DataTypes.STRING, defaultValue: 'Disponible' },
  ubicacion_estante: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.TEXT },
  url_manual_pdf: { type: DataTypes.STRING },
  fecha_mantenimiento: { type: DataTypes.DATE }
}, { tableName: 'Material', timestamps: false });

module.exports = Material;