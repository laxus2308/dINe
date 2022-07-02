import React, {useState}from 'react'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import moment from 'moment';
import { supabase } from '../../supabase';


const Message = (props) => {
    const {messageData} = props;
    const [username, setUsername] = useState('')

    const joinGroupMessage = () => {
        console.log(messageData)
        return messageData.is_bot;
    }
    
    if (joinGroupMessage()) {
        return (
            <View style = {styles.botMsgContainer}>
                <Text style={styles.botMsg}> {messageData.content}</Text>
            </View>
        )
    } else {
        const isMyMessage = () => {
            return messageData.sender_id === supabase.auth.user().id;
        }

        const getUsername = async () => {
            try {
                const { data: username, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', messageData.sender_id)
                .single()
        
                if (error) throw error
                // console.log(error)
                setUsername(username.username)
                // return username;
            } catch(error) {
                console.log('Message', error)
            }
        }
        getUsername()

        return (
            <View style={[
                styles.container,
                { backgroundColor: isMyMessage() ? 'lightyellow' : 'lightgreen' ,
                    alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'}
            ]}>          
                <Text style={styles.name}> {username}</Text>
                <Text style={styles.content}> {messageData.content}</Text>
                <Text style={styles.time}> {moment(messageData.created_at).fromNow()} </Text>
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 30,
        padding: 10,
        marginVertical: '1%',
        marginHorizontal: '2%',
    },
    name: {
        color: 'darkorange',
        marginBottom: '1%',

    }, 
    content: {
      fontSize: 15,
    },
    time: {
        alignSelf:'flex-end',
        color: 'grey',
    },
    botMsg: {
        fontSize: 13,
        alignSelf:'center',
    },
    botMsgContainer: {
        backgroundColor: 'lightblue',
        width: '75%',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 5,
        marginVertical: '1%',
    }
})

export default Message;
