import { useEffect, useRef } from 'react'
import { useTableData } from '../../hooks'

type StudentAnnouncementProps = {
    labId: string;
};

const StudentAnnouncement = ({ labId }: StudentAnnouncementProps) => {
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
                                    <p className=' text-xs ps-1 font-bold mb-1'>Teacher</p>
                                    <div className='px-4 py-2 rounded-lg  bg-white'>
                                        {chat.message}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
            </ul>
        </>
    )
}

export default StudentAnnouncement
