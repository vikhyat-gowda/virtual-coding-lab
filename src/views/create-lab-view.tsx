import { FiX } from 'react-icons/fi'
import { TextInput } from '../components'
import { useState, useContext } from 'react'
import { useTableInsert } from '../hooks'
import { Database } from '../@types'
import { AuthContext } from '../contexts'
import { LabState } from '../constants'

type CreateLabViewProps = {
    onClose: () => void;
};

export const CreateLabView = ({ onClose }: CreateLabViewProps) => {
    const [labName, setLabName] = useState('')
    const [labDesc, setLabDesc] = useState('')

    const [tableInsert, loading] = useTableInsert('lab_sessions', onClose)
    const { user } = useContext(AuthContext)

    return (
        <div className='absolute flex items-center justify-center z-20  w-[calc(100vw-7rem)] h-[calc(100vh-7rem)]'>
            <div className='w-1/2 min-w-[300px] md:w-1/4 px-6 py-4  bg-white shadow-lg  rounded-lg'>
                <div className='flex border-b-2 pb-2 items-center justify-between'>
                    <h3 className=' tracking-wider'>Create Lab</h3>
                    <button
                        className='bg-zinc-400/20 transition-all hover:bg-zinc-700/20 p-1 rounded-lg'
                        onClick={onClose}
                    >
                        <FiX className=' text-sm text-zinc-700/60 ' />
                    </button>
                </div>
                <form
                    className='flex flex-col py-2 gap-y-4'
                    onSubmit={(e) => {
                        e.preventDefault()
                        let insertData: Database['public']['Tables']['lab_sessions']['Insert']
                        insertData = {
                            description: labDesc,
                            name: labName,
                            teacher_id: user!.id,
                            status: LabState.LIVE,
                        }
                        if (labName !== '' && labDesc !== '') tableInsert(insertData)
                    }}
                >
                    <TextInput
                        value={labName}
                        onChangeText={setLabName}
                        type='text'
                        label='Lab Name'
                        name='labName'
                    />
                    <TextInput
                        value={labDesc}
                        type='text'
                        onChangeText={setLabDesc}
                        label='Description'
                        name='labName'
                    />
                    <button className='bg-blue-600 text-white my-2 p-2 w-full rounded-md'>
                        {loading && 'wait'}
                        Create Lab
                    </button>
                </form>
            </div>
        </div>
    )
}
