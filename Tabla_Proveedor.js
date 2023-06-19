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


rutas.get('/api/v1/TablaProveedores', (req, res) =>{
    C.query('select ID, Nombre_Proveedor, Tipo_Producto, Telefono, Fotografia from inventario_panaderia.tabla_proveedor', function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
})

rutas.get('/api/v1/TablaProveedores/:id', (req, res) =>{
    const {id} = req.params;

    C.query('select ID, Nombre_Proveedor, Tipo_Producto, Precio from inventario_panaderia.tabla_proveedor',[id], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows[0])
        //console.log('The solution is: ', rows[0].solution);
    });
})

//Crea un tipo de panes
rutas.post('/api/v1/TablaProveedores', (req, res) =>{
    const {ID,Nombre_Proveedor,Fecha_Entrega,Tipo_Producto,Telefono, Fotografia} = req.body;
    let respuestaErrorCliente = [];

    if (!ID) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Nombre_Proveedor) {
        respuestaErrorCliente.push("El nombre proveedor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Fecha_Entrega) {
        respuestaErrorCliente.push("La hora y fecha no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Producto) {
        respuestaErrorCliente.push("El tipo de producto no puede estar vacia ingrese el dato por favor.")
    }
    if (!Telefono) {
        respuestaErrorCliente.push("El telefono no puede estar vacia ingrese el dato por favor.")
    }
    if (!Fotografia) {
        respuestaErrorCliente.push("La fotografia no puede estar vacia ingrese el dato por favor.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    //res.status(200).json(id)
    C.query('insert into inventario_panaderia.tabla_proveedor(ID,Nombre_Proveedor, Fecha_Entrega, Tipo_Producto, Telefono, Fotografia) values(?,?, ?, ?, ?, ?);',[ID,Nombre_Proveedor,Fecha_Entrega,Tipo_Producto,Telefono, Fotografia], function(err, rows, fields) {
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
//Elimina la base de datos
rutas.delete('/api/v1/TablaProveedores/:id', (req, res) =>{
    const {id} = req.params;
    //Consultar si el id existe

    //Si existe borrarlo 
    C.query('delete from inventario_panaderia.tabla_proveedor where id = ?;' ,[id], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
    //Si no existe, retornar
})

//Actualiza la base de datos
rutas.put('/api/v1/TablaProveedores/:id', (req, res) =>{
    const {id} = req.params;
    const {Nombre_Proveedor,Tipo_Producto,Precio} = req.body;
    let respuestaErrorCliente = [];

    if (!id) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Nombre_Proveedor) {
        respuestaErrorCliente.push("El nombre proveedor no puede estar vacia ingrese el dato por favor.")
    }
    
    if (!Tipo_Producto) {
        respuestaErrorCliente.push("El tipo de producto no puede estar vacia ingrese el dato por favor.")
    }
    if (Precio <= 0) {
        respuestaErrorCliente.push("El precio tiene que ser mayor que 0.")
    }
    if (!Precio) {
        respuestaErrorCliente.push("El precio no puede estar vacia ingrese el dato por favor.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    if (Nombre_Proveedor == null) {
        res.status(400).json({mensaje: "El nombre del proveedor no tiene que estar vacio."})
        return;
    }
    C.query('update inventario_panaderia.tabla_proveedor set Nombre_Proveedor = ?, Tipo_Producto=?, Precio=? where id = ?',[Nombre_Proveedor,Tipo_Producto,Precio,id], function(err, rows, fields) {
        if (err) {
            console.log(err);
            let respuestaError ={}
            if (err.code === 'ER_BAD_NULL_ERROR') {
                respuestaError = {codigo: 500, mensaje: "Los campos que ingresar no pueden ser nulos"}
                return;
            }
            res.status(500).json(respuestaError)
        }else{
            res.status(200).json(rows)
        }
    });
})

module.exports = rutas