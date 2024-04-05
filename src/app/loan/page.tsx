'use client'
import React, {memo } from 'react'
import LoanPerTable from '@/components/loan/LoanPerTable'
import LoanPersonCreate from '@/components/loan/LoanPersonCreate'
import { soundClick } from '@/sound/sound'



const Vendor = () => {
    return (
        <div className='bg-base-100 h-auto   min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">
                        <div>
                            <button className="btn btn-success mr-2 " onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                if (modal) {
                                    modal.showModal();
                                }
                                soundClick?.play()

                            }}>Add Customer</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
                                    <LoanPersonCreate />
                                    <div className="modal-action">
                                       
                                    </div>
                                </div>
                            </dialog>
                        </div>
                        <div>
                        </div>
                       
                    </div>
                    <LoanPerTable />
                </div>
            </div>
        </div>

    )
}

export default memo(Vendor)