import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { loanCreateData } from '@/components/dataAll/data'
import { format, parseISO } from 'date-fns';
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { toast } from 'react-toastify'


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

interface loanType {
    loan_person?: null | number
    name: string,
    amount: null | number,
    start_date: string,
    duration: number | null,
    closing_date: string | null,
    interest_rate: number | string,
    remarks: string,
    is_active: boolean,
    days : null |number
}

export const useLoanamount = () => {

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [loan, setLoan] = useState<loanType>(loanCreateData)
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')
    console.log(loan, '..updated')

    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: loanType) => {
            return await axios.post(`${baseurl}loan/loanamount`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            soundSsuccess?.play()
            setLoan(loanCreateData)
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })
    const { data }: { data?: MyData } = mutation
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        soundClick?.play()
        const newDatata = {
            usersf: userId,
            person: loan.loan_person,
            loan_amount: loan.amount,
            remarks: loan.remarks,
            is_active: loan.is_active,
            closing_date: loan.closing_date,
            start_date: loan.start_date,
            days : loan.days,
            duration: loan.duration,
            interest_rate: loan.interest_rate
        }
        console.log(newDatata, 'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}loan/loanamount`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        console.log(res.data)
        return res.data
    }
   
    const { data: newData, error: errors } = useQuery({ queryKey: ['loanint', data], queryFn: fetchTodoList })


    // get initilal Data 
    const mutationFund = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: loanType) => {
            return await axios.get(`${baseurl}loan/person/${newTodo}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data)
            setLoan((prev) => {
                return {
                    ...prev,
                    name: data.data.name,
                    loan_person: data.data.person_id
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
            return await axios.patch(`${baseurl}loan/loanamount/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setLoan(loanCreateData)
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
            person : loan.loan_person,
            loan_amount: loan.amount,
            remarks: loan.remarks,
            is_active: loan.is_active,
            start_date: loan.start_date,
            closing_date: loan.closing_date,
            duration: loan.duration,
            interest_rate: loan.interest_rate,
            days :loan.days
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
            return await axios.get(`${baseurl}loan/loanamount/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setLoan(prev => {
                return {
                    ...prev,
                    loan_person: data.data.person_id,
                    name: data.data.person_name,
                    amount: data.data.loan_amount,
                    remarks: data.data.remarks,
                    duration: data.data.duration,
                    start_date: format(data.data.start_date, 'yyyy-MM-dd'),
                    closing_date: data.data.closing_date === null ? '' : format(data.data.closing_date, 'yyyy-MM-dd'),
                    is_active: data.data.is_active,
                    interest_rate: data.data.interest_rate,
                    days : data.data.days
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })






    return {mutation, data, setVid, handleSubmit, setLoan, handleKeyDown, loan, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId,mutationUpdate }
}