const express = require('express')
const rutas = express.Router()
//const{ Connection } = require('mysql');
const Configuracion = require('./Configuracion');
var mysql = require('mysql');
var C = mysql.createConnection({
    host     : Configuracion.host,
    user     : Configuracion.user,
    password : Configuracion.password,
    database : Configuracion.database
});

rutas.get('/api/v1/TablaMateriaHasTablaProducto', (req, res) =>{
    C.query('select Tabla_MateriaPrima_ID, Tabla_producto_ID, Tabla_producto_Tabla_Proveedor_ID, Tabla_producto_Tabla_Tipo_Panes_ID from inventario_panaderia.tabla_materiaprima_has_tabla_producto;', function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
})

rutas.post('/api/v1/TablaMateriaHasTablaProducto', (req, res) =>{
    const {Tabla_MateriaPrima_ID, Tabla_producto_ID, Tabla_producto_Tabla_Proveedor_ID, Tabla_producto_Tabla_Tipo_Panes_ID} = req.body;
    let respuestaErrorCliente = [];

    if (!Tabla_MateriaPrima_ID) {
        respuestaErrorCliente.push("La tabla de materia prima no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tabla_producto_ID) {
        respuestaErrorCliente.push("La tabla de producto no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tabla_producto_Tabla_Proveedor_ID) {
        respuestaErrorCliente.push("La tabla producto y la tabla proveedor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tabla_producto_Tabla_Tipo_Panes_ID) {
        respuestaErrorCliente.push("La tabla de producto y la tabla de tipos panes no puede estar vacia ingrese el dato por favor.")
    }
   
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    //res.status(200).json(id)
    C.query(' insert into inventario_panaderia.tabla_materiaprima_has_tabla_producto(Tabla_MateriaPrima_ID, Tabla_producto_ID, Tabla_producto_Tabla_Proveedor_ID, Tabla_producto_Tabla_Tipo_Panes_ID) values(?, ?, ?, ?);',[Tabla_MateriaPrima_ID, Tabla_producto_ID, Tabla_producto_Tabla_Proveedor_ID, Tabla_producto_Tabla_Tipo_Panes_ID], function(err, rows, fields) {
        //if (err) throw err;
        if (err) {
            console.log(err);
            let respuestaError ={}
            if (err.code === 'ER_BAD_NULL_ERROR') {
                respuestaError = {codigo: 500, mensaje: "Los campos que ingresar no pueden ser nulos"}
                return;
            }
            res.status(500).json(err)
        }else{
            res.status(200).json(rows)
        }
        
        
    });
})

rutas.delete('/api/v1/TablaMateriaHasTablaProducto/:Tabla_MateriaPrima_ID', (req, res) =>{
    const {Tabla_MateriaPrima_ID} = req.params;
    //Consultar si el id existe

    //Si existe borrarlo 
    C.query(' delete from inventario_panaderia.tabla_materiaprima_has_tabla_producto where Tabla_MateriaPrima_ID = ?;' ,[Tabla_MateriaPrima_ID], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
    //Si no existe, retornar
})





module.exports = rutas