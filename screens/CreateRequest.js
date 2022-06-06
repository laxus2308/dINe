import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const CreateRequest = () => {
  return (
    <View style={styles.container}>
      <Text>A cool create request</Text>
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

export default CreateRequest;