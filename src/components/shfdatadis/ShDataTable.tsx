
import SfperPersonDsis from '@/components/shfdatadis/SfperPersonDsis'
import { shareholderFund } from '@/type/shareholder/shareholde'
import { useQuery } from '@tanstack/react-query'
import { getHideData } from '@/redux/shf/shfslicer'
import DumyInput from '@/components/dummyinput/DumyInput'
import { useShfdata } from '@/hooks/shf/useShfdata'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import React, { useEffect, useState, memo } from 'react'
import { shfStateTypr } from '@/type/shareholder/shareholde'
import { soundClick } from '@/sound/sound'
import { CSVLink } from "react-csv";

interface prodatatype {
    Sh_id: string,
    amount_Debit: number | null,
    amount_credit: number | null,
    sh_name: string,
    shf_id: number | null,
    time: string,
}

const ShDataTable = () => {

    const { newData:data } = useShfdata()

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()

    const [prodata, setProdata] = useState<prodatatype[]>([{ sh_name: '', Sh_id: '', shf_id: null, amount_credit: null, amount_Debit: null, time: '' }])

    const handleTotalColView = async (id: any) => {
        try {
            const res = await axios.get(`${baseurl}loan/shfund/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            console.log(res.data)
            

            setProdata(res.data)
        } catch (error) {
            console.log(error)
        }
        dispatch(getHideData('absolute'))
    }



    let csvData: any = []

        if (data) {
            const newData = data?.map((item: shareholderFund) => {
                return [item.shf_id, item.name, item.name, '',item.totalInvested,'']
            })

            csvData = [
                ["Customer ID", "Name", "Quantity", "Amount Invested", "Present Value"],
                ...newData
            ];
        }

    return (
        <>
          <button className='btn btn-secondary mr-2'><CSVLink filename={'Customer-file.csv'} data={csvData}>Export Excel</CSVLink></button>
    
        <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md  mt-2 bg-base-300 text-base-content sm:rounded-lg  h-[80vh]">

            <table className="w-full text-sm text-left rtl:text-right ">
                <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                    <tr>
                        <th scope="col" className='px-6 py-2'>Customer Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Amount Invested</th>
                        <th scope="col">Present Value</th>
                        <th scope="col">View Details</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {data?.map((items: shareholderFund) => {
                        return <tr key={items.shf_id}>
                            <th scope="row"><DumyInput indum={items.shf_id} /></th>
                            <td><DumyInput indum={items.name} /></td>
                            <td><DumyInput indum={''} /></td>
                            <td><DumyInput indum={items.totalInvested} /></td>
                            <td><DumyInput indum={''} /></td>
                            <button className="btn btn-sm btn-primary mr-2 w-full" onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                handleTotalColView(items.shf_id)
                                soundClick?.play()
                                if (modal) {
                                    modal.showModal();
                                }
                            }}>View Details</button>
                        </tr>
                    })}
                </tbody>
            </table>



            <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <SfperPersonDsis prodataitem={prodata} />
                    <div className="modal-action">
                        
                    </div>
                </div>
            </dialog>
        </div>
        </>
    )
}

export default memo(ShDataTable)