import database from "../src/models";
import jwt from "jsonwebtoken";


const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario, Sucursal, Rol } = database;

class UsuarioService {

    static validarUsuario(newUsuario) {    
        if(newUsuario.nombre){
            if(newUsuario.username){
                if(newUsuario.rolId){                
                      return true                
              }
            }
        }
        else {
            return false
        }
        
    }
  
   static add(newUsuario) {    
    return new Promise((resolve, reject) => {
        if(this.validarUsuario(newUsuario))
        {            
            Usuario.create(newUsuario)
            .then((usuario) => {
                let payload = {usuario_id: usuario.id, username: usuario.username }
                let token = jwt.sign(payload,"sgFitt2021",{
                    expiresIn: "2629746000"
                });
                resolve({ auth: true, message: "Usuario registrado", Usuario: usuario, token: token })
            })
            .catch((reason) => {                
                reject({ auth: false, message: reason, Usuario: null, token: null })
              });
            
        }else{                
                reject({ auth: false, message: "Datos faltantes", Usuario: null, token: null })
        }        
   });
  } 

  static login(username, password) {        
    return new Promise((resolve, reject) => {
      Usuario.findOne({
        where: { username: { [Op.eq]: username } }                
      }).then((user) => {
        if (!user) {          
          resolve({
            success: false,
            message: "Authentication fallida . Usuario no existe.",
            usuario: null,
          });
        } else {   
          user.comparePassword(password, (err, isMatch) => {            
            if (isMatch && !err) {
              let payload = { user_id: user.id, username: user.username };
              let token = jwt.sign(payload, "sgFitt2021", {
                expiresIn: "2629746000",
              });
              resolve({
                auth: true,
                message: "Acceso correcto",
                usuario: user,
                token: token,
              });              
            } else {
              resolve({
                success: false,
                message: "Autenticación fallida. contraseña incorrecta.",
                usuario: null,
              });              
            }
          });
        }
      });
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Usuario.findByPk(datoId)
        .then((usuario) => resolve(usuario))
        .catch((reason) => reject(reason));
    });
  }

  static update(dato, datoId) {
    const userNew = dato
    userNew.password =  bcrypt.hashSync(dato.password, bcrypt.genSaltSync(10), null);  
    return new Promise((resolve, reject) => {
      Usuario.update(userNew, { where: { id: Number(datoId) } })
        .then((usuario) => resolve(usuario))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Usuario.destroy({ where: { id: Number(datoId) } })
        .then((Usuario) => resolve(Usuario))
        .catch((reason) => reject(reason));
    });
  }
  
  static getAll(pag,num,prop,orden) {  
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Usuario.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],	      
        include: [
          { model: Rol, attributes: ["id", "nombre"]}
        ]     

      })
        .then((Usuarios) =>
          resolve({
            paginas: Math.ceil(Usuarios.count / num),
            pagina: page,
            total: Usuarios.count,
            data: Usuarios.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static search(pag,num,prop,orden,name) {    	
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;      
      let iName = '%' + name + '%'
      if (name === '--todos--' || name === null || name === '0') { iName = '%' }
      

      Usuario.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],    
        where: {
          [Op.and]: [            
            { name: { [Op.iLike]: iName } }            
          ]
        }
      })
        .then((Usuarios) =>
          resolve({
            paginas: Math.ceil(Usuarios.count / num),
            pagina: page,
            total: Usuarios.count,
            data: Usuarios.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

    static listas() {
    return new Promise((resolve, reject) => {
       Usuario.findAll({
        attributes: [["id","value"],["nombre","label"]],
        order: [['nombre','ASC']]
       })
         .then((usuarios) =>
           resolve(usuarios)
         )
         .catch((reason) => reject(reason));
     });
   }
	

  
}

export default UsuarioService;
