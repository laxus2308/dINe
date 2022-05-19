import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';

const Password = () => {
    const [password, setPassword] = useState('');

    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder='Password'
                placeholderTextColor="#000080"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
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

export default Password;