'use strict';
module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define('Items', {
    orden: DataTypes.STRING,
    libroId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Libro',
        key: 'id',
        as: 'libroId'
      }
    },
    movimientoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Movimiento',
        key: 'id',
        as: 'movimientoId'
      }
    },
  }, {});
  
  Items.associate = function(models) {
    // associations can be defined here
    Items.belongsTo(models.Libro,{
      foreignKey: 'libroId',
      onDelete: 'CASCADE'
    });
    Items.belongsTo(models.Movimiento,{
      foreignKey: 'movimientoId',
      onDelete: 'CASCADE'
    });
  };
  return Items;
};

