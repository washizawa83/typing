import { createClient } from '@/app/_utils/supabase/client'

export const getUser = async () => {
    const supabase = createClient()
    return await supabase.auth.getUser()
}
