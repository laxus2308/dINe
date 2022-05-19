import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

const Username = ({ placeholder, }) => {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder='NUS Email'
                placeholderTextColor="#000080"
                keyboardType='email-address'
                onChangeText={(email) => setEmail(email)}
            />
        </View>

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
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
})

export default Username;