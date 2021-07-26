import database from '../src/models';
/*const readXlsxFile = require("read-excel-file/node");*/

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Libro } = database;

class DataController{	
  static upload(req, res){  
    try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path = './api/public/uploads/' + req.file.filename;
    
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let libros = [];

      rows.forEach((row) => {
        let libro = {          
          titulo: row[0],          
          subTitulo: row[1],
          isbn: row[2],
          nroCopias: row[3],
          nroTomos: row[4],
          anio: row[5],
          codigo: row[6],
          nroPaginas: row[7],
          origen: row[8],
          autor: row[9],
          subAutor: row[10],
          edicion: row[11],
          dewey: row[12],
          cutter: row[13],
          tipo: row[14],
          estado: row[15],
          disponible: row[16],
          cutterId: row[17],
          deweyId: row[18],
          carreraId: row[19],
          editorialId: row[20],
          observaciones: row[21],
          clasificacion: row[22],
          tags: row[23]
        };        
        libros.push(libro);
      });    
     
      Libro.bulkCreate(libros)  
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
        
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }  
 }


}

export default DataController;  
