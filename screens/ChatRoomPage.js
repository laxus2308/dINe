import React from 'react'
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

    return (
        <View>
            <FlatList
                data={ChatsData.messages}
                renderItem={({ item }) => <Message messageData={item} />}
                // inverted
                style={styles.flatList}
            />
            <MessageInput />
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