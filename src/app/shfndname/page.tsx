'use client'
import React,{memo} from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'

import DumyInput from '@/components/dummyinput/DumyInput'
import {shareholderName} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';
import { useShfname } from '@/hooks/shf/useShfname';



const Vendor = () => {
    
    const {shareholder,setShareHolder,newData,setEnabled,mutation,data,setVid,vid,handleSubmit,sfcreate,change,handleCreate,handleKeyDown,handleChange,handleUPdate,mutationUpdate,updateData} = useShfname()
   
  return (
    <div className=' h-auto bg-base-100 text-base-content  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-4 mt-4">
                <div>
                   <PrBurron onClick={handleCreate}  label={'Create'}/>
                   <PrBurron onClick={()=>setEnabled(true)} label={'View'} />
                   <PrBurron  onClick={handleChange} label={'Change'}/>
                   {change==='create' && <PrBurron  onClick={handleUPdate} label={'Update'}/>}

                </div>
                <div>
                </div>
                {change!=='create' &&  <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data!==undefined && data.data.msg } Holder Id {data!==undefined && data.data.data.Sh_id}</div></div>}</div>}

                {change==='create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{updateData!==undefined && updateData.data.msg } Holder Id {updateData!==undefined && updateData.data.data.Sh_id}</div></div>}</div>}



                {change ==='create' && <><label htmlFor="Vendor" className="form-label text-sm">Holder Id</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e)=>setVid(e.target.value)} className="form-control  text-sm  w-full" />
                </>}

               {sfcreate ==='create' &&  <form onSubmit={handleSubmit}>

                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <TextInput value={shareholder.name} onChange = {(e)=>setShareHolder({...shareholder,name :e.target.value})} />
                <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                <TextInput value={shareholder.phone_no}onChange = {(e)=>setShareHolder({...shareholder,phone_no :e.target.value})} />

                <label htmlFor="Email" className="form-label text-sm">Email</label>
                <TextInput type={'email'}  value={shareholder.email} onChange = {(e)=>setShareHolder({...shareholder,email :e.target.value})} />
                <label htmlFor="pan" className="form-label text-sm">Pan</label>
                <TextInput  css={'mb-4'} value={shareholder.pan_no} onChange = {(e)=>setShareHolder({...shareholder,pan_no:e.target.value})} />

               {change!=='create' && <PrBurron label={'Submit'} buttomType={'submit'} />}
               </form>}
               
            </div>
            <div className="col-sm-8 relative bg-base-300 text-nowrap overflow-y-auto shadow-md  mt-2  sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right   ">
                        <thead className='sticky top-0 z-1 h-10'>
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

                            {newData?.map((items:shareholderName)=>{
                                return  <tr key={items.Sh_id}>
                                <th scope="row"><DumyInput indum={items.Sh_id !==undefined?items.Sh_id:null}/></th>
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
        </div>
    </div>
    </div>
    
  )
}

export default memo(Vendor)