import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#e20613" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})
export default Loader;