'use client'
import React, { useEffect, useState,memo } from 'react'
import SFundCreate from '@/components/shfdatadis/SFundCreate'
import PrBurron from '@/components/button/PrBurron'


import ShDataTable from '@/components/shfdatadis/ShDataTable'
import { useShfdata } from '@/hooks/shf/useShfdata'
import UpdateBotton from '@/components/button/UpdateButton'


const Vendor = () => {
  const {setEnabled,mutation,data,handleKeyDown,vid,setVid,handleSubmit,sharfund,setShareFund} = useShfdata()
   

  return (
    <div className=' h-auto bg-base-100 text-base-100  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
                    <div className="mt-4">
                    <UpdateBotton onClick={()=>setEnabled(true)} label={'View'} />
        <button className="btn btn-success " onClick={() => {
                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}>Add Fund Deposite</button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-base-100 text-base-content">
                <SFundCreate />
                  <div className="modal-action">
                   
                 </div>
                </div>
              </dialog>

            <ShDataTable />
          
        </div>
    </div>
    </div>
    </div>
    
  )
}

export default memo(Vendor)