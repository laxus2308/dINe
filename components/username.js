import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';

const Username = (props) => {

    return (
        <TextInput
            style={styles.inputView}
            placeholder='NUS Email'
            placeholderTextColor="#000080"
            keyboardType='email-address'
            onChangeText={(email) => props.setEmail(email)}
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

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
})

export default Username;