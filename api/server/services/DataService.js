import database from '../src/models';
import path from 'path'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Editorial} = database;

var multer = require('multer');
var sharp = require('sharp');

var storage = multer.diskStorage({   
    destination: function (req, file, cb) {                  
      cb(null,'api/public/uploads')      
    },
    filename: function (req, file, cb) {  

      cb(null, Date.now() + '-' +file.originalname ) 
    }
  })

var upload = multer({ storage: storage }).single('file')
class DataService{
    static uploads(req, res){        
      return new Promise((resolve, reject) => {        
        upload(req, res, function (err) {           
        if (err instanceof multer.MulterError) {                                     
            resolve(err)
        } else if (err) {                    
            resolve(err)
        }        
        /*sharp(req.file.path).resize({ height: 500 }).toFile('./api/public/images/libros/lg/'+ req.file.filename);
        sharp(req.file.path).resize({ height: 250 }).toFile('./api/public/images/libros/md/'+ req.file.filename);
        sharp(req.file.path).resize({ height: 120 }).toFile('./api/public/images/libros/sm/'+ req.file.filename);        */
        resolve(req.file)
      })        
      })         
    }
}

export default DataService;
