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

interface expenseType {
    p_id?: null | number
    particulars: string,
    usersf: null | number,
    amount_Debit: null | number,
    amount_credit: null | number,
}

export const expenseData = {p_id:null,particulars : '',usersf:null,amount_Debit:null,amount_credit : null}


export const useParticular = () => {

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [expense, setExpense] = useState<expenseType>(expenseData)
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')
    console.log(expense, '..updated')

    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}loan/particulars`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            soundSsuccess?.play()
            setExpense(expenseData)
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
            amount_Debit:expense.amount_Debit,
            amount_credit: expense.amount_credit,
            particulars : expense.particulars
            
        }
        

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}loan/particulars/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setExpense(expenseData)
            soundSsuccess?.play()
        },      
        onError: (error) => {
            console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields',{position:'top-left'})
        }
    })


    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}loan/particulars`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        console.log(res.data)
        return res.data
    }
   
    const { data: newData, error: errors } = useQuery({ queryKey: ['assets', mutation.data,mutationUpdate.data], queryFn: fetchTodoList })


    // get initilal Data 


 


    async function handleUPdate() {
        soundClick?.play()

        const newDatata = {
            usersf: userId,
            amount_Debit:expense.amount_Debit,
            amount_credit: expense.amount_credit,
            particulars : expense.particulars,
            p_id : expense.p_id
            
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
            return await axios.get(`${baseurl}loan/particulars/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setExpense(prev => {
                return {
                    ...prev,
                    amount_Debit: data.data.amount_Debit,
                    particulars: data.data.particulars,
                    p_id: data.data.p_id,
                    amount_credit: data.data.amount_credit,
                    
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })

    return {mutation, setVid, handleSubmit, setExpense, expense, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId,mutationUpdate }
}