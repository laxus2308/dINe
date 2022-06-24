import React, { useState, useEffect } from 'react';
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
import { supabase } from '../supabase';
import * as Location from 'expo-location';

const QuickMatchPage = () => {

    const [isSearching, setIsSearching] = useState(false);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [searchId, setSearchId] = useState(null);
    const [userData, setUserData] = useState([]);

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (granted) {
                const lastKnownPosition = await Location.getLastKnownPositionAsync();
                if (!lastKnownPosition) {
                    return;
                }
                const { latitude, longitude } = lastKnownPosition.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    // useEffect(() => {
    //     getData();
    // }, [])


    // const refreshTime = 2000 //How frequently you want to refresh the data, in ms

    // const getData = async () => {
    //     submitSearch();
    //     setIsSearching(true) 
    //     const data = await supabase.from('quick_match').select().eq('searching', true).then(data => {
    //         setUserData(data);
    //     })
    //     console.log("The data is " + userData)
    //     setIsSearching(false); 
    // }

    // useEffect(() => {
    //     const comInterval = setInterval(getData, refreshTime);
    //     return () => clearInterval(comInterval) 
    // },[])

    // const listenForChanges = () => {
    //     const mysub = supabase
    //         .from('quick_match')
    //         .on('*', async (update) => {
    //             await getUsers()
    //         })
    //         .subscribe();
    //     return mysub;
    //   }

    // useEffect(() => {
    //       const unsub = getUsers().then(() => {
    //           return listenForChanges();
    //       })

    //     return async () => await unsub;
    // }, [])
    
    // const getUsers = async (e) => {
    //     // try {
    //     //     const user = supabase.auth.user()

    //         return await supabase.from('quick_match').select().eq('searching', true).neq('profile_id', user.id)

    //     //     if (error) {
    //     //         console.log(error)
    //     //     }

    //     //     if (data.length == 0) {
    //     //         setTimeout(() => getUsers(), 5000);
    //     //     } else {
    //     //         return data;
    //     //     }

    //     //     const today = new Date();

    //     //     console.log("Retrieved from database at " + today)
    //     //     console.log(userData)

    //     // } catch (error) {
    //     //     console.log(error)
    //     // }
    // }

    // const submitSearch = async (e) => {

    //     setIsSearching(true);

    //     try {
    //         const user = supabase.auth.user()


    //         const updates = {
    //             longitude: longitude,
    //             latitude: latitude,
    //             searching: true
    //         }

    //         await supabase.from('quick_match').update(updates).match({profile_id: user.id})

    //         while (userData.length == 0) {
    //             let { data, error } = getUsers();
    //             setTimeout(() => getUsers(), 5000);
    //             setUserData(data);
    //         }

    //         // getUsers();

    //         // console.log("My saved data:")
    //         // console.log(userData)

    //             //var geodist = require('geodist');

    //             //var minDist = Number.NEGATIVE_INFINITY;

    //             //var dist = geodist({lat: data.latitude, lon: data.longitude}, {lat: 33.7489, lon: -84.3881})
            
    //     }  catch(error) {
    //         console.log(error)
    //     } 
    // }


    // const stopSearch = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const user = supabase.auth.user()

    //         const updates = {
    //             searching: false
    //         }

    //         let { data, error } = await supabase.from('quick_match').update(updates).match({profile_id: user.id})

    //         setIsSearching(false);

    //         if (error) {
    //             throw error
    //         }

    //     }  catch(error) {
    //         console.log(error)
    //     }

    // }


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