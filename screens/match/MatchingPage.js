import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
  } from 'react-native';
import { Dimensions } from 'react-native';

const MatchingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity
        style={styles.matchButton}
        onPress={() => navigation.navigate('Quick Match Page')}
      >
      <Text styles={styles.text}>QUICK MATCH</Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity
        style={styles.discoverButton}
        onPress={() => navigation.navigate('Discover Page')}
      >
      <Text>DISCOVER</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  matchButton: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginRight:120,
    borderWidth: 1,
  },

  discoverButton: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    backgroundColor:'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginLeft:120,
    borderWidth: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MatchingPage