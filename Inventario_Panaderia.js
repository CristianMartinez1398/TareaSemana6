const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const Configuracion = require('./Configuracion');
const morgan = require('morgan')
const helmet = require('helmet')
const RutasProveedor = require('./Tabla_Proveedor')
const RutasTipoPanes = require('./Tabla_Tipo_Panes')
const RutasMateriaPrima = require('./Tabla_Materia_Prima')
const RutasProducto = require('./Tabla_Producto')
const RutasMateriaHasTablaProducto = require('./Tabla_Materia_Has_Tabla_Producto')
//este no va en el examen
const cors = require('cors');
var connection = mysql.createConnection({
  host     : Configuracion.host,
  user     : Configuracion.user,
  password : Configuracion.password,
  database : Configuracion.database
});
console.log(Configuracion);

const myLogger = function (req, res, next) {
    console.log(`Se ha llamado la ruta: ${req.path} - ${new Date().toLocaleDateString()}`)
    next()
}
    
var corsOptions = {
    origin: 'hhtp://localhost:5500',
    optionsSuccessStatus: 200

}

const app = express();

connection.connect();

var corsOptions = {
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200 //
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(myLogger)
app.use(morgan('combined'))
app.use(helmet())
//esto no va en el examen 
app.use(cors());

//********************[TABLA TIPO PANES]*****************************
app.use(RutasTipoPanes)
//********************[TABLA Proveedor]******************************
app.use(RutasProveedor)
//********************[TABLA MATERIA PRIMA]**************************
app.use(RutasMateriaPrima)
//********************[TABLA PRODUCTO]*******************************
app.use(RutasProducto)
//********************[TABLA MATERIA HAS TABLA PRODUCTO]*******************************
app.use(RutasMateriaHasTablaProducto)

app.listen(Configuracion.puerto, () =>{
    console.log(`La aplicación se está ejecutando en el puerto ${Configuracion.puerto}`)
    
})

//connection.end();
