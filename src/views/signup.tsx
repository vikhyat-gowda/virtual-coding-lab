import { clsx } from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { TextInput } from '../components'
import { RoutesPathName, Roles } from '../constants'

import introImg from '../assets/pair_programming.svg'
import { useSignUp } from '../hooks'
import { UseSignUpStates } from '../@types'

export const Signup = () => {
    const [role, setRole] = useState<Roles>(Roles.TEACHER)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [name, setName] = useState<string | undefined>(undefined)

    const [signUp, loading, error]: UseSignUpStates = useSignUp()

    return (
        <>
            <div className='h-screen font-mono bg-center w-screen bg-blue-600/10 flex items-center justify-center'>
                <div className='flex items-center drop-shadow-md bg-white p-6 rounded-md lg:min-h-1/2 w-5/6 sm:w-1/2'>
                    <img
                        src={introImg}
                        className='hidden lg:block w-1/2'
                        alt='intro image'
                    />
                    <div className='divide-y-2 w-full  flex flex-col gap-y-2 p-0 lg:p-6'>
                        <h4 className=' text-lg font-semibold'>Welcome</h4>
                        <form
                            className='pt-4 flex flex-col gap-y-4'
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (email && password && name)
                                    signUp({ email, password, name, role })
                            }}
                        >
                            <div className='flex w-full gap-x-4'>
                                <TextInput
                                    value={name}
                                    label='Name'
                                    name='fullname'
                                    type='text'
                                    onChangeText={setName}
                                />
                                <div>
                                    <p className='text-sm'>Role</p>
                                    <div className='flex mt-1 gap-x-2 bg-blue-600/10 rounded-md text-sm'>
                                        <button
                                            type='button'
                                            onClick={() => setRole(Roles.TEACHER)}
                                            className={clsx(
                                                'rounded-md p-2 my-1 ml-1 transition-all ',
                                                role === Roles.TEACHER && 'bg-blue-600 text-white',
                                            )}
                                        >
                                            Teacher
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => setRole(Roles.STUDENT)}
                                            className={clsx(
                                                'rounded-md p-2 my-1 mr-1  transition-all  ',
                                                role === Roles.STUDENT && 'bg-blue-600 text-white',
                                            )}
                                        >
                                            Student
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <TextInput
                                value={email}
                                label='Email'
                                name='email'
                                type='email'
                                onChangeText={setEmail}
                            />
                            <TextInput
                                value={password}
                                label='Password'
                                name='password'
                                type='Password'
                                onChangeText={setPassword}
                            />
                            {error && <p>{error.message}</p>}
                            <div className='mt-2 my-2'>
                                <button
                                    className='flex transition-all justify-center items-center bg-blue-600 text-white p-2 w-1/4 rounded-md'>
                                    {loading && (
                                        <svg
                                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                        >
                                            <circle
                                                className='opacity-25'
                                                cx='12'
                                                cy='12'
                                                r='10'
                                                stroke='currentColor'
                                                stroke-width='4'
                                            ></circle>
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                            ></path>
                                        </svg>
                                    )}
                                    Signup
                                </button>
                            </div>
                        </form>
                        <div className='pt-2'>
                            <span className='text-sm'>Already a user? </span>
                            <Link
                                to={RoutesPathName.LOGIN_PAGE}
                                className='text-sm text-blue-600'
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
