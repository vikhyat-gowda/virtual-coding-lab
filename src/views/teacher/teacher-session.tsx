import { User } from '@supabase/supabase-js'
import { Roles } from '../../constants'
import { FiChevronLeft } from 'react-icons/fi'

import { useState } from 'react'

import { Link } from 'react-router-dom'

import TeacherEditor from './teacher-editor'
import { TeacherSidePanel } from '.'

type TeacherSessionProps = {
    labId: string;
    user: User;
    role: Roles;
};

export const TeacherSession = ({ labId }: TeacherSessionProps) => {
    const [activeCodeId, setActiveCodeId] = useState<any>('')

    return (
        <div className='border-l-2 w-full flex flex-col rounded-xl font-mono '>
            <div className='flex h-full p-2   '>
                <div className='relative example flex flex-col justify-between h-full  flex-1'>
                    <div className='border-b-2 mx-2 flex items-center py-2 gap-x-4 font-sans'>
            <span className='bg-zinc-400/20 transition-all hover:bg-zinc-700/20 p-2 rounded-lg'>
              <Link to='/'>
                <FiChevronLeft className=' text-sm text-zinc-700/60 ' />
              </Link>
            </span>
                        <div>
                            <p className='font-semibold tracking-wider'>Ada Lab</p>
                            <span className='text-sm '>Secion: A Sem: 4</span>
                        </div>
                    </div>
                    <TeacherEditor labId={labId} activeCodeId={activeCodeId} />
                </div>

                {/* message section */}
                <TeacherSidePanel
                    activeCodeId={activeCodeId}
                    setActiveCodeId={setActiveCodeId}
                    labId={labId}
                />
            </div>
        </div>
    )
}

