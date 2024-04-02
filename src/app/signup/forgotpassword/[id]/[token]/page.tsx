'use client'
import React, { useState } from 'react'
import PrBurron from '@/components/button/PrBurron';
import TextInputText from '@/components/dummyinput/TextInputText';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import Loading from '@/components/loading/Loading';

interface useparamType {
  params: {
    id: string,
    token: string,
  }

}
const Page = (props: useparamType) => {
  console.log(props)
  const { id, token } = props.params

  const { baseurl } = useSelector((state: StateProps) => state.counter)
  const mutation = useMutation<any, any, any, any>({
    mutationFn: async (data) => {
      return await axios.post(`${baseurl}cus/send-reset-password/${id}/${token}/`, data)
    },
    onSuccess: () => {
      formik.resetForm()
    }
  })


  const validationSchema = Yup.object({
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    password2: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      password2:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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

          <TextInputText label={'Password'} type={'password'} name="password" value={formik.values.password} onChange={formik.handleChange} />
          <TextInputText label={'Confirm Password'} type={'password'} name="password2" value={formik.values.password2} onChange={formik.handleChange} />

          <PrBurron css={'mt-2'} label={'Submit'} buttomType={'submit'} />
        </form>
      </div>

    </div>
  )
}



export default Page