import { useState } from 'react'
import { useTableData, useTableDataOnce } from '../../hooks'
import clsx from 'clsx'

import { FiChevronDown, FiChevronRight, FiMessageSquare } from 'react-icons/fi'
import { TeacherSidePanelWindow } from '../../constants'

import { TeacherChatBox } from '.'
import TeacherAnnouncements from './teacher-announcements'

type StudentListItemProps = {
    studentData: any;
    activeCodeId: string;
    setActiveCodeId: (str: string) => void;

    changeToChat: (particiId: string, name: string) => void;
};
const StudentListItem = ({
                             studentData,
                             setActiveCodeId,
                             activeCodeId,
                             changeToChat,
                         }: StudentListItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const [fileList] = useTableData(
        'lab_codes',
        [
            {
                columnName: 'participant_id',
                operator: 'eq',
                value: studentData.participant_id,
            },
        ],
        `name, code_id`,
        [],
        ['INSERT', 'DELETE'],
    )

    return (
        <li
            className={clsx(
                'group my-2 p-1 rounded-md transition-all',
                !isExpanded && 'hover:bg-green-500/50',
                isExpanded && 'bg-green-500/10',
            )}
        >
            <div className='flex items-center'>
        <span
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-x-1 w-full transition-all'
        >
          {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            <span className='select-none'>{studentData.students.name}</span>
        </span>
                <span
                    onClick={() =>
                        changeToChat(studentData.participant_id, studentData.students.name)
                    }
                >
          <FiMessageSquare className='hover:scale-105 invisible mr-2 group-hover:visible' />
        </span>
            </div>
            {isExpanded && (
                <ul className='border-t border-green-5n00 transition-all ml-3'>
                    {fileList &&
                        fileList.map((file: any) => {
                            return (
                                <li
                                    key={file.code_id}
                                    onClick={() => setActiveCodeId(file.code_id)}
                                    className={clsx(
                                        'text-sm my-1 select-none flex items-center gap-x-2 py-1 rounded-md px-2',
                                        isExpanded && 'hover:hover:bg-green-500/50',
                                        file.code_id === activeCodeId && 'bg-green-500',
                                    )}
                                >
                                    {file.name}
                                </li>
                            )
                        })}
                </ul>
            )}
        </li>
    )
}

type TeacherSidePanelProps = {
    setActiveCodeId: (id: string) => void;
    labId: string;
    activeCodeId: string;
};

export const TeacherSidePanel = ({
                                     setActiveCodeId,
                                     labId,
                                     activeCodeId,
                                 }: TeacherSidePanelProps) => {
    const [labStudents] = useTableDataOnce(
        'lab_participants',
        [{ columnName: 'session_id', operator: 'eq', value: labId }],
        `*,students(*)`,
    )

    const [panelState, setPanelState] = useState<TeacherSidePanelWindow>(
        TeacherSidePanelWindow.FILES,
    )
    const [participantId, setParticipantId] = useState('')
    const [studentName, setStudentName] = useState('')

    return (
        <div
            className='flex drop-shadow-sm flex-col h-full  font-roboto transition-all relative w-1/3  md:w-1/3 lg:w-1/4 max-h-full bg-slate-100 px-3 py-3 lg:pt-2 lg:pb-6 lg:ps-6 rounded-lg'>
            <div className='flex  h-full  items-center gap-x-3 justify-start max-h-14 border-b-2'>
                <button
                    onClick={() => setPanelState(TeacherSidePanelWindow.FILES)}
                    type='button'
                    className={clsx(
                        'text-xs font-semibold rounded-lg px-4 py-2 select-none',
                        panelState === TeacherSidePanelWindow.FILES && 'bg-green-400/30',
                    )}
                >
                    Students
                </button>
                <button
                    type='button'
                    onClick={() => setPanelState(TeacherSidePanelWindow.ANNOUNCEMENTS)}
                    className={clsx(
                        'text-xs font-semibold rounded-lg px-4 py-2 select-none',
                        panelState === TeacherSidePanelWindow.ANNOUNCEMENTS &&
                        'bg-green-400/30',
                    )}
                >
                    Announcements
                </button>
            </div>
            <div>
                {panelState === TeacherSidePanelWindow.FILES && (
                    <ul className='my-2'>
                        {labStudents &&
                            labStudents.map((labStudent: any) => {
                                // no enought time for declaring types fix later
                                return (
                                    <StudentListItem
                                        key={labStudent.participant_id}
                                        setActiveCodeId={setActiveCodeId}
                                        studentData={labStudent}
                                        activeCodeId={activeCodeId}
                                        changeToChat={(pId, name) => {
                                            setParticipantId(pId)
                                            setPanelState(TeacherSidePanelWindow.MESSAGES)
                                            setStudentName(name)
                                        }}
                                    />
                                )
                            })}
                    </ul>
                )}
            </div>

            <div>
                {panelState === TeacherSidePanelWindow.MESSAGES && (
                    <TeacherChatBox
                        participantId={participantId}
                        labId={labId}
                        studentName={studentName}
                    />
                )}

                {panelState === TeacherSidePanelWindow.ANNOUNCEMENTS && (
                    <TeacherAnnouncements labId={labId} />
                )}
            </div>
        </div>
    )
}
