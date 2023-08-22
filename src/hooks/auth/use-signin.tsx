import { useState } from 'react'
import { Supabase } from '../../supabase'
import {
    AuthTokenResponse,
    SignInWithPasswordCredentials,
} from '@supabase/supabase-js'
import { UseSignInStates } from '../../@types'
import { useNavigate } from 'react-router-dom'
import { RoutesPathName } from '../../constants'

export const useSignIn = (): UseSignInStates => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(undefined)
    const navigate = useNavigate()

    const signIn = async (credentials: SignInWithPasswordCredentials) => {
        try {
            setLoading(true)

            if ('email' in credentials) {
                const { email, password } = credentials

                const { error }: AuthTokenResponse =
                    await Supabase.auth.signInWithPassword({ email, password })

                if (error) throw error

                navigate(RoutesPathName.DASHBOARD_PAGE)
            } else {
                throw new Error('Invalid credentials')
            }

            setLoading(false)
        } catch (error: any) {
            setError(error)
            setLoading(false)
        }
    }

    return [signIn, loading, error]
}
