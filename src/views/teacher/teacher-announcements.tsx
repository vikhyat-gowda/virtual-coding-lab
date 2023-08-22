import { useEffect, useRef, useState } from 'react'
import { useTableData, useTableInsert } from '../../hooks'
import { RiSendPlaneFill } from 'react-icons/ri'

type InputBoxProps = {
    labId: string;
};

const InputBox = ({ labId }: InputBoxProps) => {
    const [text, setText] = useState<string>('')

    const [insertRow] = useTableInsert('lab_announcement')

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (text != '') {
                    insertRow({
                        session_id: labId,
                        message: text,
                    })
                }
                setText('')
            }}
            className='w-full flex gap-x-2 mt-2'
        >
            <input
                placeholder='write your messages...'
                className='w-full text-xs md:text-sm drop-shadow-md outline-none rounded-lg px-4 py-3'
                type='text'
                onChange={(e) => {
                    setText(e.target.value)
                }}
                value={text}
            />
            <button
                type='submit'
                className='bg-green-500 drop-shadow-md p-3 rounded-lg '
            >
                <RiSendPlaneFill className=' text-white text-lg' />
            </button>
        </form>
    )
}

type TeacherAnnouncementsProps = {
    labId: string;
};

const TeacherAnnouncements = ({ labId }: TeacherAnnouncementsProps) => {
    const [chats, loading] = useTableData(
        'lab_announcement',
        [{ columnName: 'session_id', operator: 'eq', value: labId }],
        `*`,
        [],
        ['INSERT'],
    )

    const chatBoxRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (chatBoxRef?.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight
        }
    }, [chats, loading])

    return (
        <>
            <ul
                ref={chatBoxRef}
                className='grow chatScrollBar scroll-smooth  w-full text-sm overflow-y-scroll h-[calc(100vh-9.3rem)]'
            >
                {chats &&
                    chats.map((chat: any) => {
                        return (
                            <li className='flex  first:mt-2 mt-6  pe-1 justify-end'>
                                <div className='w-fit max-w-xs'>
                                    <div className='px-4 py-2 rounded-lg  bg-white'>
                                        {chat.message}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
            </ul>
            <InputBox labId={labId} />
        </>
    )
}

export default TeacherAnnouncements
