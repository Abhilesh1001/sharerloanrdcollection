
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { loancollData } from '@/type/shareholder/shareholde'
import { format, parseISO } from 'date-fns'
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'
import { toast } from 'react-toastify'

interface MyData {
    data: {
        msg: string
    }
}




export const useLoancoldata = () => {


    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [loancollection, setLoancollection] = useState<loancollData[]>([{ user: userId, loan_person: null, amount_collected: null, remarks: '', name: '' }])


    const [collectin_data,setCollectiondata] = useState(format(new Date, 'yyyy-MM-dd'))
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollectiondata(e.target.value);
    };



    const handleHOderView = async () => {
        //gjgjhg 
        soundClick?.play()
        setCollectiondata(format(new Date, 'yyyy-MM-dd'))
        try {
            const res = await axios.get(`${baseurl}loan/loanamount`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            console.log(res)
            soundSsuccess?.play()
            const activeLaon = res.data.filter((item: any) => {
                if (item.is_active) {
                    return item
                }
            })
            const dataCol = activeLaon.map((items: any) => {
                const neData = {
                    loan_person: items.loan_id,
                    name: items.person_name,
                    amount_collected: null,
                    remarks: null
                }
                return neData
            })
            setLoancollection(dataCol)
        } catch (error) {
            console.log(error)
        }

    }

    const mutation = useMutation<MyData, any, any, unknown>({
        mutationFn: async (newTodo: any) => {
            return await axios.post(`${baseurl}loan/loancollection`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: () => {
            soundSsuccess?.play()
            setLoancollection([{ user: null, loan_person: null, amount_collected: null, remarks: '', name: '' }])
        
        },
        onError: (error) => {
            soundError?.play()
            toast.error('Enter all required Fields',{position:'top-right'})
        }
    })


    const handleSubmit = async () => {

        const data = loancollection.map((item) => {
            const newData = {
                usersf: userId,
                loan_intrest: item.loan_person,
                amount_collected: item.amount_collected,
                remarks: item.remarks,
                collection_date: collectin_data
            }
            return newData
        })
       
        mutation.mutate(data)

    }


    const handleChange = (value: string | number, key: keyof loancollData, index: number) => {
        
        const freData: any = [...loancollection]
        freData[index][key] = value
        setLoancollection(freData)
    }

    const [enable, setEnable] = useState(false)
    const [Id, setId] = useState<null | number>(null)

    const fetchData = async () => {
        console.log('ok', Id)
        setEnable(false)
        const res = await axios.get(`${baseurl}loan/loancollection/${Id}`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })

        return res.data
    }

    const { data } = useQuery({ queryKey: [`allCollLoanData${Id}`], queryFn: fetchData, enabled: enable })
    console.log(data, 'data')

    const handleclickrdcolallview = (id: number | null) => {
        soundClick?.play()
        setEnable(true)
        setId(id)

    }

    function handleDelete(index:number){
        soundClick?.play()
        const newData = [...loancollection]
        const filterData:any =  newData.filter((item:loancollData,indexes)=>{
            if(index!==indexes){
                return item
            }

        })
        setLoancollection(filterData)
        
    }


    return { handleHOderView, handleSubmit, loancollection, handleChange, mutation, handleclickrdcolallview, data, handleChangeDate, collectin_data ,handleDelete }
}