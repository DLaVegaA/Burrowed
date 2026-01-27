require('dotenv').config(); // Para leer el archivo .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Ponlo en true si quieres ver las consultas SQL en consola
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conexión a PostgreSQL exitosa.');
  } catch (error) {
    console.error('🔴 Error al conectar a la BD:', error);
  }
}

testConnection();

module.exports = sequelize;