'use client'
import React, { memo, useState } from 'react'
import LoanPerTable from '@/components/loan/LoanPerTable'
import LoanPersonCreate from '@/components/loan/LoanPersonCreate'
import { soundClick } from '@/sound/sound'
import { useSelector } from 'react-redux'
import { loanholderName, shfStateTypr } from '@/type/shareholder/shareholde'
import { CSVLink } from "react-csv";



const Vendor = () => {
    const { loanNewNameData: data } = useSelector((state: shfStateTypr) => state.shfSlice)
    console.log(data)

        let csvData: any = []

        if (data) {
            const newData = data?.map((item: loanholderName) => {
                return [item.person_id, item.name, item.phone_no, item.email,item.pan_no, item.addhar, item.time, item.address]
            })

            csvData = [
                ["Customer ID", "Name", "Phone No", "Email", "Pan", "Addhar", "Date", "Address"],
                ...newData
            ];
        }

    return (
        <div className='bg-base-100 h-auto   min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">

                    <div className='flex'>

                        <button className='btn btn-secondary mr-2'><CSVLink filename={'Customer-file.csv'} data={csvData}>Export Excel</CSVLink></button>

                        <div>
                            <button className="btn btn-success mr-2 " onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                if (modal) {
                                    modal.showModal();
                                }
                                soundClick?.play()

                            }}>Add Customer</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <LoanPersonCreate />
                                    <div className="modal-action">

                                    </div>
                                </div>
                            </dialog>
                        </div>

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