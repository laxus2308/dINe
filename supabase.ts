import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tkwrepsmafszvjeuppqg.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd3JlcHNtYWZzenZqZXVwcHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwMjc2NTYsImV4cCI6MTk2ODYwMzY1Nn0.FKYrIS4TumSd2m92qwb6lPUpEMYXYNTlZpHo_Wjfo9g"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
});