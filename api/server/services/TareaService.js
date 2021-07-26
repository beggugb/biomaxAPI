import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Tarea, Usuario } = database;

class TareaService {  

  static getAll(usuarioId, start, end) {        
    return new Promise((resolve, reject) => {        
        Tarea.findAll({
            order: [['start', 'DESC']],            
            where: {
              [Op.and]: [            
                { usuarioId: { [Op.eq]: usuarioId } },                    
                { start: {[Op.between]: [start, end ]}},
              ]
            },    
        })
        .then((tareas) => {                
                resolve({ message: "Lista tareas", data: tareas })
            })
        .catch((reason) => {                
                reject({ message: reason.message, data: null })
         });
       });
   }

  static add(newTarea) {    
    return new Promise((resolve, reject) => {        
        Tarea.create(newTarea)
            .then((result) => {              
                resolve({ message: "success" })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
  } 

  static update(newTarea,datoId) {    
    return new Promise((resolve, reject) => {        
      Tarea.update(newTarea, { where: { id: Number(datoId) } })
            .then((result) => {              
                resolve({ message: "success" })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
 }


}

export default TareaService;
