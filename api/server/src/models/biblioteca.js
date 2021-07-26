'use strict';
module.exports = (sequelize, DataTypes) => {
  const Biblioteca = sequelize.define('Biblioteca', {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    web: DataTypes.STRING,
    mail: DataTypes.STRING
  }, {});
  Biblioteca.associate = function(models) {
    // associations can be defined here
  };
  return Biblioteca;
};