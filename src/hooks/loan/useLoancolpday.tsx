
import { StateProps } from '@/type/type'
import { useSelector } from 'react-redux'
import React, { useState } from 'react';

interface Data {
    [date: string]: Entry;
}

interface Entry {
    [rdHolderId: string]: number | null;
}

import axios from 'axios';

export const useLoancolpday=()=>{



    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

    const [date, setDate] = useState({ startDate: '2024-01-10', endDate: '2024-01-31' })
    const [data, setData] = useState<Data>({})
    // Your provided data

    const handleClick = async () => {
        console.log(date)
        const dateData = {
            start_date: date.startDate,
            end_date: date.endDate,
        }
        console.log(dateData)
        try {
            const res = await axios.post(`${baseurl}loan/loanDataView`, dateData,{
                headers : {
                    Authorization : `Bearer ${authToken?.access}`
                }
            })
            console.log(res.data)
            setData(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    return {setDate,date,handleClick,data}
}