import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
  } from 'react-native';
import { supabase } from '../supabase';
import { useRoute } from '@react-navigation/native';

const ViewRequestPage = () => {
    const route = useRoute();
    const request_id = route.params.id;
    const [requestData, setRequestData] = useState(null);
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
                {(requestData[0].Request_url == null) ? (
                    <Image
                    style={styles.image}
                    source={require('../assets/loid.jpg')}
                />) : (
            <Image
                      style={styles.image}
                      source={{ uri: getUri(requestData[0].Request_url) }}
                />)}
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
  container: {
    flex: 1,
    backgroundColor: '#fff8dc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 30,
    marginTop: 20,
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ViewRequestPage;