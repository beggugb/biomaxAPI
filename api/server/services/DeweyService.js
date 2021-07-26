import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Dewey} = database;

class DeweyService{
    static getAll(pag,num){        
        return new Promise((resolve, reject) => {        
            let page = parseInt(pag)
            let der = (num * page) - num;    
           Dewey
           .findAndCountAll({
              raw:true,
              nest:true,
                offset: der,                
                limit: num,    
                order:  [['id', 'ASC'],]
              })
            .then(deweys =>
                resolve({'paginas':(Math.ceil(deweys.count/num)),'pagina':page,'total':deweys.count,'data': deweys.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

    static getList(name){        
      console.log(name)
        return new Promise((resolve, reject) => {        
          let iName = '%'+name+'%'         
          if(name === undefined || name === null || name === '')    
          { iName = '%' } 
           Dewey
           .findAll({        
              row:true,
              nest:true,              
              order: ['label'],
              where: { grupo: {[Op.iLike]: iName }},
              attributes:['id',['id','value'],'label','codigo'],
            })
            .then(deweys =>
                resolve(deweys))   
            .catch(reason => reject(reason))
        
          })         
    }
    static add(newDewey){        
      return new Promise((resolve, reject) => {                  
         Dewey
         .create(newDewey)
          .then(dewey => resolve(dewey))   
          .catch(reason => reject(reason))      
        })         
    }
    
    static getId(deweyId){        
      return new Promise((resolve, reject) => {                  
         Dewey
         .findByPk(deweyId)
          .then(dewey => resolve(dewey))   
          .catch(reason => reject(reason))      
        })         
    }

    static del(deweyId){        
      return new Promise((resolve, reject) => {                  
         Dewey
         .destroy({
          where: { id: deweyId }
         })
          .then(dewey => resolve(dewey))   
          .catch(reason => reject(reason))      
        })         
    }

    static update(dato,datoId){        
      return new Promise((resolve, reject) => {                  
         Dewey
         .update(dato,{
          where: { id: datoId }
         })
          .then(dewey => resolve(dewey))   
          .catch(reason => reject(reason))      
        })         
    }

}

export default DeweyService;