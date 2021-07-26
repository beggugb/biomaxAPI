import database from "../src/models";

const { Editorial } = database;

class EditorialService {
    
  static getAll(pag,num,prop,orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Editorial.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop, orden]]                 
       })
         .then((Editorials) =>
           resolve({
             paginas: Math.ceil(Editorials.count / num),
             pagina: page,
             total: Editorials.count,
             data: Editorials.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
  
   static add(newEditorial) {    
    return new Promise((resolve, reject) => {
        if(newEditorial.nombre)
        {            
            Editorial.create(newEditorial)
            .then((Editorial) => {                
                resolve({ message: "Editorial registrado", Editorial:Editorial })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Editorial: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Editorial: null })
        }        
   });
  } 

  static listas() {  
    return new Promise((resolve, reject) => {
       Editorial.findAll({
        attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
       })
         .then((Editorials) =>
           resolve(Editorials)
         )
         .catch((reason) => reject(reason));
     });
   }

   static getId(EditorialId) {
        return new Promise((resolve, reject) => {
            Editorial
                .findByPk(EditorialId)
                .then(Editorial => resolve(Editorial))
                .catch(reason => reject(reason))
        })
    }

    static del(EditorialId) {
        return new Promise((resolve, reject) => {
            Editorial
                .destroy({
                    where: { id: EditorialId }
                })
                .then(Editorial => resolve(Editorial))
                .catch(reason => reject(reason))
        })
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            Editorial
                .update(dato, {
                    where: { id: datoId }
                })
                .then(Editorial => resolve(Editorial))
                .catch(reason => reject(reason))
        })
    }
	 

  
}

export default EditorialService;

