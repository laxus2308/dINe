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

    const sendMessage = async () => {
        if (!message) {
            alert("Can't send empty messages")
            return
        } 
        try {
            setSending(true);
            const {data, error} = await supabase.rpc('send_message', {
                room_id: room_id,
                content: message,
            })
            console.log(data)
            
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