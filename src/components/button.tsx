"use client"
import { useReducer } from 'react'
import { useLogin } from '@/hooks/login/useLogin'
import { reducer, initialState } from '@/reducer/loginreducer'
import {useRouter} from 'next/navigation'
import { getMainheader } from '@/redux/slice'
import { useDispatch } from 'react-redux'
import Loading from './loading/Loading'

const Button = () => {
  const [data, dispatch] = useReducer(reducer, initialState)
  const { handleSubmit,error,loading} = useLogin(data)
  const dispatchData = useDispatch()
  const router = useRouter()
  const handleForgotPassword =()=>{
    dispatchData(getMainheader('ForgotPassword'))
    router.push('/signup/forgotpassword')
  }

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        {loading && <Loading />}
                <label htmlFor="email" className='block'>Email</label>
                <input type="email" value={data.email} required name='email'  onChange={(e) => dispatch({ type: "EMAIL", value: e.target.value })} placeholder="email" className="input input-bordered w-80 my-2" />
                <label htmlFor="email" className='block'>Password</label>
                <input type="password" value={data.password}  onChange={(e) => dispatch({ type: "PASSWORD", value: e.target.value })}  required name='password' placeholder="password" className="input input-bordered w-80 mb-4 my-2" />
                <div>
                <button className="btn btn-success mr-2 mb-2" type='submit'>Login</button>
                <button className="btn btn-primary ml-2 mb-2" onClick={handleForgotPassword}  type='button'>Forget Password</button>
                </div>
      </form>
    </div>


  )
}

export default Button