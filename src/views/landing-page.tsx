import { Link } from 'react-router-dom'
import bannerImg from '../assets/undraw_programming.svg'
import { RoutesPathName } from '../constants'

export const LandingPage = () => {
    return (
        <div className='h-screen font-mono w-screen'>
            <nav className='h-16 flex items-center px-6'>
                <div>
                    <p className='font-bold text-xl'>Virtual Lab</p>
                </div>
                <ul className='flex items-center gap-x-4 last:ml-auto text-sm'>
                    <li>
            <span className='rounded-md ring-1 ring-zinc-800 font-semibold  px-4 py-1'>
              <Link to={RoutesPathName.SIGNUP_PAGE}>Signup</Link>
            </span>
                    </li>
                    <span className='px-4 py-1 bg-zinc-800 rounded-md text-white font-semibold'>
            <Link to={RoutesPathName.LOGIN_PAGE}>Login</Link>
          </span>
                </ul>
            </nav>
            <main className='p-6 lg:h-[calc(100%-4rem)]'>
                {/* <main className="lg:h-[calc(100%-4rem)] p-6"> */}
                <div className='h-full grid grid-rows-4 lg:grid-rows-3 grid-flow-col gap-4'>
                    <div className='bg-blue-500/10 row-span-1 lg:row-span-2 lg:col-span-3 rounded-3xl p-6'>
                        <div className='flex justify-between lg:row-span-2 h-full items-center'>
                            <div className='flex flex-col justify-around h-full '>
                                <p className='font-semibold text-2xl lg:text-6xl  max-w-lg'>
                                    Revolutionize <br /> Your Labs
                                </p>
                                <p className='text-base tracking-wide  max-w-xs'>
                                    Experience the power of virtualization with our cutting-edge
                                    software. Provide your students with remote access to a wide
                                    range of lab environments from anywhere, anytime.
                                </p>
                            </div>
                            <img
                                src={bannerImg}
                                className='hidden lg:block w-full max-h-full '
                                alt='banner image'
                            />
                        </div>
                    </div>

                    <GridCard
                        heading='Flexible Lab Environments'
                        content='Create and customize virtual lab environments tailored to your
            specific curriculum and provide students with hands-on
            experience.'
                    />
                    <GridCard
                        heading='Secure and Reliable'
                        content=' Rest easy knowing that your lab environment is hosted on secure
            servers and backed up regularly, ensuring high availability and
            data protection.'
                    />
                    <GridCard
                        heading='User-Friendly Interface'
                        content='Our intuitive interface makes it easy for both teachers and
                students to navigate and access lab environments with minimal
                training required.'
                    />
                </div>
            </main>
        </div>
    )
}

type GridCardProps = {
    heading: string;
    content: string;
};

const GridCard = ({ heading, content }: GridCardProps) => {
    return (
        <div className='bg-green-500/10 lg:col-span-1 rounded-3xl p-6'>
            <div className='flex flex-col justify-around h-full'>
                <p className='font-semibold text-2xl lg:text-3xl max-w-lg'>{heading}</p>
                <p className='text-sm text-justify tracking-wide max-w-xs'>{content}</p>
            </div>
        </div>
    )
}
