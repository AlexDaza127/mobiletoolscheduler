import React, { Component } from 'react';
import {
    Text, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { api } from '../functions/api';
import Loader from '../functions/Loader';
import FileLoad from '../functions/FileLoad';

class FormatoEntrega extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idMaquinaSede: '',
            TipoMaquina: '',
            Marca: '',
            Referencia: '',
            Serial: '',
            FotoSerial: '',
            FotoVista: '',
            FirmaEncargado: null,
            image: null,
            checkedCostoM: false,
            NoInst: false,
            optimo: false,
            critico: false,
            precaucion: false,
            instalada: false,
            loading: false
        };
    }

    //método que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaC');
    };

    //Método para capturar las imágenes
    handleCapturarImagen = (objImagen) => {
        console.log(objImagen);
    }

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
                this.setState({ loading: true });

                //Se realiza petición
                const datos = await api('PUT', `solicitudes-movil/actualizar-servicio/instalacion`, formulario, true);

                Alert.alert(datos.mensaje);

                if (datos.estado) {
                    //this.props.navegar.navigate('Details')
                }
                this.setState({ loading: false });
            } else {
                Alert.alert(`¡Faltan campos por validar!`);
            }
        }
        catch (error) {

        }

    }

    //método que permite actualizar los permisos del movil para la exploración de imágenes desde la app
    componentDidMount() {
        this.traerDatosSolicitudEntrega();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rutas.firma !== this.props.rutas.firma) {
            this.cargarFirma();
        }

    }

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
        if (this.state.loading) {
            return <Loader />;
        }
        return (
            <View>
                <ScrollView>
                    <Text style={styles.title}>Formato de Entrega</Text>

                    <Text style={styles.text}>Tipo de Máquina</Text>
                    <Text
                        style={[styles.inputs, styles.alinear, styles.inputsDisabled]}
                    >{this.state.TipoMaquina}</Text>

                    <Text style={styles.text}>Marca</Text>
                    <Text
                        style={[styles.inputs, styles.alinear, styles.inputsDisabled]}
                    >{this.state.Marca}</Text>

                    <Text style={styles.text}>Referencia</Text>
                    <Text
                        style={[styles.inputs, styles.alinear, styles.inputsDisabled]}
                    >{this.state.Referencia}</Text>

                    <Text style={styles.text}>Modelo</Text>
                    <Text
                        style={[styles.inputs, styles.alinear, styles.inputsDisabled]}
                    >{this.state.Modelo}</Text>

                    <Text style={styles.text}>Serial</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder='Serial'
                        onChangeText={(Serial) => this.setState({ Serial })}
                        value={this.state.Serial}
                    ></TextInput>

                    {/* Componente para subir la foto de la serial */}
                    <Text style={styles.text}>Foto Serial</Text>
                    <FileLoad
                        value={this.state.FotoSerial}
                        name="FotoSerial"
                        styles={styles}
                        onCapturarImagen={(objImagen) => this.handleCapturarImagen(objImagen)}
                    />

                    {/* Componente para subir la foto de la vista de la máquina instalada */}
                    <Text style={styles.text}>Foto Serial</Text>
                    <FileLoad
                        value={this.state.FotoSerial}
                        name="FotoVista"
                        styles={styles}
                        onCapturarImagen={(objImagen) => this.handleCapturarImagen(objImagen)}
                    />

                    {/* Aqui va la firma cliente */}
                    <Text style={styles.text}>Firma Cliente</Text>
                    <TouchableOpacity onPress={this.handleSignature}>
                        <Text style={styles.button}><FontAwesome name="pencil" size={20}></FontAwesome> Tomar Firma</Text>
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
                    <Text style={styles.text}>Estado de la observación anterior</Text>
                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.critico}
                            onClick={() =>
                                this.setState({
                                    critico: !this.state.critico,
                                })}
                            isChecked={this.state.critico}
                            checkBoxColor={"red"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'red' }}> Critico</Text>
                    </View>

                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.precaucion}
                            onClick={() =>
                                this.setState({
                                    precaucion: !this.state.precaucion,
                                })}
                            isChecked={this.state.precaucion}
                            checkBoxColor={"orange"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'orange' }}> Precaución</Text>
                    </View>

                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.optimo}
                            onClick={() =>
                                this.setState({
                                    optimo: !this.state.optimo,
                                })}
                            isChecked={this.state.optimo}
                            checkBoxColor={"green"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'green' }}> Optimo</Text>
                    </View>

                    <Text style={styles.text}>Instalada</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.instalada}
                            onClick={() =>
                                this.setState({
                                    instalada: !this.state.instalada,
                                })}
                            isChecked={this.state.instalada}
                            checkBoxColor={"black"}
                        >
                        </CheckBox>
                    </View>

                    <Text style={styles.text}>No requirió instalación</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.NoInst}
                            onClick={() =>
                                this.setState({
                                    NoInst: !this.state.NoInst,
                                })}
                            isChecked={this.state.NoInst ? true: false}
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
                        <Text style={styles.button}>Regresar</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
            </View >

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
        backgroundColor: '#fff',
        marginHorizontal: 20
    },
    inputsDisabled: {
        backgroundColor: '#e4e4e4',

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
    buttonReload: {
        color: '#4dabf7',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 18
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
