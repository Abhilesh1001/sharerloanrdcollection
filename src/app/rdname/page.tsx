'use client'
import React from 'react'
import PrBurron from '@/components/button/PrBurron'
import dynamic from 'next/dynamic';
import Rdintrest from '@/components/rd/Rdintrest'


import { useRdname } from '@/hooks/rd/useRdname'

const RdpersonTable = dynamic(() => import('@/components/rd/RdpersonTable'));

const Vendor = () => {
  const { setEnabled} = useRdname()
  return (
    <div className=' h-auto bg-base-100 text-base-content  min-h-screen'>
      <div className='container'>
        <div className='h-4'></div>
        <div className="my-6">
            <div>

              {/* Rd intrest  */}
              <button className="btn btn-success" onClick={() => {
                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}>Add Rd Intrest</button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box text-base-content bg-base-100">
                  <Rdintrest />
                  <div className="modal-action">
                   
                 </div>
                </div>
              </dialog>

                {/* Rdintrest end  */}
            </div>
            <div>
            </div>
        </div>
      </div>
    </div>

  )
}

export default Vendor