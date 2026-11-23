const { DataTypes } = require('sequelize');
const sequelize = require('../DataBase/database');

const Alumno = sequelize.define('Alumno', {
  id_alumno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_cuenta: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  edad: DataTypes.INTEGER,
  telefono: DataTypes.STRING(20),
  nivel: DataTypes.STRING(50),
  modalidad: DataTypes.STRING(50),
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  estado: {
    type: DataTypes.STRING(30),
    defaultValue: 'no autorizado'
  },
  fecha_liberacion: DataTypes.DATEONLY,
  pdf_registro_key: DataTypes.TEXT
}, {
  tableName: 'alumnos',
  timestamps: false
});

module.exports = Alumno;