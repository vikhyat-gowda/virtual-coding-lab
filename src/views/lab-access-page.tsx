import { useContext } from 'react'
import { useTableDataOnce, useTableInsert } from '../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import letterImg from '../assets/undraw_letter.svg'
import { Database } from '../@types'

import { AuthContext } from '../contexts'
import { RoutesPathName } from '../constants'

export const LabAccessPage = () => {
    const navigate = useNavigate()
    const { labId } = useParams()
    const [labData] = useTableDataOnce(
        'lab_sessions',
        [
            {
                columnName: 'session_id',
                operator: 'eq',
                value: labId!,
            },
        ],
        `*,teachers(*)`,
    )

    const [tableInsert] = useTableInsert('lab_participants', () => {
        navigate(`${RoutesPathName.SESSION_PAGE}/${labId}`)
    })
    const { user } = useContext(AuthContext)


    return (
        <div className='flex items-center justify-center bg-blue-400/10 h-screen w-screen'>
            <div className='relative  text-center py-40 w-3/4 bg-white h-3/4 shadow-md rounded-xl'>
                <div>
                    <h4 className=' text-3xl'>You are Invited to Join</h4>
                    <img
                        className='hidden lg:block -bottom-10 -right-20 absolute  '
                        src={letterImg}
                    />
                </div>
                {labData && (
                    <div className=' py-4'>
                        <h4 className=' text-3xl font-bold'>{labData[0].name}</h4>
                        <p className=' text-xl font-semibold'>
                            By: {labData[0].teachers.name}
                        </p>
                    </div>
                )}
                <div>
                    <button
                        onClick={() => {
                            if (user) {
                                const rowData: Database['public']['Tables']['lab_participants']['Insert'] =
                                    {
                                        session_id: labId,
                                        student_id: user!.id,
                                    }
                                tableInsert(rowData)
                            } else console.log('error getting current user id')
                        }}
                        className='py-4 bg-blue-500 p-2 w-32 rounded-md text-lg font-bold text-white'
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
}
