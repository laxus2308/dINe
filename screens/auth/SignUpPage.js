import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AuthTextInput from '../../components/auth/AuthTextInput';
import AuthButton from '../../components/auth/AuthButton';
import Styles from './Style';
import { supabase } from '../../supabase';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [signUpEmail, setEmail] = useState('');
  const [signUpPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUpWithEmailAndPassword = async (e) => {
    const checkForE = (email) => {
      return email.charAt(0) == "e";
    }

    const checkForNus = (email) => {
      return email.includes('u.nus.edu');
    }

    const checkLength = (email) => {
      return email.length == 18;
    }

    if (signUpPassword !== confirmPassword) {
      alert('Passwords must be the same!')
    } else if (!checkForE(signUpEmail) && !checkForNus && !checkLength) {
      alert('Nus email required!')
    } else {
      e.preventDefault()

      try {
        setLoading(true)
        const { error } = await supabase.auth.signUp({
          email: signUpEmail,
          password: signUpPassword,
        })

        const { error: createError } = await supabase
            .from('profiles')
            .insert([
                { id: supabase.auth.user.id, 
                  username: 'betatester' }
            ])
          
        if (error) {
          throw error
        } else if (createError) {
          throw createError
        }

        alert('Check your email for the login link!')
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <AuthTextInput
          value={signUpEmail}
          textHandler={(signUpEmail) => setEmail(signUpEmail)}
          keyboardType="email-address"
          placeholder="NUS Email"
          placeholderTextColor="#000080"
        />
        <AuthTextInput
          value={signUpPassword}
          textHandler={(signUpPassword) => setPassword(signUpPassword)}
          placeholder="Password"
          placeholderTextColor="#000080"
          secureTextEntry
        />
        <AuthTextInput
          value={confirmPassword}
          textHandler={(confirmPassword) => setConfirmPassword(confirmPassword)}
          placeholder="Confirm Password"
          placeholderTextColor="#000080"
          secureTextEntry
        />
        <AuthButton
          pressHandler={signUpWithEmailAndPassword}
          title='Sign up now'
          style={Styles.signUpButton}
        />
      </View>
    </TouchableWithoutFeedback>
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
