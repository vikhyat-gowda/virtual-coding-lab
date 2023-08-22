import { User } from '@supabase/supabase-js'
import { Roles, RoutesPathName } from '../../constants'
import { useTableData, useUser } from '../../hooks'
import { Link } from 'react-router-dom'

type StudentDashboardProps = {
    user: User;
    role: Roles;
};

const StudentDashboard = ({ user }: StudentDashboardProps) => {
    const [userData] = useUser()
    const [labSessions, loading] = useTableData(
        'lab_participants',
        [{ columnName: 'student_id', operator: 'eq', value: user.id }],
        `*,lab_sessions(*)`,
    )

    return (
        <div className='relative border-l-2 w-full rounded-xl font-mono p-4'>
            <div className='flex items-center justify-between border-b-2 pb-4'>
                <h4 className='text-lg'>Welcome, {userData && userData[0].name}</h4>
            </div>
            <div className='relative  z-10 flex my-6 gap-x-6'>
                {loading && (
                    <div
                        className={`flex-1 rounded-xl chatScrollBar max-h-[calc(100vh-8.9rem)] overflow-y-scroll bg-green-500/10 `}
                    >
                        <h4
                            className={` sticky top-0 bg-green-300 text-lg py-4 px-4 font-semibold border-b-2 border-b-green-500/30`}
                        >
                            Your Labs
                        </h4>
                        <ul className=' flex flex-col'>
                            {labSessions?.map((lab_session: any) => {
                                return (
                                    <li
                                        className={`group flex items-center justify-between px-4 py-2 hover:bg-green-500/50  transition-all `}
                                    >
                                        <Link
                                            className='w-full'
                                            key={lab_session.session_id}
                                            to={`${RoutesPathName.SESSION_PAGE}/${lab_session.session_id}`}
                                        >
                                            <div>
                                                <p className='font-semibold'>
                                                    {lab_session.lab_sessions.name}
                                                </p>
                                                <p>{lab_session.lab_sessions.description}</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentDashboard
