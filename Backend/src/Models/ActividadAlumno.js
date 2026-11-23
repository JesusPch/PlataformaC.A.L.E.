const { DataTypes } = require('sequelize');
const sequelize = require('../DataBase/database');

const ActividadAlumno = sequelize.define('ActividadAlumno', {
  id_evidencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_actividad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  object_key: DataTypes.TEXT,
  bucket_name: {
    type: DataTypes.STRING(63),
    defaultValue: 'entregas-alumnos'
  },
  mime_type: {
    type: DataTypes.STRING(100),
    defaultValue: 'application/pdf'
  },
  file_size_bytes: DataTypes.BIGINT,
  comentario: DataTypes.TEXT,
  estado: {
    type: DataTypes.STRING(30),
    defaultValue: 'Pendiente'
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_evaluacion: DataTypes.DATE
}, {
  tableName: 'actividad_alumnos',
  timestamps: false
});

module.exports = ActividadAlumno;