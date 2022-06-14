import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const AuthButton = (props) => {
    const { pressHandler, title, style } = props;

    return (
        <TouchableOpacity style={style} onPress={pressHandler}>
            <Text style={styles.loginText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Button: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#ffff00",
    },
})

export default AuthButton;