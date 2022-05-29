import React from 'react'
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
  } from 'react-native';

const RequestBoard = () => {
  return (
    <View style={styles.container}>
      <Text>A cool request page</Text>
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
});

export default RequestBoard