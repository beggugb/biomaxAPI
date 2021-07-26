'use strict';
module.exports = (sequelize, DataTypes) => {
  const Libro = sequelize.define('Libro', {
    titulo: DataTypes.STRING,
    subTitulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    pais: DataTypes.STRING,
    subAutor: DataTypes.STRING,
    isbn: DataTypes.STRING,
    anio: DataTypes.STRING,
    codigo: DataTypes.STRING,
    tipo: DataTypes.STRING,
    origen: DataTypes.STRING,
    nroCopias: DataTypes.STRING,
    nroTomos: DataTypes.STRING,
    nroPaginas: DataTypes.STRING,                    
    edicion: DataTypes.STRING,
    dewey: DataTypes.STRING,
    clasificacion: DataTypes.STRING,
    tags: DataTypes.TEXT,
    cutter: DataTypes.STRING,    
    estado: DataTypes.BOOLEAN,
    disponible: DataTypes.BOOLEAN,            
    filename: DataTypes.STRING,
    deweyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Dewey',
        key: 'id',
        as: 'deweyId'
      }
    },
    cutterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cutter',
        key: 'id',
        as: 'cutterId'
      }
    },
    editorialId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Editorial',
        key: 'id',
        as: 'editorialId'
      }
    },
    carreraId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carrera',
        key: 'id',
        as: 'carreraId'
      }
    },
    observaciones: DataTypes.STRING

  }, {});
  Libro.associate = function(models) {
    // associations can be defined here
    Libro.belongsTo(models.Dewey,{
      foreignKey: 'deweyId',
      onDelete: 'CASCADE'
    });
    Libro.belongsTo(models.Cutter,{
      foreignKey: 'cutterId',
      onDelete: 'CASCADE'
    });
    Libro.belongsTo(models.Editorial,{
      foreignKey: 'editorialId',
      onDelete: 'CASCADE'
    });
    Libro.belongsTo(models.Carrera,{
      foreignKey: 'carreraId',
      onDelete: 'CASCADE'
    });    
  };
  return Libro;
};
