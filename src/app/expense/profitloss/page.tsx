'use client'
import React, { useState } from 'react';
import { StateProps } from '@/type/type'
import { useSelector } from 'react-redux'
import ButtonSave from '@/components/button/ButtonSave';
import axios from 'axios';
import DumyInput from '@/components/dummyinput/DumyInput';
import { soundSsuccess,soundClick,soundError } from '@/sound/sound';
import { toast } from 'react-toastify';
import Loading from '@/components/loading/Loading';

interface dataType {
    asset: number | null,
    expense: {
        expensedebit: number | null
        expense_credit: number | null
    }
    fd: {
        fd_debit: number | null,
        fd_credit: number | null
    }
    loan: number | null
    msg: string,
    rd: number | null
    staff: null | number
}

const ProfitLoss = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter);

    const [date, setDate] = useState({ start_date: '2024-01-10', end_date: '2024-01-31' })
    const [loading,setLoading] = useState(false)

    const [data, setData] = useState<dataType>({asset:null,
        expense: {
            expensedebit:  null,
            expense_credit: null
        },
        fd: {
            fd_debit:null,
            fd_credit:null
        },
        loan: null,
        msg: '',
        rd: null,
        staff:null
    })


    async function handleClick() {
        soundClick?.play()
        setLoading(true)

        try {
            const res = await axios.post(`${baseurl}loan/profitandloss`, date, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            soundSsuccess?.play()
            setData(res.data)
            setLoading(false)
        } catch (error) {
            toast.error('Contatct to Admin',{position:'top-center'})
            soundError?.play()
            console.log(error)
            setLoading(false)

        }

    }

    return (
        <div className='bg-base-100 text-base-content pt-4 min-h-screen mt-6'>
            <div className='h-3'></div>
            <div className='flex ml-4'>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap pt-2  mr-2' >Start Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, start_date: e.target.value })} className="input input-bordered" />
                </div>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap mr-2 pt-2 ml-2' >End Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, end_date: e.target.value })} className="input input-bordered" />
                </div>
                <ButtonSave label={'submit'} onClick={handleClick} />
                {loading && <Loading />}
            </div>
            <div className="col-sm-10 ml-10 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg">
                <table className='w-full text-sm text-left rtl:text-right'>
                    <thead className='sticky top-0 z-1  h-10'>
                        <tr>
                            <th className='pl-2'>RD Intrest</th>
                            <th>Loan Intrest</th>
                            <th>Assets</th>
                            <th>FD Credit</th>
                            <th>FD Debit</th>
                            <th>Expense Debit</th>
                            <th>Expense Credit</th>
                            <th>Staff Salary</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        <tr>
                            <td> <DumyInput indum={data.rd} /></td>
                            <td>   <DumyInput indum={data.loan} /></td>
                            <td>  <DumyInput indum= {data.asset} /></td>
                            <td>   <DumyInput indum={data.fd.fd_credit} /></td>
                            <td><DumyInput indum={data.fd.fd_debit} /></td>
                            <td><DumyInput indum={data.expense.expensedebit} /></td>
                            <td><DumyInput indum={data.expense.expense_credit} /></td>
                            <td><DumyInput indum={data.staff} /></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ProfitLoss