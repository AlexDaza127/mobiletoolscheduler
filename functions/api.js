import { AsyncStorage } from 'react-native';
import { REACT_APP_API_URL } from 'react-native-dotenv';

//Función de petición general
async function request(method, url, body, auth, upload) {
    try {
        //URL de ambiente para hacer peticiones al back
        const urlApi = REACT_APP_API_URL;

        //Opciones de petición
        const requestOptions = {
            method: method, //GET, POST, PUT, DELETE
            headers: {
                'Authorization': auth, //Token de autorización
                'Content-Type': 'application/json'
            }
            //Se envían datos formateados en JSON
        };

        //Solo si el método no es GET se incluye body
        if (method.toUpperCase() !== 'GET' && !upload) {
            requestOptions.body = JSON.stringify(body);
        }
        else if(upload){
            //Cuando está activada la carga de archivos se debe eliminar el Content-Type
            requestOptions.headers['Content-Type'] = 'multipart/form-data';
            requestOptions.body = body;
        }

        //Se realiza petición
        const response = await fetch(`${urlApi}/${url}`, requestOptions);

        //Se recibe respuesta y se transforma en JSON
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
async function api(method, url, body = {}, upload) {
    const token = await AsyncStorage.getItem('token');
    return await request(method, url, body, `Bearer ${token}`, upload);
}

//Función de API para login
async function apiBasic(method, url, credenciales) {
    return await request(method, url, {}, `Basic ${credenciales}`);
}

export {
    api,
    apiBasic
}
