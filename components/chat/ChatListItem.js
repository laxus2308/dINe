import React, { useState, } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const ChatListItem = (props) => {
    const { chatRoom } = props;
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    // const [unread, setUnread] = useState();
    const user = supabase.auth.user();

    const getUsername = async (senderId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username')
                .match({
                    id: senderId
                })

            if (error) throw error
            if (data) setUsername(data[0].username)

        } catch (error) {
            // alert(error.message)
            console.log("getUsername", error)
        }
    }

    // const getUnread = async () => {
    //     try {
    //         const { data, error } = await supabase
    //             .from('chat_unread')
    //             .select('unread')
    //             .match({
    //                 room_id: chatRoom.id,
    //                 user_id: user.id,
    //             })

    //         if (error) throw error
    //         if (data) setUnread(data.unread)
    //     } catch (error) {
    //         console.log("getUnread", error)
    //     }
    // }

    let lastMessage = ""
    let sender
    if (chatRoom.sender_id) {
        lastMessage = chatRoom.content
        sender = chatRoom.sender_id
        getUsername(sender)
        // getUnread()
    }

    // useEffect(()=> {
    //     if (chatRoom.sender_id) {
    //         getUsername(sender)
    //         getUnread()
    //     }
    // },[])

    const getChatUri = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('chatroompics').getPublicUrl(path)
            if (error) {
                throw error
            }
            return publicURL;

        } catch (error) {
            // alert('Error downloading image: ', error.message)
            console.log("get chat uri", error)
        }
    }

    //if no url provided
    let uri;

    if (chatRoom.pic_url == null) {
        uri = require('../../assets/BlankImage.png')
    } else {
        uri = getChatUri(chatRoom.pic_url);
    }

    const enterChat = () => {
        navigation.navigate('ChatRoomPage', {
            id: chatRoom.id,
            name: chatRoom.name,
        });
    }

    return (
        <TouchableOpacity style={styles.chatMessageContainer} onPress={enterChat}>
            <View style={styles.leftContainer}>
                {chatRoom.pic_url == null ? (
                    <Image
                        style={styles.avatar}
                        source={require("../../assets/BlankImage.png")}
                    />) : (
                    <Image
                        style={styles.avatar}
                        source={{ uri: uri }}
                    />)
                }
                {chatRoom.sender_id != null ? (
                    <View style={styles.midContainer}>
                        <Text style={styles.username}> {chatRoom.name} </Text>
                        <Text style={styles.content} ellipsizeMode='tail' numberOfLines={1}>{username}: {lastMessage}</Text>
                    </View>
                ) : (
                    <View style={styles.midContainer}>
                        <Text style={styles.username}> {chatRoom.name} </Text>
                    </View>
                )}
            </View>
            {chatRoom.sender_id != null ? (
                <View style={styles.rightContainer}>
                    <Text style={styles.timeWithMessage}> {moment(chatRoom.created_at).fromNow()}</Text>
                    <Text style={styles.unread}> {chatRoom.unread}</Text>
                </View>
            ) : (
                <></>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chatMessageContainer: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'flex-start',
        width: '100%',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    avatar: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    leftContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    midContainer: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: '5%',
        justifyContent: 'space-evenly',
        width:'70%',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        color: 'grey',
        fontSize: 15,
        marginLeft: '2%',
    },
    timeWithMessage: {
        fontSize: 10,
        alignSelf: 'center',
    },
    rightContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width:'20%'
    },
    unread: {
        borderRadius: 40,
        backgroundColor: 'lightblue',
        width: '40%',
        alignSelf: 'center',
        textAlign: 'center',
    }

})

export default ChatListItem;