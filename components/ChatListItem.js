import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { supabase } from '../supabase';


const ChatListItem = (props) => {
    const { chatRoom } = props;

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
    const uri = getUri(chatRoom.lastMessage.url)

    return (
        <View style={styles.chatMessageContainer}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: uri }} style={styles.avatar} />
                <View styles={styles.midContainer}>
                    <Text style={styles.username}> {chatRoom.lastMessage.id} </Text>
                    <Text style={styles.content} ellipsizeMode='tail'  numberOfLines={1}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>

            <Text style={styles.time}> {chatRoom.lastMessage.created_at}</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    chatMessageContainer: {
        flexDirection: 'row',
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
    },
    midContainer: {
        justifyContent:'space-around',

    },
    username: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',

    },
    content: {
        marginLeft: '15%',
        color: 'grey',
        

    },
    time: {

    },
})

export default ChatListItem;