'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dewey = sequelize.define('Dewey', {
    codigo: DataTypes.STRING,
    label: DataTypes.STRING,
    grupo: DataTypes.STRING
  }, {});
  Dewey.associate = function(models) {
    // associations can be defined here
  };
  return Dewey;
};