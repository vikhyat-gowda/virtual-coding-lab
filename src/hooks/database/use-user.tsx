import { useState, useEffect, useContext } from 'react'
import { Supabase } from '../../supabase'
import { AuthContext } from '../../contexts'
import { Roles } from '../../constants'

export const useUser = () => {
    const [userData, setUserData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(undefined)
    const { user, role } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const id_field = role === Roles.TEACHER ? 'teacher_id' : 'student_id'
                const { data, error } = await Supabase.from(role!)
                    .select('*')
                    .eq(id_field, user!.id)

                if (error) throw error
                console.log(data)
                setUserData(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error)
                console.log(error)
            }
        }
        if (user && role) fetchData()
    }, [user, role])

    return [userData, loading, error]
}
