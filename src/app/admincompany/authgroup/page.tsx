'use client'

import React from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import AddAuthModal from '@/components/admincompany/authgroup/AddAuthModal'


export interface authGroupType {
    group_id: number | null,
    user: number | null,
    usersf: number | null,
    model_name: 'LoanColl'| 'RDColl',
    auth_type : "checked_by" | "approved_by" ,
    time: '',
   
  }
  


const Page = () => {

    
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


  const getTodos = async () => {

    const res = await axios.get(`${baseurl}loan/authgroup`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

    return res.data

  }

  const { data } = useQuery({ queryKey: ['authgroup'], queryFn: getTodos })

    console.log(data)

  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
      <div className="ml-80 my-6 mr-20">

        <div className="p-2"></div>
        <button className="btn btn-success mr-2 " onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

          if (modal) {
            modal.showModal();
          }
        }}>Add Group Auth</button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl ">

            <div className="modal-action mt-0">
            </div>

            <AddAuthModal />
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
              <th scope="col" className="px-6 py-2">Group Id</th>
              <th scope="col">Model Name</th>
              <th scope="col">Auth Type</th>
              <th scope="col">Permission Given to</th>
              <th scope="col">Created By</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((items:any ) => (
              <tr key={items.group_id}>
                <th scope="row">
                  <DumyInput indum={items.group_id !== undefined ? items.group_id : null} />
                </th>
                <td>

                  <DumyInput indum={items.model_name} />

                </td>
                <td>

                  <DumyInput indum={items.auth_type} />


                </td>
                <td>

                  <DumyInput indum={items.user } />

                </td>
               
                <td>

                  <DumyInput indum={items.usersf} />
                </td>
 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page