import React, { memo, useState } from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import { loanholderName, shfStateTypr } from '@/type/shareholder/shareholde'
import { useLoan } from '@/hooks/loan/useLoan'
import { format, parseISO, setDate } from 'date-fns';
import { useSelector } from 'react-redux'
import axios from 'axios';
import {StateProps} from '@/type/type'
import AllPersonDetails from './AllPersonDetails';
import { soundClick, soundSsuccess } from '@/sound/sound';
const LoanPerTable = () => {
    const { loanNewNameData } = useSelector((state: shfStateTypr) => state.shfSlice)
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
   
    const [data,setData] = useState({address:'',email:'',name:'',pan_no:'',person_id:null,phone_no:'',time:'',usersf:null})
    const handleclickrdcolallview= async (id:any)=>{
        soundClick?.play()
        try{
            const res =await  axios.get(`${baseurl}loan/person/${id}`,{headers:{
                Authorization: `Bearer ${authToken?.access}`
            }})
            setData(res.data)
        }catch(error){

            console.log(error)
        }
       
    }




    return (
        <div className="col-sm-10 relative text-nowrap bg-base-300 overflow-y-auto pt-2 text-base-content shadow-md  mt-2  sm:rounded-lg  h-[80vh]">
            <table className="w-full text-sm text-left rtl:text-right   ">
                <thead className='sticky top-0 z-1 bg-base-200'>
                    <tr>
                        <th scope="col" className='px-6 py-2'>Holder Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Pan</th>
                        <th scope="col">Date</th>
                        <th scope="col">View Details</th>
                    </tr>
                </thead>
                <tbody className=' text-center'>
                    {loanNewNameData?.map((items: loanholderName) => {
                        return <tr key={items.person_id}>
                            <th scope="row"><DumyInput indum={items.person_id !== undefined ? items.person_id : null} /></th>
                            <td><DumyInput indum={items.name} /></td>
                            <td><DumyInput indum={items.phone_no} />{ }</td>
                            <td><DumyInput indum={items.email} /></td>
                            <td><DumyInput indum={items.pan_no} /></td>
                            <td><DumyInput indum={items.time !== undefined ? format(parseISO(items.time), 'dd-MM-yy') : ''} /></td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => {
                                    const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                                    if (modal) {
                                        modal.showModal();
                                    }
                                    handleclickrdcolallview(items.person_id);
                                }}>Check Collection</button>

                            </td>
                        </tr>
                    })}

                </tbody>
            </table>

            <dialog id="my_modal_2" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl  mt-0">
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={()=>soundClick?.play()} className="btn btn-error mb-2">Close</button>
                                </form>
                            </div>
                            <AllPersonDetails prodataitem={data} />
                        </div>
                    </dialog>
        </div>
    )
}

export default memo(LoanPerTable)