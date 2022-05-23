import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { supabase } from './supabase'
import AuthStack from './stacks/AuthStack'
import AccountPage from './screens/AccountPage'

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
            {!session ? <AuthStack /> : <AccountPage key={session.user.id} session={session} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default App;