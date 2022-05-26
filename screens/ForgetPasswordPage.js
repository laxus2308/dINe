import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import AuthTextInput from '../components/auth/AuthTextInput';
import AuthButton from '../components/auth/AuthButton';
import { supabase } from '../supabase';
import Styles from '../Style';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const pressHandler = async () => {
        if (email.includes('u.nus.edu')) {
            alert("Check your NUS mail for a link")
            const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)
        } else {
            alert("Please enter a valid NUS email")
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <AuthTextInput
                    value={email}
                    textHandler={setEmail}
                    placeholder="NUS email"
                />
                <AuthButton
                    style={Styles.resetButton}
                    pressHandler={pressHandler}
                    title="Reset password"
                />
            </View>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ForgetPasswordPage;