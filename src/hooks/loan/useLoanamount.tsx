import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { loanholderName } from '@/type/shareholder/shareholde'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { loanCreateData } from '@/components/dataAll/data'
import { format, parseISO } from 'date-fns';


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
}

export const useLoanamount = () => {



    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [loan, setLoan] = useState<loanType>(loanCreateData)
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')
    console.log(loan, '..updated')

    // create data 
    const mutation = useMutation<MyData, any, any, unknown>({
        mutationFn: async (newTodo: loanType) => {
            return await axios.post(`${baseurl}shar/loanamount`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setLoan(loanCreateData)
        },
    })
    const { data }: { data?: MyData } = mutation
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newDatata = {
            user: userId,
            loan_person: loan.loan_person,
            loan_amount: loan.amount,
            remarks: loan.remarks,
            is_active: loan.is_active,
            closing_date: loan.closing_date,
            start_date: loan.start_date,
            duration: loan.duration,
            interest_rate: loan.interest_rate
        }
        console.log(newDatata, 'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}shar/loanamount`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        console.log(res.data)
        return res.data
    }
    const [enabled, setEnabled] = useState(false);

    const { data: newData, error: errors } = useQuery({ queryKey: ['rdname', data], queryFn: fetchTodoList, enabled: enabled })
    console.log(newData)


    // get initilal Data 
    const mutationFund = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: loanType) => {
            return await axios.get(`${baseurl}shar/loanname/${newTodo}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            console.log(data.data)
            setLoan((prev) => {
                return {
                    ...prev,
                    name: data.data.name,
                    loan_person: data.data.loan_id
                }
            })
        },
    })
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        console.log(value)
        if (e.key === 'Enter') {
            console.log('ok')
            const vid = parseInt(value)
            console.log(vid)
            e.preventDefault();
            mutationFund.mutate(vid)
        }
    }

    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}shar/loanamount/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setLoan(loanCreateData)

        },
        onError: (error) => {
            console.log(error)
        }
    })


    async function handleUPdate() {
        const newDatata = {
            user : userId,
            loan_amount: loan.amount,
            loan_person:loan.loan_person,
            remarks: loan.remarks,
            is_active: loan.is_active,
            closing_date: loan.closing_date,
            start_date: loan.start_date,
            duration: loan.duration,
            interest_rate: loan.interest_rate
        }

        mutationUpdate.mutate(newDatata)

    }


    const handleCreate = () => {
        setSfcreate('create')
        setChange('')
    }

    const handleChange = () => {
        setChange(`${change !== 'create' ? 'create' : null}`)
    }


    function handleKeyDownLoanId(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = (e.target as HTMLInputElement).value;
        console.log('Entewr rdintrest')
        if (e.key === 'Enter') {
            console.log('ok')
            const vid = parseInt(value)
            e.preventDefault();
            mutationIntrest.mutate(vid)
        }
    }

    const mutationIntrest = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.get(`${baseurl}shar/loanamount/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
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
                    interest_rate: data.data.interest_rate
                }
            })
        }
    })






    return { setEnabled, mutation, data, setVid, handleSubmit, setLoan, handleKeyDown, loan, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId,mutationUpdate }
}