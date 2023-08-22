import { useContext } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts'
import { Roles } from '../constants'
import { StudentSession } from './student'
import { TeacherSession } from './teacher'

export const Session = () => {
    const { labId } = useParams()
    const { user, role } = useContext(AuthContext)

    if (role === Roles.STUDENT)
        return <StudentSession labId={labId!} user={user!} role={role!} />

    if (role === Roles.TEACHER)
        return <TeacherSession labId={labId!} user={user!} role={role!} />
}


