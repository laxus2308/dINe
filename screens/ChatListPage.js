import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ChatListItem from '../components/ChatListItem';
import { supabase } from '../supabase';

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState(null)

  const createRoom = async () => {
    const {data, error} = await supabase.rpc('create_room', {
      name: 'Chat test name'
    }).single()

    // console.log('create room',data)
    // console.log('create room error', error)
  }
  
  const listenForChanges = () => {
    const mysub = supabase
        .from('chat_rooms')
        .on('*', async (update) => {
            await getChatList()
        })
        .subscribe();
    return mysub;
  }

  useEffect(() => {
      const unsub = getChatList().then(() => {
          return listenForChanges();
      })

    return async () => await unsub;
  }, [])


  const getChatList = async () => {
    try {
      const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        id,
        name,
        username:profiles ( Username ),
        avatar_url:profiles (Avatar_url)
      `)
      if (error) throw error
      // console.log(data)
      // console.log(data[0].avatar_url)
      // console.log(data[0].avatar_url[0].Avatar_url)
      // console.log("chat list", data)
      setChatRooms(data)
    } catch (error) {
      console.log("Chat list page", error)
    }
   
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatListItem}
        data={chatRooms}
        renderItem={({item}) => <ChatListItem chatRoom = {item}/>}
      />
      <TouchableOpacity onPress={createRoom} style={{marginBottom:100}}>
            <Text> Test for add chat </Text>
        </TouchableOpacity>
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
    width:'100%',
  }
});

export default ChatListPage