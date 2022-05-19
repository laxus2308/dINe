import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Username from './components/username';
import Password from './components/password';
import ForgetPasswordButton from './components/forgetPasswordButton';
import LoginButton from './components/loginButton';

const App = () => {
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require("./assets/857718.png")}
                />
                <StatusBar style="auto" />
                <Username />
                <Password />
                <ForgetPasswordButton />
                <LoginButton />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        marginBottom: 40,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
});

export default App;