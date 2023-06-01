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



rutas.get('/api/v1/tablatipopanes', (req, res) =>{
    C.query('select * from inventario_panaderia.tabla_tipo_panes', function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
})
rutas.get('/api/v1/tablatipopanes/:id', (req, res) =>{
    const {id} = req.params;
    //res.status(200).json(id)
    C.query('select * from inventario_panaderia.tabla_tipo_panes where id = ?',[id], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        
    });
})
rutas.post('/api/v1/tablatipopanes', (req, res) => {
    const {ID, Tipo_Pan,Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque} = req.body;
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
        respuestaErrorCliente.push("la cantidad no puede estar vacia ingrese el dato por favor.")
    }
    if (!Fecha_Vencimiento) {
        respuestaErrorCliente.push("La fecha y hora no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Empaque) {
        respuestaErrorCliente.push("El tipo de empaque no puede estar vacia ingrese el dato por favor.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
    }
    C.query('insert into inventario_panaderia.tabla_tipo_panes(ID, Tipo_Pan,Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque) values(?, ?, ?, ?, ?, ?)', [ID, Tipo_Pan,Tipo_Sabor, Cantidad, Fecha_Vencimiento, Tipo_Empaque], function(err, row, fields){
        if (err) {
            console.log(err);
            let respuestaError ={}
            if (err.code === 'ER_BAD_NULL_ERROR') {
                respuestaError = {codigo: 500, mensaje: "Los campos que ingresar no pueden ser nulos"}
            }
            res.status(500).json(respuestaError)
        }else{
            res.status(200).json(rows)
        }
        
    })

})

rutas.put('/api/v1/tablatipopanes/:ID', (req, res) =>{
    const {ID} = req.params;
    const {Tipo_Pan,Tipo_Sabor, Cantidad, Tipo_Empaque} = req.body;
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
        respuestaErrorCliente.push("la cantidad no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tipo_Empaque) {
        respuestaErrorCliente.push("El tipo de empaque no puede estar vacia ingrese el dato por favor.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
    }



    if (Tipo_Pan == null) {
        res.status(400).json({mensaje: "El nombre del proveedor no tiene que estar vacio."})
        return;
    }
    C.query('update inventario_panaderia.tabla_tipo_panes set Tipo_Pan = ?,Tipo_Sabor = ?, Cantidad = ?,Tipo_Empaque = ? where ID = ?',[Tipo_Pan, Tipo_Sabor, Cantidad, Tipo_Empaque, ID], function(err, rows, fields) {
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
rutas.delete('/api/v1/tablatipopanes/:id', (req, res) =>{
    const {id} = req.params;
    //Consultar si el id existe

    //Si existe borrarlo 
    C.query('delete from inventario_panaderia.tabla_tipo_panes where id = ?;' ,[id], function(err, rows, fields) {
        if (err) {
            console.log(err);
            let respuestaError ={}
            if (err.code === 'ER_BAD_NULL_ERROR') {
                respuestaError = {codigo: 500, mensaje: "Los campos que ingresar no pueden ser nulos"}
            }
            res.status(500).json(respuestaError)
        }else{
            res.status(200).json(rows)
        }
    });
    //Si no existe, retornar
})

module.exports = rutas