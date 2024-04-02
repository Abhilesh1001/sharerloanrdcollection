'use client'
import React,{useRef} from 'react'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login/Login'


const Page = () => {


    return (
        <div className='min-h-screen bg-base-100 lg:mt-6 mt-7'>
            <Login />
        </div>
    )
}

export default Page