import FilesService from '../services/FilesService';
import LibroService from '../services/LibroService';

class FilesController{    
   
  static libros(req, res) {
    Promise.all([FilesService.libros(req, res)])
      .then(([file]) => {
        const art = {}
        art.filename = file.filename
        Promise.all([LibroService.update(art, req.params.id)])
          .then(([result]) => {
                res.status(200).send({ result })
          })
      })
      .catch(reason => {
	console.log(reason)      
        res.status(400).send({ 'message': reason })
      })

  }
 	  
}
export default FilesController;

