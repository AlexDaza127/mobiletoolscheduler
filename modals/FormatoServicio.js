import React, { Component } from 'react';
import {
    Modal, Text, TouchableHighlight, View, Alert, StyleSheet,
    TouchableOpacity, TextInput, ScrollView, CheckBox
} from 'react-native';



class FormatoServicio extends Component {
    state = {
        modalVisible: true,
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
    };

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
        Alert.alert(`Se guardaron los datos correctamente`);
        this.props.navegar.navigate('Details')
    }

    valorCostos(CostoConcepM) {
        if (!this.state.checkedCostoM) {
            this.setState({
                AplicaCostoM: 0,
                CostoConcepM: '',
                CostoM: ''
            });
        } else {
            this.setState({ CostoConcepM: CostoConcepM });
        }
    }

    render() {
        console.log(this.state)
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

                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder='$0'
                            keyboardType='numeric'
                            onChangeText={(CostoConcepM) => this.setState({ CostoConcepM })}
                            value={this.state.checkedCostoM ? this.state.CostoConcepM : ''}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Descripción del Costo"
                            onChangeText={(CostoM) => this.setState({ CostoM })}
                            value={this.state.checkedCostoM ? this.state.CostoM : ''}
                        ></TextInput>


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
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder='$0'
                            keyboardType='numeric'
                            onChangeText={(CostoConcepPr) => this.setState({ CostoConcepPr })}
                            value={this.state.checkedCostoPr ? this.state.CostoConcepPr : ''}
                        ></TextInput>
                        <TextInput
                            style={[styles.inputs, styles.alinear]}
                            placeholder="Descripción del Costo"
                            onChangeText={(CostoPr) => this.setState({ CostoPr })}
                            value={this.state.checkedCostoPr ? this.state.CostoPr : ''}
                        ></TextInput>
                        <Text style={styles.text}>Firma Cliente</Text>
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
