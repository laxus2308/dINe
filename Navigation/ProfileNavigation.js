import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfilePage from '../screens/ProfilePage';
import UpdateProfilePage from '../screens/UpdateProfilePage'

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'grey', height: 60,
                }
            }}>
            <Stack.Screen
                name='Profile Page'
                component={ProfilePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Update Profile Page'
                component={UpdateProfilePage}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigation;