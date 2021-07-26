import MovimientosService from "../services/MovimientosService";
import ItemsService from "../services/ItemsService";
class MovimientosController { 

  static add(req, res) {      
    const d = new Date()
    const {item, items } = req.body
      /****************************************************************/  
      Promise.all([MovimientosService.add(item)]) 
      .then(([result]) => {      
          let vitems = Array()          
          for (var i = 0, max = items.length; i < max; i += 1) {    
              let dat = {}
              dat.libroId = items[i].libroId
              dat.movimientoId = result.Movimiento.id
              vitems.push(dat)
          }
          Promise.all([ItemsService.add(vitems),MovimientosService.getId(result.Movimiento.id)]) 
          .then(([resuli,movi]) => {       
	     Promise.all([MovimientosService.getAllAlumnos(1,12,item.estudianteId),MovimientosService.todu(movi,movi.id)])
                .then(([resCaja,mm]) => {
                     res.status(200).send({ result: resCaja });
                  })     
                })
          })        
              
      .catch((reason) => {          
	      console.log(reason)
	      res.status(400).send({ reason });
      });
       /****************************************************************/   
  }  

  static listadetalle(req, res) {        
  Promise.all([MovimientosService.getAllAlumnos(req.params.page,req.params.num,req.params.id)]) 
    .then(([result]) => {
         res.status(200).send({ result: result });                
        })        
    .catch((reason) => { 
	    console.log(reason)
      res.status(400).send({ reason });
    });   
}	
  static listas(req, res) {        
      Promise.all([MovimientosService.listas()]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static getAll(req, res) {        
    Promise.all([MovimientosService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
      .then(([result]) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        res.status(400).send({ reason });
      });   
}
  static adds(req, res) {        
    Promise.all([MovimientosService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  MovimientosService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([resu]) => {
                  res.status(200).send({ result: resu });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}
 static borrar(req, res) {
        Promise.all([MovimientosService.del(req.params.id)])
            .then(([Movimientos]) => {
                Promise.all([MovimientosService.getAll(1,12,"nombre","ASC")])
                    .then(([Movimientoss]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${Movimientos} eliminado`, 'result': Movimientoss })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason.parent.message })
            })
    }

    static actualizar(req, res) {
            Promise.all([MovimientosService.update(req.body, req.params.id)])
            .then(([Movimientos]) => {
                Promise.all([MovimientosService.getAll(1,12,"nombre","ASC")])
                    .then(([Movimientoss]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': Movimientoss })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

   static item(req, res) {
        Promise.all([
		MovimientosService.getId(req.params.id),
                ItemsService.getItems(req.params.id)
	])
            .then(([result,resu]) => {
                res.status(200).send({ result:{ result, resu }})
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

   static getAllDevoluciones(req, res) { 
    Promise.all([MovimientosService.getAllDevoluciones(req.params.page,req.params.num,req.params.prop,req.params.orden)])
      .then(([result]) => {
           res.status(200).send({ result: result });
          })
      .catch((reason) => {
        res.status(400).send({ reason });
      });
   }


}


export default MovimientosController;
