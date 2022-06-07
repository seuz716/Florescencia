// Importar modulos
const mongloClient = require ('mongodb').MongoClient;
require('dotenv').config();

let conexion;

const conectar = function (resolve, reject){
    return new Promise(function(resolve, reject){
        if (conexion) {
            resolve();
        } 
        else {
            mongloClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
            .then(function (client) {
                conexion = client.db(process.env.MONGODB_DB);
                console.log('base de datos conectada')
                
                resolve();
            })
            .catch(function (error){
                reject(error);
            });
        }

    });
}
const obtenerConexion = function () {
    
    return conexion;

}



module.exports = {conectar, obtenerConexion}