import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    TouchableOpacity,
    SafeAreaView
  } from 'react-native';
import { supabase } from '../supabase';
import { useRoute } from '@react-navigation/native';

const ViewRequestPage = ({navigation}) => {
    const route = useRoute();
    const request_id = route.params.id;
    const [requestData, setRequestData] = useState(null);

    const deleteRequest = async() => {
      try {
        const { data, error } = await supabase.from('Requests').delete().match({ id: request_id })
        if (error) throw error
      } catch (error) {
        console.log("Delete", error)
      }
    }

    const joinRequestRoom = async() => {
      try {
        const { error: joinRoomError } = await supabase.rpc('join_request_room', {
           request_id: route.params.id
        })
      
        if (joinRoomError) throw joinRoomError
      } catch (error) {
        console.log(error);
      }
    }

    const user = supabase.auth.user();

    const getRequestData = async () => {
        try {
          const { data, error } = await supabase.from('Requests')
          .select(`
          username:profiles (Username), *
          `)
          .eq('id', request_id)

          setRequestData(data);

          if (error) throw error
        } catch (error) {
          console.log("View request page", error)
        }
       
      }

      const listenForChanges = () => {
        const mysub = supabase
            .from(`Requests:id=eq.${request_id}`)
            .on('*', async (update) => {
                await getRequestData()
            })
            .subscribe();
        return mysub;
      }
    
      useEffect(() => {
          const unsub = getRequestData().then(() => {
              return listenForChanges();
          })
    
        return async () => await unsub;
      }, [])

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
              <Text style = {styles.title}>
              {requestData[0].Title}
              </Text>
                {(requestData[0].Request_url == null) ? (
                    <Image
                    source={require('../assets/loid.jpg')}
                />) : (
              <Image
                      style={styles.image}
                      source={{ uri: getUri(requestData[0].Request_url) }}
                />)}
              <Text style = {styles.detail}>
                Created By: {requestData[0].username.Username} 
              </Text>
              <Text style = {styles.detail}>
                Location: {requestData[0].Location}
              </Text>
              <Text style = {styles.detail}>
                Scheduled Date: {requestData[0].Date}
              </Text>
              <Text style = {styles.detail}>
                Scheduled Time: {requestData[0].Time}
              </Text>
              <Text style = {styles.description}>
                Description: {requestData[0].Description}
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
                onPress={() => navigation.navigate('Edit Request', {requestData: requestData})}
                title="Edit"
                color="#841584"
                />
              </View>
              <View style={styles.buttonStyle}>
                <Button
                //onPress={deleteRequest}
                title="Delete"
                color="#dc143c"
                />
              </View>
              </View>)}
              <Text style = {styles.pax}>
                Pax: {requestData[0].current_pax} / {requestData[0].Pax} 
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