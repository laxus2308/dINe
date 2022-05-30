import React from 'react';
import AccountPage from '../screens/AccountPage';
import HomePage from '../screens/HomePage';
import ProfilePage from '../screens/ProfilePage';
import ChatPage from '../screens/ChatPage';
import RequestBoard from '../screens/RequestBoard';
import MatchingPage from '../screens/MatchingPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from '../supabase';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'grey', height: 60,
                    }
                }}>
                <Stack.Screen
                    name='Account Page'
                    component={AccountPage}
                    options={{
                        title: "Account Page"
                    }}
                />
                <Stack.Screen
                    name='Home Page'
                    component={TabRoutes}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const DrawerRoutes = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
            return (
                <DrawerContentScrollView {...props} >
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" onPress={async () => await supabase.auth.signOut()} />
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="Profile" component={ProfilePage} />
        </Drawer.Navigator>
    );
}

const TabRoutes = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={DrawerRoutes} options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Request Board" component={RequestBoard} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Matching" component={MatchingPage} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Chat" component={ChatPage} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="chat" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    );
}

export default HomeNavigation;