import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { supabase } from '../supabase'

const LoginButton = (props) => {
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({
                email: props.email,
                password: props.password,
            })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <TouchableOpacity style={styles.loginBtn} onPress={signInWithEmail}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ffff00",
    },
})

export default LoginButton;