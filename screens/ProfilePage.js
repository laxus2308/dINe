import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from 'react-native';
import Avatar from '../components/Avatar';
import { supabase } from '../supabase';

const ProfilePage = ({ navigation }) => {
    const listenForChanges = () => {
        const sub = supabase
            .from('profiles')
            .on('*', async (update) => {
                await getProfile()
            })
            .subscribe();
        return sub;
    }

    useEffect(() => {
        const unsub = getProfile().then(() => {
            return listenForChanges();
        })

        return async () => await unsub;
    }, [])

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [avatar_url, setAvatarUrl] = useState(null);
    const [faculty, setFaculty] = useState('');
    const [age, setAge] = useState('');
    const [dietary, setDietary] = useState('');
    const [interests, setInterests] = useState('');
    const [cuisines, setCuisines] = useState('');

    const getProfile = async () => {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('profiles')
                .select()
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.Username)
                setAvatarUrl(data.Avatar_url)
                setFaculty(data.Faculty)
                setAge(data.Age)
                setDietary(data.Dietary)
                setInterests(data.Interests)
                setCuisines(data.Cuisines)
            } else {
                createProfile()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const createProfile = async () => {
        try {
            const user = supabase.auth.user()

            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    { id: user.id, Username: 'betatester' }
                ])
        } catch(error) {
            alert(error)
        }
    }

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

    const goUpdateProfilePage = () => {
        navigation.navigate('Update Profile Page')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Avatar url={avatar_url} />
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
                        ListHeaderComponent={item => listHeaderComponent('Interests: ')}

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
                <TouchableOpacity onPress={goUpdateProfilePage} style={styles.updateProfileButoon}>
                    <Text> Update Profile </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
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
    updateProfileButoon: {
        marginTop: 30,
        backgroundColor: "#ffff00",
        borderRadius: 10,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    flatList : {
        flex: 1,
        marginLeft:'10%',

    }
});

export default ProfilePage;
