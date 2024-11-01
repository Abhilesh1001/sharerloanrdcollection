import React from 'react'
import Them from './Them'
import { useSelector, useDispatch } from 'react-redux'
import { useLogin } from '@/hooks/login/useLogin'
import { useRouter } from 'next/navigation';
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { getMainheader } from '@/redux/slice'
import Link from 'next/link';




export type StateProps = {
    counter: {
        user: string | null,
        mainheader: string,
        authToken: {
            access: string
        }
        baseurl: string,
        is_admin :boolean,
        is_company_admin : boolean
    }
}

const NavColl = () => {
    const dispatch = useDispatch()
    const { handleLogout } = useLogin()
    const { user,is_admin,is_company_admin } = useSelector((state: StateProps) => state.counter)


    const router = useRouter()
    const handleLogin = () => {
        dispatch(getMainheader('Login Page'))
        soundClick?.play()
        router.push('/login')
    }

    return (
        <>
            <li className="py-2 lg:py-0 ">
                <Link href={'/home'} ><button className="btn btn-info btn-sm">About Page</button></Link>
            </li>
            <li>

                <div className='bg-base-100  w-full'>
                    <Them />
                </div>

            </li>
            {is_admin && <li className="py-2 lg:py-0 ">
                    <Link
                    className="text-sm "
                    href={'/admin'}
                >
                  Admin
                </Link>
            </li>}

            {is_company_admin && <li className="py-2 lg:py-0 ">
                    <Link
                    className="text-sm "
                    href={'/admincompany'}
                >
                  Admin Company
                </Link>
            </li>}

            <li className="py-2 lg:py-0 ">
                <a
                    className="text-sm "
                    href="#"
                >
                    {!!user && user?.charAt(0).toUpperCase() + user?.slice(1)}
                </a>
            </li>
            <li className="py-2 lg:py-0 ">

                {user && <button className="btn btn-error btn-sm ml-2 mr-5" onClick={handleLogout} type='button'>Logout</button>}
                {!user && <button className="btn btn-success btn-sm ml-2 mr-5" onClick={handleLogin} type='button'>Login</button>}
            </li>
        </>
    )
}

export default NavColl