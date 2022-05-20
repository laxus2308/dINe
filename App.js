import React from 'react';
import LoginPage from './screens/LoginPage';
import ForgetPasswordPage from './screens/ForgetPasswordPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='login page'
                    component={LoginPage}
                />
                <Stack.Screen
                    name='forget password page'
                    component={ForgetPasswordPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;