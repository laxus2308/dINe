import React from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';

const Password = (props) => {


    return (
        <TextInput
            style={styles.inputView}
            placeholder='Password'
            placeholderTextColor="#000080"
            secureTextEntry={true}
            onChangeText={(password) => props.setPassword(password)}
        />

    )
}

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#f0f8ff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
        textAlign: "center",
    },
})

export default Password;