import React, { Component } from 'react';
import {
    Text, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { api } from '../functions/api';

class FormatoEntrega extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMaquinaSede: '',
            TipoMaquina: '',
            Marca: '',
            Referencia: '',
            Serial: '',
            FotoSerial: null,
            FirmaEncargado: null,
            image: null,
            checkedCostoM: false,
            checkedCostoMAct: 0,
            NoInst: false,
            NoInstAct: 0,
            optimo: false,
            optimoAct: 0,
            critico: false,
            criticoAct: 0,
            precaucion: false,
            precaucionAct: 0
        };
    }

    //método que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaC');
    };

    //método que permite actualizar el state para la firma y que a su vez se muestre en el front-end del celular
    cargarFirma = () => {
        const { firma } = this.props.rutas;
        this.setState({
            FirmaEncargado: firma
        }, () => { });
    }

    //Validación de campos 
    async cargarDatos() {
        try {
            if (
                true
            ) {
                //Se crea formdata para subir información junto con las imágenes
                const formulario = new FormData();
                for (const key in this.state) {
                    formulario.append(key, this.state[key]);
                }

                //Se realiza petición
                const datos = await api('PUT', `solicitudes-movil/actualizar-servicio/instalacion`, formulario, true);

                Alert.alert(datos.mensaje);

                if(datos.estado){
                    //this.props.navegar.navigate('Details')
                }
            } else {
                Alert.alert(`¡Faltan campos por validar!`);
            }
        }
        catch (error) {

        }

    }

    //método que permite actualizar los permisos del movil para la exploración de imágenes desde la app
    componentDidMount() {
        this.getPermissionAsync();
        this.traerDatosSolicitudEntrega();
    }

    componentDidUpdate(prevProps){
        if(prevProps.rutas.firma !== this.props.rutas.firma){
            this.cargarFirma();
        }

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
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            //Se extrae extensión de la imagen
            const extension = result.uri.split('.').pop();
            //Se realiza guardado de imagen en el formato para indicar que es un archivo
            this.setState({ FotoSerial: { uri: result.uri, name: `FotoSerial.${extension}`, type: 'image/*' } });
        }
    };

    async traerDatosSolicitudEntrega() {
        try {
            this.setState({ loading: true });
            const datos = await api('GET', `solicitudes-movil/solicitudes-detalle/asignacion/${this.props.id}`);
            if (datos.estado) {
                this.setState({ ...datos.data[0] });
            }
            this.setState({ loading: false });
        } catch (error) {
        }
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <Text style={styles.title}>Formato de Entrega</Text>

                    <Text style={styles.text}>Tipo de Máquina</Text>
                    <Text
                        style={[styles.inputs, styles.alinear]}
                    >{this.state.TipoMaquina}</Text>

                    <Text style={styles.text}>Marca</Text>
                    <Text
                        style={[styles.inputs, styles.alinear]}
                    >{this.state.Marca}</Text>

                    <Text style={styles.text}>Referencia</Text>
                    <Text
                        style={[styles.inputs, styles.alinear]}
                    >{this.state.Referencia}</Text>

                    <Text style={styles.text}>Modelo</Text>
                    <Text
                        style={[styles.inputs, styles.alinear]}
                    >{this.state.Modelo}</Text>

                    <Text style={styles.text}>Serial</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Serial'
                        onChangeText={(Serial) => this.setState({ Serial })}
                        value={this.state.Serial}
                    ></TextInput>

                    {/* Boton para subir la foto de la serial */}
                    <Text style={styles.text}>Foto Serial</Text>
                    <TouchableOpacity onPress={this._pickImage}>
                        <Text style={styles.button}><FontAwesome name="upload" size={20}></FontAwesome> Subir Foto</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.image &&
                            <Image source={{ uri: this.state.image }} style={styles.imagenes} />}
                    </View>
                    
                    {/* Aqui va la firma cliente */}
                    <Text style={styles.text}>Firma Cliente</Text>
                    <TouchableOpacity onPress={this.handleSignature}>
                        <Text style={styles.button}><FontAwesome name="pencil" size={20}></FontAwesome>  Tomar Firma</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                        {this.state.FirmaEncargado &&
                            <Image
                                source={{ uri: this.state.FirmaEncargado }}
                                style={styles.imagenes} />
                        }
                    </View>

                    <Text style={styles.text}>Observaciones</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Observaciones"
                        onChangeText={(Observaciones) => this.setState({ Observaciones })}
                        value={this.state.Observaciones}
                    ></TextInput>
                    {/* Checkbox para el estado de las observaciones */}
                    <Text style={styles.text}>Estado de las observaciones</Text>
                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.optimo}
                            onClick={() =>
                                this.setState({
                                    optimo: !this.state.optimo,
                                    optimoAct: this.state.optimo ? 0 : 1
                                })}
                            isChecked={this.state.optimo}
                            checkBoxColor={"green"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'green' }}> Optimo</Text>
                    </View>
                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.precaucion}
                            onClick={() =>
                                this.setState({
                                    precaucion: !this.state.precaucion,
                                    precaucionAct: this.state.precaucion ? 0 : 1
                                })}
                            isChecked={this.state.precaucion}
                            checkBoxColor={"orange"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'orange' }}> Precaución</Text>
                    </View>
                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.critico}
                            onClick={() =>
                                this.setState({
                                    critico: !this.state.critico,
                                    criticoAct: this.state.critico ? 0 : 1
                                })}
                            isChecked={this.state.critico}
                            checkBoxColor={"red"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'red' }}> Critico</Text>
                    </View>


                    <Text style={styles.text}>Instalada</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.checkedCostoM}
                            onClick={() =>
                                this.setState({
                                    checkedCostoM: !this.state.checkedCostoM,
                                    checkedCostoMAct: this.state.Status === 10 ? 1 : 0
                                })}
                            isChecked={this.state.checkedCostoM === 10}
                            checkBoxColor={"black"}
                        >
                        </CheckBox>
                    </View>

                    <Text style={styles.text}>No Requirió Instalación</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.NoInst}
                            onClick={() =>
                                this.setState({
                                    NoInst: !this.state.NoInst,
                                    NoInstAct: this.state.NoInst ? 0 : 1
                                })}
                            isChecked={this.state.NoInst}
                            checkBoxColor={"black"}
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

//Estilos de diseño para el front-end movil
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#FFF',
        marginHorizontal: 20
    },
    alinear: {
        marginBottom: 20
    },
    button: {
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
    },
    title: {
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
    checks: {
        marginBottom: 20,
        fontSize: 90,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checksSemaforos: {
        marginBottom: 20,
        fontSize: 90,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
