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
import { getData } from '../components/RequestList.js';
import { supabase } from '../supabase.js';
import CreateRequestPage from './CreateRequestPage.js';

const RequestBoard = ({navigation}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Create Request');}}>
            <Image style={styles.image} source={require("../assets/create.png")}/>
        </TouchableOpacity>
    )
    })
  }, [navigation])

  const renderRequest = ({item:request}) => {
    console.log(requests)
    return (
      <Request {...request} 
        onPress={() => {
          navigation.navigate('RequestDetails', {
          requestId: request.id,
        });
      }}
      />
    );
  }

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const newData = await supabase.from('Requests').select().order('Date', { ascending: true }).order('Time', { ascending: true });
      setRequests([newData]);
    };

    getData();
  }, []);

  return (
    <FlatList
      style={styles.requestsList}
      contentContainerStyle={styles.requestsListContainer}
      keyExtractor={(item) => item.id}
      data={requests}
      renderItem={renderRequest}
      numColumns={2}
      columnWrapperStyle={styles.row}
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
    height: '60%',
    width: '65%',
    resizeMode: 'stretch',
  },

  button: {
      flex:1/3
  },

});

export default RequestBoard