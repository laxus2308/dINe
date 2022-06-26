import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';


const ChatListItem = (props) => {
    const { chatRoom } = props;
    const navigation = useNavigation();

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
        uri = require ('../../assets/BlankImage.png')
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
                { chatRoom.pic_url == null ? (
                    <Image
                    style={styles.avatar}
                    source={uri}
                />) : (
                    <Image
                    style={styles.avatar}
                    source={{ uri: uri }}
                /> )
                }
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
        marginRight: '3%',
    },
})

export default ChatListItem;