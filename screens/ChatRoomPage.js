import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    FlatList,
} from 'react-native';
import Message from '../components/Message'
import { supabase } from '../supabase'
import { useRoute } from '@react-navigation/native';
import ChatsData from '../ChatsData'
import MessageInput from '../components/MessageInput';


const ChatRoomPage = () => {
    const route = useRoute();
    const room_id = route.params.id;

    const [messages, setMessages] = useState(null);

    const listenForChanges = () => {
        const mysub = supabase
            .from('messages')
            .on('*', async (update) => {
                await getMessages()
            })
            .subscribe();
        return mysub;
    }
    
    useEffect(() => {
        const unsub = getMessages().then(() => {
            return listenForChanges();
        })

    return async () => await unsub;
    }, [])
    
    const getMessages = async () => {
        try {
            const { data, error } = await supabase
            .from('messages')
            .select(`
              content,
              sender_id,
              created_at
            `)
            if (error) throw error
            // console.log(data)
            // console.log(data[0].avatar_url)
            // console.log(data[0].avatar_url[0].Avatar_url)
            // console.log("messages", data)
            setMessages(data)
        } catch(error) {
            console.log(error)
        }   
    }
      

    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message messageData={item} />}
                // inverted
                style={styles.flatList}
            />
            <MessageInput room_id={room_id} />
        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        height: '90%',
    }
})

export default ChatRoomPage;

 // const listenForChanges = async () => {
    //     const sub = await supabase
    //         .from('Messages')
    //         .on('*', async (update) => {
    //             await loadMessages()
    //         })
    //         .subscribe();
    //     return sub;
    // }

    // useEffect(() => {
    //     const unsub = loadMessages().then(() => {
    //         return listenForChanges();
    //     })

    //     return async () => await unsub;
    // }, [])

    // const loadMessages = async ({ sender, receiver }) => {
    //     // try {


    //     //     const { data, error } = await supabase
    //     //         .from('Messages')
    //     //         .select()
    //     // }


    // }