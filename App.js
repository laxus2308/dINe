import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { supabase } from './supabase'
import AuthNavigation from './Navigation/AuthNavigation'
import AccountPage from './screens/AccountPage'
import ProfilePage from './screens/ProfilePage'

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
            {!session ? <AuthNavigation /> : <ProfilePage session={session} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default App;