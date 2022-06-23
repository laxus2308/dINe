import React from 'react';
import RequestBoard from '../screens/RequestBoard';
import CreateRequestPage from '../screens/CreateRequestPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewRequestPage from '../screens/ViewRequestPage'
import ViewOwnRequestPage from '../screens/ViewOwnRequestPage';
import EditRequestPage from '../screens/EditRequestPage';

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
                  component={CreateRequestPage}
                  options={{
                      headerTitle: "Create Request",
              }}
              />
              <Stack.Screen
                  name='View Request'
                  component={ViewRequestPage}
                  options={{
                      headerTitle: "View Request",
              }}
              />
              <Stack.Screen
                  name='View Own Request'
                  component={ViewOwnRequestPage}
                  options={{
                      headerTitle: "Your Requests",
              }}
              />
              <Stack.Screen
                  name='Edit Request'
                  component={EditRequestPage}
                  options={{
                      headerTitle: "Edit Request",
              }}
              />
          </Stack.Navigator>
    );
}


export default RequestNavigation
