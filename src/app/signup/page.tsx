import React from 'react'
import Signup from '@/components/signup/Signup'

const Page = () => {
  return (
    <div className='bg-base-100 min-h-screen mt-6'>
        <div className='w-full container flex justify-center'>
             <Signup />
        </div>
    </div>
  )
}

export default Page