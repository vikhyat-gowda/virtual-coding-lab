import { useContext } from 'react'
import { AuthContext } from '../contexts'
import { Roles } from '../constants'
import '../App.css'
import { TeacherDashboard } from './teacher'
import StudentDashboard from './student/student-dashboard'

export const DashboardPage = () => {
    const { user, role } = useContext(AuthContext)

    if (role === Roles.TEACHER)
        return <TeacherDashboard user={user!} role={role!} />
    if (role === Roles.STUDENT)
        return <StudentDashboard user={user!} role={role!} />
}


