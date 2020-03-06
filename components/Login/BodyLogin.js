import React, { Component } from 'react';

//dependencias
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, AsyncStorage, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import base64 from 'react-native-base64'

//imagenes
import bgImage from '../../images/imagenfondologin.jpg'
import Logo from '../../images/logo-gn-representaciones.png'

//funciones
import { apiBasic } from '../../functions/api';
import Loader from '../../functions/Loader';

class BodyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            loading: false
        };

        this.handlePress = this.handlePress.bind(this);
        this.removeStorage();
    }
    
    removeStorage = async () => {
        await AsyncStorage.removeItem('token');
    }

    //método que permite verificar las credenciales del usuario en la base de datos
    handlePress = async () => {
        try {
            if (this.state.user !== '' && this.state.pass !== '') {

                const conversion = this.state.user + ":" + this.state.pass;
                const credenciales = await base64.encode(conversion);

                this.setState({
                    user: '',
                    pass: ''
                })

                this.setState({ loading: true });

                const datos = await apiBasic('POST', 'auth-login/token', credenciales);

                if (datos.accessToken) {
                    const tokenSplit = datos.accessToken.split('.');
                    /*
                        Se realiza esta conversión tan larga, debido a los caracteres no imprimibles o nulos que se producen
                        según algunos artículos en internet por Android. Se deben eliminar caracteres \u0000.
                        El problema no es del back-end, desde ahí se envían bien.
                        Para visualizar los caracteres puede hacer un console.log(JSON.stringify(base64.decode(tokenSplit[1])))
                    */
                    const usuario = JSON.parse(JSON.parse(JSON.stringify(base64.decode(tokenSplit[1])).replace(/\\u([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])/g, '')));
                    //Se permite ingreso a los roles técnicos y al tipo de usuario 2 = Jefe de servicio
                    if (usuario.rol === 'tecnico' || usuario.rol === 'admin') {
                        await AsyncStorage.setItem('token', datos.accessToken);
                        this.props.navegar.navigate('Details');
                    }
                    else {
                        Alert.alert('Aplicación exclusiva para técnicos');
                    }
                } else {
                    Alert.alert(datos.error);
                }
                this.setState({ loading: false });
            } else {
                Alert.alert('Digite todos los datos')
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <View style={styles.container}>
                    <Image source={Logo} />
                    <Text
                        style={[styles.alinear, styles.fontLetter]}>
                        Ingresar
                    </Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Digite su usuario"
                        keyboardType='email-address'
                        onChangeText={(user) => this.setState({ user })}
                        value={this.state.user}
                    ></TextInput>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Digite su clave"
                        secureTextEntry={true}
                        onChangeText={(pass) => this.setState({ pass })}
                        value={this.state.pass}
                    ></TextInput>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Text style={styles.button}><MaterialIcons name='check'></MaterialIcons> Acceder</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

//Estilos de diseño para el front-end movil
const styles = StyleSheet.create({
    fontLetter: {
        fontWeight: 'bold',
        fontSize: 20
    },
    container: {
        padding: 20,
        backgroundColor: '#ffffff94',
        alignItems: 'center',
        justifyContent: 'center',
    }, backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        paddingHorizontal: 20,
        width:200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#FFF'
    }, alinear: {
        marginBottom: 20
    }, button: {
        backgroundColor: 'gray',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        color: 'white',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});


export default BodyLogin;
