import BibliotecaService from '../services/BibliotecaService';

class BibliotecaController{	

  static item(req, res){                 
      Promise.all([ BibliotecaService.getId(req.params.id)])
      .then(([biblioteca]) =>{                       
          res.status(200).json({'message': `Biblioteca : ${req.params.id}`, 'result': biblioteca })          
      })
      .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }
  
  static actualizar(req, res){              
    Promise.all([ BibliotecaService.update(req.body,req.params.id)])
    .then(([biblioteca]) =>{                                      
      res.status(200).json({'message': `Biblioteca : ${req.params.id} actualizado`, 'result': biblioteca})
      }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  

}

export default BibliotecaController;