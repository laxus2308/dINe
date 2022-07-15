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
// import User from '../../components/friends/User';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true
  }),
});


const HomePage = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [refreshingFriend, setRefreshingFriend] = useState(false);
  const [refreshingRequest, setRefreshingRequest] = useState(false)

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

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);


  //Get the token
  const registerForPushNotificationsAsync = async () => {
    const user = supabase.auth.user();
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    //Ensure that android users will be shown notification at the top
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync("default", {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    const updates = {
      notification_token: token
    }

    let { data, error } = await supabase.from('profiles').update([updates]).eq('id', user.id);

    if (error) {
      console.log(error);
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends</Text>
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
        onRefresh= {async()=> {
          setRefreshingFriend(true)
          await getFriendList().then(()=> setRefreshingFriend(false))
        }}
        refreshing={refreshingFriend}
      />
      <Text style={styles.header}>Pending Requests</Text>
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
        onRefresh= {async()=> {
          setRefreshingRequest(true)
          await getFriendRequests().then(()=> setRefreshingRequest(false))
        }}
        refreshing={refreshingRequest}
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