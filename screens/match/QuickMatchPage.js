import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { supabase } from '../../supabase';
import { useNavigation } from '@react-navigation/native';

const QuickMatchPage = () => {
    const [isSearching, setIsSearching] = useState(false);
    const navigation = useNavigation();

    const user = supabase.auth.user()

    useEffect(() => {
        return ()=> {
            stopSearch()
        }
    }, [])

    useEffect(() => {
        if (isSearching) {
            const sub = supabase
                .from('quick_match')
                .on('*', async (update) => {
                    if (update.new.searching == true && update.new.profile_id != supabase.auth.user().id) {
                        await foundMatchWithCreateRoom(update.new.profile_id)
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
            alert(error.message)
        }
    }

    const foundMatchWithCreateRoom = async (profileId) => {
        try {
            const { error } = await supabase.rpc('match_friends', {
                profile_id: profileId
            });
            await foundMatch();

            navigation.navigate('Match Found', {
                screen: 'MatchFoundPage', params: {
                    id: profileId,
                }
            })

            if (error) throw error
        } catch (error) {
            alert(error.message)
        }
    }

    const getUsers = async () => {
        try {
            let { data, error } = await supabase.from('quick_match').select().eq('searching', true).neq('profile_id', user.id)

            if (error) throw error

            if (data.length != 0) {
                const profileId = data[0].profile_id;
                await foundMatch();
                navigation.navigate('Match Found', {
                    screen: 'MatchFoundPage', params: {
                        id: profileId,
                    }
                })
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const submitSearch = async () => {
        setIsSearching(true);
        try {
            const updates = {
                searching: true
            }

            let { error } = await supabase.from('quick_match').update(updates).match({ profile_id: user.id })

            if (error) throw error
            await getUsers();
        } catch (error) {
            alert(error.message)
        }
    }

    const stopSearch = async () => {
        try {
            const updates = {
                searching: false
            }

            let { error } = await supabase.from('quick_match').update(updates).match({ profile_id: user.id })

            if (error) throw error

        } catch (error) {
            alert(error.message)
        } finally {
            setIsSearching(false);
        }
    }

    return (
        <View style={styles.container}>
            {isSearching ? (
                <View>
                    <TouchableOpacity style={styles.Button}
                        onPress={stopSearch}>
                        <Text> Stop Search </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TouchableOpacity style={styles.Button}
                        onPress={submitSearch}>
                        <Text> Search! </Text>
                    </TouchableOpacity>
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


export default QuickMatchPage;