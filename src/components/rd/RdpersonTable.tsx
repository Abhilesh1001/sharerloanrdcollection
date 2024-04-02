import React,{memo,useEffect} from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {rdholderName} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';
import {shfStateTypr} from '@/type/shareholder/shareholde'
import {useSelector,useDispatch} from 'react-redux'



const RdpersonTable = () => {
    const {rdNewData} = useSelector((state:shfStateTypr)=>state.shfSlice)
    
  return (
    <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-[80vh]">
    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
            <tr>
                <th scope="col" className='px-6 py-2'>Holder Id</th>
                <th scope="col">Name</th>
                <th scope="col">Phone No</th>
                <th scope="col">Email</th>
                <th scope="col">Pan</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody className=' text-gray-50 text-center'> 
            { rdNewData!== null && rdNewData?.map((items:rdholderName)=>{
                return  <tr key={`holderId_${items.rdp_id}`}>
                <th scope="row"><DumyInput indum={items.rdp_id !==undefined?items.rdp_id:null}/></th>
                <td><DumyInput indum={items.name}/></td>
                <td><DumyInput indum={items.phone_no}/>{}</td>
                <td><DumyInput indum={items.email}/></td>
                <td><DumyInput indum={items.pan_no}/></td>
                <td><DumyInput indum={items.time !==undefined?format(parseISO(items.time),'dd.MM.yy') :''}/></td>
            </tr>
            })}
           
        </tbody>
    </table>
</div>
  )
}

export default memo(RdpersonTable)