import React, {useState }from 'react'
import {
    TextInput,
    View, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { supabase } from '../supabase';


const MessageInput = (props) => {
    const [message, setMessage] = useState('');
    const {room_id} = props;

    const sendMessage = async () => {
        if (!message) {
            alert("Can't send empty messages")
            return
        } 
        try {
            const user = supabase.auth.user()
            const { error } = await supabase
            .from('messages')
            .insert([
                { 
                room_id:room_id,
                content: message,
                sender_id: user.id,
                }
            ])
            if(error) throw error
        } catch (error) {
            console.log('Message input', error)
        } finally {
            setMessage('')
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
            <TouchableOpacity  style={styles.icon} onPress={sendMessage}>
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