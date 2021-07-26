import database from "../src/models";

const { Carrera } = database;

class CarreraService {
    
  static getAll(pag,num,prop,orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Carrera.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop, orden]]                 
       })
         .then((Carreras) =>
           resolve({
             paginas: Math.ceil(Carreras.count / num),
             pagina: page,
             total: Carreras.count,
             data: Carreras.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
  
   static add(newCarrera) {    
    return new Promise((resolve, reject) => {
        if(newCarrera.nombre)
        {            
            Carrera.create(newCarrera)
            .then((Carrera) => {                
                resolve({ message: "Carrera registrado", Carrera:Carrera })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Carrera: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Carrera: null })
        }        
   });
  } 

  static listas() {  
    return new Promise((resolve, reject) => {
       Carrera.findAll({
        attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
       })
         .then((Carreras) =>
           resolve(Carreras)
         )
         .catch((reason) => reject(reason));
     });
   }

   static getId(CarreraId) {
        return new Promise((resolve, reject) => {
            Carrera
                .findByPk(CarreraId)
                .then(Carrera => resolve(Carrera))
                .catch(reason => reject(reason))
        })
    }

    static del(CarreraId) {
        return new Promise((resolve, reject) => {
            Carrera
                .destroy({
                    where: { id: CarreraId }
                })
                .then(Carrera => resolve(Carrera))
                .catch(reason => reject(reason))
        })
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            Carrera
                .update(dato, {
                    where: { id: datoId }
                })
                .then(Carrera => resolve(Carrera))
                .catch(reason => reject(reason))
        })
    }
	 

  
}

export default CarreraService;

