import { createClient } from '@/app/_utils/supabase/client'

export const getUser = async () => {
    const supabase = createClient()
    return await supabase.auth.getUser()
}

export const logout = async () => {
    const supabase = createClient()
    supabase.auth.signOut()
}

export const getPlayer = async (userId: string) => {
    const supabase = createClient()
    return supabase.from('players').select('*').eq('user_id', userId).limit(1)
}
