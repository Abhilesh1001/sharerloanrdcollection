'use client'
import AddProfileUpdate from '@/components/admin/profile/AddProfileUpdate'
import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddRole from '@/components/admincompany/roles/AddRole'


export interface roleUpdateType {
  id?: null | number
  company: null | number,
  name: string
  permissions: any,
}


const Roles = () => {
  
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/rolescompany`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })


    return res.data


  }

  const { data } = useQuery({ queryKey: ['addrolecompany'], queryFn: getTodos })
  
  

  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
      <div className="ml-80 my-6 mr-20">



        <div className="p-4"></div>
        <button className="btn btn-success mr-2 " onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

          if (modal) {
            modal.showModal();
          }
        }}>Add Role</button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl ">

            <div className="modal-action mt-0">
            </div>

            <AddRole />

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
              <th scope="col">Company</th>
              <th scope="col">Role Name</th>
              <th scope="col">Avilable Permissions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((items: roleUpdateType) => (
              <tr key={items.id}>
                <th scope="row">
                  <DumyInput indum={items.id !== undefined ? items.id : null} />
                </th>
                <td>
                  <DumyInput indum={items.company} />
                </td>
                <td>

                  <DumyInput indum={items.name} />
                </td>
                <td>

                  {items.permissions.map((item:number,index:number)=>{

                    return <span key={index} className=''>
                         {item},
                    </span>
  
                  })}
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

export default Roles