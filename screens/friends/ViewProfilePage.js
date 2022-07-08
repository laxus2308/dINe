import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image
} from 'react-native';
import { supabase } from '../../supabase';
import { useRoute } from '@react-navigation/native';

const ViewProfilePage = () => {
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [faculty, setFaculty] = useState('');
    const [age, setAge] = useState('');
    const [dietary, setDietary] = useState('');
    const [interests, setInterests] = useState('');
    const [cuisines, setCuisines] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [isPendingRequest, setIsPendingRequest] = useState(false);
    const [isFriends, setisFriends] = useState(false);

    const getProfile = async () => {
        console.log(route.params.params.profile_id)
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select()
                .eq('id', route.params.params.profile_id)


            if (data) {
                setProfilePic(getProfileUri(data[0].avatar_url));
                setUsername(data[0].username)
                setFaculty(data[0].faculty)
                setAge(data[0].age)
                setDietary(data[0].dietary)
                setInterests(data[0].interests)
                setCuisines(data[0].cuisines)
            } 
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    //check for real time updates
    useEffect(() => {
        const sub = supabase
            .from('profiles')
            .on('*', async (update) => {
                await getProfile()
            })
            .subscribe();
        return () => {
            supabase.removeSubscription(sub)
        }
        
    }, [])

    useEffect(() => {
        const sub = supabase
            .from('friend_relations')
            .on('*', async (update) => {
                await checkFriend()
            })
            .subscribe();
        return () => {
            supabase.removeSubscription(sub)
        }
        
    }, [])

    useEffect(() => {
        const sub = supabase
            .from('friend_requests')
            .on('*', async (update) => {
                await checkIfPendingRequest();
            })
            .subscribe();
        return () => {
            supabase.removeSubscription(sub)
        }
        
    }, [])

    const tag = ({ item }) => (
        <View style={styles.tag}>
            <Text> {item} </Text>
        </View>
    )

    const listHeaderComponent = (item) => (
        <Text style={{ marginTop: 5, alignSelf: 'flex-start' }}>
            {item}
        </Text>
    )

    useEffect(() => {
        getProfile();
    }, [])

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

    useEffect(() => {
        checkIfPendingRequest();
    }, [])

    useEffect(() => {
        checkFriend();
    }, [])

    const checkIfPendingRequest = async() => {
        try {
            const user = supabase.auth.user()
            const {data, error} = await supabase.from('friend_requests').select().eq('requestor_id', user.id).eq('secondary_id', route.params.params.profile_id);
            if (data.length != 0) {
                setIsPendingRequest(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkFriend = async() => {
        try {
            const user = supabase.auth.user()
            const {data, error} = await supabase.from('friend_relations').select().eq('first_id', user.id).eq('second_id', route.params.params.profile_id);
            console.log(data)
            if (data.length != 0) {
                setisFriends(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sendFriendRequest = async() => {
        try {
            const user = supabase.auth.user()
            const {data, error} = await supabase.from('friend_requests').select()
            .eq('secondary_id', user.id)
            .eq('requestor_id', route.params.params.profile_id);
            if (data.length != 0) {
                await supabase.from('friend_requests').delete()
                .eq('secondary_id', user.id)
                .eq('requestor_id', route.params.params.profile_id);
                const updates = {
                    first_id: user.id,
                    second_id: route.params.params.profile_id,
                }
                await supabase.from('friend_relations').insert([updates]);
                const updates2 = {
                    first_id: route.params.params.profile_id,
                    second_id: user.id,
                }
                await supabase.from('friend_relations').insert([updates2]);
            } else {
                const updates = {
                    requestor_id: user.id,
                    secondary_id: route.params.params.profile_id,
                }
                await supabase.from('friend_requests').insert([updates]);
                setIsPendingRequest(true);
                alert("Friend Request Sent!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Image
                    source={{ uri: profilePic }}
                    style={styles.avatar}
                />
                <Text style={styles.profileDescription}> Name: {username}</Text>
                <Text style={styles.profileDescription}> Faculty: {faculty}</Text>
                <Text style={styles.profileDescription}> Age: {age}</Text>
                <Text style={styles.profileDescription}> Dietary: {dietary}</Text>
                <View style={{ height: 70 , marginTop:'5%'}}>
                    <FlatList
                        style={styles.flatList}
                        data={interests}
                        renderItem={tag}
                        keyExtractor={item => item.toString()}
                        horizontal={true}
                        ListHeaderComponent={item => <Text style={styles.container}>Interests</Text>}
                    />
                    <FlatList
                        style={styles.flatList}
                        data={cuisines}
                        renderItem={tag}
                        keyExtractor={item => item.toString()}
                        horizontal={true}
                        ListHeaderComponent={item => listHeaderComponent('Preferred Cuisines: ')}
                    />
                </View>
                <View>
                    {(() => {
                        if (route.params.params.temp) {
                            if (isFriends) {
                                return (
                                    <Text style={styles.FriendText}>Already Friends</Text>
                                )
                            } else if (isPendingRequest) {
                                return (
                                    <Text style={styles.FriendText}>Friend Request Sent</Text>
                                )
                            } else {
                                return (
                                    <TouchableOpacity style={styles.Button} onPress={sendFriendRequest}>
                                        <Text style={styles.text}> Send Friend Request </Text>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    })()}
                </View>
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    FriendText: {
        marginTop: '10%',
        fontWeight: 'bold'
    },
    
    Button: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#ffff00",
    },

    Button2: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#696969",
    },

    container: {
        alignItems: 'center',
        flex: 1,
    },
    profileDescription: {
        marginTop: '5%',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    tag: {
        backgroundColor: 'lightblue',
        padding: 5,
        height:'80%',
        borderRadius: 25,
        marginLeft: 10,
    },
    flatList : {
        flex: 1,
        marginLeft:'10%',

    },
    avatar: {
        marginBottom: 30,
        marginTop: 20,
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },

});


export default ViewProfilePage;