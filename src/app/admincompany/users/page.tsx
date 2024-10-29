'use client'
import AddUserModal from '@/components/admincompany/users/AddUserModal'
import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export interface userType {
  id: number | null,
  email: string,
  is_superuser: boolean,
  name: string,
  tc: boolean,
  is_active: boolean,
  is_admin: boolean,
  company: number | null,
  is_company_admin :boolean,
}






const Users = () => {


  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/userscompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })

  
    return res.data


  }

  const { data } = useQuery({ queryKey: ['apiusercompany'], queryFn: getTodos })

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
        }}>Add Users</button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl ">

            <div className="modal-action mt-0">
            </div>
            <AddUserModal />
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
              <th scope="col" className="px-6 py-2">USER ID</th>
              <th scope="col">USER NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">Active</th>
              <th scope="col">TC</th>
              <th scope="col">IS Company Admin</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((items: userType) => (
              <tr key={items.id}>
                <th scope="row">
                  <DumyInput indum={items.id !== undefined ? items.id : null} />
                </th>
                <td>

                  <DumyInput indum={items.name} />

                </td>
                <td>

                  <DumyInput indum={items.email} />


                </td>
                <td>

                  <DumyInput indum={items.is_active ? 'Active' : 'Inactive'} />

                </td>
               
                <td>

                  <DumyInput indum={items.tc ? 'Active' : 'Inactive'} />
                </td>
                <td>

                  <DumyInput indum={items.is_company_admin ? 'Active' : 'Inactive'} />
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

