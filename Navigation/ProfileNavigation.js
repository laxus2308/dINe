import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from '../screens/profile/ProfilePage';
import UpdateProfilePage from '../screens/profile/UpdateProfilePage'

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    height: 60,
                },
                headerShown: false,
            }}>
            <Stack.Screen
                name='Profile Page'
                component={ProfilePage}
            />
            <Stack.Screen
                name='Update Profile Page'
                component={UpdateProfilePage}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigation;