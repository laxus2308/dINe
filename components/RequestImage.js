import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { supabase } from '../supabase';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'

const RequestImage = ({ url }) => {
    const [hasUrl, setUrl] = url ? useState(true) : useState(false);
    const [hasGalleryPermission, setGalleryPermission] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryPermission(galleryStatus.status === 'granted');
        });
    }, [])

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Image,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            uploadRequest(result.base64);
        }
    };

    if (hasGalleryPermission === false) {
        return <Text> No access to Internal Storage </Text>
    }

    const uploadRequest = async (base64File) => {
        try {
            setUploading(true)
            const user = supabase.auth.user()

            //const url = await getExistingImage();
            if (url) {
                const { data, error: deleteError } = await supabase.storage
                    .from('requestpics')
                    .remove([url + '.png'])
                console.log(data)
                console.log(deleteError)
                if (deleteError) throw deleteError
            }

            const filePath = `public/${user.id}/${Math.random()}`
            const { error: uploadError } = await supabase.storage
                .from('requestpics')
                .upload(filePath, decode(base64File), {
                    contentType: 'image/png',
                    // upsert: 'false'
                })

            const { error } = await supabase
                .from('Requests')
                .update({ Request_url: filePath })
                .match({ id: user.id })

            if (uploadError) {
                throw uploadError
            } else if (error) {
                throw error
            } else {
                setUrl(false)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    // const getExistingImage = async () => {
    //     try {
    //         const user = supabase.auth.user()
    //         const { data, error } = await supabase
    //             .from('Requests')
    //             .select('Request_url')
    //             .match({ id: user.id })
    //         if (error) {
    //             throw error
    //         }
    //         return data[0].Request_url
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    const downloadImage = (path) => {
        try {
            const { publicURL, error } = supabase.storage.from('requestpics').getPublicUrl(path)
            if (error) {
                throw error
            }
            return publicURL;
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    };

    return (
        <View style={styles.container}>
            {hasUrl ? (
                <Image
                    style={styles.image}
                    source={image}
                />
            ) : (
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                />
            )}
            <TouchableOpacity
                style={styles.Button}
                onPress={() => pickImage()}>
                <Text> Import from gallery </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        marginBottom: 30,
        marginTop: 20,
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    Button: {
        borderRadius: 25,
        height: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#ffff00",
    },
});

export default RequestImage;