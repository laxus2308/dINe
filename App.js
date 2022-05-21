import React from 'react';
import LoginPage from './screens/LoginPage';
import ForgetPasswordPage from './screens/ForgetPasswordPage';
import SignUpPage from './screens/SignUpPage';
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
                <Stack.Screen
                    name='sign up page'
                    component={SignUpPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;