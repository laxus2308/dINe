import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from 'react-native';
import Avatar from '../../components/profile/Avatar';
import { supabase } from '../../supabase';

const ProfilePage = ({ navigation }) => {
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
                setUsername(data.username)
                setAvatarUrl(data.avatar_url)
                setFaculty(data.faculty)
                setAge(data.age)
                setDietary(data.dietary)
                setInterests(data.interests)
                setCuisines(data.cuisines)
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

    //get user details upon first navigate
    useEffect(() => {
        getProfile();
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
        backgroundColor: '#fff8dc'
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
