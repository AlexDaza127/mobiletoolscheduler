import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../../functions/api';
import Loader from '../../functions/Loader';

class BodyLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['N° Solicitud', 'Tipo de Solicitud', 'Cliente', 'Sede', 'Dirección', 'Persona de Contacto', 'Teléfono', 'Fecha', 'Serial', 'Tipo máquina', 'Marca', 'Referencia', 'Gestionar'],
            widthArr: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
            data: [],
            loading: false
        }
    }

    solicitudGestiones(id, tipo) {
        if (tipo === 1) {
            this.props.navegar.navigate('formatoE', { id });
        } else {
            this.props.navegar.navigate('formatoS', { id });
        }
    }

    componentDidMount() {
        this.traerSolicitudesPendientes();
    }

    async traerSolicitudesPendientes() {
        try {
            this.setState({ loading: true });
            const datos = await api('GET', 'solicitudes-movil/lista-servicios');
            if (datos.estado) {
                const tablaSolicitudes = this.llenarTabla(datos.data);
                this.setState({ data: tablaSolicitudes });
            }
            this.setState({ loading: false });
        } catch (error) {
        }
    }

    llenarTabla(datos) {
        const arraySolicitudes = datos.map((solicitud) => {
            const arregloSolicitud = [
                solicitud.id,
                solicitud.TipoSolicitud,
                solicitud.cliente,
                solicitud.sede,
                solicitud.Direccion,
                solicitud.ContactoSede,
                solicitud.TelefonoSede,
                solicitud.fecha,
                solicitud.Serial,
                solicitud.TipoMaquina,
                solicitud.Marca,
                solicitud.Referencia,
                <TouchableOpacity onPress={() => this.solicitudGestiones(solicitud.idSolicitudesDet, solicitud.TipoServicio)}>
                    <View style={styles.btn}>
                        <Text style={styles.text}><MaterialCommunityIcons name="teach" size={28}></MaterialCommunityIcons ></Text>
                    </View>
                </TouchableOpacity>
            ]
            return arregloSolicitud;
        });
        return arraySolicitudes;
    }

    render() {
        if (this.state.loading) {
            return <Loader />;
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textTitulo}>Solicitudes Asignadas</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.tables}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                <Row
                                    data={this.state.tableHead}
                                    widthArr={this.state.widthArr}
                                    style={styles.header}
                                    textStyle={styles.textHeader} />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                    {
                                        this.state.data.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={this.state.widthArr}
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

//Estilos de diseño para el front-end movil
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