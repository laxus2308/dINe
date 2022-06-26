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
    const roomId = route.params.params.chatId;
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        getMatchDetails();
    }, []);

    const getMatchDetails = async () => {
        try {
            let {data, error} = await supabase.from('profiles').select().eq('id', matchId);

            setUsername(data[0].username);
            setProfilePic(getProfileUri(data[0].avatar_url));

            console.log(data)

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

    const enterRoom = () => {
        navigation.navigate('Chat', {screen:'ChatRoomPage', params: {
            id:roomId,
            name:chatName,
          }})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.content}>
                {username}
            </Text>
            <Image
                source={{ uri: profilePic }}
                style={styles.avatar}
            />
            {/* <Button style={styles.content}
                title= 'Join Chat'
                color= 'purple'
                //onPress={};
            /> */}
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

})


export default MatchFoundPage;