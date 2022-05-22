import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput
} from 'react-native';
import { supabase } from '../supabase'

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [signUpEmail, setEmail] = useState('');
  const [signUpPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUpWithEmail = async (e) => {
    if (signUpPassword !== confirmPassword) {
      alert('Passwords must be the same!')
    } else if (!signUpEmail.includes('u.nus.edu')) {
      alert('Nus email required!')
    } else {
      e.preventDefault()

      try {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
          email: signUpEmail,
          password: signUpPassword,
        })
        if (error) throw error
        alert('Check your email for the login link!')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputView}
        placeholder='NUS Email'
        placeholderTextColor="#000080"
        keyboardType='email-address'
        onChangeText={(signUpEmail) => setEmail(signUpEmail)}
      />
      <TextInput
        style={styles.inputView}
        placeholder='Password'
        placeholderTextColor="#000080"
        secureTextEntry={true}
        onChangeText={(signUpPassword) => setPassword(signUpPassword)}
      />
      <TextInput
        style={styles.inputView}
        placeholder='Confirm Password'
        placeholderTextColor="#000080"
        secureTextEntry={true}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Button
        title="Sign up now"
        onPress={signUpWithEmail}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    backgroundColor: "#f0f8ff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
  },
})

export default SignUpPage;
