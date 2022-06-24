import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { supabase } from '../../supabase';

const SpecificMatchPage = () => {

    return (
        <View style={styles.container}>
            <Text>A cool specific match page</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8dc',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


export default SpecificMatchPage;