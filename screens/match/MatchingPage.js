import React from 'react'
import {
    View,
    StyleSheet,
    Button
  } from 'react-native';

const MatchingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.matchButton}>
      <Button 
        title= 'QUICK MATCH'
        onPress={() => navigation.navigate('Quick Match Page')}
      />
      </View>
      <Button
        title= 'SPECIFIC MATCH'
        onPress={() => navigation.navigate('Specific Match Page')}
        color='red'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  matchButton: {
    marginBottom: '50%'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MatchingPage