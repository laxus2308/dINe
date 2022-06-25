import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Platform,
    Button
} from 'react-native';
import { set } from 'react-native-reanimated';
import { supabase } from '../../supabase';

const QuickMatchPage = () => {

    const [isSearching, setIsSearching] = useState(false);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [searchId, setSearchId] = useState(null);
    const [userData, setUserData] = useState([]);
    const [profileId, setProfileId] = useState(null);
    const [match, setMatch] = useState(null);
    const [test, setTest] = useState(false);

    
    const getUsers = async (e) => {

        try {
            const user = supabase.auth.user()

            let {data, error} = await supabase.from('quick_match').select().eq('searching', true).neq('profile_id', user.id)

            if (error) {
                console.log(error)
            }

            if (data.length == 0) {
                console.log(data)
                if (test) {
                    setTimeout(() => getUsers(), 5000);
                }
            } else {
                stopSearch();
                setUserData(data);
                console.log(userData);
            }


        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(() => {
        getUsers()
    }, []);


    const submitSearch = async (e) => {
        setIsSearching(true);

        try {

        const user = supabase.auth.user()

        setTest(true);

        console.log(test);

        const updates = {
            searching: true
        }

        await supabase.from('quick_match').update(updates).match({profile_id: user.id})

        getUsers()

        if (userData.length != 0) {
            console.log(userData[0].profile_id)
        }

        } catch (error) {
            console.log(error);
        }
    }


    const stopSearch = async (e) => {

        try {
            const user = supabase.auth.user()

            const updates = {
                searching: false
            }

            let { data, error } = await supabase.from('quick_match').update(updates).match({profile_id: user.id})

            if (error) {
                throw error
            }

        }  catch(error) {
            console.log(error)
        }

        setIsSearching(false);


    }


    return (
        <View style={styles.container}>
            {isSearching ? (
            <View>
            <Button
                title='Stop Search'
                //onPress={stopSearch}
            />
            </View>
              ) : (
            <View>
            <Button
                title= 'Search!'
                //onPress={submitSearch}
            />
            </View>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8dc',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default QuickMatchPage;