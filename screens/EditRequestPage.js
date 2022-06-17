import React from 'react'
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
  } from 'react-native';

const EditRequestPage = () => {
  return (
    <View style={styles.container}>
      <Text>A cool edit page</Text>
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

export default EditRequestPage