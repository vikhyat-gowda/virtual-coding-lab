import { useState } from 'react'
import { StudentSidePanelWindow } from '../../constants'
import { FiChevronRight } from 'react-icons/fi'

import { TfiAnnouncement } from 'react-icons/tfi'

import clsx from 'clsx'
import FileTree from '../files-tree'
import { ChatBox } from '.'
import StudentAnnouncement from './student-announcement'

type StudentSidePanelProps = {
    onClose: () => void;
    labId?: string;
    participantId: string;
    activeCodeId: string;
    setActiveCodeId: (id: string) => void;
};

export const StudentSidePanel = ({
                                     onClose,
                                     labId,
                                     participantId,
                                     setActiveCodeId,
                                     activeCodeId,
                                 }: StudentSidePanelProps) => {
    const [activeChatView, setActiveChatView] = useState(
        StudentSidePanelWindow.FILES,
    )
    return (
        <div
            className='flex drop-shadow-sm flex-col h-full  font-roboto transition-all relative w-1/3  md:w-1/3 lg:w-1/4 max-h-full bg-slate-100 px-3 py-3 lg:pt-2 lg:pb-6 lg:ps-6 rounded-lg'>
            {/* Arrow for closing chat window */}
            <div
                onClick={() => onClose()}
                className='absolute bottom-2 -left-4 rounded-full bg-slate-100  p-2'
            >
                <FiChevronRight className=' text-xl text-zinc-700/60 hover:text-zinc-700' />
            </div>
            <div className='flex  h-full  items-center gap-x-3 justify-start max-h-14 border-b-2'>
                <button
                    type='button'
                    onClick={() => setActiveChatView(StudentSidePanelWindow.FILES)}
                    className={clsx(
                        'text-xs font-semibold rounded-lg px-2 py-2',
                        activeChatView === StudentSidePanelWindow.FILES
                            ? 'bg-green-500/20 text-green-800 '
                            : ' text-zinc-500',
                    )}
                >
                    Files
                </button>

                <button
                    type='button'
                    onClick={() => setActiveChatView(StudentSidePanelWindow.MESSAGES)}
                    className={clsx(
                        'text-xs font-semibold rounded-lg px-4 py-2',
                        activeChatView === StudentSidePanelWindow.MESSAGES
                            ? 'bg-green-500/20 text-green-800 '
                            : ' text-zinc-500',
                    )}
                >
                    Messages
                </button>

                <button
                    type='button'
                    onClick={() =>
                        setActiveChatView(StudentSidePanelWindow.ANNOUNCEMENTS)
                    }
                    className={clsx(
                        'text-xs font-semibold rounded-lg px-4 py-2',
                        activeChatView === StudentSidePanelWindow.ANNOUNCEMENTS
                            ? 'bg-green-500/20 text-green-800 '
                            : ' text-zinc-500',
                    )}
                >
                    <TfiAnnouncement />
                </button>
            </div>
            {activeChatView === StudentSidePanelWindow.MESSAGES && (
                <ChatBox labId={labId!} participantId={participantId} />
            )}

            {activeChatView === StudentSidePanelWindow.FILES && (
                <FileTree
                    participentId={participantId}
                    setActiveCodeId={setActiveCodeId}
                    activeCodeId={activeCodeId}
                />
            )}

            {activeChatView === StudentSidePanelWindow.ANNOUNCEMENTS && (
                <StudentAnnouncement labId={labId!} />
            )}
        </div>
    )
}
