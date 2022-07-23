import React, {useState, useEffect, useRef} from 'react'
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';
import Message from '../../components/chat/Message'
import { supabase } from '../../supabase'
import { useRoute } from '@react-navigation/native';
import MessageInput from '../../components/chat/MessageInput';

const ChatRoomPage = () => {
    const route = useRoute();
    const room_id = route.params.id;
    const flatListRef = useRef();
    const [messages, setMessages] = useState(null);
    const user = supabase.auth.user();
    
    //check for real time updates
    useEffect(() => {
        const sub = supabase
            .from(`messages:room_id=eq.${room_id}`)
            .on('*', (payload) => {
                setMessages(current => [payload.new, ...current])
            })
            .subscribe();
        return () => {
            supabase.removeSubscription(sub)
        }
    }, [])

    //get messages upon first navigate
    useEffect(() => {
        resetUnreadCounter();
        inChatroom();
        getMessages();
        return ()=> {
            notInChatroom();
        }
    }, [])

    const inChatroom = async () => {
        await supabase
        .from('chat_unread')
        .update({in_chatroom: true})
        .match({room_id: room_id, 
            user_id: user.id})
    }

    const notInChatroom = async() => {
        try {
            const { error} = await supabase
            .from('chat_unread')
            .update({in_chatroom: false})
            .match({room_id: room_id, 
                user_id: user.id})
            if (error) throw error
        } catch (error) {
            // alert(error.message)
            console.log("not in chatroom", error)
        }
    }

    const getMessages = async () => {
        try {
            const { data, error } = await supabase
            .from('messages')
            .select(`
              content,
              sender_id,
              created_at,
              is_bot
            `)
            .eq('room_id', room_id)
            .order('created_at', {ascending:false})
            if (error) throw error
            
            setMessages(data)
        } catch(error) {
            // alert(error.message)
            console.log("get messages", error)
        }   
    }

    const resetUnreadCounter = async() => {
        try {
            const {error} = await supabase
            .from('chat_unread')
            .update({unread: 0})
            .match({room_id: room_id, 
                    user_id: user.id})

            if (error) throw error
        } catch (error) {
            // alert(error.message)
            console.log("reset unread", error)
        }
    }

    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Message messageData={item} />}
                inverted
                style={styles.flatList}
                reference={flatListRef}
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
