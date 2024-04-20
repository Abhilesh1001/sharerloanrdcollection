import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import DumyInput from '../dummyinput/DumyInput'
import { format,parseISO } from 'date-fns'
import { useRdintrest } from '@/hooks/rd/useRdintrest'

export interface CustomerRdPlan{
    rd_id ?: number|null ,
    person_name: string,
    person_id: number|null,
    start_date: string ,
    closing_date: string,
    is_active:boolean,
    duration: number | null,
    interest_rate: number | null
}

const CustomerRdView = () => {
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)

    const {data} = useRdintrest()


  return (
    <div className="col-sm-8 relative text-nowrap overflow-y-auto bg-base-100 text-base-content shadow-md  mt-2  sm:rounded-lg  h-[80vh]">
    <table className="w-full text-sm text-left rtl:text-right   ">
        <thead className='sticky top-0 z-1 bg-base-200'>
            <tr>
                <th scope="col" className='px-6 py-2'>RD ID</th>
                <th scope="col">Person Name</th>
                <th scope="col">Person Id</th>
                <th scope="col">Start Date</th>
                <th scope="col">Close Date</th>
                <th scope="col">IS Active</th>
                <th scope="col">Intrest Rate</th>
            </tr>
        </thead>
        <tbody className=' text-center'> 
            {data?.map((items:CustomerRdPlan)=>{
                return  <tr key={items.rd_id}>
                <th scope="row"><DumyInput indum={items.rd_id !==undefined?items.rd_id:null}/></th>
                <td><DumyInput indum={items.person_name}/></td>
                <td><DumyInput indum={items.person_id}/></td>
                <td><DumyInput indum={items.start_date !==undefined?format(parseISO(items.start_date),'dd-MM-yy') :''}/></td>
                <td><DumyInput indum={items.is_active?'active':items.closing_date !==undefined?format(parseISO(items.closing_date),'dd-MM-yy') :''}/></td>
                <td><DumyInput indum={items.is_active?'active':'close'}/></td>
                <td><DumyInput indum={items.interest_rate}/></td>
            </tr>
            })}
           
        </tbody>
    </table>
</div>
  )
}

export default CustomerRdView