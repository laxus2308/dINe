import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import { supabase } from '../../supabase';
import Request from '../../components/request/Request';

const ViewOwnRequestPage = () => {

  const [yourRequests, setYourRequests] = useState([]);
  //check for real time updates
  useEffect(() => {
    const sub = supabase
      .from('requests')
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

  const user = supabase.auth.user();

  const getRequests = async () => {
    try {
      const { data, error } = await supabase.from('requests')
        .select(`*, username:profiles (username)`).eq('requestor_id', user.id)
        .order('datetime', { ascending: true });
      if (error) throw error
      setYourRequests(data)
    } catch (error) {
      alert(error)
    }

  }

  return (
    <FlatList
      style={styles.requestsList}
      contentContainerStyle={styles.requestsListContainer}
      data={yourRequests}
      renderItem={({ item }) => { return <Request req={item} /> }}
      numColumns={2}
      columnWrapperStyle={styles.row}
      keyExtractor={(item) => item.id}
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
    flex: 1 / 3,
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

export default ViewOwnRequestPage