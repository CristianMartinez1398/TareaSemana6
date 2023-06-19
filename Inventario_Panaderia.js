const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const Configuracion = require('./Configuracion');
const morgan = require('morgan')
const helmet = require('helmet')
const RutasProveedor = require('./Tabla_Proveedor')
const RutasTipoPanes = require('./Tabla_Tipo_Panes')
const RutasMateriaPrima = require('./Tabla_Materia_Prima')
const RutasProducto = require('./routes/Api/Tabla_Producto')
const RutasMateriaHasTablaProducto = require('./Tabla_Materia_Has_Tabla_Producto')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const rutasProducto = require('./routes/Api/Tabla_Producto')
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api para el manejo de Inventario de Panaderia',
      version: '1.0.0',
      description: 'Aplicacion para el manejo de cadenas de Inventario de Panaderia'
    },
    servers: [
      {
        url: 'http://localhost:3001'
      }
    ]
  },
  apis: ['./routes/Api/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)



//este no va en el examen
const cors = require('cors');
var connection = mysql.createConnection({
  host     : Configuracion.host,
  user     : Configuracion.user,
  password : Configuracion.password,
  database : Configuracion.database
});




const myLogger = function (req, res, next) {
    console.log(`Se ha llamado la ruta: ${req.path} - ${new Date().toLocaleDateString()}`)
    next()
}
    

const app = express();

connection.connect();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(myLogger)
app.use(morgan('combined'))
app.use(helmet())
//esto no va en el examen 
app.use(cors());
app.use(rutasProducto)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



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
