import { createContext, useEffect, useState, ReactNode } from 'react'
import { Supabase } from '../supabase'
import { Roles } from '../constants'
import { AuthContextType } from '../@types'

type AuthProviderProps = {
    children?: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    role: undefined,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<AuthContextType>({
        user: undefined,
        role: undefined,
    })

    useEffect(() => {
        Supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                switch (event) {
                    case 'SIGNED_IN':
                        setCurrentUser({
                            role: session.user.user_metadata.role as Roles,
                            user: session.user,
                        })
                        localStorage.setItem('userId', session.user.id)
                        break
                    case 'INITIAL_SESSION':
                        setCurrentUser({
                            role: session.user.user_metadata.role as Roles,
                            user: session.user,
                        })
                        console.log('[Auth Listener]: ', event, session)
                        localStorage.setItem('userId', session.user.id)
                        break
                    case 'SIGNED_OUT':
                        console.log('[Auth Listener]: ', event, session)
                        setCurrentUser({
                            role: session.user.user_metadata.role as Roles,
                            user: session.user,
                        })

                        localStorage.setItem('userId', session.user.id)
                        break
                    default:
                        console.log('[Auth Listener]: Unhandled event', event)
                        break
                }
            } else {
                console.log('[Auth Listener]: Unhandled event', event)
                setCurrentUser({
                    role: null,
                    user: null,
                })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
    )
}
