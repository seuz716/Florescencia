/* Importacion de los modulos requeridos*/

const express = require('express');
const controladorFlorescencia = require('./api/florescencia/controller.js');
const controladorUsuarios = require('./api/usuarios/controller');
const  bodyParser  = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const conexion  = require ('./database/connection');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

/*iniciar configuracion*/

const app = express();
const port = process.env.API_PORT;
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan(process.env.MORGAN_MODE));
 
/*Iniciar las rutas*/

app.use("/api/florescencia", controladorFlorescencia);
app.use("/api/usuarios", controladorUsuarios);


/* Configurar la carpreta publica*/
//FlorescenciaApi/public = _dirname
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+'index.html'));
    
})

/* Configurar puerto que va  monitorear la api*/

conexion.conectar()
    .then(function() {
        app.listen(port, function () {
            console.log("API ejecutandose exitosamente en el puerto: " + port); 
    });
   
   })
   .catch(function (error) {
    console.log(error);
});