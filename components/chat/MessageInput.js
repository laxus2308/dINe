import React, { useState }from 'react'
import {
    TextInput,
    View, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from '../../supabase';


const MessageInput = (props) => {
    const [message, setMessage] = useState('');
    const {room_id} = props;
    const [sending, setSending] = useState(false);

    const sendPushNotification = async(token, text, title) => {
        const message = {
          to: token,
          sound: 'default',
          title: title,
          body: text,
          data: { someData: 'goes here' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }

    const sendMessage = async () => {
        if (!message) {
            alert("Can't send empty messages")
            return
        } 
        const user = supabase.auth.user();
        try {
            setSending(true);
            const myUsername = await supabase.from('profiles').select().eq('id', user.id);
            const room_title = await supabase.from('chat_rooms').select().eq('id', room_id);
            const {data, error} = await supabase.rpc('send_message', {
                room_id: room_id,
                content: message,
            })

            for (let i = 0; i < data.length; i++) {
                sendPushNotification(data[i].notification_token, myUsername.body[0].username + ": " + message, room_title.body[0].name);
            }
            
            if(error) throw error
        } catch (error) {
            alert(error.message)
        } finally {
            setMessage('');
            setSending(false);
        }
    }

    return (
        <View style={styles.container}> 
  
            <TextInput 
                placeholder='Type a Message'
                textAlign='left'
                style={styles.textInput}
                value={message}
                onChangeText={(message) => setMessage(message)}
                // multiline
            />
            <TouchableOpacity  style={styles.icon} onPress={sendMessage} disabled= {sending}>
                <MaterialCommunityIcons name='send' size ={30}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        borderWidth: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    textInput: {
        flex: 1,
    },
    icon: {
        marginLeft: '3%',
    }

})

export default MessageInput;