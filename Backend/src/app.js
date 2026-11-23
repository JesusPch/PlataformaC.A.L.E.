const express = require('express');

// Importar los archivos de rutas
const adminRoutes = require('./Routes/admin.routes');
const alumnoRoutes = require('./Routes/alumno.routes');
const actividadAdminRoutes = require('./Routes/actividadAdmin.routes');
const actividadAlumnoRoutes = require('./Routes/actividadAlumno.routes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de comprobación principal
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Backend funcionando' });
});

// Enrutamiento de la API
app.use('/api/admins', adminRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/actividades-admin', actividadAdminRoutes);
app.use('/api/actividades-alumno', actividadAlumnoRoutes);

module.exports = app;