import EstudianteService from "../services/EstudianteService";

class EstudianteController {
 

  static item(req, res) {  
               
      Promise.all([EstudianteService.getItem(req.params.id)]) 
           .then(([Estudiante]) => {
                res.status(200).send({ result: Estudiante });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }

  static search(req, res) {              
    const { nombre } = req.body
      Promise.all([EstudianteService.search(nombre)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static lista(req, res) {        
	  console.log('oiiik')
      Promise.all([EstudianteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static add(req, res) {        
    
    Promise.all([EstudianteService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  EstudianteService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ data: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

  static registro(req, res) {
    
    Promise.all([EstudianteService.add(req.body)])
      .then(([result]) => {
           res.status(200).send({ result });
          })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
 }

  static update(req, res) {
    Promise.all([EstudianteService.update(req.body, req.params.id)])
      .then(([Estudiante]) => {
          res.status(200).send({ message:'Estudiante actualizado', Estudiante });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Estudiante: null });
      });
  }

  static delete(req, res) {
    Promise.all([EstudianteService.delete(req.params.id)])
      .then(([Estudiante]) => {
        Promise.all([                    
          EstudianteService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Estudiante eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}

export default EstudianteController;

