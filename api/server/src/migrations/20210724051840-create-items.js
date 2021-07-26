'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orden: {
        type: Sequelize.STRING
      },	    
      libroId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Libros',
            key: 'id',
            as: 'libroId'
          }
        },
      movimientoId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Movimientos',
            key: 'id',
            as: 'movimientoId'
          }
        },	    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};
