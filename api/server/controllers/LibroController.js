import LibroService from '../services/LibroService';
import DeweyService from '../services/DeweyService';

class LibroController{  

  /* Metodos */
   static data(req, res){      
    Promise.all([ LibroService.getAll(req.params.page,req.params.num)])
      .then(([result]) => {                     
         res.status(200).send({ result: result })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      }) 
  } 

  static listar(req, res) {    
    Promise.all([ LibroService.getList(req.params.name)])
      .then(([libro]) => {                     
         res.status(200).send({ libro })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      })
  }

  static registro(req, res){         
      Promise.all([ LibroService.add(req.body)])
      .then(([libro]) =>{                       
          res.status(200).json({'message': `Libro ID: ${libro.titulo} registrado`,'result':libro})          
        })      
      .catch(reason => { 
	console.log(reason)      
        res.status(400).send({'message':reason }) 
      })        
  }
  
  static borrar(req, res){                
    Promise.all([ LibroService.del(req.params.id)])
    .then(([libro]) =>{                              
        Promise.all([ LibroService.getAll(1,12)])
          .then(([libros]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${libro} eliminado`, 'libros': libros})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  static actualizar(req, res){               
    Promise.all([ LibroService.update(req.body,req.params.id)])
    .then(([libro]) =>{                              
        Promise.all([ LibroService.getId(req.params.id)])
          .then(([result]) =>{                    
            res.status(200).json({'message': `Usuario ID: ${req.params.id} actualizado`, 'result': result})
          }) 
        }) 
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  static item(req, res){               
    Promise.all([ LibroService.getId(req.params.id)])
      .then(([result]) =>{
          Promise.all([ DeweyService.getList(result.clasificacion)])
            .then(([items]) =>{          
              res.status(200).json({'message': `Usuario ID: ${req.params.id}`, 'result': result,'deweys': items})         
          }) 
    })        
    .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

  static buscar(req, res){ 
  const { titulo, autor  } = req.body              
    Promise.all([ LibroService.search(titulo)])
      .then(([result]) =>{                      
          res.status(200).json({result: result })         
      })        
      .catch(reason =>{                    
	  console.log(reason)    
          res.status(400).send({'message': reason })
        })                   
  }

  static buscaru(req, res){ 
  const { titulo  } = req.body
    Promise.all([ LibroService.searchu(titulo)])
      .then(([result]) =>{
          res.status(200).json({result: result })
      })
      .catch(reason =>{
          console.log(reason)
          res.status(400).send({'message': reason })
        })
  }
	

  static informe(req, res){ 
  const { columna, parametro, valor  } = req.body              
  Promise.all([ LibroService.informe(columna,parametro,valor)])
      .then(([result]) =>{                      
              res.status(200).json({'message': 'Resultado', 'result': result })         
      })        
      .catch(reason =>{                    
          res.status(400).send({'message': reason })
        })                   
  }

 static consulta(req, res){ 
  const { parametro  } = req.body
  console.log(parametro)	 
    Promise.all([ LibroService.consulta(parametro)])
      .then(([result]) =>{
          res.status(200).json({result: result })
      })
      .catch(reason =>{
          console.log(reason)
          res.status(400).send({'message': reason })
        })
  }	
}

export default LibroController;
