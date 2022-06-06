import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Button,
  } from 'react-native';
import Request from '../components/Request.js';
import { getRequests } from '../components/RequestList.js';
import { supabase } from '../supabase.js';

const getData = async() => {
  const {data, error} = await supabase.from('Requests').select().order('Date', { ascending: true }).order('Time', { ascending: true });
  console.log(data);
}


const RequestBoard = ({navigation}) => {

  const renderRequest = ({item:request}) => {
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
    setRequests(getRequests());
    getData();
  });

  return (
    <FlatList
      style={styles.requestsList}
      contentContainerStyle={styles.requestsListContainer}
      keyExtractor={(item) => item.id.toString()}
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
  }

});

export default RequestBoard