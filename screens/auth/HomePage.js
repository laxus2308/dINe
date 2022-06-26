import React from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Image 
      source={require("../../assets/logo.png")}
      style={styles.image}
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
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain'
  }
});

export default HomePage;