const jwt = require('jsonwebtoken');
require('dotenv').config();

function generarToken(datos){
    // id, roles, nombre
    let payload ={
        "id" : datos._id,
        "nombre" : datos.nombre,
        "roles" : datos.roles
    }
    const token = jwt.sign(payload, process.env.JWT_CLAVE, {expiresIn: process.env.JWT_EXPIRES});
    return token;
}

//Midleware -> capturar la peticion y validar el token.
function validarToken(req, res, next){
    let token = undefined;

    //Cabecera de la peticion
    if (req.headers['authorization']) {
        //Bear token-> separar por espacio y capturar token
        token = req.headers['authorization'].split(" ").pop();
        if (token){
            jwt.verify(token, process.env.JWT_CLAVE,function (error, decoded){
               if (error) {
                   res.status(401).send({"mensaje":"Token Invalido"});
               } 
               else {
                        req.usuario = decoded;
                        next();
               } 
            })
        }
         else {
                res.status(403).send({"mensaje":"No autorizado"});
        }
    } 
    else {
        res.status(401).send({"mensaje":"Sin token"});
    }
}

module.exports.generarToken = generarToken; 
module.exports.validarToken = validarToken; 