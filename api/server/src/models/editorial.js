'use strict';
module.exports = (sequelize, DataTypes) => {
  const Editorial = sequelize.define('Editorial', {
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    pais: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {});
  Editorial.associate = function(models) {
    // associations can be defined here
  };
  return Editorial;
};