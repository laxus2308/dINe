import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { supabase } from '../supabase';
import { useNavigation } from '@react-navigation/native';

const Request = (props) => {

    const {req} = props;
    const navigation = useNavigation();
    const getUri = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('requestpics').getPublicUrl(path)
            
            if (error) {
                throw error
            }
            return publicURL;
    
        } catch (error) {
            alert('Error downloading image: ', error.message)
            console.log(error)
        }
    }

    let uri;

    if (req.Request_url == null) {
        uri = require ('../assets/loid.jpg')
    } else {
        uri = getUri(req.Request_url);
        console.log('uri', uri)
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('View Request', {
            id: req.id
        })}>
            {req.Request_url == null ? (
                <Image
                    style={styles.thumb}
                    source={uri}
                />
            ) : (
                <Image
                    style={styles.thumb}
                    source={{ uri: uri }}
                />
            )}
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