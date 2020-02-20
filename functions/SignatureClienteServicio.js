import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { FontAwesome } from '@expo/vector-icons';

class SignatureClienteServicio extends Component {
    constructor(props) {
        super(props);
        this.state = { signature: null };
    }

    handleSignature = signature => {
        this.setState({ signature });
    };

    mandarFirma = () =>{
        this.props.navegar.navigate('formatoS', {firma: this.state.signature});
    }

    render() {
        const style = `.m-signature-pad--footer
        .button {
          background-color: red;
          color: #FFF;
        }`;
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.preview}>
                    {this.state.signature ? (
                        <Image
                            resizeMode={"contain"}
                            style={{ width: 335, height: 114 }}
                            source={{ uri: this.state.signature }}

                        />
                    ) : null}
                    
                </View>
                <TouchableOpacity onPress={this.mandarFirma}>
                        <Text style={styles.button}><FontAwesome name="upload" size={20}/>  Subir Firma</Text>
                    </TouchableOpacity>
                <Signature
                    onOK={this.handleSignature}
                    descriptionText="Firma Cliente"
                    clearText="Borrar"
                    confirmText="Guardar"
                    webStyle={style}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10
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
    }
});

export default SignatureClienteServicio;
