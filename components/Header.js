import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

const Header = () => {
    return (
        <KeyboardAvoidingView>
            <View style={styles.header}>
                <Text style={styles.text}> dINe </Text>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingTop: 10,
        backgroundColor: 'yellow',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    }
})
export default Header;