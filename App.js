import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { supabase } from './supabase'
import AuthNavigation from './Navigation/AuthNavigation'
import HomeNavigation from './Navigation/HomeNavigation'
import 'react-native-gesture-handler'

const App = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <View style={styles.container}>
            {!session ? <AuthNavigation /> : <HomeNavigation />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
})

export default App;