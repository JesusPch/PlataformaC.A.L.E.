const sequelize = require('../DataBase/database');
const Administrador = require('./Administrador');
const Alumno = require('./Alumno');
const ActividadAdmin = require('./ActividadAdmin');
const ActividadAlumno = require('./ActividadAlumno');

// 1. Relación: Administrador (1) <---> (N) ActividadAdmin
Administrador.hasMany(ActividadAdmin, { foreignKey: 'id_usuario', as: 'actividades_creadas' });
ActividadAdmin.belongsTo(Administrador, { foreignKey: 'id_usuario', as: 'creador' });

// 2. Relación: Alumno (1) <---> (N) ActividadAlumno
Alumno.hasMany(ActividadAlumno, { foreignKey: 'id_alumno', as: 'entregas' });
ActividadAlumno.belongsTo(Alumno, { foreignKey: 'id_alumno', as: 'alumno' });

// 3. Relación: ActividadAdmin (1) <---> (N) ActividadAlumno
ActividadAdmin.hasMany(ActividadAlumno, { foreignKey: 'id_actividad', as: 'entregas_alumnos' });
ActividadAlumno.belongsTo(ActividadAdmin, { foreignKey: 'id_actividad', as: 'actividad_info' });

module.exports = {
  sequelize,
  Administrador,
  Alumno,
  ActividadAdmin,
  ActividadAlumno
};