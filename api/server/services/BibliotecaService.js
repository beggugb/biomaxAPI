import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Biblioteca } = database;

class BibliotecaService{
    static add(newBiblioteca){        
      return new Promise((resolve, reject) => {                  
         Biblioteca
         .create(newBiblioteca)
          .then(biblioteca => resolve(biblioteca))   
          .catch(reason => reject(reason))      
        })         
    }
    
    static getId(bibliotecaId){        
      return new Promise((resolve, reject) => {                  
         Biblioteca
         .findByPk(bibliotecaId)
          .then(biblioteca => resolve(biblioteca))   
          .catch(reason => reject(reason))      
        })         
    }

    static update(dato,datoId){        
      return new Promise((resolve, reject) => {                  
         Biblioteca
         .update(dato,{
          where: { id: datoId }
         })
          .then(biblioteca => resolve(biblioteca))   
          .catch(reason => reject(reason))      
        })         
    }

}

export default BibliotecaService;