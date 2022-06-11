import ChatRoomPage from '../screens/ChatRoomPage';
import ChatListPage from '../screens/ChatListPage';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const ChatNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    height: 60,
                }
            }}>
            <Stack.Screen
                name='ChatListPage'
                component={ChatListPage}
                options={{
                    title:'Chats',
                }}
            />
            <Stack.Screen
                name='ChatRoomPage'
                component={ChatRoomPage}
                options={({route}) => ({
                    title: route.params.name,
                    headerRight: () => (
                        <TouchableOpacity style={styles.chatHeader}>
                            <MaterialCommunityIcons name="dots-vertical" size={30}/>
                        </TouchableOpacity>
                    )

                    
                })}
            />
        </Stack.Navigator>
    )
}

export default ChatNavigation;

const styles = StyleSheet.create({
    chatHeader: {
        marginRight: '3%',
    }
})