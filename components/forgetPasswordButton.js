import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const ForgetPassword = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("forget password page")}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
})

export default ForgetPassword;