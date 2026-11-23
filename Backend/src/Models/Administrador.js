const { DataTypes } = require('sequelize');
const sequelize = require('../DataBase/database');

const Administrador = sequelize.define('Administrador', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  no_empleado: {
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
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'administrador',
  timestamps: false
});

module.exports = Administrador;