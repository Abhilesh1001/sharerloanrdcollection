'use client'
import React from 'react'
import PrBurron from '@/components/button/PrBurron'
import dynamic from 'next/dynamic';
import Rdintrest from '@/components/rd/Rdintrest'
import CustomerRdView from '@/components/rd/CustomerRdView';
import { useRdintrest } from '@/hooks/rd/useRdintrest';

import { CSVLink } from "react-csv";
import { soundClick } from '@/sound/sound';
import { CustomerRdPlan } from '@/components/rd/CustomerRdView';
import { format } from 'date-fns';

const RdpersonTable = dynamic(() => import('@/components/rd/RdpersonTable'));

const Vendor = () => {

  const { data } = useRdintrest()

  let csvData: any = []

  if (data) {
    const newData = data?.map((item: CustomerRdPlan) => {
      return [item.rd_id, item.person_name, item.person_id, format(item.start_date,'dd-MM-yyyy'), item.is_active===true?'active':format(item.closing_date,'dd-MM-yyyy'), item.is_active===true?'active':'close', item.interest_rate]
    })

    csvData = [
      ["RD ID", "Person Name", "Person ID", "Start Date", "Close Date", "Is active", "Intrest Rate"],
      ...newData
    ];
  }

  return (
    <div className=' h-auto bg-base-100 text-base-content  min-h-screen'>
      <div className='container'>
        <div className='h-4'></div>
        <div className="my-6">
        <div className='flex'>
        <button className='btn btn-secondary mr-2'><CSVLink filename={'RDInt-file.csv'} data={csvData}>Export Excel</CSVLink></button>

        <button className="btn btn-success" onClick={() => {
                  soundClick?.play()
                  const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                  if (modal) {
                    modal.showModal();
                  }
                }}>Add Rd Intrest</button>
        </div>

              <div>
                {/* Rd intrest  */}
               
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box text-base-content bg-base-100">
                    <Rdintrest />
                    <div className="modal-action">

                    </div>
                  </div>
                </dialog>

                {/* Rdintrest end  */}

                <CustomerRdView />


              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

        )
}

        export default Vendor