import React, { Component, Fragment } from 'react';
import {Text, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, CheckBox, Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



class FormatoServicio extends Component {
    state = {
        modalVisible: true,
        EstadoEquipo: '',
        PartesReparar: '',
        ManoObra: '',
        RepuestosPartes: '',
        AplicaCostoM: '',
        AplicaCostoPr: '',
        CostoM: '',
        CostoPr: '',
        CostoConcepM: '',
        CostoConcepPr: '',
        Observaciones: '',
        FirmaEncargado: null,
        loading: false,
        checkedCostoM: false,
        checkedCostoPr: false
    };

    //método que permite capturar la firma 
    handleSignature = () => {
        this.props.navegar.navigate('firmaCS');

    };

    cargarFirma = () => {
        const { firma } = this.props.rutas;
        this.setState({
            FirmaEncargado: firma
        }, () => { });
    }

    guardarDatos() {
        
        if(this.state.EstadoEquipo !== '' &&
        this.state.PartesReparar !== '' &&
        this.state.ManoObra !== '' &&
        this.state.RepuestosPartes !== '' &&
        this.state.Observaciones !== '' &&
        this.state.FirmaEncargado !== null){
            Alert.alert(`Se guardaron los datos correctamente`);
            this.props.navegar.navigate('Details')
        }else{
            Alert.alert(`Faltan campos por validar!`);
            
        }
        
    }

    
    render() {
        console.log(this.state)
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

                    {/* //////////////////////////////// */}
                    <Text style={styles.text}>Costos de Mantenimiento</Text>
                    <View style={styles.checks}>
                        <CheckBox
                            value={this.state.checkedCostoM}
                            onValueChange={() => this.setState({ checkedCostoM: !this.state.checkedCostoM, AplicaCostoM: 1 })}
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
                            onValueChange={() => this.setState({ checkedCostoPr: !this.state.checkedCostoPr, AplicaCostoPr: 1 })}
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
