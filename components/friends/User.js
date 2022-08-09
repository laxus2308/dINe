import { useState, useEffect } from 'react';
import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';

const User = (props) => {
    const {User} = props;
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
    const navigator = useNavigation();

    useEffect(() => {
        getDetails();
    })

    const getDetails = async() => {
        const myId = supabase.auth.user();
        try {
            const {data, error} = await supabase.from('profiles').select().eq('id', User.id)
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

    return (
        <View style={styles.requestContainer}>
            <TouchableOpacity onPress={() => navigator.navigate('ViewProfilePage', {screen:'ViewProfilePage', 
                params: { 
                    profile_id: User.id,
                    temp: true,
                    }})}>
                {profileImage == 'https://tkwrepsmafszvjeuppqg.supabase.co/storage/v1/object/public/avatars/null' ? (
                <Image
                    source={require("../../assets/no_profile_pic.png")}
                    style={styles.avatar}
                />
            ) : (
                <Image
                    source={{ uri: profileImage }}
                    style={styles.avatar}
                />
            )}    
            </TouchableOpacity>
            <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigator.navigate('ViewProfilePage', {screen:'ViewProfilePage', 
                params: { 
                    profile_id: User.id,
                    temp: true,
                    }})}>
                <Text style={styles.title}>{username}</Text>
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

export default User;