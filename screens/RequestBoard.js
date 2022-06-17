import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    Image
  } from 'react-native';
import Request from '../components/Request.js';
import { supabase } from '../supabase.js';

// const joinRequestRoom = async() => {
//   try {
//     const { error: joinRoomError } = await supabase.rpc('join_request_room', {
//        request_id: // have to pass in request id, prob need to use Route to get rqeuest id
//     })
  
//     if (joinRoomError) throw joinRoomError
//   } catch (error) {
//     alert(error)
//   }
// }

const RequestBoard = ({navigation}) => {
  const [requests, setRequests] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Create Request');}}>
            <Image style={styles.image} source={require("../assets/create.png")}/>
        </TouchableOpacity>
    )
    })
  }, [navigation])

  const listenForChanges = () => {
    const mysub = supabase
        .from('Requests')
        .on('*', async (update) => {
            await getRequests()
        })
        .subscribe();
    return mysub;
  }

  useEffect(() => {
      const unsub = getRequests().then(() => {
          return listenForChanges();
      })

    return async () => await unsub;
  }, [])


  const getRequests = async () => {
    try {
      const { data, error } = await supabase.from('Requests')
      .select(`
      id,
      requestor_id,
      username:profiles (Username),
      created_at,
      Location,
      Time,
      Date,
      Pax,
      Description,
      Title,
      Request_url
      `)
      .order('Date', { ascending: true }).order('Time', { ascending: true });
      if (error) throw error
      setRequests(data)
    } catch (error) {
      alert(error)
    }
   
  }

  return (
    <FlatList
      style={styles.requestsList}
      contentContainerStyle={styles.requestsListContainer}
      data={requests}
      renderItem={({item}) => <Request req = {item}/>}
      numColumns={2}
      columnWrapperStyle={styles.row}
      keyExtractor={(item)=> item.id}
    />
  )
}

const styles = StyleSheet.create({
  requestsList: {
    backgroundColor: '#fff8dc',
  },

  requestsListContainer: {
    backgroundColor: '#fff8dc',
    paddingVertical: 8,
    marginHorizontal: 8,
  },

  row: {
    flex: 1,
    justifyContent: "space-around"
  },

  image: {
    padding: 10,
    margin: '10%',
    marginLeft: '130%',
    height: '80%',
    width: '100%',
    resizeMode: 'stretch',
  },

  button: {
      flex:1/3,
  },

});

export default RequestBoard