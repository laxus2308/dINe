import React, {useState }from 'react'
import {
    TextInput,
    View, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const MessageInput = () => {
    const [message, setMessage] = useState('');

    const sendMessgae = () => {
        console.log(message);
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
            <TouchableOpacity  style={styles.icon} onPress={sendMessgae}>
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
    },
    textInput: {
        flex: 1,
    },
    icon: {
        marginLeft: '3%',
    }

})

export default MessageInput;