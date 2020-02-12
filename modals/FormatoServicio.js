import React, { Component } from 'react';
import {
    Modal, Text, TouchableHighlight, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, CheckBox
} from 'react-native';



class FormatoServicio extends Component {
    state = {
        modalVisible: true,
        estado: '',
        partes: '',
        obra: '',
        obs: '',
    };

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
            EstadoEquipo: '',
            PartesReparar: '',
            ManoObra: '',
            RepuestosPartes: '',
            AplicaCostoM: 0,
            AplicaCostoPr: 0,
            CostoM: '',
            CostoPr: '',
            CostoConcepM: 0,
            CostoConcepPr: 0,
            Observaciones: '',
            FirmaEncargado: '',
            loading: false,
            checkedCostoM: false,
            checkedCostoPr: false


        });
        Alert.alert(`Se guardaron los datos correctamente`);
        this.props.navegar.navigate('Details')
    }

    render() {
        return (

            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Guarde los cambios antes de salir');
                    }}
                >
                    <ScrollView>
                        <Text style={styles.title}>Formato de Servicio</Text>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Estado inicial del equipo"
                            onChangeText={(EstadoEquipo) => this.setState({ EstadoEquipo })}
                            value={this.state.EstadoEquipo}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Partes a reparar"
                            onChangeText={(PartesReparar) => this.setState({ PartesReparar })}
                            value={this.state.PartesReparar}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Mano de Obra"
                            keyboardType='email-address'
                            onChangeText={(ManoObra) => this.setState({ ManoObra })}
                            value={this.state.ManoObra}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Recursos/Partes Necesarias"
                            keyboardType='email-address'
                            onChangeText={(RepuestosPartes) => this.setState({ RepuestosPartes })}
                            value={this.state.RepuestosPartes}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Observaciones"
                            onChangeText={(Observaciones) => this.setState({ Observaciones })}
                            value={this.state.Observaciones}
                        ></TextInput>


                        <Text style={styles.text}>Costos de Mantenimiento</Text>
                        <View style={styles.checks}>
                            <CheckBox
                                value={this.state.checkedCostoM}
                                onValueChange={() => this.setState({ checkedCostoM: !this.state.checkedCostoM })}
                            >
                            </CheckBox>
                            <Text>¿Aplica costo?</Text>
                        </View>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="$0"
                            keyboardType='email-address'
                            onChangeText={(RepuestosPartes) => this.setState({ RepuestosPartes })}
                            value={this.state.RepuestosPartes}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Descripción del Costo"
                            onChangeText={(Observaciones) => this.setState({ Observaciones })}
                            value={this.state.Observaciones}
                        ></TextInput>


                        <Text style={styles.text}>Costos de Partes/Reparación</Text>
                        <View style={styles.checks}>
                            <CheckBox
                                value={this.state.checkedCostoPr}
                                onValueChange={() => this.setState({ checkedCostoPr: !this.state.checkedCostoPr})}
                            >
                            </CheckBox>
                            <Text>¿Aplica costo?</Text>
                            
                        </View>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="$0"
                            keyboardType='email-address'
                            onChangeText={(RepuestosPartes) => this.setState({ RepuestosPartes })}
                            value={this.state.RepuestosPartes}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Descripción del Costo"
                            onChangeText={(Observaciones) => this.setState({ Observaciones })}
                            value={this.state.Observaciones}
                        ></TextInput>
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
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
                </Modal>
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
    }
});

export default FormatoServicio;
