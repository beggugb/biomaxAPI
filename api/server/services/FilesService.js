import database from "../src/models";


const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const sharp = require("sharp");
const multer = require('multer');
const uuidv4 = require('uuid');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'api/public/images/trash')
    },
    filename: function (req, file, cb) {
  
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

var upload = multer({ storage: storage }).single('file')

class FilesService {

   static libros(req,res) {
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            resolve(err)
          } else if (err) {
            resolve(err)
          }
          sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/libros/lg/' + req.file.filename);
          sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/libros/md/' + req.file.filename);
          sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/libros/sm/' + req.file.filename);
	  resolve(req.file)
        })
      })
  }



}

export default FilesService;
