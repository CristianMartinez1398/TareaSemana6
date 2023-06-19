const express = require('express')
const rutas = express.Router()
//const{ Connection } = require('mysql');
const Configuracion = require('../../Configuracion');
var mysql = require('mysql');
var C = mysql.createConnection({
    host     : Configuracion.host,
    user     : Configuracion.user,
    password : Configuracion.password,
    database : Configuracion.database
});

/**
 * @openapi
 * tags:
 *    name: Productos
 *    description: Endpoints de la API para manejar informacion del producto
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          Productos:
 *              type: object
 *              properties:
 *                    id:
 *                      type: int
 *                      description: Id del producto registrado
 *                    Nombre:
 *                      type: string
 *                      description: Nombre del producto registrado
 */


/**
 * @openapi
 * /api/v1/TablaProducto: 
 *   get:
 *     tags: [Productos]
 *      
 *     description: Esto trae solo producto.
 *     responses:
 *       200:
 *         description: Traemos toda la información de todos los productos guardados.
 *         content:
 *              application/json:
 *              schema:
 *                  type: array
 *                  item:
 *                      $ref: '#/components/schemas/Productos' 
 */


rutas.get('/api/v1/TablaProducto', (req, res) =>{
    C.query('select ID, Nombre, Descripcion, Cantidad_Disponible, Precio, Imagen_Producto,Tabla_Proveedor_ID, Tabla_Tipo_Panes_ID from inventario_panaderia.tabla_producto;', function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
})

rutas.post('/api/v1/TablaProducto', (req, res) =>{
    const {ID, Nombre, Descripcion, Cantidad_Disponible, Precio, Imagen_Producto,Tabla_Proveedor_ID, Tabla_Tipo_Panes_ID} = req.body;
    let respuestaErrorCliente = [];

    if (!ID) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Nombre) {
        respuestaErrorCliente.push("El nombre proveedor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Descripcion) {
        respuestaErrorCliente.push("La descripcion no puede estar vacia ingrese el dato por favor.")
    }
    if (!Cantidad_Disponible) {
        respuestaErrorCliente.push("La cantidad disponible no puede estar vacia ingrese el dato por favor.")
    }
    if (Precio <= 0) {
        respuestaErrorCliente.push("El precio tiene que ser mayor que 0.")
    }
    if (!Precio) {
        respuestaErrorCliente.push("El precio no puede estar vacia ingrese el dato por favor.")
    }
    if (!Imagen_Producto) {
        respuestaErrorCliente.push("La Imagen del producto no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tabla_Proveedor_ID) {
        respuestaErrorCliente.push("La tabla de proveedor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Tabla_Tipo_Panes_ID) {
        respuestaErrorCliente.push("La tabla de tipo panes no puede estar vacia ingrese el dato por favor.")
    }
    if (respuestaErrorCliente.length > 0) {
        res.status(400).json({codigo: 400, mensaje: respuestaErrorCliente})
        return;
    }
    //res.status(200).json(id)
    C.query('insert into inventario_panaderia.tabla_producto(ID, Nombre, Descripcion, Cantidad_Disponible, Precio, Imagen_Producto,Tabla_Proveedor_ID, Tabla_Tipo_Panes_ID) values(?, ?, ?, ?, ?, ?, ?, ?); ',[ID, Nombre, Descripcion, Cantidad_Disponible, Precio, Imagen_Producto,Tabla_Proveedor_ID, Tabla_Tipo_Panes_ID], function(err, rows, fields) {
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

rutas.put('/api/v1/TablaProducto/:id', (req, res) =>{
    const {id} = req.params;
    const {Nombre, Descripcion, Cantidad_Disponible, Precio} = req.body;
    let respuestaErrorCliente = [];

    if (!ID) {
        respuestaErrorCliente.push("El id no puede estar vacia ingrese el dato por favor.")
    }
    if (!Nombre) {
        respuestaErrorCliente.push("El nombre proveedor no puede estar vacia ingrese el dato por favor.")
    }
    if (!Descripcion) {
        respuestaErrorCliente.push("La descripcion no puede estar vacia ingrese el dato por favor.")
    }
    if (!Cantidad_Disponible) {
        respuestaErrorCliente.push("La cantidad disponible no puede estar vacia ingrese el dato por favor.")
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
    if (Nombre == null) {
        res.status(400).json({mensaje: "El nombre del proveedor no tiene que estar vacio."})
        return;
    }
    C.query(' update inventario_panaderia.tabla_producto set Nombre = ?, Descripcion = ?, Cantidad_Disponible = ?, Precio = ? where id = ?;',[Nombre, Descripcion, Cantidad_Disponible, Precio,id], function(err, rows, fields) {
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

rutas.delete('/api/v1/TablaProducto/:id', (req, res) =>{
    const {id} = req.params;
    //Consultar si el id existe

    //Si existe borrarlo 
    C.query(' delete from inventario_panaderia.tabla_producto where id = ?;' ,[id], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows)
        //console.log('The solution is: ', rows[0].solution);
    });
    //Si no existe, retornar
})
module.exports = rutas