async function request(method, url, body, auth) {
    try {
        console.log("por aqui pase")
        //URL de ambiente para hacer peticiones al back
        const urlApi = 'http://192.168.0.3:8000/api';

        //Opciones de petición
        const requestOptions = {
            method: method, //GET, POST, PUT, DELETE
            headers: {
                'Authorization': auth, //Token de autorización
                'Content-Type': 'application/json'
            },
            //Se envían datos formateados en JSON
        };

        //Solo si el método no es GET se incluye body
        if (method.toUpperCase() !== 'GET') {
            requestOptions.body = JSON.stringify(body);
        }
        
        const response = await fetch(`${urlApi}/${url}`, requestOptions);
        
        const datos = await response.json();
        return datos;
    }
    catch (error) {
        console.log(error);
        return {
            estado: false,
            mensaje: 'Error al realizar petición'
        }
    }
}
//Función de API para peticiones
async function api(method, url, body = {}) {
    return await request(method, url, body, `Bearer ${sessionStorage.getItem('token')}`);
}

//Función de API para login
async function apiBasic(method, url, credenciales) {
    return await request(method, url, {}, `Basic ${credenciales}`);
}

export {api,apiBasic}