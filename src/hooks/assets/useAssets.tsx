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

interface assetType {
    asset_no?: null | number
    asset_name: string,
    usersf: null | number,
    amount_Debit: null | number,
    debit_date:string

}

export const assetData = {asset_no:null,asset_name : '',usersf:null,amount_Debit:null,debit_date : ''}


export const useAsset = () => {

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [asset, setAsset] = useState<assetType>(assetData)
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')
    console.log(asset, '..updated')

    // create data 
    const mutation = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo) => {
            return await axios.post(`${baseurl}loan/asset`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            soundSsuccess?.play()
            setAsset(assetData)
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
            amount_Debit:asset.amount_Debit,
            debit_date: asset.debit_date,
            asset_name : asset.asset_name
            
        }
        

        mutation.mutate(newDatata)
    }


    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.patch(`${baseurl}loan/asset/${vid}`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setAsset(assetData)
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
        const res = await axios.get(`${baseurl}loan/asset`, {
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
            asset_no: asset.asset_no,
            amount_Debit:asset.amount_Debit,
            debit_date: asset.debit_date,
            asset_name : asset.asset_name
            
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
            return await axios.get(`${baseurl}loan/asset/${vid}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            soundSsuccess?.play()
            console.log(data.data, '..........')
            setAsset(prev => {
                return {
                    ...prev,
                    amount_Debit: data.data.amount_Debit,
                    asset_name: data.data.asset_name,
                    asset_no: data.data.asset_no,
                    debit_date: format(data.data.debit_date, 'yyyy-MM-dd'),
                }
            })
        },
        onError:()=>{
            soundError?.play()
            toast.error('Enter Correct Loand ID No',{position:'top-left'})
        }
    })






    return {mutation, setVid, handleSubmit, setAsset, asset, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId,mutationUpdate }
}