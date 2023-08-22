import { Editor } from '@monaco-editor/react'
import {
    useState,
    useEffect,
    useCallback,
    useImperativeHandle,
    forwardRef,
} from 'react'
import Select from 'react-select'
import { customStyles, languageOptions } from '../constants'
import { FiFilePlus } from 'react-icons/fi'
import CreateFileView from './create-file-view'
import { useTableDataOnce } from '../hooks'
import { debounce } from 'lodash'
import useTableUpdate from '../hooks/database/use-table-update'
import { EditorRef } from '../@types'

type CodeEditorProps = {
    labId: string;
    participantId: string;
    userId: string;
    activeCodeId: string;
};

export const CodeEditorView = forwardRef(
    (
        { labId, participantId, userId, activeCodeId }: CodeEditorProps,
        ref: any,
    ) => {
        const [text, setText] = useState<any>('')
        const [isCreateFileOpen, setIsCreateFileOpen] = useState(false)
        const [language, setLanguage] = useState<any>(languageOptions[0])

        const [file] = useTableDataOnce(
            'lab_codes',
            [
                {
                    columnName: 'code_id',
                    operator: 'eq',
                    value: activeCodeId,
                },
            ],
            '*',
            [activeCodeId],
        )

        useEffect(() => {
            if (file && file!.length > 0) {
                setText(file[0].code)
                setLanguage(
                    languageOptions.filter((x: any) => x.id === file[0].lang_key)[0],
                )
            }
        }, [activeCodeId, file])

        const [update] = useTableUpdate('lab_codes')

        useEffect(() => {
            update(
                {
                    lang_key: language.id,
                },
                [
                    {
                        columnName: 'code_id',
                        operator: 'eq',
                        value: activeCodeId,
                    },
                ],
            )
        }, [language])

        useImperativeHandle<EditorRef, EditorRef>(
            ref,
            () => {
                return {
                    getEditorState() {
                        return {
                            language_id: language.id,
                            source_code: text,
                        }
                    },
                }
            },
            [language, text],
        )

        const debouncedUpdate = useCallback(
            debounce((text) => {
                console.log('updated', activeCodeId)
                update(
                    {
                        code: text,
                    },
                    [
                        {
                            columnName: 'code_id',
                            operator: 'eq',
                            value: activeCodeId,
                        },
                    ],
                )
            }, 1000),
            [activeCodeId],
        )

        return (
            <>
                {isCreateFileOpen && (
                    <CreateFileView
                        sessionId={labId}
                        userId={userId}
                        participantId={participantId}
                        onClose={() => setIsCreateFileOpen(false)}
                    />
                )}
                <div className='h-full w-full transition-all'>
                    <div className='flex  pr-4  items-center gap-x-4'>
                        <Select
                            className='max-w-xs py-2'
                            onChange={(selected) => {
                                setLanguage(selected)
                            }}
                            value={language}
                            styles={customStyles}
                            isSearchable={true}
                            placeholder='Choose Language'
                            options={languageOptions}
                        />

                        <div className=' text-xs'>
                            <p>File Name: {file && file[0]?.name}</p>
                        </div>
                        <button
                            onClick={() => {
                                setIsCreateFileOpen(!isCreateFileOpen)
                            }}
                            className=' bg-zinc-100 hover:bg-zinc-200 p-2 rounded-md items-center gap-x-2 flex whitespace-nowrap ml-auto mr-4 lg:mr-16'
                        >
                            <p className='hidden lg:block text-xs'>Create New File</p>
                            <FiFilePlus className=' text-green-500 text-xl' />
                        </button>
                    </div>
                    {activeCodeId === ''
                        ? 'Please Select a file or create a new one'
                        : file &&
                        activeCodeId && (
                            <Editor
                                theme='vs-dark'
                                height={`85%`}
                                value={text}
                                onChange={(e) => {
                                    setText(e)
                                    console.log(e)
                                    debouncedUpdate(e)
                                }}
                                width={`95%`}
                                language={language?.value}
                            />
                        )}
                </div>
            </>
        )
    },
)
