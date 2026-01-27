const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ResponsableLab = sequelize.define('ResponsableLab', {
  id_responsable: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido_pa: { type: DataTypes.STRING, allowNull: false },
  apellido_ma: { type: DataTypes.STRING },
  correo: { type: DataTypes.STRING, unique: true },
  contrasena: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'Responsable_Lab', timestamps: false });

module.exports = ResponsableLab;