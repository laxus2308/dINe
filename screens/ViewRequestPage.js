import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
    TouchableOpacity,
  } from 'react-native';
import { supabase } from '../supabase';
import { useRoute } from '@react-navigation/native';

const ViewRequestPage = () => {
    const route = useRoute();
    const request_id = route.params.id;
    const [requestData, setRequestData] = useState(null);
    const [currentPax, setCurrentPax] = useState(0);
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
                    style={styles.title}
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
              <Button
                //onPress={}
                title="Join"
                color="#841584"
              />
              <Text style = {styles.pax}>
                Pax: {currentPax} / {requestData[0].Pax} 
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