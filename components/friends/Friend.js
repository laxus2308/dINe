import { useState, useEffect } from 'react';
import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';

const Friend = (props) => {
    const { Friend } = props;
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState();
    const [chatId, setChatId] = useState();
    const navigation = useNavigation();

    const user = supabase.auth.user();

    useEffect(() => {
        getDetails();
        // getChat();
    },[])

    const getDetails = async () => {
        try {
            const { data, error } = await supabase.from('profiles').select().eq('id', Friend.second_id)
            if (data) {
                setProfileImage(getProfileUri(data[0].avatar_url))
                setUsername(data[0].username)
            }
            if (error) throw error
        } catch (error) {
            console.log(error)
        }
    }

    const getProfileUri = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('avatars').getPublicUrl(path)
            if (error) {
                throw error
            }
            return publicURL;
        } catch (error) {
            alert(error.message)
        }
    }

    const getChat = async () => {
        try {
            const { data, error } = await supabase
                .from('friend_relations')
                .select('chat_id')
                .match({
                    first_id: user.id,
                    second_id: Friend.second_id
                })
                .single()
            if (data.chat_id == null) {
                await createChat();
            }else {
                setChatId(data.chat_id)
            }
            if (error) throw error
        } catch (error) {
            console.log(error.message)
        }

    }

    const createChat = async () => {
        try {
            const { data, error } = await supabase.rpc('create_chat_room', {
                profile_id: Friend.second_id
            })
            setChatId(data.id)

            if (error) throw error
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        if(chatId) {
            navigation.navigate("Chat", {
                screen: "ChatRoomPage", 
                params: {
                    id: chatId,
                    name: username,
                }})
        }
    },[chatId] )
    // const goToChat = () => {
    //     getChat().then(()=> navigation.navigate("Chat", {
    //         screen: "ChatRoomPage", 
    //         params: {
    //             id: chatId,
    //             name: username,
    //         }}))
    // }

    return (
        <View style={styles.requestContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewProfilePage', {
                screen: 'ViewProfilePage',
                params: {
                    profile_id: Friend.second_id,
                    temp: false,
                }
            })}>
                <Image
                    source={{ uri: profileImage }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ViewProfilePage', {
                    screen: 'ViewProfilePage',
                    params: {
                        profile_id: Friend.second_id,
                        temp: false,
                    }
                })}>
                    <Text style={styles.title}>{username}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer2}>
                <TouchableOpacity onPress={getChat}>
                    <Image source={require('../../assets/chat.png')} style={styles.button} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    requestContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start'
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    textContainer2: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },

    title: {
        fontSize: 12,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: '5%'
    },

    avatar: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },

    button: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginLeft: 8,
        marginRight: 15
    },

});

export default Friend;