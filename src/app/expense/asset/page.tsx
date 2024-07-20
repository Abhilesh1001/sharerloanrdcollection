'use client'
import { soundClick } from '@/sound/sound'
import React from 'react'
import AssetCreation from '@/components/asset/AssetCreation'
import { useAsset } from '@/hooks/assets/useAssets'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format,parseISO } from 'date-fns'
import { CSVLink } from "react-csv";




interface assetType {
  asset_no?: null | number
  asset_name: string,
  usersf: null | number,
  amount_Debit: null | number,
  debit_date:string

}

const Asset = () => {
  const {newData:data} = useAsset()

  let csvData: any = []

  if (data) {
      const newData = data?.map((item: assetType) => {
          return [item?.asset_no,item?.asset_name,item?.amount_Debit,item?.debit_date,item.usersf]
      })

      csvData = [
          ["Asset No","Asset Name","Amount","Date","Created by"],
          ...newData
      ];
  }

  return (
    <div className='text-base-content bg-base-100 h-auto   min-h-screen'>
      <div className='container'>
        <div className="row my-4">
          <div className="mt-4">
            <div>
            <button className='btn btn-secondary mr-2'><CSVLink filename={'Expense-file.csv'} data={csvData}>Export Excel</CSVLink></button>

              <button className="btn btn-success mr-2 " onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                soundClick?.play()
                if (modal) {
                  modal.showModal();
                }
              }}>Add Assets</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box ">

                  <div className="modal-action mt-0">
                  </div>
                  <AssetCreation />
                </div>
              </dialog>
            </div>
            <div>
            </div>

          </div>

          <div className="col-sm-10 relative bg-base-300 text-nowrap overflow-y-auto shadow-md bd-base-300  mt-2  sm:rounded-lg  h-[80vh]">
            <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className='sticky top-0 z-1  h-10'>
                <tr>
                  <th scope="col" className='px-6 py-2'>Assets No</th>
                  <th scope="col">Asset Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Created By</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {data?.map((items:assetType ) => {
                  return <tr key={items.asset_no}>
                    <th scope="row"><DumyInput indum={items.asset_no !== undefined ? items.asset_no : null} /></th>
                    <td><DumyInput indum={items.asset_name} /></td>
                    <td><DumyInput indum={items.amount_Debit} /></td>
                    <td><DumyInput indum={items.debit_date!==undefined ? format(parseISO(items.debit_date), 'dd.MM.yy'):''} /></td>
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

export default Asset