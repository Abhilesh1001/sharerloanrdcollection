'use client'
import React from 'react'

import { soundClick } from '@/sound/sound'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns'
import ParticularCreation from '@/components/particular/ParticularCreation'
import { useParticular } from '@/hooks/particular/useParticular'
import { CSVLink } from "react-csv";

const Particular = () => {

  const { newData:data } = useParticular()

  interface expenseType {
    p_id?: null | number
    particulars: string,
    usersf: null | number,
    amount_Debit: null | number,
    amount_credit: null | number,
    time: string
  }

  let csvData: any = []

  if (data) {
      const newData = data?.map((item: expenseType) => {
          return [item.p_id, item.particulars, item.amount_Debit,item.amount_credit,format(item.time,'dd-MM-yyyy'),item.usersf]
      })

      csvData = [
          ["Expense No", "Expense Name", "Amount Debit", "Amount Credit","Date","Created By"],
          ...newData
      ];
  }

  return (

    <div className='text-base-content bg-base-100 h-auto   min-h-screen'>
      <div className='container'>
        <div className="row my-4">
          <div className="mt-4">
            <div>

              <button className="btn btn-success mr-2 " onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                soundClick?.play()
                if (modal) {
                  modal.showModal();
                }
              }}>Add Expense</button>

                <button className='btn btn-secondary mr-2'><CSVLink filename={'Expense-file.csv'} data={csvData}>Export Excel</CSVLink></button>


              <dialog id="my_modal_1" className="modal">
                <div className="modal-box ">

                  <div className="modal-action mt-0">
                  </div>
                  <ParticularCreation />
                </div>
              </dialog>
            </div>
            <div>
            </div>

          </div>

          <div className="col-sm-10 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg  h-[80vh]">
            <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className='sticky top-0 z-1  h-10 bg-base-200'>
                <tr>
                  <th scope="col" className='px-6 py-2'>Expense No</th>
                  <th scope="col">Expense Name</th>
                  <th scope="col">Amount Debit</th>
                  <th scope="col">Amount Credit</th>
                  <th scope="col">Date</th>
                  <th scope="col">Created By</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {data?.map((items: expenseType) => {
                  return <tr key={items.p_id}>
                    <th scope="row"><DumyInput indum={items.p_id !== undefined ? items.p_id : null} /></th>
                    <td><DumyInput indum={items.particulars} /></td>
                    <td><DumyInput indum={items.amount_Debit} /></td>
                    <td><DumyInput indum={items.amount_credit} /></td>
                    <td><DumyInput indum={format(parseISO(items.time), 'dd.MM.yy')} /></td>
                    <td><DumyInput indum={items.usersf} /></td>
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

export default Particular