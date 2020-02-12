import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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

// function otras(){
//     return(
//         <View>
//             <Text>Hola mundo!</Text>
//         </View>
//     );
// }

function gestorLandings() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Atender Servicio') {
                iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
              } 
            //   else if (route.name === 'otras') {
            //     iconName = focused ? 'ios-list-box' : 'ios-list';
            //   }
    
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={30} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#343a40',
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Atender Servicio" component={Landing} />
            {/* <Tab.Screen name="otras" component={otras} /> */}
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
