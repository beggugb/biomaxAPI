'use strict';
module.exports = (sequelize, DataTypes) => {
  const Facultad = sequelize.define('Facultad', {
    nombre: DataTypes.STRING,    
    bibliotecaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Biblioteca',
        key: 'id',
        as: 'bibliotecaId'
      }
    },
  }, {});
  Facultad.associate = function(models) {
    // associations can be defined here
    Facultad.belongsTo(models.Biblioteca,{
      foreignKey: 'bibliotecaId',
      onDelete: 'CASCADE'
    }); 
  };
  return Facultad;
};