import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { shareholderName, MyData, sharefund } from '@/type/shareholder/shareholde'
import { format, parseISO } from 'date-fns';
import axios from 'axios'
import React, { useState } from 'react'
import { soundClick, soundError, soundSsuccess } from '@/sound/sound';
import { toast } from 'react-toastify';




export const useShfdata = () => {

  const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
  const [sharfund, setShareFund] = useState<sharefund>({ sh_id: null, name: '', amount_credit: null, amount_debit: null, particulars: '', collection_date: format(new Date(), 'yyyy-MM-dd') ,personid:null})
  const [vid, setVid] = useState<string>('')
  const [change, setChange] = useState('change')

  // create data 
  const mutation = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: shareholderName) => {
      return await axios.post(`${baseurl}loan/shfund`, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      soundSsuccess?.play()
      setShareFund({ sh_id: null, name: '', amount_credit: null, amount_debit: null, particulars: '', collection_date: format(new Date(), 'yyyy-MM-dd') })

    },
    onError: (error) => {
      soundError?.play()
      toast.error('Enter all required Fields', { position: 'bottom-left' })
      console.log(error)
    }
  })
  const { data } = mutation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    soundClick?.play()

    const newDatata = {

      person: sharfund.sh_id,
      uusersf: userId,
      amount_credit: sharfund.amount_credit === null ? 0 : sharfund.amount_credit,
      amount_Debit: sharfund.amount_debit === null ? 0 : sharfund.amount_debit,
      collection_date: sharfund.collection_date,
      particulars: sharfund.particulars
    }
    console.log('newdata....', newData)
    mutation.mutate(newDatata)

  }

  // receive Data 
  const fetchTodoList = async () => {
    const res = await axios.get(`${baseurl}loan/capialDisview`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

    return res.data
  }

  const { data: newData, error: errors } = useQuery({ queryKey: ['capitalcview', data], queryFn: fetchTodoList })




  // for handleChnge received Data 

  const mutationFund = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: shareholderName) => {
      return await axios.get(`${baseurl}loan/person/${newTodo}`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      soundSsuccess?.play()
      setShareFund((prev) => {
        return {
          ...prev,
          name: data.data.name,
          sh_id: data.data.person_id
        }
      })
    },
    onError: () => {
      soundError?.play()
      toast.error('Enter Correct Customer ID No', { position: 'top-left' })
    }


  })
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    soundClick?.play()
    if (e.key === 'Enter') {

      const vid = parseInt(value)
      e.preventDefault();
      mutationFund.mutate(vid)
    }
  }



  const mutationUpdate = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: any) => {
      return await axios.patch(`${baseurl}loan/shfund/${vid}/`, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      soundSsuccess?.play()
      setShareFund({ sh_id: null, name: '', amount_credit: null, amount_debit: null, particulars: '', collection_date: format(new Date(), 'yyyy-MM-dd') })
    },
    onError: (error) => {
      console.log(error)
      soundError?.play()
      toast.error('Enter Correct Customer ID No', { position: 'top-left' })
    }


  })



  

  function handleUPdate() {

    console.log(sharfund)
    const datares = {
      uusersf: userId,
      amount_credit: sharfund.amount_credit,
      amount_Debit: sharfund.amount_debit,
      particulars: sharfund.particulars,
      person : sharfund.personid
    }
    
    mutationUpdate.mutate(datares)



  }


  const handleCreate = () => {
    setChange('')
    soundClick?.play()
  }

  const handleChange = () => {
    setChange(`${change !== 'create' ? 'create' : null}`)
    soundClick?.play()
  }










  const mutationFundDeposite = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: number) => {
      return await axios.get(`${baseurl}loan/shfundget/${newTodo}/`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      soundSsuccess?.play()
      console.log(data.data)
      setShareFund((prev) => {
        return {
          ...prev,
          sh_id: data.data.shf_id,
          name: data.data.sh_name,
          amount_credit: data.data.amount_credit,
          amount_debit: data.data.amount_Debit,
          particulars: data.data.particulars,
          personid : data.data.Sh_id 
        }
      })

    },
    onError: (error) => {
      soundError?.play()
      toast.error('Enter Correct Fund Deposite ID', { position: 'bottom-left' })
      console.log(error)
    }
  })

  function handleKeyDownId(e: React.KeyboardEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    console.log('Entewr rdintrest')
    if (e.key === 'Enter') {
      soundClick?.play()
      console.log('ok')
      const vid = parseInt(value)
      e.preventDefault();
      console.log(vid)
      mutationFundDeposite.mutate(vid)
    }

  }




  return { mutation, data, handleKeyDown, vid, setVid, handleSubmit, sharfund, setShareFund, newData, handleUPdate, handleCreate, handleChange, change, handleKeyDownId,mutationUpdate }
}