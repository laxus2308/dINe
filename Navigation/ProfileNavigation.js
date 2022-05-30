import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfilePage from '../screens/ProfilePage';
import UpdateProfilePage from '../screens/UpdateProfilePage'

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'grey', height: 60,
                    }
                }}>
                <Stack.Screen
                    component={ProfilePage}
                />
                <Stack.Screen
                    name='UpdateProfilePage'
                    component={UpdateProfilePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ProfileNavigation;