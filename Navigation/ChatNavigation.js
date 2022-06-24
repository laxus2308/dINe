import ChatRoomPage from '../screens/ChatRoomPage';
import ChatListPage from '../screens/ChatListPage';
import ParticipantsPage from '../screens/ParticipantsPage';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();


const ChatNavigation = () => {
    const navigation = useNavigation();

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
                                    <Text ellipsizeMode='tail'  numberOfLines={1} style={styles.headerText}>  {route.params.name} </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.dots}>
                                <MaterialCommunityIcons name="dots-vertical" size={30} />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <Stack.Screen
                name='ParticipantsPage'
                component={ParticipantsPage}
                options={{
                    title:'Room details',
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
        //height: '30%',
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
    },
    headerText: {
        alignSelf: 'center',
        fontSize: 20,
    },
})