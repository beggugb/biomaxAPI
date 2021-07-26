'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define('Tarea', {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    classNames: DataTypes.STRING,
    backgroundColor: DataTypes.STRING,
    selectable: DataTypes.BOOLEAN,
    usuarioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id',
        as: 'usuarioId'
      }
    },
  }, {});
  Tarea.associate = function(models) {
    // associations can be defined here
    Tarea.belongsTo(models.Usuario,{
      foreignKey: 'usuarioId',
      onDelete: 'CASCADE'
    }); 
  };
  return Tarea;
};