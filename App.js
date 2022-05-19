import { StatusBar } from 'expo-status-bar'; 
import React, {useState} from 'react'; 
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  Button, 
  TouchableOpacity, } from 'react-native'; 
  
const App = () => { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  return ( 
    <View style={styles.container}> 
      <Image  
        style= {styles.image} 
        source= {require("./assets/857718.png")} 
      /> 
      <StatusBar style="auto" /> 
      <View style={styles.inputView}> 
        <TextInput 
          style={styles.TextInput} 
          placeholder='NUS Email' 
          placeholderTextColor="#000080" 
          onChangeText={(email) => setEmail(email)} 
          /> 
      </View> 
      <View style={styles.inputView}> 
        <TextInput 
          style={styles.TextInput} 
          placeholder='Password' 
          placeholderTextColor="#000080" 
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)} 
          /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View> 
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
    marginLeft: 20, 
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
}); 
 
export default App;