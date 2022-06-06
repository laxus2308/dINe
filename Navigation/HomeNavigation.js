import React from 'react';
import AccountPage from '../screens/AccountPage';
import HomePage from '../screens/HomePage';
import ProfilePage from '../screens/ProfilePage';
import ChatPage from '../screens/ChatPage';
import RequestBoard from '../screens/RequestBoard';
import MatchingPage from '../screens/MatchingPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestNavigation from './RequestNavigation';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Styles from '../Style';

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
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="Profile" component={ProfilePage} />
        </Drawer.Navigator>
    );
}

const TabRoutes = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={DrawerRoutes} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),}}/>
        <Tab.Screen name="Request Board" style={styles.header} component={RequestNavigation} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
          ), headerRight: () => (
            <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
                <Image style={styles.image} source={require("../assets/create.png")}/>
            </TouchableOpacity>
        ),}}/> 
        <Tab.Screen name="Matching" component={MatchingPage} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size}/>
        ), }} />
        <Tab.Screen name="Chat" component={ChatPage} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size}/>
        ), }} />
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        flex:1,
    },

    button: {
        flex:1,
    },

    image: {
        flex: 0.5,
        resizeMode:'contain',
        marginTop:'10%',
        marginHorizontal:'-125%',
        flexDirection:'row'
    }
})


export default HomeNavigation;