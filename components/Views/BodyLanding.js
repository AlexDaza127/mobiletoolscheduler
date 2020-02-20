import React, { Component } from 'react';
import { Modal, StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text, Button } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FormatoServicio from '../../modals/FormatoServicio';


class BodyLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['N° Solicitud', 'Cliente', 'Sede', 'Dirección', 'Persona de Contacto','Número','Fecha','Serial','Marca', 'Referencia','Tipo de Solicitud','Gestionar'],
            widthArr: [200, 200, 200, 200,200, 200, 200, 200,200, 200, 200, 200]
        }
    }

    solicitudGestiones(i) {
        if (i === 2) {
            this.props.navegar.navigate('formatoS');
        } else {
            this.props.navegar.navigate('formatoE');
        }
    }

    render() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < 10; i += 1) {
            const rowData = [];
            for (let j = 0; j < 15; j += 1) {
                //rowData.push(`${i}${j}`);
                rowData.push(j === 11 ?
                    <TouchableOpacity onPress={() => this.solicitudGestiones(i)}>
                        <View style={styles.btn}>
                            <Text style={styles.text}><MaterialCommunityIcons name="teach" size={28}></MaterialCommunityIcons >{i}</Text>
                        </View>
                    </TouchableOpacity> : `${i}${j}`
                );
            }
            tableData.push(rowData);
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textTitulo}>Solicitudes Asignadas</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.tables}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                <Row
                                    data={state.tableHead}
                                    widthArr={state.widthArr}
                                    style={styles.header}
                                    textStyle={styles.textHeader} />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                    {
                                        tableData.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={state.widthArr}
                                                style={[styles.row, index % 2 && { backgroundColor: '#FFF' }]}
                                                textStyle={styles.text}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
        marginTop: 30
    },
    header: {
        height: 50,
        backgroundColor: '#e20613'
    },
    text: {
        textAlign: 'center',
        fontWeight: '100'
    },
    textTitulo: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20,
        borderBottomColor: '#c2c2c2',
        paddingBottom: 5,
        borderBottomWidth: 0.5
    },
    textHeader: {
        textAlign: 'center',
        color: 'white',
        fontWeight: "bold",
        fontSize: 15
    },
    dataWrapper: {
        marginTop: -1
    },
    tables: {
        marginTop: 20
    },
    row: {
        height: 40,
        backgroundColor: '#f3f3f3'
    }
});

export default BodyLanding;