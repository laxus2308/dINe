import { useState, useEffect } from 'react';
import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList
} from 'react-native';
import { supabase } from '../../supabase';
import FriendRequest from '../../components/friends/FriendRequest';
import Friend from '../../components/friends/Friend';

const HomePage = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendList, setFriendList] = useState([]);

  //check for real time updates
  useEffect(() => {
    const sub = supabase
      .from('*')
      .on('*', async (update) => {
        await getFriendRequests()
        await getFriendList()
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(sub)
    }

  }, [])

  useEffect(() => {
    getFriendRequests();
  }, [])

  useEffect(() => {
    getFriendList();
  }, [])

  const getFriendRequests = async () => {
    const user = supabase.auth.user()
    try {
      const { data, error } = await supabase.from('friend_requests')
        .select().eq('secondary_id', user.id)
      //console.log(data);
      if (error) throw error
      setFriendRequests(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const getFriendList = async () => {
    const user = supabase.auth.user()
    try {
      const { data, error } = await supabase.from('friend_relations')
        .select().eq('first_id', user.id)
      console.log(data)
      if (error) throw error
      setFriendList(data)
    } catch (error) {
      alert(error.message)
    }
  }


  
    return (
      <View style={styles.container}>
        <Text>Friends</Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        <FlatList
          contentContainerStyle={styles.friendRequestsContainer}
          data={friendList}
          renderItem={({ item }) => { return <Friend Friend={item} /> }}
          keyExtractor={(item) => item.id}
        />
        <Text>Pending Requests</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <FlatList
          contentContainerStyle={styles.friendRequestsContainer}
          data={friendRequests}
          renderItem={({ item }) => { return <FriendRequest FriendReq={item} /> }}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
  },

  friendRequestsContainer: {
    flex: 1,
  }
});

export default HomePage;