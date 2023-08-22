import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { customStyles, languageOptions } from '../../constants'
import { useTableData } from '../../hooks'
import { Editor } from '@monaco-editor/react'
import { TeacherCodeAction } from '.'
import { ActionRef } from '../../@types/views/actions-ref'
import { postHeader } from '../../api'

type TeacherEditor = {
    labId: string;
    activeCodeId: string;
};

const TeacherEditor = ({ activeCodeId }: TeacherEditor) => {
    const [language, setLanguage] = useState<any>(languageOptions[0])
    const [text, setText] = useState<any>('')

    const actionRef = useRef<ActionRef>(null)
    const [stdInput, setStdInput] = useState<string>('')

    const [file, loading] = useTableData(
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
        ['UPDATE'],
    )

    useEffect(() => {
        if (file && file!.length > 0) {
            setText(file[0].code)
            setLanguage(
                languageOptions.filter((x: any) => x.id === file[0].lang_key)[0],
            )
        }
    }, [loading, activeCodeId, file])

    const handleCodeSubmit = async () => {
        const formData = {
            language_id: language.id,
            source_code: btoa(text),
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
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='h-full w-full transition-all'>
            <div className='flex  pr-4  items-center gap-x-4'>
                <Select
                    className='max-w-xs py-2'
                    onChange={(selected) => {
                        setLanguage(selected)
                    }}
                    styles={customStyles}
                    value={language}
                    isSearchable={true}
                    defaultValue={language}
                    placeholder='Choose Language'
                    options={languageOptions}
                />
                <div className=' text-xs'>
                    <p>File Name: {file && file[0]?.name}</p>
                </div>

            </div>
            {activeCodeId === ''
                ? 'Please Select a file or create a new one'
                : file && (
                <div className='flex h-[calc(100%-4rem)] w-full  flex-col '>
                    <div className='h-2/3 w-full'>
                        <Editor
                            theme='vs-dark'
                            height={`90%`}
                            value={text}
                            width={`95%`}
                            language={language?.value}
                            options={{ readOnly: true }}
                        />
                    </div>
                    <TeacherCodeAction
                        ref={actionRef}
                        setStdInput={setStdInput}
                        stdInput={stdInput}
                        onClose={() => {
                        }}
                        onSubmit={handleCodeSubmit}
                    />
                </div>
            )}
        </div>
    )
}

export default TeacherEditor
