import { useNavigate } from 'react-router-dom'
import { useEffect, ReactNode } from 'react'
import { Supabase } from '../supabase'
import { RoutesPathName } from '../constants'

type NonProtectedRouteProps = {
    children: ReactNode;
};

const NonProtectedRoute = ({ children }: NonProtectedRouteProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {
                    data: { session },
                    error,
                } = await Supabase.auth.getSession()

                if (error) throw error

                if (session) {
                    navigate(RoutesPathName.DASHBOARD_PAGE)
                }
                console.log(session)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [])

    return <>{children}</>
}

export default NonProtectedRoute
