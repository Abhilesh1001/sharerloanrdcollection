'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

const ButtonLoading = () => {
  const {pending}= useFormStatus()
  return (
    <button className="btn btn-success mb-60 block" type='submit'>  {pending ?'Loading':'Submit'}</button>
  )
}

export default ButtonLoading