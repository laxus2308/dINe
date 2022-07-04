import { useState, useEffect } from 'react';
import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';

const FriendRequest = (props, {navigation}) => {
    const {FriendReq} = props;
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
    const navigator = useNavigation();

    useEffect(() => {
        getDetails();
    })

    const getDetails = async() => {
        try {
            const {data, error} = await supabase.from('profiles').select().eq('id', FriendReq.requestor_id)
            if (data) {
                setProfileImage(getProfileUri(data[0].avatar_url))
                setUsername(data[0].username)
            }
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
            alert('Error downloading image: ', error.message)
        }
    }

    const acceptFriendRequest = async() => {
        const user = supabase.auth.user();
        try {
            await supabase.from('friend_requests').delete().eq('requestor_id', FriendReq.requestor_id)
            const updates = {
                first_id: user.id,
                second_id: FriendReq.requestor_id,
            }
            await supabase.from('friend_relations').insert([updates]);
        } catch (error) {
            console.log(error)
        }
    }

    const declineFriendRequest = async() => {
        try {
            const {data, error} = await supabase.from('friend_requests').delete().eq('requestor_id', FriendReq.requestor_id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.requestContainer}>
            <TouchableOpacity onPress={() => navigator.navigate('ViewProfilePage', {screen:'ViewProfilePage', 
                params: { 
                    profile_id: FriendReq.requestor_id,
                    temp: false,
                    }})}>
            <Image
                source={{ uri: profileImage }}
                style={styles.avatar}
            />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigator.navigate('ViewProfilePage', {screen:'ViewProfilePage', 
                params: { 
                    profile_id: FriendReq.requestor_id,
                    temp: false,
                    }})}>
                    <Text style={styles.title}>{username}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer2}>
            <TouchableOpacity onPress={acceptFriendRequest}> 
                <Image source={require('../../assets/greentick.png')} style = {styles.button} />          
            </TouchableOpacity>
            <TouchableOpacity onPress={declineFriendRequest}> 
                <Image source={require('../../assets/redcross.png')} style = {styles.button} />          
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

export default FriendRequest;