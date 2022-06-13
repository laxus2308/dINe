import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { supabase } from '../supabase';
import { useNavigation } from '@react-navigation/native';


const ChatListItem = (props) => {
    const { chatRoom } = props;
    const navigation = useNavigation();

    const getUri = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('avatars').getPublicUrl(path)
            if (error) {
                throw error
            }
            return publicURL;

        } catch (error) {
            alert('Error downloading image: ', error.message)
        }
    }
    const uri = getUri(chatRoom.avatar_url[0].Avatar_url);

    const enterChat = () => {
        navigation.navigate('ChatRoomPage', {
            id: chatRoom.id,
            name: chatRoom.name,
        });
    }

    return (
        <TouchableOpacity style={styles.chatMessageContainer} onPress={enterChat}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: uri }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}> {chatRoom.name} </Text>
                    {/* <Text style={styles.content} ellipsizeMode='tail'  numberOfLines={1}>{chatRoom.lastMessage.content}</Text> */}
                </View>
            </View>

            {/* <Text style={styles.time}> {chatRoom.lastMessage.created_at}</Text> */}
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
    },
    time: {
        marginTop: '8%',
        marginRight:'3%',
    },
})

export default ChatListItem;