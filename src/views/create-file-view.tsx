import { FiX } from 'react-icons/fi'
import { TextInput } from '../components'
import { languageOptions } from '../constants'
import { useState } from 'react'
import Select from 'react-select'
import { useTableInsert } from '../hooks'

type CreateFileViewProps = {
    participantId: string;
    onClose: () => void;
    sessionId: string;
    userId: string;
};

const customStyles = {
    control: (styles: any) => ({
        ...styles,
        width: '100%',
        minWidth: '12rem',
        borderRadius: '5px',
        color: '#000',
        fontSize: '0.8rem',
        lineHeight: '1.75rem',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
    }),
    option: (styles: any) => {
        return {
            ...styles,
            color: '#000',
            fontSize: '0.8rem',
            lineHeight: '1.75rem',
            width: '100%',
            background: '#fff',
        }
    },
    menu: (styles: any) => {
        return {
            ...styles,
            backgroundColor: '#fff',
            maxWidth: '14rem',
            border: '2px solid #000000',
            borderRadius: '5px',

        }
    },

    placeholder: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            color: '#000',
            fontSize: '0.8rem',
            lineHeight: '1.75rem',
        }
    },
}

const CreateFileView = ({
                            participantId,
                            onClose,
                            sessionId,
                            userId,
                        }: CreateFileViewProps) => {
    // const [language, setLanguage] = useState<any>(languageOptions[0]);

    const [createFile] = useTableInsert('lab_codes', onClose)
    const [fileName, setFileName] = useState('')
    const [languageCode, setLanguageCode] = useState<any>(languageOptions[0])

    return (
        <div className='absolute flex items-center justify-center z-20  w-[calc(100vw-7rem)] h-[calc(100vh-7rem)]'>
            <div className='w-1/2 min-w-[300px] md:w-1/4 px-6 py-4  bg-white shadow-lg  rounded-lg'>
                <div className='flex border-b-2 pb-2 items-center justify-between'>
                    <h3 className=' tracking-wider'>Create File</h3>
                    <button
                        onClick={onClose}
                        className='bg-zinc-400/20 transition-all hover:bg-zinc-700/20 p-1 rounded-lg'
                    >
                        <FiX className=' text-sm text-zinc-700/60 ' />
                    </button>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        console.log({
                            participant_id: participantId,
                            student_id: userId,
                            session_id: sessionId,
                            name: fileName,
                            code: '',
                            lang_key: languageCode.id,
                        })

                        createFile({
                            participant_id: participantId,
                            student_id: userId,
                            session_id: sessionId,
                            name: fileName,
                            code: '',
                            lang_key: languageCode.id,
                        })
                    }}
                    className='flex flex-col py-2 gap-y-4'
                >
                    <TextInput
                        value={fileName}
                        onChangeText={setFileName}
                        type='text'
                        label='File Name'
                        name='labName'
                    />
                    <div>
                        <label className='text-sm'>Language </label>
                        <Select
                            onChange={(selected) => {
                                setLanguageCode(selected)
                            }}
                            styles={customStyles}
                            isSearchable={true}
                            defaultValue={languageOptions[0]}
                            placeholder='Choose Language'
                            options={languageOptions}
                        />
                    </div>
                    <button className='bg-blue-600 text-white my-2 p-2 w-full rounded-md'>
                        {/* {loading && "wait"} */}
                        Create File
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateFileView
