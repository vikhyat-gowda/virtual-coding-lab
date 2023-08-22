import { useEffect, useContext } from 'react'

import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesPathName } from '../constants'
import { AuthContext } from '../contexts'

type ProtectedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) navigate(RoutesPathName.LANDING_PAGE)
    }, [user])

    if (!user) return <>Loading</>

    return <>{children}</>
}
