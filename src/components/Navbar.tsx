'use client'
import React, { useEffect, useState, memo } from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/login/useLogin'
import { getMainheader } from '@/redux/slice'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from '@/redux/slice'
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { IoMdMenu } from "react-icons/io";
import { useMenu } from '@/hooks/menu/useMenu'
import axios from 'axios'
import { toast } from 'react-toastify'
import NavColl from './navcomponent/NavColl'
import ShareholderMenu from './mainpage/ShareholderMenu'



export type StateProps = {
    counter: {
        user: string | null,
        mainheader: string,
        authToken: {
            access: string
        }
        baseurl: string
    }
}


const Navbar = () => {
    const dispatch = useDispatch()
    const { user, mainheader, authToken, baseurl } = useSelector((state: StateProps) => state.counter)
    const data = { email: '', password: '' }
    const { handleLogout } = useLogin(data)
    const { handleClickMenu, hiddenmenu } = useMenu()

    useEffect(() => {
        const mainhesder = localStorage.getItem('mainHeader')
        if (mainhesder !== null) {
            dispatch(getMainheader(mainhesder))
        }
    }, [])

    useEffect(() => {
        if (document.cookie !== undefined && document.cookie !== null) {
            const authTokenData: any = (() => {
                const cookies = document.cookie.split(';');
                const tokenRefresh = cookies.find(cookie => cookie.trim().startsWith('tokenRefresh='));
                const tokenAccess = cookies.find(cookie => cookie.trim().startsWith('tokenAcess='));

                return {
                    'refresh': tokenRefresh?.split('tokenRefresh=')[1],
                    'access': tokenAccess?.split('tokenAcess=')[1]
                };
            })();
            dispatch(getAuthToken(authTokenData));
        }
    }, [dispatch]);


    const hanclickMainHead = (value: string) => {
        dispatch(getMainheader(value))
    }

    const checkAuthorization = async () => {
        if (authToken?.access) {
            try {
                const data = await axios.get(`${baseurl}cus/authuserpro/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })

            } catch (error) {
                console.log('errro', error)
                toast.error('Your sesson has expired Please Login', { position: 'top-center' })
                handleLogout()
                soundError?.play()
            }
        }

    }

    useEffect(() => {

        checkAuthorization()

    }, [authToken?.access])


    return (

        <nav className="lg:px-16 z-10 navbar text-base-content bg-base-100 shadow-md flex flex-wrap items-center justify-center lg:py-0 fixed  top-0 w-full h-14 ">
            <div className="flex-1 flex justify-between items-center">
                {user && <div className='relative'>
                    <IoMdMenu className='cursor-pointer mr-4 text-2xl  ml-2' onClick={handleClickMenu} />
                    {hiddenmenu !== 'hidden' && <div className='fixed rounded top-14 overflow-auto  z-10[80%] text-nowrap w-[535px]'>
                        <div className='pl-4 flex flex-col gap-4 h-[600px] bg-base-100'>
                            <ShareholderMenu />
                        </div>

                    </div>}
                </div>}

                <Link href="/" className="flex text-lg font-semibold">
                    <div className="relative text-error font-bold" onClick={() => hanclickMainHead('Index Page')}>SAP</div>
                </Link>
                <div className="flex-1 h-12 flex text-success font-bold justify-between items-center ml-5 mr-5 w-full">
                    {mainheader}
                </div>
            </div>
            <div className='md:flex hidden'>

            </div>


            <div className="dropdown dropdown-end mr-10  md:hidden">
                <div tabIndex={0} role="button" className="btn m-1">
                    <IoMdMenu className='text-2xl cursor-pointer flex' />
                </div>

                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60">
                <NavColl />
                </ul>
            </div>

            <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                <nav>
                    <ul className="text-xl text-center items-center gap-x-5 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">

                    <NavColl />
                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default memo(Navbar)
