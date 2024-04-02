'use client'
import React, { useState } from 'react'
import PrBurron from '@/components/button/PrBurron';
import TextInputText from '@/components/dummyinput/TextInputText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query'
import axios from 'axios';
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import Loading from '@/components/loading/Loading';

const Page = () => {
  const {baseurl} = useSelector((state:StateProps)=>state.counter)

  const mutation = useMutation<any,any,any,any>({
    mutationFn:async (data)=>{
      return await axios.post(`${baseurl}cus/send-reset-password/`,data)
    },
    onSuccess:()=>{
      formik.resetForm()
    }
  })
  
  

  const validationSchema =Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  })

   const formik = useFormik({
    initialValues:{
      email:''
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      console.log(values)
      mutation.mutate(values)

    }
   })



  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
        <div className='w-full container flex justify-center'>

          <form onSubmit={formik.handleSubmit} className='mt-6'>
            <div className='h-6'>
            {mutation.isPending && <Loading />}
            {mutation.isSuccess && <div>{mutation.data.data.msg}</div>}
          {mutation?.error?.response?.data?.errors?.non_field_errors[0]}
            </div>
           
           <TextInputText label={'Enter Email'} type={'email'} name="email" value={formik.values.email} onChange={formik.handleChange} />
           <PrBurron css={'mt-2'} label={'Submit'}  buttomType={'submit'} />
          </form>
        </div>
    </div>
  )
}

export default Page