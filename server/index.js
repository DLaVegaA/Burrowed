const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db');

// Importar modelos (Aquí irás agregando los demás conforme los creemos)
require('./src/models/asociaciones');
const authRoutes = require('./src/routes/authRoutes');
const materialRoutes = require('./src/routes/materialRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para poder recibir JSON en los POST
app.use('/api/auth', authRoutes);
app.use('/api/materiales', materialRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API del Sistema de Laboratorios Funcionando 🚀');
});

// Sincronizar Base de Datos y Arrancar Servidor
// "force: false" significa: Si la tabla ya existe, no la borres.
// Cambia a "force: true" solo si quieres borrar todo y recrear (cuidado en producción)
sequelize.sync({ force: false }).then(() => {
  console.log('✅ Tablas sincronizadas');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error al sincronizar BD:', error);
});