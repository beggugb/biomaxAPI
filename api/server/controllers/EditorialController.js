import EditorialService from "../services/EditorialService";

class EditorialController { 

  static listas(req, res) {        
      Promise.all([EditorialService.listas()]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static getAll(req, res) {        
    Promise.all([EditorialService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
      .then(([result]) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        res.status(400).send({ reason });
      });   
}
  static add(req, res) {        
    Promise.all([EditorialService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  EditorialService.getAll(1,12,"nombre","ASC")
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
        Promise.all([EditorialService.del(req.params.id)])
            .then(([Editorial]) => {
                Promise.all([EditorialService.getAll(1,12,"nombre","ASC")])
                    .then(([Editorials]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${Editorial} eliminado`, 'result': Editorials })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason.parent.message })
            })
    }

    static actualizar(req, res) {
            Promise.all([EditorialService.update(req.body, req.params.id)])
            .then(([Editorial]) => {
                Promise.all([EditorialService.getAll(1,12,"nombre","ASC")])
                    .then(([Editorials]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': Editorials })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

   static item(req, res) {
        Promise.all([EditorialService.getId(req.params.id)])
            .then(([result]) => {
                res.status(200).send({ result })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

}


export default EditorialController;
