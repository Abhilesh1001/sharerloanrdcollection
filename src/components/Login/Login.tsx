import PrBurron from '@/components/button/PrBurron'
import Button from '../button'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { getMainheader } from '@/redux/slice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [signup,setSignup] = useState('sign')
  const dispatch = useDispatch()
  const router = useRouter()
  const handleSignup =() =>{
    dispatch(getMainheader('Signup Form'))
    router.push('/signup')
  }

  return (
    <div className='container flex justify-center'>
    <div className='mt-10  border-gray-500'>
        <div className='text-bold'>Login Page</div>
        {signup !=='' && <Button />}
        <PrBurron onClick={handleSignup} label={'Signup Form'}  />
    </div>


</div>
  )
}

export default Login