import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuickMatchPage from '../screens/match/QuickMatchPage'
import SpecificMatchPage from '../screens/match/SpecificMatchPage';
import MatchingPage from '../screens/match/MatchingPage';
import MatchFoundPage from '../screens/match/MatchFoundPage';


const Stack = createNativeStackNavigator();

const MatchingNavigation = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'white', height: 60,
                }
            }}>
            <Stack.Screen
                name='Matching Page'
                component={MatchingPage}
                options={{
                    headerTitle: "Matching",
            }}/>
            <Stack.Screen
                name='Match Found'
                component={MatchFoundPage}
                options={{
                    headerTitle: "Match Found!",
            }}/>
            <Stack.Screen
                name='Quick Match Page'
                component={QuickMatchPage}
                options={{
                    headerTitle: "Quick Match Page",
            }}/>
            <Stack.Screen
                name='Specific Match Page'
                component={SpecificMatchPage}
                options={{
                    headerTitle: "Specific Match Page",
            }}/>
        </Stack.Navigator>
    );
}

export default MatchingNavigation;