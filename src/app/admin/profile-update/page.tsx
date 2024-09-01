'use client'

import AddProfileUpdate from '@/components/admin/profile/AddProfileUpdate'
import DumyInput from '@/components/dummyinput/DumyInput'
import { StateProps } from '@/type/type'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image';



export interface profileUpdateType {
  id?: null | number
  user: null | number,
  Date_of_Birth: string
  profile_picture: string,
  pan_number: string,
  pan_picture: string
}



const ProfileUpdate = () => {


  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)


  const getTodos = async () => {

    const res = await axios.get(`${baseurl}adminpanel/profileupdates`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })


    return res.data


  }

  const { data } = useQuery({ queryKey: ['apiprofileupdate'], queryFn: getTodos })

 






  return (
    <div className="text-base-content bg-base-100 h-auto min-h-screen">
      <div className="ml-80 my-6 mr-20">



        <div className="p-4"></div>
        <button className="btn btn-success mr-2 " onClick={() => {
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement;

          if (modal) {
            modal.showModal();
          }
        }}>Add Profile</button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box w-11/12 max-w-5xl ">

            <div className="modal-action mt-0">
            </div>

            <AddProfileUpdate />

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
              <th scope="col">Pan No</th>
              <th scope="col">DOB</th>
              <th scope="col">Profile Picture</th>
              <th scope="col">Pan Picture</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data?.map((items: profileUpdateType) => (
              <tr key={items.id}>
                <th scope="row">
                  <DumyInput indum={items.id !== undefined ? items.id : null} />
                </th>
                <td>
                  <DumyInput indum={items.pan_number} />
                </td>
                <td>

                  <DumyInput indum={items.Date_of_Birth} />

                </td>
                <td>
                  <img
                    src={items.profile_picture}
                    alt="Profile Picture"
                    width='100px'
                    height='100px'
                  />



                </td>

                <td>

                  <img
                    src={items.pan_picture}
                    alt="Pan Picture"
                    width='100px'
                    height='100px'
                  />
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

export default ProfileUpdate