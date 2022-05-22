import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Username from '../components/username';
import Password from '../components/password';
import ForgetPasswordButton from '../components/forgetPasswordButton';
import LoginButton from '../components/loginButton';
import SignUpButton from '../components/signUpButton';


const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/857720.png")}
        />
        <StatusBar style="auto" />
        <Username email={email} setEmail={setEmail} />
        <Password password={password} setPassword={setPassword} />
        <ForgetPasswordButton navigation={props.navigation} />
        <LoginButton email={email} password={password} />
        <SignUpButton navigation={props.navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 30,
    width: 200,
    height: 150,
    resizeMode: 'contain'
  },
});

export default LoginPage;