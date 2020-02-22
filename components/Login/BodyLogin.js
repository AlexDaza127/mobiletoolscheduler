import React, { Component, cloneElement } from 'react';

//dependencias
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import base64 from 'react-native-base64'

//imagenes
import bgImage from '../../images/imagenfondologin.jpg'
import Logo from '../../images/logo-gn-representaciones.png'

//funciones
import { apiBasic } from '../../functions/api';


class BodyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };

        this.handlePress = this.handlePress.bind(this);
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

                const datos = await apiBasic('POST', 'auth-login/token', credenciales);

                if (datos.accessToken) {
                    alert('Datos Validos... Bienvenido!')
                    this.props.navegar.navigate('Details')
                } else {
                    alert(datos.error);
                }
            } else {
                alert('digite todos los datos')
            }
        } catch (error) {

        }
    }

    render() {
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
                        placeholder="Digite su Usuario"
                        keyboardType='email-address'
                        onChangeText={(user) => this.setState({ user })}
                        value={this.state.user}
                    ></TextInput>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Digite su Clave"
                        secureTextEntry={true}
                        keyboardType='numeric'
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
