import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Header from './components/Header';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Header/> */}
      <Header />
      <View>
        { /* Body */}
        <View style={styles.alignCenter}>
          <Text style={styles.text}> Enter email here </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"grey"}
            style={styles.textInput}
            keyboardType="email-address"
          />
          <Text style={styles.text}> Enter password here </Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor={"grey"}
            style={styles.textInput}
            autocomplete="off"
            keyboardType="default"
            secureTextEntry={true}
          />

        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    margin: 10,
    width: 200,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
  },
  text: {
    textAlign: "center",
    justifyContent: 'center',
    padding: 3,
  },
  alignCenter: {
    alignItems: 'center',
  }
});

export default App;
