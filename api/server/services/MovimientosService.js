import database from "../src/models";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const { Usuario, Movimiento, Libro, Estudiante } = database;

class MovimientosService {
  
  static todu(dato, datoId) {	   
    return new Promise((resolve, reject) => {
    var dd = dato.createdAt ? new Date(dato.createdAt) : new Date('2020-01-01 03:24:55.528-04')
    var reg = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]	    
      Movimiento.update({fechaPrestamo : reg}, { where: { id: Number(datoId) } })
        .then((membresia) => resolve(membresia))
        .catch((reason) => reject(reason));
    });
  }

   static getAllAlumnos(pag,num,alumnoId) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Movimiento.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
	where: { estudianteId: Number(alumnoId) },      
        order: [['id', 'DESC']],
	attributes:['id','fechaPrestamo','estado','fechaDevolucion'],      
      })
        .then((membresias) =>
          resolve({
            paginas: Math.ceil(membresias.count / num),
            pagina: page,
            total: membresias.count,
            data: membresias.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }		

  static getAll(pag,num,prop,orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Movimiento.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop, orden]],
         attributes: ["id", "fechaPrestamo","fechaPrevista","fechaDevolucion","estado","createdAt"],
                  include: [{ model: Estudiante, attributes: ["id", "nombre"]} ]

       })
         .then((Movimientoss) =>
           resolve({
             paginas: Math.ceil(Movimientoss.count / num),
             pagina: page,
             total: Movimientoss.count,
             data: Movimientoss.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }

   static getAllDevoluciones(pag,num,prop,orden) {
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Movimiento.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
	 where: { tipo: "devolucion" },      
         order: [[prop, orden]],
         attributes: ["id", "fechaPrestamo","fechaPrevista","fechaDevolucion","estado","createdAt"],
                  include: [{ model: Estudiante, attributes: ["id", "nombre"]} ]

       })
         .then((Movimientoss) =>
           resolve({
             paginas: Math.ceil(Movimientoss.count / num),
             pagina: page,
             total: Movimientoss.count,
             data: Movimientoss.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }	
  
   static add(newMovimientos) {    
    return new Promise((resolve, reject) => {
            Movimiento.create(newMovimientos,{raw: true,nest: true })
            .then((result) => {                
                resolve({ Movimiento: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Movimientos: null })
              });
            
   });
  } 

  static listas() {  
    return new Promise((resolve, reject) => {
       Movimiento.findAll({
        attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
       })
         .then((Movimientoss) =>
           resolve(Movimientoss)
         )
         .catch((reason) => reject(reason));
     });
   }

   static getId(MovimientosId) {
        return new Promise((resolve, reject) => {
            Movimiento
                .findByPk(MovimientosId,{
		  attributes: ["id", "fechaPrestamo","fechaPrevista","fechaDevolucion","estado","createdAt"],	
		  include: [{ model: Estudiante, attributes: ["id", "nombre"]} ]	
		})
                .then(Movimientos => resolve(Movimientos))
                .catch(reason => reject(reason))
        })
    }

    static del(MovimientosId) {
        return new Promise((resolve, reject) => {
            Movimiento
                .destroy({
                    where: { id: MovimientosId }
                })
                .then(Movimientos => resolve(Movimientos))
                .catch(reason => reject(reason))
        })
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            Movimiento
                .update(dato, {
                    where: { id: datoId }
                })
                .then(Movimientos => resolve(Movimientos))
                .catch(reason => reject(reason))
        })
    }
   
    static total(desde,hasta,tp) {    
    return new Promise((resolve, reject) => {        
        Movimiento.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('count', Sequelize.col('usuarioId')), 'total']],            
           where: {
                 [Op.and]: [
                   { fechaPrestamo: { [Op.between]: [desde, hasta]}},
	           { tipo: tp}		 
                  ]
          }, 		
	   
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

  static totalDetalle(desde,hasta,tp) {
    return new Promise((resolve, reject) => {       
       Movimiento.findAndCountAll({
         raw: true,
         nest: true,         
         /*where :  { ivigencia: {[Op.between]: [desde, hasta]}},   */
	 where: {
          [Op.and]: [
            { fechaPrestamo: { [Op.between]: [desde, hasta]}},
            { tipo: tp}		  
          ]
         },      
         order: [['createdAt', 'DESC']],
	 attributes: ["id", "fechaPrestamo","fechaDevolucion","tipo","estado"],      
         include: [
             { model: Estudiante, attributes: ["id", "nombre"]},
	     { model: Usuario, attributes: ["id", "nombres"]}
  		 
         ]      
       })
         .then((membresias) =>
           resolve({             
             total: membresias.count,
             data: membresias.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }		
	 

  
}

export default MovimientosService;
