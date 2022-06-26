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
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';

const QuickMatchPage = () => {

    const [isSearching, setIsSearching] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        console.log('Loading');
    }, [navigation])

    const getUsers = async (e) => {
        try {
            const user = supabase.auth.user()

            let {data, error} = await supabase.from('quick_match').select().eq('searching', true).neq('profile_id', user.id)

            if (error) {
                console.log(error)
            }

            if (data.length == 0) {
                //console.log(data);
                setTimeout(() => getUsers(), 5000);
            } else {
                console.log(data);
                const profile_id = data[0].profile_id;
                const getUsername = async () => {
                    try {
                        setIsSearching(false);
                        const user = supabase.auth.user()

                        const updates = {
                            searching: false
                        }

                        await supabase.from('quick_match').update(updates).match({profile_id: user.id})
                        //console.log(id);
                        navigation.navigate('Match Found', {screen: 'MatchFoundPage', params: {
                            id: profile_id,
                        }})
            
                    } catch (error) {
                        console.log(error);
                    }
                }
                getUsername();
            }


        } catch (error) {
            console.log(error)
        }
    }


    const submitSearch = async (e) => {

        setIsSearching(true);

        try {
            const user = supabase.auth.user()


            const updates = {
                searching: true
            }

            await supabase.from('quick_match').update(updates).match({profile_id: user.id})

            getUsers();
            
        }  catch(error) {
            console.log(error)
        } 
    }


    const stopSearch = async (e) => {
        e.preventDefault();

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
                onPress={stopSearch}
            />
            </View>
              ) : (
            <View>
            <Button
                title= 'Search!'
                onPress={submitSearch}
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