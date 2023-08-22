import { useState } from 'react'
import { Supabase } from '../../supabase'
import { AuthResponse } from '@supabase/supabase-js'
import { Database, UserSignUpCreds, UseSignUpStates } from '../../@types'
import { useNavigate } from 'react-router-dom'
import { Roles } from '../../constants'

export const useSignUp = (): UseSignUpStates => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(undefined)
    const navigate = useNavigate()

    const signUp = async ({ email, password, role, name }: UserSignUpCreds) => {
        try {
            setError(undefined)
            setLoading(true)

            const {
                data: { user },
                error: createUserError,
            }: AuthResponse = await Supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role: role,
                    },
                },
            })

            if (createUserError) throw createUserError

            if (role === Roles.TEACHER) {
                const { error: createTeacherError } = await Supabase.from(role).insert<
                    Database['public']['Tables']['teachers']['Insert']
                >({
                    teacher_id: user!.id,
                    name,
                    email,
                })

                if (createTeacherError) throw createTeacherError
            } else if (role === Roles.STUDENT) {
                const { error: createStudentError } = await Supabase.from(role).insert<
                    Database['public']['Tables']['students']['Insert']
                >({
                    student_id: user!.id,
                    name,
                    email,
                })

                if (createStudentError) throw createStudentError
            }
            navigate('/')
        } catch (error: any) {
            setError(error)
            setLoading(false)
        }
    }

    return [signUp, loading, error]
}
