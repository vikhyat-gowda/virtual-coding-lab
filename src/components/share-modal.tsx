import { FiCopy, FiX } from 'react-icons/fi'
import { RoutesPathName } from '../constants'
import { successToast } from '../utils'

type ShareModalProps = {
    onClose: () => void;
    labInfo: any;
};

export const ShareModal = ({ onClose, labInfo }: ShareModalProps) => {
    return (
        <div className='absolute flex items-center justify-center z-20  w-[calc(100vw-7rem)] h-[calc(100vh-7rem)]'>
            <div className=' w-1/2 min-w-[300px] md:w-1/4 px-6 py-4  bg-white shadow-lg  rounded-lg'>
                <div className='flex border-b-2 pb-2 items-center justify-between'>
                    <h3 className=' tracking-wider'>Lab:{labInfo.name}</h3>
                    <button
                        className='bg-zinc-400/20 transition-all hover:bg-zinc-700/20 p-1 rounded-lg'
                        onClick={onClose}
                    >
                        <FiX className=' text-sm text-zinc-700/60 ' />
                    </button>
                </div>
                <div className='h-14 flex items-center gap-x-4 px-4 text-zinc-100 my-4 bg-zinc-400 rounded-md'>
                    <p
                        className='text-ellipsis whitespace-nowrap overflow-hidden'>{`localhost:5173${RoutesPathName.ACCEPT_PAGE}/${labInfo.session_id}`}</p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `localhost:5173${RoutesPathName.ACCEPT_PAGE}/${labInfo.session_id}`,
                            )
                            successToast('Successfully Copied to clipboard')
                        }}
                        className=' p-2 hover:bg-zinc-700 transition-all rounded-full'
                    >
                        <FiCopy className='text-2xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}
