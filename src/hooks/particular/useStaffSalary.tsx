import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { loanCreateData } from '@/components/dataAll/data'
import { format, parseISO } from 'date-fns';
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { toast } from 'react-toastify'
import StaffSalary from '@/app/expense/staffsalary/page'



interface StaffSalaryType {
    sd_id?: null | number
    person?: null | number
    person_name: string,
    usersf: null | number
    amount_Debit: null | number,
    collection_date: string,
    remarks: string
}

export const StaffSalaryData = {
    sd_id: null,
    person: null,
    person_name: '',
    usersf: null,
    amount_Debit: null,
    collection_date: '',
    remarks: ''
}


export const useStaffSalary = () => {

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [staffsal, setStaffSal] = useState<StaffSalaryType>(StaffSalaryData)
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')
    // console.log(staffsal, '..updated')

    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}loan/staffdepositr`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            soundSsuccess?.play()
            setStaffSal(StaffSalaryData)
        },
        onError: () => {
            soundError?.play()
            toast.error('Enter all Required Fields', { position: 'top-left' })
        }
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        soundClick?.play()
        const newDatata = {
            usersf: userId,
            collection_date: staffsal.collection_date,
            person: staffsal.person,
            amount_Debit: staffsal.amount_Debit,
            remarks: staffsal.remarks,
        }


        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}loan/staffdepositr`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        console.log(res.data)
        return res.data
    }

    const { data: newData, error: errors } = useQuery({ queryKey: ['staffSal', mutation.data], queryFn: fetchTodoList })


    // get initilal Data ,
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
            setStaffSal((prev) => {
                return {
                    ...prev,
                    person_name: data.data.name,
                    person: data.data.person_id
                }
            })
        },
        onError: () => {
            toast.error('Enter Correct Customer ID No', { position: 'top-left' })
            soundError?.play()
        }
    })
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (e.key === 'Enter') {
            soundClick?.play()
            const vid = parseInt(value)
            console.log(vid)
            e.preventDefault();
            mutationFund.mutate(vid)
        }
    }

    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}loan/staffdepositr/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setStaffSal(StaffSalaryData)
            soundSsuccess?.play()
        },
        onError: (error) => {
            console.log(error)
            soundError?.play()
            toast.error('Enter all Required Fields', { position: 'top-left' })
        }
    })


    async function handleUPdate() {
        soundClick?.play()
        console.log(staffsal)
        const newDatata = {
            usersf: userId,
            amount_Debit: staffsal.amount_Debit,
            person : staffsal.person,
            remarks : staffsal.remarks,
            sd_id : staffsal.sd_id
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
            return await axios.get(`${baseurl}loan/staffdepositr/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setStaffSal(prev => {
                return {
                    ...prev,
                    sd_id: data.data.sd_id,
                    person_name : data.data.person_name,
                    collection_date: format(parseISO(data.data.collection_date),'yyyy-MM-dd'),
                    person: data.data.person_id,
                    amount_Debit: data.data.amount_Debit,
                    remarks: data.data.remarks,
                }
            })
        },
        onError: () => {
            soundError?.play()
            toast.error('Enter Correct Loand ID No', { position: 'top-left' })
        }
    })






    return { mutation, setVid, handleSubmit, setStaffSal, handleKeyDown, staffsal, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId, mutationUpdate }
}