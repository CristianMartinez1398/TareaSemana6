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

rutas.get('/api/v1/TablaMateriaPrima', (req, res) =>{
    C.query('select * from inventario_panaderia.tabla_materiaprima', function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
})

rutas.post('/api/v1/TablaMateriaPrima', (req, res) => {
    const {ID, Ingredientes,Cantidades, Costo} = req.body;
    let respuestaErrorCliente = [];
    if (!ID) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Ingredientes) {
        respuestaErrorCliente.push("El ingredientes no puede estar vacia ingrese el dato por favor.")
    }
    if (!Cantidades) {
        respuestaErrorCliente.push("La cantidades no puede estar vacia ingrese el dato por favor.")
    }
    if (!Costo) {
        respuestaErrorCliente.push("El costo no puede estar vacia ingrese el dato por favor.")
    }
    if (Costo <= 0) {
        respuestaErrorCliente.push("El costo tiene que ser mayor que 0.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    C.query('insert into inventario_panaderia.tabla_materiaprima(ID, Ingredientes,Cantidades, Costo) values(?, ?, ?, ?);', [ID, Ingredientes,Cantidades, Costo], function(err, rows, fields){
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

rutas.put('/api/v1/TablaMateriaPrima/:ID', (req, res) => {
    const {ID} = req.params;
    const {Ingredientes,Cantidades, Costo} = req.body;
    if (Ingredientes == null) {
        res.status(400).json({mensaje: "El nombre del proveedor no tiene que estar vacio."})
        return;
    }
    C.query('update inventario_panaderia.tabla_materiaprima set Ingredientes = ?, Cantidades = ?, Costo = ? where ID = ?;', [ Ingredientes,Cantidades, Costo, ID ], function(err, rows, fields){
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
rutas.delete('/api/v1/TablaMateriaPrima/:id', (req, res) =>{
    const {id} = req.params;
    //Consultar si el id existe

    //Si existe borrarlo 
    C.query('delete from inventario_panaderia.tabla_materiaprima where id = ?;' ,[id], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
    //Si no existe, retornar
})
module.exports = rutas