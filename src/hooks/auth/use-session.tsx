import { useState, useEffect } from 'react'
import { Supabase } from '../../supabase'
import { User } from '@supabase/supabase-js'

export const useSession = () => {
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await Supabase.auth.getSession()
            if (session) setUser(session.user)
        }
        fetchUser()
    }, [])

    return [user]
}
