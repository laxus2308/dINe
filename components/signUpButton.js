import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const SignUp = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("sign up page")}>
            <Text style={styles.signup_button}>No account? Sign up now!</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    signup_button: {
        height: 30,
        marginBottom: 30,
        marginTop: 10
    },
})

export default SignUp;