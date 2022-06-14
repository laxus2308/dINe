import React from 'react';
import RequestBoard from '../screens/RequestBoard';
import CreateRequestPage from '../screens/CreateRequestPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewRequestPage from '../screens/ViewRequestPage'

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
          </Stack.Navigator>
    );
}


export default RequestNavigation
