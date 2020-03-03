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
import { REACT_APP_FILE_URL } from 'react-native-dotenv';


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
            Observaciones: '',
            FirmaEncargado: null,
            NoInst: false,
            RecomendRojo: false,
            RecomendAmar: false,
            RecomendVerd: false,
            Status: false,
            loading: false
        };
        this.urlGn = REACT_APP_FILE_URL;
    }

    //método que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaC', { origen: 'formatoE' });
    };

    //Método para capturar las imágenes
    handleCapturarImagen = (objImagen) => {
        this.setState({
            ...objImagen
        });
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
                this.state.FotoSerial &&
                this.state.FotoVista &&
                this.state.Serial &&
                this.state.Observaciones &&
                this.state.FirmaEncargado
            ) {
                //Se crea formdata para subir información junto con las imágenes
                const formulario = this.capturarFormulario();

                this.setState({ loading: true });

                //Se realiza petición
                const datos = await api('PUT', `solicitudes-movil/actualizar-servicio/instalacion`, formulario, true);

                Alert.alert(datos.mensaje);

                if (datos.estado) {
                    this.props.navegar.navigate('Details')
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

    capturarFormulario = () => {
        const formulario = new FormData();

        formulario.append('idSolicitudesDet', this.props.id);
        formulario.append('idMaquinaSede', this.state.idMaquinaSede);
        formulario.append('FotoSerial', this.state.FotoSerial);
        formulario.append('FotoVista', this.state.FotoVista);
        formulario.append('Serial', this.state.Serial);
        formulario.append('Observaciones', this.state.Observaciones);
        formulario.append('FirmaEncargado', this.state.FirmaEncargado);
        //Se verifican los checkbox
        formulario.append('NoInst', this.state.NoInst ? 1 : 0);
        formulario.append('RecomendRojo', this.state.RecomendRojo ? 1 : 0);
        formulario.append('RecomendAmar', this.state.RecomendAmar ? 1 : 0);
        formulario.append('RecomendVerd', this.state.RecomendVerd ? 1 : 0);
        formulario.append('Status', this.state.Status ? 1 : 0);

        return formulario;
    }

    async traerDatosSolicitudEntrega() {
        try {
            this.setState({ loading: true });
            const datos = await api('GET', `solicitudes-movil/solicitudes-detalle/asignacion/${this.props.id}`);

            if (datos.estado) {
                const datosSolicitud = datos.data[0];
                this.setState({
                    ...datosSolicitud,
                    Status: datosSolicitud.Status === 10 ? true : false,
                    FirmaEncargado: datosSolicitud.FirmaEncargado ? `${this.urlGn}/${datosSolicitud.FirmaEncargado}` : false
                });
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
                        maxLength={45}
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
                    <Text style={styles.text}>Foto Máquina</Text>
                    <FileLoad
                        value={this.state.FotoVista}
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
                                style={styles.imagenes}
                                reload
                            />
                        }
                    </View>

                    <Text style={styles.text}>Observaciones</Text>
                    <TextInput
                        style={[styles.inputsLg, styles.alinear]}
                        placeholder="Observaciones"
                        onChangeText={(Observaciones) => this.setState({ Observaciones })}
                        maxLength={255}
                        value={this.state.Observaciones}
                        multiline
                        numberOfLines={2}
                    ></TextInput>

                    {/* Checkbox para el estado de las observaciones */}
                    <Text style={styles.text}>Estado de la observación anterior</Text>
                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.RecomendRojo}
                            onClick={() =>
                                this.setState({
                                    RecomendRojo: !this.state.RecomendRojo,
                                })}
                            isChecked={this.state.RecomendRojo ? true : false}
                            checkBoxColor={"red"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'red' }}> Critico</Text>
                    </View>

                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.RecomendAmar}
                            onClick={() =>
                                this.setState({
                                    RecomendAmar: !this.state.RecomendAmar,
                                })}
                            isChecked={this.state.RecomendAmar ? true : false}
                            checkBoxColor={"orange"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'orange' }}> Precaución</Text>
                    </View>

                    <View style={styles.checksSemaforos}>
                        <CheckBox
                            value={this.state.RecomendVerd}
                            onClick={() =>
                                this.setState({
                                    RecomendVerd: !this.state.RecomendVerd,
                                })}
                            isChecked={this.state.RecomendVerd ? true : false}
                            checkBoxColor={"green"}
                        >
                        </CheckBox>
                        <Text style={{ color: 'green' }}> Óptimo</Text>
                    </View>

                    <Text style={styles.text}>Instalada</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.Status}
                            onClick={() =>
                                this.setState({
                                    Status: !this.state.Status,
                                })}
                            isChecked={this.state.Status ? true : false}
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
                            isChecked={this.state.NoInst ? true : false}
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
    inputsLg: {
        paddingHorizontal: 20,
        paddingVertical: 15,
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
