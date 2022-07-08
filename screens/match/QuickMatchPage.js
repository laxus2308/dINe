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

    const user = supabase.auth.user()

    useEffect(() => {
        console.log('Loading');
    }, [navigation])

    useEffect(() => {
        if (isSearching) {
            const sub = supabase
            .from('quick_match')
            .on('*', async (update) => {
                if (update.new.searching == true && update.new.profile_id != supabase.auth.user().id) {
                    foundMatchWithCreateRoom(update.new.profile_id)
                }
            })
            .subscribe();
          return () => {
            supabase.removeSubscription(sub)
          }
        }
      }, [isSearching])

      const foundMatch = async () => {
        try {
            setIsSearching(false);
            await stopSearch();

        } catch (error) {
            console.log(error);
        }
    }

    const foundMatchWithCreateRoom = async(profileId) => {
        try {
            const { data, error} = await supabase.rpc('create_match_room', {
                profile_id: profileId
            });
            await foundMatch();
           
            navigation.navigate('Match Found', {screen: 'MatchFoundPage', params: {
                id: profileId,
                // chatId: data.id,
            }})

            if (error){
                throw error
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getUsers = async () => {
        try {
            let {data, error} = await supabase.from('quick_match').select().eq('searching', true).neq('profile_id', user.id)

            if (error) {
                console.log(error)
            }

            if (data.length != 0) {
                // console.log(data);
                const profileId = data[0].profile_id;
                foundMatch(profileId);
                navigation.navigate('Match Found', {screen: 'MatchFoundPage', params: {
                    id: profileId,
                }})
            }
        } catch (error) {
            console.log(error)
        }
    }


    const submitSearch = async () => {
        setIsSearching(true);

        try {
            const updates = {
                searching: true
            }

            let { error } = await supabase.from('quick_match').update(updates).match({profile_id: user.id})
            
            if (error) {
                throw error
            }
            getUsers();
        }  catch(error) {
            console.log(error)
        } 
    }


    const stopSearch = async () => {
        try {
            const updates = {
                searching: false
            }

            let { error } = await supabase.from('quick_match').update(updates).match({profile_id: user.id})

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