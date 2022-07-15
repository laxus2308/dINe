import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import Request from '../../components/request/Request.js';
import { supabase } from '../../supabase.js';


const RequestBoard = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title='Create'
          onPress={()=>{navigation.navigate('Create Request');}}
          color='lightblue'
        />
    )
    })
  }, [navigation])


  //check for real time updates
  useEffect(() => {
    const sub = supabase
      .from('*')
      .on('*', async (update) => {
        await getRequests()
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(sub)
    }

  }, [])

  //get request details upon first navigate
  useEffect(() => {
    getRequests();
  }, [])

  const getRequests = async () => {
    try {
      const { data, error } = await supabase.from('requests')
        .select(`
      username:profiles (username),
      *
      `)
        .order('datetime', { ascending: true });

      if (error) throw error
      setRequests(data)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <FlatList
      style={styles.requestsList}
      contentContainerStyle={styles.requestsListContainer}
      data={requests}
      renderItem={({ item }) => { if (item.current_pax != item.pax)return <Request req={item} /> }}
      numColumns={2}
      columnWrapperStyle={styles.row}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() =>
        <TouchableOpacity onPress={() => navigation.navigate('View Own Request')} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>View Your Requests</Text>
        </TouchableOpacity>}
      onRefresh= {async()=> {
        setRefreshing(true)
        await getRequests().then(()=> setRefreshing(false))
      }}
      refreshing={refreshing}
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

  requestButtonContainer: {
    flex: 1,
    alignContent: 'center',
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 28
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }

});

export default RequestBoard