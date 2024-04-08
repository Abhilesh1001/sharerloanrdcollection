import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { loanCreateData } from '@/components/dataAll/data'
import { format, parseISO } from 'date-fns';
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { toast } from 'react-toastify'
import FixedDeposite from '@/app/expense/fixdeposite/page'


interface MyData {
    data: {
        msg: string,
        data: {
            id: null | number,
            msg: string
        }
    },
    isPending: boolean,
}

interface FixedDepositeType {
    fd_id?: null | number
    person: null|number,
    person_name : string,
    usersf?: null |  number,
    amount_Debit: null | number,
    amount_credit: null | number,
    start_date :string,
    closing_date: string,
    duration: null | number,
    interest_rate : null | number,
    is_active: boolean

}


const fixedDepositeData  ={
    fd_id: null,
    person_name : '',
    person:null ,
    usersf: null,
    amount_Debit: null ,
    amount_credit: null ,
    start_date :'',
    closing_date: '',
    duration: null,
    interest_rate : null,
    is_active: true
}



export const useFixedDeposite = () => {

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [fixdeposite, setFixDeposite] = useState<FixedDepositeType>(fixedDepositeData)
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')
    console.log(fixdeposite, '..updated')

    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}loan/fixed`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            soundSsuccess?.play()
            setFixDeposite(fixdeposite)
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        soundClick?.play()
        const newDatata = {
            usersf: userId,
            person : fixdeposite.person,
            amount_Debit: fixdeposite.amount_Debit,
            amount_credit: fixdeposite.amount_credit,
            start_date :fixdeposite.start_date,
            closing_date: fixdeposite.closing_date,
            duration:fixdeposite.duration,
            interest_rate : fixdeposite.interest_rate,
            is_active: fixdeposite.is_active
        }
        console.log(newDatata, 'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}loan/fixed`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        console.log(res.data)
        return res.data
    }
   
    const { data: newData, error: errors } = useQuery({ queryKey: ['fixedDeposite', mutation.data], queryFn: fetchTodoList })


    // get initilal Data 
    const mutationFund = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.get(`${baseurl}loan/person/${newTodo}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data)
            setFixDeposite((prev) => {
                return {
                    ...prev,
                    person_name: data.data.name,
                    person: data.data.person_id
                }
            })
        },
        onError:()=>{
            toast.error('Enter Correct Customer ID No',{position:'top-left'})
            soundError?.play()
        }
    })
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        console.log(value)
        if (e.key === 'Enter') {
            soundClick?.play()
            console.log('ok')
            const vid = parseInt(value)
            console.log(vid)
            e.preventDefault();
            mutationFund.mutate(vid)
        }
    }

    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}loan/fixed/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setFixDeposite(fixedDepositeData)
            soundSsuccess?.play()
        },      
        onError: (error) => {
            console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })


    async function handleUPdate() {
        soundClick?.play()
        const newDatata = {
            usersf : userId,
            fd_id : fixdeposite.fd_id, 
            person : fixdeposite.person,
            amount_Debit: fixdeposite.amount_Debit,
            amount_credit: fixdeposite.amount_credit,
            start_date :fixdeposite.start_date,
            closing_date: fixdeposite.closing_date,
            duration:fixdeposite.duration,
            interest_rate : fixdeposite.interest_rate,
            is_active: fixdeposite.is_active
        }
        mutationUpdate.mutate(newDatata)

    }


    const handleCreate = () => {
        setSfcreate('create')
        setChange('')
        soundClick?.play()
    }

    const handleChange = () => {
        setChange(`${change !== 'create' ? 'create' : null}`)
        soundClick?.play()
    }


    function handleKeyDownLoanId(e: React.KeyboardEvent<HTMLInputElement>) {
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
        mutationFn: async (newTodo: any) => {
            return await axios.get(`${baseurl}loan/fixed/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setFixDeposite(prev => {
                return {
                    ...prev,
                    fd_id : data.data.fd_id,
                    person: data.data.person_id,
                    person_name: data.data.person_name,
                    amount_Debit: data.data.amount_Debit,
                    amount_credit: data.data.amount_credit,
                    duration: data.data.duration,
                    start_date:data.data.closing_date === null ? '' : format(data.data.start_date, 'yyyy-MM-dd'),
                    closing_date: data.data.closing_date === null ? '' : format(data.data.closing_date, 'yyyy-MM-dd'),
                    interest_rate: data.data.interest_rate,
                    is_active : data.data.is_active
                }
            })
        },
        onError:()=>{
            soundError?.play()
            console.log(errors)
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })


    return {mutation, setVid, handleSubmit, setFixDeposite, handleKeyDown, fixdeposite, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId,mutationUpdate }
}