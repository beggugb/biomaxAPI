import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Libro, Carrera, Editorial, Dewey, Cutter   } = database;

class LibroService{
    static getAll(pag,num){        
        return new Promise((resolve, reject) => {        
            let page = parseInt(pag)
            let der = (num * page) - num;    
           Libro
           .findAndCountAll({
              raw:true,
              nest:true,
                offset: der,                
                limit: num,    
                order:  [['titulo', 'ASC'],],
                attributes:['id','codigo','titulo','autor','dewey','cutter'],
                include: [{ model: Carrera, attributes:['id','nombre'] }],   
              })
            .then(carreras =>
                resolve({'paginas':(Math.ceil(carreras.count/num)),'pagina':page,'total':carreras.count,'data': carreras.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

    static getList(name){        
        return new Promise((resolve, reject) => {        
          let iName = '%'+name+'%'         
          if(name === undefined || name === null || name === '')    
          { iName = '%' } 
           Libro
           .findAll({        
              row:true,
              nest:true,
              limit:10,
              order: ['nombre'],
              where: { nombre: {[Op.iLike]: iName }}
            })
            .then(carreras =>
                resolve(carreras))   
            .catch(reason => reject(reason))
        
          })         
    }
    static add(newLibro){        
      return new Promise((resolve, reject) => {                  
         Libro
         .create(newLibro)
          .then(carrera => resolve(carrera))   
          .catch(reason => reject(reason))      
        })         
    }
    
    static getId(libroId){        
      return new Promise((resolve, reject) => {                  
         Libro
         .findByPk(libroId,{           
           include: [
           { model: Carrera, attributes:['id','nombre'] },
           { model: Editorial, attributes:['id','nombre'] },
           { model: Cutter, attributes:['id','codigo'] },
           { model: Dewey, attributes:['id','codigo','label'] }
           ],
           })
          .then(carrera => resolve(carrera))   
          .catch(reason => reject(reason))      
        })         
    }

    static del(libroId){        
      return new Promise((resolve, reject) => {                  
         Libro
         .destroy({
          where: { id: libroId }
         })
          .then(libro => resolve(libro))   
          .catch(reason => reject(reason))      
        })         
    }

    static update(dato,datoId){        
      return new Promise((resolve, reject) => {                  
         Libro
         .update(dato,{
          where: { id: datoId }
         })
          .then(libro => resolve(libro))   
          .catch(reason => reject(reason))      
        })         
    }

    static consulta(titulo){
      return new Promise((resolve, reject) => {
        let page = 1
        let der = 10 * page - 10;

        let iTitulo = '%' + titulo + '%'
        if (titulo === '--todos--' || titulo === null || titulo === '0') { iTitulo = '' }

        console.log(iTitulo)
           Libro
           .findAndCountAll({
              raw:true,
              nest:true,
              offset: der,
              limit: 10,
              where : { [Op.and]: [
                      { tags: {[Op.iLike]: iTitulo }}
              ]},
              attributes:['id','codigo','titulo','autor','filename','dewey','cutter','observaciones','tags','anio','pais'],
              order:  [['titulo', 'ASC'],],
              include: [
		      { model: Carrera, attributes:['id','nombre'] },
		      { model: Editorial, attributes:['id','nombre'] }
	      ],
              })
            .then(libros =>
                resolve({'paginas':(Math.ceil(libros.count/12)),'pagina':page,'total':libros.count,'data': libros.rows }))
            .catch(reason => reject(reason))

          })
    }
	

    static search(titulo){        
      return new Promise((resolve, reject) => {        
        let page = 1
        let der = 12 * page - 12;    

	let iTitulo = '%' + titulo + '%'
        if (titulo === '--todos--' || titulo === null || titulo === '0') { iTitulo = '%' }

	console.log(iTitulo)      
           Libro
           .findAndCountAll({
              raw:true,
              nest:true,
              offset: der,                
              limit: 12,    
              where : { [Op.and]: [
                      { titulo: {[Op.iLike]: iTitulo }}
              ]},
              attributes:['id','codigo','titulo','autor','dewey','cutter'],
              order:  [['titulo', 'ASC'],],              
              include: [{ model: Carrera, attributes:['id','nombre'] }],   
              })
            .then(libros =>
                resolve({'paginas':(Math.ceil(libros.count/12)),'pagina':page,'total':libros.count,'data': libros.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

    static searchu(titulo){
      return new Promise((resolve, reject) => {
        let page = 1
        let der = 10 * page - 10;

        let iTitulo = '%' + titulo + '%'
        if (titulo === '--todos--' || titulo === null || titulo === '0' || titulo === undefined || titulo === '' ) { iTitulo = '0' }

        console.log(iTitulo)
           Libro
           .findAndCountAll({
              raw:true,
              nest:true,
              offset: der,
              limit: 10,
              where : { [Op.and]: [
                      { titulo: {[Op.iLike]: iTitulo }}
              ]},
              attributes:['id','codigo','titulo','autor','dewey','cutter'],
              order:  [['titulo', 'ASC'],],
              include: [{ model: Carrera, attributes:['id','nombre'] }],
              })
            .then(libros =>
                resolve({'paginas':(Math.ceil(libros.count/10)),'pagina':page,'total':libros.count,'data': libros.rows }))
            .catch(reason => reject(reason))

          })
    }
	

    static consultas(pag,num,dato){                    
      return new Promise((resolve, reject) => {        
        let page = parseInt(pag)
        let der = (num * page) - num;    
           Libro
           .findAndCountAll({
              raw:true,
              nest:true,
              offset: der,                
              limit: num,    
               where : { [Op.and]: [
                      { tags: {[Op.iLike]: dato }},                      
              ]},          
              attributes:['id','titulo','autor','filename','observaciones','tags','dewey','cutter','edicion','anio'],
              order:  [['titulo', 'ASC'],],              
              include: [{ model: Carrera, attributes:['id','nombre'] }],   
              })
            .then(libros =>
                resolve({'paginas':(Math.ceil(libros.count/num)),'pagina':page,'total':libros.count,'data': libros.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

   static reporte(carreraId, editorialId, tipo) {    	
    return new Promise((resolve, reject) => {
      console.log(carreraId) 
      console.log(editorialId)
      console.log(tipo)  
      let iCarrera = parseInt(carreraId)
      let fCarrera = parseInt(carreraId)
      if (carreraId === '--todos--' || carreraId === null || carreraId === 0 || carreraId === '0' || carreraId === undefined ) { fCarrera = 50 }	    

      let iEditorial = parseInt(editorialId)
      let fEditorial = parseInt(editorialId)
      if (editorialId === '--todos--' || editorialId === null || editorialId === 0 || editorialId === '0' || editorialId === undefined ) { fEditorial = 50 }	    
     	
      let iTipo = '%' + tipo + '%'
      if (tipo === '--todos--' || tipo === null || tipo === '0' || tipo === undefined ) { iTipo = '%' }	    
	    
      Libro.findAndCountAll({
        raw: true,
        nest: true,        
	limit: 200,      
        order: [['nombres', 'ASC']],    
        where: {
          [Op.and]: [            
            { carreraId: {[Op.between]: [iCarrera, fCarrera]}},
            { editorialId: {[Op.between]: [iEditorial, fEditorial]}},
            { tipo: {[Op.iLike]: iTipo}}		  

          ]       		  
        }, 
       attributes:['id','titulo','carreraId','autor','tipo','edicion','anio'],
       order:  [['titulo', 'ASC'],],
       include: [
	       { model: Carrera, attributes:['id','nombre'] },
	       { model: Editorial, attributes:['id','nombre'] }

       ]		  
      })
        .then((libros) =>
        resolve({          
          total: libros.count,
          data: libros.rows,
        })
        )
        .catch((reason) => reject(reason));
    });
  }	

    static totals() {    
    return new Promise((resolve, reject) => {        
        Libro.findAll({ 
          raw: true,
          nest: true,
          include: [{ model: Carrera, attributes: ["nombre"]}],
          attributes: ['carreraId',[Sequelize.fn('count', Sequelize.col('carreraId')), 'cantidad']],                      
          group: ['carreraId','Carrera.nombre'],
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

   static total() {    
    return new Promise((resolve, reject) => {        
        Libro.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']]           
	   
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }	

}

export default LibroService;
