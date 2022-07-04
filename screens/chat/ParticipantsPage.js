//to display a list of participants in the grp chat
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { supabase } from '../../supabase';
import { useRoute } from '@react-navigation/native';

const ParticipantsPage = ({navigation}) => {
    const [participants, setParticipants] = useState(null);

    const route = useRoute();
    const chatRoomId = route.params.chatRoomId;
    const chatName = route.params.chatName;

    //check for real time updates
    useEffect(() => {
        const sub = supabase
            .from('room_participants')
            .on('*', async (update) => {
                await getParticipantsData()
            })
            .subscribe();
        return () => {
            supabase.removeSubscription(sub)
        }
        
    }, [])

    //get participants data upon first navigate
    useEffect(() => {
        getParticipantsData();
    }, [])

    const getParticipantsData = async () => {
        try {
            const { data, error } = await supabase
                .from('room_participants')
                .select(`
                username: profiles(username),
                avatar_url: profiles(avatar_url),
                profile_id
            `)
                .eq('room_id', chatRoomId)

            //console.log(data)
            setParticipants(data)
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
            alert('Error downloading image: ', error.message)
        }
    }

    const displayProfile = (profile) => {
        const profileUri = getProfileUri(profile.avatar_url.avatar_url)
        const username = profile.username.username;

        return (
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: profileUri }}
                    style={styles.avatar}
                />
                <View style={styles.usernameContainer}>
                    <TouchableOpacity style={{flex:1}} onPress={() => navigation.navigate('ViewProfilePage', {screen:'ViewProfilePage', 
                    params: { 
                        profile_id: profile.profile_id,
                        temp: true,
                    }})}>
                        <Text style={styles.username}>{username} </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    const flatListHeader = () => {
        return (
            <View style={styles.flatListHeader}>
                <Text style={styles.header}> Room Participants: </Text>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.chatName}>{chatName} </Text>
            <FlatList
                data={participants}
                renderItem={({ item }) => displayProfile(item)}
                ListHeaderComponent={flatListHeader}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
    },
    avatar: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    },
    usernameContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: '10%',
    },
    username: {
        fontSize: 25,

    },
    flatListHeader: {
        width: '100%',
        marginTop: '10%',
        // alignItems:'center',
    },
    header: {
        fontSize: 25,
    },
    chatName: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

export default ParticipantsPage;