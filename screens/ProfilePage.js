import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Button,
} from 'react-native';
import Avatar from '../components/Avatar';
import { supabase } from '../supabase';

const ProfilePage = ({ session }) => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [avatar_url, setAvatarUrl] = useState(null);

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
                username: username,
                avatar_url: avatar_url,
                updated_at: new Date(),
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
            console.log(user)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setAvatarUrl(data.avatar_url)
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
                { id: user.id, username: 'betatester' }
            ])
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Avatar url={avatar_url} />

                <Button title="Sign Out" onPress={async () => await supabase.auth.signOut()} />
            </View>

        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

})

export default ProfilePage;
