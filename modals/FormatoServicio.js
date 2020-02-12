import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, StyleSheet, TouchableOpacity,TextInput } from 'react-native';

class FormatoServicio extends Component {
    state = {
        modalVisible: false,
        estado:'',
        partes:'',
        obra:'',
        obs:'',
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
            loading: false

        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Guarde los cambios antes de salir');
                    }}>
                    
                    <View style={{ marginTop: 22 }}>
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
                        placeholder="Observaciones"
                        onChangeText={(RepuestosPartes) => this.setState({ RepuestosPartes })}
                        value={this.state.RepuestosPartes}
                    ></TextInput>
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                                <Text style={styles.button}> Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true);
                }}>
                    <Text style={styles.button}> Registrar Datos</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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
    },title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomColor:'gray',
        borderBottomWidth: 1
    }
});

export default FormatoServicio;
