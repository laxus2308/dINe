import React, { useState } from 'react';
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
    const [unread, setUnread] = useState();
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
            alert(error.message)
        }
    }

    const getUnread = async() => {
        try {
            const { data, error } = await supabase
            .from('chat_unread')
            .select('unread')
            .match({
                room_id: chatRoom.id,
                user_id: user.id,
            })
            .single()
       
            if (error) throw error
            // console.log(data)
            if (data) setUnread(data.unread)
        } catch (error) {
            alert(error.message)
            // console.log('error', error)
        }
    }

    let lastMessage = ""
    let sender
    if (chatRoom.message) {
        lastMessage = chatRoom.message.content
        sender = chatRoom.message.sender_id
        getUsername(sender)
        getUnread()
    }

    const getRequestUri = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('requestpics').getPublicUrl(path)
            if (error) {
                throw error
            }
            return publicURL;

        } catch (error) {
            alert('Error downloading image: ', error.message)
        }
    }

    //if no url provided
    let uri;

    if (chatRoom.pic_url == null) {
        uri = require('../../assets/BlankImage.png')
    } else {
        uri = getRequestUri(chatRoom.pic_url);
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
                        source={uri}
                    />) : (
                    <Image
                        style={styles.avatar}
                        source={{ uri: uri }}
                    />)
                }
                {chatRoom.message != null ? (
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
            {chatRoom.message != null ? (
                <View style = {styles.rightContainer}>
                    <Text style={styles.timeWithMessage}> {moment(chatRoom.message.created_at).fromNow()}</Text>
                    <Text> {unread}</Text>
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
        // marginTop: '10%',
        marginRight: '3%',
        flex: 1 / 4,
        fontSize: 10,
    },
    rightContainer: {
        flexDirection:'column',
        justifyContent:'space-around',

    }
})

export default ChatListItem;