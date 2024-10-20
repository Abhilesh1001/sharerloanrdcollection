'use client'
import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddUserRole from '@/components/admin/userrole/AddUserRole'


export interface roleUpdateType {
  id?: null | number
  user: number,
  role: number,
  can_authenticate: boolean
}

const UserRole = () => {


  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/userroles`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })


    return res.data


  }

  const { data } = useQuery({ queryKey: ['adduserrole'], queryFn: getTodos })
  
  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
      <div className="ml-80 my-6 mr-20">



        <div className="p-4"></div>
        <button className="btn btn-success mr-2 " onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

          if (modal) {
            modal.showModal();
          }
        }}>Add User Role</button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl ">

            <div className="modal-action mt-0">
            </div>

            <AddUserRole />

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
              <th scope="col" className="px-6 py-2">User Role ID</th>
              <th scope="col" className="px-6 py-2">USER</th>
              <th scope="col">Role</th>
              <th scope="col">Can Authenticate</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((items: roleUpdateType) => (
              <tr key={items.id}>
                <th scope="row">
                  <DumyInput indum={items.id !== undefined ? items.id : null} />
                </th>
                <td>
                  <DumyInput indum={items.user} />
                </td>
                <td>
                  <DumyInput indum={items.role} />
                </td>
                <td>
                  {items.can_authenticate ? <div className="w-4 h-4 flex justify-center items-center bg-green-600 rounded-full ml-10"></div> :<div className="w-4 h-4 flex justify-center items-center bg-red-800 rounded-full ml-10"></div>}

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

export default UserRole