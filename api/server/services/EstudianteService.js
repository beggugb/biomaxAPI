import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Estudiante, Carrera } = database;

class EstudianteService {
    
   static add(newEstudiante) {         
    return new Promise((resolve, reject) => {
        if(newEstudiante.nombres)
        {            
            Estudiante.create(newEstudiante)
            .then((Estudiante) => {                
                resolve({ message: "Estudiante registrado", Estudiante: Estudiante })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Estudiante: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Estudiante: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Estudiante.update(dato, { where: { id: Number(datoId) } })
        .then((Estudiante) => resolve(Estudiante))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Estudiante.destroy({ where: { id: Number(datoId) } })
        .then((Estudiante) => resolve(Estudiante))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
      Estudiante.findByPk(datoId)
        .then((Estudiante) => resolve(Estudiante))
        .catch((reason) => reject(reason));
    });
  }

  static getIt(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
      Estudiante.findByPk(datoId,{
        raw: true,
        nest: true
      })
        .then((Estudiante) => resolve({Estudiante: Estudiante}))
        .catch((reason) => reject(reason));
    });
  }

  static getCI(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
     Estudiante.findOne({
        raw: true,
        nest: true,
        where: { ci: { [Op.eq]: datoId }}      
      })
        .then((Estudiante) => resolve({Estudiante: Estudiante}))
        .catch((reason) => reject(reason));
    });
  }	

  static getAll(pag,num,prop,orden) {  
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Estudiante.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],
	attributes: ["id","nombre","codigo","telefono"],
	 include: [
               { model: Carrera, attributes:['id','nombre'] }

       ]       
      })
        .then((Estudiantes) =>
          resolve({
            paginas: Math.ceil(Estudiantes.count / num),
            pagina: page,
            total: Estudiantes.count,
            data: Estudiantes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static search(nombre) {    	
    return new Promise((resolve, reject) => {
      let page = 1;
      let der = 12 * page - 12;
      
      let iName = '%' + nombre + '%'
      if (nombre === '--todos--' || nombre === null || nombre === '0') { iName = '%' }

      Estudiante.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: 12,
        order: [['nombre', 'ASC']],    
        where: {
          [Op.and]: [            
            { nombre: { [Op.iLike]: iName } },
          ]
        },    
        attributes: ["id","nombre","codigo","telefono"],
         include: [
               { model: Carrera, attributes:['id','nombre'] }

       ]	      
      })
        .then((Estudiantes) =>
          resolve({
            paginas: Math.ceil(Estudiantes.count / 12),
            pagina: page,
            total: Estudiantes.count,
            data: Estudiantes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static reporte(desde, hasta) {    	
    return new Promise((resolve, reject) => {
      Estudiante.findAndCountAll({
        raw: true,
        nest: true,        
        order: [['nombres', 'ASC']],    
        where: {
          [Op.and]: [            
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        },    
        attributes: ["id","nombres","direccion","telefono","email","estado","nit","ci"]        
      })
        .then((Estudiantes) =>
        resolve({          
          total: Estudiantes.count,
          data: Estudiantes.rows,
        })
        )
        .catch((reason) => reject(reason));
    });
  }

  static totales (desde, hasta) {
    return new Promise((resolve, reject) => {
      Estudiante.findAll({
        raw: true,
        nest: true,        
        order: [['nombres', 'ASC']],    
        attributes: ["id","nombres","direccion","telefono","email","estado","nit","ci"],    
        attributes: [[Sequelize.fn('sum', Sequelize.col('saldoTotal')), 'total']],    
        where: {
          [Op.and]: [            
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        }
      })
        .then((Estudiantes) =>
          resolve(Estudiantes)
        )
        .catch((reason) => reject(reason));
    });
  }
}

export default EstudianteService;
