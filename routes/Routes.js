import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
                    component={Landing} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
