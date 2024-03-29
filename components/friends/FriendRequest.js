import { useState, useEffect } from 'react';
import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';

const FriendRequest = (props) => {
    const { friendReq } = props;
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
    const [accepting, setAccepting] = useState(false);
    const [rejecting, setRejecting] = useState(false);
    const navigator = useNavigation();

    useEffect(() => {
        getDetails();
    })

    const getDetails = async () => {
        try {
            const { data, error } = await supabase.from('profiles').select().eq('id', friendReq.requestor_id)
            if (data) {
                setProfileImage(getProfileUri(data[0].avatar_url))
                setUsername(data[0].username)
            }
            if (error) throw error
        } catch (error) {
            alert(error.message)
        }
    }

    const getProfileUri = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('avatars').getPublicUrl(path)
            if (error) throw error
            return publicURL;
        } catch (error) {
            alert('Error downloading image: ', error.message)
        }
    }

    const acceptFriendRequest = async () => {
        const user = supabase.auth.user();
        setAccepting(true)
        try {
            await supabase.from('friend_requests').delete().eq('requestor_id', friendReq.requestor_id)
            const updates = {
                first_id: user.id,
                second_id: friendReq.requestor_id,
            }
            await supabase.from('friend_relations').insert([updates]);
            const updates2 = {
                first_id: friendReq.requestor_id,
                second_id: user.id,
            }
            await supabase.from('friend_relations').insert([updates2]);
        } catch (error) {
            alert(error.message)
        } 
    }

    const declineFriendRequest = async () => {
        setRejecting(true)
        try {
            const { error } = await supabase.from('friend_requests').delete().eq('requestor_id', friendReq.requestor_id)
            if (error) throw error
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={styles.requestContainer}>
            <TouchableOpacity onPress={() => navigator.navigate('ViewProfilePage', {
                screen: 'ViewProfilePage',
                params: {
                    profile_id: friendReq.requestor_id,
                    temp: false,
                }
            })}>
                <Image
                    source={{ uri: profileImage }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigator.navigate('ViewProfilePage', {
                    screen: 'ViewProfilePage',
                    params: {
                        profile_id: friendReq.requestor_id,
                        temp: false,
                    }
                })}>
                    <Text style={styles.title}>{username}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer2}>
                <TouchableOpacity onPress={acceptFriendRequest} disabled={accepting}>
                    <Image source={require('../../assets/greentick.png')} style={styles.button} />
                </TouchableOpacity>
                <TouchableOpacity onPress={declineFriendRequest} disabled={rejecting}>
                    <Image source={require('../../assets/redcross.png')} style={styles.button} />
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