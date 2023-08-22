import { useImperativeHandle, useState, forwardRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { ActionRef } from '../@types/views/actions-ref'
import { getHeader } from '../api'

type CodeActionViewProps = {
    onClose: () => void;
    onSubmit: () => void;
    stdInput: string;
    setStdInput: (s: string) => void;
};

export const CodeActionView = forwardRef(
    (
        { onClose, onSubmit, setStdInput, stdInput }: CodeActionViewProps,
        ref: any,
    ) => {
        const [outputDetails, setOutputDetails] = useState<any>()
        const [processing, setProcessing] = useState<boolean>(false)

        const getOutput = () => {
            const statusId = outputDetails?.status?.id

            if (statusId === 6) {
                // compilation error
                return (
                    <pre className='px-2 py-1 font-normal text-xs text-red-500'>
            {atob(outputDetails?.compile_output)}
          </pre>
                )
            } else if (statusId === 3) {
                return (
                    <pre className='px-2 py-1 font-normal text-xs text-green-500'>
            {atob(outputDetails.stdout) !== null
                ? `${atob(outputDetails.stdout)}`
                : null}
          </pre>
                )
            } else if (statusId === 5) {
                return (
                    <pre className='px-2 py-1 font-normal text-xs text-red-500'>
            {`Time Limit Exceeded`}
          </pre>
                )
            } else {
                return (
                    <pre className='px-2 py-1 font-normal text-xs text-red-500'>
            {atob(outputDetails?.stderr)}
          </pre>
                )
            }
        }

        const checkStatus = async (token: string) => {
            const url = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`
            const options = {
                method: 'GET',
                headers: getHeader,
            }

            try {
                setProcessing(true)
                const response = await fetch(url, options)
                const result = await response.json()
                let statusId = result.status.id
                if (statusId === 1 || statusId === 2) {
                    setTimeout(() => {
                        checkStatus(token)
                    }, 2000)
                } else {
                    setProcessing(false)
                    console.log(result)
                    setOutputDetails(result)
                }
                return
            } catch (error) {
                setProcessing(false)
                console.error(error)
            }
        }

        useImperativeHandle<ActionRef, ActionRef>(
            ref,
            () => {
                return {
                    getInputText() {
                        return stdInput
                    },
                    checkInfo(token) {
                        checkStatus(token)
                    },
                }
            },
            [],
        )

        return (
            <div className='relative flex gap-x-4 h-1/3 mx-2 rounded-lg p-2 bg-slate-100 transition-all'>
                <button
                    onClick={() => onClose()}
                    className='-top-2 left-1/2 p-2 rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300  absolute'
                >
                    <FiChevronDown />
                </button>
                <div className='grow font-roboto  '>
                    <p className=' text-sm tracking-wide p-1'>Output</p>
                    <div className='text-sm h-52 p-2  overflow-y-scroll text-white font-mono rounded-md bg-gray-900'>
                        {/* <div>hello</div>
            <div>hello</div> */}
                        {outputDetails && getOutput()}
                    </div>
                </div>

                <div className='p-2 font-roboto w-56'>
                    <p className=' text-sm tracking-wide p-1'>Inputs</p>
                    <textarea
                        className=' w-full px-2 resize-none outline-none rounded-md focus:shadow-md transition-all'
                        placeholder='Custom Inputs'
                        name='custom-input'
                        id=''
                        rows={2}
                        value={stdInput}
                        onChange={(e) => setStdInput(e.target.value)}
                    />
                    <button
                        type='button'
                        onClick={() => {
                            if (!processing) {
                                onSubmit()
                            }
                        }}
                        className='p-2 mb-4 text-sm tracking-wider w-full bg-green-500 text-white font-mono rounded-md mt-2'
                    >
                        {processing ? 'Processing' : 'Compile and Execute'}
                    </button>
                    {outputDetails && !processing && (
                        <>
                            <p className=' text-sm mb-1 pb-1 border-b-2 tracking-wide'>
                                Info
                            </p>
                            <ul className='text-sm tracking-wide'>
                                <li>
                                    Status: {outputDetails.status_id === 3 ? 'Success' : 'Failed'}
                                </li>
                                <li>Memory: {`${outputDetails.memory} bytes`}</li>
                                <li>Time: {`${outputDetails.time}s`} </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        )
    },
)
