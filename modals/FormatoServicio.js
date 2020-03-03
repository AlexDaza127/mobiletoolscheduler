import React, { Component, Fragment } from 'react';
import {
    Text, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { api } from '../functions/api';
import Loader from '../functions/Loader';
import { REACT_APP_FILE_URL } from 'react-native-dotenv';

class FormatoServicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EstadoEquipo: '',
            PartesReparar: '',
            ManoObra: '',
            RepuestosPartes: '',
            AplicaCostoM: false,
            AplicaCostoPr: false,
            CostoM: '',
            CostoPr: '',
            CostoConcepM: 0,
            CostoConcepPr: 0,
            Observaciones: '',
            FirmaEncargado: null,
            RecomendRojo: false,
            RecomendAmar: false,
            RecomendVerd: false,
            loading: false
        };
        this.urlGn = REACT_APP_FILE_URL;

    }


    //método que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaC', { origen: 'formatoS' });

    };
    //método que permite actualizar el state para la firma y que a su vez se muestre en el front-end del movil
    cargarFirma = () => {
        const { firma } = this.props.rutas;
        this.setState({
            FirmaEncargado: firma
        }, () => { });
    }

    componentDidMount() {
        this.traerDatosDetallesServicio();
    }

    //Evento que actualiza el ID del formulario en caso de actualización
    componentDidUpdate(prevProps) {
        if (prevProps.rutas.firma !== this.props.rutas.firma) {
            this.cargarFirma();
        }
    }

    //Validación de campos 
    async guardarDatos() {

        if (this.state.EstadoEquipo !== '' &&
            this.state.PartesReparar !== '' &&
            this.state.ManoObra !== '' &&
            this.state.RepuestosPartes !== '' &&
            this.state.Observaciones !== '' &&
            this.state.FirmaEncargado !== null) {

            //Se crea formdata para subir información junto con las imágenes
            const formulario = this.capturarFormulario();

            this.setState({ loading: true });

            //Se realiza petición
            const datos = await api('PUT', `solicitudes-movil/actualizar-servicio/servicio`, formulario, true);

            Alert.alert(datos.mensaje);

            if (datos.estado) {
                this.props.navegar.navigate('Details')
            }

            this.setState({ loading: false });
        } else {
            Alert.alert(`¡Faltan campos por validar!`);
        }

    }

    capturarFormulario = () => {
        const formulario = new FormData();

        formulario.append('idSolicitudesDet', this.props.id);
        formulario.append('EstadoEquipo', this.state.EstadoEquipo);
        formulario.append('PartesReparar', this.state.PartesReparar);
        formulario.append('ManoObra', this.state.ManoObra);
        formulario.append('RepuestosPartes', this.state.RepuestosPartes);
        formulario.append('Observaciones', this.state.Observaciones);
        //Se verifican los checkbox
        formulario.append('RecomendRojo', this.state.RecomendRojo ? 1 : 0);
        formulario.append('RecomendAmar', this.state.RecomendAmar ? 1 : 0);
        formulario.append('RecomendVerd', this.state.RecomendVerd ? 1 : 0);
        //Se verifican los costos
        formulario.append('AplicaCostoM', this.state.AplicaCostoM ? 1 : 0);
        formulario.append('CostoM', this.state.AplicaCostoM ? this.state.CostoM : '');
        formulario.append('CostoConcepM', this.state.AplicaCostoM ? this.state.CostoConcepM : '');

        formulario.append('AplicaCostoPr', this.state.AplicaCostoPr ? 1 : 0);
        formulario.append('CostoPr', this.state.AplicaCostoPr ? this.state.CostoPr : '');
        formulario.append('CostoConcepPr', this.state.AplicaCostoPr ? this.state.CostoConcepPr : '');

        //Firma cliente
        formulario.append('FirmaEncargado', this.state.FirmaEncargado);

        return formulario;
    }

    //Función que llama detalle de solicitud en caso de existir ID
    async traerDatosDetallesServicio() {
        try {
            this.setState({ loading: true });

            //Se realiza petición
            const datos = await api('GET', `solicitudes-movil/solicitudes-detalle/servicio/${this.props.id}`);
            //Se la petición fue exitosa
            if (datos.estado) {
                //Se actualizan los datos en el estado para poderse mostrar en el formulario
                const solicitudesDet = datos.data[0];
                this.setState({
                    ...solicitudesDet,
                    FirmaEncargado: solicitudesDet.FirmaEncargado ? `${this.urlGn}/${solicitudesDet.FirmaEncargado}` : false

                });
            }
            else {
                Alert.alert('No fue posible traer datos de del detallado de la solicitud');
            }
            this.setState({ loading: false });
        }
        catch (error) {
            Alert.alert('Error en servidor');
        }
    }



    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        return (
            <View>
                <ScrollView>
                    <Text style={styles.title}>Formato de Servicio</Text>
                    <Text style={styles.text}>Estado inicial del equipo</Text>
                    <TextInput
                        maxLength={255}
                        multiline
                        numberOfLines={2}
                        style={[styles.inputsLg, styles.alinear]}
                        placeholder="Estado inicial del equipo"
                        onChangeText={(EstadoEquipo) => this.setState({ EstadoEquipo })}
                        value={this.state.EstadoEquipo}
                    ></TextInput>

                    <Text style={styles.text}>Partes a reparar</Text>
                    <TextInput
                        maxLength={255}
                        multiline
                        numberOfLines={2}
                        style={[styles.inputsLg, styles.alinear]}
                        placeholder="Partes a reparar"
                        onChangeText={(PartesReparar) => this.setState({ PartesReparar })}
                        value={this.state.PartesReparar}
                    ></TextInput>

                    <Text style={styles.text}>Mano de Obra</Text>
                    <TextInput
                        maxLength={255}
                        multiline
                        numberOfLines={2}
                        style={[styles.inputsLg, styles.alinear]}
                        placeholder="Qué se realizó"
                        onChangeText={(ManoObra) => this.setState({ ManoObra })}
                        value={this.state.ManoObra}
                    ></TextInput>

                    <Text style={styles.text}>Repuestos</Text>
                    <TextInput
                        maxLength={255}
                        multiline
                        numberOfLines={2}
                        style={[styles.inputsLg, styles.alinear]}
                        placeholder="Repuestos usados"
                        onChangeText={(RepuestosPartes) => this.setState({ RepuestosPartes })}
                        value={this.state.RepuestosPartes}
                    ></TextInput>

                    <Text style={styles.text}>Observaciones</Text>
                    <TextInput
                        maxLength={255}
                        multiline
                        numberOfLines={2}
                        style={[styles.inputsLg, styles.alinear]}
                        placeholder="Observaciones"
                        onChangeText={(Observaciones) => this.setState({ Observaciones })}
                        value={this.state.Observaciones}
                    ></TextInput>

                    {/* Checkbox para estado de las observaciones */}
                    <Text style={styles.text}>Clasificar el estado la observación anterior</Text>

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
                        <Text style={{ color: 'red' }}> Crítico</Text>
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

                    {/* //////////////////////////////// */}
                    <Text style={styles.text}>Costos de Mantenimiento</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.AplicaCostoM}
                            onClick={() =>
                                this.setState({
                                    AplicaCostoM: !this.state.AplicaCostoM,
                                })}
                            isChecked={this.state.AplicaCostoM ? true : false}
                            checkBoxColor={"black"}
                        >
                        </CheckBox>
                        <Text>¿Aplica costo?</Text>
                    </View>
                    {this.state.AplicaCostoM ? (
                        <Fragment>
                            <TextInput
                                style={[styles.inputs, styles.alinear]}
                                placeholder='$0'
                                keyboardType='numeric'
                                onChangeText={(CostoConcepM) => this.setState({ CostoConcepM })}
                                value={this.state.CostoConcepM.toString()}
                            />

                            <TextInput
                                maxLength={45}
                                multiline
                                numberOfLines={2}
                                style={[styles.inputsLg, styles.alinear]}
                                placeholder="Descripción del Costo"
                                onChangeText={(CostoM) => this.setState({ CostoM })}
                                value={this.state.CostoM}
                            />
                        </Fragment>) : null
                    }


                    {/* //////////////////////////////// */}
                    <Text style={styles.text}>Costos de Partes/Reparación</Text>

                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.AplicaCostoPr}
                            onClick={() =>
                                this.setState({
                                    AplicaCostoPr: !this.state.AplicaCostoPr,
                                })}
                            isChecked={this.state.AplicaCostoPr ? true : false}
                            checkBoxColor={"black"}
                        >
                        </CheckBox>
                        <Text>¿Aplica costo?</Text>
                    </View>

                    {this.state.AplicaCostoPr ? (
                        <Fragment>
                            <TextInput
                                style={[styles.inputs, styles.alinear]}
                                placeholder='$0'
                                keyboardType='numeric'
                                onChangeText={(CostoConcepPr) => this.setState({ CostoConcepPr })}
                                value={this.state.CostoConcepPr.toString()}
                            ></TextInput>

                            <TextInput
                                maxLength={45}
                                multiline
                                numberOfLines={2}
                                style={[styles.inputsLg, styles.alinear]}
                                placeholder="Descripción del Costo"
                                onChangeText={(CostoPr) => this.setState({ CostoPr })}
                                value={this.state.CostoPr}
                            ></TextInput>
                        </Fragment>) : null
                    }

                    {/* //////////////////Aqui va la firma cliente */}
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


                    <View>
                        <TouchableOpacity onPress={() => {
                            this.guardarDatos()
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
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#FFF',
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
    alinear: {
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
        margin: 20,
        fontSize: 15,
        textAlign: 'center',
    },
    checks: {
        marginBottom: 20,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default FormatoServicio;
