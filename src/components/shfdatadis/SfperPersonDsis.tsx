import React from 'react'
import DumyInput from '../dummyinput/DumyInput';
import {getHideData} from '@/redux/shf/shfslicer'
import {useSelector,useDispatch} from 'react-redux'

interface ProdataType {
    Sh_id: string;
    amount_Debit: number | null;
    amount_credit: number | null;
    sh_name: string;
    shf_id: number | null;
    time: string;
}

interface SfperPersonDsisProps {
    prodataitem: ProdataType[];
}

const SfperPersonDsis: React.FC<SfperPersonDsisProps>  = (props) => {
    const dispatch= useDispatch()

  
  return (
    <div>
          <div  onClick={()=>dispatch(getHideData('hidden'))} className=' bg-red-900 w-20 text-center rounded-t cursor-pointer'>Close</div>

          <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">

                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Name</th>
                                <th scope="col" className='px-6 py-2'>Holder Id</th>
                                <th scope="col" className='px-6 py-2'>Fund Deposite Id</th>
                                <th scope="col" className='px-6 py-2'>Amount Credited</th>
                                <th scope="col" className='px-6 py-2'>Amount Debit</th>
                                <th scope="col" className='px-6 py-2'>Date</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {props.prodataitem[0].shf_id !== null  && props.prodataitem[0].shf_id !== undefined && props?.prodataitem?.map(({Sh_id,amount_Debit,amount_credit,sh_name,shf_id,time})=>{
                                
                                return  <tr key={shf_id}>

                                <th scope="row"><DumyInput indum={sh_name}/></th>
                                <td><DumyInput indum={Sh_id}/></td>
                                <td><DumyInput indum={shf_id}/></td>
                                <td><DumyInput indum={amount_credit}/></td>
                                <td><DumyInput indum={amount_Debit}/></td>
                                <td><DumyInput indum={time}/></td>
                            </tr>
                            })}
                           
                        </tbody>
                    </table>
    </div>
  )
}

export default SfperPersonDsis