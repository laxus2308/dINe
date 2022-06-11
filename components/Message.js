import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import moment from 'moment';

const Message = (props) => {
    const {messageData} = props;

    const isMyMessage = () => {
        return messageData.user.id === 'u1';
    }

    return (
        <View style={[
            styles.container,
            { backgroundColor: isMyMessage() ? 'lightyellow' : 'lightgreen' ,
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'}
        ]}>          
            <Text style={styles.name}> {messageData.user.username}</Text>
            <Text style={styles.content}> {messageData.content}</Text>
            <Text style={styles.time}> {moment(messageData.created_at).fromNow()} </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 30,
        padding: 10,
        marginBottom: '2%',
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
})

export default Message;
