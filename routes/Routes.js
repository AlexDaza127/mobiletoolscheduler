import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';

//componentes
import BodyLogin from '../components/Login/BodyLogin'
import BodyLanding from '../components/Views/BodyLanding';


function Login({ navigation }) {
    return (
        <BodyLogin navegar={navigation}></BodyLogin>
    );
}

function Landing({ navigation }) {
    return (
        <BodyLanding navegar={navigation}></BodyLanding>

    );
}

function otras(){
    return(
        <View>
            <Text>Hola mundo!</Text>
        </View>
    );
}
function gestorLandings() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Landing" component={Landing} />
            <Tab.Screen name="otras" component={otras} />
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
