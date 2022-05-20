import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import Username from '../components/username';
import Password from '../components/password';
import ForgetPasswordButton from '../components/forgetPasswordButton';
import LoginButton from '../components/loginButton';
import { supabase } from '../supabase'


const LoginPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      console.log(email)
      console.log(password)
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/857718.png")}
        />
        <StatusBar style="auto" />
        <Username email={email} setEmail={setEmail} />
        <Password passowrd={password} setPassword={setPassword} />
        <ForgetPasswordButton navigation={props.navigation} />
        <LoginButton email={email} password={password} />
        <Button
          title="Sign up now"
          onPress={signUpWithEmail}
        />
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

export default LoginPage;