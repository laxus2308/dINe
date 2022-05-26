import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_PUBLIC_KEY } from "@env";


const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_PUBLIC_KEY, {
    localStorage: AsyncStorage,
});

export default supabase;