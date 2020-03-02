import React, { Component, Fragment } from 'react';
import {
    Text, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { api } from '../functions/api';

class FormatoServicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EstadoEquipo: '',
            PartesReparar: '',
            ManoObra: '',
            RepuestosPartes: '',
            AplicaCostoM: '',
            AplicaCostoPr: '',
            CostoM: '',
            CostoPr: '',
            Observaciones: '',
            FirmaEncargado: null,
            checkedCostoM: false,
            checkedCostoMAct: 0,
            checkedCostoPr: false,
            checkedCostoPrAct: 0,
            optimo: false,
            optimoAct: 0,
            critico: false,
            criticoAct: 0,
            precaucion: false,
            precaucionAct: 0,
            loading: false
        };
    }


    //método que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaCS');

    };
    //método que permite actualizar el state para la firma y que a su vez se muestre en el front-end del movil
    cargarFirma = () => {
        const { firma } = this.props.rutas;
        this.setState({
            FirmaEncargado: firma
        }, () => { });
    }

    //Validación de campos 
    guardarDatos() {

        if (this.state.EstadoEquipo !== '' &&
            this.state.PartesReparar !== '' &&
            this.state.ManoObra !== '' &&
            this.state.RepuestosPartes !== '' &&
            this.state.Observaciones !== '' &&
            this.state.FirmaEncargado !== null) {
            Alert.alert(`Se guardaron los datos correctamente`);
            this.props.navegar.navigate('Details')
        } else {
            Alert.alert(`Faltan campos por validar!`);

        }

    }

    //Evento que actualiza el ID del formulario en caso de actualización
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.traerDatosDetallesServicio(this.props.id);
        }
    }

    //Función que llama detalle de solicitud en caso de existir ID
    async traerDatosDetallesServicio(id) {
        try {
            this.setState({ loading: true });

            //Se realiza petición
            const datos = await api('GET', `solicitudes-movil/solicitudes-detalle/servicio/${id}`);
            //Se la petición fue exitosa
            if (datos.estado) {
                //Se actualizan los datos en el estado para poderse mostrar en el formulario
                const solicitudesDet = datos.data[0];
                this.setState({
                    ...solicitudesDet
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
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Estado inicial del equipo"
                        onChangeText={(EstadoEquipo) => this.setState({ EstadoEquipo })}
                        value={this.state.EstadoEquipo}
                    ></TextInput>

                    <Text style={styles.text}>Partes a reparar</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Partes a reparar"
                        onChangeText={(PartesReparar) => this.setState({ PartesReparar })}
                        value={this.state.PartesReparar}
                    ></TextInput>

                    <Text style={styles.text}>Mano de Obra</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Mano de Obra"
                        onChangeText={(ManoObra) => this.setState({ ManoObra })}
                        value={this.state.ManoObra}
                    ></TextInput>

                    <Text style={styles.text}>Recursos/Partes Necesarias</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Recursos/Partes Necesarias"
                        onChangeText={(RepuestosPartes) => this.setState({ RepuestosPartes })}
                        value={this.state.RepuestosPartes}
                    ></TextInput>

                    <Text style={styles.text}>Observaciones</Text>
                    <TextInput
                        style={[styles.inputs, styles.alinear]}
                        placeholder="Observaciones"
                        onChangeText={(Observaciones) => this.setState({ Observaciones })}
                        value={this.state.Observaciones}
                    ></TextInput>

                    {/* Checkbox para estado de las observaciones */}
                    <Text style={styles.text}>Clasificar el estado la observación anterior</Text>
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
                        <Text style={{ color: 'green' }}> Óptimo</Text>
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
                        <Text style={{ color: 'red' }}> Crítico</Text>
                    </View>

                    {/* //////////////////////////////// */}
                    <Text style={styles.text}>Costos de Mantenimiento</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.checkedCostoM}
                            onClick={() =>
                                this.setState({
                                    checkedCostoM: !this.state.checkedCostoM,
                                    checkedCostoMAct: this.state.checkedCostoM ? 0 : 1
                                })}
                            isChecked={this.state.checkedCostoM}
                            isChecked={this.state.checkedCostoM}
                            checkBoxColor={"black"}
                        >
                        </CheckBox>
                        <Text>¿Aplica costo?</Text>
                    </View>
                    {this.state.checkedCostoM ? (
                        <Fragment>
                            <TextInput
                                style={[styles.inputs, styles.alinear]}
                                placeholder='$0'
                                keyboardType='numeric'
                                onChangeText={(CostoConcepM) => this.setState({ CostoConcepM })}
                                value={this.state.CostoConcepM}

                            ></TextInput>
                            <TextInput
                                style={[styles.inputs, styles.alinear]}
                                placeholder="Descripción del Costo"
                                onChangeText={(CostoM) => this.setState({ CostoM })}
                                value={this.state.CostoM}
                            ></TextInput>
                        </Fragment>) : null}


                    {/* //////////////////////////////// */}
                    <Text style={styles.text}>Costos de Partes/Reparación</Text>

                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.checkedCostoPr}
                            onClick={() =>
                                this.setState({
                                    checkedCostoPr: !this.state.checkedCostoPr,
                                    checkedCostoPrAct: this.state.checkedCostoPr ? 0 : 1
                                })}
                            isChecked={this.state.checkedCostoPr}
                            isChecked={this.state.checkedCostoPr}
                            checkBoxColor={"black"}
                        >
                        </CheckBox>
                        <Text>¿Aplica costo?</Text>
                    </View>

                    {this.state.checkedCostoPr ? (
                        <Fragment>
                            <TextInput
                                style={[styles.inputs, styles.alinear]}
                                placeholder='$0'
                                keyboardType='numeric'
                                onChangeText={(CostoConcepPr) => this.setState({ CostoConcepPr })}
                                value={this.state.CostoConcepPr}
                            ></TextInput>

                            <TextInput
                                style={[styles.inputs, styles.alinear]}
                                placeholder="Descripción del Costo"
                                onChangeText={(CostoPr) => this.setState({ CostoPr })}
                                value={this.state.CostoPr}
                            ></TextInput>
                        </Fragment>) : null}

                    <Text style={styles.text}> Firma Cliente </Text>

                    {/* //////////////////Aqui va la firma cliente */}
                    <TouchableOpacity onPress={this.handleSignature}>
                        <Text style={styles.button}> <FontAwesome name="pencil" size={20}></FontAwesome >  Tomar Firma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cargarFirma}>
                        <Text style={styles.button}> <FontAwesome name="download" size={20}></FontAwesome >  Cargar Firma</Text>
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
