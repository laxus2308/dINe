const Message = (props) => {
    const {messageData} = props;
    const [username, setUsername] = useState('')

    const joinGroupMessage = () => {
        return messageData.is_bot;
    }

    if (joinGroupMessage()) {
        return (
            <View style = {styles.botMsgContainer}>
                <Text style={styles.botMsg}> {messageData.content}</Text>
            </View>
        )
    } 

    const getUsername = async () => {
        try {
            const { data: username, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', messageData.sender_id)
            .single()
    
            if (error) throw error
            // console.log(error)
            setUsername(username.username)
            // return username;
        } catch(error) {
            console.log('Message', error)
        }
    }

    const isMyMessage = () => {
        return messageData.sender_id === supabase.auth.user().id;
    }

    getUsername();

    return (
        <View style={[
            styles.container,
            { backgroundColor: isMyMessage() ? 'lightyellow' : 'lightgreen' ,
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'}
        ]}>          
            <Text style={styles.name}> {username}</Text>
            <Text style={styles.content}> {messageData.content}</Text>
            <Text style={styles.time}> {moment(messageData.created_at).fromNow()} </Text>
        </View>
    )
}