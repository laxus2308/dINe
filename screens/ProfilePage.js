import react from 'React'
import {
    View,
    Text,
} from 'react-native'
import { supabase } from '../supabase'

const Profile = () => {
    const createProfile = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .insert([
                { name: }
            ])


    }
}

export default Profile;
