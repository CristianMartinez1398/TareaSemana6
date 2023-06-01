function Traerdatos() {
    var link = "http://localhost:3000/api/v1/TablaProveedores";
    fetch(link)
        .then(r => r.json())
        .then(dato => {
            var cuerpo = document.getElementById('Tabla_Cuerpo');
            cuerpo.innerHTML = "";
            dato.forEach(n => {
                console.log(n);
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                

                td.innerHTML = n.ID;
                td1.innerHTML = n.Nombre_Proveedor;
                td2.innerHTML = n.Tipo_Producto;
                td3.innerHTML = "L." + n.Precio;
                td4.innerHTML = `<button type=\"button\" class=\"btn btn-dark\" onclick=\"Eliminar_Dato(${n.ID})\">Eliminar</button> <button type=\"button\" class=\"btn btn-dark\" onclick=\"Actualizar_Datos(${n.ID})\">Actualizar</button>`
                
                tr.append(td, td1, td2, td3, td4);
                cuerpo.append(tr);
            });
        });
}
//Agregar dato en la tabla
function InsertarDatos() {
    const body =
    {
        "ID": document.getElementById("ID").value,
        "Nombre_Proveedor": document.getElementById("Nombre_Proveedor").value,
        "Fecha_Entrega": document.getElementById("Fecha").value,
        "Tipo_Producto": document.getElementById("Tipo_Producto").value,
        "Precio": document.getElementById("Precio").value

    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(body);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/api/v1/TablaProveedores", requestOptions)
        .then(response => response.text())
        .then(result => alert(`Se insertó el registro con el código ${result.insertId}`))
        .catch(error => console.log('error', error));
}
//Eliminar datos de la tabla
function Eliminar_Dato(ID) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/api/v1/TablaProveedores/${ID}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//Actualizar datos de la tabla
function Actualizar_Datos(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body =
    {
        "ID": document.getElementById("ID").value,
        "Nombre_Proveedor": document.getElementById("Nombre_Proveedor").value,
        "Fecha_Entrega": document.getElementById("Fecha").value,
        "Tipo_Producto": document.getElementById("Tipo_Producto").value,
        "Precio": document.getElementById("Precio").value

    }
    
    var raw = JSON.stringify(body);
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/api/v1/TablaProveedores/${ID}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}