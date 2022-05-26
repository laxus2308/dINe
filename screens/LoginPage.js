import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AuthButton from '../components/auth/AuthButton';
import AuthTextInput from '../components/auth/AuthTextInput';
import Styles from '../Style';
import { supabase } from '../supabase';

const LoginPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmailAndPassword = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({
        email: { email },
        password: { password },
      })
      if (error) throw error
      alert('Logged in!')
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
          source={require("../assets/857720.png")}
        />
        <StatusBar style="auto" />
        <AuthTextInput
          value={email}
          textHandler={(email) => setEmail(email)}
          keyboardType="email-address"
          placeholder="NUS email"
        />
        <AuthTextInput
          value={password}
          textHandler={(password) => setPassword(password)}
          secureTextEntry
          placeholder="Password"
        />
        <AuthButton
          pressHandler={() => navigation.navigate("forget password page")}
          title='Forgot Password'
          style={Styles.forgotPasswordButton}
        />
        <AuthButton
          pressHandler={signInWithEmailAndPassword}
          title='LOGIN'
          style={Styles.loginButton}
        />
        <AuthButton
          pressHandler={() => navigation.navigate("sign up page")}
          title='No account? Sign up now!'
          style={Styles.signUpButton}
        />
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