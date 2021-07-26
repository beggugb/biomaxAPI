import CarreraService from "../services/CarreraService";

class CarreraController { 

  static listas(req, res) {        
      Promise.all([CarreraService.listas()]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static getAll(req, res) {        
    Promise.all([CarreraService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
      .then(([result]) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        res.status(400).send({ reason });
      });   
}
  static add(req, res) {        
    Promise.all([CarreraService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  CarreraService.getAll(1,12,"nombre","ASC")
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
        Promise.all([CarreraService.del(req.params.id)])
            .then(([Carrera]) => {
                Promise.all([CarreraService.getAll(1,12,"nombre","ASC")])
                    .then(([Carreras]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${Carrera} eliminado`, 'result': Carreras })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason.parent.message })
            })
    }

    static actualizar(req, res) {
            Promise.all([CarreraService.update(req.body, req.params.id)])
            .then(([Carrera]) => {
                Promise.all([CarreraService.getAll(1,12,"nombre","ASC")])
                    .then(([Carreras]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': Carreras })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

   static item(req, res) {
        Promise.all([CarreraService.getId(req.params.id)])
            .then(([result]) => {
                res.status(200).send({ result })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

}


export default CarreraController;
