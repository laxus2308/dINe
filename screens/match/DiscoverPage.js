import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import { supabase } from '../../supabase';
import User from '../../components/friends/User';

const DiscoverPage = () => {
    const [userList, setUserList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const sub = supabase
          .from('friend_relations')
          .on('*', async (update) => {
            await getUserList()
          })
          .subscribe();
    
        return () => {
          supabase.removeSubscription(sub)
        }
      }, [])
    
      useEffect(() => {
        getUserList();
      }, [])

      const getUserList = async () => {
        try {
          const { data, error } = await supabase.rpc('discover');
          if (error) throw error;

          setUserList(data);
        } catch (error) {
          alert(error.message)
        }
      }

      const ItemDivider = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              alignSelf: 'center',
              backgroundColor: "black",
            }}
          />
        );
      }


    return (
        <View style={styles.container}>
            <FlatList
                data={userList}
                renderItem={({ item }) => { return <User User={item} /> }}
                keyExtractor={(item) => item.id}
                style={styles.flatList}
                ItemSeparatorComponent={ItemDivider}
                onRefresh= {async()=> {
                  setRefresh(true)
                  await getUserList().then(()=> setRefresh(false))
                }}
                refreshing={refresh}
             />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8dc',
      },
      flatList: {
        height: 50,
      },
      header: {
        fontWeight: 'bold',
        fontSize: 15,
      }
})


export default DiscoverPage;