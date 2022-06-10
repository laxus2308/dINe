import React from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatListItem from '../components/ChatListItem';
import ChatRoomData from '../ChatRoomData';

const ChatListPage = () => {
  return (
    <View style={styles.container}>
      {/* <ChatListItem chatRoom={} /> */}
      <FlatList
        style={styles.flatListItem}
        data={ChatRoomData}
        renderItem={({item}) => <ChatListItem chatRoom = {item}/>}
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
  flatListItem: {
    width:'100%',
  }
});

export default ChatListPage