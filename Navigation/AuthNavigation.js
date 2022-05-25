import React from 'react';
import LoginPage from '../screens/LoginPage';
import ForgetPasswordPage from '../screens/ForgetPasswordPage';
import SignUpPage from '../screens/SignUpPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'grey', height: 60,
                    }
                }}>
                <Stack.Screen
                    name='login page'
                    component={LoginPage}
                    options={{
                        title: "Login"
                    }}
                />
                <Stack.Screen
                    name='forget password page'
                    component={ForgetPasswordPage}
                    options={{
                        title: "Forget your password?"
                    }}
                />
                <Stack.Screen
                    name='sign up page'
                    component={SignUpPage}
                    options={{
                        title: "Sign up now!"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNavigation;