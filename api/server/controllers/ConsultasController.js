import LibroService from '../services/LibroService';

class ConsultasController{	

   static search(req, res){             
    const pTag  = (req.params.consulta === '' || req.params.consulta === 'undefined') ? '%' : '%'+ req.params.consulta +'%'
     
    Promise.all([ LibroService.consultas(req.params.page,req.params.num,pTag)])
      .then(([result]) => {                     
         res.status(200).send({ result })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      }) 
  } 

}

export default ConsultasController;