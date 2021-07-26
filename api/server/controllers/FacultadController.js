import FacultadService from '../services/FacultadService';


class FacultadController{	

  /* Metodos */
   static data(req, res){      
    Promise.all([ FacultadService.getAll(req.params.page,req.params.num)])
      .then(([result]) => {                     
         res.status(200).send({ result })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      }) 
  } 

  static listar(req, res) {    
    Promise.all([ FacultadService.getList(req.params.name)])
      .then(([result]) => {                     
         res.status(200).send({ result })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      })
  }

  static registrar(req, res){             
    if(req.body.nombre){
      Promise.all([ FacultadService.add(req.body)])
      .then(([facultad]) =>{               
        Promise.all([ FacultadService.getAll(1,12)])
          .then(([facultades]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${facultad.nombre} registrado`, 'result': facultades})
          }) 
      })                 
    }else{
      res.status(400).send({'message': 'datos faltantes' })
    }
  }
  
  static borrar(req, res){                
    Promise.all([ FacultadService.del(req.params.id)])
    .then(([facultad]) =>{                              
        Promise.all([ FacultadService.getAll(1,12)])
          .then(([facultades]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${facultad} eliminado`, 'facultades': facultades})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  static actualizar(req, res){               
    Promise.all([ FacultadService.update(req.body,req.params.id)])
    .then(([facultad]) =>{                              
        Promise.all([ FacultadService.getAll(1,12)])
          .then(([facultades]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${req.params.id} actualizado`, 'result': facultades})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  

}

export default FacultadController;