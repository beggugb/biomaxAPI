import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Cutter} = database;

class CutterService{
    static getAll(pag,num){        
        return new Promise((resolve, reject) => {        
            let page = parseInt(pag)
            let der = (num * page) - num;    
           Cutter
           .findAndCountAll({
              raw:true,
              nest:true,
                offset: der,                
                limit: num,    
                order:  [['id', 'ASC'],]
              })
            .then(cutters =>
                resolve({'paginas':(Math.ceil(cutters.count/num)),'pagina':page,'total':cutters.count,'data': cutters.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

    static getList(name){              
        return new Promise((resolve, reject) => {        
          let iName = name+'%'         
          if(name === undefined || name === null || name === '0' || name === 0)    
          { iName = '%' } 
           Cutter
           .findOne({        
              row:true,
              nest:true,
              limit:1,
              order: ['label'],
              where: { label: {[Op.iLike]: iName }},
              attributes:['id',['id','value'],'label','codigo'],
            })
            .then(cutters =>
                resolve(cutters))   
            .catch(reason => reject(reason))
        
          })         
    }
    static add(newCutter){        
      return new Promise((resolve, reject) => {                  
         Cutter
         .create(newCutter)
          .then(cutter => resolve(cutter))   
          .catch(reason => reject(reason))      
        })         
    }
    
    static getId(cutterId){        
      return new Promise((resolve, reject) => {                  
         Cutter
         .findByPk(cutterId)
          .then(cutter => resolve(cutter))   
          .catch(reason => reject(reason))      
        })         
    }

    static del(cutterId){        
      return new Promise((resolve, reject) => {                  
         Cutter
         .destroy({
          where: { id: cutterId }
         })
          .then(cutter => resolve(cutter))   
          .catch(reason => reject(reason))      
        })         
    }

    static update(dato,datoId){        
      return new Promise((resolve, reject) => {                  
         Cutter
         .update(dato,{
          where: { id: datoId }
         })
          .then(cutter => resolve(cutter))   
          .catch(reason => reject(reason))      
        })         
    }

}

export default CutterService;