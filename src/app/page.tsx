'use client'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'
import Main from '@/components/mainpage/Main'

export type StateProps = {
  counter : {
      user : string|null,
  }   
}


export default function Home() {
  const {user} = useSelector((state:StateProps)=>state.counter)
 
  useEffect(()=>{
   
  },[user])
  
  return (
    <main className="min-h-screen bg-base-100 h-auto lg:mt-6 mt-7">
           <Main />
    </main>
  )
}
