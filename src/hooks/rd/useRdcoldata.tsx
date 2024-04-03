import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { vendorType } from '@/type/type'
import axios from 'axios'
import { rdholderName, collData } from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns'


import React, { useEffect, useState } from 'react'

interface MyData {
    data: {
        msg: string
    }
}

export const useRdcoldata = () => {


    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [rdcollection, setRdcollection] = useState<collData[]>([{ user: null, person: null, amount_collected: null, remarks: '', name: '', collection_date: '' }])

    const [collectin_data,setCollectiondata] = useState(format(new Date, 'yyyy-MM-dd'))
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollectiondata(e.target.value);
    };





    const handleHOderView = async () => {
        try {
            const res = await axios.get(`${baseurl}loan/rdintrest`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            console.log(res)

            const activeAccount = res.data.filter((items: any) => {

                if(items.is_active){
                    return items
                }
               
        })

            const dataCol = activeAccount.map((items: any) => {
                    const neData = {
                        person: items.rd_id,
                        name: items.person_name,
                        amount_collected: null,
                        remarks: null
                    }
                    return neData
            })



            setRdcollection(dataCol)
        } catch (error) {
            console.log(error)
        }
    }

    const mutation = useMutation<MyData, any, any, unknown>({
        mutationFn: async (newTodo: collData[]) => {
            return await axios.post(`${baseurl}loan/rdcollection`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            setRdcollection([{ user: null, person: null, amount_collected: null, remarks: '', name: '', collection_date: '' }])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleSubmit = async () => {

        
        const newData = rdcollection.map((items) => {
            const data = {
                usersf: userId,
                rd_interest: items.person,
                amount_collected: items.amount_collected,
                remarks: items.remarks,
                collection_date:collectin_data
            }
            return data
        })
        console.log(newData, '........')

        mutation.mutate(newData)
    }


    const handleChange = (value: string | number, key: keyof collData, index: number) => {
        console.log(value,key)
        const freData: any = [...rdcollection]
        freData[index][key] = value
        setRdcollection(freData)
    }
    const [enable, setEnable] = useState(false)
    const [Id, setId] = useState<null | number>(null)


    const fetchData = async () => {
        console.log('ok', Id)
        setEnable(false)
        const res = await axios.get(`${baseurl}loan/rdcollection/${Id}`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })

        console.log(res.data)
        return res.data
    }

    const { data } = useQuery({ queryKey: [`allCollRdData${Id}`], queryFn: fetchData, enabled: enable })
    console.log(data, 'data')

    const handleclickrdcolallview = (id: number | null) => {
        setEnable(true)
        setId(id)

    }

    return { handleHOderView, handleSubmit, rdcollection, handleChange, mutation, handleclickrdcolallview, data,collectin_data,handleChangeDate }
}