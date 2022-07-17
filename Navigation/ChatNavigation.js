import ChatRoomPage from '../screens/chat/ChatRoomPage';
import ChatListPage from '../screens/chat/ChatListPage';
import ParticipantsPage from '../screens/chat/ParticipantsPage';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ToastAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';
import ViewProfilePage from '../screens/friends/ViewProfilePage'

const Stack = createNativeStackNavigator();


const ChatNavigation = () => {
    const navigation = useNavigation();

    const remove_chat = async(room_id) => {
        try {
            const { error} = await supabase.rpc('delete_chatroom', {
              chatroom_id: room_id
            })
            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const remove_messages = async() => {
        try {
            const{error: deleteMessageError} = await supabase.rpc('clear_messages')
            if (deleteMessageError) {
                throw deleteMessageError
            }
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }
    
    const exitChat = async (room_id) => {
        await remove_chat(room_id);
        await remove_messages();
        ToastAndroid.show('Chat Deleted!', ToastAndroid.LONG)
        navigation.navigate('Chat', {
            screen: 'ChatListPage'
        });
    }

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
                    title: 'Chats',
                }}
            />
            <Stack.Screen
                name='ViewProfilePage'
                component={ViewProfilePage}
                options={{
                    title: 'View Profile',
                }}
            />
            <Stack.Screen
                name='ChatRoomPage'
                component={ChatRoomPage}
                options={({ route }) => ({
                    header: () => (
                        <View style={styles.chatHeader}>
                            <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('ChatListPage')}>
                                <MaterialCommunityIcons name="keyboard-backspace" size={30} />
                            </TouchableOpacity>

                            <View style={styles.midContainer}>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => navigation.navigate('ParticipantsPage', {
                                    chatRoomId: route.params.id,
                                    chatName: route.params.name
                                })}>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.headerText}>  {route.params.name} </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.dots}>
                                <MaterialCommunityIcons name="dots-vertical" size={40} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dots} onPress={() => exitChat(route.params.id)}>
                                <MaterialCommunityIcons name="exit-to-app" size={40} />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <Stack.Screen
                name='ParticipantsPage'
                component={ParticipantsPage}
                options={{
                    title: 'Room details',
                }}

            />
        </Stack.Navigator >
    )
}

export default ChatNavigation;

const styles = StyleSheet.create({
    chatHeader: {
        flexDirection: 'row',
        backgroundColor: 'yellow',
        width: '100%',

    },
    back: {
        justifyContent: 'center',
        marginLeft: '3%',
    },
    midContainer: {
        flex: 18 / 20,
        // backgroundColor: 'black',
    },
    dots: {
        justifyContent: 'center',
        alignLeft: '5%',
    },
    headerText: {
        alignSelf: 'center',
        fontSize: 20,
    },
})