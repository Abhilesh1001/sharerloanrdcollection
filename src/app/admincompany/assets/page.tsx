'use client'
import AddAssets from '@/components/admincompany/assets/AddAssets';
import React from 'react'

import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps,assetType } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { format,parseISO } from 'date-fns'

const Users = () => {

  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/assetscompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })


    return res.data


  }

  const { data } = useQuery({ queryKey: ['addassetscompany'], queryFn: getTodos })
  

  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
    <div className="ml-80 my-6 mr-20">



      <div className="p-4"></div>
      <button className="btn btn-success mr-2 "
       onClick={() => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

        if (modal) {
          modal.showModal();
        }
      }}>Add Assets</button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl ">

          <div className="modal-action mt-0">
          </div>

          <AddAssets />

        </div>
      </dialog>


      <div className='row'>
        <div className="col-sm-6">

        </div>
        <div className="col-sm-6">

        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="sticky top-0 z-1 bg-base-200">
          <tr>
            <th scope="col" className="px-6 py-2">Asset ID</th>
            <th scope="col">Asset Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Created By</th>  
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((items: assetType) => (
            <tr key={items.asset_no}>
              <th scope="row">
                <DumyInput indum={items.asset_no !== undefined ? items.asset_no : null} />
              </th>
              <td>
                <DumyInput indum={items.asset_name} />
              </td>
              <td>

                <DumyInput indum={items.amount_Debit} />
              </td>
              <td>

              <DumyInput indum={items.debit_date!==undefined ? format(parseISO(items.debit_date), 'dd.MM.yy'):''} />
              </td>
              <td>

                <DumyInput indum={items.usersf !== undefined ? items.usersf : null} />
              </td>
           
              <td>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Users