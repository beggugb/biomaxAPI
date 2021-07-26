import UserService from "../services/UserService";
import ModuloService from "../services/ModuloService";


class UserController {

  static registro(req, res) {    
      Promise.all([UserService.add(req.body)])
        .then(([result]) => {            
            Promise.all([ UserService.getAll(1,12,"nombre","ASC")]) 
                .then(([usuarios]) => {
                    res.status(200).send({ result: usuarios });
                })
            })        
        .catch((reason) => {
          res.status(400).send({ reason });
        });   
  }
  static login(req, res) {
    const { username, password } = req.body;
    Promise.all([UserService.login(username, password)])
      .then(([user]) => {      
	 if(user.usuario){     
	   Promise.all([ ModuloService.getAll(user.usuario.rolId)])
               .then(([modulos]) => {                    
                   res.status(200).send({ user: user, modulos: modulos});                                        
               })
         }else{
             res.status(200).send({ user: user, modulos: []}); 
            
	 } 
      })
      .catch((reason) => {
              
        res.status(400).send({ message: reason });
      });
  }

  static testing(req, res) {        
    var d = new Date();
    var formatted = new Date(d + "UTC")
    .toISOString()
    .replace(/-/g, "")
    .split("T")[0];
    Promise.all([UserService.getItem(req.params.id)])
      .then(([user]) => {               
        Promise.all([MailController.testing("testing",user,formatted)])
        .then(([user]) => {       
          res.status(200).send({ message: "user", result: user });
        })  
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }
  
  static update(req, res) {
    Promise.all([UserService.update(req.body, req.params.id)])
      .then(([usuario]) => {
	      Promise.all([ UserService.getAll(1,12,"nombre","ASC")])
	        .then(([usuarios]) => {
                     res.status(200).send({ message:'Usuario actualizado', result: usuarios });
       		 })
	    })  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, usuarios: null });
      });
  }


  static item(req, res) {
    Promise.all([UserService.getItem(req.params.id)])
      .then(([usuario]) => {
          res.status(200).send({ result: usuario });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

  static delete(req, res) {
    Promise.all([UserService.delete(req.params.id)])
      .then(([user]) => {
        Promise.all([                    
          UserService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Usuario eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

  static lista(req, res) {        
    Promise.all([UserService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
      .then(([result]) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {  
	      
        res.status(400).send({ reason });
      });   
 }

 static search(req, res) {              
  const { page, num, prop, orden, name, nit, tipo } = req.body
    Promise.all([UserService.search(page, num, prop, orden, name, nit, tipo)]) 
         .then(([result]) => {
              res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        res.status(400).send({ reason });
      });   
}

  static listas(req, res) {

      Promise.all([UserService.listas()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


}

export default UserController;
