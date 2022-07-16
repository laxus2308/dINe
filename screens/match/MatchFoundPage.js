import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Button,
    Image
} from 'react-native';
import { supabase } from '../../supabase';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const MatchFoundPage = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const matchId = route.params.params.id;
    // const roomId = route.params.params.chatId;
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [chatName, setChatName] = useState();
    const [chatId, setChatId] = useState();
    const [click, setClick] = useState(false);
    const user = supabase.auth.user();

    useEffect(() => {
        getMatchDetails();
    }, []);

    const getMatchDetails = async () => {
        try {
            let {data, error} = await supabase.from('profiles').select().eq('id', matchId);

            setUsername(data[0].username);
            setProfilePic(getProfileUri(data[0].avatar_url));

            // console.log(data)
            if (error) {
                throw error
            }

        } catch (error) {
            console.log(error);
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
            alert('Error downloading image: ', error.message)
        }
    }

    const getChat = async () => {
        try {
            setClick(true)
            const { data, error } = await supabase
                .from('friend_relations')
                .select('chat_id, chat_rooms(name)')
                .match({
                    first_id: user.id,
                    second_id: matchId
                })
                .single()
            if (data.chat_id == null) {
                await createChat();
            }else {
                setChatId(data.chat_id)
                setChatName(data.chat_rooms.name)
            }
            if (error) throw error
        } catch (error) {
            console.log(error.message)
        }

    }

    const createChat = async () => {
        try {
            const { data, error } = await supabase.rpc('create_chat_room', {
                profile_id: matchId
            })
            setChatId(data.id)
            setChatName(data.name)

            if (error) throw error
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        if(chatId) {
            // console.log(chatName,"chatname")
            setClick(false)
            navigation.navigate("Chat", {
                screen: "ChatRoomPage", 
                params: {
                    id: chatId,
                    name: chatName,
                }})
        }
    },[chatId, chatName,click] )
    // const enterRoom = () => {
    //     navigation.navigate('Chat', {screen:'ChatRoomPage', params: {
    //         id:roomId,
    //         name:chatName,
    //       }})
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.content}>
                {username}
            </Text>
            <Image
                source={{ uri: profilePic }}
                style={styles.avatar}
            />
            <TouchableOpacity onPress={getChat}>
                    <Image source={require('../../assets/chat.png')} style={styles.button} />
                </TouchableOpacity>
            {/* <Button style={styles.content}
                title= 'Join Chat'
                color= 'purple'
                //onPress={};
            /> */}
            <Text>
                Click to chat with your new match!
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8dc',
        alignItems:'center',
        justifyContent:'center'
    },

    content: {
        marginTop: '5%',
        fontSize: 30,
        fontStyle: 'italic',
        marginBottom: '3%',
    },

    avatar: {
        marginBottom: 30,
        marginTop: 20,
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    button: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        marginLeft: 8,
        marginRight: 15,
        marginBottom: 10
    },

})


export default MatchFoundPage;