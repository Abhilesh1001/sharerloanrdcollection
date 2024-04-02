import React,{memo} from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {loanholderName,shfStateTypr} from '@/type/shareholder/shareholde'
import { useLoan } from '@/hooks/loan/useLoan'
import { format,parseISO } from 'date-fns';
import {useSelector} from 'react-redux'

const LoanPerTable = () => {
    const {loanNewNameData} = useSelector((state:shfStateTypr)=>state.shfSlice)
    // const {newData} = useLoan()
    // console.log('loanName',loanNewNameData)
  return (
    <div className="col-sm-8 relative text-nowrap overflow-y-auto bg-base-100 text-base-content shadow-md  mt-2  sm:rounded-lg  h-[80vh]">
    <table className="w-full text-sm text-left rtl:text-right  ">
        <thead className='sticky top-0 z-1 bg-base-200'>
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
            {loanNewNameData?.map((items:loanholderName)=>{
                return  <tr key={items.loan_id}>
                <th scope="row"><DumyInput indum={items.loan_id !==undefined?items.loan_id:null}/></th>
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

export default memo(LoanPerTable)