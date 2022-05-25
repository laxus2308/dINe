import React from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';

const AuthTextInput = props => {
    const { secureTextEntry, keyboardType, placeholder, textHandler, value } = props;

    return (
        <TextInput
            style={styles.inputView}
            placeholder={placeholder}
            placeholderTextColor="#000080"
            keyboardType={keyboardType}
            onChangeText={textHandler}
            secureTextEntry={secureTextEntry}
            value={value}
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

export default AuthTextInput;