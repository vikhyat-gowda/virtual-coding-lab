import { useRef, useState } from 'react'
import { useTableDataOnce } from '../../hooks'
import { FiChevronLeft, FiChevronUp } from 'react-icons/fi'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { CodeEditorView, CodeActionView } from '..'
import { User } from '@supabase/supabase-js'
import { Roles, RoutesPathName } from '../../constants'
import { StudentSidePanel } from '.'
import { EditorRef } from '../../@types'
import { ActionRef } from '../../@types/views/actions-ref'
import { postHeader } from '../../api'
import { Link } from 'react-router-dom'

type StudentSessionProps = {
    labId: string;
    user: User;
    role: Roles;
};

export const StudentSession = ({ labId, user }: StudentSessionProps) => {
    const [isOpenChatSection, setIsOpenChatSection] = useState(true)
    const [isOpenCompileSection, setIsOpenCompileSection] = useState(false)

    const [activeCodeId, setActiveCodeId] = useState<string>('')
    const [labData] = useTableDataOnce('lab_sessions', [
        { columnName: 'session_id', operator: 'eq', value: labId },
    ])
    const [participantData] = useTableDataOnce('lab_participants', [
        {
            columnName: 'session_id',
            operator: 'eq',
            value: labId,
        },
        {
            columnName: 'student_id',
            operator: 'eq',
            value: user?.id,
        },
    ])

    const editorRef = useRef<EditorRef>(null)
    const actionRef = useRef<ActionRef>(null)
    const [stdInput, setStdInput] = useState<string>('')

    const handleCodeSubmit = async () => {
        const editorData = editorRef.current?.getEditorState()

        const formData = {
            language_id: editorData!.language_id,
            source_code: btoa(editorData!.source_code),
            stdin: btoa(stdInput),
        }

        const url =
            'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*'

        const options = {
            method: 'POST',
            headers: postHeader,
            body: JSON.stringify(formData),
        }
        console.log(formData)

        try {
            const response = await fetch(url, options)
            const result = await response.json()
            console.log(result)
            actionRef.current?.checkInfo(result['token'])
            // checkStatus(result["token"]);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='border-l-2 w-full flex flex-col rounded-xl font-mono '>
            {!isOpenChatSection && (
                <div
                    onClick={() => setIsOpenChatSection(true)}
                    className='absolute z-10 bottom-4 right-0 bg-zinc-400/20 p-2 rounded-s-full '
                >
                    <RiQuestionAnswerFill className='text-xl text-zinc-700/60 hover:text-zinc-700' />
                </div>
            )}
            <div className='flex h-full p-2   '>
                <div className='relative example flex flex-col justify-between h-full  flex-1'>
                    {!isOpenCompileSection && (
                        <button
                            onClick={() => setIsOpenCompileSection(true)}
                            className='absolute -bottom-2 left-1/2 p-1 hover:bg-zinc-300 bg-zinc-200  rounded-t-full text-lg'
                        >
                            <FiChevronUp className=' text-zinc-400' />
                        </button>
                    )}

                    <div className='border-b-2 mx-2 flex items-center py-2 gap-x-4 font-sans'>
                        <Link
                            to={RoutesPathName.DASHBOARD_PAGE}
                            className='bg-zinc-400/20 transition-all hover:bg-zinc-700/20 p-2 rounded-lg'
                        >
                            <FiChevronLeft className=' text-sm text-zinc-700/60 ' />
                        </Link>

                        <div>
                            <p className='font-semibold tracking-wider'>
                                {labData && labData![0]!.name}
                            </p>
                            <span className='text-sm '>
                {labData && labData![0]!.description}
              </span>
                        </div>
                    </div>
                    <div className='h-full mx-2 '>
                        {participantData && (
                            <CodeEditorView
                                labId={labId!}
                                participantId={participantData[0].participant_id}
                                userId={user!.id}
                                activeCodeId={activeCodeId}
                                ref={editorRef}
                            />
                        )}
                    </div>

                    {isOpenCompileSection && (
                        <CodeActionView
                            onClose={() => setIsOpenCompileSection(false)}
                            onSubmit={handleCodeSubmit}
                            ref={actionRef}
                            setStdInput={setStdInput}
                            stdInput={stdInput}
                        />
                    )}
                </div>

                {/* message section */}
                {isOpenChatSection && participantData && (
                    <StudentSidePanel
                        onClose={() => setIsOpenChatSection(false)}
                        labId={labId}
                        participantId={participantData[0].participant_id}
                        setActiveCodeId={setActiveCodeId}
                        activeCodeId={activeCodeId}
                    />
                )}
            </div>
        </div>
    )
}
