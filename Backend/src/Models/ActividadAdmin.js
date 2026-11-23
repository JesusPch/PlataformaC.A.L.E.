const { DataTypes } = require('sequelize');
const sequelize = require('../DataBase/database');

const ActividadAdmin = sequelize.define('ActividadAdmin', {
  id_actividad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo_actividad: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  pdf_actividad_key: DataTypes.TEXT,
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: DataTypes.TEXT
}, {
  tableName: 'actividad_admin',
  timestamps: false
});

module.exports = ActividadAdmin;