import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Items, Libro } = database;

class ItemsService {
   
  static add(data) {    
    return new Promise((resolve, reject) => {        
        Items.bulkCreate(data, {individualHooks: true})  
            .then((result) => {              
                resolve({ message: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              }); 
     });
   }
  static getItems(mvId) {
    return new Promise((resolve, reject) => {
       Items.findAll({
         raw: true,
         nest: true,
         where: { movimientoId: { [Op.eq]: mvId }},
         order: [['id', 'DESC']],
	 include: [{ model: Libro, attributes: ["id", "codigo","titulo"]} ]      
       })
         .then((cajas) =>
           resolve(cajas)
         )
         .catch((reason) => reject(reason));
     });
   }	
   	
}

export default ItemsService;

