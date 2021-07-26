import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Modulo } = database;

class ModuloService {
    
  static getAll(rolId) {  
   return new Promise((resolve, reject) => {
      Modulo.findAll({
        where: { rolId: rolId} ,
        order: [['name', 'ASC']],
      })
        .then((modulos) =>
          resolve(modulos)
        )
        .catch((reason) => reject(reason));
    });
  }
  
}

export default ModuloService;
