'use client'
import React, { useState } from 'react'
import { Query, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
    
const Page = () => {
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [enable, setenable] = useState(false)

    const fetchData = async () => {
        const res = await axios.get(`${baseurl}loan/cashflow`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data
    }

    
    const { data } = useQuery({ queryKey: ['cashflow'], queryFn: fetchData})
    console.log(data)


    let adddata: any = []
    const newData = data?.map((item: any) => {
        for (let key in item) {
            // console.log(key.split('_')[1])
            if (key.split('_')[1] === 'share') {
                let newadddata = {
                    [key]: {
                        'journal': `Capital introduce by ${item[key].name}`,
                        'amount_debit': item[key].amount_Debit,
                        'amount_credit': item[key].amount_credit,
                    }
                }
                adddata.push(newadddata)
            }
            if (key.split('_')[1] === 'loan') {
                let newadddata = {
                    [key]: {
                        'journal': `Loan Taken by ${item[key].name}`,
                        'amount_debit': item[key].loan_amount,
                        'amount_credit': null,
                    }
                }
                adddata.push(newadddata)
            }

            if (key.split('_')[1] === 'loancoll') {
                let newadddata = {
                    [key]: {
                        'journal': `Loan Collection`,
                        'amount_debit': null,
                        'amount_credit': item[key],
                    }
                }
                adddata.push(newadddata)
            }

            if (key.split('_')[1] === 'staff') {
                let newadddata = {
                    [key]: {
                        'journal': `Staff Payment ${item[key].name} and ID ${item[key].person_id}`,
                        'amount_debit': item[key].amount_Debit,
                        'amount_credit': null,
                    }
                }
                adddata.push(newadddata)
            }
            if (key.split('_')[1] === 'particulars') {
                let newadddata = {
                    [key]: {
                        'journal': `${item[key].particular}}`,
                        'amount_debit': item[key].amount_Debit,
                        'amount_credit': item[key].amount_credit,
                    }
                }
                adddata.push(newadddata)
            }
        }

        const res = {

        }
    })


    const handleClick = async () => {
        setenable(true)
    }

    function requiredDataMain() {
        let prevBalance: number = 0;
        const rows: any[] = [];
    
         adddata.forEach((item: any) => {
            const date = Object.keys(item)[0].split('_')[0];
            const amountDebit = item[Object.keys(item)[0]].amount_debit || 0;
            const amountCredit = item[Object.keys(item)[0]].amount_credit || 0;
    
            const balance = prevBalance + Number(amountCredit) - Number(amountDebit);
            prevBalance = balance;
    
            const data = {
                'date': date,
                'journal': item[Object.keys(item)[0]].journal,
                'amount_debit': amountDebit,
                'amount_credit': amountCredit,
                'balance': balance
            };
    
            rows.push(data);
            return data;
        });
    
        return rows;
    }
    
    const cashflowData = requiredDataMain()
    console.log(cashflowData)
    
    return (
        <div className=' h-auto bg-base-100 text-base-content min-h-screen'>
            <div className="container">
                <div className='h-6'></div>

                <button className=' mt-4 btn btn-success' onClick={handleClick}>ViewData</button>
                <div className=' ml-2 mr-2 mt-4 h-[70vh] bg-base-300 overflow-auto w-[50vw] text-nowrap my-2 relative overflow-y-auto shadow-md  sm:rounded-lg'>
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                            <tr >
                                <th><div className='ml-2'>Date</div></th>
                                <th>Journal</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody >

                            {
                                cashflowData.length > 0 && cashflowData.map((item: any, index: number) => {

                                    return <tr key={index}>
                                        <td><DumyInput indum={item.date} /></td>
                                        <td><DumyInput indum={item.journal} /></td>
                                        <td><DumyInput indum={item.amount_debit} /></td>
                                        <td><DumyInput indum={item.amount_credit} /></td>
                                        <td><DumyInput indum={item.balance} /></td>
                                        {/* You need to calculate the balance */}
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page