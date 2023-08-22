import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi'
import { BsCodeSquare } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { RoutesPathName } from '../constants'
import { useLogout } from '../hooks'

export const SideNavbar = () => {
    const { pathname } = useLocation()
    const [logOut] = useLogout()

    return (
        <div className='h-screen w-16 '>
            <ul className='py-6  text-zinc-400 flex flex-col justify-center items-center h-full gap-y-4'>
                <li className='first:mb-auto font-mono text-center text-gray-900 text-sm font-bold'>
                    Virtual
                    <br />
                    lab
                </li>
                <li
                    className={clsx(
                        'p-1 rounded-md transition-all',
                        pathname != RoutesPathName.DASHBOARD_PAGE &&
                        'hover:bg-zinc-400/20 hover:shadow-sm',
                    )}
                >
                    <Link to={RoutesPathName.DASHBOARD_PAGE}>
                        <HiOutlineViewGrid
                            className={clsx(
                                'text-2xl',
                                pathname === RoutesPathName.DASHBOARD_PAGE && 'text-green-500',
                            )}
                        />
                    </Link>
                </li>
                <li>
                    <BsCodeSquare
                        className={clsx(
                            'text-2xl',
                            pathname.includes(RoutesPathName.SESSION_PAGE) && 'text-green-500',
                        )}
                    />
                </li>
                <li
                    onClick={logOut}
                    className=' hover:bg-zinc-400/20 hover:shadow-sm p-1 rounded-md transition-all last:mt-auto'
                >
                    <HiOutlineLogout className='text-2xl' />
                </li>
            </ul>
        </div>
    )
}
