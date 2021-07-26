'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cutter = sequelize.define('Cutter', {
    codigo: DataTypes.STRING,
    label: DataTypes.STRING
  }, {});
  Cutter.associate = function(models) {
    // associations can be defined here
  };
  return Cutter;
};