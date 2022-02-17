const express = require('express');
const controladorUsuarios = express.Router();
const servicioUsuarios = require('./services');
const rutaProtegida = require('../auth/jwt.js').validarToken;





/* datosUsuario
{
    "nombre": xxxxxx,
    "usuario": xxxxx,
    "password" xxxxx,
    "rol":["A","B",..."n"]
} 
*/
controladorUsuarios.get("/iniciarSesion",  async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.iniciarSesion(datosUsuario);
    res.send(resultado);
});

controladorUsuarios.get("/obtenerUsuarios",  async function (req, res) {
    let usuarios = await servicioUsuarios.obtenerUsuarios();
    res.send({
        "mensaje ": "Listado usuario",
        "data": usuarios
    });
});


controladorUsuarios.post("/crearUsuario", async function(req, res){
    let datosUsuario = req.body;
    let resultado = await servicioUsuarios.crearUser(datosUsuario);
    res.send(resultado);
});

controladorUsuarios.put("/actualizarUsuario/:id", async function(req, res){
    let id = req.params.id;
    let datos = req.body;
    let resultado = await servicioUsuarios.actualizarUsuario(id,datos);
    res.send(resultado);
});

controladorUsuarios.delete("/eliminarUsuario/:id", async function (req, res){
    let id = req.params.id;
    let resultado = await servicioUsuarios.eliminarUsuario(id);
    res.send(resultado);
})  

module.exports = controladorUsuarios;


