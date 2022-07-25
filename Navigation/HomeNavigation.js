import React, {useState} from 'react';
import { StyleSheet, Alert, ToastAndroid } from 'react-native';
import HomePage from '../screens/auth/HomePage';
import ProfileNavigation from './ProfileNavigation';
import ChatNavigation from '../Navigation/ChatNavigation';
import RequestNavigation from './RequestNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from '../supabase';
import MatchingNavigation from './MatchingNavigation';
import ViewProfilePage from '../screens/friends/ViewProfilePage';

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
                    name='Home Page'
                    component={TabRoutes}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ViewProfilePage'
                    component={ViewProfilePage}
                    options={{
                        title: 'View Profile',
                        headerStyle: {
                            backgroundColor: 'white'
                          },
                    }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const DrawerRoutes = () => {
    const [disabled, setDisabled] = useState(false)

    const Logout = () => {
        return Alert.alert(
          "Log Out?",
          "Are you sure you want to log out? ",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: async () => {
                setDisabled(true)
                await supabase.auth.signOut()
                ToastAndroid.show('Logged out!', ToastAndroid.LONG)
              },
              disabled: disabled,
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };
    
    return (
        <Drawer.Navigator initialRouteName="Home" useLegacyImplementation={true} drawerContent={props => {
            return (
                <DrawerContentScrollView {...props} >
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" onPress={Logout} />
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="Profile" component={ProfileNavigation} />
        </Drawer.Navigator>
    );
}

const TabRoutes = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home Screen" component={DrawerRoutes} options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Request Screen" style={styles.header} component={RequestNavigation} options={{tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
          ), headerShown: false}}/> 
            <Tab.Screen name="Matching" style={styles.header} component={MatchingNavigation} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={size} />
                ), headerShown: false
            }} />
            <Tab.Screen name="Chat" component={ChatNavigation} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="chat" color={color} size={size} />
                ),
                headerShown: false,
            }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
    },

    button: {
        flex: 1,
    },

    image: {
        flex: 0.5,
        resizeMode: 'contain',
        marginTop: '10%',
        marginHorizontal: '-125%',
        flexDirection: 'row'
    }
})

export default HomeNavigation;