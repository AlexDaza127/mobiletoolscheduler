import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Button } from 'react-native';

//componentes
import BodyLogin from '../components/Login/BodyLogin'
import BodyLanding from '../components/Views/BodyLanding';
import FormatoServicio from '../modals/FormatoServicio';
import FormatoEntrega from '../modals/FormatoEntrega';
import SignatureCliente from '../functions/SignatureCliente';
import SignatureClienteServ from '../functions/SignatureClienteServicio';



function Login({ navigation }) {
    return (
        <BodyLogin navegar={navigation}></BodyLogin>
    );
}

function formatoServicio({ route,navigation }) {
    const { firma } = route.params;
    return (
       
        <FormatoServicio navegar={navigation}  rutas={{ firma }}></FormatoServicio>
    );
}

function firmaCliente({ navigation }) {
    return (
        <SignatureCliente navegar={navigation}></SignatureCliente>
    );
}

function firmaClienteServicio({ navigation }) {
    return (
        <SignatureClienteServ navegar={navigation}></SignatureClienteServ>
    );
}

function formatoEntrega({ route, navigation }) {
    const { firma } = route.params;
    return (
        <FormatoEntrega navegar={navigation} rutas={{ firma }}></FormatoEntrega>
    );
}

function Landing({ navigation }) {
    return (
        <BodyLanding navegar={navigation}></BodyLanding>

    );
}

function gestorLandings() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Atender Servicio') {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                    }

                    return <Ionicons name={iconName} size={30} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#343a40',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Atender Servicio" component={Landing} />
        </Tab.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Logear" headerMode="none">
                <Stack.Screen
                    name="Logear"
                    component={Login}
                    options={{
                        title: 'Login',
                    }} />
                <Stack.Screen
                    name="Details"
                    component={gestorLandings} />
                <Stack.Screen
                    name="formatoS"
                    component={formatoServicio}
                    initialParams={{ firma: null }} />
                <Stack.Screen
                    name="formatoE"
                    component={formatoEntrega}
                    initialParams={{ firma: null }} />
                <Stack.Screen
                    name="firmaC"
                    component={firmaCliente}
                />
                <Stack.Screen
                    name="firmaCS"
                    component={firmaClienteServicio}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
