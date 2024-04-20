import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { rdintresttype } from '@/type/shareholder/shareholde'
import { getRdDataName } from '@/redux/shf/shfslicer'
import { format, parseISO } from 'date-fns';
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { toast } from 'react-toastify'

interface MyData {
  data: {
    msg: string,
    data: rdintresttype
  },
  isPending: boolean,
}

export const useRdintrest = () => {

  const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
  const [rdintrest, setrdintrest] = useState<rdintresttype>({ name: '', holdetId: null, rd_intrest_id: null, isactive: true, duration: null, intrestrate: null, start_date: '', closing_date: '' })
  const [vid, setVid] = useState<string>('')
  const [sfcreate, setSfcreate] = useState('create')
  const [change, setChange] = useState('change')



  const mutationUpdate = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: rdintresttype) => {
      return await axios.patch(`${baseurl}loan/rdintrest/${vid}`, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: () => {
      soundSsuccess?.play()
      setrdintrest({
        name: '', holdetId: null, rd_intrest_id: null,
        isactive: true, duration: null, intrestrate: null, start_date: '', closing_date: ''
      })
    },
    onError: (error) => {
      console.log(error)
      toast.error('Fill all required Fileds')
      soundError?.play()
    }
  })
  const { data: updateData }: { data?: MyData } = mutationUpdate
 


  // create data 
  const mutation = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: rdintresttype) => {
      return await axios.post(`${baseurl}loan/rdintrest`, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: () => {
      setrdintrest({ name: '', holdetId: null, isactive: true, duration: null, intrestrate: null, start_date: '', closing_date: '' })
      soundSsuccess?.play()
    },
    onError: (error) => {
      soundError?.play()
      toast.error('Enter all required Fields', { position: 'top-left' })
      console.log(error)
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    soundClick?.play()
    const newDatata = {
      person: rdintrest.holdetId,
      start_date: rdintrest.start_date,
      closing_date: rdintrest.closing_date,
      is_active: rdintrest.isactive,
      duration: rdintrest.duration,
      interest_rate: rdintrest.intrestrate,
      usersf: userId
    }
    mutation.mutate(newDatata)
  }



  const handleChange = () => {
    soundClick?.play()
    setChange(`${change !== 'create' ? 'create' : null}`)
  }



  const handleCreate = () => {
    soundClick?.play()
    setrdintrest({ name: '', holdetId: null, isactive: true, duration: null, intrestrate: null, start_date: '', closing_date: '' })
    setSfcreate('create')
    setChange('')
  }

  async function handleUPdate() {
    soundClick?.play()
    const newDatata = {
      rd_intrest_id: rdintrest.rd_intrest_id,
      person: rdintrest.holdetId,
      start_date: rdintrest.start_date,
      closing_date: rdintrest.closing_date,
      is_active: rdintrest.isactive,
      duration: rdintrest.duration,
      interest_rate: rdintrest.intrestrate,
      usersf: userId
    }

    mutationUpdate.mutate(newDatata)

  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {

    const value = (e.target as HTMLInputElement).value;

    if (e.key === 'Enter') {
      soundClick?.play()
      const vid = parseInt(value)
      e.preventDefault();
      mutationFund.mutate(vid)
    }
  }

  const mutationFund = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: rdintresttype) => {
      return await axios.get(`${baseurl}loan/person/${vid}/`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      console.log(data)
      soundSsuccess?.play()
      setrdintrest(prev => {
        return {
          ...prev,
          name: data.data.name,
          holdetId: data.data.person_id,
        }
      })
    },
    onError: () => {
      toast.error('Enter Correct Customer Id no', { position: 'top-left' })
      soundError?.play()
    }
  })


  function handleKeyDownIntrest(e: React.KeyboardEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    console.log('Entewr rdintrest')
    if (e.key === 'Enter') {
      soundClick?.play()
      console.log('ok')
      const vid = parseInt(value)
      e.preventDefault();
      mutationIntrest.mutate(vid)
    }
  }


  const mutationIntrest = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: rdintresttype) => {
      return await axios.get(`${baseurl}loan/rdintrest/${vid}`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      console.log(data.data)
      soundSsuccess?.play()
      setrdintrest(prev => {
        return {
          ...prev,
          name: data.data.person_name,
          rd_intrest_id: data.data.rd_id,
          holdetId: data.data.person_id,
          isactive: data.data.is_active,
          duration: data.data.duration,
          intrestrate: data.data.interest_rate,
          start_date: format(data.data.start_date, 'yyyy-MM-dd'),
          closing_date: format(data.data.closing_date, 'yyyy-MM-dd')
        }
      })
    },
    onError : (error)=>{
      toast.error('Enter Correct RD ID',{position:'top-left'})
      soundError?.play()

    }
  })


  
  async function fetchData(){
    const res = await axios.get(`${baseurl}loan/rdintrest`,{headers:{
        Authorization:`Bearer ${authToken?.access}`
    }})

    return res.data
}

const {data} = useQuery({queryKey:['customerrdpaln'],queryFn:fetchData})









  return { mutation, setVid, vid, handleSubmit, rdintrest, setrdintrest, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDown, updateData, mutationUpdate, handleKeyDownIntrest,data }
}