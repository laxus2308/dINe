import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import { supabase } from '../supabase';

const HomePage = ({ navigation }) => {
  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.Username)
        setAvatarUrl(data.Avatar_url)
        setFaculty(data.Faculty)
        setAge(data.Age)
        setDietary(data.Dietary)
        setInterests(data.Interests)
        setCuisines(data.Cuisines)
      } else {
        createProfile()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async () => {
    const user = supabase.auth.user()

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { id: user.id }
      ])
  }

  return (
    <View style={styles.container}>
      <Text>A cool home page</Text>
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

export default HomePage
