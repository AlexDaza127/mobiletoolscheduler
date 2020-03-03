import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, TextInput, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import { REACT_APP_FILE_URL } from 'react-native-dotenv';

class FileLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conArchivo: (this.props.value) ? true : false,
            foto: {}
        }
        this.urlGn = REACT_APP_FILE_URL;
    }

    handleCargar = () => {
        this.setState({ conArchivo: false });
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    //método que genera la petición del permiso para la exploración de imágenes desde la app
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Necesita dar permiso a la aplicación para acceder a la galería de fotos');
            }
        }
    }

    //método que permite actualizar el state para la foto de la serial y que a su vez se muestre en el front-end del movil
    seleccionarImagen = async (nombre) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        if (!result.cancelled) {
            //Se extrae extensión de la imagen
            const extension = result.uri.split('.').pop();
            const objImagen = {
                [nombre]: {
                    uri: result.uri,
                    name: `foto.${extension}`,
                    type: 'image/*'
                }
            };
            //Se realiza guardado de imagen en el formato para indicar que es un archivo
            this.setState({...objImagen[nombre]});
            this.props.onCapturarImagen(objImagen);
        }
    };

    render() {
        if (this.state.conArchivo) {
            return (
                <>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            style={[{ display: 'none' }]}
                            value={this.props.value}
                            name={this.props.name}
                        />
                        <TouchableOpacity onPress={() => {
                            this.handleCargar()
                        }}>
                            <Text style={this.props.styles.buttonReload}><FontAwesome name="repeat" size={20} /> Volver a cargar</Text>
                        </TouchableOpacity>
                        <Image source={{ uri: `${this.urlGn}/${this.props.value}` }} style={this.props.styles.imagenes} />
                    </View>
                </>

            )
        }
        return (<>
            <TouchableOpacity onPress={() => this.seleccionarImagen(this.props.name)}>
                <Text style={this.props.styles.button}><FontAwesome name="upload" size={20} /> Subir Foto</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.uri &&
                    <Image source={{ uri: this.state.uri }} style={this.props.styles.imagenes} />}
            </View>
        </>);
    }
}
export default FileLoad;