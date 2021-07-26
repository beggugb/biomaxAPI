import CutterService from '../services/CutterService';

class CutterController{  

  /* Metodos */
   static data(req, res){      
    Promise.all([ CutterService.getAll(req.params.page,req.params.num)])
      .then(([cutters]) => {                     
         res.status(200).send({ cutters })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      }) 
  } 

  static listar(req, res) {    
    Promise.all([ CutterService.getList(req.params.name)])
      .then(([result]) => {            
        if(result){
          res.status(200).send({ result: result })
        } else
        {
          const result = {};
          result.id = 3;
          result.label= 'Aal';
          result.codigo = '112';
          res.status(200).send({ result })
        } 
         
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      })
  }

  static registrar(req, res){             
    if(req.body.nombre){
      Promise.all([ CutterService.add(req.body)])
      .then(([cutter]) =>{               
        Promise.all([ CutterService.getAll(1,12)])
          .then(([cutters]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${cutter.nombre} registrado`, 'data': cutters})
          }) 
      })                 
    }else{
      res.status(400).send({'message': 'datos faltantes' })
    }
  }
  
  static borrar(req, res){                
    Promise.all([ CutterService.del(req.params.id)])
    .then(([cutter]) =>{                              
        Promise.all([ CutterService.getAll(1,12)])
          .then(([cutters]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${cutter} eliminado`, 'cutters': cutters})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  static actualizar(req, res){               
    Promise.all([ CutterService.update(req.body,req.params.id)])
    .then(([cutter]) =>{                              
        Promise.all([ CutterService.getAll(1,12)])
          .then(([cutters]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${req.params.id} actualizado`, 'cutters': cutters})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  

}

export default CutterController;
