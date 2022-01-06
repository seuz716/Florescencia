const express = require('express');
const controladorUsuarios = express.Router();
const servicioUsuarios = require('./services');





/* datosUsuario
{
    "nombre": xxxxxx,
    "usuario": xxxxx,
    "password" xxxxx,
    "rol":["A","B",..."n"]
} 
*/
controladorUsuarios.get("/iniciarSesion", async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.iniciarSesion(datosUsuario);
    res.send(resultado);
});



controladorUsuarios.post("/crearUsuario", async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.crearUser(datosUsuario);
    res.send(resultado);
});

module.exports = controladorUsuarios;


