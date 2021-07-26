import DeweyService from '../services/DeweyService';

class DeweyController{  

  /* Metodos */
   static data(req, res){      
    Promise.all([ DeweyService.getAll(req.params.page,req.params.num)])
      .then(([deweys]) => {                     
         res.status(200).send({ deweys })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      }) 
  } 

  static listar(req, res) {    
    Promise.all([ DeweyService.getList(req.params.name)])
      .then(([result]) => {                     
         res.status(200).send({ result })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      })
  }

  static registrar(req, res){             
    if(req.body.nombre){
      Promise.all([ DeweyService.add(req.body)])
      .then(([dewey]) =>{               
        Promise.all([ DeweyService.getAll(1,12)])
          .then(([deweys]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${dewey.nombre} registrado`, 'data': deweys})
          }) 
      })                 
    }else{
      res.status(400).send({'message': 'datos faltantes' })
    }
  }
  
  static borrar(req, res){                
    Promise.all([ DeweyService.del(req.params.id)])
    .then(([dewey]) =>{                              
        Promise.all([ DeweyService.getAll(1,12)])
          .then(([deweys]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${dewey} eliminado`, 'deweys': deweys})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  static actualizar(req, res){               
    Promise.all([ DeweyService.update(req.body,req.params.id)])
    .then(([dewey]) =>{                              
        Promise.all([ DeweyService.getAll(1,12)])
          .then(([deweys]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${req.params.id} actualizado`, 'deweys': deweys})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  

}

export default DeweyController;