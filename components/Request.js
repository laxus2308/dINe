import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, onPress} from 'react-native';

const getUri = (path) => {
    try {
        const { publicURL, error } = supabase.storage.from('requestpics').getPublicUrl(path)
        console.log(path)
        console.log(publicURL)
        
        if (error) {
            throw error
        }
        return publicURL;

    } catch (error) {
        alert('Error downloading image: ', error.message)
    }
}


const Request = (props) => {
    const {req} = props;
    //if no url provided
    let uri;
    if (req.Request_url == null) {
        uri = require ('../assets/loid.jpg')
    } else {
        uri = getUri(req.Request_url);
    }

    return (
        <TouchableOpacity style={styles.card} onPress = {onPress}>
            {/* <Image
                    source={{uri: uri}}
                    style={styles.thumb}
                /> */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{req.Title}</Text>
                <Text style={styles.timing}>Location: {req.Location}</Text>
                <Text style={styles.timing}>Date: {req.Date}</Text>
                <Text style={styles.timing}>Time: {req.Time}</Text>
                <Text style={styles.timing}>Pax: {req.Pax}</Text>
                <Text style={styles.username}>{req.username.Username}</Text>
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