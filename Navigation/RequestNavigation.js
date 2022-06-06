import React from 'react';
import {Button} from 'react-native';
import AccountPage from '../screens/AccountPage';
import HomePage from '../screens/HomePage';
import ProfilePage from '../screens/ProfilePage';
import ChatPage from '../screens/ChatPage';
import RequestBoard from '../screens/RequestBoard';
import CreateRequest from '../screens/CreateRequest'
import MatchingPage from '../screens/MatchingPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const RequestNavigation = () => {
    return (
          <Stack.Navigator
              screenOptions={{
                  headerStyle: {
                      backgroundColor: 'white', height: 60,
                  }
              }}>
              <Stack.Screen
                  name='Request Board'
                  component={RequestBoard}
                  options={{
                      headerTitle: "Request Board",
              }}/>
              <Stack.Screen
                  name='Create Request'
                  component={CreateRequest}
                  options={{
                      headerTitle: "CreateRequest",
                      headerShown:false
              }}
              />
          </Stack.Navigator>
    );
  }


export default RequestNavigation
  