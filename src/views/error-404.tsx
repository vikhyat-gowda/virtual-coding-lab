import { Link } from 'react-router-dom'
import { RoutesPathName } from '../constants'
import NoDataImg from '../assets/undraw_taken.svg'

export const Error404 = () => {
    return (
        <div className='flex items-center justify-center bg-blue-400/10 h-screen w-screen'>
            <div className='w-3/4 bg-white h-3/4 shadow-md rounded-xl'>
                <div className='flex justify-center h-full'>
                    <div className='flex-1 flex flex-col gap-y-2 items-center justify-center h-full w-full '>
                        <h4 className='text-center text-8xl lg:text-[16rem]'>404</h4>
                        <div>
                            <p className=' text-4xl'>something went</p>
                            <p className=' text-6xl font-bold'>WRONG!</p>
                        </div>
                        <Link
                            to={RoutesPathName.DASHBOARD_PAGE}
                            className=' mt-4 bg-green-500 px-4 py-2 rounded-full text-lg  text-white'
                        >
                            Back To Homepage
                        </Link>
                    </div>
                    <div className='hidden lg:flex lg:flex-1'>
                        <div className=' m-4'>
                            <img src={NoDataImg} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

