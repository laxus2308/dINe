import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import ChatListItem from '../../components/chat/ChatListItem';
import { supabase } from '../../supabase';


const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  // const createRoom = async () => {
  //   try {
  //     const { error } = await supabase.rpc('create_room', {
  //       name: 'Chat test name'
  //     }).single()

  //     if (error) throw error
  //   } catch (error) {
  //     alert(error.message)
  //   }
  // }

  //check for real time updates
  useEffect(() => {
    const sub = supabase
      .from('chat_rooms')
      .on('*', async (update) => {
        await getChatList()
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(sub)
    }
  }, [])

  useEffect(() => {
    const sub = supabase
      .from('chat_unread')
      .on('*', async (update) => {
        await getChatList()
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(sub)
    }
  }, [])


  //get chat lists upon first navigate
  useEffect(() => {
    getChatList();
  }, [])

  const getChatList = async () => {
    try {
      const { data, error } = await supabase.rpc('get_chat')
      if (error) throw error
      setChatRooms(data)
    } catch (error) {
      // alert(error.message)
      console.log('getChatList', error)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatListItem}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        onRefresh={async () => {
          setRefreshing(true)
          await getChatList().then(() => setRefreshing(false))
        }}
        refreshing={refreshing}
      />
      {/* <TouchableOpacity onPress={createRoom} style={{ marginBottom: 100 }}>
        <Text> Test for add chat </Text>
      </TouchableOpacity> */}
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
  flatListItem: {
    width: '100%',
  }
});

export default ChatListPage