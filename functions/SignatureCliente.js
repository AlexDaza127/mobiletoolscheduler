import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { FontAwesome } from '@expo/vector-icons';


class SignatureCliente extends Component {
    constructor(props) {
        super(props);
        this.state = { signature: null };
    }


    mandarFirma = (signature) => {
        this.props.navegar.navigate('formatoE', { firma: signature });
    }

    render() {
        const style = `
            .m-signature-pad--footer .button {
            background-color: red;
            color: #FFF;
            };
        `;
        return (
            <View style={{ flex: 1 }}>
                <Signature
                    onOK={this.mandarFirma}
                    descriptionText="Firma Cliente"
                    clearText="Borrar"
                    confirmText="Guardar"
                    webStyle={style}
                />
            </View>
        );
    }
}


export default SignatureCliente;
