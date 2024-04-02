import React from 'react'
import Signup from '@/components/signup/Signup'

const Page = () => {
  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
        <div className='w-full container flex justify-center'>
             <Signup />
        </div>
    </div>
  )
}

export default Page