import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Facultad} = database;

class FacultadService{
    static getAll(pag,num){        
        return new Promise((resolve, reject) => {        
            let page = parseInt(pag)
            let der = (num * page) - num;    
           Facultad
           .findAndCountAll({
              raw:true,
              nest:true,
                offset: der,                
                limit: num,    
                order:  [['nombre', 'ASC'],]
              })
            .then(facultades =>
                resolve({'paginas':(Math.ceil(facultades.count/num)),'pagina':page,'total':facultades.count,'data': facultades.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

    static getList(name){        
        return new Promise((resolve, reject) => {        
          let iName = '%'+name+'%'         
          if(name === undefined || name === 0 || name === '0')    
          { iName = '%' } 
           Facultad
           .findAll({        
              row:true,
              nest:true,
              limit:10,
              order: ['nombre'],
              where: { nombre: {[Op.iLike]: iName }},
              attributes:['id',['id','value'],['nombre','label']],
            })
            .then(facultades =>
                resolve(facultades))   
            .catch(reason => reject(reason))
        
          })         
    }
    static add(newFacultad){        
      return new Promise((resolve, reject) => {                  
         Facultad
         .create(newFacultad)
          .then(facultad => resolve(facultad))   
          .catch(reason => reject(reason))      
        })         
    }
    
    static getId(facultadId){        
      return new Promise((resolve, reject) => {                  
         Facultad
         .findByPk(facultadId)
          .then(facultad => resolve(facultad))   
          .catch(reason => reject(reason))      
        })         
    }

    static del(facultadId){        
      return new Promise((resolve, reject) => {                  
         Facultad
         .destroy({
          where: { id: facultadId }
         })
          .then(facultad => resolve(facultad))   
          .catch(reason => reject(reason))      
        })         
    }

    static update(dato,datoId){        
      return new Promise((resolve, reject) => {                  
         Facultad
         .update(dato,{
          where: { id: datoId }
         })
          .then(facultad => resolve(facultad))   
          .catch(reason => reject(reason))      
        })         
    }

}

export default FacultadService;