import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Rol } = database;

class RolService {
    
  static getAll() {  
   return new Promise((resolve, reject) => {
      Rol.findAll({
        attributes: [["id","value"],["nameRol","label"]],
	      order: [['nameRol','ASC']]

      })
        .then((roles) =>
          resolve(roles)
        )
        .catch((reason) => reject(reason));
    });
  }
  
}

export default RolService;
