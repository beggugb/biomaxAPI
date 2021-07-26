import model from '../src/models'
import jwt    from 'jsonwebtoken'
import ModuloController from '../controllers/ModuloController';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs')
const { Tarea } = model;

class TareaController{	

  /* Metodos */
   static listar(req, res){   
   const { usuarioId, desde, hasta } = req.body
    Promise.all([ listari(usuarioId, desde, hasta)])
      .then(([tareas]) => {                     
         res.status(200).send({ tareas })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason }) 
      }) 
  } 

  static addTarea(req, res){   
   const { usuarioId,desde,hasta } = req.body
   if(req.body.title)
   {
    Promise.all([ addT(req.body)])
      .then(([tarea]) => { 
          Promise.all([             
            listari(usuarioId,desde,hasta)
            ])
            .then(([tareas]) => { 
              res.status(200).send({ tareas })

            })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason.parent + reason.parent }) 
      }) 
   }else{
      res.status(200).send({ 'message':'datos incorrectos' })
   }     
  } 
  static updateTarea(req, res){   
   const { usuarioId,desde,hasta } = req.body
   
   if(req.body.title)
   {
    Promise.all([ upTarea(req.body,req.params.id)])
      .then(([tarea]) => { 
          Promise.all([             
            listari(usuarioId,desde,hasta)
            ])
            .then(([tareas]) => { 
              res.status(200).send({ tareas })

            })
      })
      .catch(reason => { 
        res.status(400).send({'message':reason.parent + reason.parent }) 
      }) 
   }else{
      res.status(200).send({ 'message':'datos incorrectos' })
   }        
  } 
  /* Fin Metodos */

  /* Interfaces */

  /* Fin Interfaces */

}

function addT(tarea) {  
  return new Promise((resolve, reject) => {            
   Tarea
   .create(tarea)
    .then(item => resolve(item))
    .catch(reason => reject(reason))
  })    
}

function upTarea(tarea,taskId) {  
  return new Promise((resolve, reject) => {            
   Tarea
   .update(tarea,{ where: { id: Number(taskId) }})
    .then(item => resolve(item))
    .catch(reason => reject(reason))
  })    
}

function listari(userId, desde, hasta) {   
    return new Promise((resolve, reject) => {      
      Tarea
        .findAll({
        raw:true,
        nest:true,         
        order:  [['start', 'ASC'],] ,        
        where : { [Op.and]: [                            
                  { usuarioId: {[Op.eq]: userId  }}, 
                  { start: {[Op.between]: [desde, hasta] }}
              ]},                   
        attributes: ['id','title','start','end','classNames','backgroundColor','selectable','usuarioId']
      })
      .then(tareas =>
        resolve(tareas))   
      .catch(reason => reject(reason))  
     
    })    
  }


export default TareaController;