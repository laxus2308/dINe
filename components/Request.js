import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';

const Request = (props) => {
    const {title, image, onPress, username, date, time} = props;

    return (
        <TouchableOpacity style={styles.card} onPress = {onPress}>
            <Image
                style= {styles.thumb}
                source={image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.timing}>Date: {date}</Text>
                <Text style={styles.timing}>Time: {time}</Text>
                <Text style={styles.username}>{username}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 0.5,
        flexDirection: 'column',
        backgroundColor: 'honeydew',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
        marginVertical: 10,
        marginHorizontal: 5,
    },

    thumb: {
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
    },

    infoContainer: {
        padding: 10,
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    timing: {
        fontSize: 12,
        fontWeight: '600',
    },

    username: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'right',
        fontStyle: 'italic'
    },
})

export default Request;