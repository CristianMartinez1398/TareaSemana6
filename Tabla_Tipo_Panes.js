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

rutas.get('/api/v1/TablaTipoPanes', (req, res) =>{
    C.query('SELECT ID, Tipo_Pan, Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque FROM inventario_panaderia.tabla_tipo_panes;', function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);

    });
})

rutas.post('/api/v1/TablaTipoPanes', (req, res) =>{
    const {ID, Tipo_Pan, Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque} = req.body;
    let respuestaErrorCliente = [];

    if (!ID) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Pan) {
        respuestaErrorCliente.push("El tipo de pan no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Sabor) {
        respuestaErrorCliente.push("El tipo de sabor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Cantidad) {
        respuestaErrorCliente.push("La cantidad disponible no puede estar vacia ingrese el dato por favor.")
    }
    if (!Fecha_Vencimiento) {
        respuestaErrorCliente.push("La fecha de vencimiento no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Empaque) {
        respuestaErrorCliente.push("El tipo de empaque no puede estar vacia ingrese el dato por favor.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    //res.status(200).json(id)
    C.query('insert into inventario_panaderia.tabla_tipo_panes(ID, Tipo_Pan, Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque) value (?, ?, ?, ?, ?, ?);',[ID, Tipo_Pan, Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque], function(err, rows, fields) {
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
rutas.put('/api/v1/TablaTipoPanes/:ID', (req, res) =>{
    const {ID} = req.params;
    const {Tipo_Pan, Tipo_Sabor, Cantidad, Tipo_Empaque} = req.body;
    let respuestaErrorCliente = [];

    if (!ID) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Pan) {
        respuestaErrorCliente.push("El tipo de pan no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Sabor) {
        respuestaErrorCliente.push("El tipo de sabor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Cantidad) {
        respuestaErrorCliente.push("La cantidad disponible no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Empaque) {
        respuestaErrorCliente.push("El tipo de empaque no puede estar vacia ingrese el dato por favor.")
    }
    
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    if (Tipo_Pan == null) {
        res.status(400).json({mensaje: "El Tipo de pan no tiene que estar vacio."})
        return;
    }
    C.query('update inventario_panaderia.tabla_tipo_panes set Tipo_Pan = ?, Tipo_Sabor = ?, Cantidad = ?, Tipo_Empaque = ? where ID = ?;',[Tipo_Pan, Tipo_Sabor, Cantidad, Tipo_Empaque, ID], function(err, rows, fields) {
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
rutas.delete('/api/v1/TablaTipoPanes/:ID', (req, res) =>{
    const {ID} = req.params;
    //Consultar si el id existe

    //Si existe borrarlo 
    C.query('delete from inventario_panaderia.tabla_tipo_panes where ID = ?;' ,[ID], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
    //Si no existe, retornar
})
module.exports = rutas