import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
} from 'react-native';
import { supabase } from '../../supabase';
import { useRoute } from '@react-navigation/native';

const ViewRequestPage = ({ navigation }) => {
  const route = useRoute();
  const request_id = route.params.id;
  const [requestData, setRequestData] = useState(null);
  const [chatId, setChatId] = useState('');
  const [chatName, setChatName] = useState('');

  const deleteRequest = async () => {
      navigation.navigate("Request Board")
      await supabase.from('requests').delete().match({ id: request_id })
  }

  const joinRequestRoom = async () => {
    try {
      const { error: joinRoomError } = await supabase.rpc('join_request_room', {
        request_id: route.params.id
      })

      if (joinRoomError) throw joinRoomError
      
      navigation.navigate('Chat', {screen:'ChatRoomPage', params: {
        id:chatId,
        name:chatName,
      }})
    } catch (error) {
      if (error.message == "duplicate key value violates unique constraint \"room participants_pkey\"" ) {
        alert("Already joined")
      } else {
        alert(error.message)
      }
      console.log(error.message);
    }
  }

  const user = supabase.auth.user();

  const getRequestData = async () => {
    try {
      const { data, error } = await supabase.from('requests')
        .select(`
          username:profiles (username), *
          `)
        .eq('id', request_id)

      setRequestData(data);
      setChatId(data[0].chat_id);
      setChatName(data[0].title);

      if (error) throw error
    } catch (error) {
      console.log("View request page", error)
    }

  }

  useEffect(() => {
    const sub = supabase
      .from(`requests:id=eq.${request_id}`)
      .on('*', async (update) => {
        await getRequestData()
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(sub)
    }
  }, [])

  useEffect(()=> {
    getRequestData()
  },[])

  const getUri = (path) => {
    try {
      const { publicURL, error } = supabase.storage.from('requestpics').getPublicUrl(path)

      if (error) {
        throw error
      }
      return publicURL;

    } catch (error) {
      alert('Error downloading image: ', error.message)
      console.log(error)
    }
  }

  if (requestData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {requestData[0].title}
        </Text>
        {(requestData[0].request_url == null) ? (
          <Image
            source={require('../../assets/BlankImage.png')}
            style={styles.image}
          />) : (
          <Image
            style={styles.image}
            source={{ uri: getUri(requestData[0].request_url) }}
          />)}
        <Text style={styles.detail}>
          Created By: {requestData[0].username.username}
        </Text>
        <Text style={styles.detail}>
          Location: {requestData[0].location}
        </Text>
        <Text style={styles.detail}>
          Scheduled Date: {requestData[0].date}
        </Text>
        <Text style={styles.detail}>
          Scheduled Time: {requestData[0].time}
        </Text>
        <Text style={styles.description}>
          Description: {requestData[0].description}
        </Text>
        {user.id != requestData[0].requestor_id ? (
          <Button
            onPress={joinRequestRoom}
            title="Join"
            color="#841584"
          />
        ) : (
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={styles.buttonStyle}>
              <Button
                onPress={() => navigation.navigate('Edit Request', { requestData: requestData })}
                title="Edit"
                color="#841584"
              />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                onPress={deleteRequest}
                title="Delete"
                color="#dc143c"
              />
            </View>
          </View>)}
        <Text style={styles.pax}>
          Pax: {requestData[0].current_pax} / {requestData[0].pax}
        </Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text> Loading</Text>
      </View>
    )
  }


}

const styles = StyleSheet.create({

  buttonStyle: {
    marginHorizontal: 30,
    marginTop: 5
  },

  pax: {
    flex: 1,
    marginTop: '5%',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },

  description: {
    marginTop: '5%',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: '5%'
  },

  detail: {
    marginTop: '5%',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },

  title: {
    marginTop: '5%',
    fontSize: 30,
    fontStyle: 'italic',
    marginBottom: '3%',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 20,
    marginTop: 10,
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ViewRequestPage;