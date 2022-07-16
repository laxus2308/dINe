//to display a list of participants in the grp chat
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
} from 'react-native';
import { supabase } from '../../supabase';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ParticipantsPage = ({ navigation }) => {
    const [participants, setParticipants] = useState(null);
    const [image, setImage] = useState(null);
    const [hasUrl, setHasUrl] = useState(false);
    const [url, setUrl] = useState();
    const route = useRoute();
    const chatRoomId = route.params.chatRoomId;
    const [chatName, setChatName] = useState(route.params.chatName);
    const [edit, setEdit] = useState(false);

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
        // const uri = (async() => await getExistingImage())();
        getExistingImage()
    }, [])

    useEffect(() => {
        if (url) {
            // console.log(url)
            setHasUrl(false)
            downloadImage(url)
        }
    }, [url])

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        })();
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
        const user = supabase.auth.user();

        return (
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: profileUri }}
                    style={styles.avatar}
                />
                {(() => {
                    if (user.id == profile.profile_id) {
                        return (
                            <View style={styles.usernameContainer}>
                                <Text style={styles.username}>{username} </Text>
                            </View>
                        )
                    } else {
                        return (
                            <View style={styles.usernameContainer}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('ViewProfilePage', {
                                    screen: 'ViewProfilePage',
                                    params: {
                                        profile_id: profile.profile_id,
                                        temp: true,
                                    }
                                })}>
                                    <Text style={styles.username}>{username} </Text>
                                </TouchableOpacity>
                            </View>)
                    }
                })()}
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Image,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (!result.cancelled) {
            // console.log("hasurl", hasUrl)
            setImage(result.uri);
            uploadImage(result.base64);
        }
    };

    const uploadImage = async (base64File) => {
        try {
            await getExistingImage();
            if (url) {
                // console.log("prev", url)
                const { error: deleteError } = await supabase.storage
                    .from('chatroompics')
                    .remove([url])
                if (deleteError) throw deleteError
            }

            const filePath = `public/${chatRoomId}/${Math.random()}`
            const { error: uploadError } = await supabase.storage
                .from('chatroompics')
                .upload(filePath, decode(base64File), {
                    contentType: 'image/png',
                })


            const { error } = await supabase
                .from('chat_rooms')
                .update({ pic_url: filePath })
                .eq('id', chatRoomId)

            if (uploadError) {
                throw uploadError
            } else if (error) {
                throw error
            } else {
                setHasUrl(false)
            }
        } catch (error) {
            // alert(error.message)
            console.log(error)
        }
    }

    const getExistingImage = async () => {
        try {
            const { data, error } = await supabase
                .from('chat_rooms')
                .select('pic_url')
                .match({ id: chatRoomId })
            if (error) {
                throw error
            }
            if (data && data[0].pic_url != null) {
                // setHasUrl(true)
                setUrl(data[0].pic_url)
            }

        } catch (error) {
            alert(error.message)
        }
    }

    const downloadImage = (path) => {
        try {
            // console.log("path",path)
            const { publicURL, error } = supabase.storage.from('chatroompics').getPublicUrl(path)
            if (error) {
                throw error
            }
            setImage(publicURL);

        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    };

    const editChatName = () => {
        setEdit(true)
    }

    const changeChatName = async () => {
        setEdit(false)
        try {
            const { error } = await supabase
                .from('chat_rooms')
                .update({ name: chatName })
                .eq('id', chatRoomId)
            if (error) throw error
        }catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TextInput
                    style={styles.chatName}
                    value={chatName}
                    onChangeText={(name) => setChatName(name)}
                    editable={edit}

                />
                {edit ?
                    (<MaterialCommunityIcons name="check-bold" size={30} onPress={changeChatName} />)
                    : (<MaterialCommunityIcons name="square-edit-outline" size={30} onPress={editChatName} />)}

            </View>

            {hasUrl ? (
                <Image
                    style={styles.image}
                    source={image}
                />
            ) : (
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                />
            )}
            <TouchableOpacity
                style={styles.Button}
                onPress={() => pickImage()}>
                <Text> Import from gallery </Text>
            </TouchableOpacity>
            <FlatList
                data={participants}
                renderItem={({ item }) => displayProfile(item)}
                ListHeaderComponent={flatListHeader}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8dc'
    },
    profileContainer: {
        flexDirection: 'row',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

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
        flex: 1
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
        marginRight: '3%',
    },
    image: {
        marginBottom: 30,
        marginTop: 20,
        width: 300,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    Button: {
        borderRadius: 25,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#ffff00",
    },

})

export default ParticipantsPage;