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
import User from '../../components/friends/User';

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
      if (error) throw error
      setFriendList(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          alignSelf: 'center',
          backgroundColor: "white",
        }}
      />
    );
  }

  
    return (
      <View style={styles.container}>
        <Text style = {styles.header}>Friends</Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        <FlatList
          windowSize={10}
          data={friendList}
          renderItem={({ item }) => { return <Friend Friend={item} /> }}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          ItemSeparatorComponent={ItemDivider}
        />
        <Text style = {styles.header}>Pending Requests</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <FlatList
          data={friendRequests}
          renderItem={({ item }) => { return <FriendRequest FriendReq={item} /> }}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          ItemSeparatorComponent={ItemDivider}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
  },
  flatList: {
    height: 50,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default HomePage;