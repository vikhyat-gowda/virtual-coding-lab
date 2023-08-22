import { useNavigate } from 'react-router-dom'
import { Supabase } from '../../supabase'
import { errorToast } from '../../utils'

export const useLogout = () => {
    const navigate = useNavigate()
    const logOut = async () => {
        try {
            const { error } = await Supabase.auth.signOut()
            if (error) throw error

            navigate('/home')
        } catch (error) {
            errorToast('Error Logging Out')
        }
    }
    return [logOut]
}
