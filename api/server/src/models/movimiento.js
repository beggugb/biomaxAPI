'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movimiento = sequelize.define('Movimiento', {
    fechaPrestamo: DataTypes.DATE,
    fechaPrevista: DataTypes.DATE,
    fechaDevolucion: DataTypes.DATE,
    tipo: DataTypes.STRING, 	  
    estado: DataTypes.BOOLEAN,
    observaciones: DataTypes.STRING,
    estudianteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estudiante',
        key: 'id',
        as: 'estudianteId'
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    },
  }, {});
  Movimiento.associate = function(models) {
    // associations can be defined here
    Movimiento.belongsTo(models.Estudiante,{
      foreignKey: 'estudianteId',
      onDelete: 'CASCADE'
    });
    Movimiento.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    });	  
  };
  return Movimiento;
};
