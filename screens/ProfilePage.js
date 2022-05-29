import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Avatar from '../components/Avatar';
import { supabase } from '../supabase';

const ProfilePage = ({ session }) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [avatar_url, setAvatarUrl] = useState(null);
    const [faculty, setFaculty] = useState('');
    const [age, setAge] = useState('');
    const [dietary, setDietary] = useState('');
    const [interests, setInterests] = useState('');
    const [cuisines, setCuisines] = useState('');

    useEffect(() => {
        getProfile()
    }, [session]);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                Username: username,
                Avatar_url: avatar_url,
            }

            let { error } = await supabase
                .from('profiles')
                .upsert(updates, {
                    returning: 'minimal', // Don't return the value after inserting
                })

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    };

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
        const user = supabase.auth.user()

        const { data, error } = await supabase
            .from('profiles')
            .insert([
                { id: user.id, Username: 'betatester' }
            ])
    }
    const renderItem = ({ item }) => (
        <View style={styles.tag}>
            <Text> {item} </Text>
        </View>
    )

    const listHeaderComponent = (item) => (
        <Text style={{ marginTop: 5, alignSelf: 'flex-start' }}>
            {item}
        </Text>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Avatar url={avatar_url} />
                {/* 
                <Text style={styles.profileDescription}> Name: {username}</Text>
                <Text style={styles.profileDescription}> Faculty: {faculty}</Text>
                <Text style={styles.profileDescription}> Age: {age}</Text>
                <View style={{ height: 70 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={interests}
                        renderItem={renderItem}
                        keyExtractor={item => item.toString()}
                        horizontal={true}
                        ListHeaderComponent={item => listHeaderComponent('Interests: ')}

                    />
                    <FlatList
                        style={{ flex: 1 }}
                        data={cuisines}
                        renderItem={renderItem}
                        keyExtractor={item => item.toString()}
                        horizontal={true}
                        ListHeaderComponent={item => listHeaderComponent('Preferred Cuisines: ')}
                    />
                </View> */}
            </View>
            {/* <TouchableOpacity>
                <Text> Update Profile </Text>
            </TouchableOpacity> */}
            <Button title="Sign Out" onPress={async () => await supabase.auth.signOut()} />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    profileDescription: {
        marginTop: 15,
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    tag: {
        backgroundColor: 'lightblue',
        padding: 5,
        height: 30,
        border: 1,
        marginLeft: 20,
    },
})

export default ProfilePage;
