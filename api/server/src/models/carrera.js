'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    nombre: DataTypes.STRING,
    abreviacion: DataTypes.STRING,    
    facultadId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Facultad',
        key: 'id',
        as: 'facultadId'
      }
    },
  }, {});
  Carrera.associate = function(models) {
    // associations can be defined here
    Carrera.belongsTo(models.Facultad,{
      foreignKey: 'facultadId',
      onDelete: 'CASCADE'
    }); 
  };
  return Carrera;
};