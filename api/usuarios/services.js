const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const modeloUsuarios = require('./model');

async function crearUser (datosUsuario){
     let resultado = {};
    /*1. objeto vacio*
      *2  existan  las llaves usuario y  clave
    */
    if (datosUsuario  && Object.keys(datosUsuario).length>0){
        if (datosUsuario.usuario && datosUsuario.clave){
            let claveEncriptada = bcrypt.hashSync(datosUsuario.clave, parseInt(process.env.ENC_SALTROUNDS));
            datosUsuario.clave = claveEncriptada;
            let resultadoCrear = await modeloUsuarios.crearUno(datosUsuario);
            if (resultadoCrear && resultadoCrear.acknowledged){
                resultado.mensaje = "Usuario creado correctamente";
                resultado.datos = resultadoCrear;
                
            } else {
                resultado.mensaje = "Usuario  no creado";
                resultado.datos = datosUsuario;
            }
        }
         else {
               resultado.mensaje = "Usuario y clave deben existir";
               resultado.datos = datosUsuario;
        }
    }
     else {
           resultado.mensaje = "No hay datos";
           resultado.datos = datosUsuario;
    }
    return resultado;
};

async function iniciarSesion(datosUsuario){
    let resultado ={};
    if (datosUsuario && Object.keys(datosUsuario).length>0 && datosUsuario.usuario && datosUsuario.clave){
            let usuario = await modeloUsuarios.buscarUsuario(datosUsuario.usuario);
            if (usuario){
                let claveEncriptada = usuario.clave;
                let esValida = bcrypt.compareSync(datosUsuario.clave, claveEncriptada);
                if (esValida){
                    resultado.mensaje = "Inicio de sesión correcto";
                    resultado.datos = usuario; 
                } 
                else {
                    resultado.mensaje = "Usuario o Clave incorrectos";
                    resultado.datos = datosUsuario;
                }
            } 
            else {
                    resultado.mensaje = "Usuario o Clave incorrectos";
                    resultado.datos = datosUsuario;
            }
    } 
    else {
             resultado.mensaje = "Datos Incorecctos";
             resultado.datos = datosUsuario; 
    }
    return resultado;
}


module.exports.crearUser = crearUser;
module.exports.iniciarSesion = iniciarSesion;
