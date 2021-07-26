'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('Estudiante', {
    codigo: DataTypes.STRING,
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING,	  
    estado: DataTypes.BOOLEAN,
    habilitado: DataTypes.BOOLEAN,    
    carreraId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carrera',
        key: 'id',
        as: 'carreraId'
      }
    },
  }, {});
  Estudiante.associate = function(models) {
    // associations can be defined here
    Estudiante.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete: 'CASCADE'
    }); 
  };
  return Estudiante;
};
