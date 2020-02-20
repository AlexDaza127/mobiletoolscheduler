import React, { Component } from 'react';
import {Text, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, CheckBox, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';

class FormatoEntrega extends Component {

    state = {
        idMaquinaSede: '',
        TipoMaquina: '',
        Marca: '',
        Referencia: '',
        Serial: '',
        FotoSerial: null,
        FirmaEncargado: null,
        Status: '',//pendiente del checkbox
        NoInst: false, //pendiente del checkbox
        loading: false,
        checkedCostoM: false,
        checkedCostoPr: false,
        image: null
    };


    //metodo que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaC');

    };

    cargarFirma = () => {
        const { firma } = this.props.rutas;
        this.setState({
            FirmaEncargado: firma
        }, () => { });
    }

    cargarDatos() {
        if (this.state.TipoMaquina !== '' &&
            this.state.Marca !== '' &&
            this.state.Referencia !== '' &&
            this.state.FirmaEncargado !== null &&
            this.state.Serial !== '') {
            Alert.alert(`Se guardaron los datos correctamente`);
            this.props.navegar.navigate('Details')
        } else {
            Alert.alert(`Faltan campos por validar!`);
        }

    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Perdón, necesita dar permiso a la aplicación para acceder a la galería de fotos!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        console.log(this.state)
        return (
            <View>
                <ScrollView>
                    <Text style={styles.title}>Formato de Entrega</Text>

                    <Text style={styles.text}>Tipo de Máquina</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Tipo de Máquina'
                        onChangeText={(TipoMaquina) => this.setState({ TipoMaquina })}
                        value={this.state.TipoMaquina}
                    ></TextInput>

                    <Text style={styles.text}>Marca</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Marca'
                        onChangeText={(Marca) => this.setState({ Marca })}
                        value={this.state.Marca}
                    ></TextInput>

                    <Text style={styles.text}>Referencia</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Referencia'
                        onChangeText={(Referencia) => this.setState({ Referencia })}
                        value={this.state.Referencia}
                    ></TextInput>

                    <Text style={styles.text}>Modelo</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Modelo'
                        onChangeText={(Modelo) => this.setState({ Modelo })}
                        value={this.state.Modelo}
                    ></TextInput>

                    <Text style={styles.text}>Serial</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Serial'
                        onChangeText={(Serial) => this.setState({ Serial })}
                        value={this.state.Serial}
                    ></TextInput>

                    {/* // Boton para subir la foto de la serial */}
                    <Text style={styles.text}>Foto Serial</Text>
                    <TouchableOpacity onPress={this._pickImage}>
                        <Text style={styles.button}><FontAwesome name="download" size={20}></FontAwesome >  Subir Foto</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.image &&
                            <Image source={{ uri: this.state.image }} style={styles.imagenes} />}
                        <Text style={styles.textFoto}>{this.state.image}</Text>
                    </View>

                    <Text style={styles.text}>Técnico</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Técnico'
                        onChangeText={(nombre) => this.setState({ nombre })}
                        value={this.state.nombre}
                    ></TextInput>


                    <Text style={styles.text}>Firma Cliente</Text>

                    {/* //////////////////Aqui va la firma cliente */}
                    <TouchableOpacity onPress={this.handleSignature}>
                        <Text style={styles.button}><FontAwesome name="pencil" size={20}></FontAwesome >  Tomar Firma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cargarFirma}>
                        <Text style={styles.button}><FontAwesome name="download" size={20}></FontAwesome >  Cargar Firma</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        {this.state.FirmaEncargado &&
                            <Image
                                source={{ uri: this.state.FirmaEncargado }}
                                style={styles.imagenes} />
                        }
                    </View>

                    <Text style={styles.text}>Entregado</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.checkedCostoM}
                            onValueChange={() => this.setState({ checkedCostoM: !this.state.checkedCostoM })}
                        >
                        </CheckBox>
                    </View>

                    <Text style={styles.text}>No Requirió Instalación</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.checkedCostoPr}
                            onValueChange={() => this.setState({ checkedCostoPr: !this.state.checkedCostoPr })}
                        >
                        </CheckBox>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => {
                            this.cargarDatos()
                        }}>
                            <Text style={styles.button}> Guardar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navegar.navigate('Details')
                        }}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        paddingHorizontal: 20,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#FFF',
        marginHorizontal: 20
    }, alinear: {
        marginBottom: 20
    }, button: {
        backgroundColor: '#e20613',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        color: 'white',
        overflow: 'hidden',
        padding: 15,
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 15,
        marginHorizontal: 100,
        fontSize: 16
    }, title: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    text: {
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        fontSize: 15,
        textAlign: 'center',
    },
    textFoto: {
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        fontSize: 15,
        textAlign: 'center',
    },
    checks: {
        marginBottom: 20,
        fontSize: 90,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagenes: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 15,
        width: 200,
        height: 200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FormatoEntrega;
